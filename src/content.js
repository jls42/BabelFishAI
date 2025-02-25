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

    // Utilisation des constantes globales pour les états et actions
    const STATES = window.BabelFishAIConstants.STATES;
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

        // Initialisation des options de couleur du bandeau
        chrome.storage.sync.get({
            bannerColorStart: UI_CONFIG.DEFAULT_BANNER_COLOR_START,
            bannerColorEnd: UI_CONFIG.DEFAULT_BANNER_COLOR_END,
            bannerOpacity: UI_CONFIG.DEFAULT_BANNER_OPACITY
        }, (result) => {
            bannerColorStart = result.bannerColorStart;
            bannerColorEnd = result.bannerColorEnd;
            bannerOpacity = result.bannerOpacity;
            if (recordingBanner) {
                updateBannerColor();
            }
        });
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

        // Éviter de mettre à jour la couleur si la bannière est en mode erreur, sauf si force=true
        if (!force && recordingBanner.classList.contains('error')) return false;

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
        // Événement déclenché lorsque des données audio sont disponibles
        mediaRecorder.ondataavailable = event => {
            if (event.data && event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        // Événement déclenché lorsque l'enregistrement est arrêté
        mediaRecorder.onstop = async () => {
            // Créer le blob audio à partir des chunks collectés
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

            // Traiter l'audio enregistré
            await processRecordedAudio(audioBlob);

            // Nettoyer les ressources
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
     * Transcrit l'audio en texte via l'API Whisper
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
            // Récupérer l'URL de l'API et le modèle depuis le stockage
            const { apiUrl, audioModelType } = await new Promise((resolve) => {
                chrome.storage.sync.get({
                    apiUrl: API_CONFIG.DEFAULT_WHISPER_API_URL,
                    audioModelType: API_CONFIG.WHISPER_MODEL
                }, (result) => {
                    resolve({
                        apiUrl: result.apiUrl || API_CONFIG.DEFAULT_WHISPER_API_URL,
                        audioModelType: result.audioModelType
                    });
                });
            });

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
     * Récupère les options de configuration depuis le stockage
     * @returns {Promise<Object>} Les options de configuration
     */
    async function getDisplayOptions() {
        return new Promise(resolve => {
            chrome.storage.sync.get({
                activeDisplay: true,
                dialogDisplay: false,
                dialogDuration: CONFIG.DEFAULT_DIALOG_DURATION,
                enableTranslation: false,
                sourceLanguage: 'fr',
                targetLanguage: 'en',
                forcedDialogDomains: CONFIG.DEFAULT_FORCED_DIALOG_DOMAINS
            }, resolve);
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
     * Affiche la transcription selon les options configurées
     * @param {string} text - Le texte à afficher
     * @returns {Promise<boolean>} - Indique si l'affichage a réussi
     */
    /**
     * Détermine le mode d'affichage et affiche le texte
     * @param {string} text - Le texte à afficher
     * @param {Object} options - Les options d'affichage
     * @returns {Promise<boolean>} - Indique si l'affichage a réussi
     */
    async function displayTranscriptionText(text, options) {
        // Déterminer si l'affichage dans une boîte de dialogue est forcé pour ce domaine
        const currentDomain = window.location.hostname;
        const isDialogForced = options.forcedDialogDomains.some(domain =>
            currentDomain.includes(domain)
        );

        // Tenter d'insérer le texte dans l'élément actif si l'option est activée
        let displayed = false;
        if (options.activeDisplay && !isDialogForced) {
            displayed = handleActiveElementInsertion(text);
        }

        // Afficher dans une boîte de dialogue si nécessaire
        if (options.dialogDisplay || isDialogForced || !displayed) {
            showTranscriptionDialog(text, options.dialogDuration);
            displayed = true;
        }

        // Avertir si aucune méthode d'affichage n'est activée
        if (!displayed) {
            console.warn("No display method enabled");
            return false;
        }

        return true;
    }

    /**
     * Affiche la transcription selon les options configurées
     * @param {string} text - Le texte à afficher
     * @returns {Promise<boolean>} - Indique si l'affichage a réussi
     */
    async function showTranscription(text) {
        if (!text || typeof text !== 'string') {
            console.error('Invalid transcription text:', text);
            handleError("Texte de transcription invalide", "Invalid transcription text");
            return false;
        }

        try {
            // Récupérer les options de configuration
            const options = await getDisplayOptions();

            // Traduire le texte si l'option est activée
            const displayText = await translateTextIfEnabled(text, options);

            // Afficher le texte selon les options configurées
            return await displayTranscriptionText(displayText, options);
        } catch (error) {
            console.error('Error displaying transcription:', error);
            handleError("Erreur d'affichage", error.message);
            return false;
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
        // Récupérer ou créer le conteneur de la boîte de dialogue
        let container = document.getElementById('whisper-transcription-container');
        if (!container) {
            container = createTranscriptionContainer();
        }

        // Créer l'élément qui contiendra le texte de transcription
        const transcriptionElement = document.createElement('div');
        transcriptionElement.className = 'whisper-transcription-element';
        transcriptionElement.textContent = text;

        // Ajouter un bouton de copie pour permettre à l'utilisateur de copier le texte
        const copyButton = createCopyButton(text);
        transcriptionElement.appendChild(document.createElement('br'));
        transcriptionElement.appendChild(copyButton);

        // Ajouter l'élément de transcription au conteneur
        container.appendChild(transcriptionElement);

        // Configurer la suppression automatique après la durée spécifiée
        const autoRemoveTimeout = duration * 1000; // Convertir en millisecondes
        setTimeout(() => {
            removeTranscriptionElement(transcriptionElement);
        }, autoRemoveTimeout);
    }

    /**
     * Supprime un élément de transcription et nettoie le conteneur si nécessaire
     * @param {HTMLElement} transcriptionElement - L'élément de transcription à supprimer
     */
    function removeTranscriptionElement(transcriptionElement) {
        // Vérifier si l'élément existe toujours avant de le supprimer
        if (transcriptionElement.parentNode) {
            transcriptionElement.parentNode.removeChild(transcriptionElement);

            // Récupérer à nouveau le conteneur pour éviter les problèmes si le DOM a changé
            const currentContainer = document.getElementById('whisper-transcription-container');

            // Si le conteneur est vide (ne contient que le bouton de fermeture), on le supprime
            if (currentContainer && currentContainer.children.length === 1) {
                document.body.removeChild(currentContainer);
            }
        }
    }

    /**
     * Crée le conteneur pour les transcriptions avec un bouton de fermeture
     * @returns {HTMLElement} Le conteneur créé et ajouté au document
     */
    function createTranscriptionContainer() {
        // Créer le conteneur principal
        const container = document.createElement('div');
        container.id = 'whisper-transcription-container';
        container.className = 'whisper-transcription-container';

        // Créer le bouton de fermeture
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.className = 'whisper-close-button';
        closeButton.title = 'Fermer';

        // Ajouter un gestionnaire d'événements pour fermer le conteneur
        closeButton.onclick = () => {
            if (container.parentNode) {
                document.body.removeChild(container);
            }
        };

        // Ajouter le bouton au conteneur et le conteneur au document
        container.appendChild(closeButton);
        document.body.appendChild(container);

        return container;
    }

    /**
     * Crée un bouton de copie pour le texte
     * @param {string} text - Le texte à copier
     * @returns {HTMLElement} Le bouton créé
     */
    function createCopyButton(text) {
        return window.BabelFishAIUtils.ui.createCopyButton(
            text,
            (errorMessage) => showBanner(errorMessage, MESSAGE_TYPES.ERROR)
        );
    }

    /**
     * Initialise la bannière d'état
     */
    function initBanner() {
        recordingBanner = document.createElement('div');
        recordingBanner.className = 'whisper-status-banner';
        recordingBanner.style.display = 'none'; // Cacher le bandeau par défaut
        document.body.insertBefore(recordingBanner, document.body.firstChild);
        // Forcer la mise à jour de la couleur lors de l'initialisation
        updateBannerColor(true);
    }
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
     * @param {string} displayMessage - Le message à afficher à l'utilisateur
     * @param {string} errorMessage - Le message d'erreur technique à envoyer au background script
     */
    function handleError(displayMessage, errorMessage) {
        // Afficher le message d'erreur à l'utilisateur via la bannière
        showBanner(displayMessage, MESSAGE_TYPES.ERROR);

        // Informer le background script de l'erreur pour mise à jour du badge
        chrome.runtime.sendMessage({
            action: ACTIONS.ERROR,
            error: errorMessage
        });

        // Cacher automatiquement la bannière après un délai défini
        setTimeout(hideBanner, CONFIG.ERROR_BANNER_DURATION);
    }

    // Écouter les messages du background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("Message received:", request);
        if (request.action === ACTIONS.TOGGLE) {
            if (!isRecording) {
                startRecording();
            } else {
                stopRecording();
            }
        }
    });

    /**
     * Met à jour les options de couleur du bandeau
     * @param {Object} changes - Les changements dans les options
     */
    function updateBannerColorOptions(changes) {
        let colorUpdated = false;

        if (changes.bannerColorStart) {
            bannerColorStart = changes.bannerColorStart.newValue;
            colorUpdated = true;
        }
        if (changes.bannerColorEnd) {
            bannerColorEnd = changes.bannerColorEnd.newValue;
            colorUpdated = true;
        }
        if (changes.bannerOpacity) {
            bannerOpacity = changes.bannerOpacity.newValue;
            colorUpdated = true;
        }

        // Mettre à jour la couleur du bandeau une seule fois si nécessaire
        if (colorUpdated) {
            updateBannerColor();
        }
    }

    // Écouter les changements dans les options
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync') {
            updateBannerColorOptions(changes);
        }
    });
})();
