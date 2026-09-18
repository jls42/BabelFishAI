# Plan d'Action : Portage BabelFishAI vers Firefox

**Date** : 2025-12-16
**Branche à créer** : `feature/firefox-support`
**Objectif** : Rendre BabelFishAI compatible Chrome ET Firefox depuis le même codebase

---

## Contexte du Projet

BabelFishAI est une extension Chrome (Manifest V3) pour la transcription vocale et traduction IA.

-   **Stack** : JavaScript vanilla, ES6 modules, pas de build system
-   **APIs** : OpenAI Whisper + GPT, Mistral AI, LiteLLM Proxy
-   **Langues** : 15 locales supportées

---

## Vue d'Ensemble des Changements

### Ce qui NE change PAS

-   Le code source JavaScript (99% identique)
-   La structure des fichiers
-   Le workflow de publication Chrome
-   Les fonctionnalités

### Ce qui CHANGE

-   Ajout d'un manifest Firefox séparé
-   Ajout de webextension-polyfill pour compatibilité API
-   Script de build pour générer les packages par navigateur
-   Documentation mise à jour

---

## Étapes Détaillées

### Phase 1 : Préparation (Branche + Structure)

#### 1.1 Créer la branche de travail

```bash
git checkout -b feature/firefox-support
```

#### 1.2 Créer la structure de répertoires

```
BabelFishAI/
├── manifest.json              # Chrome (inchangé, reste la source principale)
├── manifest.firefox.json      # Firefox (nouveau)
├── src/
│   └── lib/
│       └── browser-polyfill.min.js  # webextension-polyfill (nouveau)
├── scripts/
│   ├── build.sh               # Script de build multi-navigateur (nouveau)
│   └── check-i18n.sh          # Existant
├── dist/                      # Répertoire de build (nouveau, gitignored)
│   ├── chrome/
│   └── firefox/
└── docs/
    └── PLAN-FIREFOX-PORT.md   # Ce fichier
```

---

### Phase 2 : Manifest Firefox

#### 2.1 Créer `manifest.firefox.json`

Différences clés avec Chrome :

| Clé                         | Chrome        | Firefox                  |
| --------------------------- | ------------- | ------------------------ |
| `background.service_worker` | ✅ Requis     | ❌ Non supporté          |
| `background.scripts`        | ❌ Ignoré MV3 | ✅ Requis                |
| `browser_specific_settings` | ❌ Ignoré     | ✅ Requis (ID extension) |

```json
{
    "manifest_version": 3,
    "name": "__MSG_extensionName__",
    "version": "1.1.18",
    "description": "__MSG_extensionDescription__",
    "default_locale": "fr",

    "browser_specific_settings": {
        "gecko": {
            "id": "babelfishai@jls42.org",
            "strict_min_version": "109.0"
        }
    },

    "background": {
        "scripts": ["src/lib/browser-polyfill.min.js", "src/background.js"]
    },

    "permissions": ["activeTab", "storage", "contextMenus", "offscreen", "clipboardWrite"],

    "host_permissions": [
        "https://api.openai.com/*",
        "https://api.mistral.ai/*",
        "https://*/*",
        "http://localhost/*",
        "http://127.0.0.1/*"
    ],

    "content_scripts": [
        {
            "matches": ["<all_urls>"],
            "js": [
                "src/lib/browser-polyfill.min.js",
                "src/constants.js",
                "src/utils/languages-shared.js",
                "src/utils/i18n.js",
                "src/utils/providers.js",
                "src/utils/error-utils.js",
                "src/utils/focus-utils.js",
                "src/utils/ui.js",
                "src/utils/banner-utils.js",
                "src/utils/recording-utils.js",
                "src/utils/api-utils.js",
                "src/utils/text-processing.js",
                "src/utils/transcription-display.js",
                "src/utils/event-handlers.js",
                "src/content.js"
            ],
            "css": ["content.css"],
            "run_at": "document_idle"
        }
    ],

    "action": {
        "default_icon": {
            "16": "images/icon16.png",
            "32": "images/icon32.png",
            "48": "images/icon48.png",
            "128": "images/icon128.png"
        },
        "default_title": "__MSG_extensionName__"
    },

    "options_ui": {
        "page": "options.html",
        "open_in_tab": true
    },

    "icons": {
        "16": "images/icon16.png",
        "32": "images/icon32.png",
        "48": "images/icon48.png",
        "128": "images/icon128.png"
    },

    "commands": {
        "_execute_action": {
            "suggested_key": {
                "default": "Ctrl+Shift+1",
                "mac": "Command+Shift+1"
            },
            "description": "__MSG_commandToggleRecording__"
        }
    },

    "web_accessible_resources": [
        {
            "resources": ["images/*"],
            "matches": ["<all_urls>"]
        }
    ]
}
```

