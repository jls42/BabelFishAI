# Provider Gemini (Google)

Fiche datée et sourcée : chaque fait vient de la documentation officielle relue le 29/09/2026 ou d'une mesure avec une vraie clé le même jour. Les identifiants de modèles et les limites évoluent : revérifier sur les pages citées avant toute modification du registre (`src/utils/providers.js`).

## Services et API

| Service | API                      | URL                                                                        | Authentification                              | Format (registre)     |
| ------- | ------------------------ | -------------------------------------------------------------------------- | --------------------------------------------- | --------------------- |
| Dictée  | Interactions API         | `https://generativelanguage.googleapis.com/v1beta/interactions`            | entête `x-goog-api-key` (redirection refusée) | `gemini-interactions` |
| Texte   | Couche compatible OpenAI | `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions` | `Authorization: Bearer`                       | `openai-chat`         |

-   **Pourquoi l'Interactions API** : c'est l'API recommandée (« As of June 2026, it is Generally Available and recommended for all new projects », [présentation](https://ai.google.dev/gemini-api/docs/interactions-overview)). Mesuré le 29/09 : elle accepte l'audio dans la requête (en base64) et respecte `store: false`. `generateContent` a renvoyé un texte vide sans configuration de transcription.
-   **`store: false`** dans chaque dictée : sans lui, l'API conserve les interactions 1 jour (offre gratuite) ou 55 jours (offre payante) (« Data storage and retention », même page). Mesuré : la réponse ne porte alors aucun identifiant, rien ne peut être relu.
-   **Version** : `v1beta`. `v1beta2` (cité par le guide de migration) échoue depuis une page, faute d'entêtes CORS (mesuré le 29/09 avec une fausse clé, puis avec la vraie).
-   **Réponse de la dictée** : ressource `Interaction` ; le texte est dans les blocs `{type: "text"}` des étapes `model_output`. Seul le statut `completed` est inséré ; `incomplete` (« e.g. hitting max_tokens »), `failed` et les autres donnent une erreur ([référence](https://ai.google.dev/api/interactions-api)).
-   **Type MIME** : `audio/webm` (le blob de l'extension porte `audio/webm;codecs=opus`, les deux sont acceptés, mesuré). Formats listés par le [guide de transcription](https://ai.google.dev/gemini-api/docs/transcribe) (« Supported audio formats »).
-   **Mode de dictée** : `verbatim`, le défaut (aucune configuration envoyée) : il garde les hésitations. Le mode `smart` les retire, mais peut aussi supprimer du contenu (mesuré : « Non, je rigole » supprimé, pris pour une autocorrection) ; non retenu pour l'instant.

## Modèles (registre)

| Service        | Modèle                  | Remarques                                                                                                                                         |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dictée         | `gemini-3.5-transcribe` | seul modèle de transcription hors temps réel ; aucune date d'arrêt annoncée ([dépréciations](https://ai.google.dev/gemini-api/docs/deprecations)) |
| Texte (défaut) | `gemini-3.8-flash`      | Flash le plus récent (02/09/2026), `reasoning_effort: "low"`                                                                                      |
| Texte          | `gemini-3.5-flash-lite` | Flash-Lite le plus récent (21/07/2026), le plus rapide                                                                                            |

-   **Pas de 3.8 Flash-Lite pour le texte** : `gemini-3.8-flash-lite-tts` est un modèle de synthèse vocale ([modèles](https://ai.google.dev/gemini-api/docs/models)).
-   **`temperature` jamais envoyée** : « Strip `temperature`, `top_p`, and `top_k` from generation configs » ([Gemini 3.8 Flash](https://ai.google.dev/gemini-api/docs/latest-model)). Mesuré : la couche compatible l'accepte encore, mais elle est dépréciée.
-   **Réflexion** : 3.8 Flash réfléchit au niveau `medium` par défaut ; `minimal` n'existe pas pour lui, et « Reasoning cannot be turned off for Gemini 2.5 Pro or 3 models » ([compatibilité OpenAI](https://ai.google.dev/gemini-api/docs/openai)). Banc des trois actions texte de l'extension (consignes inchangées), 29/09 : `medium` 4 à 9 s ; `low` 1,1 à 2,1 s ; 3.5 Flash-Lite 0,6 à 0,8 s. En `low`, la traduction est parfois trop littérale.
-   **Alias** (`gemini-flash-latest`…) : changent de modèle sans nouvelle version ; jamais en défaut.

## Limites mesurées

-   **Durée** : « Standard unary requests support audio files up to 1 hour » (guide de transcription). Mesuré : 14 min 17 s (corps de 19,9 Mo) transcrites en 12,5 s ; 2 min en 2,3 s.
-   **Taille** : la doc annonce « Maximum request size is 20 MB total » ([compréhension audio](https://ai.google.dev/gemini-api/docs/audio)), mais l'API a accepté un corps de 29,4 Mo (mesuré le 29/09). L'extension n'impose donc aucune limite avant l'envoi ; un refus de l'API s'affiche comme toute erreur HTTP.

## Erreurs

-   **Clé invalide : HTTP 400, pas 401.** Corps mesurés : objet `{"error": {…, "details": [{"reason": "API_KEY_INVALID", …}]}}` pour l'API native, le même objet dans un tableau pour l'Interactions API, et `[{"error": {"code": 400, "message": "Please pass a valid API key", …}}]` pour la couche compatible. Le format d'erreurs `gemini` (`provider-adapters.js`) lit ces trois formes et affiche le message d'une clé refusée.
-   **Clés** : depuis le 28/05/2026, les nouvelles clés d'AI Studio sont des clés « auth », restreintes à l'API Gemini ; « The Gemini API rejects requests from unrestricted standard keys » ([clés API](https://ai.google.dev/gemini-api/docs/api-key)). Une restriction par site web casserait l'extension : sous Chrome, la requête part au nom de la page visitée.

## Conditions et données

Source : [Gemini API Additional Terms of Service](https://ai.google.dev/gemini-api/terms), en vigueur depuis le 23/03/2026.

-   **Offre payante** : l'accès à l'API n'est un « Paid Service » que « through a Cloud Project associated with an active billing account ». Google n'utilise pas les requêtes pour améliorer ses produits, les traite selon son avenant de sous-traitance, et les journalise « for a limited period of time » pour détecter les abus.
-   **Offre gratuite** : Google utilise les contenus pour améliorer ses produits, avec relecture humaine possible : « Do not submit sensitive, confidential, or personal information to the Unpaid Services. »
-   **Europe** : « If you're in the European Economic Area, Switzerland, or the United Kingdom, the terms under "How Google uses Your Data" in "Paid Services" apply to all Services, including Google AI Studio and unpaid quota ». D'où la note du panneau (`geminiKeyNote`, 15 langues) : une clé d'un projet avec facturation ; avec une clé gratuite, hors de l'EEE, de la Suisse et du Royaume-Uni, dictées et textes envoyés peuvent servir à Google, avec relecture humaine possible, donc aucune information personnelle, sensible ou confidentielle ; une clé restreinte à l'API Gemini, jamais à des sites web.
-   **Clauses tranchées par le propriétaire le 29/09/2026** (Gemini jugé publiable) : 18 ans minimum et API Clients non destinés aux mineurs ; « for professional or business purposes, not for consumer use » ; offre payante exigée pour les API Clients mis à disposition d'utilisateurs européens.
-   **Logo** (décision du propriétaire, 30/09) : l'icône de Gemini, `images/gemini-logo.png` (128 × 128 px), rendue par Chrome à partir de [« Google Gemini icon 2025.svg »](https://commons.wikimedia.org/wiki/File:Google_Gemini_icon_2025.svg) (Wikimedia Commons, extraite de la page « About Gemini » de Google ; SHA-1 du SVG `7f53d7f3a03c52b423a0e727516c50a92660cdf2`). Commons la classe dans le domaine public pour le droit d'auteur (`{{pd-textlogo}}`, sous le seuil d'originalité américain) mais comme marque déposée (`{{Trademarked}}`). Le logotype horizontal (« Google Gemini logo 2025.svg », 288 × 65) ne convient pas à l'emplacement carré de 32 px des options.
-   **Conditions d'usage de la marque** : les conditions de l'API Gemini (en anglais comme en français, relues le 30/09) ne parlent pas des logos et renvoient aux Google APIs Terms (« Last modified: November 9, 2021 », version anglaise seulement). Leur section 6b accorde une licence « to display Google's Brand Features for the purpose of promoting or advertising that you use the APIs », à condition de suivre les « Google Brand Features Use Guidelines » ; ces règles n'ont pas pu être lues (lien vers un portail réservé aux partenaires, relevé du 29/09). La section 6c interdit toute déclaration qui suggère « partnership with, sponsorship by, or endorsement by Google » sans accord écrit. L'icône signale seulement que ce choix de provider utilise l'API Gemini.

## Réseau et permissions

-   Aucune permission ajoutée : le CORS de Gemini répond aux pages, aux origines `chrome-extension://` et `moz-extension://` (préflights mesurés le 28/09). Sous Firefox, les requêtes passent par le proxy du background, qui reconstruit l'entête `x-goog-api-key` depuis le stockage.
-   Stockage : `extraProvider.gemini` (`enabled`, `apiKey`, modèles personnels et choisis), jamais dans `providers` ni dans `apiKey`. Les versions publiées l'ignorent ; les tests entre versions (`tests/versions.test.mjs`) décrivent ce que chacune fait de ce stockage.
