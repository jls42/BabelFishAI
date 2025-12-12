// Script de gestion des options
document.addEventListener('DOMContentLoaded', async () => {
    const i18n = window.BabelFishAIUtils.i18n;
    const Providers = window.BabelFishAIProviders;

    // Éléments du DOM - Providers
    const openaiEnabledCheckbox = document.getElementById('openaiEnabled');
    const openaiApiKeyInput = document.getElementById('openaiApiKey');
    const openaiStatus = document.getElementById('openaiStatus');
    const providerOpenAI = document.getElementById('providerOpenAI');

    const mistralEnabledCheckbox = document.getElementById('mistralEnabled');
    const mistralApiKeyInput = document.getElementById('mistralApiKey');
    const mistralStatus = document.getElementById('mistralStatus');
    const providerMistral = document.getElementById('providerMistral');

    const customEnabledCheckbox = document.getElementById('customEnabled');
    const customApiKeyInput = document.getElementById('customApiKey');
    const customTranscriptionUrlInput = document.getElementById('customTranscriptionUrl');
    const customChatUrlInput = document.getElementById('customChatUrl');
    const customStatus = document.getElementById('customStatus');
    const providerCustom = document.getElementById('providerCustom');

    // Éléments DOM pour les modèles de chaque provider
    const providerModelElements = {
        openai: {
            transcriptionSelect: document.getElementById('openaiTranscriptionModel'),
            chatSelect: document.getElementById('openaiChatModel'),
            newTranscriptionInput: document.getElementById('newOpenaiTranscriptionModel'),
            newChatInput: document.getElementById('newOpenaiChatModel'),
            addTranscriptionButton: document.getElementById('addOpenaiTranscriptionModel'),
            addChatButton: document.getElementById('addOpenaiChatModel')
        },
        mistral: {
            transcriptionSelect: document.getElementById('mistralTranscriptionModel'),
            chatSelect: document.getElementById('mistralChatModel'),
            newTranscriptionInput: document.getElementById('newMistralTranscriptionModel'),
            newChatInput: document.getElementById('newMistralChatModel'),
            addTranscriptionButton: document.getElementById('addMistralTranscriptionModel'),
            addChatButton: document.getElementById('addMistralChatModel')
        },
        custom: {
            transcriptionSelect: document.getElementById('customTranscriptionModel'),
            chatSelect: document.getElementById('customChatModel'),
            newTranscriptionInput: document.getElementById('newCustomTranscriptionModel'),
            newChatInput: document.getElementById('newCustomChatModel'),
            addTranscriptionButton: document.getElementById('addCustomTranscriptionModel'),
            addChatButton: document.getElementById('addCustomChatModel')
        }
    };

    const providerServices = document.getElementById('providerServices');
    const transcriptionProviderSelect = document.getElementById('transcriptionProvider');
    const chatProviderSelect = document.getElementById('chatProvider');

    // Éléments du DOM - Legacy (gardés pour rétrocompatibilité)
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

    // Timer pour le debounce des sauvegardes
    let saveDebounceTimer = null;
    const SAVE_DEBOUNCE_DELAY = 500; // 500ms de délai

    /**
     * Wrapper avec debounce pour éviter les erreurs MAX_WRITE_OPERATIONS_PER_MINUTE
     * @param {boolean} scrollToStatus - Si true, scroll vers le message de statut
     */
    function debouncedSaveOptions(scrollToStatus = false) {
        // Annuler le timer précédent
        if (saveDebounceTimer) {
            clearTimeout(saveDebounceTimer);
        }
        // Programmer une nouvelle sauvegarde
        saveDebounceTimer = setTimeout(() => {
            saveOptions(scrollToStatus);
        }, SAVE_DEBOUNCE_DELAY);
    }

    // Fonction pour valider une URL HTTPS
    function isValidHttpsUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    // ===== Gestion des Providers =====

    /**
     * Met à jour l'affichage visuel d'un provider
     * @param {string} providerId - ID du provider ('openai', 'mistral' ou 'custom')
     */
    function updateProviderDisplay(providerId) {
        let enabledCheckbox, apiKeyInputEl, statusElement, cardElement;

        if (providerId === 'openai') {
            enabledCheckbox = openaiEnabledCheckbox;
            apiKeyInputEl = openaiApiKeyInput;
            statusElement = openaiStatus;
            cardElement = providerOpenAI;
        } else if (providerId === 'mistral') {
            enabledCheckbox = mistralEnabledCheckbox;
            apiKeyInputEl = mistralApiKeyInput;
            statusElement = mistralStatus;
            cardElement = providerMistral;
        } else if (providerId === 'custom') {
            enabledCheckbox = customEnabledCheckbox;
            apiKeyInputEl = customApiKeyInput;
            statusElement = customStatus;
            cardElement = providerCustom;
        } else {
            return;
        }

        const isEnabled = enabledCheckbox.checked;
        const hasApiKey = apiKeyInputEl.value.trim().length > 0;

        // Pour le provider custom, vérifier aussi les URLs
        let hasRequiredUrls = true;
        if (providerId === 'custom') {
            hasRequiredUrls = customTranscriptionUrlInput.value.trim().length > 0 &&
                customChatUrlInput.value.trim().length > 0;
        }

        // Mettre à jour la classe active de la carte
        cardElement.classList.toggle('active', isEnabled);

        // Mettre à jour le statut
        if (isEnabled && hasApiKey && hasRequiredUrls) {
            statusElement.textContent = i18n.getMessage('providerActive') || 'Actif';
            statusElement.className = 'provider-status';
        } else if (isEnabled && !hasApiKey) {
            statusElement.textContent = i18n.getMessage('providerMissingKey') || 'Clé manquante';
            statusElement.className = 'provider-status inactive';
        } else if (isEnabled && providerId === 'custom' && !hasRequiredUrls) {
            statusElement.textContent = i18n.getMessage('providerMissingUrl') || 'URLs manquantes';
            statusElement.className = 'provider-status inactive';
        } else {
            statusElement.textContent = i18n.getMessage('providerInactive') || 'Inactif';
            statusElement.className = 'provider-status inactive';
        }

        // Mettre à jour la visibilité des sélecteurs de service
        updateServiceSelectorsVisibility();
    }

    /**
     * Met à jour la visibilité des sélecteurs de service
     * Visible uniquement si 2+ providers sont actifs
     */
    function updateServiceSelectorsVisibility() {
        const enabledProviders = getEnabledProviderIds();
        const showSelectors = enabledProviders.length > 1;

        providerServices.style.display = showSelectors ? 'block' : 'none';

        if (showSelectors) {
            populateServiceSelectors(enabledProviders);
        }
    }

    /**
     * Récupère la liste des IDs de providers activés (avec clé API et URLs pour custom)
     * @returns {string[]} Liste des IDs
     */
    function getEnabledProviderIds() {
        const enabled = [];
        if (openaiEnabledCheckbox.checked && openaiApiKeyInput.value.trim()) {
            enabled.push('openai');
        }
        if (mistralEnabledCheckbox.checked && mistralApiKeyInput.value.trim()) {
            enabled.push('mistral');
        }
        // Pour custom, vérifier aussi les URLs obligatoires
        if (customEnabledCheckbox.checked && customApiKeyInput.value.trim() &&
            customTranscriptionUrlInput.value.trim() && customChatUrlInput.value.trim()) {
            enabled.push('custom');
        }
        return enabled;
    }

    /**
     * Récupère la liste des IDs de providers avec checkbox activée (même sans clé)
     * @returns {string[]} Liste des IDs
     */
    function getCheckedProviderIds() {
        const checked = [];
        if (openaiEnabledCheckbox.checked) {
            checked.push('openai');
        }
        if (mistralEnabledCheckbox.checked) {
            checked.push('mistral');
        }
        if (customEnabledCheckbox.checked) {
            checked.push('custom');
        }
        return checked;
    }

    /**
     * Remplit les sélecteurs de service avec les providers actifs
     * @param {string[]} enabledProviders - Liste des IDs de providers actifs
     */
    function populateServiceSelectors(enabledProviders) {
        // Sauvegarder les valeurs actuelles
        const currentTranscription = transcriptionProviderSelect.value;
        const currentChat = chatProviderSelect.value;

        // Vider et repeupler les selects
        transcriptionProviderSelect.innerHTML = '';
        chatProviderSelect.innerHTML = '';

        enabledProviders.forEach(providerId => {
            const provider = Providers.getProvider(providerId);
            if (!provider) return;

            // Option pour transcription
            const transcriptionOption = document.createElement('option');
            transcriptionOption.value = providerId;
            transcriptionOption.textContent = provider.name;
            transcriptionProviderSelect.appendChild(transcriptionOption);

            // Option pour chat
            const chatOption = document.createElement('option');
            chatOption.value = providerId;
            chatOption.textContent = provider.name;
            chatProviderSelect.appendChild(chatOption);
        });

        // Restaurer les valeurs si elles sont toujours valides
        if (enabledProviders.includes(currentTranscription)) {
            transcriptionProviderSelect.value = currentTranscription;
        }
        if (enabledProviders.includes(currentChat)) {
            chatProviderSelect.value = currentChat;
        }
    }

    /**
     * Charge la configuration des providers depuis le storage
     */
    function loadProvidersConfig() {
        chrome.storage.sync.get({
            providers: null,
            transcriptionProvider: 'openai',
            chatProvider: 'openai',
            // Legacy keys pour migration
            apiKey: ''
        }, (items) => {
            console.log('[Options] Loading providers config:', items);

            // Si pas de config providers, utiliser la config legacy
            if (!items.providers) {
                // Mode legacy : utiliser l'ancienne clé API pour OpenAI
                openaiApiKeyInput.value = items.apiKey || '';
                openaiEnabledCheckbox.checked = !!items.apiKey;
                mistralEnabledCheckbox.checked = false;
                customEnabledCheckbox.checked = false;

                // Peupler les sélecteurs avec les modèles par défaut
                populateProviderModelSelect('openai', 'transcription', [], null);
                populateProviderModelSelect('openai', 'chat', [], null);
                populateProviderModelSelect('mistral', 'transcription', [], null);
                populateProviderModelSelect('mistral', 'chat', [], null);
                populateProviderModelSelect('custom', 'transcription', [], null);
                populateProviderModelSelect('custom', 'chat', [], null);
            } else {
                // Mode multi-provider
                const openaiConfig = items.providers.openai || {};
                openaiApiKeyInput.value = openaiConfig.apiKey || '';
                openaiEnabledCheckbox.checked = openaiConfig.enabled || false;

                const mistralConfig = items.providers.mistral || {};
                mistralApiKeyInput.value = mistralConfig.apiKey || '';
                mistralEnabledCheckbox.checked = mistralConfig.enabled || false;

                const customConfig = items.providers.custom || {};
                customApiKeyInput.value = customConfig.apiKey || '';
                customEnabledCheckbox.checked = customConfig.enabled || false;
                customTranscriptionUrlInput.value = customConfig.transcriptionUrl || '';
                customChatUrlInput.value = customConfig.chatUrl || '';

                // Peupler les sélecteurs avec les modèles (par défaut + personnalisés)
                populateProviderModelSelect('openai', 'transcription', openaiConfig.transcriptionModels || [], openaiConfig.selectedTranscriptionModel);
                populateProviderModelSelect('openai', 'chat', openaiConfig.chatModels || [], openaiConfig.selectedChatModel);
                populateProviderModelSelect('mistral', 'transcription', mistralConfig.transcriptionModels || [], mistralConfig.selectedTranscriptionModel);
                populateProviderModelSelect('mistral', 'chat', mistralConfig.chatModels || [], mistralConfig.selectedChatModel);
                populateProviderModelSelect('custom', 'transcription', customConfig.transcriptionModels || [], customConfig.selectedTranscriptionModel);
                populateProviderModelSelect('custom', 'chat', customConfig.chatModels || [], customConfig.selectedChatModel);
            }

            // Mettre à jour l'affichage des cartes
            updateProviderDisplay('openai');
            updateProviderDisplay('mistral');
            updateProviderDisplay('custom');

            // Mettre à jour les sélecteurs de service après avoir chargé les providers
            const enabledProviders = getEnabledProviderIds();
            if (enabledProviders.length > 1) {
                populateServiceSelectors(enabledProviders);
                // Restaurer les valeurs sauvegardées
                if (enabledProviders.includes(items.transcriptionProvider)) {
                    transcriptionProviderSelect.value = items.transcriptionProvider;
                }
                if (enabledProviders.includes(items.chatProvider)) {
                    chatProviderSelect.value = items.chatProvider;
                }
            }

            console.log('[Options] Loaded - transcriptionProvider:', items.transcriptionProvider, 'chatProvider:', items.chatProvider);
        });
    }

    /**
     * Sauvegarde la configuration des providers
     */
    function saveProvidersConfig() {
        const providers = {
            openai: {
                apiKey: openaiApiKeyInput.value.trim(),
                enabled: openaiEnabledCheckbox.checked,
                transcriptionModels: getProviderCustomModels('openai', 'transcription'),
                chatModels: getProviderCustomModels('openai', 'chat'),
                selectedTranscriptionModel: getSelectedProviderModel('openai', 'transcription'),
                selectedChatModel: getSelectedProviderModel('openai', 'chat')
            },
            mistral: {
                apiKey: mistralApiKeyInput.value.trim(),
                enabled: mistralEnabledCheckbox.checked,
                transcriptionModels: getProviderCustomModels('mistral', 'transcription'),
                chatModels: getProviderCustomModels('mistral', 'chat'),
                selectedTranscriptionModel: getSelectedProviderModel('mistral', 'transcription'),
                selectedChatModel: getSelectedProviderModel('mistral', 'chat')
            },
            custom: {
                apiKey: customApiKeyInput.value.trim(),
                enabled: customEnabledCheckbox.checked,
                transcriptionUrl: customTranscriptionUrlInput.value.trim(),
                chatUrl: customChatUrlInput.value.trim(),
                transcriptionModels: getProviderCustomModels('custom', 'transcription'),
                chatModels: getProviderCustomModels('custom', 'chat'),
                selectedTranscriptionModel: getSelectedProviderModel('custom', 'transcription'),
                selectedChatModel: getSelectedProviderModel('custom', 'chat')
            }
        };

        // Valider les URLs du provider custom (accepte HTTP pour localhost)
        if (providers.custom.enabled) {
            const customUrls = [providers.custom.transcriptionUrl, providers.custom.chatUrl];
            for (const url of customUrls) {
                if (!url) {
                    showStatus(i18n.getMessage('customUrlRequiredError') || 'Erreur : Le provider Custom/LiteLLM nécessite des URLs configurées.', 'error');
                    return false;
                }
                if (!Providers.isValidUrl(url, true)) { // allowHttp = true pour localhost
                    showStatus(i18n.getMessage('invalidUrlError') || 'Erreur : Les URLs doivent utiliser HTTPS (ou HTTP pour localhost).', 'error');
                    return false;
                }
            }
        }

        // Déterminer les providers actifs pour la sélection de service
        const enabledProviders = getEnabledProviderIds();
        let transcriptionProvider = 'openai';
        let chatProvider = 'openai';

        if (enabledProviders.length > 1) {
            // Plusieurs providers actifs : utiliser les sélecteurs
            transcriptionProvider = transcriptionProviderSelect.value || enabledProviders[0];
            chatProvider = chatProviderSelect.value || enabledProviders[0];
        } else if (enabledProviders.length === 1) {
            // Un seul provider actif : utiliser celui-là pour tout
            transcriptionProvider = enabledProviders[0];
            chatProvider = enabledProviders[0];
        }
        // Si aucun provider actif, garder 'openai' par défaut

        // Synchroniser avec la clé legacy pour rétrocompatibilité
        // Utiliser la clé du provider de transcription actif
        const legacyApiKey = providers[transcriptionProvider]?.apiKey || providers.openai.apiKey;

        console.log('[Options] Saving providers config:', {
            transcriptionProvider,
            chatProvider,
            enabledProviders
        });

        chrome.storage.sync.set({
            providers,
            transcriptionProvider,
            chatProvider,
            // Legacy keys pour rétrocompatibilité
            apiKey: legacyApiKey
        }, () => {
            if (chrome.runtime.lastError) {
                console.error('[Options] Error saving:', chrome.runtime.lastError);
            } else {
                console.log('[Options] Config saved successfully');
            }
            updateProviderDisplay('openai');
            updateProviderDisplay('mistral');
            updateProviderDisplay('custom');
        });

        return true;
    }

    /**
     * Gère le clic sur les boutons toggle password des providers
     */
    function setupProviderPasswordToggles() {
        document.querySelectorAll('.provider-card .toggle-password').forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');
                const input = document.getElementById(targetId);
                if (input) {
                    input.type = input.type === 'password' ? 'text' : 'password';
                    button.textContent = input.type === 'password' ? '👁️' : '🔒';
                }
            });
        });
    }

    // ===== Gestion des modèles pour tous les providers =====

    // Stockage temporaire des modèles personnalisés par provider
    const providerCustomModelsCache = {
        openai: { transcription: [], chat: [] },
        mistral: { transcription: [], chat: [] },
        custom: { transcription: [], chat: [] }
    };

    /**
     * Peuple le sélecteur de modèles d'un provider (par défaut + personnalisés)
     * @param {string} providerId - ID du provider ('openai', 'mistral', 'custom')
     * @param {string} modelType - 'transcription' ou 'chat'
     * @param {string[]} customModels - Liste des modèles personnalisés
     * @param {string} selectedModel - Modèle actuellement sélectionné
     */
    function populateProviderModelSelect(providerId, modelType, customModels = [], selectedModel = null) {
        const elements = providerModelElements[providerId];
        if (!elements) return;

        const selectElement = modelType === 'transcription'
            ? elements.transcriptionSelect
            : elements.chatSelect;

        if (!selectElement) return;

        // Sauvegarder les modèles personnalisés dans le cache
        providerCustomModelsCache[providerId][modelType] = [...customModels];

        selectElement.innerHTML = '';

        // Récupérer les modèles par défaut depuis providers.js
        const providerDef = Providers.getProvider(providerId);
        const defaultModels = providerDef
            ? (modelType === 'transcription' ? providerDef.transcriptionModels : providerDef.chatModels)
            : [];

        // Ajouter les modèles par défaut
        defaultModels.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.id; // Nom technique
            if (model.default && !selectedModel) {
                option.selected = true;
            }
            selectElement.appendChild(option);
        });

        // Ajouter les modèles personnalisés
        customModels.forEach(modelId => {
            // Ne pas ajouter si c'est déjà un modèle par défaut
            if (defaultModels.some(m => m.id === modelId)) return;

            const option = document.createElement('option');
            option.value = modelId;
            option.textContent = modelId + ' (custom)';
            option.dataset.isCustom = 'true';
            selectElement.appendChild(option);
        });

        // Sélectionner le modèle sauvegardé si présent
        if (selectedModel) {
            selectElement.value = selectedModel;
        }
    }

    /**
     * Récupère les modèles personnalisés d'un provider depuis le cache
     * @param {string} providerId - ID du provider
     * @param {string} modelType - 'transcription' ou 'chat'
     * @returns {string[]} Liste des modèles personnalisés
     */
    function getProviderCustomModels(providerId, modelType) {
        return providerCustomModelsCache[providerId]?.[modelType] || [];
    }

    /**
     * Récupère le modèle sélectionné pour un provider
     * @param {string} providerId - ID du provider
     * @param {string} modelType - 'transcription' ou 'chat'
     * @returns {string} ID du modèle sélectionné
     */
    function getSelectedProviderModel(providerId, modelType) {
        const elements = providerModelElements[providerId];
        if (!elements) return null;

        const selectElement = modelType === 'transcription'
            ? elements.transcriptionSelect
            : elements.chatSelect;

        return selectElement?.value || null;
    }

    /**
     * Ajoute un modèle personnalisé à un provider
     * @param {string} providerId - ID du provider
     * @param {string} modelType - 'transcription' ou 'chat'
     */
    function addProviderModel(providerId, modelType) {
        const elements = providerModelElements[providerId];
        if (!elements) return;

        const inputElement = modelType === 'transcription'
            ? elements.newTranscriptionInput
            : elements.newChatInput;
        const selectElement = modelType === 'transcription'
            ? elements.transcriptionSelect
            : elements.chatSelect;

        if (!inputElement || !selectElement) return;

        const newModel = inputElement.value.trim();
        if (!newModel) return;

        // Vérifier si le modèle existe déjà dans le select
        const existingOptions = Array.from(selectElement.options).map(opt => opt.value);
        if (existingOptions.includes(newModel)) {
            inputElement.value = '';
            // Sélectionner le modèle existant
            selectElement.value = newModel;
            return;
        }

        // Ajouter au cache
        if (!providerCustomModelsCache[providerId][modelType].includes(newModel)) {
            providerCustomModelsCache[providerId][modelType].push(newModel);
        }

        // Ajouter au select
        const option = document.createElement('option');
        option.value = newModel;
        option.textContent = newModel + ' (custom)';
        option.dataset.isCustom = 'true';
        selectElement.appendChild(option);

        // Sélectionner le nouveau modèle
        selectElement.value = newModel;

        inputElement.value = '';
        debouncedSaveOptions();
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
        // Sauvegarder d'abord la config providers
        if (!saveProvidersConfig()) {
            return; // Arrêter si la validation a échoué
        }

        const customModelTypes = Array.from(customModelsList.children).map(item =>
            item.textContent.replace('×', '').trim()
        );

        // Récupérer la clé API depuis le provider OpenAI pour rétrocompat
        const legacyApiKey = openaiApiKeyInput.value.trim();

        const options = {
            apiKey: legacyApiKey,
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
            forcedDialogDomains: Array.from(domainsList.children).map(item =>
                item.textContent.replace('×', '').trim()
            )
        };

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

    // Event listeners - Providers (avec debounce pour les inputs)
    openaiEnabledCheckbox.addEventListener('change', () => {
        updateProviderDisplay('openai');
        debouncedSaveOptions();
    });
    openaiApiKeyInput.addEventListener('input', () => {
        updateProviderDisplay('openai');
        debouncedSaveOptions();
    });

    mistralEnabledCheckbox.addEventListener('change', () => {
        updateProviderDisplay('mistral');
        debouncedSaveOptions();
    });
    mistralApiKeyInput.addEventListener('input', () => {
        updateProviderDisplay('mistral');
        debouncedSaveOptions();
    });

    // Event listeners - Provider Custom
    customEnabledCheckbox.addEventListener('change', () => {
        updateProviderDisplay('custom');
        debouncedSaveOptions();
    });
    customApiKeyInput.addEventListener('input', () => {
        updateProviderDisplay('custom');
        debouncedSaveOptions();
    });
    customTranscriptionUrlInput.addEventListener('input', () => {
        updateProviderDisplay('custom');
        debouncedSaveOptions();
    });
    customChatUrlInput.addEventListener('input', () => {
        updateProviderDisplay('custom');
        debouncedSaveOptions();
    });

    // Event listeners - Modèles pour tous les providers
    Object.keys(providerModelElements).forEach(providerId => {
        const elements = providerModelElements[providerId];
        // Boutons d'ajout de modèles
        if (elements.addTranscriptionButton) {
            elements.addTranscriptionButton.addEventListener('click', () => addProviderModel(providerId, 'transcription'));
        }
        if (elements.addChatButton) {
            elements.addChatButton.addEventListener('click', () => addProviderModel(providerId, 'chat'));
        }
        // Sélecteurs de modèles
        if (elements.transcriptionSelect) {
            elements.transcriptionSelect.addEventListener('change', () => debouncedSaveOptions());
        }
        if (elements.chatSelect) {
            elements.chatSelect.addEventListener('change', () => debouncedSaveOptions());
        }
    });

    transcriptionProviderSelect.addEventListener('change', () => debouncedSaveOptions());
    chatProviderSelect.addEventListener('change', () => debouncedSaveOptions());

    // Event listeners - Legacy (avec debounce pour les inputs)
    interfaceLanguageSelect.addEventListener('change', handleLanguageChange);
    if (apiKeyInput) apiKeyInput.addEventListener('input', () => debouncedSaveOptions());
    activeDisplayCheckbox.addEventListener('change', () => debouncedSaveOptions());
    dialogDisplayCheckbox.addEventListener('change', () => debouncedSaveOptions());
    autoCopyCheckbox.addEventListener('change', () => debouncedSaveOptions());
    dialogDurationInput.addEventListener('input', () => debouncedSaveOptions());
    bannerColorStartInput.addEventListener('input', () => debouncedSaveOptions());
    bannerColorEndInput.addEventListener('input', () => debouncedSaveOptions());
    bannerOpacityInput.addEventListener('input', () => debouncedSaveOptions());
    enableRephraseCheckbox.addEventListener('change', () => debouncedSaveOptions());
    enableTranslationCheckbox.addEventListener('change', () => debouncedSaveOptions());
    sourceLanguageSelect.addEventListener('change', () => debouncedSaveOptions());
    targetLanguageSelect.addEventListener('change', () => debouncedSaveOptions());
    expertModeCheckbox.addEventListener('change', () => debouncedSaveOptions());
    modelTypeSelect.addEventListener('change', () => debouncedSaveOptions());
    disableLoggingCheckbox.addEventListener('change', () => debouncedSaveOptions());
    audioModelTypeSelect.addEventListener('change', () => debouncedSaveOptions());
    // Les boutons de sauvegarde explicites n'ont pas de debounce
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
    setupProviderPasswordToggles();
    loadProvidersConfig();
    loadOptions();
    populateAudioModelOptions();
});