#### 2.2 Points d'attention Firefox

1. **Permission `offscreen`** : Non supportée sur Firefox, à retirer si non utilisée
2. **ID Extension** : Choisir un ID stable (format email ou UUID)
3. **Version minimum** : Firefox 109+ pour MV3 complet

---

### Phase 3 : Intégration webextension-polyfill

#### 3.1 Télécharger le polyfill

```bash
# Créer le répertoire
mkdir -p src/lib

# Télécharger la dernière version
curl -L https://unpkg.com/webextension-polyfill@0.12.0/dist/browser-polyfill.min.js \
  -o src/lib/browser-polyfill.min.js
```

#### 3.2 Ce que fait le polyfill

-   Fournit l'objet `browser` unifié sur Chrome
-   Convertit les callbacks `chrome.*` en Promises
-   Permet d'écrire du code identique pour les deux navigateurs
-   Sur Firefox : no-op (déjà natif)

#### 3.3 Mise à jour du manifest Chrome (optionnel mais recommandé)

Pour une meilleure cohérence, ajouter le polyfill aussi dans Chrome :

```json
"content_scripts": [
  {
    "js": [
      "src/lib/browser-polyfill.min.js",
      // ... autres scripts
    ]
  }
]
```

---

### Phase 4 : Adaptations du Code

#### 4.1 Vérifications du background.js

Le `background.js` actuel doit fonctionner en **Service Worker** (Chrome) ET **background page** (Firefox).

**Vérifier l'absence de** :

-   `window` → utiliser `globalThis`
-   `document` → non disponible en SW
-   `XMLHttpRequest` → utiliser `fetch`
-   `localStorage` → utiliser `chrome.storage`

**Déjà OK dans le projet** : Le code utilise `globalThis` et `chrome.storage`.

#### 4.2 Compatibilité API namespace

**Option A - Avec polyfill (recommandé)** :

```javascript
// Fonctionne partout avec le polyfill chargé
const result = await browser.storage.sync.get(['apiKey']);
```

**Option B - Sans modification (aussi OK)** :

```javascript
// Chrome et Firefox supportent tous deux chrome.*
// Firefox wrap automatiquement en Promises
chrome.storage.sync.get(['apiKey'], (result) => { ... });
```

Le code actuel utilise `chrome.*` avec callbacks → **fonctionne sur les deux**.

#### 4.3 Gestion de l'API offscreen (Chrome only)

L'API `offscreen` n'existe pas sur Firefox. Vérifier son usage dans `background.js` :

```javascript
// Pattern de détection
if (typeof chrome.offscreen !== 'undefined') {
    // Chrome - utiliser offscreen
} else {
    // Firefox - alternative ou skip
}
```

---

### Phase 5 : Script de Build

#### 5.1 Créer `scripts/build.sh`

