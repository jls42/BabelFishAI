// Requêtes envoyées sous Chrome : le content script appelle fetch directement.
import { test } from 'node:test';
import { defineRequestSuite } from './helpers/requests-suite.mjs';
import { STORAGE } from './helpers/fixtures.mjs';

const { env, play, matchSnapshot } = await defineRequestSuite({
    browser: 'chrome',
    testFileUrl: import.meta.url,
});

test('dictée : fetch direct, sans message au background', async () => {
    const before = env.calls.length;
    const played = await play('transcription', STORAGE.openai, [{ json: { text: 'ok' } }]);
    const messages = env.calls
        .slice(before)
        .filter((call) => call.api === 'runtime.sendMessage')
        .map((call) => call.args[0]);
    matchSnapshot('dictée sans proxy', {
        messagesAuBackground: messages,
        requetesDirectes: played.requetes.length,
    });
});
