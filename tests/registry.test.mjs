// Forme publique du registre des providers (src/utils/providers.js) : ses données et la réponse
// de chaque accesseur. Une évolution du registre doit apparaître ici, champ par champ.
import { test } from 'node:test';
import { loadScripts, setupEnv } from './helpers/env.mjs';
import { createSnapshots } from './helpers/snapshot.mjs';

setupEnv({ browser: 'chrome' });
await loadScripts(['src/utils/providers.js']);
const registry = globalThis.BabelFishAIProviders;
const matchSnapshot = createSnapshots(import.meta.url);
const IDS = ['openai', 'mistral', 'custom', 'gemini', '__proto__', 'constructor'];
const SERVICES = ['transcription', 'chat'];

test('données du registre', () => {
    matchSnapshot('données du registre', {
        providers: registry.PROVIDERS,
        ordre: registry.PROVIDER_ORDER,
        exports: Object.keys(registry).sort(),
    });
});

/**
 * Réponses des accesseurs pour un identifiant
 * @param {string} id
 * @returns {Object}
 */
function accessorsFor(id) {
    const result = {
        getProvider: registry.getProvider(id)?.id ?? null,
        getTranscriptionUrl: registry.getTranscriptionUrl(id, ''),
        getChatUrl: registry.getChatUrl(id, ''),
        urlsPersonnalisees: [
            registry.getTranscriptionUrl(id, ' http://localhost:4000/t '),
            registry.getChatUrl(id, 'x'),
        ],
        supportsNoLog: registry.supportsNoLog(id),
        acceptsTemperature: ['gpt-4o-mini', 'gpt-5.6-luna', 'inconnu'].map(
            (model) => registry.acceptsTemperature?.(id, model) ?? null,
        ),
    };
    for (const service of SERVICES) {
        result[`getDefaultModel(${service})`] = registry.getDefaultModel(id, service);
        result[`isModelAvailable(${service}, perso)`] = registry.isModelAvailable(
            id,
            service,
            'perso',
            ['perso'],
        );
        result[`isModelAvailable(${service}, inconnu)`] = registry.isModelAvailable(
            id,
            service,
            'inconnu',
        );
        result[`getService(${service})`] = registry.getService?.(id, service) ?? null;
        result[`supportsService(${service})`] = registry.supportsService?.(id, service) ?? null;
    }
    return result;
}

test('accesseurs par provider', () => {
    // Object.fromEntries crée de vraies propriétés, y compris « __proto__ »
    matchSnapshot(
        'accesseurs par provider',
        Object.fromEntries(IDS.map((id) => [id, accessorsFor(id)])),
    );
});

test('accesseurs transverses', () => {
    matchSnapshot('accesseurs transverses', {
        getProviderOrder: registry.getProviderOrder(),
        getUiOrder: registry.getUiOrder?.() ?? null,
        getEnabledProviders: [
            registry.getEnabledProviders(null),
            registry.getEnabledProviders({
                openai: { enabled: true, apiKey: 'k' },
                mistral: { enabled: true },
                custom: { enabled: true, apiKey: 'k' },
            }),
        ],
        getAllModels: SERVICES.map((s) =>
            registry.getAllModels(s, ['openai', 'mistral', 'custom'], ['perso']),
        ),
        parseFullModelId: [
            'openai/gpt-4o-mini',
            'mistral/x',
            '__proto__/x',
            'gpt-4o-mini',
            'voxtral-mini-latest',
            '',
            null,
        ].map((m) => registry.parseFullModelId(m)),
        detectProviderFromModel: [
            'gpt-4o-mini',
            'whisper-1',
            'mistral-small-latest',
            'voxtral-mini-latest',
            'codestral-latest',
            'inconnu',
        ].map((m) => registry.detectProviderFromModel(m)),
        createDefaultProvidersConfig: registry.createDefaultProvidersConfig(),
        isValidUrl: [
            'https://api.example.com/v1',
            'http://localhost:4000',
            'http://127.0.0.1:1/x',
            'http://example.com',
            'ftp://x',
            'pas une url',
            '',
        ].map((u) => registry.isValidUrl(u)),
    });
});
