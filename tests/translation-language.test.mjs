// Langue cible d'une traduction : le prompt reçoit un code de la liste des langues de l'extension
// (languages-shared.js), qu'il vienne des options (bandeau, page d'options) ou du menu contextuel.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadScripts, setupEnv, silentUi } from './helpers/env.mjs';
import { STORAGE } from './helpers/fixtures.mjs';

const env = setupEnv({ browser: 'chrome' });
globalThis.BabelFishAI = silentUi();
await loadScripts(
    [
        'src/utils/languages-shared.js',
        'src/constants.js',
        'src/utils/providers.js',
        'src/utils/provider-store.js',
        'src/utils/provider-adapters.js',
        'src/utils/error-utils.js',
        'src/utils/api-utils.js',
        'src/utils/text-processing.js',
    ],
    { optional: ['src/utils/provider-store.js', 'src/utils/provider-adapters.js'] },
);
const utils = globalThis.BabelFishAIUtils;

/**
 * Joue une traduction comme la dictée (options lues dans le stockage) et renvoie la langue cible
 * lue dans le prompt envoyé au provider
 * @param {Object} settings - Réglages de traduction ajoutés au stockage OpenAI des fixtures
 * @param {string} [specifiedTargetLanguage] - Langue donnée par le menu contextuel
 * @returns {Promise<string|null>}
 */
async function promptTargetLanguage(settings, specifiedTargetLanguage) {
    for (const key of Object.keys(env.stores.sync)) delete env.stores.sync[key];
    Object.assign(env.stores.sync, structuredClone(STORAGE.openai), settings);
    env.http.clear();
    env.http.respond({ json: { choices: [{ message: { content: 'Texte traduit.' } }] } });
    const options = await utils.api.getFromStorage({
        enableTranslation: false,
        sourceLanguage: 'auto',
        targetLanguage: 'en',
    });
    await utils.textProcessing.handleTextTranslation('Bonjour', options, specifiedTargetLanguage);
    const { messages } = JSON.parse(env.http.requests[0].body);
    const prompt = messages.map((message) => message.content).join('\n');
    const match = prompt.match(/Translate the following text to ([^,]*), without altering URLs/);
    return match ? match[1] : null;
}

test('la langue cible du prompt est un code de la liste des langues', async () => {
    assert.equal(
        await promptTargetLanguage({ enableTranslation: true, targetLanguage: 'fr' }),
        'fr',
    );
    assert.equal(
        await promptTargetLanguage({ enableTranslation: true, targetLanguage: 'du texte libre' }),
        'en',
    );
    assert.equal(await promptTargetLanguage({ enableTranslation: false }, 'de'), 'de');
    assert.equal(await promptTargetLanguage({ enableTranslation: false }, 'du texte libre'), 'en');
});
