// Bouchon de l'API `chrome` pour exécuter le code de l'extension dans Node.
// Chaque appel est journalisé dans `calls`, les écouteurs sont gardés par événement, et le
// stockage copie les valeurs (structuredClone) comme le vrai navigateur.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Crée un événement d'extension (addListener, removeListener, hasListener)
 * @param {Array<Function>} listeners - Tableau qui recevra les écouteurs
 * @returns {Object} L'événement
 */
function makeEvent(listeners) {
    return {
        addListener: (fn) => listeners.push(fn),
        removeListener: (fn) => {
            const i = listeners.indexOf(fn);
            if (i >= 0) listeners.splice(i, 1);
        },
        hasListener: (fn) => listeners.includes(fn),
    };
}

/**
 * Copie les valeurs présentes pour une liste de clés
 * @param {Object} store
 * @param {Array<string>} keys
 * @returns {Object}
 */
function pickList(store, keys) {
    const out = {};
    for (const k of keys) {
        if (Object.hasOwn(store, k)) out[k] = structuredClone(store[k]);
    }
    return out;
}

/**
 * Copie les valeurs présentes, ou la valeur par défaut fournie
 * @param {Object} store
 * @param {Object} defaults
 * @returns {Object}
 */
function pickDefaults(store, defaults) {
    const out = {};
    for (const [k, def] of Object.entries(defaults)) {
        out[k] = structuredClone(Object.hasOwn(store, k) ? store[k] : def);
    }
    return out;
}

/**
 * Sélectionne des valeurs du stockage selon les quatre formes de `get`
 * @param {Object} store - Contenu de la zone de stockage
 * @param {null|string|Array<string>|Object} keys - Clés demandées
 * @returns {Object} Copie des valeurs trouvées
 */
function pick(store, keys) {
    if (keys === null || keys === undefined) return structuredClone(store);
    if (typeof keys === 'string') return pickList(store, [keys]);
    if (Array.isArray(keys)) return pickList(store, keys);
    return pickDefaults(store, keys);
}

/**
 * Répond comme l'API réelle : par rappel si un rappel est fourni, sinon par promesse
 * @param {Function|undefined} callback - Rappel éventuel
 * @param {Function} compute - Calcule le résultat (peut lever une erreur)
 * @param {Object} stub - Le bouchon, pour poser runtime.lastError pendant le rappel
 * @returns {Promise|undefined}
 */
