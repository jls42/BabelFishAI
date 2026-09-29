// Règles du registre (src/utils/providers.js) dont dépend la page d'options : elle génère le
// panneau d'un provider ajouté d'après ces champs, sans code propre à ce provider.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { ROOT, loadScripts, setupEnv } from './helpers/env.mjs';

setupEnv({ browser: 'chrome' });
await loadScripts(['src/utils/providers.js']);
const registry = globalThis.BabelFishAIProviders;
const SERVICES = ['transcription', 'chat'];

test('règles du registre dont dépend la page d’options', () => {
    const providers = Object.values(registry.getAllProviders());
    const orders = providers.map((provider) => provider.ui.order);
    assert.equal(new Set(orders).size, orders.length, 'ordre d’affichage en double');
    for (const provider of providers) {
        // Même motif que unknownProviderId (options.js) : une version antérieure ne garde une
        // sélection écrite par une version plus récente que si l'identifiant a cette forme
        assert.match(provider.id, /^[a-z][a-z0-9-]*$/, `${provider.id} : forme de l'identifiant`);
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
            // Une URL qui ne s'analyse pas masquerait le lien de la clé API, et la note avec lui
            assert.equal(new URL(provider.ui.keyUrl).protocol, 'https:', `${provider.id} : keyUrl`);
        } else {
            // Leur panneau statique (options.html) n'afficherait pas une note déclarée ici
            assert.equal(provider.ui.noteKey, undefined, `${provider.id} : noteKey`);
        }
    }
});

test('chaque provider figure une fois dans l’ordre des providers', () => {
    // Le stockage (provider-store.js) ne lit la clé extraProvider.<id> d'un provider ajouté, et ne
    // le prend en repli, que s'il figure dans cet ordre : sans lui, sa clé ne serait jamais lue
    const ids = Object.keys(registry.getAllProviders()).sort();
    assert.deepEqual(registry.getProviderOrder().sort(), ids);
});

test('note d’un panneau : clé présente dans chaque langue', () => {
    // getMessage renvoie le nom de la clé quand elle manque : la note l'afficherait telle quelle
    const locales = fs.readdirSync(path.join(ROOT, '_locales'));
    assert.equal(locales.length, 15, 'nombre de langues');
    for (const provider of Object.values(registry.getAllProviders())) {
        if (!provider.ui.noteKey) continue;
        for (const locale of locales) {
            const file = path.join(ROOT, '_locales', locale, 'messages.json');
            const messages = JSON.parse(fs.readFileSync(file, 'utf8'));
            assert.ok(messages[provider.ui.noteKey]?.message, `${provider.id} : ${locale}`);
        }
    }
});
