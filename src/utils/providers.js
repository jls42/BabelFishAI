// Registre des providers IA pour l'extension BabelFishAI
// Ce module définit les providers disponibles et leurs configurations

globalThis.BabelFishAIProviders = (function () {
    'use strict'; // skipcq: JS-0118 - 'use strict' inside IIFE is intentional for module isolation

    /**
     * Définition des providers IA disponibles
     * Chaque provider contient ses URLs par défaut et ses modèles supportés
     */
    const PROVIDERS = {
        openai: {
            id: 'openai',
            name: 'OpenAI',
            defaultUrls: {
                transcription: 'https://api.openai.com/v1/audio/transcriptions',
                chat: 'https://api.openai.com/v1/chat/completions'
            },
            transcriptionModels: [
                { id: 'whisper-1', name: 'whisper-1', default: true },
                { id: 'gpt-4o-mini-transcribe', name: 'gpt-4o-mini-transcribe' },
                { id: 'gpt-4o-transcribe', name: 'gpt-4o-transcribe' }
            ],
            chatModels: [
                { id: 'gpt-4o-mini', name: 'gpt-4o-mini', default: true },
                { id: 'gpt-4o', name: 'gpt-4o' },
                { id: 'gpt-4.1', name: 'gpt-4.1' },
                { id: 'gpt-4.1-mini', name: 'gpt-4.1-mini' },
                { id: 'gpt-4.1-nano', name: 'gpt-4.1-nano' }
            ],
            // Supporte l'option NoLog via LiteLLM Proxy
            supportsNoLog: true
        },
        mistral: {
            id: 'mistral',
            name: 'Mistral AI',
            defaultUrls: {
                transcription: 'https://api.mistral.ai/v1/audio/transcriptions',
                chat: 'https://api.mistral.ai/v1/chat/completions'
            },
            transcriptionModels: [
                { id: 'voxtral-mini-latest', name: 'Voxtral Mini', default: true }
            ],
            chatModels: [
                { id: 'mistral-small-latest', name: 'Mistral Small', default: true },
                { id: 'mistral-medium-latest', name: 'Mistral Medium' },
                { id: 'mistral-large-latest', name: 'Mistral Large' },
                { id: 'codestral-latest', name: 'Codestral' }
            ],
            // Mistral n'a pas besoin de l'option NoLog
            supportsNoLog: false
        },
        custom: {
            id: 'custom',
            name: 'Custom/LiteLLM',
            // URLs obligatoires - pas de défaut, l'utilisateur doit les configurer
            defaultUrls: {
                transcription: '',
                chat: ''
            },
            // Modèles par défaut communs, l'utilisateur peut en ajouter
            transcriptionModels: [
                { id: 'whisper-1', name: 'whisper-1', default: true },
                { id: 'whisper', name: 'whisper' }
            ],
            chatModels: [
                { id: 'gpt-4o-mini', name: 'GPT-4o Mini', default: true }
            ],
            // Supporte l'option NoLog (LiteLLM)
            supportsNoLog: true
        }
    };

    /**
     * Liste ordonnée des IDs de providers (pour l'affichage UI)
     */
    const PROVIDER_ORDER = ['openai', 'mistral', 'custom'];

    /**
     * Récupère un provider par son ID
     * @param {string} providerId - ID du provider (ex: 'openai', 'mistral')
     * @returns {Object|null} Configuration du provider ou null si non trouvé
     */
    function getProvider(providerId) {
        // eslint-disable-next-line security/detect-object-injection -- False positive: providerId is a controlled provider ID ('openai'|'mistral'|'custom')
        return PROVIDERS[providerId] || null;
    }

    /**
     * Récupère tous les providers disponibles
     * @returns {Object} Objet contenant tous les providers
     */
    function getAllProviders() {
        return { ...PROVIDERS };
    }

    /**
     * Récupère la liste ordonnée des IDs de providers
     * @returns {string[]} Liste des IDs de providers
     */
    function getProviderOrder() {
        return [...PROVIDER_ORDER];
    }

    /**
     * Récupère les providers activés depuis la configuration utilisateur
     * @param {Object} providersConfig - Configuration des providers depuis le storage
     * @returns {string[]} Liste des IDs de providers activés
     */
    function getEnabledProviders(providersConfig) {
        if (!providersConfig) {
            return ['openai']; // Fallback par défaut
        }

        return PROVIDER_ORDER.filter(providerId => {
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

        const models = serviceType === 'transcription'
            ? provider.transcriptionModels
            : provider.chatModels;

        const defaultModel = models.find(m => m.default);
        if (defaultModel) {
            return defaultModel.id;
        }
        return models[0]?.id ?? null;
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
        enabledProviderIds.forEach(providerId => {
            const provider = getProvider(providerId);
            if (!provider) return;

            const providerModels = serviceType === 'transcription'
                ? provider.transcriptionModels
                : provider.chatModels;

            providerModels.forEach(model => {
                // Format préfixé si plusieurs providers, sinon juste l'ID
                const displayPrefix = enabledProviderIds.length > 1 ? `${provider.name}: ` : '';
                models.push({
                    id: model.id,
                    name: `${displayPrefix}${model.name}`,
                    providerId,
                    fullId: `${providerId}/${model.id}`,
                    isDefault: model.default
                });
            });
        });

        // Ajouter les modèles custom (toujours associés au provider actif ou OpenAI)
        if (customModels && customModels.length > 0) {
            customModels.forEach(customModel => {
                models.push({
                    id: customModel,
                    name: `Custom: ${customModel}`,
                    providerId: 'custom',
                    fullId: `custom/${customModel}`,
                    isDefault: false
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
        if (parts.length === 2 && PROVIDERS[parts[0]]) {
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
        if (modelLower.includes('mistral') ||
            modelLower.includes('voxtral') ||
            modelLower.includes('codestral') ||
            modelLower.includes('ministral') ||
            modelLower.includes('magistral') ||
            modelLower.includes('devstral')) {
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
                chatModels: []
            },
            mistral: {
                apiKey: '',
                enabled: false,
                transcriptionModels: [],
                chatModels: []
            },
            custom: {
                apiKey: '',
                enabled: false,
                transcriptionUrl: '',
                chatUrl: '',
                transcriptionModels: [],
                chatModels: []
            }
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
        // Constantes
        PROVIDERS,
        PROVIDER_ORDER,

        // Getters
        getProvider,
        getAllProviders,
        getProviderOrder,
        getEnabledProviders,
        getTranscriptionUrl,
        getChatUrl,
        getDefaultModel,
        getAllModels,

        // Utilitaires
        parseFullModelId,
        detectProviderFromModel,
        supportsNoLog,
        createDefaultProvidersConfig,
        isValidUrl
    };
})();
