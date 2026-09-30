// Modules du content script : background.js en injecte une partie par executeScript, puis
// content.js charge le reste par import(). Les tests des requêtes chargent ces modules
// directement : sans ce contrôle, un import retiré de content.js laisserait la suite verte
// alors que l'extension ne démarrerait plus l'enregistrement.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { ROOT } from './helpers/env.mjs';
import { CONTENT_SCRIPTS } from './helpers/requests-suite.mjs';
import { createSnapshots } from './helpers/snapshot.mjs';

const matchSnapshot = createSnapshots(import.meta.url);
/**
 * Contenu d'un fichier de l'arbre testé
 * @param {string} rel - Chemin relatif à la racine
 * @returns {string}
 */
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

/** Fichiers injectés par executeScript (background.js) */
function injected() {
    const block = read('src/background.js').match(
        /executeScript\(\{[\s\S]*?files:\s*\[([\s\S]*?)\]/,
    )[1];
    return [...block.matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

/** Modules que content.js charge par import(), dans l'ordre */
function imported() {
    const pattern = /import\(chrome\.runtime\.getURL\('([^']+)'\)\)/g;
    return [...read('src/content.js').matchAll(pattern)].map((m) => m[1]);
}

/**
 * Un chemin correspond-il à un motif de web_accessible_resources (un « * » par segment) ?
 * @param {string} file
 * @param {string} glob
 * @returns {boolean}
 */
function matchesGlob(file, glob) {
    const fileParts = file.split('/');
    const globParts = glob.split('/');
    return (
        fileParts.length === globParts.length &&
        globParts.every((part, i) => {
            const [before, after] = part.split('*');
            if (after === undefined) return part === fileParts[i];
            return (
                fileParts[i].length >= before.length + after.length &&
                fileParts[i].startsWith(before) &&
                fileParts[i].endsWith(after)
            );
        })
    );
}

/**
 * Ressources accessibles depuis une page, d'après un manifest
 * @param {string} manifest
 * @returns {Array<string>}
 */
function accessibleResources(manifest) {
    const entries = JSON.parse(read(manifest)).web_accessible_resources;
    return entries.flatMap((entry) => entry.resources);
}

test('modules du content script : ceux des tests sont bien chargés', () => {
    const world = new Set([...injected(), ...imported()]);
    // Un module absent de l'arbre testé (arbre de base, --ref) n'est pas chargé par les tests
    const present = CONTENT_SCRIPTS.filter((file) => fs.existsSync(path.join(ROOT, file)));
    assert.deepEqual(
        present.filter((file) => !world.has(file)),
        [],
        'modules chargés par les tests des requêtes, mais ni injectés ni importés',
    );
    matchSnapshot('modules du content script', { injectes: injected(), importes: imported() });
});

test('modules du content script : importables sous Chrome et Firefox', () => {
    for (const manifest of ['manifest.json', 'manifest.firefox.json']) {
        const resources = accessibleResources(manifest);
        for (const file of imported()) {
            assert.ok(fs.existsSync(path.join(ROOT, file)), `${file} absent de l'arbre`);
            assert.ok(
                resources.some((glob) => matchesGlob(file, glob)),
                `${file} hors des web_accessible_resources de ${manifest}`,
            );
        }
    }
});
