# Babel Fish AI - Tillägg för rösttranskription och översättning med AI

Babel Fish AI är ett innovativt Chrome-tillägg ursprungligen designat för att erbjuda kraftfull rösttranskription. Förvandla din röst till text med anmärkningsvärd noggrannhet tack vare OpenAIs Whisper-API, och dra nytta av en automatisk översättning i realtid som ett tillval. Du kan använda Babel Fish AI exklusivt för transkription eller aktivera översättning på språng beroende på dina behov.

## 🌟 Funktioner

- **Avancerad rösttranskription**
  - Fångar ljud av hög kvalitet via enhetens mikrofon.
  - Noggrann transkription utförd av OpenAIs Whisper-API.
  - Flerspråkigt stöd för röstbehandling och textvisning, vilket möjliggör att transkribera talade inlägg på olika språk och visa resultaten på det språk du väljer.
  - Automatisk införing av texten i det aktiva fältet eller visning i en dedikerad dialogruta.

- **Inbyggd automatisk översättning (tillval)**
  - Omedelbar översättning av transkriptioner till flera språk, att aktivera vid behov.
  - Användning av en avancerad AI-modell för att garantera en översättning trogen den ursprungliga meningen.
  - Fritt val att använda enbart transkriptionen eller kombinera transkription och översättning.

- **Intuitivt och anpassningsbart användargränssnitt**
  - Flexibelt visningsläge: aktiv inmatningsruta eller flytande dialogruta.
  - Konfigurerbar statusbar med val av färger, opacitet och visningstid.
  - Tangentbordsgenväg (Ctrl+Shift+1 eller ⌘+Shift+1 på Mac) för att starta/stoppa inspelningen.
  - Anpassad ikon, med en mikrofon och siffran “42”, för omedelbar igenkänning.

- **Avancerade alternativ**
    - Expertläge för detaljerad konfiguration (API-URL:er, konfiguration per domän, etc.).
    - Möjlighet att anpassa modeller för transkription och översättning.
    - **Kompatibilitet med LiteLLM Proxy för att använda alternativa språkmodeller och inaktivera loggning av förfrågningar.**
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

1.  **Nedladdning och installation:**
    - Klona detta repository från GitHub eller ladda ner mappen för tillägget manuellt.
    - Öppna Chrome och gå till `chrome://extensions/`.
    - Aktivera "Utvecklarläge" längst upp till höger.
    - Klicka på "Ladda upppackat tillägg" och välj mappen för Babel Fish AI.

2.  **Verifiering:**
    - Säkerställ att tillägget visas i Chromes verktygsfält med den anpassade ikonen.

## ⚙️ Konfiguration

