# Politique de Confidentialité de BabelFishAI

**Date d'entrée en vigueur : 30 septembre 2026**

Cette Politique de Confidentialité explique comment BabelFishAI ("l'Extension", "nous", "notre") gère vos informations lorsque vous utilisez notre extension de navigateur (Chrome ou Firefox). BabelFishAI agit comme une interface _transparente_ entre votre navigateur et les services de transcription/traduction des providers IA que vous configurez (Mistral AI, OpenAI, Gemini de Google, ou un service personnalisé). **Nous ne stockons _aucune_ de vos données (enregistrements vocaux, transcriptions, clés API) sur nos serveurs ni sur aucun autre support.** Vos clés API restent dans votre navigateur, qui peut les synchroniser avec votre compte (voir la section 1).

## 1. Informations Traitées par l'Extension

Lorsque vous utilisez BabelFishAI, les informations suivantes _transitent_ par l'extension, _sans être stockées_ :

-   **Votre voix :** Si vous utilisez la fonction d'enregistrement, nous accédons à votre microphone et _transmettons_ votre voix _directement_ au service de transcription du provider configuré (Mistral AI, OpenAI, Gemini, ou votre service personnalisé).
-   **Transcription de votre voix :** Le service de transcription du provider configuré transforme votre enregistrement vocal en texte. Ce texte _transite_ par l'extension, _sans être stocké_.
-   **Traduction, reformulation ou correction (facultatif) :** Si vous activez ces fonctionnalités, le texte (votre transcription, ou le texte que vous sélectionnez sur la page) est _transmis_ au service de chat du provider configuré. Le résultat _transite_ par l'extension, _sans être stocké_.
-   **Vos clés API :** Selon le provider que vous utilisez (Mistral AI, OpenAI, Gemini), vous devez fournir votre clé API. Ces clés sont enregistrées dans le stockage synchronisé de votre navigateur et ne sont _transmises_ qu'au provider correspondant. Si la synchronisation est activée, votre navigateur les recopie sur vos autres navigateurs connectés au même compte : compte Google sous Chrome, compte Mozilla sous Firefox (à condition que la synchronisation des modules complémentaires soit activée).
-   **Vos paramètres :** Vos préférences (providers, modèles, langues, couleurs, etc.) sont enregistrées au même endroit que vos clés API, et synchronisées de la même façon.
-   **Origine de la page (Chrome) :** Sous Chrome, les requêtes vers le provider partent de la page où vous utilisez l'extension. Le provider reçoit donc l'origine de cette page (par exemple `https://chatgpt.com`).
-   **Déclaration sous Firefox :** L'extension déclare à Firefox les données qu'elle transmet au provider : votre voix, le texte que vous sélectionnez sur les pages, vos messages dictés ou reformulés, et votre clé API. Firefox vous les présente à l'installation et lors des mises à jour qui en ajoutent.
-   **Insertion dans le champ de texte actif :** Si vous choisissez d'insérer la transcription/traduction, nous _insérons directement_ le texte dans le champ actif, _sans stockage ni analyse intermédiaire_.
-   **Raccourci prioritaire (Firefox) :** Sur certains sites (par exemple ChatGPT ou Notion), l'éditeur de la page intercepte la combinaison de touches du raccourci de l'extension. Pour l'éviter, la version Firefox ajoute aux pages web un petit script qui examine uniquement les touches pressées pour reconnaître la combinaison du raccourci et empêcher la page de l'intercepter. Ce script ne lit pas le contenu des pages, ne stocke rien et n'envoie aucune donnée. Firefox vous demande l'accès aux sites lors de l'installation ; vous pouvez le retirer à tout moment depuis les options de l'extension, ce qui désactive ce script. Ce mécanisme n'existe pas dans la version Chrome.

## 2. Utilisation des Informations

Les informations qui _transitent_ par BabelFishAI sont utilisées _uniquement_ pour :

-   **Transcrire votre voix :** Via le service de transcription du provider que vous avez configuré (Mistral AI, OpenAI, Gemini, ou service personnalisé).
-   **Traduire, reformuler ou corriger le texte (si vous le souhaitez) :** Via le service de chat du provider que vous avez configuré.
-   **Utiliser les services IA :** Vos clés API permettent d'accéder aux API de Mistral AI, OpenAI, Gemini, ou de votre service personnalisé.
-   **Personnaliser l'extension :** Vos paramètres locaux sont utilisés pour l'affichage et le comportement de l'extension.
-   **Insérer du texte :** Placer la transcription/traduction dans le champ actif, si vous avez activé cette option.

