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
     * @param {boolean} [force=false] - Forcer la mise à jour même si la bannière est en mode erreur
     */
    function updateBannerColor(banner, startColor, endColor, opacity, force = false) {
        // Vérifications de sécurité
        if (!banner) {
            console.warn('Banner element is null or undefined');
            return;
        }

        // Ne pas modifier le style si c'est une erreur, sauf si force=true
        if (!force && banner.classList.contains('error')) {
            return;
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

    /**
     * Crée le conteneur pour les transcriptions avec un bouton de fermeture
     * @returns {HTMLElement} Le conteneur créé et ajouté au document
     */
    function createTranscriptionContainer() {
        // Vérifier si le conteneur existe déjà
        let container = document.getElementById('whisper-transcription-container');
        if (container) {
            return container;
        }
        
        // Créer le conteneur principal
        container = document.createElement('div');
        container.id = 'whisper-transcription-container';
        container.className = 'whisper-transcription-container';

        // Créer le bouton de fermeture
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.className = 'whisper-close-button';
        closeButton.title = 'Fermer';

        // Ajouter un gestionnaire d'événements pour fermer le conteneur
        closeButton.onclick = () => {
            if (container.parentNode) {
                document.body.removeChild(container);
            }
        };

        // Ajouter le bouton au conteneur et le conteneur au document
        container.appendChild(closeButton);
        document.body.appendChild(container);

        return container;
    }

    /**
     * Supprime un élément de transcription et nettoie le conteneur si nécessaire
     * @param {HTMLElement} transcriptionElement - L'élément de transcription à supprimer
     */
    function removeTranscriptionElement(transcriptionElement) {
        // Vérifier si l'élément existe toujours avant de le supprimer
        if (transcriptionElement && transcriptionElement.parentNode) {
            transcriptionElement.parentNode.removeChild(transcriptionElement);

            // Récupérer à nouveau le conteneur pour éviter les problèmes si le DOM a changé
            const currentContainer = document.getElementById('whisper-transcription-container');

            // Si le conteneur est vide (ne contient que le bouton de fermeture), on le supprime
            if (currentContainer && currentContainer.children.length === 1) {
                document.body.removeChild(currentContainer);
            }
        }
    }

    // Création unique d'un fragment de document pour optimiser les manipulations DOM
    const documentFragment = document.createDocumentFragment();
    
    /**
     * Affiche un texte dans une boîte de dialogue flottante avec optimisation DOM
     * @param {string} text - Le texte à afficher
     * @param {number} duration - Durée d'affichage en secondes
     * @param {Function} onError - Fonction de callback en cas d'erreur
     * @returns {HTMLElement} L'élément créé
     */
    function showTextInDialog(text, duration, onError) {
        // Récupérer ou créer le conteneur de la boîte de dialogue
        const container = createTranscriptionContainer();

        // Créer l'élément qui contiendra le texte
        // Utilisation d'un fragment pour regrouper les manipulations DOM
        const textElement = document.createElement('div');
        textElement.className = 'whisper-transcription-element';
        
        // Création unique du fragment de document avec tous les éléments
        // pour éviter les multiples reflows et repaints
        documentFragment.appendChild(textElement);
        textElement.textContent = text;
        
        const lineBreak = document.createElement('br');
        textElement.appendChild(lineBreak);
        
        // Ajouter un bouton de copie pour permettre à l'utilisateur de copier le texte
        const copyButton = createCopyButton(text, onError);
        textElement.appendChild(copyButton);
        
        // Utiliser requestAnimationFrame pour synchroniser avec le cycle de rendu du navigateur
        // et minimiser les reflows/repaints
        requestAnimationFrame(() => {
            // Ajouter l'élément au conteneur en une seule opération
            container.appendChild(documentFragment);
        });

        // Utiliser un numéro d'ID unique pour éviter les conflits de timers
        const timerId = `dialog_${Date.now()}`;
        
        // Utiliser requestIdleCallback si disponible pour la suppression automatique
        const scheduleRemoval = () => {
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(() => {
                    removeTranscriptionElement(textElement);
                }, { timeout: 1000 }); // S'assurer que ça s'exécute dans un délai raisonnable
            } else {
                removeTranscriptionElement(textElement);
            }
        };
        
        // Configurer la suppression automatique après la durée spécifiée
        const autoRemoveTimeout = duration * 1000; // Convertir en millisecondes
        const timers = window.BabelFishAIUtils.timers = window.BabelFishAIUtils.timers || {};
        
        // Supprimer les anciens timers pour éviter les fuites mémoire
        if (timers[timerId]) {
            clearTimeout(timers[timerId]);
        }
        
        // Stocker le timer pour pouvoir le nettoyer plus tard si nécessaire
        timers[timerId] = setTimeout(scheduleRemoval, autoRemoveTimeout);

        return textElement;
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.ui = {
        updateBannerColor,
        showStatus,
        showBanner,
        createCopyButton,
        showTextInDialog,
        createTranscriptionContainer,
        removeTranscriptionElement
    };

})(window.BabelFishAIUtils);