// Utilitaires API pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    const API_CONFIG = {
        DEFAULT_WHISPER_API_URL: 'https://api.openai.com/v1/audio/transcriptions',
        // WHISPER_MODEL: 'whisper-1' // Redondant, utiliser la constante de constants.js
    };

    const ERRORS = {
        API_KEY_NOT_FOUND: "Clé API non configurée. Veuillez la configurer dans les options de l'extension.",
        CHROME_STORAGE_ERROR: "Erreur de stockage Chrome",
        TRANSCRIPTION_ERROR: "Erreur lors de la transcription"
    };

    /**
     * Transcrit l'audio en texte via l'API Whisper
     * @param {Blob} audioBlob - Le blob audio à transcrire
     * @param {string} apiKey - La clé API OpenAI
     * @param {string} apiUrl - L'URL de l'API Whisper
     * @returns {Promise<string>} Le texte transcrit
     */
    async function transcribeAudio(audioBlob, apiKey, apiUrl = API_CONFIG.DEFAULT_WHISPER_API_URL) {
        if (!apiKey) {
            throw new Error(ERRORS.API_KEY_NOT_FOUND);
        }

        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.webm');
            formData.append('model', window.BabelFishAIConstants.API_CONFIG.WHISPER_MODEL);

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
     * Récupère la clé API depuis le stockage Chrome
     * @returns {Promise<string>} La clé API
     */
    async function getApiKey() {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(['apiKey'], (result) => {
                if (chrome.runtime.lastError) {
                    console.error("Chrome storage error:", chrome.runtime.lastError);
                    reject(new Error(ERRORS.CHROME_STORAGE_ERROR));
                } else if (!result.apiKey) {
                    reject(new Error(ERRORS.API_KEY_NOT_FOUND));
                } else {
                    resolve(result.apiKey);
                }
            });
        });
    }

    /**
     * Récupère l'URL de l'API depuis le stockage
     * @param {string} key - La clé de stockage ('apiUrl' ou 'translationApiUrl')
     * @param {string} defaultUrl - L'URL par défaut
     * @returns {Promise<string>} L'URL de l'API
     */
    async function getApiUrl(key = 'apiUrl', defaultUrl = API_CONFIG.DEFAULT_WHISPER_API_URL) {
        return new Promise((resolve) => {
            chrome.storage.sync.get({
                [key]: defaultUrl
            }, (result) => {
                resolve(result[key] || defaultUrl);
            });
        });
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.api = {
        transcribeAudio,
        getApiKey,
        getApiUrl,
        API_CONFIG,
        ERRORS
    };

})(window.BabelFishAIUtils);