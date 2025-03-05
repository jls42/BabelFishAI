# Babel Fish AI - Erweiterung für Sprachtranskription und Übersetzung mit KI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Um die Erweiterung zu nutzen, benötigen Sie einen OpenAI-API-Schlüssel (oder einen Drittanbieter, falls Sie LiteLLM Proxy verwenden). Sie können hier einen OpenAI-API-Schlüssel generieren: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI ist eine innovative Chrome-Erweiterung, die ursprünglich dazu entwickelt wurde, eine leistungsstarke Sprachtranskription zu bieten. Verwandeln Sie Ihre Stimme in Text mit bemerkenswerter Präzision mithilfe der OpenAI-Whisper-API und profitieren Sie optional von einer automatischen Echtzeitübersetzung. Sie können Babel Fish AI ausschließlich für die Transkription verwenden oder die Übersetzung je nach Bedarf aktivieren.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Funktionen

- **Erweiterte Sprachtranskription**
  - Aufnahme von hochwertigem Audio über das Mikrofon Ihres Geräts.
  - Präzise Transkription, durchgeführt von der OpenAI-Whisper-API.
  - Mehrsprachige Unterstützung für Spracherkennung und Textanzeige, die es ermöglicht, gesprochene Eingaben in verschiedenen Sprachen zu transkribieren und die Ergebnisse (Transkription und, falls aktiviert, Übersetzung) in der gewünschten Sprache anzuzeigen.
  - Automatisches Einfügen des Textes in das aktive Feld oder Anzeige in einem dedizierten Dialogfenster.

- **Integrierte automatische Übersetzung (optional)**
  - Sofortige Übersetzung der Transkriptionen in verschiedene Sprachen, bei Bedarf aktivierbar.
  - Einsatz eines fortschrittlichen KI-Modells zur Gewährleistung einer getreuen Übersetzung des Originalinhalts.
  - Freie Wahl, ausschließlich die Transkription zu verwenden oder Transkription und Übersetzung zu kombinieren.

- **Intuitive und anpassbare Benutzeroberfläche**
  - Flexibler Anzeigemodus: aktives Eingabefeld oder schwebendes Dialogfenster.
  - Konfigurierbares Statusband mit Auswahl von Farben, Opazität und Anzeigedauer.
  - Tastenkombination (Strg+Shift+1 oder ⌘+Shift+1 auf dem Mac) zum Starten/Stoppen der Aufnahme.
  - Benutzerdefiniertes Symbol, das ein Mikrofon und die Zahl „42“ integriert, zur sofortigen Wiedererkennung.

- **Erweiterte Optionen**
    - Expertenmodus für detaillierte Konfigurationen (API-URLs, domänenspezifische Einstellungen usw.).
    - Möglichkeit, die Modelle für Transkription und Übersetzung anzupassen.
    - Kompatibilität mit LiteLLM Proxy, um sich mit alternativen Sprachmodellen zu verbinden und die Protokollierung von Anfragen zu deaktivieren.
    - Umfassende Verwaltung der Internationalisierung dank Sprachdateien (_locales), die eine mehrsprachige Benutzeroberfläche und Sprachunterstützung bieten.

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

