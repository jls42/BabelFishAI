// Suite commune aux tests de requêtes Chrome et Firefox : dictée et actions texte par provider,
// erreurs HTTP et réseau, allowlist. Sous Firefox, le vrai background.js est chargé dans le
// même processus et reçoit les messages proxyFetch du content script, comme dans le navigateur.
import { test } from 'node:test';
import { FakeFileReader, loadScripts, setupEnv } from './env.mjs';
import { KEYS, STORAGE } from './fixtures.mjs';
import { createSnapshots } from './snapshot.mjs';

const CONTENT_SCRIPTS = [
    'src/constants.js',
    'src/utils/providers.js',
    'src/utils/error-utils.js',
    'src/utils/api-utils.js',
    'src/utils/text-processing.js',
    'src/utils/recording-utils.js',
];
const BACKGROUND_SCRIPTS = ['src/utils/languages-data.js', 'src/background.js'];

const AUDIO = new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, 0x42, 0x86, 0x81, 0x01]);
const OK_TRANSCRIPTION = { json: { text: '  Bonjour, ceci est une dictée.  ' } };
const OK_CHAT = { json: { choices: [{ message: { role: 'assistant', content: 'Réponse du provider.' } }] } };
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
 * Déclare la suite de tests de requêtes pour un navigateur
 * @param {Object} options
 * @param {'chrome'|'firefox'} options.browser
 * @param {string} options.testFileUrl - import.meta.url du fichier de test
 */
