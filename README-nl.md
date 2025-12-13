# Babel Fish AI - Spraaktranscriptie en Vertaling Extensie met AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Om de extensie te gebruiken, heb je een API-sleutel nodig van een van de ondersteunde providers:**
- **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
- **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
- **Custom/LiteLLM**: Om je eigen API-endpoints te gebruiken

Babel Fish AI is een innovatieve Chrome-extensie die is ontworpen om krachtige spraaktranscriptie te bieden met ondersteuning voor meerdere providers. Zet uw stem om in tekst met opmerkelijke nauwkeurigheid dankzij de transcriptie-API's van Mistral AI (Voxtral) of OpenAI (Whisper), en profiteer optioneel van automatische realtime vertaling. U kunt Babel Fish AI uitsluitend gebruiken voor transcriptie of de directe vertaling activeren naar behoefte.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Functies

- **Geavanceerde Spraaktranscriptie**
  - Audio-opname van hoge kwaliteit via de microfoon van uw apparaat.
  - Nauwkeurige transcriptie via de API's Voxtral (Mistral AI) of Whisper (OpenAI).
  - Ondersteuning voor meerdere providers: kies vrij tussen Mistral AI, OpenAI of een aangepast endpoint.
  - Meertalige ondersteuning voor spraakherkenning en tekstweergave, waarmee u spraakinvoer in verschillende talen kunt transcriberen en resultaten (transcriptie en vertaling, indien geactiveerd) in de taal van uw keuze kunt weergeven.
  - Automatische invoeging van de tekst in het actieve veld of weergave in een speciaal dialoogvenster.

- **Intelligente Vertaling en Herformulering**
  - Onmiddellijke vertaling van transcripties in verschillende talen, te activeren indien nodig.
  - Herformulering van tekst om de stijl en duidelijkheid te verbeteren.
  - Gebruik van een geavanceerd AI-model om een vertaling te garanderen die trouw is aan de oorspronkelijke betekenis.
  - Vrije keuze om uitsluitend transcriptie te gebruiken of transcriptie en vertaling te combineren.

- **Krachtig Contextmenu**
  - Optie "Selectie herformuleren" om uw geselecteerde teksten direct te verbeteren.
  - Optie "Selectie vertalen" met submenu van alle beschikbare talen.
  - Optie "Spelling corrigeren" om spel-, grammatica- en interpunctiefouten te corrigeren.
  - Directe vervanging van de geselecteerde tekst door de vertaalde, geherformuleerde of gecorrigeerde versie.
  - Naadloze integratie in de native gebruikersinterface van Chrome.

- **Intuïtieve en Aanpasbare Gebruikersinterface**
  - Flexibele weergavemodus: actief invoergebied of zwevend dialoogvenster.
  - Configureerbare statusbanner met keuze uit kleuren, dekking en weergaveduur.
  - Sneltoets (Ctrl+Shift+1 of ⌘+Shift+1 op Mac) om opname te starten/stoppen.
  - Optie "Open houden" om de weergaveduur van de resultaten te regelen.
  - Aangepast pictogram, met integratie van een microfoon en het cijfer "42", voor onmiddellijke herkenning.

- **Geavanceerde Opties**
    - Ondersteuning voor meerdere providers: Mistral AI, OpenAI en Custom/LiteLLM voor maximale flexibiliteit.
    - Mogelijkheid om transcriptie- en vertaalmodellen per provider aan te passen.
    - Onafhankelijke selectie van de provider voor transcriptie en vertaling/herformulering.
    - Compatibiliteit met LiteLLM Proxy via de Custom-provider om verbinding te maken met alternatieve modellen.
    - Volledig beheer van internationalisering via taalbestanden (_locales), met een interface en spraakondersteuning in meerdere talen.

## 🌐 Ondersteunde Talen

Hier is de lijst met talen die worden ondersteund door Babel Fish AI, met links naar demonstratievideo's:

