# Babel Fish AI - Extensie voor Spraaktranscriptie en Vertaling met AI

Babel Fish AI is een innovatieve Chrome-extensie die oorspronkelijk is ontworpen om krachtige spraaktranscriptie te bieden. Transformeer uw stem in tekst met een opmerkelijke nauwkeurigheid dankzij de Whisper API van OpenAI en maak optioneel gebruik van een automatische realtime vertaling. U kunt Babel Fish AI exclusief gebruiken voor transcriptie of de vertaling direct activeren, afhankelijk van uw behoeften.

## 🌟 Functies

- **Geavanceerde Spraaktranscriptie**
  - Hoogwaardige audio-opname via de microfoon van uw apparaat.
  - Nauwkeurige transcriptie uitgevoerd door de Whisper API van OpenAI.
  - Meertalige ondersteuning voor de verwerking van spraak en de weergave van tekst, waarmee spraakinputs in verschillende talen getranscribeerd kunnen worden en de resultaten in de taal van uw keuze weergegeven worden.
  - Automatische invoeging van de tekst in het actieve veld of weergave in een speciaal dialoogvenster.

- **Geïntegreerde Automatische Vertaling (Optioneel)**
  - Directe vertaling van transcripties in diverse talen, te activeren indien nodig.
  - Gebruik van een geavanceerd AI-model om een vertaling te garanderen die trouw blijft aan de oorspronkelijke betekenis.
  - Vrije keuze om uitsluitend transcriptie te gebruiken of transcriptie en vertaling te combineren.

- **Intuïtieve en Aanpasbare Gebruikersinterface**
  - Flexibele weergavemodus: actief invoerveld of zwevend dialoogvenster.
  - Aanpasbare statusbalk met keuze voor kleuren, doorzichtigheid en weergaveduur.
  - Toetsenbord snelkoppeling (Ctrl+Shift+1 of ⌘+Shift+1 op Mac) om de opname te starten/stoppen.
  - Aangepast pictogram, met een microfoon en het cijfer “42”, voor directe herkenning.

- **Geavanceerde Opties**
  - Expertmodus voor gedetailleerde configuraties (API-URL’s, domein-specifieke configuratie, etc.).
  - Mogelijkheid om transcriptie- en vertaalmodellen aan te passen.
  - Volledige ondersteuning voor internationalisatie dankzij de taalbestanden (_locales), die een interface en spraakondersteuning in meerdere talen bieden.

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

1. **Download en Installatie:**
   - Clone deze repository vanaf GitHub of download handmatig de map van de extensie.
   - Open Chrome en ga naar `chrome://extensions/`.
   - Schakel de "Ontwikkelaarsmodus" rechtsboven in.
   - Klik op "Niet-ingepakte extensie laden" en selecteer de map van Babel Fish AI.

2. **Verificatie:**
   - Zorg ervoor dat de extensie verschijnt in de werkbalk van Chrome met het aangepaste pictogram.

## ⚙️ Configuratie

1. **OpenAI API-sleutel:**
   - Klik op het extensiepictogram om de opties te openen.
   - Voer uw OpenAI API-sleutel in (beschikbaar op [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Aanpassing van de Opties:**
   - Kies de weergavemodus (actief invoerveld of dialoogvenster).
   - Configureer de kleur, doorzichtigheid en de weergaveduur van de statusbalk.
   - Selecteer de talen voor de transcriptie (spraakinput) en voor de weergave van de tekst.
   - Schakel de vertaalfunctie in of uit afhankelijk van uw behoeften.

## 🛠️ Technische Werking

- **Architectuur van de Extensie:**
  - **Manifest V3:** Het bestand `manifest.json` definieert de inhoudsscripts, de service worker (`background.js`) en de benodigde permissies.
  - **Achtergrond- en Inhoudsscripts:** Het bestand `background.js` beheert de logica op de achtergrond en de communicatie met de API’s, terwijl `content.js` zorgt voor de interactie met de actieve webpagina.
  - **Hulpprogramma’s en Internationalisatie:** De map `src/utils` bevat modules voor het beheren van de API, de gebruikersinterface, de vertaling en internationalisatie via taalbestanden in de map `_locales`.

- **Proces van Transcriptie en Vertaling:**
  1. **Start van de Opname:** De extensie vangt uw stem op via de microfoon wanneer u op het pictogram klikt of de snelkoppeling gebruikt.
  2. **Transcriptie:** De audio wordt naar de Whisper API van OpenAI gestuurd om in tekst te worden omgezet, met ondersteuning voor meerdere invoertalen.
  3. **Vertaling (Optioneel):** Indien ingeschakeld, wordt de transcriptie automatisch vertaald naar de geselecteerde doeltaal, terwijl de betekenis en context behouden blijven.
  4. **Weergave:** De getranscribeerde (en eventueel vertaalde) tekst wordt ingevoegd in het actieve veld of weergegeven in een aangepast dialoogvenster.

## 🛡️ Veiligheid en Privacy

- **Gegevensbescherming:**
  - De API-sleutel wordt veilig opgeslagen in Chrome.
  - De extensie slaat uw audio niet op; alle verwerking vindt realtime plaats.
  - De communicatie met de API’s verloopt via beveiligde HTTPS-verbindingen.

## 🔧 Probleemoplossing

- **Problemen met de Microfoon:**
  - Controleer de microfoon-toestemmingen in Chrome.
  - Zorg ervoor dat geen andere applicatie de microfoon tegelijkertijd gebruikt.

- **Fouten bij Transcriptie/Vertaling:**
  - Controleer of de API-sleutel geldig en actief is.
  - Zorg voor een stabiele internetverbinding.
  - Bekijk de Chrome-console voor gedetailleerde logboeken in geval van fouten.

## 🤝 Bijdrage

Bijdragen en suggesties zijn welkom. Om bij te dragen:
- Rapporteer bugs via de Issues-sectie op GitHub.
- Doe voorstellen voor verbeteringen of nieuwe functies.
- Dien uw pull requests in.

## 📄 Licentie

Deze extensie wordt verspreid onder de GNU Affero General Public License v3.0 (AGPL-3.0). Raadpleeg het bestand LICENSE voor meer details.

## 💝 Ondersteuning

Als u deze extensie waardeert, kunt u de ontwikkeling ondersteunen door een donatie te doen via [PayPal](https://paypal.me/jls).

---
Ontwikkeld door jls42.org met passie en innovatie, stuwt Babel Fish AI transcriptie en vertaling naar nieuwe hoogten dankzij geavanceerde kunstmatige intelligentie.

**Dit document is vertaald van de fr-versie naar de nl-taal met behulp van het o3-mini model. Voor meer informatie over het vertaalproces, raadpleeg https://gitlab.com/jls42/ai-powered-markdown-translator**

