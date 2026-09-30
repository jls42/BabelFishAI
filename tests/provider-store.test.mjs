// Stockage des providers (src/utils/provider-store.js) : règle d'URL de l'invariant de sécurité,
// commune au content script et au background, clés à lire, et clé résolue.
import { test } from 'node:test';
import { loadScripts, setupEnv } from './helpers/env.mjs';
import { STORAGE } from './helpers/fixtures.mjs';
import { createSnapshots } from './helpers/snapshot.mjs';

setupEnv({ browser: 'chrome' });
await loadScripts(['src/utils/providers.js', 'src/utils/provider-store.js'], {
    optional: ['src/utils/provider-store.js'],
});
const store = globalThis.BabelFishAIProviderStore;
const matchSnapshot = createSnapshots(import.meta.url);

// URL candidates, dont les formes qui ont servi à contourner des listes d'hôtes
const URLS = [
    'https://api.openai.com/v1/chat/completions',
    'https://API.OPENAI.COM/v1/chat/completions',
    'https://api.openai.com:443/v1/chat/completions',
    'https://api.openai.com:8443/v1/chat/completions',
    'http://api.openai.com/v1/chat/completions',
    'https://api.openai.com./v1/chat/completions',
    'https://api.openai.com@evil.example/v1/chat/completions',
    'https://evil.example/https://api.openai.com/v1',
    'https://api.mistral.ai/v1/chat/completions',
    'http://localhost:4000/v1/chat/completions',
    'http://localhost:9999/v1/chat/completions',
    'https://localhost:4000/v1/chat/completions',
    'http://127.0.0.1:4000/v1/chat/completions',
    'http://[::1]:4000/v1/chat/completions',
    'data:text/plain,bonjour',
    'pas une url',
    'https://generativelanguage.googleapis.com/v1beta/interactions',
    'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    'https://generativelanguage.googleapis.com.evil.example/v1beta/interactions',
    'https://evil.googleapis.com/v1beta/interactions',
    'https://generativelanguage.googleapis.com:8443/v1beta/interactions',
    'http://generativelanguage.googleapis.com/v1beta/interactions',
];

test('invariant : URL autorisées par provider', () => {
    const result = {};
    for (const [name, providerId] of [
        ['openai', 'openai'],
        ['mistral', 'mistral'],
        ['custom', 'custom'],
        ['openai', 'custom'],
        ['vide', 'openai'],
        ['gemini', 'gemini'],
        ['gemini', 'openai'],
        ['openai', 'gemini'],
    ]) {
        result[`${name} → ${providerId}`] = Object.fromEntries(
            URLS.map((url) => [url, store.isUrlAllowedForProvider(STORAGE[name], providerId, url)]),
        );
    }
    matchSnapshot('invariant : URL autorisées par provider', result);
});

test('clés de stockage à lire', () => {
    matchSnapshot('clés de stockage à lire', store.resolutionDefaults());
});

test('type de service inconnu : traité comme le chat', () => {
    const result = {};
    for (const service of [undefined, 'Chat', 'autre', 'chat']) {
        const resolved = store.resolveProvider(STORAGE.mixte, service);
        result[String(service)] = {
            provider: resolved.providerId,
            cle: store.resolveKey(STORAGE.mixte, resolved),
        };
    }
    matchSnapshot('type de service inconnu', result);
});

test('clé résolue', () => {
    const result = {};
    for (const name of Object.keys(STORAGE)) {
        for (const service of ['transcription', 'chat']) {
            const resolved = store.resolveProvider(STORAGE[name], service);
            result[`${name} (${service})`] = {
                provider: resolved.providerId,
                cle: store.resolveKey(STORAGE[name], resolved),
            };
        }
    }
    matchSnapshot('clé résolue', result);
});
