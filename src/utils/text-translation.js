// Utilitaires de traduction et reformulation pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Constantes importées depuis l'espace global
    const CONFIG = window.BabelFishAIConstants.CONFIG;
    const API_CONFIG = window.BabelFishAIConstants.API_CONFIG;
    const ERRORS = window.BabelFishAIConstants.ERRORS;

    // La fonction locale isValidInputText a été supprimée car elle était obsolète.
    // Les appels ont été remplacés par window.BabelFishAIUtils.textProcessing.isValidInputText directement.

    /**
     * Fonction interne pour appeler l'API GPT (Chat Completion)
     * @param {string} apiKey - La clé API OpenAI
     * @param {Array<Object>} messages - Les messages pour l'API
     * @param {string} errorType - Le type d'erreur à utiliser
     * @returns {Promise<string>} - Le contenu de la réponse de l'IA
     * @private
     */
    async function _callGptApi(apiKey, messages, errorType) {
        try {
            // Récupérer le modèle et l'URL de l'API depuis le stockage
            const result = await window.BabelFishAIUtils.api.getFromStorage({
                modelType: API_CONFIG.GPT_MODEL, // Utiliser GPT_MODEL défini dans constants.js
                translationApiUrl: API_CONFIG.DEFAULT_GPT_API_URL, // Utiliser DEFAULT_GPT_API_URL
                disableLogging: false
            });
            const { modelType, translationApiUrl, disableLogging } = result;

            // Préparer la charge utile pour l'API
            const payload = {
                model: modelType,
                messages
                // Les paramètres comme temperature, max_tokens peuvent être ajoutés ici si nécessaire
            };

            // Ajouter l'option no-log si demandé
            if (disableLogging) {
                payload["no-log"] = true;
            }

            // Utiliser la fonction callApi de api-utils.js
            const response = await window.BabelFishAIUtils.api.callApi({
                url: translationApiUrl,
                apiKey,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                errorType,
                retryOnFail: true,
                timeout: 20000 // Timeout augmenté
            });

            // Extraire et retourner le contenu du message
            if (response?.choices?.length > 0) {
                return response.choices[0].message.content.trim();
            } else {
                throw new Error('Réponse API invalide ou vide');
            }
        } catch (error) {
            console.error(`Erreur lors de l'appel API GPT (${errorType}):`, error);
            // Propager l'erreur pour qu'elle soit gérée par la fonction appelante
            throw error;
        }
    }


    /**
     * Reformule le texte si l'option est activée
     * @param {string} text - Le texte à reformuler
     * @param {Object} options - Les options de reformulation
     * @returns {Promise<string>} Le texte reformulé ou le texte original en cas d'erreur
     */
    async function rephraseTextIfEnabled(text, options) {
        // Utilisation de la fonction non obsolète de text-processing.js
        if (!options.rephrase || !window.BabelFishAIUtils.textProcessing.isValidInputText(text)) {
            return text;
        }

        try {
            // Récupérer la clé API via le module api-utils
            const apiKey = await window.BabelFishAIUtils.api.getOrFetchApiKey();
            if (!apiKey) {
                throw new Error(ERRORS.API_KEY_NOT_FOUND);
            }

            // Afficher un message de statut
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("rephrasingText"));

            // Construire les messages pour l'API
            const messages = [
                { role: "system", content: API_CONFIG.REPHRASE_SYSTEM_PROMPT },
                { role: "user", content: text }
            ];

            // Appeler la fonction helper pour l'API GPT
            const rephrasedText = await _callGptApi(apiKey, messages, ERRORS.REPHRASE_ERROR);

            // Retourner le texte reformulé ou le texte original si la réponse est vide
            return rephrasedText || text;

        } catch (error) {
            // L'erreur est déjà loggée par _callGptApi ou getOrFetchApiKey
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("rephrasingError"), 'error');
            return text; // Retourner le texte original en cas d'erreur
        }
    }

    /**
     * Traduit le texte si l'option est activée
     * @param {string} text - Le texte à traduire
     * @param {Object} options - Les options de traduction
     * @returns {Promise<string>} Le texte traduit ou le texte original en cas d'erreur
     */
    async function translateTextIfEnabled(text, options) {
        // Utilisation de la fonction non obsolète de text-processing.js
        if (!options.translate || !window.BabelFishAIUtils.textProcessing.isValidInputText(text)) {
            return text;
        }

        try {
            // Récupérer la clé API via le module api-utils
            const apiKey = await window.BabelFishAIUtils.api.getOrFetchApiKey();
            if (!apiKey) {
                throw new Error(ERRORS.API_KEY_NOT_FOUND);
            }

            // Afficher un message de statut
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("translatingText"));

            // Déterminer les langues source et cible
            const { sourceLanguage, targetLanguage } = determineTranslationLanguages(options);

            // Construire les messages pour l'API
            const messages = [
                {
                    role: "system",
                    content: API_CONFIG.TRANSLATE_SYSTEM_PROMPT
                        .replace("{{SOURCE_LANG}}", window.BabelFishAIUtils.i18n.getLanguageName(sourceLanguage) || sourceLanguage)
                        .replace("{{TARGET_LANG}}", window.BabelFishAIUtils.i18n.getLanguageName(targetLanguage) || targetLanguage)
                },
                { role: "user", content: text }
            ];

            // Appeler la fonction helper pour l'API GPT
            const translatedText = await _callGptApi(apiKey, messages, ERRORS.TRANSLATION_ERROR);

            // Retourner le texte traduit ou le texte original si la réponse est vide
            return translatedText || text;

        } catch (error) {
            // L'erreur est déjà loggée par _callGptApi ou getOrFetchApiKey
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("translationError"), 'error');
            return text; // Retourner le texte original en cas d'erreur
        }
    }

    /**
     * Détermine les langues source et cible pour la traduction
     * @param {Object} options - Options actuelles
     * @param {string} [specifiedTargetLanguage] - Langue cible optionnelle (prioritaire)
     * @returns {Object} - Objet contenant sourceLanguage et targetLanguage
     */
    function determineTranslationLanguages(options, specifiedTargetLanguage) {
        // Langue source: langue de transcription ou langue par défaut
        const sourceLanguage = options.language || CONFIG.DEFAULT_LANGUAGE;

        // Langue cible: langue spécifiée, langue préférée ou langue par défaut
        let targetLanguage = specifiedTargetLanguage || options.targetLanguage;

        // Si la langue cible n'est pas définie ou est identique à la source, utiliser la langue par défaut
        if (!targetLanguage || targetLanguage === sourceLanguage) {
            targetLanguage = CONFIG.DEFAULT_TARGET_LANGUAGE;

            // Si la langue par défaut est identique à la source, utiliser une autre langue
            if (targetLanguage === sourceLanguage) {
                targetLanguage = sourceLanguage === 'en' ? 'fr' : 'en';
            }
        }

        return { sourceLanguage, targetLanguage };
    }

    /**
     * Fonction helper pour gérer le traitement (reformulation/traduction) du texte sélectionné.
     * @param {string} text - Le texte original.
     * @param {Function} processFunction - La fonction de traitement (rephraseTextIfEnabled ou translateTextIfEnabled).
     * @param {Object} baseOptions - Les options d'affichage de base.
     * @param {Object} processingOptions - Options spécifiques au traitement (ex: { rephrase: true } ou { translate: true }).
     * @param {Object} statusMessages - Messages i18n pour les statuts (processing, success, error).
     * @param {string} [specifiedTargetLanguage] - Langue cible optionnelle pour la traduction.
     * @private
     */
    async function _handleSelectedTextProcessing(text, processFunction, baseOptions, processingOptions, statusMessages, specifiedTargetLanguage = null) {
        // 1. Validation (déjà faite par l'appelant, mais on pourrait la remettre ici si besoin)
        // if (!window.BabelFishAIUtils.textProcessing.isValidInputText(text)) { ... }

        try {
            // 2. Préparer les options temporaires
            const tempOptions = { ...baseOptions, ...processingOptions };

            // 3. Afficher le statut "en cours"
            window.BabelFishAI.ui.showStatus(statusMessages.processing);

            // 4. Déterminer les langues si c'est une traduction
            if (processingOptions.translate) {
                const { sourceLanguage, targetLanguage } = determineTranslationLanguages(tempOptions, specifiedTargetLanguage);
                tempOptions.language = sourceLanguage;
                tempOptions.targetLanguage = targetLanguage;
            }

            // 5. Appeler la fonction de traitement
            const processedText = await processFunction(text, tempOptions);

            // 6. Vérifier si le traitement a échoué (texte inchangé)
            if (processedText === text) {
                window.BabelFishAI.ui.showStatus(statusMessages.error, 'error');
                return; // Sortir si le traitement n'a rien changé
            }

            // 7. Afficher le résultat
            // Note: On utilise les options de base pour l'affichage, pas les tempOptions
            const displayResult = await window.BabelFishAI.displayTranscriptionText(processedText, baseOptions, false);

            // 8. Afficher le statut final
            if (displayResult) {
                window.BabelFishAI.ui.showStatus(statusMessages.success);
            } else {
                window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("displayError"), 'error');
            }
        } catch (error) {
            console.error(`Erreur lors de ${statusMessages.processing}:`, error);
            window.BabelFishAI.ui.showStatus(statusMessages.error, 'error');
            // L'erreur est déjà loggée, pas besoin de la relancer ici si on ne veut pas bloquer plus haut.
        }
    }


    /**
     * Reformule un texte sélectionné sans enregistrement audio
     * @param {string} text - Le texte à reformuler
     * @returns {Promise<void>}
     */
    async function handleTextRephrasing(text) {
        // Utilisation de la fonction non obsolète de text-processing.js
        if (!window.BabelFishAIUtils.textProcessing.isValidInputText(text)) {
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("invalidTextForProcessing"), 'error');
            return;
        }
        // Stocker l'élément actif avant de commencer le traitement
        window.BabelFishAIUtils.focus.storeFocusAndSelection();
        // Récupérer les options d'affichage
        const options = await window.BabelFishAI.getDisplayOptions();
        // Appeler le helper générique
        await _handleSelectedTextProcessing(
            text,
            rephraseTextIfEnabled,
            options,
            { rephrase: true },
            {
                processing: window.BabelFishAIUtils.i18n.getMessage("rephrasingText"),
                success: window.BabelFishAIUtils.i18n.getMessage("rephrasingComplete"),
                error: window.BabelFishAIUtils.i18n.getMessage("rephrasingError")
            }
        );
    }

    /**
     * Gère la traduction d'un texte sélectionné sans enregistrement audio
     * @param {string} text - Le texte à traduire
     * @param {string} [specifiedTargetLanguage] - Langue cible spécifiée (remplace celle des options)
     * @returns {Promise<void>}
     */
    async function handleTextTranslation(text, specifiedTargetLanguage) {
        // Utilisation de la fonction non obsolète de text-processing.js
        if (!window.BabelFishAIUtils.textProcessing.isValidInputText(text)) {
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("invalidTextForProcessing"), 'error');
            return;
        }
        // Stocker l'élément actif avant de commencer le traitement
        window.BabelFishAIUtils.focus.storeFocusAndSelection();
        // Récupérer les options d'affichage
        const options = await window.BabelFishAI.getDisplayOptions();
        // Appeler le helper générique
        await _handleSelectedTextProcessing(
            text,
            translateTextIfEnabled,
            options,
            { translate: true },
            {
                processing: window.BabelFishAIUtils.i18n.getMessage("translatingText"),
                success: window.BabelFishAIUtils.i18n.getMessage("translationComplete"),
                error: window.BabelFishAIUtils.i18n.getMessage("translationError")
            },
            specifiedTargetLanguage // Passer la langue cible spécifiée
        );
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.translation = {
        // isValidInputText n'est plus exporté ici car la fonction locale a été supprimée
        rephraseTextIfEnabled,
        translateTextIfEnabled,
        determineTranslationLanguages,
        handleTextRephrasing,
        handleTextTranslation
    };

})(window.BabelFishAIUtils);
