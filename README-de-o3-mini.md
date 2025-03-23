# Babel Fish AI - Erweiterung für Spracherkennung und Übersetzung mit KI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Um die Erweiterung zu nutzen, benötigen Sie einen OpenAI API-Schlüssel (oder einen Drittanbieter, wenn Sie LiteLLM Proxy verwenden). Sie können hier einen OpenAI API-Schlüssel generieren: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI ist eine innovative Chrome-Erweiterung, die ursprünglich entwickelt wurde, um eine leistungsstarke Spracherkennung zu bieten. Verwandeln Sie Ihre Stimme in Text mit bemerkenswerter Präzision dank der Whisper API von OpenAI und profitieren Sie optional von einer automatischen Echtzeitübersetzung. Sie können Babel Fish AI ausschließlich für die Transkription verwenden oder die Übersetzung on-the-fly je nach Bedarf aktivieren.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funktionen

- **Erweiterte Spracherkennung**
  - Hochwertige Audioaufzeichnung über das Mikrofon Ihres Geräts.
  - Präzise Transkription, realisiert durch die Whisper API von OpenAI.
  - Mehrsprachige Unterstützung für Spracherkennung und Textanzeige, die es ermöglicht, gesprochene Eingaben in verschiedenen Sprachen zu transkribieren und die Ergebnisse (Transkription und Übersetzung, falls aktiviert) in der von Ihnen gewählten Sprache anzuzeigen.
  - Automatisches Einfügen des Textes in das aktive Feld oder Anzeige in einem dedizierten Dialogfenster.

- **Intelligente Übersetzung und Umformulierung**
  - Sofortige Übersetzung der Transkriptionen in verschiedene Sprachen, bei Bedarf aktivierbar.
  - Umformulierung des Textes zur Verbesserung von Stil und Klarheit.
  - Einsatz eines fortschrittlichen KI-Modells, um eine getreue Übersetzung des ursprünglichen Sinns zu gewährleisten.
  - Freie Wahl, ausschließlich die Transkription zu verwenden oder Transkription und Übersetzung zu kombinieren.

- **Leistungsstarkes Kontextmenü**
  - Option „Auswahl umformulieren“, um Ihre ausgewählten Texte sofort zu verbessern.
  - Option „Auswahl übersetzen“ mit Untermenu aller verfügbaren Sprachen.
  - Direkter Ersatz des ausgewählten Textes durch seine übersetzte oder umformulierte Version.
  - Perfekte Integration in die native Benutzeroberfläche von Chrome.

- **Intuitive und anpassbare Benutzeroberfläche**
  - Flexibler Anzeigemodus: entweder aktives Eingabefeld oder schwebendes Dialogfenster.
  - Konfigurierbares Statusband mit Auswahl von Farben, Opazität und Anzeigedauer.
  - Tastenkombination (Strg+Shift+1 oder ⌘+Shift+1 auf dem Mac) zum Starten/Stoppen der Aufnahme.
  - Option „Offen halten“, um die Anzeigedauer der Ergebnisse zu steuern.
  - Individuell gestaltetes Icon, das ein Mikrofon und die Zahl „42“ integriert, für eine sofortige Wiedererkennung.

- **Erweiterte Optionen**
    - Expertenmodus für detaillierte Konfigurationen (API-URLs, domänenspezifische Einstellungen etc.).
    - Möglichkeit zur Anpassung der Transkriptions- und Übersetzungsmodelle.
    - Kompatibilität mit LiteLLM Proxy, um sich mit alternativen Sprachmodellen zu verbinden und das Protokollieren von Anfragen zu deaktivieren.
    - Umfassende Verwaltung der Internationalisierung dank Sprachdateien (_locales), die eine mehrsprachige Benutzeroberfläche und Spracherkennung bieten.

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

