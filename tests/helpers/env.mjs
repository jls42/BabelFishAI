// Environnement d'exécution des tests : bouchons posés sur globalThis, puis modules de
// l'extension chargés par import(), sans vm ni eval. Chaque fichier de test tourne dans son
// propre processus (node --test) : un fichier par configuration (arbre × navigateur).
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createChromeStub } from './chrome-stub.mjs';

// Sans package.json, Node charge les .js de l'extension en CommonJS : leur cache ignore la
// requête de l'URL, il faut donc en retirer le fichier pour le réexécuter
const require = createRequire(import.meta.url);

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
// Arbre testé : le dépôt, ou l'arbre d'une autre version extrait par scripts/run-tests.sh --ref
export const ROOT = process.env.BABELFISH_ROOT ? path.resolve(process.env.BABELFISH_ROOT) : REPO_ROOT;

export const USER_AGENTS = {
    chrome: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    firefox: 'Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0',
};

// Horloge et hasard figés : les noms de fichiers audio deviennent reproductibles
export const FIXED_NOW = Date.UTC(2026, 8, 29, 12, 0, 0);
export const FIXED_RANDOM = 0.123456789;

/**
 * FileReader absent de Node : lecture réelle du Blob, ou échec programmé (`failNext`)
 */
export class FakeFileReader {
    static failNext = false;

    readAsDataURL(blob) {
        if (FakeFileReader.failNext) {
            FakeFileReader.failNext = false;
            setTimeout(() => {
                this.result = null;
                this.error = Object.assign(new Error('The requested file could not be read'), {
                    name: 'NotReadableError',
                });
                this.onloadend?.();
            }, 0);
            return;
        }
        blob.arrayBuffer().then((buffer) => {
            this.result = `data:${blob.type || 'application/octet-stream'};base64,${Buffer.from(buffer).toString('base64')}`;
            this.error = null;
            this.onloadend?.();
        });
    }
}

/**
 * Entêtes d'une requête, en liste ordonnée
 * @param {Headers|Object|undefined} headers
 * @returns {Array<Array<string>>}
 */
function describeHeaders(headers) {
    if (headers instanceof Headers) return [...headers];
    return Object.entries(headers ?? {});
}

/**
 * Décrit un champ multipart : fichier (nom, type, taille, contenu) ou valeur
 * @param {string} name
 * @param {Blob|string} value
 * @returns {Promise<Object>}
 */
async function describeField(name, value) {
    if (!(value instanceof Blob)) return { name, value: String(value) };
    const bytes = Buffer.from(await value.arrayBuffer());
    return { name, filename: value.name, type: value.type, size: bytes.length, base64: bytes.toString('base64') };
}

/**
 * Corps d'une requête : chaîne telle quelle (JSON comparé en chaîne), ou multipart décrit
 * champ par champ (duck typing, comme api-utils.js)
 * @param {*} body
 * @returns {Promise<*>}
 */
async function describeBody(body) {
    const isFormData = typeof body?.forEach === 'function' && typeof body?.append === 'function';
    if (!isFormData) return body ?? null;
    const fields = [];
    body.forEach((value, name) => fields.push([name, value]));
    return Promise.all(fields.map(([name, value]) => describeField(name, value)));
}

/**
 * Décrit une requête fetch de façon comparable
 * @param {string} url
 * @param {Object} options
 * @returns {Promise<Object>}
 */
export async function describeRequest(url, options = {}) {
    return {
        url: String(url),
        method: options.method ?? 'GET',
        headers: describeHeaders(options.headers),
        body: await describeBody(options.body),
    };
}

/**
 * Construit la réponse programmée : JSON par défaut, texte brut (`raw`) pour une page d'erreur
 * @param {Object} next - { raw } ou { json }, avec status et statusText facultatifs
 * @returns {Response}
 */