- [Arabisch](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [Duits](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [Engels](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [Spaans](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [Frans](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [Italiaans](https://www.youtube.com/watch?v=QgYZt8myods)
- [Japans](https://www.youtube.com/watch?v=noHEJCnocH8)
- [Koreaans](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [Nederlands](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Pools](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Portugees](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Roemeens](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Zweeds](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Chinees](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installatie

1.  **Downloaden en Installatie:**
    - Kloon deze repository van GitHub of download de extensiemap handmatig.
    - **Of installeer de extensie rechtstreeks vanuit de [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Open Chrome en ga naar `chrome://extensions/`.
    - Activeer de "Ontwikkelaarsmodus" rechtsboven.
    - Klik op "Uitgepakte extensie laden" en selecteer de map van Babel Fish AI.

2.  **Verificatie:**
    - Zorg ervoor dat de extensie in de Chrome-werkbalk verschijnt met het aangepaste pictogram.

## ⚙️ Configuratie

1.  **Configuratie van de AI-Provider:**
    *   Klik op het extensiepictogram om toegang te krijgen tot de opties.
    *   Selecteer uw provider in het vervolgkeuzemenu (Mistral AI, OpenAI of Custom/LiteLLM).
    *   Voer uw API-sleutel in:
        - **Mistral AI**: beschikbaar op [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        - **OpenAI**: beschikbaar op [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    *   Activeer de provider met de schakelaar naast het vervolgkeuzemenu.

2.  **Aanpassing van Opties:**
    *   Kies de weergavemodus (actief gebied of dialoogvenster).
    *   Configureer de kleur, dekking en weergaveduur van de statusbanner.
    *   Selecteer de talen voor transcriptie (spraakinvoer) en tekstweergave.
    *   Activeer of deactiveer de vertaalfunctie naar behoefte.

3.  **(Optioneel) Geavanceerde modelconfiguratie:**
    *   Klik in de opties van elke provider op "Modelconfiguratie" om de gebruikte modellen aan te passen.
    *   U kunt aangepaste modellen toevoegen voor transcriptie en vertaling/herformulering.
    *   Als er meerdere providers zijn geactiveerd, kunt u kiezen welke u voor elke service (transcriptie en vertaling) wilt gebruiken.

## 🚀 Gebruik met LiteLLM Proxy of Aangepaste Endpoints

Babel Fish AI is compatibel met [LiteLLM Proxy](https://litellm.ai/) en andere OpenAI-compatibele API-proxy's, waardoor het gebruik van alternatieve taalmodellen mogelijk is.

### Configuratie

1.  **Installeer en configureer uw proxy:** Volg de instructies van de service die u gebruikt (LiteLLM, enz.).
2.  **Configureer de Babel Fish AI-extensie:**
    *   Selecteer in de extensie-opties de provider **Custom/LiteLLM** in het vervolgkeuzemenu.
    *   Voer uw API-sleutel in (indien nodig).
    *   Configureer de API-URL's:
        - **Transcriptie-URL**: bijvoorbeeld `http://localhost:4000/v1/audio/transcriptions`
        - **Chat-URL**: bijvoorbeeld `http://localhost:4000/v1/chat/completions`
    *   Activeer de provider met de schakelaar.
    *   Vink de optie **"NoLog"** aan als u de logboekregistratie van verzoeken door LiteLLM wilt uitschakelen.

**Belangrijk:** De optie "NoLog" is **alleen** beschikbaar in de provider Custom/LiteLLM. Het is niet compatibel met de officiële API's van OpenAI of Mistral AI.

## 🛠️ Technische Werking

### Architectuur van de Extensie

De extensie bestaat uit verschillende JavaScript-bestanden die met elkaar samenwerken:

#### Hoofdbestanden

*   **`manifest.json`:** Het belangrijkste configuratiebestand van de extensie. Het definieert machtigingen, scripts, toegankelijke bronnen, enz. Het gebruikt Manifest V3 en verklaart de machtigingen `activeTab`, `storage`, `commands`, `scripting` en `contextMenus`.
*   **`background.js`:** De service worker die op de achtergrond draait. Het beheert gebeurtenissen (klik op het pictogram, sneltoetsen, contextmenu), injecteert indien nodig het `content script` en communiceert met het `content script`.
*   **`content.js`:** Het hoofdscript dat in webpagina's wordt geïnjecteerd. Het coördineert de verschillende hulpprogrammamodules en beheert de globale stroom van de extensie.
*   **`src/constants.js`:** Definieert constanten voor configuratie, statussen, acties, enz.

#### Hulpprogrammamodules

De extensie maakt gebruik van een modulaire architectuur met verschillende gespecialiseerde hulpbestanden:

##### Provider- en API-beheer

*   **`src/utils/providers.js`:** Register van AI-providers (Mistral AI, OpenAI, Custom/LiteLLM) met hun configuraties, modellen en standaard-URL's.
*   **`src/utils/api-utils.js`:** Functies voor interactie met externe API's, oplossing van configuratie voor meerdere providers en spraaktranscriptie.
*   **`src/utils/text-processing.js`:** Tekstverwerkingsfuncties: vertaling, herformulering, spellingcorrectie.

##### Gebruikersinterface en Interactie

*   **`src/utils/ui.js`:** Algemene hulpprogrammafuncties voor de gebruikersinterface.
*   **`src/utils/banner-utils.js`:** Beheert de statusbanner, de bedieningselementen en de taalkiezer.
*   **`src/utils/focus-utils.js`:** Beheert het opslaan en herstellen van focus en tekstselectie.
*   **`src/utils/transcription-display.js`:** Beheert de weergave van transcriptieresultaten.
*   **`src/utils/error-utils.js`:** Beheert foutweergave en -afhandeling.
*   **`src/styles/content.css`:** CSS-stijlen voor de gebruikersinterface die in webpagina's is geïnjecteerd.

##### Opname en Gebeurtenissen

*   **`src/utils/recording-utils.js`:** Beheert audio-opname via microfoon en verwerking van audiogegevens.
*   **`src/utils/event-handlers.js`:** Bevat gebeurtenishandlers voor gebruikersinteracties.

##### Internationalisering en Talen

*   **`src/utils/languages.js`:** Definieert de talen die door de extensie worden ondersteund.
*   **`src/utils/languages-shared.js`:** Definieert de lijst met ondersteunde talen voor de context van de webpagina.
*   **`src/utils/languages-data.js`:** Definieert de lijst met ondersteunde talen voor de service worker.
*   **`src/utils/i18n.js`:** Beheert internationalisering voor de gebruikersinterface.

##### Optiespagina

*   **`src/pages/options/`:** Bevat bestanden voor de optiespagina van de extensie (HTML, CSS, JavaScript).

### Transcriptie- en Vertaalproces

#### Hoofdfunctie voor spraaktranscriptie

1.  **Opname starten:** De gebruiker start de opname door op het extensiepictogram te klikken of de sneltoets te gebruiken (Ctrl+Shift+1 of ⌘+Shift+1 op Mac). Het `background script` stuurt een bericht naar het `content script` om de opname te starten.
2.  **Audio-opname:** Het `content script` gebruikt de `navigator.mediaDevices.getUserMedia` API om toegang te krijgen tot de microfoon en audio op te nemen via de MediaRecorder API.
3.  **Transcriptie:** Het `content script` gebruikt de functie `transcribeAudio` (`src/utils/api-utils.js`) om audio naar de transcriptie-API van de geconfigureerde provider te sturen (Voxtral voor Mistral AI, Whisper voor OpenAI). De API retourneert de getranscribeerde tekst.
4.  **Vertaling of Herformulering (Optioneel):**
   - Als de vertaaloptie is geactiveerd, gebruikt het `content script` de functie `translateText` (`src/utils/text-processing.js`) om de getranscribeerde tekst naar de chat-API van de geconfigureerde provider te sturen.
   - Als de optie voor herformulering is geactiveerd, wordt de functie `rephraseText` gebruikt om de getranscribeerde tekst te verbeteren.
5.  **Weergave:** Het `content script` geeft de verwerkte tekst weer in het actieve element van de pagina (als het een tekstveld of bewerkbaar element is) of in een aangepast dialoogvenster.

#### Contextmenu-functie

1. **Tekstselectie:** De gebruiker selecteert tekst op een webpagina.
2. **Contextmenu:** Een rechtermuisklik toont de opties:
   - "Selectie herformuleren" om de stijl en duidelijkheid te verbeteren
   - "Selectie vertalen" met een submenu van beschikbare talen
   - "Spelling corrigeren" om fouten te corrigeren
3. **Verwerking:** Afhankelijk van de gekozen optie:
   - De tekst wordt verzonden voor herformulering via de functie `rephraseText`
   - De tekst wordt verzonden voor vertaling via de functie `translateText` met de geselecteerde doeltaal
   - De tekst wordt verzonden voor correctie via de functie `correctText`
4. **Weergave:** Het resultaat vervangt de oorspronkelijke selectie in het element waar de geselecteerde tekst zich bevindt.

### Communicatie

De communicatie tussen het `background script` en het `content script` vindt plaats via de Chrome Messaging API (`chrome.runtime.sendMessage` en `chrome.runtime.onMessage`).

### Gegevensopslag

De extensie gebruikt `chrome.storage.sync` om het volgende op te slaan:

*   AI-providerconfiguratie (API-sleutels, geselecteerde modellen, aangepaste URL's).
*   Extensie-opties (weergave, vertaling, bannerkleuren, enz.).
*   Taalvoorkeuren voor vertaling.

Deze gegevens worden lokaal op uw computer opgeslagen, in de opslag van de Chrome-extensie.

### Foutafhandeling
Mogelijke fouten (ontbrekende API-sleutel, transcriptiefout, enz.) zijn gedefinieerd in het bestand `constants.js`. De functies `api-utils.js` en `text-processing.js` behandelen potentiële API-aanroepfouten met verbeterde berichten op basis van de HTTP-code. Het `content.js` toont foutmeldingen aan de gebruiker via een banner onderaan de pagina.


## 🛡️ Beveiliging en Privacy

- **Gegevensbescherming:**
  - De API-sleutel wordt veilig opgeslagen in Chrome.
  - De extensie bewaart uw audiogegevens niet; alle verwerkingen gebeuren in realtime.
  - De communicatie met de API's verloopt via beveiligde HTTPS-verbindingen.

Raadpleeg ons [Privacybeleid](PRIVACY.md) voor volledige informatie over hoe BabelFishAI uw gegevens beheert.

## 🔧 Probleemoplossing

- **Microfoonproblemen:**
  - Controleer de machtigingen voor microfoontoegang in Chrome.
  - Zorg ervoor dat geen enkele andere applicatie de microfoon tegelijkertijd gebruikt.

- **Transcriptie-/Vertaalfouten:**
  - Controleer of de API-sleutel geldig en actief is.
  - Zorg ervoor dat u een stabiele internetverbinding hebt.
  - Raadpleeg de Chrome-console voor gedetailleerde logboeken in geval van fouten.

## 🤝 Bijdrage

Bijdragen en suggesties zijn welkom. Om bij te dragen:
- Meld bugs via de sectie Issues op GitHub.
- Stel verbeteringen of nieuwe functies voor.
- Dien uw pull-aanvragen in.

## 📄 Licentie

Deze extensie wordt gedistribueerd onder de GNU Affero General Public License v3.0 (AGPL-3.0). Raadpleeg het bestand LICENSE voor meer details.

## 💝 Ondersteuning

Als u deze extensie waardeert, kunt u de ontwikkeling ervan steunen door een donatie te doen via [PayPal](https://paypal.me/jls).
---
Ontwikkeld door jls42.org met passie en innovatie, stuwt Babel Fish AI transcriptie en vertaling naar nieuwe horizonten dankzij geavanceerde kunstmatige intelligentie.
