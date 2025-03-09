// Service worker de l'extension BabelFishAI
/* global chrome */

// Importer la définition des langues disponibles
importScripts('utils/languages-data.js'); // skipcq: JS-0103

// Configuration spécifique au service worker
const SERVICE_WORKER_CONFIG = {
    DEBUG: false,
    INIT_DELAY: 500
};

// Actions spécifiques au menu contextuel
const CONTEXT_MENU_ACTIONS = {
    REPHRASE_SELECTION: 'rephraseSelection',
    TRANSLATE_SELECTION: 'translateSelection'
};

// Définition des constantes nécessaires pour le service worker
// IMPORTANT: Ces constantes sont dupliquées intentionnellement car le service worker
// n'a pas accès à window.BabelFishAIConstants en raison des limitations des service workers
// de Chrome. Assurez-vous que ces valeurs correspondent à celles définies dans constants.js.
//
// Si vous modifiez ces constantes, vous DEVEZ également mettre à jour leurs équivalents dans constants.js:
// - STATES correspond à window.BabelFishAIConstants.STATES
// - ACTIONS correspond à window.BabelFishAIConstants.ACTIONS
// - BADGES correspond à window.BabelFishAIConstants.BADGES
// - ERRORS est un sous-ensemble de window.BabelFishAIConstants.ERRORS

const STATES = {
    RECORDING: 'recording',  // Doit correspondre à window.BabelFishAIConstants.STATES.RECORDING
    STOPPED: 'stopped',      // Doit correspondre à window.BabelFishAIConstants.STATES.STOPPED
    ERROR: 'error'           // Doit correspondre à window.BabelFishAIConstants.STATES.ERROR
};

const ACTIONS = {
    TOGGLE: 'toggleRecording',    // Doit correspondre à window.BabelFishAIConstants.ACTIONS.TOGGLE
    STARTED: 'recordingStarted',  // Doit correspondre à window.BabelFishAIConstants.ACTIONS.STARTED
    STOPPED: 'recordingStopped',  // Doit correspondre à window.BabelFishAIConstants.ACTIONS.STOPPED
    ERROR: 'recordingError'       // Doit correspondre à window.BabelFishAIConstants.ACTIONS.ERROR
};

const BADGES = {
    RECORDING: '⏺',  // Doit correspondre à window.BabelFishAIConstants.BADGES.RECORDING
    STOPPED: '',      // Doit correspondre à window.BabelFishAIConstants.BADGES.STOPPED
    ERROR: '!'        // Doit correspondre à window.BabelFishAIConstants.BADGES.ERROR
};

const ERRORS = {
    CONTENT_SCRIPT_INJECTION_ERROR: "Erreur lors de l'injection du content script",  // Spécifique au service worker
    NO_ACTIVE_TAB: "Aucun onglet actif trouvé"                                       // Spécifique au service worker
};

// État global
let isRecording = false;

/**
 * Log conditionnel pour le débogage
 * @param {...any} args - Arguments à logger
 */
function debug(...args) {
    if (SERVICE_WORKER_CONFIG.DEBUG) {
        console.log('[Background]', ...args);
    }
}

/**
 * Injecte le content script dans un onglet
 * @param {chrome.tabs.Tab} tab - L'onglet cible
 * @returns {Promise<boolean>} true si l'injection a réussi
 * @throws {Error} Si l'injection échoue
 */
async function injectContentScript(tab) {
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: [
                'src/constants.js',
                'src/utils/ui.js',
                'src/utils/api.js',
                'src/utils/translation.js',
                'src/utils/languages.js',
                'src/utils/i18n.js',
                'src/content.js'
            ]
        });
        await chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['src/styles/content.css']
        });
        debug("Content script injected successfully");
        return true;
    } catch (error) {
        console.error("Error injecting content script:", error);
        throw new Error(ERRORS.CONTENT_SCRIPT_INJECTION_ERROR);
    }
}

/**
 * Envoie un message au content script, avec injection automatique si nécessaire
 * @param {chrome.tabs.Tab} tab - L'onglet cible
 * @param {Object} message - Le message à envoyer
 * @throws {Error} Si l'envoi du message échoue
 */
async function sendMessageToContentScript(tab, message) {
    try {
        // Tenter d'envoyer le message directement
        await chrome.tabs.sendMessage(tab.id, message);
    } catch (error) {
        // Si le content script n'est pas prêt, tenter de l'injecter
        debug("Content script not ready, attempting to inject it");

        try {
            // Injecter le content script
            const injected = await injectContentScript(tab);

            if (injected) {
                // Attendre un court délai pour que le script s'initialise
                await new Promise(resolve => setTimeout(resolve, SERVICE_WORKER_CONFIG.INIT_DELAY));

                // Réessayer d'envoyer le message après l'injection
                await chrome.tabs.sendMessage(tab.id, message);
            }
        } catch (injectError) {
            // Propager l'erreur avec un message clair
            throw new Error(`Failed to send message: ${injectError.message}`);
        }
    }
}

