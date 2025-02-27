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

            // Utiliser la fonction callApi pour effectuer la requête avec optimisations
            const translationResponse = await window.BabelFishAIUtils.api.callApi({
                url: translationApiUrl,
                apiKey,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                errorType: ERRORS.TRANSLATION_ERROR,
                // Activer les tentatives de réessai pour les traductions
                retryOnFail: true,
                // Augmenter le timeout pour laisser plus de temps aux modèles d'IA
                timeout: 20000,
                // Définir un processeur de réponse personnalisé
                responseProcessor: (data) => {
                    // Vérifier la validité de la réponse
                    if (!data.choices?.[0]?.message?.content) {
                        console.error('Invalid translation response format:', data);
                        throw new Error(ERRORS.INVALID_TRANSLATION_RESPONSE);
                    }
                    return data.choices[0].message.content.trim();
                }
            });

            debugTranslation('Translation successful, length:', translationResponse.length);
            return translationResponse;
            
        } catch (error) {
            console.error('Translation error:', error);
            // Si l'erreur est déjà formatée, la propager directement
            if (error.message.includes(ERRORS.TRANSLATION_ERROR)) {
                throw error;
            }
            // Sinon, la formater avec le préfixe TRANSLATION_ERROR
            throw new Error(`${ERRORS.TRANSLATION_ERROR}: ${error.message}`);
        }
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.translation = {
        translateText
    };

})(window.BabelFishAIUtils);