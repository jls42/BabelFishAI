// Utilitaires API pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Utilisation des constantes globales depuis constants.js
    const API_CONFIG = window.BabelFishAIConstants.API_CONFIG;
    const ERRORS = window.BabelFishAIConstants.ERRORS;

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
     * @param {number} [options.timeout=10000] - Délai d'expiration en ms
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
            timeout = 10000
        } = options;

        if (!apiKey) {
            throw new Error(ERRORS.API_KEY_NOT_FOUND);
        }

        if (!url) {
            throw new Error('URL API manquante');
        }

        // Vérification simple de la connectivité réseau sans appels externes
        const checkNetworkConnection = () => {
            return new Promise((resolve) => {
                // Utiliser uniquement la propriété navigator.onLine, sans ping externe
                if (typeof navigator.onLine === 'boolean' && !navigator.onLine) {
                    resolve({
                        online: false,
                        message: "Aucune connexion Internet détectée. Veuillez vous connecter et réessayer."
                    });
                } else {
                    // Considérer l'appareil comme en ligne si navigator.onLine le dit
                    // sans faire de ping externe supplémentaire
                    resolve({ online: true });
                }
            });
        };

        const attemptFetch = async (isRetry = false) => {
            try {
                // Vérifier la connexion réseau si ce n'est pas une tentative de réessai
                if (!isRetry) {
                    const networkStatus = await checkNetworkConnection();
                    if (!networkStatus.online) {
                        throw new Error(`${errorType}: ${networkStatus.message}`);
                    }
                }

                // Préparer les en-têtes avec l'authentification
                const requestHeaders = {
                    'Authorization': `Bearer ${apiKey}`,
                    ...headers
                };

                // Configuration de la requête
                const requestOptions = {
                    method,
                    headers: requestHeaders,
                    body
                };

                // Créer une promesse qui se résout avec la réponse ou rejette après timeout
                const fetchPromise = fetch(url, requestOptions);
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error(`${errorType}: Timeout - Request exceeded ${timeout}ms`)), timeout);
                });

                // Effectuer l'appel API avec gestion des erreurs réseau et timeout
                const response = await Promise.race([fetchPromise, timeoutPromise]);

                // Gérer les erreurs HTTP
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

                // Traiter la réponse JSON
                const data = await response.json();

                // Appliquer le processeur de réponse personnalisé
                return responseProcessor(data);
            } catch (error) {
                // Erreurs de réseau spécifiques avec messages utilisateur améliorés
                if (error.name === 'TypeError') {
                    if (error.message.includes('Failed to fetch')) {
                        throw new Error(`${errorType}: Impossible de contacter le serveur. Vérifiez votre connexion Internet.`);
                    }
                }

                // Si c'est une erreur réseau ou de timeout et qu'on n'a pas encore retryé
                if ((error.name === 'TypeError' || error.message.includes('Timeout') || error.message.includes('connexion')) &&
                    retryOnFail && !isRetry) {
                    console.warn(`Retry API call to ${url} after error:`, error.message);

                    // Log simple pour informer des réessais
                    console.log("Nouvelle tentative d'appel API après erreur");

                    // Attendre 1500ms avant de réessayer (plus long pour donner une chance à la connexion)
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    return attemptFetch(true);
                }
                throw error;
            }
        };

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

            if (errorMessages.hasOwnProperty(statusCode)) {
                return errorMessages[statusCode];
            } else {
                return defaultMessage;
            }
        }

        try {
            return await attemptFetch();
        } catch (error) {
            // Enrichir le message d'erreur pour le débogage
            console.error(`API call failed (${url}):`, error);
            throw error;
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
    async function transcribeAudio(audioBlob, apiKey, apiUrl = API_CONFIG.DEFAULT_WHISPER_API_URL, modelType = API_CONFIG.WHISPER_MODEL, filename = null, generateUniqueFilename = false) {
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
            responseProcessor: (data) => data.text
        });
    }

    /**
     * Récupère des données depuis le stockage synchronisé de Chrome.
     * Transforme l'API callback-based de Chrome en Promise pour faciliter l'utilisation avec async/await.
     * @param {Array|string|Object} keys - Les clés à récupérer ou un objet avec les valeurs par défaut
     * @param {Object} [defaults={}] - Les valeurs par défaut si keys est un tableau ou une chaîne
     * @returns {Promise<Object>} Les données récupérées avec les valeurs par défaut appliquées
     * @throws {Error} Une erreur CHROME_STORAGE_ERROR si la récupération échoue
     */
    async function getFromStorage(keys) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(keys, (result) => {
                if (chrome.runtime.lastError) {
                    console.error("Chrome storage error:", chrome.runtime.lastError);
                    reject(new Error(ERRORS.CHROME_STORAGE_ERROR));
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Sauvegarde des données dans le stockage synchronisé de Chrome.
     * Transforme l'API callback-based de Chrome en Promise pour faciliter l'utilisation avec async/await.
     * @param {Object} data - Les données à sauvegarder (paires clé-valeur)
     * @returns {Promise<void>} Une promesse résolue lorsque les données sont sauvegardées
     * @throws {Error} Une erreur CHROME_STORAGE_ERROR si la sauvegarde échoue
     */
    async function saveToStorage(data) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set(data, () => {
                if (chrome.runtime.lastError) {
                    console.error("Chrome storage save error:", chrome.runtime.lastError);
                    reject(new Error(ERRORS.CHROME_STORAGE_ERROR));
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Récupère la clé API depuis le stockage Chrome
     * @returns {Promise<string>} La clé API
     */
    async function getApiKey() {
        const result = await getFromStorage(['apiKey']);
        if (!result.apiKey) {
            throw new Error(ERRORS.API_KEY_NOT_FOUND);
        }
        return result.apiKey;
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.api = {
        transcribeAudio,
        getApiKey,
        getFromStorage,
        saveToStorage,
        callApi
    };

})(window.BabelFishAIUtils);