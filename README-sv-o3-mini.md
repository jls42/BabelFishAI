# Babel Fish AI - Tillägg för Taltranskription och Översättning med AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**För att använda tillägget behöver du en OpenAI API-nyckel (eller en tredjepartsleverantör om du använder LiteLLM Proxy). Du kan generera en OpenAI API-nyckel här: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI är ett innovativt Chrome-tillägg designat från början för att erbjuda kraftfull taltranskription. Omvandla din röst till text med anmärkningsvärd precision tack vare OpenAIs Whisper API, och få i tillägg en automatisk översättning i realtid. Du kan använda Babel Fish AI enbart för transkription eller aktivera översättning "on the fly" efter dina behov.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funktioner

- **Avancerad Taltranskription**
  - Fångar högkvalitativt ljud via din enhets mikrofon.
  - Exakt transkription utförd av OpenAIs Whisper API.
  - Flerspråkigt stöd för taligenkänning och textvisning, vilket möjliggör transkription av röstinmatningar på olika språk och visar resultaten (transkription och översättning, om aktiverad) på det språk du väljer.
  - Automatisk insättning av text i det aktiva fältet eller visning i en dedikerad dialogruta.

- **Intelligent Översättning och Omformulering**
  - Omedelbar översättning av transkriptioner till olika språk, att aktivera vid behov.
  - Omformulering av texten för att förbättra dess stil och tydlighet.
  - Användning av en avancerad AI-modell för att garantera en översättning trogen originalets innebörd.
  - Friheten att välja att enbart använda transkription eller kombinera transkription och översättning.

- **Kraftfull Kontextmeny**
  - Alternativet "Omformulera markering" för att omedelbart förbättra din markerade text.
  - Alternativet "Översätt markering" med undermeny för alla tillgängliga språk.
  - Direkt ersättning av den markerade texten med dess översatta eller omformulerade version.
  - Perfekt integration i Chromes inbyggda användargränssnitt.

- **Intuitivt och Anpassningsbart Användargränssnitt**
  - Flexibelt visningsläge: aktivt inmatningsområde eller flytande dialogruta.
  - Konfigurerbar statusremsa med val av färger, opacitet och visningstid.
  - Tangentbordsgenväg (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac) för att starta/stoppa inspelning.
  - Alternativet "Håll öppen" för att kontrollera hur länge resultaten visas.
  - Anpassad ikon, som inkluderar en mikrofon och siffran "42", för omedelbar igenkänning.

- **Avancerade Inställningar**
    - Expertenläge för detaljerade konfigurationer (API-URL:er, domänspecifika inställningar, etc.).
    - Möjlighet att anpassa modellerna för transkription och översättning.
    - Kompatibilitet med LiteLLM Proxy för att ansluta till alternativa språkmodeller och inaktivera loggning av förfrågningar.
    - Fullständig hantering av internationalisering tack vare språkfiler (_locales), vilket erbjuder ett gränssnitt och röststöd på flera språk.

