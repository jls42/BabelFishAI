# Politique de Confidentialité de BabelFishAI

**Date d'entrée en vigueur : 3 février 2025**

Cette Politique de Confidentialité explique comment BabelFishAI ("l'Extension", "nous", "notre") gère vos informations lorsque vous utilisez notre extension Chrome. BabelFishAI agit comme une interface *transparente* entre votre navigateur Chrome et les services de transcription/traduction (par défaut, OpenAI). **Nous ne stockons *aucune* de vos données (enregistrements vocaux, transcriptions, clé API) sur nos serveurs ni sur aucun autre support.** Votre clé API est stockée *localement* sur votre ordinateur.

## 1. Informations Traitées par l'Extension

Lorsque vous utilisez BabelFishAI, les informations suivantes *transitent* par l'extension, *sans être stockées* :

*   **Votre voix :** Si vous utilisez la fonction d'enregistrement, nous accédons à votre microphone et *transmettons* votre voix *directement* au service de transcription (par défaut, OpenAI).
*   **Transcription de votre voix :** Le service de transcription (par défaut, l'API Whisper d'OpenAI) transforme votre enregistrement vocal en texte. Ce texte *transite* par l'extension, *sans être stocké*.
*   **Traduction de la transcription (facultatif) :** Si vous activez la traduction, le texte transcrit est *transmis* au service de traduction (par défaut, l'API GPT d'OpenAI). La traduction *transite* également par l'extension, *sans être stockée*.
*   **Votre clé API OpenAI :** Si vous utilisez les services d'OpenAI, vous devez fournir votre clé API. Cette clé est stockée localement sur votre ordinateur et n'est *transmise* qu'à OpenAI.
*   **Vos paramètres :** Vos préférences (langues, couleurs, etc.) sont stockées localement sur votre ordinateur.
*   **Insertion dans le champ de texte actif:** Si vous choisissez d'insérer la transcription/traduction, nous *insérons directement* le texte dans le champ actif, *sans stockage ni analyse intermédiaire*.

## 2. Utilisation des Informations

Les informations qui *transitent* par BabelFishAI sont utilisées *uniquement* pour :

*   **Transcrire votre voix :** Via le service de transcription que vous utilisez (par défaut, OpenAI).
*   **Traduire le texte (si vous le souhaitez) :** Via le service de traduction que vous utilisez (par défaut, OpenAI).
*   **Utiliser les services d'OpenAI (si vous les utilisez) :** Votre clé API permet d'accéder aux API d'OpenAI.
*   **Personnaliser l'extension :** Vos paramètres locaux sont utilisés pour l'affichage et le comportement de l'extension.
*   **Insérer du texte :** Placer la transcription/traduction dans le champ actif, si vous avez activé cette option.

## 3. Partage des Informations

*   **Fournisseurs de services de transcription et de traduction :** Par défaut, nous utilisons OpenAI (Whisper et GPT). Si vous modifiez les paramètres pour utiliser d'autres services, vos données leur seront *transmises directement*. **Nous ne sommes pas responsables des pratiques de confidentialité de ces fournisseurs tiers. Si vous choisissez d'utiliser une URL d'API personnalisée, il est de votre responsabilité de vous assurer qu'elle utilise HTTPS et que le fournisseur respecte des standards de confidentialité et de sécurité adéquats. Nous vous recommandons fortement de ne pas utiliser d'API personnalisées dont vous ne pouvez pas vérifier la fiabilité.**
*   **Personne d'autre :** Nous ne vendons pas, ne louons pas, ne partageons pas et ne transmettons pas vos informations à d'autres entreprises ou individus, sauf si la loi l'exige (par exemple, une ordonnance d'un tribunal).

## 4. Protection des Informations

*   Votre clé API OpenAI est stockée localement sur votre ordinateur et n'est transmise qu'à OpenAI (si vous utilisez leurs services).
*   Les communications avec les services de transcription et de traduction sont sécurisées (HTTPS) si vous utilisez les paramètres par défaut ou une URL personnalisée valide commençant par HTTPS.
*   **Aucune donnée n'est stockée par l'extension.** Les enregistrements audio sont transmis *directement* au service de transcription. Bien que nous prenions toutes les mesures raisonnables pour supprimer immédiatement les données de la mémoire vive de l'extension, nous ne pouvons pas garantir l'absence totale de traces résiduelles dans la mémoire du navigateur Chrome, en raison du fonctionnement interne de Chrome.

