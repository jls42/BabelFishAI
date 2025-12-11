// Utilitaires de traitement de texte pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Constantes pour les options de traitement de texte
    const TEXT_PROCESSING_CONFIG = {
        MAX_TEXT_LENGTH: 32000, // Limite de caractères pour l'API OpenAI
        DEFAULT_TIMEOUT: 60000  // Timeout par défaut pour les requêtes (60 secondes)
    };

    /**
     * Vérifie si le texte d'entrée est valide pour le traitement
     * @param {string} text - Le texte à vérifier
     * @returns {boolean} - True si le texte est valide, False sinon
     */
    function isValidInputText(text) {
        return text && typeof text === 'string' && text.trim().length > 0;
    }

    /**
     * Nettoie et normalise le texte avant traitement
     * @param {string} text - Le texte à nettoyer
     * @returns {string} - Le texte nettoyé
     */
    function cleanText(text) {
        if (!isValidInputText(text)) {
            return '';
        }

        // Supprimer les espaces multiples et les sauts de ligne excessifs
        let cleanedText = text.trim()
            .replace(/\s+/g, ' ')
            .replace(/\n\s*\n/g, '\n\n');

        // Limiter la taille du texte pour éviter les problèmes avec l'API
        if (cleanedText.length > TEXT_PROCESSING_CONFIG.MAX_TEXT_LENGTH) {
            cleanedText = cleanedText.substring(0, TEXT_PROCESSING_CONFIG.MAX_TEXT_LENGTH);
            console.warn(`Texte tronqué à ${TEXT_PROCESSING_CONFIG.MAX_TEXT_LENGTH} caractères`);
        }

        return cleanedText;
    }

    /**
     * Reformule un texte en utilisant l'API OpenAI
     * @param {string} text - Le texte à reformuler
     * @param {string} apiKey - La clé API OpenAI
     * @returns {Promise<string>} - Le texte reformulé
     */
    async function rephraseText(text, apiKey) {
        // Validation des paramètres
        if (!text) {
            console.error('Missing rephrase parameter:', { text });
            throw new Error(window.BabelFishAIConstants.ERRORS.MISSING_REPHRASE_PARAMS);
        }

        // Nettoyer le texte avant traitement
        const cleanedText = cleanText(text);

        try {
            // Utiliser resolveApiConfig pour obtenir la configuration multi-provider
            const config = await window.BabelFishAIUtils.api.resolveApiConfig('chat');
            const effectiveApiKey = apiKey || config.apiKey;
            const { url: translationApiUrl, model: modelType, disableLogging } = config;

            console.log('[TextProcessing] rephraseText using provider:', config.providerId, 'url:', translationApiUrl);

            // Préparer les messages pour l'API
            const messages = [
                {
                    role: "system",
                    content: "You are an expert language assistant. Your role is to improve text by rephrasing it to be more clear, professional, and fluid. Maintain the exact meaning of the original text while enhancing its readability and eloquence. Do not add new information or modify the original intent."
                },
                {
                    role: "user",
                    content: `Improve the following text by rephrasing it to be more clear, professional, and fluid. Maintain the exact meaning while enhancing readability. Return only the improved text without any introduction, notes, or explanation: ${cleanedText}`
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

            // Utiliser la fonction callApi pour effectuer la requête avec optimisations
            const response = await window.BabelFishAIUtils.api.callApi({
                url: translationApiUrl,
                apiKey: effectiveApiKey,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                errorType: window.BabelFishAIConstants.ERRORS.REPHRASE_ERROR,
                // Activer les tentatives de réessai
                retryOnFail: true,
                // Augmenter le timeout pour laisser plus de temps aux modèles d'IA
                timeout: 20000
            });

            // Extraire et retourner le texte reformulé
            // Utilisation du chaînage optionnel
            if (response?.choices?.length > 0) {
                const rephrasedText = response.choices[0].message.content.trim();
                return rephrasedText;
            } else {
                throw new Error('Réponse API invalide');
            }
        } catch (error) {
            console.error('Rephrasing error:', error);
            // Si l'erreur est déjà formatée, la propager directement
            if (error.message.includes(window.BabelFishAIConstants.ERRORS.REPHRASE_ERROR)) {
                throw error;
            }
            // Sinon, la formater avec le préfixe REPHRASE_ERROR
            throw new Error(`${window.BabelFishAIConstants.ERRORS.REPHRASE_ERROR}: ${error.message}`);
        }
    }

    /**
     * Traduit un texte en utilisant le provider de chat configuré (multi-provider)
     * @param {string} text - Le texte à traduire
     * @param {string} sourceLanguage - La langue source
     * @param {string} targetLanguage - La langue cible
     * @param {string} apiKey - La clé API (optionnel, utilise la config multi-provider si non fourni)
     * @returns {Promise<string>} - Le texte traduit
     */
    async function translateText(text, sourceLanguage, targetLanguage, apiKey) {
        if (!isValidInputText(text)) {
            throw new Error('Texte vide ou invalide');
        }

        // Nettoyer le texte avant traduction
        const cleanedText = cleanText(text);

        try {
            // Utiliser resolveApiConfig pour obtenir la configuration multi-provider
            const config = await window.BabelFishAIUtils.api.resolveApiConfig('chat');
            const effectiveApiKey = apiKey || config.apiKey;
            const { url: translationApiUrl, model: modelType, disableLogging } = config;

            console.log('[TextProcessing] translateText using provider:', config.providerId, 'url:', translationApiUrl);

            if (!effectiveApiKey) {
                throw new Error('Clé API manquante');
            }

            // Préparer les messages pour l'API avec la logique originale pour les deux cas
            const messages = [
                {
                    role: "system",
                    content: "You are an expert translator with deep knowledge of multiple languages and cultures. Your role is to provide accurate, natural-sounding translations while preserving the exact meaning and tone of the original text. You excel at maintaining consistency in technical terms, handling idiomatic expressions appropriately, and ensuring the translation reads naturally in the target language."
                },
                {
                    role: "user",
                    content: sourceLanguage === 'auto'
                        ? `Translate the following text to ${targetLanguage}, without altering URLs. Strictly follow the source text without adding, modifying, or omitting elements that are not explicitly present. Begin the translation immediately without any introduction or added notes, and ensure not to include any additional information or context beyond the requested translation: ${cleanedText}`
                        : `Perform a direct translation from ${sourceLanguage} to ${targetLanguage}, without altering URLs. Strictly follow the source text without adding, modifying, or omitting elements that are not explicitly present. Begin the translation immediately without any introduction or added notes, and ensure not to include any additional information or context beyond the requested translation: ${cleanedText}`
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

            // Utiliser l'API pour traduire le texte
            const response = await window.BabelFishAIUtils.api.callApi({
                url: translationApiUrl,
                apiKey: effectiveApiKey,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                errorType: window.BabelFishAIConstants.ERRORS.TRANSLATION_ERROR,
                // Activer les tentatives de réessai pour les traductions
                retryOnFail: true,
                // Augmenter le timeout pour laisser plus de temps aux modèles d'IA
                timeout: 20000
            });

            // Extraire et retourner le texte traduit
            // Utilisation du chaînage optionnel
            if (response?.choices?.length > 0) {
                const translatedText = response.choices[0].message.content.trim();
                return translatedText;
            } else {
                throw new Error('Réponse API invalide');
            }
        } catch (error) {
            console.error('Erreur lors de la traduction:', error);
            throw error;
        }
    }

    /**
     * Détermine les langues source et cible pour la traduction
     * @param {Object} options - Options actuelles
     * @param {string} [specifiedTargetLanguage] - Langue cible optionnelle (prioritaire)
     * @returns {Object} - Objet contenant sourceLanguage et targetLanguage
     */
    function determineTranslationLanguages(options, specifiedTargetLanguage) {
        const sourceLanguage = options.enableTranslation ? options.sourceLanguage : 'auto';
        const targetLanguage = specifiedTargetLanguage ||
            (options.enableTranslation ? options.targetLanguage : 'en');

        return { sourceLanguage, targetLanguage };
    }

    /**
     * Récupère la clé API ou lève une exception si elle n'est pas disponible
     * @returns {Promise<string>} - La clé API
     * @throws {Error} - Si la clé API n'est pas trouvée
     * @deprecated Utiliser window.BabelFishAIUtils.api.getOrFetchApiKey à la place
     */
    // La fonction locale getOrFetchApiKey a été supprimée car elle était obsolète.
    // L'appel a été remplacé par window.BabelFishAIUtils.api.getOrFetchApiKey directement.

    /**
     * Reformule un texte sélectionné sans enregistrement audio
     * @param {string} text - Le texte à reformuler
     * @returns {Promise<string>} - Le texte reformulé si tout s'est bien passé, sinon une erreur est levée
     */
    async function handleTextRephrasing(text) {
        // Combiner les vérifications du texte d'entrée et de sortie
        if (!isValidInputText(text)) {
            const errorMessage = "Texte vide ou invalide pour la reformulation";
            console.warn(errorMessage);
            throw new Error(errorMessage);
        }

        try {
            // Informer l'utilisateur que la reformulation est en cours
            const message = window.BabelFishAIUtils.i18n?.getMessage("bannerRephrasing") || "Reformulation en cours...";
            window.BabelFishAI.ui.showBanner(message);

            // Reformuler le texte (la clé API est gérée par resolveApiConfig dans rephraseText)
            const rephrasedText = await rephraseText(text);

            // Combiner les vérifications du texte d'entrée et de sortie
            if (!isValidInputText(rephrasedText)) {
                const errorMessage = "Résultat de reformulation vide ou invalide";
                console.warn(errorMessage);
                throw new Error(errorMessage);
            }

            // Cacher la bannière une fois l'opération terminée
            window.BabelFishAI.ui.hideBanner();

            return rephrasedText;
        } catch (error) {
            console.error('Erreur lors de la reformulation:', error);

            // Gérer l'erreur via l'API d'erreur
            const errorMessage = window.BabelFishAIUtils.i18n?.getMessage("bannerRephrasingError") || "Erreur lors de la reformulation";
            window.BabelFishAIUtils.error.handleError(errorMessage, error.message);

            throw error;
        }
    }

    /**
     * Gère la traduction d'un texte sélectionné sans enregistrement audio
     * @param {string} text - Le texte à traduire
     * @param {Object} options - Options de traduction
     * @param {string} [specifiedTargetLanguage] - Langue cible spécifiée (remplace celle des options)
     * @returns {Promise<string>} - Le texte traduit si tout s'est bien passé, sinon une erreur est levée
     */
    async function handleTextTranslation(text, options, specifiedTargetLanguage) {
        // Combiner les vérifications du texte d'entrée et de sortie
        if (!isValidInputText(text)) {
            const errorMessage = "Texte vide ou invalide pour la traduction";
            console.warn(errorMessage);
            throw new Error(errorMessage);
        }

        try {
            // Informer l'utilisateur que la traduction est en cours
            const message = window.BabelFishAIUtils.i18n?.getMessage("bannerTranslating") || "Traduction en cours...";
            window.BabelFishAI.ui.showBanner(message);

            // Déterminer les langues source et cible
            const { sourceLanguage, targetLanguage } = determineTranslationLanguages(options, specifiedTargetLanguage);

            // Traduire le texte (la clé API est gérée par resolveApiConfig dans translateText)
            const translatedText = await translateText(text, sourceLanguage, targetLanguage);

            // Combiner les vérifications du texte d'entrée et de sortie
            if (!isValidInputText(translatedText)) {
                const errorMessage = "Résultat de traduction vide ou invalide";
                console.warn(errorMessage);
                throw new Error(errorMessage);
            }

            // Cacher la bannière une fois l'opération terminée
            window.BabelFishAI.ui.hideBanner();

            return translatedText;
        } catch (error) {
            console.error('Erreur lors de la traduction:', error);

            // Gérer l'erreur via l'API d'erreur
            const errorMessage = window.BabelFishAIUtils.i18n?.getMessage("bannerTranslationError") || "Erreur lors de la traduction";
            window.BabelFishAIUtils.error.handleError(errorMessage, error.message);

            throw error;
        }
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.textProcessing = {
        isValidInputText,
        cleanText,
        rephraseText,
        translateText,
        handleTextRephrasing, // NOSONAR - S1874: Faux positif, cette fonction est utilisée par d'autres modules.
        handleTextTranslation,
        determineTranslationLanguages
    };

})(window.BabelFishAIUtils);
