# Babel Fish AI - Tillägg för rösttranskription och översättning med AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**För att använda tillägget behöver du en OpenAI API-nyckel (eller en tredje parts leverantör om du använder LiteLLM Proxy). Du kan generera en OpenAI API-nyckel här: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI är ett innovativt Chrome-tillägg som ursprungligen designades för att erbjuda kraftfull rösttranskription. Förvandla din röst till text med anmärkningsvärd precision tack vare OpenAI:s Whisper API, och dra valfritt nytta av en automatisk översättning i realtid. Du kan använda Babel Fish AI enbart för transkription eller aktivera översättning "on the fly" beroende på dina behov.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Funktioner

- **Avancerad rösttranskription**
  - Fångar högkvalitativt ljud via enhetens mikrofon.
  - Exakt transkription utförd med OpenAI:s Whisper API.
  - Flerspråkigt stöd för röstigenkänning och textvisning, vilket möjliggör att transkribera röstinmatningar på olika språk och visa resultaten (transkription och översättning, om aktiverat) på det språk du väljer.
  - Automatisk insättning av text i det aktiva fältet eller visning i en dedikerad dialogruta.

- **Inbyggd automatisk översättning (valfritt)**
  - Omedelbar översättning av transkriptioner till flera språk, att aktivera vid behov.
  - Användning av en avancerad AI-modell för att garantera en översättning trogen den ursprungliga meningen.
  - Friheten att enbart använda transkription eller kombinera transkription med översättning.

- **Intuitivt och anpassningsbart användargränssnitt**
  - Flexibelt visningsläge: aktiv inmatningsruta eller flytande dialogfönster.
  - Konfigurerbar statusremsa med val av färger, opacitet och visningstid.
  - Tangentbordsgenväg (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac) för att starta/stoppa inspelningen.
  - Anpassad ikon, med en mikrofon och siffran “42”, för omedelbar igenkänning.

- **Avancerade alternativ**
    - Expertläge för detaljerade konfigurationer (API-URLs, domänbaserad konfiguration, etc.).
    - Möjlighet att anpassa transkriptions- och översättningsmodeller.
    - Kompatibilitet med LiteLLM Proxy för att ansluta till alternativa språkmodeller och inaktivera loggning av förfrågningar.
    - Fullständig hantering av internationalisering tack vare språkfiler (_locales), som erbjuder ett gränssnitt och röststöd på flera språk.

## 🌐 Stödda språk

Här är listan över de språk som Babel Fish AI stödjer, med länkar till demonstrationsvideor:

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