1.  **OpenAI API-nyckel:**
    *   Klicka på tilläggets ikon för att komma åt inställningarna.
    *   Ange din OpenAI API-nyckel (tillgänglig på [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Anpassning av alternativ:**
    *   Välj visningsläge (aktiv inmatningsruta eller dialogruta).
    *   Konfigurera färg, opacitet och visningstid för statusbaren.
    *   Välj språk för transkription (röstinmatning) och för textvisning.
    *   Aktivera eller inaktivera översättningsfunktionen efter behov.

3.  **(Valfritt) Användning med LiteLLM Proxy:**
    *   Aktivera "Expertläge" i inställningarna.
    *   I avsnittet "Avancerad konfiguration", ändra **de två URL:erna** för API:erna (Whisper och Översättning) så att de pekar på din LiteLLM Proxy-instans. **Använd samma bas-URL för båda.**
    *   Kryssa i rutan "NoLog (endast LiteLLM)" om du vill inaktivera loggning av förfrågningar av LiteLLM.

## 🚀 Användning med LiteLLM Proxy

Babel Fish AI är kompatibelt med [LiteLLM Proxy](https://litellm.ai/), som möjliggör att använda alternativa språkmodeller med ett API som är kompatibelt med OpenAIs.

### Konfiguration

1.  **Installera och konfigurera LiteLLM Proxy:** Följ instruktionerna på LiteLLM:s webbplats.
2.  **Konfigurera Babel Fish AI-tillägget:**
    *   I tilläggets inställningar (högerklicka på ikonen > Inställningar), aktivera "Expertläge".
    *   I avsnittet "Avancerad konfiguration", ändra **de två URL:erna** för API:erna (Whisper och Översättning) så att de pekar på din LiteLLM Proxy-instans (t.ex. `http://localhost:4000/v1/audio/transcriptions` och `http://localhost:4000/v1/chat/completions`). **Använd samma bas-URL för båda.**
    *   Kryssa i rutan "NoLog (endast LiteLLM)" om du vill inaktivera loggning av förfrågningar av LiteLLM.

**Viktigt:** Alternativet "NoLog" är utformat **uteslutande** för att användas med LiteLLM Proxy. **Aktivera det inte** om du använder den officiella OpenAI API:n, eftersom det kommer att orsaka ett fel och hindra översättningen från att fungera.

## 🛠️ Teknisk funktion

### Tilläggsarkitektur

Tillägget består av flera JavaScript-filer som interagerar med varandra:

*   **`manifest.json`:** Huvudkonfigurationsfilen för tillägget. Den definierar behörigheter, skript, tillgängliga resurser, etc. Den använder version 3 av manifestet och deklarerar behörigheterna `activeTab`, `storage`, `commands` och `scripting`. `content_scripts` injiceras på alla URL:er och körs i slutet av dokumentladdningen.
*   **`background.js`:** Servicearbetaren som körs i bakgrunden. Den hanterar händelser (klick på ikonen, tangentbordsgenvägar), injicerar `content script` vid behov och kommunicerar med `content script`.
*   **`content.js`:** Skriptet som injiceras i webbsidorna. Det interagerar direkt med DOM, fångar ljud från mikrofonen, anropar API:erna för transkription och översättning, och visar resultaten.
*   **`src/utils/api.js`:** Innehåller funktionen `transcribeAudio` för att anropa OpenAIs Whisper-API (transkription).
*   **`src/utils/translation.js`:** Innehåller funktionen `translateText` för att anropa OpenAIs GPT-API (översättning).
*   **`src/utils/ui.js`:** Innehåller hjälpfunktioner för att hantera användargränssnittet (banner, dialogruta, kopieringsknapp).
*   **`src/constants.js`:** Definierar konstanter för konfiguration, tillstånd, åtgärder, etc.
*   **`src/pages/options/`:** Innehåller filer för tilläggets inställningssida (HTML, CSS, JavaScript).

### Process för transkription och översättning

1.  **Starta inspelningen:** Användaren startar inspelningen genom att klicka på tilläggets ikon eller använda tangentbordsgenvägen. `background script` skickar ett meddelande till `content script` för att starta inspelningen.
2.  **Ljudinspelning:** `content script` använder API:et `navigator.mediaDevices.getUserMedia` för att få tillgång till mikrofonen och spela in ljud.
3.  **Transkription:** `content script` använder funktionen `transcribeAudio` (`src/utils/api.js`) för att skicka ljudet till OpenAIs Whisper-API. API:t returnerar den transkriberade texten.
4.  **Översättning (tillval):** Om översättningsalternativet är aktiverat använder `content script` funktionen `translateText` (`src/utils/translation.js`) för att skicka den transkriberade texten till OpenAIs GPT-API. API:t returnerar den översatta texten.
5.  **Visning:** `content script` visar den transkriberade (och eventuellt översatta) texten antingen i det aktiva elementet på sidan (om det är ett textfält eller ett redigerbart element) eller i en dialogruta.

### Kommunikation

Kommunikationen mellan `background script` och `content script` sker via Chromes meddelande-API (`chrome.runtime.sendMessage` och `chrome.runtime.onMessage`).

### Datainsamling

Tillägget använder `chrome.storage.sync` för att lagra:

*   OpenAI API-nyckeln (`apiKey`).
*   Tilläggsalternativen (visning, översättning, färger på statusbaren, etc.).

### Felhantering
Möjliga fel (saknad API-nyckel, transkriptionsfel, etc.) definieras i filen `constants.js`. Funktionerna i `api.js` och `translation.js` hanterar potentiella fel från API-anropen. `content.js` visar felmeddelanden till användaren via en banner högst upp på sidan.

## 🛡️ Säkerhet och integritet

- **Dataskydd:**
  - API-nyckeln lagras säkert i Chrome.
  - Tillägget sparar inte dina ljuddata; all bearbetning sker i realtid.
  - Kommunikationen med API:erna sker via säkra HTTPS-anslutningar.

## 🔧 Felsökning

- **Problem med mikrofonen:**
  - Kontrollera mikrofonens åtkomstbehörigheter i Chrome.
  - Se till att ingen annan applikation använder mikrofonen samtidigt.

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

Detta tillägg distribueras under GNU Affero General Public License v3.0 (AGPL-3.0). Se LICENSE-filen för mer information.

## 💝 Stöd

Om du uppskattar detta tillägg kan du stödja dess utveckling genom att göra en donation via [PayPal](https://paypal.me/jls).

---
Utvecklat med passion och innovation av jls42.org, Babel Fish AI driver transkription och översättning mot nya horisonter tack vare avancerad artificiell intelligens.

**Det här dokumentet har översatts från franskan till svenska med hjälp av modellen o3-mini. För mer information om översättningsprocessen, se https://gitlab.com/jls42/ai-powered-markdown-translator**

