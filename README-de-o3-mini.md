# Babel Fish AI – Erweiterung für Spracherkennung und Übersetzung mit KI

Babel Fish AI ist eine innovative Chrome-Erweiterung, die ursprünglich entwickelt wurde, um eine leistungsstarke Spracherkennung bereitzustellen. Verwandeln Sie Ihre Stimme in Text mit bemerkenswerter Präzision dank der Whisper-API von OpenAI und profitieren Sie optional von einer automatischen Echtzeitübersetzung. Sie können Babel Fish AI ausschließlich für die Transkription verwenden oder die Übersetzung nach Bedarf aktivieren.

## 🌟 Funktionen

- **Fortschrittliche Spracherkennung**
  - Hochwertige Audioaufnahme über das Mikrofon Ihres Geräts.
  - Präzise Transkription, realisiert durch die Whisper-API von OpenAI.
  - Mehrsprachige Unterstützung für die Spracherkennung und Textanzeige, die es ermöglicht, Sprachaufnahmen in verschiedenen Sprachen zu transkribieren und die Ergebnisse in der von Ihnen gewählten Sprache anzuzeigen.
  - Automatisches Einfügen des Textes in das aktive Feld oder Anzeige in einem dedizierten Dialogfeld.

- **Integrierte Automatische Übersetzung (Optional)**
  - Sofortige Übersetzung der Transkriptionen in verschiedene Sprachen, bei Bedarf aktivierbar.
  - Einsatz eines fortschrittlichen KI-Modells, um eine dem ursprünglichen Sinn getreue Übersetzung zu gewährleisten.
  - Freie Wahl, ausschließlich die Transkription zu nutzen oder Transkription und Übersetzung zu kombinieren.

- **Intuitive und anpassbare Benutzeroberfläche**
  - Flexibler Anzeigemodus: aktives Eingabefeld oder schwebendes Dialogfenster.
  - Konfigurierbare Statusleiste mit Auswahl von Farben, Transparenz und Anzeigedauer.
  - Tastenkombination (Strg+Shift+1 oder ⌘+Shift+1 auf Mac) zum Starten/Stoppen der Aufnahme.
  - Benutzerdefiniertes Symbol, das ein Mikrofon und die Zahl „42“ integriert, für eine sofortige Erkennung.

- **Erweiterte Optionen**
  - Expertenmodus für detaillierte Einstellungen (API-URLs, domänenspezifische Konfiguration usw.).
  - Möglichkeit der Anpassung der Transkriptions- und Übersetzungsmodelle.
  - **Kompatibilität mit LiteLLM Proxy zur Nutzung alternativer Sprachmodelle und zum Deaktivieren der Anfrageprotokollierung.**
  - Umfassende Verwaltung der Internationalisierung dank Sprachdateien (_locales), die eine mehrsprachige Benutzeroberfläche und Spracherkennung bieten.

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

1.  **Herunterladen und Installieren:**
    - Klonen Sie dieses Repository von GitHub oder laden Sie den Erweiterungsordner manuell herunter.
    - Öffnen Sie Chrome und gehen Sie zu `chrome://extensions/`.
    - Aktivieren Sie den „Entwicklermodus“ oben rechts.
    - Klicken Sie auf „Entpackte Erweiterung laden“ und wählen Sie den Babel Fish AI-Ordner aus.

2.  **Überprüfung:**
    - Vergewissern Sie sich, dass die Erweiterung in der Chrome-Symbolleiste mit dem benutzerdefinierten Symbol erscheint.

## ⚙️ Konfiguration

