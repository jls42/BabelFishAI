// Adaptateurs de formats d'API (src/utils/provider-adapters.js) : entêtes d'authentification,
// politique de redirection, corps des requêtes et lecture des réponses.
import { test } from 'node:test';
import { FakeFileReader, describeRequest, loadScripts, setupEnv } from './helpers/env.mjs';
import { GEMINI_ERRORS } from './helpers/fixtures.mjs';
import { createSnapshots } from './helpers/snapshot.mjs';

setupEnv({ browser: 'chrome' });
await loadScripts(['src/utils/providers.js', 'src/utils/provider-adapters.js'], {
    optional: ['src/utils/provider-adapters.js'],
});
const registry = globalThis.BabelFishAIProviders;
const adapters = globalThis.BabelFishAIProviderAdapters;
const matchSnapshot = createSnapshots(import.meta.url);

const BEARER = { header: 'Authorization', scheme: 'Bearer' };
const GOOGLE = { header: 'x-goog-api-key' };

test('entêtes et redirections', () => {
    const caller = {
        Authorization: 'Bearer cle-intruse',
        authorization: 'Bearer cle-intruse-minuscules',
        'X-Goog-Api-Key': 'cle-intruse-google',
        'Content-Type': 'application/json',
        'X-Autre': 'garde',
    };
    const names = registry.authHeaderNames;
    // Entête d'un provider à venir, déclaré dans le registre
    registry.authHeaderNames = () => new Set([...names(), 'x-goog-api-key']);
    try {
        matchSnapshot('entêtes et redirections', {
            bearer: adapters.authHeaders(BEARER, 'cle-openai-factice'),
            sansSchema: adapters.authHeaders(GOOGLE, 'cle-gemini-factice'),
            requeteBearer: adapters.requestHeaders(
                caller,
                adapters.authHeaders(BEARER, 'cle-openai-factice'),
            ),
            messageProxy: adapters.requestHeaders(caller, {}),
            sansEntetes: adapters.requestHeaders(undefined, adapters.authHeaders(BEARER, 'k')),
            redirection: {
                bearer: adapters.redirectPolicy(BEARER),
                minuscules: adapters.redirectPolicy({ header: 'authorization' }),
                google: adapters.redirectPolicy(GOOGLE),
            },
            nomsDuRegistre: [...names()],
        });
    } finally {
        registry.authHeaderNames = names;
    }
});

test('corps et lecture des réponses', async () => {
    const chat = adapters.getAdapter('openai-chat');
    const multipart = adapters.getAdapter('openai-multipart');
    const messages = [{ role: 'user', content: 'Bonjour' }];
    const form = multipart.buildBody({
        audioBlob: new Blob([new Uint8Array([1, 2, 3])], { type: 'audio/webm' }),
        filename: 'audio.webm',
        model: 'gpt-transcribe',
    });
    let unknown;
    try {
        adapters.getAdapter('format-inconnu');
    } catch (error) {
        unknown = error.message;
    }
    matchSnapshot('corps et lecture des réponses', {
        chatSimple: chat.buildBody({ model: 'm', messages }),
        chatComplet: chat.buildBody({ model: 'm', messages, temperature: 0.1, noLog: true }),
        multipart: (await describeRequest('https://x.example', { body: form })).body,
        texteChaine: chat.extractText({ choices: [{ message: { content: '  réponse  ' } }] }),
        texteBlocs: chat.extractText({
            choices: [
                {
                    message: {
                        content: [
                            { type: 'thinking', thinking: [] },
                            { type: 'text', text: 'a' },
                            { type: 'text', text: 'b ' },
                        ],
                    },
                },
            ],
        }),
        texteAbsent: chat.extractText({ choices: [{ message: {} }] }),
        transcription: multipart.extractText({ text: '\n Bonjour.  ' }),
        transcriptionVide: multipart.extractText({}),
        formatInconnu: unknown,
    });
});

test('audio en base64 : contenu, type ignoré, échec de lecture', async () => {
    const bytes = new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, 0xff, 0x00, 0x10]);
    FakeFileReader.failNext = true;
    const failure = await adapters.blobToBase64(new Blob([bytes])).catch((error) => error.name);
    matchSnapshot('audio en base64', {
        webm: await adapters.blobToBase64(new Blob([bytes], { type: 'audio/webm;codecs=opus' })),
        sansType: await adapters.blobToBase64(new Blob([bytes])),
        lectureImpossible: failure,
    });
});

test('messages des réponses en erreur', () => {
    const openai = adapters.getErrorReader('openai');
    let unknown;
    try {
        adapters.getErrorReader('format-inconnu');
    } catch (error) {
        unknown = error.message;
    }
    matchSnapshot('messages des réponses en erreur', {
        message: openai({ error: { message: 'Clé invalide', type: 'invalid_request_error' } }),
        sansMessage: openai({ error: {} }) ?? null,
        detailMistral: openai({ detail: [{ msg: 'champ manquant' }] }) ?? null,
        formatInconnu: unknown,
    });
});

test('erreurs au format gemini : message et clé refusée', () => {
    const gemini = adapters.getErrorReader('gemini');
    const bodies = { ...GEMINI_ERRORS, 'tableau vide': [], 'corps null': null };
    const result = Object.fromEntries(
        Object.entries(bodies).map(([name, body]) => [
            name,
            { message: gemini(body) ?? null, cleRefusee: adapters.rejectsKey('gemini', body) },
        ]),
    );
    // Le format OpenAI ne reconnaît aucune clé refusée : ses providers répondent alors 401
    result['openai : clé refusée ?'] = adapters.rejectsKey('openai', GEMINI_ERRORS['cle-native']);
    matchSnapshot('erreurs au format gemini', result);
});

test('formats déclarés par le registre, tous connus des adaptateurs', () => {
    const result = {};
    for (const provider of Object.values(registry.getAllProviders())) {
        for (const [service, definition] of Object.entries(provider.services)) {
            adapters.getAdapter(definition.format);
            adapters.getErrorReader(definition.errors);
            result[`${provider.id}.${service}`] = [definition.format, definition.errors];
        }
    }
    adapters.getErrorReader(registry.DEFAULT_SERVICE.errors);
    matchSnapshot('formats déclarés par le registre', result);
});
