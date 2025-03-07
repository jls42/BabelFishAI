// Constants globales pour l'extension BabelFishAI
window.BabelFishAIConstants = {
    // Configuration générale
    CONFIG: {
        DEBUG: false,
        COPY_FEEDBACK_DURATION: 2000,
        ERROR_BANNER_DURATION: 5000,
        DEFAULT_DIALOG_DURATION: 15,
        DEFAULT_FORCED_DIALOG_DOMAINS: ['chat.google.com']
    },

    // États de l'enregistrement
    STATES: {
        RECORDING: 'recording',
        STOPPED: 'stopped',
        ERROR: 'error'
    },

    // Actions disponibles
    ACTIONS: {
        TOGGLE: 'toggleRecording',
        STARTED: 'recordingStarted',
        STOPPED: 'recordingStopped',
        ERROR: 'recordingError'
    },

    // Types de messages
    MESSAGE_TYPES: {
        INFO: 'info',
        ERROR: 'error'
    },

    // Configuration de l'interface utilisateur
    UI_CONFIG: {
        DEFAULT_BANNER_COLOR_START: '#684054',
        DEFAULT_BANNER_COLOR_END: '#4c7b8d',
        DEFAULT_BANNER_OPACITY: 80
        // Note: COPY_FEEDBACK_DURATION est défini dans CONFIG.COPY_FEEDBACK_DURATION
    },

    // Configuration de l'API
    API_CONFIG: {
        DEFAULT_WHISPER_API_URL: 'https://api.openai.com/v1/audio/transcriptions',
        DEFAULT_GPT_API_URL: 'https://api.openai.com/v1/chat/completions',
        WHISPER_MODEL: 'whisper-1',
        GPT_MODEL: 'gpt-4o-mini',
        AUDIO_MODELS: ['whisper-1', 'whisper'] // Ajout de la liste des modèles audio
    },

    // Messages d'erreur
    ERRORS: {
        API_KEY_NOT_FOUND: "Clé API non configurée. Veuillez la configurer dans les options de l'extension.",
        CHROME_STORAGE_ERROR: "Erreur de stockage Chrome",
        MIC_ACCESS_ERROR: "Erreur : microphone inaccessible.",
        API_ERROR: "Erreur lors de l'appel à l'API",
        TRANSCRIPTION_ERROR: "Erreur lors de la transcription",
        TRANSLATION_ERROR: "Erreur lors de la traduction",
        REPHRASE_ERROR: "Erreur lors de la reformulation",
        NO_EDITABLE_ELEMENT: "Aucun élément éditable trouvé",
        CONTENT_SCRIPT_INJECTION_ERROR: "Erreur lors de l'injection du content script",
        NO_ACTIVE_TAB: "Aucun onglet actif trouvé",
        MISSING_TRANSLATION_PARAMS: "Paramètres de traduction manquants",
        INVALID_TRANSLATION_RESPONSE: "Format de réponse de traduction invalide",
        MISSING_REPHRASE_PARAMS: "Paramètres de reformulation manquants"
    },

    // Configuration des badges
    BADGES: {
        RECORDING: '⏺',
        STOPPED: '',
        ERROR: '!'
    }
};