/**
 * Met à jour l'état de l'enregistrement et l'interface utilisateur correspondante
 * @param {string} state - Le nouvel état ('recording', 'stopped', 'error')
 * @param {string} [errorMessage] - Le message d'erreur optionnel
 */
function updateRecordingState(state, errorMessage = '') {
    // Configuration pour chaque état
    const stateConfig = {
        [STATES.RECORDING]: {
            isRecording: true,
            badgeText: BADGES.RECORDING,
            badgeColor: '#FF0000'
        },
        [STATES.STOPPED]: {
            isRecording: false,
            badgeText: BADGES.STOPPED,
            badgeColor: '#808080'
        },
        [STATES.ERROR]: {
            isRecording: false, // En cas d'erreur, on considère que l'enregistrement est arrêté
            badgeText: BADGES.ERROR,
            badgeColor: '#FF0000',
            logError: true
        }
    };

    // Vérifier si l'état est valide
    if (!stateConfig[state]) {
        console.error("Unknown state:", state);
        return;
    }

    // Appliquer la configuration pour l'état
    const config = stateConfig[state];

    // Mettre à jour l'état global
    isRecording = config.isRecording;

    // Mettre à jour le badge
    chrome.action.setBadgeText({ text: config.badgeText });
    chrome.action.setBadgeBackgroundColor({ color: config.badgeColor });

    // Journaliser l'erreur si nécessaire
    if (config.logError && errorMessage) {
        console.error("Recording error:", errorMessage);
    }
}

/**
 * Gère les commandes de l'extension (raccourcis clavier)
 * @param {string} command - La commande reçue
 */
async function handleCommand(command) {
    debug("Command received:", command);

    // Ne traiter que la commande _execute_action (raccourci clavier principal)
    if (command !== '_execute_action') {
        debug("Ignoring unknown command:", command);
        return;
    }

    try {
        // Récupérer l'onglet actif
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // Vérifier si un onglet actif a été trouvé
        if (!tab) {
            throw new Error(ERRORS.NO_ACTIVE_TAB);
        }

        // Envoyer la commande de basculement au content script
        await sendMessageToContentScript(tab, { action: ACTIONS.TOGGLE });
    } catch (error) {
        console.error("Command handling error:", error);

        // Si aucun enregistrement n'est en cours, on peut ignorer certaines erreurs
        if (!isRecording) {
            console.log("Ignoring command error because no recording is in progress");
            return;
        }

        // Mettre à jour l'état pour indiquer une erreur
        updateRecordingState(STATES.ERROR, error.message);
    }
}

/**
 * Gère les messages reçus du content script
 * @param {Object} message - Le message reçu
 * @param {Object} sender - L'expéditeur du message
 * @param {Function} sendResponse - Fonction pour envoyer une réponse
 */
function handleContentScriptMessage(message) {
    debug("Message received:", message);

    // Mapping des actions aux états correspondants
    const actionStateMap = {
        [ACTIONS.STARTED]: STATES.RECORDING,
        [ACTIONS.STOPPED]: STATES.STOPPED,
        [ACTIONS.ERROR]: STATES.ERROR
    };

    // Vérifier si l'action est connue
    if (actionStateMap[message.action]) {
        // Mettre à jour l'état en fonction de l'action
        updateRecordingState(
            actionStateMap[message.action],
            message.action === ACTIONS.ERROR ? message.error : ''
        );
    } else {
        debug("Unknown action:", message.action);
    }
}

// Enregistrer le gestionnaire d'événements pour les messages du content script
chrome.runtime.onMessage.addListener(handleContentScriptMessage);

/**
 * Gère le clic sur l'icône de l'extension
 * @param {chrome.tabs.Tab} tab - L'onglet actif lors du clic
 */
async function handleExtensionIconClick(tab) {
    debug("Extension icon clicked!");

    try {
        // Envoyer la commande de basculement au content script
        await sendMessageToContentScript(tab, { action: ACTIONS.TOGGLE });
    } catch (error) {
        console.error("Click handling error:", error);

        // Mettre à jour l'état pour indiquer une erreur
        updateRecordingState(STATES.ERROR, error.message);
    }
}

// Enregistrer le gestionnaire d'événements pour le clic sur l'icône
chrome.action.onClicked.addListener(handleExtensionIconClick);

// Gérer les raccourcis clavier
chrome.commands.onCommand.addListener(handleCommand);

/**
 * Gère les événements d'installation ou de mise à jour de l'extension
 * @param {Object} details - Détails de l'événement d'installation
 */
function handleExtensionInstalled(details) {
    debug(`Extension ${details.reason} event detected`);

    // Ouvrir la page des options uniquement lors de l'installation initiale
    if (details.reason === 'install') {
        debug('Opening options page for first-time setup');
        chrome.runtime.openOptionsPage();
    }
}

// Enregistrer le gestionnaire d'événements pour l'installation
chrome.runtime.onInstalled.addListener(handleExtensionInstalled);

/**
 * Récupère la liste des langues disponibles pour la traduction
 * @returns {Array} Liste des langues disponibles
 */
