// Déclarations globales par monde d'exécution. Les scripts classiques d'un même monde partagent
// la portée globale : deux `const` du même nom font échouer le chargement du second fichier, et
// un script réexécuté (nouvelle injection) échoue sur sa propre déclaration. Chaque module de
// src/utils/ tient donc dans une IIFE, et aucun nom n'est déclaré deux fois dans un monde.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { ROOT } from './helpers/env.mjs';
import { createSnapshots } from './helpers/snapshot.mjs';

const matchSnapshot = createSnapshots(import.meta.url);
/**
 * Contenu d'un fichier de l'arbre testé
 * @param {string} rel - Chemin relatif à la racine
 * @returns {string}
 */
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
// Fichiers qui déclarent volontairement au niveau global (service worker)
const GLOBAL_BY_DESIGN = new Set(['src/background.js', 'src/utils/languages-data.js']);

/**
 * Noms déclarés au niveau global d'un script classique (code formaté : colonne 0)
 * @param {string} rel
 * @returns {Array<string>}
 */
function topLevelNames(rel) {
    const pattern = /^(?:const|let|var|class|(?:async\s+)?function\*?)\s+([A-Za-z_$][\w$]*)/gm;
    return [...read(rel).matchAll(pattern)].map((m) => m[1]);
}

/** Fichiers injectés par executeScript dans le monde du content script */
function contentWorld() {
    const block = read('src/background.js').match(
        /executeScript\(\{[\s\S]*?files:\s*\[([\s\S]*?)\]/,
    )[1];
    return [...block.matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

/** Scripts du background Firefox (manifest), hors bibliothèques tierces */
function firefoxBackgroundWorld() {
    const manifest = JSON.parse(read('manifest.firefox.json'));
    return manifest.background.scripts.filter((f) => !f.startsWith('src/lib/'));
}

/** Service worker Chrome et les scripts qu'il importe */
function chromeBackgroundWorld() {
    const imported = [...read('src/background.js').matchAll(/importScripts\(([^)]*)\)/g)].flatMap(
        (m) => [...m[1].matchAll(/'([^']+)'/g)].map((f) => `src/${f[1]}`),
    );
    return [...imported, 'src/background.js'];
}

/** Scripts de la page d'options */
function optionsWorld() {
    const html = read('src/pages/options/options.html');
    return [...html.matchAll(/<script src="([^"]+)"/g)].map((m) =>
        path.posix.normalize(path.posix.join('src/pages/options', m[1])),
    );
}

const WORLDS = {
    'content script': contentWorld,
    'background Firefox': firefoxBackgroundWorld,
    'service worker Chrome': chromeBackgroundWorld,
    "page d'options": optionsWorld,
};

for (const [world, list] of Object.entries(WORLDS)) {
    test(`déclarations globales : ${world}`, () => {
        const files = list();
        const owners = new Map();
        const declared = {};
        for (const file of files) {
            declared[file] = topLevelNames(file);
            for (const name of declared[file]) {
                assert.ok(
                    !owners.has(name),
                    `${name} déclaré par ${owners.get(name)} et ${file} (${world})`,
                );
                owners.set(name, file);
            }
        }
        matchSnapshot(`déclarations globales : ${world}`, {
            fichiers: files,
            declarations: declared,
        });
    });
}

test('chaque module de src/utils/ tient dans son IIFE', () => {
    const utils = fs
        .readdirSync(path.join(ROOT, 'src/utils'))
        .filter((f) => f.endsWith('.js'))
        .map((f) => `src/utils/${f}`)
        .filter((f) => !GLOBAL_BY_DESIGN.has(f));
    for (const file of utils)
        assert.deepEqual(topLevelNames(file), [], `${file} déclare au niveau global`);
});
