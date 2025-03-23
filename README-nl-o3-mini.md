# Babel Fish AI - Uitbreiding voor Spraaktranscriptie en Vertaling met AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Om de uitbreiding te gebruiken heb je een OpenAI API-sleutel nodig (of een derde leverancier als je LiteLLM Proxy gebruikt). Je kunt hier een OpenAI API-sleutel genereren: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI is een innovatieve Chrome-uitbreiding die oorspronkelijk is ontworpen om krachtige spraaktranscriptie te bieden. Zet je stem om in tekst met opmerkelijke nauwkeurigheid dankzij de OpenAI Whisper API, en profiteer optioneel van automatische realtime vertaling. Je kunt Babel Fish AI uitsluitend voor transcriptie gebruiken of, indien gewenst, de vertaling in realtime activeren.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Functionaliteiten

- **Geavanceerde Spraaktranscriptie**
  - Audio-opname van hoge kwaliteit via de microfoon van je apparaat.
  - Nauwkeurige transcriptie uitgevoerd door de OpenAI Whisper API.
  - Meertalige ondersteuning voor spraakherkenning en tekstantoon, waardoor gesproken invoer in verschillende talen kan worden getranscribeerd en de resultaten (transcriptie en vertaling, indien geactiveerd) in de door jou gewenste taal worden getoond.
  - Automatische invoeging van de tekst in het actieve veld of weergave in een speciaal dialoogvenster.

- **Intelligente Vertaling en Herformulering**
  - Onmiddellijke vertaling van transcripties in diverse talen, indien nodig te activeren.
  - Herformulering van de tekst om de stijl en helderheid te verbeteren.
  - Gebruik van een geavanceerd AI-model om een vertaling te garanderen die trouw is aan de originele betekenis.
  - Vrije keuze om uitsluitend de transcriptie te gebruiken of transcriptie en vertaling te combineren.

- **Krachtig Contextmenu**
  - Optie "Selectie herformuleren" om direct je geselecteerde teksten te verbeteren.
  - Optie "Selectie vertalen" met een submenu van alle beschikbare talen.
  - Directe vervanging van de geselecteerde tekst door de vertaalde of herformuleerde versie.
  - Perfecte integratie in de native gebruikersinterface van Chrome.

- **Intuïtieve en Aanpasbare Gebruikersinterface**
  - Flexibele weergavemodus: actief invoerveld of zwevend dialoogvenster.
  - Configureerbare statusbalk met keuze uit kleuren, doorzichtigheid en weergaveduur.
  - Toetsenbord snelkoppeling (Ctrl+Shift+1 of ⌘+Shift+1 op Mac) om opname te starten/stoppen.
  - Optie "Open houden" om de weergaveduur van de resultaten te regelen.
  - Aangepast icoon, met daarin een microfoon en het cijfer "42", voor directe herkenning.

- **Geavanceerde Opties**
    - Expertmodus voor gedetailleerde configuraties (API-URLs, domein-specifieke configuratie, enz.).
    - Mogelijkheid om transcriptie- en vertaalmodellen aan te passen.
    - Compatibiliteit met LiteLLM Proxy om verbinding te maken met alternatieve taalmodellen en de logging van verzoeken uit te schakelen.
    - Volledige ondersteuning van internationalisatie dankzij de taalbestanden (_locales), die een gebruikersinterface en spraakondersteuning in meerdere talen bieden.

## 🌐 Ondersteunde Talen

Hier is de lijst van talen die ondersteund worden door Babel Fish AI, met links naar demonstratievideo's:

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

