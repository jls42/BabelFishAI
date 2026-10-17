// Insertion d'un résultat dans un champ riche (focus-utils.js) : le texte est échappé avant d'être
// lu comme du HTML, seuls ses sauts de ligne deviennent des balises <br>.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadScripts, setupEnv } from './helpers/env.mjs';

setupEnv({ browser: 'chrome' });
// Nettoyeur qui rend ce qu'on lui donne, comme sanitizeHTML (i18n.js) pour les balises de sa liste
// blanche (b, img…) : l'insertion ne doit pas dépendre de lui
globalThis.BabelFishAIUtils = { i18n: { sanitizeHTML: (html) => html } };

/** HTML passé à DOMParser, qui le lit avant de l'insérer dans le champ */
const parsedHtml = [];
globalThis.DOMParser = class {
    /**
     * Relève le HTML lu et renvoie un document sans nœud à insérer
     * @param {string} html
     * @returns {Object}
     */
    parseFromString(html) {
        parsedHtml.push(html);
        return { body: { firstChild: { firstChild: null } } };
    }
};
const editor = { isContentEditable: true, appendChild() {}, dispatchEvent: () => true };
globalThis.document = { activeElement: editor };
globalThis.getSelection = () => ({ rangeCount: 0 });
await loadScripts(['src/utils/focus-utils.js']);

test('un résultat inséré dans un champ riche garde ses balises sous forme de texte', () => {
    const { focus } = globalThis.BabelFishAIUtils;

    assert.equal(focus.handleActiveElementInsertion('Bonjour <b>Ana</b>\n<img src="x.gif">'), true);
    assert.deepEqual(parsedHtml, [
        '<div>Bonjour &lt;b&gt;Ana&lt;/b&gt;<br>&lt;img src=&quot;x.gif&quot;&gt; </div>',
    ]);
});
