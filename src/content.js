(async function () {
    if (window.__whisperContentScriptHasRun) return;
    window.__whisperContentScriptHasRun = true;

    // Importer i18n.js dynamiquement et s'assurer qu'il est initialisé correctement
    try {
        await import(chrome.runtime.getURL('src/utils/i18n.js'));
        // Initialisation après l'importation
        await window.BabelFishAIUtils.i18n.init();
        console.log("Content script and i18n.js injected!");
        
        // Créer un événement personnalisé pour signaler que i18n est chargé
        const i18nLoadedEvent = new CustomEvent('babelfishai:i18n-loaded');
        document.dispatchEvent(i18nLoadedEvent);
    } catch (error) {
        console.error("Failed to import i18n.js:", error);
    }

    // Content script de l'extension de transcription vocale

    // Utilisation directe des constantes globales depuis constants.js
    const CONFIG = window.BabelFishAIConstants.CONFIG;
    const API_CONFIG = window.BabelFishAIConstants.API_CONFIG;
    const UI_CONFIG = window.BabelFishAIConstants.UI_CONFIG;

    // Utilisation des constantes globales pour les actions et types de messages
    const ACTIONS = window.BabelFishAIConstants.ACTIONS;
    const MESSAGE_TYPES = window.BabelFishAIConstants.MESSAGE_TYPES;
    
    // Constantes spécifiques pour les messages d'annulation
    const CANCEL_MESSAGE = {
        RECORDING_CANCELED: window.BabelFishAIUtils.i18n?.getMessage("recordingCanceled") || "Enregistrement annulé (touche Échap)."
    };

    // Erreurs spécifiques au content script
    const ERRORS = {
        API_KEY_NOT_FOUND: window.BabelFishAIConstants.ERRORS.API_KEY_NOT_FOUND,
        CHROME_STORAGE_ERROR: window.BabelFishAIConstants.ERRORS.CHROME_STORAGE_ERROR,
        MIC_ACCESS_ERROR: window.BabelFishAIConstants.ERRORS.MIC_ACCESS_ERROR,
        TRANSCRIPTION_ERROR: window.BabelFishAIConstants.ERRORS.TRANSCRIPTION_ERROR,
        NO_EDITABLE_ELEMENT: window.BabelFishAIConstants.ERRORS.NO_EDITABLE_ELEMENT
    };

    // État global
    let mediaRecorder = null;
    let audioChunks = [];
    let isRecording = false;
    let recordingBanner = null;
    let apiKey = null;
    let bannerColorStart = UI_CONFIG.DEFAULT_BANNER_COLOR_START;
    let bannerColorEnd = UI_CONFIG.DEFAULT_BANNER_COLOR_END;
    let bannerOpacity = UI_CONFIG.DEFAULT_BANNER_OPACITY;
    
    // Variable pour stocker les informations de focus et de sélection
    const lastFocusInfo = {
        element: null,
        selectionStart: 0,
        selectionEnd: 0,
        range: null
    };
    
    /**
     * Stocke l'élément actif et sa sélection avant l'interaction avec les boutons
     */
    function storeFocusAndSelection() {
        const activeElem = document.activeElement;
        if (!activeElem) return;

        // Vérifier si c'est un input/textarea
        if (
            (activeElem.tagName === 'TEXTAREA') ||
            (activeElem.tagName === 'INPUT' && activeElem.type === 'text')
        ) {
            lastFocusInfo.element = activeElem;
            lastFocusInfo.selectionStart = activeElem.selectionStart;
            lastFocusInfo.selectionEnd = activeElem.selectionEnd;
            lastFocusInfo.range = null;
        }
        // Ou un élément contentEditable
        else if (activeElem.isContentEditable) {
            lastFocusInfo.element = activeElem;
            lastFocusInfo.selectionStart = null;
            lastFocusInfo.selectionEnd = null;
            
            // Récupération de la sélection (Range) pour contentEditable
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                lastFocusInfo.range = selection.getRangeAt(0);
            }
        } else {
            // Sinon, on ne fait rien (l'élément n'est pas pertinent pour nous)
            lastFocusInfo.element = null;
            lastFocusInfo.range = null;
        }
    }

    /**
     * Vérifie la validité de l'élément stocké pour le focus
     * @returns {boolean} - True si l'élément est valide, False sinon
     */
    function isStoredElementValid() {
        if (!lastFocusInfo.element) {
            return false;
        }
        
        try {
            // Vérifier que l'élément existe toujours dans le DOM de manière sécurisée
            return document.body?.contains(lastFocusInfo.element);
        } catch (e) {
            lastFocusInfo.element = null;
            return false;
        }
    }
    
    /**
     * Restaure le focus sur l'élément stocké
     * @returns {boolean} - True si le focus a été restauré avec succès
     */
    function restoreFocus() {
        try {
            lastFocusInfo.element.focus();
            return true;
        } catch (e) {
            lastFocusInfo.element = null;
            return false;
        }
    }
    
    /**
     * Gère la position du curseur pour les éléments input/textarea
     * @param {boolean} preventSelection - Si true, place le curseur à la fin sans sélectionner
     */
    function handleInputCursorPosition(preventSelection) {
        try {
            if (preventSelection) {
                // Placer le curseur à la fin sans sélectionner
                const endPosition = lastFocusInfo.element.value.length;
                lastFocusInfo.element.setSelectionRange(endPosition, endPosition);
            } else {
                // Restaurer la sélection originale
                lastFocusInfo.element.setSelectionRange(
                    lastFocusInfo.selectionStart, 
                    lastFocusInfo.selectionEnd
                );
            }
        } catch (e) {
            console.warn("Impossible de restaurer la position du curseur:", e);
        }
    }
    
    /**
     * Trouve le dernier nœud de texte dans un élément
     * @param {Node} node - Le nœud à parcourir
     * @returns {Node|null} - Le dernier nœud de texte ou null
     */
    function findLastTextNode(node) {
        try {
            if (!node) return null;
            
            if (node.nodeType === Node.TEXT_NODE) {
                return node;
            } else if (node.childNodes && node.childNodes.length > 0) {
                for (let i = node.childNodes.length - 1; i >= 0; i--) {
                    const result = findLastTextNode(node.childNodes[i]);
                    if (result) return result;
                }
            }
            return null;
        } catch (e) {
            console.warn("Erreur lors de la recherche des nœuds:", e);
            return null;
        }
    }
    
    /**
     * Gère la position du curseur pour les éléments contentEditable
     * @param {boolean} preventSelection - Si true, place le curseur à la fin sans sélectionner
     */
    function handleContentEditableCursor(preventSelection) {
        try {
            // Vérifier que window.getSelection() est disponible
            const selection = window.getSelection();
            if (!selection) {
                console.warn("window.getSelection() n'est pas disponible");
                return;
            }
            
            // Effacer les sélections actuelles de manière sécurisée
            try {
                selection.removeAllRanges();
            } catch (e) {
                console.warn("Erreur lors de la suppression des ranges:", e);
                return;
            }
            
            if (preventSelection) {
                // Créer un range qui place le curseur à la fin du contenu sans sélection
                const range = document.createRange();
                
                // Trouver le dernier nœud de texte dans l'élément
                const lastTextNode = findLastTextNode(lastFocusInfo.element);
                
                if (lastTextNode) {
                    // Placer le curseur à la fin du dernier nœud de texte
                    range.setStart(lastTextNode, lastTextNode.length);
                    range.setEnd(lastTextNode, lastTextNode.length);
                } else {
                    // Si aucun nœud de texte n'est trouvé, utiliser la fin de l'élément
                    range.selectNodeContents(lastFocusInfo.element);
                    range.collapse(false); // Collapse à la fin
                }
                
                // Appliquer le range
                selection.addRange(range);
            } else if (lastFocusInfo.range) {
                // Restaurer la sélection originale
                selection.addRange(lastFocusInfo.range);
            }
        } catch (e) {
            console.warn("Impossible de restaurer la position du curseur dans contentEditable:", e);
            lastFocusInfo.range = null;
        }
    }
    
    /**
     * Restaure le focus et la sélection après l'interaction avec les boutons
     * @param {boolean} [force=false] - Forcer la restauration même si l'élément actif semble correct
     * @param {boolean} [preventSelection=true] - Empêcher la sélection, mettre le curseur à la fin du contenu
     */
    function restoreFocusAndSelection(force = false, preventSelection = true) {
        // Vérifier si l'élément stocké est valide
        if (!isStoredElementValid()) {
            return;
        }
        
        // Si l'élément est déjà actif et qu'on ne force pas la restauration, ne rien faire
        if (!force && document.activeElement === lastFocusInfo.element) return;
        
        // Tenter de restaurer le focus
        if (!restoreFocus()) {
            return;
        }
        
        // Traiter selon le type d'élément
        if ((lastFocusInfo.element.tagName === 'TEXTAREA') || 
            (lastFocusInfo.element.tagName === 'INPUT' && lastFocusInfo.element.type === 'text')) {
            handleInputCursorPosition(preventSelection);
        } else if (lastFocusInfo.element.isContentEditable) {
            handleContentEditableCursor(preventSelection);
        }
    }

    /**
     * Initialise les options de l'extension
     */
    async function initializeExtensionOptions() {
        try {
            // Initialisation de la clé API
            apiKey = await window.BabelFishAIUtils.api.getApiKey();
        } catch (error) {
            console.error("Failed to load API key:", error);
        }

        // Initialisation des options de couleur du bandeau en utilisant l'utilitaire
        try {
            window.BabelFishAIUtils.api.getFromStorage({
                bannerColorStart: UI_CONFIG.DEFAULT_BANNER_COLOR_START,
                bannerColorEnd: UI_CONFIG.DEFAULT_BANNER_COLOR_END,
                bannerOpacity: UI_CONFIG.DEFAULT_BANNER_OPACITY
            }).then(result => {
                bannerColorStart = result.bannerColorStart;
                bannerColorEnd = result.bannerColorEnd;
                bannerOpacity = result.bannerOpacity;
                if (recordingBanner) {
                    updateBannerColor();
                }
            });
        } catch (error) {
            console.error("Failed to load banner colors:", error);
        }
    }

    // Initialiser les options de l'extension
    initializeExtensionOptions();

    /**
     * Met à jour la couleur du bandeau en utilisant la fonction de l'utilitaire UI
     * @param {boolean} [force=false] - Forcer la mise à jour même si la bannière est en mode erreur
     * @returns {boolean} - Indique si la mise à jour a réussi
     */
    function updateBannerColor(force = false) {
        // Éviter de mettre à jour la couleur si la bannière n'existe pas
        if (!recordingBanner) return false;

        // Utiliser la fonction de l'utilitaire UI pour mettre à jour la couleur du bandeau
        window.BabelFishAIUtils.ui.updateBannerColor(
            recordingBanner,
            bannerColorStart || UI_CONFIG.DEFAULT_BANNER_COLOR_START,
            bannerColorEnd || UI_CONFIG.DEFAULT_BANNER_COLOR_END,
            bannerOpacity,
            force
        );

        return true;
    }

    /**
     * Démarre l'enregistrement audio avec optimisation pour la performance
     * @returns {Promise<boolean>} - Indique si l'enregistrement a démarré avec succès
     */
    async function startRecording() {
        // Fonction utilitaire pour exécuter une opération en toute sécurité
        const safeExecute = async (fn, errorMsg) => {
            try {
                return await fn();
            } catch (e) {
                console.warn(errorMsg, e);
                throw e; // Propager l'erreur pour la gestion centralisée
            }
        };

        // Réinitialiser les chunks audio immédiatement
        if (audioChunks.length > 0) {
            audioChunks.length = 0;
        }

        // Variable pour stocker le flux audio
        let stream = null;

        try {
            // 1. Vérifier la disponibilité de la clé API (nécessaire avant d'accéder au micro)
            apiKey = await safeExecute(
                () => window.BabelFishAIUtils.api.getApiKey(),
                "Erreur lors de la récupération de la clé API"
            );

            // 2. Configuration optimale pour la capture audio
            const audioConstraints = {
                audio: {
                    // Paramètres optimaux pour la reconnaissance vocale
                    echoCancellation: true,    // Suppression de l'écho
                    noiseSuppression: true,    // Suppression du bruit
                    autoGainControl: true,     // Ajustement automatique du gain
                    sampleRate: 44100,         // Fréquence d'échantillonnage standard
                    channelCount: 1            // Mono (meilleur pour la reconnaissance vocale)
                },
                video: false  // Explicitement refuser l'accès vidéo
            };

            // 3. Demander l'accès au microphone avec les contraintes optimisées
            stream = await safeExecute(
                () => navigator.mediaDevices.getUserMedia(audioConstraints),
                "Erreur lors de l'accès au microphone"
            );
            
            // Vérifier que le stream est valide
            if (!stream || !stream.active) {
                throw new Error("Stream audio invalide ou inactif");
            }

            // 4. Créer le MediaRecorder avec les codecs optimaux disponibles
            const options = {
                mimeType: 'audio/webm;codecs=opus',  // Format optimal pour la reconnaissance vocale
                audioBitsPerSecond: 128000           // 128kbps pour un bon compromis taille/qualité
            };
            
            // Vérification de compatibilité
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.warn(`Format ${options.mimeType} non supporté, utilisation du format par défaut`);
                mediaRecorder = new MediaRecorder(stream); // Fallback au format par défaut
            } else {
                mediaRecorder = new MediaRecorder(stream, options);
            }

            // 5. Configurer les gestionnaires d'événements (la fonction start est dans setupMediaRecorderEvents)
            setupMediaRecorderEvents(stream);
            
            // 6. Mettre à jour l'état UI immédiatement (ne pas attendre le démarrage effectif)
            isRecording = true;
            
            // 7. Informer l'utilisateur via la bannière
            showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerRecording"));
            
            // 8. Informer le background script (opération asynchrone qui ne doit pas bloquer)
            safeExecute(
                () => chrome.runtime.sendMessage({ action: ACTIONS.STARTED }),
                "Impossible d'envoyer la notification de démarrage au background"
            );

            return true;
        } catch (error) {
            console.error("Erreur lors du démarrage de l'enregistrement:", error);

            // Détection intelligente du type d'erreur
            let errorMessage;
            
            if (error.message?.includes(ERRORS.API_KEY_NOT_FOUND)) {
                // Erreur de clé API manquante
                errorMessage = ERRORS.API_KEY_NOT_FOUND;
            } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                // Erreur d'autorisation de microphone refusée
                errorMessage = window.BabelFishAIUtils.i18n.getMessage("bannerMicAccessError");
            } else if (error.name === 'NotFoundError') {
                // Aucun périphérique audio trouvé
                errorMessage = "Aucun microphone détecté sur cet appareil.";
            } else if (error.name === 'NotReadableError' || error.name === 'AbortError') {
                // Problème d'accès au périphérique
                errorMessage = "Impossible d'accéder au microphone (périphérique occupé ou défaillant).";
            } else {
                // Erreur générique d'accès au microphone
                errorMessage = ERRORS.MIC_ACCESS_ERROR;
            }

            // Affichage centralisé de l'erreur
            handleError(errorMessage, error.message || error.toString());

            // Nettoyage complet en cas d'échec
            isRecording = false;
            
            // Libérer le flux audio si disponible
            if (stream) {
                safeExecute(
                    () => stream.getTracks().forEach(track => track.stop()),
                    "Erreur lors de la libération des ressources audio"
                );
                stream = null;
            }

            return false;
        }
    }

    /**
     * Traite l'audio enregistré de manière optimisée
     * @param {Blob} audioBlob - Le blob audio à traiter
     * @returns {Promise<void>}
     */
    async function processRecordedAudio(audioBlob) {
        // Fonction utilitaire pour exécuter une opération en toute sécurité
        const safeExecute = async (fn, errorMsg) => {
            try {
                return await fn();
            } catch (e) {
                console.warn(errorMsg, e);
                throw e; // Propager l'erreur pour la gestion centralisée
            }
        };
        
        try {
            // Vérification rapide de la validité du blob audio
            if (!audioBlob || audioBlob.size <= 0 || audioBlob.type.indexOf('audio/') !== 0) {
                throw new Error("Blob audio invalide ou vide");
            }
            
            // 1. Informer l'utilisateur que la transcription est en cours
            await safeExecute(
                () => showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerTranscribing")),
                "Erreur lors de l'affichage de la bannière de transcription"
            );

            // 2. Transcrire l'audio avec une gestion optimisée des erreurs
            const transcription = await safeExecute(
                () => transcribeAudio(audioBlob),
                "Erreur lors de la transcription audio"
            );
            
            // Vérification rapide du résultat avant de continuer
            if (!transcription || typeof transcription !== 'string' || transcription.trim() === '') {
                throw new Error("Résultat de transcription vide ou invalide");
            }

            // 3. Afficher la transcription (avec les éventuelles opérations de traduction/reformulation)
            await safeExecute(
                () => showTranscription(transcription),
                "Erreur lors de l'affichage de la transcription"
            );

            // 4. Cacher la bannière une fois toutes les opérations terminées avec succès
            await safeExecute(
                () => hideBanner(),
                "Erreur lors de la dissimulation de la bannière"
            );
            
            // 5. Aide au garbage collector en supprimant la référence au blob
            // Cela est particulièrement important pour les gros fichiers audio
            return null;
        } catch (error) {
            // Gestion centralisée et cohérente des erreurs
            console.error("Erreur pendant le traitement audio:", error);
            
            // Utiliser le message d'erreur approprié selon le type d'erreur
            const userMessage = error.name === 'AbortError' 
                ? "Traitement audio annulé" 
                : (window.BabelFishAIUtils.i18n.getMessage("bannerTranscriptionError") || "Erreur pendant la transcription");
                
            handleError(userMessage, error.message || error.toString());
            
            // Assurer que la bannière d'erreur est visible même en cas d'erreur dans hideBanner
            if (recordingBanner) {
                try {
                    showBanner(userMessage, MESSAGE_TYPES.ERROR);
                } catch (e) {
                    console.error("Erreur lors de l'affichage de la bannière d'erreur:", e);
                }
            }
        } finally {
            // S'assurer que la référence au blob est libérée dans tous les cas
            audioBlob = null;
        }
        
        // Retourne null en dehors du bloc finally
        return null;
    }

    /**
     * Nettoie les ressources après l'enregistrement
     * @param {MediaStream} stream - Le flux audio à nettoyer
     * @param {boolean} [wasCanceled=false] - Indique si l'enregistrement a été annulé
     */
    function cleanupRecordingResources(stream, wasCanceled) {
        // Fonction utilitaire pour exécuter une opération en toute sécurité
        const safeExecute = (fn, errorMsg) => {
            try {
                return fn();
            } catch (e) {
                console.warn(errorMsg, e);
                return null;
            }
        };
        
        // Réinitialiser l'état d'enregistrement immédiatement
        isRecording = false;

        // 1. Informer le background script - Opération asynchrone qui ne doit pas bloquer
        safeExecute(() => {
            chrome.runtime.sendMessage({ 
                action: ACTIONS.STOPPED,
                canceled: wasCanceled === true
            });
        }, "Impossible d'envoyer le message d'arrêt au background");

        // 2. Libérer les ressources du MediaRecorder
        if (mediaRecorder) {
            // Arrêter l'enregistrement s'il est toujours actif
            if (mediaRecorder.state === 'recording') {
                safeExecute(() => mediaRecorder.stop(), 
                    "Erreur lors de l'arrêt du MediaRecorder");
            }
            
            // Supprimer les références aux événements pour éviter les fuites mémoire
            // Utilisation d'un destructuring pour simplifier le code
            ['ondataavailable', 'onstop', 'onerror'].forEach(eventName => {
                safeExecute(() => { mediaRecorder[eventName] = null; }, 
                    `Erreur lors de la suppression du gestionnaire d'événement ${eventName}`);
            });
            
            // Supprimer toute référence au mediaRecorder
            mediaRecorder = null;
        }

        // 3. Libérer les ressources du stream audio
        if (stream?.getTracks) {
            // Obtenir toutes les pistes en une seule opération
            const tracks = stream.getTracks();
            
            // Arrêter chaque piste de manière sécurisée
            tracks.forEach(track => {
                safeExecute(() => track.stop(), 
                    "Erreur lors de l'arrêt d'une piste audio");
            });
            
            // Aider le GC en supprimant les références explicitement
            stream = null;
        }

        // 4. Nettoyer les chunks audio - optimisation pour libérer la mémoire rapidement
        if (audioChunks.length > 0) {
            // Vider le tableau de manière optimisée
            audioChunks.length = 0;
        }

        // 5. Encourager le garbage collector à s'exécuter (si disponible)
        // Les navigateurs modernes ont des GC très efficaces, 
        // donc cette étape est principalement pour des cas particuliers
        if (window.gc) {
            // Appel direct au GC si disponible (cas rare)
            safeExecute(() => window.gc(), "Erreur lors de l'appel au garbage collector");
        } else {
            // Technique avancée pour suggérer au GC de s'exécuter:
            // Créer et supprimer un grand nombre d'objets pour encourager le GC
            safeExecute(() => {
                if (window.requestIdleCallback) {
                    // Utiliser requestIdleCallback de manière sécurisée
                    window.requestIdleCallback(() => {
                        // Créer et supprimer immédiatement un tableau large peut encourager le GC
                        const temp = new Array(10000).fill(0);
                        temp.length = 0;
                    }, { timeout: 100 }); // Utiliser un objet options correct
                } else {
                    // Fallback à setTimeout
                    setTimeout(() => {
                        const temp = new Array(10000).fill(0);
                        temp.length = 0;
                    }, 100);
                }
            }, "Erreur lors de la suggestion de garbage collection");
        }
    }

    /**
     * Configure les événements du MediaRecorder
     * @param {MediaStream} stream - Le flux audio
     */
    function setupMediaRecorderEvents(stream) {
        if (!mediaRecorder) {
            console.error('MediaRecorder non initialisé');
            return;
        }

        // Configuration optimale pour l'enregistrement audio
        // Nous préférons des chunks plus petits pour un traitement plus fluide
        // et une meilleure gestion de la mémoire
        if (typeof mediaRecorder.audioBitsPerSecond === 'number') {
            // Utiliser un bitrate modéré pour un bon compromis qualité/taille
            mediaRecorder.audioBitsPerSecond = 128000; // 128 kbps
        }
        
        // Événement déclenché lorsque des données audio sont disponibles
        // Utilisation d'une fonction nommée pour faciliter le nettoyage des listeners
        const handleDataAvailable = event => {
            // Vérification optimisée avec court-circuit
            if (event.data?.size > 0) {
                // Utilisation d'un push pour ajouter le chunk
                audioChunks.push(event.data);
            }
        };
        
        // Événement déclenché lorsque l'enregistrement est arrêté
        // Utilisation d'une fonction nommée pour faciliter le nettoyage
        const handleRecordingStopped = async () => {
            let audioBlob = null;
            
            try {
                // Sortie rapide en cas d'annulation (économie de traitement)
                if (mediaRecorder.cancelProcessing) {
                    console.log("Enregistrement annulé par l'utilisateur, audio non traité");
                    return;
                }
                
                // Vérification optimisée
                const hasAudioData = audioChunks.length > 0;
                if (!hasAudioData) {
                    throw new Error("Aucune donnée audio capturée");
                }

                // Utilisation de propriétés optimales pour les blobs audio
                audioBlob = new Blob(audioChunks, { 
                    type: 'audio/webm;codecs=opus' // Spécifier le codec pour une meilleure compatibilité
                });

                // Vérification optimisée de la taille
                if (audioBlob.size <= 0) {
                    throw new Error("Blob audio vide");
                }

                // Traiter l'audio enregistré - passage du blob par référence
                await processRecordedAudio(audioBlob);
            } catch (error) {
                console.error('Erreur lors du traitement de l\'enregistrement:', error);
                handleError(error);
            } finally {
                // Libération proactive des ressources pour éviter les fuites mémoire
                if (audioBlob) {
                    // Aide le GC à libérer le blob plus rapidement
                    audioBlob = null;
                }
                
                // Nettoyer les ressources dans tous les cas
                cleanupRecordingResources(stream);
            }
        };
        
        // Gestionnaire d'erreurs optimisé
        const handleRecordingError = error => {
            console.error('Erreur MediaRecorder:', error);
            
            // Formater le message d'erreur de manière cohérente
            const errorName = error?.name || 'MediaRecorder error';
            const errorMessage = error?.message || 'Erreur d\'enregistrement inconnue';
            
            // Afficher l'erreur à l'utilisateur
            handleError('Erreur d\'enregistrement', `${errorName}: ${errorMessage}`);
            
            // Nettoyer immédiatement les ressources
            cleanupRecordingResources(stream);
        };

        // Assigner les gestionnaires d'événements
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.onstop = handleRecordingStopped;
        mediaRecorder.onerror = handleRecordingError;
        
        // Configuration d'un délai d'interrogation pour les chunks audio
        // Cela permet d'obtenir des chunks plus petits et plus fréquents pour un traitement plus fluide
        if (typeof mediaRecorder.start === 'function') {
            // Obtenir des données chaque seconde pour une meilleure gestion de la mémoire
            // au lieu d'attendre la fin de l'enregistrement
            mediaRecorder.start(1000);
        }
    }

    /**
     * Arrête l'enregistrement en cours
     * @param {boolean} [cancelProcessing=false] - Si true, annule le traitement de l'audio enregistré
     * @returns {boolean} - Indique si l'arrêt a été effectué
     */
    function stopRecording(cancelProcessing = false) {
        try {
            // Vérifier si le mediaRecorder existe et est en cours d'enregistrement
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                // Si on annule, on stocke cette information pour éviter le traitement dans l'événement onstop
                if (cancelProcessing) {
                    mediaRecorder.cancelProcessing = true;
                    
                    // Afficher un message d'annulation dans le bandeau
                    // Le message sera masqué automatiquement par le setTimeout dans cancelRecording()
                    showBanner(CANCEL_MESSAGE.RECORDING_CANCELED);
                    
                    // Informer le background script
                    chrome.runtime.sendMessage({ 
                        action: ACTIONS.STOPPED,
                        canceled: true
                    });
                    
                    // Nettoyage des ressources d'enregistrement
                    const stream = mediaRecorder.stream;
                    mediaRecorder.stop();
                    cleanupRecordingResources(stream, true);
                    
                    // Ne pas continuer avec le reste de la fonction pour éviter un double appel à mediaRecorder.stop()
                    return true;
                }
                
                mediaRecorder.stop();
                return true;
            } else {
                console.warn("No active recording to stop");
                return false;
            }
        } catch (error) {
            console.error("Error stopping recording:", error);
            handleError("Erreur lors de l'arrêt de l'enregistrement", error.message);
            return false;
        }
    }
    
    /**
     * Annule l'enregistrement en cours sans traiter l'audio
     * @returns {boolean} - Indique si l'annulation a réussi
     */
    function cancelRecording() {
        if (isRecording) {
            // Restaurer immédiatement le focus avant même d'arrêter l'enregistrement
            restoreFocusAndSelection(true, true);
            
            const result = stopRecording(true);
            
            // Cacher automatiquement la bannière après 4 secondes
            setTimeout(() => {
                // Vérifier le contenu du statusTextContainer pour la compatibilité avec la structure actuelle du bandeau
                const statusTextContainer = recordingBanner.querySelector('.whisper-status-text');
                if (recordingBanner) {
                    if ((statusTextContainer && statusTextContainer.textContent === CANCEL_MESSAGE.RECORDING_CANCELED) || 
                        recordingBanner.textContent === CANCEL_MESSAGE.RECORDING_CANCELED) {
                        hideBanner();
                        console.log("Bandeau masqué après annulation d'enregistrement");
                        
                        // S'assurer que le focus est toujours restauré après avoir caché la bannière
                        setTimeout(() => {
                            restoreFocusAndSelection(true, true);
                        }, 100);
                    }
                }
            }, 4000);
            
            return result;
        }
        return false;
    }


    /**
     * Transcrit l'audio en texte via l'API Whisper en utilisant la fonction de l'API
     * @param {Blob} audioBlob - Le blob audio à transcrire
     * @returns {Promise<string>} Le texte transcrit
     */
    async function transcribeAudio(audioBlob) {
        if (!apiKey) {
            const errorMsg = ERRORS.API_KEY_NOT_FOUND;
            handleError(errorMsg, errorMsg);
            throw new Error(errorMsg);
        }

        try {
            // Récupérer l'URL de l'API et le modèle depuis le stockage en utilisant l'utilitaire
            const result = await window.BabelFishAIUtils.api.getFromStorage({
                apiUrl: API_CONFIG.DEFAULT_WHISPER_API_URL,
                audioModelType: API_CONFIG.WHISPER_MODEL
            });

            const apiUrl = result.apiUrl || API_CONFIG.DEFAULT_WHISPER_API_URL;
            const audioModelType = result.audioModelType;

            // Utiliser la fonction de l'API pour la transcription avec génération de nom de fichier unique
            return await window.BabelFishAIUtils.api.transcribeAudio(
                audioBlob,
                apiKey,
                apiUrl,
                audioModelType,
                null, // Pas de nom de fichier spécifique
                true  // Générer un nom de fichier unique avec timestamp et partie aléatoire
            );
        } catch (error) {
            console.error('Transcription error:', error);
            throw error;
        } finally {
            audioChunks = [];
            audioBlob = null;
        }
    }

    /**
     * Récupère les options d'affichage et de traduction depuis le stockage
     * @returns {Promise<Object>} Les options d'affichage, de traduction et de reformulation
     */
    function getDisplayOptions() {
        return window.BabelFishAIUtils.api.getFromStorage({
            activeDisplay: true,
            dialogDisplay: false,
            dialogDuration: CONFIG.DEFAULT_DIALOG_DURATION,
            enableRephrase: false,
            enableTranslation: false,
            sourceLanguage: 'fr',
            targetLanguage: 'en',
            forcedDialogDomains: CONFIG.DEFAULT_FORCED_DIALOG_DOMAINS
        });
    }

    /**
     * Reformule le texte si l'option est activée
     * @param {string} text - Le texte à reformuler
     * @param {Object} options - Les options de reformulation
     * @returns {Promise<string>} Le texte reformulé ou le texte original en cas d'erreur
     */
    async function rephraseTextIfEnabled(text, options) {
        if (!options.enableRephrase) {
            return text;
        }

        try {
            // Informer l'utilisateur que la reformulation est en cours
            showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerRephrasing") || "Reformulation en cours...");

            // Reformuler le texte
            const rephrasedText = await window.BabelFishAIUtils.translation.rephraseText(
                text,
                apiKey
            );

            // Vérifier que la reformulation est valide
            if (rephrasedText?.trim()) {
                // Cacher la bannière une fois la reformulation terminée
                hideBanner();
                return rephrasedText;
            } else {
                throw new Error('Empty rephrasing result');
            }
        } catch (error) {
            console.error('Rephrasing failed:', error);
            handleError(window.BabelFishAIUtils.i18n.getMessage("bannerRephrasingError") || "Erreur lors de la reformulation", error.message);
            // En cas d'erreur de reformulation, on utilise le texte original
            return text;
        }
    }

    /**
     * Traduit le texte si l'option est activée
     * @param {string} text - Le texte à traduire
     * @param {Object} options - Les options de traduction
     * @returns {Promise<string>} Le texte traduit ou le texte original en cas d'erreur
     */
    async function translateTextIfEnabled(text, options) {
        if (!options.enableTranslation) {
            return text;
        }

        try {
            // Informer l'utilisateur que la traduction est en cours
            showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerTranslating"));

            // Traduire le texte
            const translatedText = await window.BabelFishAIUtils.translation.translateText(
                text,
                options.sourceLanguage,
                options.targetLanguage,
                apiKey
            );

            // Vérifier que la traduction est valide
            if (translatedText && translatedText.trim()) {
                // Cacher la bannière une fois la traduction terminée
                hideBanner();
                return translatedText;
            } else {
                throw new Error('Empty translation result');
            }
        } catch (error) {
            console.error('Translation failed:', error);
            handleError(window.BabelFishAIUtils.i18n.getMessage("bannerTranslationError"), error.message);
            // En cas d'erreur de traduction, on utilise le texte original
            return text;
        }
    }


    /**
     * Détermine le mode d'affichage et affiche le texte selon les options configurées
     * @param {string} text - Le texte à afficher
     * @param {Object} options - Les options d'affichage
     * @returns {Promise<boolean>} - Indique si l'affichage a réussi
     */
    function displayTranscriptionText(text, options) {
        if (!text) {
            console.warn("Tentative d'affichage de texte vide");
            return false;
        }

        try {
            // Déterminer si l'affichage dans une boîte de dialogue est forcé pour ce domaine
            const currentDomain = window.location.hostname;
            const isDialogForced = Array.isArray(options.forcedDialogDomains) &&
                options.forcedDialogDomains.some(domain => currentDomain.includes(domain));

            // Tenter d'insérer le texte dans l'élément actif si l'option est activée
            let displayed = false;
            if (options.activeDisplay && !isDialogForced) {
                displayed = handleActiveElementInsertion(text);
            }

            // Afficher dans une boîte de dialogue si nécessaire ou si l'insertion a échoué
            if (options.dialogDisplay || isDialogForced || !displayed) {
                showTranscriptionDialog(text, options.dialogDuration || CONFIG.DEFAULT_DIALOG_DURATION);
                displayed = true;
            }

            // Avertir si aucune méthode d'affichage n'est activée
            if (!displayed) {
                console.warn("Aucune méthode d'affichage n'est activée");
                return false;
            }

            return true;
        } catch (error) {
            console.error("Erreur lors de l'affichage du texte:", error);
            handleError(error);
            return false;
        }
    }

    /**
     * Affiche la transcription selon les options configurées
     * @param {string} text - Le texte à afficher
     * @returns {Promise<boolean>} - Indique si l'affichage a réussi
     */
    async function showTranscription(text) {
        // Valider le texte d'entrée
        if (!text || typeof text !== 'string') {
            const errorMsg = "Texte de transcription invalide";
            console.error(`${errorMsg}:`, text);
            handleError(errorMsg, "Invalid transcription text");
            return false;
        }

        try {
            // Informer l'utilisateur que le traitement est en cours
            showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerProcessing"));

            // Récupérer les options de configuration
            const options = await getDisplayOptions();

            // Étape 1: Reformuler le texte si l'option est activée
            let processedText = text;
            if (options.enableRephrase) {
                processedText = await rephraseTextIfEnabled(processedText, options);
            }

            // Étape 2: Traduire le texte si l'option est activée
            processedText = await translateTextIfEnabled(processedText, options);

            // Stocker l'élément actif avant d'afficher le texte
            storeFocusAndSelection();

            // Afficher le texte selon les options configurées
            const result = await displayTranscriptionText(processedText, options);
            
            // Attendre un court délai pour permettre au navigateur de terminer les opérations DOM
            // et éviter que le texte soit automatiquement sélectionné
            await new Promise(resolve => setTimeout(resolve, 10));
            
            // Restaurer le focus et la position du curseur sans sélection
            restoreFocusAndSelection(true);
            
            return result;
        } catch (error) {
            console.error('Error displaying transcription:', error);
            handleError(error instanceof Error ? error : "Erreur d'affichage de la transcription");
            return false;
        } finally {
            // Si une erreur se produit ailleurs, s'assurer que la bannière de traitement disparaît
            if (recordingBanner && recordingBanner.textContent === window.BabelFishAIUtils.i18n.getMessage("bannerProcessing")) {
                hideBanner();
            }
        }
    }

    /**
     * Vérifie si l'élément actif est valide pour l'insertion de texte
     * @param {HTMLElement} activeElement - L'élément actif
     * @returns {boolean} - True si l'élément est valide
     */
    function isValidElementForInsertion(activeElement) {
        return activeElement && 
               activeElement.tagName !== 'IFRAME' && 
               !(activeElement.getAttribute && activeElement.getAttribute('contenteditable') === 'false');
    }
    
    /**
     * Gère l'insertion de texte dans un élément contentEditable
     * @param {HTMLElement} element - L'élément contentEditable
     * @param {string} cleanText - Le texte à insérer
     * @returns {boolean} - True si l'insertion a réussi
     */
    function insertIntoContentEditable(element, cleanText) {
        // Assurer le focus
        element.focus();
        
        // Normalisation du texte optimisée - en une seule passe
        const finalText = cleanText.replace(/[\r\n]+/g, ' ').trim();
        
        try {
            // Tenter d'utiliser l'API moderne d'insertion
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                
                // Supprimer le texte sélectionné
                selection.deleteFromDocument();
                
                // Insérer le texte
                const textNode = document.createTextNode(finalText);
                range.insertNode(textNode);
                
                // Positionner le curseur à la fin du texte inséré
                range.setStartAfter(textNode);
                range.setEndAfter(textNode);
                
                // Appliquer le nouveau range
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                // Fallback à execCommand
                document.execCommand('insertHTML', false, finalText);
                
                // Désélectionner après l'insertion
                const sel = window.getSelection();
                if (sel.rangeCount > 0) {
                    const range = sel.getRangeAt(0);
                    range.collapse(false); // Collapse à la fin
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
            
            // Déclencher l'événement input
            element.dispatchEvent(new Event('input', { bubbles: true }));
            return true;
        } catch (error) {
            console.error("Erreur lors de l'insertion dans contentEditable:", error);
            
            // Dernier recours: insertion simple
            try {
                document.execCommand('insertHTML', false, finalText);
                return true;
            } catch (e) {
                console.error("Échec total de l'insertion:", e);
                return false;
            }
        }
    }
    
    /**
     * Gère l'insertion du texte dans l'élément actif
     * @param {string} text - Le texte à insérer
     * @returns {boolean} Indique si l'insertion a réussi
     */
    function handleActiveElementInsertion(text) {
        try {
            // Validation des paramètres
            if (!text) {
                console.warn("Empty text provided for insertion");
                return false;
            }

            // Récupérer l'élément actif
            const activeElement = document.activeElement;

            // Vérifier si l'élément est valide pour l'insertion
            if (!isValidElementForInsertion(activeElement)) {
                return false;
            }

            // Nettoyer le texte une seule fois
            const cleanText = text.trimStart();

            // Détection optimisée du type d'élément
            const {tagName, type, isContentEditable} = activeElement;
            
            // Traiter selon le type d'élément
            if ((tagName === 'TEXTAREA') || (tagName === 'INPUT' && type === 'text')) {
                return insertTextIntoInput(activeElement, cleanText);
            } else if (isContentEditable) {
                return insertIntoContentEditable(activeElement, cleanText);
            }

            return false;
        } catch (error) {
            console.error("Error inserting text into active element:", error);
            return false;
        }
    }

    /**
     * Insère du texte dans un élément input ou textarea avec optimisation pour grands volumes
     * @param {HTMLInputElement|HTMLTextAreaElement} element - L'élément de saisie
     * @param {string} text - Le texte à insérer
     * @returns {boolean} - Indique si l'insertion a réussi
     */
    function insertTextIntoInput(element, text) {
        try {
            // Validation des paramètres rapide avec court-circuit
            if (!element || !text || typeof text !== 'string') {
                console.warn("Invalid element or text for insertion");
                return false;
            }

            // Validation de l'élément en une seule condition
            if (!(element.value !== undefined && 
                 'selectionStart' in element && 
                 'selectionEnd' in element)) {
                console.warn("Element is not a valid input or textarea");
                return false;
            }

            // Extraire les valeurs nécessaires une seule fois (optimisation)
            const { value: currentValue, selectionStart, selectionEnd } = element;
            
            // Construire la nouvelle valeur toujours de la même façon
            const newValue = currentValue.substring(0, selectionStart) + 
                             text + 
                             currentValue.substring(selectionEnd);
            
            // Calculer la nouvelle position du curseur une seule fois
            const newCursorPosition = selectionStart + text.length;
            
            // Stratégie d'insertion basée sur la taille (optimisation pour grands volumes)
            const isLongText = text.length > 1000 || currentValue.length > 10000;
            
            if (isLongText) {
                // Désactiver temporairement pour éviter le traitement pendant les modifications
                element.disabled = true;
                
                // Utiliser requestAnimationFrame pour synchroniser avec le cycle de rendu
                requestAnimationFrame(() => {
                    try {
                        // Appliquer les changements dans le prochain cycle de peinture
                        element.value = newValue;
                        // Placer le curseur à la fin du texte sans sélectionner
                        element.selectionStart = newCursorPosition;
                        element.selectionEnd = newCursorPosition;
                        
                        // Réactiver et refocaliser
                        element.disabled = false;
                        element.focus();
                        
                        // Créer un seul événement et le réutiliser
                        const inputEvent = new Event('input', { bubbles: true });
                        
                        // Utiliser un délai minimal pour permettre au navigateur de terminer le rendu
                        setTimeout(() => element.dispatchEvent(inputEvent), 0);
                    } catch (innerError) {
                        console.error("Error in deferred text insertion:", innerError);
                        // S'assurer que l'élément est toujours réactivé
                        element.disabled = false;
                    }
                });
            } else {
                // Approche directe pour les textes courts
                element.value = newValue;
                // Placer le curseur à la fin du texte sans sélectionner
                element.selectionStart = newCursorPosition;
                element.selectionEnd = newCursorPosition;
                element.dispatchEvent(new Event('input', { bubbles: true }));
            }
            
            return true;
        } catch (error) {
            console.error("Error inserting text into input:", error);
            
            // Toujours s'assurer que l'élément est réactivé en cas d'erreur
            if (element?.disabled) {
                element.disabled = false;
            }
            
            return false;
        }
    }

    /**
     * Affiche la transcription dans une boîte de dialogue flottante
     * @param {string} text - Le texte à afficher
     * @param {number} duration - Durée d'affichage en secondes
     */
    function showTranscriptionDialog(text, duration) {
        // Utiliser la fonction utilitaire pour afficher le texte dans une boîte de dialogue
        window.BabelFishAIUtils.ui.showTextInDialog(
            text,
            duration,
            (errorMessage) => showBanner(errorMessage, MESSAGE_TYPES.ERROR)
        );
    }

    /**
     * Crée un bouton de contrôle pour la bannière avec icône et texte
     * @param {string} id - ID du bouton
     * @param {string} icon - Icône HTML à afficher (ex: '✨')
     * @param {string} defaultText - Texte par défaut du bouton
     * @param {string} i18nKey - Clé de traduction pour le texte du bouton
     * @returns {HTMLButtonElement} Le bouton créé
     */
    function createBannerButton(id, icon, defaultText, i18nKey) {
        // Créer le bouton
        const button = document.createElement('button');
        button.id = id;
        button.className = 'whisper-toggle-button';
        button.setAttribute('data-active', 'false');
        
        // Ajouter l'icône
        const iconSpan = document.createElement('span');
        iconSpan.className = 'whisper-button-icon';
        iconSpan.innerHTML = icon;
        button.appendChild(iconSpan);
        
        // Ajouter le texte
        const textSpan = document.createElement('span');
        textSpan.className = 'whisper-button-text';
        textSpan.textContent = defaultText;
        button.appendChild(textSpan);
        
        // Fonction pour mettre à jour le libellé avec la traduction
        const updateButtonLabel = () => {
            const translated = window.BabelFishAIUtils?.i18n?.getMessage(i18nKey);
            if (translated) {
                // Enlever le mot "Activer" ou "Enable" du début
                const simplifiedText = translated
                    .replace(/^Activer (la )?/i, '')
                    .replace(/^Enable /i, '');
                textSpan.textContent = simplifiedText;
            }
        };
        
        // Mettre à jour immédiatement et lors du chargement de i18n
        updateButtonLabel();
        document.addEventListener('babelfishai:i18n-loaded', updateButtonLabel);
        
        return button;
    }
    
    /**
     * Crée un sélecteur de langue pour la bannière
     * @returns {Object} Un objet contenant le conteneur et le sélecteur
     */
    function createLanguageSelector() {
        // Créer le conteneur
        const container = document.createElement('div');
        container.className = 'whisper-language-container';
        container.style.display = 'none';
        
        // Créer le libellé
        const label = document.createElement('span');
        label.className = 'whisper-language-label';
        label.textContent = 'Langue cible:';  // Texte par défaut
        container.appendChild(label);
        
        // Mettre à jour le libellé avec i18n
        const updateLabel = () => {
            const translated = window.BabelFishAIUtils?.i18n?.getMessage("targetLanguageLabel");
            if (translated) label.textContent = translated;
        };
        
        
        updateLabel();
        document.addEventListener('babelfishai:i18n-loaded', updateLabel);
        
        // Créer le sélecteur
        const select = document.createElement('select');
        select.id = 'whisper-language-select';
        select.className = 'whisper-language-select';
        container.appendChild(select);
        
        return { container, select, label };
    }
    
    /**
     * Initialise le sélecteur de langues avec les options disponibles
     * @param {HTMLSelectElement} languageSelect - L'élément select à initialiser
     */
    function initializeLanguageSelector(languageSelect) {
        // Récupérer les options des langues
        chrome.runtime.sendMessage({ action: 'getTargetLanguageOptions' }, response => {
            if (response?.options) {
                populateLanguageSelect(languageSelect, response.options);
            } else {
                // Fallback: utiliser le module languages ou charger depuis le stockage
                populateLanguageFromStorage(languageSelect);
            }
        });
    }
    
    /**
     * Remplit le sélecteur de langues avec les options fournies
     * @param {HTMLSelectElement} select - Le sélecteur à remplir
     * @param {Array} options - Les options de langues
     */
    function populateLanguageSelect(select, options) {
        chrome.storage.sync.get({ targetLanguage: 'en' }, (items) => {
            // Vider d'abord le sélecteur
            select.innerHTML = '';
            
            // Ajouter les options
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                select.appendChild(optionElement);
            });
            
            // Sélectionner la langue active
            select.value = items.targetLanguage;
        });
    }
    
    /**
     * Remplit le sélecteur de langues à partir du module languages ou en fallback
     * @param {HTMLSelectElement} select - Le sélecteur à remplir
     */
    function populateLanguageFromStorage(select) {
        if (window.BabelFishAIUtils?.languages) {
            chrome.storage.sync.get({ targetLanguage: 'en' }, (items) => {
                window.BabelFishAIUtils.languages.populateLanguageSelect(select, items.targetLanguage);
            });
        } else {
            // Fallback avec les langues codées en dur
            chrome.storage.sync.get({ targetLanguage: 'en' }, (items) => {
                // Vider le sélecteur
                select.innerHTML = '';
                
                // Langues disponibles
                const displayNames = {
                    'en': 'English (en)',
                    'fr': 'Français (fr)',
                    'es': 'Español (es)',
                    'pt': 'Português (pt)',
                    'zh': '中文 (zh)',
                    'hi': 'हिंदी (hi)',
                    'ar': 'العربية (ar)',
                    'it': 'Italiano (it)',
                    'de': 'Deutsch (de)',
                    'sv': 'Svenska (sv)',
                    'pl': 'Polski (pl)',
                    'nl': 'Nederlands (nl)',
                    'ro': 'Română (ro)',
                    'ja': '日本語 (ja)',
                    'ko': '한국어 (ko)'
                };
                
                // Ajouter chaque option
                Object.entries(displayNames).forEach(([code, name]) => {
                    const option = document.createElement('option');
                    option.value = code;
                    option.textContent = name;
                    select.appendChild(option);
                });
                
                // Sélectionner la langue active
                select.value = items.targetLanguage;
            });
        }
    }
    
    /**
     * Configure les gestionnaires d'événements pour les contrôles de la bannière
     * @param {HTMLButtonElement} rephraseButton - Bouton de reformulation
     * @param {HTMLButtonElement} translateButton - Bouton de traduction
     * @param {HTMLSelectElement} languageSelect - Sélecteur de langue
     * @param {HTMLElement} languageContainer - Conteneur du sélecteur de langue
     */
    function setupBannerEventListeners(rephraseButton, translateButton, languageSelect, languageContainer) { // skipcq: JS-0128
        // Événements pour le bouton de reformulation
        rephraseButton.addEventListener('mousedown', storeFocusAndSelection);
        rephraseButton.addEventListener('click', () => {
            const isActive = rephraseButton.getAttribute('data-active') === 'true';
            const newState = !isActive;
            
            chrome.storage.sync.set({ enableRephrase: newState }, () => {
                setTimeout(() => restoreFocusAndSelection(true, true), 300);
            });
            
            console.log(`Reformulation ${newState ? "activée" : "désactivée"} depuis le bandeau`);
        });
        
        // Événements pour le bouton de traduction
        translateButton.addEventListener('mousedown', storeFocusAndSelection);
        translateButton.addEventListener('click', () => {
            const isActive = translateButton.getAttribute('data-active') === 'true';
            const newState = !isActive;
            
            chrome.storage.sync.set({ enableTranslation: newState }, () => {
                setTimeout(() => restoreFocusAndSelection(true, true), 300);
            });
            
            console.log(`Traduction ${newState ? "activée" : "désactivée"} depuis le bandeau`);
        });
        
        // Événements pour le sélecteur de langue
        languageSelect.addEventListener('mousedown', storeFocusAndSelection);
        languageSelect.addEventListener('change', () => {
            chrome.storage.sync.set({ targetLanguage: languageSelect.value }, () => {
                setTimeout(() => restoreFocusAndSelection(true, true), 300);
            });
            
            console.log(`Langue cible changée en ${languageSelect.value} depuis le bandeau`);
        });
        
        languageSelect.addEventListener('blur', () => {
            setTimeout(() => {
                if (lastFocusInfo.element) {
                    restoreFocusAndSelection(true, true);
                }
            }, 300);
        });
    }
    
    /**
     * Initialise la bannière d'état avec des contrôles pour la reformulation et la traduction
     * @returns {HTMLElement} La bannière créée
     */
    function initBanner() {
        // Vérifier si la bannière existe déjà
        if (recordingBanner && document.body.contains(recordingBanner)) {
            return recordingBanner;
        }

        // Créer la structure de base de la bannière
        recordingBanner = document.createElement('div');
        recordingBanner.id = 'babelfishai-status-banner';
        recordingBanner.className = 'whisper-status-banner';
        recordingBanner.style.display = 'none';
        recordingBanner.setAttribute('data-extension', 'babelfishai');

        // Créer le conteneur pour tous les éléments
        const bannerContent = document.createElement('div');
        bannerContent.className = 'whisper-banner-content';
        recordingBanner.appendChild(bannerContent);
        
        // Créer le conteneur pour le texte du statut
        const statusTextContainer = document.createElement('div');
        statusTextContainer.className = 'whisper-status-text';
        bannerContent.appendChild(statusTextContainer);
        
        // Créer le conteneur pour les contrôles
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'whisper-controls-container';
        bannerContent.appendChild(controlsContainer);

        // Créer les boutons de contrôle
        const rephraseControl = createBannerButton(
            'whisper-rephrase-control', 
            '✨', 
            'Reformulation', 
            'rephraseLabel'
        );
        controlsContainer.appendChild(rephraseControl);
        
        const translationControl = createBannerButton(
            'whisper-translation-control', 
            '🌐', 
            'Traduction', 
            'enableTranslationLabel'
        );
        controlsContainer.appendChild(translationControl);

        // Créer le sélecteur de langue
        const { container: languageContainer, select: languageSelect } = createLanguageSelector();
        controlsContainer.appendChild(languageContainer);
        
        // Initialiser le sélecteur de langues
        initializeLanguageSelector(languageSelect);
        
        // Charger les préférences et configurer l'état initial des contrôles
        chrome.storage.sync.get({
            enableRephrase: false,
            enableTranslation: false,
            targetLanguage: 'en'
        }, (items) => {
            // Mettre à jour l'état visuel des boutons
            rephraseControl.setAttribute('data-active', items.enableRephrase.toString());
            translationControl.setAttribute('data-active', items.enableTranslation.toString());
            
            // Mettre à jour la valeur du sélecteur de langue
            languageSelect.value = items.targetLanguage;
            
            // Configurer la visibilité du conteneur de langue
            if (items.enableTranslation) {
                languageContainer.style.display = 'flex';
                languageContainer.style.opacity = '1';
                languageContainer.style.maxHeight = '30px';
                languageContainer.style.overflow = 'visible';
            } else {
                languageContainer.style.display = 'none';
                languageContainer.style.opacity = '0';
                languageContainer.style.maxHeight = '0';
                languageContainer.style.overflow = 'hidden';
            }
        });

        // Configurer les gestionnaires d'événements
        setupBannerEventListeners(rephraseControl, translationControl, languageSelect, languageContainer);

        // Insérer la bannière dans le document
        if (document.body) {
            document.body.insertBefore(recordingBanner, document.body.firstChild);
            document.body.style.paddingTop = '35px';
            updateBannerColor(true);
        } else {
            // Si document.body n'est pas encore disponible
            document.addEventListener('DOMContentLoaded', () => {
                document.body.insertBefore(recordingBanner, document.body.firstChild);
                document.body.style.paddingTop = '35px';
                updateBannerColor(true);
            });
        }

        return recordingBanner;
    }

    // Initialiser la bannière
    initBanner();

    /**
     * Affiche la bannière avec un message en utilisant la structure de notre bannière personnalisée
     * @param {string} text - Le message à afficher
     * @param {string} type - Le type de message ('info' ou 'error')
     * @returns {boolean} - Indique si l'affichage a réussi
     */
    function showBanner(text, type = MESSAGE_TYPES.INFO) {
        // Utiliser la fonction de l'utilitaire UI pour afficher la bannière
        return window.BabelFishAIUtils.ui.showBanner(
            recordingBanner, 
            text, 
            type, 
            isRecording, 
            updateBannerColor
        );
    }

    /**
     * Cache la bannière en modifiant son style d'affichage
     * @returns {boolean} - Indique si l'opération a réussi
     */
    function hideBanner() {
        try {
            // Vérifier si la bannière existe
            if (!recordingBanner) {
                return false;
            }

            // Cacher la bannière en modifiant son style d'affichage
            recordingBanner.style.display = 'none';
            
            // Enlever le padding du body quand la bannière est cachée
            if (document.body) {
                document.body.style.paddingTop = '0';
            }
            
            return true;
        } catch (error) {
            console.error("Error hiding banner:", error);
            return false;
        }
    }

    /**
     * Gère les erreurs de manière centralisée en affichant un message à l'utilisateur
     * et en informant le background script
     * @param {string|Error} displayMessage - Le message à afficher à l'utilisateur ou l'erreur complète
     * @param {string} [errorMessage] - Le message d'erreur technique à envoyer au background script
     */
    function handleError(displayMessage, errorMessage) {
        // Normaliser les paramètres pour gérer différents types d'entrées
        let userMessage = '';
        let technicalMessage = '';

        // Si l'erreur est fournie comme objet Error
        if (displayMessage instanceof Error) {
            userMessage = displayMessage.message || window.BabelFishAIUtils.i18n.getMessage("bannerErrorGeneric");
            technicalMessage = displayMessage.stack || displayMessage.message;
        }
        // Si l'erreur est fournie comme chaîne de caractères
        else {
            userMessage = displayMessage || window.BabelFishAIUtils.i18n.getMessage("bannerErrorGeneric");
            technicalMessage = errorMessage || displayMessage;
        }

        // Logger l'erreur technique pour le débogage
        console.error("Erreur technique:", technicalMessage);

        // Afficher le message d'erreur à l'utilisateur via la bannière
        showBanner(userMessage, MESSAGE_TYPES.ERROR);

        // Informer le background script de l'erreur pour mise à jour du badge
        try {
            chrome.runtime.sendMessage({
                action: ACTIONS.ERROR,
                error: technicalMessage
            });
        } catch (e) {
            console.error("Impossible d'envoyer l'erreur au script d'arrière-plan:", e);
        }

        // Cacher automatiquement la bannière après un délai défini
        setTimeout(hideBanner, CONFIG.ERROR_BANNER_DURATION);
    }

    /**
     * Gère les messages provenant du script d'arrière-plan
     * @param {Object} message - Le message reçu
     * @param {Object} sender - L'expéditeur du message
     * @param {Function} callback - Fonction de callback pour répondre au message
     */
    function handleBackgroundMessages(message) {

        // Mapper les actions aux fonctions correspondantes
        const actionHandlers = {
            [ACTIONS.TOGGLE]: () => {
                if (!isRecording) {
                    startRecording();
                } else {
                    stopRecording();
                }
            }
            // Possibilité d'ajouter d'autres gestionnaires d'actions ici
        };

        // Exécuter le gestionnaire correspondant à l'action
        if (message.action && actionHandlers[message.action]) {
            actionHandlers[message.action]();
        }
    }

    // Écouter les messages du background script
    chrome.runtime.onMessage.addListener(handleBackgroundMessages);
    
    /**
     * Gère les événements clavier pour l'extension
     * @param {KeyboardEvent} event - L'événement clavier
     */
    function handleKeyboardEvents(event) {
        // La touche Échap (code 27) pour annuler l'enregistrement
        if (event.key === 'Escape' && isRecording) {
            console.log("Touche Échap détectée pendant l'enregistrement, annulation...");
            cancelRecording();
            // Empêcher les gestionnaires d'événements par défaut et la propagation
            event.preventDefault();
            event.stopPropagation();
        }
    }
    
    // Ajouter l'écouteur d'événement pour les touches du clavier
    document.addEventListener('keydown', handleKeyboardEvents);

    /**
     * Met à jour les options de couleur du bandeau
     * @param {Object} changes - Les changements dans les options
     */
    function updateBannerColorOptions(changes) {
        // Vérification rapide - si le bandeau n'est pas initialisé, inutile de continuer
        if (!recordingBanner) return;
        
        // Utilisation d'un mapping direct des propriétés aux variables, 
        // sans fonctions intermédiaires pour de meilleures performances
        const colorMappings = {
            bannerColorStart: false,
            bannerColorEnd: false,
            bannerOpacity: false
        };
        
        // Mettre à jour les valeurs en une seule passe
        for (const key in changes) {
            if (key === 'bannerColorStart') {
                bannerColorStart = changes[key].newValue;
                colorMappings.bannerColorStart = true;
            } else if (key === 'bannerColorEnd') {
                bannerColorEnd = changes[key].newValue;
                colorMappings.bannerColorEnd = true;
            } else if (key === 'bannerOpacity') {
                bannerOpacity = changes[key].newValue;
                colorMappings.bannerOpacity = true;
            }
        }
        
        // Vérifier si au moins une propriété de couleur a été modifiée
        const shouldUpdate = colorMappings.bannerColorStart || 
                             colorMappings.bannerColorEnd || 
                             colorMappings.bannerOpacity;
        
        // Mettre à jour la couleur une seule fois si nécessaire
        if (shouldUpdate) {
            updateBannerColor();
        }
    }

    /**
     * Gestionnaire centralisé pour les modifications du stockage
     * @param {Object} changes - Les changements détectés
     * @param {string} namespace - L'espace de noms du stockage
     */
    function handleStorageChanges(changes, namespace) {
        // Vérification rapide - ne traiter que les changements de stockage synchronisé
        if (namespace !== 'sync' || !recordingBanner) return;

        // Traiter les changements de couleur du bandeau
        updateBannerColorOptions(changes);

        // Cache des éléments DOM fréquemment utilisés - évite les accès DOM répétés
        const elements = {
            rephraseControl: null,
            translationControl: null,
            languageContainer: null,
            languageSelect: null
        };
        
        // Fonction pour récupérer paresseusement un élément (le trouve une seule fois)
        const getElement = (key, selector) => {
            if (!elements[key]) {
                elements[key] = recordingBanner.querySelector(selector);
            }
            return elements[key];
        };
        
        // Liste des changements à traiter en une seule passe
        const handlersMap = {
            // Gestion de l'état de reformulation
            enableRephrase: (newValue) => {
                const control = getElement('rephraseControl', '#whisper-rephrase-control');
                if (control) {
                    control.setAttribute('data-active', String(newValue));
                }
            },
            
            // Gestion de l'état de traduction et visibilité du sélecteur de langue
            enableTranslation: (newValue) => {
                const control = getElement('translationControl', '#whisper-translation-control');
                const container = getElement('languageContainer', '.whisper-language-container');
                
                if (control) {
                    control.setAttribute('data-active', String(newValue));
                    
                    if (container) {
                        // Animation optimisée avec requestAnimationFrame
                        if (newValue) {
                            // Montrer le conteneur de langue
                            container.style.display = 'flex';
                            
                            // Utiliser rAF pour grouper les changements visuels
                            requestAnimationFrame(() => {
                                container.style.opacity = '1';
                                container.style.maxHeight = '30px';
                                container.style.overflow = 'visible';
                            });
                        } else {
                            // Cacher le conteneur de langue avec transition
                            container.style.opacity = '0';
                            container.style.maxHeight = '0';
                            container.style.overflow = 'hidden';
                            
                            // Masquer complètement après l'animation
                            setTimeout(() => {
                                container.style.display = 'none';
                            }, 300);
                        }
                    }
                }
            },
            
            // Mise à jour de la langue cible sélectionnée
            targetLanguage: (newValue) => {
                const select = getElement('languageSelect', '#whisper-language-select');
                
                // Mettre à jour uniquement si nécessaire (valeur différente)
                if (select && select.value !== newValue) {
                    select.value = newValue;
                }
            },
            
            // Gestion des changements de langue d'interface
            interfaceLanguage: (newValue) => {
                if (window.BabelFishAIUtils?.i18n) {
                    window.BabelFishAIUtils.i18n.changeLanguage(newValue)
                        .then(() => {
                            // Déclencher l'événement en réutilisant l'objet CustomEvent
                            document.dispatchEvent(new CustomEvent('babelfishai:i18n-loaded'));
                        })
                        .catch(error => {
                            console.warn("Erreur lors du changement de langue:", error);
                        });
                }
            }
        };
        
        // Traiter tous les changements pertinents en une seule passe (plus efficace)
        for (const key in changes) {
            if (handlersMap[key]) {
                handlersMap[key](changes[key].newValue);
            }
        }
    }

    // Écouter les changements dans les options
    chrome.storage.onChanged.addListener(handleStorageChanges);
})();
