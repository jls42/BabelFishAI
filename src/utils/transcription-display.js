window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Utilisation des constantes globales depuis constants.js
    const UI_CONFIG = window.BabelFishAIConstants.UI_CONFIG;
    const CONFIG = window.BabelFishAIConstants.CONFIG;
    const MESSAGE_TYPES = window.BabelFishAIConstants.MESSAGE_TYPES;
    const API_CONFIG = window.BabelFishAIConstants.API_CONFIG;
    const ERRORS = window.BabelFishAIConstants.ERRORS;

    /**
     * Affiche la transcription selon les options configurées
     * @param {string} text - Le texte à afficher
     * @returns {Promise<Object|boolean>} - Un objet indiquant si l'affichage a réussi et la méthode utilisée, ou false en cas d'échec
     */
    async function showTranscription(text) {
        // Valider le texte d'entrée
        if (!window.BabelFishAIUtils.textProcessing.isValidInputText(text)) {
            const errorMsg = "Texte de transcription invalide";
            console.error(`${errorMsg}:`, text);
            window.BabelFishAIUtils.error.handleError(errorMsg, "Invalid transcription text");
            return false;
        }

        try {
            // Informer l'utilisateur que le traitement est en cours
            window.BabelFishAI.ui.showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerProcessing"));

            // Récupérer les options de configuration
            const options = await getDisplayOptions();

            // Récupérer l'option autoCopy
            const { autoCopy } = await window.BabelFishAIUtils.api.getFromStorage({ autoCopy: false });

            // Étape 1: Reformuler le texte si l'option est activée
            let processedText = await processText(text, options);

            // Stocker l'élément actif avant d'afficher le texte
            window.BabelFishAIUtils.focus.storeFocusAndSelection();

            // Afficher le texte selon les options configurées
            const displayResult = await displayTranscriptionText(processedText, options, autoCopy);

            // Attendre un court délai pour permettre au navigateur de terminer les opérations DOM
            // et éviter que le texte soit automatiquement sélectionné
            await new Promise(resolve => setTimeout(resolve, 10));

            // Restaurer le focus et la position du curseur sans sélection
            window.BabelFishAIUtils.focus.restoreFocusAndSelection(true);

            // Vérifier si l'élément actif est un élément valide pour insertion de texte
            const activeElement = document.activeElement;
            const isActiveElementValid = window.BabelFishAIUtils.focus.isValidElementForInsertion(activeElement);

            // Copier dans le presse-papiers si autoCopy est activé et:
            // - soit nous sommes en mode "clipboard" (pas d'affichage visuel, juste copie)
            // - soit en mode "dialog" et l'élément actif n'est PAS un élément d'entrée valide
            if (autoCopy && displayResult &&
                (displayResult.method === 'clipboard' ||
                    (displayResult.method === 'dialog' && !isActiveElementValid))) {
                try {
                    await navigator.clipboard.writeText(processedText);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            }

            return displayResult;
        } catch (error) {
            console.error('Error displaying transcription:', error);
            window.BabelFishAIUtils.error.handleError(error instanceof Error ? error : "Erreur d'affichage de la transcription");
            return false;
        } finally {
            // Si une erreur se produit ailleurs, s'assurer que la bannière de traitement disparaît
            window.BabelFishAI.ui.hideBanner();
        }
    }

    /**
    * Traite le texte en fonction des options de reformulation et de traduction
    * @param {string} text - Le texte initial
    * @param {Object} options - Les options de configuration
    * @returns {Promise<string>} - Le texte traité
    */
    async function processText(text, options) {
        let processedText = text;
        if (options.enableRephrase) {
            processedText = await window.BabelFishAIUtils.textProcessing.handleTextRephrasing(processedText);
        }
        if (options.enableTranslation) {
            processedText = await window.BabelFishAIUtils.textProcessing.handleTextTranslation(processedText, options);
        }
        return processedText;
    }

    /**
     * Récupère les options d'affichage et de traduction depuis le stockage
     * @returns {Promise<Object>} Les options d'affichage, de traduction et de reformulation
     */
    function getDisplayOptions() {
        return window.BabelFishAIUtils.api.getFromStorage({
            activeDisplay: true,
            dialogDisplay: false,
            dialogDuration: CONFIG.DEFAULT_DIALOG_DURATION,
            enableRephrase: false,
            enableTranslation: false,
            sourceLanguage: 'fr',
            targetLanguage: 'en',
            forcedDialogDomains: CONFIG.DEFAULT_FORCED_DIALOG_DOMAINS
        });
    }

    /**
     * Détermine le mode d'affichage et affiche le texte selon les options configurées
     * @param {string} text - Le texte à afficher
     * @param {Object} options - Les options d'affichage
     * @param {boolean} autoCopy - Indique si la copie automatique est activée
     * @returns {Promise<Object|boolean>} - Un objet indiquant si l'affichage a réussi et la méthode utilisée, ou false en cas d'échec
     */
    function displayTranscriptionText(text, options, autoCopy) {
        if (!window.BabelFishAIUtils.textProcessing.isValidInputText(text)) {
            console.warn("Tentative d'affichage de texte vide");
            return false;
        }

        try {
            // Déterminer si l'affichage dans une boîte de dialogue est forcé pour ce domaine
            const currentDomain = window.location.hostname;
            const isDialogForced = Array.isArray(options.forcedDialogDomains) &&
                options.forcedDialogDomains.some(domain => currentDomain.includes(domain));

            // Tenter d'insérer le texte dans l'élément actif si l'option est activée
            let displayMethod = null;

            if (options.activeDisplay && !isDialogForced) {
                const insertedInActiveElement = window.BabelFishAIUtils.focus.handleActiveElementInsertion(text);
                if (insertedInActiveElement) {
                    displayMethod = 'activeElement';
                }
            }

            // Afficher dans une boîte de dialogue dans les cas suivants:
            // 1. Si le domaine force l'affichage en dialogue (même avec autoCopy)
            // 2. Si l'option dialogDisplay est activée (affichage explicite en dialogue demandé)
            // 3. Si aucun élément actif n'a reçu le texte et autoCopy n'est pas activé
            if (isDialogForced || options.dialogDisplay || (!autoCopy && !displayMethod)) {
                showTranscriptionDialog(text, options.dialogDuration || CONFIG.DEFAULT_DIALOG_DURATION);
                displayMethod = 'dialog';
            } else if (autoCopy && !displayMethod) {
                // Si autoCopy est activé mais qu'aucun élément n'a reçu le texte, et que le domaine
                // ne force pas l'affichage en dialogue et dialogDisplay n'est pas activé,
                // on indique que la méthode d'affichage est "clipboard"
                displayMethod = 'clipboard';
            }

            // Avertir si aucune méthode d'affichage n'est activée
            if (!displayMethod) {
                console.warn("Aucune méthode d'affichage n'est activée");
                return false;
            }

            return {
                success: true,
                method: displayMethod
            };
        } catch (error) {
            console.error("Erreur lors de l'affichage du texte:", error);
            window.BabelFishAIUtils.error.handleError(error);
            return false;
        }
    }

    /**
     * Affiche la transcription dans une boîte de dialogue flottante
     * @param {string} text - Le texte à afficher
     * @param {number} duration - Durée d'affichage en secondes
     */
    function showTranscriptionDialog(text, duration) {
        // Utiliser la fonction utilitaire pour afficher le texte dans une boîte de dialogue
        window.BabelFishAIUtils.ui.showTextInDialog(
            text,
            duration,
            (errorMessage) => window.BabelFishAI.ui.showBanner(errorMessage, MESSAGE_TYPES.ERROR)
        );
    }

    /**
     * Transcrit un blob audio en utilisant l'API Whisper
     * @param {Blob} audioBlob - Le blob audio à transcrire
     * @returns {Promise<Object>} - La réponse de l'API de transcription
     */
    async function transcribeAudio(audioBlob) {
        const apiKey = await window.BabelFishAIUtils.api.getApiKey();

        if (!apiKey) {
            const errorMsg = ERRORS.API_KEY_NOT_FOUND;
            window.BabelFishAIUtils.error.handleError(errorMsg, errorMsg);
            throw new Error(errorMsg);
        }

        try {
            // Récupérer l'URL de l'API et le modèle depuis le stockage en utilisant l'utilitaire
            const result = await window.BabelFishAIUtils.api.getFromStorage({
                apiUrl: API_CONFIG.DEFAULT_WHISPER_API_URL,
                audioModelType: API_CONFIG.WHISPER_MODEL
            });

            const apiUrl = result.apiUrl || API_CONFIG.DEFAULT_WHISPER_API_URL;
            const audioModelType = result.audioModelType;

            // Utiliser la fonction de l'API pour la transcription avec génération de nom de fichier unique
            const transcription = await window.BabelFishAIUtils.api.transcribeAudio(
                audioBlob,
                apiKey,
                apiUrl,
                audioModelType,
                null, // Pas de nom de fichier spécifique
                true  // Générer un nom de fichier unique avec timestamp et partie aléatoire
            );

            return transcription;
        } catch (error) {
            console.error('Transcription error:', error);
            throw error;
        } finally {
            // Nettoyer les ressources
            // Note: Ces variables étaient globales dans content.js, mais ici nous ne les gérons pas
            // car elles seront gérées par le module d'enregistrement
        }
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.display = {
        showTranscription,
        displayTranscriptionText,
        showTranscriptionDialog,
        getDisplayOptions,
        transcribeAudio
    };

})(window.BabelFishAIUtils);
