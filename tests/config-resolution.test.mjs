// Résolution de la configuration (provider, URL, clé, modèle) pour chaque contenu de stockage.
// Instantanés relevés en exécutant le code : ils décrivent le comportement actuel, défauts
// connus compris (proxy LiteLLM d'avant la migration, identifiants __proto__/constructor).
import { test } from 'node:test';
import { loadScripts, setupEnv } from './helpers/env.mjs';
import { STORAGE } from './helpers/fixtures.mjs';
import { createSnapshots } from './helpers/snapshot.mjs';

const env = setupEnv({ browser: 'chrome' });
await loadScripts(['src/constants.js', 'src/utils/providers.js', 'src/utils/api-utils.js']);
const api = globalThis.BabelFishAIUtils.api;
const matchSnapshot = createSnapshots(import.meta.url);

/**
 * Remplace le contenu de storage.sync (sur place : le bouchon garde la référence)
 * @param {Object} content
 */
function useStorage(content) {
    for (const key of Object.keys(env.stores.sync)) delete env.stores.sync[key];
    Object.assign(env.stores.sync, structuredClone(content));
    globalThis.BabelFishAI = {};
}

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

for (const [name, content] of Object.entries(STORAGE)) {
    test(`configuration résolue : ${name}`, async () => {
        const result = {};
        for (const service of ['transcription', 'chat']) {
            useStorage(content);
            result[`resolveApiConfig(${service})`] = await outcome(() => api.resolveApiConfig(service));
            useStorage(content);
            result[`getApiKey(${service})`] = await outcome(() => api.getApiKey(service));
            useStorage(content);
            result[`getOrFetchApiKey(${service})`] = await outcome(() => api.getOrFetchApiKey(service));
        }
        for (const provider of ['openai', 'mistral', 'custom']) {
            useStorage(content);
            result[`getApiKeyForProvider(${provider})`] = await outcome(() =>
                api.getApiKeyForProvider(provider, 'chat'),
            );
        }
        matchSnapshot(`configuration résolue : ${name}`, result);
    });
}
