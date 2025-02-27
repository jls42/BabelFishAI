(async function () {
    if (window.__whisperContentScriptHasRun) return;
    window.__whisperContentScriptHasRun = true;

    // Importer i18n.js dynamiquement
    try {
        await import(chrome.runtime.getURL('src/utils/i18n.js'));
        // Initialisation après l'importation
        window.BabelFishAIUtils.i18n.init();
        console.log("Content script and i18n.js injected!");
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
     * Démarre l'enregistrement audio
     * @returns {Promise<boolean>} - Indique si l'enregistrement a démarré avec succès
     */
    async function startRecording() {
        // Réinitialiser les chunks audio
        audioChunks = [];

        // Variable pour stocker le flux audio
        let stream = null;

        try {
            // Vérifier si la clé API est configurée
            apiKey = await window.BabelFishAIUtils.api.getApiKey();
            // La vérification de la clé API est déjà effectuée dans la fonction getApiKey

            // Demander l'accès au microphone
            stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false // Explicitement refuser l'accès vidéo
            });

            // Créer et configurer le MediaRecorder
            mediaRecorder = new MediaRecorder(stream);
            setupMediaRecorderEvents(stream);

            // Démarrer l'enregistrement
            mediaRecorder.start();
            isRecording = true;

            // Informer l'utilisateur et le background script
            showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerRecording"));
            chrome.runtime.sendMessage({ action: ACTIONS.STARTED });

            return true;
        } catch (error) {
            console.error("Error accessing microphone or API key:", error);

            // Gérer les différents types d'erreurs
            let errorMessage;
            if (error.message === ERRORS.API_KEY_NOT_FOUND) {
                errorMessage = ERRORS.API_KEY_NOT_FOUND;
            } else if (error.name === 'NotAllowedError') {
                errorMessage = window.BabelFishAIUtils.i18n.getMessage("bannerMicAccessError");
            } else {
                errorMessage = ERRORS.MIC_ACCESS_ERROR;
            }

            // Afficher l'erreur et informer le background script
            handleError(errorMessage, error.message);

            // Réinitialiser l'état et nettoyer les ressources
            isRecording = false;

            // Libérer le flux audio si disponible
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

            return false;
        }
    }

    /**
     * Traite l'audio enregistré
     * @param {Blob} audioBlob - Le blob audio à traiter
     * @returns {Promise<void>}
     */
    async function processRecordedAudio(audioBlob) {
        try {
            // Informer l'utilisateur que la transcription est en cours
            showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerTranscribing"));

            // Transcrire l'audio
            const transcription = await transcribeAudio(audioBlob);

            // Afficher la transcription
            await showTranscription(transcription);

            // Cacher la bannière une fois terminé
            hideBanner();
        } catch (error) {
            console.error("Error during transcription:", error);
            handleError(error.message, error.message);
        }
    }

    /**
     * Nettoie les ressources après l'enregistrement
     * @param {MediaStream} stream - Le flux audio à nettoyer
     */
    function cleanupRecordingResources(stream) {
        // Réinitialiser l'état d'enregistrement
        isRecording = false;

        // Informer le background script
        chrome.runtime.sendMessage({ action: ACTIONS.STOPPED });

        // Arrêter toutes les pistes du stream pour libérer les ressources
        if (stream && stream.getTracks) {
            stream.getTracks().forEach(track => track.stop());
        }

        // Réinitialiser les chunks audio pour libérer la mémoire
        if (audioChunks.length > 0) {
            audioChunks = [];
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
        
        // Événement déclenché lorsque des données audio sont disponibles
        mediaRecorder.ondataavailable = event => {
            if (event.data && event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        // Événement déclenché lorsque l'enregistrement est arrêté
        mediaRecorder.onstop = async () => {
            try {
                // Vérifier que des données audio ont été capturées
                if (audioChunks.length === 0) {
                    throw new Error("Aucune donnée audio capturée");
                }
                
                // Créer le blob audio à partir des chunks collectés
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                
                // Vérifier la taille du blob
                if (audioBlob.size === 0) {
                    throw new Error("Blob audio vide");
                }

                // Traiter l'audio enregistré
                await processRecordedAudio(audioBlob);
            } catch (error) {
                console.error('Erreur lors du traitement de l\'enregistrement:', error);
                handleError(error);
            } finally {
                // Nettoyer les ressources dans tous les cas
                cleanupRecordingResources(stream);
            }
        };
        
        // Gérer les erreurs du MediaRecorder
        mediaRecorder.onerror = error => {
            console.error('Erreur MediaRecorder:', error);
            handleError('Erreur d\'enregistrement', error.name || 'MediaRecorder error');
            cleanupRecordingResources(stream);
        };
    }

    /**
     * Arrête l'enregistrement en cours
     * @returns {boolean} - Indique si l'arrêt a été effectué
     */
    function stopRecording() {
        try {
            // Vérifier si le mediaRecorder existe et est en cours d'enregistrement
            if (mediaRecorder && mediaRecorder.state === 'recording') {
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

    // La fonction getApiKey a été remplacée par un appel direct à window.BabelFishAIUtils.api.getApiKey()

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
     * Récupère les options d'affichage depuis le stockage
     * @returns {Promise<Object>} Les options d'affichage et de traduction
     */
    async function getDisplayOptions() {
        return await window.BabelFishAIUtils.api.getFromStorage({
            activeDisplay: true,
            dialogDisplay: false,
            dialogDuration: CONFIG.DEFAULT_DIALOG_DURATION,
            enableTranslation: false,
            sourceLanguage: 'fr',
            targetLanguage: 'en',
            forcedDialogDomains: CONFIG.DEFAULT_FORCED_DIALOG_DOMAINS
        });
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

    // Utilisation de la fonction translateText de translation.js

    /**
     * Détermine le mode d'affichage et affiche le texte selon les options configurées
     * @param {string} text - Le texte à afficher
     * @param {Object} options - Les options d'affichage
     * @returns {Promise<boolean>} - Indique si l'affichage a réussi
     */
    async function displayTranscriptionText(text, options) {
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
            console.error(errorMsg + ':', text);
            handleError(errorMsg, "Invalid transcription text");
            return false;
        }

        try {
            // Informer l'utilisateur que le traitement est en cours
            showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerProcessing"));
            
            // Récupérer les options de configuration
            const options = await getDisplayOptions();

            // Traduire le texte si l'option est activée
            const displayText = await translateTextIfEnabled(text, options);

            // Afficher le texte selon les options configurées
            return await displayTranscriptionText(displayText, options);
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

            // Récupérer l'élément actif (sans stocker son contenu pour des raisons de sécurité)
            const activeElement = document.activeElement;

            // Vérifier si l'élément actif est valide
            if (!activeElement || activeElement.tagName === 'IFRAME') {
                return false;
            }

            // Nettoyer le texte en supprimant les espaces au début
            const cleanText = text.trimStart();

            // Déterminer le type d'élément actif
            const isTextarea = activeElement.tagName === 'TEXTAREA';
            const isTextInput = activeElement.tagName === 'INPUT' && activeElement.type === 'text';
            const isContentEditable = activeElement.isContentEditable;
            const isEditableElement = isTextarea || isTextInput || isContentEditable;

            // Si l'élément n'est pas éditable, abandonner l'insertion
            if (!isEditableElement) {
                return false;
            }

            // Insérer le texte selon le type d'élément
            if (isTextarea || isTextInput) {
                // Utiliser la fonction spécialisée pour les éléments input/textarea
                return insertTextIntoInput(activeElement, cleanText);
            } else if (isContentEditable) {
                // Insérer dans un élément contentEditable
                activeElement.focus();

                // Normaliser les sauts de ligne et espaces
                let finalText = cleanText.replace(/[\r\n]+/g, ' ').trim();

                // Utiliser execCommand pour l'insertion (compatible avec la plupart des navigateurs)
                document.execCommand('insertHTML', false, finalText);

                // Déclencher un événement input pour notifier les listeners
                activeElement.dispatchEvent(new Event('input', { bubbles: true }));

                return true;
            }

            return false;
        } catch (error) {
            console.error("Error inserting text into active element:", error);
            return false;
        }
    }

    /**
     * Insère du texte dans un élément input ou textarea
     * @param {HTMLInputElement|HTMLTextAreaElement} element - L'élément de saisie
     * @param {string} text - Le texte à insérer
     * @returns {boolean} - Indique si l'insertion a réussi
     */
    function insertTextIntoInput(element, text) {
        try {
            // Validation des paramètres
            if (!element || !text) {
                console.warn("Invalid element or text for insertion");
                return false;
            }

            // Vérifier si l'élément a les propriétés nécessaires pour être un input/textarea valide
            const hasRequiredProperties =
                typeof element.value === 'string' &&
                typeof element.selectionStart === 'number' &&
                typeof element.selectionEnd === 'number';

            if (!hasRequiredProperties) {
                console.warn("Element is not a valid input or textarea");
                return false;
            }

            // Récupérer la valeur actuelle et les positions de sélection
            const currentValue = element.value;
            const selectionStart = element.selectionStart;
            const selectionEnd = element.selectionEnd;

            // Construire la nouvelle valeur en insérant le texte à la position du curseur
            // ou en remplaçant la sélection actuelle
            const newValue =
                currentValue.substring(0, selectionStart) +
                text +
                currentValue.substring(selectionEnd);

            // Mettre à jour la valeur de l'élément
            element.value = newValue;

            // Positionner le curseur après le texte inséré
            const newCursorPosition = selectionStart + text.length;
            element.selectionStart = element.selectionEnd = newCursorPosition;

            // Déclencher un événement input pour notifier les listeners
            element.dispatchEvent(new Event('input', { bubbles: true }));

            return true;
        } catch (error) {
            console.error("Error inserting text into input:", error);
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
     * Initialise la bannière d'état
     * @returns {HTMLElement} La bannière créée
     */
    function initBanner() {
        // Vérifier si la bannière existe déjà
        if (recordingBanner && document.body.contains(recordingBanner)) {
            return recordingBanner;
        }
        
        // Créer la bannière
        recordingBanner = document.createElement('div');
        recordingBanner.id = 'babelfishai-status-banner'; // Ajouter un ID pour faciliter les références
        recordingBanner.className = 'whisper-status-banner';
        recordingBanner.style.display = 'none'; // Cacher le bandeau par défaut
        
        // Ajouter un attribut pour l'internationalisation
        recordingBanner.setAttribute('data-extension', 'babelfishai');
        
        // Ajouter la bannière au document
        if (document.body) {
            document.body.insertBefore(recordingBanner, document.body.firstChild);
            // Forcer la mise à jour de la couleur lors de l'initialisation
            updateBannerColor(true);
        } else {
            // Si le document.body n'est pas encore disponible, attendre qu'il le soit
            document.addEventListener('DOMContentLoaded', () => {
                document.body.insertBefore(recordingBanner, document.body.firstChild);
                updateBannerColor(true);
            });
        }
        
        return recordingBanner;
    }
    
    // Initialiser la bannière
    initBanner();

    /**
     * Affiche la bannière avec un message en utilisant la fonction de l'utilitaire UI
     * @param {string} text - Le message à afficher
     * @param {string} type - Le type de message ('info' ou 'error')
     * @returns {boolean} - Indique si l'affichage a réussi
     */
    function showBanner(text, type = MESSAGE_TYPES.INFO) {
        // Vérifier si la bannière existe
        if (!recordingBanner) {
            console.warn('Banner element is null or undefined');
            return false;
        }

        try {
            // Utiliser la fonction de l'utilitaire UI pour afficher la bannière
            window.BabelFishAIUtils.ui.showBanner(
                recordingBanner,
                text,
                type,
                isRecording
            );

            // Mettre à jour la couleur uniquement si ce n'est pas un message d'erreur
            // car les messages d'erreur ont leur propre style
            if (type !== MESSAGE_TYPES.ERROR) {
                updateBannerColor();
            }
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'affichage de la bannière:', error);
            return false;
        }
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
    function handleBackgroundMessages(message, sender, callback) {
        console.log("Message received:", message);
        
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
     * Met à jour les options de couleur du bandeau
     * @param {Object} changes - Les changements dans les options
     */
    function updateBannerColorOptions(changes) {
        let colorUpdated = false;

        // Objets à surveiller pour les changements
        const colorOptions = {
            bannerColorStart: value => { bannerColorStart = value; return true; },
            bannerColorEnd: value => { bannerColorEnd = value; return true; },
            bannerOpacity: value => { bannerOpacity = value; return true; }
        };

        // Parcourir tous les changements
        Object.keys(changes).forEach(key => {
            // Si le changement concerne une option de couleur, mettre à jour la variable correspondante
            if (colorOptions[key]) {
                colorUpdated = colorOptions[key](changes[key].newValue) || colorUpdated;
            }
        });

        // Mettre à jour la couleur du bandeau une seule fois si nécessaire
        if (colorUpdated && recordingBanner) {
            updateBannerColor();
        }
    }

    /**
     * Gestionnaire centralisé pour les modifications du stockage
     * @param {Object} changes - Les changements détectés
     * @param {string} namespace - L'espace de noms du stockage
     */
    function handleStorageChanges(changes, namespace) {
        if (namespace !== 'sync') return;
        
        // Traiter les changements de couleur du bandeau
        updateBannerColorOptions(changes);
        
        // Possibilité d'ajouter d'autres gestionnaires de changements ici
    }

    // Écouter les changements dans les options
    chrome.storage.onChanged.addListener(handleStorageChanges);
})();
