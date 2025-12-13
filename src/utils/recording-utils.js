// Utilitaires d'enregistrement audio pour l'extension BabelFishAI
globalThis.BabelFishAIUtils = globalThis.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Variables internes au module
    let mediaRecorder = null;
    let audioChunks = [];
    let isRecording = false;
    let isRecordingCanceled = false; // Pour suivre si l'enregistrement a été annulé

    // Constantes
    const ACTIONS = {
        STARTED: 'recording_started',
        STOPPED: 'recording_stopped'
    };

    const ERRORS = {
        API_KEY_NOT_FOUND: "Clé API OpenAI non trouvée. Veuillez la configurer dans les options.",
        MIC_ACCESS_ERROR: "Impossible d'accéder au microphone. Veuillez vérifier les permissions."
    };

    // Note: API_CONFIG supprimé car non utilisé - la configuration est gérée par resolveApiConfig

    const CANCEL_MESSAGE = {
        RECORDING_CANCELED: globalThis.BabelFishAIUtils.i18n?.getMessage("recordingCanceled") || "Enregistrement annulé (touche Échap)."
    };

    const MESSAGE_TYPES = {
        ERROR: 'error'
    };

    /**
     * Démarre l'enregistrement audio
    /**
     * Récupère la clé API de manière asynchrone.
     * @returns {Promise<string>} La clé API.
     */
    async function getApiKey() { // skipcq: JS-0116 - Garder async pour cohérence de l'interface (retourne toujours une promesse).
        return globalThis.BabelFishAIUtils.error.safeExecute(
            () => globalThis.BabelFishAIUtils.api.getApiKey(),
            "Erreur lors de la récupération de la clé API"
        );
    }

    /**
     * Demande l'accès au microphone avec les contraintes spécifiées.
     * @param {Object} audioConstraints - Les contraintes audio.
     * @returns {Promise<MediaStream>} Le flux audio.
     */
    async function requestMicrophoneAccess(audioConstraints) {
        const stream = await globalThis.BabelFishAIUtils.error.safeExecute(
            () => navigator.mediaDevices.getUserMedia(audioConstraints),
            "Erreur lors de l'accès au microphone"
        );

        if (!stream || !stream.active) { // NOSONAR - S6582: La vérification avec || est idiomatique et sûre ici.
            throw new Error("Stream audio invalide ou inactif");
        }
        return stream;
    }

    /**
     * Crée et configure le MediaRecorder.
     * @param {MediaStream} stream - Le flux audio.
     * @param {Object} options - Les options du MediaRecorder.
     * @returns {MediaRecorder} L'objet MediaRecorder.
     */
    function createMediaRecorder(stream, options) {
        let recorder; // skipcq: JS-0119 - Initialisation dépend de la condition if/else.
        if (MediaRecorder.isTypeSupported(options.mimeType)) {
            recorder = new MediaRecorder(stream, options);
        } else {
            console.warn(`Format ${options.mimeType} non supporté, utilisation du format par défaut`);
            recorder = new MediaRecorder(stream); // Fallback au format par défaut
        }
        return recorder;
    }

    /**
     * Gère les erreurs survenues lors du démarrage de l'enregistrement.
     * @param {Error} error - L'erreur survenue.
     * @param {MediaStream} stream - Le flux audio (peut être null).
     */
    function handleRecordingStartError(error, stream) {
        console.error("Erreur lors du démarrage de l'enregistrement:", error);

        const errorMessages = {
            [ERRORS.API_KEY_NOT_FOUND]: ERRORS.API_KEY_NOT_FOUND,
            'NotAllowedError': globalThis.BabelFishAIUtils.i18n.getMessage("bannerMicAccessError"),
            'PermissionDeniedError': globalThis.BabelFishAIUtils.i18n.getMessage("bannerMicAccessError"),
            'NotFoundError': "Aucun microphone détecté sur cet appareil.",
            'NotReadableError': "Impossible d'accéder au microphone (périphérique occupé ou défaillant).",
            'AbortError': "Impossible d'accéder au microphone (périphérique occupé ou défaillant).",
            'default': ERRORS.MIC_ACCESS_ERROR
        };

        const errorMessage = errorMessages[error.name] || errorMessages[error.message] || errorMessages['default'];

        globalThis.BabelFishAI.ui.handleError(errorMessage, error.message || error.toString());

        isRecording = false;

        if (stream) {
            globalThis.BabelFishAIUtils.error.safeExecute(
                () => stream.getTracks().forEach(track => track.stop()),
                "Erreur lors de la libération des ressources audio"
            );
            stream = null;
        }
    }


    /**
     * Démarre l'enregistrement audio
     * @returns {Promise<boolean>} - Indique si le démarrage a réussi
     */
    async function startRecording() {
        if (audioChunks.length > 0) {
            audioChunks.length = 0;
        }

        let stream = null;

        try {
            // Vérifier que la clé API existe sans l'assigner à une variable
            const apiKey = await getApiKey();
            if (!apiKey) {
                throw new Error(ERRORS.API_KEY_NOT_FOUND);
            }

            const audioConstraints = {
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    sampleRate: 44100,
                    channelCount: 1
                },
                video: false
            };

            stream = await requestMicrophoneAccess(audioConstraints);

            const options = {
                mimeType: 'audio/webm;codecs=opus',
                audioBitsPerSecond: 128000
            };

            mediaRecorder = createMediaRecorder(stream, options);
            setupMediaRecorderEvents(stream);
            isRecording = true;

            globalThis.BabelFishAI.ui.showBanner(
                globalThis.BabelFishAIUtils.i18n.getMessage("bannerRecording")
            );

            globalThis.BabelFishAIUtils.error.safeExecute(
                () => chrome.runtime.sendMessage({ action: ACTIONS.STARTED }),
                "Impossible d'envoyer la notification de démarrage au background"
            );

            return true;

        } catch (error) {
            handleRecordingStartError(error, stream);
            return false;
        }
    }

    /**
     * Crée et valide un Blob audio à partir des chunks.
     * @param {Blob[]} chunks - Les morceaux de données audio.
     * @returns {Blob} Le Blob audio validé.
     * @throws {Error} Si aucune donnée n'est disponible ou si le Blob est invalide.
     */
    function createAndValidateAudioBlob(chunks) {
        // Vérification optimisée
        const hasAudioData = chunks.length > 0;
        if (!hasAudioData) {
            throw new Error("Aucune donnée audio capturée");
        }

        // Utilisation de propriétés optimales pour les blobs audio
        const blob = new Blob(chunks, {
            type: 'audio/webm;codecs=opus' // Spécifier le codec pour une meilleure compatibilité
        });

        // Vérification combinée de la présence et de la taille du blob
        if (!blob || blob.size <= 0) {
            throw new Error("Blob audio vide ou invalide");
        }

        return blob;
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

            let audioBlob = null; // Garder une référence pour le finally

            try {
                // Sortie rapide en cas d'annulation (économie de traitement)
                // Utilisation du chaînage optionnel pour cancelProcessing
                if (isRecordingCanceled || mediaRecorder?.cancelProcessing) {
                    console.log("Enregistrement annulé par l'utilisateur, audio non traité"); // skipcq: JS-0002
                    // Réinitialiser la variable d'annulation pour le prochain enregistrement
                    isRecordingCanceled = false;
                    return; // Sortie propre sans traitement
                }

                // Créer et valider le blob audio
                audioBlob = createAndValidateAudioBlob(audioChunks);

                // Traiter l'audio enregistré - passage du blob par référence
                await processRecordedAudio(audioBlob);

            } catch (error) {
                // Gérer les erreurs de createAndValidateAudioBlob et processRecordedAudio
                console.error('Erreur lors du traitement de l\'enregistrement:', error);
                globalThis.BabelFishAI.ui.handleError(error);
            } finally {
                // Libération proactive des ressources pour éviter les fuites mémoire
                // Même si audioBlob est null (erreur de création), la vérification est sûre
                if (audioBlob) {
                    // Aide le GC à libérer le blob plus rapidement
                    audioBlob = null;
                }

                // Nettoyer les ressources dans tous les cas (annulation, erreur, succès)
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
            globalThis.BabelFishAI.ui.handleError('Erreur d\'enregistrement', `${errorName}: ${errorMessage}`);

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
    function validateAudioBlob(blob) {
        if (!blob || blob.size <= 0 || blob.type.indexOf('audio/') !== 0) {
            throw new Error("Blob audio invalide ou vide");
        }
    }

    /**
     * Détermine le message d'erreur à afficher à l'utilisateur.
     * @param {Error} error - L'erreur survenue.
     * @returns {string} Le message d'erreur pour l'utilisateur.
     */
    function getUserErrorMessage(error) {
        if (error.name === 'AbortError') {
            return "Traitement audio annulé";
        }
        return globalThis.BabelFishAIUtils.i18n.getMessage("bannerTranscriptionError") || "Erreur pendant la transcription";
    }

    /**
     * Affiche la bannière d'erreur de manière sécurisée.
     * @param {string} message - Le message principal de la bannière.
     */
    function displayErrorBanner(message) {
        try {
            globalThis.BabelFishAI.ui.showBanner(message, globalThis.BabelFishAIConstants.MESSAGE_TYPES.ERROR);
        } catch (e) {
            console.error("Erreur lors de l'affichage de la bannière d'erreur:", e);
        }
    }

    /**
     * Traite l'audio enregistré de manière optimisée
     * @param {Blob} audioBlob - Le blob audio à traiter
     * @returns {Promise<void>}
     */
    async function processRecordedAudio(audioBlob) {
        try {
            // 1. Valider le blob audio
            validateAudioBlob(audioBlob);

            // 2. Informer l'utilisateur que la transcription est en cours
            await globalThis.BabelFishAIUtils.error.safeExecute(
                () => globalThis.BabelFishAI.ui.showBanner(
                    globalThis.BabelFishAIUtils.i18n.getMessage("bannerTranscribing")
                ),
                "Erreur lors de l'affichage de la bannière de transcription"
            );

            // 3. Transcrire et afficher
            await transcribeAndDisplayText(audioBlob);

        } catch (error) {
            // Gestion centralisée et cohérente des erreurs
            console.error("Erreur pendant le traitement audio:", error);

            const userMessage = getUserErrorMessage(error);
            const errorDetails = error.message || error.toString();

            // Gérer l'erreur (log interne, etc.)
            globalThis.BabelFishAI.ui.handleError(userMessage, errorDetails);

            // Afficher la bannière d'erreur à l'utilisateur
            displayErrorBanner(userMessage);

        } finally {
            // S'assurer que la référence au blob est libérée dans tous les cas
            // Note: audioBlob est passé par valeur, la modification ici n'affecte pas l'appelant,
            // mais c'est une bonne pratique de nettoyer les références locales si possible.
            // Cependant, dans ce cas, cela n'a pas d'effet réel sur la libération de la mémoire du blob original.
            // La vraie libération se fait quand l'appelant perd sa référence.
            // On pourrait envisager de ne pas avoir ce finally si audioBlob n'est pas réutilisé.
            // Pour l'instant, on le garde pour la clarté, mais son utilité est limitée.
            audioBlob = null;
        }
        // Pas besoin de return null explicite ici, une fonction async sans return renvoie implicitement Promise<undefined>
    }

    /**
    * Transcrit le blob audio et affiche le texte résultant
    * @param {Blob} audioBlob - Le blob audio à transcrire
    * @returns {Promise<void>}
    */
    async function transcribeAndDisplayText(audioBlob) {

        // 2. Transcrire l'audio avec une gestion optimisée des erreurs
        const transcription = await globalThis.BabelFishAIUtils.error.safeExecute(
            () => transcribeAudio(audioBlob),
            "Erreur lors de la transcription audio"
        );

        // Vérification rapide du résultat avant de continuer
        if (!transcription || typeof transcription !== 'string' || transcription.trim() === '') {
            throw new Error("Résultat de transcription vide ou invalide");
        }

        // 3. Afficher la transcription (avec les éventuelles opérations de traduction/reformulation)
        await globalThis.BabelFishAIUtils.error.safeExecute(
            () => globalThis.BabelFishAI.ui.showTranscription(transcription),
            "Erreur lors de l'affichage de la transcription"
        );

        // 4. Cacher la bannière une fois toutes les opérations terminées avec succès
        await globalThis.BabelFishAIUtils.error.safeExecute(
            () => globalThis.BabelFishAI.ui.hideBanner(),
            "Erreur lors de la dissimulation de la bannière"
        );
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
        globalThis.BabelFishAIUtils.error.safeExecute(() => {
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
            if (mediaRecorder?.state === 'recording') {
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
                    showCancellationBanner();

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
            globalThis.BabelFishAI.ui.handleError("Erreur lors de l'arrêt de l'enregistrement", error.message);
            // Mettre à jour l'état d'enregistrement même en cas d'erreur
            isRecording = false;
            return false;
        }
    }

    /**
    * Affiche le message d'annulation dans le bandeau, avec un fallback si nécessaire.
    */
    function showCancellationBanner() {
        // Utilisation du chaînage optionnel pour vérifier l'existence de la fonction showBanner
        if (typeof globalThis.BabelFishAI?.ui?.showBanner === 'function') {
            // Utiliser la fonction showBanner exposée dans l'espace de noms global
            globalThis.BabelFishAI.ui.showBanner(CANCEL_MESSAGE.RECORDING_CANCELED, MESSAGE_TYPES.INFO);
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
            globalThis.BabelFishAIUtils.focus.restoreFocusAndSelection(true, true);

            const result = stopRecording(true);

            // Cacher automatiquement la bannière après 1 seconde
            setTimeout(() => {
                // Utiliser la fonction hideBanner exposée dans l'espace de noms global si disponible
                // Utilisation du chaînage optionnel pour vérifier l'existence de la fonction hideBanner
                if (typeof globalThis.BabelFishAI?.ui?.hideBanner === 'function') {
                    globalThis.BabelFishAI.ui.hideBanner();
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
                    globalThis.BabelFishAIUtils.focus.restoreFocusAndSelection(true, true);
                }, 100);
            }, 1000);

            return result;
        }
        return false;
    }



    /**
     * Transcrit l'audio en texte via l'API de transcription en utilisant resolveApiConfig
     * Supporte multi-provider (OpenAI Whisper, Mistral Voxtral, etc.)
     * @param {Blob} audioBlob - Le blob audio à transcrire
     * @returns {Promise<string>} Le texte transcrit
     */
    async function transcribeAudio(audioBlob) {
        try {
            // Utiliser resolveApiConfig pour obtenir la config multi-provider
            const config = await globalThis.BabelFishAIUtils.api.resolveApiConfig('transcription');

            if (!config.apiKey) {
                const errorMsg = ERRORS.API_KEY_NOT_FOUND;
                globalThis.BabelFishAI.ui.handleError(errorMsg, errorMsg);
                throw new Error(errorMsg);
            }

            // eslint-disable-next-line no-console -- Debug log for provider diagnostics
            console.log('[Recording] Using transcription provider:', config.providerId, 'model:', config.model, 'url:', config.url);

            // Utiliser la fonction de l'API pour la transcription avec génération de nom de fichier unique
            const transcription = await globalThis.BabelFishAIUtils.api.transcribeAudio(
                audioBlob,
                config.apiKey,
                config.url,
                config.model,
                null, // Pas de nom de fichier spécifique
                true  // Générer un nom de fichier unique avec timestamp et partie aléatoire
            );

            return transcription;
        } catch (error) {
            console.error('Transcription error:', error);
            throw error;
        } finally {
            // Nettoyer les ressources spécifiques au module d'enregistrement
            if (Array.isArray(audioChunks)) {
                audioChunks.length = 0;
            }
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

})(globalThis.BabelFishAIUtils);
