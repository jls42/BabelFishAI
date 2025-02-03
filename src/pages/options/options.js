// Script de gestion des options
document.addEventListener('DOMContentLoaded', async () => {
    const i18n = window.BabelFishAIUtils.i18n;

    // Éléments du DOM
    const apiKeyInput = document.getElementById('apiKey');
    const toggleApiKeyButton = document.getElementById('toggleApiKey');
    const activeDisplayCheckbox = document.getElementById('activeDisplay');
    const dialogDisplayCheckbox = document.getElementById('dialogDisplay');
    const dialogDurationInput = document.getElementById('dialogDuration');
    const bannerColorStartInput = document.getElementById('bannerColorStart');
    const bannerColorEndInput = document.getElementById('bannerColorEnd');
    const bannerOpacityInput = document.getElementById('bannerOpacity');
    const colorPreview = document.getElementById('colorPreview');
    const enableTranslationCheckbox = document.getElementById('enableTranslation');
    const translationOptions = document.getElementById('translationOptions');
    const sourceLanguageSelect = document.getElementById('sourceLanguage');
    const targetLanguageSelect = document.getElementById('targetLanguage');
    const expertModeCheckbox = document.getElementById('expertMode');
    const expertOptions = document.getElementById('expertOptions');
    const modelTypeSelect = document.getElementById('modelType');
    const apiUrlInput = document.getElementById('apiUrl');
    const translationApiUrlInput = document.getElementById('translationApiUrl');
    const newDomainInput = document.getElementById('newDomain');
    const addDomainButton = document.getElementById('addDomain');
    const domainsList = document.getElementById('domainsList');
    const saveButton = document.getElementById('save');
    const statusElement = document.getElementById('status');
    const interfaceLanguageSelect = document.getElementById('interfaceLanguage');

    // Initialiser la langue de l'interface
    const currentLang = await new Promise(resolve => {
        chrome.storage.sync.get({
            interfaceLanguage: chrome.i18n.getUILanguage() || 'fr'
        }, result => resolve(result.interfaceLanguage));
    });

    interfaceLanguageSelect.value = currentLang;

    // Charger les options sauvegardées
    function loadOptions() {
        chrome.storage.sync.get({
            apiKey: '',
            activeDisplay: true,
            dialogDisplay: false,
            dialogDuration: 15,
            bannerColorStart: '#684054',
            bannerColorEnd: '#4c7b8d',
            bannerOpacity: 80,
            enableTranslation: false,
            sourceLanguage: 'fr',
            targetLanguage: 'en',
            expertMode: false,
            modelType: 'gpt-4o-mini',
            apiUrl: 'https://api.openai.com/v1/audio/transcriptions',
            translationApiUrl: 'https://api.openai.com/v1/chat/completions',
            forcedDialogDomains: ['chat.google.com']
        }, (items) => {
            apiKeyInput.value = items.apiKey;
            activeDisplayCheckbox.checked = items.activeDisplay;
            dialogDisplayCheckbox.checked = items.dialogDisplay;
            dialogDurationInput.value = items.dialogDuration;
            bannerColorStartInput.value = items.bannerColorStart;
            bannerColorEndInput.value = items.bannerColorEnd;
            bannerOpacityInput.value = items.bannerOpacity;
            enableTranslationCheckbox.checked = items.enableTranslation;
            sourceLanguageSelect.value = items.sourceLanguage;
            targetLanguageSelect.value = items.targetLanguage;
            expertModeCheckbox.checked = items.expertMode;
            modelTypeSelect.value = items.modelType;
            apiUrlInput.value = items.apiUrl;
            translationApiUrlInput.value = items.translationApiUrl;

            // Mettre à jour les états dépendants
            updateTranslationOptionsVisibility();
            updateExpertOptionsVisibility();
            updateColorPreview();
            displayForcedDomains(items.forcedDialogDomains);
        });
    }

    // Sauvegarder les options
    function saveOptions() {
        const options = {
            apiKey: apiKeyInput.value,
            activeDisplay: activeDisplayCheckbox.checked,
            dialogDisplay: dialogDisplayCheckbox.checked,
            dialogDuration: parseInt(dialogDurationInput.value),
            bannerColorStart: bannerColorStartInput.value,
            bannerColorEnd: bannerColorEndInput.value,
            bannerOpacity: parseInt(bannerOpacityInput.value),
            enableTranslation: enableTranslationCheckbox.checked,
            sourceLanguage: sourceLanguageSelect.value,
            targetLanguage: targetLanguageSelect.value,
            expertMode: expertModeCheckbox.checked,
            modelType: modelTypeSelect.value,
            apiUrl: apiUrlInput.value,
            translationApiUrl: translationApiUrlInput.value,
            forcedDialogDomains: Array.from(domainsList.children).map(item =>
                item.textContent.replace('×', '').trim()
            )
        };

        chrome.storage.sync.set(options, () => {
            showStatus(i18n.getMessage('savedMessage'), 'success');
        });
    }

    // Gérer le changement de langue
    async function handleLanguageChange() {
        const newLang = interfaceLanguageSelect.value;
        await i18n.changeLanguage(newLang);
        showStatus(i18n.getMessage('languageChanged'), 'success');
    }

    // Afficher un message de statut
    function showStatus(message, type = 'success') {
        statusElement.textContent = message;
        statusElement.className = `status ${type}`;
        statusElement.style.display = 'block';
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 2000);
    }

    // Mettre à jour la visibilité des options de traduction
    function updateTranslationOptionsVisibility() {
        translationOptions.style.display = enableTranslationCheckbox.checked ? 'block' : 'none';
    }

    // Mettre à jour la visibilité des options expert
    function updateExpertOptionsVisibility() {
        expertOptions.style.display = expertModeCheckbox.checked ? 'block' : 'none';
    }

    // Mettre à jour l'aperçu des couleurs
    function updateColorPreview() {
        const startColor = bannerColorStartInput.value;
        const endColor = bannerColorEndInput.value;
        const opacity = bannerOpacityInput.value / 100;

        try {
            const startR = parseInt(startColor.substr(1, 2), 16);
            const startG = parseInt(startColor.substr(3, 2), 16);
            const startB = parseInt(startColor.substr(5, 2), 16);
            const endR = parseInt(endColor.substr(1, 2), 16);
            const endG = parseInt(endColor.substr(3, 2), 16);
            const endB = parseInt(endColor.substr(5, 2), 16);

            colorPreview.style.background = `linear-gradient(45deg,
                rgba(${startR}, ${startG}, ${startB}, ${opacity}),
                rgba(${endR}, ${endG}, ${endB}, ${opacity}))`;
        } catch (error) {
            console.error('Error updating color preview:', error);
        }
    }

    // Afficher les domaines forcés
    function displayForcedDomains(domains) {
        domainsList.innerHTML = '';
        domains.forEach(domain => {
            const item = document.createElement('div');
            item.className = 'domain-item';
            item.textContent = domain;

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-domain-button';
            removeButton.textContent = '×';
            removeButton.onclick = () => item.remove();

            item.appendChild(removeButton);
            domainsList.appendChild(item);
        });
    }

    // Ajouter un nouveau domaine
    function addDomain() {
        const domain = newDomainInput.value.trim();
        if (domain) {
            const item = document.createElement('div');
            item.className = 'domain-item';
            item.textContent = domain;

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-domain-button';
            removeButton.textContent = '×';
            removeButton.onclick = () => item.remove();

            item.appendChild(removeButton);
            domainsList.appendChild(item);
            newDomainInput.value = '';
        }
    }

    // Basculer la visibilité de la clé API
    function toggleApiKeyVisibility() {
        const type = apiKeyInput.type;
        apiKeyInput.type = type === 'password' ? 'text' : 'password';
        toggleApiKeyButton.textContent = type === 'password' ? '🔒' : '👁️';
    }

    // Event listeners
    interfaceLanguageSelect.addEventListener('change', handleLanguageChange);
    saveButton.addEventListener('click', saveOptions);
    toggleApiKeyButton.addEventListener('click', toggleApiKeyVisibility);
    enableTranslationCheckbox.addEventListener('change', updateTranslationOptionsVisibility);
    expertModeCheckbox.addEventListener('change', updateExpertOptionsVisibility);
    addDomainButton.addEventListener('click', addDomain);

    // Event listeners pour l'aperçu des couleurs
    bannerColorStartInput.addEventListener('input', updateColorPreview);
    bannerColorEndInput.addEventListener('input', updateColorPreview);
    bannerOpacityInput.addEventListener('input', updateColorPreview);

    // Initialiser l'internationalisation et charger les options
    await i18n.init();
    loadOptions();
});
