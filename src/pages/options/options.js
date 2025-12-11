// Script de gestion des options
document.addEventListener('DOMContentLoaded', async () => {
    const i18n = window.BabelFishAIUtils.i18n;
    const Providers = window.BabelFishAIProviders;

    // Éléments du DOM - Providers
    const openaiEnabledCheckbox = document.getElementById('openaiEnabled');
    const openaiApiKeyInput = document.getElementById('openaiApiKey');
    const openaiTranscriptionUrlInput = document.getElementById('openaiTranscriptionUrl');
    const openaiChatUrlInput = document.getElementById('openaiChatUrl');
    const openaiStatus = document.getElementById('openaiStatus');
    const providerOpenAI = document.getElementById('providerOpenAI');

    const mistralEnabledCheckbox = document.getElementById('mistralEnabled');
    const mistralApiKeyInput = document.getElementById('mistralApiKey');
    const mistralTranscriptionUrlInput = document.getElementById('mistralTranscriptionUrl');
    const mistralChatUrlInput = document.getElementById('mistralChatUrl');
    const mistralStatus = document.getElementById('mistralStatus');
    const providerMistral = document.getElementById('providerMistral');

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
     * @param {string} providerId - ID du provider ('openai' ou 'mistral')
     */
    function updateProviderDisplay(providerId) {
        const isOpenAI = providerId === 'openai';
        const enabledCheckbox = isOpenAI ? openaiEnabledCheckbox : mistralEnabledCheckbox;
        const apiKeyInput = isOpenAI ? openaiApiKeyInput : mistralApiKeyInput;
        const statusElement = isOpenAI ? openaiStatus : mistralStatus;
        const cardElement = isOpenAI ? providerOpenAI : providerMistral;

        const isEnabled = enabledCheckbox.checked;
        const hasApiKey = apiKeyInput.value.trim().length > 0;

        // Mettre à jour la classe active de la carte
        cardElement.classList.toggle('active', isEnabled);

        // Mettre à jour le statut
        if (isEnabled && hasApiKey) {
            statusElement.textContent = i18n.getMessage('providerActive') || 'Actif';
            statusElement.className = 'provider-status';
        } else if (isEnabled && !hasApiKey) {
            statusElement.textContent = i18n.getMessage('providerMissingKey') || 'Clé manquante';
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
     * Récupère la liste des IDs de providers activés (avec clé API)
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
            } else {
                // Mode multi-provider
                const openaiConfig = items.providers.openai || {};
                openaiApiKeyInput.value = openaiConfig.apiKey || '';
                openaiEnabledCheckbox.checked = openaiConfig.enabled || false;
                openaiTranscriptionUrlInput.value = openaiConfig.transcriptionUrl || '';
                openaiChatUrlInput.value = openaiConfig.chatUrl || '';

                const mistralConfig = items.providers.mistral || {};
                mistralApiKeyInput.value = mistralConfig.apiKey || '';
                mistralEnabledCheckbox.checked = mistralConfig.enabled || false;
                mistralTranscriptionUrlInput.value = mistralConfig.transcriptionUrl || '';
                mistralChatUrlInput.value = mistralConfig.chatUrl || '';
            }

            // Mettre à jour l'affichage des cartes
            updateProviderDisplay('openai');
            updateProviderDisplay('mistral');

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
                transcriptionUrl: openaiTranscriptionUrlInput.value.trim(),
                chatUrl: openaiChatUrlInput.value.trim()
            },
            mistral: {
                apiKey: mistralApiKeyInput.value.trim(),
                enabled: mistralEnabledCheckbox.checked,
                transcriptionUrl: mistralTranscriptionUrlInput.value.trim(),
                chatUrl: mistralChatUrlInput.value.trim()
            }
        };

        // Valider les URLs
        const urlsToValidate = [
            providers.openai.transcriptionUrl,
            providers.openai.chatUrl,
            providers.mistral.transcriptionUrl,
            providers.mistral.chatUrl
        ].filter(url => url); // Filtrer les URLs vides

        for (const url of urlsToValidate) {
            if (!isValidHttpsUrl(url)) {
                showStatus(i18n.getMessage('invalidUrlError') || 'Erreur : Les URLs doivent utiliser HTTPS.', 'error');
                return false;
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

    // Event listeners - Providers (avec debounce pour les inputs)
    openaiEnabledCheckbox.addEventListener('change', () => {
        updateProviderDisplay('openai');
        debouncedSaveOptions();
    });
    openaiApiKeyInput.addEventListener('input', () => {
        updateProviderDisplay('openai');
        debouncedSaveOptions();
    });
    openaiTranscriptionUrlInput.addEventListener('input', () => debouncedSaveOptions());
    openaiChatUrlInput.addEventListener('input', () => debouncedSaveOptions());

    mistralEnabledCheckbox.addEventListener('change', () => {
        updateProviderDisplay('mistral');
        debouncedSaveOptions();
    });
    mistralApiKeyInput.addEventListener('input', () => {
        updateProviderDisplay('mistral');
        debouncedSaveOptions();
    });
    mistralTranscriptionUrlInput.addEventListener('input', () => debouncedSaveOptions());
    mistralChatUrlInput.addEventListener('input', () => debouncedSaveOptions());

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
    apiUrlInput.addEventListener('input', () => debouncedSaveOptions());
    translationApiUrlInput.addEventListener('input', () => debouncedSaveOptions());
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
