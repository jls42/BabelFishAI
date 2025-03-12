// Script de gestion des options
document.addEventListener('DOMContentLoaded', async () => {
    const i18n = window.BabelFishAIUtils.i18n;

    // Éléments du DOM
    const apiKeyInput = document.getElementById('apiKey');
    const toggleApiKeyButton = document.getElementById('toggleApiKey');
    const activeDisplayCheckbox = document.getElementById('activeDisplay');
    const dialogDisplayCheckbox = document.getElementById('dialogDisplay');
    const dialogDurationInput = document.getElementById('dialogDuration');
    const autoCopyCheckbox = document.getElementById('autoCopy');
    const bannerColorStartInput = document.getElementById('bannerColorStart');
    const bannerColorEndInput = document.getElementById('bannerColorEnd');
    const bannerOpacityInput = document.getElementById('bannerOpacity');
    const colorPreview = document.getElementById('colorPreview');
    const enableRephraseCheckbox = document.getElementById('enableRephrase');
    const enableTranslationCheckbox = document.getElementById('enableTranslation');
    const translationOptions = document.getElementById('translationOptions');
    const sourceLanguageSelect = document.getElementById('sourceLanguage');
    const targetLanguageSelect = document.getElementById('targetLanguage');
    const expertModeCheckbox = document.getElementById('expertMode');
    const expertOptions = document.getElementById('expertOptions');
    const modelTypeSelect = document.getElementById('modelType');
    const disableLoggingCheckbox = document.getElementById('disableLogging');
    const newModelTypeInput = document.getElementById('newModelType');
    const addModelTypeButton = document.getElementById('addModelType');
    const customModelsList = document.getElementById('customModelsList');
    const audioModelTypeSelect = document.getElementById('audioModelType');
    const apiUrlInput = document.getElementById('apiUrl');
    const translationApiUrlInput = document.getElementById('translationApiUrl');
    const newDomainInput = document.getElementById('newDomain');
    const addDomainButton = document.getElementById('addDomain');
    const domainsList = document.getElementById('domainsList');
    const saveButton = document.getElementById('save');
    const saveAdvancedButton = document.getElementById('saveAdvanced');
    const statusElement = document.getElementById('status');
    const interfaceLanguageSelect = document.getElementById('interfaceLanguage');
    const advancedHeader = document.getElementById('advancedHeader');
    const toggleAdvancedButton = document.getElementById('toggleAdvanced');
    const advancedOptions = document.getElementById('advancedOptions');

    // État du mode avancé
    let isAdvancedVisible = false;

    // Fonction pour valider une URL HTTPS
    function isValidHttpsUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    // Gestion du mode avancé
    function toggleAdvancedSection() {
        isAdvancedVisible = !isAdvancedVisible;
        toggleAdvancedButton.textContent = isAdvancedVisible ? '▲' : '▼';
        toggleAdvancedButton.classList.toggle('active', isAdvancedVisible);
        advancedOptions.classList.toggle('visible', isAdvancedVisible);

        // Faire défiler jusqu'au bouton de sauvegarde si la section est ouverte
        if (isAdvancedVisible) {
            setTimeout(() => {
                saveAdvancedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        }
    }

    // Initialiser la langue de l'interface
    const currentLang = await new Promise(resolve => {
        chrome.storage.sync.get({
            interfaceLanguage: null // On initialise à null pour vérifier si une valeur existe
        }, result => {
            // Si interfaceLanguage est null, on utilise la langue du navigateur
            resolve(result.interfaceLanguage || chrome.i18n.getUILanguage());
        });
    });

    interfaceLanguageSelect.value = currentLang;

    // Charger les options sauvegardées
    function loadOptions() {
        chrome.storage.sync.get({
            apiKey: '',
            activeDisplay: true,
            dialogDisplay: false,
            dialogDuration: 15,
            autoCopy: false,
            disableLogging: false,
            bannerColorStart: '#684054',
            bannerColorEnd: '#4c7b8d',
            bannerOpacity: 80,
            enableRephrase: false,
            enableTranslation: false,
            sourceLanguage: 'auto',
            targetLanguage: 'en',
            expertMode: false,
            modelType: 'gpt-4o-mini',
            customModelTypes: [],
            audioModelType: window.BabelFishAIConstants.API_CONFIG.WHISPER_MODEL,
            apiUrl: 'https://api.openai.com/v1/audio/transcriptions',
            translationApiUrl: 'https://api.openai.com/v1/chat/completions',
            forcedDialogDomains: ['chat.google.com']
        }, (items) => {
            apiKeyInput.value = items.apiKey;
            activeDisplayCheckbox.checked = items.activeDisplay;
            dialogDisplayCheckbox.checked = items.dialogDisplay;
            dialogDurationInput.value = items.dialogDuration;
            autoCopyCheckbox.checked = items.autoCopy;
            bannerColorStartInput.value = items.bannerColorStart;
            bannerColorEndInput.value = items.bannerColorEnd;
            bannerOpacityInput.value = items.bannerOpacity;
            enableRephraseCheckbox.checked = items.enableRephrase;
            enableTranslationCheckbox.checked = items.enableTranslation;
            sourceLanguageSelect.value = items.sourceLanguage || 'auto';
            targetLanguageSelect.value = items.targetLanguage;
            expertModeCheckbox.checked = items.expertMode;
            modelTypeSelect.value = items.modelType;
            disableLoggingCheckbox.checked = items.disableLogging;
            apiUrlInput.value = items.apiUrl;
            translationApiUrlInput.value = items.translationApiUrl;
            audioModelTypeSelect.value = items.audioModelType;

            // Charger et afficher les modèles personnalisés
            displayCustomModels(items.customModelTypes);
            populateModelTypeOptions(items.customModelTypes);

            // Mettre à jour les états dépendants
            updateTranslationOptionsVisibility();
            updateExpertOptionsVisibility();
            updateColorPreview();
            displayForcedDomains(items.forcedDialogDomains);
        });
    }

    // Sauvegarder les options
    function saveOptions(scrollToStatus = true) {
        const customModelTypes = Array.from(customModelsList.children).map(item =>
            item.textContent.replace('×', '').trim()
        );

        const options = {
            apiKey: apiKeyInput.value,
            activeDisplay: activeDisplayCheckbox.checked,
            dialogDisplay: dialogDisplayCheckbox.checked,
            dialogDuration: parseInt(dialogDurationInput.value),
            autoCopy: autoCopyCheckbox.checked,
            bannerColorStart: bannerColorStartInput.value,
            bannerColorEnd: bannerColorEndInput.value,
            bannerOpacity: parseInt(bannerOpacityInput.value),
            enableRephrase: enableRephraseCheckbox.checked,
            enableTranslation: enableTranslationCheckbox.checked,
            sourceLanguage: sourceLanguageSelect.value,
            targetLanguage: targetLanguageSelect.value,
            expertMode: expertModeCheckbox.checked,
            modelType: modelTypeSelect.value,
            disableLogging: disableLoggingCheckbox.checked,
            customModelTypes: customModelTypes,
            audioModelType: audioModelTypeSelect.value,
            apiUrl: apiUrlInput.value,
            translationApiUrl: translationApiUrlInput.value,
            forcedDialogDomains: Array.from(domainsList.children).map(item =>
                item.textContent.replace('×', '').trim()
            )
        };

        // Validation des URL avant la sauvegarde
        if ((apiUrlInput.value && !isValidHttpsUrl(apiUrlInput.value)) ||
            (translationApiUrlInput.value && !isValidHttpsUrl(translationApiUrlInput.value))) {
            showStatus('Erreur : Les URL des API personnalisées doivent utiliser HTTPS.', 'error');
            return;
        }

        chrome.storage.sync.set(options, () => {
            showStatus(i18n.getMessage('savedMessage'), 'success');
            if (scrollToStatus) {
                statusElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            populateAudioModelOptions();
            populateModelTypeOptions(customModelTypes);

            // Mettre à jour les états dépendants
            updateTranslationOptionsVisibility();
            updateExpertOptionsVisibility();
            updateColorPreview();
            displayForcedDomains(options.forcedDialogDomains);
        });
    }

    // Fonction pour remplir les options du modèle audio
    function populateAudioModelOptions() {
        audioModelTypeSelect.innerHTML = '';
        window.BabelFishAIConstants.API_CONFIG.AUDIO_MODELS.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            audioModelTypeSelect.appendChild(option);
        });

        chrome.storage.sync.get({ audioModelType: window.BabelFishAIConstants.API_CONFIG.WHISPER_MODEL }, (items) => {
            audioModelTypeSelect.value = items.audioModelType;
        });
    }

    // Fonction pour remplir les options du modèle de traduction
    function populateModelTypeOptions(customModels) {
        modelTypeSelect.innerHTML = '';

        // Ajouter les options par défaut
        const defaultModels = ['gpt-4o-mini', 'gpt-4o'];
        defaultModels.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model + (model === 'gpt-4o-mini' ? ` (${i18n.getMessage("defaultModel")})` : '');
            modelTypeSelect.appendChild(option);
        });

        // Ajouter les modèles personnalisés
        customModels.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelTypeSelect.appendChild(option);
        });

        // Restaurer la sélection
        chrome.storage.sync.get({ modelType: 'gpt-4o-mini' }, (items) => {
            modelTypeSelect.value = items.modelType;
        });
    }

    // Ajouter un modèle personnalisé
    function addModelType() {
        const newModel = newModelTypeInput.value.trim();
        if (newModel && !Array.from(modelTypeSelect.options).some(option => option.value === newModel)) {
            const item = document.createElement('div');
            item.className = 'custom-model-item';
            item.textContent = newModel;

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-model-button';
            removeButton.textContent = '×';
            removeButton.onclick = () => {
                item.remove();
                saveOptions(false);
            };

            item.appendChild(removeButton);
            customModelsList.appendChild(item);
            newModelTypeInput.value = '';
            saveOptions(false);
        }
    }

    // Afficher les modèles personnalisés
    function displayCustomModels(models) {
        customModelsList.innerHTML = '';
        models.forEach(model => {
            const item = document.createElement('div');
            item.className = 'custom-model-item';
            item.textContent = model;

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-model-button';
            removeButton.textContent = '×';
            removeButton.onclick = () => {
                item.remove();
                saveOptions(false);
            };

            item.appendChild(removeButton);
            customModelsList.appendChild(item);
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

        // Animation de fade in
        statusElement.style.opacity = '0';
        requestAnimationFrame(() => {
            statusElement.style.opacity = '1';
        });

        setTimeout(() => {
            // Animation de fade out
            statusElement.style.opacity = '0';
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 300);
        }, 2000);
    }

    // Mettre à jour la visibilité des options de traduction
    function updateTranslationOptionsVisibility() {
        if (enableTranslationCheckbox.checked) {
            translationOptions.style.display = 'block';
            translationOptions.style.opacity = '0';
            requestAnimationFrame(() => {
                translationOptions.style.opacity = '1';
            });
        } else {
            translationOptions.style.opacity = '0';
            setTimeout(() => {
                translationOptions.style.display = 'none';
            }, 300);
        }
    }

    // Mettre à jour la visibilité des options expert
    function updateExpertOptionsVisibility() {
        if (expertModeCheckbox.checked) {
            expertOptions.style.display = 'block';
            expertOptions.style.opacity = '0';
            requestAnimationFrame(() => {
                expertOptions.style.opacity = '1';
            });
        } else {
            expertOptions.style.opacity = '0';
            setTimeout(() => {
                expertOptions.style.display = 'none';
            }, 300);
        }
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
    apiKeyInput.addEventListener('input', () => saveOptions(false));
    activeDisplayCheckbox.addEventListener('change', () => saveOptions(false));
    dialogDisplayCheckbox.addEventListener('change', () => saveOptions(false));
    autoCopyCheckbox.addEventListener('change', () => saveOptions(false));
    dialogDurationInput.addEventListener('input', () => saveOptions(false));
    bannerColorStartInput.addEventListener('input', () => saveOptions(false));
    bannerColorEndInput.addEventListener('input', () => saveOptions(false));
    bannerOpacityInput.addEventListener('input', () => saveOptions(false));
    enableRephraseCheckbox.addEventListener('change', () => saveOptions(false));
    enableTranslationCheckbox.addEventListener('change', () => saveOptions(false));
    sourceLanguageSelect.addEventListener('change', () => saveOptions(false));
    targetLanguageSelect.addEventListener('change', () => saveOptions(false));
    expertModeCheckbox.addEventListener('change', () => saveOptions(false));
    modelTypeSelect.addEventListener('change', () => saveOptions(false));
    disableLoggingCheckbox.addEventListener('change', () => saveOptions(false));
    audioModelTypeSelect.addEventListener('change', () => saveOptions(false));
    apiUrlInput.addEventListener('input', () => saveOptions(false));
    translationApiUrlInput.addEventListener('input', () => saveOptions(false));
    saveButton.addEventListener('click', () => saveOptions(true));
    saveAdvancedButton.addEventListener('click', () => saveOptions(true));
    toggleApiKeyButton.addEventListener('click', toggleApiKeyVisibility);
    enableTranslationCheckbox.addEventListener('change', updateTranslationOptionsVisibility);
    expertModeCheckbox.addEventListener('change', updateExpertOptionsVisibility);
    addDomainButton.addEventListener('click', addDomain);
    addModelTypeButton.addEventListener('click', addModelType);
    advancedHeader.addEventListener('click', toggleAdvancedSection);

    // Initialiser l'internationalisation et charger les options
    await i18n.init();
    loadOptions();
    populateAudioModelOptions();
});
