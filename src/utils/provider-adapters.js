// Adaptateurs des formats d'API déclarés par le registre (providers.js) : construction du corps
// des requêtes, entête d'authentification, lecture des réponses et des messages d'erreur.
// Sans DOM ni BabelFishAIConstants, pour servir aussi au background.
globalThis.BabelFishAIProviderAdapters = (function () {
    'use strict'; // skipcq: JS-0118 - 'use strict' inside IIFE is intentional for module isolation

    /**
     * Entête d'authentification d'un service, décrit par le registre (header, scheme)
     * @param {{header: string, scheme?: string}} auth - Authentification du service
     * @param {string} apiKey - Clé API
     * @returns {Object} Un seul entête, par exemple { Authorization: 'Bearer <clé>' }
     */
    function authHeaders(auth, apiKey) {
        const value = auth.scheme ? `${auth.scheme} ${apiKey}` : apiKey;
        return { [auth.header]: value };
    }

    /**
     * Entêtes d'une requête : l'authentification du service en tête, puis les entêtes fournis,
     * dont tout entête d'authentification connu du registre est retiré
     * @param {Object|undefined} headers - Entêtes fournis par l'appelant ou le message du proxy
     * @param {Object} authHeader - Entête construit par authHeaders ({} pour n'en poser aucun)
     * @returns {Object}
     */
    function requestHeaders(headers, authHeader) {
        const names = globalThis.BabelFishAIProviders.authHeaderNames();
        const others = Object.entries(headers ?? {}).filter(
            ([name]) => !names.has(name.toLowerCase()),
        );
        return { ...authHeader, ...Object.fromEntries(others) };
    }

    /**
     * Politique de redirection d'une requête authentifiée. Lors d'un changement d'origine, la
     * spec Fetch ne retire que l'entête Authorization : une clé portée par un autre entête
     * suivrait la redirection, qui est donc refusée
     * @param {{header: string}} auth - Authentification du service
     * @returns {'follow'|'error'}
     */
    function redirectPolicy(auth) {
        return auth.header.toLowerCase() === 'authorization' ? 'follow' : 'error';
    }

    /**
     * Corps JSON d'une requête chat/completions (format OpenAI)
     * @param {Object} request
     * @param {string} request.model - Modèle à utiliser
     * @param {Array<Object>} request.messages - Messages envoyés à l'API
     * @param {number} [request.temperature] - Omis si non fourni
     * @param {boolean} [request.noLog] - Ajoute l'option no-log (LiteLLM)
     * @returns {string} Corps sérialisé
     */
    function buildChatBody({ model, messages, temperature, noLog }) {
        const payload = { model, messages };
        if (temperature !== undefined) {
            payload.temperature = temperature;
        }
        // Ajouter l'option no-log si demandé
        if (noLog) {
            payload['no-log'] = true;
        }
        return JSON.stringify(payload);
    }

    /**
     * Extrait le texte de la réponse d'une API chat/completions. Le contenu est une chaîne ou,
     * pour les modèles Mistral qui raisonnent, une liste de blocs : seuls les blocs de texte
     * (TextChunk) sont gardés, la réflexion (ThinkChunk, type "thinking") est ignorée
     * (https://docs.mistral.ai/studio/conversations/reasoning).
     * @param {Object} response - Réponse JSON de l'API
     * @returns {string} Texte de la réponse sans espaces superflus, chaîne vide si absent
     */
    function extractMessageText(response) {
        const content = response.choices[0].message?.content;
        if (typeof content === 'string') {
            return content.trim();
        }
        if (Array.isArray(content)) {
            return content
                .filter((chunk) => chunk?.type !== 'thinking' && typeof chunk?.text === 'string')
                .map((chunk) => chunk.text)
                .join('')
                .trim();
        }
        return '';
    }

    /**
     * Corps multipart d'une transcription (format OpenAI) : le fichier audio, puis le modèle
     * @param {Object} request
     * @param {Blob} request.audioBlob - Audio enregistré
     * @param {string} request.filename - Nom du fichier envoyé
     * @param {string} request.model - Modèle de transcription
     * @returns {FormData}
     */
    function buildTranscriptionBody({ audioBlob, filename, model }) {
        const formData = new FormData();
        formData.append('file', audioBlob, filename);
        formData.append('model', model);
        return formData;
    }

    /**
     * Texte d'une réponse de transcription (format OpenAI)
     * @param {Object} data - Réponse JSON de l'API
     * @returns {string} Le texte, suivi d'une espace
     */
    function extractTranscriptionText(data) {
        // Nettoyer le texte transcrit pour éliminer les retours à la ligne superflus au début
        let text = data.text || '';
        text = text.trim();
        // Ajouter un espace à la fin pour permettre de continuer à dicter
        return `${text} `;
    }

    const ADAPTERS = Object.freeze({
        'openai-chat': Object.freeze({ buildBody: buildChatBody, extractText: extractMessageText }),
        'openai-multipart': Object.freeze({
            buildBody: buildTranscriptionBody,
            extractText: extractTranscriptionText,
        }),
    });

    /**
     * Message d'une réponse en erreur au format OpenAI : { error: { message } }
     * @param {Object} data - Corps JSON de la réponse en erreur
     * @returns {string|undefined} Message de l'API, undefined s'il n'y en a pas
     */
    function openaiErrorMessage(data) {
        return data.error?.message;
    }

    const ERROR_READERS = Object.freeze({ openai: openaiErrorMessage });

    /**
     * Entrée d'une table de formats
     * @param {Object} table - Table gelée, indexée par nom de format
     * @param {string} format - Format déclaré par le registre
     * @param {string} label - Nature du format, pour le message d'erreur
     * @returns {*}
     * @throws {Error} Si le format est inconnu
     */
    function fromTable(table, format, label) {
        if (!Object.hasOwn(table, format)) {
            throw new Error(`${label} inconnu : ${format}`);
        }
        // eslint-disable-next-line security/detect-object-injection -- format vérifié par Object.hasOwn
        return table[format];
    }

    /**
     * Adaptateur d'un format d'API
     * @param {string} format - Format déclaré par le registre (ex. 'openai-chat')
     * @returns {{buildBody: Function, extractText: Function}}
     * @throws {Error} Si le format est inconnu
     */
    function getAdapter(format) {
        return fromTable(ADAPTERS, format, "Format d'API");
    }

    /**
     * Lecteur du message d'une réponse en erreur, selon le format d'erreurs d'un service
     * @param {string} format - Format d'erreurs déclaré par le registre (ex. 'openai')
     * @returns {Function} (data) => message de l'API, ou undefined
     * @throws {Error} Si le format est inconnu
     */
    function getErrorReader(format) {
        return fromTable(ERROR_READERS, format, "Format d'erreurs");
    }

    return {
        authHeaders,
        requestHeaders,
        redirectPolicy,
        getAdapter,
        getErrorReader,
    };
})();
