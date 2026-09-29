// Stockage des providers pour l'extension BabelFishAI : configuration de chaque provider et
// provider sélectionné pour un service, lus dans les données de chrome.storage.sync.
// Sans DOM ni BabelFishAIConstants, pour servir aussi au background et à la page d'options.
globalThis.BabelFishAIProviderStore = (function () {
    'use strict'; // skipcq: JS-0118 - 'use strict' inside IIFE is intentional for module isolation

    // Providers historiques : leur configuration vit dans la clé `providers`. Un nouveau
    // provider a sa propre clé (`extraProvider.<id>`), que les anciennes versions ignorent
    const LEGACY_IDS = new Set(['openai', 'mistral', 'custom']);
    const EXTRA_PREFIX = 'extraProvider.';

    /**
     * Registre des providers (providers.js)
     * @returns {Object}
     */
    function registry() {
        return globalThis.BabelFishAIProviders;
    }

    /**
     * Lit une propriété propre d'un objet : jamais __proto__ ni constructor hérités
     * @param {Object|undefined} object
     * @param {string} key
     * @returns {*}
     */
    function ownValue(object, key) {
        if (!object || typeof key !== 'string' || !Object.hasOwn(object, key)) return undefined;
        // eslint-disable-next-line security/detect-object-injection -- key vérifiée par Object.hasOwn
        return object[key];
    }

    /**
     * Configuration d'un provider dans les données du stockage
     * @param {Object} data - Données lues dans storage.sync
     * @param {string} providerId - ID du provider
     * @returns {Object|undefined}
     */
    function getProviderConfig(data, providerId) {
        if (LEGACY_IDS.has(providerId)) return ownValue(data.providers, providerId);
        return ownValue(data, `${EXTRA_PREFIX}${providerId}`);
    }

    /**
     * Réglages d'URL exigés par un provider (Custom : les URLs de ses deux services)
     * @param {string} providerId
     * @returns {Array<string>}
     */
    function requiredUrlSettings(providerId) {
        const services = registry().getProvider(providerId)?.services ?? {};
        return Object.values(services)
            .map((service) => service.urlSetting)
            .filter(Boolean);
    }

    /**
     * Indique si un provider peut servir un service : connu du registre, offrant ce service,
     * activé, avec une clé, et avec toutes ses URLs s'il les tient de l'utilisateur
     * @param {string} providerId
     * @param {string} serviceType - 'transcription' ou 'chat'
     * @param {Object|undefined} config - Configuration du provider
     * @returns {boolean}
     */
    function isProviderUsable(providerId, serviceType, config) {
        if (!registry().supportsService(providerId, serviceType)) return false;
        if (!config?.enabled || !config?.apiKey) return false;
        return requiredUrlSettings(providerId).every((setting) => Boolean(config[setting]));
    }

    /**
     * Premier provider utilisable pour un service : les providers historiques dans l'ordre du
     * stockage (comme les versions précédentes), puis les nouveaux dans l'ordre du registre
     * @param {Object} data - Données lues dans storage.sync
     * @param {string} serviceType
     * @returns {{providerId: string, providerConfig: Object}|null}
     */
    function findFallback(data, serviceType) {
        const legacy = Object.keys(data.providers ?? {}).filter((id) => LEGACY_IDS.has(id));
        const others = registry()
            .getProviderOrder()
            .filter((id) => !LEGACY_IDS.has(id));
        for (const providerId of [...legacy, ...others]) {
            const providerConfig = getProviderConfig(data, providerId);
            if (isProviderUsable(providerId, serviceType, providerConfig)) {
                return { providerId, providerConfig };
            }
        }
        return null;
    }

    /**
     * URL analysée, ou null si elle est vide ou invalide
     * @param {string|undefined} url
     * @returns {URL|null}
     */
    function parseUrl(url) {
        if (!url) return null;
        try {
            return new URL(url);
        } catch {
            return null;
        }
    }

    /**
     * Protocole autorisé : HTTPS partout, HTTP uniquement pour localhost (cohérent avec
     * providers.js:isValidUrl, mode dev LiteLLM)
     * @param {URL} target - URL analysée
     * @returns {boolean}
     */
    function isProtocolAllowed(target) {
        if (target.protocol === 'https:') return true;
        const isLocalhost = target.hostname === 'localhost' || target.hostname === '127.0.0.1';
        return target.protocol === 'http:' && isLocalhost;
    }

    /**
     * Origines (schéma, hôte et port) vers lesquelles la clé d'un provider peut partir : celles
     * de ses URLs par défaut, ou, pour un provider dont l'utilisateur règle les URLs (Custom),
     * celles de ces réglages
     * @param {Object} data - Données lues dans storage.sync
     * @param {string} providerId
     * @returns {Set<string>}
     */
    function allowedOrigins(data, providerId) {
        const origins = new Set();
        const provider = registry().getProvider(providerId);
        const config = getProviderConfig(data, providerId);
        for (const [serviceType, service] of Object.entries(provider?.services ?? {})) {
            const url = service.urlSetting
                ? ownValue(config, service.urlSetting)
                : ownValue(provider.defaultUrls, serviceType);
            const target = parseUrl(url);
            if (target) origins.add(target.origin);
        }
        return origins;
    }

    /**
     * Invariant de sécurité : une URL ne peut recevoir la clé d'un provider que si son protocole
     * est autorisé et que son origine est une de celles configurées pour ce provider. Commun au
     * content script et au background, qui vérifient la même règle
     * @param {Object} data - Données lues dans storage.sync
     * @param {string} providerId - Provider dont la clé part avec la requête
     * @param {string} url - URL de la requête
     * @returns {boolean}
     */
    function isUrlAllowedForProvider(data, providerId, url) {
        const target = parseUrl(url);
        if (!target || !isProtocolAllowed(target)) return false;
        return allowedOrigins(data, providerId).has(target.origin);
    }

    /**
     * Clés de storage.sync qui décident du provider et de sa clé, avec leurs valeurs par défaut :
     * les clés historiques, et la clé propre de chaque nouveau provider du registre
     * @returns {Object} Argument de chrome.storage.sync.get
     */
    function resolutionDefaults() {
        const extra = registry()
            .getProviderOrder()
            .filter((id) => !LEGACY_IDS.has(id))
            .map((id) => [`${EXTRA_PREFIX}${id}`, null]);
        return {
            providers: null,
            transcriptionProvider: 'openai',
            chatProvider: 'openai',
            apiKey: '',
            ...Object.fromEntries(extra),
        };
    }

    /**
     * Valeur brute de la sélection d'un service, telle que stockée
     * @param {Object} data
     * @param {string} serviceType
     * @returns {string}
     */
    function readSelection(data, serviceType) {
        return serviceType === 'transcription' ? data.transcriptionProvider : data.chatProvider;
    }

    /**
     * Provider à utiliser pour un service. Sans `providers` (avant la migration), la sélection
     * est prise telle quelle. Sinon, un provider sélectionné inutilisable cède la place au
     * premier provider utilisable ; s'il n'y en a aucun, la sélection est gardée sans
     * configuration (garde-fou F8), pour que l'appel échoue sur la clé manquante
     * @param {Object} data - Données lues dans storage.sync
     * @param {string} serviceType
     * @returns {{providerId: string, providerConfig: Object|undefined}}
     */
    function resolveProvider(data, serviceType) {
        const providerId = readSelection(data, serviceType);
        if (!data.providers) return { providerId, providerConfig: undefined };
        const providerConfig = getProviderConfig(data, providerId);
        if (isProviderUsable(providerId, serviceType, providerConfig)) {
            return { providerId, providerConfig };
        }
        // F8 : aucun fallback valide. Invalider la config pour que callApi
        // échoue tôt sur "clé API manquante" plutôt que de renvoyer
        // l'utilisateur sur la fausse piste "URL non autorisée" via
        // isUrlAllowed (cas typique : tous les providers désactivés mais
        // l'un d'eux reste sélectionné comme actif).
        return findFallback(data, serviceType) ?? { providerId, providerConfig: undefined };
    }

    /**
     * Clé API du provider résolu. La clé legacy (`apiKey`) ne sert qu'en mode legacy (sans
     * `providers`) et pour OpenAI : sinon ce n'est qu'une copie, qui enverrait la clé OpenAI
     * alors qu'OpenAI est désactivé
     * @param {Object} data - Données lues dans storage.sync
     * @param {{providerId: string, providerConfig: Object|undefined}} resolved - Provider résolu
     * @returns {string|null}
     */
    function resolveKey(data, { providerId, providerConfig }) {
        if (providerConfig?.apiKey) return providerConfig.apiKey;
        if (providerId === 'openai' && !data.providers) return data.apiKey || null;
        return null;
    }

    return {
        isUrlAllowedForProvider,
        resolutionDefaults,
        resolveKey,
        getProviderConfig,
        isProviderUsable,
        findFallback,
        readSelection,
        resolveProvider,
    };
})();