1.  **Downloaden en Installeren:**
    - Clone deze repository vanaf GitHub of download handmatig de map van de uitbreiding.
    - **Of installeer de uitbreiding direct vanuit de [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Open Chrome en ga naar `chrome://extensions/`.
    - Schakel de “Ontwikkelaarsmodus” in rechtsboven.
    - Klik op “Pak ongepakte uitbreiding laden” en selecteer de map van Babel Fish AI.

2.  **Verificatie:**
    - Zorg ervoor dat de uitbreiding verschijnt in de Chrome werkbalk met het aangepaste icoon.

## ⚙️ Configuratie

1.  **OpenAI API-sleutel:**
    *   Klik op het icoon van de uitbreiding om toegang te krijgen tot de opties.
    *   Voer je OpenAI API-sleutel in (beschikbaar op [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalisatie van de Opties:**
    *   Kies de weergavemodus (actief veld of dialoogvenster).
    *   Stel de kleur, doorzichtigheid en weergaveduur van de statusbalk in.
    *   Selecteer de talen voor de transcriptie (spraakinput) en voor de tekstantoon.
    *   Schakel de vertaalfunctionaliteit in of uit naar gelang je behoefte.

3.  **(Optioneel) Gebruik met LiteLLM Proxy:**
    *   Schakel de "Expertmodus" in de opties in.
    *   Pas in de sectie "Geavanceerde Configuratie" **beide API-URLs** (Whisper en Vertaling) aan zodat deze verwijzen naar jouw LiteLLM Proxy-instantie. **Gebruik dezelfde basis-URL voor beide.**
    *   Vink de optie "NoLog (alleen LiteLLM)" aan als je de logging van verzoeken door LiteLLM wilt uitschakelen.

## 🚀 Gebruik met LiteLLM Proxy

Als je taalmodellen wilt gebruiken anders dan OpenAI, kun je LiteLLM Proxy gebruiken. Zo stel je het in:

Babel Fish AI is compatibel met [LiteLLM Proxy](https://litellm.ai/), waarmee je alternatieve taalmodellen kunt gebruiken met een API die compatibel is met die van OpenAI.

### Configuratie

1.  **Installeer en configureer LiteLLM Proxy:** Volg de instructies op de LiteLLM website.
2.  **Configureer de Babel Fish AI uitbreiding:**
    *   In de opties van de uitbreiding (rechtermuisklik op het icoon > Opties), schakel de "Expertmodus" in.
    *   Pas in de sectie "Geavanceerde Configuratie" **beide API-URLs** (Whisper en Vertaling) aan zodat deze verwijzen naar jouw LiteLLM Proxy-instantie (bijvoorbeeld, `http://localhost:4000/v1/audio/transcriptions` en `http://localhost:4000/v1/chat/completions`). **Gebruik dezelfde basis-URL voor beide.**
    *   Vink de optie "NoLog (alleen LiteLLM)" aan als je de logging van verzoeken door LiteLLM wilt uitschakelen.

**Belangrijk:** De optie "NoLog" is **uitsluitend** bedoeld om gebruikt te worden met LiteLLM Proxy. **Schakel het niet in** als je de officiële OpenAI API gebruikt, want dit zal een fout veroorzaken en voorkomen dat de vertaling werkt.

## 🛠️ Technische Werking

### Architectuur van de Uitbreiding

De uitbreiding bestaat uit meerdere JavaScript-bestanden die met elkaar communiceren:

#### Belangrijkste Bestanden

*   **`manifest.json`:** Het hoofdconfiguratiebestand van de uitbreiding. Het definieert de permissies, scripts, toegankelijke bronnen, etc. Het gebruikt versie 3 van het manifest en declareert de permissies `activeTab`, `storage`, `commands`, `scripting` en `contextMenus`.
*   **`background.js`:** De service worker die op de achtergrond draait. Het beheert de gebeurtenissen (klik op het icoon, sneltoetsen, contextmenu), injecteert het `content script` indien nodig, en communiceert met het `content script`.
*   **`content.js`:** Het hoofdscript dat wordt geïnjecteerd in webpagina's. Het coördineert de diverse hulpprogrammamodules en beheert de algemene stroom van de uitbreiding.
*   **`src/constants.js`:** Definieert constante waarden voor de configuratie, toestanden, acties, etc.

#### Hulpprogrammamodules

De uitbreiding maakt gebruik van een modulaire architectuur met verschillende gespecialiseerde hulpprogramma-bestanden:

##### API-beheer en Gegevensverwerking

*   **`src/utils/api.js`:** Bevat de functies om te communiceren met de API's, met name `transcribeAudio` om de OpenAI Whisper API aan te roepen.
*   **`src/utils/api-utils.js`:** Geavanceerde functies voor de interactie met externe API's.
*   **`src/utils/translation.js`:** Bevat de functies `translateText` en `rephraseText` om de OpenAI GPT API aan te roepen.
*   **`src/utils/text-translation.js`:** Gespecialiseerde functies voor de vertaling en herformulering van tekst.
*   **`src/utils/text-processing.js`:** Algemene tekstverwerkingsfuncties.

##### Gebruikersinterface en Interactie

*   **`src/utils/ui.js`:** Algemene hulpfuncties voor de gebruikersinterface.
*   **`src/utils/banner-utils.js`:** Beheert de statusbalk, de bedieningselementen en de taalselectie.
*   **`src/utils/focus-utils.js`:** Beheert het opslaan en herstellen van focus en tekstselectie.
*   **`src/utils/transcription-display.js`:** Beheert de weergave van de transcriptieresultaten.
*   **`src/utils/error-utils.js`:** Beheert de weergave en verwerking van fouten.
*   **`src/styles/content.css`:** CSS-stijlen voor de gebruikersinterface die in webpagina's wordt geïnjecteerd.

##### Opname en Gebeurtenissen

*   **`src/utils/recording-utils.js`:** Beheert de audio-opname via de microfoon en de verwerking van audiogegevens.
*   **`src/utils/event-handlers.js`:** Bevat de eventhandlers voor gebruikersinteracties.

##### Internationalisatie en Talen

*   **`src/utils/languages.js`:** Definieert de talen die worden ondersteund door de uitbreiding.
*   **`src/utils/languages-shared.js`:** Definieert de lijst van ondersteunde talen voor de context van de webpagina.
*   **`src/utils/languages-data.js`:** Definieert de lijst van ondersteunde talen voor de service worker.
*   **`src/utils/i18n.js`:** Beheert de internationalisatie voor de gebruikersinterface.

##### Optiepagina

*   **`src/pages/options/`:** Bevat de bestanden voor de optiepagina van de uitbreiding (HTML, CSS, JavaScript).

### Proces van Transcriptie en Vertaling

#### Hoofdfunctie voor Spraaktranscriptie

1.  **Start van de Opname:** De gebruiker start de opname door op het icoon van de uitbreiding te klikken of door gebruik te maken van de sneltoets (Ctrl+Shift+1 of ⌘+Shift+1 op Mac). Het `background script` stuurt een bericht naar het `content script` om de opname te starten.
2.  **Audio-opname:** Het `content script` gebruikt de API `navigator.mediaDevices.getUserMedia` om toegang te krijgen tot de microfoon en de audio op te nemen via de MediaRecorder API.
3.  **Transcriptie:** Het `content script` gebruikt de functie `transcribeAudio` (`src/utils/api.js`) om de audio te verzenden naar de OpenAI Whisper API. De API retourneert de getranscribeerde tekst.
4.  **Vertaling of Herformulering (Optioneel):**
   - Als de vertaaloptie is ingeschakeld, gebruikt het `content script` de functie `translateText` (`src/utils/translation.js`) om de getranscribeerde tekst naar de OpenAI GPT API te sturen.
   - Als de herformuleringsoptie is ingeschakeld, wordt de functie `rephraseText` gebruikt om de getranscribeerde tekst te verbeteren.
5.  **Weergave:** Het `content script` toont de verwerkte tekst, hetzij in het actieve element van de pagina (als het een tekstveld of een bewerkbaar element is), hetzij in een aangepast dialoogvenster.

#### Functie van het Contextmenu

1. **Tekstselectie:** De gebruiker selecteert tekst op een webpagina.
2. **Contextmenu:** Een rechtermuisklik toont de opties "Selectie herformuleren" of "Selectie vertalen" met een submenu van beschikbare talen.
3. **Verwerking:** Afhankelijk van de gekozen optie:
   - Wordt de tekst verzonden voor herformulering via de functie `rephraseText`
   - Wordt de tekst verzonden voor vertaling via de functie `translateText` met de geselecteerde doeltaal
4. **Weergave:** Het resultaat vervangt de oorspronkelijke selectie in het element waar de tekst geselecteerd was.

### Communicatie

De communicatie tussen het `background script` en het `content script` vindt plaats via de Chrome bericht-API (`chrome.runtime.sendMessage` en `chrome.runtime.onMessage`).

### Gegevensopslag

De uitbreiding maakt gebruik van `chrome.storage.sync` om op te slaan:

*   De OpenAI API-sleutel (`apiKey`).
*   De opties van de uitbreiding (weergave, vertaling, kleuren van de balk, etc.).
*   De taalvoorkeuren voor de vertaling.

Deze gegevens worden lokaal op je computer opgeslagen, in de opslag van de Chrome-uitbreiding.

### Foutafhandeling
De mogelijke fouten (ontbrekende API-sleutel, transcriptiefout, etc.) worden gedefinieerd in het bestand `constants.js`. De functies in `api.js` en `translation.js` behandelen de potentiële fouten van de API-aanroepen. Het `content.js` toont foutmeldingen aan de gebruiker via een balk bovenaan de pagina.

## 🛡️ Beveiliging en Privacy

- **Gegevensbescherming:**
  - De API-sleutel wordt op een veilige manier opgeslagen in Chrome.
  - De uitbreiding slaat je audio-gegevens niet op; alle verwerking gebeurt realtime.
  - De communicatie met de API's vindt plaats via beveiligde HTTPS-verbindingen.

Voor volledige informatie over hoe BabelFishAI omgaat met je gegevens, zie onze [Privacyverklaring](PRIVACY.md).

## 🔧 Probleemoplossing

- **Microfoonproblemen:**
  - Controleer de toegangsrechten voor de microfoon in Chrome.
  - Zorg ervoor dat geen andere applicatie de microfoon gelijktijdig gebruikt.

- **Fouten bij Transcriptie/Vertaling:**
  - Controleer of de API-sleutel geldig en actief is.
  - Zorg voor een stabiele internetverbinding.
  - Raadpleeg de Chrome-console voor gedetailleerde logs bij een fout.

## 🤝 Bijdragen

Bijdragen en suggesties zijn welkom. Om bij te dragen:
- Rapporteer bugs via de Issues-sectie op GitHub.
- Doe voorstellen voor verbeteringen of nieuwe functionaliteiten.
- Dien je pull requests in.

## 📄 Licentie

Deze uitbreiding wordt gedistribueerd onder de GNU Affero General Public License v3.0 (AGPL-3.0). Zie het bestand LICENSE voor meer details.

## 💝 Steun

Als je deze uitbreiding waardeert, kun je de ontwikkeling ondersteunen door een donatie te doen via [PayPal](https://paypal.me/jls).
---
Ontwikkeld door jls42.org met passie en innovatie, stuwt Babel Fish AI spraaktranscriptie en vertaling naar nieuwe hoogten dankzij toonaangevende kunstmatige intelligentie.

**Dit document is vertaald van de versie fr naar de taal nl met behulp van het o3-mini-model. Voor meer informatie over het vertaalproces, raadpleeg https://gitlab.com/jls42/ai-powered-markdown-translator**

