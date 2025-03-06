# Babel Fish AI - Extension de Transcription Vocale et Traduction avec IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Pour utiliser l'extension, vous aurez besoin d'une clé API OpenAI (ou d'un fournisseur tiers si vous utilisez LiteLLM Proxy). Vous pouvez générer une clé API OpenAI ici : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI est une extension Chrome innovante conçue à l'origine pour offrir une transcription vocale puissante. Transformez votre voix en texte avec une précision remarquable grâce à l’API Whisper d’OpenAI, et bénéficiez en option d’une traduction automatique en temps réel. Vous pouvez utiliser Babel Fish AI exclusivement pour la transcription ou activer la traduction à la volée selon vos besoins.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Fonctionnalités

- **Transcription Vocale Avancée**
  - Capture audio de haute qualité via le microphone de votre appareil.
  - Transcription précise réalisée par l’API Whisper d’OpenAI.
  - Prise en charge multilingue pour la reconnaissance vocale et l'affichage du texte, permettant de transcrire des entrées vocales dans différentes langues et d'afficher les résultats (transcription et traduction, si activée) dans la langue de votre choix.
  - Insertion automatique du texte dans le champ actif ou affichage dans une boîte de dialogue dédiée.

- **Traduction Automatique Intégrée (Optionnelle)**
  - Traduction immédiate des transcriptions en diverses langues, à activer si besoin.
  - Utilisation d’un modèle d’IA avancé pour garantir une traduction fidèle au sens original.
  - Choix libre d’utiliser exclusivement la transcription ou de combiner transcription et traduction.

- **Interface Utilisateur Intuitive et Personnalisable**
  - Mode d’affichage flexible : zone de saisie active ou fenêtre de dialogue flottante.
  - Bandeau de statut configurable avec choix des couleurs, de l’opacité et de la durée d’affichage.
  - Raccourci clavier (Ctrl+Shift+1 ou ⌘+Shift+1 sur Mac) pour démarrer/arrêter l’enregistrement.
  - Icône personnalisée, intégrant un microphone et le chiffre “42”, pour une reconnaissance immédiate.

- **Options Avancées**
    - Mode expert pour des configurations détaillées (URLs des API, configuration par domaine, etc.).
    - Possibilité de personnaliser les modèles de transcription et de traduction.
    - Compatibilité avec LiteLLM Proxy pour vous connecter à des modèles de langage alternatifs et désactiver la journalisation des requêtes.
    - Gestion complète de l’internationalisation grâce aux fichiers de langue (_locales), offrant une interface et une prise en charge vocale en plusieurs langues.

## 🌐 Langues Supportées

Voici la liste des langues supportées par Babel Fish AI, avec des liens vers des vidéos de démonstration :