export async function defineRequestSuite({ browser, testFileUrl }) {
    const env = setupEnv({ browser, tabs: [{ id: 7, url: 'https://chatgpt.com/' }] });
    if (browser === 'firefox') {
        await loadScripts(BACKGROUND_SCRIPTS);
        // Messages du content script → écouteurs du background, avec l'onglet expéditeur
        env.handlers.runtimeMessage = (message) =>
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
    await loadScripts(CONTENT_SCRIPTS);
    globalThis.BabelFishAI = { ui: { showBanner() {}, hideBanner() {}, handleError() {} } };
    const utils = globalThis.BabelFishAIUtils;
    const matchSnapshot = createSnapshots(testFileUrl);

    const ACTIONS = {
        transcription: () => utils.recording._transcribeAudio(new Blob([AUDIO], { type: 'audio/webm' })),
        reformulation: () => utils.textProcessing.rephraseText('  Un   texte   à reformuler.  '),
        correction: () => utils.textProcessing.correctText('Un texte avec des fote.'),
        traduction: () => utils.textProcessing.translateText('Bonjour tout le monde', 'fr', 'en'),
    };
    const OK = { transcription: OK_TRANSCRIPTION, reformulation: OK_CHAT, correction: OK_CHAT, traduction: OK_CHAT };

    /**
     * Joue une action sur un contenu de stockage avec des réponses programmées
     * @param {string} action
     * @param {Object} storage
     * @param {Array<Object>} responses
     * @returns {Promise<Object>} Résultat et requêtes émises
     */
    async function play(action, storage, responses) {
        for (const key of Object.keys(env.stores.sync)) delete env.stores.sync[key];
        Object.assign(env.stores.sync, structuredClone(storage));
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
            const resultat = await outcome(ACTIONS[action]);
            return { resultat, requetes: env.http.requests.slice(), delais: delays, reponsesNonConsommees: env.http.pending() };
        } finally {
            globalThis.setTimeout = realSetTimeout;
        }
    }

    for (const name of ['openai', 'mistral', 'custom', 'custom-sans-journal', 'mixte', 'herite-openai', 'herite-litellm', 'tout-desactive', 'futur-S1']) {
        for (const action of Object.keys(ACTIONS)) {
            const key = `${action} : ${name}`;
            test(key, async () => matchSnapshot(key, await play(action, STORAGE[name], [OK[action]])));
        }
    }

    test('réponse en blocs (Mistral qui raisonne) : seul le texte est inséré', async () => {
        const key = 'reformulation : réponse en blocs';
        matchSnapshot(key, await play('reformulation', STORAGE.mistral, [OK_CHAT_BLOCKS]));
    });

    const HTTP_ERRORS = {
        400: { status: 400, json: { error: { message: 'message du provider (400)' } } },
        401: { status: 401, json: { error: { message: 'Incorrect API key provided' } } },
        403: { status: 403, json: { error: { message: 'message du provider (403)' } } },
        404: { status: 404, json: { error: { message: 'message du provider (404)' } } },
        418: { status: 418, json: { error: { message: 'message du provider (418)' } } },
        '422-detail': { status: 422, json: { detail: [{ loc: ['body', 'model'], msg: 'champ invalide' }] } },
        429: { status: 429, json: { error: { message: 'Rate limit reached' } } },
        500: { status: 500, json: { error: { message: 'message du provider (500)' } } },
        502: { status: 502, json: { error: { message: 'message du provider (502)' } } },
        '502-html': { status: 502, statusText: 'Bad Gateway', raw: '<html><body>Bad Gateway</body></html>' },
        503: { status: 503, json: { error: { message: 'message du provider (503)' } } },
        504: { status: 504, json: { error: { message: 'message du provider (504)' } } },
        'json-sans-message': { status: 500, json: { oops: true } },
    };
    for (const [code, response] of Object.entries(HTTP_ERRORS)) {
        for (const action of ['transcription', 'reformulation', 'traduction']) {
            const key = `erreur HTTP ${code} : ${action}`;
            test(key, async () => matchSnapshot(key, await play(action, STORAGE.openai, [response])));
        }
    }

    test('correction : un 400 relance la requête sans temperature', async () => {
        const key = 'correction : 400 puis succès sans temperature';
        matchSnapshot(key, await play('correction', STORAGE.openai, [HTTP_ERRORS[400], OK_CHAT]));
    });
    test('correction : deux 400 de suite', async () => {
        const key = 'correction : 400 deux fois';
        matchSnapshot(key, await play('correction', STORAGE.openai, [HTTP_ERRORS[400], HTTP_ERRORS[400]]));
    });
    test('correction : un 401 ne relance pas', async () => {
        const key = 'correction : 401';
        matchSnapshot(key, await play('correction', STORAGE.openai, [HTTP_ERRORS[401], OK_CHAT]));
    });

    const NETWORK_ERRORS = {
        'failed-to-fetch': new TypeError('Failed to fetch'),
        'networkerror-firefox': new TypeError('NetworkError when attempting to fetch resource.'),
    };
    for (const [label, error] of Object.entries(NETWORK_ERRORS)) {
        for (const action of Object.keys(ACTIONS)) {
            const key = `erreur réseau ${label} : ${action}`;
            test(key, async () =>
                matchSnapshot(key, await play(action, STORAGE.openai, [{ networkError: error }, OK[action]])),
            );
        }
    }

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
    for (const storageName of ['openai', 'custom']) {
        test(`allowlist du content script : ${storageName}`, async () => {
            const result = {};
            for (const url of ALLOWLIST) {
                for (const key of Object.keys(env.stores.sync)) delete env.stores.sync[key];
                Object.assign(env.stores.sync, structuredClone(STORAGE[storageName]));
                env.http.clear();
                env.http.respond({ json: { ok: true } });
                const r = await outcome(() =>
                    utils.api.callApi({ url, apiKey: KEYS.openai, headers: { 'Content-Type': 'application/json' }, body: '{}' }),
                );
                result[url] = { ...r, requetes: env.http.requests.length };
            }
            matchSnapshot(`allowlist du content script : ${storageName}`, result);
        });
    }

    test('callApi sans clé', async () => {
        matchSnapshot('callApi sans clé', await outcome(() => utils.api.callApi({ url: 'https://api.openai.com/v1/chat/completions', body: '{}' })));
    });

    return { env, utils, play, matchSnapshot, outcome, FakeFileReader };
}
