# Guide de Packaging pour le Chrome Web Store

## Commande de création du ZIP

```bash
zip -r BabelFishAI-1.1.18.zip BabelFishAI \
  -x "BabelFishAI/.git/*" \
  -x "BabelFishAI/.claude/*" \
  -x "BabelFishAI/CLAUDE.md" \
  -x "BabelFishAI/AGENTS.md" \
  -x "BabelFishAI/GEMINI.md" \
  -x "BabelFishAI/scripts/*" \
  -x "BabelFishAI/.deepsource.toml" \
  -x "BabelFishAI/.github/*"
```

## Fichiers exclus du ZIP

| Fichier/Dossier | Raison |
|-----------------|--------|
| `.git/` | Contrôle de version |
| `.claude/` | Fichiers de développement Claude Code |
| `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` | Instructions IA (développement) |
| `README-*-o3-mini.md` | READMEs traduits (pas nécessaires dans l'extension) |
| `scripts/` | Scripts de développement |
| `.deepsource.toml` | Configuration qualité de code |

## Fichiers inclus dans le ZIP

| Fichier/Dossier | Raison |
|-----------------|--------|
| `manifest.json` | **Obligatoire** - doit être à la racine du ZIP |
| `src/` | Code de l'extension |
| `_locales/` | Fichiers de traduction (15 langues) |
| `images/` | Icônes de l'extension |
| `README.md` | Documentation principale |
| `PRIVACY.md` | Politique de confidentialité |
| `LICENSE` | Licence AGPL-3.0 |

## Checklist avant publication

- [ ] Version mise à jour dans `manifest.json`
- [ ] Traductions complètes (`./scripts/check-i18n.sh`)
- [ ] Extension testée localement via `chrome://extensions/`
- [ ] Pas de commentaires dans `manifest.json`
- [ ] ZIP créé avec `manifest.json` à la racine

## Limites du Chrome Web Store

| Limite | Valeur |
|--------|--------|
| Taille maximale du ZIP | 2 Go |
| Longueur du nom | 75 caractères max |
| Longueur de la description | 132 caractères max |
| Format de version | `X.X.X` ou `X.X.X.X` |

## Upload sur le Chrome Web Store

1. Aller sur [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sélectionner l'extension existante ou créer une nouvelle
3. Cliquer sur "Package" > "Upload new package"
4. Sélectionner le fichier ZIP
5. Remplir les informations requises (screenshots, descriptions)
6. Soumettre pour review

## Sources officielles

- [Publish in the Chrome Web Store](https://developer.chrome.com/docs/webstore/publish)
- [Prepare your extension](https://developer.chrome.com/docs/webstore/prepare)
- [Manifest file format](https://developer.chrome.com/docs/extensions/reference/manifest)
- [Chrome Web Store Best Practices](https://developer.chrome.com/docs/webstore/best-practices)
- [Distribute your extension](https://developer.chrome.com/docs/extensions/how-to/distribute)