## 3. Partage des Informations

-   **Fournisseurs de services de transcription et de traduction :** BabelFishAI supporte plusieurs providers : Mistral AI, OpenAI, Gemini (Google), et les services personnalisés (via LiteLLM ou autre). Vos données sont transmises _directement_ au provider que vous avez configuré. **Nous ne sommes pas responsables des pratiques de confidentialité de ces fournisseurs tiers. Si vous choisissez d'utiliser une URL d'API personnalisée (provider Custom/LiteLLM), il est de votre responsabilité de vous assurer qu'elle utilise HTTPS et que le fournisseur respecte des standards de confidentialité et de sécurité adéquats. Nous vous recommandons fortement de ne pas utiliser d'API personnalisées dont vous ne pouvez pas vérifier la fiabilité.**
-   **Personne d'autre :** Nous ne vendons pas, ne louons pas, ne partageons pas et ne transmettons pas vos informations à d'autres entreprises ou individus, sauf si la loi l'exige (par exemple, une ordonnance d'un tribunal).

## 4. Protection des Informations

-   Vos clés API (Mistral AI, OpenAI, Gemini) sont stockées dans votre navigateur (stockage synchronisé, voir la section 1) et ne sont transmises qu'au provider correspondant.
-   Les communications avec les services de transcription et de traduction sont sécurisées (HTTPS) si vous utilisez les paramètres par défaut ou une URL personnalisée valide commençant par HTTPS.
-   **Aucune donnée n'est stockée par l'extension.** Les enregistrements audio sont transmis _directement_ au service de transcription. Bien que nous prenions toutes les mesures raisonnables pour supprimer immédiatement les données de la mémoire vive de l'extension, nous ne pouvons pas garantir l'absence totale de traces résiduelles dans la mémoire du navigateur, en raison du fonctionnement interne des navigateurs.

## 5. Vos Choix

-   Vous pouvez désactiver l'accès au microphone dans les paramètres de votre navigateur.
-   Vous pouvez désactiver la traduction dans les paramètres de l'extension.
-   Vous pouvez supprimer vos clés API (Mistral AI, OpenAI, Gemini) des paramètres de l'extension.
-   Vous pouvez choisir le provider IA que vous souhaitez utiliser (Mistral AI, OpenAI, Gemini, ou service personnalisé). Vérifiez _attentivement_ leurs politiques de confidentialité et assurez-vous qu'ils utilisent HTTPS et offrent des garanties de sécurité suffisantes.
-   Sous Firefox, vous pouvez désactiver ou réactiver le raccourci prioritaire dans les options de l'extension, ou retirer l'accès aux sites depuis l'onglet Permissions du gestionnaire de modules complémentaires.
-   Vous pouvez désinstaller l'extension à tout moment.

## 6. Base Juridique du Traitement

Le _transit_ des données via BabelFishAI repose sur les bases juridiques suivantes :