function respond(callback, compute, stub) {
    if (typeof callback !== 'function') {
        return new Promise((resolve, reject) => {
            queueMicrotask(() => {
                try {
                    resolve(compute());
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    queueMicrotask(() => {
        // Après une erreur, le rappel reçoit undefined, comme dans Chrome
        const outcome = {};
        try {
            outcome.result = compute();
        } catch (error) {
            stub.runtime.lastError = { message: error.message };
        }
        try {
            callback(outcome.result);
        } finally {
            stub.runtime.lastError = undefined;
        }
    });
    return undefined;
}

/**
 * Crée une fonction journalisée qui répond par promesse ou par rappel
 * @param {Object} ctx - État partagé du bouchon
 * @param {string} api - Nom de l'API
 * @param {Function} [impl] - Résultat de l'appel
 * @returns {Function}
 */
function logged(ctx, api, impl) {
    return (...args) => {
        const callback = typeof args.at(-1) === 'function' ? args.pop() : undefined;
        ctx.calls.push({ api, args: structuredClone(args) });
        return respond(callback, () => impl?.(...args), ctx.stub);
    };
}

/**
 * Applique des valeurs à une zone et renvoie les changements (format de storage.onChanged)
 * @param {Object} store
 * @param {Object} items
 * @returns {Object}
 */
function applySet(store, items) {
    const changes = {};
    for (const [k, v] of Object.entries(items)) {
        changes[k] = { oldValue: store[k], newValue: structuredClone(v) };
        store[k] = structuredClone(v);
    }
    return changes;
}

/**
 * Retire des clés d'une zone et renvoie les changements
 * @param {Object} store
 * @param {string|Array<string>} keys
 * @returns {Object}
 */
function applyRemove(store, keys) {
    const changes = {};
    for (const k of Array.isArray(keys) ? keys : [keys]) {
        if (!Object.hasOwn(store, k)) continue;
        changes[k] = { oldValue: store[k] };
        delete store[k];
    }
    return changes;
}

/**
 * Crée une zone de stockage (sync, local, session). `ctx.failures` programme des échecs :
 * clé `sync.get`, `sync.set` ou `sync.remove`, valeur = l'erreur à lever une fois
 * @param {string} area - Nom de la zone
 * @param {Object} ctx - État partagé du bouchon
 * @returns {Object} La zone de stockage
 */
function makeStorageArea(area, ctx) {
    const store = ctx.stores[area];
    const fail = (op) => {
        const error = ctx.failures.get(`${area}.${op}`);
        if (!error) return;
        ctx.failures.delete(`${area}.${op}`);
        throw error;
    };
    const notify = (changes) => {
        if (!Object.keys(changes).length) return;
        for (const fn of ctx.storageListeners) fn(structuredClone(changes), area);
    };
    const write = (op, apply) => () => {
        fail(op);
        notify(apply());
    };
    return {
        get(keys, callback) {
            if (typeof keys === 'function') [callback, keys] = [keys, null];
            ctx.calls.push({ api: `storage.${area}.get`, args: [structuredClone(keys ?? null)] });
            return respond(
                callback,
                () => {
                    fail('get');
                    return pick(store, keys);
                },
                ctx.stub,
            );
        },
        set(items, callback) {
            ctx.calls.push({ api: `storage.${area}.set`, args: [structuredClone(items)] });
            return respond(
                callback,
                write('set', () => applySet(store, items)),
                ctx.stub,
            );
        },
        remove(keys, callback) {
            ctx.calls.push({ api: `storage.${area}.remove`, args: [structuredClone(keys)] });
            return respond(
                callback,
                write('remove', () => applyRemove(store, keys)),
                ctx.stub,
            );
        },
        clear(callback) {
            ctx.calls.push({ api: `storage.${area}.clear`, args: [] });
            return respond(callback, () => applyRemove(store, Object.keys(store)), ctx.stub);
        },
    };
}

/**
 * Envoie un message à un gestionnaire programmable, par promesse ou par rappel
 * @param {Object} ctx
 * @param {string} api - Nom journalisé
 * @param {Array} args - Arguments journalisés
 * @param {Function|null} handler - Gestionnaire (peut lever une erreur : envoi rejeté)
 * @param {Function} [callback]
 * @returns {Promise|undefined}
 */
function dispatch(ctx, api, args, handler, callback) {
    ctx.calls.push({ api, args: structuredClone(args) });
    const result = Promise.resolve().then(() => handler?.(...args));
    if (!callback) return result;
    result.then(callback, () => callback());
    return undefined;
}

function makeRuntime(ctx) {
    const rootUrl = pathToFileURL(ctx.root.endsWith(path.sep) ? ctx.root : ctx.root + path.sep);
    return {
        id: 'babelfishai-tests',
        lastError: undefined,
        getURL: (p) =>
            new URL(String(p).startsWith('/') ? String(p).slice(1) : String(p), rootUrl).href,
        getManifest: () =>
            JSON.parse(fs.readFileSync(path.join(ctx.root, 'manifest.json'), 'utf8')),
        sendMessage: (...args) => {
            const callback = typeof args.at(-1) === 'function' ? args.pop() : undefined;
            return dispatch(
                ctx,
                'runtime.sendMessage',
                args,
                ctx.handlers.runtimeMessage,
                callback,
            );
        },
        openOptionsPage: logged(ctx, 'runtime.openOptionsPage'),
        onMessage: ctx.event('runtime.onMessage'),
        onInstalled: ctx.event('runtime.onInstalled'),
        onStartup: ctx.event('runtime.onStartup'),
    };
}

function makeTabs(ctx) {
    return {
        query: logged(ctx, 'tabs.query', () => structuredClone(ctx.tabs)),
        sendMessage: (tabId, message, ...rest) => {
            const callback = typeof rest.at(-1) === 'function' ? rest.pop() : undefined;
            return dispatch(
                ctx,
                'tabs.sendMessage',
                [tabId, message],
                ctx.handlers.tabMessage,
                callback,
            );
        },
        onRemoved: ctx.event('tabs.onRemoved'),
        onUpdated: ctx.event('tabs.onUpdated'),
    };
}

function makeI18n(ctx) {
    const cache = new Map();
    const messages = (lang) => {
        if (!cache.has(lang)) {
            const file = path.join(ctx.root, '_locales', lang, 'messages.json');
            cache.set(lang, fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {});
        }
        return cache.get(lang);
    };
    return {
        getUILanguage: () => ctx.uiLanguage,
        getMessage: (key) => messages(ctx.uiLanguage)[key]?.message ?? '',
    };
}

function makeActionAndCommands(ctx) {
    return {
        action: {
            setBadgeText: logged(ctx, 'action.setBadgeText'),
            setBadgeBackgroundColor: logged(ctx, 'action.setBadgeBackgroundColor'),
            setIcon: logged(ctx, 'action.setIcon'),
            setTitle: logged(ctx, 'action.setTitle'),
            onClicked: ctx.event('action.onClicked'),
        },
        commands: {
            getAll: logged(ctx, 'commands.getAll', () => [
                {
                    name: '_execute_action',
                    shortcut: 'Ctrl+Shift+1',
                    description: 'Start/Stop Recording',
                },
            ]),
            openShortcutSettings: logged(ctx, 'commands.openShortcutSettings'),
            onCommand: ctx.event('commands.onCommand'),
            onChanged: ctx.event('commands.onChanged'),
        },
    };
}

function makePageApis(ctx) {
    return {
        contextMenus: {
            create: (props, callback) => {
                ctx.calls.push({ api: 'contextMenus.create', args: [structuredClone(props)] });
                if (typeof callback === 'function') queueMicrotask(callback);
                return props.id;
            },
            removeAll: logged(ctx, 'contextMenus.removeAll'),
            onClicked: ctx.event('contextMenus.onClicked'),
        },
        scripting: {
            executeScript: logged(ctx, 'scripting.executeScript', () => [{ result: undefined }]),
            insertCSS: logged(ctx, 'scripting.insertCSS'),
        },
        permissions: {
            contains: logged(ctx, 'permissions.contains', () => false),
            onAdded: ctx.event('permissions.onAdded'),
            onRemoved: ctx.event('permissions.onRemoved'),
        },
    };
}

/**
 * Crée le bouchon `chrome`
 * @param {Object} options
 * @param {string} options.root - Racine de l'arbre de l'extension (pour getURL et les locales)
 * @param {string} [options.uiLanguage='fr'] - Valeur de chrome.i18n.getUILanguage()
 * @param {Object} [options.sync] - Contenu initial de storage.sync
 * @param {Object} [options.local] - Contenu initial de storage.local
 * @param {Array<Object>} [options.tabs] - Onglets renvoyés par tabs.query
 * @returns {{chrome: Object, calls: Array, listeners: Object, stores: Object, failures: Map, handlers: Object}}
 */
export function createChromeStub({ root, uiLanguage = 'fr', sync = {}, local = {}, tabs = [] }) {
    const listeners = { 'storage.onChanged': [] };
    const ctx = {
        root,
        uiLanguage,
        tabs,
        stub: {},
        calls: [],
        failures: new Map(),
        stores: { sync: structuredClone(sync), local: structuredClone(local), session: {} },
        // Réponses programmables de runtime.sendMessage et tabs.sendMessage
        handlers: { runtimeMessage: null, tabMessage: null },
        storageListeners: listeners['storage.onChanged'],
        event: (name) => makeEvent((listeners[name] = [])),
    };
    Object.assign(ctx.stub, {
        runtime: makeRuntime(ctx),
        storage: {
            sync: makeStorageArea('sync', ctx),
            local: makeStorageArea('local', ctx),
            session: makeStorageArea('session', ctx),
            onChanged: makeEvent(ctx.storageListeners),
        },
        ...makeActionAndCommands(ctx),
        ...makePageApis(ctx),
        i18n: makeI18n(ctx),
        tabs: makeTabs(ctx),
    });
    return {
        chrome: ctx.stub,
        calls: ctx.calls,
        listeners,
        stores: ctx.stores,
        failures: ctx.failures,
        handlers: ctx.handlers,
    };
}
