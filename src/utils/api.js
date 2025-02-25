// Utilitaires API pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Utilisation des constantes globales depuis constants.js
    const API_CONFIG = window.BabelFishAIConstants.API_CONFIG;
    const ERRORS = window.BabelFishAIConstants.ERRORS;

    /**
     * Transcrit l'audio en texte via l'API Whisper
     * @param {Blob} audioBlob - Le blob audio à transcrire
     * @param {string} apiKey - La clé API OpenAI
     * @param {string} apiUrl - L'URL de l'API Whisper
     * @param {string} [modelType] - Le modèle Whisper à utiliser
     * @param {string} [filename] - Nom du fichier à envoyer (optionnel)
     * @returns {Promise<string>} Le texte transcrit
     */
    async function transcribeAudio(audioBlob, apiKey, apiUrl = API_CONFIG.DEFAULT_WHISPER_API_URL, modelType = API_CONFIG.WHISPER_MODEL, filename = null) {
        if (!apiKey) {
            throw new Error(ERRORS.API_KEY_NOT_FOUND);
        }

        try {
            const formData = new FormData();

            // Utiliser le nom de fichier fourni ou un nom par défaut
            const fileToAppend = filename
                ? new Blob([audioBlob], { type: audioBlob.type })
                : audioBlob;

            const finalFilename = filename || 'audio.webm';
            formData.append('file', fileToAppend, finalFilename);
            formData.append('model', modelType);

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
        getApiUrl
    };

})(window.BabelFishAIUtils);