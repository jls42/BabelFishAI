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
     * @param {boolean} [generateUniqueFilename=false] - Générer un nom de fichier unique avec timestamp et partie aléatoire
     * @returns {Promise<string>} Le texte transcrit
     */
    async function transcribeAudio(audioBlob, apiKey, apiUrl = API_CONFIG.DEFAULT_WHISPER_API_URL, modelType = API_CONFIG.WHISPER_MODEL, filename = null, generateUniqueFilename = false) {
        if (!apiKey) {
            throw new Error(ERRORS.API_KEY_NOT_FOUND);
        }

        try {
            const formData = new FormData();

            // Déterminer le nom de fichier final
            let finalFilename;
            if (generateUniqueFilename) {
                // Générer un nom de fichier avec timestamp et élément aléatoire
                const timestamp = Date.now();
                const randomPart = Math.random().toString(36).substring(2, 10); // Génère une chaîne aléatoire de 8 caractères
                finalFilename = `audio-${timestamp}-${randomPart}.webm`;
            } else {
                finalFilename = filename || 'audio.webm';
            }

            formData.append('file', audioBlob, finalFilename);
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
     * Récupère des données depuis le stockage Chrome
     * @param {Array|string|Object} keys - Les clés à récupérer
     * @param {Object} [defaults={}] - Les valeurs par défaut
     * @returns {Promise<Object>} Les données récupérées
     */
    async function getFromStorage(keys, defaults = {}) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(keys, (result) => {
                if (chrome.runtime.lastError) {
                    console.error("Chrome storage error:", chrome.runtime.lastError);
                    reject(new Error(ERRORS.CHROME_STORAGE_ERROR));
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Récupère la clé API depuis le stockage Chrome
     * @returns {Promise<string>} La clé API
     */
    async function getApiKey() {
        const result = await getFromStorage(['apiKey']);
        if (!result.apiKey) {
            throw new Error(ERRORS.API_KEY_NOT_FOUND);
        }
        return result.apiKey;
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.api = {
        transcribeAudio,
        getApiKey,
        getFromStorage
    };

})(window.BabelFishAIUtils);