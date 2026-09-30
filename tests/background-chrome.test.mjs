// Background sous Chrome (service worker) : en plus, il charge les modules des providers par
// importScripts, et doit démarrer même quand ce chargement échoue (le proxy refuse alors les
// requêtes).
import { test } from 'node:test';
import { defineBackgroundSuite } from './helpers/background-suite.mjs';

const { env, freshBackground, matchSnapshot } = defineBackgroundSuite({
    browser: 'chrome',
    testFileUrl: import.meta.url,
});

test('modules des providers introuvables par importScripts : signalé, le service worker démarre', async () => {
    const importScripts = globalThis.importScripts;
    const consoleError = console.error;
    const errors = [];
    globalThis.importScripts = (...files) => {
        if (files.includes('utils/providers.js')) {
            throw new Error("Failed to execute 'importScripts' on 'WorkerGlobalScope'");
        }
        importScripts(...files);
    };
    console.error = (...args) => errors.push(args.join(' '));
    try {
        await freshBackground({});
    } finally {
        console.error = consoleError;
        globalThis.importScripts = importScripts;
    }
    const ecoutes = Object.keys(env.listeners).filter((name) => env.listeners[name].length > 0);
    matchSnapshot('modules introuvables au démarrage', { erreurs: errors, ecoutes });
});
