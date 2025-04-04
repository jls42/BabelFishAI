// Utilitaires de gestion des événements pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Référence aux constantes globales
    const ACTIONS = window.BabelFishAIConstants.ACTIONS;

    // Variables pour stocker les références aux fonctions externes
    let recordingBanner = null;

    /**
     * Initialise les références aux éléments UI et fonctions nécessaires
     * @param {Object} refs - Références aux éléments et fonctions
     */
    function init(refs) {
        if (refs.recordingBanner) {
            recordingBanner = refs.recordingBanner;
        }
    }

    /**
     * Gère les messages provenant du script d'arrière-plan
     * @param {Object} message - Le message reçu
     * @param {Object} sender - L'expéditeur du message
     * @param {Function} callback - Fonction de callback pour répondre au message
     */
    function handleBackgroundMessages(message) {
        // Mapper les actions aux fonctions correspondantes
        const actionHandlers = {
            [ACTIONS.TOGGLE]: () => {
                // Utiliser la fonction isCurrentlyRecording de recording-utils.js pour vérifier l'état d'enregistrement
                if (!window.BabelFishAIUtils.recording.isCurrentlyRecording()) {
                    window.BabelFishAI.startRecording();
                } else {
                    window.BabelFishAI.stopRecording();
                }
            },
            // Action pour la reformulation de texte sélectionné
            rephraseSelection: () => {
                if (message.text) {
                    window.BabelFishAI.handleTextRephrasing(message.text);
                }
            },
            // Action pour la traduction de texte sélectionné
            translateSelection: () => {
                if (message.text) {
                    // Passer la langue cible spécifiée, si disponible
                    window.BabelFishAI.handleTextTranslation(message.text, message.targetLanguage);
                }
            }
            // Possibilité d'ajouter d'autres gestionnaires d'actions ici
        };

        // Exécuter le gestionnaire correspondant à l'action
        if (message.action && actionHandlers[message.action]) {
            actionHandlers[message.action]();
        }
    }

    /**
     * Gère les événements clavier pour l'extension
     * @param {KeyboardEvent} event - L'événement clavier
     */
    function handleKeyboardEvents(event) {
        // La touche Échap (code 27) pour annuler l'enregistrement
        if (event.key === 'Escape' && window.BabelFishAIUtils.recording.isCurrentlyRecording()) {
            window.BabelFishAI.cancelRecording();
            // Empêcher les gestionnaires d'événements par défaut et la propagation
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Met à jour les options de couleur du bandeau
     * @param {Object} changes - Les changements dans les options
     */
    function updateBannerColorOptions(changes) {
        if (!recordingBanner) return;

        let hasColorChanges = false;

        if (changes.bannerColorStart || changes.bannerColorEnd || changes.bannerOpacity) {
            hasColorChanges = true;
        }

        if (hasColorChanges) {
            window.BabelFishAI.updateBannerColor(true);
        }
    }

    /**
     * Gestionnaire centralisé pour les modifications du stockage
     * @param {Object} changes - Les changements détectés
     * @param {string} namespace - L'espace de noms du stockage
    /**
     * Gère les changements de raccourcis clavier
     * @param {Object} changes - Les changements détectés
     */
    function handleKeyboardShortcutChanges(changes) {
        if (changes.keyboardShortcuts) {
            // La mise à jour des raccourcis est gérée automatiquement par le background script
        }
    }

    /**
     * Gère les changements de langue par défaut
     * @param {Object} changes - Les changements détectés
     */
    function handleDefaultLanguageChanges(changes) {
        if (changes.defaultLanguage) {
            // Mettre à jour le sélecteur de langue dans la bannière si disponible
            const languageSelect = recordingBanner?.querySelector('.whisper-language-select');
            if (languageSelect) {
                const newLanguage = changes.defaultLanguage.newValue;
                if (newLanguage && languageSelect.querySelector(`option[value="${newLanguage}"]`)) {
                    languageSelect.value = newLanguage;
                }
            }
        }
    }

    /**
     * Gestionnaire centralisé pour les modifications du stockage
     * @param {Object} changes - Les changements détectés
     * @param {string} namespace - L'espace de noms du stockage
    /**
     * Gère les changements d'options avancées
     * @param {Object} changes - Les changements détectés
     */
    function handleAdvancedOptionChanges(changes) {
        const advancedOptionKeys = [
            'enableAdvancedOptions',
            'whisperApiUrl',
            'whisperModel',
            'translationApiUrl',
            'gptModel',
            'disableLogging',
            'dialogDuration',
            'maxRetries'
        ];

        // Vérifier si des options avancées ont été modifiées
        const hasAdvancedChanges = advancedOptionKeys.some(key => key in changes);

        if (hasAdvancedChanges) {
            // Si le mode expert est activé/désactivé, mettre à jour l'interface
            if ('enableAdvancedOptions' in changes) {
                const expertMode = changes.enableAdvancedOptions.newValue === true;

                // Mettre à jour les éléments de l'interface qui dépendent du mode expert
                const expertElements = document.querySelectorAll('.whisper-expert-only');
                expertElements.forEach(el => {
                    el.style.display = expertMode ? 'block' : 'none';
                });
            }
        }
    }

    /**
     * Gère les changements d'options d'affichage
     * @param {Object} changes - Les changements détectés
     */
    function handleDisplayOptionChanges(changes) {
        const displayOptionKeys = [
            'activeDisplay',
            'autoCopy',
            'forcedDialogDomains'
        ];

        // Vérifier si des options d'affichage ont été modifiées
        const hasDisplayChanges = displayOptionKeys.some(key => key in changes);

        if (hasDisplayChanges) {
            // Mettre à jour les comportements d'affichage en fonction des nouvelles options
            // Ces changements seront appliqués lors du prochain affichage de transcription
        }
    }

    /**
     * Met à jour l'état du bouton de traduction
     * @param {HTMLElement} translateButton - Le bouton de traduction
     * @param {boolean} enableTranslation - Indique si la traduction est activée
     */
    function updateTranslateButton(translateButton, enableTranslation) {
        translateButton.setAttribute('data-active', String(enableTranslation));
    }

    /**
     * Gère l'affichage du conteneur de langue
     * @param {HTMLElement} languageContainer - Le conteneur de langue
     * @param {HTMLElement} languageContainer - Le conteneur de langue à afficher
     */
    function showLanguageContainer(languageContainer) {
        // Montrer le conteneur de langue
        languageContainer.style.display = 'flex';

        // Utiliser rAF pour grouper les changements visuels
        requestAnimationFrame(() => {
            languageContainer.style.opacity = '1';
            languageContainer.style.maxHeight = '30px'; // Assurez-vous que cette hauteur est suffisante
            languageContainer.style.overflow = 'visible';
        });
    }

    /**
     * Masque le conteneur de langue avec une transition
     * @param {HTMLElement} languageContainer - Le conteneur de langue à masquer
     */
    function hideLanguageContainer(languageContainer) {
        // Cacher le conteneur de langue avec transition
        languageContainer.style.opacity = '0';
        languageContainer.style.maxHeight = '0';
        languageContainer.style.overflow = 'hidden';

        // Masquer complètement après l'animation (display: none)
        setTimeout(() => {
            // Vérifier si le conteneur existe toujours avant de modifier le style
            if (languageContainer) {
                languageContainer.style.display = 'none';
            }
        }, 300); // Correspond à la durée de la transition CSS (à définir)
    }

    /**
     * Met à jour la langue cible sélectionnée dans le sélecteur
     * @param {HTMLElement} languageSelect - Le sélecteur de langue
     * @param {string} newTargetLanguage - La nouvelle langue cible
     */
    function updateTargetLanguageSelect(languageSelect, newTargetLanguage) {
        if (languageSelect && languageSelect.value !== newTargetLanguage) {
            languageSelect.value = newTargetLanguage;
        }
    }

    /**
     * Gère les changements d'options de traduction
     * @param {Object} changes - Les changements détectés
     */
    function handleTranslationOptionChanges(changes) {
        const translationOptionKeys = [
            'enableTranslation',
            'sourceLanguage',
            'targetLanguage'
        ];

        // Vérifier si des options de traduction ont été modifiées
        const hasTranslationChanges = translationOptionKeys.some(key => key in changes);

        if (hasTranslationChanges) {
            // Mettre à jour l'interface de traduction si nécessaire
            const translateButton = recordingBanner?.querySelector('#whisper-translation-control');
            const languageContainer = recordingBanner?.querySelector('.whisper-language-container');

            if (translateButton && 'enableTranslation' in changes) {
                updateTranslateButton(translateButton, changes.enableTranslation.newValue);

                // Gérer l'affichage du conteneur de langue
                if (languageContainer) {
                    if (changes.enableTranslation.newValue) {
                        showLanguageContainer(languageContainer);
                    } else {
                        hideLanguageContainer(languageContainer);
                    }
                }
            }

            // Mettre à jour la langue cible sélectionnée
            if ('targetLanguage' in changes) {
                const languageSelect = recordingBanner?.querySelector('#whisper-language-select');
                updateTargetLanguageSelect(languageSelect, changes.targetLanguage.newValue);
            }
        }
    }

    /**
     * Gère les changements d'options de reformulation
     * @param {Object} changes - Les changements détectés
     */
    function handleRephraseOptionChanges(changes) {
        if ('enableRephrase' in changes) {
            // Mettre à jour l'interface de reformulation si nécessaire
            const rephraseButton = recordingBanner?.querySelector('#whisper-rephrase-control');
            if (rephraseButton) {
                // Mettre à jour l'attribut data-active pour changer l'état visuel du bouton
                rephraseButton.setAttribute('data-active', String(changes.enableRephrase.newValue));
            }
        }
    }

    /**
     * Gestionnaire centralisé pour les modifications du stockage
     * @param {Object} changes - Les changements détectés
     * @param {string} namespace - L'espace de noms du stockage
     */
    function handleStorageChanges(changes, namespace) {
        // Vérifier que les changements concernent le stockage local ou sync
        if (namespace !== 'local' && namespace !== 'sync') {
            return;
        }

        // Traiter les changements de couleur du bandeau
        updateBannerColorOptions(changes);

        // Traiter les changements de raccourcis clavier
        handleKeyboardShortcutChanges(changes);

        // Traiter les changements de langue
        handleDefaultLanguageChanges(changes);

        // Traiter les changements d'options avancées
        handleAdvancedOptionChanges(changes);

        // Traiter les changements d'options d'affichage
        handleDisplayOptionChanges(changes);

        // Traiter les changements d'options de traduction
        handleTranslationOptionChanges(changes);

        // Traiter les changements d'options de reformulation
        handleRephraseOptionChanges(changes);
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.events = {
        init,
        handleBackgroundMessages,
        handleKeyboardEvents,
        handleStorageChanges
    };

})(window.BabelFishAIUtils);
