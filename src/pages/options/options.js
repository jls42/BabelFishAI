// Script de gestion des options
/* global chrome */ // Global de l'API d'extension Chrome

// Panneaux statiques des providers historiques (options.html). Leur ordre est celui dans lequel
// `providers` est écrit, comme avant la refonte ; Chrome relit pourtant ces clés triées par ordre
// alphabétique (mesuré le 29/09), et le repli du store à l'exécution suit l'ordre relu. La page,
// elle, choisit son repli dans l'ordre d'affichage du registre. `prefix` et `dom` composent les
// identifiants des panneaux (ex. openaiApiKey, newOpenaiChatModel)
const STATIC_PANELS = new Map([
    ['openai', { prefix: 'openai', dom: 'Openai', panel: 'configOpenAI', toggle: 'toggleOpenAI' }],
    [
        'mistral',
        { prefix: 'mistral', dom: 'Mistral', panel: 'configMistral', toggle: 'toggleMistral' },
    ],
    ['custom', { prefix: 'custom', dom: 'Custom', panel: 'configCustom', toggle: 'toggleCustom' }],
]);

/**
 * Élément du DOM par identifiant
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function byId(id) {
    return document.getElementById(id);
}

/**
 * Met en majuscule la première lettre (ex. transcriptionUrl → TranscriptionUrl)
 * @param {string} text
 * @returns {string}
 */
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Éléments du panneau d'un provider, statique ou généré
 * @param {Object} ids - Entrée de STATIC_PANELS, ou generatedPanelIds
 * @param {string[]} urlSettings - Réglages d'URL du provider
 * @returns {Object}
 */
function panelElements(ids, urlSettings) {
    return {
        panel: byId(ids.panel),
        toggle: byId(ids.toggle),
        enabled: byId(`${ids.prefix}Enabled`),
        apiKey: byId(`${ids.prefix}ApiKey`),
        urls: urlSettings.map((setting) => [setting, byId(`${ids.prefix}${capitalize(setting)}`)]),
        transcriptionSelect: byId(`${ids.prefix}TranscriptionModel`),
        chatSelect: byId(`${ids.prefix}ChatModel`),
        newTranscriptionInput: byId(`new${ids.dom}TranscriptionModel`),
        newChatInput: byId(`new${ids.dom}ChatModel`),
        addTranscriptionButton: byId(`add${ids.dom}TranscriptionModel`),
        addChatButton: byId(`add${ids.dom}ChatModel`),
    };
}

/**
 * Vérifie si le provider d'un panneau est prêt : activé, avec une clé API, et avec ses URLs
 * s'il en demande (Custom)
 * @param {Object} elements - Éléments du panneau
 * @returns {boolean}
 */
function isPanelReady(elements) {
    return (
        elements.enabled.checked &&
        Boolean(elements.apiKey.value.trim()) &&
        elements.urls.every(([, input]) => Boolean(input.value.trim()))
    );
}

/**
 * Journalise une erreur du raccourci prioritaire Firefox
 * @param {Error} error - Erreur de l'API permissions
 */
function logShortcutGuardError(error) {
    console.error('Erreur du raccourci prioritaire:', error);
}

/**
 * Charge la configuration d'un provider dans son panneau
 * @param {Object} elements - Éléments du panneau
 * @param {Object} config - Configuration du provider
 */
function loadPanelConfig(elements, config) {
    elements.apiKey.value = config.apiKey || '';
    elements.enabled.checked = config.enabled || false;
    for (const [setting, input] of elements.urls) {
        // eslint-disable-next-line security/detect-object-injection -- setting vient du registre, vérifié par Object.hasOwn
        input.value = (Object.hasOwn(config, setting) && config[setting]) || '';
    }
}

/**
 * Nom d'hôte de la page des clés API d'un provider (texte de son lien)
 * @param {string|undefined} keyUrl - ui.keyUrl du registre
 * @returns {string|null} L'hôte, ou null si l'URL manque ou ne s'analyse pas
 */
function keyUrlHost(keyUrl) {
    if (!keyUrl) return null;
    try {
        return new URL(keyUrl).hostname;
    } catch (error) {
        console.error('keyUrl illisible dans le registre :', error.message);
        return null;
    }
}

/**
 * Identifiants DOM du panneau généré d'un provider, de même forme que STATIC_PANELS
 * @param {string} providerId
 * @returns {Object}
 */
function generatedPanelIds(providerId) {
    const dom = capitalize(providerId);
    return { prefix: providerId, dom, panel: `config${dom}`, toggle: `toggle${dom}` };
}

/**
 * Copie du premier élément d'un modèle (<template>) d'options.html
 * @param {string} templateId
 * @returns {HTMLElement}
 */
function cloneTemplate(templateId) {
    return byId(templateId).content.firstElementChild.cloneNode(true);
}

/**
 * Pose les identifiants d'un panneau généré, relie ses libellés, et renseigne le lien vers la
 * page des clés API du provider
 * @param {HTMLElement} panel - Copie de providerPanelTemplate
 * @param {Object} ids - Identifiants (generatedPanelIds)
 * @param {Object} provider - Entrée du registre
 */
function fillProviderPanel(panel, ids, provider) {
    const field = (name) => panel.querySelector(`[data-field="${name}"]`);
    const bind = (name, id, labelName) => {
        field(name).id = id;
        if (labelName) field(labelName).setAttribute('for', id);
    };
    panel.id = ids.panel;
    panel.dataset.provider = provider.id;
    bind('apiKey', `${ids.prefix}ApiKey`, 'apiKeyLabel');
    field('apiKeyToggle').dataset.target = `${ids.prefix}ApiKey`;
    bind('transcriptionSelect', `${ids.prefix}TranscriptionModel`, 'transcriptionSelectLabel');
    bind('newTranscriptionInput', `new${ids.dom}TranscriptionModel`, 'newTranscriptionLabel');
    bind('addTranscriptionButton', `add${ids.dom}TranscriptionModel`);
    bind('chatSelect', `${ids.prefix}ChatModel`, 'chatSelectLabel');
    bind('newChatInput', `new${ids.dom}ChatModel`, 'newChatLabel');
    bind('addChatButton', `add${ids.dom}ChatModel`);
    const keyLink = field('keyLink');
    const host = keyUrlHost(provider.ui.keyUrl);
    if (host) {
        keyLink.href = provider.ui.keyUrl;
        keyLink.textContent = host;
    } else {
        keyLink.parentElement.hidden = true;
    }
    // Note propre au provider : une clé i18n du registre, traduite avec le reste de la page
    if (provider.ui.noteKey) {
        const note = field('note');
        note.dataset.i18n = provider.ui.noteKey;
        note.hidden = false;
    }
}

