# Babel Fish AI - Uitbreiding voor Spraaktranscriptie en Vertaling met AI

**Om de uitbreiding te gebruiken hebt u een OpenAI API-sleutel nodig (of een derde partij als u LiteLLM Proxy gebruikt). U kunt hier een OpenAI API-sleutel genereren: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI is een innovatieve Chrome-extensie oorspronkelijk ontworpen om krachtige spraaktranscriptie te bieden. Zet uw stem nauwkeurig om in tekst met de opmerkelijke precisie van de OpenAI Whisper API en maak, indien gewenst, gebruik van automatische realtime vertaling. U kunt Babel Fish AI uitsluitend voor transcriptie gebruiken of de vertaling on-the-fly activeren afhankelijk van uw behoeften.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Functies

- **Geavanceerde Spraaktranscriptie**
  - Opname van audio van hoge kwaliteit via de microfoon van uw apparaat.
  - Nauwkeurige transcriptie uitgevoerd door de OpenAI Whisper API.
  - Meertalige ondersteuning voor spraakherkenning en tekstantoon, waardoor het mogelijk is spraakopnamen in verschillende talen te transcriberen en de resultaten (transcriptie en vertaling, indien ingeschakeld) in de taal naar keuze weer te geven.
  - Automatische invoeging van de tekst in het actieve veld of weergave in een speciaal dialoogvenster.

- **Geïntegreerde Automatische Vertaling (Optioneel)**
  - Directe vertaling van transcripties naar diverse talen, indien nodig te activeren.
  - Gebruik van een geavanceerd AI-model om een getrouwe vertaling van de oorspronkelijke betekenis te garanderen.
  - Vrije keuze om uitsluitend transcriptie te gebruiken of transcriptie en vertaling te combineren.

- **Intuïtieve en Aanpasbare Gebruikersinterface**
  - Flexibele weergavemodus: actief invoerveld of zwevend dialoogvenster.
  - Configureerbare statusbalk met keuze in kleuren, transparantie en weergaveduur.
  - Sneltoets (Ctrl+Shift+1 of ⌘+Shift+1 op Mac) om de opname te starten/stoppen.
  - Aangepast pictogram, met een microfoon en het cijfer “42”, voor directe herkenning.