- [Arabe](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [Allemand](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [Anglais](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [Espagnol](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [Français](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [Italien](https://www.youtube.com/watch?v=QgYZt8myods)
- [Japonais](https://www.youtube.com/watch?v=noHEJCnocH8)
- [Coréen](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [Néerlandais](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Polonais](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Portugais](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Roumain](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Suédois](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Chinois](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installation

1.  **Téléchargement et Installation :**
    - Clonez ce dépôt depuis GitHub ou téléchargez manuellement le dossier de l’extension.
    - **Ou installez directement l'extension depuis le [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Ouvrez Chrome et accédez à `chrome://extensions/`.
    - Activez le « Mode développeur » en haut à droite.
    - Cliquez sur « Charger l’extension non empaquetée » et sélectionnez le dossier de Babel Fish AI.

2.  **Vérification :**
    - Assurez-vous que l’extension apparaît dans la barre d’outils de Chrome avec l’icône personnalisée.

## ⚙️ Configuration

1.  **Clé API OpenAI :**
    *   Cliquez sur l’icône de l’extension pour accéder aux options.
    *   Entrez votre clé API OpenAI (disponible sur [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personnalisation des Options :**
    *   Choisissez le mode d’affichage (zone active ou boîte de dialogue).
    *   Configurez la couleur, l’opacité et la durée d’affichage du bandeau de statut.
    *   Sélectionnez les langues pour la transcription (entrée vocale) et pour l’affichage du texte.
    *   Activez ou désactivez la fonctionnalité de traduction selon vos besoins.

3.  **(Optionnel) Utilisation avec LiteLLM Proxy :**
    *   Activez le "Mode Expert" dans les options.
    *   Dans la section "Configuration Avancée", modifiez **les deux URLs** des API (Whisper et Traduction) pour pointer vers votre instance LiteLLM Proxy. **Utilisez la même URL de base pour les deux.**
    *   Cochez l'option "NoLog (LiteLLM uniquement)" si vous souhaitez désactiver la journalisation des requêtes par LiteLLM.

## 🚀 Utilisation avec LiteLLM Proxy

Si vous souhaitez utiliser des modèles de langage autres qu'OpenAI, vous pouvez utiliser LiteLLM Proxy. Voici comment le configurer :

Babel Fish AI est compatible avec [LiteLLM Proxy](https://litellm.ai/), qui permet d'utiliser des modèles de langage alternatifs avec une API compatible avec celle d'OpenAI.

### Configuration

1.  **Installez et configurez LiteLLM Proxy :** Suivez les instructions sur le site de LiteLLM.
2.  **Configurez l'extension Babel Fish AI :**
    *   Dans les options de l'extension (clic droit sur l'icône > Options), activez le "Mode Expert".
    *   Dans la section "Configuration Avancée", modifiez **les deux URLs** des API (Whisper et Traduction) pour pointer vers votre instance LiteLLM Proxy (par exemple, `http://localhost:4000/v1/audio/transcriptions` et `http://localhost:4000/v1/chat/completions`). **Utilisez la même URL de base pour les deux.**
    *   Cochez l'option "NoLog (LiteLLM uniquement)" si vous souhaitez désactiver la journalisation des requêtes par LiteLLM.

**Important :** L'option "NoLog" est conçue **exclusivement** pour être utilisée avec LiteLLM Proxy. **Ne l'activez pas** si vous utilisez l'API OpenAI officielle, car cela entraînera une erreur et empêchera la traduction de fonctionner.

## 🛠️ Fonctionnement Technique

### Architecture de l'Extension

L'extension est composée de plusieurs fichiers JavaScript qui interagissent entre eux :

*   **`manifest.json`:** Le fichier de configuration principal de l'extension. Il définit les permissions, les scripts, les ressources accessibles, etc. Il utilise la version 3 du manifeste et déclare les permissions `activeTab`, `storage`, `commands` et `scripting`. Les `content_scripts` sont injectés dans toutes les URLs et s'exécutent à la fin du chargement du document.
*   **`background.js`:** Le service worker qui s'exécute en arrière-plan. Il gère les événements (clic sur l'icône, raccourcis clavier), injecte le `content script` si nécessaire, et communique avec le `content script`.
*   **`content.js`:** Le script qui est injecté dans les pages web. Il interagit directement avec le DOM, capture l'audio du microphone, appelle les API de transcription et de traduction, et affiche les résultats.
*   **`src/utils/api.js`:** Contient la fonction `transcribeAudio` pour appeler l'API Whisper d'OpenAI (transcription).
*   **`src/utils/translation.js`:** Contient la fonction `translateText` pour appeler l'API GPT d'OpenAI (traduction).
*   **`src/utils/ui.js`:** Contient des fonctions utilitaires pour gérer l'interface utilisateur (bannière, boîte de dialogue, bouton de copie).
*   **`src/constants.js`:** Définit des constantes pour la configuration, les états, les actions, etc.
*   **`src/pages/options/`:** Contient les fichiers pour la page d'options de l'extension (HTML, CSS, JavaScript).

### Processus de Transcription et Traduction

1.  **Démarrage de l'Enregistrement :** L'utilisateur démarre l'enregistrement en cliquant sur l'icône de l'extension ou en utilisant le raccourci clavier. Le `background script` envoie un message au `content script` pour démarrer l'enregistrement.
2.  **Capture Audio :** Le `content script` utilise l'API `navigator.mediaDevices.getUserMedia` pour accéder au microphone et enregistrer l'audio.
3.  **Transcription :** Le `content script` utilise la fonction `transcribeAudio` (`src/utils/api.js`) pour envoyer l'audio à l'API Whisper d'OpenAI. L'API renvoie le texte transcrit.
4.  **Traduction (Optionnelle) :** Si l'option de traduction est activée, le `content script` utilise la fonction `translateText` (`src/utils/translation.js`) pour envoyer le texte transcrit à l'API GPT d'OpenAI. L'API renvoie le texte traduit.
5.  **Affichage :** Le `content script` affiche le texte transcrit (et éventuellement traduit) soit dans l'élément actif de la page (si c'est un champ de texte ou un élément éditable), soit dans une boîte de dialogue.

### Communication

La communication entre le `background script` et le `content script` se fait via l'API de messagerie de Chrome (`chrome.runtime.sendMessage` et `chrome.runtime.onMessage`).

### Stockage des Données

L'extension utilise `chrome.storage.sync` pour stocker :

*   La clé API OpenAI (`apiKey`).
*   Les options de l'extension (affichage, traduction, couleurs du bandeau, etc.).

Ces données sont stockées localement sur votre ordinateur, dans le stockage de l'extension Chrome.

### Gestion des Erreurs
Les erreurs possibles (clé API manquante, erreur de transcription, etc.) sont définies dans le fichier `constants.js`. Les fonctions `api.js` et `translation.js` gèrent les erreurs potentielles des appels API. Le `content.js` affiche les messages d'erreur à l'utilisateur via une bannière en haut de la page.

## 🛡️ Sécurité et Confidentialité

- **Protection des Données :**
  - La clé API est stockée de manière sécurisée dans Chrome.
  - L’extension ne conserve pas vos données audio ; tous les traitements s’effectuent en temps réel.
  - La communication avec les API se fait via des connexions HTTPS sécurisées.

Pour des informations complètes sur la manière dont BabelFishAI gère vos données, veuillez consulter notre [Politique de Confidentialité](PRIVACY.md).

## 🔧 Dépannage

- **Problèmes de Microphone :**
  - Vérifiez les permissions d’accès au microphone dans Chrome.
  - Assurez-vous qu’aucune autre application n’utilise le microphone simultanément.

- **Erreurs de Transcription/Traduction :**
  - Vérifiez que la clé API est valide et active.
  - Assurez-vous d’avoir une connexion internet stable.
  - Consultez la console de Chrome pour obtenir des logs détaillés en cas d’erreur.

## 🤝 Contribution

Les contributions et suggestions sont les bienvenues. Pour contribuer :
- Signalez les bugs via la section Issues sur GitHub.
- Proposez des améliorations ou de nouvelles fonctionnalités.
- Soumettez vos pull requests.

## 📄 Licence

Cette extension est distribuée sous licence GNU Affero General Public License v3.0 (AGPL-3.0). Consultez le fichier LICENSE pour plus de détails.

## 💝 Soutien

Si vous appréciez cette extension, vous pouvez soutenir son développement en faisant un don via [PayPal](https://paypal.me/jls).
---
Développé par jls42.org avec passion et innovation, Babel Fish AI propulse la transcription et la traduction vers de nouveaux horizons grâce à l’intelligence artificielle de pointe.
