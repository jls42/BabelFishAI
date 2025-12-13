globalThis.BabelFishAIUtils = globalThis.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Utilisation des constantes globales depuis constants.js
    const CONFIG = globalThis.BabelFishAIConstants.CONFIG;
    const MESSAGE_TYPES = globalThis.BabelFishAIConstants.MESSAGE_TYPES;
    const ERRORS = globalThis.BabelFishAIConstants.ERRORS;

    /**
     * Affiche la transcription selon les options configurées
     * @param {string} text - Le texte à afficher
     * @returns {Promise<Object|boolean>} - Un objet indiquant si l'affichage a réussi et la méthode utilisée, ou false en cas d'échec
     */
    function validateInputText(text) {
        if (!globalThis.BabelFishAIUtils.textProcessing.isValidInputText(text)) {
            const errorMsg = "Texte de transcription invalide";
            console.error(`${errorMsg}:`, text);
            globalThis.BabelFishAIUtils.error.handleError(errorMsg, "Invalid transcription text");
            return false;
        }
        return true;
    }

    /**
     * Gère la copie automatique dans le presse-papiers si nécessaire.
     * @param {string} textToCopy - Le texte à copier.
     * @param {Object|boolean} displayResult - Le résultat de l'affichage.
     * @param {boolean} isActiveElementValid - Si l'élément actif est valide pour l'insertion.
     * @param {boolean} autoCopyEnabled - Si l'option autoCopy est activée.
     */
    async function handleAutoCopy(textToCopy, displayResult, isActiveElementValid, autoCopyEnabled) {
        // Copier dans le presse-papiers si autoCopy est activé et:
        // - soit nous sommes en mode "clipboard" (pas d'affichage visuel, juste copie)
        // - soit en mode "dialog" et l'élément actif n'est PAS un élément d'entrée valide
        if (autoCopyEnabled && displayResult &&
            (displayResult.method === 'clipboard' ||
                (displayResult.method === 'dialog' && !isActiveElementValid))) {
            try {
                await navigator.clipboard.writeText(textToCopy);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                // Ne pas bloquer l'exécution pour une erreur de copie
            }
        }
    }

    /**
     * Récupère toutes les options nécessaires (affichage, traitement, copie).
     * @returns {Promise<Object>} Un objet contenant toutes les options.
     */
    async function getAllOptions() {
        const displayOpts = await getDisplayOptions();
        const { autoCopy } = await globalThis.BabelFishAIUtils.api.getFromStorage({ autoCopy: false });
        return { ...displayOpts, autoCopy };
    }

    /**
     * Traite (reformule/traduit si activé) et affiche le texte de transcription selon les options configurées.
     * Gère également la copie automatique et la restauration du focus.
     * @param {string} text - Le texte de transcription initial à traiter et afficher.
     * @returns {Promise<Object|boolean>} Une promesse qui se résout avec un objet `{ success: boolean, method: string }` indiquant le succès et la méthode d'affichage, ou `false` en cas d'échec.
     */
    async function showTranscription(text) {
        if (!validateInputText(text)) { // NOSONAR - S6544: Faux positif, validateInputText est synchrone et retourne un booléen.
            return false;
        }

        let displayResult = false; // Initialiser à false

        try {
            // Informer l'utilisateur que le traitement est en cours
            globalThis.BabelFishAI.ui.showBanner(globalThis.BabelFishAIUtils.i18n.getMessage("bannerProcessing"));

            // Récupérer toutes les options
            const options = await getAllOptions();

            // Étape 1: Traiter le texte (reformulation/traduction)
            const processedText = await processText(text, options);

            // Stocker l'élément actif avant d'afficher le texte
            globalThis.BabelFishAIUtils.focus.storeFocusAndSelection();

            // Étape 2: Afficher le texte selon les options configurées
            displayResult = await displayTranscriptionText(processedText, options, options.autoCopy);

            // Attendre un court délai pour les opérations DOM
            await new Promise(resolve => setTimeout(resolve, 10));

            // Restaurer le focus sans sélection
            globalThis.BabelFishAIUtils.focus.restoreFocusAndSelection(true);

            // Vérifier la validité de l'élément actif après restauration
            const isActiveElementValid = globalThis.BabelFishAIUtils.focus.isValidElementForInsertion(document.activeElement);

            // Étape 3: Gérer la copie automatique
            await handleAutoCopy(processedText, displayResult, isActiveElementValid, options.autoCopy);

            return displayResult; // Retourner le résultat de l'affichage

        } catch (error) {
            console.error('Error displaying transcription:', error);
            globalThis.BabelFishAIUtils.error.handleError(error instanceof Error ? error : "Erreur d'affichage de la transcription");
            return false; // Retourner false en cas d'erreur
        } finally {
            // Cacher la bannière de traitement dans tous les cas (succès ou erreur)
            globalThis.BabelFishAI.ui.hideBanner();
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
            processedText = await globalThis.BabelFishAIUtils.textProcessing.handleTextRephrasing(processedText);
        }
        if (options.enableTranslation) {
            processedText = await globalThis.BabelFishAIUtils.textProcessing.handleTextTranslation(processedText, options);
        }
        return processedText;
    }

    /**
     * Récupère les options d'affichage et de traduction depuis le stockage
     * @returns {Promise<Object>} Les options d'affichage, de traduction et de reformulation
     */
    function getDisplayOptions() {
        return globalThis.BabelFishAIUtils.api.getFromStorage({
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
      * Détermine la méthode d'affichage à utiliser en fonction des options et du contexte
      * @param {string} text - Le texte à afficher
      * @param {Object} options - Les options d'affichage
      * @param {boolean} autoCopy - Indique si la copie automatique est activée
      * @param {string} currentDomain - Le domaine actuel
      * @returns {string|null} - La méthode d'affichage à utiliser, ou null si aucune méthode n'est applicable
      */
    function determineDisplayMethod(text, options, autoCopy, currentDomain) {
        const isDialogForced = Array.isArray(options.forcedDialogDomains) &&
            options.forcedDialogDomains.some(domain => currentDomain.includes(domain));

        const activeElement = document.activeElement;
        const isValidForInsertion = globalThis.BabelFishAIUtils.focus.isValidElementForInsertion(activeElement);

        // 1. Si l'élément actif est valide et l'option activeDisplay est activée, utiliser activeElement
        if (options.activeDisplay && isValidForInsertion) {
            return 'activeElement';
        }

        // 2. Si autoCopy est activé, utiliser clipboard
        if (autoCopy) {
            return 'clipboard';
        }

        // 3. Si dialogDisplay est activé ou si le domaine force la boîte de dialogue, utiliser dialog
        if (options.dialogDisplay || isDialogForced) {
            return 'dialog';
        }

        // Par défaut, utiliser la boîte de dialogue si aucune autre condition n'est remplie
        return 'dialog';
    }

    /**
     * Détermine le mode d'affichage et affiche le texte selon les options configurées
     * @param {string} text - Le texte à afficher
     * @param {Object} options - Les options d'affichage
     * @param {boolean} autoCopy - Indique si la copie automatique est activée
     * @returns {Promise<Object|boolean>} - Un objet indiquant si l'affichage a réussi et la méthode utilisée, ou false en cas d'échec
     */
    function displayTranscriptionText(text, options, autoCopy) {
        try {
            // Déterminer si l'affichage dans une boîte de dialogue est forcé pour ce domaine
            const currentDomain = globalThis.location.hostname;
            const displayMethod = determineDisplayMethod(text, options, autoCopy, currentDomain);

            // Afficher le texte en fonction de la méthode déterminée
            if (displayMethod === 'dialog') {
                showTranscriptionDialog(text, options.dialogDuration || CONFIG.DEFAULT_DIALOG_DURATION);
            } else if (displayMethod === 'activeElement') {
                // Inserer le texte dans l'élément actif
                globalThis.BabelFishAIUtils.focus.handleActiveElementInsertion(text);
            } else if (displayMethod === 'clipboard') {
                // Ne rien faire, le texte sera copié dans le presse-papiers plus tard
            }

            return {
                success: true,
                method: displayMethod
            };
        } catch (error) {
            console.error("Erreur lors de l'affichage du texte:", error);
            globalThis.BabelFishAIUtils.error.handleError(error);
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
        globalThis.BabelFishAIUtils.ui.showTextInDialog(
            text,
            duration,
            (errorMessage) => globalThis.BabelFishAI.ui.showBanner(errorMessage, MESSAGE_TYPES.ERROR)
        );
    }

    /**
     * Transcrit un blob audio en utilisant l'API de transcription (multi-provider)
     * Supporte OpenAI Whisper, Mistral Voxtral, etc.
     * @param {Blob} audioBlob - Le blob audio à transcrire
     * @returns {Promise<Object>} - La réponse de l'API de transcription
     */
    async function transcribeAudio(audioBlob) {
        try {
            // Utiliser resolveApiConfig pour obtenir la config multi-provider
            const config = await globalThis.BabelFishAIUtils.api.resolveApiConfig('transcription');

            if (!config.apiKey) {
                const errorMsg = ERRORS.API_KEY_NOT_FOUND;
                globalThis.BabelFishAIUtils.error.handleError(errorMsg, errorMsg);
                throw new Error(errorMsg);
            }

            console.log('[Display] Using transcription provider:', config.providerId, 'model:', config.model, 'url:', config.url);

            // Utiliser la fonction de l'API pour la transcription avec génération de nom de fichier unique
            const transcription = await globalThis.BabelFishAIUtils.api.transcribeAudio(
                audioBlob,
                config.apiKey,
                config.url,
                config.model,
                null, // Pas de nom de fichier spécifique
                true  // Générer un nom de fichier unique avec timestamp et partie aléatoire
            );

            return transcription;
        } catch (error) {
            console.error('Transcription error:', error);
            throw error;
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

})(globalThis.BabelFishAIUtils);