- **Geavanceerde Opties**
  - Expertmodus voor gedetailleerde configuraties (API-URL's, domeinconfiguratie, enz.).
  - Mogelijkheid om de transcriptie- en vertaalmodellen aan te passen.
  - Compatibiliteit met LiteLLM Proxy om verbinding te maken met alternatieve taalmodellen en query logging uit te schakelen.
  - Volledige ondersteuning voor internationalisatie dankzij de taalfiles (_locales), wat een interface en spraakondersteuning in meerdere talen biedt.

## 🌐 Ondersteunde Talen

- Arabisch
- Duits
- Engels
- Spaans
- Frans
- Hindi
- Italiaans
- Japans
- Koreaans
- Nederlands
- Pools
- Portugees
- Roemeens
- Zweeds
- Chinees

## 🚀 Installatie

1.  **Download en Installatie:**
    - Cloneer deze repository vanaf GitHub of download handmatig de map van de uitbreiding.
    - Open Chrome en ga naar `chrome://extensions/`.
    - Schakel de "Ontwikkelaarsmodus" in rechtsboven.
    - Klik op "Niet-verpakte uitbreiding laden" en selecteer de Babel Fish AI-map.

2.  **Controle:**
    - Zorg ervoor dat de uitbreiding in de werkbalk van Chrome verschijnt met het aangepaste pictogram.

## ⚙️ Configuratie

1.  **OpenAI API-sleutel:**
    *   Klik op het pictogram van de uitbreiding om de opties te openen.
    *   Voer uw OpenAI API-sleutel in (beschikbaar op [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Aanpassing van de opties:**
    *   Kies de weergavemodus (actief veld of dialoogvenster).
    *   Configureer de kleur, de doorzichtigheid en de weergaveduur van de statusbalk.
    *   Selecteer de talen voor de transcriptie (spraakinvoer) en voor de tekstweergave.
    *   Schakel de vertaalfunctionaliteit in of uit volgens uw behoeften.

3.  **(Optioneel) Gebruik met LiteLLM Proxy:**
    *   Schakel de "Expertmodus" in bij de opties.
    *   Pas in de sectie "Geavanceerde Configuratie" **de beide API-URL's** (Whisper en Vertaling) aan om naar uw LiteLLM Proxy-instantie te wijzen. **Gebruik dezelfde basis-URL voor beide.**
    *   Vink de optie "NoLog (alleen LiteLLM)" aan als u de registratie van verzoeken door LiteLLM wilt uitschakelen.

## 🚀 Gebruik met LiteLLM Proxy

Als u taalmodellen wilt gebruiken die niet van OpenAI zijn, kunt u LiteLLM Proxy gebruiken. Hier leest u hoe u het configureert:

Babel Fish AI is compatibel met [LiteLLM Proxy](https://litellm.ai/), waarmee u alternatieve taalmodellen kunt gebruiken met een API die compatibel is met die van OpenAI.

### Configuratie

1.  **Installeer en configureer LiteLLM Proxy:** Volg de instructies op de LiteLLM-website.
2.  **Configureer de Babel Fish AI-extensie:**
    *   In de opties van de uitbreiding (rechtermuisklik op het pictogram > Opties), schakel de "Expertmodus" in.
    *   Pas in de sectie "Geavanceerde Configuratie" **de beide API-URL's** (Whisper en Vertaling) aan om naar uw LiteLLM Proxy-instantie te wijzen (bijvoorbeeld, `http://localhost:4000/v1/audio/transcriptions` en `http://localhost:4000/v1/chat/completions`). **Gebruik dezelfde basis-URL voor beide.**
    *   Vink de optie "NoLog (alleen LiteLLM)" aan als u de registratie van verzoeken door LiteLLM wilt uitschakelen.

**Belangrijk:** De optie "NoLog" is **uitsluitend** bedoeld voor gebruik met LiteLLM Proxy. **Schakel het niet in** als u de officiële OpenAI API gebruikt, omdat dit een fout zal veroorzaken en de vertaling zal verhinderen.

## 🛠️ Technische Werking

### Architectuur van de uitbreiding

De uitbreiding bestaat uit meerdere JavaScript-bestanden die met elkaar samenwerken:

*   **`manifest.json`:** Het hoofdconfiguratiebestand van de uitbreiding. Het definieert de machtigingen, scripts, toegankelijke bronnen, enz. Het gebruikt versie 3 van het manifest en verklaart de machtigingen `activeTab`, `storage`, `commands` en `scripting`. De `content_scripts` worden in alle URL's geïnjecteerd en draaien aan het einde van het laden van het document.
*   **`background.js`:** De service worker die op de achtergrond draait. Het beheert gebeurtenissen (klik op het pictogram, sneltoetsen), injecteert de `content script` indien nodig, en communiceert met de `content script`.
*   **`content.js`:** Het script dat in webpagina's wordt geïnjecteerd. Het werkt direct met de DOM, neemt audio op van de microfoon, roept de transcriptie- en vertaal-API's aan en toont de resultaten.
*   **`src/utils/api.js`:** Bevat de functie `transcribeAudio` om de OpenAI Whisper API (transcriptie) aan te roepen.
*   **`src/utils/translation.js`:** Bevat de functie `translateText` om de OpenAI GPT API (vertaling) aan te roepen.
*   **`src/utils/ui.js`:** Bevat hulpfuncties voor het beheren van de gebruikersinterface (banner, dialoogvenster, kopieerknop).
*   **`src/constants.js`:** Definieert constanten voor de configuratie, staten, acties, enz.
*   **`src/pages/options/`:** Bevat de bestanden voor de optiespagina van de uitbreiding (HTML, CSS, JavaScript).

### Proces van Transcriptie en Vertaling

1.  **Start van de opname:** De gebruiker start de opname door op het pictogram van de uitbreiding te klikken of door de sneltoets te gebruiken. Het `background script` stuurt een bericht naar het `content script` om de opname te starten.
2.  **Audio-opname:** Het `content script` maakt gebruik van de API `navigator.mediaDevices.getUserMedia` om toegang te krijgen tot de microfoon en audio op te nemen.
3.  **Transcriptie:** Het `content script` maakt gebruik van de functie `transcribeAudio` (`src/utils/api.js`) om de audio naar de OpenAI Whisper API te sturen. De API retourneert de getranscribeerde tekst.
4.  **Vertaling (Optioneel):** Als de vertaaloptie is ingeschakeld, maakt het `content script` gebruik van de functie `translateText` (`src/utils/translation.js`) om de getranscribeerde tekst naar de OpenAI GPT API te sturen. De API retourneert de vertaalde tekst.
5.  **Weergave:** Het `content script` toont de getranscribeerde (en eventueel vertaalde) tekst in het actieve element op de pagina (als het een tekstveld of bewerkbaar element is), of in een dialoogvenster.

### Communicatie

De communicatie tussen het `background script` en het `content script` verloopt via de berichten-API van Chrome (`chrome.runtime.sendMessage` en `chrome.runtime.onMessage`).

### Gegevensopslag

De uitbreiding maakt gebruik van `chrome.storage.sync` om op te slaan:
  
*   De OpenAI API-sleutel (`apiKey`).
*   De opties van de uitbreiding (weergave, vertaling, kleuren van de balk, enz.).

Deze gegevens worden lokaal op uw computer opgeslagen, in de opslag van de Chrome-extensie.

### Foutafhandeling

Mogelijke fouten (ontbrekende API-sleutel, transcriptiefout, enz.) zijn gedefinieerd in het bestand `constants.js`. De functies in `api.js` en `translation.js` handelen potentiële fouten van de API-aanroepen af. Het `content.js` toont foutmeldingen aan de gebruiker via een banner bovenaan de pagina.

## 🛡️ Veiligheid en Privacy

- **Gegevensbescherming:**
  - De API-sleutel wordt veilig opgeslagen in Chrome.
  - De uitbreiding slaat uw audio-gegevens niet op; alle verwerking gebeurt realtime.
  - De communicatie met de API's verloopt via beveiligde HTTPS-verbindingen.

Voor volledige informatie over hoe BabelFishAI uw gegevens beheert, consulteer ons [Privacybeleid](PRIVACY.md).

## 🔧 Probleemoplossing

- **Microfoonproblemen:**
  - Controleer de toegangsrechten tot de microfoon in Chrome.
  - Zorg ervoor dat geen enkele andere applicatie gelijktijdig de microfoon gebruikt.

- **Fouten in Transcriptie/Vertaling:**
  - Controleer of de API-sleutel geldig en actief is.
  - Zorg voor een stabiele internetverbinding.
  - Raadpleeg de Chrome-console voor gedetailleerde loggegevens bij een fout.

## 🤝 Bijdragen

Bijdragen en suggesties zijn welkom. Om bij te dragen:
- Rapporteer bugs via de Issues-sectie op GitHub.
- Stel verbeteringen of nieuwe functionaliteiten voor.
- Dien uw pull requests in.

## 📄 Licentie

Deze uitbreiding wordt verspreid onder de GNU Affero General Public License v3.0 (AGPL-3.0). Raadpleeg het LICENSE-bestand voor meer details.

## 💝 Ondersteuning

Als u deze uitbreiding waardeert, kunt u de ontwikkeling ondersteunen door een donatie te doen via [PayPal](https://paypal.me/jls).

---
Ontwikkeld door jls42.org met passie en innovatie, brengt Babel Fish AI transcriptie en vertaling naar nieuwe hoogten dankzij vooraanstaande kunstmatige intelligentie.

**Dit document is vertaald van de fr-versie naar de nl-taal met behulp van het o3-mini-model. Voor meer informatie over het vertaalproces, raadpleeg https://gitlab.com/jls42/ai-powered-markdown-translator**