## 5. Vos Choix

*   Vous pouvez désactiver l'accès au microphone dans les paramètres de votre navigateur Chrome.
*   Vous pouvez désactiver la traduction dans les paramètres de l'extension.
*   Vous pouvez supprimer votre clé API OpenAI des paramètres de l'extension.
*   Vous pouvez choisir d'utiliser d'autres services de transcription et de traduction (mais vérifiez *attentivement* leurs politiques de confidentialité et assurez-vous qu'ils utilisent HTTPS et offrent des garanties de sécurité suffisantes).
*   Vous pouvez désinstaller l'extension à tout moment.

## 6. Base Juridique du Traitement

Le *transit* des données via BabelFishAI repose sur les bases juridiques suivantes :

*   **Votre voix, sa transcription et sa traduction (si activée) :** L'exécution du contrat (vous fournir le service via le fournisseur que vous utilisez, par défaut OpenAI).
*   **Votre clé API OpenAI :** Votre consentement.
*   **Vos paramètres :** Notre intérêt légitime (pour le bon fonctionnement de l'extension).

## 7. Vos Droits (RGPD)

Vous disposez de droits concernant vos données personnelles, notamment le droit d'accès, de rectification, d'effacement et d'opposition. Pour exercer ces droits *concernant les données traitées par OpenAI (ou un autre fournisseur)*, veuillez consulter leur politique de confidentialité. Pour toute question concernant le fonctionnement de BabelFishAI, contactez-nous à contact@jls42.org.

## 8. Traitement des Demandes de Suppression de Données

BabelFishAI ne stocke *aucune* donnée personnelle. Par conséquent, nous ne pouvons pas traiter directement les demandes de suppression. Les enregistrements vocaux sont traités directement par OpenAI (ou le fournisseur que vous choisissez). Si vous souhaitez exercer votre droit à l'effacement auprès d'OpenAI, veuillez consulter leur politique de confidentialité : [https://openai.com/policies/privacy-policy/](https://openai.com/policies/privacy-policy/)

## 9. Durée de Conservation

**BabelFishAI ne conserve aucune donnée.** Les enregistrements audio sont transmis directement au service de transcription et ne sont pas conservés par l'extension. Bien que nous prenions toutes les mesures raisonnables pour supprimer immédiatement les données de la mémoire vive de l'extension, nous ne pouvons pas garantir l'absence totale de traces résiduelles dans la mémoire du navigateur Chrome, en raison du fonctionnement interne de Chrome. Votre clé API OpenAI est stockée localement sur votre ordinateur et n'est conservée que tant que vous utilisez l'extension et ne la supprimez pas manuellement.

## 10. Transferts Internationaux de Données

Vos données (enregistrements vocaux et transcriptions) sont transférées aux États-Unis pour être traitées par OpenAI, si vous utilisez les paramètres par défaut. Ce transfert est encadré par les Clauses Contractuelles Types approuvées par la Commission européenne. Pour plus d'informations sur la manière dont OpenAI gère les données, y compris la conservation et la protection, veuillez consulter leur politique de confidentialité : [https://openai.com/policies/privacy-policy/](https://openai.com/policies/privacy-policy/) . Si vous utilisez un autre fournisseur, consultez sa politique de confidentialité.

## 11. Responsable de Traitement et Contact

Le responsable de traitement pour le fonctionnement de l'extension BabelFishAI est :

Julien LE SAUX
contact@jls42.org

## 12. Autorité de Contrôle

Vous avez le droit de déposer une plainte auprès de la CNIL si vous estimez que le traitement de vos données personnelles n'est pas conforme au RGPD.

## 13. Modifications de cette Politique

Nous pouvons mettre à jour cette Politique de Confidentialité. Si nous apportons des modifications importantes, nous vous en informerons via les options de l'extension ou sur la page de l'extension dans le Chrome Web Store.