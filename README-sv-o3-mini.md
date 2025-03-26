# Babel Fish AI - Tillägg för rösttranskription och översättning med AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**För att använda tillägget behöver du en OpenAI API-nyckel (eller en tredjepartsleverantör om du använder LiteLLM Proxy). Du kan generera en OpenAI API-nyckel här: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI är ett innovativt Chrome-tillägg som ursprungligen utvecklades för att erbjuda kraftfull rösttranskription. Omvandla din röst till text med anmärkningsvärd precision tack vare OpenAI:s Whisper API, och dra eventuellt nytta av en automatisk översättning i realtid. Du kan använda Babel Fish AI enbart för transkription eller aktivera översättning "on the fly" efter dina behov.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funktioner

- **Avancerad rösttranskription**
  - Ljudupptagning av hög kvalitet via enhetens mikrofon.
  - Exakt transkription utförd av OpenAI:s Whisper API.
  - Flerspråkigt stöd för röstigenkänning och textvisning, vilket möjliggör att transkribera röstinmatningar på olika språk och visa resultaten (transkription och översättning, om aktiverad) på det språk du väljer.
  - Automatisk insättning av texten i det aktiva fältet eller visning i en dedikerad dialogruta.

- **Intelligent översättning och omformulering**
  - Omedelbar översättning av transkriptionerna till olika språk, att aktivera vid behov.
  - Omformulering av texten för att förbättra dess stil och tydlighet.
  - Användning av en avancerad AI-modell för att garantera en översättning som är trogen originalets mening.
  - Friare val att använda enbart transkription eller kombinera transkription med översättning.

- **Kraftfull snabbmeny**
  - Alternativet "Omformulera vald text" för att omedelbart förbättra dina markerade texter.
  - Alternativet "Översätt vald text" med undermeny för alla tillgängliga språk.
  - Direkt ersättning av den markerade texten med dess översatta eller omformulerade version.
  - Perfekt integration i Chromes inbyggda användargränssnitt.

- **Intuitivt och anpassningsbart användargränssnitt**
  - Flexibelt visningsläge: antingen ett aktivt inmatningsfält eller ett flytande dialogfönster.
  - Konfigurerbar statusremsa med möjlighet att välja färger, opacitet och visningstid.
  - Kortkommando (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac) för att starta/stoppa inspelningen.
  - Alternativet "Håll öppen" för att kontrollera hur länge resultaten visas.
  - Anpassad ikon, som integrerar en mikrofon och siffran "42", för omedelbar igenkänning.

- **Avancerade alternativ**
    - Expertläge för detaljerade konfigurationer (API-URL:er, domänspecifik konfiguration, etc.).
    - Möjlighet att anpassa transkriptions- och översättningsmodellerna.
    - Kompatibilitet med LiteLLM Proxy för att ansluta till alternativa språkmodeller och inaktivera loggning av förfrågningar.
    - Fullständig hantering av internationalisering tack vare språkfiler (_locales), vilket erbjuder ett gränssnitt och röststöd på flera språk.