-   **Votre voix, sa transcription et sa traduction (si activée) :** L'exécution du contrat (vous fournir le service via le fournisseur que vous utilisez : Mistral AI, OpenAI, Gemini, ou service personnalisé).
-   **Vos clés API :** Votre consentement.
-   **Vos paramètres :** Notre intérêt légitime (pour le bon fonctionnement de l'extension).

## 7. Vos Droits (RGPD)

Vous disposez de droits concernant vos données personnelles, notamment le droit d'accès, de rectification, d'effacement et d'opposition. Pour exercer ces droits _concernant les données traitées par votre provider IA_, veuillez consulter leur politique de confidentialité :

-   **Mistral AI** : [https://mistral.ai/privacy/](https://mistral.ai/privacy/)
-   **OpenAI** : [https://openai.com/policies/privacy-policy/](https://openai.com/policies/privacy-policy/)
-   **Google (Gemini)** : [https://policies.google.com/privacy](https://policies.google.com/privacy), et les [conditions de l'API Gemini](https://ai.google.dev/gemini-api/terms)

Pour toute question concernant le fonctionnement de BabelFishAI, contactez-nous à contact@jls42.org.

## 8. Traitement des Demandes de Suppression de Données

BabelFishAI ne stocke _aucune_ donnée personnelle. Par conséquent, nous ne pouvons pas traiter directement les demandes de suppression. Les enregistrements vocaux sont traités directement par le provider IA que vous avez configuré. Pour exercer votre droit à l'effacement, consultez la politique de confidentialité de votre provider :

-   **Mistral AI** : [https://mistral.ai/privacy/](https://mistral.ai/privacy/)
-   **OpenAI** : [https://openai.com/policies/privacy-policy/](https://openai.com/policies/privacy-policy/)
-   **Google (Gemini)** : [https://policies.google.com/privacy](https://policies.google.com/privacy), et les [conditions de l'API Gemini](https://ai.google.dev/gemini-api/terms)

## 9. Durée de Conservation

**BabelFishAI ne conserve aucune donnée.** Les enregistrements audio sont transmis directement au service de transcription et ne sont pas conservés par l'extension. Bien que nous prenions toutes les mesures raisonnables pour supprimer immédiatement les données de la mémoire vive de l'extension, nous ne pouvons pas garantir l'absence totale de traces résiduelles dans la mémoire du navigateur, en raison du fonctionnement interne des navigateurs et de votre système d'exploitation. Vos clés API sont stockées dans votre navigateur, et synchronisées avec votre compte si la synchronisation est activée. Elles ne sont conservées que tant que vous utilisez l'extension et ne les supprimez pas manuellement.

## 10. Transferts Internationaux de Données

Vos données (enregistrements vocaux et transcriptions) sont transférées vers les serveurs du provider IA que vous avez configuré :

-   **Mistral AI** : Serveurs en Europe (France). Consultez leur politique de confidentialité : [https://mistral.ai/privacy/](https://mistral.ai/privacy/)
-   **OpenAI** : Serveurs aux États-Unis. Ce transfert est encadré par les Clauses Contractuelles Types approuvées par la Commission européenne. Consultez leur politique de confidentialité : [https://openai.com/policies/privacy-policy/](https://openai.com/policies/privacy-policy/)
-   **Google (Gemini)** : Avec une clé d'un projet Google Cloud dont la facturation est active (offre payante), Google n'utilise pas vos requêtes pour améliorer ses produits, les traite selon son avenant de traitement des données, et les journalise pour une durée limitée afin de détecter les abus ; ces journaux peuvent être stockés temporairement ou mis en cache dans tout pays où Google ou ses agents disposent d'installations. Avec une clé gratuite, Google peut utiliser vos contenus pour améliorer ses produits, avec une relecture humaine possible, sauf si vous vous trouvez dans l'Espace économique européen, en Suisse ou au Royaume-Uni, où les règles de l'offre payante s'appliquent aussi à l'offre gratuite. L'extension demande à Google de ne pas conserver vos dictées (paramètre `store: false` de l'API Interactions). Consultez les [conditions de l'API Gemini](https://ai.google.dev/gemini-api/terms) et la [politique de confidentialité de Google](https://policies.google.com/privacy).
-   **Services personnalisés** : Consultez la politique de confidentialité de votre fournisseur.

**Nous vous encourageons à consulter régulièrement la politique de confidentialité de votre provider** pour vous tenir informé de leurs pratiques en matière de conservation et de protection des données.

## 11. Responsable de Traitement et Contact

Le responsable de traitement pour le fonctionnement de l'extension BabelFishAI est :

Julien LE SAUX
contact@jls42.org

## 12. Autorité de Contrôle

Vous avez le droit de déposer une plainte auprès de la CNIL si vous estimez que le traitement de vos données personnelles n'est pas conforme au RGPD.

## 13. Conseils pour la Gestion de la Mémoire

Bien que BabelFishAI ne conserve aucune donnée, voici quelques conseils généraux pour vider la mémoire de votre navigateur et de votre système :

-   **Redémarrez votre navigateur :** Fermer et rouvrir Chrome ou Firefox efface la mémoire vive utilisée par le navigateur.
-   **Redémarrez votre ordinateur :** Un redémarrage complet efface la mémoire vive de l'ensemble du système.
-   **Utilisez les outils intégrés :** Les navigateurs disposent d'outils pour gérer la mémoire, mais leur utilisation est _très_ technique. En général, le redémarrage est plus simple et suffisant.
-   **Gardez votre navigateur à jour :** Évitez d'utiliser des versions de Chrome ou Firefox qui ne sont plus maintenues et qui pourraient contenir des failles de sécurité.
-   **Utilisez un système d'exploitation récent.**

**Note :** Ces actions n'ont _pas_ d'impact sur les données traitées par votre provider IA (Mistral AI, OpenAI, Gemini, ou service personnalisé). Elles concernent uniquement la mémoire _locale_ de votre ordinateur.

## 14. Modifications de cette Politique

Nous pouvons mettre à jour cette Politique de Confidentialité. Si nous apportons des modifications importantes, nous vous en informerons via les options de l'extension ou sur la page de l'extension dans le Chrome Web Store ou Firefox Add-ons.
