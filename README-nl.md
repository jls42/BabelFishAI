**Artikel vertaald van het Frans naar het Nederlands met gpt-5.6-sol.**

# Babel Fish AI - Extensie voor Spraaktranscriptie en Vertaling met AI

<img src="images/icon128.png" alt="Babel Fish AI-pictogram" width="128" height="128">

**Officiële website: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**Om de extensie te gebruiken, hebt u een API-sleutel van een van de ondersteunde providers nodig:**

|                             Provider                             | Een API-sleutel verkrijgen                                                                       |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)                                             |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)                                        |
|                                🚅                                | **Custom/LiteLLM**: Om uw eigen API-endpoints te gebruiken                                        |

Babel Fish AI is een innovatieve browserextensie die krachtige spraaktranscriptie met ondersteuning voor meerdere providers biedt. Zet uw stem met opmerkelijke nauwkeurigheid om in tekst dankzij de transcriptie-API's van Mistral AI (Voxtral) of OpenAI (Whisper) en profiteer optioneel van automatische vertaling in realtime. U kunt Babel Fish AI uitsluitend voor transcriptie gebruiken of vertaling tijdens het transcriberen inschakelen, afhankelijk van uw behoeften.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy-badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Status van kwaliteitspoort](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Beveiligingsbeoordeling](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Onderhoudbaarheidsbeoordeling](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Kwetsbaarheden](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technische schuld](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Regels code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Functies

-   **Geavanceerde Spraaktranscriptie**

    -   Hoogwaardige audio-opname via de microfoon van uw apparaat.
    -   Nauwkeurige transcriptie via de Voxtral-API's (Mistral AI) of Whisper-API's (OpenAI).
    -   Ondersteuning voor meerdere providers: kies vrij tussen Mistral AI, OpenAI of een aangepast endpoint.
    -   Meertalige ondersteuning voor spraakherkenning en tekstweergave, waarmee gesproken invoer in verschillende talen kan worden getranscribeerd en de resultaten (transcriptie en vertaling, indien ingeschakeld) in de taal van uw keuze kunnen worden weergegeven.
    -   Automatische invoeging van de tekst in het actieve veld of weergave in een speciaal dialoogvenster.

-   **Intelligente Vertaling en Herformulering**

    -   Directe vertaling van transcripties in diverse talen, indien gewenst in te schakelen.
    -   Herformulering van tekst om de stijl en duidelijkheid te verbeteren.
    -   Gebruik van een geavanceerd AI-model om een vertaling te garanderen die trouw blijft aan de oorspronkelijke betekenis.
    -   Vrije keuze om uitsluitend transcriptie te gebruiken of transcriptie en vertaling te combineren.

-   **Krachtig Contextmenu**

    -   Optie "Selectie herformuleren" om uw geselecteerde teksten onmiddellijk te verbeteren.
    -   Optie "Selectie vertalen" met een submenu met alle beschikbare talen.
    -   Optie "Spelling corrigeren" om fouten in spelling, grammatica en interpunctie te corrigeren.
    -   Directe vervanging van de geselecteerde tekst door de vertaalde, geherformuleerde of gecorrigeerde versie.
    -   Naadloze integratie in de native gebruikersinterface van de browser.

-   **Intuïtieve en Aanpasbare Gebruikersinterface**

    -   Flexibele weergavemodus: actief invoerveld of zwevend dialoogvenster.
    -   Configureerbare statusbalk met keuze uit kleuren, dekking en weergaveduur.
    -   Sneltoets (Ctrl+Shift+1 of ⌘+Shift+1 op Mac) om de opname te starten/stoppen.
    -   In Firefox een „prioritaire sneltoets” voor websites waarvan de pagina-editor de toetsencombinatie onderschept (ChatGPT, Notion…): actief vanaf de installatie en uit te schakelen via de opties (zie [PRIVACY.md](PRIVACY.md)).
    -   Optie "Openhouden" om de weergaveduur van de resultaten te beheren.
    -   Aangepast pictogram met een microfoon en het getal "42" voor onmiddellijke herkenning.

