// Suite commune aux tests du background (Chrome et Firefox), exercé par ses écouteurs :
// installation et migrations, menus contextuels, clic sur l'icône, raccourci, messages du
// content script (badge, langues, proxy) et fermeture d'onglet.
import { test } from 'node:test';
import { flush, loadScripts, setupEnv } from './env.mjs';
import { CUSTOM_URLS, KEYS, STORAGE } from './fixtures.mjs';
import { createSnapshots } from './snapshot.mjs';

const TAB = { id: 7, url: 'https://chatgpt.com/', active: true };

// Contenus de stockage propres aux migrations
const MIGRATIONS = {
    ...STORAGE,
    'herite-litellm-transcription-seule': {
        apiKey: KEYS.litellm,
        apiUrl: CUSTOM_URLS.transcriptionUrl,
        translationApiUrl: 'https://api.openai.com/v1/chat/completions',
    },
    'herite-urls-openai-explicites': {
        apiKey: KEYS.openai,
        apiUrl: 'https://api.openai.com/v1/audio/transcriptions',
        translationApiUrl: 'https://api.openai.com/v1/chat/completions',
    },
    'modele-gpt-4.1-nano': {
        ...STORAGE.openai,
        providers: {
            ...STORAGE.openai.providers,
            openai: { ...STORAGE.openai.providers.openai, selectedChatModel: 'gpt-4.1-nano' },
        },
    },
    'modele-gpt-4o': {
        ...STORAGE.openai,
        providers: {
            ...STORAGE.openai.providers,
            openai: { ...STORAGE.openai.providers.openai, selectedChatModel: 'gpt-4o' },
        },
    },
    'mistral-nomme-gpt-4o-intact': {
        ...STORAGE.mistral,
        providers: {
            ...STORAGE.mistral.providers,
            mistral: { ...STORAGE.mistral.providers.mistral, selectedChatModel: 'gpt-4o' },
        },
    },
};

/**
 * Prépare le harnais : bouchons, délais relevés, rechargement du background, événements
 * @param {'chrome'|'firefox'} browser
 * @param {string} testFileUrl
 * @returns {Object}
 */
function createHarness(browser, testFileUrl) {
    const env = setupEnv({ browser, tabs: [TAB] });
    const matchSnapshot = createSnapshots(testFileUrl);
    const delays = [];
    const realSetTimeout = globalThis.setTimeout;
    // Le délai d'initialisation après injection (500 ms) est relevé, pas attendu
    globalThis.setTimeout = (fn, ms, ...args) => {
        if (ms >= 100) delays.push(ms);
        return realSetTimeout(fn, 0, ...args);
    };

    /**
     * Recharge un background neuf sur un stockage donné (écouteurs et journal remis à zéro)
     * @param {Object} [sync] - Contenu de storage.sync
     * @param {Object} [options]
     * @param {boolean} [options.keepSession=false] - Garder storage.session (redémarrage du service worker)
     */
    async function freshBackground(sync = {}, { keepSession = false } = {}) {
        for (const list of Object.values(env.listeners)) list.length = 0;
        for (const area of keepSession ? ['sync', 'local'] : ['sync', 'local', 'session']) {
            for (const key of Object.keys(env.stores[area])) delete env.stores[area][key];
        }
        Object.assign(env.stores.sync, structuredClone(sync));
        env.handlers.tabMessage = null;
        env.calls.length = 0;
        env.http.clear();
        delays.length = 0;
        await loadScripts(['src/utils/languages-data.js', 'src/background.js'], { fresh: true });
    }

    /**
     * Déclenche un événement et attend la fin de ses écouteurs
     * @param {string} name - Nom de l'événement (ex. 'runtime.onInstalled')
     * @param {...*} args
     * @returns {Promise<Array>} Valeurs renvoyées par les écouteurs
     */
    async function emit(name, ...args) {
        const results = await Promise.all((env.listeners[name] ?? []).map((fn) => fn(...args)));
        for (let i = 0; i < 5; i++) await flush();
        return results;
    }

    /**
     * Envoie un message au background comme le fait le content script
     * @param {Object} message
     * @param {Object} [sender]
     * @returns {Promise<*>} Réponse envoyée par sendResponse
     */
    function send(message, sender = { tab: TAB }) {
        return new Promise((resolve) => {
            let answered = false;
            const sendResponse = (response) => {
                answered = true;
                resolve(response);
            };
            const async = (env.listeners['runtime.onMessage'] ?? []).map((fn) =>
                fn(message, sender, sendResponse),
            );
            if (!answered && !async.includes(true)) resolve('<aucune réponse>');
        });
    }

    /** Appels d'API qui modifient quelque chose (les lectures du stockage sont omises) */
    const effects = () => env.calls.filter((c) => !c.api.endsWith('.get'));

    return { env, matchSnapshot, delays, freshBackground, emit, send, effects };
}

