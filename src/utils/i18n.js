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
            const response = await fetch(chrome.runtime.getURL(`_locales/${lang}/messages.json`));
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
        // Remplacer les placeholders dans les messages de traduction
        processTranslationPlaceholders();
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
                const sanitized = sanitizeHTML(translated);
                const parser = new DOMParser();
                const doc = parser.parseFromString(sanitized, 'text/html');
                const fragment = document.createDocumentFragment();
                doc.body.childNodes.forEach(node => {
                    fragment.appendChild(node.cloneNode(true));
                });
                element.replaceChildren(fragment);
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
         * Remplace les placeholders dans un message
         * @param {string} message - Le message original
         * @param {Object} placeholders - Un objet contenant les placeholders et leurs valeurs
         * @returns {string} Le message avec les placeholders remplacés
         */
    function replacePlaceholders(message, placeholders) {
        let newMessage = message;
        for (const key in placeholders) {
            if (Object.prototype.hasOwnProperty.call(placeholders, key)) {
                const escapedKey = escapeRegExp(key);
                newMessage = newMessage.replaceAll(`{${escapedKey}}`, placeholders[key]);
            }
        }
        return newMessage;
    }

    /**
     * Escapes special characters in a string for use in a regular expression.
     * @param {string} string - The string to escape.
     * @returns {string} The escaped string.
     */
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    /**
     * Traite les placeholders dans les messages de traduction
     */
    function processTranslationPlaceholders() {
        for (const key in translations) {
            if (Object.prototype.hasOwnProperty.call(translations, key)) {
                const placeholders = {
                    defaultAudioModel: getMessage('defaultAudioModel'),
                    defaultTranslationModel: getMessage('defaultTranslationModel')
                };
                translations[key].message = replacePlaceholders(translations[key].message, placeholders);
            }
        }
    }

    /**
     * Sanitize HTML content to prevent XSS attacks while preserving legitimate HTML and attributes
     * @param {string} html - The HTML content to sanitize
     * @returns {string} - Sanitized HTML
     */
    function sanitizeHTML(html) {
        if (!html) return '';

        // Use a more comprehensive approach that preserves attributes
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
        const container = doc.body.firstChild;

        // Define allowed tags and attributes
        const allowedTags = ['a', 'b', 'i', 'strong', 'em', 'br', 'span', 'p', 'ul', 'ol', 'li', 'img', 'div'];
        const allowedAttributes = {
            // Global attributes allowed on any element
            all: ['class', 'id', 'style', 'title'],
            // Element-specific attributes
            a: ['href', 'target', 'rel'],
            img: ['src', 'alt', 'width', 'height'],
        };

        // Function to sanitize a DOM node and its children
        function sanitizeNode(node) {
            // If this is a text node, it's safe
            if (node.nodeType === Node.TEXT_NODE) {
                return node.cloneNode(true);
            }

            // If not an element node, skip it
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return document.createDocumentFragment();
            }

            const tagName = node.tagName.toLowerCase();

            // If the tag is not in our allowed list, just take its text content
            if (!allowedTags.includes(tagName)) {
                const text = document.createTextNode(node.textContent);
                return text;
            }

            // Create a new element that we'll build up with allowed attributes
            const newElement = document.createElement(tagName);

            // Add allowed global attributes
            allowedAttributes.all.forEach(attr => {
                if (node.hasAttribute(attr)) {
                    newElement.setAttribute(attr, node.getAttribute(attr));
                }
            });

            // Add element-specific attributes
            if (allowedAttributes[tagName]) {
                allowedAttributes[tagName].forEach(attr => {
                    if (node.hasAttribute(attr)) {
                        // Special handling for links
                        if (tagName === 'a' && attr === 'href') {
                            const href = node.getAttribute(attr);
                            // Only allow http, https, and mailto protocols
                            if (href.startsWith('http:') || href.startsWith('https:') || href.startsWith('mailto:')) {
                                newElement.setAttribute(attr, href);
                            }
                        } else {
                            newElement.setAttribute(attr, node.getAttribute(attr));
                        }
                    }
                });
            }

            // If it's an anchor, ensure it has noopener
            if (tagName === 'a' && newElement.hasAttribute('target') && newElement.getAttribute('target') === '_blank') {
                newElement.setAttribute('rel', 'noopener noreferrer');
            }

            // Recursively sanitize child nodes
            Array.from(node.childNodes).forEach(child => {
                const sanitizedChild = sanitizeNode(child);
                newElement.appendChild(sanitizedChild);
            });

            return newElement;
        }

        // Process all nodes in the container
        const fragment = document.createDocumentFragment();
        Array.from(container.childNodes).forEach(child => {
            fragment.appendChild(sanitizeNode(child));
        });

        // Create a temporary div to get the HTML string
        const output = document.createElement('div');
        output.appendChild(fragment);

        return output.innerHTML;
    }

    /**
     * Initialise l'internationalisation
     */
    async function init() {
        // Charger la langue préférée depuis le stockage, utiliser getUILanguage comme fallback
        const result = await chrome.storage.sync.get(['interfaceLanguage']);
        const userLanguage = result.interfaceLanguage || chrome.i18n.getUILanguage();

        // Charger les traductions
        await loadTranslations(userLanguage);
        currentLanguage = userLanguage;

        // Définir la langue sur l'élément HTML
        document.documentElement.lang = currentLanguage;

        // Remplacer les placeholders dans les messages de traduction
        processTranslationPlaceholders();

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