-   **Geavanceerde Opties**
    -   Ondersteuning voor meerdere providers: Mistral AI, OpenAI en Custom/LiteLLM voor maximale flexibiliteit.
    -   Mogelijkheid om de transcriptie- en vertaalmodellen per provider aan te passen.
    -   Beschikbare OpenAI-modellen: GPT-4o mini (standaard), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** en **GPT-5.6 (luna/terra/sol)**. Transcriptie: whisper-1 (standaard), gpt-4o-mini-transcribe, gpt-4o-transcribe en **gpt-transcribe**.
    -   Beschikbare Mistral-modellen: Mistral Small (standaard), Mistral Medium, Mistral Large, Codestral en **Ministral 3 (3B/8B/14B)**. Transcriptie: Voxtral Mini. Antwoorden van redenerende Mistral-modellen (denkblokken) worden ondersteund.
    -   Instellingen die gpt-4.1-nano (stopzetting van de OpenAI-API op 23-10-2026) of gpt-4o gebruikten, schakelen bij de update automatisch over naar gpt-5.6-luna en gpt-4.1.
    -   Onafhankelijke selectie van de provider voor transcriptie en vertaling/herformulering.
    -   Compatibiliteit met LiteLLM Proxy via de Custom-provider om verbinding te maken met alternatieve modellen.
    -   Volledig beheer van internationalisering dankzij taalbestanden (\_locales), met een meertalige interface en spraakondersteuning.

## 🌐 Ondersteunde Talen

Hieronder vindt u de lijst met talen die door Babel Fish AI worden ondersteund, met links naar demonstratievideo's:

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

