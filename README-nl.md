**Artikel vertaald van het Frans naar het Nederlands met gpt-5.6-sol.**

# Babel Fish AI - Extensie voor spraaktranscriptie en vertaling met AI

<img src="images/icon128.png" alt="Babel Fish AI-pictogram" width="128" height="128">

**Officiële website: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**Om de extensie te gebruiken, hebt u een API-sleutel van een van de ondersteunde providers nodig:**

|                             Provider                             | Een API-sleutel verkrijgen                                                                       |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
|   <img src="images/gemini-logo.png" alt="Gemini" height="30">    | **Gemini (Google)**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)            |
|                                🚅                                | **Custom/LiteLLM**: om uw eigen API-endpoints te gebruiken                                      |

Babel Fish AI is een innovatieve browserextensie die krachtige spraaktranscriptie met ondersteuning voor meerdere providers biedt. Zet uw stem met opmerkelijke nauwkeurigheid om in tekst dankzij de transcriptie-API's van Mistral AI (Voxtral), OpenAI (gpt-transcribe, Whisper) of Gemini (Gemini 3.5 Transcribe) en maak desgewenst gebruik van automatische vertaling in realtime. U kunt Babel Fish AI uitsluitend voor transcriptie gebruiken of vertaling tijdens het transcriberen inschakelen, afhankelijk van uw behoeften.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Functies

-   **Geavanceerde spraaktranscriptie**

    -   Audio-opname van hoge kwaliteit via de microfoon van uw apparaat.
    -   Nauwkeurige transcriptie via de API's Voxtral (Mistral AI), gpt-transcribe en Whisper (OpenAI) of Gemini 3.5 Transcribe (Google).
    -   Ondersteuning voor meerdere providers: kies vrij tussen Mistral AI, OpenAI, Gemini of een aangepast endpoint.
    -   Meertalige ondersteuning voor spraakherkenning en tekstweergave, zodat gesproken invoer in verschillende talen kan worden getranscribeerd en de resultaten (transcriptie en vertaling, indien ingeschakeld) in de taal van uw keuze kunnen worden weergegeven.
    -   Automatische invoeging van de tekst in het actieve veld of weergave in een speciaal dialoogvenster.

-   **Intelligente vertaling en herformulering**

    -   Onmiddellijke vertaling van transcripties naar verschillende talen, indien gewenst in te schakelen.
    -   Herformulering van tekst om stijl en duidelijkheid te verbeteren.
    -   Gebruik van een geavanceerd AI-model om een vertaling te garanderen die trouw blijft aan de oorspronkelijke betekenis.
    -   Vrije keuze om uitsluitend transcriptie te gebruiken of transcriptie en vertaling te combineren.

-   **Krachtig contextmenu**

    -   Optie "Selectie herformuleren" om uw geselecteerde teksten direct te verbeteren.
    -   Optie "Selectie vertalen" met een submenu van alle beschikbare talen.
    -   Optie "Spelling corrigeren" om spel-, grammatica- en interpunctiefouten te corrigeren.
    -   Directe vervanging van de geselecteerde tekst door de vertaalde, geherformuleerde of gecorrigeerde versie.
    -   Naadloze integratie in de eigen gebruikersinterface van de browser.

-   **Intuïtieve en aanpasbare gebruikersinterface**

    -   Flexibele weergavemodus: actief invoerveld of zwevend dialoogvenster.
    -   Configureerbare statusbalk met instelbare kleuren, dekking en weergaveduur.
    -   Sneltoets (Ctrl+Shift+1 of ⌘+Shift+1 op Mac) om de opname te starten/stoppen.
    -   In Firefox een „prioritaire sneltoets” voor websites waarvan de pagina-editor de toetsencombinatie onderschept (ChatGPT, Notion…): actief vanaf de installatie en uit te schakelen via de opties (zie [PRIVACY.md](PRIVACY.md)).
    -   Optie "Openhouden" om de weergaveduur van de resultaten te bepalen.
    -   Aangepast pictogram met een microfoon en het getal "42" voor directe herkenning.

