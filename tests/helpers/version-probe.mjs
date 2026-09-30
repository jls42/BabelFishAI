// Sonde lancée dans son propre processus par versions.test.mjs : BABELFISH_ROOT désigne l'arbre
// d'une version (git archive). Elle joue chaque contenu de stockage de VERSION_FIXTURES et écrit
// en JSON, sur la sortie standard, ce que cette version résout et envoie réellement.
import { loadScripts, setupEnv } from './env.mjs';
import { VERSION_FIXTURES } from './fixtures.mjs';

const env = setupEnv({ browser: 'chrome' });
// Les versions 1.1.17 et antérieures écrivent sur window
globalThis.window = globalThis;
await loadScripts(
    [
        'src/constants.js',
        'src/utils/providers.js',
        'src/utils/provider-store.js',
        'src/utils/provider-adapters.js',
        'src/utils/error-utils.js',
        'src/utils/api-utils.js',
        'src/utils/text-processing.js',
        'src/utils/recording-utils.js',
    ],
    {
        optional: [
            'src/utils/providers.js',
            'src/utils/provider-store.js',
            'src/utils/provider-adapters.js',
            'src/utils/error-utils.js',
            'src/utils/recording-utils.js',
        ],
    },
);
const utils = globalThis.BabelFishAIUtils;

// Réponse lisible par tous les formats : transcription OpenAI (`text`), chat (`choices`) et
// transcription par l'Interactions API de Gemini (`status`, `steps`)
const OK_ALL_FORMATS = {
    text: 'ok',
    choices: [{ message: { content: 'ok' } }],
    status: 'completed',
    steps: [{ type: 'model_output', content: [{ type: 'text', text: 'ok' }] }],
};

/**
 * Joue un appel et le résume : valeur ou erreur, et requêtes émises (hôte et entête d'autorisation,
 * plus x-goog-api-key quand la clé part dans cet entête)
 * @param {Function} fn
 * @returns {Promise<Object>}
 */
async function probe(fn) {
    env.http.clear();
    env.http.respond({ json: OK_ALL_FORMATS });
    let outcome = null;
    try {
        outcome = { valeur: await fn() };
    } catch (error) {
        outcome = { erreur: error.message };
    }
    const requetes = env.http.requests.map((r) => {
        const header = (wanted) => r.headers.find(([name]) => name.toLowerCase() === wanted)?.[1];
        const googleKey = header('x-goog-api-key');
        return {
            hote: new URL(r.url).host,
            autorisation: header('authorization') ?? null,
            ...(googleKey ? { 'x-goog-api-key': googleKey } : {}),
        };
    });
    return { ...outcome, requetes };
}

/**
 * Résume la configuration résolue, si la version a resolveApiConfig
 * @param {string} service
 * @returns {Promise<Object|string>}
 */
async function resolved(service) {
    if (typeof utils.api.resolveApiConfig !== 'function') return '(pas de resolveApiConfig)';
    const config = await utils.api.resolveApiConfig(service);
    return {
        provider: config.providerId,
        hote: new URL(config.url).host,
        cle: config.apiKey ?? null,
    };
}

const results = {};
for (const [name, content] of Object.entries(VERSION_FIXTURES)) {
    const reset = () => {
        for (const key of Object.keys(env.stores.sync)) delete env.stores.sync[key];
        Object.assign(env.stores.sync, structuredClone(content));
        globalThis.BabelFishAI = { ui: { showBanner() {}, hideBanner() {}, handleError() {} } };
    };
    reset();
    const result = { transcription: await resolved('transcription'), chat: await resolved('chat') };
    reset();
    result.getApiKey = (await probe(() => utils.api.getApiKey())).valeur ?? null;
    reset();
    result.reformulation = await probe(() =>
        utils.textProcessing.rephraseText('Un texte à reformuler'),
    );
    if (typeof utils.recording?._transcribeAudio === 'function') {
        reset();
        result.dictee = await probe(() =>
            utils.recording._transcribeAudio(
                new Blob([new Uint8Array([1, 2, 3])], { type: 'audio/webm' }),
            ),
        );
    }
    results[name] = result;
}
process.stdout.write(JSON.stringify(results));
