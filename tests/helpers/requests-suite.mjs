// Suite commune aux tests de requêtes Chrome et Firefox : dictée et actions texte par provider,
// erreurs HTTP et réseau, allowlist. Sous Firefox, le vrai background est chargé dans le même
// processus (scripts lus dans manifest.firefox.json de l'arbre testé) et reçoit les messages
// proxyFetch du content script, comme dans le navigateur.
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { FakeFileReader, ROOT, loadScripts, setupEnv } from './env.mjs';
import { KEYS, STORAGE } from './fixtures.mjs';
import { createSnapshots } from './snapshot.mjs';

const CONTENT_SCRIPTS = [
    'src/constants.js',
    'src/utils/providers.js',
    'src/utils/provider-store.js',
    'src/utils/provider-adapters.js',
    'src/utils/error-utils.js',
    'src/utils/api-utils.js',
    'src/utils/text-processing.js',
    'src/utils/recording-utils.js',
];

// Modules apparus pendant la refonte : absents de l'arbre de base (--ref base-refonte)
const OPTIONAL_MODULES = ['src/utils/provider-store.js', 'src/utils/provider-adapters.js'];

const AUDIO = new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, 0x42, 0x86, 0x81, 0x01]);
const OK_TRANSCRIPTION = { json: { text: '  Bonjour, ceci est une dictée.  ' } };
const OK_CHAT = {
    json: { choices: [{ message: { role: 'assistant', content: 'Réponse du provider.' } }] },
};
// Réponse d'un modèle Mistral qui raisonne : contenu en blocs, seul le texte doit ressortir
const OK_CHAT_BLOCKS = {
    json: {
        choices: [
            {
                message: {
                    content: [
                        { type: 'thinking', thinking: [{ type: 'text', text: 'raisonnement' }] },
                        { type: 'text', text: 'Réponse en blocs.' },
                    ],
                },
            },
        ],
    },
};
const OK = {
    transcription: OK_TRANSCRIPTION,
    reformulation: OK_CHAT,
    correction: OK_CHAT,
    traduction: OK_CHAT,
};

// Stockages joués pour chaque action : un par provider, et les cas hérités ou désactivés
const STORAGES_PER_ACTION = [
    'openai',
    'mistral',
    'custom',
    'custom-sans-journal',
    'mixte',
    'herite-openai',
    'herite-litellm',
    'tout-desactive',
    'futur-S1',
    'provider-inconnu-dans-providers',
];

const HTTP_ERRORS = {
    400: { status: 400, json: { error: { message: 'message du provider (400)' } } },
    401: { status: 401, json: { error: { message: 'Incorrect API key provided' } } },
    403: { status: 403, json: { error: { message: 'message du provider (403)' } } },
    404: { status: 404, json: { error: { message: 'message du provider (404)' } } },
    418: { status: 418, json: { error: { message: 'message du provider (418)' } } },
    '422-detail': {
        status: 422,
        json: { detail: [{ loc: ['body', 'model'], msg: 'champ invalide' }] },
    },
    429: { status: 429, json: { error: { message: 'Rate limit reached' } } },
    500: { status: 500, json: { error: { message: 'message du provider (500)' } } },
    502: { status: 502, json: { error: { message: 'message du provider (502)' } } },
    '502-html': {
        status: 502,
        statusText: 'Bad Gateway',
        raw: '<html><body>Bad Gateway</body></html>',
    },
    503: { status: 503, json: { error: { message: 'message du provider (503)' } } },
    504: { status: 504, json: { error: { message: 'message du provider (504)' } } },
    'json-sans-message': { status: 500, json: { oops: true } },
};

const NETWORK_ERRORS = {
    'failed-to-fetch': new TypeError('Failed to fetch'),
    'networkerror-firefox': new TypeError('NetworkError when attempting to fetch resource.'),
};

const ALLOWLIST = [
    'https://api.openai.com/v1/chat/completions',
    'https://api.mistral.ai/v1/chat/completions',
    'http://localhost:4000/v1/chat/completions',
    'http://127.0.0.1:4000/v1/chat/completions',
    'https://localhost:4000/v1/chat/completions',
    'http://example.com/v1/chat/completions',
    'https://api.openai.com.evil.example/v1/chat/completions',
    'https://evil.example/v1/chat/completions',
    'ftp://api.openai.com/v1/chat/completions',
    'pas une url',
];

/**
 * Exécute un appel et renvoie sa valeur ou son erreur, sous une forme comparable
 * @param {Function} fn
 * @returns {Promise<Object>}
 */