## 🌐 Stödda språk

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
    - Klona detta repository från GitHub eller ladda ner mappen med tillägget manuellt.
    - **Eller installera tillägget direkt från [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Öppna Chrome och gå till `chrome://extensions/`.
    - Aktivera "Utvecklarläge" uppe till höger.
    - Klicka på "Ladda in opackat tillägg" och välj mappen för Babel Fish AI.

2.  **Verifiering:**
    - Se till att tillägget visas i Chromes verktygsfält med den anpassade ikonen.

## ⚙️ Konfiguration

1.  **OpenAI API-nyckel:**
    *   Klicka på tilläggsikonen för att komma åt alternativen.
    *   Ange din OpenAI API-nyckel (tillgänglig på [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Anpassning av alternativ:**
    *   Välj visningsläge (aktivt fält eller dialogruta).
    *   Konfigurera färg, opacitet och visningstid för statusremsan.
    *   Välj vilka språk som ska användas för transkription (röstinmatning) och för textvisning.
    *   Aktivera eller inaktivera översättningsfunktionen efter dina behov.

3.  **(Valfritt) Användning med LiteLLM Proxy:**
    *   Aktivera "Expertläge" i alternativen.
    *   I sektionen "Avancerad konfiguration", ändra **de två API-URL:erna** (Whisper och Översättning) så att de pekar mot din instans av LiteLLM Proxy. **Använd samma bas-URL för båda.**
    *   Bocka i alternativet "NoLog (endast LiteLLM)" om du vill inaktivera loggning av förfrågningar via LiteLLM.

## 🚀 Användning med LiteLLM Proxy

Om du vill använda andra språkmodeller än OpenAI kan du använda LiteLLM Proxy. Så här konfigurerar du det:

Babel Fish AI är kompatibelt med [LiteLLM Proxy](https://litellm.ai/), vilket möjliggör användning av alternativa språkmodeller med ett API kompatibelt med OpenAI:s.

### Konfiguration

1.  **Installera och konfigurera LiteLLM Proxy:** Följ instruktionerna på LiteLLM:s webbplats.
2.  **Konfigurera Babel Fish AI-tillägget:**
    *   I tilläggets alternativ (högerklicka på ikonen > Alternativ), aktivera "Expertläge".
    *   I sektionen "Avancerad konfiguration", ändra **de två API-URL:erna** (Whisper och Översättning) så att de pekar mot din instans av LiteLLM Proxy (till exempel, `http://localhost:4000/v1/audio/transcriptions` och `http://localhost:4000/v1/chat/completions`). **Använd samma bas-URL för båda.**
    *   Bocka i alternativet "NoLog (endast LiteLLM)" om du vill inaktivera loggning av förfrågningar via LiteLLM.

**Viktigt:** Alternativet "NoLog" är uteslutande avsett att användas med LiteLLM Proxy. **Aktivera det inte** om du använder det officiella OpenAI API:t, eftersom detta kommer att leda till ett fel och hindra översättningen från att fungera.

## 🛠️ Teknisk funktion

### Tilläggsarkitektur

Tillägget består av flera JavaScript-filer som interagerar med varandra:

#### Huvudfiler

*   **`manifest.json`:** Huvudkonfigurationsfilen för tillägget. Den definierar behörigheter, skript, åtkomliga resurser, etc. Den använder manifest version 3 och deklarerar behörigheterna `activeTab`, `storage`, `commands`, `scripting` och `contextMenus`.
*   **`background.js`:** Servicearbetaren som körs i bakgrunden. Den hanterar händelser (klick på ikonen, kortkommandon, snabbmeny), injicerar `content script` vid behov, och kommunicerar med `content script`.
*   **`content.js`:** Huvudskriptet som injiceras i webbsidor. Det koordinerar de olika hjälpmodulerna och hanterar flödet för tillägget.
*   **`src/constants.js`:** Definierar konstanter för konfiguration, tillstånd, åtgärder, etc.

#### Hjälpmoduler

Tillägget använder en modulär arkitektur med flera specialiserade hjälpmoduler:

##### API-hantering och databehandling

*   **`src/utils/api.js`:** Innehåller funktioner för att interagera med API:er, bland annat `transcribeAudio` för att anropa OpenAI:s Whisper API.
*   **`src/utils/api-utils.js`:** Avancerade funktioner för interaktion med externa API:er.
*   **`src/utils/translation.js`:** Innehåller funktionerna `translateText` och `rephraseText` för att anropa OpenAI:s GPT API.
*   **`src/utils/text-translation.js`:** Specialiserade funktioner för översättning och omformulering av text.
*   **`src/utils/text-processing.js`:** Allmänna funktioner för textbehandling.

##### Användargränssnitt och interaktion

*   **`src/utils/ui.js`:** Allmänna hjälpfunktioner för användargränssnittet.
*   **`src/utils/banner-utils.js`:** Hanterar statusremsan, dess kontroller och språkväljaren.
*   **`src/utils/focus-utils.js`:** Hanterar sparande och återställande av fokus och textval.
*   **`src/utils/transcription-display.js`:** Hanterar visning av transkriptionsresultaten.
*   **`src/utils/error-utils.js`:** Hanterar visning och hantering av fel.
*   **`src/styles/content.css`:** CSS-stilar för användargränssnittet som injiceras i webbsidorna.

##### Inspelning och händelser

*   **`src/utils/recording-utils.js`:** Hanterar ljudinspelning via mikrofonen och bearbetning av ljuddata.
*   **`src/utils/event-handlers.js`:** Innehåller händelsehanterare för användarinteraktioner.

##### Internationalisering och språk

*   **`src/utils/languages.js`:** Definierar de språk som stöds av tillägget.
*   **`src/utils/languages-shared.js`:** Definierar listan över språk som stöds för webbsidans kontext.
*   **`src/utils/languages-data.js`:** Definierar listan över språk som stöds för servicearbetaren.
*   **`src/utils/i18n.js`:** Hanterar internationaliseringen för användargränssnittet.

##### Alternativsida

*   **`src/pages/options/`:** Innehåller filer för tilläggets alternativsida (HTML, CSS, JavaScript).

### Process för transkription och översättning

#### Huvudfunktion för rösttranskription

1.  **Starta inspelningen:** Användaren startar inspelningen genom att klicka på tilläggsikonen eller använda kortkommandot (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac). `background script` skickar ett meddelande till `content script` för att starta inspelningen.
2.  **Ljudupptagning:** `content script` använder API:et `navigator.mediaDevices.getUserMedia` för att få tillgång till mikrofonen och spela in ljud via MediaRecorder API.
3.  **Transkription:** `content script` använder funktionen `transcribeAudio` (`src/utils/api.js`) för att skicka ljudet till OpenAI:s Whisper API. API:et returnerar den transkriberade texten.
4.  **Översättning eller omformulering (valfritt):** 
   - Om översättningsalternativet är aktiverat, använder `content script` funktionen `translateText` (`src/utils/translation.js`) för att skicka den transkriberade texten till OpenAI:s GPT API.
   - Om omformuleringsalternativet är aktiverat, används funktionen `rephraseText` för att förbättra den transkriberade texten.
5.  **Visning:** `content script` visar den bearbetade texten antingen i det aktiva elementet på sidan (om det är ett textfält eller ett redigerbart element) eller i en anpassad dialogruta.

#### Funktion för snabbmeny

1. **Texturval:** Användaren markerar text på en webbsida.
2. **Snabbmeny:** En högerklick visar alternativen "Omformulera vald text" eller "Översätt vald text" med en undermeny över tillgängliga språk.
3. **Bearbetning:** Beroende på vilket alternativ som väljs:
   - Skickas texten för omformulering via funktionen `rephraseText`
   - Skickas texten för översättning via funktionen `translateText` med det utvalda målspråket
4. **Visning:** Resultatet ersätter den ursprungliga markerade texten i det element där texten fanns.

### Kommunikation

Kommunikationen mellan `background script` och `content script` sker via Chromes meddelande-API (`chrome.runtime.sendMessage` och `chrome.runtime.onMessage`).

### Datahantering

Tillägget använder `chrome.storage.sync` för att lagra:

*   OpenAI API-nyckeln (`apiKey`).
*   Tilläggsalternativen (visning, översättning, färger för statusremsa, etc.).
*   Språkinställningarna för översättningen.

Dessa data lagras lokalt på din dator, i Chrome-tilläggens lagring.

### Felhantering
Möjliga fel (saknad API-nyckel, transkriptionsfel, etc.) definieras i filen `constants.js`. Funktionerna i `api.js` och `translation.js` hanterar potentiella fel vid API-anrop. `content.js` visar felmeddelanden till användaren via en statusremsa högst upp på sidan.

## 🛡️ Säkerhet och integritet

- **Dataskydd:**
  - API-nyckeln lagras säkert i Chrome.
  - Tillägget sparar inte dina ljuddata; all bearbetning sker i realtid.
  - Kommunikationen med API:erna sker via säkra HTTPS-anslutningar.

För fullständig information om hur BabelFishAI hanterar dina data, vänligen se vår [Integritetspolicy](PRIVACY.md).

## 🔧 Felsökning

- **Problem med mikrofonen:**
  - Kontrollera mikrofonåtkomsten i Chrome.
  - Se till att inget annat program använder mikrofonen samtidigt.

- **Fel vid transkription/översättning:**
  - Kontrollera att API-nyckeln är giltig och aktiv.
  - Se till att du har en stabil internetuppkoppling.
  - Kontrollera Chromes konsol för detaljerade loggar vid fel.

## 🤝 Bidra

Bidrag och förslag är välkomna. För att bidra:
- Rapportera buggar via Issues-sektionen på GitHub.
- Föreslå förbättringar eller nya funktioner.
- Skicka in dina pull requests.

## 📄 Licens

Detta tillägg distribueras under GNU Affero General Public License v3.0 (AGPL-3.0). Se LICENSE-filen för mer information.

## 💝 Stöd

Om du uppskattar detta tillägg kan du understödja dess utveckling genom att skänka en donation via [PayPal](https://paypal.me/jls).
---
Utvecklat av jls42.org med passion och innovation, tar Babel Fish AI rösttranskription och översättning till nya höjder tack vare banbrytande artificiell intelligens.

**Det här dokumentet har översatts från versionen fr till språket sv med hjälp av modellen o3-mini. För mer information om översättningsprocessen, se https://gitlab.com/jls42/ai-powered-markdown-translator**

