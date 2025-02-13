// Utilitaires de traduction pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    const ERRORS = {
        MISSING_PARAMS: 'Paramètres de traduction manquants',
        API_KEY_NOT_FOUND: "Clé API non configurée",
        INVALID_RESPONSE: 'Format de réponse de traduction invalide',
        TRANSLATION_ERROR: 'Erreur de traduction'
    };

    /**
     * Traduit le texte avec GPT
     * @param {string} text - Le texte à traduire
     * @param {string} sourceLang - La langue source
     * @param {string} targetLang - La langue cible
     * @param {string} apiKey - La clé API OpenAI
     * @param {string} [apiUrl] - URL de l'API GPT (optionnel)
     * @returns {Promise<string>} Le texte traduit
     */
    async function translateText(text, sourceLang, targetLang, apiKey, apiUrl = window.BabelFishAIConstants.API_CONFIG.DEFAULT_GPT_API_URL) {
        if (!text || !sourceLang || !targetLang) {
            console.error('Missing translation parameters:', { text, sourceLang, targetLang });
            throw new Error(ERRORS.MISSING_PARAMS);
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
            // Récupérer le modèle et l'URL de l'API depuis le stockage
            const { modelType, translationApiUrl, disableLogging } = await new Promise((resolve) => {
                chrome.storage.sync.get({
                    modelType: window.BabelFishAIConstants.API_CONFIG.GPT_MODEL,
                    translationApiUrl: window.BabelFishAIConstants.API_CONFIG.DEFAULT_GPT_API_URL,
                    disableLogging: false
                }, (result) => {
                    resolve({
                        modelType: result.modelType,
                        translationApiUrl: result.translationApiUrl,
                        disableLogging: result.disableLogging
                    });
                });
            });

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

            const payload = {
                model: modelType,
                messages
            };

            if (disableLogging) {
                payload["no-log"] = true;
            }

            console.log('Translation request payload:', payload);

            const response = await fetch(translationApiUrl, {
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
                throw new Error(errorData.error?.message || ERRORS.TRANSLATION_ERROR);
            }

            const data = await response.json();
            console.log('Translation API response:', data);

            if (!data.choices?.[0]?.message?.content) {
                console.error('Invalid translation response format:', data);
                throw new Error(ERRORS.INVALID_RESPONSE);
            }

            const translatedText = data.choices[0].message.content.trim();
            console.log('Final translated text:', translatedText);

            return translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            throw new Error(`${ERRORS.TRANSLATION_ERROR}: ${error.message}`);
        }
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.translation = {
        translateText,
        ERRORS
    };

})(window.BabelFishAIUtils);