async function outcome(fn) {
    try {
        return { valeur: await fn() };
    } catch (error) {
        return { erreur: `${error.name}: ${error.message}` };
    }
}

/**
 * Remplace le contenu de storage.sync (sur place : le bouchon garde la référence)
 * @param {Object} env
 * @param {Object} content
 */
function useStorage(env, content) {
    for (const key of Object.keys(env.stores.sync)) delete env.stores.sync[key];
    Object.assign(env.stores.sync, structuredClone(content));
}

/** Scripts du background Firefox de l'arbre testé, hors bibliothèques tierces */
function firefoxBackgroundScripts() {
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.firefox.json'), 'utf8'));
    return manifest.background.scripts.filter((file) => !file.startsWith('src/lib/'));
}

/**
 * Achemine les messages du content script vers les écouteurs du background
 * @param {Object} env
 * @returns {Function}
 */
function routeToBackground(env) {
    return (message) =>
        new Promise((resolve) => {
            let answered = false;
            const sendResponse = (response) => {
                answered = true;
                resolve(response);
            };
            const async = env.listeners['runtime.onMessage'].map((fn) =>
                fn(message, { tab: { id: 7 } }, sendResponse),
            );
            if (!answered && !async.includes(true)) resolve(undefined);
        });
}

/**
 * Actions jouées par les tests, sur les vrais modules
 * @param {Object} utils - globalThis.BabelFishAIUtils
 * @returns {Object}
 */
function makeActions(utils) {
    return {
        transcription: () =>
            utils.recording._transcribeAudio(new Blob([AUDIO], { type: 'audio/webm' })),
        reformulation: () => utils.textProcessing.rephraseText('  Un   texte   à reformuler.  '),
        correction: () => utils.textProcessing.correctText('Un texte avec des fote.'),
        traduction: () => utils.textProcessing.translateText('Bonjour tout le monde', 'fr', 'en'),
    };
}

/**
 * Crée la fonction qui joue une action sur un stockage avec des réponses programmées
 * @param {Object} env
 * @param {Object} actions
 * @returns {Function}
 */
function makePlayer(env, actions) {
    return async function play(action, storage, responses) {
        useStorage(env, storage);
        // État de session de correctText (modèles qui refusent temperature) remis à zéro
        await loadScripts(['src/utils/text-processing.js'], { fresh: true });
        env.http.clear();
        env.http.respond(...responses);
        const delays = [];
        const realSetTimeout = globalThis.setTimeout;
        // Les nouveaux essais attendent 1,5 s : le délai est relevé, pas attendu
        globalThis.setTimeout = (fn, ms, ...args) => {
            if (ms >= 1000) delays.push(ms);
            return realSetTimeout(fn, 0, ...args);
        };
        try {
            const resultat = await outcome(actions[action]);
            return {
                resultat,
                requetes: env.http.requests.slice(),
                delais: delays,
                reponsesNonConsommees: env.http.pending(),
            };
        } finally {
            globalThis.setTimeout = realSetTimeout;
        }
    };
}

/**
 * Charge les modules (et le background sous Firefox) et prépare le harnais
 * @param {'chrome'|'firefox'} browser
 * @param {string} testFileUrl
 * @returns {Promise<Object>}
 */
async function createRequestHarness(browser, testFileUrl) {
    const env = setupEnv({ browser, tabs: [{ id: 7, url: 'https://chatgpt.com/' }] });
    if (browser === 'firefox') {
        await loadScripts(firefoxBackgroundScripts());
        env.handlers.runtimeMessage = routeToBackground(env);
    }
    await loadScripts(CONTENT_SCRIPTS, { optional: OPTIONAL_MODULES });
    globalThis.BabelFishAI = { ui: { showBanner() {}, hideBanner() {}, handleError() {} } };
    const utils = globalThis.BabelFishAIUtils;
    const actions = makeActions(utils);
    return {
        env,
        utils,
        actions,
        play: makePlayer(env, actions),
        matchSnapshot: createSnapshots(testFileUrl),
    };
}

/** Chaque action sur chaque stockage, puis la réponse en blocs de Mistral */
function defineProviderTests({ actions, play, matchSnapshot }) {
    for (const name of STORAGES_PER_ACTION) {
        for (const action of Object.keys(actions)) {
            const key = `${action} : ${name}`;
            test(key, async () =>
                matchSnapshot(key, await play(action, STORAGE[name], [OK[action]])),
            );
        }
    }
    test('réponse en blocs (Mistral qui raisonne) : seul le texte est inséré', async () => {
        const key = 'reformulation : réponse en blocs';
        matchSnapshot(key, await play('reformulation', STORAGE.mistral, [OK_CHAT_BLOCKS]));
    });
}

