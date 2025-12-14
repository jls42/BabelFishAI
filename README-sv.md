# Babel Fish AI - Tillägg för rösttranskribering och översättning med AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**För att använda tillägget behöver du en API-nyckel från en av de leverantörer som stöds:**

| Leverantör | Skaffa en API-nyckel |
|:----------:|:---------------------|
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) |
| <img src="images/openai-logo.png" alt="OpenAI" height="30"> | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
| 🚅 | **Custom/LiteLLM**: För att använda dina egna API-slutpunkter |

Babel Fish AI är ett innovativt Chrome-tillägg utformat för att erbjuda kraftfull rösttranskribering med stöd för flera leverantörer. Omvandla din röst till text med anmärkningsvärd precision tack vare transkriberings-API:er från Mistral AI (Voxtral) eller OpenAI (Whisper), och dra valfritt nytta av automatisk översättning i realtid. Du kan använda Babel Fish AI uteslutande för transkribering eller aktivera direktöversättning efter behov.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funktioner

- **Avancerad rösttranskribering**
  - Högkvalitativ ljudinspelning via din enhets mikrofon.
  - Exakt transkribering via Voxtral (Mistral AI) eller Whisper (OpenAI) API:er.
  - Stöd för flera leverantörer: välj fritt mellan Mistral AI, OpenAI eller en anpassad slutpunkt.
  - Flerspråkigt stöd för röstigenkänning och textvisning, vilket gör att du kan transkribera röstinmatningar på olika språk och visa resultat (transkribering och översättning, om aktiverat) på det språk du väljer.
  - Automatisk infogning av text i det aktiva fältet eller visning i en dedikerad dialogruta.

- **Intelligent översättning och omformulering**
  - Omedelbar översättning av transkriberingar till olika språk, aktiverbar vid behov.
  - Omformulering av text för att förbättra dess stil och tydlighet.
  - Användning av en avancerad AI-modell för att säkerställa en översättning som är trogen den ursprungliga betydelsen.
  - Fritt val att använda uteslutande transkribering eller kombinera transkribering och översättning.

- **Kraftfull kontextmeny**
  - Alternativet "Omformulera markering" för att omedelbart förbättra dina markerade texter.
  - Alternativet "Översätt markering" med undermeny för alla tillgängliga språk.
  - Alternativet "Rätta stavning" för att korrigera stavfel, grammatik och interpunktion.
  - Direkt ersättning av den markerade texten med dess översatta, omformulerade eller korrigerade version.
  - Sömlös integration i Chromes inbyggda användargränssnitt.

- **Intuitivt och anpassningsbart användargränssnitt**
  - Flexibelt visningsläge: aktivt inmatningsområde eller flytande dialogfönster.
  - Konfigurerbar statusbanner med val av färger, opacitet och visningstid.
  - Kortkommando (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac) för att starta/stoppa inspelning.
  - Alternativet "Håll öppet" för att styra visningstiden för resultaten.
  - Anpassad ikon, som integrerar en mikrofon och siffran "42", för omedelbar igenkänning.

- **Avancerade alternativ**
    - Stöd för flera leverantörer: Mistral AI, OpenAI och Custom/LiteLLM för maximal flexibilitet.
    - Möjlighet att anpassa transkriberings- och översättningsmodeller per leverantör.
    - Oberoende val av leverantör för transkribering och översättning/omformulering.
    - Kompatibilitet med LiteLLM Proxy via Custom-leverantören för att ansluta till alternativa modeller.
    - Fullständig hantering av internationalisering genom språkfiler (_locales), vilket erbjuder ett gränssnitt och röststöd på flera språk.

## 🌐 Språk som stöds

Här är listan över språk som stöds av Babel Fish AI, med länkar till demonstrationsvideor:

