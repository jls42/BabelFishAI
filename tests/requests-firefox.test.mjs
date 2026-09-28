// Requêtes envoyées sous Firefox : le content script passe par le proxy du vrai background.js
// (message proxyFetch, audio sérialisé en base64, FormData reconstruit dans le background).
import { test } from 'node:test';
import { defineRequestSuite } from './helpers/requests-suite.mjs';
import { STORAGE } from './helpers/fixtures.mjs';

const { env, play, matchSnapshot, FakeFileReader } = await defineRequestSuite({
    browser: 'firefox',
    testFileUrl: import.meta.url,
});

test('proxy : messages envoyés au background pour une dictée', async () => {
    const before = env.calls.length;
    await play('transcription', STORAGE.openai, [{ json: { text: 'ok' } }]);
    const messages = env.calls.slice(before).filter((c) => c.api === 'runtime.sendMessage').map((c) => c.args[0]);
    matchSnapshot('proxy : message de dictée', messages);
});

test('proxy : lecture de l’audio impossible (FileReader en échec)', async () => {
    FakeFileReader.failNext = true;
    matchSnapshot('proxy : FileReader en échec', await play('transcription', STORAGE.openai, [{ json: { text: 'ok' } }]));
});

test('proxy : enveloppe de réponse invalide (background injoignable)', async () => {
    const handler = env.handlers.runtimeMessage;
    env.handlers.runtimeMessage = () => undefined;
    try {
        matchSnapshot('proxy : enveloppe invalide', await play('reformulation', STORAGE.openai, []));
    } finally {
        env.handlers.runtimeMessage = handler;
    }
});
