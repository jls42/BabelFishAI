# Babel Fish AI - Uitbreiding voor Spraaktranscriptie en Vertaling met AI

Babel Fish AI is een innovatieve Chrome-extensie die oorspronkelijk is ontworpen om krachtige spraaktranscriptie te bieden. Zet je stem om in tekst met opmerkelijke precisie dankzij de OpenAI Whisper API en geniet optioneel van automatische realtime vertaling. Je kunt Babel Fish AI uitsluitend voor transcriptie gebruiken of de vertaling activeren afhankelijk van je behoeften.

## 🌟 Functies

- **Geavanceerde Spraaktranscriptie**
  - Audio van hoge kwaliteit vastleggen via de microfoon van je apparaat.
  - Nauwkeurige transcriptie uitgevoerd door de OpenAI Whisper API.
  - Ondersteuning van meerdere talen voor spraakverwerking en tekstweergave, zodat gesproken invoer in diverse talen kan worden getranscribeerd en de resultaten worden weergegeven in de door jou gekozen taal.
  - Automatische invoeging van de tekst in het actieve veld of weergave in een speciaal dialoogvenster.

- **Geïntegreerde Automatische Vertaling (Optioneel)**
  - Onmiddellijke vertaling van de transcripties naar diverse talen, te activeren indien nodig.
  - Gebruik van een geavanceerd AI-model om een vertaling te garanderen die trouw blijft aan de oorspronkelijke betekenis.
  - Vrije keuze om uitsluitend transcriptie te gebruiken of transcriptie en vertaling te combineren.

- **Intuïtieve en Aanpasbare Gebruikersinterface**
  - Flexibele weergavemodus: actief invoerveld of zwevend dialoogvenster.
  - Conﬁgureerbare statusbalk met keuze van kleuren, doorzichtigheid en weergaveduur.
  - Toetsenbord snelkoppeling (Ctrl+Shift+1 of ⌘+Shift+1 op Mac) om de opname te starten/stoppen.
  - Aangepast pictogram, met een microfoon en het cijfer “42”, voor onmiddellijke herkenning.

- **Geavanceerde Opties**
  - Expertmodus voor gedetailleerde configuraties (API-URLs, domeinspecifieke configuratie, enz.).
  - Mogelijkheid om de transcriptie- en vertaalmodellen aan te passen.
  - Volledige beheer van internationalisatie via taalbestanden (_locales), waardoor een interface en spraakondersteuning in meerdere talen wordt geboden.

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

1. **Downloaden en Installeren:**
   - Clone deze repository van GitHub of download handmatig de map van de extensie.
   - Open Chrome en ga naar `chrome://extensions/`.
   - Schakel de “Ontwikkelaarsmodus” in rechtsboven.
   - Klik op “Pak ongepakte extensie in” en selecteer de map van Babel Fish AI.

2. **Verificatie:**
   - Zorg ervoor dat de extensie verschijnt in de werkbalk van Chrome met het aangepaste pictogram.

## ⚙️ Configuratie

