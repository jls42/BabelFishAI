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

        const attemptFetch = async (isRetry = false) => {
            try {
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
                    throw new Error(errorMessage);
                }
    
                // Traiter la réponse JSON
                const data = await response.json();
                
                // Appliquer le processeur de réponse personnalisé
                return responseProcessor(data);
            } catch (error) {
                // Si c'est une erreur réseau ou de timeout et qu'on n'a pas encore retryé
                if ((error.name === 'TypeError' || error.message.includes('Timeout')) && 
                    retryOnFail && !isRetry) {
                    console.warn(`Retry API call to ${url} after error:`, error.message);
                    // Attendre 500ms avant de réessayer
                    await new Promise(resolve => setTimeout(resolve, 500));
                    return await attemptFetch(true);
                }
                throw error;
            }
        };

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
        return await callApi({
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
    async function getFromStorage(keys, defaults = {}) {
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