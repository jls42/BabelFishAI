// Raccourci prioritaire de BabelFishAI (Firefox uniquement)
// Certains éditeurs web (ex. chatgpt.com) interceptent la combinaison du raccourci de
// l'extension et appellent preventDefault() : Firefox n'exécute alors plus le raccourci
// (bug Mozilla 1555620). Ce script n'est enregistré que si l'utilisateur active l'option
// dans la page des options (permission optionnelle d'accès aux sites). Il arrête la
// propagation de cette seule combinaison vers la page, SANS appeler preventDefault(), pour
// que Firefox exécute le raccourci de l'extension. Il ne lit ni ne transmet aucune autre
// donnée de la page.
/* global chrome */
(function () {
    'use strict'; // skipcq: JS-0118 - 'use strict' inside IIFE is intentional for module isolation

    // Sur Mac, "Ctrl" désigne la touche Command et "MacCtrl" la touche Control (MDN commands)
    const IS_MAC = navigator.userAgent.includes('Macintosh');

    // Modificateurs du format de raccourci MDN -> propriété du KeyboardEvent
    const MODIFIER_PROPERTIES = new Map([
        ['Ctrl', IS_MAC ? 'meta' : 'ctrl'],
        ['MacCtrl', 'ctrl'],
        ['Command', 'meta'],
        ['Alt', 'alt'],
        ['Shift', 'shift'],
    ]);

    // Touches nommées du format de raccourci MDN -> KeyboardEvent.code
    const NAMED_KEY_CODES = new Map([
        ['Comma', 'Comma'],
        ['Period', 'Period'],
        ['Home', 'Home'],
        ['End', 'End'],
        ['PageUp', 'PageUp'],
        ['PageDown', 'PageDown'],
        ['Space', 'Space'],
        ['Insert', 'Insert'],
        ['Delete', 'Delete'],
        ['Up', 'ArrowUp'],
        ['Down', 'ArrowDown'],
        ['Left', 'ArrowLeft'],
        ['Right', 'ArrowRight'],
    ]);

    // Raccourci attendu, tenu à jour depuis storage.local (écrit par background.js)
    let expectedShortcut = null;

    /**
     * Convertit un raccourci au format du manifest (ex. "Ctrl+Shift+1") en attentes sur un
     * KeyboardEvent. Renvoie null si le raccourci est vide ou contient un modificateur inconnu.
     * @param {string} shortcut - Raccourci renvoyé par commands.getAll()
     * @returns {{ctrl: boolean, alt: boolean, shift: boolean, meta: boolean, key: string}|null}
     */
    function parseShortcut(shortcut) {
        if (typeof shortcut !== 'string' || shortcut === '') {
            return null;
        }
        const parts = shortcut.split('+');
        const key = parts.pop();
        const modifiers = new Set(parts.map((name) => MODIFIER_PROPERTIES.get(name)));
        if (modifiers.has(undefined)) {
            return null;
        }
        return {
            ctrl: modifiers.has('ctrl'),
            alt: modifiers.has('alt'),
            shift: modifiers.has('shift'),
            meta: modifiers.has('meta'),
            key,
        };
    }

    /**
     * Indique si la touche de l'événement correspond à la touche du raccourci
     * @param {KeyboardEvent} event - Événement clavier
     * @param {string} key - Touche au format MDN (A-Z, 0-9, F1-F19, Comma, Up, etc.)
     * @returns {boolean} true si la touche correspond
     */
    function matchesKey(event, key) {
        if (/^[A-Z]$/.test(key)) {
            // Lettre : comparaison sur le caractère produit, selon la disposition du clavier
            return event.key.toUpperCase() === key;
        }
        if (/^\d$/.test(key)) {
            // Chiffre : rangée du haut ou pavé numérique, que Firefox associe aussi au raccourci
            return event.code === `Digit${key}` || event.code === `Numpad${key}`;
        }
        if (/^F\d{1,2}$/.test(key)) {
            return event.code === key;
        }
        return event.code === NAMED_KEY_CODES.get(key);
    }

    /**
     * Arrête la propagation du raccourci de l'extension vers la page. Ne jamais appeler
     * preventDefault() ici : Firefox n'exécuterait plus le raccourci.
     * @param {KeyboardEvent} event - Événement keydown ou keypress
     */
    function guardShortcut(event) {
        if (
            event.isTrusted &&
            expectedShortcut &&
            event.ctrlKey === expectedShortcut.ctrl &&
            event.altKey === expectedShortcut.alt &&
            event.shiftKey === expectedShortcut.shift &&
            event.metaKey === expectedShortcut.meta &&
            matchesKey(event, expectedShortcut.key)
        ) {
            event.stopImmediatePropagation();
        }
    }

    chrome.storage.local
        .get('executeActionShortcut')
        .then((items) => {
            expectedShortcut = parseShortcut(items.executeActionShortcut);
        })
        .catch((error) => {
            console.error('[BabelFishAI] Lecture du raccourci clavier impossible :', error);
        });

    chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === 'local' && changes.executeActionShortcut) {
            expectedShortcut = parseShortcut(changes.executeActionShortcut.newValue);
        }
    });

    // Phase de capture sur window : passe avant les écouteurs de l'éditeur de la page.
    // keydown couvre les chiffres et touches nommées, keypress les raccourcis en lettre
    // (que Firefox traite sur keypress).
    globalThis.addEventListener('keydown', guardShortcut, true);
    globalThis.addEventListener('keypress', guardShortcut, true);
})();
