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
        
        console.log("Content script and utility modules injected!");

        // Créer un événement personnalisé pour signaler que i18n est chargé
        const i18nLoadedEvent = new CustomEvent('babelfishai:i18n-loaded');
        document.dispatchEvent(i18nLoadedEvent);
    } catch (error) {
        console.error("Failed to import utility scripts:", error);
    }

    // Content script de l'extension de transcription vocale

    // Utilisation directe des constantes globales depuis constants.js
    const CONFIG = window.BabelFishAIConstants.CONFIG;
    const API_CONFIG = window.BabelFishAIConstants.API_CONFIG;
    const UI_CONFIG = window.BabelFishAIConstants.UI_CONFIG;

    // Utilisation des constantes globales pour les actions et types de messages
    const ACTIONS = window.BabelFishAIConstants.ACTIONS;
    const MESSAGE_TYPES = window.BabelFishAIConstants.MESSAGE_TYPES;

    // Constantes spécifiques pour les messages d'annulation
    const CANCEL_MESSAGE = {
        RECORDING_CANCELED: window.BabelFishAIUtils.i18n?.getMessage("recordingCanceled") || "Enregistrement annulé (touche Échap)."
    };

    // Erreurs spécifiques au content script
    const ERRORS = {
        API_KEY_NOT_FOUND: window.BabelFishAIConstants.ERRORS.API_KEY_NOT_FOUND,
        CHROME_STORAGE_ERROR: window.BabelFishAIConstants.ERRORS.CHROME_STORAGE_ERROR,
        MIC_ACCESS_ERROR: window.BabelFishAIConstants.ERRORS.MIC_ACCESS_ERROR,
        TRANSCRIPTION_ERROR: window.BabelFishAIConstants.ERRORS.TRANSCRIPTION_ERROR,
        NO_EDITABLE_ELEMENT: window.BabelFishAIConstants.ERRORS.NO_EDITABLE_ELEMENT
    };

    // Utilisation de la fonction safeExecute depuis error-utils.js
    const safeExecute = window.BabelFishAIUtils.error.safeExecute;

    // État global
    let recordingBanner = null;
    let apiKey = null;
    let bannerColorStart = UI_CONFIG.DEFAULT_BANNER_COLOR_START;
    let bannerColorEnd = UI_CONFIG.DEFAULT_BANNER_COLOR_END;
    let bannerOpacity = UI_CONFIG.DEFAULT_BANNER_OPACITY;

    // Variable pour stocker les informations de focus et de sélection
    const lastFocusInfo = {
        element: null,
        selectionStart: 0,
        selectionEnd: 0,
        range: null
    };

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
            // Initialisation de la clé API
            apiKey = await window.BabelFishAIUtils.api.getApiKey();
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
        return await window.BabelFishAIUtils.recording.startRecording();
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
    async function transcribeAudio(audioBlob) {
        try {
            // Récupérer la clé API depuis le stockage
            const apiKey = await window.BabelFishAIUtils.api.getApiKey();
            if (!apiKey) {
                const errorMsg = ERRORS.API_KEY_NOT_FOUND;
                window.BabelFishAI.ui.handleError(errorMsg, errorMsg);
                throw new Error(errorMsg);
            }

            // Récupérer l'URL de l'API et le modèle depuis le stockage
            const result = await window.BabelFishAIUtils.api.getFromStorage({
                apiUrl: API_CONFIG.DEFAULT_WHISPER_API_URL,
                audioModelType: API_CONFIG.WHISPER_MODEL
            });

            const apiUrl = result.apiUrl || API_CONFIG.DEFAULT_WHISPER_API_URL;
            const audioModelType = result.audioModelType;

            // Utiliser directement la fonction dans api-utils.js
            const transcription = await window.BabelFishAIUtils.api.transcribeAudio(
                audioBlob,
                apiKey,
                apiUrl,
                audioModelType,
                null, // Pas de nom de fichier spécifique
                true  // Générer un nom de fichier unique
            );
            
            return transcription;
        } catch (error) {
            console.error('Transcription error:', error);
            throw error;
        } finally {
            // Nettoyer les ressources spécifiques à content.js
            if (Array.isArray(audioChunks)) {
                audioChunks.length = 0;
            }
            audioBlob = null;
        }
    }

    /**
     * Récupère les options d'affichage et de traduction depuis le stockage
     * @returns {Promise<Object>} Les options d'affichage, de traduction et de reformulation
     */
    function getDisplayOptions() {
        // Cette fonction a été migrée vers transcription-display.js
        return window.BabelFishAIUtils.display.getDisplayOptions();
    }

    /**
     * Reformule le texte si l'option est activée
     * @param {string} text - Le texte à reformuler
     * @param {Object} options - Les options de reformulation
     * @returns {Promise<string>} Le texte reformulé ou le texte original en cas d'erreur
     */
    async function rephraseTextIfEnabled(text, options) {
        if (!options.enableRephrase) {
            return text;
        }

        try {
            // Informer l'utilisateur que la reformulation est en cours
            showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerRephrasing") || "Reformulation en cours...");

            // Utiliser la fonction rephraseText du module text-processing
            const rephrasedText = await window.BabelFishAIUtils.textProcessing.rephraseText(
                text,
                apiKey
            );

            // Vérifier que la reformulation est valide
            if (rephrasedText?.trim()) {
                // Cacher la bannière une fois la reformulation terminée
                hideBanner();
                return rephrasedText;
            } else {
                throw new Error('Empty rephrasing result');
            }
        } catch (error) {
            console.error('Rephrasing failed:', error);
            handleError(window.BabelFishAIUtils.i18n.getMessage("bannerRephrasingError") || "Erreur lors de la reformulation", error.message);
            // En cas d'erreur de reformulation, on utilise le texte original
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
        if (!options.enableTranslation) {
            return text;
        }

        try {
            // Informer l'utilisateur que la traduction est en cours
            showBanner(window.BabelFishAIUtils.i18n.getMessage("bannerTranslating"));

            // Utiliser la fonction translateText du module text-processing
            const translatedText = await window.BabelFishAIUtils.textProcessing.translateText(
                text,
                options.sourceLanguage,
                options.targetLanguage,
                apiKey
            );

            // Vérifier que la traduction est valide
            if (translatedText && translatedText.trim()) {
                // Cacher la bannière une fois la traduction terminée
                hideBanner();
                return translatedText;
            } else {
                throw new Error('Empty translation result');
            }
        } catch (error) {
            console.error('Translation failed:', error);
            handleError(window.BabelFishAIUtils.i18n.getMessage("bannerTranslationError"), error.message);
            // En cas d'erreur de traduction, on utilise le texte original
            return text;
        }
    }


    /**
     * Détermine le mode d'affichage et affiche le texte selon les options configurées
     * @param {string} text - Le texte à afficher
     * @param {Object} options - Les options d'affichage
     * @param {boolean} autoCopy - Indique si la copie automatique est activée
     * @returns {Promise<Object|boolean>} - Un objet indiquant si l'affichage a réussi et la méthode utilisée, ou false en cas d'échec
     */
    function displayTranscriptionText(text, options, autoCopy) {
        // Cette fonction a été migrée vers transcription-display.js
        return window.BabelFishAIUtils.display.displayTranscriptionText(text, options, autoCopy);
    }

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

    /**
     * Insère du texte dans un élément contentEditable avec robustesse
     * @param {HTMLElement} element - L'élément contentEditable
     * @param {string} text - Le texte à insérer
     * @param {Object} options - Options supplémentaires
     * @param {boolean} [options.ensureFocus=true] - Assurer que l'élément a le focus
     * @param {boolean} [options.normalizeText=true] - Normaliser le texte (remplacer les sauts de ligne)
     * @returns {boolean} - True si l'insertion a réussi
     */
    function insertInContentEditable(element, text, options = {}) {
        // Options par défaut
        const {
            ensureFocus = true,
            normalizeText = true
        } = options;

        // Validation des paramètres
        if (!element || !isValidInputText(text)) {
            console.warn("Paramètres invalides pour l'insertion de texte");
            return false;
        }

        // Assurer le focus si demandé
        if (ensureFocus) {
            element.focus();
        }

        // Normalisation du texte si demandée
        const finalText = normalizeText
            ? text.replace(/[\r\n]+/g, ' ').trim()
            : text;

        try {
            // Tenter d'utiliser l'API moderne d'insertion
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);

                // Supprimer le texte sélectionné
                selection.deleteFromDocument();

                // Insérer le texte
                const textNode = document.createTextNode(finalText);
                range.insertNode(textNode);

                // Positionner le curseur à la fin du texte inséré
                range.setStartAfter(textNode);
                range.setEndAfter(textNode);

                // Appliquer le nouveau range
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                // Fallback à execCommand si aucune plage n'est sélectionnée
                document.execCommand('insertHTML', false, finalText);

                // Désélectionner après l'insertion
                const sel = window.getSelection();
                if (sel.rangeCount > 0) {
                    const range = sel.getRangeAt(0);
                    range.collapse(false); // Collapse à la fin
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }

            // Déclencher l'événement input
            element.dispatchEvent(new Event('input', { bubbles: true }));
            return true;
        } catch (error) {
            console.error("Erreur lors de l'insertion dans contentEditable:", error);

            // Dernier recours: insertion simple
            try {
                document.execCommand('insertHTML', false, finalText);
                return true;
            } catch (e) {
                console.error("Échec total de l'insertion:", e);
                return false;
            }
        }
    }

    /**
     * Gère l'insertion du texte dans l'élément actif
     * @param {string} text - Le texte à insérer
     * @returns {boolean} Indique si l'insertion a réussi
     */
    function handleActiveElementInsertion(text) {
        // Cette fonction a été migrée vers focus-utils.js
        return window.BabelFishAIUtils.focus.handleActiveElementInsertion(text);
    }

    /**
     * Insère du texte dans un élément input ou textarea avec optimisation pour grands volumes
     * @param {HTMLInputElement|HTMLTextAreaElement} element - L'élément de saisie
     * @param {string} text - Le texte à insérer
     * @returns {boolean} - Indique si l'insertion a réussi
     */
    function insertTextIntoInput(element, text) {
        // Cette fonction a été migrée vers focus-utils.js
        return window.BabelFishAIUtils.focus.insertTextIntoInput(element, text);
    }

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

    /**
     * Récupère la clé API ou lève une exception si elle n'est pas disponible
     * @returns {Promise<string>} - La clé API
     * @throws {Error} - Si la clé API n'est pas trouvée
     */
    async function getOrFetchApiKey() {
        try {
            // Utiliser directement la fonction du module api-utils
            const key = await window.BabelFishAIUtils.api.getOrFetchApiKey();
            // Mettre à jour la variable apiKey locale
            apiKey = key;
            return apiKey;
        } catch (error) {
            console.error("Erreur lors de la récupération de la clé API:", error);
            throw error;
        }
    }

    /**
     * Insère le texte dans un élément éditable
     * @param {Element} activeElement - Élément cible pour l'insertion
     * @param {string} newText - Texte à insérer
     * @returns {boolean} - True si l'insertion a réussi
     */
    function insertTextInEditableElement(activeElement, newText) {
        return window.BabelFishAIUtils.focus.insertTextInEditableElement(activeElement, newText);
    }

    /**
     * Insère du texte dans un élément input ou textarea
     * @param {HTMLInputElement|HTMLTextAreaElement} element - L'élément input/textarea
     * @param {string} text - Le texte à insérer
     * @returns {boolean} - True si l'insertion a réussi
     */
    function insertInInputElement(element, text) {
        // Utiliser la fonction migrée dans focus-utils.js
        return window.BabelFishAIUtils.focus.insertTextIntoInput(element, text);
    }

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
    /**
     * Détermine les langues source et cible pour la traduction
     * @param {Object} options - Options actuelles
     * @param {string} [specifiedTargetLanguage] - Langue cible optionnelle (prioritaire)
     * @returns {Object} - Objet contenant sourceLanguage et targetLanguage
     */
    function determineTranslationLanguages(options, specifiedTargetLanguage) {
        // Utiliser la fonction du module text-processing
        return window.BabelFishAIUtils.textProcessing.determineTranslationLanguages(options, specifiedTargetLanguage);
    }

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
