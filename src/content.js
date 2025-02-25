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

    // Initialisation de la clé API
    getApiKey().then(key => {
        apiKey = key;
    }).catch(error => {
        console.error("Failed to load API key:", error);
    });

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

    /**
     * Met à jour la couleur du bandeau
     */
    function updateBannerColor() {
        window.BabelFishAIUtils.ui.updateBannerColor(
            recordingBanner,
            bannerColorStart || UI_CONFIG.DEFAULT_BANNER_COLOR_START,
            bannerColorEnd || UI_CONFIG.DEFAULT_BANNER_COLOR_END,
            bannerOpacity
        );
    }

    /**
     * Démarre l'enregistrement audio
     */
    async function startRecording() {
        audioChunks = [];
        try {
            // Vérifier si la clé API est configurée
            apiKey = await getApiKey();
            // La vérification de la clé API est déjà effectuée dans la fonction getApiKey
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            setupMediaRecorderEvents(stream);
            mediaRecorder.start();
            isRecording = true;
            showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerRecording"));
            chrome.runtime.sendMessage({ action: ACTIONS.STARTED });
        } catch (error) {
            console.error("Error accessing microphone or API key:", error);
            if (error.message === ERRORS.API_KEY_NOT_FOUND) {
                showBanner(ERRORS.API_KEY_NOT_FOUND, MESSAGE_TYPES.ERROR);
            } else if (error.name === 'NotAllowedError') {
                showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerMicAccessError"), MESSAGE_TYPES.ERROR);
            }
            else {
                showBanner(ERRORS.MIC_ACCESS_ERROR, MESSAGE_TYPES.ERROR);
            }
            chrome.runtime.sendMessage({ action: ACTIONS.ERROR, error: error.message });
            isRecording = false;
            if (typeof stream !== 'undefined') {
                stream.getTracks().forEach(track => track.stop());
            }
            setTimeout(hideBanner, CONFIG.ERROR_BANNER_DURATION);
        }
    }

    /**
     * Configure les événements du MediaRecorder
     * @param {MediaStream} stream - Le flux audio
     */
    function setupMediaRecorderEvents(stream) {
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerTranscribing"));
            try {
                const transcription = await transcribeAudio(audioBlob);
                showTranscription(transcription);
                hideBanner();
            } catch (error) {
                console.error("Error during transcription:", error);
                showBanner(error.message, MESSAGE_TYPES.ERROR);
                setTimeout(hideBanner, CONFIG.ERROR_BANNER_DURATION);
                chrome.runtime.sendMessage({ action: ACTIONS.ERROR, error: error.message });
            }
            isRecording = false;
            chrome.runtime.sendMessage({ action: ACTIONS.STOPPED });
            stream.getTracks().forEach(track => track.stop());
        };
    }

    /**
     * Arrête l'enregistrement en cours
     */
    function stopRecording() {
        if (mediaRecorder?.state === 'recording') {
            mediaRecorder.stop();
        }
    }

    /**
     * Récupère la clé API depuis chrome.storage.sync
     * @returns {Promise<string>} La clé API
     */
    async function getApiKey() {
        try {
            return await window.BabelFishAIUtils.api.getApiKey();
        } catch (error) {
            console.error("API key not found or storage error:", error);
            return null; // Conserver le comportement original qui renvoie null en cas d'erreur
        }
    }

    /**
     * Transcrit l'audio en texte via l'API Whisper
     * @param {Blob} audioBlob - Le blob audio à transcrire
     * @returns {Promise<string>} Le texte transcrit
     */
    async function transcribeAudio(audioBlob) {
        if (!apiKey) {
            showBanner(ERRORS.API_KEY_NOT_FOUND, MESSAGE_TYPES.ERROR);
            throw new Error(ERRORS.API_KEY_NOT_FOUND);
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

            // Générer un nom de fichier avec timestamp et élément aléatoire pour une meilleure protection anti-cache
            const timestamp = Date.now();
            const randomPart = Math.random().toString(36).substring(2, 10); // Génère une chaîne aléatoire de 8 caractères
            const filename = `audio-${timestamp}-${randomPart}.webm`;

            // Utiliser la fonction améliorée de l'API pour la transcription
            // Passer directement le blob audio sans créer de copie inutile
            const transcription = await window.BabelFishAIUtils.api.transcribeAudio(
                audioBlob,
                apiKey,
                apiUrl,
                audioModelType,
                filename
            );

            return transcription;
        } catch (error) {
            console.error('Transcription error:', error);
            throw error;
        } finally {
            audioChunks = [];
            audioBlob = null;
        }
    }

    // Utilisation de la fonction translateText de translation.js

    /**
     * Affiche la transcription selon les options configurées
     * @param {string} text - Le texte à afficher
     */
    async function showTranscription(text) {
        try {
            const options = await new Promise(resolve => {
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

            let displayText = text;
            if (options.enableTranslation) {
                try {
                    showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerTranslating"));
                    console.log('Translation params:', {
                        text,
                        sourceLang: options.sourceLanguage,
                        targetLang: options.targetLanguage
                    });
                    const translatedText = await window.BabelFishAIUtils.translation.translateText(
                        text,
                        options.sourceLanguage,
                        options.targetLanguage,
                        apiKey
                    );
                    if (translatedText && translatedText.trim()) {
                        displayText = translatedText;
                        console.log('Translation successful:', translatedText);
                    } else {
                        console.error('Empty translation result');
                        throw new Error('Empty translation result');
                    }
                    hideBanner();
                } catch (error) {
                    console.error('Translation failed:', error);
                    showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerTranslationError"), MESSAGE_TYPES.ERROR);
                    setTimeout(hideBanner, CONFIG.ERROR_BANNER_DURATION);
                    // En cas d'erreur de traduction, on utilise le texte original
                    displayText = text;
                }
            }

            const currentDomain = window.location.hostname;
            const isDialogForced = options.forcedDialogDomains.some(domain =>
                currentDomain.includes(domain)
            );

            let displayed = false;
            if (options.activeDisplay && !isDialogForced) {
                displayed = handleActiveElementInsertion(displayText);
            }

            if (options.dialogDisplay || isDialogForced || !displayed) {
                showTranscriptionDialog(displayText, options.dialogDuration);
                displayed = true;
            }

            if (!displayed) {
                console.log("No display method enabled");
            }
        } catch (error) {
            console.error('Error displaying transcription:', error);
            showBanner("Erreur d'affichage", MESSAGE_TYPES.ERROR);
            setTimeout(hideBanner, CONFIG.ERROR_BANNER_DURATION);
        }
    }

    /**
     * Gère l'insertion du texte dans l'élément actif
     * @param {string} text - Le texte à insérer
     * @returns {boolean} Indique si l'insertion a réussi
     */
    function handleActiveElementInsertion(text) {
        // IMPORTANT: Ne pas stocker le contenu de l'élément actif.
        const activeElement = document.activeElement;
        if (!activeElement || activeElement.tagName === 'IFRAME') {
            return false;
        }
        const cleanText = text.trimStart();
        if (activeElement.tagName === 'TEXTAREA' ||
            (activeElement.tagName === 'INPUT' && activeElement.type === 'text') ||
            activeElement.isContentEditable) {

            if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
                insertTextIntoInput(activeElement, cleanText);
            } else if (activeElement.isContentEditable) {
                activeElement.focus();
                let finalText = cleanText.replace(/[\r\n]+/g, ' ');
                finalText = finalText.trim();
                document.execCommand('insertHTML', false, finalText);
                activeElement.dispatchEvent(new Event('input', { bubbles: true }));
            }
            return true;
        }
        return false;
    }

    /**
     * Insère du texte dans un élément input ou textarea
     * @param {HTMLInputElement|HTMLTextAreaElement} element - L'élément de saisie
     * @param {string} text - Le texte à insérer
     */
    function insertTextIntoInput(element, text) {
        const currentValue = element.value;
        const selectionStart = element.selectionStart;
        const selectionEnd = element.selectionEnd;
        element.value = currentValue.substring(0, selectionStart) +
            text +
            currentValue.substring(selectionEnd);
        element.selectionStart = element.selectionEnd = selectionStart + text.length;
        element.dispatchEvent(new Event('input', { bubbles: true }));
    }

    /**
     * Affiche la transcription dans une boîte de dialogue
     * @param {string} text - Le texte à afficher
     * @param {number} duration - Durée d'affichage en secondes
     */
    function showTranscriptionDialog(text, duration) {
        let container = document.getElementById('whisper-transcription-container');
        if (!container) {
            container = createTranscriptionContainer();
        }

        const transcriptionElement = document.createElement('div');
        transcriptionElement.className = 'whisper-transcription-element';
        transcriptionElement.textContent = text;

        const copyButton = createCopyButton(text);
        transcriptionElement.appendChild(document.createElement('br'));
        transcriptionElement.appendChild(copyButton);

        container.appendChild(transcriptionElement);

        setTimeout(() => {
            if (transcriptionElement.parentNode) {
                transcriptionElement.parentNode.removeChild(transcriptionElement);
                // Si le conteneur est vide (ne contient que le bouton de fermeture), on le supprime
                const container = document.getElementById('whisper-transcription-container');
                if (container && container.children.length === 1) {
                    document.body.removeChild(container);
                }
            }
        }, duration * 1000);
    }

    /**
     * Crée le conteneur pour les transcriptions
     * @returns {HTMLElement} Le conteneur créé
     */
    function createTranscriptionContainer() {
        const container = document.createElement('div');
        container.id = 'whisper-transcription-container';
        container.className = 'whisper-transcription-container';

        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.className = 'whisper-close-button';
        closeButton.onclick = () => document.body.removeChild(container);

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
        updateBannerColor();
    }
    initBanner();

    /**
    * Affiche la bannière avec un message
    * @param {string} text - Le message à afficher
     * @param {string} type - Le type de message ('info' ou 'error')
     */
    function showBanner(text, type = MESSAGE_TYPES.INFO) {
        window.BabelFishAIUtils.ui.showBanner(
            recordingBanner,
            text,
            type,
            isRecording
        );
        // Assurer que la couleur est correctement mise à jour
        updateBannerColor();
    }

    /**
     * Cache la bannière
     */
    function hideBanner() {
        if (recordingBanner) {
            recordingBanner.style.display = 'none';
        }
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

    // Écouter les changements dans les options
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync') {
            if (changes.bannerColorStart) {
                bannerColorStart = changes.bannerColorStart.newValue;
                updateBannerColor();
            }
            if (changes.bannerColorEnd) {
                bannerColorEnd = changes.bannerColorEnd.newValue;
                updateBannerColor();
            }
            if (changes.bannerOpacity) {
                bannerOpacity = changes.bannerOpacity.newValue;
                updateBannerColor();
            }
        }
    });
})();
