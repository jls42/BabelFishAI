// Instantanés JSON : relevés en exécutant le code (UPDATE_SNAPSHOTS=1), puis comparés.
// Un fichier par fichier de test, dans tests/snapshots/.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { KEYS } from './fixtures.mjs';

/**
 * Trie récursivement les clés d'objet pour un fichier stable
 * @param {*} value
 * @returns {*}
 */
function sortKeys(value) {
    if (Array.isArray(value)) return value.map(sortKeys);
    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.keys(value)
                .sort()
                .map((k) => [k, sortKeys(value[k])]),
        );
    }
    return value;
}

/**
 * Prépare la comparaison aux instantanés d'un fichier de test
 * @param {string} testFileUrl - import.meta.url du fichier de test
 * @returns {Function} matchSnapshot(clé, valeur)
 */
export function createSnapshots(testFileUrl) {
    const testFile = fileURLToPath(testFileUrl);
    const name = path.basename(testFile).replace(/\.test\.mjs$/, '.json');
    const file = path.join(path.dirname(testFile), 'snapshots', name);
    const update = process.env.UPDATE_SNAPSHOTS === '1';
    const stored = !update && fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
    const seen = {};
    if (update) {
        process.on('exit', () => {
            fs.mkdirSync(path.dirname(file), { recursive: true });
            fs.writeFileSync(file, `${JSON.stringify(sortKeys(seen), null, 4)}\n`);
        });
    }
    return function matchSnapshot(key, value) {
        // undefined disparaît en JSON : le rendre visible. Chaque fausse clé devient un repère
        // `{cle <provider>}` : on lit quelle clé part vers quel hôte, et detect-secrets écarte
        // les valeurs en forme de gabarit
        let text = JSON.stringify(value, (_k, v) => (v === undefined ? '<undefined>' : v));
        for (const [provider, key] of Object.entries(KEYS)) text = text.replaceAll(key, `{cle ${provider}}`);
        const normalized = JSON.parse(text);
        assert.ok(!Object.hasOwn(seen, key), `clé d'instantané en double : ${key}`);
        seen[key] = normalized;
        if (update) return;
        assert.ok(
            Object.hasOwn(stored, key),
            `instantané absent : « ${key} » (relever avec UPDATE_SNAPSHOTS=1 scripts/run-tests.sh)`,
        );
        assert.deepStrictEqual(normalized, stored[key], `instantané différent : « ${key} »`);
    };
}