- [Arabiska](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [Tyska](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [Engelska](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [Spanska](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [Franska](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [Italienska](https://www.youtube.com/watch?v=QgYZt8myods)
- [Japanska](https://www.youtube.com/watch?v=noHEJCnocH8)
- [Koreanska](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [Nederländska](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Polska](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Portugisiska](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Rumänska](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Svenska](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Kinesiska](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installation

1.  **Nedladdning och installation:**
    - Klona detta arkiv från GitHub eller ladda ner tilläggsmappen manuellt.
    - **Eller installera tillägget direkt från [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Öppna Chrome och gå till `chrome://extensions/`.
    - Aktivera "Utvecklarläge" längst upp till höger.
    - Klicka på "Ladda uppackat tillägg" och välj mappen Babel Fish AI.

2.  **Verifiering:**
    - Se till att tillägget visas i Chromes verktygsfält med den anpassade ikonen.

## ⚙️ Konfiguration

1.  **Konfiguration av AI-leverantör:**
    *   Klicka på tilläggsikonen för att komma åt alternativen.
    *   Välj din leverantör från rullgardinsmenyn (Mistral AI, OpenAI eller Custom/LiteLLM).
    *   Ange din API-nyckel:
        - **Mistral AI**: tillgänglig på [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        - **OpenAI**: tillgänglig på [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    *   Aktivera leverantören med reglaget bredvid rullgardinsmenyn.

2.  **Anpassning av alternativ:**
    *   Välj visningsläge (aktivt område eller dialogruta).
    *   Konfigurera färg, opacitet och visningstid för statusbannern.
    *   Välj språk för transkribering (röstinmatning) och textvisning.
    *   Aktivera eller inaktivera översättningsfunktionen efter behov.

3.  **(Valfritt) Avancerad modellkonfiguration:**
    *   I alternativen för varje leverantör, klicka på "Modellkonfiguration" för att anpassa de modeller som används.
    *   Du kan lägga till anpassade modeller för transkribering och översättning/omformulering.
    *   Om flera leverantörer är aktiverade kan du välja vilken som ska användas för varje tjänst (transkribering och översättning).

## 🚀 Användning med LiteLLM Proxy eller anpassade slutpunkter

Babel Fish AI är kompatibelt med [LiteLLM Proxy](https://litellm.ai/) och andra OpenAI-kompatibla API-proxys, vilket möjliggör användning av alternativa språkmodeller.

### Konfiguration

1.  **Installera och konfigurera din proxy:** Följ instruktionerna för den tjänst du använder (LiteLLM, etc.).
2.  **Konfigurera tillägget Babel Fish AI:**
    *   I tilläggsalternativen, välj leverantören **Custom/LiteLLM** i rullgardinsmenyn.
    *   Ange din API-nyckel (om det behövs).
    *   Konfigurera API-URL:erna:
        - **Transkriberings-URL**: t.ex. `http://localhost:4000/v1/audio/transcriptions`
        - **Chatt-URL**: t.ex. `http://localhost:4000/v1/chat/completions`
    *   Aktivera leverantören med reglaget.
    *   Markera alternativet **"NoLog"** om du vill inaktivera loggning av förfrågningar av LiteLLM.

**Viktigt:** Alternativet "NoLog" är **endast** tillgängligt i Custom/LiteLLM-leverantören. Det är inte kompatibelt med de officiella API:erna från OpenAI eller Mistral AI.

## 🛠️ Teknisk funktion

### Tilläggets arkitektur

Tillägget består av flera JavaScript-filer som interagerar med varandra:

#### Huvudfiler

*   **`manifest.json`:** Tilläggets huvudkonfigurationsfil. Den definierar behörigheter, skript, tillgängliga resurser etc. Den använder Manifest V3 och deklarerar behörigheterna `activeTab`, `storage`, `commands`, `scripting` och `contextMenus`.
*   **`background.js`:** Service workern som körs i bakgrunden. Den hanterar händelser (ikonklick, kortkommandon, kontextmeny), injicerar `content script` om det behövs och kommunicerar med `content script`.
*   **`content.js`:** Huvudskriptet som injiceras i webbsidor. Det samordnar de olika verktygsmodulerna och hanterar tilläggets globala flöde.
*   **`src/constants.js`:** Definierar konstanter för konfiguration, tillstånd, åtgärder etc.

#### Verktygsmoduler

Tillägget använder en modulär arkitektur med flera specialiserade verktygsfiler:

##### Leverantörs- och API-hantering

*   **`src/utils/providers.js`:** Register över AI-leverantörer (Mistral AI, OpenAI, Custom/LiteLLM) med deras konfigurationer, modeller och standard-URL:er.
*   **`src/utils/api-utils.js`:** Funktioner för interaktion med externa API:er, lösning av multileverantörskonfiguration och ljudtranskribering.
*   **`src/utils/text-processing.js`:** Textbehandlingsfunktioner: översättning, omformulering, stavningskorrigering.

##### Användargränssnitt och interaktion

*   **`src/utils/ui.js`:** Allmänna verktygsfunktioner för användargränssnittet.
*   **`src/utils/banner-utils.js`:** Hanterar statusbannern, dess kontroller och språkväljaren.
*   **`src/utils/focus-utils.js`:** Hanterar att spara och återställa fokus och textmarkering.
*   **`src/utils/transcription-display.js`:** Hanterar visning av transkriberingsresultat.
*   **`src/utils/error-utils.js`:** Hanterar felvisning och felhantering.
*   **`src/styles/content.css`:** CSS-stilar för användargränssnittet som injiceras i webbsidor.

##### Inspelning och händelser

*   **`src/utils/recording-utils.js`:** Hanterar ljudinspelning via mikrofon och ljuddatabehandling.
*   **`src/utils/event-handlers.js`:** Innehåller händelsehanterare för användarinteraktioner.

##### Internationalisering och språk

*   **`src/utils/languages.js`:** Definierar de språk som stöds av tillägget.
*   **`src/utils/languages-shared.js`:** Definierar listan över språk som stöds för webbsidans kontext.
*   **`src/utils/languages-data.js`:** Definierar listan över språk som stöds för service workern.
*   **`src/utils/i18n.js`:** Hanterar internationalisering för användargränssnittet.

##### Alternativsida

*   **`src/pages/options/`:** Innehåller filer för tilläggets alternativsida (HTML, CSS, JavaScript).

### Transkriberings- och översättningsprocess

#### Huvudfunktion för rösttranskribering

1.  **Start av inspelning:** Användaren startar inspelningen genom att klicka på tilläggsikonen eller använda kortkommandot (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac). `background script` skickar ett meddelande till `content script` för att starta inspelningen.
2.  **Ljudinspelning:** `content script` använder `navigator.mediaDevices.getUserMedia` API för att komma åt mikrofonen och spela in ljud via MediaRecorder API.
3.  **Transkribering:** `content script` använder funktionen `transcribeAudio` (`src/utils/api-utils.js`) för att skicka ljud till transkriberings-API:et för den konfigurerade leverantören (Voxtral för Mistral AI, Whisper för OpenAI). API:et returnerar den transkriberade texten.
4.  **Översättning eller omformulering (valfritt):**
   - Om översättningsalternativet är aktiverat använder `content script` funktionen `translateText` (`src/utils/text-processing.js`) för att skicka den transkriberade texten till chatt-API:et för den konfigurerade leverantören.
   - Om omformuleringsalternativet är aktiverat används funktionen `rephraseText` för att förbättra den transkriberade texten.
5.  **Visning:** `content script` visar den bearbetade texten antingen i det aktiva elementet på sidan (om det är ett textfält eller redigerbart element) eller i en anpassad dialogruta.

#### Kontextmenyfunktion

1. **Textmarkering:** Användaren markerar text på en webbsida.
2. **Kontextmeny:** Ett högerklick visar alternativen:
   - "Omformulera markering" för att förbättra stil och tydlighet
   - "Översätt markering" med en undermeny av tillgängliga språk
   - "Rätta stavning" för att korrigera misstag
3. **Bearbetning:** Beroende på det valda alternativet:
   - Texten skickas för omformulering via funktionen `rephraseText`
   - Texten skickas för översättning via funktionen `translateText` med det valda målspråket
   - Texten skickas för korrigering via funktionen `correctText`
4. **Visning:** Resultatet ersätter den ursprungliga markeringen i det element där den markerade texten finns.

### Kommunikation

Kommunikationen mellan `background script` och `content script` sker via Chrome Messaging API (`chrome.runtime.sendMessage` och `chrome.runtime.onMessage`).

### Datalagring

Tillägget använder `chrome.storage.sync` för att lagra:

*   AI-leverantörskonfiguration (API-nycklar, valda modeller, anpassade URL:er).
*   Tilläggsalternativ (visning, översättning, bannerfärger, etc.).
*   Språkinställningar för översättning.

Dessa data lagras lokalt på din dator, i Chrome-tilläggets lagring.

### Felhantering
Möjliga fel (saknad API-nyckel, transkriberingsfel, etc.) definieras i filen `constants.js`. Funktionerna `api-utils.js` och `text-processing.js` hanterar potentiella API-anropsfel med förbättrade meddelanden baserat på HTTP-koden. `content.js` visar felmeddelanden för användaren via en banner längst ner på sidan.


## 🛡️ Säkerhet och integritet

- **Dataskydd:**
  - API-nyckeln lagras säkert i Chrome.
  - Tillägget sparar inte dina ljuddata; all behandling sker i realtid.
  - Kommunikation med API:erna sker via säkra HTTPS-anslutningar.

För fullständig information om hur BabelFishAI hanterar dina data, se vår [Integritetspolicy](PRIVACY.md).

## 🔧 Felsökning

- **Mikrofonproblem:**
  - Kontrollera behörigheter för mikrofonåtkomst i Chrome.
  - Se till att inget annat program använder mikrofonen samtidigt.

- **Transkriberings-/översättningsfel:**
  - Kontrollera att API-nyckeln är giltig och aktiv.
  - Se till att du har en stabil internetanslutning.
  - Se Chrome-konsolen för detaljerade loggar vid fel.

## 🤝 Bidrag

Bidrag och förslag är välkomna. För att bidra:
- Rapportera buggar via avsnittet Issues på GitHub.
- Föreslå förbättringar eller nya funktioner.
- Skicka in dina pull requests.

## 📄 Licens

Detta tillägg distribueras under licensen GNU Affero General Public License v3.0 (AGPL-3.0). Se filen LICENSE för mer information.

## 💝 Stöd

Om du uppskattar detta tillägg kan du stödja dess utveckling genom att donera via [PayPal](https://paypal.me/jls).
---
Utvecklad av jls42.org med passion och innovation, Babel Fish AI driver transkribering och översättning mot nya horisonter tack vare banbrytande artificiell intelligens.
