// Règles du registre (src/utils/providers.js) dont dépend la page d'options : elle génère le
// panneau d'un provider ajouté d'après ces champs, sans code propre à ce provider.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadScripts, setupEnv } from './helpers/env.mjs';

setupEnv({ browser: 'chrome' });
await loadScripts(['src/utils/providers.js']);
const registry = globalThis.BabelFishAIProviders;
const SERVICES = ['transcription', 'chat'];

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
            // Une URL qui ne s'analyse pas masquerait le lien de la clé API
            assert.equal(new URL(provider.ui.keyUrl).protocol, 'https:', `${provider.id} : keyUrl`);
        }
    }
});
