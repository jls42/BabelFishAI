# Babel Fish AI - Uitbreiding voor Spraaktranscriptie en Vertaling met AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Om de uitbreiding te gebruiken, heeft u een OpenAI API-sleutel nodig (of een derde partij leverancier als u LiteLLM Proxy gebruikt). U kunt een OpenAI API-sleutel genereren via: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI is een innovatieve Chrome-uitbreiding die oorspronkelijk is ontworpen om krachtige spraaktranscriptie te bieden. Zet uw stem om in tekst met opmerkelijke nauwkeurigheid dankzij de OpenAI Whisper API en profiteer optioneel van automatische realtime vertaling. U kunt Babel Fish AI uitsluitend voor transcriptie gebruiken of de vertaling on-the-fly inschakelen op basis van uw behoeften.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Functionaliteiten

- **Geavanceerde Spraaktranscriptie**
  - Hoogwaardige audio-opname via de microfoon van uw apparaat.
  - Nauwkeurige transcriptie uitgevoerd door de OpenAI Whisper API.
  - Meertalige ondersteuning voor spraakherkenning en het weergeven van tekst, waardoor gesproken invoer in verschillende talen kan worden getranscribeerd en de resultaten (transcriptie en vertaling, indien ingeschakeld) in de taal van uw keuze worden weergegeven.
  - Automatische invoeging van de tekst in het actieve veld of weergave in een speciaal dialoogvenster.

- **Geïntegreerde Automatische Vertaling (Optioneel)**
  - Directe vertaling van de transcripties in diverse talen, indien nodig in te schakelen.
  - Gebruik van een geavanceerd AI-model om een vertaling te garanderen die trouw blijft aan de oorspronkelijke betekenis.
  - Vrije keuze om uitsluitend de transcriptie te gebruiken of transcriptie en vertaling te combineren.

- **Intuïtieve en Aanpasbare Gebruikersinterface**
  - Flexibele weergavemodus: actief invoerveld of zwevend dialoogvenster.
  - Instelbare statusbalk met keuze van kleuren, doorzichtigheid en weergaveduur.
  - Toetsenbord snelkoppeling (Ctrl+Shift+1 of ⌘+Shift+1 op Mac) om de opname te starten/stoppen.
  - Aangepast pictogram, met een microfoon en het cijfer “42”, voor directe herkenning.

