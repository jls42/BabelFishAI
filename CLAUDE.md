# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BabelFishAI is a browser extension (Manifest V3) for AI-powered voice transcription and translation. Supports **Chrome** and **Firefox** from the same codebase. Providers : OpenAI (gpt-transcribe/Whisper, GPT), Mistral (Voxtral, Mistral), Gemini (Gemini 3.5 Transcribe, Gemini 3.8 Flash, depuis la 1.2.0) and Custom/LiteLLM for alternative AI providers. Supports 15 languages.

**Primary Language:** French (for comments, documentation, and user-facing messages)

## Principes méta (anti-hallucination)

Ces deux règles sont **OBLIGATOIRES** et s'appliquent transversalement à tout le travail sur ce projet. Elles priment sur les conventions locales en cas de conflit. (Inspirées des CLAUDE.md d'EurekAI et de jls42-astro — voir leçon `c6c282e` PR #29 GPT-5.4/5.5 : un flag basé sur la mémoire au lieu d'une mesure a coûté un aller-retour utilisateur inutile.)

### Mesurer > deviner

**Dès qu'un fait est mesurable factuellement, mesurer AVANT de raisonner dessus.** Ne jamais estimer/supposer quand une vérification coûte quelques secondes. L'intuition est souvent fausse et les itérations basées sur elle coûtent 10× plus cher que la mesure directe.

Cas concrets (non exhaustif) :

-   **Calcul / comptage** : `wc -l`, `grep -c`, `.length`, bash/python — jamais "à peu près N" ni à la tête.
-   **Contenu fichier / comportement code** : lire le fichier, `grep`, lancer le test, jamais depuis la mémoire.
-   **Catalogues externes** (modèles IA OpenAI/Mistral/Anthropic, endpoints API, versions de packages, syntaxes Sonar/Codacy/DeepSource) : **fetch la doc officielle**, jamais depuis la mémoire d'entraînement — les catalogues évoluent en permanence et la connaissance de Claude coupe à une date fixe. Cas typique : avant d'ajouter ou de flagger un modèle dans `src/utils/providers.js`, vérifier sur la page de pricing officielle du provider (`https://developers.openai.com/api/docs/pricing`, équivalents Mistral / Anthropic) qu'il existe au catalogue public.
    -   **Lire le markdown brut, pas un résumé** : les pages de developers.openai.com existent en `.md` (`https://developers.openai.com/api/docs/pricing.md`, `https://developers.openai.com/api/docs/deprecations.md`, index `https://developers.openai.com/api/docs/llms.txt`). Faire `curl -sL <url>.md | grep <id>` plutôt qu'un WebFetch résumé par un modèle : lors de la vérification du 2026-09-16, une lecture résumée a donné `gpt-5.6-astra` (le vrai ID est `gpt-6-astra`) et a manqué les dépréciations de `whisper-1` et `gpt-4.1-nano`.
    -   **Lire aussi `deprecations.md`** lors d'un refresh de modèles : la page de pricing liste des modèles qui ont déjà une date d'arrêt annoncée (ex. `gpt-4.1-nano`, arrêt le 2026-10-23).
    -   **Confronter la page des modèles à la liste que renvoie une vraie clé** (Gemini : `GET /v1beta/models`). Le 2026-09-29, un « 3.8 Flash-Lite » attendu pour le texte n'existait qu'en synthèse vocale (`gemini-3.8-flash-lite-tts`).
-   **Limites annoncées par une doc d'API** : les mesurer avant d'en tirer un refus côté client. Gemini annonce « Maximum request size is 20 MB total », mais son API a accepté un corps de 29,4 Mo (mesuré le 2026-09-29) : un refus avant l'envoi à 20 Mo aurait détruit des dictées de plus de 15 minutes qu'elle transcrit.
-   **Outils statiques** (Sonar CCN, Codacy ESLint, DeepSource finding) : reproduire localement (`pre-commit run --all-files`, `pre-commit run --hook-stage pre-push --all-files`) pour voir ce que l'outil voit, jamais deviner la cause d'un flag.
-   **Dates relatives** : convertir en absolu via le contexte date, jamais extrapoler mentalement.

**Anti-pattern à éviter** : itérer à l'aveugle sur un signal d'outil externe ou sur sa propre mémoire. 30 secondes de mesure factuelle = jours d'itérations économisées.

### Ne JAMAIS inventer

**INTERDIT** : inventer des URLs, identifiants, chiffres, IDs de modèle, noms de règles Sonar/Codacy/DeepSource, signatures d'API ou toute information factuelle.

**OBLIGATOIRE** :

-   Extraire les faits depuis la source officielle (doc, page de pricing, code source) — **jamais depuis la mémoire**.
-   Copier les URLs / identifiants exacts depuis le navigateur ou le fichier, pas les reconstruire de tête.
-   En cas de doute : **demander à l'utilisateur ou omettre l'information** — ne jamais combler les trous.

Cas de figure fréquents où l'invention surgit :

-   "Le modèle `gpt-X.Y` existe / n'existe pas" → vérifier sur la page de pricing OpenAI **avant** d'affirmer.
-   "La syntaxe Codacy est `// codacy:ignore-next-line`" → **n'existe pas**, c'est une invention LLM. Codacy s'est aligné sur Opengrep depuis 2026-02 : syntaxe correcte = `// nosemgrep: <rule-id> -- <raison>` (cf. section SonarCloud / DeepSource Conventions ci-dessous).
-   "L'option `--foo` de la commande X fait Y" → `man`, `--help` ou doc officielle avant d'affirmer.
-   "Les règles de marque de X exigent une approbation" écrit d'après une simple entrée de menu (« Asset approval ») d'un portail qu'on n'a pas pu lire → écrire « règles non lues » (lot 4, `fb6ef80`).
-   **Résumer des conditions d'utilisation** (note d'un panneau, README, `PRIVACY.md`) : garder le périmètre exact de la clause citée, relu mot à mot. La première note de Gemini ne visait que la dictée (le texte part aussi), oubliait la relecture humaine et les informations sensibles, écrivait « hors d'Europe » pour « If you're in the EEA, Switzerland, or the UK », et prêtait à `store: false` l'effet de « ne pas conserver » les dictées (relecture du lot 4, `3808bbe`, `2eec432`).

## Claude Code Workflow

