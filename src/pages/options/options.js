// Script de gestion des options
/* global chrome */ // Chrome extension API global
document.addEventListener('DOMContentLoaded', async () => {
    const i18n = globalThis.BabelFishAIUtils.i18n;
    const Providers = globalThis.BabelFishAIProviders;

    // Éléments du DOM - Providers (nouveau design dropdown + panel)
    const providerSelector = document.getElementById('providerSelector');
    const dropdownStatus = document.getElementById('dropdownStatus');
    const providerConfigPanel = document.getElementById('providerConfigPanel');

    const openaiEnabledCheckbox = document.getElementById('openaiEnabled');
    const openaiApiKeyInput = document.getElementById('openaiApiKey');

    const mistralEnabledCheckbox = document.getElementById('mistralEnabled');
    const mistralApiKeyInput = document.getElementById('mistralApiKey');

    const customEnabledCheckbox = document.getElementById('customEnabled');
    const customApiKeyInput = document.getElementById('customApiKey');
    const customTranscriptionUrlInput = document.getElementById('customTranscriptionUrl');
    const customChatUrlInput = document.getElementById('customChatUrl');

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
    const disableLoggingCheckbox = document.getElementById('disableLogging');
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

    // ===== Gestion des Providers (nouveau design dropdown + panel) =====

    /**
     * Affiche le panel de configuration du provider sélectionné
     * @param {string} providerId - ID du provider ('openai', 'mistral' ou 'custom')
     */
    function showProviderConfig(providerId) {
        // Masquer tous les panels
        const allConfigs = providerConfigPanel.querySelectorAll('.provider-config');
        allConfigs.forEach(config => {
            config.style.display = 'none';
        });

        // Mapper providerId vers l'ID du panel HTML
        const panelIdMap = {
            'openai': 'configOpenAI',
            'mistral': 'configMistral',
            'custom': 'configCustom'
        };

        // Afficher le panel sélectionné
        // eslint-disable-next-line security/detect-object-injection -- False positive: providerId is a controlled enum ('openai'|'mistral'|'custom')
        const targetConfig = document.getElementById(panelIdMap[providerId]);
        if (targetConfig) {
            targetConfig.style.display = 'block';
        }

        // Afficher le toggle correspondant
        showProviderToggle(providerId);

        // Mettre à jour la bordure du panel selon l'état enabled
        updatePanelBorder(providerId);
    }

    /**
     * Affiche le toggle ON/OFF du provider sélectionné
     * @param {string} providerId - ID du provider
     */
    function showProviderToggle(providerId) {
        const toggles = {
            'openai': document.getElementById('toggleOpenAI'),
            'mistral': document.getElementById('toggleMistral'),
            'custom': document.getElementById('toggleCustom')
        };

        // Masquer tous les toggles
        Object.values(toggles).forEach(toggle => {
            if (toggle) toggle.style.display = 'none';
        });

        // Afficher le toggle du provider sélectionné
        // eslint-disable-next-line security/detect-object-injection -- False positive: providerId is a controlled enum ('openai'|'mistral'|'custom')
        if (toggles[providerId]) {
            // eslint-disable-next-line security/detect-object-injection -- False positive: providerId is a controlled enum
            toggles[providerId].style.display = 'inline-block';
        }
    }

    /**
     * Met à jour la bordure du panel selon si le provider est activé
     * @param {string} providerId - ID du provider
     */
    function updatePanelBorder(providerId) {
        let isEnabled = false;
        if (providerId === 'openai') {
            isEnabled = openaiEnabledCheckbox.checked;
        } else if (providerId === 'mistral') {
            isEnabled = mistralEnabledCheckbox.checked;
        } else if (providerId === 'custom') {
            isEnabled = customEnabledCheckbox.checked;
        }

        if (isEnabled) {
            providerConfigPanel.style.borderColor = 'var(--primary-color-2)';
        } else {
            providerConfigPanel.style.borderColor = 'var(--border-color)';
        }
    }

    /**
     * Met à jour l'affichage des status à côté du dropdown
     */
    function updateDropdownStatus() {
        const providers = ['mistral', 'openai', 'custom'];
        const shortNames = { openai: 'OAI', mistral: 'Mis', custom: 'Cus' };

        // Vider le contenu existant de manière sécurisée
        dropdownStatus.textContent = '';

        providers.forEach(providerId => {
            const status = getProviderStatus(providerId);
            let cssClass = 'status-dot';
            let symbol = '';

            if (status.enabled && status.configured) {
                cssClass += ' active';
                symbol = '●';
            } else if (status.configured) {
                cssClass += ' configured';
                symbol = '●';
            } else {
                symbol = '○';
            }

            // Créer l'élément span de manière sécurisée (pas d'innerHTML)
            const span = document.createElement('span');
            span.className = cssClass;
            span.title = status.name;
            // eslint-disable-next-line security/detect-object-injection -- False positive: providerId is from controlled providers array
            span.textContent = `${symbol} ${shortNames[providerId]}`;
            dropdownStatus.appendChild(span);
        });
    }

    /**
     * Récupère le statut d'un provider
     * @param {string} providerId - ID du provider
     * @returns {Object} Statut du provider
     */
    function getProviderStatus(providerId) {
        let enabledCheckbox, apiKeyInputEl, name; // skipcq: JS-0119 - Variables intentionally assigned in if/else blocks

        if (providerId === 'openai') {
            enabledCheckbox = openaiEnabledCheckbox;
            apiKeyInputEl = openaiApiKeyInput;
            name = 'OpenAI';
        } else if (providerId === 'mistral') {
            enabledCheckbox = mistralEnabledCheckbox;
            apiKeyInputEl = mistralApiKeyInput;
            name = 'Mistral';
        } else if (providerId === 'custom') {
            enabledCheckbox = customEnabledCheckbox;
            apiKeyInputEl = customApiKeyInput;
            name = 'Custom';
        } else {
            return { enabled: false, configured: false, name: '' };
        }

        const isEnabled = enabledCheckbox.checked;
        const hasApiKey = apiKeyInputEl.value.trim().length > 0;

        // Pour le provider custom, vérifier aussi les URLs
        let hasRequiredUrls = true;
        if (providerId === 'custom') {
            hasRequiredUrls = customTranscriptionUrlInput.value.trim().length > 0 &&
                customChatUrlInput.value.trim().length > 0;
        }

        return {
            enabled: isEnabled,
            configured: hasApiKey && (providerId !== 'custom' || hasRequiredUrls),
            name
        };
    }

    /**
     * Met à jour l'affichage visuel d'un provider (appelé après changement)
     * @param {string} providerId - ID du provider ('openai', 'mistral' ou 'custom')
     */
    function updateProviderDisplay(providerId) {
        // Mettre à jour les badges de statut
        updateDropdownStatus();

        // Mettre à jour la bordure du panel si c'est le provider actuellement affiché
        if (providerSelector.value === providerId) {
            updatePanelBorder(providerId);
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
     * Vérifie si un provider standard (OpenAI/Mistral) est activé
     * @param {HTMLInputElement} enabledCheckbox - Checkbox d'activation
     * @param {HTMLInputElement} keyInput - Input de la clé API
     * @returns {boolean}
     */
    // skipcq: JS-0128 - Function needs DOM context from DOMContentLoaded callback
    // eslint-disable-next-line sonarjs/no-nested-functions -- Needs DOM context from DOMContentLoaded
    function isStandardProviderEnabled(enabledCheckbox, keyInput) {
        return enabledCheckbox.checked && Boolean(keyInput.value.trim());
    }

    /**
     * Vérifie si le provider custom est activé (nécessite URLs en plus)
     * @returns {boolean}
     */
    function isCustomProviderEnabled() {
        const hasApiKey = customEnabledCheckbox.checked && Boolean(customApiKeyInput.value.trim());
        const hasUrls = Boolean(customTranscriptionUrlInput.value.trim()) && Boolean(customChatUrlInput.value.trim());
        return hasApiKey && hasUrls;
    }

    /**
     * Récupère la liste des IDs de providers activés (avec clé API et URLs pour custom)
     * @returns {string[]} Liste des IDs
     */
    function getEnabledProviderIds() {
        const enabled = [];
        if (isStandardProviderEnabled(mistralEnabledCheckbox, mistralApiKeyInput)) {
            enabled.push('mistral');
        }
        if (isStandardProviderEnabled(openaiEnabledCheckbox, openaiApiKeyInput)) {
            enabled.push('openai');
        }
        if (isCustomProviderEnabled()) {
            enabled.push('custom');
        }
        return enabled;
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
     * Charge la configuration d'un provider standard (OpenAI/Mistral)
     * @param {Object} config - Configuration du provider
     * @param {HTMLInputElement} keyInput - Input de la clé API
     * @param {HTMLInputElement} checkbox - Checkbox d'activation
     */
    // skipcq: JS-0128 - Function needs DOM context from DOMContentLoaded callback
    // eslint-disable-next-line sonarjs/no-nested-functions -- Needs DOM context from DOMContentLoaded
    function loadStandardProviderConfig(config, keyInput, checkbox) {
        keyInput.value = config.apiKey || '';
        checkbox.checked = config.enabled || false;
    }

    /**
     * Charge la configuration du provider custom
     * @param {Object} config - Configuration du provider custom
     */
    function loadCustomProviderConfig(config) {
        customApiKeyInput.value = config.apiKey || '';
        customEnabledCheckbox.checked = config.enabled || false;
        customTranscriptionUrlInput.value = config.transcriptionUrl || '';
        customChatUrlInput.value = config.chatUrl || '';
    }

    /**
     * Peuple les sélecteurs de modèles pour tous les providers
     * @param {Object} configs - Configurations des providers {openai, mistral, custom}
     */
    function populateAllModelSelects(configs) {
        const providerIds = ['openai', 'mistral', 'custom'];
        const modelTypes = ['transcription', 'chat'];

        for (const providerId of providerIds) {
            // eslint-disable-next-line security/detect-object-injection -- providerId from constant array
            const config = configs[providerId] || {};
            for (const modelType of modelTypes) {
                const models = config[`${modelType}Models`] || [];
                const selected = config[`selected${modelType.charAt(0).toUpperCase() + modelType.slice(1)}Model`];
                populateProviderModelSelect(providerId, modelType, models, selected);
            }
        }
    }

    /**
     * Met à jour l'affichage de tous les providers
     */
    function updateAllProviderDisplays() {
        updateProviderDisplay('openai');
        updateProviderDisplay('mistral');
        updateProviderDisplay('custom');
        updateDropdownStatus();
        updatePanelBorder(providerSelector.value);
    }

    /**
     * Restaure les sélecteurs de service si plusieurs providers sont actifs
     * @param {Object} items - Items chargés du storage
     */
    function restoreServiceSelectors(items) {
        const enabledProviders = getEnabledProviderIds();
        if (enabledProviders.length <= 1) return;

        populateServiceSelectors(enabledProviders);
        if (enabledProviders.includes(items.transcriptionProvider)) {
            transcriptionProviderSelect.value = items.transcriptionProvider;
        }
        if (enabledProviders.includes(items.chatProvider)) {
            chatProviderSelect.value = items.chatProvider;
        }
    }

    /**
     * Charge la configuration des providers depuis le storage
     */
    function loadProvidersConfig() {
        // eslint-disable-next-line no-undef -- chrome is a global provided by Chrome extension environment
        chrome.storage.sync.get({
            providers: null,
            transcriptionProvider: 'openai',
            chatProvider: 'openai',
            apiKey: '' // Legacy key pour migration
        }, (items) => {
            // eslint-disable-next-line no-console -- Debug log for options loading diagnostics
            console.log('[Options] Loading providers config:', items);

            const configs = {
                openai: items.providers?.openai || {},
                mistral: items.providers?.mistral || {},
                custom: items.providers?.custom || {}
            };

            if (items.providers) {
                // Mode multi-provider
                loadStandardProviderConfig(configs.openai, openaiApiKeyInput, openaiEnabledCheckbox);
                loadStandardProviderConfig(configs.mistral, mistralApiKeyInput, mistralEnabledCheckbox);
                loadCustomProviderConfig(configs.custom);
            } else {
                // Mode legacy : utiliser l'ancienne clé API pour OpenAI
                openaiApiKeyInput.value = items.apiKey || '';
                openaiEnabledCheckbox.checked = Boolean(items.apiKey);
                mistralEnabledCheckbox.checked = false;
                customEnabledCheckbox.checked = false;
            }

            populateAllModelSelects(configs);
            updateAllProviderDisplays();
            restoreServiceSelectors(items);

            // eslint-disable-next-line no-console -- Debug log for options loading diagnostics
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
        // eslint-disable-next-line security/detect-object-injection -- False positive: transcriptionProvider is a controlled provider ID
        const legacyApiKey = providers[transcriptionProvider]?.apiKey || providers.openai.apiKey;

        // eslint-disable-next-line no-console -- Debug log for options saving diagnostics
        console.log('[Options] Saving providers config:', {
            transcriptionProvider,
            chatProvider,
            enabledProviders
        });

        // eslint-disable-next-line no-undef -- chrome is a global provided by Chrome extension environment
        chrome.storage.sync.set({
            providers,
            transcriptionProvider,
            chatProvider,
            // Legacy keys pour rétrocompatibilité
            apiKey: legacyApiKey
        }, () => {
            // eslint-disable-next-line no-undef -- chrome is a global provided by Chrome extension environment
            if (chrome.runtime.lastError) {
                // eslint-disable-next-line no-undef -- chrome is a global provided by Chrome extension environment
                console.error('[Options] Error saving:', chrome.runtime.lastError);
            } else {
                // eslint-disable-next-line no-console -- Debug log for options saving success
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
                const targetId = button.dataset.target;
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
        // eslint-disable-next-line security/detect-object-injection -- False positive: providerId is a controlled enum ('openai'|'mistral'|'custom')
        const elements = providerModelElements[providerId];
        if (!elements) return;

        const selectElement = modelType === 'transcription'
            ? elements.transcriptionSelect
            : elements.chatSelect;

        if (!selectElement) return;

        // Sauvegarder les modèles personnalisés dans le cache
        // eslint-disable-next-line security/detect-object-injection -- False positive: providerId and modelType are controlled values
        providerCustomModelsCache[providerId][modelType] = [...customModels];

        selectElement.innerHTML = '';

        // Récupérer les modèles par défaut depuis providers.js
        const providerDef = Providers.getProvider(providerId);
        let defaultModels = [];
        if (providerDef) {
            defaultModels = modelType === 'transcription'
                ? providerDef.transcriptionModels
                : providerDef.chatModels;
        }

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
            option.textContent = `${modelId} (custom)`;
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
        // eslint-disable-next-line security/detect-object-injection -- False positive: providerId and modelType are controlled values
        return providerCustomModelsCache[providerId]?.[modelType] || [];
    }

    /**
     * Récupère le modèle sélectionné pour un provider
     * @param {string} providerId - ID du provider
     * @param {string} modelType - 'transcription' ou 'chat'
     * @returns {string} ID du modèle sélectionné
     */
    // skipcq: JS-0044 - Simple function, complexity is low (false positive from stale analysis)
    // eslint-disable-next-line sonarjs/cognitive-complexity -- False positive: function is simple
    function getSelectedProviderModel(providerId, modelType) {
        // eslint-disable-next-line security/detect-object-injection -- False positive: providerId is a controlled enum ('openai'|'mistral'|'custom')
        const elements = providerModelElements[providerId];
        if (!elements) return null;

        const selectElement = modelType === 'transcription'
            ? elements.transcriptionSelect
            : elements.chatSelect;

        return selectElement?.value || null;
    }

    /**
     * Récupère les éléments DOM pour l'ajout de modèle
     * @param {string} providerId - ID du provider
     * @param {string} modelType - 'transcription' ou 'chat'
     * @returns {{input: HTMLInputElement, select: HTMLSelectElement}|null}
     */
    function getModelAddElements(providerId, modelType) {
        // eslint-disable-next-line security/detect-object-injection -- False positive: providerId is a controlled enum
        const elements = providerModelElements[providerId];
        if (!elements) return null;

        const input = modelType === 'transcription' ? elements.newTranscriptionInput : elements.newChatInput;
        const select = modelType === 'transcription' ? elements.transcriptionSelect : elements.chatSelect;
        return (input && select) ? { input, select } : null;
    }

    /**
     * Ajoute un modèle au cache s'il n'existe pas
     * @param {string} providerId - ID du provider
     * @param {string} modelType - Type de modèle
     * @param {string} model - Nom du modèle
     */
    function addModelToCache(providerId, modelType, model) {
        // eslint-disable-next-line security/detect-object-injection -- False positive: controlled values
        const cache = providerCustomModelsCache[providerId][modelType];
        if (!cache.includes(model)) {
            cache.push(model);
        }
    }

    /**
     * Ajoute un modèle personnalisé à un provider
     * @param {string} providerId - ID du provider
     * @param {string} modelType - 'transcription' ou 'chat'
     */
    function addProviderModel(providerId, modelType) {
        const elements = getModelAddElements(providerId, modelType);
        if (!elements) return;

        const newModel = elements.input.value.trim();
        if (!newModel) return;

        const existingOptions = Array.from(elements.select.options).map(opt => opt.value);
        if (existingOptions.includes(newModel)) {
            elements.input.value = '';
            elements.select.value = newModel;
            return;
        }

        addModelToCache(providerId, modelType, newModel);

        const option = document.createElement('option');
        option.value = newModel;
        option.textContent = `${newModel} (custom)`;
        option.dataset.isCustom = 'true';
        elements.select.appendChild(option);
        elements.select.value = newModel;

        elements.input.value = '';
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
        // eslint-disable-next-line no-undef -- chrome is a global provided by Chrome extension environment
        chrome.storage.sync.get({
            interfaceLanguage: null // On initialise à null pour vérifier si une valeur existe
        }, result => {
            // Si interfaceLanguage est null, on utilise la langue du navigateur
            // eslint-disable-next-line no-undef -- chrome is a global provided by Chrome extension environment
            resolve(result.interfaceLanguage || chrome.i18n.getUILanguage());
        });
    });

    interfaceLanguageSelect.value = currentLang;

    // Charger les options sauvegardées
    function loadOptions() {
        // eslint-disable-next-line no-undef -- chrome is a global provided by Chrome extension environment
        chrome.storage.sync.get({
            apiKey: '',
            activeDisplay: true,
            dialogDisplay: false,
            dialogDuration: 15,
            autoCopy: false,
            disableLogging: true,
            bannerColorStart: '#684054',
            bannerColorEnd: '#4c7b8d',
            bannerOpacity: 80,
            enableRephrase: false,
            enableTranslation: false,
            sourceLanguage: 'auto',
            targetLanguage: 'en',
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
            disableLoggingCheckbox.checked = items.disableLogging;

            // Mettre à jour les états dépendants
            updateTranslationOptionsVisibility();
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

        // Récupérer la clé API depuis le provider OpenAI pour rétrocompat
        const legacyApiKey = openaiApiKeyInput.value.trim();

        const options = {
            apiKey: legacyApiKey,
            activeDisplay: activeDisplayCheckbox.checked,
            dialogDisplay: dialogDisplayCheckbox.checked,
            dialogDuration: Number.parseInt(dialogDurationInput.value, 10),
            autoCopy: autoCopyCheckbox.checked,
            bannerColorStart: bannerColorStartInput.value,
            bannerColorEnd: bannerColorEndInput.value,
            bannerOpacity: Number.parseInt(bannerOpacityInput.value, 10),
            enableRephrase: enableRephraseCheckbox.checked,
            enableTranslation: enableTranslationCheckbox.checked,
            sourceLanguage: sourceLanguageSelect.value,
            targetLanguage: targetLanguageSelect.value,
            disableLogging: disableLoggingCheckbox.checked,
            forcedDialogDomains: Array.from(domainsList.children).map(item =>
                item.textContent.replace('×', '').trim()
            )
        };

        // eslint-disable-next-line no-undef -- chrome is a global provided by Chrome extension environment
        chrome.storage.sync.set(options, () => {
            showStatus(i18n.getMessage('savedMessage'), 'success');
            if (scrollToStatus) {
                statusElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Mettre à jour les états dépendants
            updateTranslationOptionsVisibility();
            updateColorPreview();
            displayForcedDomains(options.forcedDialogDomains);
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

    // Mettre à jour l'aperçu des couleurs
    function updateColorPreview() {
        const startColor = bannerColorStartInput.value;
        const endColor = bannerColorEndInput.value;
        const opacity = bannerOpacityInput.value / 100;

        try {
            const startR = Number.parseInt(startColor.substr(1, 2), 16);
            const startG = Number.parseInt(startColor.substr(3, 2), 16);
            const startB = Number.parseInt(startColor.substr(5, 2), 16);
            const endR = Number.parseInt(endColor.substr(1, 2), 16);
            const endG = Number.parseInt(endColor.substr(3, 2), 16);
            const endB = Number.parseInt(endColor.substr(5, 2), 16);

            colorPreview.style.background = `linear-gradient(45deg,
                rgba(${startR}, ${startG}, ${startB}, ${opacity}),
                rgba(${endR}, ${endG}, ${endB}, ${opacity}))`;
        } catch (error) {
            console.error('Error updating color preview:', error);
        }
    }

    // Créer un élément de domaine avec son bouton de suppression
    function createDomainItem(domain) {
        const item = document.createElement('div');
        item.className = 'domain-item';
        item.textContent = domain;

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-domain-button';
        removeButton.textContent = '×';
        removeButton.onclick = () => item.remove();

        item.appendChild(removeButton);
        return item;
    }

    // Afficher les domaines forcés
    function displayForcedDomains(domains) {
        domainsList.innerHTML = '';
        domains.forEach(domain => {
            domainsList.appendChild(createDomainItem(domain));
        });
    }

    // Ajouter un nouveau domaine
    function addDomain() {
        const domain = newDomainInput.value.trim();
        if (domain) {
            domainsList.appendChild(createDomainItem(domain));
            newDomainInput.value = '';
        }
    }

    // Basculer la visibilité de la clé API
    function toggleApiKeyVisibility() {
        const type = apiKeyInput.type;
        apiKeyInput.type = type === 'password' ? 'text' : 'password';
        toggleApiKeyButton.textContent = type === 'password' ? '🔒' : '👁️';
    }

    // Event listener - Dropdown sélecteur de provider
    providerSelector.addEventListener('change', () => {
        showProviderConfig(providerSelector.value);
    });

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
        // eslint-disable-next-line security/detect-object-injection -- False positive: providerId comes from Object.keys()
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
    enableTranslationCheckbox.addEventListener('change', () => {
        updateTranslationOptionsVisibility();
        debouncedSaveOptions();
    });
    sourceLanguageSelect.addEventListener('change', () => debouncedSaveOptions());
    targetLanguageSelect.addEventListener('change', () => debouncedSaveOptions());
    disableLoggingCheckbox.addEventListener('change', () => debouncedSaveOptions());
    // Les boutons de sauvegarde explicites n'ont pas de debounce
    saveButton.addEventListener('click', () => saveOptions(true));
    saveAdvancedButton.addEventListener('click', () => saveOptions(true));
    toggleApiKeyButton.addEventListener('click', toggleApiKeyVisibility);
    addDomainButton.addEventListener('click', addDomain);
    advancedHeader.addEventListener('click', toggleAdvancedSection);

    // Initialiser l'internationalisation et charger les options
    await i18n.init();
    setupProviderPasswordToggles();
    loadProvidersConfig();
    loadOptions();

    // Initialiser le nouveau design dropdown + panel
    showProviderConfig(providerSelector.value);
    updateDropdownStatus();
});
