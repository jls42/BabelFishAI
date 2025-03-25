// Utilitaires API pour l'extension BabelFishAI (DEPRECATED - Utiliser api-utils.js à la place)
// Ce fichier est conservé pour la compatibilité avec le code existant
// mais toutes les fonctions sont maintenant déléguées à api-utils.js
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Utilisation des constantes globales depuis constants.js
    // API_CONFIG n'est plus utilisé dans ce fichier obsolète
    const ERRORS = window.BabelFishAIConstants.ERRORS;

    // La fonction callApi dupliquée a été supprimée de ce fichier obsolète.
    // Utiliser window.BabelFishAIUtils.api.callApi défini dans api-utils.js.

    // La fonction locale transcribeAudio a été supprimée car elle était obsolète et déléguait simplement
    // à l'implémentation dans api-utils.js.

    /**
     * Récupère des données depuis le stockage synchronisé de Chrome.
     * Transforme l'API callback-based de Chrome en Promise pour faciliter l'utilisation avec async/await.
     * @param {Array|string|Object} keys - Les clés à récupérer ou un objet avec les valeurs par défaut
     * @param {Object} [defaults={}] - Les valeurs par défaut si keys est un tableau ou une chaîne
     * @returns {Promise<Object>} Les données récupérées avec les valeurs par défaut appliquées
     * @throws {Error} Une erreur CHROME_STORAGE_ERROR si la récupération échoue
     */
    async function getFromStorage(keys) { // skipcq: JS-0116
        return new Promise((resolve, reject) => {
            window.chrome.storage.sync.get(keys, (result) => {
                if (window.chrome.runtime.lastError) {
                    console.error("Chrome storage error:", window.chrome.runtime.lastError);
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
    async function saveToStorage(data) { // skipcq: JS-0116
        return new Promise((resolve, reject) => {
            window.chrome.storage.sync.set(data, () => {
                if (window.chrome.runtime.lastError) {
                    console.error("Chrome storage save error:", window.chrome.runtime.lastError);
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
    // Note: Ces fonctions sont maintenant déléguées à api-utils.js
    // transcribeAudio n'est plus exporté ici pour éviter d'écraser l'export de api-utils.js
    exports.api = {
        getApiKey,
        getFromStorage,
        saveToStorage
        // callApi n'est plus exporté ici car la fonction locale a été supprimée
    };

})(window.BabelFishAIUtils);