1. **OpenAI API-sleutel:**
   - Klik op het extensiepictogram om bij de opties te komen.
   - Voer je OpenAI API-sleutel in (beschikbaar op [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Aanpassen van de Opties:**
   - Kies de weergavemodus (actief veld of dialoogvenster).
   - Stel de kleur, doorzichtigheid en weergaveduur van de statusbalk in.
   - Selecteer de talen voor de transcriptie (spraakinvoer) en voor de tekstweergave.
   - Schakel de vertaalfunctie in of uit afhankelijk van je behoeften.

## 🛠️ Technische Werking

### Architectuur van de Extensie

De extensie bestaat uit meerdere JavaScript-bestanden die met elkaar communiceren:

*   **`manifest.json`:** Het hoofdconfiguratiebestand van de extensie. Het definieert de machtigingen, scripts, toegankelijke bronnen, enz. Het gebruikt versie 3 van het manifest en declareert de machtigingen `activeTab`, `storage`, `commands` en `scripting`. De `content_scripts` worden geïnjecteerd op alle URLs en uitgevoerd aan het einde van het laden van het document.
*   **`background.js`:** De serviceworker die op de achtergrond draait. Hij beheert de gebeurtenissen (klik op het pictogram, sneltoetsen), injecteert het `content script` indien nodig, en communiceert met het `content script`.
*   **`content.js`:** Het script dat wordt geïnjecteerd in webpagina’s. Het communiceert direct met de DOM, vangt audio van de microfoon op, roept de transcriptie- en vertaal-API’s aan en toont de resultaten.
*   **`src/utils/api.js`:** Bevat de functie `transcribeAudio` om de OpenAI Whisper API aan te roepen (transcriptie).
*   **`src/utils/translation.js`:** Bevat de functie `translateText` om de OpenAI GPT API aan te roepen (vertaling).
*   **`src/utils/ui.js`:** Bevat hulpfuncties voor het beheer van de gebruikersinterface (banner, dialoogvenster, kopieerknop).
*   **`src/constants.js`:** Definieert constanten voor de configuratie, statussen, acties, enz.
*   **`src/pages/options/`:** Bevat de bestanden voor de optiespagina van de extensie (HTML, CSS, JavaScript).

### Proces van Transcriptie en Vertaling

1.  **Start van de Opname:** De gebruiker start de opname door op het extensiepictogram te klikken of door de sneltoets te gebruiken. Het `background script` stuurt een bericht naar het `content script` om de opname te starten.
2.  **Audio Vastleggen:** Het `content script` maakt gebruik van de API `navigator.mediaDevices.getUserMedia` om toegang te krijgen tot de microfoon en de audio op te nemen.
3.  **Transcriptie:** Het `content script` gebruikt de functie `transcribeAudio` (`src/utils/api.js`) om de audio naar de OpenAI Whisper API te sturen. De API retourneert de getranscribeerde tekst.
4.  **Vertaling (Optioneel):** Als de vertaaloptie is ingeschakeld, gebruikt het `content script` de functie `translateText` (`src/utils/translation.js`) om de getranscribeerde tekst naar de OpenAI GPT API te sturen. De API retourneert de vertaalde tekst.
5.  **Weergave:** Het `content script` toont de getranscribeerde tekst (en eventueel vertaald) in het actieve element van de pagina (als het een tekstveld of bewerkbaar element betreft) of in een dialoogvenster.

### Communicatie

De communicatie tussen het `background script` en het `content script` verloopt via de berichten-API van Chrome (`chrome.runtime.sendMessage` en `chrome.runtime.onMessage`).

### Dataopslag

De extensie gebruikt `chrome.storage.sync` om op te slaan:

*   De OpenAI API-sleutel (`apiKey`).
*   De opties van de extensie (weergave, vertaling, kleuren van de balk, enz.).

### Foutafhandeling
Mogelijke fouten (ontbrekende API-sleutel, transcriptiefout, enz.) zijn gedefinieerd in het bestand `constants.js`. De functies in `api.js` en `translation.js` handelen mogelijke fouten bij de API-aanroepen af. Het `content.js` toont foutmeldingen aan de gebruiker via een banner bovenaan de pagina.

## 🛡️ Beveiliging en Privacy

- **Gegevensbescherming:**
  - De API-sleutel wordt op een veilige manier in Chrome opgeslagen.
  - De extensie slaat je audiogegevens niet op; alle verwerking gebeurt realtime.
  - De communicatie met de API’s verloopt via beveiligde HTTPS-verbindingen.

## 🔧 Probleemoplossing

- **Microfoonproblemen:**
  - Controleer de machtigingen voor microfoontoegang in Chrome.
  - Zorg ervoor dat geen andere applicatie tegelijkertijd de microfoon gebruikt.

- **Fouten bij Transcriptie/Vertaling:**
  - Controleer of de API-sleutel geldig en actief is.
  - Zorg voor een stabiele internetverbinding.
  - Raadpleeg de Chrome-console voor gedetailleerde loggegevens bij fouten.

## 🤝 Bijdragen

Bijdragen en suggesties zijn welkom. Om bij te dragen:
- Meld bugs via de Issues-sectie op GitHub.
- Doe voorstellen voor verbeteringen of nieuwe functies.
- Dien je pull requests in.

## 📄 Licentie

Deze extensie wordt gedistribueerd onder de GNU Affero General Public License v3.0 (AGPL-3.0). Raadpleeg het bestand LICENSE voor meer details.

## 💝 Ondersteuning

Als je deze extensie waardeert, kun je de ontwikkeling steunen door een donatie te doen via [PayPal](https://paypal.me/jls).

---
Ontwikkeld door jls42.org met passie en innovatie brengt Babel Fish AI transcriptie en vertaling naar nieuwe hoogten dankzij baanbrekende kunstmatige intelligentie.

**Dit document is vertaald van de fr-versie naar de nl-taal met behulp van het o3-mini model. Voor meer informatie over het vertaalproces, raadpleeg https://gitlab.com/jls42/ai-powered-markdown-translator**

