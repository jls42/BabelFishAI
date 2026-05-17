# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BabelFishAI is a browser extension (Manifest V3) for AI-powered voice transcription and translation. Supports **Chrome** and **Firefox** from the same codebase. Uses OpenAI's Whisper API for transcription and GPT models for translation/rephrasing. Supports 15 languages and LiteLLM Proxy for alternative AI providers.

**Primary Language:** French (for comments, documentation, and user-facing messages)

## Claude Code Workflow

-   **Commits** : utiliser le skill `/helping-with-commits` pour tous les commits (règle projet, OBLIGATOIRE — ne JAMAIS faire de `git commit` direct ni d'ajouter de mention "Co-Authored-By: Claude").
-   **Recherche web** : utiliser l'agent `web-research-specialist:web-research-specialist` pour les recherches de documentation (évite de polluer le contexte principal).
-   **Après chaque `git push`** (sur une PR, jamais `main`) : surveiller les checks externes jusqu'à résolution.
    1. Attendre ~60-90s que SonarCloud, Codacy, CodeFactor, DeepSource terminent leur scan initial. Aucun workflow GH Actions n'est versionné dans ce repo — les analyses passent par les intégrations natives (GitHub Apps).
    2. `gh pr checks <num>` pour lire l'état des checks GitHub.
    3. Si tous `pass` → **toujours** requêter l'API publique Sonar des issues ouvertes en complément (cf. piège ci-dessous), puis signaler à l'utilisateur et stop.
    4. Si un check est `pending` → re-check dans 60-90s (utiliser `ScheduleWakeup` pour ne pas bloquer le main thread).
    5. Si un check est `fail` :
        - Récupérer les détails via l'URL Sonar/Codacy/DeepSource dans la colonne `link` de `gh pr checks`.
        - **Reproduire localement AVANT de proposer un fix** (règle "mesurer > deviner") :
            - SonarCloud : la finding peut souvent être reproduite avec `pre-commit run --hook-stage pre-push --all-files` (Lizard CCN, Opengrep SAST). Pour règles Sonar spécifiques (`javascript:S1234`), consulter directement l'URL Sonar du finding.
            - DeepSource : `.deepsource.toml` (analyseur `javascript`) — voir l'URL pour la query rule.
            - Codacy : ESLint via Codacy UI — pas de config locale, faire confiance à l'URL.
        - Appliquer le fix → `pre-commit run --all-files && pre-commit run --hook-stage pre-push --all-files` verts → skill `/helping-with-commits` → `git push`.
    6. Reboucler jusqu'à tous verts ou finding non-trivial (dans ce cas stop et demander aide).
    7. **Pièges connus** :
        - **`gh pr checks <num>` ne reflète QUE le quality gate Sonar, pas les issues ouvertes**. Un Major Code Smell qui ne fait pas tomber le gate apparaîtra `pass` côté GitHub mais reste à traiter. Après chaque push, requêter en plus l'API publique Sonar :
            ```bash
            curl -s "https://sonarcloud.io/api/issues/search?componentKeys=jls42_BabelFishAI&pullRequest=<num>&resolved=false&ps=50" \
              | python3 -c "import json,sys; d=json.load(sys.stdin); print('total:', d.get('total', 0)); [print(f\"  [{i['severity']}] {i['type']} {i['rule']} {i['component'].split(':')[-1]}:{i.get('line','?')} - {i['message']}\") for i in d.get('issues', [])]"
            ```
            Délai d'indexation Sonar : ~60-90s après le push (ré-exécuter si `total` reflète encore l'ancien commit).
        - **`detect-secrets`** régénère parfois `.secrets.baseline` en pre-commit ; bien `git add` la baseline AVANT le commit suivant (sinon le hook re-mute la baseline en boucle).
        - Le pre-commit `prettier` peut reformater des fichiers en cascade lors de la première exécution sur une nouvelle branche → si le commit fail avec "files were modified by this hook", refaire `git add` et re-commiter.

## SonarCloud / DeepSource Conventions

**IMPORTANT** : ne JAMAIS désactiver globalement des règles SonarCloud / DeepSource dans un fichier de configuration versionné (pas de `disable_rules:` global). Utiliser des commentaires inline uniquement, avec justification précise :