/** Erreurs HTTP, et nouvel essai sans temperature de la correction */
function defineHttpErrorTests({ play, matchSnapshot }) {
    for (const [code, response] of Object.entries(HTTP_ERRORS)) {
        for (const action of ['transcription', 'reformulation', 'traduction']) {
            const key = `erreur HTTP ${code} : ${action}`;
            test(key, async () =>
                matchSnapshot(key, await play(action, STORAGE.openai, [response])),
            );
        }
    }
    const correction = {
        'correction : 400 puis succès sans temperature': [HTTP_ERRORS[400], OK_CHAT],
        'correction : 400 deux fois': [HTTP_ERRORS[400], HTTP_ERRORS[400]],
        'correction : 401': [HTTP_ERRORS[401], OK_CHAT],
    };
    for (const [key, responses] of Object.entries(correction)) {
        test(key, async () =>
            matchSnapshot(key, await play('correction', STORAGE.openai, responses)),
        );
    }
}

/**
 * Joue un appel pendant que chaque service du registre déclare d'autres formats
 * @param {Object} formats - Champs remplacés dans chaque service (format, errors)
 * @param {Function} fn
 * @returns {Promise<*>}
 */
async function withServiceFormats(formats, fn) {
    const registry = globalThis.BabelFishAIProviders;
    const getService = registry.getService;
    registry.getService = (id, service) => {
        const definition = getService(id, service);
        return definition && { ...definition, ...formats };
    };
    try {
        return await fn();
    } finally {
        registry.getService = getService;
    }
}

/**
 * Indicateurs et formats du registre : un modèle déclaré sans temperature ne la reçoit jamais,
 * et le format des corps comme celui des erreurs viennent du service appelé
 */
function defineRegistryFlagTests({ play, matchSnapshot }) {
    test('correction : modèle déclaré sans temperature', async () => {
        const registry = globalThis.BabelFishAIProviders;
        const accepts = registry.acceptsTemperature;
        registry.acceptsTemperature = () => false;
        try {
            const key = 'correction : modèle déclaré sans temperature';
            matchSnapshot(key, await play('correction', STORAGE.openai, [OK_CHAT]));
        } finally {
            registry.acceptsTemperature = accepts;
        }
    });
    test('formats lus dans le registre', async () => {
        const format = { format: 'format-test' };
        const errors = { errors: 'format-test' };
        matchSnapshot('formats lus dans le registre', {
            chat: await withServiceFormats(format, () =>
                play('reformulation', STORAGE.openai, [OK_CHAT]),
            ),
            transcription: await withServiceFormats(format, () =>
                play('transcription', STORAGE.openai, [OK.transcription]),
            ),
            erreurs: await withServiceFormats(errors, () =>
                play('traduction', STORAGE.openai, [HTTP_ERRORS[401]]),
            ),
        });
    });
}

/** Erreurs réseau : message, et nouvel essai après 1,5 s selon l'action et l'erreur */
function defineNetworkTests({ actions, play, matchSnapshot }) {
    for (const [label, error] of Object.entries(NETWORK_ERRORS)) {
        for (const action of Object.keys(actions)) {
            const key = `erreur réseau ${label} : ${action}`;
            test(key, async () =>
                matchSnapshot(
                    key,
                    await play(action, STORAGE.openai, [{ networkError: error }, OK[action]]),
                ),
            );
        }
    }
}

// Provider et clé envoyés avec chaque URL des tests d'allowlist
const ALLOWLIST_IDENTITIES = {
    openai: { providerId: 'openai', apiKey: KEYS.openai },
    custom: { providerId: 'custom', apiKey: KEYS.custom },
};

// Custom dont l'URL de chat est celle d'OpenAI : sa clé peut y partir, c'est son URL
const CUSTOM_ON_OPENAI = {
    ...STORAGE.custom,
    providers: {
        ...STORAGE.custom.providers,
        custom: {
            ...STORAGE.custom.providers.custom,
            chatUrl: 'https://api.openai.com/v1/chat/completions',
        },
    },
};

const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions';

