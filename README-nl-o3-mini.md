# Babel Fish AI - Uitbreiding voor Spraaktranscriptie en Vertaling met AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Om de uitbreiding te gebruiken, hebt u een OpenAI API-sleutel nodig (of een derde leverancier als u LiteLLM Proxy gebruikt). U kunt hier een OpenAI API-sleutel genereren: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI is een innovatieve Chrome-uitbreiding die oorspronkelijk is ontworpen om krachtige spraaktranscriptie te bieden. Zet uw stem om in tekst met opmerkelijke nauwkeurigheid dankzij de Whisper API van OpenAI, en geniet optioneel van automatische vertaling in realtime. U kunt Babel Fish AI uitsluitend voor transcriptie gebruiken of, indien gewenst, realtime vertaling activeren.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Functionaliteiten

- **Geavanceerde Spraaktranscriptie**
  - Opname van audio in hoge kwaliteit via de microfoon van uw apparaat.
  - Nauwkeurige transcriptie uitgevoerd door de Whisper API van OpenAI.
  - Meertalige ondersteuning voor spraakherkenning en weergave van de tekst, zodat spraakinputs in verschillende talen getranscribeerd kunnen worden en de resultaten (transcriptie en vertaling, indien geactiveerd) in de door u gekozen taal worden weergegeven.
  - Automatische invoeging van de tekst in het actieve veld of weergave in een speciaal dialoogvenster.

- **Intelligente Vertaling en Herformulering**
  - Directe vertaling van transcripties in diverse talen, die indien nodig geactiveerd kan worden.
  - Herformulering van de tekst om de stijl en helderheid te verbeteren.
  - Gebruik van een geavanceerd AI-model om een vertaling te garanderen die trouw blijft aan de oorspronkelijke betekenis.
  - Vrije keuze om uitsluitend de transcriptie te gebruiken of transcriptie en vertaling te combineren.

- **Krachtig Contextmenu**
  - Optie "Selectie herformuleren" om uw geselecteerde teksten direct te verbeteren.
  - Optie "Selectie vertalen" met een submenu van alle beschikbare talen.
  - Directe vervanging van de geselecteerde tekst door de vertaalde of herformuleerde versie.
  - Perfecte integratie in de native gebruikersinterface van Chrome.

- **Intuïtieve en Aanpasbare Gebruikersinterface**
  - Flexibele weergavemodus: actief invoerveld of zwevend dialoogvenster.
  - Instelbare statusbalk met keuze van kleuren, doorzichtigheid en weergaveduur.
  - Sneltoets (Ctrl+Shift+1 of ⌘+Shift+1 op Mac) om de opname te starten/stoppen.
  - Optie "Open houden" voor het regelen van de weergaveduur van de resultaten.
  - Aangepast pictogram, met een microfoon en het cijfer "42", voor onmiddellijke herkenning.

- **Geavanceerde Opties**
    - Expertmodus voor gedetailleerde configuraties (API-URLs, domeinspecifieke configuratie, enz.).
    - Mogelijkheid om de transcriptie- en vertaalsjablonen aan te passen.
    - Compatibiliteit met LiteLLM Proxy om verbinding te maken met alternatieve taalmodellen en het loggen van aanvragen uit te schakelen.
    - Volledige ondersteuning voor internationalisatie dankzij taalbestanden (_locales), die een interface en spraakondersteuning in meerdere talen bieden.

## 🌐 Ondersteunde Talen

