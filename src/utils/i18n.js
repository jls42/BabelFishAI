// Utilitaire d'internationalisation pour BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    let currentLanguage = 'fr';
    let translations = {};

    /**
     * Charge les traductions pour une langue
     * @param {string} lang - Code de la langue
     * @returns {Promise<void>}
     */
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`/_locales/${lang}/messages.json`);
            const data = await response.json();
            translations = data;
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
            // Fallback to French
            if (lang !== 'fr') {
                await loadTranslations('fr');
            }
        }
    }

    /**
     * Obtient une chaîne traduite à partir de sa clé
     * @param {string} key - La clé de traduction
     * @param {Object} [substitutions] - Les substitutions à effectuer
     * @returns {string} La chaîne traduite
     */
    function getMessage(key, substitutions = null) {
        const translation = translations[key];
        if (!translation) {
            console.warn(`Missing translation for key: ${key}`);
            return key;
        }

        let message = translation.message;
        if (substitutions) {
            Object.entries(substitutions).forEach(([key, value]) => {
                message = message.replace(`$${key}$`, value);
            });
        }
        return message;
    }

    /**
     * Change la langue de l'interface
     * @param {string} lang - Code de la langue ('fr' ou 'en')
     * @returns {Promise<void>}
     */
    async function changeLanguage(lang) {
        await loadTranslations(lang);
        currentLanguage = lang;
        await chrome.storage.sync.set({ interfaceLanguage: lang });
        translatePage();
    }

    /**
     * Traduit tous les éléments avec l'attribut data-i18n
     * @param {HTMLElement} [root=document] - L'élément racine à partir duquel traduire
     */
    function translatePage(root = document) {
        // Traduire le titre de la page
        if (document.title) {
            const titleKey = document.documentElement.getAttribute('data-i18n-title');
            if (titleKey) {
                document.title = getMessage(titleKey);
            }
        }

        // Traduire les éléments avec data-i18n
        const elements = root.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translated = getMessage(key);
            if (translated) {
                element.textContent = translated;
            }
        });

        // Traduire les placeholders avec data-i18n-placeholder
        const placeholders = root.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translated = getMessage(key);
            if (translated) {
                element.placeholder = translated;
            }
        });

        // Traduire les titres avec data-i18n-title
        const titles = root.querySelectorAll('[data-i18n-title]');
        titles.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translated = getMessage(key);
            if (translated) {
                element.title = translated;
            }
        });

        // Traduire les options des select
        const selects = root.querySelectorAll('select[data-i18n-options]');
        selects.forEach(select => {
            Array.from(select.options).forEach(option => {
                const key = option.getAttribute('data-i18n');
                if (key) {
                    option.text = getMessage(key);
                }
            });
        });
    }

    /**
     * Traduit dynamiquement un nouvel élément
     * @param {HTMLElement} element - L'élément à traduire
     * @param {string} key - La clé de traduction
     * @param {string} [type='text'] - Le type de traduction ('text', 'placeholder', 'title')
     */
    function translateElement(element, key, type = 'text') {
        const translated = getMessage(key);
        if (translated) {
            switch (type) {
                case 'placeholder':
                    element.placeholder = translated;
                    break;
                case 'title':
                    element.title = translated;
                    break;
                default:
                    element.textContent = translated;
            }
        }
    }

    /**
     * Crée un élément avec traduction
     * @param {string} tag - Le tag HTML
     * @param {string} i18nKey - La clé de traduction
     * @param {Object} [attributes] - Les attributs additionnels
     * @returns {HTMLElement} L'élément créé et traduit
     */
    function createTranslatedElement(tag, i18nKey, attributes = {}) {
        const element = document.createElement(tag);
        const translated = getMessage(i18nKey);
        if (translated) {
            element.textContent = translated;
        }
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    }

    /**
     * Initialise l'internationalisation
     */
    async function init() {
        // Charger la langue préférée depuis le stockage
        const result = await chrome.storage.sync.get({
            interfaceLanguage: chrome.i18n.getUILanguage() || 'fr'
        });

        // Charger les traductions
        await loadTranslations(result.interfaceLanguage);
        currentLanguage = result.interfaceLanguage;

        // Définir la langue sur l'élément HTML
        document.documentElement.lang = currentLanguage;

        // Traduire la page
        translatePage();

        // Observer les changements DOM pour traduire les nouveaux éléments
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            translatePage(node);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.i18n = {
        getMessage,
        changeLanguage,
        translatePage,
        translateElement,
        createTranslatedElement,
        init,
        getCurrentLanguage: () => currentLanguage
    };

    // Initialiser l'internationalisation au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(window.BabelFishAIUtils);