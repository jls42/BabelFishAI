# Babel Fish AI - Tillägg för taltranskription och översättning med AI

Babel Fish AI är ett innovativt Chrome-tillägg som ursprungligen designades för att erbjuda kraftfull taltranskription. Förvandla din röst till text med anmärkningsvärd precision tack vare OpenAIs Whisper API och få eventuellt automatisk översättning i realtid. Du kan använda Babel Fish AI enbart för transkription eller aktivera översättning i flykten efter dina behov.

## 🌟 Funktioner

- **Avancerad taltranskription**
  - Fånga högkvalitativt ljud via din enhets mikrofon.
  - Exakt transkription utförd med OpenAIs Whisper API.
  - Flerspråkigt stöd för röstbehandling och textvisning, vilket möjliggör transkription av röstinmatningar på olika språk och visar resultaten på det språk du väljer.
  - Automatisk insättning av text i det aktiva fältet eller visning i en dedikerad dialogruta.

- **Inbyggd automatisk översättning (valfritt)**
  - Omedelbar översättning av transkriptioner till olika språk, som kan aktiveras vid behov.
  - Användning av en avancerad AI-modell för att säkerställa en översättning som är trogen den ursprungliga meningen.
  - Fritt val att antingen enbart använda transkription eller kombinera transkription och översättning.

- **Intuitivt och anpassningsbart användargränssnitt**
  - Flexibelt visningsläge: aktivt inmatningsområde eller flytande dialogruta.
  - Konfigurerbar statusremsa med val av färger, opacitet och visningstid.
  - Tangentbordsgenväg (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac) för att starta/stoppa inspelningen.
  - Anpassad ikon, som innehåller en mikrofon och siffran “42”, för omedelbar igenkänning.

- **Avancerade alternativ**
  - Expertläge för detaljerade konfigurationer (API-URLs, domänspecifik konfiguration, etc.).
  - Möjlighet att anpassa modellerna för transkription och översättning.
  - Fullständig hantering av internationalisering tack vare språkfiler (_locales), som erbjuder ett gränssnitt och röststöd på flera språk.

## 🌐 Stödda språk

- Arabiska
- Tyska
- Engelska
- Spanska
- Franska
- Hindi
- Italienska
- Japanska
- Koreanska
- Nederländska
- Polska
- Portugisiska
- Rumänska
- Svenska
- Kinesiska

## 🚀 Installation

1. **Nedladdning och installation:**
   - Klona detta repository från GitHub eller ladda ner mappen för tillägget manuellt.
   - Öppna Chrome och navigera till `chrome://extensions/`.
   - Aktivera "Utvecklarläge" uppe till höger.
   - Klicka på "Ladda uppackat tillägg" och välj mappen för Babel Fish AI.

2. **Verifiering:**
   - Säkerställ att tillägget visas i Chromes verktygsfält med den anpassade ikonen.

## ⚙️ Konfiguration