1.  **Downloaden en Installeren:**

    -   Kloon deze repository vanaf GitHub of download de map van de extensie handmatig.
    -   **Of installeer de extensie rechtstreeks vanuit de [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   Open Chrome en ga naar `chrome://extensions/`.
    -   Schakel rechtsboven de „Ontwikkelaarsmodus” in.
    -   Klik op „Uitgepakte extensie laden” en selecteer de map van Babel Fish AI.

2.  **Controle:**
    -   Controleer of de extensie met het aangepaste pictogram in de werkbalk van de browser verschijnt.

### Firefox

1.  **Downloaden en Installeren:**

    -   **Installeer de extensie rechtstreeks vanuit [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   Of voor handmatige installatie: kloon deze repository vanaf GitHub en voer vervolgens `./scripts/build.sh firefox` uit, waarmee `dist/firefox/` wordt voorbereid en het Firefox-manifest wordt hernoemd naar `manifest.json`.
    -   Open Firefox en ga naar `about:debugging#/runtime/this-firefox` (en niet naar „Add-on installeren vanuit bestand” in `about:addons`, dat is voorbehouden aan ondertekende extensies).
    -   Klik op „Tijdelijke add-on laden...”.
    -   Selecteer het bestand `dist/firefox/manifest.json`.

2.  **Controle:**
    -   Controleer of de extensie met het aangepaste pictogram in de werkbalk van Firefox verschijnt.

## ⚙️ Configuratie

1.  **Configuratie van de AI-provider:**

    -   Klik op het pictogram van de extensie om de opties te openen.
    -   Selecteer uw provider in de vervolgkeuzelijst (Mistral AI, OpenAI of Custom/LiteLLM).
    -   Voer uw API-sleutel in:
        -   **Mistral AI**: beschikbaar op [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: beschikbaar op [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    -   Activeer de provider met de schakelaar naast de vervolgkeuzelijst.

2.  **Opties Aanpassen:**

    -   Kies de weergavemodus (actief veld of dialoogvenster).
    -   Configureer de kleur, dekking en weergaveduur van de statusbalk.
    -   Selecteer de talen voor transcriptie (gesproken invoer) en tekstweergave.
    -   Schakel de vertaalfunctie naar behoefte in of uit.

3.  **(Optioneel) Geavanceerde modelconfiguratie:**
    -   Klik in de opties van elke provider op "Modelconfiguratie" om de gebruikte modellen aan te passen.
    -   U kunt aangepaste modellen voor transcriptie en vertaling/herformulering toevoegen.
    -   Als meerdere providers zijn geactiveerd, kunt u kiezen welke provider voor elke dienst (transcriptie en vertaling) wordt gebruikt.

## 🚀 Gebruik met LiteLLM Proxy of Aangepaste Endpoints

Babel Fish AI is compatibel met [LiteLLM Proxy](https://litellm.ai/) en andere OpenAI-compatibele API-proxy's, waardoor alternatieve taalmodellen kunnen worden gebruikt.

### Configuratie

1.  **Installeer en configureer uw proxy:** Volg de instructies van de dienst die u gebruikt (LiteLLM enz.).
2.  **Configureer de Babel Fish AI-extensie:**
    -   Selecteer in de opties van de extensie de provider **Custom/LiteLLM** in de vervolgkeuzelijst.
    -   Voer uw API-sleutel in (indien nodig).
    -   Configureer de API-URL's:
        -   **Transcriptie-URL**: bijvoorbeeld `http://localhost:4000/v1/audio/transcriptions`
        -   **Chat-URL**: bijvoorbeeld `http://localhost:4000/v1/chat/completions`
    -   Activeer de provider met de schakelaar.
    -   Vink de optie **"NoLog"** aan als u het loggen van verzoeken door LiteLLM wilt uitschakelen.

**Belangrijk:** De optie "NoLog" is **uitsluitend** beschikbaar bij de provider Custom/LiteLLM. Ze is niet compatibel met de officiële API's van OpenAI of Mistral AI.

## 🛠️ Technische Werking

### Architectuur van de Extensie

De extensie bestaat uit meerdere JavaScript-bestanden die met elkaar samenwerken:

#### Hoofdbestanden

-   **`manifest.json`:** Het hoofdconfiguratiebestand van de extensie. Het definieert de machtigingen, scripts, toegankelijke bronnen enz. Het gebruikt versie 3 van het manifest en declareert de machtigingen `activeTab`, `storage`, `commands`, `scripting` en `contextMenus`.
-   **`background.js`:** De service worker die op de achtergrond wordt uitgevoerd. Deze beheert gebeurtenissen (klikken op het pictogram, sneltoetsen, contextmenu), injecteert indien nodig de `content script` en communiceert met de `content script`.
-   **`content.js`:** Het hoofdscript dat in webpagina's wordt geïnjecteerd. Het coördineert de verschillende hulpmodules en beheert de algemene stroom van de extensie.
-   **`src/constants.js`:** Definieert constanten voor de configuratie, statussen, acties enz.

#### Hulpmodules

De extensie gebruikt een modulaire architectuur met verschillende gespecialiseerde hulpbestanden:

##### Beheer van Providers en API's

-   **`src/utils/providers.js`:** Register van AI-providers (Mistral AI, OpenAI, Custom/LiteLLM) met hun configuraties, modellen en standaard-URL's.
-   **`src/utils/api-utils.js`:** Functies voor interactie met externe API's, het bepalen van de configuratie voor meerdere providers en audiotranscriptie.
-   **`src/utils/text-processing.js`:** Functies voor tekstverwerking: vertaling, herformulering en spellingcorrectie.

##### Gebruikersinterface en Interactie

-   **`src/utils/ui.js`:** Algemene hulpfuncties voor de gebruikersinterface.
-   **`src/utils/banner-utils.js`:** Beheert de statusbanner, de bedieningselementen ervan en de taalselector.
-   **`src/utils/focus-utils.js`:** Beheert het opslaan en herstellen van de focus en tekstselectie.
-   **`src/utils/transcription-display.js`:** Beheert de weergave van transcriptieresultaten.
-   **`src/utils/error-utils.js`:** Beheert de weergave en verwerking van fouten.
-   **`src/styles/content.css`:** CSS-stijlen voor de gebruikersinterface die in webpagina's wordt geïnjecteerd.

##### Opname en Gebeurtenissen

-   **`src/utils/recording-utils.js`:** Beheert de audio-opname via de microfoon en de verwerking van audiogegevens.
-   **`src/utils/event-handlers.js`:** Bevat de gebeurtenishandlers voor gebruikersinteracties.

##### Internationalisering en Talen

-   **`src/utils/languages.js`:** Definieert de talen die door de extensie worden ondersteund.
-   **`src/utils/languages-shared.js`:** Definieert de lijst met ondersteunde talen voor de context van de webpagina.
-   **`src/utils/languages-data.js`:** Definieert de lijst met ondersteunde talen voor de service worker.
-   **`src/utils/i18n.js`:** Beheert de internationalisering van de gebruikersinterface.

##### Optiepagina

-   **`src/pages/options/`:** Bevat de bestanden voor de optiepagina van de extensie (HTML, CSS, JavaScript).

### Transcriptie- en Vertaalproces

#### Hoofdfunctie voor spraaktranscriptie

1.  **De Opname Starten:** De gebruiker start de opname door op het pictogram van de extensie te klikken of de sneltoets (Ctrl+Shift+1 of ⌘+Shift+1 op Mac) te gebruiken. De `background script` stuurt een bericht naar de `content script` om de opname te starten.
2.  **Audio-opname:** De `content script` gebruikt de API `navigator.mediaDevices.getUserMedia` om toegang tot de microfoon te krijgen en audio op te nemen via de MediaRecorder-API.
3.  **Transcriptie:** De `content script` gebruikt de functie `transcribeAudio` (`src/utils/api-utils.js`) om de audio naar de transcriptie-API van de geconfigureerde provider te sturen (Voxtral voor Mistral AI, Whisper voor OpenAI). De API retourneert de getranscribeerde tekst.
4.  **Vertaling of Herformulering (Optioneel):**

-   Als de vertaaloptie is ingeschakeld, gebruikt de `content script` de functie `translateText` (`src/utils/text-processing.js`) om de getranscribeerde tekst naar de chat-API van de geconfigureerde provider te sturen.
-   Als de herformuleringsoptie is ingeschakeld, wordt de functie `rephraseText` gebruikt om de getranscribeerde tekst te verbeteren.

5.  **Weergave:** De `content script` geeft de verwerkte tekst weer in het actieve element van de pagina (als dit een tekstveld of bewerkbaar element is) of in een aangepast dialoogvenster.

#### Contextmenufunctie

1. **Tekstselectie:** De gebruiker selecteert tekst op een webpagina.
2. **Contextmenu:** Met een rechtermuisklik verschijnen de opties:
    - "Selectie herformuleren" om de stijl en duidelijkheid te verbeteren
    - "Selectie vertalen" met een submenu met de beschikbare talen
    - "Spelling corrigeren" om fouten te corrigeren
3. **Verwerking:** Afhankelijk van de gekozen optie:
    - De tekst wordt voor herformulering verzonden via de functie `rephraseText`
    - De tekst wordt voor vertaling verzonden via de functie `translateText` met de geselecteerde doeltaal
    - De tekst wordt voor correctie verzonden via de functie `correctText`
4. **Weergave:** Het resultaat vervangt de oorspronkelijke selectie in het element waarin de geselecteerde tekst zich bevindt.

### Communicatie

De communicatie tussen de `background script` en de `content script` verloopt via de berichten-API van Chrome (`chrome.runtime.sendMessage` en `chrome.runtime.onMessage`).

### Gegevensopslag

De extensie gebruikt `chrome.storage.sync` om het volgende op te slaan:

-   De configuratie van de AI-providers (API-sleutels, geselecteerde modellen, aangepaste URL's).
-   De opties van de extensie (weergave, vertaling, kleuren van de banner enz.).
-   De taalvoorkeuren voor vertaling.

Deze gegevens worden lokaal op uw computer opgeslagen in de opslagruimte van de browserextensie.
### Foutafhandeling

Mogelijke fouten (ontbrekende API-sleutel, transcriptiefout, enz.) zijn gedefinieerd in het bestand `constants.js`. De functies `api-utils.js` en `text-processing.js` handelen mogelijke fouten bij API-aanroepen af met verbeterde berichten op basis van de HTTP-code. De `content.js` toont foutmeldingen aan de gebruiker via een banner onderaan de pagina.

## 🛡️ Beveiliging en privacy

-   **Gegevensbescherming:**
    -   De API-sleutel wordt veilig opgeslagen in de browser.
    -   De extensie bewaart uw audiogegevens niet; alle verwerking vindt in realtime plaats.
    -   De communicatie met de API's verloopt via beveiligde HTTPS-verbindingen.

Raadpleeg voor volledige informatie over hoe BabelFishAI met uw gegevens omgaat ons [Privacybeleid](PRIVACY.md).

## 🔧 Probleemoplossing

-   **Microfoonproblemen:**

    -   Controleer in uw browser de toestemmingen voor toegang tot de microfoon.
    -   Zorg ervoor dat geen andere toepassing tegelijkertijd de microfoon gebruikt.

-   **Transcriptie-/vertaalfouten:**
    -   Controleer of de API-sleutel geldig en actief is.
    -   Zorg ervoor dat u een stabiele internetverbinding hebt.
    -   Raadpleeg bij fouten de browserconsole voor gedetailleerde logs.

## 🤝 Bijdragen

Bijdragen en suggesties zijn welkom. Om bij te dragen:

-   Meld bugs via de sectie Issues op GitHub.
-   Stel verbeteringen of nieuwe functies voor.
-   Dien uw pull requests in.

## 📄 Licentie

Deze extensie wordt verspreid onder de GNU Affero General Public License v3.0 (AGPL-3.0). Raadpleeg het bestand LICENSE voor meer informatie.

## 💝 Ondersteuning

## Als u deze extensie waardeert, kunt u de ontwikkeling ervan steunen door een donatie te doen via [PayPal](https://paypal.me/jls).

Met passie en innovatie ontwikkeld door jls42.org. Babel Fish AI tilt transcriptie en vertaling naar nieuwe hoogten dankzij geavanceerde kunstmatige intelligentie.
