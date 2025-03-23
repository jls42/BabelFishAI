// Utilitaires pour la gestion des API pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Constantes importées depuis l'espace global
    const ERRORS = window.BabelFishAIConstants.ERRORS;

    /**
     * Récupère la clé API ou lève une exception si elle n'est pas disponible
     * @returns {Promise<string>} - La clé API
     * @throws {Error} - Si la clé API n'est pas trouvée
     */
    async function getOrFetchApiKey() {
        // S'assurer que l'espace de noms BabelFishAI existe
        window.BabelFishAI = window.BabelFishAI || {};
        
        // Utiliser la clé en mémoire si disponible
        if (window.BabelFishAI.apiKey) {
            return window.BabelFishAI.apiKey;
        }

        try {
            // Récupérer la clé depuis le stockage
            const result = await chrome.storage.sync.get(['apiKey']);
            const apiKey = result.apiKey;

            if (!apiKey) {
                throw new Error(ERRORS.API_KEY_NOT_FOUND);
            }

            // Stocker la clé en mémoire pour les futures utilisations
            window.BabelFishAI.apiKey = apiKey;
            return apiKey;
        } catch (error) {
            console.error("Erreur lors de la récupération de la clé API:", error);
            throw new Error(ERRORS.API_KEY_NOT_FOUND);
        }
    }

    /**
     * Récupère la clé API sans lever d'exception
     * @returns {Promise<string|null>} - La clé API ou null si non disponible
     */
    async function getApiKey() {
        try {
            // S'assurer que l'espace de noms BabelFishAI existe
            window.BabelFishAI = window.BabelFishAI || {};
            
            // Utiliser la clé en mémoire si disponible
            if (window.BabelFishAI.apiKey) {
                return window.BabelFishAI.apiKey;
            }
            
            // Sinon, essayer de la récupérer depuis le stockage
            const result = await chrome.storage.sync.get(['apiKey']);
            const apiKey = result.apiKey;
            
            if (apiKey) {
                // Stocker la clé en mémoire pour les futures utilisations
                window.BabelFishAI.apiKey = apiKey;
                return apiKey;
            }
            
            // Afficher un message d'erreur convivial si la clé n'est pas trouvée
            console.warn("Clé API non configurée. Veuillez la configurer dans les options de l'extension.");
            return null;
        } catch (error) {
            console.error("Erreur lors de la récupération de la clé API:", error);
            return null;
        }
    }

    /**
     * Récupère des données depuis le stockage Chrome
     * @param {Object} defaults - Valeurs par défaut à utiliser si les clés ne sont pas trouvées
     * @returns {Promise<Object>} - Les données récupérées
     */
    async function getFromStorage(defaults = {}) {
        return new Promise((resolve, reject) => {
            try {
                chrome.storage.sync.get(defaults, (items) => {
                    if (chrome.runtime.lastError) {
                        console.error("Erreur lors de la récupération depuis le stockage:", chrome.runtime.lastError);
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
        } = options;

        if (!apiKey) {
            throw new Error(ERRORS.API_KEY_NOT_FOUND);
        }

        if (!url) {
            throw new Error('URL API manquante');
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
                        message: "Aucune connexion Internet détectée. Veuillez vous connecter et réessayer."
                    });
                } else {
                    // Considérer l'appareil comme en ligne si navigator.onLine le dit
                    resolve({ online: true });
                }
            });
        }

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
         * Prépare les options de la requête fetch
         * @returns {Object} - Options de la requête configurées
         */
        function prepareRequestOptions() {
            const requestHeaders = {
                'Authorization': `Bearer ${apiKey}`,
                ...headers
            };

            return {
                method,
                headers: requestHeaders,
                body
            };
        }

        /**
         * Gère les erreurs HTTP de la réponse
         * @param {Response} response - La réponse de fetch
         * @returns {Promise<void>}
         */
        async function handleHttpErrors(response) {
            if (!response.ok) {
                let errorMessage;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error?.message || errorType;
                    console.error('API Error:', errorData);
                } catch (parseError) {
                    errorMessage = `${errorType}: ${response.status} ${response.statusText}`;
                    console.error('API Error (could not parse response):', response.status, response.statusText);
                }

                // Message d'erreur amélioré avec suggestion de résolution
                const userFriendlyMessage = getImprovedErrorMessage(response.status, errorMessage);
                throw new Error(userFriendlyMessage);
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
                504: `${errorType}: Délai d'attente serveur dépassé. Réessayez plus tard.`
            };

            if (Object.prototype.hasOwnProperty.call(errorMessages, statusCode)) {
                return errorMessages[statusCode];
            } else {
                return defaultMessage;
            }
        }

        /**
         * Effectue une pause avec setTimeout sous forme de promesse
         * @param {number} ms - Durée de la pause en millisecondes
         * @returns {Promise<void>}
         */
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        /**
         * Vérifie si l'erreur est liée au réseau
         * @param {Error} error - L'erreur à vérifier
         * @returns {boolean} True si c'est une erreur réseau
         */
        function isNetworkError(error) {
            return error.name === 'TypeError' || 
                   error.message.includes('Timeout') || 
                   error.message.includes('connexion');
        }

        /**
         * Gère une erreur de type "Failed to fetch"
         * @returns {never} Lance toujours une erreur
         */
        function handleFailedToFetch() {
            throw new Error(`${errorType}: Impossible de contacter le serveur. Vérifiez votre connexion Internet.`);
        }

        /**
         * Tente d'effectuer l'appel API
         * @param {boolean} isRetry - Indique s'il s'agit d'une réessai
         * @returns {Promise<any>} Résultat de l'appel API
         */
        async function performApiCall(isRetry) {
            await checkConnectionBeforeFetch(isRetry);
            const requestOptions = prepareRequestOptions();
            const response = await fetch(url, requestOptions);
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
            // Gérer les erreurs "Failed to fetch" spécifiquement
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
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
     * @returns {Promise<string>} Le texte transcrit
     */
    async function transcribeAudio(audioBlob, apiKey, apiUrl = window.BabelFishAIConstants.API_CONFIG.DEFAULT_WHISPER_API_URL, modelType = window.BabelFishAIConstants.API_CONFIG.WHISPER_MODEL, filename = null, generateUniqueFilename = false) {
        // Déterminer le nom de fichier final
        let finalFilename;
        if (generateUniqueFilename) {
            // Générer un nom de fichier avec timestamp et élément aléatoire
            const timestamp = Date.now();
            const randomPart = Math.random().toString(36).substring(2, 10); // Génère une chaîne aléatoire de 8 caractères
            finalFilename = `audio-${timestamp}-${randomPart}.webm`;
        } else {
            finalFilename = filename || 'audio.webm';
        }

        // Préparer le FormData pour l'envoi du fichier audio
        const formData = new FormData();
        formData.append('file', audioBlob, finalFilename);
        formData.append('model', modelType);

        // Utiliser la fonction callApi pour effectuer la requête
        return callApi({
            url: apiUrl,
            apiKey,
            body: formData,
            errorType: ERRORS.TRANSCRIPTION_ERROR,
            responseProcessor: (data) => {
                // Nettoyer le texte transcrit pour éliminer les retours à la ligne superflus au début
                let text = data.text || '';
                text = text.trim();
                return text;
            }
        });
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.api = {
        getOrFetchApiKey,
        getApiKey,
        getFromStorage,
        transcribeAudio,
        callApi
    };

})(window.BabelFishAIUtils);