1.  **Download und Installation:**
    - Klonen Sie dieses Repository von GitHub oder laden Sie den Erweiterungsordner manuell herunter.
    - **Oder installieren Sie die Erweiterung direkt über den [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Öffnen Sie Chrome und gehen Sie zu `chrome://extensions/`.
    - Aktivieren Sie oben rechts den „Entwicklermodus“.
    - Klicken Sie auf „Entpackte Erweiterung laden“ und wählen Sie den Ordner von Babel Fish AI aus.

2.  **Überprüfung:**
    - Stellen Sie sicher, dass die Erweiterung in der Chrome-Toolbar mit dem individuellen Icon erscheint.

## ⚙️ Konfiguration

1.  **OpenAI API-Schlüssel:**
    *   Klicken Sie auf das Erweiterungssymbol, um auf die Optionen zuzugreifen.
    *   Geben Sie Ihren OpenAI API-Schlüssel ein (verfügbar unter [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Anpassung der Optionen:**
    *   Wählen Sie den Anzeigemodus (aktives Feld oder Dialogfenster).
    *   Konfigurieren Sie Farbe, Opazität und Anzeigedauer des Statusbands.
    *   Wählen Sie die Sprachen für die Transkription (Spracheingabe) und für die Textanzeige.
    *   Aktivieren oder deaktivieren Sie die Übersetzungsfunktion je nach Bedarf.

3.  **(Optional) Nutzung mit LiteLLM Proxy:**
    *   Aktivieren Sie den „Expertenmodus“ in den Optionen.
    *   Ändern Sie im Bereich „Erweiterte Konfiguration“ die **beiden URLs** der APIs (Whisper und Übersetzung), sodass sie auf Ihre LiteLLM Proxy-Instanz verweisen. **Verwenden Sie für beide die gleiche Basis-URL.**
    *   Aktivieren Sie die Option „NoLog (nur LiteLLM)“, wenn Sie die Protokollierung von Anfragen durch LiteLLM deaktivieren möchten.

## 🚀 Nutzung mit LiteLLM Proxy

Wenn Sie andere Sprachmodelle als OpenAI nutzen möchten, können Sie LiteLLM Proxy verwenden. So konfigurieren Sie es:

Babel Fish AI ist kompatibel mit [LiteLLM Proxy](https://litellm.ai/), der es ermöglicht, alternative Sprachmodelle mit einer API zu verwenden, die mit der von OpenAI kompatibel ist.

### Konfiguration

1.  **Installieren und konfigurieren Sie LiteLLM Proxy:** Befolgen Sie die Anweisungen auf der LiteLLM-Website.
2.  **Konfigurieren Sie die Babel Fish AI-Erweiterung:**
    *   Aktivieren Sie in den Optionen der Erweiterung (Rechtsklick auf das Icon > Optionen) den „Expertenmodus“.
    *   Ändern Sie im Bereich „Erweiterte Konfiguration“ die **beiden URLs** der APIs (Whisper und Übersetzung), sodass sie auf Ihre LiteLLM Proxy-Instanz verweisen (zum Beispiel `http://localhost:4000/v1/audio/transcriptions` und `http://localhost:4000/v1/chat/completions`). **Verwenden Sie für beide die gleiche Basis-URL.**
    *   Aktivieren Sie die Option „NoLog (nur LiteLLM)“, wenn Sie die Protokollierung von Anfragen durch LiteLLM deaktivieren möchten.

**Wichtig:** Die Option „NoLog“ ist **ausschließlich** zur Nutzung mit LiteLLM Proxy vorgesehen. **Aktivieren Sie sie nicht,** wenn Sie die offizielle OpenAI API verwenden, da dies zu einem Fehler führt und die Übersetzung nicht funktionieren wird.

## 🛠️ Technischer Betrieb

### Architektur der Erweiterung

Die Erweiterung besteht aus mehreren JavaScript-Dateien, die miteinander interagieren:

#### Hauptdateien

*   **`manifest.json`:** Die Hauptkonfigurationsdatei der Erweiterung. Sie definiert die Berechtigungen, Skripte, zugänglichen Ressourcen etc. Sie verwendet Manifest Version 3 und deklariert die Berechtigungen `activeTab`, `storage`, `commands`, `scripting` und `contextMenus`.
*   **`background.js`:** Der Service Worker, der im Hintergrund läuft. Er verwaltet Ereignisse (Klick auf das Icon, Tastenkombinationen, Kontextmenü), injiziert das `content script` falls erforderlich und kommuniziert mit diesem.
*   **`content.js`:** Das Hauptskript, das in Webseiten injiziert wird. Es koordiniert die verschiedenen Hilfsprogramme und steuert den globalen Ablauf der Erweiterung.
*   **`src/constants.js`:** Definiert Konstanten für die Konfiguration, Zustände, Aktionen usw.

#### Hilfsmodule

Die Erweiterung verwendet eine modulare Architektur mit mehreren spezialisierten Hilfsdateien:

##### Verwaltung der APIs und Datenverarbeitung

*   **`src/utils/api.js`:** Enthält Funktionen zur Interaktion mit den APIs, insbesondere `transcribeAudio`, um die Whisper API von OpenAI aufzurufen.
*   **`src/utils/api-utils.js`:** Erweiterte Funktionen für die Interaktion mit externen APIs.
*   **`src/utils/translation.js`:** Enthält die Funktionen `translateText` und `rephraseText`, um die GPT API von OpenAI aufzurufen.
*   **`src/utils/text-translation.js`:** Spezialisierte Funktionen für die Übersetzung und Umformulierung von Text.
*   **`src/utils/text-processing.js`:** Allgemeine Funktionen zur Textverarbeitung.

##### Benutzeroberfläche und Interaktion

*   **`src/utils/ui.js`:** Allgemeine Hilfsfunktionen für die Benutzeroberfläche.
*   **`src/utils/banner-utils.js`:** Verwaltet das Statusbanner, dessen Steuerung und den Sprachselektor.
*   **`src/utils/focus-utils.js`:** Verwaltet das Speichern und Wiederherstellen des Fokus und der Textauswahl.
*   **`src/utils/transcription-display.js`:** Verwaltet die Anzeige der Transkriptionsergebnisse.
*   **`src/utils/error-utils.js`:** Verwaltet die Anzeige und Behandlung von Fehlern.
*   **`src/styles/content.css`:** CSS-Stile für die in Webseiten injizierte Benutzeroberfläche.

##### Aufnahme und Ereignisse

*   **`src/utils/recording-utils.js`:** Verwaltet die Audioaufnahme über das Mikrofon und die Verarbeitung der Audiodaten.
*   **`src/utils/event-handlers.js`:** Enthält die Ereignis-Handler für Benutzerinteraktionen.

##### Internationalisierung und Sprachen

*   **`src/utils/languages.js`:** Definiert die von der Erweiterung unterstützten Sprachen.
*   **`src/utils/languages-shared.js`:** Definiert die Liste der für den Webseitenkontext unterstützten Sprachen.
*   **`src/utils/languages-data.js`:** Definiert die Liste der vom Service Worker unterstützten Sprachen.
*   **`src/utils/i18n.js`:** Verwaltet die Internationalisierung der Benutzeroberfläche.

##### Optionsseite

*   **`src/pages/options/`:** Enthält die Dateien für die Optionsseite der Erweiterung (HTML, CSS, JavaScript).

### Transkriptions- und Übersetzungsprozess

#### Hauptfunktion der Spracherkennung

1.  **Start der Aufnahme:** Der Benutzer startet die Aufnahme, indem er auf das Erweiterungssymbol klickt oder die Tastenkombination (Strg+Shift+1 oder ⌘+Shift+1 auf dem Mac) verwendet. Das `background script` sendet eine Nachricht an das `content script`, um die Aufnahme zu starten.
2.  **Audioaufnahme:** Das `content script` verwendet die API `navigator.mediaDevices.getUserMedia`, um auf das Mikrofon zuzugreifen und den Ton über die MediaRecorder API aufzunehmen.
3.  **Transkription:** Das `content script` verwendet die Funktion `transcribeAudio` (`src/utils/api.js`), um den Ton an die Whisper API von OpenAI zu senden. Die API liefert den transkribierten Text zurück.
4.  **Übersetzung oder Umformulierung (optional):** 
   - Wenn die Übersetzungsoption aktiviert ist, verwendet das `content script` die Funktion `translateText` (`src/utils/translation.js`), um den transkribierten Text an die GPT API von OpenAI zu senden.
   - Wenn die Umformulierungsoption aktiviert ist, wird die Funktion `rephraseText` verwendet, um den transkribierten Text zu verbessern.
5.  **Anzeige:** Das `content script` zeigt den bearbeiteten Text entweder im aktiven Element der Seite (wenn es sich um ein Texteingabefeld oder ein editierbares Element handelt) oder in einem benutzerdefinierten Dialogfenster an.

#### Funktion des Kontextmenüs

1. **Textauswahl:** Der Benutzer markiert Text auf einer Webseite.
2. **Kontextmenü:** Ein Rechtsklick zeigt die Optionen „Auswahl umformulieren“ oder „Auswahl übersetzen“ mit einem Untermenu aller verfügbaren Sprachen an.
3. **Verarbeitung:** Je nach gewählter Option:
   - Wird der Text über die Funktion `rephraseText` zur Umformulierung gesendet.
   - Wird der Text über die Funktion `translateText` zur Übersetzung in die ausgewählte Zielsprache gesendet.
4. **Anzeige:** Das Ergebnis ersetzt die ursprüngliche Auswahl im betreffenden Textelement.

### Kommunikation

Die Kommunikation zwischen dem `background script` und dem `content script` erfolgt über die Messaging-API von Chrome (`chrome.runtime.sendMessage` und `chrome.runtime.onMessage`).

### Datenspeicherung

Die Erweiterung verwendet `chrome.storage.sync`, um zu speichern:

*   Den OpenAI API-Schlüssel (`apiKey`).
*   Die Optionen der Erweiterung (Anzeige, Übersetzung, Farben des Banners usw.).
*   Die Spracheinstellungen für die Übersetzung.

Diese Daten werden lokal auf Ihrem Computer im Speicher der Chrome-Erweiterung gespeichert.

### Fehlerbehandlung
Mögliche Fehler (fehlender API-Schlüssel, Transkriptionsfehler usw.) sind in der Datei `constants.js` definiert. Die Funktionen in `api.js` und `translation.js` behandeln potenzielle Fehler bei API-Aufrufen. Das `content.js` zeigt Fehlermeldungen dem Benutzer über ein Banner oben auf der Seite an.

## 🛡️ Sicherheit und Datenschutz

- **Datenschutz:**
  - Der API-Schlüssel wird in Chrome sicher gespeichert.
  - Die Erweiterung speichert Ihre Audiodaten nicht; alle Verarbeitungen erfolgen in Echtzeit.
  - Die Kommunikation mit den APIs erfolgt über gesicherte HTTPS-Verbindungen.

Für vollständige Informationen darüber, wie BabelFishAI Ihre Daten behandelt, konsultieren Sie bitte unsere [Datenschutzerklärung](PRIVACY.md).

## 🔧 Fehlerbehebung

- **Mikrofonprobleme:**
  - Überprüfen Sie die Berechtigungen für den Mikrofonzugriff in Chrome.
  - Stellen Sie sicher, dass keine andere Anwendung das Mikrofon gleichzeitig verwendet.

- **Fehler bei Transkription/Übersetzung:**
  - Überprüfen Sie, ob der API-Schlüssel gültig und aktiv ist.
  - Stellen Sie sicher, dass Sie über eine stabile Internetverbindung verfügen.
  - Konsultieren Sie die Chrome-Konsole, um detaillierte Logs im Fehlerfall zu erhalten.

## 🤝 Mitwirken

Beiträge und Vorschläge sind willkommen. Um beizutragen:
- Melden Sie Fehler über den Bereich Issues auf GitHub.
- Schlagen Sie Verbesserungen oder neue Funktionen vor.
- Reichen Sie Ihre Pull Requests ein.

## 📄 Lizenz

Diese Erweiterung wird unter der GNU Affero General Public License v3.0 (AGPL-3.0) vertrieben. Weitere Details finden Sie in der Datei LICENSE.

## 💝 Unterstützung

Wenn Sie diese Erweiterung schätzen, können Sie ihre Entwicklung mit einer Spende über [PayPal](https://paypal.me/jls) unterstützen.
---
Entwickelt von jls42.org mit Leidenschaft und Innovation, treibt Babel Fish AI die Transkription und Übersetzung in neue Dimensionen dank fortschrittlicher künstlicher Intelligenz.

**Dieses Dokument wurde von der fr-Version in die en-Sprache unter Verwendung des o3-mini-Modells übersetzt. Für weitere Informationen zum Übersetzungsprozess besuchen Sie https://gitlab.com/jls42/ai-powered-markdown-translator.**

