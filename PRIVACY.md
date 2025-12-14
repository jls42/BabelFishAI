# Politique de Confidentialité de BabelFishAI

**Date d'entrée en vigueur : 13 décembre 2025**

Cette Politique de Confidentialité explique comment BabelFishAI ("l'Extension", "nous", "notre") gère vos informations lorsque vous utilisez notre extension Chrome. BabelFishAI agit comme une interface *transparente* entre votre navigateur Chrome et les services de transcription/traduction des providers IA que vous configurez (Mistral AI, OpenAI, ou un service personnalisé). **Nous ne stockons *aucune* de vos données (enregistrements vocaux, transcriptions, clés API) sur nos serveurs ni sur aucun autre support.** Vos clés API sont stockées *localement* sur votre ordinateur.

## 1. Informations Traitées par l'Extension

Lorsque vous utilisez BabelFishAI, les informations suivantes *transitent* par l'extension, *sans être stockées* :

*   **Votre voix :** Si vous utilisez la fonction d'enregistrement, nous accédons à votre microphone et *transmettons* votre voix *directement* au service de transcription du provider configuré (Mistral AI, OpenAI, ou votre service personnalisé).
*   **Transcription de votre voix :** Le service de transcription (Voxtral pour Mistral AI, Whisper pour OpenAI) transforme votre enregistrement vocal en texte. Ce texte *transite* par l'extension, *sans être stocké*.
*   **Traduction, reformulation ou correction (facultatif) :** Si vous activez ces fonctionnalités, le texte est *transmis* au service de chat du provider configuré. Le résultat *transite* par l'extension, *sans être stocké*.
*   **Vos clés API :** Selon le provider que vous utilisez (Mistral AI, OpenAI), vous devez fournir votre clé API. Ces clés sont stockées localement sur votre ordinateur et ne sont *transmises* qu'au provider correspondant.
*   **Vos paramètres :** Vos préférences (providers, modèles, langues, couleurs, etc.) sont stockées localement sur votre ordinateur.
*   **Insertion dans le champ de texte actif :** Si vous choisissez d'insérer la transcription/traduction, nous *insérons directement* le texte dans le champ actif, *sans stockage ni analyse intermédiaire*.

## 2. Utilisation des Informations

Les informations qui *transitent* par BabelFishAI sont utilisées *uniquement* pour :

*   **Transcrire votre voix :** Via le service de transcription du provider que vous avez configuré (Mistral AI, OpenAI, ou service personnalisé).
*   **Traduire, reformuler ou corriger le texte (si vous le souhaitez) :** Via le service de chat du provider que vous avez configuré.
*   **Utiliser les services IA :** Vos clés API permettent d'accéder aux API de Mistral AI, OpenAI, ou de votre service personnalisé.
*   **Personnaliser l'extension :** Vos paramètres locaux sont utilisés pour l'affichage et le comportement de l'extension.
*   **Insérer du texte :** Placer la transcription/traduction dans le champ actif, si vous avez activé cette option.

## 3. Partage des Informations

*   **Fournisseurs de services de transcription et de traduction :** BabelFishAI supporte plusieurs providers : Mistral AI, OpenAI, et les services personnalisés (via LiteLLM ou autre). Vos données sont transmises *directement* au provider que vous avez configuré. **Nous ne sommes pas responsables des pratiques de confidentialité de ces fournisseurs tiers. Si vous choisissez d'utiliser une URL d'API personnalisée (provider Custom/LiteLLM), il est de votre responsabilité de vous assurer qu'elle utilise HTTPS et que le fournisseur respecte des standards de confidentialité et de sécurité adéquats. Nous vous recommandons fortement de ne pas utiliser d'API personnalisées dont vous ne pouvez pas vérifier la fiabilité.**
*   **Personne d'autre :** Nous ne vendons pas, ne louons pas, ne partageons pas et ne transmettons pas vos informations à d'autres entreprises ou individus, sauf si la loi l'exige (par exemple, une ordonnance d'un tribunal).

## 4. Protection des Informations

*   Vos clés API (Mistral AI, OpenAI) sont stockées localement sur votre ordinateur et ne sont transmises qu'au provider correspondant.
*   Les communications avec les services de transcription et de traduction sont sécurisées (HTTPS) si vous utilisez les paramètres par défaut ou une URL personnalisée valide commençant par HTTPS.
*   **Aucune donnée n'est stockée par l'extension.** Les enregistrements audio sont transmis *directement* au service de transcription. Bien que nous prenions toutes les mesures raisonnables pour supprimer immédiatement les données de la mémoire vive de l'extension, nous ne pouvons pas garantir l'absence totale de traces résiduelles dans la mémoire du navigateur Chrome, en raison du fonctionnement interne de Chrome.

## 5. Vos Choix

*   Vous pouvez désactiver l'accès au microphone dans les paramètres de votre navigateur Chrome.
*   Vous pouvez désactiver la traduction dans les paramètres de l'extension.
*   Vous pouvez supprimer vos clés API (Mistral AI, OpenAI) des paramètres de l'extension.
*   Vous pouvez choisir le provider IA que vous souhaitez utiliser (Mistral AI, OpenAI, ou service personnalisé). Vérifiez *attentivement* leurs politiques de confidentialité et assurez-vous qu'ils utilisent HTTPS et offrent des garanties de sécurité suffisantes.
*   Vous pouvez désinstaller l'extension à tout moment.