-   **Commits** : utiliser le skill `/helping-with-commits` pour tous les commits (règle projet, OBLIGATOIRE — ne JAMAIS faire de `git commit` direct ni d'ajouter de mention "Co-Authored-By: Claude").
-   **Recherche web** : utiliser l'agent `web-research-specialist:web-research-specialist` pour les recherches de documentation (évite de polluer le contexte principal).
-   **Tâches complexes (refacto modulaire, migration, nouvelle feature transverse)** : commencer en **Plan mode**, itérer sur le plan avec l'utilisateur, puis seulement implémenter. Évite les rework massifs sur un mauvais design.
-   **Vérification visuelle UI obligatoire** après toute modification de banner, options, popup, ou injection content script : ouvrir l'extension dans Chrome (ou via Claude in Chrome MCP `mcp__claude-in-chrome__*`) et tester le golden path **avant** de reporter la tâche comme faite. Le type-check + pre-commit ne valident pas le rendu visuel.
    -   **Prouver l'absence d'effet visuel** d'un changement HTML/CSS (ex. libellés masqués, PR #29) : comparer au pixel des captures Chrome headless avant/après (`git archive HEAD` pour l'état avant) avec `--force-prefers-reduced-motion --virtual-time-budget=5000`. Sans ces options, deux captures du même code de la page Options diffèrent (jusqu'à ~136 000 pixels à 420 px). Après chaque redimensionnement, attendre aussi une mise en page stable (la largeur demandée, puis la même hauteur sur trois images successives) avant de capturer. Neutraliser les transitions CSS est en revanche inutile : sous `prefers-reduced-motion`, `options.css` les ramène à 0,01 ms (mesuré le 2026-09-29 sans style injecté : 21 captures sur 21 identiques, deux fois de suite). Ne remplace pas le test du golden path dans l'extension chargée.
    -   **Prouver l'absence d'effet d'un changement de la page d'options sur le stockage** : journaliser chaque `set`/`remove` de `chrome.storage.sync` (script injecté avant ceux de la page, qui enveloppe aussi le rappel pour relever `chrome.runtime.lastError`), puis comparer entre l'arbre de base et l'arbre de travail le journal, l'état du DOM et le stockage final. Pour éprouver du code qui ne s'active qu'avec un provider absent du registre (panneaux générés), l'ajouter à la seule copie de l'extension que charge le banc, jamais au code livré. Méthode suivie au lot 3, avec un banc local non versionné (`.claude/research/2026-09-27/lot3/banc-options.mjs`, dossier ignoré par git).
-   **Validation utilisateur avant build / publication** : ne JAMAIS lancer `./scripts/build.sh` ni proposer un upload Chrome Web Store / Firefox AMO tant que l'utilisateur n'a pas validé les changements en dev (chargement non packagé). Exception : si l'utilisateur demande explicitement un build, ou valide `./scripts/build.sh firefox` pour un test en dev sur Firefox (seul moyen d'obtenir un `manifest.json` Firefox chargeable, cf. section Firefox ci-dessous).
-   **Avant d'ajouter ou flagger un modèle dans `src/utils/providers.js`** : appliquer la règle « Mesurer > deviner » (ci-dessus) — fetch la page de pricing officielle du provider et confirmer l'existence du modèle au catalogue public. Ne jamais se fier à la mémoire d'entraînement pour les IDs de modèle, ils évoluent constamment.
    -   **LIRE LA DOC OFFICIELLE DU MODÈLE AVANT DE L'AJOUTER, pas seulement la page de pricing** : fiche du modèle (endpoints supportés, effort de raisonnement par défaut), guide « Using <modèle> » de la famille et ses sections de compatibilité des paramètres, page des dépréciations. Confronter à cette doc chaque paramètre que l'extension envoie : `temperature: 0.1` (correction), `file` + `model` (transcription), et les champs lus en réponse (`choices[0].message.content`, `text`). Méthode rapide : `curl -sL https://developers.openai.com/api/llms-full.txt | grep -n -i temperature` (export complet guides + référence). Leçon PR #29 (2026-09-16) : c'était documenté, « `temperature` changes not supported for reasoning models » (`https://developers.openai.com/api/docs/guides/graders.md`), « Unsupported parameters: Remove `temperature`, `top_p`, and `top_logprobs` » (`https://developers.openai.com/api/docs/guides/latest-model/gpt-6-astra.md`), et les guides GPT-5.2 / GPT-5.4 limitent ces paramètres à l'effort `none`. Faute d'avoir lu ces pages, gpt-5.6-luna (qui raisonne, effort `medium` par défaut) a été ajouté et a renvoyé HTTP 400 « Unsupported value: 'temperature' does not support 0.1 with this model ». Si la doc ne dit rien d'un paramètre envoyé, le signaler explicitement à l'utilisateur et faire tester en réel les 3 actions texte (reformuler, traduire, corriger) avant l'ajout. `correctText` réessaie désormais sans `temperature` après un 400.