/**
 * Interrupteur d'activation d'un provider généré
 * @param {Object} ids - Identifiants (generatedPanelIds)
 * @param {Object} provider - Entrée du registre
 * @returns {HTMLElement}
 */
function createProviderToggle(ids, provider) {
    const toggle = cloneTemplate('providerToggleTemplate');
    toggle.id = ids.toggle;
    const checkbox = toggle.querySelector('[data-field="enabled"]');
    checkbox.id = `${ids.prefix}Enabled`;
    checkbox.setAttribute('aria-label', `Enable ${provider.name}`);
    return toggle;
}

/**
 * Ajoute un provider au menu des providers, à sa place dans l'ordre d'affichage du registre
 * @param {Object} Providers - Registre des providers
 * @param {Object} provider - Entrée du registre
 */
function insertProviderOption(Providers, provider) {
    const selector = byId('providerSelector');
    const option = document.createElement('option');
    option.value = provider.id;
    option.textContent = provider.name;
    const next = [...selector.options].find(
        (other) => (Providers.getProvider(other.value)?.ui.order ?? Infinity) > provider.ui.order,
    );
    selector.insertBefore(option, next ?? null);
}

/**
 * Crée le panneau, l'interrupteur et l'entrée de menu d'un provider sans panneau statique
 * @param {Object} Providers - Registre des providers
 * @param {Object} provider - Entrée du registre
 * @returns {Object} Identifiants du panneau (generatedPanelIds)
 */
function createGeneratedPanel(Providers, provider) {
    const ids = generatedPanelIds(provider.id);
    const panel = cloneTemplate('providerPanelTemplate');
    fillProviderPanel(panel, ids, provider);
    byId('providerConfigPanel').appendChild(panel);
    byId('providerToggleWrapper').appendChild(createProviderToggle(ids, provider));
    insertProviderOption(Providers, provider);
    return ids;
}

/**
 * Panneaux de la page : les trois statiques, puis un panneau généré pour chaque provider ajouté
 * au registre après les trois historiques, à sa place dans le menu (ordre d'affichage)
 * @param {Object} Providers - Registre des providers
 * @param {Object} store - Stockage des providers (provider-store.js)
 * @returns {{generatedPanels: Map<string, Object>, panels: Map<string, Object>}} Identifiants
 *   des panneaux générés, et éléments du panneau de chaque provider (clé, activation, URLs,
 *   modèles)
 */
function buildPanels(Providers, store) {
    const generatedPanels = new Map(
        Providers.getUiOrder()
            .filter((id) => !STATIC_PANELS.has(id))
            .map((id) => [id, createGeneratedPanel(Providers, Providers.getProvider(id))]),
    );
    // Un panneau généré n'a pas de champ d'URL : seul Custom en demande (test du registre)
    const panels = new Map(
        [...STATIC_PANELS, ...generatedPanels].map(([id, ids]) => [
            id,
            panelElements(ids, STATIC_PANELS.has(id) ? store.requiredUrlSettings(id) : []),
        ]),
    );
    return { generatedPanels, panels };
}

/**
 * Configuration sans rien à conserver : ni clé API, ni activation, ni modèle personnalisé
 * @param {Object} config - Configuration saisie (panelConfig)
 * @returns {boolean}
 */
function isEmptyConfig(config) {
    return (
        !config.apiKey &&
        !config.enabled &&
        !config.transcriptionModels.length &&
        !config.chatModels.length
    );
}

/**
 * Valide les URLs du provider custom
 * @param {Object} customConfig - Configuration du provider custom
 * @param {Function} showStatus - Fonction pour afficher les messages
 * @param {Object} i18n - Service d'internationalisation
 * @param {Object} Providers - Service des providers
 * @returns {boolean} True si les URLs sont valides
 */
function validateCustomProviderUrls(customConfig, showStatus, i18n, Providers) {
    if (!customConfig.enabled) return true;

    const urls = [customConfig.transcriptionUrl, customConfig.chatUrl];
    for (const url of urls) {
        if (!url) {
            showStatus(
                i18n.getMessage('customUrlRequiredError') ||
                    'Erreur : Le provider Custom/LiteLLM nécessite des URLs configurées.',
                'error',
            );
            return false;
        }
        if (!Providers.isValidUrl(url, true)) {
            showStatus(
                i18n.getMessage('invalidUrlError') ||
                    'Erreur : Les URLs doivent utiliser HTTPS (ou HTTP pour localhost).',
                'error',
            );
            return false;
        }
    }
    return true;
}

/**
 * Détermine les providers actifs pour transcription et chat
 * @param {string[]} enabledProviders - Liste des providers activés
 * @param {HTMLSelectElement} transcriptionSelect - Sélecteur de provider pour transcription
 * @param {HTMLSelectElement} chatSelect - Sélecteur de provider pour chat
 * @returns {{transcriptionProvider: string, chatProvider: string}}
 */
function determineActiveProviders(enabledProviders, transcriptionSelect, chatSelect) {
    if (enabledProviders.length > 1) {
        return {
            transcriptionProvider: transcriptionSelect.value || enabledProviders[0],
            chatProvider: chatSelect.value || enabledProviders[0],
        };
    }
    if (enabledProviders.length === 1) {
        return {
            transcriptionProvider: enabledProviders[0],
            chatProvider: enabledProviders[0],
        };
    }
    return { transcriptionProvider: 'openai', chatProvider: 'openai' };
}