1.  **Herunterladen und Installieren:**
    - Klonen Sie dieses Repository von GitHub oder laden Sie den Erweiterungsordner manuell herunter.
    - **Oder installieren Sie die Erweiterung direkt über den [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Öffnen Sie Chrome und gehen Sie zu `chrome://extensions/`.
    - Aktivieren Sie den „Entwicklermodus“ oben rechts.
    - Klicken Sie auf „Entpackte Erweiterung laden“ und wählen Sie den Babel Fish AI-Ordner aus.

2.  **Überprüfung:**
    - Stellen Sie sicher, dass die Erweiterung mit dem benutzerdefinierten Icon in der Chrome-Symbolleiste angezeigt wird.

## ⚙️ Konfiguration

1.  **OpenAI-API-Schlüssel:**
    *   Klicken Sie auf das Symbol der Erweiterung, um auf die Optionen zuzugreifen.
    *   Geben Sie Ihren OpenAI-API-Schlüssel ein (verfügbar auf [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Anpassung der Optionen:**
    *   Wählen Sie den Anzeigemodus (aktives Feld oder Dialogfenster).
    *   Konfigurieren Sie die Farbe, Opazität und Anzeigedauer des Statusbands.
    *   Wählen Sie die Sprachen für die Transkription (Spracheingabe) und die Texteingabeanzeige.
    *   Aktivieren oder deaktivieren Sie die Übersetzungsfunktion je nach Bedarf.

3.  **(Optional) Nutzung mit LiteLLM Proxy:**
    *   Aktivieren Sie im Optionsmenü den „Expertenmodus“.
    *   Ändern Sie im Bereich „Erweiterte Konfiguration“ **die beiden URLs** der APIs (Whisper und Übersetzung), sodass sie auf Ihre LiteLLM Proxy-Instanz verweisen. **Verwenden Sie für beide dieselbe Basis-URL.**
    *   Aktivieren Sie die Option „NoLog (nur LiteLLM)“, falls Sie die Protokollierung der Anfragen durch LiteLLM deaktivieren möchten.

## 🚀 Nutzung mit LiteLLM Proxy

Falls Sie Sprachmodelle verwenden möchten, die nicht von OpenAI stammen, können Sie LiteLLM Proxy nutzen. So konfigurieren Sie es:

Babel Fish AI ist kompatibel mit [LiteLLM Proxy](https://litellm.ai/), der es ermöglicht, alternative Sprachmodelle mit einer API zu nutzen, die mit der von OpenAI kompatibel ist.

### Konfiguration

1.  **Installieren und konfigurieren Sie LiteLLM Proxy:** Befolgen Sie die Anweisungen auf der LiteLLM-Website.
2.  **Konfigurieren Sie die Babel Fish AI-Erweiterung:**
    *   Aktivieren Sie in den Erweiterungsoptionen (Rechtsklick auf das Symbol > Optionen) den „Expertenmodus“.
    *   Ändern Sie im Bereich „Erweiterte Konfiguration“ **die beiden URLs** der APIs (Whisper und Übersetzung), sodass sie auf Ihre LiteLLM Proxy-Instanz verweisen (zum Beispiel `http://localhost:4000/v1/audio/transcriptions` und `http://localhost:4000/v1/chat/completions`). **Verwenden Sie für beide dieselbe Basis-URL.**
    *   Aktivieren Sie die Option „NoLog (nur LiteLLM)“, falls Sie die Protokollierung der Anfragen durch LiteLLM deaktivieren möchten.

**Wichtig:** Die Option „NoLog“ ist **ausschließlich** für die Nutzung mit LiteLLM Proxy vorgesehen. **Aktivieren Sie sie nicht**, wenn Sie die offizielle OpenAI-API verwenden, da dies zu einem Fehler führt und die Übersetzung beeinträchtigt.

## 🛠️ Technische Funktionsweise

### Architektur der Erweiterung

Die Erweiterung besteht aus mehreren JavaScript-Dateien, die miteinander interagieren:

*   **`manifest.json`:** Die Hauptkonfigurationsdatei der Erweiterung. Sie definiert Berechtigungen, Skripte, zugängliche Ressourcen usw. Sie verwendet die Manifest-Version 3 und deklariert die Berechtigungen `activeTab`, `storage`, `commands` und `scripting`. Die `content_scripts` werden in alle URLs injiziert und am Ende des Dokumenten-Ladevorgangs ausgeführt.
*   **`background.js`:** Der Service Worker, der im Hintergrund läuft. Er verwaltet Ereignisse (Klick auf das Symbol, Tastenkombinationen), injiziert das `content script` bei Bedarf und kommuniziert mit diesem.
*   **`content.js`:** Das Skript, das in Webseiten injiziert wird. Es interagiert direkt mit dem DOM, erfasst Audio über das Mikrofon, ruft die APIs für Transkription und Übersetzung auf und zeigt die Ergebnisse an.
*   **`src/utils/api.js`:** Enthält die Funktion `transcribeAudio`, um die OpenAI-Whisper-API aufzurufen (Transkription).
*   **`src/utils/translation.js`:** Enthält die Funktion `translateText`, um die OpenAI-GPT-API aufzurufen (Übersetzung).
*   **`src/utils/ui.js`:** Enthält Hilfsfunktionen zur Verwaltung der Benutzeroberfläche (Banner, Dialogfenster, Kopierbutton).
*   **`src/constants.js`:** Definiert Konstanten für die Konfiguration, Zustände, Aktionen usw.
*   **`src/pages/options/`:** Enthält die Dateien für die Optionsseite der Erweiterung (HTML, CSS, JavaScript).

### Ablauf der Transkription und Übersetzung

1.  **Start der Aufnahme:** Der Benutzer startet die Aufnahme, indem er auf das Symbol der Erweiterung klickt oder die Tastenkombination verwendet. Das `background script` sendet eine Nachricht an das `content script`, um die Aufnahme zu starten.
2.  **Audioaufnahme:** Das `content script` verwendet die API `navigator.mediaDevices.getUserMedia`, um auf das Mikrofon zuzugreifen und Audio aufzunehmen.
3.  **Transkription:** Das `content script` ruft die Funktion `transcribeAudio` (`src/utils/api.js`) auf, um das Audio an die OpenAI-Whisper-API zu senden. Die API liefert den transkribierten Text zurück.
4.  **Übersetzung (optional):** Falls die Übersetzungsoption aktiviert ist, ruft das `content script` die Funktion `translateText` (`src/utils/translation.js`) auf, um den transkribierten Text an die OpenAI-GPT-API zu senden. Die API liefert den übersetzten Text zurück.
5.  **Anzeige:** Das `content script` zeigt den transkribierten (und gegebenenfalls übersetzten) Text entweder im aktiven Element der Seite (wenn es sich um ein Textfeld oder ein editierbares Element handelt) oder in einem Dialogfenster an.

### Kommunikation

Die Kommunikation zwischen dem `background script` und dem `content script` erfolgt über die Chrome-Nachrichten-API (`chrome.runtime.sendMessage` und `chrome.runtime.onMessage`).

### Datenspeicherung

Die Erweiterung verwendet `chrome.storage.sync`, um zu speichern:

*   Den OpenAI-API-Schlüssel (`apiKey`).
*   Die Optionen der Erweiterung (Anzeige, Übersetzung, Farben des Statusbands usw.).

Diese Daten werden lokal auf Ihrem Computer im Chrome-Erweiterungsspeicher abgelegt.

### Fehlerbehandlung

Mögliche Fehler (fehlender API-Schlüssel, Transkriptionsfehler usw.) sind in der Datei `constants.js` definiert. Die Funktionen in `api.js` und `translation.js` handhaben mögliche API-Aufruf-Fehler. Das `content.js` zeigt Fehlermeldungen dem Benutzer über ein Banner oben auf der Seite an.

## 🛡️ Sicherheit und Datenschutz

- **Datenschutz:**
  - Der API-Schlüssel wird sicher in Chrome gespeichert.
  - Die Erweiterung speichert Ihre Audiodaten nicht; alle Prozesse erfolgen in Echtzeit.
  - Die Kommunikation mit den APIs erfolgt über sichere HTTPS-Verbindungen.

Für vollständige Informationen darüber, wie BabelFishAI Ihre Daten verwaltet, konsultieren Sie bitte unsere [Datenschutzerklärung](PRIVACY.md).

## 🔧 Fehlersuche

- **Mikrofonprobleme:**
  - Überprüfen Sie die Mikrofonberechtigungen in Chrome.
  - Stellen Sie sicher, dass keine andere Anwendung das Mikrofon gleichzeitig verwendet.

- **Fehler bei Transkription/Übersetzung:**
  - Überprüfen Sie, ob der API-Schlüssel gültig und aktiv ist.
  - Stellen Sie sicher, dass Sie über eine stabile Internetverbindung verfügen.
  - Konsultieren Sie die Chrome-Konsole, um bei Fehlern detaillierte Protokolle zu erhalten.

## 🤝 Mitwirken

Beiträge und Vorschläge sind willkommen. Um beizutragen:
- Melden Sie Fehler über den Bereich Issues auf GitHub.
- Schlagen Sie Verbesserungen oder neue Funktionen vor.
- Reichen Sie Ihre Pull Requests ein.

## 📄 Lizenz

Diese Erweiterung wird unter der GNU Affero General Public License v3.0 (AGPL-3.0) vertrieben. Weitere Details finden Sie in der LICENSE-Datei.

## 💝 Unterstützung

Wenn Sie diese Erweiterung zu schätzen wissen, können Sie ihre Weiterentwicklung durch eine Spende über [PayPal](https://paypal.me/jls) unterstützen.
---
Entwickelt von jls42.org mit Leidenschaft und Innovation, katapultiert Babel Fish AI die Transkription und Übersetzung dank modernster künstlicher Intelligenz in neue Dimensionen.

**Dieses Dokument wurde aus der Version fr in die Sprache de übersetzt unter Verwendung des Modells o3-mini. Für weitere Informationen über den Übersetzungsprozess besuchen Sie https://gitlab.com/jls42/ai-powered-markdown-translator.**

