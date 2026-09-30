// Tests entre versions : chaque version publiée (1.1.17 à 1.1.20) et l'arbre testé jouent les
// mêmes stockages, chacune dans son propre processus. Les instantanés montrent quelle clé part
// vers quel hôte : exigence pour l'arbre testé, défauts connus pour les versions publiées.
import { spawnSync, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { REPO_ROOT, ROOT } from './helpers/env.mjs';
import { createSnapshots } from './helpers/snapshot.mjs';

const PROBE = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'helpers',
    'version-probe.mjs',
);
const matchSnapshot = createSnapshots(import.meta.url);

/**
 * Extrait le code d'une version dans un dossier temporaire, ou null si la référence manque
 * (clone superficiel sans les tags)
 * @param {string} ref
 * @returns {string|null}
 */
function extract(ref) {
    try {
        execFileSync('git', ['rev-parse', '--verify', '--quiet', `${ref}^{commit}`], {
            cwd: REPO_ROOT,
        });
    } catch {
        return null;
    }
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), `babelfishai-${ref}-`));
    const tar = execFileSync('git', ['archive', ref, 'src', '_locales', 'manifest.json'], {
        cwd: REPO_ROOT,
        maxBuffer: 1e9,
    });
    execFileSync('tar', ['-x', '-C', dir], { input: tar });
    return dir;
}

/**
 * Lance la sonde sur un arbre et renvoie ses résultats
 * @param {string} root
 * @returns {Object}
 */
function runProbe(root) {
    const out = spawnSync(process.execPath, [PROBE], {
        env: { ...process.env, BABELFISH_ROOT: root },
        encoding: 'utf8',
        maxBuffer: 1e8,
    });
    if (out.status !== 0) throw new Error(`sonde en échec (${root}) : ${out.stderr.slice(-800)}`);
    return JSON.parse(out.stdout);
}

for (const ref of ['v1.1.17', 'v1.1.18', 'v1.1.19', 'v1.1.20']) {
    test(`version publiée ${ref}`, (t) => {
        const dir = extract(ref);
        if (!dir) {
            t.skip(`référence ${ref} absente de ce clone`);
            return;
        }
        try {
            for (const [name, result] of Object.entries(runProbe(dir)))
                matchSnapshot(`${ref} : ${name}`, result);
        } finally {
            fs.rmSync(dir, { recursive: true, force: true });
        }
    });
}

test('arbre testé', () => {
    for (const [name, result] of Object.entries(runProbe(ROOT)))
        matchSnapshot(`arbre testé : ${name}`, result);
});
