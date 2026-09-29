// Utilitaires pour la gestion des API pour l'extension BabelFishAI
/* global chrome */
globalThis.BabelFishAIUtils = globalThis.BabelFishAIUtils || {};

(function (exports) {
    'use strict'; // skipcq: JS-0118 - 'use strict' inside IIFE is intentional for module isolation

    // Constantes importées depuis l'espace global
    const ERRORS = globalThis.BabelFishAIConstants.ERRORS;
    const API_CONFIG = globalThis.BabelFishAIConstants.API_CONFIG;

    /**
     * Détecte si le navigateur est Firefox
     * @returns {boolean} true si Firefox
     */
    function isFirefox() {
        return typeof navigator !== 'undefined' && navigator.userAgent.includes('Firefox');
    }

    /**
     * Convertit un FormData en tableau de champs sérialisables pour le proxy
     * @param {FormData} formData - Le FormData à convertir
     * @returns {Promise<Array>} Tableau de champs sérialisables
     */
    async function formDataToSerializable(formData) {
        const fields = [];
        const entries = [];

        // Collecter les entrées avec forEach (plus compatible que for...of sur entries())
        formData.forEach((value, name) => {
            entries.push({ name, value });
        });

        // Traiter chaque entrée
        for (const entry of entries) {
            const { name, value } = entry;
            if (value instanceof Blob) {
                // Convertir le Blob en Base64 (plus efficace que Array.from pour la sérialisation)
                const base64 = await globalThis.BabelFishAIProviderAdapters.blobToBase64(value);
                fields.push({
                    name,
                    isFile: true,
                    data: base64,
                    type: value.type,
                    filename: value.name || 'file',
                });
            } else {
                fields.push({
                    name,
                    isFile: false,
                    value: String(value),
                });
            }
        }

        return fields;
    }

    /**
     * Effectue une requête fetch via le background script (proxy pour Firefox)
     * Contourne les restrictions CSP des pages web
     * @param {string} url - URL de la requête
     * @param {Object} options - Options fetch (method, headers, body)
     * @param {string} providerId - Provider de la requête
     * @param {string} service - Service appelé ('transcription' ou 'chat')
     * @returns {Promise<Object>} Réponse simulée compatible avec le flux existant
     */
    async function fetchViaProxy(url, options, providerId, service) {
        // Le background reconstruit l'authentification depuis le stockage : aucun entête
        // d'authentification ne passe par le message
        const request = {
            url,
            providerId,
            service,
            options: {
                method: options.method,
                headers: globalThis.BabelFishAIProviderAdapters.requestHeaders(options.headers, {}),
            },
        };

        // Gérer le body selon son type
        // Utiliser duck typing car instanceof FormData peut échouer entre contextes
        if (
            options.body &&
            typeof options.body.entries === 'function' &&
            typeof options.body.append === 'function'
        ) {
            request.formDataFields = await formDataToSerializable(options.body);
        } else if (options.body) {
            request.options.body = options.body;
        }

        // Envoyer la requête au background script
        const result = await chrome.runtime.sendMessage({
            action: 'proxyFetch',
            request,
        });

        // F3 : valider l'enveloppe avant tout déréférencement. Si le background
        // est en train de redémarrer ou ne répond pas correctement, sendMessage
        // peut fulfill avec undefined ou un payload malformé.
        if (!result || typeof result.success !== 'boolean') {
            const error = new Error(
                'Réponse invalide du background script (proxyFetch) : impossible de contacter le serveur.',
            );
            error.name = 'BackgroundProxyError';
            throw error;
        }

        if (!result.success) {
            const error = new Error(result.error);
            error.name = result.errorName || 'Error';
            throw error;
        }

        // F10 : créer un objet réponse plus complet pour matcher l'interface
        // Fetch Response. Le rawText brut est transporté depuis le background
        // et le parsing JSON est fait paresseusement à l'appel de .json(),
        // exactement comme un vrai Response — donc un body non-JSON ou vide
        // fait rejeter avec SyntaxError (pas de bug silencieux possible).
        const rawText = typeof result.rawText === 'string' ? result.rawText : '';
        /**
         * Construit un Blob à partir du body brut (pour blob()/arrayBuffer()).
         * @returns {Blob}
         */
        const buildBlob = () =>
            new Blob([rawText], { type: result.contentType || 'application/octet-stream' });
        const fakeResponse = {
            ok: result.status >= 200 && result.status < 300,
            status: result.status,
            statusText: result.statusText,
            url,
            redirected: false,
            headers: new Headers(result.headers || {}),
            json: () => {
                try {
                    return Promise.resolve(JSON.parse(rawText));
                } catch (parseError) {
                    return Promise.reject(parseError);
                }
            },
            text: () => Promise.resolve(rawText),
            blob: () => Promise.resolve(buildBlob()),
            arrayBuffer: () => buildBlob().arrayBuffer(),
        };
        fakeResponse.clone = () => ({ ...fakeResponse });
        return fakeResponse;
    }

    /**
     * Fonction interne pour récupérer la clé API depuis le stockage et la mettre en cache.
     * Ne renvoie rien en mode multi-provider : la clé legacy n'y est qu'une copie.
     * @returns {Promise<string|null>} La clé API ou null si non trouvée.
     * @private
     */
    async function _fetchAndCacheApiKeyFromStorage() {
        // S'assurer que l'espace de noms BabelFishAI existe avant l'écriture en cache
        // (cold-start sur content script injecté dynamiquement : voir background.js:121)
        globalThis.BabelFishAI = globalThis.BabelFishAI || {};
        try {
            const result = await chrome.storage.sync.get(['apiKey', 'providers']);
            // Avec `providers`, la clé legacy n'est qu'une copie gardée pour les anciennes
            // versions : la reprendre enverrait la clé OpenAI alors qu'OpenAI est désactivé
            if (result.providers) {
                return null;
            }
            const apiKey = result.apiKey;

            if (apiKey) {
                // Stocker la clé en mémoire pour les futures utilisations
                globalThis.BabelFishAI.apiKey = apiKey;
                return apiKey;
            }
            return null; // Clé non trouvée dans le stockage
        } catch (error) {
            console.error(
                'Erreur lors de la récupération de la clé API depuis le stockage:',
                error,
            );
            // En cas d'erreur de stockage, on considère que la clé n'est pas disponible
            return null;
        }
    }

    /**
     * Récupère la clé API (depuis la mémoire ou le stockage) ou lève une exception si elle n'est pas disponible.
     * Utilise le système multi-provider pour trouver une clé API valide.
     * @param {string} [serviceType='transcription'] - Type de service pour déterminer le provider
     * @returns {Promise<string>} - La clé API.
     * @throws {Error} - Si la clé API n'est pas trouvée.
     */
    async function getOrFetchApiKey(serviceType = 'transcription') {
        // S'assurer que l'espace de noms BabelFishAI existe
        globalThis.BabelFishAI = globalThis.BabelFishAI || {};

        // Utiliser resolveApiConfig pour obtenir la clé du provider actif
        try {
            const config = await resolveApiConfig(serviceType);
            if (config.apiKey) {
                // Mettre en cache pour compatibilité
                globalThis.BabelFishAI.apiKey = config.apiKey;
                return config.apiKey;
            }
        } catch (error) {
            console.warn('Erreur lors de la résolution de la config API:', error);
        }

        // Fallback sur l'ancienne méthode
        const apiKeyFromStorage = await _fetchAndCacheApiKeyFromStorage();

        if (!apiKeyFromStorage) {
            console.error('Erreur lors de la récupération de la clé API: Clé non trouvée.');
            throw new Error(ERRORS.API_CONFIG_MISSING);
        }

        return apiKeyFromStorage;
    }

    /**
     * Récupère la clé API (depuis la mémoire ou le stockage) sans lever d'exception.
     * Utilise le système multi-provider pour trouver une clé API valide.
     * @param {string} [serviceType='transcription'] - Type de service pour déterminer le provider
     * @returns {Promise<string|null>} - La clé API ou null si non disponible.
     */
    async function getApiKey(serviceType = 'transcription') {
        // S'assurer que l'espace de noms BabelFishAI existe
        globalThis.BabelFishAI = globalThis.BabelFishAI || {};

        // Utiliser resolveApiConfig pour obtenir la clé du provider actif
        try {
            const config = await resolveApiConfig(serviceType);
            if (config.apiKey) {
                // Mettre en cache pour compatibilité
                globalThis.BabelFishAI.apiKey = config.apiKey;
                return config.apiKey;
            }
        } catch (error) {
            console.warn('Erreur lors de la résolution de la config API:', error);
        }

        // Fallback sur l'ancienne méthode si resolveApiConfig échoue
        const apiKeyFromStorage = await _fetchAndCacheApiKeyFromStorage();

        if (!apiKeyFromStorage) {
            console.warn(
                "Clé API non configurée. Veuillez la configurer dans les options de l'extension.",
            );
        }

        return apiKeyFromStorage;
    }

    /**
     * Récupère des données depuis le stockage Chrome
     * @param {Object} defaults - Valeurs par défaut à utiliser si les clés ne sont pas trouvées
     * @returns {Promise<Object>} - Les données récupérées
     */
    function getFromStorage(defaults = {}) {
        return new Promise((resolve, reject) => {
            try {
                chrome.storage.sync.get(defaults, (items) => {
                    if (chrome.runtime.lastError) {
                        console.error(
                            'Erreur lors de la récupération depuis le stockage:',
                            chrome.runtime.lastError,
                        );
                        reject(new Error(ERRORS.CHROME_STORAGE_ERROR));
                    } else {
                        resolve(items);
                    }
                });
            } catch (error) {
                console.error("Exception lors de l'accès au stockage:", error);
                reject(new Error(ERRORS.CHROME_STORAGE_ERROR));
            }
        });
    }

    /**
     * Résout l'URL pour un type de service
     * @param {string} serviceType - Type de service ('transcription' ou 'chat')
     * @param {Object} providerConfig - Configuration du provider
     * @param {Object} providerDef - Définition du provider
     * @param {string} providerId - ID du provider
     * @returns {string} URL résolue
     */
    function resolveUrl(serviceType, providerConfig, providerDef, providerId) {
        // Les URLs custom ne sont utilisées que pour le provider 'custom'
        // OpenAI et Mistral utilisent toujours leurs URLs par défaut
        const useCustomUrl = providerId === 'custom';

        if (serviceType === 'transcription') {
            return (
                (useCustomUrl && providerConfig?.transcriptionUrl) ||
                providerDef?.defaultUrls.transcription ||
                API_CONFIG.DEFAULT_WHISPER_API_URL
            );
        }
        return (
            (useCustomUrl && providerConfig?.chatUrl) ||
            providerDef?.defaultUrls.chat ||
            API_CONFIG.DEFAULT_GPT_API_URL
        );
    }

    /**
     * Résout le modèle pour un type de service
     * @param {string} serviceType - Type de service ('transcription' ou 'chat')
     * @param {Object} providerConfig - Configuration du provider
     * @param {Object} providerDef - Définition du provider
     * @param {Object} Providers - Registre des providers
     * @param {string} providerId - ID du provider
     * @param {Object} data - Données de configuration legacy
     * @returns {string} Modèle résolu
     */
    function resolveModel(serviceType, providerConfig, providerDef, Providers, providerId, data) {
        const isTranscription = serviceType === 'transcription';
        const selectedModel = isTranscription
            ? providerConfig?.selectedTranscriptionModel
            : providerConfig?.selectedChatModel;

        if (providerDef && Providers) {
            // Un modèle sauvegardé qui n'est plus proposé (retiré de providers.js et absent
            // des modèles personnalisés) est ignoré au profit du modèle par défaut du provider
            const customModels = isTranscription
                ? providerConfig?.transcriptionModels
                : providerConfig?.chatModels;
            if (Providers.isModelAvailable(providerId, serviceType, selectedModel, customModels)) {
                return selectedModel;
            }
            return Providers.getDefaultModel(providerId, serviceType);
        }

        if (selectedModel) return selectedModel;

        return isTranscription
            ? data.audioModelType || API_CONFIG.DEFAULT_TRANSCRIPTION_MODEL
            : data.modelType || API_CONFIG.GPT_MODEL;
    }

    /**
     * Résout le provider actif avec fallback si nécessaire (provider-store.js)
     * @param {string} serviceType - Type de service ('transcription' ou 'chat')
     * @param {Object} data - Données du storage
     * @returns {{providerId: string, providerConfig: Object|undefined}} Provider résolu
     */
    function resolveActiveProvider(serviceType, data) {
        const store = globalThis.BabelFishAIProviderStore;
        const resolved = store.resolveProvider(data, serviceType);
        const selected = store.readSelection(data, serviceType);
        if (resolved.providerConfig && resolved.providerId !== selected) {
            // skipcq: JS-0002 - debug log for provider fallback diagnostics
            // eslint-disable-next-line no-console -- Debug log for provider fallback diagnostics
            console.log(
                `[resolveApiConfig] Provider ${selected} n'a pas de configuration valide, fallback vers ${resolved.providerId}`,
            );
        }
        return resolved;
    }

    /**
     * Résout le flag disableLogging selon le provider
     * @param {Object} providerDef - Définition du provider
     * @param {boolean} userPreference - Préférence utilisateur
     * @returns {boolean} True si le logging doit être désactivé
     */
    function resolveDisableLogging(providerDef, userPreference) {
        const supportsNoLog = providerDef?.supportsNoLog ?? false;
        return supportsNoLog && userPreference;
    }

    /**
     * Données lues pour résoudre la configuration API, avec leurs valeurs par défaut : celles
     * qui décident du provider et de la clé (provider-store.js), plus les modèles et no-log
     * @returns {Object}
     */
    function configDefaults() {
        return {
            ...globalThis.BabelFishAIProviderStore.resolutionDefaults(),
            audioModelType: API_CONFIG.DEFAULT_TRANSCRIPTION_MODEL,
            modelType: API_CONFIG.GPT_MODEL,
            disableLogging: false,
        };
    }

    /**
     * Résout la configuration API pour un type de service donné
     * Supporte le multi-provider avec fallback sur la configuration legacy
     * @param {string} serviceType - Type de service ('transcription' ou 'chat')
     * @returns {Promise<Object>} Configuration API résolue
     */
    async function resolveApiConfig(serviceType) {
        const data = await getFromStorage(configDefaults());

        // Résoudre le provider actif
        const resolved = resolveActiveProvider(serviceType, data);
        const { providerId, providerConfig } = resolved;

        // Récupérer les définitions du provider depuis le registre
        const Providers = globalThis.BabelFishAIProviders;
        const providerDef = Providers?.getProvider(providerId) ?? null;

        // Résoudre URL, clé API et modèle
        const url = resolveUrl(serviceType, providerConfig, providerDef, providerId);
        // La clé legacy ne sert qu'en mode legacy (provider-store.js, resolveKey)
        const apiKey = globalThis.BabelFishAIProviderStore.resolveKey(data, resolved);
        const model = resolveModel(
            serviceType,
            providerConfig,
            providerDef,
            Providers,
            providerId,
            data,
        );
        const disableLogging = resolveDisableLogging(providerDef, data.disableLogging);

        return { apiKey, url, model, providerId, disableLogging };
    }

    /**
     * Récupère la clé API pour un provider spécifique ou le provider actif
     * @param {string} [providerId] - ID du provider (optionnel, utilise le provider par défaut si non spécifié)
     * @param {string} [serviceType='transcription'] - Type de service pour déterminer le provider par défaut
     * @returns {Promise<string|null>} La clé API ou null si non trouvée
     */
    async function getApiKeyForProvider(providerId, serviceType = 'transcription') {
        const config = await resolveApiConfig(serviceType);

        // Si un provider spécifique est demandé
        if (providerId && providerId !== config.providerId) {
            const data = await getFromStorage({ providers: null });
            // eslint-disable-next-line security/detect-object-injection -- False positive: providerId is a controlled provider ID
            return data.providers?.[providerId]?.apiKey || null;
        }

        return config.apiKey || null;
    }

    /**
     * Vérifie la connectivité réseau
     * @returns {Promise<{online: boolean, message?: string}>} État de la connectivité
     */
    function checkNetworkConnection() {
        return new Promise((resolve) => {
            // Utiliser uniquement la propriété navigator.onLine, sans ping externe
            if (typeof navigator.onLine === 'boolean' && !navigator.onLine) {
                resolve({
                    online: false,
                    message:
                        'Aucune connexion Internet détectée. Veuillez vous connecter et réessayer.',
                });
            } else {
                // Considérer l'appareil comme en ligne si navigator.onLine le dit
                resolve({ online: true });
            }
        });
    }

    /**
     * Effectue une pause avec setTimeout sous forme de promesse
     * @param {number} ms - Durée de la pause en millisecondes
     * @returns {Promise<void>}
     */
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Vérifie si l'erreur est liée au réseau.
     * Couvre les messages FR ("connexion") et EN ("connection") car
     * chrome.runtime.sendMessage rejette en anglais sur Firefox quand le
     * background n'est pas joignable ("Could not establish connection...").
     * @param {Error} error - L'erreur à vérifier
     * @returns {boolean} True si c'est une erreur réseau
     */
    function isNetworkError(error) {
        const msg = error.message || '';
        return (
            error.name === 'TypeError' ||
            error.name === 'BackgroundProxyError' ||
            msg.includes('Timeout') ||
            msg.includes('connexion') ||
            msg.includes('connection')
        );
    }

    /**
     * Invariant de sécurité (défense en profondeur contre une fuite de clé, cf. SECURITY.md
     * « API key leakage »), vérifié sur une lecture fraîche du stockage : le provider et la
     * clé sont ceux que ce stockage résout pour le service, et l'URL vise une origine
     * configurée pour ce provider (URL du registre, ou URL réglée par l'utilisateur pour Custom)
     * @param {Object} request - url, apiKey, providerId, service et errorType de la requête
     * @returns {Promise<void>}
     * @throws {Error} Si la requête enverrait une clé ailleurs que chez son provider
     */
    async function assertRequestAllowed({ url, apiKey, providerId, service, errorType }) {
        if (!providerId || !service) {
            throw new Error(`${errorType}: provider ou service non indiqué pour la requête.`);
        }
        const data = await getFromStorage(configDefaults());
        const store = globalThis.BabelFishAIProviderStore;
        const resolved = store.resolveProvider(data, service);
        if (resolved.providerId !== providerId || store.resolveKey(data, resolved) !== apiKey) {
            throw new Error(`${errorType}: la clé API ne correspond pas au provider configuré.`);
        }
        if (!store.isUrlAllowedForProvider(data, providerId, url)) {
            throw new Error(
                `${errorType}: URL non autorisée. Vérifiez la configuration du provider dans les options.`,
            );
        }
    }

    /**
     * Effectue un appel API générique avec gestion d'erreur standardisée.
     * Cette fonction centralise tous les appels API et uniformise la gestion des erreurs.
     * @param {Object} options - Options pour l'appel API
     * @param {string} options.url - URL de l'API à appeler
     * @param {string} options.apiKey - Clé API pour l'authentification
     * @param {string} [options.method='POST'] - Méthode HTTP à utiliser (GET, POST, PUT, DELETE, etc.)
     * @param {Object|FormData} options.body - Corps de la requête (JSON ou FormData)
     * @param {Object} [options.headers={}] - En-têtes HTTP additionnels à inclure dans la requête
     * @param {string} [options.errorType=ERRORS.API_ERROR] - Type d'erreur à utiliser en cas d'échec
     * @param {Function} [options.responseProcessor] - Fonction pour traiter la réponse avant de la renvoyer
     * @param {boolean} [options.retryOnFail=false] - Si true, réessaiera une fois en cas d'échec
     * @param {string} options.providerId - Provider dont la clé est envoyée (invariant de sécurité)
     * @param {string} options.service - Service appelé ('transcription' ou 'chat')
     * @returns {Promise<any>} Résultat traité de l'appel API
     * @throws {Error} Une erreur avec le message approprié en cas d'échec de l'appel
     */
    async function callApi(options) {
        const {
            url,
            apiKey,
            method = 'POST',
            body,
            headers = {},
            errorType = ERRORS.API_ERROR,
            responseProcessor = (data) => data,
            retryOnFail = false,
            providerId,
            service,
        } = options;

        if (!apiKey) {
            throw new Error(ERRORS.API_CONFIG_MISSING);
        }

        if (!url) {
            throw new Error('URL API manquante');
        }

        // Invariant de sécurité : la clé ne part que vers un hôte configuré pour son provider
        await assertRequestAllowed({ url, apiKey, providerId, service, errorType });

        /**
         * Vérifie la connexion réseau avant de faire l'appel API
         * @param {boolean} isRetry - Indique s'il s'agit d'une tentative de réessai
         * @returns {Promise<void>}
         */
        async function checkConnectionBeforeFetch(isRetry) {
            if (!isRetry) {
                const networkStatus = await checkNetworkConnection();
                if (!networkStatus.online) {
                    throw new Error(`${errorType}: ${networkStatus.message}`);
                }
            }
        }

        /**
         * Service appelé, tel que le décrit le registre des providers
         * @returns {Object} Sa définition, ou les valeurs par défaut s'il n'en a pas
         */
        function serviceDefinition() {
            const Providers = globalThis.BabelFishAIProviders;
            return Providers.getService(providerId, service) ?? Providers.DEFAULT_SERVICE;
        }

        /**
         * Prépare les options de la requête fetch
         * @returns {Object} - Options de la requête configurées
         */
        function prepareRequestOptions() {
            // Entête d'authentification du service, décrit par le registre des providers : il
            // passe devant les entêtes de l'appelant, d'où tout autre entête d'authentification
            // est retiré, et une clé hors d'Authorization ne suit pas de redirection
            const adapters = globalThis.BabelFishAIProviderAdapters;
            const { auth } = serviceDefinition();
            return {
                method,
                headers: adapters.requestHeaders(headers, adapters.authHeaders(auth, apiKey)),
                body,
                redirect: adapters.redirectPolicy(auth),
            };
        }

        /**
         * Gère les erreurs HTTP de la réponse
         * @param {Response} response - La réponse de fetch
         * @returns {Promise<void>}
         */
        async function handleHttpErrors(response) {
            if (!response.ok) {
                // Message lu selon le format d'erreurs que le registre déclare pour ce service
                const adapters = globalThis.BabelFishAIProviderAdapters;
                const errorFormat = serviceDefinition().errors;
                const readErrorMessage = adapters.getErrorReader(errorFormat);
                let errorMessage; // skipcq: JS-0119 - Initialisation dépend du bloc try/catch.
                // Clé refusée par un provider qui ne répond pas 401 (Gemini : 400)
                let keyRejected = false;
                try {
                    const errorData = await response.json();
                    errorMessage = readErrorMessage(errorData) || errorType;
                    keyRejected = adapters.rejectsKey(errorFormat, errorData);
                    // Message de l'API en texte : l'objet seul s'affiche replié dans la console
                    console.error(
                        `API Error (HTTP ${response.status}): ${errorMessage}`,
                        errorData,
                    );
                } catch (jsonParseError) {
                    // JSON parsing failed - log the parse error and use status code
                    console.error('API Error (JSON parse failed):', jsonParseError.message);
                    errorMessage = `${errorType}: ${response.status} ${response.statusText}`;
                    console.error(
                        'API Error (could not parse response):',
                        response.status,
                        response.statusText,
                    );
                }

                // Message d'erreur amélioré avec suggestion de résolution (celui du 401 pour une
                // clé refusée, quel que soit le code)
                const userFriendlyMessage = getImprovedErrorMessage(
                    keyRejected ? 401 : response.status,
                    errorMessage,
                );
                const httpError = new Error(userFriendlyMessage);
                // Code HTTP conservé pour que l'appelant puisse adapter sa requête (ex. 400)
                httpError.status = response.status;
                throw httpError;
            }
        }

        /**
         * Améliore les messages d'erreur pour qu'ils soient plus compréhensibles par l'utilisateur final
         * @param {number} statusCode - Code de statut HTTP
         * @param {string} originalMessage - Message d'erreur original
         * @returns {string} Message d'erreur amélioré avec suggestion
         */
        function getImprovedErrorMessage(statusCode, originalMessage) {
            const defaultMessage = `${errorType}: ${originalMessage}`;

            // Messages personnalisés selon le code d'erreur
            const errorMessages = {
                400: `${errorType}: Requête invalide. Vérifiez vos paramètres et réessayez.`,
                401: `${errorType}: Clé API non valide ou expirée. Vérifiez votre clé dans les paramètres.`,
                403: `${errorType}: Accès refusé. Votre clé API ne dispose pas des autorisations nécessaires.`,
                404: `${errorType}: API ou ressource non trouvée. Vérifiez l'URL dans les paramètres avancés.`,
                429: `${errorType}: Limite de requêtes atteinte. Attendez quelques instants avant de réessayer.`,
                500: `${errorType}: Erreur serveur. Le service est peut-être temporairement indisponible.`,
                502: `${errorType}: Service indisponible. Réessayez plus tard.`,
                503: `${errorType}: Service surchargé. Réessayez plus tard.`,
                504: `${errorType}: Délai d'attente serveur dépassé. Réessayez plus tard.`,
            };

            if (Object.hasOwn(errorMessages, statusCode)) {
                return errorMessages[statusCode];
            } else {
                return defaultMessage;
            }
        }

        /**
         * Gère une erreur de type "Failed to fetch"
         * @returns {never} Lance toujours une erreur
         */
        function handleFailedToFetch() {
            throw new Error(
                `${errorType}: Impossible de contacter le serveur. Vérifiez votre connexion Internet.`,
            );
        }

        /**
         * Tente d'effectuer l'appel API
         * @param {boolean} isRetry - Indique s'il s'agit d'une réessai
         * @returns {Promise<any>} Résultat de l'appel API
         */
        async function performApiCall(isRetry) {
            await checkConnectionBeforeFetch(isRetry);
            const requestOptions = prepareRequestOptions();
            // Sur Firefox, utiliser le proxy via background script pour contourner les CSP
            const response = isFirefox()
                ? await fetchViaProxy(url, requestOptions, providerId, service)
                : await fetch(url, requestOptions);
            await handleHttpErrors(response);
            const data = await response.json();
            return responseProcessor(data);
        }

        /**
         * Gère les erreurs réseau et tente éventuellement un nouvel essai
         * @param {Error} error - L'erreur survenue
         * @param {boolean} isRetry - Indique s'il s'agit déjà d'une tentative de réessai
         * @returns {Promise<any>} Résultat après tentative de récupération
         */
        async function handleApiErrors(error, isRetry) {
            // Couvrir les variantes d'erreurs de connexion (F4) :
            // - Chrome direct fetch : TypeError "Failed to fetch"
            // - Firefox via proxy : Error "Could not establish connection..."
            //   ou BackgroundProxyError (envelope manquante côté background)
            const msg = error.message || '';
            const isConnectionFailure =
                (error.name === 'TypeError' && msg.includes('Failed to fetch')) ||
                msg.includes('Could not establish connection') ||
                error.name === 'BackgroundProxyError';
            if (isConnectionFailure) {
                handleFailedToFetch();
            }

            // Si c'est une erreur réseau et qu'on peut réessayer
            if (isNetworkError(error) && retryOnFail && !isRetry) {
                await delay(1500);
                return performApiCall(true);
            }

            // Si on ne peut pas récupérer, relancer l'erreur
            throw error;
        }

        // Tenter l'appel API et gérer les erreurs
        try {
            return await performApiCall(false);
        } catch (error) {
            try {
                return await handleApiErrors(error, false);
            } catch (finalError) {
                console.error(`API call failed (${url}):`, finalError);
                throw finalError;
            }
        }
    }

    /**
     * Transcrit l'audio en texte via l'API Whisper
     * @param {Blob} audioBlob - Le blob audio à transcrire
     * @param {string} apiKey - La clé API OpenAI
     * @param {string} apiUrl - L'URL de l'API Whisper
     * @param {string} [modelType] - Le modèle Whisper à utiliser
     * @param {string} [filename] - Nom du fichier à envoyer (optionnel)
     * @param {boolean} [generateUniqueFilename=false] - Générer un nom de fichier unique avec timestamp et partie aléatoire
     * @param {string} providerId - Obligatoire : provider de la clé (format et authentification
     *   du registre, invariant de sécurité). Sans lui, callApi refuse la requête ; il vient en
     *   dernier et vaut undefined par défaut pour garder l'ordre des paramètres existants
     * @returns {Promise<string>} Le texte transcrit
     */
    async function transcribeAudio(
        audioBlob,
        apiKey,
        apiUrl = globalThis.BabelFishAIConstants.API_CONFIG.DEFAULT_WHISPER_API_URL,
        modelType = globalThis.BabelFishAIConstants.API_CONFIG.DEFAULT_TRANSCRIPTION_MODEL,
        filename = null,
        generateUniqueFilename = false,
        providerId = undefined,
    ) {
        // Déterminer le nom de fichier final
        const finalFilename = generateUniqueFilename
            ? // Générer un nom de fichier avec timestamp et élément aléatoire
              `audio-${Date.now()}-${Math.random().toString(36).substring(2, 10)}.webm` // NOSONAR javascript:S2245 - Math.random() pour unicité pratique.
            : filename || 'audio.webm';

        // Préparer le corps de la requête selon le format du provider (multipart OpenAI par défaut)
        const format =
            globalThis.BabelFishAIProviders.getService(providerId, 'transcription')?.format ??
            'openai-multipart';
        const adapter = globalThis.BabelFishAIProviderAdapters.getAdapter(format);
        // Un FormData pour le multipart ; un adaptateur qui encode l'audio (base64 dans du JSON)
        // prépare son corps de façon asynchrone
        const body = await adapter.buildBody({
            audioBlob,
            filename: finalFilename,
            model: modelType,
        });

        // Utiliser la fonction callApi pour effectuer la requête
        return callApi({
            url: apiUrl,
            apiKey,
            // Entêtes propres au format, comme le Content-Type d'un corps JSON (aucun pour le
            // multipart, dont le navigateur écrit lui-même le Content-Type)
            headers: adapter.headers ?? {},
            body,
            errorType: ERRORS.TRANSCRIPTION_ERROR,
            responseProcessor: adapter.extractText,
            providerId,
            service: 'transcription',
        });
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.api = {
        getOrFetchApiKey,
        getApiKey,
        getApiKeyForProvider,
        getFromStorage,
        resolveApiConfig,
        transcribeAudio,
        callApi,
    };
})(globalThis.BabelFishAIUtils);
