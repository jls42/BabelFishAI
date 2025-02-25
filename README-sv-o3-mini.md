# Babel Fish AI - Tillägg för rösttranskription och översättning med AI

**För att använda tillägget behöver du en OpenAI API-nyckel (eller en tredje parts leverantör om du använder LiteLLM Proxy). Du kan generera en OpenAI API-nyckel här : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI är ett innovativt Chrome-tillägg som ursprungligen designades för att erbjuda kraftfull rösttranskription. Förvandla din röst till text med anmärkningsvärd noggrannhet tack vare OpenAI:s Whisper API, och dra tillvalet av en automatisk översättning i realtid. Du kan använda Babel Fish AI enbart för transkription eller aktivera översättning på språng beroende på dina behov.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Funktioner

- **Avancerad rösttranskription**
  - Inspelning av ljud av hög kvalitet via din enhets mikrofon.
  - Exakt transkription utförd av OpenAI:s Whisper API.
  - Flerspråkigt stöd för röstigenkänning och textvisning, vilket gör det möjligt att transkribera röstinmatningar på olika språk och visa resultaten (transkription och översättning, om aktiverad) på det språk du önskar.
  - Automatisk infogning av texten i det aktiva fältet eller visning i en dedikerad dialogruta.

- **Integrerad automatisk översättning (valfritt)**
  - Omedelbar översättning av transkriptioner till olika språk, som kan aktiveras vid behov.
  - Användning av en avancerad AI-modell för att säkerställa en översättning som troget återger den ursprungliga innebörden.
  - Möjlighet att välja att enbart använda transkriptionen eller kombinera transkription med översättning.

- **Intuitivt och anpassningsbart användargränssnitt**
  - Flexibelt visningsläge: aktiva inmatningsfält eller flytande dialogruta.
  - Anpassningsbar statusremsa med val av färger, opacitet och visningstid.
  - Tangentbordsgenväg (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac) för att starta/stopp inspelningen.
  - Anpassad ikon som innehåller en mikrofon och siffran “42” för omedelbar igenkänning.

- **Avancerade alternativ**
    - Expertläge för detaljerade konfigurationer (API-URLs, domänkonfiguration, etc.).
    - Möjlighet att anpassa modellerna för transkription och översättning.
    - Kompatibilitet med LiteLLM Proxy för att ansluta till alternativa språkmodeller och inaktivera loggning av förfrågningar.
    - Fullständig hantering av internationalisering tack vare språkfiler (_locales), vilket erbjuder ett gränssnitt och röststöd på flera språk.

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
- Rumska
- Svenska
- Kinesiska

## 🚀 Installation

1.  **Nedladdning och installation:**
    - Klona detta repository från GitHub eller ladda ner mappen för tillägget manuellt.
    - Öppna Chrome och navigera till `chrome://extensions/`.
    - Aktivera «Utvecklarläge» uppe till höger.
    - Klicka på «Ladda uppackat tillägg» och välj mappen för Babel Fish AI.

2.  **Verifiering:**
    - Se till att tillägget visas i Chromes verktygsfält med den anpassade ikonen.

## ⚙️ Konfiguration

