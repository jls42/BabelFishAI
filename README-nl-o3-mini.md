# Babel Fish AI - Uitbreiding voor spraaktranscriptie en vertaling met AI

Babel Fish AI is een innovatieve Chrome-extensie die oorspronkelijk is ontworpen om krachtige spraaktranscriptie te bieden. Zet uw stem om in tekst met opmerkelijke nauwkeurigheid dankzij de Whisper API van OpenAI, en profiteer optioneel van realtime automatische vertaling. U kunt Babel Fish AI uitsluitend gebruiken voor transcriptie of de vertaling on-the-fly inschakelen op basis van uw behoeften.

## 🌟 Functionaliteiten

- **Geavanceerde Spraaktranscriptie**
  - Audio-opname van hoge kwaliteit via de microfoon van uw apparaat.
  - Nauwkeurige transcriptie uitgevoerd door de Whisper API van OpenAI.
  - Meertalige ondersteuning voor spraakverwerking en tekstweergave, waardoor gesproken invoer in verschillende talen wordt getranscribeerd en de resultaten in de door u gewenste taal worden weergegeven.
  - Automatische invoeging van de tekst in het actieve veld of weergave in een speciaal dialoogvenster.

- **Geïntegreerde Automatische Vertaling (Optioneel)**
  - Directe vertaling van transcripties in diverse talen, naar behoefte in te schakelen.
  - Gebruik van een geavanceerd AI-model om een vertaling te garanderen die trouw is aan de oorspronkelijke betekenis.
  - Vrije keuze om uitsluitend transcriptie te gebruiken of transcriptie en vertaling te combineren.

- **Intuïtieve en Aanpasbare Gebruikersinterface**
  - Flexibele weergavemodus: actief invoerveld of zwevend dialoogvenster.
  - Aanpasbare statusbalk met keuze van kleuren, transparantie en weergaveduur.
  - Sneltoets (Ctrl+Shift+1 of ⌘+Shift+1 op Mac) om de opname te starten/stoppen.
  - Aangepast pictogram, met een microfoon en het cijfer “42”, voor directe herkenning.

- **Geavanceerde Opties**
    - Expertsmodus voor gedetailleerde configuraties (API-URLs, domeinconfiguratie, enz.).
    - Mogelijkheid om transcriptie- en vertaalmodellen aan te passen.
    - **Compatibiliteit met LiteLLM Proxy om alternatieve taalmodellen te gebruiken en de querylogging uit te schakelen.**
    - Volledig beheer van internationalisatie dankzij de taalbestanden (_locales), die een interface en spraakondersteuning in meerdere talen bieden.

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
    - Clone deze repository van GitHub of download handmatig de extensiemap.
    - Open Chrome en ga naar `chrome://extensions/`.
    - Schakel de “Ontwikkelaarsmodus” in rechtsboven.
    - Klik op “Ongepakte extensie laden” en selecteer de Babel Fish AI map.

2.  **Verificatie:**
    - Zorg ervoor dat de extensie in de Chrome-werkbalk verschijnt met het aangepaste pictogram.

## ⚙️ Configuratie

