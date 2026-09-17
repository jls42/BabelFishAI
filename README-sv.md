**Artikel översatt från franska till svenska med gpt-5.6-sol.**

# Babel Fish AI - Tillägg för rösttranskribering och översättning med AI

<img src="images/icon128.png" alt="Babel Fish AI-ikon" width="128" height="128">

**Officiell webbplats: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**För att använda tillägget behöver du en API-nyckel från en av de leverantörer som stöds:**

|                            Leverantör                            | Skaffa en API-nyckel                                                                            |
| :--------------------------------------------------------------: | :----------------------------------------------------------------------------------------------- |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)                                             |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)                                        |
|                                🚅                                | **Custom/LiteLLM**: För att använda dina egna API-endpoints                                       |

Babel Fish AI är ett innovativt webbläsartillägg som erbjuder kraftfull rösttranskribering med stöd för flera leverantörer. Omvandla din röst till text med enastående precision via transkriberings-API:erna från Mistral AI (Voxtral) eller OpenAI (Whisper), och få valfri automatisk översättning i realtid. Du kan använda Babel Fish AI enbart för transkribering eller aktivera direktöversättning efter behov.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy-märke](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Status för kvalitetskontroll](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Säkerhetsbetyg](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Underhållbarhetsbetyg](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Sårbarheter](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Kodproblem](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Teknisk skuld](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Kodrader](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funktioner

-   **Avancerad rösttranskribering**

    -   Högkvalitativ ljudinspelning via enhetens mikrofon.
    -   Exakt transkribering via API:erna Voxtral (Mistral AI) eller Whisper (OpenAI).
    -   Stöd för flera leverantörer: välj fritt mellan Mistral AI, OpenAI eller en anpassad endpoint.
    -   Flerspråkigt stöd för röstigenkänning och textvisning, så att röstinmatning kan transkriberas på olika språk och resultaten (transkribering och översättning, om den är aktiverad) visas på det språk du väljer.
    -   Automatisk infogning av texten i det aktiva fältet eller visning i en särskild dialogruta.

-   **Intelligent översättning och omformulering**

    -   Omedelbar översättning av transkriberingar till olika språk, som kan aktiveras vid behov.
    -   Omformulering av text för att förbättra stil och tydlighet.
    -   Användning av en avancerad AI-modell för att säkerställa en översättning som är trogen originalets innebörd.
    -   Välj fritt mellan att enbart använda transkribering eller att kombinera transkribering och översättning.

-   **Kraftfull snabbmeny**

    -   Alternativet "Omformulera markeringen" för att omedelbart förbättra markerade texter.
    -   Alternativet "Översätt markeringen" med en undermeny för alla tillgängliga språk.
    -   Alternativet "Korrigera stavningen" för att korrigera stavnings-, grammatik- och interpunktionsfel.
    -   Direkt ersättning av den markerade texten med den översatta, omformulerade eller korrigerade versionen.
    -   Sömlös integrering med webbläsarens inbyggda användargränssnitt.

-   **Intuitivt och anpassningsbart användargränssnitt**

    -   Flexibelt visningsläge: aktivt inmatningsfält eller flytande dialogruta.
    -   Konfigurerbar statusbanderoll med val av färg, opacitet och visningstid.
    -   Kortkommando (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac) för att starta/stoppa inspelningen.
    -   I Firefox finns en ”prioriterad genväg” för webbplatser vars sidredigerare fångar tangentkombinationen (ChatGPT, Notion …): den är aktiv från installationen och kan inaktiveras i alternativen (se [PRIVACY.md](PRIVACY.md)).
    -   Alternativet "Håll öppen" för att styra hur länge resultaten visas.
    -   Anpassad ikon med en mikrofon och siffran "42" för omedelbar igenkänning.

-   **Avancerade alternativ**
    -   Stöd för flera leverantörer: Mistral AI, OpenAI och Custom/LiteLLM för maximal flexibilitet.
    -   Möjlighet att anpassa transkriberings- och översättningsmodellerna för varje leverantör.
    -   Tillgängliga OpenAI-modeller: GPT-4o mini (standard), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** och **GPT-5.6 (luna/terra/sol)**. Transkribering: whisper-1 (standard), gpt-4o-mini-transcribe, gpt-4o-transcribe och **gpt-transcribe**.
    -   Tillgängliga Mistral-modeller: Mistral Small (standard), Mistral Medium, Mistral Large, Codestral och **Ministral 3 (3B/8B/14B)**. Transkribering: Voxtral Mini. Svar från resonerande Mistral-modeller (resonemangsblock) stöds.
    -   Inställningar som använde gpt-4.1-nano (OpenAI-API:t upphör den 23/10/2026) eller gpt-4o växlar automatiskt till gpt-5.6-luna respektive gpt-4.1 vid uppdateringen.
    -   Oberoende val av leverantör för transkribering respektive översättning/omformulering.
    -   Kompatibilitet med LiteLLM Proxy via leverantören Custom för anslutning till alternativa modeller.
    -   Fullständig hantering av internationalisering via språkfilerna (\_locales), vilket ger ett flerspråkigt gränssnitt och flerspråkigt röststöd.

## 🌐 Språk som stöds

Här är listan över språk som stöds av Babel Fish AI, med länkar till demonstrationsvideor:

-   [Arabiska](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [Tyska](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [Engelska](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [Spanska](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [Franska](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [Italienska](https://www.youtube.com/watch?v=QgYZt8myods)
-   [Japanska](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [Koreanska](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [Nederländska](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [Polska](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [Portugisiska](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [Rumänska](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [Svenska](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [Kinesiska](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installation

### Chrome

1.  **Hämtning och installation:**

    -   Klona detta repository från GitHub eller hämta tilläggets mapp manuellt.
    -   **Eller installera tillägget direkt från [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   Öppna Chrome och gå till `chrome://extensions/`.
    -   Aktivera ”Utvecklarläge” uppe till höger.
    -   Klicka på ”Läs in okomprimerat tillägg” och välj mappen för Babel Fish AI.

2.  **Verifiering:**
    -   Kontrollera att tillägget visas i webbläsarens verktygsfält med den anpassade ikonen.

### Firefox

1.  **Hämtning och installation:**

    -   **Installera tillägget direkt från [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   Eller för manuell installation: klona detta repository från GitHub och kör sedan `./scripts/build.sh firefox`, som förbereder `dist/firefox/` med Firefox-manifestet omdöpt till `manifest.json`.
    -   Öppna Firefox och gå till `about:debugging#/runtime/this-firefox` (inte ”Installera tillägg från fil” i `about:addons`, som är avsett för signerade tillägg).
    -   Klicka på ”Läs in temporärt tillägg …”.
    -   Välj filen `dist/firefox/manifest.json`.

2.  **Verifiering:**
    -   Kontrollera att tillägget visas i Firefox verktygsfält med den anpassade ikonen.

## ⚙️ Konfiguration

1.  **Konfiguration av AI-leverantör:**

    -   Klicka på tilläggets ikon för att öppna alternativen.
    -   Välj leverantör i rullgardinsmenyn (Mistral AI, OpenAI eller Custom/LiteLLM).
    -   Ange din API-nyckel:
        -   **Mistral AI**: tillgänglig på [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: tillgänglig på [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    -   Aktivera leverantören med reglaget bredvid rullgardinsmenyn.

2.  **Anpassning av alternativen:**

    -   Välj visningsläge (aktivt fält eller dialogruta).
    -   Konfigurera statusbanderollens färg, opacitet och visningstid.
    -   Välj språk för transkribering (röstinmatning) och textvisning.
    -   Aktivera eller inaktivera översättningsfunktionen efter behov.

3.  **(Valfritt) Avancerad modellkonfiguration:**
    -   Klicka på "Modellkonfiguration" i alternativen för varje leverantör för att anpassa modellerna som används.
    -   Du kan lägga till anpassade modeller för transkribering och översättning/omformulering.
    -   Om flera leverantörer är aktiverade kan du välja vilken som ska användas för respektive tjänst (transkribering och översättning).

## 🚀 Användning med LiteLLM Proxy eller anpassade endpoints

Babel Fish AI är kompatibelt med [LiteLLM Proxy](https://litellm.ai/) och andra OpenAI-kompatibla API-proxyservrar, vilket gör det möjligt att använda alternativa språkmodeller.

### Konfiguration

1.  **Installera och konfigurera din proxyserver:** Följ instruktionerna för tjänsten du använder (LiteLLM osv.).
2.  **Konfigurera tillägget Babel Fish AI:**
    -   Välj leverantören **Custom/LiteLLM** i rullgardinsmenyn i tilläggets alternativ.
    -   Ange din API-nyckel (om det behövs).
    -   Konfigurera API-URL:erna:
        -   **URL för transkribering**: exempelvis `http://localhost:4000/v1/audio/transcriptions`
        -   **URL för chatt**: exempelvis `http://localhost:4000/v1/chat/completions`
    -   Aktivera leverantören med reglaget.
    -   Markera alternativet **"NoLog"** om du vill inaktivera LiteLLM:s loggning av förfrågningar.

**Viktigt:** Alternativet "NoLog" är **endast** tillgängligt för leverantören Custom/LiteLLM. Det är inte kompatibelt med de officiella API:erna från OpenAI eller Mistral AI.

## 🛠️ Teknisk funktion

### Tilläggets arkitektur

Tillägget består av flera JavaScript-filer som samverkar:

#### Huvudfiler

-   **`manifest.json`:** Tilläggets huvudsakliga konfigurationsfil. Den definierar behörigheter, skript, åtkomliga resurser med mera. Den använder version 3 av manifestet och deklarerar behörigheterna `activeTab`, `storage`, `commands`, `scripting` och `contextMenus`.
-   **`background.js`:** Den service worker som körs i bakgrunden. Den hanterar händelser (klick på ikonen, kortkommandon, snabbmenyn), injicerar `content script` vid behov och kommunicerar med `content script`.
-   **`content.js`:** Huvudskriptet som injiceras på webbsidor. Det samordnar de olika verktygsmodulerna och hanterar tilläggets övergripande flöde.
-   **`src/constants.js`:** Definierar konstanter för konfiguration, tillstånd, åtgärder med mera.

#### Verktygsmoduler

Tillägget använder en modulär arkitektur med flera specialiserade verktygsfiler:

##### Hantering av leverantörer och API:er

-   **`src/utils/providers.js`:** Register över AI-leverantörer (Mistral AI, OpenAI, Custom/LiteLLM) med deras konfigurationer, modeller och standard-URL:er.
-   **`src/utils/api-utils.js`:** Funktioner för interaktion med externa API:er, tolkning av konfigurationen för flera leverantörer och ljudtranskribering.
-   **`src/utils/text-processing.js`:** Funktioner för textbearbetning: översättning, omformulering och stavningskontroll.

##### Användargränssnitt och interaktion

-   **`src/utils/ui.js`:** Allmänna verktygsfunktioner för användargränssnittet.
-   **`src/utils/banner-utils.js`:** Hanterar statusbanderollen, dess kontroller och språkväljaren.
-   **`src/utils/focus-utils.js`:** Hanterar lagring och återställning av fokus och textmarkering.
-   **`src/utils/transcription-display.js`:** Hanterar visningen av transkriberingsresultat.
-   **`src/utils/error-utils.js`:** Hanterar visning och bearbetning av fel.
-   **`src/styles/content.css`:** CSS-stilar för användargränssnittet som injiceras på webbsidor.

##### Inspelning och händelser

-   **`src/utils/recording-utils.js`:** Hanterar ljudinspelning via mikrofonen och bearbetning av ljuddata.
-   **`src/utils/event-handlers.js`:** Innehåller händelsehanterare för användarinteraktioner.

##### Internationalisering och språk

-   **`src/utils/languages.js`:** Definierar de språk som tillägget stöder.
-   **`src/utils/languages-shared.js`:** Definierar listan över språk som stöds i webbsidans kontext.
-   **`src/utils/languages-data.js`:** Definierar listan över språk som stöds av service worker.
-   **`src/utils/i18n.js`:** Hanterar internationalisering av användargränssnittet.

##### Alternativsida

-   **`src/pages/options/`:** Innehåller filerna för tilläggets alternativsida (HTML, CSS, JavaScript).

### Transkriberings- och översättningsprocess

#### Huvudfunktion för rösttranskribering

1.  **Starta inspelningen:** Användaren startar inspelningen genom att klicka på tilläggets ikon eller använda kortkommandot (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac). `background script` skickar ett meddelande till `content script` för att starta inspelningen.
2.  **Ljudinspelning:** `content script` använder API:t `navigator.mediaDevices.getUserMedia` för att få åtkomst till mikrofonen och spela in ljudet via MediaRecorder-API:t.
3.  **Transkribering:** `content script` använder funktionen `transcribeAudio` (`src/utils/api-utils.js`) för att skicka ljudet till transkriberings-API:t hos den konfigurerade leverantören (Voxtral för Mistral AI, Whisper för OpenAI). API:t returnerar den transkriberade texten.
4.  **Översättning eller omformulering (valfritt):**

-   Om översättningsalternativet är aktiverat använder `content script` funktionen `translateText` (`src/utils/text-processing.js`) för att skicka den transkriberade texten till chatt-API:t hos den konfigurerade leverantören.
-   Om omformuleringsalternativet är aktiverat används funktionen `rephraseText` för att förbättra den transkriberade texten.

5.  **Visning:** `content script` visar den bearbetade texten antingen i det aktiva elementet på sidan (om det är ett textfält eller ett redigerbart element) eller i en anpassad dialogruta.

#### Funktion för snabbmenyn

1. **Textmarkering:** Användaren markerar text på en webbsida.
2. **Snabbmeny:** Ett högerklick visar alternativen:
    - "Omformulera markeringen" för att förbättra stil och tydlighet
    - "Översätt markeringen" med en undermeny över tillgängliga språk
    - "Korrigera stavningen" för att korrigera fel
3. **Bearbetning:** Beroende på vilket alternativ som väljs:
    - Texten skickas för omformulering via funktionen `rephraseText`
    - Texten skickas för översättning via funktionen `translateText` med det valda målspråket
    - Texten skickas för korrigering via funktionen `correctText`
4. **Visning:** Resultatet ersätter den ursprungliga markeringen i elementet där den markerade texten finns.

### Kommunikation

Kommunikationen mellan `background script` och `content script` sker via Chromes meddelande-API (`chrome.runtime.sendMessage` och `chrome.runtime.onMessage`).

### Datalagring

Tillägget använder `chrome.storage.sync` för att lagra:

-   Konfigurationen för AI-leverantörerna (API-nycklar, valda modeller, anpassade URL:er).
-   Tilläggets alternativ (visning, översättning, banderollfärger med mera).
-   Språkinställningarna för översättning.

Dessa uppgifter lagras lokalt på din dator i webbläsartilläggets lagringsutrymme.
### Felhantering

Möjliga fel (saknad API-nyckel, transkriptionsfel osv.) definieras i filen `constants.js`. Funktionerna `api-utils.js` och `text-processing.js` hanterar potentiella fel vid API-anrop med förbättrade meddelanden beroende på HTTP-koden. `content.js` visar felmeddelanden för användaren via en banner längst ned på sidan.

## 🛡️ Säkerhet och integritet

-   **Dataskydd:**
    -   API-nyckeln lagras säkert i webbläsaren.
    -   Tillägget sparar inte dina ljuddata; all bearbetning sker i realtid.
    -   Kommunikationen med API:erna sker via säkra HTTPS-anslutningar.

För fullständig information om hur BabelFishAI hanterar dina data, se vår [integritetspolicy](PRIVACY.md).

## 🔧 Felsökning

-   **Mikrofonproblem:**

    -   Kontrollera behörigheterna för mikrofonåtkomst i din webbläsare.
    -   Kontrollera att inget annat program använder mikrofonen samtidigt.

-   **Transkriptions-/översättningsfel:**
    -   Kontrollera att API-nyckeln är giltig och aktiv.
    -   Kontrollera att du har en stabil internetanslutning.
    -   Se webbläsarkonsolen för detaljerade loggar om ett fel uppstår.

## 🤝 Bidrag

Bidrag och förslag är välkomna. Så här bidrar du:

-   Rapportera buggar via sektionen Issues på GitHub.
-   Föreslå förbättringar eller nya funktioner.
-   Skicka in dina pull requests.

## 📄 Licens

Detta tillägg distribueras under GNU Affero General Public License v3.0 (AGPL-3.0). Se filen LICENSE för mer information.

## 💝 Stöd

## Om du uppskattar detta tillägg kan du stödja utvecklingen genom att donera via [PayPal](https://paypal.me/jls).

Babel Fish AI har utvecklats av jls42.org med passion och innovation och för transkription och översättning mot nya horisonter med hjälp av avancerad artificiell intelligens.
