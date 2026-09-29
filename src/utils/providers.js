// Registre des providers IA pour l'extension BabelFishAI
// Ce module définit les providers disponibles et leurs configurations

globalThis.BabelFishAIProviders = (function (definitions) {
    'use strict'; // skipcq: JS-0118 - 'use strict' inside IIFE is intentional for module isolation

    /**
     * Gèle un objet et tout ce qu'il contient. L'invariant de sécurité tire du registre les
     * hôtes vers lesquels part la clé d'un provider : rien ne doit pouvoir les changer ensuite
     * @param {*} value
     * @returns {*} La même valeur, gelée
     */
    function deepFreeze(value) {
        if (value && typeof value === 'object' && !Object.isFrozen(value)) {
            Object.freeze(value);
            Object.values(value).forEach(deepFreeze);
        }
        return value;
    }

    /**
     * Complète un service : authentification Bearer et erreurs au format OpenAI
     * ({ error: { message } }), sauf indication contraire de sa définition
     * @param {Object} service
     * @returns {Object}
     */
    function serviceWithDefaults(service) {
        return { auth: definitions.defaultAuth, errors: 'openai', ...service };
    }

    /**
     * Applique une fonction à chaque valeur d'un objet
     * @param {Object} object
     * @param {Function} fn
     * @returns {Object} Nouvel objet, mêmes clés dans le même ordre
     */
    function mapValues(object, fn) {
        return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, fn(value)]));
    }

    /**
     * Provider dont chaque service est complété par serviceWithDefaults
     * @param {Object} provider
     * @returns {Object}
     */
    function withServiceDefaults(provider) {
        return { ...provider, services: mapValues(provider.services, serviceWithDefaults) };
    }

    const PROVIDERS = deepFreeze(mapValues(definitions.providers, withServiceDefaults));

    /** Liste ordonnée des IDs de providers (pour l'affichage UI) */
    const PROVIDER_ORDER = deepFreeze(definitions.order);

    /**
     * Récupère un provider par son ID
     * @param {string} providerId - ID du provider (ex: 'openai', 'mistral')
     * @returns {Object|null} Configuration du provider ou null si non trouvé
     */
    function getProvider(providerId) {
        // Seules les entrées propres au registre sont des providers : ni __proto__, ni constructor
        if (!Object.hasOwn(PROVIDERS, providerId)) return null;
        // eslint-disable-next-line security/detect-object-injection -- providerId vérifié par Object.hasOwn
        return PROVIDERS[providerId];
    }

    /**
     * Définition d'un service d'un provider (format, authentification, format d'erreur)
     * @param {string} providerId - ID du provider
     * @param {string} serviceType - Type de service ('transcription' ou 'chat')
     * @returns {Object|null} Le service, ou null si le provider ne l'offre pas
     */
    function getService(providerId, serviceType) {
        const services = getProvider(providerId)?.services;
        if (!services || !Object.hasOwn(services, serviceType)) return null;
        // eslint-disable-next-line security/detect-object-injection -- serviceType vérifié par Object.hasOwn
        return services[serviceType];
    }

    /**
     * Noms, en minuscules, des entêtes d'authentification de tous les services du registre, plus
     * `authorization` : on les retire des entêtes fournis par l'appelant, pour que seule la clé
     * vérifiée parte avec une requête (ni la clé d'un autre provider, ni un entête forgé)
     * @returns {Set<string>}
     */
    function authHeaderNames() {
        const names = new Set(['authorization']);
        for (const provider of Object.values(PROVIDERS)) {
            for (const service of Object.values(provider.services)) {
                names.add(service.auth.header.toLowerCase());
            }
        }
        return names;
    }

    /**
     * Indique si un provider offre un service
     * @param {string} providerId - ID du provider
     * @param {string} serviceType - Type de service ('transcription' ou 'chat')
     * @returns {boolean}
     */
    function supportsService(providerId, serviceType) {
        return getService(providerId, serviceType) !== null;
    }

    /**
     * Indique si un modèle de chat accepte le paramètre temperature : oui, sauf si le registre
     * déclare `temperature: false` pour le service de chat du provider (tous ses modèles, ceux
     * que l'utilisateur ajoute compris) ou pour le modèle lui-même
     * @param {string} providerId - ID du provider
     * @param {string} modelId - ID du modèle
     * @returns {boolean}
     */
    function acceptsTemperature(providerId, modelId) {
        if (getService(providerId, 'chat')?.temperature === false) return false;
        const models = getProvider(providerId)?.chatModels ?? [];
        return models.find((model) => model.id === modelId)?.temperature !== false;
    }

    /**
     * Récupère tous les providers disponibles
     * @returns {Object} Objet contenant tous les providers
     */
    function getAllProviders() {
        return { ...PROVIDERS };
    }

    /**
     * IDs des providers dans l'ordre de la page d'options (rang `ui.order` : Mistral, OpenAI,
     * les nouveaux providers, puis Custom)
     * @returns {string[]}
     */
    function getUiOrder() {
        return Object.values(PROVIDERS)
            .sort((a, b) => a.ui.order - b.ui.order)
            .map((provider) => provider.id);
    }

    /**
     * Récupère la liste ordonnée des IDs de providers
     * @returns {string[]} Liste des IDs de providers
     */
    function getProviderOrder() {
        return [...PROVIDER_ORDER];
    }

    /**
     * Récupère les providers activés depuis la configuration utilisateur. Ne voit que les
     * providers rangés dans `providers` (OpenAI, Mistral, Custom) : un provider ajouté vit dans
     * `extraProvider.<id>` (provider-store.js). Aucun appelant (lot 7 du plan, n°14)
     * @param {Object} providersConfig - Configuration des providers depuis le storage
     * @returns {string[]} Liste des IDs de providers activés
     */
    function getEnabledProviders(providersConfig) {
        if (!providersConfig) {
            return ['openai']; // Fallback par défaut
        }

        return PROVIDER_ORDER.filter((providerId) => {
            // eslint-disable-next-line security/detect-object-injection -- False positive: providerId is from PROVIDER_ORDER constant
            const config = providersConfig[providerId];
            return config?.enabled && config?.apiKey;
        });
    }

    /**
     * Récupère l'URL de transcription pour un provider
     * @param {string} providerId - ID du provider
     * @param {string} customUrl - URL custom (si configurée)
     * @returns {string} URL de transcription à utiliser
     */
    function getTranscriptionUrl(providerId, customUrl) {
        if (customUrl?.trim()) {
            return customUrl.trim();
        }
        const provider = getProvider(providerId);
        return provider?.defaultUrls.transcription ?? PROVIDERS.openai.defaultUrls.transcription;
    }

    /**
     * Récupère l'URL de chat pour un provider
     * @param {string} providerId - ID du provider
     * @param {string} customUrl - URL custom (si configurée)
     * @returns {string} URL de chat à utiliser
     */
    function getChatUrl(providerId, customUrl) {
        if (customUrl?.trim()) {
            return customUrl.trim();
        }
        const provider = getProvider(providerId);
        return provider?.defaultUrls.chat ?? PROVIDERS.openai.defaultUrls.chat;
    }

    /**
     * Récupère le modèle par défaut pour un type de service et un provider
     * @param {string} providerId - ID du provider
     * @param {string} serviceType - Type de service ('transcription' ou 'chat')
     * @returns {string|null} ID du modèle par défaut ou null
     */
    function getDefaultModel(providerId, serviceType) {
        const provider = getProvider(providerId);
        if (!provider) {
            return null;
        }

        const models =
            serviceType === 'transcription' ? provider.transcriptionModels : provider.chatModels;

        const defaultModel = models.find((m) => m.default);
        if (defaultModel) {
            return defaultModel.id;
        }
        return models[0]?.id ?? null;
    }

    /**
     * Indique si un modèle est encore proposé pour un provider : liste de ce registre
     * ou modèles personnalisés de l'utilisateur. Un modèle retiré de la liste n'est plus proposé.
     * @param {string} providerId - ID du provider
     * @param {string} serviceType - Type de service ('transcription' ou 'chat')
     * @param {string} modelId - ID du modèle à vérifier
     * @param {string[]} [customModels] - Modèles personnalisés ajoutés par l'utilisateur
     * @returns {boolean} true si le modèle est proposé
     */
    function isModelAvailable(providerId, serviceType, modelId, customModels = []) {
        if (!modelId) {
            return false;
        }
        if (Array.isArray(customModels) && customModels.includes(modelId)) {
            return true;
        }

        const provider = getProvider(providerId);
        if (!provider) {
            return false;
        }

        const models =
            serviceType === 'transcription' ? provider.transcriptionModels : provider.chatModels;
        return models.some((m) => m.id === modelId);
    }

    /**
     * Récupère tous les modèles disponibles pour un type de service
     * Combine les modèles de tous les providers activés + modèles custom
     * @param {string} serviceType - Type de service ('transcription' ou 'chat')
     * @param {string[]} enabledProviderIds - IDs des providers activés
     * @param {string[]} customModels - Modèles custom ajoutés par l'utilisateur
     * @returns {Array<{id: string, name: string, providerId: string}>} Liste des modèles avec leur provider
     */
    function getAllModels(serviceType, enabledProviderIds, customModels = []) {
        const models = [];

        // Ajouter les modèles de chaque provider activé
        enabledProviderIds.forEach((providerId) => {
            const provider = getProvider(providerId);
            if (!provider) return;

            const providerModels =
                serviceType === 'transcription'
                    ? provider.transcriptionModels
                    : provider.chatModels;

            providerModels.forEach((model) => {
                // Format préfixé si plusieurs providers, sinon juste l'ID
                const displayPrefix = enabledProviderIds.length > 1 ? `${provider.name}: ` : '';
                models.push({
                    id: model.id,
                    name: `${displayPrefix}${model.name}`,
                    providerId,
                    fullId: `${providerId}/${model.id}`,
                    isDefault: model.default,
                });
            });
        });

        // Ajouter les modèles custom (toujours associés au provider actif ou OpenAI)
        if (customModels && customModels.length > 0) {
            customModels.forEach((customModel) => {
                models.push({
                    id: customModel,
                    name: `Custom: ${customModel}`,
                    providerId: 'custom',
                    fullId: `custom/${customModel}`,
                    isDefault: false,
                });
            });
        }

        return models;
    }

    /**
     * Parse un ID de modèle complet (format: "providerId/modelId")
     * @param {string} fullModelId - ID complet du modèle
     * @returns {{providerId: string, modelId: string}} Provider et modèle séparés
     */
    function parseFullModelId(fullModelId) {
        if (!fullModelId || typeof fullModelId !== 'string') {
            return { providerId: 'openai', modelId: fullModelId || '' };
        }

        const parts = fullModelId.split('/');
        if (parts.length === 2 && Object.hasOwn(PROVIDERS, parts[0])) {
            return { providerId: parts[0], modelId: parts[1] };
        }

        // Si pas de préfixe, essayer de détecter le provider depuis le nom du modèle
        return { providerId: detectProviderFromModel(fullModelId), modelId: fullModelId };
    }

    /**
     * Détecte le provider d'un modèle basé sur son nom
     * @param {string} modelId - ID du modèle
     * @returns {string} ID du provider détecté
     */
    function detectProviderFromModel(modelId) {
        if (!modelId) return 'openai';

        const modelLower = modelId.toLowerCase();

        // Modèles Mistral
        if (
            modelLower.includes('mistral') ||
            modelLower.includes('voxtral') ||
            modelLower.includes('codestral') ||
            modelLower.includes('ministral') ||
            modelLower.includes('magistral') ||
            modelLower.includes('devstral')
        ) {
            return 'mistral';
        }

        // Modèles OpenAI (par défaut)
        return 'openai';
    }

    /**
     * Vérifie si un provider supporte l'option NoLog (LiteLLM)
     * @param {string} providerId - ID du provider
     * @returns {boolean} True si le provider supporte NoLog
     */
    function supportsNoLog(providerId) {
        const provider = getProvider(providerId);
        return provider ? provider.supportsNoLog : false;
    }

    /**
     * Crée la configuration par défaut pour les providers (pour nouveau storage)
     * @returns {Object} Configuration par défaut des providers
     */
    function createDefaultProvidersConfig() {
        return {
            openai: {
                apiKey: '',
                enabled: false,
                transcriptionModels: [],
                chatModels: [],
            },
            mistral: {
                apiKey: '',
                enabled: false,
                transcriptionModels: [],
                chatModels: [],
            },
            custom: {
                apiKey: '',
                enabled: false,
                transcriptionUrl: '',
                chatUrl: '',
                transcriptionModels: [],
                chatModels: [],
            },
        };
    }

    /**
     * Valide une URL (doit commencer par https:// ou http:// pour localhost)
     * @param {string} url - URL à valider
     * @param {boolean} allowHttp - Si true, accepte HTTP pour localhost (provider custom)
     * @returns {boolean} True si l'URL est valide
     */
    function isValidUrl(url, allowHttp = false) {
        if (!url || typeof url !== 'string') {
            return true; // URL vide = utiliser le défaut, donc valide
        }
        try {
            const parsed = new URL(url.trim());
            if (parsed.protocol === 'https:') {
                return true;
            }
            // Permettre HTTP pour localhost si autorisé (développement local)
            if (allowHttp && parsed.protocol === 'http:') {
                const hostname = parsed.hostname.toLowerCase();
                return hostname === 'localhost' || hostname === '127.0.0.1';
            }
            return false;
        } catch {
            return false;
        }
    }

    // API publique du module
    return {
        // Valeurs par défaut d'un service, pour un type de service que le registre ne déclare pas
        DEFAULT_SERVICE: deepFreeze(serviceWithDefaults({})),

        // Getters
        getProvider,
        getService,
        authHeaderNames,
        supportsService,
        acceptsTemperature,
        getAllProviders,
        getProviderOrder,
        getUiOrder,
        getEnabledProviders,
        getTranscriptionUrl,
        getChatUrl,
        getDefaultModel,
        isModelAvailable,
        getAllModels,

        // Utilitaires
        parseFullModelId,
        detectProviderFromModel,
        supportsNoLog,
        createDefaultProvidersConfig,
        isValidUrl,
    };
})({
    // Authentification par défaut d'un service : entête Authorization, schéma Bearer (API
    // compatibles OpenAI)
    defaultAuth: { header: 'Authorization', scheme: 'Bearer' },
    /**
     * Définition des providers IA disponibles
     * Chaque provider contient ses URLs par défaut, ses services (format d'adaptateur,
     * et au besoin authentification, format d'erreur et réglage d'URL), sa présentation dans la
     * page d'options (`ui` : rang, abréviation, nom du statut, logo ou emoji, page des clés, note
     * facultative sous forme de clé i18n) et
     * ses modèles supportés. La page des clés (`keyUrl`) et la note (`noteKey`) ne servent qu'au
     * panneau généré d'un provider ajouté : les panneaux d'OpenAI, de Mistral et de Custom sont
     * écrits dans options.html. `temperature: false` sur le service de chat vaut pour tous ses
     * modèles, modèles ajoutés par l'utilisateur compris ; sur un modèle de chat, pour lui seul.
     * Un modèle de chat peut aussi porter `reasoningEffort`, l'effort de réflexion à envoyer
     * (reasoning_effort)
     */
    providers: {
        openai: {
            id: 'openai',
            name: 'OpenAI',
            defaultUrls: {
                transcription: 'https://api.openai.com/v1/audio/transcriptions',
                chat: 'https://api.openai.com/v1/chat/completions',
            },
            // Dictée en multipart, texte par chat/completions (API compatible OpenAI)
            services: {
                transcription: { format: 'openai-multipart' },
                chat: { format: 'openai-chat' },
            },
            ui: {
                order: 20,
                short: 'OAI',
                statusName: 'OpenAI',
                logo: 'images/openai-logo.png',
                keyUrl: 'https://platform.openai.com/account/api-keys',
            },
            // whisper-1, gpt-4o-mini-transcribe et gpt-4o-transcribe sont retirés de l'API
            // OpenAI le 2027-02-26, avec gpt-transcribe pour remplaçant recommandé
            transcriptionModels: [
                { id: 'gpt-transcribe', name: 'gpt-transcribe', default: true },
                { id: 'whisper-1', name: 'whisper-1' },
                { id: 'gpt-4o-mini-transcribe', name: 'gpt-4o-mini-transcribe' },
                { id: 'gpt-4o-transcribe', name: 'gpt-4o-transcribe' },
            ],
            // Modèles retirés : gpt-4.1-nano et gpt-4o (réglages migrés par background.js)
            chatModels: [
                { id: 'gpt-4o-mini', name: 'gpt-4o-mini', default: true },
                { id: 'gpt-4.1-mini', name: 'gpt-4.1-mini' },
                { id: 'gpt-4.1', name: 'gpt-4.1' },
                { id: 'gpt-5.4-nano', name: 'gpt-5.4-nano' },
                { id: 'gpt-5.4-mini', name: 'gpt-5.4-mini' },
                { id: 'gpt-5.4', name: 'gpt-5.4' },
                { id: 'gpt-5.6-luna', name: 'gpt-5.6-luna' },
                { id: 'gpt-5.6-terra', name: 'gpt-5.6-terra' },
                { id: 'gpt-5.6-sol', name: 'gpt-5.6-sol' },
            ],
            supportsNoLog: false, // NoLog est uniquement pour LiteLLM, pas OpenAI
        },
        mistral: {
            id: 'mistral',
            name: 'Mistral AI',
            defaultUrls: {
                transcription: 'https://api.mistral.ai/v1/audio/transcriptions',
                chat: 'https://api.mistral.ai/v1/chat/completions',
            },
            // Dictée en multipart, texte par chat/completions (API compatible OpenAI)
            services: {
                transcription: { format: 'openai-multipart' },
                chat: { format: 'openai-chat' },
            },
            ui: {
                order: 10,
                short: 'Mis',
                statusName: 'Mistral',
                logo: 'images/mistral-logo.png',
                keyUrl: 'https://console.mistral.ai/api-keys',
            },
            transcriptionModels: [
                { id: 'voxtral-mini-latest', name: 'Voxtral Mini', default: true },
            ],
            chatModels: [
                { id: 'mistral-small-latest', name: 'Mistral Small', default: true },
                { id: 'mistral-medium-latest', name: 'Mistral Medium' },
                { id: 'mistral-large-latest', name: 'Mistral Large' },
                { id: 'codestral-latest', name: 'Codestral' },
                { id: 'ministral-3b-latest', name: 'Ministral 3B' },
                { id: 'ministral-8b-latest', name: 'Ministral 8B' },
                { id: 'ministral-14b-latest', name: 'Ministral 14B' },
            ],
            supportsNoLog: false,
        },
        custom: {
            id: 'custom',
            name: 'Custom/LiteLLM',
            defaultUrls: { transcription: '', chat: '' },
            // Les URLs viennent des réglages de l'utilisateur (urlSetting)
            services: {
                transcription: { format: 'openai-multipart', urlSetting: 'transcriptionUrl' },
                chat: { format: 'openai-chat', urlSetting: 'chatUrl' },
            },
            // Pas de logo officiel : l'emoji 🚅 de LiteLLM
            ui: { order: 90, short: 'Cus', statusName: 'Custom', emoji: '🚅' },
            transcriptionModels: [
                { id: 'whisper-1', name: 'whisper-1', default: true },
                { id: 'whisper', name: 'whisper' },
            ],
            chatModels: [{ id: 'gpt-4o-mini', name: 'GPT-4o Mini', default: true }],
            supportsNoLog: true,
        },
        gemini: {
            id: 'gemini',
            name: 'Gemini',
            defaultUrls: {
                transcription: 'https://generativelanguage.googleapis.com/v1beta/interactions',
                chat: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
            },
            // Dictée par l'Interactions API (audio en base64, store: false), clé dans
            // x-goog-api-key ; texte par la couche compatible OpenAI, en Bearer. Une clé refusée
            // répond 400, dans un corps d'erreur propre à Gemini (mesures du 2026-09-29)
            services: {
                transcription: {
                    format: 'gemini-interactions',
                    auth: { header: 'x-goog-api-key' },
                    errors: 'gemini',
                },
                // temperature est dépréciée pour les modèles Gemini 3 : jamais envoyée, même à un
                // modèle ajouté par l'utilisateur
                chat: { format: 'openai-chat', errors: 'gemini', temperature: false },
            },
            // Pas de logo (choix du propriétaire) : les règles de marque de Google, sur un portail
            // réservé aux partenaires, n'ont pas pu être lues. Le signe zodiacal Gemini est un
            // caractère Unicode
            // Note du panneau (clé i18n) : clé d'un projet avec facturation ; hors de l'EEE, de la
            // Suisse et du Royaume-Uni, Google peut utiliser les contenus d'une clé gratuite, avec
            // relecture humaine ; clé restreinte à l'API Gemini, jamais à des sites web
            ui: {
                order: 30,
                short: 'Gem',
                statusName: 'Gemini',
                emoji: '♊',
                keyUrl: 'https://aistudio.google.com/apikey',
                noteKey: 'geminiKeyNote',
            },
            // Seul modèle de transcription de l'API (hors temps réel)
            transcriptionModels: [
                { id: 'gemini-3.5-transcribe', name: 'Gemini 3.5 Transcribe', default: true },
            ],
            // 3.8 Flash réfléchit au niveau « medium » par défaut (4 à 9 s par action texte
            // mesurées), « low » répond en 1 à 2 s
            chatModels: [
                {
                    id: 'gemini-3.8-flash',
                    name: 'Gemini 3.8 Flash',
                    default: true,
                    reasoningEffort: 'low',
                },
                { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite' },
            ],
            supportsNoLog: false,
        },
    },
    /** Liste ordonnée des IDs de providers (pour l'affichage UI) */
    order: ['openai', 'mistral', 'custom', 'gemini'],
});