```bash
#!/bin/bash
# scripts/build.sh - Build multi-navigateur pour BabelFishAI

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_ROOT/dist"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

usage() {
    echo "Usage: $0 [chrome|firefox|all]"
    echo "  chrome  - Build pour Chrome uniquement"
    echo "  firefox - Build pour Firefox uniquement"
    echo "  all     - Build pour les deux navigateurs (défaut)"
    exit 1
}

# Fichiers et dossiers à copier (exclure dist, .git, docs, scripts)
FILES_TO_COPY=(
    "src"
    "images"
    "_locales"
    "content.css"
    "options.html"
    "options.css"
    "options.js"
    "offscreen.html"
    "offscreen.js"
)

clean_dist() {
    local browser=$1
    echo -e "${YELLOW}Nettoyage de dist/$browser...${NC}"
    rm -rf "$DIST_DIR/$browser"
    mkdir -p "$DIST_DIR/$browser"
}

copy_common_files() {
    local browser=$1
    echo -e "${YELLOW}Copie des fichiers communs vers dist/$browser...${NC}"

    for item in "${FILES_TO_COPY[@]}"; do
        if [[ -e "$PROJECT_ROOT/$item" ]]; then
            cp -r "$PROJECT_ROOT/$item" "$DIST_DIR/$browser/"
        fi
    done
}

build_chrome() {
    echo -e "${GREEN}=== Build Chrome ===${NC}"
    clean_dist "chrome"
    copy_common_files "chrome"

    # Copier le manifest Chrome
    cp "$PROJECT_ROOT/manifest.json" "$DIST_DIR/chrome/manifest.json"

    echo -e "${GREEN}✓ Build Chrome terminé : dist/chrome/${NC}"
}

build_firefox() {
    echo -e "${GREEN}=== Build Firefox ===${NC}"
    clean_dist "firefox"
    copy_common_files "firefox"

    # Copier le manifest Firefox
    if [[ ! -f "$PROJECT_ROOT/manifest.firefox.json" ]]; then
        echo -e "${RED}Erreur: manifest.firefox.json non trouvé${NC}"
        exit 1
    fi
    cp "$PROJECT_ROOT/manifest.firefox.json" "$DIST_DIR/firefox/manifest.json"

    # Retirer les fichiers Chrome-only si nécessaire
    # rm -f "$DIST_DIR/firefox/offscreen.html" "$DIST_DIR/firefox/offscreen.js"

    echo -e "${GREEN}✓ Build Firefox terminé : dist/firefox/${NC}"
}

create_zip() {
    local browser=$1
    local version=$(grep '"version"' "$PROJECT_ROOT/manifest.json" | sed 's/.*: "\(.*\)".*/\1/')
    local zip_name="babelfishai-${version}-${browser}.zip"

    echo -e "${YELLOW}Création de $zip_name...${NC}"
    cd "$DIST_DIR/$browser"
    zip -r "../$zip_name" . -x "*.DS_Store" -x "*__MACOSX*"
    cd "$PROJECT_ROOT"

    echo -e "${GREEN}✓ Archive créée : dist/$zip_name${NC}"
}

# Main
TARGET=${1:-all}

case $TARGET in
    chrome)
        build_chrome
        create_zip "chrome"
        ;;
    firefox)
        build_firefox
        create_zip "firefox"
        ;;
    all)
        build_chrome
        build_firefox
        create_zip "chrome"
        create_zip "firefox"
        ;;
    *)
        usage
        ;;
esac

echo -e "${GREEN}=== Build terminé ===${NC}"
ls -la "$DIST_DIR"/*.zip 2>/dev/null || true
```

#### 5.2 Mettre à jour .gitignore

```gitignore
# Build outputs
dist/
*.zip
```

---

### Phase 6 : Tests

#### 6.1 Test sur Chrome (régression)

1. `./scripts/build.sh chrome`
2. Charger `dist/chrome/` dans `chrome://extensions/`
3. Vérifier toutes les fonctionnalités :
    - [ ] Transcription vocale
    - [ ] Traduction
    - [ ] Reformulation
    - [ ] Menu contextuel
    - [ ] Options
    - [ ] Raccourcis clavier

#### 6.2 Test sur Firefox

1. `./scripts/build.sh firefox`
2. Ouvrir `about:debugging#/runtime/this-firefox`
3. "Load Temporary Add-on" → sélectionner `dist/firefox/manifest.json`
4. Mêmes tests que Chrome

#### 6.3 Outil web-ext (optionnel)

```bash
# Installation
npm install -g web-ext

# Lancer Firefox avec l'extension en mode dev
web-ext run --source-dir=dist/firefox/

# Valider l'extension avant soumission
web-ext lint --source-dir=dist/firefox/
```

---

### Phase 7 : Publication

#### 7.1 Chrome Web Store (inchangé)