-   **Méta-règle d'auto-amélioration** : quand une erreur, une mauvaise approche ou une convention oubliée est identifiée pendant le travail, **ajouter une règle dans ce `CLAUDE.md`** (ou un fichier dédié sous `.claude/`) avant de clore la session. Le but est que la même erreur ne se reproduise pas dans une session future avec un contexte vide. Mentionner si possible le commit ou la PR qui a déclenché la leçon.
-   **Code review sur wrappers/proxy** (ex. `fetchViaProxy`, `proxyFetch`, allowlists) : classer chaque finding en _bug actif_ (caller crashe aujourd'hui), _défense en profondeur_ (gap exploitable seulement via code futur) ou _compatibilité future_ (latent, aucun caller actuel) avant de ranker. Évite de mélanger sévérités.
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
        - **Quality gate rouge sans changement de code** : SonarSource active régulièrement des règles dans le profil intégré « Sonar way comprehensive » (ex. `Web:InputWithoutLabelCheck` le 2026-06-15 et `css:S1874` le 2026-06-22, révélées sur la PR #29 le 2026-09-16). Une PR qui dort peut donc passer au rouge au push suivant. Avant de chercher la cause dans ses commits, lister les règles activées depuis la dernière analyse : `curl -s "https://sonarcloud.io/api/qualityprofiles/search?project=jls42_BabelFishAI&organization=jls42"` (clé du profil par langage) puis `curl -s "https://sonarcloud.io/api/qualityprofiles/changelog?key=<clé>&since=<date>"`.

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

### Pièges connus (analyseurs statiques)

-   **`// codacy:ignore-next-line` N'EXISTE PAS** (invention LLM fréquente). Codacy a migré de Semgrep vers Opengrep en février 2026 ; il ne supporte **aucun** skip inline propre côté plateforme. Pour ignorer un finding Codacy inline : utiliser la syntaxe Opengrep / Semgrep `// nosemgrep: <rule-id> -- <raison>` (ou `// nosemgrep` seul) immédiatement au-dessus de la ligne flaggée, ou en fin de ligne (`<code>; // nosemgrep: <rule-id>`). Skip tags via message de commit (`[ci skip]`, `[codacy skip]`) sont les seuls "skip Codacy natifs" qui existent.
-   **Effet secondaire subtil d'un cleanup de dead code** : retirer un `export` ou supprimer une fonction "inutilisée" peut faire ré-évaluer le graphe de taint par Codacy / Opengrep / DeepSource et **réactiver des findings dormants** (acceptés sur un commit antérieur). Quand un finding SAST apparaît après un commit "inoffensif" (suppression d'export, knip, refacto), vérifier en priorité s'il n'a pas modifié la surface d'exports d'un fichier impliqué — avant de soupçonner un bug récent.
-   **Nommer une constante `*API_KEY*` déclenche deux analyseurs à la fois** (leçon 1.1.21) : CodeQL `js/clear-text-logging` suit le flux d'une constante dont l'identifiant contient `key`, `token`, `secret` ou `password` jusqu'au moindre `console.error(error)` et la traite comme un secret, même quand sa valeur est un message d'interface (« Clé API non configurée… »). Onze alertes ont ainsi été fermées en faux positif avant que le renommage de `ERRORS.API_KEY_NOT_FOUND` en `ERRORS.API_CONFIG_MISSING` ne tarisse la source — ce qui a du même coup vidé la baseline `detect-secrets`, dont l'unique entrée visait cette ligne. Préférer un nom qui décrit le problème (`API_CONFIG_MISSING`) plutôt que le secret absent.
-   **Faux positifs rencontrés sur la PR #29 (2026-09-17), corrigés sans ignore** :
    -   DeepSource `JS-W1042` (« redundant undefined ») signale tout `undefined` passé explicitement en argument, même `Set.has(undefined)` qui a un sens : tester l'appartenance autrement (ex. `map.has(name)` avant `map.get(name)`).
    -   Codacy `xss/no-mixed-html` (High) prend pour du HTML toute chaîne contenant `<...>` stockée dans une variable, ex. `['<all_urls>']` : préférer un motif sans chevrons quand il suffit (`*://*/*`, moindre privilège).
    -   Codacy `detect-unhandled-async-errors` (High) : une fonction `async` appelée depuis un écouteur d'événement sans `catch` doit gérer ses erreurs elle-même (`try/catch` interne).
    -   Sonar `Web:S6819` : `<output>` (rôle implicite `status`) plutôt que `role="status"` ; `javascript:S7721` : sortir au niveau du module une fonction imbriquée qui ne capture aucune variable.
-   **Analyseurs statiques et page d'options, leçons de la relecture du lot 3** (mesurées avec les vraies règles, 2026-09-29) :
    -   L'analyseur HTML de Sonar ne saute pas le contenu d'un `<template>` : un champ sans `id` ni `label for` y compte comme `Web:InputWithoutLabelCheck` (bug MAJOR, qui fait tomber le quality gate) et un `<label>` sans cible comme `Web:S6853`. Donner aux contrôles du modèle des identifiants de gabarit uniques et leurs `for`, que le code remplace à la copie (`8aebb1c`).
    -   Codacy (plugin ESLint `xss`) prend toute propriété dont le nom contient « html » pour un contexte HTML : `label.htmlFor = id` est signalé « Unencoded input » (High). Écrire `setAttribute('for', id)`.
    -   Sonar `javascript:S2699` (« Tests should include assertions », BLOCKER) ne vise que les fichiers de test qui importent une bibliothèque d'assertions : ajouter `node:assert` à un fichier dont les tests n'assertent qu'à travers `matchSnapshot` les fait tous signaler. Garder les tests à assertions directes dans leur propre fichier (`7ebe89b`).
-   **Un `eslint-disable-next-line` ne couvre que la ligne suivante** : si prettier coupe l'instruction exemptée en deux (au-delà de 100 caractères), l'accès signalé passe à la ligne d'après et n'est plus couvert. Garder l'instruction sur une ligne (nom de variable plus court) et relire le diff après `pre-commit` (leçon 1.1.21, `saveProvidersConfig`).
-   **Lizard aux seuils de Codacy** (`lizard -l javascript -C 8 -T nloc=50 -w <fichier>`, leçon du lot 2) : une IIFE compte comme une fonction, dont le corps entier compte hors fonctions internes. Le registre (`providers.js`) est à 50 NLOC : une constante de plus dans le corps de l'IIFE suffit à créer un avertissement (51 NLOC mesurés à `ba6f3ed`, ramenés à 50 par `7851826`), d'où les valeurs calculées directement dans l'objet exporté (`DEFAULT_SERVICE`, `15ec1e9`). Lizard lit aussi mal certaines formes, qui gonflent ou coupent une fonction : une regex `/^\//` passée à un appel (préférer `startsWith`), une fonction fléchée qui renvoie un tableau coupé sur plusieurs lignes par prettier. Relancer lizard sur chaque fichier touché avant de commiter, et comparer à l'arbre de base (`git archive`) : les avertissements déjà présents (`correctText`, `options.js`) ne sont pas des régressions. Une fonction qu'on ne veut pas découper s'exempte par `// #lizard forgives - <raison>`, que Codacy respecte (PR #30, `f4f064f`) : Lizard applique cette consigne à la prochaine fonction qui se termine, donc dans une fonction qui en contient d'autres, elle se place après la dernière fonction interne, juste avant la fermeture ; en tête, elle exempte une fonction interne.
-   **Checks de la PR #30 (2026-09-30), relevés avec les vraies règles** :
    -   Sonar a activé le 2026-09-29 `javascript:S9380` à `S9383` (promesses non gérées, `await` dans une boucle) : le quality gate de la PR #30 est tombé sur six « bugs » dans du code déjà relu (voir « Quality gate rouge sans changement de code »). Une promesse ignorée exprès se justifie par `// NOSONAR javascript:S9383 - <raison>` plutôt que par `void`, que DeepSource signale (JS-0098 « Void operators found »). Prettier déplace dans le corps d'une IIFE un commentaire de ligne placé après son accolade : un commentaire bloc avant l'accolade reste sur la ligne signalée (`content.js`, `c7871c8`).
    -   Une JSDoc fausse suffit à créer un faux positif : un `@returns {Promise<void>}` recopié sur la fonction synchrone `validateAudioBlob` a fait signaler son appel comme une promesse non gérée. Corriger la JSDoc, pas le code (`ae67253`).
    -   La règle Codacy `security-node/detect-unhandled-async-errors` est une heuristique : elle signale toute fonction `async` déclarée dont aucune instruction de premier niveau n'est un gestionnaire qu'elle reconnaît (`try/catch` dont le paramètre s'appelle `e`, `err` ou `error`, `if (…) throw new Error(…)` sans accolades, `return`…), sur sa dernière instruction : l'`eslint-disable-next-line` se place avant celle-ci (`a62d7c0`).
    -   DeepSource signale `chrome` comme non défini (JS-0125, critique) jusque sur les lignes intactes d'un fichier touché par la PR, si ce fichier ne déclare pas `/* global chrome */` (`8bd8e93`).
    -   Sonar `javascript:S2187` compte comme « sans test » un fichier de test qui ne fait qu'appeler une suite partagée : chaque fichier d'entrée garde au moins un `test()` à lui, vérifié par instantané seulement (S2699) (`005036a`).
    -   Reproduire en local : les règles ESLint de Codacy avec ESLint 8, `eslint-plugin-security-node` et `eslint-plugin-no-unsanitized@4.0.2` (`npm install --legacy-peer-deps` dans un dossier jetable) ; la liste complète des constats d'un run DeepSource, que sa page ne rend qu'au défilement, en rejouant sa requête GraphQL depuis Chrome headless (scripts dans `.claude/research/2026-09-27/pr30/outils/`, dossier ignoré par git). La PR #29 s'était close sans aucun constat DeepSource introduit : c'est le seuil suivi.
-   **Avant d'ajouter un ignore (inline ou global)** : **mesurer** en lançant `pre-commit run --hook-stage pre-push --all-files` localement pour reproduire avec Opengrep. Ne jamais ignorer à l'aveugle un finding cloud sans tenter de reproduire localement d'abord (principe « Mesurer > deviner »). Note : certaines règles LGPL utilisées par Codacy ne sont PAS dans les packs locaux Opengrep — dans ce cas, opengrep local ne reproduit pas, et le seul moyen de valider un fix est le rescan Codacy post-push.

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
| pre-commit | detect-secrets                 | Détection fuites de clés API (baseline vide depuis la 1.2.0)                |
| pre-push   | check-security-sast (Opengrep) | SAST `p/javascript` + `p/security-audit` + `p/default`, severity ERROR      |
| pre-push   | check-complexity (Lizard)      | CCN ≤ 20, length ≤ 1500 lignes (durcissables par PR dédiée)                 |
| pre-push   | run-tests                      | Tests Node `scripts/run-tests.sh` (voir « Tests » ci-dessous)               |

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

## Tests

### Suite Node (`./scripts/run-tests.sh`)

-   **Lancer** : `./scripts/run-tests.sh` (Node 22 ou plus, moins d'une seconde, aussi exécuté par le hook pre-push). Le lanceur passe à `node --test` la liste explicite des `tests/**/*.test.mjs` et sort en erreur si elle est vide : `node --test tests/` échoue, et `node --test 'motif'` sans aucun fichier sortirait en 0.
-   **Un fichier par configuration** (arbre × navigateur), chacun dans son propre processus : `config-resolution` (provider, URL, clé et modèle résolus pour chaque contenu de stockage), `requests-chrome` et `requests-firefox` (dictée et trois actions texte par provider, erreurs HTTP et réseau, allowlist), `background-chrome` et `background-firefox` (migrations, menus, icône, raccourci, badge, proxy), `versions` (versions publiées 1.1.17 à 1.1.20 et arbre testé sur les mêmes stockages : quelle clé part vers quel hôte). Viennent ensuite les modules des providers, testés seuls : `registry` (données et accesseurs du registre), `provider-store` (règle d'URL de l'invariant, clés de stockage lues, clé résolue) et `provider-adapters` (entêtes, redirections, corps, lecture des réponses et des erreurs, formats déclarés par le registre). Enfin, deux tests statiques : `static-declarations` (déclarations globales par monde d'exécution) et `content-modules` (modules chargés par `content.js`, couverts par `web_accessible_resources`).
-   **Principe** : les bouchons (`tests/helpers/chrome-stub.mjs`, `env.mjs`) sont posés sur `globalThis`, puis les vrais fichiers de `src/` sont chargés par `import()`, sans `vm` ni `eval`. Sous Firefox, le vrai `background.js` est chargé dans le même processus et reçoit les messages `proxyFetch` du content script : les requêtes Chrome et Firefox d'un même scénario sont identiques, multipart compris.
-   **Instantanés** (`tests/snapshots/*.json`) : toujours relevés en exécutant le code (`./scripts/run-tests.sh --update`), jamais écrits à la main. Ils décrivent le comportement actuel, défauts connus compris (clé d'un proxy LiteLLM non migré envoyée aux URLs OpenAI, message 422 répété). La sélection `__proto__` sans repli, qui plantait sur la base de la refonte, se résout depuis le lot 2 en configuration sans clé. Relire le diff des instantanés avant de commiter une mise à jour : chaque différence est un changement de comportement. Les fausses clés y apparaissent sous la forme `{cle openai}` : on lit quelle clé part vers quel hôte, et detect-secrets écarte ces valeurs en forme de gabarit.
-   **Preuve d'équivalence** : `./scripts/run-tests.sh --ref <réf>` exécute la suite de l'arbre de travail sur le code d'une autre version (`git archive` de `src`, `_locales`, `images` et des manifests). Une refonte « sans changement visible » doit passer sur l'arbre de travail et sur sa base. Exemple mesuré le 29/09 : sur `6c9ae09`, seul le test du `FileReader` en échec (correctif n°7) tombe.
-   **Pièges** :
    -   Sans `package.json`, Node charge les `.js` de l'extension en CommonJS, dont le cache ignore la requête de l'URL (`?instance=`). `loadScripts(..., { fresh: true })` retire donc le fichier de `require.cache` pour le réexécuter (état de module remis à zéro, par exemple les modèles qui refusent `temperature` dans `correctText`).
    -   Ne jamais faire `git checkout -- <fichier>` sur un fichier ajouté par `git add -N` : il revient vide (constaté le 29/09 sur les instantanés).
    -   Fixtures (`tests/helpers/fixtures.mjs`) : fausses clés sans la forme d'une vraie clé, aucun identifiant `*API_KEY*`. Les corps de réponse présentés comme relevés (`GEMINI_ERRORS`, forme de `GEMINI_INTERACTIONS`) viennent de mesures datées ; tout exemple inventé le dit en commentaire.
    -   `describeRequest` relève un corps-promesse comme « <promesse non attendue> » au lieu de l'attendre : sinon la suite Chrome ne voit pas un `await` manquant, qui enverrait « [object Promise] » (`4d6e792`). Un test qui ne change rien quand on casse la fonction ne prouve rien : essayer une mutation sur une copie (`BABELFISH_ROOT=<copie> node --test …`) avant de compter sur lui ; la relecture du lot 4 en a trouvé dix qui survivaient à toute la suite.
    -   Depuis que Gemini est connu, le provider « d'une version plus récente » des tests s'appelle `provider-futur` (identifiant fictif) : ne pas réutiliser l'identifiant d'un provider du registre pour ce rôle. Les jeux S1 et S2 du plan gardent `gemini` : les versions publiées l'ignorent toujours, l'arbre testé l'utilise.
    -   La sonde des versions (`tests/helpers/version-probe.mjs`) répond dans tous les formats (OpenAI, chat, Interactions) et relève `x-goog-api-key` en plus d'`Authorization` : une clé portée par un autre entête serait sinon invisible (`autorisation: null`). Les instantanés de requêtes relèvent aussi `redirect` (depuis `771364d`).
-   **Qualité** : `lizard -l javascript -C 8 -T nloc=50 -w tests scripts` doit rester muet (seuils de Codacy). `.sonarcloud.properties` (chemins simples, sans joker : sources et tests disjoints), `.deepsource.toml` (`test_patterns`) et `.codacy.yml` (`exclude_paths`) déclarent `tests/` comme code de test. **`.codacy.yml` remplace les fichiers ignorés dans l'interface de Codacy** (doc « Ignoring files ») et n'exclut que `tests/`. Un faux positif de Codacy s'écarte par un commentaire justifié sur sa ligne (`eslint-disable-next-line`, `nosemgrep`), jamais en ignorant un fichier entier : `src/content.js`, ignoré en entier dans l'interface sans raison connue, est de nouveau analysé depuis le 30/09, à la demande du propriétaire. La doc « Codacy configuration file » fait primer la configuration de la branche par défaut sur celle d'une PR ; sur la PR #30 pourtant, Codacy a analysé `src/content.js` dès le premier push qui le retirait de `.codacy.yml`.

## Development Workflow

**No build system** - Pure JavaScript with ES6 modules. Development is straightforward:

### Chrome (développement direct)

1. Edit source files directly
2. Go to `chrome://extensions/` → Enable Developer mode
3. Click "Load unpacked" and select this folder (or click reload if already loaded)
4. Test changes in browser

### Firefox (développement direct)

1. Edit source files directly
2. Run `./scripts/build.sh firefox` (avec l'accord de l'utilisateur) : copie le code dans `dist/firefox/` et renomme `manifest.firefox.json` en `manifest.json`. À relancer après chaque modification, sinon Firefox teste l'ancien code.
3. Go to `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on..." and select `dist/firefox/manifest.json` (à la racine du dépôt, `manifest.json` est celui de Chrome). Ne PAS passer par « Installer un module depuis un fichier » dans `about:addons` : ce menu attend une extension signée et refuse la version de dev avec « fichier corrompu » (constaté le 2026-09-16, PR #29). Alternative scriptable : `npx web-ext run --source-dir dist/firefox`, avec `TMPDIR` dans un dossier non caché du home si Firefox est installé en snap (son `/tmp` est privé).
5. Test changes in browser

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
-   `globalThis.BabelFishAIProviders` - AI provider registry (`providers.js`, données gelées)
-   `globalThis.BabelFishAIProviderStore` - Lecture des réglages des providers dans le stockage et invariant de sécurité (`provider-store.js`)
-   `globalThis.BabelFishAIProviderAdapters` - Formats d'API : entêtes, corps, lecture des réponses et des erreurs (`provider-adapters.js`)

**Note**: Utiliser `globalThis` au lieu de `window` pour la portabilité ES2020+.

### Key Files

-   `manifest.json` - Chrome configuration (Manifest V3, Service Worker)
-   `manifest.firefox.json` - Firefox configuration (Manifest V3, background scripts)
-   `src/background.js` - Background script handling events, icon clicks, keyboard shortcuts, context menu
-   `src/content.js` - Main script injected into pages, coordinates all modules
-   `src/shortcut-guard.js` - Firefox uniquement : « raccourci prioritaire ». Déclaré dans `content_scripts` de `manifest.firefox.json` (`*://*/*` = pages web HTTP(S)/WebSocket, moindre privilège ; `'<all_urls>'` dans une variable déclenche aussi le faux positif Codacy `xss/no-mixed-html`), au `document_start`, en `all_frames`. Firefox accorde les origines du manifest à l'installation (`startupReason === 'ADDON_INSTALL'` + pref `extensions.originControls.grantByDefault`, `Extension.sys.mjs`), donc aucun clic pour une nouvelle installation ; les boutons des options servent à retirer l'accès ou à le redemander après une mise à jour. Arrête la propagation de la combinaison du raccourci (lue dans `storage.local.executeActionShortcut`, tenue à jour via `commands.getAll`/`onChanged`) sans `preventDefault()`, pour que Firefox exécute le raccourci malgré l'éditeur de la page. Ne jamais y ajouter de lecture ou d'envoi de données : `PRIVACY.md` s'y engage.
-   `src/constants.js` - Global constants (errors, states, actions)
-   `src/lib/browser-polyfill.min.js` - webextension-polyfill pour compatibilité cross-browser

### Différences Chrome/Firefox

| Aspect                          | Chrome                            | Firefox                             |
| ------------------------------- | --------------------------------- | ----------------------------------- |
| Background                      | Service Worker (`service_worker`) | Scripts classiques (`scripts`)      |
| Manifest                        | `manifest.json`                   | `manifest.firefox.json`             |
| `importScripts()`               | Supporté (Service Worker)         | Non supporté (chargé via manifest)  |
| CSP des pages                   | Content scripts exempts           | Content scripts soumis aux CSP      |
| `fetch()` depuis content script | Au nom de la page, soumis au CORS | Bloqué par `connect-src` de la page |

Sous Chrome, un `fetch()` du content script n'utilise pas les permissions de l'extension : doc Chrome « Cross-origin network requests » (relue le 2026-09-28), « Content scripts initiate requests on behalf of the web origin that the content script has been injected into and therefore content scripts are also subject to the same origin policy ». Le provider reçoit donc l'origine de la page visitée (`PRIVACY.md`), et un serveur appelé depuis un content script doit répondre avec des entêtes CORS (c'est le cas de `scripts/mock-openai-server.py`).

#### Gestion de `importScripts()` (background.js)

Le code utilise une vérification conditionnelle car Firefox ne supporte pas `importScripts()` dans les background scripts classiques :

```javascript
if (typeof importScripts === 'function') {
    importScripts('utils/languages-data.js');
    // Modules des providers : leur absence ne doit pas empêcher le démarrage (le proxy refuse
    // alors les requêtes)
    try {
        importScripts(
            'utils/providers.js',
            'utils/provider-store.js',
            'utils/provider-adapters.js',
        );
    } catch (error) {
        console.error(
            'Modules des providers indisponibles dans le service worker :',
            error.message,
        );
    }
} else if (!providerModules()) {
    console.error('Modules des providers absents de background.scripts : proxy indisponible.');
}
```

Sous Firefox, ces trois modules doivent figurer dans `background.scripts` de `manifest.firefox.json`, **avant** `src/background.js`. Un script chargé par le background et absent de cette liste casse le proxy sans erreur de chargement : d'où le message au démarrage. Les tests le voient aussi : la suite du background Firefox charge les scripts de cette liste, et l'instantané de `static-declarations` fige la liste de chaque monde (background Firefox, service worker Chrome).

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
    ? await fetchViaProxy(url, requestOptions, providerId, service) // Via background
    : await fetch(url, requestOptions); // Direct
```

**Architecture du proxy** (`background.js` → `proxyFetch()`) :

1. Le content script envoie un message `proxyFetch` avec l'URL, le provider, le service et les options, **sans aucun entête d'authentification** (`requestHeaders(headers, {})` les retire tous)
2. Le background relit le stockage et vérifie l'invariant de sécurité (voir « Appels d'API ») : provider résolu pour ce service, clé présente, URL sur une origine configurée pour ce provider. Il reconstruit lui-même l'entête d'authentification décrit par le registre et fixe la politique de redirection
3. Le background effectue le `fetch()` (non soumis aux CSP), et le résultat est renvoyé au content script

Chaque refus a sa cause (`PROXY_REFUSALS`) : `UrlNotAllowedError` (URL hors des origines du provider, message historique), `ProviderNotAllowedError` (provider ou clé non résolus par le stockage), `ProxyCheckError` (vérification impossible, stockage illisible par exemple) et `ProviderModulesError` (module des providers absent du background). Aucun de ces messages ne ressemble à une erreur réseau : `callApi` ne réessaie pas.

**Sérialisation FormData** : Les `FormData` (pour l'upload audio) ne peuvent pas être envoyés via messaging. `formDataToSerializable` (`api-utils.js`) les convertit en tableau d'objets, chaque blob étant encodé en base64 par `FileReader.readAsDataURL` ; le background le décode (`decodeBase64ToBlob`) et reconstruit le `FormData`. Ce passage décrivait jusqu'au 2026-09-29 une conversion en `Uint8Array` que le code ne fait plus.

```javascript
// Conversion FormData → tableau sérialisable (formDataToSerializable)
formData.forEach((value, name) => entries.push({ name, value }));
for (const { name, value } of entries) {
    if (value instanceof Blob) {
        // Blob → data URL (FileReader) → base64 ; la promesse rejette si la lecture échoue
        fields.push({
            name,
            isFile: true,
            data: base64,
            type: value.type,
            filename: value.name || 'file',
        });
    } else {
        fields.push({ name, isFile: false, value: String(value) });
    }
}
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
| `providers.js` | Registre des providers (OpenAI, Mistral, Custom, Gemini) : services, URLs, authentification, formats, modèles (dont `temperature: false` et `reasoningEffort` par modèle de chat), présentation dans les options (`ui`, dont `noteKey`) |
| `provider-store.js` | Réglages des providers dans le stockage (`providers`, `extraProvider.<id>`), provider et clé résolus, origines autorisées (invariant de sécurité) ; sans DOM, partagé avec le background |
| `provider-adapters.js` | Formats d'API déclarés par le registre (`openai-chat`, `openai-multipart`, `gemini-interactions`) : entête d'authentification, politique de redirection, corps des requêtes, lecture des réponses, formats d'erreurs (`openai`, `gemini` avec `rejectsKey`), `blobToBase64` ; sans DOM, partagé avec le background |
| `languages-shared.js` | Language definitions (single source of truth) |
| `languages-data.js` | Language data for Service Worker context |
| `i18n.js` | Internationalization |

### Page d'options (`src/pages/options/`)

-   **Panneaux** : les trois providers historiques (OpenAI, Mistral, Custom) ont un panneau statique dans `options.html` ; `STATIC_PANELS` (`options.js`) donne leurs identifiants DOM, dans l'ordre où `providers` est écrit (openai, mistral, custom, comme avant la refonte). Chrome relit pourtant ces clés triées par ordre alphabétique (mesuré le 2026-09-29) : le repli du store à l'exécution suit l'ordre relu, alors que la page choisit son propre repli dans l'ordre d'affichage (Mistral, OpenAI, Custom). Tout le reste vient du registre : ordre d'affichage, abréviation, nom de statut, logo ou emoji (bloc `ui`), URLs demandées à l'utilisateur (`urlSetting`, Custom seulement).
-   **Provider ajouté au registre** (Gemini le premier, lot 4) : il reçoit un panneau copié de `<template id="providerPanelTemplate">` (et `providerToggleTemplate`), placé dans le menu selon `ui.order`, sans aucune modification d'`options.js` ni d'`options.html` (critère du lot 6). Une note propre au provider se déclare par `ui.noteKey` (clé i18n affichée sous le lien de la clé) : `check-i18n.sh` compte ces clés du registre, et `tests/registry-rules.test.mjs` exige leur présence dans les 15 langues. À 420 px, les pastilles de statut passent sous le titre dès quatre providers (`866e498`). `tests/registry-rules.test.mjs` vérifie ce qu'il suppose : dictée ET texte, `ui` complet, `keyUrl` analysable et en https, aucun `urlSetting` (le modèle n'a pas de champ d'URL). La page charge `provider-store.js` et en reprend la convention de stockage (`EXTRA_PREFIX`, `getProviderConfig`, `requiredUrlSettings`) au lieu de la réécrire.
-   **Stockage** (contrat du plan, points 2 à 5) : la configuration d'un provider ajouté va dans `extraProvider.<id>`, jamais dans `providers` ni dans `apiKey`. Elle n'est écrite que si le provider a été modifié pendant la session, et retirée quand l'utilisateur le vide (d'abord un `set` qui déplace la sélection, puis le `remove`). Une sauvegarde fait un seul `storage.sync.set` et affiche `saveErrorMessage` si `chrome.runtime.lastError` est posé. Une sélection écrite par une version plus récente (identifiant de la forme de ceux du registre, mais inconnu de lui) est réécrite telle quelle tant que l'utilisateur ne change pas ce sélecteur, et le sélecteur l'affiche (« gemini (version plus récente) »). Les champs d'`extraProvider.<id>` inconnus du panneau sont conservés à la réécriture.
-   **Écritures faites ailleurs** (autre page d'options, autre poste) : `storage.onChanged` met à jour la sélection gardée, les panneaux générés que l'utilisateur n'a pas modifiés pendant la session et la liste des versions plus récentes, sans jamais déclencher de sauvegarde. Les panneaux des providers historiques ne sont pas rafraîchis, comme avant la refonte (choix laissé au propriétaire).
-   **Providers d'une version plus récente** : les clés `extraProvider.*` inconnues du registre sont listées (lecture `get(null)`, noms de clés seulement : jamais les valeurs, qui contiennent les clés API) avec un bouton Effacer. Il relit la sélection enregistrée : si elle ou la sélection gardée vise ce provider, un `set` la déplace d'abord, puis le `remove` retire la clé. Le bouton est inactif pendant l'opération, un échec s'affiche dans la ligne, et le focus passe ensuite au bouton suivant ou au menu des providers.

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
2. **Security**: NEVER expose API keys or sensitive URLs directly. Ne jamais journaliser un objet lu dans `chrome.storage.sync` (`items`, `data`, `providers`) : il contient les clés API. Journaliser des identifiants ou des booléens (leçon 1.1.21 : `options.js` écrivait toute la configuration, clés comprises, dans la console de la page d'options).
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
-   **Piège runtime (leçon PR #29, commit `066c4fe`)** : `BabelFishAIUtils.i18n.getMessage()` renvoie **le nom de la clé** quand elle manque dans la locale chargée (`src/utils/i18n.js`). Cette chaîne n'est pas vide, donc un fallback `getMessage('cle') || 'texte'` ne s'applique jamais : un utilisateur en interface `en`, `de`… voit `cle` à l'écran. Une clé ajoutée en `fr` seul est donc un bug pour les 14 autres locales : avant merge, la traduire partout ou signaler explicitement le manque à l'utilisateur.
-   **Message à paramètre** : `i18n.getMessage(clé, { nom: valeur })` remplace `$nom$` dans le message. Un `$nom$` exige une entrée `placeholders` dans chaque `messages.json` (`"nom": { "content": "$1" }`) : sans elle, Chrome refuse de charger l'extension entière (mesuré le 2026-09-29 avec Chrome for Testing 152, `saveErrorMessage` sans `placeholders` dans `fr` seulement : aucun service worker). Au passage, le message de `lastError` d'une écriture trop grosse vaut dans Chrome 152 « Resource::kQuotaBytesPerItem quota exceeded », pas le nom documenté `QUOTA_BYTES_PER_ITEM`.
-   **Avant tout merge** : relancer `./scripts/check-i18n.sh` (code de sortie 0 attendu) au lieu de se fier à un test plan déjà coché. La PR #29 annonçait « 99/99 clés » alors qu'un commit plus récent avait ajouté `bannerNoSpeech` en `fr` seulement.

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
-   **Gemini** : dictée par l'Interactions API (`https://generativelanguage.googleapis.com/v1beta/interactions`, entête `x-goog-api-key`, audio en base64, `store: false`), texte par la couche compatible OpenAI (`https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`, Bearer). Faits datés et sources : `docs/providers/gemini.md`.
-   All configurable via Expert mode for LiteLLM Proxy compatibility

## Brand Assets

Les logos des providers sont stockés dans `images/` :

-   `images/mistral-logo.png` - Logo Mistral AI (M arc-en-ciel)
-   `images/openai-logo.png` - Logo OpenAI (blossom)
-   Custom/LiteLLM utilise l'emoji 🚅 (pas de logo officiel)
-   `images/gemini-logo.png` - Icône Gemini (étoile), rendue par Chrome à partir de « Google Gemini icon 2025.svg » de Wikimedia Commons (domaine public pour le droit d'auteur, marque déposée). Choix du propriétaire le 2026-09-30, d'abord remplacée par le signe ♊. Usage couvert par la section 6b des Google APIs Terms (« display Google's Brand Features for the purpose of promoting or advertising that you use the APIs »), sous réserve de règles de marque illisibles sans compte partenaire ; rien ne doit suggérer un partenariat avec Google (6c). Détails : `docs/providers/gemini.md`

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
-   **Firefox : Ctrl+Shift+1 inopérant dans les éditeurs de type ProseMirror** (constaté sur chatgpt.com le 2026-09-16) : la zone de saisie passe en titre 1, comme le keymap ProseMirror standard (`Shift-Ctrl-1` à `6` = titres, `prosemirror-example-setup/src/keymap.ts`), qui appelle `preventDefault()` (`prosemirror-view/src/input.ts`). Firefox enregistre les raccourcis d'extension comme des `<key>` XUL sans attribut `reserved` (`toolkit/components/extensions/ExtensionShortcuts.sys.mjs`) et ignore ces handlers quand la page a fait `preventDefault()` (`dom/events/GlobalKeyListener.cpp`, `WalkHandlers`), sauf si la permission de site `shortcuts` (« Override keyboard shortcuts ») est sur Bloquer. Mozilla : bug 1555620 (NEW, « WebExtensions command don't work when the key combination is used by the webpage »), l'alternative citée étant un content script global. Solution livrée (PR #29) : option « raccourci prioritaire » des options Firefox, voir `src/shortcut-guard.js`. Validé en réel le 2026-09-16 : un écouteur en capture sur `window` qui appelle `stopImmediatePropagation()` sans `preventDefault()` laisse Firefox exécuter le raccourci. Autres contournements : cliquer sur l'icône de l'extension, changer le raccourci (`about:addons` → ⚙ → gérer les raccourcis) ou bloquer la permission de site. Éviter Ctrl+Shift+chiffre comme raccourci par défaut.
-   **Ampleur du conflit Ctrl+Shift+chiffre, mesurée le 2026-09-17** (21 produits vérifiés dans leur doc ou leur code officiels) : 12 en lient un. Lient précisément le **chiffre 1** — donc le raccourci par défaut de l'extension : `prosemirror-example-setup` (`Shift-Ctrl-1` à `6` = titres, famille d'éditeurs de ChatGPT), **Notion** (« ctrl + shift is the combination for Windows and Linux » + « cmd/ctrl + option/shift + 1 to create an H1 heading », page d'aide officielle, qui prévient elle-même du risque de collision) et **Lexical** (`LOWERCASE: {key: '1', modifiers: CONTROL_SHIFT}`, `lexical-playground/.../shortcuts.ts`). Ne lient que 7, 8, 9 ou 0 : Slack, Google Docs, GitHub, GitLab, Linear, Confluence, Jira, TipTap, BlockNote — donc remapper le raccourci sur un autre chiffre déplace le problème au lieu de le régler. Ne pas qualifier ce conflit de marginal sans ce relevé : l'estimation « c'est rare » faite à partir de deux sites était fausse.
-   **Firefox MV3 : une permission d'hôte ajoutée par une mise à jour n'est jamais accordée** (bug Mozilla 1893232, confirmé par MDN `manifest.json/host_permissions` : « if an extension update requests new host permissions, these are not shown to the user »). Le code ne l'accorde qu'à `startupReason === 'ADDON_INSTALL'` (`Extension.sys.mjs`). Conséquences pour toute évolution du raccourci prioritaire : garder un bouton de secours dans les options pour les utilisateurs déjà installés, et ne jamais promettre dans la doc qu'une mise à jour activera une nouvelle permission. À l'inverse, **changer le motif d'une permission déjà accordée la révoque** : à la mise à jour, Firefox retire les origines accordées que le nouveau manifest ne couvre plus. Ne pas retoucher `*://*/*` à la légère.

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
-   **Fallbacks langues dans `banner-utils.js`** : filet si l'import de `languages-shared.js` échoue. Dans les versions publiées jusqu'à la 1.1.20, `content.js` injectait ce fichier par une balise `<script>`, qui l'exécutait dans le monde de la page, invisible du content script : le repli servait donc à chaque fois. La cause était l'isolement des mondes d'exécution, pas une course au chargement. Depuis le commit `c2ee451`, le fichier est chargé par `import()` comme les autres utilitaires

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

#### 11. Vérifier la version minimale d'une API JavaScript récente

Le manifest Chrome ne fixe aucune version minimale (`minimum_chrome_version` absent). Le plancher de fait est Chrome 99 : `sendMessageToContentScript` (`background.js`) n'injecte le content script que dans le `catch` d'un `await chrome.tabs.sendMessage`, et cette méthode ne renvoie de promesse qu'à partir de Chrome 99 (doc Chrome, API `tabs`, `sendMessage` : « Returns Promise<any> Chrome 99+ », relue le 2026-09-29). `Object.hasOwn` (Chrome 93) reste en dessous. Sous Firefox, `strict_min_version` vaut 140. Avant d'utiliser une API plus récente dans `src/`, lire sa table de compatibilité sur MDN : `Array.prototype.with` (Chrome 110) a failli rendre le registre, donc toute l'extension, inutilisable sur un Chrome plus ancien (leçon du lot 2, commit `3ede6f8`, dont le message situe à tort le plancher à Chrome 93).

### Variables et Fonctions

-   **Ne JAMAIS déclarer de variables non utilisées** : Si une variable est déclarée, elle doit être utilisée
-   **Supprimer les fonctions inutilisées** ou ajouter `// skipcq: JS-0128` si conservées intentionnellement
-   **Éviter les constantes importées mais non utilisées** : Ne pas importer de constantes "au cas où"

### Appels d'API (api-utils.js)

La fonction `callApi` attend UN SEUL objet avec toutes les options :

```javascript
// ✅ CORRECT
const config = await globalThis.BabelFishAIUtils.api.resolveApiConfig('chat');
await globalThis.BabelFishAIUtils.api.callApi({
    url: config.url,
    apiKey: config.apiKey,
    headers: { 'Content-Type': 'application/json' },
    body,
    errorType: 'Error message',
    providerId: config.providerId, // obligatoire : invariant de sécurité
    service: 'chat', // obligatoire : 'chat' ou 'transcription'
    retryOnFail: true
});

// ❌ INCORRECT (deux arguments)
await globalThis.BabelFishAIUtils.api.callApi(apiUrl, { ... });
```

**Invariant de sécurité** (défense en profondeur, `assertRequestAllowed` dans `api-utils.js`, repris par le proxy Firefox) : une clé ne part que vers une origine exacte (schéma, hôte et port) configurée pour son provider, c'est-à-dire une URL du registre, ou une URL réglée par l'utilisateur pour Custom. Sur une lecture fraîche du stockage, le provider et la clé passés à `callApi` doivent être ceux que ce stockage résout pour le service. Ne jamais passer d'entête d'authentification à `callApi` : tout entête d'authentification connu du registre est retiré, et celui du service est construit d'après le registre (`auth: {header, scheme}`). Une clé portée par un autre entête qu'`Authorization` ne suit pas de redirection (`redirect: 'error'`), car la spec Fetch ne retire qu'`Authorization` lors d'un changement d'origine.

Le corps d'une requête et la lecture de sa réponse passent par l'adaptateur du format que le registre déclare pour le service (`BabelFishAIProviderAdapters.getAdapter(format)`, `chatAdapter(providerId)` dans `text-processing.js`), et le message d'une réponse en erreur par le lecteur de son format d'erreurs (`getErrorReader`). Un adaptateur de dictée peut préparer son corps de façon asynchrone (audio en base64 par `blobToBase64`) et déclarer ses entêtes (`headers`, par exemple le `Content-Type` d'un corps JSON) ; `chatAdapter` ajoute au corps l'effort de réflexion que le registre déclare pour le modèle (`reasoningEffort`). Un provider qui refuse une clé autrement que par un 401 (Gemini : 400) déclare un format d'erreurs avec `rejectsKey` : `callApi` affiche alors le message du 401. Un réglage qui doit valoir pour tous les modèles d'un provider, y compris ceux que l'utilisateur ajoute dans les options, se déclare sur le service et non modèle par modèle : `services.chat.temperature: false` pour Gemini (relecture du lot 4, `a66b66e` : un modèle ajouté recevait encore `temperature`). Pour lire la réponse d'une API chat/completions, passer par `extractText(response)` de l'adaptateur, jamais par `response.choices[0].message.content.trim()` : les modèles Mistral qui raisonnent (Small 4, Medium 3.5) peuvent renvoyer `content` sous forme de liste de blocs (`TextChunk` `{type: "text", text}` et `ThinkChunk` `{type: "thinking", thinking}`), et seule la réponse doit être insérée (https://docs.mistral.ai/studio/conversations/reasoning).

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
4. Tester un nouveau provider avec la vraie clé du propriétaire, seulement quand il la donne pour cette tâche, et jamais en la cherchant soi-même : le 2026-09-29, le mode auto de Claude Code a refusé la lecture de ses fichiers `.env` (« Credential Exploration »), à juste titre, sans contournement. **Une clé affichée dans la conversation n'est pas une autorisation de l'utiliser** : le 2026-09-30, le propriétaire a affiché son `.env` pour son propre copier-coller dans l'extension ; y prendre ses clés OpenAI et Mistral pour un banc a été refusé (« Credential Leakage »), et ce n'était pas sa demande. La clé passe par une variable d'environnement (jamais écrite dans un fichier, un journal ou un commit, toute sortie en est nettoyée). Recette des bancs du lot 4 (`.claude/research/2026-09-27/lot4/banc/`, dossier ignoré) : profil Chrome for Testing dans `/tmp` (tmpfs) ; vraie parole au micro par `--use-file-for-fake-audio-capture=<fichier.wav>` ; actions texte par le vrai `handleContextMenuClick` du background ; sous Firefox (snap), profil dans `~/snap/firefox/common`, stockage vidé puis profil supprimé, et page de test en `connect-src 'self'` pour forcer le proxy. Sans la permission `tabs`, `tabs.query({url})` ne trouve aucun onglet sous Firefox : désigner l'onglet autrement.
5. Tester aussi le provider **Custom/LiteLLM**, pas seulement OpenAI et Mistral : dictée et trois actions texte, sous Chrome et sous Firefox, avec le serveur factice (`python3 scripts/mock-openai-server.py`, voir plus bas) ou un vrai proxy LiteLLM. C'est le seul provider dont les URLs viennent de l'utilisateur (`urlSetting`), donc le seul qui éprouve la règle d'origine exacte de l'invariant de sécurité (port compris). Demandé par le propriétaire le 2026-09-29. Piège vu ce jour-là : une dictée Firefox échouée en « NetworkError » sur `http://localhost:8765` venait du serveur factice non lancé, pas du code.

### Tester le provider Custom/LiteLLM sans serveur distant

`scripts/mock-openai-server.py` (Python 3, sans dépendance) simule un serveur compatible OpenAI sur `http://localhost:8765` : il répond instantanément sur `/v1/audio/transcriptions` et `/v1/chat/completions`, et **journalise ce que l'extension envoie vraiment** (champs multipart, nom et taille du fichier audio, modèle, présence de `temperature`, entête `Authorization`).

```bash
python3 scripts/mock-openai-server.py          # port 8765 par défaut
python3 scripts/mock-openai-server.py 9000     # autre port
```

Dans les options, provider Custom/LiteLLM : URL de transcription `http://localhost:8765/v1/audio/transcriptions`, URL de chat `http://localhost:8765/v1/chat/completions`, clé API quelconque. La validation d'URL accepte HTTP uniquement sur `localhost` / `127.0.0.1` (`providers.js:isValidUrl`, `provider-store.js:isProtocolAllowed`), donc n'importe quel port local convient, à condition que les deux URLs de Custom le visent : la clé ne part que vers leurs origines exactes, port compris.

Une transcription doit insérer la phrase renvoyée par le serveur, et les actions texte un résultat préfixé par `[serveur local]`. C'est le seul moyen simple de vérifier le chemin `FormData` du proxy Firefox (sérialisation en base64 dans le content script, reconstruction dans le background) sans dépendre d'une API payante. Validé ainsi le 2026-09-17 : transcription d'un `.webm` de 40 Ko et traduction, sous Firefox.

Ollama ne remplace pas ce serveur : sa route `/v1/audio/transcriptions` existe mais le registre public n'expose aucun modèle de transcription (`whisper`, `faster-whisper`, `voxtral` renvoient tous HTTP 404 le 2026-09-17). Son endpoint `/v1/chat/completions` convient en revanche pour un test de chat réel, à condition d'utiliser un petit modèle.

### Structure des manifests

-   `manifest.json` : Source principale pour Chrome (Service Worker)
-   `manifest.firefox.json` : Adapté pour Firefox (background scripts)
-   Garder les deux synchronisés (version, permissions, etc.)
-   **Déclaration des données Firefox** (`gecko.data_collection_permissions`) : une étiquette affichée à l'installation, pas un droit. Elle ne bloque ni n'autorise aucune requête, mais doit être exacte : pour Mozilla, la transmission couvre « any data collected, used, transferred, shared, or handled outside the add-on or the local browser », donc l'envoi au provider. La fiche AMO, créée le 16/12/2025, n'a pas l'exemption des extensions antérieures au 3/11/2025. Depuis la 1.2.0 : `personallyIdentifyingInfo`, `websiteContent`, `personalCommunications` et `authenticationInfo`, avec `strict_min_version` 140 (support du consentement intégré). Chaque catégorie requise ajoutée déclenche une invite à la mise à jour (« Firefox only shows the added required data permissions ») : revoir la liste dès qu'un nouveau type de donnée sort du navigateur, et tout déclarer d'un coup.
-   **Ne pas ajouter `gecko_android`**, même pour fixer une version minimale : sa présence publie l'extension sur Firefox pour Android. MDN (`manifest.json/browser_specific_settings`) : « To support Firefox for Android without specifying a version range, the `gecko_android` sub-key must be an empty object […] Otherwise, the extension is only made available on desktop Firefox. » L'avertissement `KEY_FIREFOX_ANDROID_UNSUPPORTED_BY_MIN_VERSION` d'addons-linter est donc sans objet (constaté le 2026-09-28).

### Publication

-   **Chrome** : `./scripts/build.sh chrome` → upload sur Chrome Web Store
-   **Firefox** : `./scripts/build.sh firefox` → upload sur Firefox Add-ons (AMO)
-   **README traduits** : `./scripts/translate-readmes.sh` régénère les 14 `README-*.md` depuis `README.md` avec `aipmt` par le CLI Codex (quota de l'abonnement ChatGPT, aucune clé d'API), gpt-6.1-sol en effort xhigh, et ne remplace un fichier qu'après avoir comparé sa structure à la source ; `--verifier` fait ce contrôle sans traduire. À lancer à chaque version, avant le tag. Choix du propriétaire le 2026-09-30, sur le modèle du script de leapmultix.
-   L'ID Firefox (`babelfishai@jls42.org`) dans `browser_specific_settings.gecko.id` doit rester constant

## Git Workflow

**OBLIGATOIRE** : Pour créer un commit, utiliser `Skill` avec le skill de commit. Ne JAMAIS faire de commit manuellement.