## 6. Base Juridique du Traitement

Le *transit* des données via BabelFishAI repose sur les bases juridiques suivantes :

*   **Votre voix, sa transcription et sa traduction (si activée) :** L'exécution du contrat (vous fournir le service via le fournisseur que vous utilisez : Mistral AI, OpenAI, ou service personnalisé).
*   **Vos clés API :** Votre consentement.
*   **Vos paramètres :** Notre intérêt légitime (pour le bon fonctionnement de l'extension).

## 7. Vos Droits (RGPD)

Vous disposez de droits concernant vos données personnelles, notamment le droit d'accès, de rectification, d'effacement et d'opposition. Pour exercer ces droits *concernant les données traitées par votre provider IA*, veuillez consulter leur politique de confidentialité :
- **Mistral AI** : [https://mistral.ai/privacy/](https://mistral.ai/privacy/)
- **OpenAI** : [https://openai.com/policies/privacy-policy/](https://openai.com/policies/privacy-policy/)

Pour toute question concernant le fonctionnement de BabelFishAI, contactez-nous à contact@jls42.org.

## 8. Traitement des Demandes de Suppression de Données

BabelFishAI ne stocke *aucune* donnée personnelle. Par conséquent, nous ne pouvons pas traiter directement les demandes de suppression. Les enregistrements vocaux sont traités directement par le provider IA que vous avez configuré. Pour exercer votre droit à l'effacement, consultez la politique de confidentialité de votre provider :
- **Mistral AI** : [https://mistral.ai/privacy/](https://mistral.ai/privacy/)
- **OpenAI** : [https://openai.com/policies/privacy-policy/](https://openai.com/policies/privacy-policy/)

## 9. Durée de Conservation

**BabelFishAI ne conserve aucune donnée.** Les enregistrements audio sont transmis directement au service de transcription et ne sont pas conservés par l'extension. Bien que nous prenions toutes les mesures raisonnables pour supprimer immédiatement les données de la mémoire vive de l'extension, nous ne pouvons pas garantir l'absence totale de traces résiduelles dans la mémoire du navigateur Chrome, en raison du fonctionnement interne de Chrome et de votre système d'exploitation. Vos clés API sont stockées localement sur votre ordinateur et ne sont conservées que tant que vous utilisez l'extension et ne les supprimez pas manuellement.

## 10. Transferts Internationaux de Données

Vos données (enregistrements vocaux et transcriptions) sont transférées vers les serveurs du provider IA que vous avez configuré :
- **Mistral AI** : Serveurs en Europe (France). Consultez leur politique de confidentialité : [https://mistral.ai/privacy/](https://mistral.ai/privacy/)
- **OpenAI** : Serveurs aux États-Unis. Ce transfert est encadré par les Clauses Contractuelles Types approuvées par la Commission européenne. Consultez leur politique de confidentialité : [https://openai.com/policies/privacy-policy/](https://openai.com/policies/privacy-policy/)
- **Services personnalisés** : Consultez la politique de confidentialité de votre fournisseur.

**Nous vous encourageons à consulter régulièrement la politique de confidentialité de votre provider** pour vous tenir informé de leurs pratiques en matière de conservation et de protection des données.

## 11. Responsable de Traitement et Contact

Le responsable de traitement pour le fonctionnement de l'extension BabelFishAI est :

Julien LE SAUX
contact@jls42.org

## 12. Autorité de Contrôle

Vous avez le droit de déposer une plainte auprès de la CNIL si vous estimez que le traitement de vos données personnelles n'est pas conforme au RGPD.

## 13. Conseils pour la Gestion de la Mémoire

Bien que BabelFishAI ne conserve aucune donnée, voici quelques conseils généraux pour vider la mémoire de votre navigateur et de votre système :

*   **Redémarrez Chrome:** Fermer et rouvrir Chrome efface la mémoire vive utilisée par le navigateur.
*   **Redémarrez votre ordinateur:** Un redémarrage complet efface la mémoire vive de l'ensemble du système.
*   **Utilisez les outils de Chrome:** Chrome dispose d'outils intégrés pour gérer la mémoire (chrome://memory-internals/ , mais leur utilisation est *très* technique).  En général, le redémarrage est plus simple et suffisant.
* **Evitez d'utiliser des versions de Chrome qui ne sont plus maintenues et qui pourraient contenir des failles de sécurité**
* **Utilisez un système d'exploitation récent**

**Note :** Ces actions n'ont *pas* d'impact sur les données traitées par votre provider IA (Mistral AI, OpenAI, ou service personnalisé). Elles concernent uniquement la mémoire *locale* de votre ordinateur.

## 14. Modifications de cette Politique

Nous pouvons mettre à jour cette Politique de Confidentialité. Si nous apportons des modifications importantes, nous vous en informerons via les options de l'extension ou sur la page de l'extension dans le Chrome Web Store.