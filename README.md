# Babel Fish AI - Extension de Transcription Vocale et Traduction avec IA

Babel Fish AI est une extension Chrome innovante conçue à l'origine pour offrir une transcription vocale puissante. Transformez votre voix en texte avec une précision remarquable grâce à l’API Whisper d’OpenAI, et bénéficiez en option d’une traduction automatique en temps réel. Vous pouvez utiliser Babel Fish AI exclusivement pour la transcription ou activer la traduction à la volée selon vos besoins.

## 🌟 Fonctionnalités

- **Transcription Vocale Avancée**
  - Capture audio de haute qualité via le microphone de votre appareil.
  - Transcription précise réalisée par l’API Whisper d’OpenAI.
  - Prise en charge multi-langue pour le traitement de la voix et l'affichage du texte, permettant de transcrire des entrées vocales dans différentes langues et d’afficher les résultats dans la langue de votre choix.
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
  - Gestion complète de l’internationalisation grâce aux fichiers de langue (_locales), offrant une interface et une prise en charge vocale en plusieurs langues.

## 🌐 Langues Supportées

- Arabe
- Allemand
- Anglais
- Espagnol
- Français
- Hindi
- Italien
- Japonais
- Coréen
- Néerlandais
- Polonais
- Portugais
- Roumain
- Suédois
- Chinois

## 🚀 Installation

1. **Téléchargement et Installation :**
   - Clonez ce dépôt depuis GitHub ou téléchargez manuellement le dossier de l’extension.
   - Ouvrez Chrome et accédez à `chrome://extensions/`.
   - Activez le « Mode développeur » en haut à droite.
   - Cliquez sur « Charger l’extension non empaquetée » et sélectionnez le dossier de Babel Fish AI.

2. **Vérification :**
   - Assurez-vous que l’extension apparaît dans la barre d’outils de Chrome avec l’icône personnalisée.

## ⚙️ Configuration

1. **Clé API OpenAI :**
   - Cliquez sur l’icône de l’extension pour accéder aux options.
   - Entrez votre clé API OpenAI (disponible sur [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Personnalisation des Options :**
   - Choisissez le mode d’affichage (zone active ou boîte de dialogue).
   - Configurez la couleur, l’opacité et la durée d’affichage du bandeau de statut.
   - Sélectionnez les langues pour la transcription (entrée vocale) et pour l’affichage du texte.
   - Activez ou désactivez la fonctionnalité de traduction selon vos besoins.

## 🛠️ Fonctionnement Technique

- **Architecture de l’Extension :**
  - **Manifest V3 :** Le fichier `manifest.json` définit les scripts de contenu, le service worker (`background.js`) et les permissions nécessaires.
  - **Scripts de Fond et de Contenu :** Le fichier `background.js` gère la logique en arrière-plan et la communication avec les API, tandis que `content.js` s’occupe de l’interaction avec la page web active.
  - **Utilitaires et Internationalisation :** Le dossier `src/utils` contient des modules pour gérer l’API, l’interface utilisateur, la traduction et l’internationalisation via des fichiers de langue dans le dossier `_locales`.

- **Processus de Transcription et Traduction :**
  1. **Démarrage de l’Enregistrement :** L’extension capte votre voix via le microphone lorsque vous cliquez sur l’icône ou utilisez le raccourci clavier.
  2. **Transcription :** L’audio est envoyé à l’API Whisper d’OpenAI pour être converti en texte, avec prise en charge de plusieurs langues d’entrée.
  3. **Traduction (Optionnelle) :** Si activée, la transcription est automatiquement traduite dans la langue cible sélectionnée, tout en conservant le sens et le contexte.
  4. **Affichage :** Le texte transcrit (et éventuellement traduit) est inséré dans le champ actif ou affiché dans une fenêtre de dialogue personnalisée.

## 🛡️ Sécurité et Confidentialité

- **Protection des Données :**
  - La clé API est stockée de manière sécurisée dans Chrome.
  - L’extension ne conserve pas vos données audio ; tous les traitements s’effectuent en temps réel.
  - La communication avec les API se fait via des connexions HTTPS sécurisées.

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
