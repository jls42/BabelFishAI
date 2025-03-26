// Utilitaires de gestion d'erreurs pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    /**
     * Exécute une fonction en toute sécurité avec gestion d'erreur
     * @param {Function} fn - Fonction à exécuter
     * @param {string} errorMsg - Message d'erreur à afficher en cas d'échec
     * @param {Object} options - Options de configuration
     * @param {boolean} [options.propagateError=true] - Si true, propage l'erreur, sinon retourne null
     * @param {boolean} [options.isAsync=true] - Si true, attend le résultat de la fonction asynchrone
     * @returns {Promise|*} - Le résultat de la fonction ou null en cas d'erreur
     */
    function safeExecute(fn, errorMsg, options = {}) {
        // Valeurs par défaut des options
        const {
            propagateError = true,
            isAsync = true
        } = options;

        try {
            // Exécuter la fonction de manière asynchrone ou synchrone selon les options
            const result = fn();

            // Si c'est une fonction asynchrone, attendre le résultat
            if (isAsync && result instanceof Promise) {
                return result.catch(e => {
                    console.warn(errorMsg, e);
                    if (propagateError) {
                        throw e; // Propager l'erreur pour la gestion centralisée
                    }
                    return null;
                });
            }

            // Pour les fonctions synchrones, retourner directement le résultat
            return result;
        } catch (e) {
            // Gestion des erreurs synchrones
            console.warn(errorMsg, e);
            if (propagateError) {
                throw e; // Propager l'erreur
            }
            return null;
        }
    }

    /**
     * Vérifie si les dépendances nécessaires sont disponibles
     * @returns {boolean} - True si les dépendances sont disponibles, sinon false
     */
    function areDependenciesAvailable() {
        // Utilisation du chaînage optionnel pour vérifier l'existence des propriétés imbriquées
        return Boolean(window.BabelFishAIUtils?.i18n); // Convertit le résultat en booléen explicite
    }

    /**
     * Vérifie si l'API UI est disponible
     * @returns {boolean} - True si l'API UI est disponible, sinon false
     */
    function isUIAvailable() {
        // Utilisation du chaînage optionnel pour vérifier l'existence et le type de la fonction
        return typeof window.BabelFishAI?.ui?.showBanner === 'function';
    }

    /**
     * Gère une erreur en l'affichant à l'utilisateur et en la journalisant
     * @param {string|Error} displayMessage - Message à afficher à l'utilisateur ou objet Error
     * @param {string} [errorMessage] - Message technique d'erreur (optionnel)
     */
    function handleError(displayMessage, errorMessage) {
        try {
            // Vérifier si les dépendances nécessaires sont disponibles
            if (!areDependenciesAvailable()) {
                console.error("Erreur: BabelFishAIUtils ou i18n n'est pas disponible", displayMessage);
                return;
            }

            // Référence aux constantes nécessaires
            const MESSAGE_TYPES = window.BabelFishAIConstants?.MESSAGE_TYPES || { ERROR: 'error' };
            const ACTIONS = window.BabelFishAIConstants?.ACTIONS || { ERROR: 'error' };
            const CONFIG = window.BabelFishAIConstants?.CONFIG || { ERROR_BANNER_DURATION: 5000 };

            // Normaliser les paramètres pour gérer différents types d'entrées
            const { userMessage, technicalMessage } = normalizeError(displayMessage, errorMessage);

            // Logger l'erreur technique pour le débogage
            console.error("Erreur technique:", technicalMessage);

            // Afficher le message d'erreur à l'utilisateur via la bannière
            if (isUIAvailable()) {
                showErrorBanner(userMessage, MESSAGE_TYPES, CONFIG);
            } else {
                console.warn("Impossible d'afficher la bannière, l'API UI n'est pas disponible");
            }

            // Informer le background script de l'erreur pour mise à jour du badge
            notifyBackgroundOnError(technicalMessage, ACTIONS);

        } catch (fatalError) {
            // Gestion des erreurs critiques dans la fonction handleError elle-même
            console.error("Erreur fatale dans handleError:", fatalError, "\nMessage original:", displayMessage);
        }
    }

    /**
     * Normalise les paramètres d'erreur
     * @param {string|Error} displayMessage - Message à afficher ou objet Error
     * @param {string} [errorMessage] - Message technique (optionnel)
     * @returns {{userMessage: string, technicalMessage: string}} - Objet d'erreur normalisé
     */
    function normalizeError(displayMessage, errorMessage) {
        let userMessage = '';
        let technicalMessage = '';

        if (displayMessage instanceof Error) {
            userMessage = displayMessage.message || window.BabelFishAIUtils.i18n.getMessage("bannerErrorGeneric") || "Erreur générique";
            technicalMessage = displayMessage.stack || displayMessage.message;
        } else {
            userMessage = displayMessage || window.BabelFishAIUtils.i18n.getMessage("bannerErrorGeneric") || "Erreur générique";
            technicalMessage = errorMessage || displayMessage;
        }

        return { userMessage, technicalMessage };
    }

    /**
     * Affiche la bannière d'erreur
     * @param {string} userMessage - Le message à afficher
     * @param {object} MESSAGE_TYPES - Les types de messages
     * @param {object} CONFIG - La configuration
     */
    function showErrorBanner(userMessage, MESSAGE_TYPES, CONFIG) {
        try {
            window.BabelFishAI.ui.showBanner(userMessage, MESSAGE_TYPES.ERROR);

            // Cacher automatiquement la bannière après un délai défini
            setTimeout(() => {
                if (isUIAvailable()) {
                    window.BabelFishAI.ui.hideBanner();
                }
            }, CONFIG.ERROR_BANNER_DURATION);
        } catch (bannerError) {
            console.error("Erreur lors de l'affichage de la bannière:", bannerError);
        }
    }

    /**
     * Notifie le script background en cas d'erreur
     * @param {string} technicalMessage - Le message technique
     * @param {object} ACTIONS - Les actions
     */
    function notifyBackgroundOnError(technicalMessage, ACTIONS) {
        try {
            // Utilisation du chaînage optionnel pour vérifier l'existence de sendMessage
            if (typeof chrome?.runtime?.sendMessage === 'function') {
                chrome.runtime.sendMessage({
                    action: ACTIONS.ERROR,
                    error: technicalMessage
                });
            }
        } catch (e) {
            console.error("Impossible d'envoyer l'erreur au script d'arrière-plan:", e);
        }
    }

    /**
     * Affiche un message d'état dans la bannière
     * @param {string} text - Le message à afficher
     * @param {string} [type='info'] - Le type de message ('info', 'error', etc.)
     * @returns {boolean} - Indique si l'affichage a réussi
     */
    function showStatus(text, type = 'info') {
        try {
            // Vérifier si la bannière est accessible via l'API banner-utils
            if (isBannerUtilsAvailable()) {
                try {
                    // Obtenir la bannière depuis l'API de BabelFishAI si disponible
                    const banner = window.BabelFishAI?.ui?.getBanner?.() || null;

                    if (banner) {
                        return showStatusViaBannerUtils(banner, text, type);
                    }
                } catch (bannerError) {
                    console.warn("Erreur lors de l'accès à la bannière via l'API banner-utils:", bannerError);
                }
            }

            // Fallback: utiliser l'API UI directement si disponible
            if (isUIDirectlyAvailable()) {
                try {
                    return showStatusViaUI(text, type);
                } catch (uiError) {
                    console.warn("Erreur lors de l'utilisation de l'API UI pour afficher le statut:", uiError);
                }
            }

            // Si aucune méthode n'est disponible, ne rien faire ou envisager une alternative silencieuse
            return false;
        } catch (fatalError) {
            // Gestion des erreurs critiques dans la fonction showStatus elle-même
            console.error("Erreur fatale dans showStatus:", fatalError, "\nMessage original:", text);
            return false;
        }
    }

    /**
     * Vérifie si l'API banner-utils est disponible
     * @returns {boolean} - True si l'API est disponible, sinon false
     */
    function isBannerUtilsAvailable() {
        // Utilisation du chaînage optionnel pour vérifier l'existence et le type de la fonction
        return typeof window.BabelFishAIUtils?.banner?.showStatus === 'function';
    }

    /**
     * Vérifie si l'API UI est directement disponible
     * @returns {boolean} - True si l'API est disponible, sinon false
     */
    function isUIDirectlyAvailable() {
        // Utilisation du chaînage optionnel pour vérifier l'existence et le type de la fonction
        return typeof window.BabelFishAI?.ui?.showStatus === 'function';
    }

    /**
     * Affiche le statut via l'API banner-utils
     * @param {object} banner - L'objet bannière
     * @param {string} text - Le texte à afficher
     * @param {string} type - Le type de message
     * @returns {boolean} - True si l'affichage a réussi, sinon false
     */
    function showStatusViaBannerUtils(banner, text, type) {
        return window.BabelFishAIUtils.banner.showStatus(banner, text, type);
    }

    /**
     * Affiche le statut via l'API UI directement
     * @param {string} text - Le texte à afficher
     * @param {string} type - Le type de message
     * @returns {boolean} - True si l'affichage a réussi, sinon false
     */
    function showStatusViaUI(text, type) {
        return window.BabelFishAI.ui.showStatus(text, type);
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.error = {
        safeExecute,
        handleError,
        showStatus
    };

})(window.BabelFishAIUtils);