Hier is de lijst met talen die door Babel Fish AI worden ondersteund, met links naar demonstratievideo's:

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
    - Clone deze repository van GitHub of download handmatig de map van de uitbreiding.
    - **Of installeer de uitbreiding direct vanuit de [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Open Chrome en ga naar `chrome://extensions/`.
    - Schakel de "Ontwikkelaarsmodus" in rechtsboven.
    - Klik op "Ongepakte uitbreiding laden" en selecteer de map van Babel Fish AI.

2.  **Verificatie:**
    - Zorg dat de uitbreiding zichtbaar is in de werkbalk van Chrome met het aangepaste pictogram.

## ⚙️ Configuratie

1.  **OpenAI API-sleutel:**
    *   Klik op het pictogram van de uitbreiding om bij de opties te komen.
    *   Voer uw OpenAI API-sleutel in (beschikbaar op [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalisatie van de Opties:**
    *   Kies de weergavemodus (actief invoerveld of dialoogvenster).
    *   Stel de kleur, doorzichtigheid en weergaveduur van de statusbalk in.
    *   Selecteer de talen voor de transcriptie (spraakinput) en voor de weergave van de tekst.
    *   Schakel de vertaalfunctie in of uit afhankelijk van uw behoeften.

3.  **(Optioneel) Gebruik met LiteLLM Proxy:**
    *   Activeer de "Expertmodus" in de opties.
    *   Wijzig in de sectie "Geavanceerde Configuratie" **de beide URLs** van de API's (Whisper en Vertaling) zodat ze verwijzen naar uw LiteLLM Proxy-instantie. **Gebruik dezelfde basis-URL voor beide.**
    *   Vink de optie "NoLog (alleen LiteLLM)" aan als u het loggen van aanvragen door LiteLLM wilt uitschakelen.

## 🚀 Gebruik met LiteLLM Proxy

Als u taalmodellen wilt gebruiken anders dan OpenAI, kunt u LiteLLM Proxy gebruiken. Hieronder leest u hoe u dit instelt:

Babel Fish AI is compatibel met [LiteLLM Proxy](https://litellm.ai/), waarmee het mogelijk is alternatieve taalmodellen te gebruiken met een API die compatibel is met die van OpenAI.

### Configuratie

1.  **Installeer en configureer LiteLLM Proxy:** Volg de instructies op de website van LiteLLM.
2.  **Configureer de Babel Fish AI-uitbreiding:**
    *   In de opties van de uitbreiding (rechtermuisklik op het pictogram > Opties), activeer de "Expertmodus".
    *   Wijzig in de sectie "Geavanceerde Configuratie" **de beide URLs** van de API's (Whisper en Vertaling) zodat ze verwijzen naar uw LiteLLM Proxy-instantie (bijvoorbeeld, `http://localhost:4000/v1/audio/transcriptions` en `http://localhost:4000/v1/chat/completions`). **Gebruik dezelfde basis-URL voor beide.**
    *   Vink de optie "NoLog (alleen LiteLLM)" aan als u het loggen van aanvragen door LiteLLM wilt uitschakelen.

**Belangrijk:** De optie "NoLog" is uitsluitend bedoeld voor gebruik met LiteLLM Proxy. **Schakel deze niet in** als u de officiële OpenAI API gebruikt, want dit zal een fout veroorzaken en de vertaling laten falen.

## 🛠️ Technische Werking

### Architectuur van de Uitbreiding

De uitbreiding bestaat uit meerdere JavaScript-bestanden die met elkaar communiceren:

*   **`manifest.json`:** Het hoofdconfiguratiebestand van de uitbreiding. Hierin worden de permissies, scripts, toegankelijke resources, enzovoort gedefinieerd. Het maakt gebruik van versie 3 van het manifest en declareert de permissies `activeTab`, `storage`, `commands`, `scripting` en `contextMenus`. De `web_accessible_resources` geven toegang tot de resources van de uitbreiding in de verschillende uitvoeringscontexten.
*   **`background.js`:** De serviceworker die op de achtergrond draait. Deze beheert gebeurtenissen (klik op het pictogram, sneltoetsen, contextmenu), injecteert het `content script` indien nodig, en communiceert met het `content script`.
*   **`content.js`:** Het script dat in webpagina’s wordt geïnjecteerd. Het communiceert direct met het DOM, neemt audio op van de microfoon, roept de transcriptie- en vertaal-API’s aan, en toont de resultaten.
*   **`src/utils/api.js`:** Bevat de functies om met de API’s te communiceren, met name `transcribeAudio` om de Whisper API van OpenAI (transcriptie) aan te roepen, en utiliteitsfuncties voor het beheren van de opslag.
*   **`src/utils/translation.js`:** Bevat de functies `translateText` en `rephraseText` om de GPT API van OpenAI (vertaling en herformulering) aan te roepen.
*   **`src/utils/ui.js`:** Bevat utiliteitsfuncties voor het beheren van de gebruikersinterface (banners, dialoogvensters, kopieerknop).
*   **`src/utils/languages-shared.js` en `src/utils/languages-data.js`:** Definiëren de gecentraliseerde lijst met ondersteunde talen, respectievelijk voor de context van de webpagina en voor de serviceworker.
*   **`src/utils/i18n.js`:** Beheert de internationalisatie voor de gebruikersinterface.
*   **`src/constants.js`:** Definieert constanten voor de configuratie, statussen, acties, enzovoort.
*   **`src/pages/options/`:** Bevat de bestanden voor de opties-pagina van de uitbreiding (HTML, CSS, JavaScript).

### Transcriptie- en Vertaalproces

#### Hoofdfunctie voor spraaktranscriptie

1.  **Start van de Opname:** De gebruiker start de opname door op het pictogram van de uitbreiding te klikken of de sneltoets te gebruiken (Ctrl+Shift+1 of ⌘+Shift+1 op Mac). Het `background script` stuurt een bericht naar het `content script` om de opname te starten.
2.  **Audio-opname:** Het `content script` maakt gebruik van de API `navigator.mediaDevices.getUserMedia` om toegang te krijgen tot de microfoon en de audio op te nemen via de MediaRecorder API.
3.  **Transcriptie:** Het `content script` gebruikt de functie `transcribeAudio` (`src/utils/api.js`) om de audio naar de Whisper API van OpenAI te sturen. De API retourneert de getranscribeerde tekst.
4.  **Vertaling of Herformulering (optioneel):** 
   - Als de vertaaloptie is ingeschakeld, gebruikt het `content script` de functie `translateText` (`src/utils/translation.js`) om de getranscribeerde tekst naar de GPT API van OpenAI te sturen.
   - Als de herformuleringsoptie is ingeschakeld, wordt de functie `rephraseText` gebruikt om de getranscribeerde tekst te verbeteren.
5.  **Weergave:** Het `content script` toont de verwerkte tekst, hetzij in het actieve element van de pagina (als het een tekstveld of bewerkbaar element is), hetzij in een aangepast dialoogvenster.

#### Functie van het contextmenu

1. **Tekstselectie:** De gebruiker selecteert tekst op een webpagina.
2. **Contextmenu:** Een rechtermuisklik toont de opties "Selectie herformuleren" of "Selectie vertalen" met een submenu van beschikbare talen.
3. **Verwerking:** Afhankelijk van de gekozen optie:
   - Wordt de tekst voor herformulering verstuurd via de functie `rephraseText`
   - Wordt de tekst voor vertaling verstuurd via de functie `translateText` met de geselecteerde doeltaal
4. **Weergave:** Het resultaat vervangt de oorspronkelijke selectie in het element waar de geselecteerde tekst zich bevindt.

### Communicatie

De communicatie tussen het `background script` en het `content script` vindt plaats via de Chrome messaging API (`chrome.runtime.sendMessage` en `chrome.runtime.onMessage`).

### Opslag van Gegevens

De uitbreiding maakt gebruik van `chrome.storage.sync` om op te slaan:

*   De OpenAI API-sleutel (`apiKey`).
*   De opties van de uitbreiding (weergave, vertaling, kleuren van de balk, enz.).
*   De taalvoorkeuren voor de vertaling.

Deze gegevens worden lokaal op uw computer opgeslagen, in de opslag van de Chrome-uitbreiding.

### Foutafhandeling
Mogelijke fouten (ontbrekende API-sleutel, transcriptiefout, enz.) worden gedefinieerd in het bestand `constants.js`. De functies in `api.js` en `translation.js` handelen mogelijke fouten bij API-aanroepen af. Het `content.js` toont foutmeldingen aan de gebruiker via een banner bovenaan de pagina.

## 🛡️ Veiligheid en Privacy

- **Gegevensbescherming:**
  - De API-sleutel wordt veilig opgeslagen in Chrome.
  - De uitbreiding slaat uw audiogegevens niet op; alle verwerking vindt realtime plaats.
  - De communicatie met de API’s verloopt via beveiligde HTTPS-verbindingen.

Voor volledige informatie over hoe BabelFishAI met uw gegevens omgaat, raadpleegt u ons [Privacybeleid](PRIVACY.md).

## 🔧 Probleemoplossing

- **Problemen met de Microfoon:**
  - Controleer de toegangsrechten voor de microfoon in Chrome.
  - Zorg ervoor dat geen enkele andere applicatie de microfoon tegelijk gebruikt.

- **Transcriptie-/Vertaalfouten:**
  - Controleer of de API-sleutel geldig en actief is.
  - Zorg voor een stabiele internetverbinding.
  - Raadpleeg de Chrome-console voor gedetailleerde logs bij fouten.

## 🤝 Bijdragen

Bijdragen en suggesties zijn welkom. Om bij te dragen:
- Meld bugs via de Issues-sectie op GitHub.
- Stel verbeteringen of nieuwe functionaliteiten voor.
- Dien uw pull requests in.

## 📄 Licentie

Deze uitbreiding wordt verspreid onder de GNU Affero General Public License v3.0 (AGPL-3.0). Raadpleeg het bestand LICENSE voor meer details.

## 💝 Ondersteuning

Als u deze uitbreiding waardeert, kunt u de ontwikkeling ondersteunen door een donatie te doen via [PayPal](https://paypal.me/jls).
---
Ontwikkeld door jls42.org met passie en innovatie, stuwt Babel Fish AI transcriptie en vertaling naar nieuwe hoogten dankzij de toonaangevende kunstmatige intelligentie.

**Dit document is vertaald van de fr-versie naar de nl-taal met behulp van het o3-mini model. Voor meer informatie over het vertaalproces, consulteer https://gitlab.com/jls42/ai-powered-markdown-translator**

