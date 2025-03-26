/**
 * Utilitaires pour la gestion de la bannière d'état et des contrôles associés
 * Ce module fait partie de BabelFishAI et gère l'interface utilisateur de la bannière
 */
(function (exports) {
    'use strict';

    // Aucune référence aux constantes UI n'est nécessaire dans ce module

    /**
     * Crée un bouton de contrôle pour la bannière avec icône et texte
     * @param {string} id - ID du bouton
     * @param {string} icon - Icône HTML à afficher (ex: '✨')
     * @param {string} defaultText - Texte par défaut du bouton
     * @param {string} i18nKey - Clé de traduction pour le texte du bouton
     * @returns {HTMLButtonElement} Le bouton créé
     */
    function createBannerButton(id, icon, defaultText, i18nKey) {
        const button = document.createElement('button');
        button.id = id;
        button.className = 'whisper-toggle-button';
        button.setAttribute('data-active', 'false');
        button.setAttribute('role', 'switch');
        button.setAttribute('aria-checked', 'false');

        // Ajouter l'icône
        const iconSpan = document.createElement('span');
        iconSpan.className = 'whisper-button-icon';
        iconSpan.textContent = icon;
        button.appendChild(iconSpan);

        // Ajouter le texte
        const textSpan = document.createElement('span');
        textSpan.className = 'whisper-button-text';

        // Définir le texte par défaut d'abord
        let buttonText = defaultText;

        // Essayer d'utiliser la traduction si disponible
        if (typeof window.BabelFishAIUtils?.i18n?.getMessage === 'function') {
            const translated = window.BabelFishAIUtils.i18n.getMessage(i18nKey);
            if (translated) buttonText = translated;
        }

        textSpan.textContent = buttonText;
        button.appendChild(textSpan);

        // Configurer l'accessibilité
        button.setAttribute('aria-label', buttonText);
        button.setAttribute('title', buttonText);

        // Ajouter le comportement de focus pour l'accessibilité
        button.addEventListener('focus', () => {
            button.classList.add('focus');
        });

        button.addEventListener('blur', () => {
            button.classList.remove('focus');
        });

        return button;
    }

    /**
     * Crée un sélecteur de langue pour la bannière
     * @returns {Object} Un objet contenant le conteneur, le sélecteur et le libellé
     */
    function createLanguageSelector() {
        // Créer le conteneur
        const container = document.createElement('div');
        container.className = 'whisper-language-container';
        container.style.display = 'none'; // Masqué par défaut

        // Créer le libellé
        const label = document.createElement('span'); // Utiliser span pour la compatibilité
        label.className = 'whisper-language-label';
        label.textContent = 'Langue cible:';  // Texte par défaut
        container.appendChild(label);

        // Mettre à jour le libellé avec i18n
        const updateLabel = () => {
            if (typeof window.BabelFishAIUtils?.i18n?.getMessage === 'function') {
                const translated = window.BabelFishAIUtils.i18n.getMessage("targetLanguageLabel");
                if (translated) label.textContent = translated;
            }
        };

        // Mettre à jour immédiatement et lors du chargement de i18n
        updateLabel();
        document.addEventListener('babelfishai:i18n-loaded', updateLabel);

        // Créer le sélecteur
        const select = document.createElement('select');
        select.id = 'whisper-language-select';
        select.className = 'whisper-language-select';
        container.appendChild(select);

        return { container, select, label };
    }

    /**
     * Initialise le sélecteur de langues avec les options disponibles
     * @param {HTMLSelectElement} languageSelect - L'élément select à initialiser
     */
    function initializeLanguageSelector(languageSelect) {
        // Vérifier si le sélecteur existe
        if (!languageSelect) return;

        // Utiliser directement les langues disponibles définies dans languages-shared.js
        const availableLanguages = window.BabelFishAI?.AVAILABLE_LANGUAGES || [
            { value: 'en', text: 'English (en)' },
            { value: 'fr', text: 'Français (fr)' },
            { value: 'es', text: 'Español (es)' },
            { value: 'pt', text: 'Português (pt)' },
            { value: 'zh', text: '中文 (zh)' },
            { value: 'hi', text: 'हिंदी (hi)' },
            { value: 'ar', text: 'العربية (ar)' },
            { value: 'it', text: 'Italiano (it)' },
            { value: 'de', text: 'Deutsch (de)' },
            { value: 'sv', text: 'Svenska (sv)' },
            { value: 'pl', text: 'Polski (pl)' },
            { value: 'nl', text: 'Nederlands (nl)' },
            { value: 'ro', text: 'Română (ro)' },
            { value: 'ja', text: '日本語 (ja)' },
            { value: 'ko', text: '한국어 (ko)' }
        ];

        // Remplir le sélecteur avec les langues disponibles
        populateLanguageSelect(languageSelect, availableLanguages);
    }

    /**
     * Remplit le sélecteur de langues avec les options fournies
     * @param {HTMLSelectElement} select - Le sélecteur à remplir
     * @param {Array} options - Les options de langues
     */
    function populateLanguageSelect(select, options) {
        // Vider le sélecteur d'abord
        select.innerHTML = '';

        // Récupérer la langue cible actuelle
        chrome.storage.sync.get({ targetLanguage: 'en' }, (items) => {
            // Ajouter chaque option
            options.forEach(option => {
                const optElement = document.createElement('option');
                // Gérer les deux formats possibles (code/value et name/text)
                optElement.value = option.code || option.value;
                optElement.textContent = option.name || option.text;
                select.appendChild(optElement);
            });

            // Trier les options par ordre alphabétique du texte visible
            const sortedOptions = Array.from(select.options);
            sortedOptions.sort((a, b) => a.textContent.localeCompare(b.textContent));

            // Reconstruire le sélecteur avec les options triées
            select.innerHTML = '';
            sortedOptions.forEach(option => select.appendChild(option));

            // Sélectionner la langue active
            select.value = items.targetLanguage;
        });
    }

    /**
     * Remplit le sélecteur de langues à partir du module languages ou en fallback
     * @param {HTMLSelectElement} select - Le sélecteur à remplir
     */
    function populateLanguageFromStorage(select) {
        try {
            // Essayer d'abord de récupérer les langues depuis le stockage
            chrome.storage.local.get(['availableLanguages'], (storageResult) => {
                if (storageResult.availableLanguages && Array.isArray(storageResult.availableLanguages)) {
                    // Formater les langues pour le sélecteur
                    const options = storageResult.availableLanguages.map(lang => ({
                        code: lang.code,
                        name: lang.name || lang.code.toUpperCase()
                    }));

                    populateLanguageSelect(select, options);
                } else {
                    // Fallback: Utiliser les langues définies dans languages-shared.js
                    const fallbackLanguages = window.BabelFishAI?.AVAILABLE_LANGUAGES || [
                        { value: 'en', text: 'English (en)' },
                        { value: 'fr', text: 'Français (fr)' },
                        { value: 'es', text: 'Español (es)' },
                        { value: 'pt', text: 'Português (pt)' },
                        { value: 'zh', text: '中文 (zh)' },
                        { value: 'hi', text: 'हिंदी (hi)' },
                        { value: 'ar', text: 'العربية (ar)' },
                        { value: 'it', text: 'Italiano (it)' },
                        { value: 'de', text: 'Deutsch (de)' },
                        { value: 'sv', text: 'Svenska (sv)' },
                        { value: 'pl', text: 'Polski (pl)' },
                        { value: 'nl', text: 'Nederlands (nl)' },
                        { value: 'ro', text: 'Română (ro)' },
                        { value: 'ja', text: '日本語 (ja)' },
                        { value: 'ko', text: '한국어 (ko)' }
                    ];
                    const options = fallbackLanguages.map(lang => ({
                        code: lang.value,
                        name: lang.text
                    }));

                    populateLanguageSelect(select, options);
                }

                // Récupérer la langue cible actuelle et la définir
                chrome.storage.sync.get(['targetLanguage'], (result) => {
                    if (result.targetLanguage) {
                        select.value = result.targetLanguage;
                    } else {
                        // Langue par défaut si aucune n'est définie
                        const defaultLang = 'en';
                        select.value = defaultLang;
                        // Sauvegarder la langue par défaut
                        chrome.storage.sync.set({ targetLanguage: defaultLang });
                    }
                });
            });
        } catch (error) {
            console.error('Erreur lors du remplissage du sélecteur de langues:', error);
        }
    }

    /**
     * Configure les gestionnaires d'événements pour les contrôles de la bannière
     * @param {HTMLButtonElement} rephraseButton - Bouton de reformulation
     * @param {HTMLButtonElement} translateButton - Bouton de traduction
     * @param {HTMLSelectElement} languageSelect - Sélecteur de langue
     * @param {HTMLElement} languageContainer - Conteneur du sélecteur de langue
     */
    function setupBannerEventListeners(rephraseButton, translateButton, languageSelect, languageContainer) {
        // Événements pour le bouton de reformulation
        rephraseButton.addEventListener('mousedown', window.BabelFishAIUtils.focus.storeFocusAndSelection);
        rephraseButton.addEventListener('click', () => {
            const isActive = rephraseButton.getAttribute('data-active') === 'true';
            const newState = !isActive;

            // Stocker la référence à la fonction avant d'utiliser setTimeout
            const restoreFunction = window.BabelFishAIUtils.focus.restoreFocusAndSelection;

            chrome.storage.sync.set({ enableRephrase: newState }, () => {
                // Vérifier si la fonction existe toujours avant de l'appeler
                if (typeof restoreFunction === 'function') {
                    setTimeout(() => restoreFunction(true, true), 300);
                }
            });

            // Mettre à jour l'état visuel
            rephraseButton.setAttribute('data-active', String(newState));
            rephraseButton.setAttribute('aria-checked', String(newState));
        });

        // Événements pour le bouton de traduction
        translateButton.addEventListener('mousedown', window.BabelFishAIUtils.focus.storeFocusAndSelection);
        translateButton.addEventListener('click', () => {
            const isActive = translateButton.getAttribute('data-active') === 'true';
            const newState = !isActive;

            // Stocker la référence à la fonction avant d'utiliser setTimeout
            const restoreFunction = window.BabelFishAIUtils.focus.restoreFocusAndSelection;

            chrome.storage.sync.set({ enableTranslation: newState }, () => {
                // Vérifier si la fonction existe toujours avant de l'appeler
                if (typeof restoreFunction === 'function') {
                    setTimeout(() => restoreFunction(true, true), 300);
                }
            });

            // Mettre à jour l'état visuel
            translateButton.setAttribute('data-active', String(newState));
            translateButton.setAttribute('aria-checked', String(newState));

            // Afficher/masquer le sélecteur de langue
            if (newState) {
                languageContainer.style.display = 'flex';
                languageContainer.style.opacity = '1';
                languageContainer.style.maxHeight = '30px';
                languageContainer.style.overflow = 'visible';
            } else {
                languageContainer.style.display = 'none';
                languageContainer.style.opacity = '0';
                languageContainer.style.maxHeight = '0';
                languageContainer.style.overflow = 'hidden';
            }
        });

        // Événements pour le sélecteur de langue
        languageSelect.addEventListener('mousedown', window.BabelFishAIUtils.focus.storeFocusAndSelection);
        languageSelect.addEventListener('change', () => {
            chrome.storage.sync.set({ targetLanguage: languageSelect.value }, () => {
                setTimeout(() => window.BabelFishAIUtils.focus.restoreFocusAndSelection(true, true), 300);
            });
        });

        // Gestion de la perte de focus du sélecteur de langue
        languageSelect.addEventListener('blur', () => {
            setTimeout(() => {
                // Appeler directement la fonction de restauration du focus
                // sans vérifier lastFocusInfo qui n'est pas exporté
                window.BabelFishAIUtils.focus.restoreFocusAndSelection(true, true);
            }, 300);
        });

        // Mettre à jour la visibilité du sélecteur de langue en fonction de l'état de la traduction
        chrome.storage.onChanged.addListener((changes) => {
            if (changes.enableTranslation) {
                const newValue = changes.enableTranslation.newValue;
                translateButton.setAttribute('data-active', newValue.toString());

                if (newValue) {
                    languageContainer.style.display = 'flex';
                    languageContainer.style.opacity = '1';
                    languageContainer.style.maxHeight = '30px';
                    languageContainer.style.overflow = 'visible';
                } else {
                    languageContainer.style.display = 'none';
                    languageContainer.style.opacity = '0';
                    languageContainer.style.maxHeight = '0';
                    languageContainer.style.overflow = 'hidden';
                }
            }

            if (changes.enableRephrase) {
                rephraseButton.setAttribute('data-active', changes.enableRephrase.newValue.toString());
            }
        });
    }

    /**
     * Initialise la bannière d'état avec des contrôles pour la reformulation et la traduction
     * @returns {HTMLElement} La bannière créée
     */
    function initBanner() {
        // Ne pas vérifier si la bannière existe déjà, cette vérification est faite dans content.js
        // qui maintient la référence à recordingBanner

        // Créer la bannière principale
        const banner = document.createElement('div');
        banner.id = 'babelfishai-status-banner'; // Utiliser le même ID que dans l'ancienne implémentation
        banner.className = 'whisper-status-banner';
        banner.style.display = 'none';
        banner.setAttribute('role', 'status');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('data-extension', 'babelfishai'); // Ajouter l'attribut data-extension

        // Fonction pour configurer le contenu de la bannière une fois les traductions chargées
        const setupBannerContent = () => {

            // Créer le conteneur pour tous les éléments (whisper-banner-content)
            const bannerContent = document.createElement('div');
            bannerContent.className = 'whisper-banner-content';
            banner.appendChild(bannerContent);

            // Créer le conteneur de texte
            const textContainer = document.createElement('div');
            textContainer.className = 'whisper-status-text';
            // Utiliser une valeur par défaut si la traduction n'est pas disponible
            textContainer.textContent = "Initialisation...";
            // Essayer d'utiliser la traduction si disponible
            if (typeof window.BabelFishAIUtils?.i18n?.getMessage === 'function') {
                const translated = window.BabelFishAIUtils.i18n.getMessage("bannerRecording");
                if (translated) textContainer.textContent = translated;
            }
            bannerContent.appendChild(textContainer);

            // Créer le conteneur de contrôles
            const controlsContainer = document.createElement('div');
            controlsContainer.className = 'whisper-controls-container';
            bannerContent.appendChild(controlsContainer);

            // Créer le bouton de reformulation
            const rephraseButton = createBannerButton(
                'whisper-rephrase-control',
                '✨',
                'Reformuler',  // Texte par défaut en français
                'rephraseLabel'  // Clé correcte du fichier de traduction
            );
            controlsContainer.appendChild(rephraseButton);

            // Créer le bouton de traduction
            const translateButton = createBannerButton(
                'whisper-translate-control',
                '🌐',
                'Traduire',  // Texte par défaut en français
                'enableTranslationLabel'  // Clé correcte du fichier de traduction
            );
            controlsContainer.appendChild(translateButton);

            // Créer le sélecteur de langue
            const { container: languageContainer, select: languageSelect } = createLanguageSelector();
            controlsContainer.appendChild(languageContainer);

            // Initialiser le sélecteur de langues
            initializeLanguageSelector(languageSelect);

            // Configurer les gestionnaires d'événements
            setupBannerEventListeners(rephraseButton, translateButton, languageSelect, languageContainer);

            // Récupérer les préférences de l'utilisateur pour l'état initial des boutons
            chrome.storage.sync.get(['enableRephrase', 'enableTranslation'], (result) => {
                // Définir l'état initial du bouton de reformulation
                if (result.enableRephrase) {
                    rephraseButton.setAttribute('data-active', 'true');
                    rephraseButton.setAttribute('aria-checked', 'true');
                }

                // Définir l'état initial du bouton de traduction et du conteneur de langue
                if (result.enableTranslation) {
                    translateButton.setAttribute('data-active', 'true');
                    translateButton.setAttribute('aria-checked', 'true');

                    // Afficher le sélecteur de langue
                    languageContainer.style.display = 'flex';
                    languageContainer.style.opacity = '1';
                    languageContainer.style.maxHeight = '30px';
                    languageContainer.style.overflow = 'visible';
                }
            });

            // Ne pas ajouter la bannière au document, cela sera fait par content.js
            // document.body.appendChild(banner);
        };

        // Vérifier si les traductions sont déjà chargées
        if (typeof window.BabelFishAIUtils?.i18n?.getMessage === 'function') {
            // Si les traductions sont déjà chargées, initialiser immédiatement
            setupBannerContent();
        } else {
            // Sinon, attendre l'événement de chargement des traductions
            document.addEventListener('babelfishai:i18n-loaded', setupBannerContent, { once: true });
        }

        // Ne pas ajouter de styles CSS ici car ils sont déjà définis dans content.css
        // Les styles sont chargés via le fichier CSS externe

        return banner;
    }

    /**
     * Met à jour la couleur de la bannière avec un dégradé personnalisé ou en fonction du type
     * @param {HTMLElement} banner - L'élément bannière à mettre à jour
     * @param {string} startColor - Couleur de début du dégradé ou type de message ('info', 'error', 'recording', etc.)
     * @param {string} endColor - Couleur de fin du dégradé
     * @param {number} opacity - Opacité (0-100)
     * @param {boolean} [force=false] - Forcer la mise à jour même si la bannière est en mode erreur
     */
    function updateBannerColor(banner, startColor, endColor, opacity, force = false) {
        if (!banner) return;

        // Si le deuxième paramètre est une chaîne courte, c'est probablement un type et non une couleur
        if (typeof startColor === 'string' && startColor.length < 10 && !startColor.startsWith('#')) {
            // Mode compatibilité avec l'ancienne fonction : startColor est utilisé comme type
            const type = startColor;

            setBannerType(banner, type);

            return;
        }

        // Utiliser la fonction de l'utilitaire UI pour mettre à jour la couleur avec le dégradé
        if (typeof window.BabelFishAIUtils?.ui?.updateBannerColor === 'function') {
            window.BabelFishAIUtils.ui.updateBannerColor(banner, startColor, endColor, opacity, force);
        } else {
            console.warn('La fonction updateBannerColor de UI n\'est pas disponible');
        }
    }

    /**
     * Définit le type de bannière (erreur, enregistrement, succès, avertissement)
     * @param {HTMLElement} banner - L'élément bannière
     * @param {string} type - Le type de bannière
     */
    function setBannerType(banner, type) {
        // Réinitialiser les classes
        banner.classList.remove('error', 'recording', 'success', 'warning');

        // Ajouter la classe appropriée
        if (type) {
            banner.classList.add(type);
        }
    }

    /**
     * Met à jour le texte affiché dans la bannière
     * @param {HTMLElement} banner - L'élément bannière à mettre à jour
     * @param {string} text - Le texte à afficher
     */
    function updateBannerText(banner, text) {
        if (!banner) return;

        // Chercher l'élément de texte avec la classe appropriée
        const textContainer = banner.querySelector('.whisper-status-text');
        if (textContainer) {
            textContainer.textContent = text;
        } else {
            console.warn("Message text container not found in banner", banner);
        }
    }

    /**
     * Affiche ou masque la bannière
     * @param {HTMLElement} banner - L'élément bannière à afficher/masquer
     * @param {boolean} show - Indique si la bannière doit être affichée (true) ou masquée (false)
     */
    function toggleBannerVisibility(banner, show) {
        if (!banner) return;

        banner.style.display = show ? 'flex' : 'none';
    }

    /**
     * Affiche la bannière avec un message spécifique
     * @param {HTMLElement} banner - L'élément bannière à afficher
     * @param {string} text - Le texte à afficher
     * @param {string} type - Le type de message ('info' ou 'error')
     * @param {boolean} isRecording - Indique si l'enregistrement est en cours
     * @param {Function} updateColorCallback - Fonction pour mettre à jour la couleur de la bannière
     * @returns {boolean} - Indique si l'affichage a réussi
     */
    function showBanner(banner, text, type, isRecording, updateColorCallback) {
        try {
            if (!banner) return false;

            // Mettre à jour le texte de la bannière
            updateBannerText(banner, text);

            // Afficher la bannière
            toggleBannerVisibility(banner, true);

            // Mettre à jour la couleur en fonction du type de message
            if (typeof updateColorCallback === 'function') {
                updateColorCallback(true);
            }

            return true;
        } catch (error) {
            console.error("Error showing banner:", error);
            return false;
        }
    }

    /**
     * Affiche un message d'état dans la bannière
     * @param {HTMLElement} banner - L'élément bannière à utiliser
     * @param {string} message - Le message à afficher
     * @param {string} [type='info'] - Le type de message ('info', 'error', 'recording', etc.)
     * @returns {boolean} - Indique si l'affichage a réussi
     */
    function showStatus(banner, message, type = 'info') {
        try {
            if (!banner) return false;

            updateBannerText(banner, message);
            updateBannerColor(banner, type);
            toggleBannerVisibility(banner, true);
            return true;
        } catch (error) {
            console.error("Error showing status:", error);
            return false;
        }
    }

    // Exporter les fonctions dans l'espace de noms BabelFishAIUtils
    exports.banner = {
        createBannerButton,
        createLanguageSelector,
        initializeLanguageSelector,
        populateLanguageSelect,
        populateLanguageFromStorage,
        setupBannerEventListeners,
        initBanner,
        updateBannerColor,
        updateBannerText,
        showBanner,
        showStatus,
        toggleBannerVisibility
    };

})(window.BabelFishAIUtils = window.BabelFishAIUtils || {});