function scriptedResponse({ raw, json = {}, status = 200, statusText = '' }) {
    const isRaw = typeof raw === 'string';
    return new Response(isRaw ? raw : JSON.stringify(json), {
        status,
        statusText,
        headers: { 'content-type': isRaw ? 'text/html' : 'application/json' },
    });
}

/**
 * Remplace fetch par un espion. Les réponses sont programmées dans l'ordre (`respond`) ;
 * une réponse `{ networkError }` fait rejeter l'appel. Les fichiers locaux (file:) sont servis
 * depuis le disque sans être journalisés : i18n.js y lit les traductions
 * @returns {{requests: Array, respond: Function, pending: Function, clear: Function}}
 */
export function installFetchSpy() {
    const requests = [];
    const queue = [];
    globalThis.fetch = async (url, options = {}) => {
        if (String(url).startsWith('file:')) return new Response(fs.readFileSync(fileURLToPath(String(url))));
        requests.push(await describeRequest(url, options));
        const next = queue.shift() ?? { status: 200, json: {} };
        if (next.networkError) throw next.networkError;
        return scriptedResponse(next);
    };
    return {
        requests,
        respond: (...responses) => queue.push(...responses),
        pending: () => queue.length,
        clear: () => {
            requests.length = 0;
            queue.length = 0;
        },
    };
}

/**
 * Pose les bouchons sur globalThis
 * @param {Object} [options]
 * @param {'chrome'|'firefox'} [options.browser='chrome'] - userAgent simulé
 * @param {Object} [options.sync] - Contenu initial de storage.sync
 * @param {Object} [options.local] - Contenu initial de storage.local
 * @param {string} [options.uiLanguage] - Valeur de chrome.i18n.getUILanguage()
 * @param {Array} [options.tabs] - Onglets renvoyés par tabs.query
 * @returns {Object} Bouchon chrome, journal des appels, espion fetch, journal de la console
 */
export function setupEnv({ browser = 'chrome', sync, local, uiLanguage, tabs } = {}) {
    const stub = createChromeStub({ root: ROOT, sync, local, uiLanguage, tabs });
    const define = (name, value) =>
        Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
    define('chrome', stub.chrome);
    define('navigator', { userAgent: USER_AGENTS[browser], onLine: true, language: 'fr-FR' });
    define('FileReader', FakeFileReader);
    // recording-utils.js écoute `pagehide` sur globalThis
    define('addEventListener', () => {});
    define('removeEventListener', () => {});
    Date.now = () => FIXED_NOW;
    Math.random = () => FIXED_RANDOM;
    const http = installFetchSpy();
    const consoleLog = [];
    if (process.env.TEST_VERBOSE !== '1') {
        for (const level of ['log', 'info', 'warn', 'error', 'debug']) {
            console[level] = (...args) => consoleLog.push([level, args.map(String).join(' ')]);
        }
    }
    return { ...stub, http, consoleLog };
}

let instance = 0;

/**
 * Charge des scripts de l'arbre testé, dans l'ordre, par import()
 * @param {Array<string>} files - Chemins relatifs à la racine de l'arbre
 * @param {Object} [options]
 * @param {boolean} [options.fresh=false] - Réexécuter les modules déjà chargés (état remis à zéro)
 * @param {Array<string>} [options.optional=[]] - Fichiers qui peuvent manquer dans un arbre
 * @returns {Promise<void>}
 */
export async function loadScripts(files, { fresh = false, optional = [] } = {}) {
    const suffix = fresh ? `?instance=${++instance}` : '';
    for (const rel of files) {
        const file = path.join(ROOT, rel);
        if (!fs.existsSync(file)) {
            if (optional.includes(rel)) continue;
            throw new Error(`module absent de l'arbre testé : ${rel}`);
        }
        if (fresh) delete require.cache[file];
        await import(pathToFileURL(file).href + suffix);
    }
}

/** Laisse s'écouler les microtâches et les minuteries à zéro */
export const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
