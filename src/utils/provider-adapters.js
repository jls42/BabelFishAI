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
     * @param {string} [request.reasoningEffort] - Effort de réflexion déclaré pour le modèle
     *   (reasoning_effort), omis si non fourni
     * @returns {string} Corps sérialisé
     */
    function buildChatBody({ model, messages, temperature, noLog, reasoningEffort }) {
        const payload = { model, messages };
        if (temperature !== undefined) {
            payload.temperature = temperature;
        }
        // Ajouter l'option no-log si demandé
        if (noLog) {
            payload['no-log'] = true;
        }
        if (reasoningEffort) {
            payload.reasoning_effort = reasoningEffort;
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
     * Contenu d'un Blob en base64, sans le préfixe « data:…;base64, », lu par
     * FileReader.readAsDataURL : pour le proxy Firefox, et pour un audio envoyé dans du JSON
     * @param {Blob} blob
     * @returns {Promise<string>} Rejetée si la lecture échoue
     */
    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            // `loadend` suit aussi un échec ou une annulation : `result` vaut alors null
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result.split(',')[1]);
                } else {
                    reject(reader.error ?? new Error('Lecture du fichier impossible'));
                }
            };
            reader.readAsDataURL(blob);
        });
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

    /**
     * Corps JSON d'une transcription par l'Interactions API de Gemini : l'audio en base64 dans la
     * requête, avec son type MIME sans paramètre (audio/webm), et store: false pour que Google ne
     * garde pas l'interaction (1 jour en offre gratuite, 55 jours en payant, doc Interactions API)
     * @param {Object} request
     * @param {Blob} request.audioBlob - Audio enregistré
     * @param {string} request.model - Modèle de transcription
     * @returns {Promise<string>} Corps sérialisé
     */
    async function buildInteractionsTranscriptionBody({ audioBlob, model }) {
        const mimeType = audioBlob.type.split(';')[0] || 'audio/webm';
        const data = await blobToBase64(audioBlob);
        return JSON.stringify({
            model,
            input: [{ type: 'audio', data, mime_type: mimeType }],
            store: false,
        });
    }

    /**
     * Texte d'une transcription par l'Interactions API : blocs de texte des étapes model_output.
     * Seule une interaction terminée (status « completed ») est insérée : « incomplete » (limite
     * de jetons atteinte), « failed » ou tout autre statut lèvent une erreur
     * @param {Object} data - Ressource Interaction renvoyée par l'API
     * @returns {string} Le texte, suivi d'une espace
     * @throws {Error} Si l'interaction n'est pas terminée
     */
    function extractInteractionsText(data) {
        if (data?.status !== 'completed') {
            throw new Error(`Transcription inachevée (statut : ${data?.status ?? 'absent'})`);
        }
        const steps = Array.isArray(data.steps) ? data.steps : [];
        const text = steps
            .filter((step) => step?.type === 'model_output' && Array.isArray(step.content))
            .flatMap((step) => step.content)
            .filter((block) => block?.type === 'text' && typeof block.text === 'string')
            .map((block) => block.text)
            .join('');
        return `${text.trim()} `;
    }

    const ADAPTERS = Object.freeze({
        'openai-chat': Object.freeze({ buildBody: buildChatBody, extractText: extractMessageText }),
        'openai-multipart': Object.freeze({
            buildBody: buildTranscriptionBody,
            extractText: extractTranscriptionText,
        }),
        'gemini-interactions': Object.freeze({
            buildBody: buildInteractionsTranscriptionBody,
            extractText: extractInteractionsText,
            headers: Object.freeze({ 'Content-Type': 'application/json' }),
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

    /**
     * Objet `error` d'une réponse en erreur de l'API Gemini : { error: { code, message, status,
     * details } } pour l'API native, le même objet dans un tableau pour l'Interactions API et la
     * couche compatible OpenAI (mesuré le 2026-09-29 avec une clé invalide)
     * @param {Object|Array} data - Corps JSON de la réponse en erreur
     * @returns {Object|undefined}
     */
    function geminiError(data) {
        return (Array.isArray(data) ? data[0] : data)?.error;
    }

    /**
     * Message d'une réponse en erreur de l'API Gemini
     * @param {Object|Array} data - Corps JSON de la réponse en erreur
     * @returns {string|undefined} Message de l'API, undefined s'il n'y en a pas
     */
    function geminiErrorMessage(data) {
        return geminiError(data)?.message;
    }

    /**
     * Indique si l'API Gemini refuse la clé. Elle répond alors HTTP 400, et non 401, avec la
     * raison API_KEY_INVALID (API native, Interactions API) ou un message seul (couche compatible
     * OpenAI : « Please pass a valid API key »)
     * @param {Object|Array} data - Corps JSON de la réponse en erreur
     * @returns {boolean}
     */
    function geminiRejectsKey(data) {
        const error = geminiError(data);
        const details = Array.isArray(error?.details) ? error.details : [];
        return (
            details.some((detail) => detail?.reason === 'API_KEY_INVALID') ||
            /\bAPI key\b/i.test(error?.message ?? '')
        );
    }

    // Formats d'erreurs : lecture du message, et reconnaissance d'une clé refusée pour un
    // provider qui ne répond pas 401 dans ce cas
    const ERROR_FORMATS = Object.freeze({
        openai: Object.freeze({ message: openaiErrorMessage }),
        gemini: Object.freeze({ message: geminiErrorMessage, rejectsKey: geminiRejectsKey }),
    });

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
     * Adaptateur d'un format d'API. Pour la dictée, `buildBody` peut renvoyer une promesse (audio
     * encodé dans un corps JSON), et `headers` donne les entêtes propres au format
     * @param {string} format - Format déclaré par le registre (ex. 'openai-chat')
     * @returns {{buildBody: Function, extractText: Function, headers?: Object}}
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
        return fromTable(ERROR_FORMATS, format, "Format d'erreurs").message;
    }

    /**
     * Indique si une réponse en erreur refuse la clé API, pour un format d'erreurs qui le déclare
     * (un provider qui répond 401 dans ce cas n'en a pas besoin)
     * @param {string} format - Format d'erreurs déclaré par le registre (ex. 'gemini')
     * @param {*} data - Corps JSON de la réponse en erreur
     * @returns {boolean}
     * @throws {Error} Si le format est inconnu
     */
    function rejectsKey(format, data) {
        const reader = fromTable(ERROR_FORMATS, format, "Format d'erreurs");
        return reader.rejectsKey?.(data) ?? false;
    }

    return {
        authHeaders,
        requestHeaders,
        redirectPolicy,
        blobToBase64,
        getAdapter,
        getErrorReader,
        rejectsKey,
    };
})();