1. **OpenAI API-nyckel:**
   - Klicka på tilläggsikonen för att komma åt alternativen.
   - Ange din OpenAI API-nyckel (tillgänglig på [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Anpassning av alternativen:**
   - Välj visningsläge (aktivt område eller dialogruta).
   - Konfigurera färg, opacitet och visningstid för statusremsan.
   - Välj språken för transkription (röstinmatning) och för textvisning.
   - Aktivera eller inaktivera översättningsfunktionen efter behov.

## 🛠️ Teknisk funktionalitet

### Tilläggsarkitektur

Tillägget består av flera JavaScript-filer som interagerar med varandra:

*   **`manifest.json`:** Huvudkonfigurationsfilen för tillägget. Den definierar behörigheter, skript, tillgängliga resurser, etc. Den använder version 3 av manifestet och deklarerar behörigheterna `activeTab`, `storage`, `commands` och `scripting`. `content_scripts` injiceras i alla URL:er och körs i slutet av dokumentets inläsning.
*   **`background.js`:** Servicearbetaren som körs i bakgrunden. Den hanterar händelser (klick på ikonen, tangentbordsgenvägar), injicerar `content script` vid behov och kommunicerar med `content script`.
*   **`content.js`:** Skriptet som injiceras i webbsidor. Det interagerar direkt med DOM, fångar ljudet från mikrofonen, anropar transkriptions- och översättnings-API:er samt visar resultaten.
*   **`src/utils/api.js`:** Innehåller funktionen `transcribeAudio` för att anropa OpenAIs Whisper API (transkription).
*   **`src/utils/translation.js`:** Innehåller funktionen `translateText` för att anropa OpenAIs GPT API (översättning).
*   **`src/utils/ui.js`:** Innehåller hjälpfunktioner för att hantera användargränssnittet (banner, dialogruta, kopiera-knapp).
*   **`src/constants.js`:** Definierar konstanter för konfiguration, tillstånd, åtgärder, etc.
*   **`src/pages/options/`:** Innehåller filerna för tilläggets inställningssida (HTML, CSS, JavaScript).

### Process för transkription och översättning

1.  **Start av inspelning:** Användaren startar inspelningen genom att klicka på tilläggsikonen eller använda tangentbordsgenvägen. `Background script` skickar ett meddelande till `content script` för att starta inspelningen.
2.  **Ljudfångst:** `Content script` använder API:et `navigator.mediaDevices.getUserMedia` för att få tillgång till mikrofonen och spela in ljudet.
3.  **Transkription:** `Content script` använder funktionen `transcribeAudio` (`src/utils/api.js`) för att skicka ljudet till OpenAIs Whisper API. API:et returnerar den transkriberade texten.
4.  **Översättning (valfritt):** Om översättningsalternativet är aktiverat använder `content script` funktionen `translateText` (`src/utils/translation.js`) för att skicka den transkriberade texten till OpenAIs GPT API. API:et returnerar den översatta texten.
5.  **Visning:** `Content script` visar den transkriberade (och eventuellt översatta) texten antingen i sidans aktiva element (om det är ett textruta eller ett redigerbart element) eller i en dialogruta.

### Kommunikation

Kommunikationen mellan `background script` och `content script` sker via Chromes meddelande-API (`chrome.runtime.sendMessage` och `chrome.runtime.onMessage`).

### Lagring av data

Tillägget använder `chrome.storage.sync` för att lagra:

*   OpenAI API-nyckeln (`apiKey`).
*   Tilläggsalternativen (visning, översättning, färger på statusremsan, etc.).

### Hantering av fel

Möjliga fel (saknad API-nyckel, transkriptionsfel, etc.) definieras i filen `constants.js`. Funktionerna i `api.js` och `translation.js` hanterar potentiella fel från API-anropen. `Content.js` visar felmeddelanden för användaren via en banner uppe på sidan.

## 🛡️ Säkerhet och sekretess

- **Dataskydd:**
  - API-nyckeln lagras säkert i Chrome.
  - Tillägget sparar inte din ljuddata; all behandling sker i realtid.
  - Kommunikationen med API:erna sker via säkra HTTPS-anslutningar.

## 🔧 Felsökning

- **Problem med mikrofonen:**
  - Kontrollera mikrofontillstånden i Chrome.
  - Säkerställ att ingen annan applikation använder mikrofonen samtidigt.

- **Fel vid transkription/översättning:**
  - Kontrollera att API-nyckeln är giltig och aktiv.
  - Se till att du har en stabil internetanslutning.
  - Kontrollera Chromes konsol för detaljerade loggar vid fel.

## 🤝 Bidrag

Bidrag och förslag är välkomna. För att bidra:
- Rapportera buggar via Issues-sektionen på GitHub.
- Föreslå förbättringar eller nya funktioner.
- Skicka in dina pull requests.

## 📄 Licens

Detta tillägg distribueras under GNU Affero General Public License v3.0 (AGPL-3.0). Se LICENSE-filen för mer information.

## 💝 Stöd

Om du uppskattar detta tillägg kan du stödja dess utveckling genom att donera via [PayPal](https://paypal.me/jls).

---
Utvecklat av jls42.org med passion och innovation, Babel Fish AI driver transkription och översättning mot nya horisonter tack vare banbrytande artificiell intelligens.

**Detta dokument har översatts från versionen fr till språket sv med hjälp av modellen o3-mini. För mer information om översättningsprocessen, se https://gitlab.com/jls42/ai-powered-markdown-translator**

