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
            // Récupérer la clé API
            const apiKey = await window.BabelFishAI.getOrFetchApiKey();
            if (!apiKey) {
                throw new Error(ERRORS.API_KEY_NOT_FOUND);
            }

            // Afficher un message de statut
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("rephrasingText"));

            // Construire la requête pour l'API de reformulation
            const requestData = {
                model: API_CONFIG.CHAT_MODEL,
                messages: [
                    { role: "system", content: API_CONFIG.REPHRASE_SYSTEM_PROMPT },
                    { role: "user", content: text }
                ],
                temperature: 0.7,
                max_tokens: 2000
            };

            // Appeler l'API de reformulation
            const response = await fetch(API_CONFIG.CHAT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erreur API: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            return data.choices[0]?.message?.content || text;
        } catch (error) {
            console.error("Erreur lors de la reformulation:", error);
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("rephrasingError"), 'error');
            return text;
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
            // Récupérer la clé API
            const apiKey = await window.BabelFishAI.getOrFetchApiKey();
            if (!apiKey) {
                throw new Error(ERRORS.API_KEY_NOT_FOUND);
            }

            // Afficher un message de statut
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("translatingText"));

            // Déterminer les langues source et cible
            const { sourceLanguage, targetLanguage } = determineTranslationLanguages(options);

            // Construire la requête pour l'API de traduction
            const requestData = {
                model: API_CONFIG.CHAT_MODEL,
                messages: [
                    {
                        role: "system",
                        content: API_CONFIG.TRANSLATE_SYSTEM_PROMPT
                            .replace("{{SOURCE_LANG}}", window.BabelFishAIUtils.i18n.getLanguageName(sourceLanguage) || sourceLanguage)
                            .replace("{{TARGET_LANG}}", window.BabelFishAIUtils.i18n.getLanguageName(targetLanguage) || targetLanguage)
                    },
                    { role: "user", content: text }
                ],
                temperature: 0.3,
                max_tokens: 2000
            };

            // Appeler l'API de traduction
            const response = await fetch(API_CONFIG.CHAT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erreur API: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            return data.choices[0]?.message?.content || text;
        } catch (error) {
            console.error("Erreur lors de la traduction:", error);
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("translationError"), 'error');
            return text;
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

        try {
            // Récupérer les options d'affichage
            const options = await window.BabelFishAI.getDisplayOptions();

            // Activer temporairement l'option de reformulation
            const tempOptions = { ...options, rephrase: true };

            // Reformuler le texte
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("rephrasingText"));
            const rephrasedText = await rephraseTextIfEnabled(text, tempOptions);

            if (rephrasedText === text) {
                window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("rephrasingError"), 'error');
                return;
            }

            // Afficher le texte reformulé
            const displayResult = await window.BabelFishAI.displayTranscriptionText(rephrasedText, options, false);

            if (displayResult) {
                window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("rephrasingComplete"));
            } else {
                window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("displayError"), 'error');
            }
        } catch (error) {
            console.error("Erreur lors de la reformulation:", error);
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("rephrasingError"), 'error');
        }
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

        try {
            // Récupérer les options d'affichage
            const options = await window.BabelFishAI.getDisplayOptions();

            // Activer temporairement l'option de traduction
            const tempOptions = { ...options, translate: true };

            // Traduire le texte
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("translatingText"));

            // Déterminer les langues source et cible
            const { sourceLanguage, targetLanguage } = determineTranslationLanguages(tempOptions, specifiedTargetLanguage);

            // Mettre à jour les options avec les langues déterminées
            tempOptions.language = sourceLanguage;
            tempOptions.targetLanguage = targetLanguage;

            const translatedText = await translateTextIfEnabled(text, tempOptions);

            if (translatedText === text) {
                window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("translationError"), 'error');
                return;
            }

            // Afficher le texte traduit
            const displayResult = await window.BabelFishAI.displayTranscriptionText(translatedText, options, false);

            if (displayResult) {
                window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("translationComplete"));
            } else {
                window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("displayError"), 'error');
            }
        } catch (error) {
            console.error("Erreur lors de la traduction:", error);
            window.BabelFishAI.ui.showStatus(window.BabelFishAIUtils.i18n.getMessage("translationError"), 'error');
        }
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
