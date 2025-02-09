(function () {
    if (window.__whisperContentScriptHasRun) return;
    window.__whisperContentScriptHasRun = true;

    // Content script de l'extension de transcription vocale

    // Configuration
    const CONFIG = {
        DEBUG: false,
        WHISPER_MODEL: "whisper-1",
        GPT_MODEL: "gpt-4o-mini",
        DEFAULT_API_URL: "https://api.openai.com/v1/audio/transcriptions",
        GPT_API_URL: "https://api.openai.com/v1/chat/completions",
        COPY_FEEDBACK_DURATION: 2000,
        ERROR_BANNER_DURATION: 5000,
        DEFAULT_DIALOG_DURATION: 15,
        DEFAULT_BANNER_COLOR_START: '#684054',
        DEFAULT_BANNER_COLOR_END: '#4c7b8d',
        DEFAULT_BANNER_OPACITY: 80,
        DEFAULT_FORCED_DIALOG_DOMAINS: ['chat.google.com']
    };

    // États et actions
    const STATES = {
        RECORDING: 'recording',
        STOPPED: 'stopped',
        ERROR: 'error'
    };

    const ACTIONS = {
        TOGGLE: 'toggleRecording',
        STARTED: 'recordingStarted',
        STOPPED: 'recordingStopped',
        ERROR: 'recordingError'
    };

    const MESSAGE_TYPES = {
        INFO: 'info',
        ERROR: 'error'
    };

    const ERRORS = {
        API_KEY_NOT_FOUND: "Clé API non configurée. Veuillez la configurer dans les options de l'extension.",
        CHROME_STORAGE_ERROR: "Erreur de stockage Chrome",
        MIC_ACCESS_ERROR: "Erreur : microphone inaccessible.",
        TRANSCRIPTION_ERROR: "Erreur lors de la transcription",
        NO_EDITABLE_ELEMENT: "Aucun élément éditable trouvé"
    };

    // État global
    let mediaRecorder = null;
    let audioChunks = [];
    let isRecording = false;
    let recordingBanner = null;
    let apiKey = null;
    let bannerColorStart = CONFIG.DEFAULT_BANNER_COLOR_START;
    let bannerColorEnd = CONFIG.DEFAULT_BANNER_COLOR_END;
    let bannerOpacity = CONFIG.DEFAULT_BANNER_OPACITY;

    // Initialisation de la clé API
    getApiKey().then(key => {
        apiKey = key;
    }).catch(error => {
        console.error("Failed to load API key:", error);
    });

    // Initialisation des options de couleur du bandeau
    chrome.storage.sync.get({
        bannerColorStart: CONFIG.DEFAULT_BANNER_COLOR_START,
        bannerColorEnd: CONFIG.DEFAULT_BANNER_COLOR_END,
        bannerOpacity: CONFIG.DEFAULT_BANNER_OPACITY
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
        if (recordingBanner.classList.contains('error')) {
            return; // Ne pas modifier le style si c'est une erreur
        }

        const opacity = bannerOpacity / 100;
        const start = bannerColorStart || CONFIG.DEFAULT_BANNER_COLOR_START;
        const end = bannerColorEnd || CONFIG.DEFAULT_BANNER_COLOR_END;

        try {
            // Convertir les couleurs hex en RGB
            const startR = parseInt(start.substr(1, 2), 16);
            const startG = parseInt(start.substr(3, 2), 16);
            const startB = parseInt(start.substr(5, 2), 16);
            const endR = parseInt(end.substr(1, 2), 16);
            const endG = parseInt(end.substr(3, 2), 16);
            const endB = parseInt(end.substr(5, 2), 16);

            const gradient = `linear-gradient(45deg,
                rgba(${startR}, ${startG}, ${startB}, ${opacity}),
                rgba(${endR}, ${endG}, ${endB}, ${opacity}))`;

            recordingBanner.style.background = gradient;
        } catch (error) {
            console.error('Error updating banner color:', error);
            // Utiliser le dégradé par défaut en cas d'erreur
            recordingBanner.style.background = `linear-gradient(45deg,
                ${CONFIG.DEFAULT_BANNER_COLOR_START},
                ${CONFIG.DEFAULT_BANNER_COLOR_END})`;
        }
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
            showBanner("Enregistrement en cours...");
            chrome.runtime.sendMessage({ action: ACTIONS.STARTED });
        } catch (error) {
            console.error("Error accessing microphone or API key:", error);
            if (error.message === ERRORS.API_KEY_NOT_FOUND) {
                showBanner(ERRORS.API_KEY_NOT_FOUND, MESSAGE_TYPES.ERROR);
            } else {
                showBanner(ERRORS.MIC_ACCESS_ERROR, MESSAGE_TYPES.ERROR);
            }
            chrome.runtime.sendMessage({ action: ACTIONS.ERROR, error: error.message });
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
            showBanner("Transcription en cours...");
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
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(['apiKey'], (result) => {
                if (chrome.runtime.lastError) {
                    console.error("Chrome storage error:", chrome.runtime.lastError);
                    reject(chrome.runtime.lastError);
                } else if (!result.apiKey) {
                    console.error("API key not found");
                    resolve(null); // Renvoyer null au lieu de rejeter
                } else {
                    resolve(result.apiKey);
                }
            });
        });
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
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.webm');
            formData.append('model', CONFIG.WHISPER_MODEL);

            // Récupérer l'URL de l'API depuis le stockage
            const apiUrl = await new Promise((resolve) => {
                chrome.storage.sync.get({
                    apiUrl: CONFIG.DEFAULT_API_URL
                }, (result) => {
                    resolve(result.apiUrl || CONFIG.DEFAULT_API_URL);
                });
            });

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(errorData.error?.message || ERRORS.TRANSCRIPTION_ERROR);
            }

            const data = await response.json();
            return data.text;
        } catch (error) {
            console.error('Transcription error:', error);
            throw error;
        }
    }

    /**
     * Tente d'insérer du texte dans une iframe ciblée
     * @param {HTMLIFrameElement} iframe - L'iframe cible
     * @param {string} text - Le texte à insérer
     * @param {number} retries - Nombre de tentatives restantes
     * @returns {boolean} Indique si l'insertion a réussi
     */
    function insertTextInIframe(iframe, text, retries = 3) {
        try {
            const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            const editable = innerDoc.querySelector('[contenteditable="true"]');
            if (editable) {
                editable.innerHTML += text;
                return true;
            }
            throw new Error(ERRORS.NO_EDITABLE_ELEMENT);
        } catch (e) {
            if (retries > 0) {
                setTimeout(() => {
                    insertTextInIframe(iframe, text, retries - 1);
                }, 500);
            } else {
                console.error("Failed to insert text in iframe:", e);
            }
            return false;
        }
    }

    /**
     * Traduit le texte avec GPT-4o
     * @param {string} text - Le texte à traduire
     * @param {string} targetLanguage - La langue cible (zh, es, en)
     * @returns {Promise<string>} Le texte traduit
     */
    async function translateText(text, sourceLang, targetLang) {
        if (!text || !sourceLang || !targetLang) {
            console.error('Missing translation parameters:', { text, sourceLang, targetLang });
            throw new Error('Missing translation parameters');
        }

        if (!apiKey) {
            console.error('API key not found for translation');
            throw new Error(ERRORS.API_KEY_NOT_FOUND);
        }

        console.log('Starting translation:', {
            sourceLang,
            targetLang,
            textLength: text.length
        });

        try {
            const payload = {
                model: CONFIG.GPT_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `Perform a direct translation from ${sourceLang} to ${targetLang}, without altering URLs. Begin the translation immediately without any introduction or added notes, and ensure not to include any additional information or context beyond the requested translation: '${text}'. Strictly follow the source text without adding, modifying, or omitting elements that are not explicitly present.`
                    }
                ],
                store: true
            };

            console.log('Translation request payload:', payload);

            const response = await fetch(CONFIG.GPT_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(payload)
            });

            console.log('Translation API response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Translation API error:', errorData);
                throw new Error(errorData.error?.message || "Erreur de traduction");
            }

            const data = await response.json();
            console.log('Translation API response:', data);

            if (!data.choices?.[0]?.message?.content) {
                console.error('Invalid translation response format:', data);
                throw new Error('Format de réponse de traduction invalide');
            }

            const translatedText = data.choices[0].message.content.trim();
            console.log('Final translated text:', translatedText);

            return translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            throw new Error(`Erreur de traduction: ${error.message}`);
        }
    }

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
                    showBanner("Traduction en cours...");
                    console.log('Translation params:', {
                        text,
                        sourceLang: options.sourceLanguage,
                        targetLang: options.targetLanguage
                    });
                    const translatedText = await translateText(text, options.sourceLanguage, options.targetLanguage);
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
                    showBanner("Erreur de traduction", MESSAGE_TYPES.ERROR);
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
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copier';
        copyButton.className = 'whisper-copy-button';
        copyButton.onclick = async () => {
            try {
                await navigator.clipboard.writeText(text);
                copyButton.textContent = 'Copié !';
                setTimeout(() => {
                    copyButton.textContent = 'Copier';
                }, CONFIG.COPY_FEEDBACK_DURATION);
            } catch (error) {
                console.error('Failed to copy text:', error);
                showBanner('Erreur lors de la copie du texte', MESSAGE_TYPES.ERROR);
            }
        };
        return copyButton;
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

    /**
     * Affiche la bannière avec un message
     * @param {string} text - Le message à afficher
     * @param {string} type - Le type de message ('info' ou 'error')
     */
    function showBanner(text, type = MESSAGE_TYPES.INFO) {
        recordingBanner.textContent = text;
        recordingBanner.className = 'whisper-status-banner';

        // Réinitialiser les classes
        recordingBanner.classList.remove('error', 'recording');

        if (type === MESSAGE_TYPES.ERROR) {
            recordingBanner.classList.add('error');
        } else if (isRecording) {
            recordingBanner.classList.add('recording');
        }

        updateBannerColor();
        recordingBanner.style.display = 'block';
    }

    /**
     * Cache la bannière
     */
    function hideBanner() {
        recordingBanner.style.display = 'none';
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
    // Initialisation
    initBanner(); // Initialise le bandeau mais ne l'affiche pas immédiatement
    console.log("Content script injected!");

})();