// Cas de l'invariant de sécurité : [stockage, requête]
const INVARIANT_CASES = {
    'clé OpenAI vers api.groq.com': [
        STORAGE.openai,
        { url: 'https://api.groq.com/openai/v1/chat/completions', ...ALLOWLIST_IDENTITIES.openai },
    ],
    'clé Custom vers un hôte hors de ses URLs': [
        STORAGE.custom,
        { url: OPENAI_CHAT_URL, ...ALLOWLIST_IDENTITIES.custom },
    ],
    'clé Custom vers api.openai.com, son URL': [
        CUSTOM_ON_OPENAI,
        { url: OPENAI_CHAT_URL, ...ALLOWLIST_IDENTITIES.custom },
    ],
    'clé qui ne correspond pas au provider': [
        STORAGE.openai,
        { url: OPENAI_CHAT_URL, providerId: 'openai', apiKey: KEYS.mistral },
    ],
    'provider qui n’est pas celui du stockage pour ce service': [
        STORAGE.mixte,
        { url: OPENAI_CHAT_URL, ...ALLOWLIST_IDENTITIES.openai },
    ],
    'provider absent': [STORAGE.openai, { url: OPENAI_CHAT_URL, apiKey: KEYS.openai }],
    'clé Custom vers un autre port de son hôte': [
        STORAGE.custom,
        { url: 'http://localhost:9999/v1/chat/completions', ...ALLOWLIST_IDENTITIES.custom },
    ],
    'clé OpenAI vers un autre port d’api.openai.com': [
        STORAGE.openai,
        { url: 'https://api.openai.com:8443/v1/chat/completions', ...ALLOWLIST_IDENTITIES.openai },
    ],
};

/**
 * Appelle callApi directement sur un stockage (service chat)
 * @param {Object} h - Harnais
 * @param {Object} storage
 * @param {Object} request - url, providerId, apiKey
 * @returns {Promise<Object>} Résultat et nombre de requêtes émises
 */
async function callDirectly({ env, utils }, storage, request) {
    useStorage(env, storage);
    env.http.clear();
    env.http.respond({ json: { ok: true } });
    const r = await outcome(() =>
        utils.api.callApi({
            headers: { 'Content-Type': 'application/json' },
            body: '{}',
            service: 'chat',
            ...request,
        }),
    );
    return { ...r, requetes: env.http.requests.length };
}

/** Allowlist des hôtes de callApi, invariant de sécurité, et appel sans clé */
function defineAllowlistTests(h) {
    const { utils, matchSnapshot } = h;
    for (const [storageName, identity] of Object.entries(ALLOWLIST_IDENTITIES)) {
        test(`allowlist du content script : ${storageName}`, async () => {
            const result = {};
            for (const url of ALLOWLIST) {
                result[url] = await callDirectly(h, STORAGE[storageName], { url, ...identity });
            }
            matchSnapshot(`allowlist du content script : ${storageName}`, result);
        });
    }
    test('entêtes d’authentification fournis par l’appelant', async () => {
        const request = {
            url: OPENAI_CHAT_URL,
            ...ALLOWLIST_IDENTITIES.openai,
            headers: {
                Authorization: `Bearer ${KEYS.mistral}`,
                authorization: `Bearer ${KEYS.custom}`,
                'Content-Type': 'application/json',
                'X-Autre': 'garde',
            },
        };
        useStorage(h.env, STORAGE.openai);
        h.env.http.clear();
        h.env.http.respond({ json: { ok: true } });
        const r = await outcome(() =>
            utils.api.callApi({ body: '{}', service: 'chat', ...request }),
        );
        matchSnapshot('entêtes d’authentification fournis par l’appelant', {
            ...r,
            entetes: h.env.http.requests.map((q) => q.headers),
        });
    });
    test('invariant de sécurité', async () => {
        const result = {};
        for (const [label, [storage, request]] of Object.entries(INVARIANT_CASES)) {
            result[label] = await callDirectly(h, storage, request);
        }
        matchSnapshot('invariant de sécurité', result);
    });
    test('callApi sans clé', async () => {
        const url = OPENAI_CHAT_URL;
        matchSnapshot(
            'callApi sans clé',
            await outcome(() => utils.api.callApi({ url, body: '{}' })),
        );
    });
}

/**
 * Déclare la suite de tests de requêtes pour un navigateur
 * @param {Object} options
 * @param {'chrome'|'firefox'} options.browser
 * @param {string} options.testFileUrl - import.meta.url du fichier de test
 * @returns {Promise<Object>} Le harnais, pour les tests propres à un navigateur
 */
export async function defineRequestSuite({ browser, testFileUrl }) {
    const h = await createRequestHarness(browser, testFileUrl);
    defineProviderTests(h);
    defineHttpErrorTests(h);
    defineRegistryFlagTests(h);
    defineNetworkTests(h);
    defineAllowlistTests(h);
    return { ...h, outcome, FakeFileReader };
}