/**
 * Installation et mise à jour : migrations du stockage, menus, page d'options
 * @param {Object} h - Harnais
 */
function defineInstallTests({ env, matchSnapshot, freshBackground, emit, effects }) {
    const cases = [
        ['vide', 'install'],
        ['vide', 'update'],
        ['herite-openai', 'update'],
        ['herite-litellm', 'update'],
        ['herite-litellm-transcription-seule', 'update'],
        ['herite-urls-openai-explicites', 'update'],
        ['openai', 'update'],
        ['modele-gpt-4.1-nano', 'update'],
        ['modele-gpt-4o', 'update'],
        ['mistral-nomme-gpt-4o-intact', 'update'],
    ];
    for (const [name, reason] of cases) {
        test(`onInstalled (${reason}) : ${name}`, async () => {
            await freshBackground(MIGRATIONS[name]);
            await emit('runtime.onInstalled', { reason });
            matchSnapshot(`onInstalled (${reason}) : ${name}`, {
                sync: env.stores.sync,
                local: env.stores.local,
                effets: effects(),
            });
        });
    }

    test('écouteurs enregistrés au chargement', async () => {
        await freshBackground();
        matchSnapshot(
            'écouteurs enregistrés',
            Object.fromEntries(Object.entries(env.listeners).map(([k, v]) => [k, v.length])),
        );
    });
}

// Clics sur les menus contextuels (info de contextMenus.onClicked)
const CLICKS = {
    reformulation: { menuItemId: 'rephraseSelection', selectionText: 'Du texte choisi' },
    correction: { menuItemId: 'correctSelection', selectionText: 'Du texte choisi' },
    'traduction-de': { menuItemId: 'translateSelection_de', selectionText: 'Du texte choisi' },
    'sans-selection': { menuItemId: 'rephraseSelection', selectionText: '' },
    'menu-parent': { menuItemId: 'translateMenu', selectionText: 'Du texte choisi' },
};

/**
 * Menus contextuels, clic sur l'icône et raccourci, avec injection du content script absent
 * @param {Object} h - Harnais
 */
