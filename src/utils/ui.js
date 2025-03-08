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

    // Suppression complète des notifications sonores

    /**
     * Configure le contenu textuel de la bannière
     * @param {HTMLElement} banner - L'élément bannière
     * @param {string} text - Le message à afficher
     * @returns {HTMLElement|null} - Le conteneur de texte mis à jour ou null
     */
    function updateBannerText(banner, text) {
        // Trouver le conteneur de texte
        const statusTextContainer = banner.querySelector('.whisper-status-text');
        if (statusTextContainer) {
            statusTextContainer.textContent = text;
            
            // Adapter le style du texte en fonction du contenu et des contrôles
            const controlsContainer = banner.querySelector('.whisper-controls-container');
            if (controlsContainer && controlsContainer.offsetWidth > 0) {
                // Si les contrôles sont visibles, limiter la largeur du texte
                statusTextContainer.style.maxWidth = `${Math.max(200, window.innerWidth - controlsContainer.offsetWidth - 80)}px`;
                
                // Gérer l'overflow du texte s'il est trop long
                if (text.length > 50) {
                    statusTextContainer.style.textOverflow = 'ellipsis';
                    statusTextContainer.style.overflow = 'hidden';
                    statusTextContainer.style.whiteSpace = 'nowrap';
                }
            } else {
                // Si les contrôles ne sont pas visibles, pas de limite de largeur
                statusTextContainer.style.maxWidth = 'none';
            }
            return statusTextContainer;
        } else {
            // Si le conteneur n'existe pas (ancien format de bannière), utiliser la bannière directement
            banner.textContent = text;
            return null;
        }
    }
    
    /**
     * Configure les attributs d'accessibilité de la bannière
     * @param {HTMLElement} banner - L'élément bannière
     * @param {string} type - Le type de message ('info' ou 'error')
     * @param {boolean} isRecording - Indique si l'enregistrement est en cours
     * @param {string} text - Le message affiché
     */
    function setupBannerAccessibility(banner, type, isRecording, text) {
        // Définir les attributs ARIA pour l'accessibilité
        banner.setAttribute('role', type === MESSAGE_TYPES.ERROR ? 'alert' : 'status');
        banner.setAttribute('aria-live', type === MESSAGE_TYPES.ERROR ? 'assertive' : 'polite');

        // Appliquer les attributs spécifiques au type
        if (type === MESSAGE_TYPES.ERROR) {
            banner.setAttribute('aria-atomic', 'true');
        } else if (isRecording) {
            banner.setAttribute('aria-label', `Enregistrement en cours: ${text}`);
        }
    }

    /**
     * Affiche la bannière avec un message et accessibilité améliorée
     * @param {HTMLElement} banner - L'élément bannière
     * @param {string} text - Le message à afficher
     * @param {string} type - Le type de message ('info' ou 'error')
     * @param {boolean} isRecording - Indique si l'enregistrement est en cours
     * @param {Function} [updateColorCallback] - Callback pour mettre à jour la couleur du bandeau
     * @returns {boolean} - Indique si l'affichage a réussi
     */
    function showBanner(banner, text, type = MESSAGE_TYPES.INFO, isRecording = false, updateColorCallback = null) {
        // Vérifier si la bannière existe
        if (!banner) {
            console.warn('Banner element is null or undefined');
            return false;
        }

        try {
            // Mettre à jour le texte de la bannière
            updateBannerText(banner, text);

            // Mettre à jour les classes de la bannière
            banner.className = 'whisper-status-banner';
            
            // Réinitialiser les classes
            banner.classList.remove('error', 'recording');

            // Configurer l'accessibilité
            setupBannerAccessibility(banner, type, isRecording, text);

            // Appliquer les classes spécifiques
            if (type === MESSAGE_TYPES.ERROR) {
                banner.classList.add('error');
            } else if (isRecording) {
                banner.classList.add('recording');
            }

            // Ajouter une animation pour attirer l'attention
            banner.style.animation = 'none';
            // Forcer un reflow pour réinitialiser l'animation
            void banner.offsetWidth; // skipcq: JS-0098
            banner.style.animation = type === MESSAGE_TYPES.ERROR ?
                'bannerPulse 0.5s ease-in-out' :
                'bannerFadeIn 0.3s ease-in-out';

            // Rendre la bannière visible (utiliser flex au lieu de block pour la compatibilité)
            banner.style.display = 'flex';
            
            // Ajouter le padding au body quand la bannière est affichée
            if (document.body) {
                document.body.style.paddingTop = '35px';
            }

            // Mettre à jour la couleur uniquement si ce n'est pas un message d'erreur
            if (type !== MESSAGE_TYPES.ERROR && typeof updateColorCallback === 'function') {
                updateColorCallback();
            }
            
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'affichage de la bannière:', error);
            return false;
        }
    }

    /**
     * Crée un bouton de copie pour le texte avec accessibilité améliorée
     * @param {string} text - Le texte à copier
     * @param {Function} onError - Fonction de callback en cas d'erreur
     * @returns {HTMLElement} Le bouton créé
     */
    function createCopyButton(text, onError) {
        const copyButton = document.createElement('button');
        const buttonText = window.BabelFishAIUtils.i18n?.getMessage("copyButton") || 'Copier';
        const successText = window.BabelFishAIUtils.i18n?.getMessage("copySuccess") || 'Copié !';
        const errorText = window.BabelFishAIUtils.i18n?.getMessage("copyError") || 'Erreur lors de la copie du texte';

        copyButton.textContent = buttonText;
        copyButton.className = 'whisper-copy-button';

        // Améliorer l'accessibilité
        copyButton.setAttribute('aria-label', buttonText);
        copyButton.setAttribute('title', buttonText);

        // Ajouter un icône de copie (optionnel, pour amélioration visuelle)
        const iconSpan = document.createElement('span');
        iconSpan.innerHTML = '📋';
        iconSpan.style.marginRight = '5px';
        copyButton.prepend(iconSpan);

        // Gestion des événements clavier pour l'accessibilité
        copyButton.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyButton.click();
            }
        };

        // Fonctionnalité de copie
        copyButton.onclick = async () => {
            try {
                await navigator.clipboard.writeText(text);

                // Feedback visuel
                copyButton.classList.add('success');
                copyButton.setAttribute('aria-label', successText);
                copyButton.setAttribute('title', successText);
                copyButton.textContent = successText;

                // Restaurer après un délai
                setTimeout(() => {
                    copyButton.classList.remove('success');
                    copyButton.setAttribute('aria-label', buttonText);
                    copyButton.setAttribute('title', buttonText);
                    copyButton.textContent = buttonText;
                    copyButton.prepend(iconSpan);
                }, CONFIG.COPY_FEEDBACK_DURATION);
            } catch (error) {
                console.error('Failed to copy text:', error);

                // Feedback visuel en cas d'erreur
                copyButton.classList.add('error');
                copyButton.setAttribute('aria-label', errorText);
                copyButton.setAttribute('title', errorText);

                // Informer l'utilisateur
                if (onError) onError(errorText);

                // Restaurer après un délai
                setTimeout(() => {
                    copyButton.classList.remove('error');
                    copyButton.setAttribute('aria-label', buttonText);
                    copyButton.setAttribute('title', buttonText);
                }, CONFIG.COPY_FEEDBACK_DURATION);
            }
        };

        // Ajouter le style pour le bouton si nécessaire
        if (!document.getElementById('whisper-copy-button-styles')) {
            const style = document.createElement('style');
            style.id = 'whisper-copy-button-styles';
            style.textContent = `
                .whisper-copy-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 10px;
                    padding: 5px 10px;
                    background-color: #f0f0f0;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .whisper-copy-button:hover {
                    background-color: #e0e0e0;
                }
                .whisper-copy-button:active {
                    transform: translateY(1px);
                }
                .whisper-copy-button.success {
                    background-color: #d4edda;
                    border-color: #c3e6cb;
                    color: #155724;
                }
                .whisper-copy-button.error {
                    background-color: #f8d7da;
                    border-color: #f5c6cb;
                    color: #721c24;
                }
            `;
            document.head.appendChild(style);
        }

        return copyButton;
    }

    /**
     * Crée le conteneur pour les transcriptions avec un bouton de fermeture et accessibilité améliorée
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

        // Ajouter les attributs ARIA pour l'accessibilité
        container.setAttribute('role', 'dialog');
        container.setAttribute('aria-labelledby', 'whisper-dialog-title');
        container.setAttribute('aria-describedby', 'whisper-dialog-content');

        // Ajouter un titre pour l'accessibilité
        const title = document.createElement('div');
        title.id = 'whisper-dialog-title';
        title.className = 'whisper-dialog-title';
        title.textContent = window.BabelFishAIUtils.i18n?.getMessage("dialogTitle") || 'Transcription';
        title.setAttribute('role', 'heading');
        title.setAttribute('aria-level', '2');

        // Créer le bouton de fermeture
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.className = 'whisper-close-button';
        closeButton.title = window.BabelFishAIUtils.i18n?.getMessage("closeButton") || 'Fermer';
        closeButton.setAttribute('aria-label', window.BabelFishAIUtils.i18n?.getMessage("closeButton") || 'Fermer la boîte de dialogue');

        // Améliorer l'expérience de fermeture
        closeButton.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeButton.click();
            }
        };

        // Ajouter un gestionnaire d'événements pour fermer le conteneur
        closeButton.onclick = () => {
            if (container.parentNode) {
                // Ajouter une animation de fermeture
                container.classList.add('closing');
                setTimeout(() => {
                    if (container.parentNode) {
                        document.body.removeChild(container);
                    }
                }, 300); // Correspond à la durée de l'animation
            }
        };

        // Permettre la fermeture avec la touche Echap
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeButton.click();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // Nettoyer l'écouteur lorsque le conteneur est retiré
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if ([...mutation.removedNodes].includes(container)) {
                    document.removeEventListener('keydown', handleKeyDown);
                    observer.disconnect();
                }
            });
        });
        observer.observe(document.body, { childList: true });

        // Assembler le conteneur
        title.appendChild(closeButton);
        container.appendChild(title);

        // Ajouter le conteneur avec une animation d'entrée
        document.body.appendChild(container);

        // Forcer un reflow avant d'ajouter la classe d'animation
        void container.offsetWidth; // skipcq: JS-0098
        container.classList.add('visible');

        // Ajouter du CSS dynamiquement pour les animations si nécessaire
        if (!document.getElementById('whisper-dialog-styles')) {
            const style = document.createElement('style');
            style.id = 'whisper-dialog-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(20px); }
                }
                @keyframes bannerPulse {
                    0% { opacity: 0.7; }
                    50% { opacity: 1; }
                    100% { opacity: 0.7; }
                }
                @keyframes bannerFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .whisper-transcription-container {
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
                }
                .whisper-transcription-container.visible {
                    animation: fadeIn 0.3s ease-in-out forwards;
                }
                .whisper-transcription-container.closing {
                    animation: fadeOut 0.3s ease-in-out forwards;
                }
                .whisper-dialog-title {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 5px 10px;
                    background-color: #f5f5f5;
                    border-bottom: 1px solid #ddd;
                    font-weight: bold;
                }
            `;
            document.head.appendChild(style);
        }

        return container;
    }

    /**
     * Supprime un élément de transcription et nettoie le conteneur si nécessaire
     * @param {HTMLElement} transcriptionElement - L'élément de transcription à supprimer
     */
    function removeTranscriptionElement(transcriptionElement) {
        try {
            // Vérifier si l'élément existe toujours et est valide avant de le supprimer
            if (transcriptionElement && transcriptionElement.parentNode) {
                try {
                    transcriptionElement.parentNode.removeChild(transcriptionElement);
                } catch (e) {
                    console.warn("Erreur lors de la suppression de l'élément:", e);
                }
            }
    
            // Récupérer à nouveau le conteneur pour éviter les problèmes si le DOM a changé
            try {
                const currentContainer = document.getElementById('whisper-transcription-container');
        
                // Si le conteneur est vide (ne contient que le bouton de fermeture) ou n'a plus d'enfants, on le supprime
                if (currentContainer && (currentContainer.children.length <= 1 || currentContainer.children.length === 0)) {
                    if (document.body.contains(currentContainer)) {
                        document.body.removeChild(currentContainer);
                    }
                }
            } catch (e) {
                console.warn("Erreur lors du nettoyage du conteneur:", e);
            }
        } catch (e) {
            console.warn("Erreur globale lors de la suppression de l'élément:", e);
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
            try {
                if ('requestIdleCallback' in window) {
                    window.requestIdleCallback(() => {
                        try {
                            removeTranscriptionElement(textElement);
                        } catch (e) {
                            console.warn("Erreur lors de la suppression de l'élément:", e);
                        }
                    }, { timeout: 1000 }); // S'assurer que ça s'exécute dans un délai raisonnable
                } else {
                    // Fallback à setTimeout
                    setTimeout(() => {
                        try {
                            removeTranscriptionElement(textElement);
                        } catch (e) {
                            console.warn("Erreur lors de la suppression de l'élément:", e);
                        }
                    }, 0);
                }
            } catch (e) {
                console.warn("Erreur lors de la planification de la suppression:", e);
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