1. Build : `./scripts/build.sh chrome`
2. Upload `dist/babelfishai-X.X.X-chrome.zip` sur [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. Process habituel

#### 7.2 Firefox Add-ons (AMO)

1. Créer un compte sur [addons.mozilla.org](https://addons.mozilla.org/developers/)
2. Build : `./scripts/build.sh firefox`
3. Soumettre `dist/babelfishai-X.X.X-firefox.zip`
4. Remplir les métadonnées (description, screenshots, etc.)
5. Review par Mozilla (quelques jours)

**Note** : L'ID dans `browser_specific_settings.gecko.id` doit rester constant entre les versions.

---

### Phase 8 : Documentation

#### 8.1 Mettre à jour README.md

Ajouter une section :

```markdown
## Installation

### Chrome

[Lien Chrome Web Store]

### Firefox

[Lien Firefox Add-ons]

### Développement

\`\`\`bash

# Build pour Chrome

./scripts/build.sh chrome

# Build pour Firefox

./scripts/build.sh firefox

# Build pour les deux

./scripts/build.sh all
\`\`\`
```

#### 8.2 Mettre à jour CLAUDE.md

Ajouter dans la section "Development Workflow" :

```markdown
## Multi-Browser Build

Le projet supporte Chrome et Firefox depuis le même codebase.

-   `manifest.json` : Chrome (source principale)
-   `manifest.firefox.json` : Firefox
-   `./scripts/build.sh [chrome|firefox|all]` : Génère les packages

### Différences clés

-   Chrome : Service Worker pour background
-   Firefox : Background scripts classiques
-   Le polyfill `browser-polyfill.min.js` unifie les APIs
```

---

## Checklist Récapitulative

### Fichiers à créer

-   [ ] `manifest.firefox.json`
-   [ ] `src/lib/browser-polyfill.min.js`
-   [ ] `scripts/build.sh`
-   [ ] Mettre à jour `.gitignore`

### Code à vérifier/adapter

-   [ ] `background.js` : compatibilité Service Worker
-   [ ] Gestion API `offscreen` (Chrome-only)
-   [ ] Tester toutes les fonctionnalités sur Firefox

### Documentation

-   [ ] README.md : liens et instructions Firefox
-   [ ] CLAUDE.md : workflow multi-navigateur

### Publication

-   [ ] Compte Firefox Add-ons créé
-   [ ] ID extension Firefox choisi et fixé
-   [ ] Premier build Firefox validé avec web-ext lint

---

## Références Documentaires

### Documentation Officielle

-   **MDN - Build a cross-browser extension**
    https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension

-   **MDN - Chrome incompatibilities**
    https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities

-   **MDN - Browser compatibility for manifest.json**
    https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_compatibility_for_manifest.json

-   **MDN - Background scripts**
    https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background

-   **Chrome - Manifest V3 Migration**
    https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3

### Outils

-   **webextension-polyfill** (Mozilla)
    https://github.com/mozilla/webextension-polyfill

-   **web-ext CLI** (Mozilla)
    https://github.com/mozilla/web-ext

-   **Firefox Add-ons Developer Hub**
    https://addons.mozilla.org/developers/

### Différences Chrome/Firefox MV3

| Aspect          | Chrome                     | Firefox                       |
| --------------- | -------------------------- | ----------------------------- |
| Background      | Service Worker obligatoire | Scripts classiques            |
| Namespace       | `chrome.*`                 | `browser.*` (+ `chrome.*`)    |
| Promises        | Natif depuis v121          | Toujours natif                |
| `offscreen` API | ✅ Supporté                | ❌ Non supporté               |
| `sidePanel`     | ✅ Supporté                | ❌ (utiliser `sidebarAction`) |

---

## Estimation des Tâches

| Phase               | Complexité | Description                       |
| ------------------- | ---------- | --------------------------------- |
| 1. Préparation      | Faible     | Créer branche, structure          |
| 2. Manifest Firefox | Faible     | Copier/adapter manifest           |
| 3. Polyfill         | Faible     | Télécharger, inclure              |
| 4. Adaptations code | Moyenne    | Vérifier background.js, offscreen |
| 5. Script build     | Faible     | Script bash standard              |
| 6. Tests            | Moyenne    | Tests manuels complets            |
| 7. Publication      | Faible     | Soumission AMO                    |
| 8. Documentation    | Faible     | README, CLAUDE.md                 |

---

## Notes Importantes

1. **Le workflow Chrome ne change pas** : `manifest.json` reste la source principale, tu continues à publier sur Chrome comme avant.

2. **Pas de build system complexe** : Le script bash suffit, pas besoin de Webpack/WXT pour ce projet.

3. **Code quasi-identique** : 99% du code fonctionne tel quel sur les deux navigateurs.

4. **ID Firefox stable** : Une fois choisi, l'ID dans `browser_specific_settings.gecko.id` ne doit plus changer.
