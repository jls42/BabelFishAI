// Utilitaires de traduction pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Utilisation des constantes globales depuis constants.js
    const ERRORS = window.BabelFishAIConstants.ERRORS;
    // API_CONFIG est directement accessible via window.BabelFishAIConstants.API_CONFIG

    // Configuration du débogage pour la traduction
    const TRANSLATION_DEBUG = false;

    /**
     * Log conditionnel pour le débogage de la traduction
     * @param {...any} args - Arguments à logger
     */
    function debugTranslation(...args) {
        if (TRANSLATION_DEBUG) {
            console.log('[Translation]', ...args);
        }
    }

    /**
     * Traduit le texte avec GPT
     * @param {string} text - Le texte à traduire
     * @param {string} sourceLang - La langue source
     * @param {string} targetLang - La langue cible
     * @param {string} apiKey - La clé API OpenAI
     * @param {string} [apiUrl] - URL de l'API GPT (optionnel)
     * @returns {Promise<string>} Le texte traduit
     */
    async function translateText(text, sourceLang, targetLang, apiKey) {
        // Validation des paramètres
        if (!text || !sourceLang || !targetLang) {
            console.error('Missing translation parameters:', { text, sourceLang, targetLang });
            throw new Error(ERRORS.MISSING_TRANSLATION_PARAMS);
        }

        if (!apiKey) {
            console.error('API key not found for translation');
            throw new Error(ERRORS.API_KEY_NOT_FOUND);
        }

        debugTranslation('Starting translation:', {
            sourceLang,
            targetLang,
            textLength: text.length
        });

        try {
            // Récupérer le modèle et l'URL de l'API depuis le stockage en utilisant l'utilitaire
            const result = await window.BabelFishAIUtils.api.getFromStorage({
                modelType: window.BabelFishAIConstants.API_CONFIG.GPT_MODEL,
                translationApiUrl: window.BabelFishAIConstants.API_CONFIG.DEFAULT_GPT_API_URL,
                disableLogging: false
            });
            
            const { modelType, translationApiUrl, disableLogging } = result;

            // Préparer les messages pour l'API
            const messages = [
                {
                    role: "system",
                    content: "You are an expert translator with deep knowledge of multiple languages and cultures. Your role is to provide accurate, natural-sounding translations while preserving the exact meaning and tone of the original text. You excel at maintaining consistency in technical terms, handling idiomatic expressions appropriately, and ensuring the translation reads naturally in the target language."
                },
                {
                    role: "user",
                    content: `Perform a direct translation from ${sourceLang} to ${targetLang}, without altering URLs. Strictly follow the source text without adding, modifying, or omitting elements that are not explicitly present. Begin the translation immediately without any introduction or added notes, and ensure not to include any additional information or context beyond the requested translation: ${text}`
                }
            ];

            // Préparer la charge utile pour l'API
            const payload = {
                model: modelType,
                messages
            };

            // Ajouter l'option no-log si demandé
            if (disableLogging) {
                payload["no-log"] = true;
            }

            debugTranslation('Translation request payload:', payload);

            // Appeler l'API de traduction
            const response = await fetch(translationApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(payload)
            });

            debugTranslation('Translation API response status:', response.status);

            // Gérer les erreurs de l'API
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Translation API error:', errorData);
                throw new Error(errorData.error?.message || ERRORS.TRANSLATION_ERROR);
            }

            // Traiter la réponse
            const data = await response.json();
            debugTranslation('Translation API response received');

            // Vérifier la validité de la réponse
            if (!data.choices?.[0]?.message?.content) {
                console.error('Invalid translation response format:', data);
                throw new Error(ERRORS.INVALID_TRANSLATION_RESPONSE);
            }

            // Extraire et retourner le texte traduit
            const translatedText = data.choices[0].message.content.trim();
            debugTranslation('Translation successful, length:', translatedText.length);

            return translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            throw new Error(`${ERRORS.TRANSLATION_ERROR}: ${error.message}`);
        }
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.translation = {
        translateText
    };

})(window.BabelFishAIUtils);