1.  **Nedladdning och installation:**
    - Klona detta repository från GitHub eller ladda ner mappen med tillägget manuellt.
    - **Eller installera tillägget direkt från [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Öppna Chrome och gå till `chrome://extensions/`.
    - Aktivera ”Utvecklarläge” uppe till höger.
    - Klicka på ”Ladda upp packat tillägg” och välj mappen för Babel Fish AI.

2.  **Verifiering:**
    - Se till att tillägget visas i Chromes verktygsfält med den anpassade ikonen.

## ⚙️ Konfiguration

1.  **OpenAI API-nyckel:**
    *   Klicka på tilläggets ikon för att öppna alternativen.
    *   Ange din OpenAI API-nyckel (tillgänglig på [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Anpassning av inställningar:**
    *   Välj visningsläge (aktiv inmatningszon eller dialogruta).
    *   Konfigurera färg, opacitet och visningstid för statusremsan.
    *   Välj språk för transkription (röstinmatning) och för textvisning.
    *   Aktivera eller inaktivera översättningsfunktionen beroende på dina behov.

3.  **(Valfritt) Användning med LiteLLM Proxy:**
    *   Aktivera "Expertläge" i inställningarna.
    *   I avsnittet "Avancerad konfiguration" ändrar du **de två URL:erna** för API:erna (Whisper och översättning) så att de pekar på din LiteLLM Proxy-instans. **Använd samma bas-URL för båda.**
    *   Bocka i alternativet "NoLog (endast LiteLLM)" om du vill inaktivera loggning av förfrågningar via LiteLLM.

## 🚀 Användning med LiteLLM Proxy

Om du vill använda andra språkmodeller än OpenAI kan du använda LiteLLM Proxy. Så här ställer du in den:

Babel Fish AI är kompatibel med [LiteLLM Proxy](https://litellm.ai/), vilket möjliggör att använda alternativa språkmodeller med ett API som är kompatibelt med OpenAI:s.

### Konfiguration

1.  **Installera och konfigurera LiteLLM Proxy:** Följ instruktionerna på LiteLLM:s webbplats.
2.  **Konfigurera Babel Fish AI-tillägget:**
    *   I tilläggets inställningar (högerklicka på ikonen > Alternativ), aktivera "Expertläge".
    *   I avsnittet "Avancerad konfiguration" ändrar du **de två URL:erna** för API:erna (Whisper och översättning) så att de pekar på din LiteLLM Proxy-instans (t.ex. `http://localhost:4000/v1/audio/transcriptions` och `http://localhost:4000/v1/chat/completions`). **Använd samma bas-URL för båda.**
    *   Bocka i alternativet "NoLog (endast LiteLLM)" om du vill inaktivera loggning av förfrågningar via LiteLLM.

**Viktigt:** Alternativet "NoLog" är avsett **exklusivt** att användas med LiteLLM Proxy. **Aktivera det inte** om du använder den officiella OpenAI API:n, eftersom detta kommer att orsaka ett fel och förhindra att översättningen fungerar.

## 🛠️ Teknisk drift

### Tilläggens arkitektur

Tillägget består av flera JavaScript-filer som interagerar med varandra:

*   **`manifest.json`:** Huvudkonfigurationsfilen för tillägget. Den definierar behörigheter, skript, åtkomliga resurser med mera. Den använder version 3 av manifestet och deklarerar behörigheterna `activeTab`, `storage`, `commands` och `scripting`. `content_scripts` injiceras på alla URL:er och körs i slutet av dokumentets laddning.
*   **`background.js`:** Servicearbetaren som körs i bakgrunden. Den hanterar händelser (klick på ikonen, tangentbordsgenvägar), injicerar `content script` vid behov och kommunicerar med `content script`.
*   **`content.js`:** Skriptet som injiceras i webbsidorna. Det interagerar direkt med DOM, fångar ljud från mikrofonen, anropar API:erna för transkription och översättning samt visar resultaten.
*   **`src/utils/api.js`:** Innehåller funktionen `transcribeAudio` för att anropa OpenAI:s Whisper API (transkription).
*   **`src/utils/translation.js`:** Innehåller funktionen `translateText` för att anropa OpenAI:s GPT API (översättning).
*   **`src/utils/ui.js`:** Innehåller hjälpfunktioner för att hantera användargränssnittet (remsa, dialogruta, kopieringsknapp).
*   **`src/constants.js`:** Definierar konstanter för konfiguration, tillstånd, åtgärder med mera.
*   **`src/pages/options/`:** Innehåller filerna för tilläggets alternativsida (HTML, CSS, JavaScript).

### Processen för transkription och översättning

1.  **Start av inspelning:** Användaren startar inspelningen genom att klicka på tilläggets ikon eller använda tangentbordsgenvägen. Bakgrundsskriptet skickar ett meddelande till innehållsskriptet för att starta inspelningen.
2.  **Ljudupptagning:** Innehållsskriptet använder API:et `navigator.mediaDevices.getUserMedia` för att få åtkomst till mikrofonen och spela in ljud.
3.  **Transkription:** Innehållsskriptet använder funktionen `transcribeAudio` (`src/utils/api.js`) för att skicka ljudet till OpenAI:s Whisper API. API:et returnerar den transkriberade texten.
4.  **Översättning (valfritt):** Om översättningsalternativet är aktiverat använder innehållsskriptet funktionen `translateText` (`src/utils/translation.js`) för att skicka den transkriberade texten till OpenAI:s GPT API. API:et returnerar den översatta texten.
5.  **Visning:** Innehållsskriptet visar den transkriberade (och eventuellt översatta) texten antingen i sidans aktiva element (om det är ett textfält eller ett redigerbart element) eller i en dialogruta.

### Kommunikation

Kommunikationen mellan bakgrundsskriptet och innehållsskriptet sker via Chromes meddelande-API (`chrome.runtime.sendMessage` och `chrome.runtime.onMessage`).

### Datainlagring

Tillägget använder `chrome.storage.sync` för att lagra:

*   OpenAI API-nyckeln (`apiKey`).
*   Tilläggsinställningarna (visning, översättning, färger för statusremsa med mera).

Dessa data lagras lokalt på din dator, i Chrome-tilläggens lagringsutrymme.

### Felhantering

Möjliga fel (saknad API-nyckel, transkriptionsfel med mera) definieras i filen `constants.js`. Funktionerna i `api.js` och `translation.js` hanterar potentiella fel vid API-anrop. Innehållsskriptet (`content.js`) visar felmeddelanden till användaren via en remsa högst upp på sidan.

## 🛡️ Säkerhet och integritet

- **Dataskydd:**
  - API-nyckeln lagras säkert i Chrome.
  - Tillägget sparar inte dina ljuddata; all processering sker i realtid.
  - Kommunikation med API:erna sker via säkra HTTPS-anslutningar.

För fullständig information om hur BabelFishAI hanterar dina data, vänligen läs vår [Integritetspolicy](PRIVACY.md).

## 🔧 Felsökning

- **Problem med mikrofonen:**
  - Kontrollera mikrofonbehörigheterna i Chrome.
  - Se till att inget annat program använder mikrofonen samtidigt.

- **Fel vid transkription/översättning:**
  - Kontrollera att API-nyckeln är giltig och aktiv.
  - Se till att du har en stabil internetanslutning.
  - Kontrollera Chromes konsol för detaljerade loggar vid fel.

## 🤝 Bidra

Bidrag och förslag är välkomna. För att bidra:
- Rapportera buggar via Issues-sektionen på GitHub.
- Föreslå förbättringar eller nya funktioner.
- Skicka in dina pull requests.

## 📄 Licens

Detta tillägg distribueras under GNU Affero General Public License v3.0 (AGPL-3.0). Se LICENS-filen för mer information.

## 💝 Stöd

Om du uppskattar detta tillägg kan du stödja dess utveckling genom att donera via [PayPal](https://paypal.me/jls).
---
Utvecklat med passion och innovation av jls42.org, Babel Fish AI driver transkription och översättning mot nya horisonter tack vare banbrytande artificiell intelligens.

**Detta dokument har översatts från fr-versionen till sv-språket med hjälp av o3-mini-modellen. För mer information om översättningsprocessen, se https://gitlab.com/jls42/ai-powered-markdown-translator**

