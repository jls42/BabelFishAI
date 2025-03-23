// Utilitaires de gestion des événements pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Référence aux constantes globales
    const ACTIONS = window.BabelFishAIConstants.ACTIONS;
    const UI_CONFIG = window.BabelFishAIConstants.UI_CONFIG;
    const CONFIG = window.BabelFishAIConstants.CONFIG;

    // Variables pour stocker les références aux fonctions externes
    let recordingBanner = null;
    let bannerColorStart = null;
    let bannerColorEnd = null;

    /**
     * Initialise les références aux éléments UI et fonctions nécessaires
     * @param {Object} refs - Références aux éléments et fonctions
     */
    function init(refs) {
        if (refs.recordingBanner) {
            recordingBanner = refs.recordingBanner;
        }
        
        if (refs.bannerColorStart) {
            bannerColorStart = refs.bannerColorStart;
        }
        
        if (refs.bannerColorEnd) {
            bannerColorEnd = refs.bannerColorEnd;
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
            console.log("Touche Échap détectée pendant l'enregistrement, annulation..."); // skipcq: JS-0002
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
        // Vérification rapide - si le bandeau n'est pas initialisé, inutile de continuer
        if (!recordingBanner) return;

        // Utilisation d'un mapping direct des propriétés aux variables, 
        // sans fonctions intermédiaires pour de meilleures performances
        const colorMappings = {
            bannerColorStart: false,
            bannerColorEnd: false,
            bannerOpacity: false
        };

        // Vérifier si les changements concernent les couleurs du bandeau
        let hasColorChanges = false;

        // Parcourir les changements pour identifier ceux qui concernent les couleurs
        for (const key in changes) {
            if (key in colorMappings) {
                // Mettre à jour la variable correspondante
                if (key === 'bannerColorStart') {
                    bannerColorStart = changes[key].newValue || UI_CONFIG.DEFAULT_BANNER_COLOR_START;
                    colorMappings.bannerColorStart = true;
                } else if (key === 'bannerColorEnd') {
                    bannerColorEnd = changes[key].newValue || UI_CONFIG.DEFAULT_BANNER_COLOR_END;
                    colorMappings.bannerColorEnd = true;
                } else if (key === 'bannerOpacity') {
                    // Stocker la valeur d'opacité dans une variable globale si nécessaire
                    // ou la passer directement à updateBannerColor
                    colorMappings.bannerOpacity = true;
                }
                
                hasColorChanges = true;
            }
        }

        // Si des changements de couleur ont été détectés, mettre à jour le bandeau
        if (hasColorChanges) {
            window.BabelFishAI.updateBannerColor(true);
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
        if (changes.keyboardShortcuts) {
            console.log("Raccourcis clavier mis à jour:", changes.keyboardShortcuts.newValue);
            // La mise à jour des raccourcis est gérée automatiquement par le background script
        }

        // Traiter les changements de langue
        if (changes.defaultLanguage) {
            console.log("Langue par défaut mise à jour:", changes.defaultLanguage.newValue);
            
            // Mettre à jour le sélecteur de langue dans la bannière si disponible
            const languageSelect = recordingBanner?.querySelector('.whisper-language-select');
            if (languageSelect) {
                const newLanguage = changes.defaultLanguage.newValue;
                if (newLanguage && languageSelect.querySelector(`option[value="${newLanguage}"]`)) {
                    languageSelect.value = newLanguage;
                }
            }
        }

        // Traiter les changements d'options avancées
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
            console.log("Options avancées mises à jour");
            
            // Si le mode expert est activé/désactivé, mettre à jour l'interface
            if ('enableAdvancedOptions' in changes) {
                const expertMode = changes.enableAdvancedOptions.newValue === true;
                
                // Mettre à jour les éléments de l'interface qui dépendent du mode expert
                const expertElements = document.querySelectorAll('.whisper-expert-only');
                expertElements.forEach(el => {
                    el.style.display = expertMode ? 'block' : 'none';
                });
                
                console.log(`Mode expert ${expertMode ? 'activé' : 'désactivé'}`);
            }
        }

        // Traiter les changements d'options d'affichage
        const displayOptionKeys = [
            'activeDisplay',
            'autoCopy',
            'forcedDialogDomains'
        ];

        // Vérifier si des options d'affichage ont été modifiées
        const hasDisplayChanges = displayOptionKeys.some(key => key in changes);

        if (hasDisplayChanges) {
            console.log("Options d'affichage mises à jour");
            
            // Mettre à jour les comportements d'affichage en fonction des nouvelles options
            // Ces changements seront appliqués lors du prochain affichage de transcription
        }

        // Traiter les changements d'options de traduction
        const translationOptionKeys = [
            'enableTranslation',
            'sourceLanguage',
            'targetLanguage'
        ];

        // Vérifier si des options de traduction ont été modifiées
        const hasTranslationChanges = translationOptionKeys.some(key => key in changes);

        if (hasTranslationChanges) {
            console.log("Options de traduction mises à jour");
            
            // Mettre à jour l'interface de traduction si nécessaire
            const translateButton = recordingBanner?.querySelector('#whisper-translation-control');
            const languageContainer = recordingBanner?.querySelector('.whisper-language-container');
            
            if (translateButton && 'enableTranslation' in changes) {
                // Mettre à jour l'attribut data-active pour changer l'état visuel du bouton
                translateButton.setAttribute('data-active', String(changes.enableTranslation.newValue));
                console.log(`Bouton de traduction mis à jour: ${changes.enableTranslation.newValue}`);
                
                // Gérer l'affichage du conteneur de langue en fonction de l'état de traduction
                if (languageContainer) {
                    // Animation optimisée avec requestAnimationFrame
                    if (changes.enableTranslation.newValue) {
                        // Montrer le conteneur de langue
                        languageContainer.style.display = 'flex';

                        // Utiliser rAF pour grouper les changements visuels
                        requestAnimationFrame(() => {
                            languageContainer.style.opacity = '1';
                            languageContainer.style.maxHeight = '30px';
                            languageContainer.style.overflow = 'visible';
                        });
                    } else {
                        // Cacher le conteneur de langue avec transition
                        languageContainer.style.opacity = '0';
                        languageContainer.style.maxHeight = '0';
                        languageContainer.style.overflow = 'hidden';

                        // Masquer complètement après l'animation
                        setTimeout(() => {
                            languageContainer.style.display = 'none';
                        }, 300);
                    }
                }
            }
            
            // Mettre à jour la langue cible sélectionnée si nécessaire
            if ('targetLanguage' in changes) {
                const languageSelect = recordingBanner?.querySelector('#whisper-language-select');
                if (languageSelect && languageSelect.value !== changes.targetLanguage.newValue) {
                    languageSelect.value = changes.targetLanguage.newValue;
                    console.log(`Sélecteur de langue mis à jour: ${changes.targetLanguage.newValue}`);
                }
            }
        }

        // Traiter les changements d'options de reformulation
        if ('enableRephrase' in changes) {
            console.log("Option de reformulation mise à jour:", changes.enableRephrase.newValue);
            
            // Mettre à jour l'interface de reformulation si nécessaire
            const rephraseButton = recordingBanner?.querySelector('#whisper-rephrase-control');
            if (rephraseButton) {
                // Mettre à jour l'attribut data-active pour changer l'état visuel du bouton
                rephraseButton.setAttribute('data-active', String(changes.enableRephrase.newValue));
                console.log(`Bouton de reformulation mis à jour: ${changes.enableRephrase.newValue}`);
            }
        }
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.events = {
        init,
        handleBackgroundMessages,
        handleKeyboardEvents,
        handleStorageChanges
    };

})(window.BabelFishAIUtils);