1.  **OpenAI API-Schlüssel:**
    *   Klicken Sie auf das Erweiterungssymbol, um auf die Optionen zuzugreifen.
    *   Geben Sie Ihren OpenAI API-Schlüssel ein (verfügbar unter [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Anpassung der Optionen:**
    *   Wählen Sie den Anzeigemodus (aktives Feld oder Dialogfenster).
    *   Konfigurieren Sie die Farbe, Transparenz und Anzeigedauer der Statusleiste.
    *   Wählen Sie die Sprachen für die Transkription (Spracheingabe) und für die Textanzeige.
    *   Aktivieren oder deaktivieren Sie die Übersetzungsfunktion je nach Bedarf.

3.  **(Optional) Nutzung mit LiteLLM Proxy:**
    *   Aktivieren Sie im Einstellungsmenü den „Expertenmodus“.
    *   Ändern Sie im Abschnitt „Erweiterte Konfiguration“ **die beiden API-URLs** (Whisper und Übersetzung), damit sie auf Ihre LiteLLM Proxy-Instanz verweisen. **Verwenden Sie dieselbe Basis-URL für beide.**
    *   Aktivieren Sie die Option „NoLog (nur LiteLLM)“, wenn Sie die Protokollierung der Anfragen durch LiteLLM deaktivieren möchten.

## 🚀 Nutzung mit LiteLLM Proxy

Babel Fish AI ist kompatibel mit [LiteLLM Proxy](https://litellm.ai/), welches die Verwendung alternativer Sprachmodelle mit einer API, die mit der von OpenAI kompatibel ist, ermöglicht.

### Konfiguration

1.  **Installieren und konfigurieren Sie LiteLLM Proxy:** Folgen Sie den Anweisungen auf der LiteLLM-Website.
2.  **Konfigurieren Sie die Babel Fish AI-Erweiterung:**
    *   Aktivieren Sie im Erweiterungsmenü (Rechtsklick auf das Symbol > Optionen) den „Expertenmodus“.
    *   Ändern Sie im Abschnitt „Erweiterte Konfiguration“ **die beiden API-URLs** (Whisper und Übersetzung), damit sie auf Ihre LiteLLM Proxy-Instanz verweisen (zum Beispiel `http://localhost:4000/v1/audio/transcriptions` und `http://localhost:4000/v1/chat/completions`). **Verwenden Sie dieselbe Basis-URL für beide.**
    *   Aktivieren Sie die Option „NoLog (nur LiteLLM)“, wenn Sie die Protokollierung der Anfragen durch LiteLLM deaktivieren möchten.

**Wichtig:** Die Option „NoLog“ ist **ausschließlich** für die Verwendung mit LiteLLM Proxy konzipiert. **Aktivieren Sie sie nicht**, wenn Sie die offizielle OpenAI-API verwenden, da dies zu einem Fehler führt und die Übersetzung beeinträchtigt.

## 🛠️ Technischer Betrieb

### Architektur der Erweiterung

Die Erweiterung besteht aus mehreren JavaScript-Dateien, die miteinander interagieren:

*   **`manifest.json`:** Die Hauptkonfigurationsdatei der Erweiterung. Sie definiert die Berechtigungen, Skripte, zugängliche Ressourcen usw. Sie verwendet Version 3 des Manifests und deklariert die Berechtigungen `activeTab`, `storage`, `commands` und `scripting`. Die `content_scripts` werden in alle URLs eingebunden und am Ende des Laden des Dokuments ausgeführt.
*   **`background.js`:** Der Service Worker, der im Hintergrund läuft. Er verwaltet Ereignisse (Klick auf das Symbol, Tastenkombinationen), injiziert bei Bedarf das `content script` und kommuniziert mit diesem.
*   **`content.js`:** Das Skript, das in Webseiten eingebunden wird. Es interagiert direkt mit dem DOM, nimmt Audio vom Mikrofon auf, ruft die Transkriptions- und Übersetzungs-APIs auf und zeigt die Ergebnisse an.
*   **`src/utils/api.js`:** Enthält die Funktion `transcribeAudio`, um die Whisper-API von OpenAI (Transkription) aufzurufen.
*   **`src/utils/translation.js`:** Enthält die Funktion `translateText`, um die GPT-API von OpenAI (Übersetzung) aufzurufen.
*   **`src/utils/ui.js`:** Enthält Hilfsfunktionen zur Verwaltung der Benutzeroberfläche (Banner, Dialogfeld, Kopierschaltfläche).
*   **`src/constants.js`:** Definiert Konstanten für die Konfiguration, Zustände, Aktionen usw.
*   **`src/pages/options/`:** Enthält die Dateien für die Optionsseite der Erweiterung (HTML, CSS, JavaScript).

### Ablauf der Transkription und Übersetzung

1.  **Aufnahmestart:** Der Benutzer startet die Aufnahme, indem er auf das Erweiterungssymbol klickt oder die Tastenkombination verwendet. Das `background script` sendet eine Nachricht an das `content script`, um die Aufnahme zu starten.
2.  **Audioaufnahme:** Das `content script` verwendet die API `navigator.mediaDevices.getUserMedia`, um auf das Mikrofon zuzugreifen und Audio aufzuzeichnen.
3.  **Transkription:** Das `content script` verwendet die Funktion `transcribeAudio` (`src/utils/api.js`), um das Audio an die Whisper-API von OpenAI zu senden. Die API liefert den transkribierten Text zurück.
4.  **Übersetzung (Optional):** Falls die Übersetzungsoption aktiviert ist, verwendet das `content script` die Funktion `translateText` (`src/utils/translation.js`), um den transkribierten Text an die GPT-API von OpenAI zu senden. Die API liefert den übersetzten Text zurück.
5.  **Anzeige:** Das `content script` zeigt den transkribierten (und gegebenenfalls übersetzten) Text entweder im aktiven Element der Seite (wenn es sich um ein Texteingabefeld oder ein bearbeitbares Element handelt) oder in einem Dialogfeld an.

### Kommunikation

Die Kommunikation zwischen dem `background script` und dem `content script` erfolgt über die Chrome-Messaging-API (`chrome.runtime.sendMessage` und `chrome.runtime.onMessage`).

### Datenspeicherung

Die Erweiterung verwendet `chrome.storage.sync`, um zu speichern:

*   Den OpenAI API-Schlüssel (`apiKey`).
*   Die Optionen der Erweiterung (Anzeige, Übersetzung, Farben der Statusleiste usw.).

### Fehlerbehandlung

Mögliche Fehler (fehlender API-Schlüssel, Transkriptionsfehler usw.) sind in der Datei `constants.js` definiert. Die Funktionen in `api.js` und `translation.js` behandeln eventuelle Fehler bei den API-Aufrufen. Das `content.js` zeigt Fehlermeldungen über ein Banner oben auf der Seite an.

## 🛡️ Sicherheit und Datenschutz

- **Datenschutz:**
  - Der API-Schlüssel wird sicher in Chrome gespeichert.
  - Die Erweiterung speichert Ihre Audiodaten nicht; alle Verarbeitungen erfolgen in Echtzeit.
  - Die Kommunikation mit den APIs erfolgt über sichere HTTPS-Verbindungen.

## 🔧 Fehlerbehebung

- **Mikrofonprobleme:**
  - Überprüfen Sie die Mikrofonzugriffsrechte in Chrome.
  - Stellen Sie sicher, dass keine andere Anwendung das Mikrofon gleichzeitig verwendet.

- **Transkriptions-/Übersetzungsfehler:**
  - Überprüfen Sie, ob der API-Schlüssel gültig und aktiv ist.
  - Stellen Sie sicher, dass eine stabile Internetverbindung besteht.
  - Sehen Sie in der Chrome-Konsole nach, um detaillierte Logs im Fehlerfall zu erhalten.

## 🤝 Mitwirken

Beiträge und Vorschläge sind willkommen. Um mitzuwirken:
- Melden Sie Bugs über den Bereich Issues auf GitHub.
- Schlagen Sie Verbesserungen oder neue Funktionen vor.
- Reichen Sie Ihre Pull Requests ein.

## 📄 Lizenz

Diese Erweiterung wird unter der GNU Affero General Public License v3.0 (AGPL-3.0) vertrieben. Weitere Informationen finden Sie in der LICENSE-Datei.

## 💝 Unterstützung

Wenn Sie diese Erweiterung schätzen, können Sie ihre Weiterentwicklung unterstützen, indem Sie über [PayPal](https://paypal.me/jls) spenden.

---
Entwickelt von jls42.org mit Leidenschaft und Innovation, treibt Babel Fish AI die Transkription und Übersetzung mit modernster künstlicher Intelligenz in neue Dimensionen.

**Dieses Dokument wurde von der fr-Version in die Sprache en mithilfe des Modells o3-mini übersetzt. Für weitere Informationen zum Übersetzungsprozess besuchen Sie https://gitlab.com/jls42/ai-powered-markdown-translator.**

