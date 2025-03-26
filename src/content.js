(async function () {
    if (window.__whisperContentScriptHasRun) return;
    window.__whisperContentScriptHasRun = true;

    // Charger le script de langues partagées comme un script standard
    try {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('src/utils/languages-shared.js');
        script.onload = () => {
            script.remove();
        };
        (document.head || document.documentElement).appendChild(script);
    } catch (error) {
        console.error("Failed to load languages-shared.js:", error);
    }

    // Importer les utilitaires dynamiquement et s'assurer qu'ils sont initialisés correctement
    try {
        await import(chrome.runtime.getURL('src/utils/i18n.js'));
        await import(chrome.runtime.getURL('src/utils/focus-utils.js'));
        await import(chrome.runtime.getURL('src/utils/error-utils.js'));
        await import(chrome.runtime.getURL('src/utils/recording-utils.js'));
        await import(chrome.runtime.getURL('src/utils/text-processing.js'));
        await import(chrome.runtime.getURL('src/utils/event-handlers.js'));
        await import(chrome.runtime.getURL('src/utils/transcription-display.js'));
        await import(chrome.runtime.getURL('src/utils/text-translation.js'));
        await import(chrome.runtime.getURL('src/utils/banner-utils.js'));
        await import(chrome.runtime.getURL('src/utils/ui.js'));
        await import(chrome.runtime.getURL('src/utils/api-utils.js'));
        // Initialisation après l'importation
        await window.BabelFishAIUtils.i18n.init();

        // Créer l'espace de noms BabelFishAI pour les fonctions principales
        window.BabelFishAI = window.BabelFishAI || {};

        // Initialiser l'espace de noms UI (les fonctions seront exposées plus bas dans le code)
        window.BabelFishAI.ui = {};

        // Créer un événement personnalisé pour signaler que i18n est chargé
        const i18nLoadedEvent = new CustomEvent('babelfishai:i18n-loaded');
        document.dispatchEvent(i18nLoadedEvent);
    } catch (error) {
        console.error("Failed to import utility scripts:", error);
    }

    // Content script de l'extension de transcription vocale

    // Utilisation directe des constantes globales depuis constants.js
    const CONFIG = window.BabelFishAIConstants.CONFIG;
    // API_CONFIG n'est plus utilisé directement dans ce fichier après refactorisation
    const UI_CONFIG = window.BabelFishAIConstants.UI_CONFIG;

    // Utilisation des constantes globales pour les types de messages
    // ACTIONS n'est plus utilisé directement dans ce fichier après refactorisation
    const MESSAGE_TYPES = window.BabelFishAIConstants.MESSAGE_TYPES;

    // CANCEL_MESSAGE n'est plus utilisé directement dans ce fichier après refactorisation

    // ERRORS n'est plus utilisé directement dans ce fichier après refactorisation

    // safeExecute n'est plus utilisé directement dans ce fichier après refactorisation

    // État global
    let recordingBanner = null;
    // apiKey n'est plus utilisé globalement dans ce fichier après refactorisation
    let bannerColorStart = UI_CONFIG.DEFAULT_BANNER_COLOR_START;
    let bannerColorEnd = UI_CONFIG.DEFAULT_BANNER_COLOR_END;
    let bannerOpacity = UI_CONFIG.DEFAULT_BANNER_OPACITY;

    // lastFocusInfo n'est plus utilisé directement dans ce fichier après refactorisation vers focus-utils.js

    // La fonction storeFocusAndSelection a été migrée vers focus-utils.js

    // La fonction isStoredElementValid a été migrée vers focus-utils.js

    // La fonction restoreFocus a été migrée vers focus-utils.js

    // La fonction handleInputCursorPosition a été migrée vers focus-utils.js

    // La fonction findLastTextNode a été migrée vers focus-utils.js

    // La fonction handleContentEditableCursor a été migrée vers focus-utils.js

    // La fonction restoreFocusAndSelection a été migrée vers focus-utils.js

    /**
     * Initialise les options de l'extension
     */
    async function initializeExtensionOptions() {
        try {
            // Initialisation de la clé API (assignation supprimée car apiKey n'est plus utilisé globalement ici)
            await window.BabelFishAIUtils.api.getApiKey();
            // Pas besoin d'afficher d'erreur ici si la clé est null,
            // car getApiKey() gère déjà l'affichage d'un message approprié
        } catch (error) {
            // Seulement afficher une erreur si c'est une exception inattendue
            console.error("Erreur inattendue lors du chargement de la clé API:", error);
        }

        // Initialisation des options de couleur du bandeau en utilisant l'utilitaire
        try {
            const result = await window.BabelFishAIUtils.api.getFromStorage({
                bannerColorStart: UI_CONFIG.DEFAULT_BANNER_COLOR_START,
                bannerColorEnd: UI_CONFIG.DEFAULT_BANNER_COLOR_END,
                bannerOpacity: UI_CONFIG.DEFAULT_BANNER_OPACITY
            });

            bannerColorStart = result.bannerColorStart;
            bannerColorEnd = result.bannerColorEnd;
            bannerOpacity = result.bannerOpacity;

            if (recordingBanner) {
                updateBannerColor();
            }
        } catch (error) {
            console.error("Erreur lors du chargement des couleurs de la bannière:", error);
        }
    }

    // Initialiser les options de l'extension
    initializeExtensionOptions();

    /**
     * Met à jour la couleur du bandeau en utilisant la fonction de l'utilitaire banner
     * @param {boolean} [force=false] - Forcer la mise à jour même si la bannière est en mode erreur
     * @returns {boolean} - Indique si la mise à jour a réussi
     */
    function updateBannerColor(force = false) {
        // Éviter de mettre à jour la couleur si la bannière n'existe pas
        if (!recordingBanner) return false;

        // Utiliser la fonction de l'utilitaire banner pour mettre à jour la couleur du bandeau
        window.BabelFishAIUtils.banner.updateBannerColor(
            recordingBanner,
            bannerColorStart || UI_CONFIG.DEFAULT_BANNER_COLOR_START,
            bannerColorEnd || UI_CONFIG.DEFAULT_BANNER_COLOR_END,
            bannerOpacity,
            force
        );

        return true;
    }

    /**
     * Démarre l'enregistrement audio avec optimisation pour la performance
     * @returns {Promise<boolean>} - Indique si l'enregistrement a démarré avec succès
     */
    // Utilisation de la fonction startRecording depuis recording-utils.js
    async function startRecording() {
        return window.BabelFishAIUtils.recording.startRecording();
    }

    // La fonction processRecordedAudio a été déplacée vers recording-utils.js

    // La fonction cleanupRecordingResources a été déplacée vers recording-utils.js

    // La fonction setupMediaRecorderEvents a été déplacée vers recording-utils.js

    /**
     * Arrête l'enregistrement en cours
     * @param {boolean} [cancelProcessing=false] - Si true, annule le traitement de l'audio enregistré
     * @returns {boolean} - Indique si l'arrêt a été effectué
     */
    function stopRecording(cancelProcessing = false) {
        // Utiliser la fonction stopRecording de recording-utils.js
        return window.BabelFishAIUtils.recording.stopRecording(cancelProcessing);
    }

    /**
     * Annule l'enregistrement en cours sans traiter l'audio
     * @returns {boolean} - Indique si l'annulation a réussi
     */
    function cancelRecording() {
        // Utiliser la fonction cancelRecording de recording-utils.js
        return window.BabelFishAIUtils.recording.cancelRecording();
    }


    /**
     * Transcrit l'audio en texte via l'API Whisper en utilisant la fonction de l'API
     * @param {Blob} audioBlob - Le blob audio à transcrire
     * @returns {Promise<string>} Le texte transcrit
     */
    // La fonction transcribeAudio locale a été supprimée car la logique est maintenant gérée
    // par les modules utilitaires (e.g., window.BabelFishAIUtils.api.transcribeAudio)

    /**
     * Récupère les options d'affichage et de traduction depuis le stockage
     * @returns {Promise<Object>} Les options d'affichage, de traduction et de reformulation
     */
    function getDisplayOptions() {
        // Cette fonction a été migrée vers transcription-display.js
        return window.BabelFishAIUtils.display.getDisplayOptions();
    }

    // La fonction rephraseTextIfEnabled locale a été supprimée car la logique est maintenant gérée
    // par les modules utilitaires (e.g., window.BabelFishAIUtils.textProcessing.handleTextRephrasing)

    // La fonction translateTextIfEnabled locale a été supprimée car la logique est maintenant gérée
    // par les modules utilitaires (e.g., window.BabelFishAIUtils.textProcessing.handleTextTranslation)

    // La fonction displayTranscriptionText locale a été supprimée car la logique est maintenant gérée
    // par le module transcription-display.js

    /**
     * Affiche la transcription selon les options configurées
     * @param {string} text - Le texte à afficher
     * @returns {Promise<Object|boolean>} - Un objet indiquant si l'affichage a réussi et la méthode utilisée, ou false en cas d'échec
     */
    async function showTranscription(text) {
        // Cette fonction a été migrée vers transcription-display.js
        return window.BabelFishAIUtils.display.showTranscription(text);
    }

    /**
     * Vérifie si l'élément actif est valide pour l'insertion de texte
     * @param {HTMLElement} activeElement - L'élément actif
     * @returns {boolean} - True si l'élément est valide pour l'insertion de texte
     */
    function isValidElementForInsertion(activeElement) {
        // Cette fonction a été migrée vers focus-utils.js
        return window.BabelFishAIUtils.focus.isValidElementForInsertion(activeElement);
    }

    // La fonction insertInContentEditable locale a été supprimée car la logique est maintenant gérée
    // par le module focus-utils.js

    // La fonction handleActiveElementInsertion locale a été supprimée car la logique est maintenant gérée
    // par le module focus-utils.js

    // La fonction insertTextIntoInput locale a été supprimée car la logique est maintenant gérée
    // par le module focus-utils.js

    /**
     * Affiche la transcription dans une boîte de dialogue flottante
     * @param {string} text - Le texte à afficher
     * @param {number} duration - Durée d'affichage en secondes
     */
    function showTranscriptionDialog(text, duration) {
        // Cette fonction a été migrée vers transcription-display.js
        return window.BabelFishAIUtils.display.showTranscriptionDialog(text, duration);
    }

    // Fonction de débogage supprimée - nous utilisons maintenant une approche directe
    // en vérifiant si l'élément actif est valide pour l'insertion au moment de la copie

    // La fonction createBannerButton a été migrée vers ui.js

    /**
     * Crée un sélecteur de langue pour la bannière
     * @returns {Object} Un objet contenant le conteneur et le sélecteur
     */
    // La fonction createLanguageSelector a été migrée vers banner-utils.js

    // La fonction initializeLanguageSelector a été migrée vers banner-utils.js

    // La fonction populateLanguageSelect a été migrée vers banner-utils.js

    // La fonction populateLanguageFromStorage a été migrée vers banner-utils.js

    // La fonction setupBannerEventListeners a été migrée vers banner-utils.js

    /**
     * Initialise la bannière d'état avec des contrôles pour la reformulation et la traduction
     * @returns {HTMLElement} La bannière créée
     */
    function initBanner() {
        // Vérifier si la bannière existe déjà
        if (recordingBanner && document.body.contains(recordingBanner)) {
            return recordingBanner;
        }

        // Utiliser la fonction du module banner-utils pour créer la bannière
        recordingBanner = window.BabelFishAIUtils.banner.initBanner();

        // Insérer la bannière dans le document
        if (document.body) {
            document.body.insertBefore(recordingBanner, document.body.firstChild);
            document.body.style.paddingTop = '35px';
            updateBannerColor(true);
        } else {
            // Si document.body n'est pas encore disponible
            document.addEventListener('DOMContentLoaded', () => {
                document.body.insertBefore(recordingBanner, document.body.firstChild);
                document.body.style.paddingTop = '35px';
                updateBannerColor(true);
            });
        }

        return recordingBanner;
    }

    // Initialiser la bannière
    initBanner();

    /**
     * Affiche la bannière avec un message en utilisant la structure de notre bannière personnalisée
     * @param {string} text - Le message à afficher
     * @param {string} type - Le type de message ('info' ou 'error')
     * @returns {boolean} - Indique si l'affichage a réussi
     */
    function showBanner(text, type = MESSAGE_TYPES.INFO) {
        // Utiliser la fonction de l'utilitaire banner-utils pour afficher la bannière
        return window.BabelFishAIUtils.banner.showBanner(
            recordingBanner,
            text,
            type,
            window.BabelFishAIUtils.recording.isCurrentlyRecording(),
            updateBannerColor
        );
    }

    /**
     * Cache la bannière en modifiant son style d'affichage
     * @returns {boolean} - Indique si l'opération a réussi
     */
    function hideBanner() {
        return window.BabelFishAIUtils.banner.toggleBannerVisibility(recordingBanner, false);
    }

    // Les fonctions UI seront exposées plus bas dans le code
    // dans l'objet window.BabelFishAI.ui

    /**
     * Gère les erreurs de manière centralisée en affichant un message à l'utilisateur
     * et en informant le background script
     * @param {string|Error} displayMessage - Le message à afficher à l'utilisateur ou l'erreur complète
     * @param {string} [errorMessage] - Le message d'erreur technique à envoyer au background script
     */
    function handleError(displayMessage, errorMessage) {
        // Utiliser la fonction du module error-utils
        return window.BabelFishAIUtils.error.handleError(displayMessage, errorMessage);
    }

    /**
     * Affiche un message d'état dans la bannière
     * @param {string} text - Le message à afficher
     * @param {string} [type='info'] - Le type de message ('info', 'error', etc.)
     * @returns {boolean} - Indique si l'affichage a réussi
     */
    function showStatus(text, type = 'info') {
        // S'assurer que la bannière est initialisée
        if (!recordingBanner) {
            initBanner();
        }

        // Utiliser la fonction du module banner-utils
        return window.BabelFishAIUtils.banner.showStatus(recordingBanner, text, type);
    }

    // Exposer les fonctions d'interface utilisateur dans l'espace de noms window.BabelFishAI.ui
    window.BabelFishAI.ui = {
        showBanner,
        hideBanner,
        handleError,
        showStatus,
        showTranscription, // Cette fonction sera définie plus bas dans le code
        // Ajouter une fonction pour obtenir la bannière (utilisée par error-utils)
        getBanner: () => recordingBanner
    };

    // Exposer les fonctions d'enregistrement dans l'espace de noms window.BabelFishAI
    window.BabelFishAI.startRecording = startRecording;
    window.BabelFishAI.stopRecording = stopRecording;
    window.BabelFishAI.cancelRecording = cancelRecording;

    // Exposer les fonctions de traitement de texte dans l'espace de noms window.BabelFishAI
    window.BabelFishAI.handleTextRephrasing = handleTextRephrasing;
    window.BabelFishAI.handleTextTranslation = handleTextTranslation;
    window.BabelFishAI.isValidInputText = isValidInputText;

    // Exposer la fonction de mise à jour de la couleur du bandeau
    // Cette fonction est appelée depuis event-handlers.js lors des changements d'options
    window.BabelFishAI.updateBannerColor = updateBannerColor;

    /**
     * Reformule un texte sélectionné sans enregistrement audio
     * @param {string} text - Le texte à reformuler
     * @returns {Promise<void>}
     */
    /**
     * Valide si le texte d'entrée est valide pour le traitement
     * @param {string} text - Texte à valider
     * @returns {boolean} - True si le texte est valide
     */
    function isValidInputText(text) {
        // Utiliser la fonction du module text-processing
        return window.BabelFishAIUtils.textProcessing.isValidInputText(text);
    }

    // La fonction getOrFetchApiKey locale a été supprimée car la logique est maintenant gérée
    // par le module api-utils.js

    /**
     * Insère le texte dans un élément éditable
     * @param {Element} activeElement - Élément cible pour l'insertion
     * @param {string} newText - Texte à insérer
     * @returns {boolean} - True si l'insertion a réussi
     */
    function insertTextInEditableElement(activeElement, newText) {
        return window.BabelFishAIUtils.focus.insertTextInEditableElement(activeElement, newText);
    }

    // La fonction insertInInputElement locale a été supprimée car la logique est maintenant gérée
    // par le module focus-utils.js

    // La fonction insertInContentEditableElement a été fusionnée avec insertInContentEditable

    /**
     * Reformule un texte sélectionné sans enregistrement audio
     * @param {string} text - Le texte à reformuler
     * @returns {Promise<void>}
     */
    async function handleTextRephrasing(text) {
        try {
            // Stocker l'élément actif avant de commencer le traitement
            window.BabelFishAIUtils.focus.storeFocusAndSelection();

            // Utiliser la fonction du module text-processing pour la reformulation
            const rephrasedText = await window.BabelFishAIUtils.textProcessing.handleTextRephrasing(text);

            // Obtenir les options d'affichage
            const options = await getDisplayOptions();

            // Vérifier si l'élément actif est une zone de texte éditable
            const activeElement = document.activeElement;
            let replacedInEditable = false;

            if (isValidElementForInsertion(activeElement)) {
                replacedInEditable = insertTextInEditableElement(activeElement, rephrasedText);
            }

            // Si le remplacement n'a pas fonctionné, afficher dans une boîte de dialogue
            if (!replacedInEditable) {
                showTranscriptionDialog(rephrasedText, options.dialogDuration || CONFIG.DEFAULT_DIALOG_DURATION);
            }
        } catch (error) {
            console.error('Erreur lors de la reformulation dans content.js:', error);
            // L'erreur a déjà été gérée dans le module text-processing
        }
    }

    /**
     * Gère la traduction d'un texte sélectionné sans enregistrement audio
     * @param {string} text - Le texte à traduire
     * @param {string} [specifiedTargetLanguage] - Langue cible spécifiée (remplace celle des options)
     * @returns {Promise<void>}
     */
    // La fonction determineTranslationLanguages locale a été supprimée car la logique est maintenant gérée
    // par le module text-processing.js

    /**
     * Gère la traduction d'un texte sélectionné sans enregistrement audio
     * @param {string} text - Le texte à traduire
     * @param {string} [specifiedTargetLanguage] - Langue cible spécifiée (remplace celle des options)
    * @returns {Promise<void>}
    */
    async function handleTextTranslation(text, specifiedTargetLanguage) {
        try {
            // Stocker l'élément actif avant de commencer le traitement
            window.BabelFishAIUtils.focus.storeFocusAndSelection();

            // Obtenir les options de traduction
            const options = await getDisplayOptions();

            // Utiliser la fonction du module text-processing pour la traduction
            const translatedText = await window.BabelFishAIUtils.textProcessing.handleTextTranslation(text, options, specifiedTargetLanguage);

            // Vérifier si l'élément actif est une zone de texte éditable
            const activeElement = document.activeElement;
            let replacedInEditable = false;

            if (isValidElementForInsertion(activeElement)) {
                replacedInEditable = insertTextInEditableElement(activeElement, translatedText);
            }

            // Si le remplacement n'a pas fonctionné, afficher dans une boîte de dialogue
            if (!replacedInEditable) {
                showTranscriptionDialog(translatedText, options.dialogDuration || CONFIG.DEFAULT_DIALOG_DURATION);
            }
        } catch (error) {
            console.error('Erreur lors de la traduction dans content.js:', error);
            // L'erreur a déjà été gérée dans le module text-processing
        }
    }

    // La fonction handleBackgroundMessages a été déplacée vers event-handlers.js

    // Initialiser le module de gestion d'événements avec les références nécessaires
    window.BabelFishAIUtils.events.init({
        recordingBanner,
        bannerColorStart,
        bannerColorEnd
    });

    // Écouter les messages du background script en utilisant la fonction du module event-handlers.js
    chrome.runtime.onMessage.addListener(window.BabelFishAIUtils.events.handleBackgroundMessages);

    // La fonction handleKeyboardEvents a été déplacée vers event-handlers.js

    // Ajouter l'écouteur d'événement pour les touches du clavier en utilisant la fonction du module event-handlers.js
    document.addEventListener('keydown', window.BabelFishAIUtils.events.handleKeyboardEvents);

    /**
     * Met à jour les options de couleur du bandeau
     * @param {Object} changes - Les changements dans les options
     */
    // La fonction updateBannerColorOptions a été déplacée vers event-handlers.js

    // La fonction handleStorageChanges a été déplacée vers event-handlers.js

    // Écouter les changements dans les options en utilisant la fonction du module event-handlers.js
    chrome.storage.onChanged.addListener(window.BabelFishAIUtils.events.handleStorageChanges);
})();
