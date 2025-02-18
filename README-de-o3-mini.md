# Babel Fish AI - Erweiterung für Sprachtranskription und Übersetzung mit KI

**Um die Erweiterung zu nutzen, benötigen Sie einen OpenAI-API-Schlüssel (oder einen Drittanbieter, falls Sie LiteLLM Proxy verwenden). Sie können hier einen OpenAI-API-Schlüssel generieren: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI ist eine innovative Chrome-Erweiterung, die ursprünglich entwickelt wurde, um eine leistungsstarke Sprachtranskription anzubieten. Verwandeln Sie Ihre Stimme in Text mit bemerkenswerter Genauigkeit dank der OpenAI-Whisper-API und profitieren Sie optional von einer automatischen Echtzeitübersetzung. Sie können Babel Fish AI ausschließlich zur Transkription verwenden oder die Übersetzung on-the-fly nach Bedarf aktivieren.

## 🌟 Funktionen

- **Fortschrittliche Sprachtranskription**
  - Aufzeichnung von hochwertigem Audio über das Mikrofon Ihres Geräts.
  - Präzise Transkription, durchgeführt von der OpenAI-Whisper-API.
  - Mehrsprachige Unterstützung für Spracherkennung und Texteinblendung, die es ermöglicht, gesprochene Eingaben in verschiedenen Sprachen zu transkribieren und die Ergebnisse (Transkription und Übersetzung, falls aktiviert) in der von Ihnen gewählten Sprache anzuzeigen.
  - Automatisches Einfügen des Textes in das aktive Feld oder Anzeige in einem eigenen Dialogfenster.

- **Integrierte automatische Übersetzung (optional)**
  - Sofortige Übersetzung der Transkriptionen in verschiedene Sprachen, bei Bedarf aktivierbar.
  - Verwendung eines fortschrittlichen KI-Modells, um eine getreue Übersetzung des ursprünglichen Sinns zu gewährleisten.
  - Freie Wahl, entweder ausschließlich die Transkription zu nutzen oder Transkription und Übersetzung zu kombinieren.

- **Intuitive und anpassbare Benutzeroberfläche**
  - Flexibler Anzeigemodus: aktiver Eingabebereich oder schwebendes Dialogfenster.
  - Konfigurierbares Statusband mit Auswahl von Farben, Opazität und Anzeigedauer.
  - Tastenkombination (Ctrl+Shift+1 oder ⌘+Shift+1 auf Mac) um die Aufnahme zu starten/stoppen.
  - Benutzerdefiniertes Icon, das ein Mikrofon und die Zahl „42“ integriert, für eine sofortige Erkennung.

- **Erweiterte Optionen**
  - Expertenmodus für detaillierte Konfigurationen (API-URLs, domänenspezifische Konfiguration, etc.).
  - Möglichkeit, die Transkriptions- und Übersetzungsmodelle anzupassen.
  - Kompatibilität mit LiteLLM Proxy, um sich mit alternativen Sprachmodellen zu verbinden und die Protokollierung der Anfragen zu deaktivieren.
  - Vollständige Verwaltung der Internationalisierung dank der Sprachdateien (_locales), die eine mehrsprachige Benutzeroberfläche und Sprachausgabe bieten.

## 🌐 Unterstützte Sprachen

- Arabisch
- Deutsch
- Englisch
- Spanisch
- Französisch
- Hindi
- Italienisch
- Japanisch
- Koreanisch
- Niederländisch
- Polnisch
- Portugiesisch
- Rumänisch
- Schwedisch
- Chinesisch

## 🚀 Installation

1.  **Download und Installation:**
    - Klonen Sie dieses Repository von GitHub oder laden Sie den Erweiterungsordner manuell herunter.
    - Öffnen Sie Chrome und gehen Sie zu `chrome://extensions/`.
    - Aktivieren Sie den „Entwicklermodus“ oben rechts.
    - Klicken Sie auf „Entpackte Erweiterung laden“ und wählen Sie den Babel Fish AI-Ordner aus.

2.  **Überprüfung:**
    - Stellen Sie sicher, dass die Erweiterung in der Chrome-Symbolleiste mit dem benutzerdefinierten Icon angezeigt wird.

## ⚙️ Konfiguration