function defineNavigationTests({ env, matchSnapshot, delays, freshBackground, emit, effects }) {
    for (const [label, info] of Object.entries(CLICKS)) {
        test(`menu contextuel : ${label}`, async () => {
            await freshBackground(STORAGE.openai);
            await emit('contextMenus.onClicked', info, TAB);
            matchSnapshot(`menu contextuel : ${label}`, {
                effets: effects(),
                delais: delays.slice(),
            });
        });
    }

    // Content script absent : le premier envoi échoue, le background l'injecte puis réessaie
    const absentThenPresent = () => {
        let first = true;
        env.handlers.tabMessage = () => {
            if (first) {
                first = false;
                throw new Error('Could not establish connection. Receiving end does not exist.');
            }
            return {};
        };
    };
    const absentAlways = () => {
        env.handlers.tabMessage = () => {
            throw new Error('Could not establish connection. Receiving end does not exist.');
        };
    };

    test('clic sur l’icône, content script présent', async () => {
        await freshBackground(STORAGE.openai);
        await emit('action.onClicked', TAB);
        matchSnapshot('icône : content script présent', {
            effets: effects(),
            delais: delays.slice(),
        });
    });
    test('clic sur l’icône, content script à injecter', async () => {
        await freshBackground(STORAGE.openai);
        absentThenPresent();
        await emit('action.onClicked', TAB);
        matchSnapshot('icône : injection puis envoi', {
            effets: effects(),
            delais: delays.slice(),
        });
    });
    test('clic sur l’icône, page où l’injection échoue', async () => {
        await freshBackground(STORAGE.openai);
        absentAlways();
        await emit('action.onClicked', TAB);
        matchSnapshot('icône : échec', { effets: effects(), delais: delays.slice() });
    });
    test('menu contextuel, content script à injecter', async () => {
        await freshBackground(STORAGE.openai);
        absentThenPresent();
        await emit('contextMenus.onClicked', CLICKS.reformulation, TAB);
        matchSnapshot('menu contextuel : injection puis envoi', {
            effets: effects(),
            delais: delays.slice(),
        });
    });

    for (const command of ['_execute_action', 'autre-commande']) {
        test(`raccourci : ${command}`, async () => {
            await freshBackground(STORAGE.openai);
            await emit('commands.onCommand', command);
            matchSnapshot(`raccourci : ${command}`, { effets: effects(), delais: delays.slice() });
        });
    }
}

/**
 * Messages du content script : badge et icône, fermeture d'onglet, langues
 * @param {Object} h - Harnais
 */
function defineMessageTests({ env, matchSnapshot, freshBackground, emit, send, effects }) {
    test('badge : démarrage, arrêt, erreur', async () => {
        await freshBackground(STORAGE.openai);
        const steps = {};
        for (const message of [
            { action: 'recordingStarted' },
            { action: 'recordingStopped' },
            { action: 'recordingError', error: 'panne simulée' },
            { action: 'recordingStarted' },
        ]) {
            env.calls.length = 0;
            const response = await send(message);
            await flush();
            steps[
                message.action +
                    (message.error ? ' (erreur)' : '') +
                    ` #${Object.keys(steps).length}`
            ] = {
                reponse: response,
                effets: effects(),
                session: structuredClone(env.stores.session),
            };
        }
        matchSnapshot('badge : séquence', steps);
    });

    test('badge : une erreur, puis l’arrêt envoyé par le nettoyage', async () => {
        await freshBackground(STORAGE.openai);
        const steps = [];
        for (const message of [
            { action: 'recordingStarted' },
            { action: 'recordingError', error: 'transcription impossible' },
            { action: 'recordingStopped' },
            { action: 'recordingStarted' },
            { action: 'recordingStopped' },
        ]) {
            env.calls.length = 0;
            await send(message);
            await flush();
            steps.push({ message: message.action, effets: effects() });
        }
        matchSnapshot('badge : erreur puis arrêt', steps);
    });

    test('badge : fermeture de l’onglet qui enregistre, après redémarrage du service worker', async () => {
        await freshBackground(STORAGE.openai);
        await send({ action: 'recordingStarted' });
        await freshBackground(STORAGE.openai, { keepSession: true });
        await emit('tabs.onRemoved', 8, {});
        const autreOnglet = effects();
        await emit('tabs.onRemoved', 7, {});
        matchSnapshot('badge : fermeture après redémarrage', {
            autreOnglet,
            ongletQuiEnregistre: effects(),
            session: env.stores.session,
        });
    });

    test('messages divers', async () => {
        await freshBackground(STORAGE.openai);
        matchSnapshot('messages divers', {
            langues: await send({ action: 'getTargetLanguageOptions' }),
            inconnu: await send({ action: 'actionInconnue' }),
        });
    });
}

