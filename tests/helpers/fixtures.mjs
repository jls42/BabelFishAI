// Contenus de storage.sync utilisés par les tests. Fausses clés uniquement, sans la forme
// d'une vraie clé ; aucun identifiant *API_KEY* (CodeQL les suit comme des secrets).

const OFF = { apiKey: '', enabled: false, transcriptionModels: [], chatModels: [] };
const OFF_CUSTOM = { ...OFF, transcriptionUrl: '', chatUrl: '' };

export const KEYS = {
    openai: 'cle-openai-factice',
    mistral: 'cle-mistral-factice',
    custom: 'cle-custom-factice',
    litellm: 'cle-litellm-factice',
    gemini: 'cle-gemini-factice',
};

export const CUSTOM_URLS = {
    transcriptionUrl: 'http://localhost:4000/v1/audio/transcriptions',
    chatUrl: 'http://localhost:4000/v1/chat/completions',
};

/**
 * Construit l'objet `providers` à partir de surcharges par provider
 * @param {Object} overrides
 * @returns {Object}
 */
function providers(overrides = {}) {
    return {
        openai: { ...OFF, ...overrides.openai },
        mistral: { ...OFF, ...overrides.mistral },
        custom: { ...OFF_CUSTOM, ...overrides.custom },
    };
}

export const STORAGE = {
    // Installation neuve, avant la migration de background.js
    vide: {},
    // 1.1.17 et avant : une seule clé, sans `providers`
    'herite-openai': { apiKey: KEYS.openai },
    // Proxy LiteLLM d'avant la migration : défaut connu, la clé part vers les URLs OpenAI
    'herite-litellm': {
        apiKey: KEYS.litellm,
        apiUrl: CUSTOM_URLS.transcriptionUrl,
        translationApiUrl: CUSTOM_URLS.chatUrl,
    },
    openai: {
        providers: providers({ openai: { enabled: true, apiKey: KEYS.openai } }),
        transcriptionProvider: 'openai',
        chatProvider: 'openai',
        apiKey: KEYS.openai,
    },
    mistral: {
        providers: providers({ mistral: { enabled: true, apiKey: KEYS.mistral } }),
        transcriptionProvider: 'mistral',
        chatProvider: 'mistral',
        apiKey: '',
    },
    custom: {
        providers: providers({ custom: { enabled: true, apiKey: KEYS.custom, ...CUSTOM_URLS } }),
        transcriptionProvider: 'custom',
        chatProvider: 'custom',
        apiKey: '',
    },
    'custom-sans-journal': {
        providers: providers({ custom: { enabled: true, apiKey: KEYS.custom, ...CUSTOM_URLS } }),
        transcriptionProvider: 'custom',
        chatProvider: 'custom',
        apiKey: '',
        disableLogging: true,
    },
    // OpenAI coupé mais sa clé reste dans son panneau ; sélection restée sur openai
    'mistral-seul-openai-residuelle': {
        providers: providers({
            openai: { enabled: false, apiKey: KEYS.openai },
            mistral: { enabled: true, apiKey: KEYS.mistral },
        }),
        transcriptionProvider: 'openai',
        chatProvider: 'openai',
        apiKey: '',
    },
    mixte: {
        providers: providers({
            openai: { enabled: true, apiKey: KEYS.openai },
            mistral: { enabled: true, apiKey: KEYS.mistral },
        }),
        transcriptionProvider: 'openai',
        chatProvider: 'mistral',
        apiKey: KEYS.openai,
    },
    // F8 : tout est coupé, des clés restent, la clé héritée aussi (écrite par une ancienne page)
    'tout-desactive': {
        providers: providers({
            openai: { enabled: false, apiKey: KEYS.openai },
            mistral: { enabled: false, apiKey: KEYS.mistral },
        }),
        transcriptionProvider: 'openai',
        chatProvider: 'openai',
        apiKey: KEYS.openai,
    },
    'custom-sans-url': {
        providers: providers({
            custom: { enabled: true, apiKey: KEYS.custom },
            mistral: { enabled: true, apiKey: KEYS.mistral },
        }),
        transcriptionProvider: 'custom',
        chatProvider: 'custom',
        apiKey: '',
    },
    modeles: {
        providers: providers({
            openai: {
                enabled: true,
                apiKey: KEYS.openai,
                selectedTranscriptionModel: 'whisper-1',
                selectedChatModel: 'mon-modele-perso',
                chatModels: ['mon-modele-perso'],
            },
        }),
        transcriptionProvider: 'openai',
        chatProvider: 'openai',
        apiKey: KEYS.openai,
    },
    'modele-retire': {
        providers: providers({
            openai: {
                enabled: true,
                apiKey: KEYS.openai,
                selectedTranscriptionModel: 'modele-disparu',
                selectedChatModel: 'gpt-4.1-nano',
            },
        }),
        transcriptionProvider: 'openai',
        chatProvider: 'openai',
        apiKey: KEYS.openai,
    },
    // Plan, contrat point 3, S1 : identifiant d'une version future, clé OpenAI résiduelle
    'futur-S1': {
        providers: providers({ openai: { enabled: false, apiKey: KEYS.openai } }),
        transcriptionProvider: 'gemini',
        chatProvider: 'gemini',
        apiKey: '',
        'extraProvider.gemini': { enabled: true, apiKey: KEYS.gemini },
    },
    // S1 écrit par une ancienne page d'options : la clé héritée porte la clé OpenAI
    'futur-S1-cle-heritee': {
        providers: providers({ openai: { enabled: false, apiKey: KEYS.openai } }),
        transcriptionProvider: 'gemini',
        chatProvider: 'gemini',
        apiKey: KEYS.openai,
        'extraProvider.gemini': { enabled: true, apiKey: KEYS.gemini },
    },
    'futur-S2': {
        providers: providers({
            openai: { enabled: false, apiKey: KEYS.openai },
            mistral: { enabled: true, apiKey: KEYS.mistral },
        }),
        transcriptionProvider: 'gemini',
        chatProvider: 'mistral',
        apiKey: '',
        'extraProvider.gemini': { enabled: true, apiKey: KEYS.gemini },
    },
    'identifiant-prototype': {
        providers: providers({ mistral: { enabled: true, apiKey: KEYS.mistral } }),
        transcriptionProvider: '__proto__',
        chatProvider: 'constructor',
        apiKey: '',
    },
    'identifiant-prototype-sans-repli': {
        providers: providers(),
        transcriptionProvider: '__proto__',
        chatProvider: 'constructor',
        apiKey: '',
    },
};
