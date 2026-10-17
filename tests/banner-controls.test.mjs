// Contrôles du bandeau (banner-utils.js) : seul un geste de l'utilisateur (événement `isTrusted`)
// modifie les réglages ; les événements créés par un script sont ignorés, et le menu des
// langues n'enregistre qu'une langue de la liste (languages-shared.js).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { doNothing, flush, loadScripts, setupEnv } from './helpers/env.mjs';

const env = setupEnv({ browser: 'chrome' });
globalThis.BabelFishAIUtils = {
    focus: { storeFocusAndSelection: doNothing, restoreFocusAndSelection: doNothing },
};
await loadScripts([
    'src/utils/languages-shared.js',
    'src/utils/text-processing.js',
    'src/utils/banner-utils.js',
]);

/**
 * Élément réduit à ce qu'utilise setupBannerEventListeners : écouteurs, attributs, style, valeur
 * @returns {Object}
 */
function fakeElement() {
    const listeners = new Map();
    const attributes = new Map();
    return {
        style: {},
        value: '',
        addEventListener(type, listener) {
            listeners.set(type, [...(listeners.get(type) ?? []), listener]);
        },
        getAttribute: (name) => attributes.get(name) ?? null,
        setAttribute(name, value) {
            attributes.set(name, String(value));
        },
        /**
         * Déclenche les écouteurs d'un type d'événement
         * @param {string} type - click, change…
         * @param {boolean} isTrusted - true pour un geste de l'utilisateur
         */
        fire(type, isTrusted) {
            for (const listener of listeners.get(type) ?? []) listener({ type, isTrusted });
        },
    };
}

/**
 * Valeurs écrites dans storage.sync depuis un point du journal des appels
 * @param {number} start - Longueur du journal au départ
 * @returns {Array<Object>}
 */
function syncWrites(start) {
    return env.calls
        .slice(start)
        .filter((call) => call.api === 'storage.sync.set')
        .map((call) => call.args[0]);
}

test('les contrôles du bandeau ne réagissent qu’aux gestes de l’utilisateur', async () => {
    const rephrase = fakeElement();
    const translate = fakeElement();
    const select = fakeElement();
    const container = fakeElement();
    const { banner } = globalThis.BabelFishAIUtils;
    banner.setupBannerEventListeners(rephrase, translate, select, container);
    const start = env.calls.length;
    select.value = 'de';

    rephrase.fire('click', false);
    translate.fire('click', false);
    select.fire('change', false);
    await flush();
    assert.deepEqual(syncWrites(start), []);
    assert.equal(translate.getAttribute('data-active'), null);

    rephrase.fire('click', true);
    translate.fire('click', true);
    select.fire('change', true);
    await flush();
    assert.deepEqual(syncWrites(start), [
        { enableRephrase: true },
        { enableTranslation: true },
        { targetLanguage: 'de' },
    ]);
    assert.equal(translate.getAttribute('data-active'), 'true');
    assert.equal(container.style.display, 'flex');
});

test('le menu des langues n’enregistre qu’une langue de la liste', async () => {
    const select = fakeElement();
    const { banner } = globalThis.BabelFishAIUtils;
    banner.setupBannerEventListeners(fakeElement(), fakeElement(), select, fakeElement());
    const start = env.calls.length;

    select.value = 'it';
    select.fire('change', true);
    await flush();
    select.value = 'du texte libre';
    select.fire('change', true);
    await flush();
    assert.deepEqual(syncWrites(start), [{ targetLanguage: 'it' }]);
    assert.equal(select.value, 'it');
});