- **Geavanceerde Opties**
    - Expertmodus voor gedetailleerde configuraties (API-URL's, domeinconfiguratie, enz.).
    - Mogelijkheid om de transcriptie- en vertaalmodellen aan te passen.
    - Compatibiliteit met LiteLLM Proxy om verbinding te maken met alternatieve taalmodellen en de logging van verzoeken uit te schakelen.
    - Volledige beheer van internationalisatie via taalbestanden (_locales), die een interface en spraakondersteuning in meerdere talen bieden.

## 🌐 Ondersteunde Talen

Hieronder vindt u de lijst met talen die worden ondersteund door Babel Fish AI, met links naar demonstratievideo's:

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
    - **Of installeer de uitbreiding direct vanaf de [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Open Chrome en ga naar `chrome://extensions/`.
    - Schakel de "Ontwikkelaarsmodus" rechtsboven in.
    - Klik op "Ongepakte uitbreiding laden" en selecteer de map van Babel Fish AI.

2.  **Verificatie:**
    - Zorg ervoor dat de uitbreiding verschijnt in de Chrome werkbalk met het aangepaste pictogram.

## ⚙️ Configuratie

1.  **OpenAI API-sleutel:**
    *   Klik op het uitbreidingpictogram om bij de opties te komen.
    *   Voer uw OpenAI API-sleutel in (beschikbaar op [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Aanpassen van de Opties:**
    *   Kies de weergavemodus (actief veld of dialoogvenster).
    *   Stel de kleur, doorzichtigheid en de weergaveduur van de statusbalk in.
    *   Selecteer de talen voor transcriptie (spraak) en voor de weergave van de tekst.
    *   Schakel de vertaalfunctionaliteit in of uit afhankelijk van uw behoeften.

3.  **(Optioneel) Gebruik met LiteLLM Proxy:**
    *   Schakel de "Expertmodus" in bij de opties.
    *   Wijzig in de sectie "Geavanceerde Configuratie" **de beide URL's** van de API's (Whisper en Vertaling) zodat ze verwijzen naar uw LiteLLM Proxy-instantie. **Gebruik dezelfde basis-URL voor beide.**
    *   Vink de optie "NoLog (alleen LiteLLM)" aan als u de logging van verzoeken door LiteLLM wilt uitschakelen.

## 🚀 Gebruik met LiteLLM Proxy

Als u taalmodellen van andere aanbieders dan OpenAI wilt gebruiken, kunt u LiteLLM Proxy inzetten. Hier leest u hoe het te configureren:

Babel Fish AI is compatibel met [LiteLLM Proxy](https://litellm.ai/), waarmee u alternatieve taalmodellen kunt gebruiken met een API die compatibel is met die van OpenAI.

### Configuratie

1.  **Installeer en configureer LiteLLM Proxy:** Volg de instructies op de LiteLLM-website.
2.  **Configureer de Babel Fish AI-uitbreiding:**
    *   Schakel in de opties van de uitbreiding (rechtermuisklik op het pictogram > Opties) de "Expertmodus" in.
    *   Wijzig in de sectie "Geavanceerde Configuratie" **de beide URL's** van de API's (Whisper en Vertaling) zodat ze verwijzen naar uw LiteLLM Proxy-instantie (bijvoorbeeld, `http://localhost:4000/v1/audio/transcriptions` en `http://localhost:4000/v1/chat/completions`). **Gebruik dezelfde basis-URL voor beide.**
    *   Vink de optie "NoLog (alleen LiteLLM)" aan als u de logging van verzoeken door LiteLLM wilt uitschakelen.

**Belangrijk:** De optie "NoLog" is **uitsluitend** bedoeld voor gebruik met LiteLLM Proxy. **Schakel deze niet in** als u de officiële OpenAI API gebruikt, want dit zal een fout veroorzaken en de vertaling doen falen.

## 🛠️ Technische Werking

### Architectuur van de Uitbreiding

De uitbreiding bestaat uit verschillende JavaScript-bestanden die met elkaar samenwerken:

*   **`manifest.json`:** Het hoofdconfiguratiebestand van de uitbreiding. Het definieert de permissies, scripts, toegankelijke bronnen, enz. Het gebruikt versie 3 van het manifest en verklaart de permissies `activeTab`, `storage`, `commands` en `scripting`. De `content_scripts` worden in alle URL's geïnjecteerd en uitgevoerd aan het einde van het laden van het document.
*   **`background.js`:** De service worker die op de achtergrond draait. Hij beheert de gebeurtenissen (klik op het pictogram, sneltoetsen), injecteert het `content script` indien nodig en communiceert met het `content script`.
*   **`content.js`:** Het script dat in de webpagina's wordt geïnjecteerd. Het werkt direct met de DOM, neemt audio op via de microfoon, roept de transcriptie- en vertaal-API's aan en toont de resultaten.
*   **`src/utils/api.js`:** Bevat de functie `transcribeAudio` om de OpenAI Whisper API (transcriptie) aan te roepen.
*   **`src/utils/translation.js`:** Bevat de functie `translateText` om de OpenAI GPT API (vertaling) aan te roepen.
*   **`src/utils/ui.js`:** Bevat hulpfuncties voor het beheer van de gebruikersinterface (bannering, dialoogvenster, kopieerknop).
*   **`src/constants.js`:** Definieert constanten voor de configuratie, statussen, acties, enz.
*   **`src/pages/options/`:** Bevat de bestanden voor de optiespagina van de uitbreiding (HTML, CSS, JavaScript).

### Transcriptie- en Vertaalproces

1.  **Starten van de Opname:** De gebruiker start de opname door op het pictogram van de uitbreiding te klikken of via de sneltoets. Het `background script` stuurt een bericht naar het `content script` om de opname te starten.
2.  **Audio-opname:** Het `content script` gebruikt de API `navigator.mediaDevices.getUserMedia` om toegang te krijgen tot de microfoon en audio op te nemen.
3.  **Transcriptie:** Het `content script` gebruikt de functie `transcribeAudio` (`src/utils/api.js`) om de audio naar de OpenAI Whisper API te sturen. De API stuurt de getranscribeerde tekst terug.
4.  **Vertaling (Optioneel):** Als de vertaaloptie is ingeschakeld, gebruikt het `content script` de functie `translateText` (`src/utils/translation.js`) om de getranscribeerde tekst naar de OpenAI GPT API te sturen. De API stuurt de vertaalde tekst terug.
5.  **Weergave:** Het `content script` toont de getranscribeerde (en eventueel vertaalde) tekst in het actieve element van de pagina (als dit een tekstveld of bewerkbaar element is) of in een dialoogvenster.

### Communicatie

De communicatie tussen het `background script` en het `content script` verloopt via de Chrome messaging API (`chrome.runtime.sendMessage` en `chrome.runtime.onMessage`).

### Gegevensopslag

De uitbreiding maakt gebruik van `chrome.storage.sync` om op te slaan:

*   De OpenAI API-sleutel (`apiKey`).
*   De opties van de uitbreiding (weergave, vertaling, kleuren van de statusbalk, enz.).

Deze gegevens worden lokaal op uw computer opgeslagen, in de opslagruimte van de Chrome-uitbreiding.

### Foutafhandeling

De mogelijke fouten (ontbrekende API-sleutel, transcriptiefout, enz.) worden gedefinieerd in het bestand `constants.js`. De functies in `api.js` en `translation.js` handelen de potentiële fouten van de API-aanroepen af. Het `content.js` toont foutmeldingen aan de gebruiker via een banner bovenaan de pagina.

## 🛡️ Veiligheid en Privacy

- **Gegevensbescherming:**
  - De API-sleutel wordt op een veilige manier opgeslagen in Chrome.
  - De uitbreiding slaat uw audio-gegevens niet op; alle verwerking gebeurt realtime.
  - De communicatie met de API's verloopt via beveiligde HTTPS-verbindingen.

Voor volledige informatie over hoe BabelFishAI met uw gegevens omgaat, raadpleegt u onze [Privacy Policy](PRIVACY.md).

## 🔧 Probleemoplossing

- **Microfoonproblemen:**
  - Controleer de microfoon-accessrechten in Chrome.
  - Zorg ervoor dat geen andere applicatie de microfoon tegelijkertijd gebruikt.

- **Fouten in Transcriptie/Vertaling:**
  - Controleer of de API-sleutel geldig en actief is.
  - Zorg voor een stabiele internetverbinding.
  - Raadpleeg de Chrome-console voor gedetailleerde logbestanden in geval van fouten.

## 🤝 Bijdragen

Bijdragen en suggesties zijn welkom. Om bij te dragen:
- Meld bugs via het Issues-gedeelte op GitHub.
- Stel verbeteringen of nieuwe functionaliteiten voor.
- Dien uw pull requests in.

## 📄 Licentie

Deze uitbreiding wordt gedistribueerd onder de GNU Affero General Public License v3.0 (AGPL-3.0). Raadpleeg het bestand LICENSE voor meer details.

## 💝 Steun

Als u deze uitbreiding waardeert, kunt u de ontwikkeling steunen door een donatie te doen via [PayPal](https://paypal.me/jls).
---
Ontwikkeld met passie en innovatie door jls42.org, tilt Babel Fish AI transcriptie en vertaling naar nieuwe hoogten dankzij baanbrekende kunstmatige intelligentie.

**Dit document is vertaald van de versie fr naar de taal nl met behulp van het o3-mini model. Voor meer informatie over het vertaalproces, raadpleeg https://gitlab.com/jls42/ai-powered-markdown-translator**