function getTargetLanguageOptions() {
    // Utiliser la liste centralisée, si disponible
    return self.AVAILABLE_LANGUAGES || [
        { value: 'en', text: 'English (en)' },
        { value: 'fr', text: 'Français (fr)' },
        { value: 'es', text: 'Español (es)' },
        { value: 'pt', text: 'Português (pt)' },
        { value: 'zh', text: '中文 (zh)' },
        { value: 'hi', text: 'हिंदी (hi)' },
        { value: 'ar', text: 'العربية (ar)' },
        { value: 'it', text: 'Italiano (it)' },
        { value: 'de', text: 'Deutsch (de)' },
        { value: 'sv', text: 'Svenska (sv)' },
        { value: 'pl', text: 'Polski (pl)' },
        { value: 'nl', text: 'Nederlands (nl)' },
        { value: 'ro', text: 'Română (ro)' },
        { value: 'ja', text: '日本語 (ja)' },
        { value: 'ko', text: '한국어 (ko)' }
    ];
}

/**
 * Crée les menus contextuels de l'extension
 */
function createContextMenus() {
    // Vérifier si les menus contextuels existent déjà et les supprimer
    chrome.contextMenus.removeAll(() => {
        // Créer le menu contextuel pour la reformulation
        chrome.contextMenus.create({
            id: CONTEXT_MENU_ACTIONS.REPHRASE_SELECTION,
            title: chrome.i18n.getMessage("contextMenuRephrase") || "Rephrase selection",
            contexts: ["selection"],
        });
        
        // Créer le menu parent pour la traduction
        chrome.contextMenus.create({
            id: 'translateMenu',
            title: chrome.i18n.getMessage("contextMenuTranslate") || "Translate selection",
            contexts: ["selection"],
        });
        
        // Ajouter les langues comme sous-menus
        const languages = getTargetLanguageOptions();
        languages.forEach(lang => {
            chrome.contextMenus.create({
                id: `${CONTEXT_MENU_ACTIONS.TRANSLATE_SELECTION}_${lang.value}`,
                parentId: 'translateMenu',
                title: lang.text,
                contexts: ["selection"],
            });
        });
    });
}

/**
 * Gère les clics sur les menus contextuels
 * @param {Object} info - Informations sur le clic
 * @param {Object} tab - L'onglet actif
 */
async function handleContextMenuClick(info, tab) {
    debug("Context menu clicked:", info.menuItemId);

    // Récupérer le texte sélectionné
    const selectedText = info.selectionText;
    
    if (!selectedText) {
        return; // Sortir si aucun texte n'est sélectionné
    }
    
    try {
        // Cas 1: Option de reformulation
        if (info.menuItemId === CONTEXT_MENU_ACTIONS.REPHRASE_SELECTION) {
            // Envoyer le texte sélectionné au content script pour reformulation
            await sendMessageToContentScript(tab, { 
                action: CONTEXT_MENU_ACTIONS.REPHRASE_SELECTION, 
                text: selectedText 
            });
        } 
        // Cas 2: Option de traduction avec langue spécifique
        else if (typeof info.menuItemId === 'string' && info.menuItemId.startsWith(`${CONTEXT_MENU_ACTIONS.TRANSLATE_SELECTION}_`)) {
            // Extraire le code de langue du menuItemId (format: translateSelection_fr)
            const targetLanguage = info.menuItemId.split('_').pop();
            
            if (targetLanguage) {
                // Envoyer le texte sélectionné au content script pour traduction avec langue cible spécifique
                await sendMessageToContentScript(tab, { 
                    action: CONTEXT_MENU_ACTIONS.TRANSLATE_SELECTION, 
                    text: selectedText,
                    targetLanguage 
                });
            }
        }
    } catch (error) {
        console.error("Error handling context menu click:", error);
        
        // Mettre à jour l'état pour indiquer une erreur
        updateRecordingState(STATES.ERROR, error.message);
    }
}

// Créer les menus contextuels lors de l'installation ou du démarrage
chrome.runtime.onInstalled.addListener(createContextMenus);
chrome.runtime.onStartup.addListener(createContextMenus);

// Écouter les clics sur les menus contextuels
chrome.contextMenus.onClicked.addListener(handleContextMenuClick);

/**
 * Gère les messages du content script
 * @param {Object} message - Le message reçu
 * @param {Object} sender - L'expéditeur du message
 * @param {Function} sendResponse - Fonction de réponse
 * @returns {boolean} - Indique si la réponse sera envoyée de manière asynchrone
 */
function handleMessage(message, sender, sendResponse) {
    debug("Message received from content script:", message);

    // Gestion des demandes d'options de langues
    if (message.action === 'getTargetLanguageOptions') {
        // Récupérer les options de langues cibles disponibles
        // Utiliser la liste centralisée, si disponible
        const targetLanguageOptions = getTargetLanguageOptions();
        
        sendResponse({ options: targetLanguageOptions });
        return false; // La réponse est envoyée de manière synchrone
    }

    return false; // La réponse est envoyée de manière synchrone
}

// Enregistrer le gestionnaire d'événements pour la réception de messages
chrome.runtime.onMessage.addListener(handleMessage);

debug("Background script started");