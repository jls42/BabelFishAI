# Babel Fish AI - Erweiterung für Spracherkennung und Übersetzung mit KI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Um die Erweiterung nutzen zu können, benötigen Sie einen OpenAI API-Schlüssel (oder einen Drittanbieter, wenn Sie LiteLLM Proxy verwenden). Sie können einen OpenAI API-Schlüssel hier generieren: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI ist eine innovative Chrome-Erweiterung, die ursprünglich entwickelt wurde, um eine leistungsstarke Spracherkennung zu bieten. Verwandle deine Stimme in Text mit bemerkenswerter Präzision dank der OpenAI Whisper API und profitiere optional von einer Echtzeit-Übersetzung. Sie können Babel Fish AI ausschließlich für die Transkription verwenden oder die Übersetzung nach Bedarf aktivieren.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funktionen

- **Erweiterte Spracherkennung**
  - Aufnahme von hochwertigem Audio über das Mikrofon Ihres Geräts.
  - Präzise Transkription durchgeführt von der OpenAI Whisper API.
  - Mehrsprachige Unterstützung für die Spracherkennung und Textanzeige, die es ermöglicht, gesprochene Eingaben in verschiedenen Sprachen zu transkribieren und die Ergebnisse (Transkription und Übersetzung, falls aktiviert) in der gewünschten Sprache anzuzeigen.
  - Automatisches Einfügen des Texts in das aktive Feld oder Anzeige in einem dedizierten Dialogfenster.

- **Intelligente Übersetzung und Umformulierung**
  - Sofortige Übersetzung der Transkriptionen in verschiedene Sprachen, nach Bedarf aktivierbar.
  - Umformulierung des Texts zur Verbesserung von Stil und Klarheit.
  - Verwendung eines fortschrittlichen KI-Modells, um eine getreue Übersetzung des ursprünglichen Sinns zu gewährleisten.
  - Freie Wahl, ausschließlich die Transkription zu nutzen oder Transkription und Übersetzung zu kombinieren.

- **Leistungsstarkes Kontextmenü**
  - Option "Auswahl umformulieren", um Ihre ausgewählten Texte sofort zu verbessern.
  - Option "Auswahl übersetzen" mit einem Untermenü aller verfügbaren Sprachen.
  - Direktes Ersetzen des ausgewählten Texts durch seine übersetzte oder umformulierte Version.
  - Perfekte Integration in die native Chrome-Benutzeroberfläche.

- **Intuitive und anpassbare Benutzeroberfläche**
  - Flexibler Anzeigemodus: aktives Eingabefeld oder schwebendes Dialogfenster.
  - Konfigurierbares Statusband mit Farbauswahl, Deckkraft und Anzeigedauer.
  - Tastenkürzel (Strg+Shift+1 bzw. ⌘+Shift+1 auf dem Mac) zum Starten/Stoppen der Aufnahme.
  - Option "Geöffnet halten", um die Anzeigedauer der Ergebnisse zu steuern.
  - Benutzerdefiniertes Icon, das ein Mikrofon und die Zahl "42" integriert, für eine sofortige Erkennung.

- **Erweiterte Optionen**
    - Expertenmodus für detaillierte Konfigurationen (API-URLs, domänenspezifische Einstellungen etc.).
    - Möglichkeit, die Transkriptions- und Übersetzungsmodelle anzupassen.
    - Kompatibilität mit LiteLLM Proxy, um sich mit alternativen Sprachmodellen zu verbinden und die Anfragenprotokollierung zu deaktivieren.
    - Umfassende Verwaltung der Internationalisierung dank der Sprachdateien (_locales), die eine Benutzeroberfläche und Sprachunterstützung in mehreren Sprachen bieten.

## 🌐 Unterstützte Sprachen

Hier ist die Liste der von Babel Fish AI unterstützten Sprachen, mit Links zu Demonstrationsvideos:

- [Arabisch](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [Deutsch](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [Englisch](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [Spanisch](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [Französisch](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [Italienisch](https://www.youtube.com/watch?v=QgYZt8myods)
- [Japanisch](https://www.youtube.com/watch?v=noHEJCnocH8)
- [Koreanisch](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [Niederländisch](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Polnisch](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Portugiesisch](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Rumänisch](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Schwedisch](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Chinesisch](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installation

1.  **Herunterladen und Installation:**
    - Klonen Sie dieses Repository von GitHub oder laden Sie manuell den Erweiterungsordner herunter.
    - **Oder installieren Sie die Erweiterung direkt über den [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Öffnen Sie Chrome und gehen Sie zu `chrome://extensions/`.
    - Aktivieren Sie den « Entwicklermodus » oben rechts.
    - Klicken Sie auf « Unverpackte Erweiterung laden » und wählen Sie den Babel Fish AI-Ordner aus.

2.  **Überprüfung:**
    - Stellen Sie sicher, dass die Erweiterung in der Chrome-Symbolleiste mit dem benutzerdefinierten Icon angezeigt wird.

## ⚙️ Konfiguration

1.  **OpenAI API-Schlüssel:**
    *   Klicken Sie auf das Erweiterungssymbol, um auf die Optionen zuzugreifen.
    *   Geben Sie Ihren OpenAI API-Schlüssel ein (verfügbar auf [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Anpassung der Optionen:**
    *   Wählen Sie den Anzeigemodus (aktiver Bereich oder Dialogfenster).
    *   Konfigurieren Sie die Farbe, die Deckkraft und die Anzeigedauer des Statusbanners.
    *   Wählen Sie die Sprachen für die Transkription (Spracheingabe) und für die Textanzeige.
    *   Aktivieren oder deaktivieren Sie die Übersetzungsfunktion nach Bedarf.

3.  **(Optional) Nutzung mit LiteLLM Proxy:**
    *   Aktivieren Sie im Optionsmenü den "Expertenmodus".
    *   Ändern Sie im Abschnitt "Erweiterte Konfiguration" die **beiden URLs** der APIs (Whisper und Übersetzung), sodass sie auf Ihre LiteLLM Proxy-Instanz verweisen. **Verwenden Sie die gleiche Basis-URL für beide.**
    *   Aktivieren Sie die Option "NoLog (nur LiteLLM)", wenn Sie die Protokollierung der Anfragen durch LiteLLM deaktivieren möchten.

## 🚀 Nutzung mit LiteLLM Proxy

Wenn Sie andere Sprachmodelle als OpenAI verwenden möchten, können Sie LiteLLM Proxy nutzen. So konfigurieren Sie es:

Babel Fish AI ist kompatibel mit [LiteLLM Proxy](https://litellm.ai/), das die Nutzung alternativer Sprachmodelle mit einer mit der OpenAI API kompatiblen Schnittstelle ermöglicht.

### Konfiguration

1.  **Installieren und konfigurieren Sie LiteLLM Proxy:** Befolgen Sie die Anweisungen auf der LiteLLM-Website.
2.  **Konfigurieren Sie die Babel Fish AI-Erweiterung:**
    *   Aktivieren Sie in den Erweiterungsoptionen (Rechtsklick auf das Symbol > Optionen) den "Expertenmodus".
    *   Ändern Sie im Abschnitt "Erweiterte Konfiguration" die **beiden URLs** der APIs (Whisper und Übersetzung), sodass sie auf Ihre LiteLLM Proxy-Instanz verweisen (zum Beispiel, `http://localhost:4000/v1/audio/transcriptions` und `http://localhost:4000/v1/chat/completions`). **Verwenden Sie die gleiche Basis-URL für beide.**
    *   Aktivieren Sie die Option "NoLog (nur LiteLLM)", wenn Sie die Protokollierung der Anfragen durch LiteLLM deaktivieren möchten.

**Wichtig:** Die Option "NoLog" ist **ausschließlich** für die Nutzung mit LiteLLM Proxy konzipiert. **Aktivieren Sie sie nicht**, wenn Sie die offizielle OpenAI API verwenden, da dies einen Fehler verursachen und die Übersetzung verhindern würde.

## 🛠️ Technischer Betrieb

### Architektur der Erweiterung

Die Erweiterung besteht aus mehreren JavaScript-Dateien, die miteinander interagieren:

*   **`manifest.json`:** Die Hauptkonfigurationsdatei der Erweiterung. Sie definiert Berechtigungen, Skripte, zugängliche Ressourcen etc. Sie verwendet Version 3 des Manifests und deklariert die Berechtigungen `activeTab`, `storage`, `commands`, `scripting` und `contextMenus`. Die `web_accessible_resources` ermöglichen den Zugriff auf die Ressourcen der Erweiterung in den verschiedenen Ausführungskontexten.
*   **`background.js`:** Der Service Worker, der im Hintergrund läuft. Er verwaltet Ereignisse (Klick auf das Icon, Tastenkürzel, Kontextmenü), injiziert das `content script` wenn nötig und kommuniziert mit dem `content script`.
*   **`content.js`:** Das Skript, das in Webseiten injiziert wird. Es interagiert direkt mit dem DOM, erfasst Audio vom Mikrofon, ruft die Transkriptions- und Übersetzungs-APIs auf und zeigt die Ergebnisse an.
*   **`src/utils/api.js`:** Enthält Funktionen, die die Interaktion mit den APIs ermöglichen, insbesondere `transcribeAudio`, um die OpenAI Whisper API (Transkription) aufzurufen, sowie Hilfsfunktionen für die Verwaltung des Speichers.
*   **`src/utils/translation.js`:** Enthält die Funktionen `translateText` und `rephraseText`, um die OpenAI GPT API (Übersetzung und Umformulierung) aufzurufen.
*   **`src/utils/ui.js`:** Enthält Hilfsfunktionen für die Benutzeroberfläche (Banner, Dialogfenster, Kopierbutton).
*   **`src/utils/languages-shared.js` und `src/utils/languages-data.js`:** Definieren die zentrale Liste der unterstützten Sprachen, jeweils für den Webseitenkontext und für den Service Worker.
*   **`src/utils/i18n.js`:** Verwaltet die Internationalisierung der Benutzeroberfläche.
*   **`src/constants.js`:** Definiert Konstanten für die Konfiguration, Zustände, Aktionen etc.
*   **`src/pages/options/`:** Enthält Dateien für die Optionsseite der Erweiterung (HTML, CSS, JavaScript).

### Prozess der Transkription und Übersetzung

#### Hauptfunktion der Spracherkennung

1.  **Start der Aufnahme:**  
    Der Benutzer startet die Aufnahme, indem er auf das Erweiterungssymbol klickt oder das Tastenkürzel (Strg+Shift+1 bzw. ⌘+Shift+1 auf dem Mac) verwendet. Das `background script` sendet eine Nachricht an das `content script`, um die Aufnahme zu starten.
2.  **Audioaufnahme:**  
    Das `content script` verwendet die API `navigator.mediaDevices.getUserMedia`, um auf das Mikrofon zuzugreifen und Audio über die MediaRecorder API aufzuzeichnen.
3.  **Transkription:**  
    Das `content script` verwendet die Funktion `transcribeAudio` (`src/utils/api.js`), um das Audio an die OpenAI Whisper API zu senden. Die API gibt den transkribierten Text zurück.
4.  **Übersetzung oder Umformulierung (optional):**  
   - Wenn die Übersetzungsoption aktiviert ist, verwendet das `content script` die Funktion `translateText` (`src/utils/translation.js`), um den transkribierten Text an die OpenAI GPT API zu senden.
   - Wenn die Umformulierungsoption aktiviert ist, wird die Funktion `rephraseText` verwendet, um den transkribierten Text zu verbessern.
5.  **Anzeige:**  
    Das `content script` zeigt den bearbeiteten Text entweder im aktiven Element der Seite (falls es sich um ein Textfeld oder ein editierbares Element handelt) oder in einem benutzerdefinierten Dialogfenster an.

#### Funktion des Kontextmenüs

1. **Textauswahl:**  
   Der Benutzer wählt Text auf einer Webseite aus.
2. **Kontextmenü:**  
   Ein Rechtsklick zeigt die Optionen "Auswahl umformulieren" oder "Auswahl übersetzen" mit einem Untermenü der verfügbaren Sprachen an.
3. **Verarbeitung:**  
   Abhängig von der gewählten Option:
   - Wird der Text zur Umformulierung an die Funktion `rephraseText` gesendet
   - Wird der Text zur Übersetzung an die Funktion `translateText` mit der ausgewählten Zielsprache gesendet
4. **Anzeige:**  
   Das Ergebnis ersetzt die ursprüngliche Auswahl in dem Element, das den ausgewählten Text enthält.

### Kommunikation

Die Kommunikation zwischen dem `background script` und dem `content script` erfolgt über die Chrome Messaging API (`chrome.runtime.sendMessage` und `chrome.runtime.onMessage`).

### Datenspeicherung

Die Erweiterung verwendet `chrome.storage.sync`, um zu speichern:

*   Den OpenAI API-Schlüssel (`apiKey`).
*   Die Erweiterungsoptionen (Anzeige, Übersetzung, Bannerfarben etc.).
*   Die Spracheinstellungen für die Übersetzung.

Diese Daten werden lokal auf Ihrem Computer im Speicher der Chrome-Erweiterung gespeichert.

### Fehlerbehandlung

Mögliche Fehler (fehlender API-Schlüssel, Transkriptionsfehler etc.) sind in der Datei `constants.js` definiert. Die Funktionen in `api.js` und `translation.js` behandeln mögliche Fehler bei den API-Aufrufen. Das `content.js` zeigt Fehlermeldungen über ein Banner oben auf der Seite an.

## 🛡️ Sicherheit und Datenschutz

- **Datenschutz:**
  - Der API-Schlüssel wird sicher in Chrome gespeichert.
  - Die Erweiterung speichert Ihre Audiodaten nicht; alle Verarbeitungen erfolgen in Echtzeit.
  - Die Kommunikation mit den APIs erfolgt über sichere HTTPS-Verbindungen.

Für vollständige Informationen darüber, wie BabelFishAI Ihre Daten verwaltet, konsultieren Sie bitte unsere [Datenschutzerklärung](PRIVACY.md).

## 🔧 Fehlerbehebung

- **Mikrofonprobleme:**
  - Überprüfen Sie die Mikrofonzugriffsberechtigungen in Chrome.
  - Stellen Sie sicher, dass keine andere Anwendung das Mikrofon gleichzeitig verwendet.

- **Transkriptions-/Übersetzungsfehler:**
  - Überprüfen Sie, ob der API-Schlüssel gültig und aktiv ist.
  - Stellen Sie sicher, dass Sie über eine stabile Internetverbindung verfügen.
  - Überprüfen Sie die Chrome-Konsole, um detaillierte Logs im Fehlerfall zu erhalten.

## 🤝 Beitrag

Beiträge und Vorschläge sind willkommen. Um beizutragen:
- Melden Sie Fehler über den Issues-Bereich auf GitHub.
- Schlagen Sie Verbesserungen oder neue Funktionen vor.
- Reichen Sie Ihre Pull-Requests ein.

## 📄 Lizenz

Diese Erweiterung wird unter der GNU Affero General Public License v3.0 (AGPL-3.0) vertrieben. Weitere Details entnehmen Sie bitte der LICENSE-Datei.

## 💝 Unterstützung

Wenn Sie diese Erweiterung schätzen, können Sie ihre Entwicklung durch eine Spende über [PayPal](https://paypal.me/jls) unterstützen.

---
Entwickelt von jls42.org mit Leidenschaft und Innovation, katapultiert Babel Fish AI die Transkription und Übersetzung durch modernste künstliche Intelligenz in neue Sphären.

**Dieses Dokument wurde von der Version fr in die Sprache en unter Verwendung des o3-mini Modells übersetzt. Für weitere Informationen zum Übersetzungsprozess konsultieren Sie https://gitlab.com/jls42/ai-powered-markdown-translator**

