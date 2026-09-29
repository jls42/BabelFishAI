// Forme publique du registre des providers (src/utils/providers.js) : ses données et la réponse
// de chaque accesseur. Une évolution du registre doit apparaître ici, champ par champ.
import assert from 'node:assert/strict';
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
        providers: registry.getAllProviders(),
        ordre: registry.getProviderOrder(),
        gele: Object.isFrozen(registry.getProvider('openai').defaultUrls),
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

test('règles du registre dont dépend la page d’options', () => {
    const providers = Object.values(registry.getAllProviders());
    const orders = providers.map((provider) => provider.ui.order);
    assert.equal(new Set(orders).size, orders.length, 'ordre d’affichage en double');
    for (const provider of providers) {
        // Règle du propriétaire (29/09) : un provider offre la dictée ET le texte
        for (const service of SERVICES) {
            assert.ok(
                registry.supportsService(provider.id, service),
                `${provider.id} : ${service}`,
            );
        }
        assert.ok(provider.ui.short && provider.ui.statusName, `${provider.id} : ui incomplet`);
        assert.ok(provider.ui.logo || provider.ui.emoji, `${provider.id} : ni logo ni emoji`);
        // Seul Custom demande des URLs : un panneau généré n'a pas de champ d'URL
        const urlSettings = Object.values(provider.services).filter((s) => s.urlSetting);
        assert.equal(urlSettings.length > 0, provider.id === 'custom', `${provider.id} : URLs`);
        // Un provider ajouté depuis les trois historiques a un lien vers sa page de clés API
        if (!['openai', 'mistral', 'custom'].includes(provider.id)) {
            assert.ok(provider.ui.keyUrl?.startsWith('https://'), `${provider.id} : keyUrl`);
        }
    }
});
