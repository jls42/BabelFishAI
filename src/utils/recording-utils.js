// Utilitaires d'enregistrement audio pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Variables internes au module
    let mediaRecorder = null;
    let audioChunks = [];
    let isRecording = false;
    let isRecordingCanceled = false; // Pour suivre si l'enregistrement a été annulé
    let apiKey = null;

    // Constantes
    const ACTIONS = {
        STARTED: 'recording_started',
        STOPPED: 'recording_stopped'
    };

    const ERRORS = {
        API_KEY_NOT_FOUND: "Clé API OpenAI non trouvée. Veuillez la configurer dans les options.",
        MIC_ACCESS_ERROR: "Impossible d'accéder au microphone. Veuillez vérifier les permissions."
    };

    const API_CONFIG = {
        DEFAULT_WHISPER_API_URL: 'https://api.openai.com/v1/audio/transcriptions',
        WHISPER_MODEL: 'whisper-1'
    };

    const CANCEL_MESSAGE = {
        RECORDING_CANCELED: window.BabelFishAIUtils.i18n?.getMessage("recordingCanceled") || "Enregistrement annulé (touche Échap)."
    };

    const MESSAGE_TYPES = {
        ERROR: 'error'
    };

    /**
     * Démarre l'enregistrement audio
     * @returns {Promise<boolean>} - Indique si le démarrage a réussi
     */
    async function startRecording() {
        // Réinitialiser les chunks audio immédiatement
        if (audioChunks.length > 0) {
            audioChunks.length = 0;
        }

        // Variable pour stocker le flux audio
        let stream = null;

        try {
            // 1. Vérifier la disponibilité de la clé API (nécessaire avant d'accéder au micro)
            apiKey = await window.BabelFishAIUtils.error.safeExecute(
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
            stream = await window.BabelFishAIUtils.error.safeExecute(
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

            // 5. Configurer les gestionnaires d'événements
            setupMediaRecorderEvents(stream);

            // 6. Mettre à jour l'état UI immédiatement (ne pas attendre le démarrage effectif)
            isRecording = true;

            // 7. Informer l'utilisateur via la bannière
            window.BabelFishAI.ui.showBanner(
                window.BabelFishAIUtils.i18n.getMessage("bannerRecording")
            );

            // 8. Informer le background script (opération asynchrone qui ne doit pas bloquer)
            window.BabelFishAIUtils.error.safeExecute(
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
            window.BabelFishAI.ui.handleError(errorMessage, error.message || error.toString());

            // Nettoyage complet en cas d'échec
            isRecording = false;

            // Libérer le flux audio si disponible
            if (stream) {
                window.BabelFishAIUtils.error.safeExecute(
                    () => stream.getTracks().forEach(track => track.stop()),
                    "Erreur lors de la libération des ressources audio"
                );
                stream = null;
            }

            return false;
        }
    }

    /**
     * Configure les événements du MediaRecorder
     * @param {MediaStream} stream - Le flux audio à configurer
     */
    function setupMediaRecorderEvents(stream) {
        if (!mediaRecorder) {
            console.error('MediaRecorder non initialisé');
            return;
        }

        // Configuration optimale pour l'enregistrement audio
        // Nous préférons des chunks plus petits pour un traitement plus fluide
        // et une meilleure gestion de la mémoire
        // Note: audioBitsPerSecond est une propriété en lecture seule, nous ne pouvons pas la modifier
        // après la création du MediaRecorder. Elle doit être spécifiée dans les options lors de la création.

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
            // S'assurer que isRecording est mis à false immédiatement
            isRecording = false;
            
            let audioBlob = null;

            try {
                // Sortie rapide en cas d'annulation (économie de traitement)
                if (isRecordingCanceled || (mediaRecorder && mediaRecorder.cancelProcessing)) {
                    console.log("Enregistrement annulé par l'utilisateur, audio non traité"); // skipcq: JS-0002
                    // Réinitialiser la variable d'annulation pour le prochain enregistrement
                    isRecordingCanceled = false;
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
                window.BabelFishAI.ui.handleError(error);
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
            
            // S'assurer que isRecording est mis à false immédiatement
            isRecording = false;

            // Formater le message d'erreur de manière cohérente
            const errorName = error?.name || 'MediaRecorder error';
            const errorMessage = error?.message || 'Erreur d\'enregistrement inconnue';

            // Afficher l'erreur à l'utilisateur
            window.BabelFishAI.ui.handleError('Erreur d\'enregistrement', `${errorName}: ${errorMessage}`);

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
     * Traite l'audio enregistré de manière optimisée
     * @param {Blob} audioBlob - Le blob audio à traiter
     * @returns {Promise<void>}
     */
    async function processRecordedAudio(audioBlob) {
        try {
            // Vérification rapide de la validité du blob audio
            if (!audioBlob || audioBlob.size <= 0 || audioBlob.type.indexOf('audio/') !== 0) {
                throw new Error("Blob audio invalide ou vide");
            }

            // 1. Informer l'utilisateur que la transcription est en cours
            await window.BabelFishAIUtils.error.safeExecute(
                () => window.BabelFishAI.ui.showBanner(
                    window.BabelFishAIUtils.i18n.getMessage("bannerTranscribing")
                ),
                "Erreur lors de l'affichage de la bannière de transcription"
            );

            // 2. Transcrire l'audio avec une gestion optimisée des erreurs
            const transcription = await window.BabelFishAIUtils.error.safeExecute(
                () => transcribeAudio(audioBlob),
                "Erreur lors de la transcription audio"
            );

            // Vérification rapide du résultat avant de continuer
            if (!transcription || typeof transcription !== 'string' || transcription.trim() === '') {
                throw new Error("Résultat de transcription vide ou invalide");
            }

            // 3. Afficher la transcription (avec les éventuelles opérations de traduction/reformulation)
            await window.BabelFishAIUtils.error.safeExecute(
                () => window.BabelFishAI.ui.showTranscription(transcription),
                "Erreur lors de l'affichage de la transcription"
            );

            // 4. Cacher la bannière une fois toutes les opérations terminées avec succès
            await window.BabelFishAIUtils.error.safeExecute(
                () => window.BabelFishAI.ui.hideBanner(),
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

            window.BabelFishAI.ui.handleError(userMessage, error.message || error.toString());

            // Assurer que la bannière d'erreur est visible même en cas d'erreur dans hideBanner
            try {
                window.BabelFishAI.ui.showBanner(userMessage, window.BabelFishAIConstants.MESSAGE_TYPES.ERROR);
            } catch (e) {
                console.error("Erreur lors de l'affichage de la bannière d'erreur:", e);
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
        // Réinitialiser l'état d'enregistrement immédiatement
        isRecording = false;

        // 1. Informer le background script - Opération asynchrone qui ne doit pas bloquer
        window.BabelFishAIUtils.error.safeExecute(() => {
            chrome.runtime.sendMessage({
                action: ACTIONS.STOPPED,
                canceled: wasCanceled === true
            });
        }, "Impossible d'envoyer le message d'arrêt au background", { propagateError: false, isAsync: false });

        // 2. Arrêter toutes les pistes audio du flux
        if (stream && typeof stream.getTracks === 'function') {
            try {
                stream.getTracks().forEach(track => {
                    if (track.readyState === 'live') {
                        track.stop();
                    }
                });
            } catch (e) {
                console.error("Erreur lors de l'arrêt des pistes audio:", e);
            }
        }

        // 3. Réinitialiser les références
        mediaRecorder = null;
        audioChunks = [];
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
                // Mettre à jour l'état d'enregistrement immédiatement
                isRecording = false;
                
                // Si on annule, on stocke cette information pour éviter le traitement dans l'événement onstop
                if (cancelProcessing && mediaRecorder) {
                    mediaRecorder.cancelProcessing = true;
                    
                    // En cas d'annulation, vider les chunks audio immédiatement
                    if (isRecordingCanceled) {
                        audioChunks = [];
                    }

                    // Afficher un message d'annulation dans le bandeau
                    // Le message sera masqué automatiquement par le setTimeout dans cancelRecording()
                    if (window.BabelFishAI && window.BabelFishAI.ui && typeof window.BabelFishAI.ui.showBanner === 'function') {
                        // Utiliser la fonction showBanner exposée dans l'espace de noms global
                        window.BabelFishAI.ui.showBanner(CANCEL_MESSAGE.RECORDING_CANCELED, MESSAGE_TYPES.INFO);
                    } else {
                        // Fallback si la fonction showBanner n'est pas disponible
                        const recordingBanner = document.querySelector('#whisper-recording-banner');
                        if (recordingBanner) {
                            const statusText = recordingBanner.querySelector('.whisper-status-text');
                            if (statusText) {
                                statusText.textContent = CANCEL_MESSAGE.RECORDING_CANCELED;
                            } else {
                                recordingBanner.textContent = CANCEL_MESSAGE.RECORDING_CANCELED;
                            }
                            recordingBanner.style.display = 'block';
                        }
                    }

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
            window.BabelFishAI.ui.handleError("Erreur lors de l'arrêt de l'enregistrement", error.message);
            // Mettre à jour l'état d'enregistrement même en cas d'erreur
            isRecording = false;
            return false;
        }
    }

    /**
     * Annule l'enregistrement en cours sans traiter l'audio
     * @returns {boolean} - Indique si l'annulation a réussi
     */
    function cancelRecording() {
        if (isCurrentlyRecording()) {
            // Définir la variable d'annulation pour éviter le traitement de l'audio
            isRecordingCanceled = true;
            
            // Restaurer immédiatement le focus avant même d'arrêter l'enregistrement
            window.BabelFishAIUtils.focus.restoreFocusAndSelection(true, true);

            const result = stopRecording(true);

            // Cacher automatiquement la bannière après 1 seconde
            setTimeout(() => {
                // Utiliser la fonction hideBanner exposée dans l'espace de noms global si disponible
                if (window.BabelFishAI && window.BabelFishAI.ui && typeof window.BabelFishAI.ui.hideBanner === 'function') {
                    window.BabelFishAI.ui.hideBanner();
                    console.log("Bandeau masqué après annulation d'enregistrement (via UI)"); // skipcq: JS-0002
                } else {
                    // Fallback si la fonction hideBanner n'est pas disponible
                    const recordingBanner = document.querySelector('#whisper-recording-banner');
                    if (recordingBanner) {
                        recordingBanner.style.display = 'none';
                        console.log("Bandeau masqué après annulation d'enregistrement (direct)"); // skipcq: JS-0002
                    }
                }
                
                // S'assurer que le focus est toujours restauré après avoir caché la bannière
                setTimeout(() => {
                    window.BabelFishAIUtils.focus.restoreFocusAndSelection(true, true);
                }, 100);
            }, 1000);

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
        try {
            // Récupérer la clé API depuis le stockage
            const apiKey = await window.BabelFishAIUtils.api.getApiKey();
            if (!apiKey) {
                const errorMsg = ERRORS.API_KEY_NOT_FOUND;
                window.BabelFishAI.ui.handleError(errorMsg, errorMsg);
                throw new Error(errorMsg);
            }

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

    // Vérifier si l'enregistrement est en cours
    function isCurrentlyRecording() {
        return isRecording;
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.recording = {
        startRecording,
        stopRecording,
        cancelRecording,
        isCurrentlyRecording,
        // Fonctions internes exposées pour les tests
        _transcribeAudio: transcribeAudio,
        _processRecordedAudio: processRecordedAudio,
        _setupMediaRecorderEvents: setupMediaRecorderEvents,
        _cleanupRecordingResources: cleanupRecordingResources
    };

})(window.BabelFishAIUtils);