## 🌐 Stödda Språk

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
- [Holländska](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Polska](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Portugisiska](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Rumänska](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Svenska](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Kinesiska](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installation

1.  **Nedladdning och Installation:**
    - Klona detta arkiv från GitHub eller ladda ner mappen med tillägget manuellt.
    - **Eller installera tillägget direkt från [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Öppna Chrome och gå till `chrome://extensions/`.
    - Aktivera "Utvecklarläge" uppe till höger.
    - Klicka på "Ladda upp opackat tillägg" och välj mappen för Babel Fish AI.

2.  **Verifiering:**
    - Se till att tillägget visas i Chromes verktygsfält med den anpassade ikonen.

## ⚙️ Konfiguration

1.  **OpenAI API-nyckel:**
    *   Klicka på tilläggets ikon för att komma åt inställningarna.
    *   Ange din OpenAI API-nyckel (tillgänglig på [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Anpassning av Inställningar:**
    *   Välj visningsläge (aktivt område eller dialogruta).
    *   Konfigurera färgen, opaciteten och visningstiden för statusremsan.
    *   Välj språken för transkription (röstinmatning) och för textvisning.
    *   Aktivera eller inaktivera översättningsfunktionen efter behov.

3.  **(Valfritt) Användning med LiteLLM Proxy:**
    *   Aktivera "Expertenläge" i inställningarna.
    *   I avsnittet "Avancerad Konfiguration", ändra **de två URL:erna** för API:erna (Whisper och Översättning) så att de pekar mot din LiteLLM Proxy-instans. **Använd samma bas-URL för båda.**
    *   Bocka i alternativet "NoLog (endast LiteLLM)" om du vill inaktivera loggning av förfrågningar från LiteLLM.

## 🚀 Användning med LiteLLM Proxy

Om du vill använda andra språkmodeller än OpenAI kan du använda LiteLLM Proxy. Så här konfigurerar du det:

Babel Fish AI är kompatibelt med [LiteLLM Proxy](https://litellm.ai/), som möjliggör användning av alternativa språkmodeller med ett API som är kompatibelt med OpenAI:s.

### Konfiguration

1.  **Installera och konfigurera LiteLLM Proxy:** Följ instruktionerna på LiteLLM:s webbplats.
2.  **Konfigurera Babel Fish AI-tillägget:**
    *   I tilläggets inställningar (högerklicka på ikonen > Inställningar), aktivera "Expertenläget".
    *   I avsnittet "Avancerad Konfiguration", ändra **de två URL:erna** för API:erna (Whisper och Översättning) så att de pekar mot din LiteLLM Proxy-instans (t.ex. `http://localhost:4000/v1/audio/transcriptions` och `http://localhost:4000/v1/chat/completions`). **Använd samma bas-URL för båda.**
    *   Bocka i alternativet "NoLog (endast LiteLLM)" om du vill inaktivera loggning av förfrågningar från LiteLLM.

**Viktigt:** Alternativet "NoLog" är utformat **uteslutande** för att användas med LiteLLM Proxy. **Aktivera det inte** om du använder den officiella OpenAI API:n, eftersom detta kommer att orsaka ett fel och förhindra att översättningen fungerar.

## 🛠️ Teknisk Funktionalitet

### Tilläggsarkitektur

Tillägget består av flera JavaScript-filer som interagerar med varandra:

*   **`manifest.json`:** Huvudkonfigurationsfilen för tillägget. Den definierar behörigheter, skript, åtkomliga resurser, etc. Den använder version 3 av manifestet och anger behörigheterna `activeTab`, `storage`, `commands`, `scripting` och `contextMenus`. `web_accessible_resources` möjliggör åtkomst till tilläggets resurser i de olika körsammanhangen.
*   **`background.js`:** Servicearbetaren som körs i bakgrunden. Den hanterar händelser (klick på ikonen, tangentbordsgenvägar, kontextmeny), injicerar `content script` vid behov och kommunicerar med `content script`.
*   **`content.js`:** Skriptet som injiceras i webbsidor. Det interagerar direkt med DOM, fångar ljud från mikrofonen, anropar API:erna för transkription och översättning samt visar resultaten.
*   **`src/utils/api.js`:** Innehåller funktioner för att interagera med API:erna, särskilt `transcribeAudio` för att anropa OpenAIs Whisper API (transkription) samt hjälpfunktioner för att hantera lagring.
*   **`src/utils/translation.js`:** Innehåller funktionerna `translateText` och `rephraseText` för att anropa OpenAIs GPT API (översättning och omformulering).
*   **`src/utils/ui.js`:** Innehåller hjälpfunktioner för att hantera användargränssnittet (remsa, dialogruta, kopieringsknapp).
*   **`src/utils/languages-shared.js` och `src/utils/languages-data.js`:** Definierar den centraliserade listan över stödda språk, respektive för sammanhanget på webbsidan och för servicearbetaren.
*   **`src/utils/i18n.js`:** Hanterar internationalisering för användargränssnittet.
*   **`src/constants.js`:** Definierar konstanter för konfiguration, tillstånd, åtgärder, etc.
*   **`src/pages/options/`:** Innehåller filerna för tilläggets inställningssida (HTML, CSS, JavaScript).

### Process för Transkription och Översättning

#### Huvudfunktion för taltranskription

1.  **Start av Inspelning:** Användaren startar inspelningen genom att klicka på tilläggets ikon eller genom att använda tangentbordsgenvägen (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac). `background script` skickar ett meddelande till `content script` för att starta inspelningen.
2.  **Ljudupptagning:** `content script` använder API:et `navigator.mediaDevices.getUserMedia` för att få tillgång till mikrofonen och spela in ljud via MediaRecorder API.
3.  **Transkription:** `content script` använder funktionen `transcribeAudio` (`src/utils/api.js`) för att skicka ljudet till OpenAIs Whisper API. API:t returnerar den transkriberade texten.
4.  **Översättning eller Omformulering (Valfritt):** 
   - Om översättningsalternativet är aktiverat, använder `content script` funktionen `translateText` (`src/utils/translation.js`) för att skicka den transkriberade texten till OpenAIs GPT API.
   - Om omformuleringsalternativet är aktiverat, används funktionen `rephraseText` för att förbättra den transkriberade texten.
5.  **Visning:** `content script` visar den bearbetade texten antingen i det aktiva elementet på sidan (om det är ett textfält eller en redigerbar komponent), eller i en anpassad dialogruta.

#### Funktion för kontextmeny

1. **Textmarkering:** Användaren markerar text på en webbsida.
2. **Kontextmeny:** Högerklick visas alternativen "Omformulera markering" eller "Översätt markering" med en undermeny för de tillgängliga språken.
3. **Bearbetning:** Beroende på valt alternativ:
   - Skickas texten för omformulering via funktionen `rephraseText`
   - Skickas texten för översättning via funktionen `translateText` med det valda målspråket
4.  **Visning:** Resultatet ersätter den ursprungliga markeringen i det element där texten var markerad.

### Kommunikation

Kommunikationen mellan `background script` och `content script` sker via Chromes meddelande-API (`chrome.runtime.sendMessage` och `chrome.runtime.onMessage`).

### Lagring av Data

Tillägget använder `chrome.storage.sync` för att lagra:

*   OpenAI API-nyckeln (`apiKey`).
*   Tilläggsinställningarna (visning, översättning, färger för statusremsan, etc.).
*   Språkpreferenser för översättning.

Dessa data lagras lokalt på din dator, i Chromes tilläggslagring.

### Felhantering
Möjliga fel (saknad API-nyckel, transkriptionsfel, etc.) definieras i filen `constants.js`. Funktionerna i `api.js` och `translation.js` hanterar potentiella fel vid API-anrop. `content.js` visar felmeddelanden till användaren via en remsa högst upp på sidan.

## 🛡️ Säkerhet och Konfidentialitet

- **Datasäkerhet:**
  - API-nyckeln lagras på ett säkert sätt i Chrome.
  - Tillägget behåller inte ditt ljuddata; all bearbetning sker i realtid.
  - Kommunikationen med API:erna sker via säkra HTTPS-anslutningar.

För fullständig information om hur BabelFishAI hanterar dina data, vänligen se vår [Integritetspolicy](PRIVACY.md).

## 🔧 Felsökning

- **Problem med Mikrofon:**
  - Kontrollera behörigheterna för mikrofonåtkomst i Chrome.
  - Se till att inget annat program använder mikrofonen samtidigt.

- **Fel vid Transkription/Översättning:**
  - Kontrollera att API-nyckeln är giltig och aktiv.
  - Säkerställ att du har en stabil internetanslutning.
  - Konsultera Chromes konsol för detaljerade loggar vid fel.

## 🤝 Bidrag

Bidrag och förslag är välkomna. För att bidra:
- Rapportera buggar via Issues-sektionen på GitHub.
- Föreslå förbättringar eller nya funktioner.
- Skicka in dina pull requests.

## 📄 Licens

Detta tillägg distribueras under GNU Affero General Public License v3.0 (AGPL-3.0). Se LICENSE-filen för mer information.

## 💝 Stöd

Om du uppskattar detta tillägg kan du stödja utvecklingen genom att donera via [PayPal](https://paypal.me/jls).
---
Utvecklat med passion och innovation av jls42.org, Babel Fish AI driver transkription och översättning mot nya horisonter tack vare banbrytande artificiell intelligens.

**Detta dokument har översatts från versionen fr till språket sv med hjälp av o3-mini-modellen. För mer information om översättningsprocessen, se https://gitlab.com/jls42/ai-powered-markdown-translator**