const PROXY_CASES = {
    'json-openai': {
        storage: STORAGE.openai,
        request: {
            url: 'https://api.openai.com/v1/chat/completions',
            options: {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${KEYS.openai}`,
                    'Content-Type': 'application/json',
                },
                body: '{"model":"gpt-4o-mini"}',
            },
        },
        responses: [{ json: { choices: [{ message: { content: 'ok' } }] } }],
    },
    'multipart-avec-content-type': {
        storage: STORAGE.openai,
        request: {
            url: 'https://api.openai.com/v1/audio/transcriptions',
            options: {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${KEYS.openai}`,
                    'content-type': 'multipart/form-data',
                },
            },
            formDataFields: [
                {
                    name: 'file',
                    isFile: true,
                    data: 'GkXfo0KGgQE=',
                    type: 'audio/webm',
                    filename: 'audio.webm',
                },
                { name: 'model', isFile: false, value: 'gpt-transcribe' },
            ],
        },
        responses: [{ json: { text: 'ok' } }],
    },
    'hote-refuse': {
        storage: STORAGE.openai,
        request: {
            url: 'https://evil.example/v1/chat/completions',
            options: { method: 'POST', headers: {} },
        },
        responses: [{ json: {} }],
    },
    'hote-custom-actif': {
        storage: STORAGE.custom,
        request: {
            url: CUSTOM_URLS.chatUrl,
            options: { method: 'POST', headers: {} },
            formDataFields: undefined,
        },
        responses: [{ json: { ok: true } }],
    },
    'hote-custom-coupe': {
        storage: STORAGE.openai,
        request: { url: CUSTOM_URLS.chatUrl, options: { method: 'POST', headers: {} } },
        responses: [{ json: {} }],
    },
    'http-hors-localhost': {
        storage: STORAGE.openai,
        request: {
            url: 'http://api.openai.com/v1/chat/completions',
            options: { method: 'POST', headers: {} },
        },
        responses: [{ json: {} }],
    },
    'erreur-reseau': {
        storage: STORAGE.openai,
        request: {
            url: 'https://api.openai.com/v1/chat/completions',
            options: { method: 'POST', headers: {} },
        },
        responses: [
            { networkError: new TypeError('NetworkError when attempting to fetch resource.') },
        ],
    },
    'http-502-html': {
        storage: STORAGE.openai,
        request: {
            url: 'https://api.openai.com/v1/chat/completions',
            options: { method: 'POST', headers: {} },
        },
        responses: [{ status: 502, statusText: 'Bad Gateway', raw: '<html>Bad Gateway</html>' }],
    },
};

/**
 * Proxy fetch du background (Firefox) : allowlist, FormData reconstruit, erreurs
 * @param {Object} h - Harnais
 */
function defineProxyTests({ env, matchSnapshot, freshBackground, send }) {
    for (const [label, c] of Object.entries(PROXY_CASES)) {
        test(`proxy du background : ${label}`, async () => {
            await freshBackground(c.storage);
            env.http.respond(...c.responses);
            const response = await send({ action: 'proxyFetch', request: c.request });
            matchSnapshot(`proxy du background : ${label}`, {
                reponse: response,
                requetes: env.http.requests,
            });
        });
    }
}

/**
 * Déclare la suite de tests du background pour un navigateur
 * @param {Object} options
 * @param {'chrome'|'firefox'} options.browser
 * @param {string} options.testFileUrl - import.meta.url du fichier de test
 * @returns {Object} Le harnais, pour les tests propres à un navigateur
 */
export function defineBackgroundSuite({ browser, testFileUrl }) {
    const h = createHarness(browser, testFileUrl);
    defineInstallTests(h);
    defineNavigationTests(h);
    defineMessageTests(h);
    defineProxyTests(h);
    return h;
}
