// Utilitaire de gestion des langues pour BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Liste des langues disponibles pour la traduction
    const availableLanguages = [
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

    /**
     * Récupère toutes les langues disponibles
     * @returns {Array} Liste des langues avec value et text
     */
    function getAvailableLanguages() {
        return [...availableLanguages];
    }

    /**
     * Récupère le nom d'affichage d'une langue à partir de son code
     * @param {string} langCode - Code de la langue
     * @returns {string} Nom d'affichage de la langue
     */
    function getLanguageDisplayName(langCode) {
        const language = availableLanguages.find(lang => lang.value === langCode);
        return language ? language.text : langCode;
    }

    /**
     * Met à jour un élément select avec la liste des langues
     * @param {HTMLSelectElement} selectElement - L'élément select à mettre à jour
     * @param {string} [selectedValue] - La valeur à sélectionner par défaut
     */
    function populateLanguageSelect(selectElement, selectedValue = 'en') {
        if (!selectElement) return;
        
        // Vider le sélecteur
        selectElement.innerHTML = '';
        
        // Ajouter les options
        availableLanguages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang.value;
            option.textContent = lang.text;
            selectElement.appendChild(option);
        });
        
        // Sélectionner la valeur par défaut
        if (selectedValue) {
            selectElement.value = selectedValue;
        }
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.languages = {
        getAvailableLanguages,
        getLanguageDisplayName,
        populateLanguageSelect
    };

})(window.BabelFishAIUtils);