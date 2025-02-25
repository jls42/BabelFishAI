// Utilitaires UI pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Utilisation des constantes globales depuis constants.js
    const UI_CONFIG = window.BabelFishAIConstants.UI_CONFIG;
    const MESSAGE_TYPES = window.BabelFishAIConstants.MESSAGE_TYPES;
    const CONFIG = window.BabelFishAIConstants.CONFIG;

    /**
     * Met à jour la couleur du bandeau avec un dégradé
     * @param {HTMLElement} banner - L'élément bannière
     * @param {string} startColor - Couleur de début du dégradé
     * @param {string} endColor - Couleur de fin du dégradé
     * @param {number} opacity - Opacité (0-100)
     */
    function updateBannerColor(banner, startColor, endColor, opacity) {
        if (banner.classList.contains('error')) {
            return; // Ne pas modifier le style si c'est une erreur
        }

        const opacityValue = opacity / 100;
        const start = startColor || UI_CONFIG.DEFAULT_BANNER_COLOR_START;
        const end = endColor || UI_CONFIG.DEFAULT_BANNER_COLOR_END;

        try {
            // Convertir les couleurs hex en RGB
            const startR = parseInt(start.substr(1, 2), 16);
            const startG = parseInt(start.substr(3, 2), 16);
            const startB = parseInt(start.substr(5, 2), 16);
            const endR = parseInt(end.substr(1, 2), 16);
            const endG = parseInt(end.substr(3, 2), 16);
            const endB = parseInt(end.substr(5, 2), 16);

            const gradient = `linear-gradient(45deg,
                rgba(${startR}, ${startG}, ${startB}, ${opacityValue}),
                rgba(${endR}, ${endG}, ${endB}, ${opacityValue}))`;

            banner.style.background = gradient;
        } catch (error) {
            console.error('Error updating banner color:', error);
            // Utiliser le dégradé par défaut en cas d'erreur
            banner.style.background = `linear-gradient(45deg,
                ${UI_CONFIG.DEFAULT_BANNER_COLOR_START},
                ${UI_CONFIG.DEFAULT_BANNER_COLOR_END})`;
        }
    }

    /**
     * Affiche un message de statut
     * @param {HTMLElement} statusElement - L'élément de statut
     * @param {string} message - Le message à afficher
     * @param {string} type - Le type de message ('success' ou 'error')
     */
    function showStatus(statusElement, message, type = 'success') {
        statusElement.textContent = message;
        statusElement.className = `status ${type}`;
        statusElement.style.display = 'block';

        if (type === 'success') {
            setTimeout(() => {
                statusElement.style.display = 'none';
                statusElement.className = 'status';
            }, CONFIG.COPY_FEEDBACK_DURATION);
        }
    }

    /**
     * Affiche la bannière avec un message
     * @param {HTMLElement} banner - L'élément bannière
     * @param {string} text - Le message à afficher
     * @param {string} type - Le type de message ('info' ou 'error')
     * @param {boolean} isRecording - Indique si l'enregistrement est en cours
     */
    function showBanner(banner, text, type = MESSAGE_TYPES.INFO, isRecording = false) {
        banner.textContent = text;
        banner.className = 'whisper-status-banner';

        // Réinitialiser les classes
        banner.classList.remove('error', 'recording');

        if (type === MESSAGE_TYPES.ERROR) {
            banner.classList.add('error');
        } else if (isRecording) {
            banner.classList.add('recording');
        }

        banner.style.display = 'block';
    }

    /**
     * Crée un bouton de copie pour le texte
     * @param {string} text - Le texte à copier
     * @param {Function} onError - Fonction de callback en cas d'erreur
     * @returns {HTMLElement} Le bouton créé
     */
    function createCopyButton(text, onError) {
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copier';
        copyButton.className = 'whisper-copy-button';
        copyButton.onclick = async () => {
            try {
                await navigator.clipboard.writeText(text);
                copyButton.textContent = 'Copié !';
                setTimeout(() => {
                    copyButton.textContent = 'Copier';
                }, CONFIG.COPY_FEEDBACK_DURATION);
            } catch (error) {
                console.error('Failed to copy text:', error);
                if (onError) onError('Erreur lors de la copie du texte');
            }
        };
        return copyButton;
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.ui = {
        updateBannerColor,
        showStatus,
        showBanner,
        createCopyButton
    };

})(window.BabelFishAIUtils);