1.  **OpenAI API-sleutel:**
    *   Klik op het extensiepictogram om toegang te krijgen tot de opties.
    *   Voer uw OpenAI API-sleutel in (beschikbaar op [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Aanpassing van de Opties:**
    *   Kies de weergavemodus (actief veld of dialoogvenster).
    *   Stel de kleur, transparantie en weergaveduur van de statusbalk in.
    *   Selecteer de talen voor transcriptie (spraakinvoer) en voor de tekstweergave.
    *   Schakel de vertaalfunctionaliteit in of uit, afhankelijk van uw behoeften.

3.  **(Optioneel) Gebruik met LiteLLM Proxy:**
    *   Schakel de “Expertsmodus” in de opties in.
    *   Wijzig in de sectie “Geavanceerde Configuratie” **de twee URLs** van de API's (Whisper en Vertaling) zodat ze naar uw LiteLLM Proxy-instantie wijzen. **Gebruik dezelfde basis-URL voor beide.**
    *   Vink de optie “NoLog (alleen LiteLLM)” aan als u de querylogging van LiteLLM wilt uitschakelen.

## 🚀 Gebruik met LiteLLM Proxy

Babel Fish AI is compatibel met [LiteLLM Proxy](https://litellm.ai/), waarmee alternatieve taalmodellen kunnen worden gebruikt met een API die compatibel is met die van OpenAI.

### Configuratie

1.  **Installeer en configureer LiteLLM Proxy:** Volg de instructies op de LiteLLM-website.
2.  **Configureer de Babel Fish AI-extensie:**
    *   In de extensie-opties (rechtermuisklik op het pictogram > Opties) schakelt u de “Expertsmodus” in.
    *   Wijzig in de sectie “Geavanceerde Configuratie” **de twee URLs** van de API's (Whisper en Vertaling) zodat ze naar uw LiteLLM Proxy-instantie wijzen (bijvoorbeeld, `http://localhost:4000/v1/audio/transcriptions` en `http://localhost:4000/v1/chat/completions`). **Gebruik dezelfde basis-URL voor beide.**
    *   Vink de optie “NoLog (alleen LiteLLM)” aan als u de querylogging van LiteLLM wilt uitschakelen.

**Belangrijk:** De “NoLog”-optie is **uitsluitend** bedoeld voor gebruik met LiteLLM Proxy. **Schakel deze niet in** als u de officiële OpenAI API gebruikt, want dit zal een fout veroorzaken en de vertaling verhinderen.

## 🛠️ Technische Werking

### Architectuur van de Extensie

De extensie bestaat uit verschillende JavaScript-bestanden die met elkaar communiceren:

*   **`manifest.json`:** Het hoofdbestand voor de configuratie van de extensie. Het definieert de permissies, scripts, toegankelijke middelen, enz. Het maakt gebruik van versie 3 van het manifest en declareert de permissies `activeTab`, `storage`, `commands` en `scripting`. De `content_scripts` worden geïnjecteerd in alle URLs en uitgevoerd aan het einde van het laden van het document.
*   **`background.js`:** De service worker die op de achtergrond draait. Hij beheert gebeurtenissen (klik op het pictogram, sneltoetsen), injecteert het `content script` indien nodig en communiceert met het `content script`.
*   **`content.js`:** Het script dat in webpagina's wordt geïnjecteerd. Het communiceert direct met de DOM, neemt audio op via de microfoon, roept de transcriptie- en vertaal-API's aan en geeft de resultaten weer.
*   **`src/utils/api.js`:** Bevat de functie `transcribeAudio` om de OpenAI Whisper API aan te roepen (transcriptie).
*   **`src/utils/translation.js`:** Bevat de functie `translateText` om de OpenAI GPT API aan te roepen (vertaling).
*   **`src/utils/ui.js`:** Bevat hulpfuncties voor het beheren van de gebruikersinterface (banner, dialoogvenster, kopieerknop).
*   **`src/constants.js`:** Definieert constanten voor de configuratie, statussen, acties, enz.
*   **`src/pages/options/`:** Bevat de bestanden voor de optiepagina van de extensie (HTML, CSS, JavaScript).

### Proces van Transcriptie en Vertaling

1.  **Start van de Opname:** De gebruiker start de opname door op het extensiepictogram te klikken of via de sneltoets. Het `background script` stuurt een bericht naar het `content script` om de opname te starten.
2.  **Audio-opname:** Het `content script` gebruikt de API `navigator.mediaDevices.getUserMedia` om toegang te krijgen tot de microfoon en audio op te nemen.
3.  **Transcriptie:** Het `content script` gebruikt de functie `transcribeAudio` (`src/utils/api.js`) om de audio naar de OpenAI Whisper API te sturen. De API retourneert de getranscribeerde tekst.
4.  **Vertaling (Optioneel):** Als de vertaaloptie is ingeschakeld, gebruikt het `content script` de functie `translateText` (`src/utils/translation.js`) om de getranscribeerde tekst naar de OpenAI GPT API te sturen. De API retourneert de vertaalde tekst.
5.  **Weergave:** Het `content script` toont de getranscribeerde (en eventueel vertaalde) tekst, hetzij in het actieve element van de pagina (als dit een tekstveld of een bewerkbaar element is), hetzij in een dialoogvenster.

### Communicatie

De communicatie tussen het `background script` en het `content script` gebeurt via de Chrome messaging API (`chrome.runtime.sendMessage` en `chrome.runtime.onMessage`).

### Gegevensopslag

De extensie maakt gebruik van `chrome.storage.sync` om op te slaan:

*   De OpenAI API-sleutel (`apiKey`).
*   De opties van de extensie (weergave, vertaling, kleuren van de statusbalk, enz.).

### Foutafhandeling
Mogelijke fouten (ontbrekende API-sleutel, transcriptiefout, enz.) worden gedefinieerd in het bestand `constants.js`. De functies in `api.js` en `translation.js` handelen potentiële fouten van de API-aanroepen af. Het `content.js` toont foutmeldingen aan de gebruiker via een banner bovenaan de pagina.

## 🛡️ Beveiliging en Privacy

- **Gegevensbescherming:**
  - De API-sleutel wordt op een veilige manier opgeslagen in Chrome.
  - De extensie slaat uw audiogegevens niet op; alle verwerking vindt realtime plaats.
  - De communicatie met de API's verloopt via beveiligde HTTPS-verbindingen.

## 🔧 Probleemoplossing

- **Problemen met de Microfoon:**
  - Controleer de microfoon-toegangsmachtigingen in Chrome.
  - Zorg ervoor dat geen andere applicatie de microfoon tegelijkertijd gebruikt.

- **Fouten bij Transcriptie/Vertaling:**
  - Controleer of de API-sleutel geldig en actief is.
  - Zorg voor een stabiele internetverbinding.
  - Raadpleeg de Chrome-console voor gedetailleerde logs bij fouten.

## 🤝 Bijdragen

Bijdragen en suggesties zijn welkom. Om bij te dragen:
- Meld bugs via de Issues-sectie op GitHub.
- Stel verbeteringen of nieuwe functionaliteiten voor.
- Dien uw pull requests in.

## 📄 Licentie

Deze extensie wordt gedistribueerd onder de GNU Affero General Public License v3.0 (AGPL-3.0). Raadpleeg het LICENSE-bestand voor meer details.

## 💝 Steun

Als u deze extensie waardeert, kunt u de ontwikkeling ondersteunen door een donatie te doen via [PayPal](https://paypal.me/jls).

---
Ontwikkeld door jls42.org met passie en innovatie, stuwt Babel Fish AI transcriptie en vertaling naar nieuwe hoogten dankzij toonaangevende kunstmatige intelligentie.

**Dit document is vertaald van de versie fr naar de taal nl met behulp van het model o3-mini. Voor meer informatie over het vertaalproces, raadpleeg https://gitlab.com/jls42/ai-powered-markdown-translator**

