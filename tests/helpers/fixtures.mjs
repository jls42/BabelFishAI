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
    'provider-futur': 'cle-provider-futur-factice',
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
    // Un provider inconnu du registre rangé dans `providers` (ce que le plan interdit d'écrire) :
    // les versions publiées enverraient sa clé aux URLs OpenAI
    'provider-inconnu-dans-providers': {
        providers: {
            ...providers(),
            'provider-futur': { enabled: true, apiKey: KEYS['provider-futur'] },
        },
        transcriptionProvider: 'provider-futur',
        chatProvider: 'openai',
        apiKey: '',
    },
    // Gemini seul, écrit par la page d'options de cette version : sa configuration dans sa propre
    // clé, les providers historiques désactivés
    gemini: {
        providers: providers(),
        transcriptionProvider: 'gemini',
        chatProvider: 'gemini',
        apiKey: '',
        'extraProvider.gemini': { enabled: true, apiKey: KEYS.gemini },
    },
    // Gemini avec son modèle de texte le plus rapide : ni effort de réflexion ni temperature
    'gemini-flash-lite': {
        providers: providers(),
        transcriptionProvider: 'gemini',
        chatProvider: 'gemini',
        apiKey: '',
        'extraProvider.gemini': {
            enabled: true,
            apiKey: KEYS.gemini,
            selectedChatModel: 'gemini-3.5-flash-lite',
        },
    },
    // Sélection écrite par une version plus récente, pour un provider inconnu de cette version
    // (S1 du plan, depuis que Gemini est connu) : sa clé ne doit partir nulle part
    'version-future-S1': {
        providers: providers({ openai: { enabled: false, apiKey: KEYS.openai } }),
        transcriptionProvider: 'provider-futur',
        chatProvider: 'provider-futur',
        apiKey: '',
        'extraProvider.provider-futur': { enabled: true, apiKey: KEYS['provider-futur'] },
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

// Stockages joués sur chaque version par versions.test.mjs (plan, contrat point 3) : ce qu'une
// ancienne version installée sur un autre poste du même compte fait du stockage de la refonte
export const VERSION_FIXTURES = {
    openai: STORAGE.openai,
    mistral: STORAGE.mistral,
    'tout-desactive': STORAGE['tout-desactive'],
    'S1 : futur provider seul, apiKey vide': STORAGE['futur-S1'],
    'S1 : futur provider seul, clé OpenAI résiduelle dans apiKey': STORAGE['futur-S1-cle-heritee'],
    // S1 après une sauvegarde d'une ancienne page d'options : la sélection revient sur openai
    'S1-A : sélection openai, clé OpenAI résiduelle dans apiKey': {
        ...STORAGE['futur-S1-cle-heritee'],
        transcriptionProvider: 'openai',
        chatProvider: 'openai',
    },
    'S1-A : sélection openai, apiKey vide': {
        ...STORAGE['futur-S1'],
        transcriptionProvider: 'openai',
        chatProvider: 'openai',
    },
    'S2 : futur provider en dictée, Mistral en texte': STORAGE['futur-S2'],
};

// Réponses de l'API Gemini à une clé invalide, relevées le 2026-09-29 (page de mesure du lot 4,
// fausse clé) : HTTP 400 et non 401, objet pour l'API native, tableau pour l'Interactions API et
// pour la couche compatible OpenAI. Les autres corps sont des exemples de forme, pas des relevés
const GEMINI_KEY_ERROR = {
    code: 400,
    message: 'API key not valid. Please pass a valid API key.',
    status: 'INVALID_ARGUMENT',
    details: [
        {
            '@type': 'type.googleapis.com/google.rpc.ErrorInfo',
            reason: 'API_KEY_INVALID',
            domain: 'googleapis.com',
            metadata: { service: 'generativelanguage.googleapis.com' },
        },
        {
            '@type': 'type.googleapis.com/google.rpc.LocalizedMessage',
            locale: 'en-US',
            message: 'API key not valid. Please pass a valid API key.',
        },
    ],
};

export const GEMINI_ERRORS = {
    'cle-native': { error: GEMINI_KEY_ERROR },
    'cle-interactions': [{ error: GEMINI_KEY_ERROR }],
    // Exemple de forme : la raison seule reconnaît la clé refusée, message localisé sans « API key »
    'cle-raison-seule': {
        error: {
            code: 400,
            message: 'Clé non valide. Transmettez une clé valide.',
            status: 'INVALID_ARGUMENT',
            details: [
                { '@type': 'type.googleapis.com/google.rpc.ErrorInfo', reason: 'API_KEY_INVALID' },
            ],
        },
    },
    'cle-compatible': [
        {
            error: {
                code: 400,
                message: 'Please pass a valid API key',
                status: 'INVALID_ARGUMENT',
            },
        },
    ],
    'autre-400': [
        { error: { code: 400, message: 'message du provider (400)', status: 'INVALID_ARGUMENT' } },
    ],
    429: [
        {
            error: {
                code: 429,
                message: 'message du provider (429)',
                status: 'RESOURCE_EXHAUSTED',
            },
        },
    ],
};

// Réponses de l'Interactions API à une transcription, de la forme relevée le 2026-09-29 (page de
// mesure du lot 4) : sans `id` quand `store` vaut false, texte dans les étapes model_output.
// Textes et jetons d'exemple ; l'étape de réflexion (ThoughtStep de la référence) est illustrative
const INTERACTION = {
    usage: { total_tokens: 139, total_input_tokens: 139 },
    created: '2026-09-29T20:49:30Z',
    updated: '2026-09-29T20:49:30Z',
    service_tier: 'standard',
    object: 'interaction',
    model: 'gemini-3.5-transcribe',
};

export const GEMINI_INTERACTIONS = {
    terminee: {
        ...INTERACTION,
        status: 'completed',
        steps: [
            {
                type: 'model_output',
                content: [{ type: 'text', text: ' Bonjour, ceci est une dictée. ' }],
            },
        ],
    },
    // Relevé sur un audio fabriqué (copies d'un clip) dont le modèle n'a tiré aucun texte
    'terminee-sans-etapes': { ...INTERACTION, status: 'completed' },
    'etapes-melangees': {
        ...INTERACTION,
        status: 'completed',
        steps: [
            // Étape d'un autre type qui porte du texte : seul model_output doit être lu
            { type: 'user_input', content: [{ type: 'text', text: 'Consigne envoyée.' }] },
            { type: 'thought', summary: [{ type: 'text', text: 'réflexion' }] },
            {
                type: 'model_output',
                content: [{ type: 'text', text: 'Première phrase.' }, { type: 'image' }],
            },
            { type: 'model_output', content: [{ type: 'text', text: ' Seconde phrase.' }] },
        ],
    },
    incomplete: {
        ...INTERACTION,
        status: 'incomplete',
        steps: [{ type: 'model_output', content: [{ type: 'text', text: 'Début tronqué' }] }],
    },
    echec: { ...INTERACTION, status: 'failed' },
};