1.  **OpenAI API-nyckel:**
    *   Klicka på tilläggets ikon för att komma åt alternativen.
    *   Ange din OpenAI API-nyckel (tillgänglig på [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Anpassning av inställningar:**
    *   Välj visningsläge (aktivt fält eller dialogruta).
    *   Konfigurera färg, opacitet och visningstid för statusremsan.
    *   Välj språk för transkription (röstinmatning) och för textvisning.
    *   Aktivera eller inaktivera översättningsfunktionen beroende på dina behov.

3.  **(Valfritt) Användning med LiteLLM Proxy:**
    *   Aktivera "Expertläge" i alternativen.
    *   I avsnittet "Avancerad konfiguration", ändra **de två URL:erna** för API:erna (Whisper och översättning) så att de pekar mot din instans av LiteLLM Proxy. **Använd samma bas-URL för båda.**
    *   Bocka i alternativet "NoLog (endast LiteLLM)" om du vill inaktivera loggning av förfrågningar från LiteLLM.

## 🚀 Användning med LiteLLM Proxy

Om du vill använda språkmodeller utöver OpenAI kan du använda LiteLLM Proxy. Så här konfigurerar du det:

Babel Fish AI är kompatibelt med [LiteLLM Proxy](https://litellm.ai/), vilket möjliggör användning av alternativa språkmodeller med en API som är kompatibel med OpenAI:s.

### Konfiguration

1.  **Installera och konfigurera LiteLLM Proxy:** Följ instruktionerna på LiteLLM:s webbplats.
2.  **Konfigurera Babel Fish AI-tillägget:**
    *   I tilläggets inställningar (högerklicka på ikonen > Alternativ), aktivera "Expertläge".
    *   I avsnittet "Avancerad konfiguration", ändra **de två URL:erna** för API:erna (Whisper och översättning) så att de pekar mot din instans av LiteLLM Proxy (t.ex. `http://localhost:4000/v1/audio/transcriptions` och `http://localhost:4000/v1/chat/completions`). **Använd samma bas-URL för båda.**
    *   Bocka i alternativet "NoLog (endast LiteLLM)" om du vill inaktivera loggning av förfrågningar från LiteLLM.

**Viktigt:** Alternativet "NoLog" är utformat **exklusivt** för att användas med LiteLLM Proxy. **Aktivera det inte** om du använder den officiella OpenAI API:n, eftersom detta kommer att orsaka ett fel och hindra översättningen från att fungera.

## 🛠️ Teknisk funktion

### Tilläggsarkitektur

Tillägget består av flera JavaScript-filer som interagerar med varandra:

*   **`manifest.json`:** Huvudkonfigurationsfilen för tillägget. Den definierar behörigheter, skript, tillgängliga resurser, etc. Den använder version 3 av manifestet och deklarerar behörigheterna `activeTab`, `storage`, `commands` och `scripting`. `content_scripts` injiceras på alla URL:er och körs i slutet av dokumentinläsningen.
*   **`background.js`:** Servicearbetaren som körs i bakgrunden. Den hanterar händelser (klick på ikonen, tangentbordsgenvägar), injicerar `content script` vid behov, och kommunicerar med `content script`.
*   **`content.js`:** Skriptet som injiceras på webbsidor. Det interagerar direkt med DOM, spelar in ljud från mikrofonen, anropar API:erna för transkription och översättning, och visar resultaten.
*   **`src/utils/api.js`:** Innehåller funktionen `transcribeAudio` för att anropa OpenAI:s Whisper API (transkription).
*   **`src/utils/translation.js`:** Innehåller funktionen `translateText` för att anropa OpenAI:s GPT API (översättning).
*   **`src/utils/ui.js`:** Innehåller hjälpfunktioner för att hantera användargränssnittet (remsa, dialogruta, kopieringsknapp).
*   **`src/constants.js`:** Definierar konstanter för konfiguration, tillstånd, åtgärder, etc.
*   **`src/pages/options/`:** Innehåller filer för tilläggets inställningssida (HTML, CSS, JavaScript).

### Process för transkription och översättning

1.  **Starta inspelningen:** Användaren startar inspelningen genom att klicka på tilläggets ikon eller använda tangentbordsgenvägen. Bakgrundsskriptet skickar ett meddelande till innehållsskriptet för att starta inspelningen.
2.  **Ljudinspelning:** Innehållsskriptet använder API:et `navigator.mediaDevices.getUserMedia` för att få tillgång till mikrofonen och spela in ljudet.
3.  **Transkription:** Innehållsskriptet använder funktionen `transcribeAudio` (`src/utils/api.js`) för att skicka ljudet till OpenAI:s Whisper API. API:t returnerar den transkriberade texten.
4.  **Översättning (valfritt):** Om översättningsalternativet är aktiverat, använder innehållsskriptet funktionen `translateText` (`src/utils/translation.js`) för att skicka den transkriberade texten till OpenAI:s GPT API. API:t returnerar den översatta texten.
5.  **Visning:** Innehållsskriptet visar antingen den transkriberade (och eventuellt översatta) texten i det aktiva elementet på sidan (om det är ett textfält eller ett redigerbart element) eller i en dialogruta.

### Kommunikation

Kommunikationen mellan bakgrundsskriptet och innehållsskriptet sker via Chromes meddelande-API (`chrome.runtime.sendMessage` och `chrome.runtime.onMessage`).

### Datainlagring

Tillägget använder `chrome.storage.sync` för att lagra:

*   OpenAI API-nyckeln (`apiKey`).
*   Tilläggsinställningarna (visningsläge, översättning, färger för statusremsan, etc.).

Dessa data lagras lokalt på din dator, i lagringen för Chrome-tillägget.

### Felhantering
Möjliga fel (saknad API-nyckel, fel vid transkription, etc.) definieras i filen `constants.js`. Funktionerna i `api.js` och `translation.js` hanterar potentiella fel vid API-anrop. Innehållsskriptet visar felmeddelanden för användaren via en remsa högst upp på sidan.

## 🛡️ Säkerhet och integritet

- **Dataskydd:**
  - API-nyckeln lagras säkert i Chrome.
  - Tillägget sparar inte dina ljuddata; all bearbetning sker i realtid.
  - Kommunikation med API:erna sker via säkra HTTPS-anslutningar.

För fullständig information om hur BabelFishAI hanterar dina data, vänligen konsultera vår [Integritetspolicy](PRIVACY.md).

## 🔧 Felsökning

- **Problem med mikrofonen:**
  - Kontrollera behörigheter för mikrofonåtkomst i Chrome.
  - Se till att inget annat program använder mikrofonen samtidigt.

- **Fel vid transkription/översättning:**
  - Kontrollera att API-nyckeln är giltig och aktiv.
  - Se till att du har en stabil internetanslutning.
  - Konsultera Chromes konsol för att få detaljerade loggar vid eventuella fel.

## 🤝 Bidrag

Bidrag och förslag är välkomna. För att bidra:
- Rapportera buggar via Issues-sektionen på GitHub.
- Föreslå förbättringar eller nya funktioner.
- Skicka in dina pull requests.

## 📄 Licens

Detta tillägg distribueras under GNU Affero General Public License v3.0 (AGPL-3.0). Se filen LICENSE för mer information.

## 💝 Stöd

Om du uppskattar detta tillägg kan du stödja dess utveckling genom att göra en donation via [PayPal](https://paypal.me/jls).
---
Utvecklat med passion och innovation av jls42.org, Babel Fish AI driver transkription och översättning mot nya horisonter med hjälp av banbrytande artificiell intelligens.

**Detta dokument har översatts från versionen fr till språket sv med hjälp av modellen o3-mini. För mer information om översättningsprocessen, besök https://gitlab.com/jls42/ai-powered-markdown-translator**