1.  **OpenAI API-Schlüssel:**
    *   Klicken Sie auf das Erweiterungssymbol, um auf die Optionen zuzugreifen.
    *   Geben Sie Ihren OpenAI-API-Schlüssel ein (verfügbar unter [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Anpassung der Optionen:**
    *   Wählen Sie den Anzeigemodus (aktiver Bereich oder Dialogfenster).
    *   Konfigurieren Sie die Farbe, Opazität und Anzeigedauer des Statusbands.
    *   Wählen Sie die Sprachen für die Transkription (stimmliche Eingabe) und für die Textanzeige.
    *   Aktivieren oder deaktivieren Sie die Übersetzungsfunktion nach Bedarf.

3.  **(Optional) Nutzung mit LiteLLM Proxy:**
    *   Aktivieren Sie in den Optionen den „Expertenmodus“.
    *   Ändern Sie im Bereich „Erweiterte Konfiguration“ **die beiden URLs** der APIs (Whisper und Übersetzung), damit sie auf Ihre LiteLLM Proxy-Instanz verweisen. **Verwenden Sie für beide dieselbe Basis-URL.**
    *   Aktivieren Sie die Option „NoLog (nur LiteLLM)“, wenn Sie die Protokollierung der Anfragen durch LiteLLM deaktivieren möchten.

## 🚀 Nutzung mit LiteLLM Proxy

Wenn Sie Sprachmodelle verwenden möchten, die nicht von OpenAI stammen, können Sie LiteLLM Proxy nutzen. So konfigurieren Sie es:

Babel Fish AI ist kompatibel mit [LiteLLM Proxy](https://litellm.ai/), das die Nutzung alternativer Sprachmodelle mit einer API ermöglicht, die mit der von OpenAI kompatibel ist.

### Konfiguration

1.  **Installieren und konfigurieren Sie LiteLLM Proxy:** Folgen Sie den Anweisungen auf der LiteLLM-Website.
2.  **Konfigurieren Sie die Babel Fish AI-Erweiterung:**
    *   Aktivieren Sie in den Optionen der Erweiterung (Rechtsklick auf das Symbol > Optionen) den „Expertenmodus“.
    *   Ändern Sie im Bereich „Erweiterte Konfiguration“ **die beiden URLs** der APIs (Whisper und Übersetzung), damit sie auf Ihre LiteLLM Proxy-Instanz verweisen (zum Beispiel `http://localhost:4000/v1/audio/transcriptions` und `http://localhost:4000/v1/chat/completions`). **Verwenden Sie für beide dieselbe Basis-URL.**
    *   Aktivieren Sie die Option „NoLog (nur LiteLLM)“, wenn Sie die Protokollierung der Anfragen durch LiteLLM deaktivieren möchten.

**Wichtig:** Die Option „NoLog“ ist **ausschließlich** für die Nutzung mit LiteLLM Proxy vorgesehen. **Aktivieren Sie sie nicht**, wenn Sie die offizielle OpenAI-API verwenden, da dies zu einem Fehler führt und die Übersetzung nicht funktioniert.

## 🛠️ Technischer Ablauf

### Architektur der Erweiterung

Die Erweiterung besteht aus mehreren JavaScript-Dateien, die miteinander interagieren:

*   **`manifest.json`:** Die Hauptkonfigurationsdatei der Erweiterung. Sie definiert die Berechtigungen, Skripte, zugänglichen Ressourcen usw. Sie verwendet die Manifest-Version 3 und deklariert die Berechtigungen `activeTab`, `storage`, `commands` und `scripting`. Die `content_scripts` werden in allen URLs eingebettet und am Ende des Dokumentenladens ausgeführt.
*   **`background.js`:** Der Service Worker, der im Hintergrund ausgeführt wird. Er verwaltet Ereignisse (Klick auf das Symbol, Tastenkombinationen), bettet das `content script` bei Bedarf ein und kommuniziert mit diesem.
*   **`content.js`:** Das Skript, das in Webseiten eingebettet wird. Es interagiert direkt mit dem DOM, nimmt Audio vom Mikrofon auf, ruft die Transkriptions- und Übersetzungs-APIs auf und zeigt die Ergebnisse an.
*   **`src/utils/api.js`:** Enthält die Funktion `transcribeAudio`, um die OpenAI-Whisper-API (Transkription) aufzurufen.
*   **`src/utils/translation.js`:** Enthält die Funktion `translateText`, um die OpenAI-GPT-API (Übersetzung) aufzurufen.
*   **`src/utils/ui.js`:** Enthält Hilfsfunktionen für die Verwaltung der Benutzeroberfläche (Banner, Dialogfenster, Kopierbutton).
*   **`src/constants.js`:** Definiert Konstanten für Konfiguration, Zustände, Aktionen usw.
*   **`src/pages/options/`:** Enthält die Dateien für die Optionsseite der Erweiterung (HTML, CSS, JavaScript).

### Prozess der Transkription und Übersetzung

1.  **Start der Aufnahme:** Der Benutzer startet die Aufnahme, indem er auf das Erweiterungssymbol klickt oder die Tastenkombination verwendet. Das `background script` sendet eine Nachricht an das `content script`, um die Aufnahme zu starten.
2.  **Audioaufzeichnung:** Das `content script` verwendet die API `navigator.mediaDevices.getUserMedia`, um auf das Mikrofon zuzugreifen und das Audio aufzuzeichnen.
3.  **Transkription:** Das `content script` nutzt die Funktion `transcribeAudio` (`src/utils/api.js`), um das Audio an die OpenAI-Whisper-API zu senden. Die API liefert den transkribierten Text zurück.
4.  **Übersetzung (optional):** Falls die Übersetzungsoption aktiviert ist, verwendet das `content script` die Funktion `translateText` (`src/utils/translation.js`), um den transkribierten Text an die OpenAI-GPT-API zu senden. Die API liefert den übersetzten Text zurück.
5.  **Anzeige:** Das `content script` zeigt den transkribierten (und gegebenenfalls übersetzten) Text entweder im aktiven Element der Seite (falls es sich um ein Texteingabefeld oder ein editierbares Element handelt) oder in einem Dialogfenster an.

### Kommunikation

Die Kommunikation zwischen dem `background script` und dem `content script` erfolgt über die Chrome-Nachrichten-API (`chrome.runtime.sendMessage` und `chrome.runtime.onMessage`).

### Datenspeicherung

Die Erweiterung verwendet `chrome.storage.sync`, um zu speichern:

*   Den OpenAI API-Schlüssel (`apiKey`).
*   Die Optionen der Erweiterung (Anzeige, Übersetzung, Farben des Statusbands usw.).

Diese Daten werden lokal auf Ihrem Computer, im Chrome-Erweiterungsspeicher, abgelegt.

### Fehlerbehandlung

Mögliche Fehler (fehlender API-Schlüssel, Transkriptionsfehler usw.) sind in der Datei `constants.js` definiert. Die Funktionen in `api.js` und `translation.js` behandeln potenzielle Fehler bei den API-Aufrufen. Das `content.js` zeigt Fehlermeldungen über ein Banner oben auf der Seite an.

## 🛡️ Sicherheit und Datenschutz

- **Datenschutz:**
  - Der API-Schlüssel wird sicher in Chrome gespeichert.
  - Die Erweiterung speichert Ihre Audiodaten nicht; alle Verarbeitungen erfolgen in Echtzeit.
  - Die Kommunikation mit den APIs erfolgt über sichere HTTPS-Verbindungen.

Für vollständige Informationen darüber, wie BabelFishAI Ihre Daten verwaltet, lesen Sie bitte unsere [Datenschutzerklärung](PRIVACY.md).

## 🔧 Fehlerbehebung

- **Mikrofonprobleme:**
  - Überprüfen Sie die Berechtigungen für den Mikrofonzugriff in Chrome.
  - Stellen Sie sicher, dass keine andere Anwendung das Mikrofon gleichzeitig verwendet.

- **Fehler bei Transkription/Übersetzung:**
  - Stellen Sie sicher, dass der API-Schlüssel gültig und aktiv ist.
  - Vergewissern Sie sich, dass Sie eine stabile Internetverbindung haben.
  - Konsultieren Sie die Chrome-Konsole, um detaillierte Protokolle im Fehlerfall zu erhalten.

## 🤝 Mitwirken

Beiträge und Verbesserungsvorschläge sind willkommen. Um beizutragen:
- Melden Sie Fehler über den Bereich „Issues“ auf GitHub.
- Schlagen Sie Verbesserungen oder neue Funktionen vor.
- Reichen Sie Ihre Pull Requests ein.

## 📄 Lizenz

Diese Erweiterung wird unter der GNU Affero General Public License v3.0 (AGPL-3.0) vertrieben. Lesen Sie die Datei LICENSE für weitere Details.

## 💝 Unterstützung

Wenn Sie diese Erweiterung schätzen, können Sie ihre Entwicklung durch eine Spende über [PayPal](https://paypal.me/jls) unterstützen.
---
Entwickelt von jls42.org mit Leidenschaft und Innovation, katapultiert Babel Fish AI die Transkription und Übersetzung dank modernster künstlicher Intelligenz in neue Dimensionen.

**Dieses Dokument wurde von der Version fr in die Sprache en mithilfe des o3-mini Modells übersetzt. Für weitere Informationen zum Übersetzungsprozess besuchen Sie https://gitlab.com/jls42/ai-powered-markdown-translator**

