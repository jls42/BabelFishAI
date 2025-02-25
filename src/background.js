// Service worker de l'extension BabelFishAI

// Configuration spécifique au service worker
const SERVICE_WORKER_CONFIG = {
    DEBUG: false,
    INIT_DELAY: 500
};

// Définition des constantes nécessaires pour le service worker
// Note: Le service worker n'a pas accès à window.BabelFishAIConstants
const STATES = {
    RECORDING: 'recording',
    STOPPED: 'stopped',
    ERROR: 'error'
};

const ACTIONS = {
    TOGGLE: 'toggleRecording',
    STARTED: 'recordingStarted',
    STOPPED: 'recordingStopped',
    ERROR: 'recordingError'
};

const BADGES = {
    RECORDING: '⏺',
    STOPPED: '',
    ERROR: '!'
};

const ERRORS = {
    CONTENT_SCRIPT_INJECTION_ERROR: "Erreur lors de l'injection du content script",
    NO_ACTIVE_TAB: "Aucun onglet actif trouvé"
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
 * Envoie un message au content script
 * @param {chrome.tabs.Tab} tab - L'onglet cible
 * @param {Object} message - Le message à envoyer
 * @throws {Error} Si l'envoi du message échoue
 */
async function sendMessageToContentScript(tab, message) {
    try {
        await chrome.tabs.sendMessage(tab.id, message);
    } catch (error) {
        debug("Content script not ready, attempting to inject it");
        try {
            const injected = await injectContentScript(tab);
            if (injected) {
                await new Promise(resolve => setTimeout(resolve, SERVICE_WORKER_CONFIG.INIT_DELAY));
                await chrome.tabs.sendMessage(tab.id, message);
            }
        } catch (injectError) {
            throw new Error(`Failed to send message: ${injectError.message}`);
        }
    }
}

/**
 * Met à jour l'état de l'enregistrement
 * @param {string} state - Le nouvel état ('recording', 'stopped', 'error')
 * @param {string} [errorMessage] - Le message d'erreur optionnel
 */
function updateRecordingState(state, errorMessage = '') {
    switch (state) {
        case STATES.RECORDING:
            isRecording = true;
            chrome.action.setBadgeText({ text: BADGES.RECORDING });
            chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
            break;
        case STATES.STOPPED:
            isRecording = false;
            chrome.action.setBadgeText({ text: BADGES.STOPPED });
            chrome.action.setBadgeBackgroundColor({ color: '#808080' });
            break;
        case STATES.ERROR:
            console.error("Recording error:", errorMessage);
            chrome.action.setBadgeText({ text: BADGES.ERROR });
            chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
            break;
        default:
            console.error("Unknown state:", state);
    }
}

/**
 * Gère les commandes de l'extension (raccourcis clavier)
 * @param {string} command - La commande reçue
 */
async function handleCommand(command) {
    debug("Command received:", command);
    if (command === '_execute_action') {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab) {
                await sendMessageToContentScript(tab, { action: ACTIONS.TOGGLE });
            } else {
                throw new Error(ERRORS.NO_ACTIVE_TAB);
            }
        } catch (error) {
            console.error("Command handling error:", error);
            if (!isRecording) {
                console.log("Ignoring command because no recording is in progress");
                return;
            }
            updateRecordingState(STATES.ERROR, error.message);
        }
    }
}

// Écouter les messages du content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    debug("Message received:", message);

    switch (message.action) {
        case ACTIONS.STARTED:
            updateRecordingState(STATES.RECORDING);
            break;
        case ACTIONS.STOPPED:
            updateRecordingState(STATES.STOPPED);
            break;
        case ACTIONS.ERROR:
            updateRecordingState(STATES.ERROR, message.error);
            break;
        default:
            debug("Unknown action:", message.action);
    }
});

// Gérer le clic sur l'icône de l'extension
chrome.action.onClicked.addListener(async (tab) => {
    debug("Extension icon clicked!");
    try {
        await sendMessageToContentScript(tab, { action: ACTIONS.TOGGLE });
    } catch (error) {
        console.error("Click handling error:", error);
        updateRecordingState(STATES.ERROR, error.message);
    }
});

// Gérer les raccourcis clavier
chrome.commands.onCommand.addListener(handleCommand);

// Ouvrir la page des options lors de l'installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        chrome.runtime.openOptionsPage();
    }
});

debug("Background script started");