-   **Geavanceerde opties**
    -   Ondersteuning voor meerdere providers: Mistral AI, OpenAI, Gemini en Custom/LiteLLM voor maximale flexibiliteit.
    -   Mogelijkheid om de transcriptie- en vertaalmodellen per provider aan te passen.
    -   Beschikbare OpenAI-modellen: GPT-4o mini (standaard), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** en **GPT-5.6 (luna/terra/sol)**. Transcriptie: **gpt-transcribe** (standaard), whisper-1, gpt-4o-mini-transcribe en gpt-4o-transcribe. OpenAI verwijdert deze laatste drie op 26-02-2027 uit zijn API; een model dat al in de opties is gekozen, blijft tot die datum in gebruik.
    -   Beschikbare Mistral-modellen: Mistral Small (standaard), Mistral Medium, Mistral Large, Codestral en **Ministral 3 (3B/8B/14B)**. Transcriptie: Voxtral Mini. Antwoorden van redenerende Mistral-modellen (denkblokken) worden ondersteund.
    -   Beschikbare Gemini-modellen: **Gemini 3.8 Flash** (standaard, met beperkt redeneren om binnen één tot twee seconden te antwoorden) en **Gemini 3.5 Flash-Lite** (het snelste). Transcriptie: **Gemini 3.5 Transcribe**, via de Interactions API van Google, zonder dictees in de geschiedenis van deze API op te slaan (`store: false`, zie [docs/providers/gemini.md](docs/providers/gemini.md)).
    -   Instellingen die gpt-4.1-nano (stopzetting van de OpenAI API op 23-10-2026) of gpt-4o gebruikten, worden bij de update automatisch omgezet naar respectievelijk gpt-5.6-luna en gpt-4.1.
    -   Onafhankelijke selectie van de provider voor transcriptie en vertaling/herformulering.
    -   Compatibiliteit met LiteLLM Proxy via de Custom-provider om verbinding te maken met alternatieve modellen.
    -   Volledig beheer van internationalisering dankzij taalbestanden (\_locales), voor een meertalige interface en spraakondersteuning.

## 🌐 Ondersteunde talen

Hier volgt de lijst met talen die door Babel Fish AI worden ondersteund, met links naar demonstratievideo's:

-   [Arabisch](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [Duits](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [Engels](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [Spaans](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [Frans](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [Italiaans](https://www.youtube.com/watch?v=QgYZt8myods)
-   [Japans](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [Koreaans](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [Nederlands](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [Pools](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [Portugees](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [Roemeens](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [Zweeds](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [Chinees](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installatie

### Chrome

1.  **Downloaden en installeren:**

    -   Kloon deze repository vanaf GitHub of download de map van de extensie handmatig.
    -   **Of installeer de extensie rechtstreeks vanuit de [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   Open Chrome en ga naar `chrome://extensions/`.
    -   Schakel rechtsboven de „Ontwikkelaarsmodus” in.
    -   Klik op „Uitgepakte extensie laden” en selecteer de map van Babel Fish AI.

2.  **Controle:**
    -   Controleer of de extensie met het aangepaste pictogram in de werkbalk van de browser verschijnt.

### Firefox

1.  **Downloaden en installeren:**

    -   **Firefox 140 of hoger** (desktop) is vereist vanaf versie 1.2.0. Tijdens de installatie en bij het bijwerken naar versie 1.2.0 toont Firefox de gegevens die de extensie naar de door u geconfigureerde provider verzendt: uw stem, de geselecteerde of gedicteerde tekst en uw API-sleutel (zie [PRIVACY.md](PRIVACY.md)).
    -   **Installeer de extensie rechtstreeks vanuit [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   Of voor handmatige installatie: kloon deze repository vanaf GitHub en voer vervolgens `./scripts/build.sh firefox` uit, waarmee `dist/firefox/` wordt voorbereid met het Firefox-manifest hernoemd naar `manifest.json`.
    -   Open Firefox en ga naar `about:debugging#/runtime/this-firefox` (en niet naar „Add-on installeren vanuit bestand” in `about:addons`, dat is voorbehouden aan ondertekende extensies).
    -   Klik op „Tijdelijke add-on laden...”.
    -   Selecteer het bestand `dist/firefox/manifest.json`.

2.  **Controle:**
    -   Controleer of de extensie met het aangepaste pictogram in de werkbalk van Firefox verschijnt.

## ⚙️ Configuratie

1.  **Configuratie van de AI-provider:**

    -   Klik op het pictogram van de extensie om de opties te openen.
    -   Selecteer uw provider in het keuzemenu (Mistral AI, OpenAI, Gemini of Custom/LiteLLM).
    -   Voer uw API-sleutel in:
        -   **Mistral AI**: beschikbaar op [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: beschikbaar op [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
        -   **Gemini**: beschikbaar op [aistudio.google.com/apikey](https://aistudio.google.com/apikey). Gebruik bij voorkeur een sleutel van een project waarvoor facturering is ingeschakeld: als u een gratis sleutel gebruikt en u zich buiten de Europese Economische Ruimte, Zwitserland en het Verenigd Koninkrijk bevindt, kan Google uw dictees en verzonden teksten gebruiken om zijn producten te verbeteren, mogelijk met menselijke beoordeling; verstuur geen persoonlijke, gevoelige of vertrouwelijke informatie. Beperk de sleutel tot de Gemini API (de standaardinstelling voor nieuwe sleutels), nooit tot websites: in Chrome worden de verzoeken verzonden vanaf de pagina waarop u dicteert.
    -   Activeer de provider met de schakelaar naast het keuzemenu.

2.  **Opties aanpassen:**

    -   Kies de weergavemodus (actief veld of dialoogvenster).
    -   Stel de kleur, dekking en weergaveduur van de statusbalk in.
    -   Selecteer de talen voor transcriptie (gesproken invoer) en voor de tekstweergave.
    -   Schakel de vertaalfunctie naar behoefte in of uit.

3.  **(Optioneel) Geavanceerde modelconfiguratie:**

    -   Klik in de opties van elke provider op "Modelconfiguratie" om de gebruikte modellen aan te passen.
    -   U kunt aangepaste modellen toevoegen voor transcriptie en vertaling/herformulering.
    -   Als meerdere providers zijn ingeschakeld, kunt u kiezen welke voor elke dienst (transcriptie en vertaling) moet worden gebruikt.

4.  **Meerdere gesynchroniseerde apparaten:**
    -   Werk de extensie op al uw apparaten bij. Een versie ouder dan 1.2.0 kent Gemini niet: als Gemini is geselecteerd, gebruikt die versie een oudere provider die u hebt geactiveerd, of verzendt ze niets.
    -   Als een nieuwere versie van de extensie een provider heeft opgeslagen die uw versie nog niet kent, wordt dit op de optiepagina gemeld in het gedeelte „Providers uit een nieuwere versie”, met een knop om de instellingen ervan op al uw apparaten te wissen.
    -   Als de browser weigert uw opties op te slaan (bijvoorbeeld omdat een waarde te lang is), toont de pagina de fout in plaats van „Opties opgeslagen!” en wordt er niets opgeslagen.

## 🚀 Gebruik met LiteLLM Proxy of aangepaste endpoints

Babel Fish AI is compatibel met [LiteLLM Proxy](https://litellm.ai/) en andere met OpenAI compatibele API-proxy's, zodat alternatieve taalmodellen kunnen worden gebruikt.

### Configuratie

1.  **Installeer en configureer uw proxy:** volg de instructies van de dienst die u gebruikt (LiteLLM enz.).
2.  **Configureer de Babel Fish AI-extensie:**
    -   Selecteer in de opties van de extensie de provider **Custom/LiteLLM** in het keuzemenu.
    -   Voer uw API-sleutel in (indien nodig).
    -   Configureer de API-URL's:
        -   **Transcriptie-URL**: bijvoorbeeld `http://localhost:4000/v1/audio/transcriptions`
        -   **Chat-URL**: bijvoorbeeld `http://localhost:4000/v1/chat/completions`
    -   Activeer de provider met de schakelaar.
    -   Vink de optie **"NoLog"** aan als u de registratie van verzoeken door LiteLLM wilt uitschakelen.

**Belangrijk:** de optie "NoLog" is **uitsluitend** beschikbaar bij de provider Custom/LiteLLM. Ze is niet compatibel met de officiële API's van OpenAI, Mistral AI of Gemini.

## 🛠️ Technische werking

### Architectuur van de extensie

De extensie bestaat uit verschillende JavaScript-bestanden die met elkaar samenwerken:

#### Hoofdbestanden

-   **`manifest.json`:** Het hoofdconfiguratiebestand van de extensie. Het definieert de machtigingen, scripts, toegankelijke bronnen enz. Het gebruikt manifestversie 3 en declareert de machtigingen `activeTab`, `storage`, `commands`, `scripting` en `contextMenus`.
-   **`background.js`:** De service worker die op de achtergrond wordt uitgevoerd. Deze verwerkt gebeurtenissen (klikken op het pictogram, sneltoetsen, contextmenu), injecteert indien nodig `content script` en communiceert met `content script`.
-   **`content.js`:** Het hoofdscript dat in webpagina's wordt geïnjecteerd. Het coördineert de verschillende hulpmodules en beheert de algemene werking van de extensie.
-   **`src/constants.js`:** Definieert constanten voor de configuratie, statussen, acties enz.

#### Hulpmodules

De extensie gebruikt een modulaire architectuur met verschillende gespecialiseerde hulpbestanden:

##### Beheer van providers en API's

-   **`src/utils/providers.js`:** Register van AI-providers (Mistral AI, OpenAI, Gemini, Custom/LiteLLM) met hun configuraties, modellen en standaard-URL's.
-   **`src/utils/provider-store.js`:** Leest de providerinstellingen uit de opslag en controleert dat een API-sleutel alleen naar de adressen van de bijbehorende provider wordt verzonden.
-   **`src/utils/provider-adapters.js`:** API-indelingen van de providers: authenticatie, verzoekinhoud en verwerking van antwoorden en fouten.
-   **`src/utils/api-utils.js`:** Functies voor interactie met externe API's, het bepalen van de configuratie voor meerdere providers en audiotranscriptie.
-   **`src/utils/text-processing.js`:** Functies voor tekstverwerking: vertaling, herformulering en spellingscorrectie.

##### Gebruikersinterface en interactie

-   **`src/utils/ui.js`:** Algemene hulpfuncties voor de gebruikersinterface.
-   **`src/utils/banner-utils.js`:** Beheert de statusbalk, de bedieningselementen ervan en de taalkiezer.
-   **`src/utils/focus-utils.js`:** Beheert het opslaan en herstellen van de focus en tekstselectie.
-   **`src/utils/transcription-display.js`:** Beheert de weergave van transcriptieresultaten.
-   **`src/utils/error-utils.js`:** Beheert de weergave en verwerking van fouten.
-   **`src/styles/content.css`:** CSS-stijlen voor de gebruikersinterface die in webpagina's wordt geïnjecteerd.

##### Opname en gebeurtenissen

-   **`src/utils/recording-utils.js`:** Beheert audio-opname via de microfoon en de verwerking van audiogegevens.
-   **`src/utils/event-handlers.js`:** Bevat de event handlers voor gebruikersinteracties.

##### Internationalisering en talen

-   **`src/utils/languages.js`:** Definieert de talen die door de extensie worden ondersteund.
-   **`src/utils/languages-shared.js`:** Definieert de lijst met ondersteunde talen voor de context van de webpagina.
-   **`src/utils/languages-data.js`:** Definieert de lijst met ondersteunde talen voor de service worker.
-   **`src/utils/i18n.js`:** Beheert de internationalisering van de gebruikersinterface.

##### Optiepagina

-   **`src/pages/options/`:** Bevat de bestanden voor de optiepagina van de extensie (HTML, CSS, JavaScript).
### Transcriptie- en vertaalproces

#### Belangrijkste functionaliteit voor spraaktranscriptie

1.  **Opname starten:** De gebruiker start de opname door op het extensiepictogram te klikken of de sneltoets te gebruiken (Ctrl+Shift+1 of ⌘+Shift+1 op Mac). De `background script` stuurt een bericht naar de `content script` om de opname te starten.
2.  **Audio vastleggen:** De `content script` gebruikt de API `navigator.mediaDevices.getUserMedia` om toegang te krijgen tot de microfoon en audio op te nemen via de MediaRecorder-API.
3.  **Transcriptie:** De `content script` gebruikt de functie `transcribeAudio` (`src/utils/api-utils.js`) om de audio naar de transcriptie-API van de geconfigureerde provider te sturen (Voxtral voor Mistral AI, gpt-transcribe of Whisper voor OpenAI, Gemini 3.5 Transcribe voor Gemini). De API retourneert de getranscribeerde tekst.
4.  **Vertaling of herformulering (optioneel):**

-   Als de vertaaloptie is ingeschakeld, gebruikt de `content script` de functie `translateText` (`src/utils/text-processing.js`) om de getranscribeerde tekst naar de chat-API van de geconfigureerde provider te sturen.
-   Als de herformuleringsoptie is ingeschakeld, wordt de functie `rephraseText` gebruikt om de getranscribeerde tekst te verbeteren.

5.  **Weergave:** De `content script` toont de verwerkte tekst in het actieve element van de pagina (als dit een tekstveld of een bewerkbaar element is), of in een aangepast dialoogvenster.

#### Functionaliteit van het contextmenu

1. **Tekst selecteren:** De gebruiker selecteert tekst op een webpagina.
2. **Contextmenu:** Met de rechtermuisknop worden de volgende opties weergegeven:
    - "Selectie herformuleren" om de stijl en helderheid te verbeteren
    - "Selectie vertalen" met een submenu van beschikbare talen
    - "Spelling corrigeren" om fouten te corrigeren
3. **Verwerking:** Afhankelijk van de gekozen optie:
    - De tekst wordt voor herformulering verzonden via de functie `rephraseText`
    - De tekst wordt voor vertaling verzonden via de functie `translateText` met de geselecteerde doeltaal
    - De tekst wordt voor correctie verzonden via de functie `correctText`
4. **Weergave:** Het resultaat vervangt de oorspronkelijke selectie in het element waarin de geselecteerde tekst zich bevindt.

### Communicatie

De communicatie tussen de `background script` en de `content script` verloopt via de berichten-API van Chrome (`chrome.runtime.sendMessage` en `chrome.runtime.onMessage`).

### Gegevensopslag

De extensie gebruikt `chrome.storage.sync` voor het opslaan van:

-   De configuratie van AI-providers (API-sleutels, geselecteerde modellen, aangepaste URL's). Gemini, toegevoegd in 1.2.0, heeft een eigen opslagsleutel (`extraProvider.gemini`), die door eerdere versies wordt genegeerd.
-   De opties van de extensie (weergave, vertaling, kleuren van de banner enz.).
-   De taalvoorkeuren voor vertaling.

Deze gegevens worden lokaal op uw computer opgeslagen, in de opslagruimte van de browserextensie.

### Foutafhandeling

Mogelijke fouten (ontbrekende API-sleutel, transcriptiefout enz.) zijn gedefinieerd in het bestand `constants.js`. De functies `api-utils.js` en `text-processing.js` handelen mogelijke fouten bij API-aanroepen af met verbeterde berichten op basis van de HTTP-code. De `content.js` toont foutmeldingen aan de gebruiker via een banner onderaan de pagina.

## 🛡️ Beveiliging en privacy

-   **Gegevensbescherming:**
    -   De API-sleutel wordt veilig in de browser opgeslagen.
    -   De extensie bewaart uw audiogegevens niet; alle verwerking vindt in realtime plaats.
    -   De communicatie met de API's verloopt via beveiligde HTTPS-verbindingen.

Raadpleeg voor volledige informatie over hoe BabelFishAI uw gegevens verwerkt ons [Privacybeleid](PRIVACY.md).

## 🔧 Probleemoplossing

-   **Microfoonproblemen:**

    -   Controleer de toegangsrechten voor de microfoon in uw browser.
    -   Zorg ervoor dat geen andere toepassing tegelijkertijd de microfoon gebruikt.

-   **Transcriptie-/vertaalfouten:**
    -   Controleer of de API-sleutel geldig en actief is.
    -   Zorg ervoor dat u een stabiele internetverbinding hebt.
    -   Raadpleeg bij een fout de browserconsole voor gedetailleerde logs.

## 🤝 Bijdragen

Bijdragen en suggesties zijn welkom. Om bij te dragen:

-   Meld bugs via de sectie Issues op GitHub.
-   Stel verbeteringen of nieuwe functionaliteiten voor.
-   Dien uw pull requests in.

## 📄 Licentie

Deze extensie wordt verspreid onder de GNU Affero General Public License v3.0 (AGPL-3.0). Raadpleeg het bestand LICENSE voor meer informatie.

## 💝 Ondersteuning

## Als u deze extensie waardeert, kunt u de ontwikkeling ervan ondersteunen met een donatie via [PayPal](https://paypal.me/jls).

Met passie en innovatie ontwikkeld door jls42.org. Babel Fish AI tilt transcriptie en vertaling naar nieuwe hoogten dankzij geavanceerde kunstmatige intelligentie.
