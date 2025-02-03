# Babel Fish AI - Tillägg för rösttranskription och översättning med AI

Babel Fish AI är ett innovativt Chrome-tillägg som ursprungligen skapades för att erbjuda kraftfull rösttranskription. Förvandla din röst till text med anmärkningsvärd precision tack vare OpenAI:s Whisper API, och dra dessutom nytta av en valfri automatisk översättning i realtid. Du kan använda Babel Fish AI enbart för transkription eller aktivera översättning i farten beroende på dina behov.

## 🌟 Funktioner

- **Avancerad rösttranskription**
  - Fångar ljud av hög kvalitet via enhetens mikrofon.
  - Exakt transkription utförd med OpenAI:s Whisper API.
  - Fler språkstödsfunktion för röstbehandling och textvisning, vilket möjliggör transkribering av röstinmatningar på olika språk och visar resultaten på det språk du väljer.
  - Automatisk inmatning av text i det aktiva fältet eller visning i en dedikerad dialogruta.

- **Inbyggd automatisk översättning (valfritt)**
  - Omedelbar översättning av transkriptionerna till olika språk, att aktivera vid behov.
  - Använder en avancerad AI-modell för att garantera en översättning som bevarar originalets mening.
  - Friheten att välja att använda enbart transkription eller att kombinera transkription med översättning.

- **Intuitivt och anpassningsbart användargränssnitt**
  - Flexibelt visningsläge: aktivt inmatningsområde eller flytande dialogruta.
  - Konfigurerbar statusremsa med val av färger, opacitet och visningstid.
  - Tangentbordsgenväg (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac) för att starta/stoppa inspelningen.
  - Anpassad ikon som integrerar en mikrofon och siffran “42” för omedelbar igenkänning.

- **Avancerade alternativ**
  - Expertläge för detaljerade konfigurationer (API-URLs, domänspecifika inställningar etc.).
  - Möjlighet att anpassa modellerna för transkription och översättning.
  - Fullständig hantering av internationalisering tack vare språkfiler (_locales) som erbjuder ett gränssnitt och röststöd på flera språk.

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
   - Klona detta repository från GitHub eller ladda ner mappen med tillägget manuellt.
   - Öppna Chrome och navigera till `chrome://extensions/`.
   - Aktivera "Utvecklarläge" uppe till höger.
   - Klicka på "Ladda upp okomprimerat tillägg" och välj mappen för Babel Fish AI.

2. **Verifiering:**
   - Kontrollera att tillägget visas i Chromes verktygsfält med den anpassade ikonen.

## ⚙️ Konfiguration

1. **OpenAI API-nyckel:**
   - Klicka på tilläggets ikon för att komma åt alternativen.
   - Ange din OpenAI API-nyckel (tillgänglig på [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Anpassning av alternativ:**
   - Välj visningsläge (aktivt inmatningsområde eller dialogruta).
   - Konfigurera färg, opacitet och visningstid för statusremsan.
   - Välj språken för transkription (röstinmatning) och för textvisning.
   - Aktivera eller inaktivera översättningsfunktionen efter behov.

## 🛠️ Teknisk funktion

- **Tilläggsarkitektur:**
  - **Manifest V3:** Filen `manifest.json` definierar innehållsskript, servicearbetaren (`background.js`) och nödvändiga behörigheter.
  - **Bakgrunds- och innehållsskript:** Filen `background.js` hanterar logiken i bakgrunden och kommunikationen med API:erna, medan `content.js` ansvarar för interaktionen med den aktiva webbsidan.
  - **Verktyg och internationalisering:** Mappen `src/utils` innehåller moduler för att hantera API, användargränssnitt, översättning och internationalisering via språkfiler i mappen `_locales`.

- **Process för transkription och översättning:**
  1. **Start av inspelning:** Tillägget fångar din röst via mikrofonen när du klickar på ikonen eller använder tangentbordsgenvägen.
  2. **Transkription:** Ljudet skickas till OpenAI:s Whisper API för att konverteras till text, med stöd för flera inmatningsspråk.
  3. **Översättning (valfritt):** Om aktiverat, översätts transkriptionen automatiskt till det valda målspråket, samtidigt som meningen och kontexten bevaras.
  4. **Visning:** Den transkriberade (och eventuellt översatta) texten infogas i det aktiva fältet eller visas i en anpassad dialogruta.

## 🛡️ Säkerhet och integritet

- **Dataskydd:**
  - API-nyckeln lagras på ett säkert sätt i Chrome.
  - Tillägget sparar inte dina ljuddata; all behandling sker i realtid.
  - Kommunikationskanterna med API:erna använder säkra HTTPS-anslutningar.

## 🔧 Felsökning

- **Problem med mikrofonen:**
  - Kontrollera mikrofontillstånden i Chrome.
  - Se till att ingen annan applikation använder mikrofonen samtidigt.

- **Fel vid transkription/översättning:**
  - Kontrollera att API-nyckeln är giltig och aktiv.
  - Se till att du har en stabil internetuppkoppling.
  - Konsultera Chromes konsol för detaljerade loggar vid eventuella fel.

## 🤝 Bidra

Bidrag och förslag är välkomna. För att bidra:
- Rapportera buggar via Issues-sektionen på GitHub.
- Föreslå förbättringar eller nya funktioner.
- Skicka in dina pull requests.

## 📄 Licens

Detta tillägg distribueras under GNU Affero General Public License v3.0 (AGPL-3.0). Se filen LICENSE för fler detaljer.

## 💝 Stöd

Om du uppskattar detta tillägg kan du stödja utvecklingen genom att ge en donation via [PayPal](https://paypal.me/jls).

---
Utvecklat av jls42.org med passion och innovation, Babel Fish AI driver transkription och översättning mot nya horisonter tack vare den avancerade artificiella intelligensen.

**Detta dokument har översatts från versionen fr till språket sv med hjälp av modellen o3-mini. För mer information om översättningsprocessen, se https://gitlab.com/jls42/ai-powered-markdown-translator**