document.addEventListener('DOMContentLoaded', async () => {
    const i18n = globalThis.BabelFishAIUtils.i18n;
    const Providers = globalThis.BabelFishAIProviders;
    // Convention de stockage partagée avec l'extension (provider-store.js)
    const store = globalThis.BabelFishAIProviderStore;
    const { EXTRA_PREFIX } = store;

    // Éléments du DOM - Providers (nouveau design dropdown + panel)
    const providerSelector = document.getElementById('providerSelector');
    const providerLogo = document.getElementById('providerLogo');
    const dropdownStatus = document.getElementById('dropdownStatus');
    const providerConfigPanel = document.getElementById('providerConfigPanel');

    const { generatedPanels, panels } = buildPanels(Providers, store);
    // Panneau OpenAI : en mode legacy (sans `providers`), rempli depuis la clé héritée `apiKey`
    const openaiPanel = panels.get('openai');

    // Providers générés dont la clé extraProvider.<id> existe, et providers modifiés pendant la
    // session (tous : seuls les générés sont écrits dans extraProvider.<id>, pour ne pas écraser
    // la clé d'un autre poste)
    const storedExtraProviders = new Set();
    const modifiedExtraProviders = new Set();
    // Configuration lue ou écrite de chaque provider généré : ses champs inconnus du panneau
    // (ajoutés par une version plus récente) sont conservés à la réécriture
    const storedExtraConfigs = new Map();

    // Sélection lue d'une version plus récente (identifiant inconnu du registre), par service :
    // elle est réécrite telle quelle tant que l'utilisateur ne change pas ce sélecteur
    const futureSelection = { transcription: null, chat: null };

    const providerServices = document.getElementById('providerServices');
    const unknownProvidersSection = byId('unknownProviders');
    const unknownProvidersList = byId('unknownProvidersList');
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
     * @param {string} providerId - ID d'un provider du menu (historique ou généré)
     */
    function showProviderConfig(providerId) {
        // Masquer tous les panels
        const allConfigs = providerConfigPanel.querySelectorAll('.provider-config');
        allConfigs.forEach((config) => {
            config.style.display = 'none';
        });

        // Mettre à jour le logo à côté du dropdown (registre : logo, ou emoji sans logo officiel)
        showProviderLogo(Providers.getProvider(providerId)?.ui);

        // Afficher le panel sélectionné
        const targetConfig = panels.get(providerId)?.panel;
        if (targetConfig) {
            targetConfig.style.display = 'block';
        }

        // Afficher le toggle correspondant
        showProviderToggle(providerId);

        // Mettre à jour la bordure du panel selon l'état enabled
        updatePanelBorder(providerId);
    }

    /**
     * Affiche le logo du provider à côté du dropdown, ou son emoji s'il n'a pas de logo
     * officiel (🚅 pour Custom/LiteLLM)
     * @param {Object|undefined} ui - Présentation du provider dans le registre
     */
    function showProviderLogo(ui) {
        if (ui?.logo) {
            providerLogo.src = `../../../${ui.logo}`;
            providerLogo.style.display = 'block';
            // Masquer l'emoji si présent
            const emojiEl = document.getElementById('providerLogoEmoji');
            if (emojiEl) emojiEl.style.display = 'none';
            return;
        }
        providerLogo.style.display = 'none';
        let emojiEl = document.getElementById('providerLogoEmoji');
        if (!emojiEl) {
            emojiEl = document.createElement('span');
            emojiEl.id = 'providerLogoEmoji';
            emojiEl.className = 'provider-selector-emoji';
            providerLogo.parentNode.insertBefore(emojiEl, providerLogo);
        }
        emojiEl.textContent = ui?.emoji ?? '🚅';
        emojiEl.style.display = 'block';
    }

    /**
     * Affiche le toggle ON/OFF du provider sélectionné, et masque les autres
     * @param {string} providerId - ID du provider
     */
    function showProviderToggle(providerId) {
        for (const [id, elements] of panels) {
            if (elements.toggle) {
                elements.toggle.style.display = id === providerId ? 'inline-block' : 'none';
            }
        }
    }

    /**
     * Met à jour la bordure du panel selon si le provider est activé
     * @param {string} providerId - ID du provider
     */
    function updatePanelBorder(providerId) {
        const isEnabled = panels.get(providerId)?.enabled.checked ?? false;

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
        // Vider le contenu existant de manière sécurisée
        dropdownStatus.textContent = '';

        displayedProviderIds().forEach((providerId) => {
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
            span.textContent = `${symbol} ${Providers.getProvider(providerId).ui.short}`;
            dropdownStatus.appendChild(span);
        });
    }

    /**
     * Récupère le statut d'un provider
     * @param {string} providerId - ID du provider
     * @returns {Object} Statut du provider
     */
    function getProviderStatus(providerId) {
        const elements = panels.get(providerId);
        if (!elements) {
            return { enabled: false, configured: false, name: '' };
        }

        const hasApiKey = elements.apiKey.value.trim().length > 0;
        // Pour un provider qui demande des URLs (Custom), vérifier aussi qu'elles sont saisies
        const hasRequiredUrls = elements.urls.every(([, input]) => input.value.trim().length > 0);

        return {
            enabled: elements.enabled.checked,
            configured: hasApiKey && hasRequiredUrls,
            name: Providers.getProvider(providerId).ui.statusName,
        };
    }

    /**
     * Met à jour l'affichage visuel d'un provider (appelé après changement)
     * @param {string} providerId - ID du provider
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
     * Providers qui ont un panneau, dans l'ordre d'affichage du registre (Mistral, OpenAI, Custom)
     * @returns {string[]} Liste des IDs
     */
    function displayedProviderIds() {
        return Providers.getUiOrder().filter((providerId) => panels.has(providerId));
    }

    /**
     * Récupère la liste des IDs de providers activés (avec clé API et URLs pour custom), dans
     * l'ordre d'affichage : le premier sert de repli pour les sélecteurs de service
     * @returns {string[]} Liste des IDs
     */
    function getEnabledProviderIds() {
        return displayedProviderIds().filter((providerId) => isPanelReady(panels.get(providerId)));
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

        enabledProviders.forEach((providerId) => {
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

        // Une sélection d'une version plus récente reste affichée telle qu'elle est écrite,
        // jusqu'à ce que l'utilisateur choisisse un autre provider
        showFutureSelection(transcriptionProviderSelect, futureSelection.transcription);
        showFutureSelection(chatProviderSelect, futureSelection.chat);
    }

    /**
     * Ajoute à un sélecteur de service l'option sélectionnée d'un provider d'une version plus
     * récente, que cette version ne sait pas utiliser
     * @param {HTMLSelectElement} select - Sélecteur de service
     * @param {string|null} providerId - Sélection gardée pour ce service, ou null
     */
    function showFutureSelection(select, providerId) {
        if (!providerId) return;
        const option = document.createElement('option');
        option.value = providerId;
        option.textContent = i18n.getMessage('newerVersionProviderOption', {
            provider: providerId,
        });
        select.appendChild(option);
        select.value = providerId;
    }

    /**
     * Peuple les sélecteurs de modèles pour tous les providers
     * @param {Map<string, Object>} configs - Configuration de chaque provider
     */
    function populateAllModelSelects(configs) {
        const modelTypes = ['transcription', 'chat'];

        for (const providerId of panels.keys()) {
            const config = configs.get(providerId) || {};
            for (const modelType of modelTypes) {
                const models = config[`${modelType}Models`] || [];
                const selected = config[`selected${capitalize(modelType)}Model`];
                populateProviderModelSelect(providerId, modelType, models, selected);
            }
        }
    }

    /**
     * Met à jour l'affichage de tous les providers
     */
    function updateAllProviderDisplays() {
        for (const providerId of panels.keys()) {
            updateProviderDisplay(providerId);
        }
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
     * Configuration enregistrée de chaque provider, et providers générés dont la clé existe
     * @param {Object} items - Données lues dans le stockage
     * @returns {Map<string, Object>}
     */
    function storedConfigs(items) {
        storedExtraProviders.clear();
        const configs = new Map();
        for (const id of panels.keys()) {
            const config = store.getProviderConfig(items, id) || {};
            if (STATIC_PANELS.has(id)) {
                configs.set(id, config);
                continue;
            }
            if (Object.keys(config).length) storedExtraProviders.add(id);
            storedExtraConfigs.set(id, config);
            configs.set(id, config);
        }
        return configs;
    }

    /**
     * Identifiant de provider inconnu de cette version, écrit par une version plus récente
     * @param {*} value - Valeur lue pour la sélection d'un service
     * @returns {string|null} La valeur si c'est un tel identifiant, sinon null
     */
    function unknownProviderId(value) {
        // Même forme que les identifiants du registre (motif imposé par
        // tests/registry-rules.test.mjs), et jamais un nom hérité d'Object (__proto__,
        // constructor) : une valeur corrompue suit la règle habituelle
        const plausible =
            typeof value === 'string' &&
            /^[a-z][a-z0-9-]*$/.test(value) &&
            !Object.hasOwn(Object.prototype, value);
        return plausible && !Providers.getProvider(value) ? value : null;
    }

    /**
     * Charge la configuration des providers depuis le storage
     */
    function loadProvidersConfig() {
        // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
        chrome.storage.sync.get(
            {
                providers: null,
                transcriptionProvider: 'openai',
                chatProvider: 'openai',
                apiKey: '', // Legacy key pour migration
                ...Object.fromEntries(
                    [...generatedPanels.keys()].map((id) => [`${EXTRA_PREFIX}${id}`, null]),
                ),
            },
            (items) => {
                const configs = storedConfigs(items);

                if (items.providers) {
                    // Mode multi-provider
                    for (const id of STATIC_PANELS.keys()) {
                        loadPanelConfig(panels.get(id), configs.get(id));
                    }
                } else {
                    // Mode legacy : utiliser l'ancienne clé API pour OpenAI, les autres coupés
                    openaiPanel.apiKey.value = items.apiKey || '';
                    for (const id of STATIC_PANELS.keys()) {
                        panels.get(id).enabled.checked = id === 'openai' && Boolean(items.apiKey);
                    }
                }
                for (const id of generatedPanels.keys()) {
                    loadPanelConfig(panels.get(id), configs.get(id));
                }
                futureSelection.transcription = unknownProviderId(items.transcriptionProvider);
                futureSelection.chat = unknownProviderId(items.chatProvider);

                populateAllModelSelects(configs);
                updateAllProviderDisplays();
                restoreServiceSelectors(items);

                // skipcq: JS-0002 - debug log for options loading diagnostics
                // eslint-disable-next-line no-console -- Debug log for options loading diagnostics
                console.log(
                    '[Options] Loaded - transcriptionProvider:',
                    items.transcriptionProvider,
                    'chatProvider:',
                    items.chatProvider,
                );
            },
        );
    }

    /**
     * Configuration d'un provider telle que saisie dans son panneau
     * @param {string} providerId - ID du provider
     * @param {Object} elements - Éléments du panneau
     * @returns {Object}
     */
    function panelConfig(providerId, elements) {
        return {
            apiKey: elements.apiKey.value.trim(),
            enabled: elements.enabled.checked,
            ...Object.fromEntries(
                elements.urls.map(([setting, input]) => [setting, input.value.trim()]),
            ),
            transcriptionModels: getProviderCustomModels(providerId, 'transcription'),
            chatModels: getProviderCustomModels(providerId, 'chat'),
            selectedTranscriptionModel: getSelectedProviderModel(providerId, 'transcription'),
            selectedChatModel: getSelectedProviderModel(providerId, 'chat'),
        };
    }

    /**
     * Provider de chaque service : une sélection d'une version plus récente est gardée tant que
     * son sélecteur n'a pas été changé, sinon la règle des providers activés s'applique
     * @param {string[]} enabledProviders - Providers activés (getEnabledProviderIds)
     * @returns {{transcriptionProvider: string, chatProvider: string}}
     */
    function serviceSelection(enabledProviders) {
        const active = determineActiveProviders(
            enabledProviders,
            transcriptionProviderSelect,
            chatProviderSelect,
        );
        return {
            transcriptionProvider: futureSelection.transcription ?? active.transcriptionProvider,
            chatProvider: futureSelection.chat ?? active.chatProvider,
        };
    }

    /**
     * Clés des providers à enregistrer : configuration de chaque provider historique, provider
     * de chaque service et clé héritée
     * @returns {Object|null} providers, transcriptionProvider, chatProvider et apiKey, ou null si
     *   la configuration est invalide (le message est déjà affiché)
     */
    function providersStorageUpdate() {
        // Seuls les providers historiques vont dans `providers`, dans l'ordre de STATIC_PANELS
        const providers = Object.fromEntries(
            [...STATIC_PANELS.keys()].map((id) => [id, panelConfig(id, panels.get(id))]),
        );

        // Valider les URLs du provider custom
        if (!validateCustomProviderUrls(providers.custom, showStatus, i18n, Providers)) {
            return null;
        }

        // Déterminer les providers actifs pour la sélection de service
        const enabledProviders = getEnabledProviderIds();
        const { transcriptionProvider, chatProvider } = serviceSelection(enabledProviders);

        // Synchroniser avec la clé legacy pour rétrocompatibilité. Les anciennes versions l'envoient
        // toujours à OpenAI : elle ne reçoit donc que la clé OpenAI, et reste vide tant qu'OpenAI
        // est désactivé (la clé reste enregistrée dans le champ OpenAI et dans providers.openai)
        const legacyApiKey = providers.openai.enabled ? providers.openai.apiKey : '';

        // skipcq: JS-0002 - debug log for options saving diagnostics
        // eslint-disable-next-line no-console -- Debug log for options saving diagnostics
        console.log('[Options] Saving providers config:', {
            transcriptionProvider,
            chatProvider,
            enabledProviders,
        });

        return { providers, transcriptionProvider, chatProvider, apiKey: legacyApiKey };
    }

    /**
     * Providers générés modifiés pendant la session : clé extraProvider.<id> à écrire, ou à
     * retirer si le provider a été vidé (contrat, point 4 : jamais écrite vide). Ils cessent
     * d'être « modifiés » ; un échec d'écriture les y remet
     * @returns {{writes: Object, removals: string[]}}
     */
    function extraProvidersUpdate() {
        const writes = {};
        const removals = [];
        const modified = [...generatedPanels.keys()].filter((id) => modifiedExtraProviders.has(id));
        for (const id of modified) {
            const config = panelConfig(id, panels.get(id));
            if (!isEmptyConfig(config)) {
                writes[`${EXTRA_PREFIX}${id}`] = { ...storedExtraConfigs.get(id), ...config };
            } else if (storedExtraProviders.has(id)) {
                removals.push(id);
            }
        }
        modifiedExtraProviders.clear();
        return { writes, removals };
    }

    /**
     * Écriture réussie : les clés écrites existent désormais, avec la configuration écrite, et
     * celles des providers vidés sont retirées
     * @param {{writes: Object, removals: string[]}} extraUpdate - Résultat d'extraProvidersUpdate
     */
    function extraWriteSucceeded(extraUpdate) {
        for (const [key, config] of Object.entries(extraUpdate.writes)) {
            const id = key.slice(EXTRA_PREFIX.length);
            storedExtraProviders.add(id);
            storedExtraConfigs.set(id, config);
        }
        removeEmptiedExtraProviders(extraUpdate.removals);
    }

    /**
     * Écriture refusée : les providers concernés redeviennent « modifiés », pour la suivante
     * @param {{writes: Object, removals: string[]}} extraUpdate - Résultat d'extraProvidersUpdate
     */
    function extraWriteFailed(extraUpdate) {
        Object.keys(extraUpdate.writes).forEach((key) =>
            modifiedExtraProviders.add(key.slice(EXTRA_PREFIX.length)),
        );
        extraUpdate.removals.forEach((id) => modifiedExtraProviders.add(id));
    }

    /**
     * Retire les clés des providers générés vidés, une fois la sélection des services écrite
     * @param {string[]} removals - IDs des providers vidés
     */
    function removeEmptiedExtraProviders(removals) {
        if (!removals.length) return;
        // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
        chrome.storage.sync.remove(
            removals.map((id) => `${EXTRA_PREFIX}${id}`),
            () => {
                // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
                const error = chrome.runtime.lastError;
                if (error) {
                    removals.forEach((id) => modifiedExtraProviders.add(id));
                    showStatus(
                        i18n.getMessage('saveErrorMessage', { error: error.message }),
                        'error',
                    );
                    return;
                }
                removals.forEach((id) => {
                    storedExtraProviders.delete(id);
                    storedExtraConfigs.set(id, {});
                });
            },
        );
    }

    // ===== Écritures faites ailleurs (autre page d'options, autre poste) =====

    /**
     * Met à jour ce qui concerne les providers ajoutés et les versions plus récentes après une
     * écriture faite ailleurs, sans jamais déclencher de sauvegarde (contrat, point 5). Un panneau
     * généré modifié pendant la session garde la saisie de l'utilisateur ; les panneaux des
     * providers historiques ne sont pas rafraîchis, comme avant la refonte
     * @param {Object} changes - Changements de storage.sync
     * @param {string} area - Zone de stockage modifiée
     */
    function handleStorageChanges(changes, area) {
        if (area !== 'sync') return;
        refreshFutureSelection(changes);
        for (const id of generatedPanels.keys()) {
            const key = `${EXTRA_PREFIX}${id}`;
            if (Object.hasOwn(changes, key)) {
                // eslint-disable-next-line security/detect-object-injection -- key vérifiée par Object.hasOwn
                refreshGeneratedPanel(id, changes[key].newValue);
            }
        }
        if (Object.keys(changes).some((key) => key.startsWith(EXTRA_PREFIX))) {
            loadUnknownProviders();
        }
    }

    /**
     * Sélection d'une version plus récente écrite ou remplacée ailleurs
     * @param {Object} changes - Changements de storage.sync
     */
    function refreshFutureSelection(changes) {
        const before = { ...futureSelection };
        if (Object.hasOwn(changes, 'transcriptionProvider')) {
            futureSelection.transcription = unknownProviderId(
                changes.transcriptionProvider.newValue,
            );
        }
        if (Object.hasOwn(changes, 'chatProvider')) {
            futureSelection.chat = unknownProviderId(changes.chatProvider.newValue);
        }
        if (
            before.transcription !== futureSelection.transcription ||
            before.chat !== futureSelection.chat
        ) {
            updateServiceSelectorsVisibility();
        }
    }

    /**
     * Configuration d'un provider généré écrite ou retirée ailleurs : l'état enregistré suit
     * toujours le stockage, le panneau seulement s'il n'a pas été modifié pendant la session
     * @param {string} providerId
     * @param {*} value - Nouvelle valeur de sa clé extraProvider.<id> (undefined si retirée)
     */
    function refreshGeneratedPanel(providerId, value) {
        const config = value && typeof value === 'object' ? value : {};
        storedExtraConfigs.set(providerId, config);
        if (Object.keys(config).length) {
            storedExtraProviders.add(providerId);
        } else {
            storedExtraProviders.delete(providerId);
        }
        if (modifiedExtraProviders.has(providerId)) return;
        loadPanelConfig(panels.get(providerId), config);
        const models = (list) => (Array.isArray(list) ? list : []);
        populateProviderModelSelect(
            providerId,
            'transcription',
            models(config.transcriptionModels),
            config.selectedTranscriptionModel,
        );
        populateProviderModelSelect(
            providerId,
            'chat',
            models(config.chatModels),
            config.selectedChatModel,
        );
        updateProviderDisplay(providerId);
    }

    // ===== Providers d'une version plus récente =====

    /**
     * Liste les providers dont une version plus récente a écrit la clé extraProvider.<id>.
     * Tout le stockage est lu, mais seuls les noms de clés servent : les réglages, clés API
     * comprises, ne sont jamais affichés ni journalisés
     * @param {number|null} [focusIndex=null] - Après un effacement, rang du bouton qui avait le
     *   focus : il passe au bouton suivant, ou au menu des providers s'il n'en reste aucun
     */
    function loadUnknownProviders(focusIndex = null) {
        // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
        chrome.storage.sync.get(null, (items) => {
            const ids = Object.keys(items ?? {})
                .filter((key) => key.startsWith(EXTRA_PREFIX))
                .map((key) => key.slice(EXTRA_PREFIX.length))
                .filter((id) => !Providers.getProvider(id));
            unknownProvidersList.replaceChildren(...ids.map(createUnknownProviderItem));
            unknownProvidersSection.style.display = ids.length ? 'block' : 'none';
            if (focusIndex !== null) {
                const buttons = unknownProvidersList.querySelectorAll('button');
                (buttons[Math.min(focusIndex, buttons.length - 1)] ?? providerSelector).focus();
            }
        });
    }

    /**
     * Ligne d'un provider d'une version plus récente : son identifiant, un bouton Effacer décrit
     * par cet identifiant, et la zone où s'affiche un échec
     * @param {string} providerId
     * @param {number} index - Rang dans la liste
     * @returns {HTMLLIElement}
     */
    function createUnknownProviderItem(providerId, index) {
        const item = document.createElement('li');
        const name = document.createElement('code');
        name.id = `unknownProvider${index}`;
        name.textContent = providerId;
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.i18n = 'unknownProviderDelete';
        button.textContent = i18n.getMessage('unknownProviderDelete');
        button.setAttribute('aria-describedby', name.id);
        const result = document.createElement('output');
        button.addEventListener('click', () =>
            deleteUnknownProvider(providerId, { button, result, index }),
        );
        item.append(name, button, result);
        return item;
    }

    /**
     * Efface les réglages d'un provider d'une version plus récente (contrat, point 4). Si la
     * sélection enregistrée ou gardée d'un service le vise, elle passe d'abord à un autre
     * provider ; sa clé est retirée ensuite. Un échec s'affiche dans sa ligne, qui reste en place
     * pour un nouvel essai ; le bouton est inactif pendant l'opération
     * @param {string} providerId
     * @param {{button: HTMLButtonElement, result: HTMLOutputElement, index: number}} row
     */
    function deleteUnknownProvider(providerId, row) {
        row.button.disabled = true;
        row.result.textContent = '';
        const showError = (error) => {
            row.button.disabled = false;
            row.result.textContent = i18n.getMessage('saveErrorMessage', { error: error.message });
        };
        // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
        chrome.storage.sync.get({ transcriptionProvider: null, chatProvider: null }, (stored) => {
            const previous = { ...futureSelection };
            const selected = [
                stored?.transcriptionProvider,
                stored?.chatProvider,
                previous.transcription,
                previous.chat,
            ].includes(providerId);
            if (futureSelection.transcription === providerId) futureSelection.transcription = null;
            if (futureSelection.chat === providerId) futureSelection.chat = null;
            if (!selected) {
                removeUnknownProvider(providerId, row, showError);
                return;
            }
            // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
            chrome.storage.sync.set(serviceSelection(getEnabledProviderIds()), () => {
                // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
                const error = chrome.runtime.lastError;
                if (error) {
                    Object.assign(futureSelection, previous);
                    showError(error);
                    return;
                }
                removeUnknownProvider(providerId, row, showError);
            });
        });
    }

    /**
     * Retire la clé extraProvider.<id> d'un provider d'une version plus récente, puis met la liste
     * à jour (la sélection, si elle le visait, est déjà passée à un autre provider)
     * @param {string} providerId
     * @param {{index: number}} row - Ligne du provider
     * @param {Function} showError - Affiche un échec dans la ligne
     */
    function removeUnknownProvider(providerId, row, showError) {
        // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
        chrome.storage.sync.remove(`${EXTRA_PREFIX}${providerId}`, () => {
            // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
            const error = chrome.runtime.lastError;
            if (error) {
                showError(error);
                return;
            }
            showStatus(i18n.getMessage('savedMessage'), 'success');
            loadUnknownProviders(row.index);
        });
    }

    // ===== Raccourci clavier sous Firefox =====

    // Accès aux sites du raccourci prioritaire (voir src/shortcut-guard.js), déclaré dans
    // content_scripts de manifest.firefox.json : pages web HTTP(S) et WebSocket uniquement,
    // par moindre privilège. En MV3, Firefox permet de retirer puis redemander ces origines.
    const SHORTCUT_GUARD_ORIGINS = ['*://*/*'];

    /**
     * Affiche le bouton et le statut du raccourci prioritaire selon la permission accordée
     * (textes traduits via data-i18n dans options.html)
     * @param {boolean} [denied=false] - true si l'utilisateur vient de refuser la permission
     * @returns {Promise<void>}
     */
    async function renderShortcutGuard(denied = false) {
        try {
            const granted = await chrome.permissions.contains({ origins: SHORTCUT_GUARD_ORIGINS });
            document.getElementById('shortcutGuardEnableButton').hidden = granted;
            document.getElementById('shortcutGuardDisableButton').hidden = !granted;
            document.getElementById('shortcutGuardEnabledStatus').hidden = !granted;
            document.getElementById('shortcutGuardDeniedStatus').hidden = granted || !denied;
        } catch (error) {
            logShortcutGuardError(error);
        }
    }

    /**
     * Demande l'accès aux sites. Firefox injecte alors src/shortcut-guard.js dans les pages
     * chargées ensuite. Utile après une mise à jour, qui n'accorde pas les nouvelles origines.
     */
    function enableShortcutGuard() {
        // Appel direct dans le gestionnaire de clic : attendre une promesse avant
        // permissions.request() ferait perdre le statut d'action utilisateur (MDN)
        chrome.permissions
            .request({ origins: SHORTCUT_GUARD_ORIGINS })
            .then((granted) => renderShortcutGuard(!granted))
            .catch(logShortcutGuardError);
    }

    /**
     * Retire l'accès aux sites. Firefox cesse alors d'injecter src/shortcut-guard.js.
     */
    function disableShortcutGuard() {
        chrome.permissions
            .remove({ origins: SHORTCUT_GUARD_ORIGINS })
            .then(() => renderShortcutGuard())
            .catch(logShortcutGuardError);
    }

    /**
     * Firefox : remplace les instructions Chrome de changement de raccourci et propose le
     * raccourci prioritaire pour les sites qui interceptent la combinaison (ex. chatgpt.com)
     * @returns {Promise<void>}
     */
    async function setupFirefoxShortcutSettings() {
        if (!navigator.userAgent.includes('Firefox')) return;

        document.getElementById('shortcutChromeInstructions').hidden = true;
        document.getElementById('shortcutFirefoxInstructions').hidden = false;

        // commands.openShortcutSettings() n'existe qu'à partir de Firefox 137
        if (typeof chrome.commands?.openShortcutSettings === 'function') {
            const openButton = document.getElementById('openShortcutSettings');
            openButton.hidden = false;
            openButton.addEventListener('click', () => {
                chrome.commands.openShortcutSettings().catch((error) => {
                    console.error('Erreur à l’ouverture de la gestion des raccourcis:', error);
                });
            });
        }

        // Firefox n'affiche et n'accorde les permissions d'hôte du manifest à l'installation
        // qu'à partir de la version 127 (MDN, manifest.json/host_permissions)
        const browserInfo = await chrome.runtime.getBrowserInfo?.();
        if (!browserInfo || Number.parseInt(browserInfo.version, 10) < 127) return;

        document.getElementById('shortcutGuard').hidden = false;
        document
            .getElementById('shortcutGuardEnableButton')
            .addEventListener('click', enableShortcutGuard);
        document
            .getElementById('shortcutGuardDisableButton')
            .addEventListener('click', disableShortcutGuard);
        chrome.permissions.onAdded.addListener(() => renderShortcutGuard());
        chrome.permissions.onRemoved.addListener(() => renderShortcutGuard());
        await renderShortcutGuard();
    }

    /**
     * Gère le clic sur les boutons toggle password des providers
     */
    function setupProviderPasswordToggles() {
        document.querySelectorAll('.provider-config .toggle-password').forEach((button) => {
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
    const providerCustomModelsCache = new Map(
        [...panels.keys()].map((id) => [id, { transcription: [], chat: [] }]),
    );

    /**
     * Peuple le sélecteur de modèles d'un provider (par défaut + personnalisés)
     * @param {string} providerId - ID du provider
     * @param {string} modelType - 'transcription' ou 'chat'
     * @param {string[]} customModels - Liste des modèles personnalisés
     * @param {string} selectedModel - Modèle actuellement sélectionné
     */
    function populateProviderModelSelect(
        providerId,
        modelType,
        customModels = [],
        selectedModel = null,
    ) {
        const elements = panels.get(providerId);
        if (!elements) return;

        const selectElement =
            modelType === 'transcription' ? elements.transcriptionSelect : elements.chatSelect;

        if (!selectElement) return;

        // Sauvegarder les modèles personnalisés dans le cache
        // eslint-disable-next-line security/detect-object-injection -- Faux positif : modelType vaut 'transcription' ou 'chat'
        providerCustomModelsCache.get(providerId)[modelType] = [...customModels];

        selectElement.innerHTML = '';

        // Récupérer les modèles par défaut depuis providers.js
        const providerDef = Providers.getProvider(providerId);
        let defaultModels = [];
        if (providerDef) {
            defaultModels =
                modelType === 'transcription'
                    ? providerDef.transcriptionModels
                    : providerDef.chatModels;
        }

        // Un modèle sauvegardé qui n'est plus proposé (retiré de providers.js) est ignoré :
        // on présélectionne alors le modèle par défaut au lieu de laisser la liste vide
        const isSelectedModelAvailable = Providers.isModelAvailable(
            providerId,
            modelType,
            selectedModel,
            customModels,
        );

        // Ajouter les modèles par défaut
        defaultModels.forEach((model) => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.id; // Nom technique
            if (model.default && !isSelectedModelAvailable) {
                option.selected = true;
            }
            selectElement.appendChild(option);
        });

        // Ajouter les modèles personnalisés
        customModels.forEach((modelId) => {
            // Ne pas ajouter si c'est déjà un modèle par défaut
            if (defaultModels.some((m) => m.id === modelId)) return;

            const option = document.createElement('option');
            option.value = modelId;
            option.textContent = `${modelId} (custom)`;
            option.dataset.isCustom = 'true';
            selectElement.appendChild(option);
        });

        // Sélectionner le modèle sauvegardé si présent
        if (isSelectedModelAvailable) {
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
        // eslint-disable-next-line security/detect-object-injection -- Faux positif : modelType vaut 'transcription' ou 'chat'
        return providerCustomModelsCache.get(providerId)?.[modelType] || [];
    }

    /**
     * Récupère le modèle sélectionné pour un provider
     * @param {string} providerId - ID du provider
     * @param {string} modelType - 'transcription' ou 'chat'
     * @returns {string} ID du modèle sélectionné
     */
    function getSelectedProviderModel(providerId, modelType) {
        const elements = panels.get(providerId);
        if (!elements) return null;

        const selectElement =
            modelType === 'transcription' ? elements.transcriptionSelect : elements.chatSelect;

        return selectElement?.value || null;
    }

    /**
     * Récupère les éléments DOM pour l'ajout de modèle
     * @param {string} providerId - ID du provider
     * @param {string} modelType - 'transcription' ou 'chat'
     * @returns {{input: HTMLInputElement, select: HTMLSelectElement}|null}
     */
    function getModelAddElements(providerId, modelType) {
        const elements = panels.get(providerId);
        if (!elements) return null;

        const input =
            modelType === 'transcription' ? elements.newTranscriptionInput : elements.newChatInput;
        const select =
            modelType === 'transcription' ? elements.transcriptionSelect : elements.chatSelect;
        return input && select ? { input, select } : null;
    }

    /**
     * Ajoute un modèle au cache s'il n'existe pas
     * @param {string} providerId - ID du provider
     * @param {string} modelType - Type de modèle
     * @param {string} model - Nom du modèle
     */
    function addModelToCache(providerId, modelType, model) {
        // eslint-disable-next-line security/detect-object-injection -- Faux positif : modelType vaut 'transcription' ou 'chat'
        const cache = providerCustomModelsCache.get(providerId)[modelType];
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

        const existingOptions = Array.from(elements.select.options).map((opt) => opt.value);
        if (existingOptions.includes(newModel)) {
            elements.input.value = '';
            elements.select.value = newModel;
            // Pas de sauvegarde ici, comme avant ; la suivante reprendra ce choix
            modifiedExtraProviders.add(providerId);
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
        modifiedExtraProviders.add(providerId);
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
    const currentLang = await new Promise((resolve) => {
        // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
        chrome.storage.sync.get(
            {
                interfaceLanguage: null, // On initialise à null pour vérifier si une valeur existe
            },
            (result) => {
                // Si interfaceLanguage est null, on utilise la langue du navigateur
                // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
                resolve(result.interfaceLanguage || chrome.i18n.getUILanguage());
            },
        );
    });

    interfaceLanguageSelect.value = currentLang;

    // Charger les options sauvegardées
    function loadOptions() {
        // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
        chrome.storage.sync.get(
            {
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
                forcedDialogDomains: ['chat.google.com'],
            },
            (items) => {
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
            },
        );
    }

    // Sauvegarder les options
    function saveOptions(scrollToStatus = true) {
        // Config providers d'abord : arrêter si la validation a échoué
        const providersUpdate = providersStorageUpdate();
        if (!providersUpdate) {
            return;
        }

        const options = {
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
            forcedDialogDomains: Array.from(domainsList.children).map((item) =>
                item.textContent.replace('×', '').trim(),
            ),
        };

        // Une seule écriture : les clés des providers (historiques, puis générés modifiés), puis
        // les options générales. Un échec (quota dépassé par exemple) est affiché, et la saisie
        // reste en place
        const extraUpdate = extraProvidersUpdate();
        // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
        chrome.storage.sync.set({ ...providersUpdate, ...extraUpdate.writes, ...options }, () => {
            // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
            const error = chrome.runtime.lastError;
            if (error) {
                console.error('[Options] Error saving:', error.message);
                extraWriteFailed(extraUpdate);
                showStatus(i18n.getMessage('saveErrorMessage', { error: error.message }), 'error');
            } else {
                extraWriteSucceeded(extraUpdate);
                // skipcq: JS-0002 - debug log for options saving success
                // eslint-disable-next-line no-console -- Debug log for options saving success
                console.log('[Options] Config saved successfully');
                showStatus(i18n.getMessage('savedMessage'), 'success');
            }
            if (scrollToStatus) {
                statusElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Mettre à jour les états dépendants
            updateTranslationOptionsVisibility();
            updateColorPreview();
            displayForcedDomains(options.forcedDialogDomains);
            for (const providerId of panels.keys()) {
                updateProviderDisplay(providerId);
            }
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
        domains.forEach((domain) => {
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

    /**
     * Écouteurs d'un panneau : activation, clé API et URLs (avec debounce pour les inputs)
     * @param {string} providerId - ID du provider
     * @param {Object} elements - Éléments du panneau
     */
    function setupPanelListeners(providerId, elements) {
        const refresh = () => {
            modifiedExtraProviders.add(providerId);
            updateProviderDisplay(providerId);
            debouncedSaveOptions();
        };
        elements.enabled.addEventListener('change', refresh);
        elements.apiKey.addEventListener('input', () => {
            // Activer automatiquement le provider si une clé est saisie
            if (elements.apiKey.value.trim()) {
                elements.enabled.checked = true;
            }
            refresh();
        });
        for (const [, input] of elements.urls) {
            input.addEventListener('input', refresh);
        }
    }

    // Event listeners - Providers
    panels.forEach((elements, providerId) => setupPanelListeners(providerId, elements));

    // Event listeners - Modèles pour tous les providers
    panels.forEach((elements, providerId) => {
        // Boutons d'ajout de modèles
        if (elements.addTranscriptionButton) {
            elements.addTranscriptionButton.addEventListener('click', () =>
                addProviderModel(providerId, 'transcription'),
            );
        }
        if (elements.addChatButton) {
            elements.addChatButton.addEventListener('click', () =>
                addProviderModel(providerId, 'chat'),
            );
        }
        // Sélecteurs de modèles
        const modelChanged = () => {
            modifiedExtraProviders.add(providerId);
            debouncedSaveOptions();
        };
        if (elements.transcriptionSelect) {
            elements.transcriptionSelect.addEventListener('change', modelChanged);
        }
        if (elements.chatSelect) {
            elements.chatSelect.addEventListener('change', modelChanged);
        }
    });

    // Changer un sélecteur de service remplace une sélection d'une version plus récente
    transcriptionProviderSelect.addEventListener('change', () => {
        futureSelection.transcription = null;
        debouncedSaveOptions();
    });
    chatProviderSelect.addEventListener('change', () => {
        futureSelection.chat = null;
        debouncedSaveOptions();
    });

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
    loadUnknownProviders();
    loadOptions();
    // eslint-disable-next-line no-undef -- chrome est un global fourni par l'environnement d'extension Chrome
    chrome.storage.onChanged.addListener(handleStorageChanges);

    // Initialiser le nouveau design dropdown + panel
    showProviderConfig(providerSelector.value);
    updateDropdownStatus();

    // Firefox : instructions de raccourci et raccourci prioritaire (sans bloquer le reste)
    setupFirefoxShortcutSettings().catch((error) => {
        console.error('Erreur lors de la configuration du raccourci Firefox:', error);
    });
});