```javascript
// NOSONAR javascript:S2245 - Math.random pour unicité de filename, pas usage cryptographique
const filename = `audio_${Date.now()}_${Math.random().toString(36).slice(2)}.webm`;

// skipcq: JS-0128 - Fonction conservée pour usage futur (extension Live Translation)
function reservedHandler() {
    /* ... */
}
```

Cela évite de masquer de vrais positifs futurs sur le même type de règle. Format général : `// NOSONAR <rule-id> - <pourquoi c'est sûr>` ou `// skipcq: <code> - <raison>`.

## Quality / pre-commit (workflow)

Le projet utilise [`pre-commit`](https://pre-commit.com) avec un setup local minimal (pas de workflow GH Actions, les analyseurs cloud natifs couvrent la couche CI).

### Bootstrap (une fois après clone)

```bash
pipx install pre-commit                     # ou: pip install pre-commit
pre-commit install                          # hooks pre-commit (rapides)
pre-commit install --hook-type pre-push     # hooks pre-push (SAST, complexité)
```

Le premier `pre-commit run --all-files` télécharge les environnements des hooks (~30-60s, cache après).

### Hooks actifs

| Stage      | Hook                           | Rôle                                                                        |
| ---------- | ------------------------------ | --------------------------------------------------------------------------- |
| pre-commit | shellcheck                     | Lint `.sh` (`--severity=warning`, info SC2317/SC2012 écartés)               |
| pre-commit | prettier                       | Format JSON/YAML/MD/HTML/CSS/JS (`src/lib/`, `_locales/`, README-\* exclus) |
| pre-commit | pre-commit-hooks v5            | trailing-whitespace, EOF, check-yaml/json, large-files 500KB, shebang       |
| pre-commit | detect-secrets                 | Détection fuites de clés API (baseline = 1 faux positif i18n connu)         |
| pre-push   | check-security-sast (Opengrep) | SAST `p/javascript` + `p/security-audit` + `p/default`, severity ERROR      |
| pre-push   | check-complexity (Lizard)      | CCN ≤ 20, length ≤ 1500 lignes (durcissables par PR dédiée)                 |

### Lancer manuellement

```bash
pre-commit run --all-files                            # tous les hooks pre-commit
pre-commit run --hook-stage pre-push --all-files      # tous les hooks pre-push
pre-commit run prettier --all-files                   # un hook précis
```

### Échappatoires (à utiliser sciemment uniquement)

```bash
git commit --no-verify   # skip les hooks pre-commit
git push --no-verify     # skip les hooks pre-push
```

## Development Workflow

**No build system** - Pure JavaScript with ES6 modules. Development is straightforward:

### Chrome (développement direct)

1. Edit source files directly
2. Go to `chrome://extensions/` → Enable Developer mode
3. Click "Load unpacked" and select this folder (or click reload if already loaded)
4. Test changes in browser

### Firefox (développement direct)

1. Edit source files directly
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..." and select `manifest.firefox.json`
4. Test changes in browser

### Build multi-navigateur (pour publication)

```bash
./scripts/build.sh chrome   # Build Chrome uniquement
./scripts/build.sh firefox  # Build Firefox uniquement
./scripts/build.sh all      # Build les deux
```

Les archives ZIP sont générées dans `dist/`.

## Architecture

### Global Namespaces

-   `globalThis.BabelFishAIConstants` - Configuration constants
-   `globalThis.BabelFishAIUtils` - Utility functions (recording, text, UI, etc.)
-   `globalThis.BabelFishAI` - Main application state
-   `globalThis.BabelFishAIProviders` - AI provider registry

**Note**: Utiliser `globalThis` au lieu de `window` pour la portabilité ES2020+.

### Key Files

-   `manifest.json` - Chrome configuration (Manifest V3, Service Worker)
-   `manifest.firefox.json` - Firefox configuration (Manifest V3, background scripts)
-   `src/background.js` - Background script handling events, icon clicks, keyboard shortcuts, context menu
-   `src/content.js` - Main script injected into pages, coordinates all modules
-   `src/constants.js` - Global constants (errors, states, actions)
-   `src/lib/browser-polyfill.min.js` - webextension-polyfill pour compatibilité cross-browser

### Différences Chrome/Firefox

| Aspect                          | Chrome                            | Firefox                             |
| ------------------------------- | --------------------------------- | ----------------------------------- |
| Background                      | Service Worker (`service_worker`) | Scripts classiques (`scripts`)      |
| Manifest                        | `manifest.json`                   | `manifest.firefox.json`             |
| `importScripts()`               | Supporté (Service Worker)         | Non supporté (chargé via manifest)  |
| CSP des pages                   | Content scripts exempts           | Content scripts soumis aux CSP      |
| `fetch()` depuis content script | Utilise permissions extension     | Bloqué par `connect-src` de la page |

#### Gestion de `importScripts()` (background.js)

Le code utilise une vérification conditionnelle car Firefox ne supporte pas `importScripts()` dans les background scripts classiques :

```javascript
if (typeof importScripts === 'function') {
    importScripts('utils/languages-data.js');
}
```

#### Proxy fetch pour Firefox (CRITIQUE)

**Problème** : Sur Firefox, les requêtes `fetch()` depuis un content script sont soumises aux CSP de la page web. Les sites avec CSP stricte (comme ChatGPT) bloquent les requêtes vers les APIs externes via `connect-src`.

**Solution** : Les requêtes API passent par le background script sur Firefox (qui n'est pas soumis aux CSP des pages).

```javascript
// api-utils.js - Détection et routage automatique
function isFirefox() {
    return navigator.userAgent.includes('Firefox');
}

// Dans performApiCall()
const response = isFirefox()
    ? await fetchViaProxy(url, requestOptions) // Via background
    : await fetch(url, requestOptions); // Direct
```

**Architecture du proxy** (`background.js` → `proxyFetch()`) :

1. Le content script envoie un message `proxyFetch` avec les paramètres
2. Le background script effectue le `fetch()` (non soumis aux CSP)
3. Le résultat est renvoyé au content script

**Sérialisation FormData** : Les `FormData` (pour l'upload audio) ne peuvent pas être envoyés via messaging. Ils sont convertis en tableau d'objets avec les blobs en `Uint8Array`.

```javascript
// Conversion FormData → tableau sérialisable
formData.forEach((value, name) => {
    if (value instanceof Blob) {
        // Blob → ArrayBuffer → Uint8Array → Array
        fields.push({ name, isFile: true, data: Array.from(uint8Array), ... });
    } else {
        fields.push({ name, isFile: false, value: String(value) });
    }
});
```

#### Compatibilité FormData

**IMPORTANT** : Sur Firefox, `for...of` sur `formData.entries()` peut échouer dans certains contextes. Utiliser `forEach()` :

```javascript
// ✅ CORRECT (compatible Firefox)
formData.forEach((value, name) => { ... });

// ❌ PEUT ÉCHOUER sur Firefox
for (const [name, value] of formData.entries()) { ... }
```

#### Duck typing pour FormData

`instanceof FormData` peut échouer entre contextes d'exécution. Utiliser le duck typing :

```javascript
// ✅ CORRECT
if (body && typeof body.entries === 'function' && typeof body.append === 'function') {
    // C'est un FormData
}

// ❌ PEUT ÉCHOUER entre contextes
if (body instanceof FormData) { ... }
```

### Utility Modules (`src/utils/`)

**Active modules (to use):**
| Module | Purpose |
|--------|---------|
| `api-utils.js` | API interactions - multi-provider (Whisper, GPT) |
| `text-processing.js` | Translation, rephrasing, text manipulation |
| `recording-utils.js` | Audio recording via MediaRecorder |
| `banner-utils.js` | Status banner UI and language selector |
| `focus-utils.js` | Focus/selection save and restore |
| `ui.js` | General UI utilities (dialogs, buttons, timer) |
| `event-handlers.js` | User interaction handlers |
| `error-utils.js` | Error handling and display |
| `transcription-display.js` | Result display logic |
| `providers.js` | AI provider registry (OpenAI, Mistral) |
| `languages-shared.js` | Language definitions (single source of truth) |
| `languages-data.js` | Language data for Service Worker context |
| `i18n.js` | Internationalization |

**DEPRECATED modules (do NOT use, to be removed):**
| Module | Replacement |
|--------|-------------|
| `api.js` | Use `api-utils.js` instead |
| `translation.js` | Use `text-processing.js` instead |
| `text-translation.js` | Use `text-processing.js` instead |
| `languages.js` | Use `languages-shared.js` instead |

### Communication Flow

1. User clicks icon or uses `Ctrl+Shift+1` / `⌘+Shift+1`
2. `background.js` receives event, injects content script if needed
3. `content.js` records audio, calls APIs, displays results
4. Context menu actions handled similarly for text selection

### Data Storage

Uses `chrome.storage.sync` for: API key, display preferences, language settings, UI customization.

## Critical Development Rules

### General Rules

1. **Primary language**: French for comments and user-facing messages
2. **Security**: NEVER expose API keys or sensitive URLs directly
3. **Documentation**: Document all feature changes in `README.md`
4. **Expert mode**: Respect expert mode and advanced options as described in user documentation
5. **Testing**: Always test after each function migration
6. **i18n integrity**: Ensure integrity of internationalization files (`_locales/`)
7. **i18n validation**: Run `./scripts/check-i18n.sh` after modifying translations or adding new i18n keys to detect missing translations and dead keys

### Refactoring Guidelines

The project is undergoing modular refactoring from a monolithic `content.js`. When migrating code:

1. **NEVER modify business logic** during migration
2. **Preserve exact API prompts and parameters** - do not change OpenAI prompts
3. **Maintain function signatures** - same parameters, same order
4. **Keep all comments** from original code (including JSDoc)
5. **Test after each migration** before proceeding
6. **Progressive approach** - migrate one function at a time, not everything at once
7. **Preserve API structure** - keep optional parameters, timeouts, and retry mechanisms
8. **Do NOT simplify or "improve"** existing code without explicit request
9. **Maintain backward compatibility** with existing code during transition
10. **Avoid duplications** - no duplicate code or unused variables
11. **Verify original code** before migrating to preserve all edge cases and conditions

### Migration Procedure

1. **Preliminary analysis**: Examine function dependencies, global variables, usage context
2. **Identify dependencies**: List all variables, constants, and helper functions used
3. **Progressive extraction**: Migrate one function, verify references in content.js are updated
4. **Verify calls**: Ensure same parameters in same order as original code
5. **Namespace management**: Use `window.BabelFishAIUtils` structure consistently
6. **Preserve comments**: Keep all explanatory comments including JSDoc
7. **Verify constants**: Ensure all constants are available in new context
8. **Integration test**: Verify integration with rest of code works correctly

### Errors to Avoid

-   Do NOT modify API prompts (OpenAI, Whisper, etc.)
-   Do NOT change configuration object structure or parameters
-   Do NOT alter error handling or error messages
-   Do NOT remove or modify explanatory comments
-   Do NOT add unrequested features or optimizations
-   Do NOT rename functions or variables to "improve" them
-   Do NOT reorder function parameters
-   Do NOT modify UI animation/transition behavior (especially language selector)
-   Do NOT alter show/hide logic for UI elements like language container
-   Do NOT invent new parameters or options that didn't exist in original code

### CSS Class Names (must be exact)

-   `whisper-toggle-button` (not `whisper-control-button`)
-   `whisper-button-icon`
-   `whisper-button-text`
-   `whisper-language-container`
-   Use `data-active="true"/"false"` for button states
-   Prefer external CSS (in `content.css`) over inline styles in JavaScript

### Translation Files

-   Update French (`_locales/fr/messages.json`) first for new features
-   Other languages only when explicitly requested
-   15 supported locales: ar, de, en, es, fr, hi, it, ja, ko, nl, pl, pt, ro, sv, zh

### Module Exposure Pattern

```javascript
globalThis.BabelFishAIUtils = globalThis.BabelFishAIUtils || {};
globalThis.BabelFishAIUtils.moduleName = {
    functionName: functionName,
    // ...
};
```

### Inter-module Communication

Modules communicate via global namespaces (`globalThis.BabelFishAI` and `globalThis.BabelFishAIUtils`).
Example: `globalThis.BabelFishAIUtils.recording.startRecording()` to call a recording module function.

## APIs Used

-   **Whisper API**: `https://api.openai.com/v1/audio/transcriptions` (transcription)
-   **GPT API**: `https://api.openai.com/v1/chat/completions` (translation/rephrasing, model: gpt-4o-mini)
-   **Mistral API**: `https://api.mistral.ai/v1/chat/completions` (alternative provider)
-   All configurable via Expert mode for LiteLLM Proxy compatibility

## Brand Assets

Les logos des providers sont stockés dans `images/` :

-   `images/mistral-logo.png` - Logo Mistral AI (M arc-en-ciel)
-   `images/openai-logo.png` - Logo OpenAI (blossom)
-   Custom/LiteLLM utilise l'emoji 🚅 (pas de logo officiel)

**Pages Brand officielles :**

-   **Mistral AI** : https://mistral.ai/brand
-   **OpenAI** : https://openai.com/brand/
-   **LiteLLM** : https://github.com/BerriAI/litellm (emoji 🚅 comme identité)

## Known Issues & Solutions

-   **Code duplication**: Centralize function exposure in single block per module
-   **NoLog option**: Only for LiteLLM Proxy, causes errors with official OpenAI API
-   **Firefox CSP blocking API calls**: Résolu via proxy fetch dans background script (voir section "Proxy fetch pour Firefox")
-   **`formData.entries()` not iterable on Firefox**: Utiliser `forEach()` au lieu de `for...of`
-   **`instanceof FormData` fails cross-context**: Utiliser duck typing (`typeof body.append === 'function'`)

## Technical Debt (Audit Dec 2025)

### Files to Remove - ✅ COMPLETED

Les fichiers deprecated ont été supprimés :

-   ~~`src/utils/api.js`~~ - Supprimé
-   ~~`src/utils/translation.js`~~ - Supprimé
-   ~~`src/utils/text-translation.js`~~ - Supprimé
-   ~~`src/utils/languages.js`~~ - Supprimé

### Duplications Intentionnelles (NE PAS SUPPRIMER)

-   **`languages-data.js` / `languages-shared.js`** : Nécessaire car le Service Worker n'a pas accès à `window`
-   **Constantes dans `background.js`** : Nécessaire pour la même raison (STATES, ACTIONS, BADGES, ERRORS)
-   **Fallbacks langues dans `banner-utils.js`** : Nécessaire à cause d'une race condition au chargement

### Over-exposed Internal Functions - ✅ FIXED

-   `focus-utils.js` : Réduit de 17 à 5 fonctions publiques
-   `ui.js` : Réduit de 11 à 2 fonctions publiques

## Code Quality - Linting Rules

### Conventions ES2020+ (Analyseurs de Code Statique)

**IMPORTANT** : Ces règles sont obligatoires pour éviter les warnings des analyseurs (SonarQube, Codacy, etc.)

#### 1. Utiliser `globalThis` au lieu de `window` ou `self`

```javascript
// ✅ CORRECT
globalThis.BabelFishAIUtils = globalThis.BabelFishAIUtils || {};
const selection = globalThis.getSelection();
globalThis.setTimeout(callback, 1000);

// ❌ INCORRECT
window.BabelFishAIUtils = window.BabelFishAIUtils || {};
self.AVAILABLE_LANGUAGES = [...];
```

#### 2. Utiliser `Number.parseInt()` au lieu de `parseInt()`

```javascript
// ✅ CORRECT
const value = Number.parseInt(input.value, 10);
const hex = Number.parseInt(color.substring(1, 3), 16);

// ❌ INCORRECT
const value = parseInt(input.value);
```

#### 2b. Utiliser `substring()` au lieu de `substr()` (deprecated)

```javascript
// ✅ CORRECT
const hex = color.substring(1, 3); // De l'index 1 à 3 (exclu)

// ❌ INCORRECT (deprecated)
const hex = color.substr(1, 2); // De l'index 1, longueur 2
```

#### 3. Utiliser `replaceAll()` au lieu de `replace()` avec regex globale (quand applicable)

```javascript
// ✅ CORRECT (pour remplacements simples)
const escaped = text.replaceAll('<', '&lt;');

// ✅ CORRECT (regex complexes - garder replace)
const cleaned = text.replace(/\s+/g, ' '); // Pattern complexe, OK
```

#### 4. Utiliser Optional Chaining (`?.`) et Nullish Coalescing (`??`)

```javascript
// ✅ CORRECT
if (mediaRecorder?.state === 'recording') {
}
const url = provider?.defaultUrls.chat ?? DEFAULT_URL;
return config?.enabled && config?.apiKey;

// ❌ INCORRECT
if (mediaRecorder && mediaRecorder.state === 'recording') {
}
return provider ? provider.defaultUrls.chat : DEFAULT_URL;
```

#### 5. Utiliser `.dataset` au lieu de `getAttribute/setAttribute` pour data-\*

```javascript
// ✅ CORRECT
button.dataset.active = 'true';
const target = button.dataset.target;

// ❌ INCORRECT
button.setAttribute('data-active', 'true');
const target = button.getAttribute('data-target');
```

#### 6. Utiliser `element.remove()` au lieu de `parentNode.removeChild()`

```javascript
// ✅ CORRECT
element.remove();

// ❌ INCORRECT
element.parentNode.removeChild(element);
```

#### 7. Éviter les ternaires imbriquées

```javascript
// ✅ CORRECT
let models = [];
if (providerDef) {
    models = type === 'transcription' ? providerDef.transcriptionModels : providerDef.chatModels;
}

// ❌ INCORRECT
const models = providerDef
    ? type === 'transcription'
        ? providerDef.transcriptionModels
        : providerDef.chatModels
    : [];
```

#### 8. Toujours utiliser les exceptions attrapées

```javascript
// ✅ CORRECT
} catch (error) {
    console.error('Error:', error.message);
}

// ❌ INCORRECT
} catch (error) {
    // error non utilisé
    console.error('Something went wrong');
}
```

#### 9. Éviter innerHTML pour la sécurité (XSS)

```javascript
// ✅ CORRECT (créer des éléments DOM)
const span = document.createElement('span');
span.className = 'status';
span.textContent = text;
container.appendChild(span);

// ❌ INCORRECT (risque XSS)
container.innerHTML = `<span class="status">${text}</span>`;
```

#### 10. Accessibilité (a11y)

```html
<!-- ✅ CORRECT - Labels avec aria-label pour les toggles sans texte visible -->
<label class="provider-toggle" aria-label="Enable OpenAI provider">
    <input type="checkbox" id="openaiEnabled" aria-label="Enable OpenAI" />
    <span class="toggle-slider"></span>
</label>

<!-- ✅ CORRECT - Contraste suffisant (texte blanc sur fond sombre) -->
.toggle-advanced { background: rgba(0, 0, 0, 0.3); /* Fond sombre */ color: white; /* Bon contraste
*/ }

<!-- ❌ INCORRECT - Mauvais contraste -->
.toggle-advanced { background: rgba(255, 255, 255, 0.2); /* Fond clair */ color: white; /* Mauvais
contraste */ }
```

### Variables et Fonctions

-   **Ne JAMAIS déclarer de variables non utilisées** : Si une variable est déclarée, elle doit être utilisée
-   **Supprimer les fonctions inutilisées** ou ajouter `// skipcq: JS-0128` si conservées intentionnellement
-   **Éviter les constantes importées mais non utilisées** : Ne pas importer de constantes "au cas où"

### Appels d'API (api-utils.js)

La fonction `callApi` attend UN SEUL objet avec toutes les options :

```javascript
// ✅ CORRECT
await globalThis.BabelFishAIUtils.api.callApi({
    url: apiUrl,
    apiKey: effectiveApiKey,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    errorType: 'Error message',
    retryOnFail: true
});

// ❌ INCORRECT (deux arguments)
await globalThis.BabelFishAIUtils.api.callApi(apiUrl, { ... });
```

### Scripts Shell (Bash)

-   **Toujours utiliser `[[` au lieu de `[`** pour les tests conditionnels (plus sûr et plus de fonctionnalités)
-   **Ajouter un cas par défaut `*)` dans les `case` statements**
-   **Ajouter `return` explicite** à la fin des fonctions
-   **Supprimer les variables locales non utilisées**

Exemple :

```bash
# ✅ CORRECT
if [[ $count -gt 0 ]]; then
    echo "Found $count items"
fi

case $arg in
    -v|--verbose)
        VERBOSE=true
        ;;
    *)
        # Cas par défaut
        ;;
esac

my_function() {
    # code
    return 0
}

# ❌ INCORRECT
if [ $count -gt 0 ]; then  # Utiliser [[ au lieu de [
```

### Annotations pour Analyseurs Statiques (Faux Positifs)

Différents analyseurs utilisent différents formats :

-   **Codacy (ESLint)** : `// eslint-disable-next-line <rule> -- justification`
-   **SonarCloud** : `// NOSONAR` ou `// NOSONAR - justification`
-   **DeepSource** : `// skipcq: JS-XXXX` ou `// skipcq: JS-XXXX - justification`

Pour couvrir tous les analyseurs, combiner les formats sur une même ligne :

```javascript
code; // NOSONAR skipcq: JS-0128 - justification
```

#### Format NOSONAR (SonarCloud) - Pour issues de style

```javascript
// NOSONAR à la fin de la ligne concernée
code; // NOSONAR - justification

// Exemples courants
text.replace(/\s+/g, ' '); // NOSONAR - regex pattern, replaceAll not applicable
function unused() {} // NOSONAR - Fonction conservée pour usage futur
```

#### Format ESLint (Codacy) - Pour issues de sécurité

```javascript
// Ignorer une ligne
// eslint-disable-next-line <rule> -- <justification>
code;

// Ignorer tout le fichier (en haut du fichier)
/* eslint-disable <rule> -- <justification> */
```

#### Exemples Courants dans ce Projet

```javascript
// Global 'chrome' dans les extensions Chrome
/* eslint-disable no-undef -- 'chrome' is a global provided by Chrome extension environment */

// Accès dynamique avec clés contrôlées
// eslint-disable-next-line security/detect-object-injection -- False positive: providerId is controlled enum
const config = providers[providerId];

// Console.log intentionnel (debug)
// eslint-disable-next-line no-console -- Debug log for diagnostics
console.log('[Module] debug info');
```

#### Règles Importantes

1. **Toujours ajouter une justification** avec `--` expliquant pourquoi c'est sûr
2. **Utiliser la portée la plus étroite** - préférer ligne > bloc > fichier
3. **Ne pas utiliser de règles qui n'existent pas** (ex: `unicorn/prefer-string-replace-all` cause "Definition not found")
4. **Si inline ne marche pas** → désactiver dans Codacy UI

## Developer Notes

### Debugging

-   **Chrome** : `chrome://extensions/` → clic sur "Service Worker" pour voir les logs du background
-   **Firefox** : `about:debugging#/runtime/this-firefox` → clic sur "Inspect" pour les logs
-   Check console logs to identify potential issues

### Testing cross-browser

1. Toujours tester sur Chrome ET Firefox après modifications de `api-utils.js` ou `background.js`
2. Tester sur des sites avec CSP stricte (ex: chatgpt.com) pour vérifier le proxy Firefox
3. Tester sur des sites sans CSP (ex: chat.mistral.ai) pour vérifier le flux normal

### Structure des manifests

-   `manifest.json` : Source principale pour Chrome (Service Worker)
-   `manifest.firefox.json` : Adapté pour Firefox (background scripts)
-   Garder les deux synchronisés (version, permissions, etc.)

### Publication

-   **Chrome** : `./scripts/build.sh chrome` → upload sur Chrome Web Store
-   **Firefox** : `./scripts/build.sh firefox` → upload sur Firefox Add-ons (AMO)
-   L'ID Firefox (`babelfishai@jls42.org`) dans `browser_specific_settings.gecko.id` doit rester constant

## Git Workflow

**OBLIGATOIRE** : Pour créer un commit, utiliser `Skill` avec le skill de commit. Ne JAMAIS faire de commit manuellement.
