// Background sous Firefox (scripts classiques) : en plus, il publie le raccourci courant dans
// storage.local pour src/shortcut-guard.js, à l'installation, au démarrage et à chaque changement.
import { test } from 'node:test';
import { defineBackgroundSuite } from './helpers/background-suite.mjs';

const { env, emit, freshBackground, matchSnapshot, effects } = defineBackgroundSuite({
    browser: 'firefox',
    testFileUrl: import.meta.url,
});

test('raccourci prioritaire : démarrage et changement de raccourci', async () => {
    await freshBackground({});
    await emit('runtime.onStartup');
    const demarrage = { effets: effects(), local: structuredClone(env.stores.local) };
    env.calls.length = 0;
    await emit('commands.onChanged', { name: '_execute_action', newShortcut: 'Ctrl+Shift+2' });
    matchSnapshot('raccourci prioritaire', { demarrage, changement: { effets: effects(), local: env.stores.local } });
});
