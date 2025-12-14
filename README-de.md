# Babel Fish AI - Sprachtranskriptions- und Übersetzungserweiterung mit KI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Um die Erweiterung zu nutzen, benötigen Sie einen API-Schlüssel von einem der unterstützten Anbieter:**

| Anbieter | API-Schlüssel erhalten |
|:--------:|:-----------------------|
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) |
| <img src="images/openai-logo.png" alt="OpenAI" height="30"> | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
| 🚅 | **Custom/LiteLLM**: Zur Verwendung eigener API-Endpunkte |

Babel Fish AI ist eine innovative Chrome-Erweiterung, die für eine leistungsstarke Sprachtranskription mit Multi-Provider-Unterstützung entwickelt wurde. Verwandeln Sie Ihre Stimme mit bemerkenswerter Genauigkeit in Text dank der Transkriptions-APIs von Mistral AI (Voxtral) oder OpenAI (Whisper) und profitieren Sie optional von einer automatischen Echtzeit-Übersetzung. Sie können Babel Fish AI ausschließlich für die Transkription verwenden oder die Übersetzung bei Bedarf aktivieren.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funktionen

- **Erweiterte Sprachtranskription**
  - Hochwertige Audioaufnahme über das Mikrofon Ihres Geräts.
  - Präzise Transkription über die APIs Voxtral (Mistral AI) oder Whisper (OpenAI).
  - Multi-Provider-Unterstützung: Wählen Sie frei zwischen Mistral AI, OpenAI oder einem benutzerdefinierten Endpunkt.
  - Mehrsprachige Unterstützung für Spracherkennung und Textanzeige, die es Ihnen ermöglicht, Spracheingaben in verschiedenen Sprachen zu transkribieren und Ergebnisse (Transkription und Übersetzung, falls aktiviert) in der Sprache Ihrer Wahl anzuzeigen.
  - Automatisches Einfügen des Textes in das aktive Feld oder Anzeige in einem speziellen Dialogfeld.

- **Intelligente Übersetzung und Umformulierung**
  - Sofortige Übersetzung von Transkriptionen in verschiedene Sprachen, bei Bedarf aktivierbar.
  - Umformulierung von Text zur Verbesserung von Stil und Klarheit.
  - Verwendung eines fortschrittlichen KI-Modells, um eine Übersetzung zu gewährleisten, die der ursprünglichen Bedeutung treu bleibt.
  - Freie Wahl, ausschließlich die Transkription zu nutzen oder Transkription und Übersetzung zu kombinieren.

- **Leistungsstarkes Kontextmenü**
  - Option "Auswahl umformulieren", um Ihre ausgewählten Texte sofort zu verbessern.
  - Option "Auswahl übersetzen" mit einem Untermenü aller verfügbaren Sprachen.
  - Option "Rechtschreibung korrigieren", um Rechtschreib-, Grammatik- und Zeichensetzungsfehler zu korrigieren.
  - Direkter Austausch des ausgewählten Textes durch seine übersetzte, umformulierte oder korrigierte Version.
  - Perfekte Integration in die native Benutzeroberfläche von Chrome.

- **Intuitive und anpassbare Benutzeroberfläche**
  - Flexibler Anzeigemodus: aktiver Eingabebereich oder schwebendes Dialogfenster.
  - Konfigurierbares Statusbanner mit Auswahl von Farben, Deckkraft und Anzeigedauer.
  - Tastenkombination (Ctrl+Shift+1 oder ⌘+Shift+1 auf Mac) zum Starten/Stoppen der Aufnahme.
  - Option "Offen halten", um die Anzeigedauer der Ergebnisse zu steuern.
  - Benutzerdefiniertes Symbol, das ein Mikrofon und die Zahl "42" integriert, für sofortige Wiedererkennung.

- **Erweiterte Optionen**
    - Multi-Provider-Unterstützung: Mistral AI, OpenAI und Custom/LiteLLM für maximale Flexibilität.
    - Möglichkeit, Transkriptions- und Übersetzungsmodelle pro Anbieter anzupassen.
    - Unabhängige Auswahl des Anbieters für Transkription und Übersetzung/Umformulierung.
    - Kompatibilität mit LiteLLM Proxy über den Custom-Provider zur Verbindung mit alternativen Modellen.
    - Vollständiges Internationalisierungsmanagement durch Sprachdateien (_locales), das eine Schnittstelle und Sprachunterstützung in mehreren Sprachen bietet.

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
    - Klonen Sie dieses Repository von GitHub oder laden Sie den Erweiterungsordner manuell herunter.
    - **Oder installieren Sie die Erweiterung direkt aus dem [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Öffnen Sie Chrome und gehen Sie zu `chrome://extensions/`.
    - Aktivieren Sie den "Entwicklermodus" oben rechts.
    - Klicken Sie auf "Entpackte Erweiterung laden" und wählen Sie den Ordner von Babel Fish AI aus.

2.  **Überprüfung:**
    - Stellen Sie sicher, dass die Erweiterung in der Chrome-Symbolleiste mit dem benutzerdefinierten Symbol erscheint.

## ⚙️ Konfiguration

1.  **Konfiguration des KI-Providers:**
    *   Klicken Sie auf das Erweiterungssymbol, um zu den Optionen zu gelangen.
    *   Wählen Sie Ihren Anbieter aus dem Dropdown-Menü (Mistral AI, OpenAI oder Custom/LiteLLM).
    *   Geben Sie Ihren API-Schlüssel ein:
        - **Mistral AI**: verfügbar unter [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        - **OpenAI**: verfügbar unter [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    *   Aktivieren Sie den Anbieter mit dem Schalter neben dem Dropdown-Menü.

2.  **Anpassung der Optionen:**
    *   Wählen Sie den Anzeigemodus (aktiver Bereich oder Dialogfeld).
    *   Konfigurieren Sie Farbe, Deckkraft und Anzeigedauer des Statusbanners.
    *   Wählen Sie die Sprachen für die Transkription (Spracheingabe) und die Textanzeige.
    *   Aktivieren oder deaktivieren Sie die Übersetzungsfunktion nach Bedarf.

3.  **(Optional) Erweiterte Modellkonfiguration:**
    *   Klicken Sie in den Optionen jedes Anbieters auf "Modellkonfiguration", um die verwendeten Modelle anzupassen.
    *   Sie können benutzerdefinierte Modelle für Transkription und Übersetzung/Umformulierung hinzufügen.
    *   Wenn mehrere Anbieter aktiviert sind, können Sie wählen, welchen Sie für jeden Dienst (Transkription und Übersetzung) verwenden möchten.

## 🚀 Verwendung mit LiteLLM Proxy oder benutzerdefinierten Endpunkten

Babel Fish AI ist kompatibel mit [LiteLLM Proxy](https://litellm.ai/) und anderen OpenAI-kompatiblen API-Proxies, was die Verwendung alternativer Sprachmodelle ermöglicht.

### Konfiguration

1.  **Installieren und konfigurieren Sie Ihren Proxy:** Befolgen Sie die Anweisungen für den Dienst, den Sie verwenden (LiteLLM, etc.).
2.  **Konfigurieren Sie die Babel Fish AI Erweiterung:**
    *   Wählen Sie in den Erweiterungsoptionen den Anbieter **Custom/LiteLLM** aus dem Dropdown-Menü.
    *   Geben Sie Ihren API-Schlüssel ein (falls erforderlich).
    *   Konfigurieren Sie die API-URLs:
        - **Transkriptions-URL**: z.B. `http://localhost:4000/v1/audio/transcriptions`
        - **Chat-URL**: z.B. `http://localhost:4000/v1/chat/completions`
    *   Aktivieren Sie den Anbieter mit dem Schalter.
    *   Aktivieren Sie die Option **"NoLog"**, wenn Sie die Protokollierung von Anfragen durch LiteLLM deaktivieren möchten.

**Wichtig:** Die Option "NoLog" ist **nur** im Anbieter Custom/LiteLLM verfügbar. Sie ist nicht kompatibel mit den offiziellen APIs von OpenAI oder Mistral AI.

## 🛠️ Technische Funktionsweise

### Architektur der Erweiterung

Die Erweiterung besteht aus mehreren JavaScript-Dateien, die miteinander interagieren:

#### Hauptdateien

*   **`manifest.json`:** Die Hauptkonfigurationsdatei der Erweiterung. Sie definiert Berechtigungen, Skripte, zugängliche Ressourcen usw. Sie verwendet Manifest V3 und deklariert die Berechtigungen `activeTab`, `storage`, `commands`, `scripting` und `contextMenus`.
*   **`background.js`:** Der Service Worker, der im Hintergrund läuft. Er verwaltet Ereignisse (Klick auf das Symbol, Tastenkombinationen, Kontextmenü), injiziert bei Bedarf das `content script` und kommuniziert mit dem `content script`.
*   **`content.js`:** Das Hauptskript, das in Webseiten injiziert wird. Es koordiniert die verschiedenen Hilfsmodule und verwaltet den globalen Ablauf der Erweiterung.
*   **`src/constants.js`:** Definiert Konstanten für Konfiguration, Zustände, Aktionen usw.

#### Hilfsmodule

Die Erweiterung verwendet eine modulare Architektur mit mehreren spezialisierten Hilfsdateien:

##### Provider- und API-Management

*   **`src/utils/providers.js`:** Register der KI-Anbieter (Mistral AI, OpenAI, Custom/LiteLLM) mit ihren Konfigurationen, Modellen und Standard-URLs.
*   **`src/utils/api-utils.js`:** Funktionen für die Interaktion mit externen APIs, Auflösung der Multi-Provider-Konfiguration und Sprachtranskription.
*   **`src/utils/text-processing.js`:** Textverarbeitungsfunktionen: Übersetzung, Umformulierung, Rechtschreibkorrektur.

##### Benutzeroberfläche und Interaktion

*   **`src/utils/ui.js`:** Allgemeine Hilfsfunktionen für die Benutzeroberfläche.
*   **`src/utils/banner-utils.js`:** Verwaltet das Statusbanner, seine Steuerelemente und die Sprachauswahl.
*   **`src/utils/focus-utils.js`:** Verwaltet das Speichern und Wiederherstellen von Fokus und Textauswahl.
*   **`src/utils/transcription-display.js`:** Verwaltet die Anzeige der Transkriptionsergebnisse.
*   **`src/utils/error-utils.js`:** Verwaltet die Fehleranzeige und -behandlung.
*   **`src/styles/content.css`:** CSS-Stile für die in Webseiten injizierte Benutzeroberfläche.

##### Aufnahme und Ereignisse

*   **`src/utils/recording-utils.js`:** Verwaltet die Audioaufnahme über das Mikrofon und die Verarbeitung der Audiodaten.
*   **`src/utils/event-handlers.js`:** Enthält Ereignishandler für Benutzerinteraktionen.

##### Internationalisierung und Sprachen

*   **`src/utils/languages.js`:** Definiert die von der Erweiterung unterstützten Sprachen.
*   **`src/utils/languages-shared.js`:** Definiert die Liste der unterstützten Sprachen für den Webseitenkontext.
*   **`src/utils/languages-data.js`:** Definiert die Liste der unterstützten Sprachen für den Service Worker.
*   **`src/utils/i18n.js`:** Verwaltet die Internationalisierung für die Benutzeroberfläche.

##### Optionsseite

*   **`src/pages/options/`:** Enthält Dateien für die Optionsseite der Erweiterung (HTML, CSS, JavaScript).

### Transkriptions- und Übersetzungsprozess

#### Hauptfunktion der Sprachtranskription

1.  **Start der Aufnahme:** Der Benutzer startet die Aufnahme durch Klicken auf das Erweiterungssymbol oder Verwendung der Tastenkombination (Ctrl+Shift+1 oder ⌘+Shift+1 auf Mac). Das `background script` sendet eine Nachricht an das `content script`, um die Aufnahme zu starten.
2.  **Audioaufnahme:** Das `content script` verwendet die `navigator.mediaDevices.getUserMedia` API, um auf das Mikrofon zuzugreifen und Audio über die MediaRecorder API aufzunehmen.
3.  **Transkription:** Das `content script` verwendet die Funktion `transcribeAudio` (`src/utils/api-utils.js`), um Audio an die Transkriptions-API des konfigurierten Anbieters zu senden (Voxtral für Mistral AI, Whisper für OpenAI). Die API gibt den transkribierten Text zurück.
4.  **Übersetzung oder Umformulierung (Optional):**
   - Wenn die Übersetzungsoption aktiviert ist, verwendet das `content script` die Funktion `translateText` (`src/utils/text-processing.js`), um den transkribierten Text an die Chat-API des konfigurierten Anbieters zu senden.
   - Wenn die Umformulierungsoption aktiviert ist, wird die Funktion `rephraseText` verwendet, um den transkribierten Text zu verbessern.
5.  **Anzeige:** Das `content script` zeigt den verarbeiteten Text entweder im aktiven Element der Seite (wenn es ein Textfeld oder ein bearbeitbares Element ist) oder in einem benutzerdefinierten Dialogfeld an.

#### Kontextmenü-Funktion

1. **Textauswahl:** Der Benutzer wählt Text auf einer Webseite aus.
2. **Kontextmenü:** Ein Rechtsklick zeigt die Optionen:
   - "Auswahl umformulieren" zur Verbesserung von Stil und Klarheit
   - "Auswahl übersetzen" mit einem Untermenü der verfügbaren Sprachen
   - "Rechtschreibung korrigieren" zur Fehlerkorrektur
3. **Verarbeitung:** Je nach gewählter Option:
   - Der Text wird zur Umformulierung über die Funktion `rephraseText` gesendet
   - Der Text wird zur Übersetzung über die Funktion `translateText` mit der gewählten Zielsprache gesendet
   - Der Text wird zur Korrektur über die Funktion `correctText` gesendet
4. **Anzeige:** Das Ergebnis ersetzt die ursprüngliche Auswahl in dem Element, in dem sich der ausgewählte Text befindet.

### Kommunikation

Die Kommunikation zwischen dem `background script` und dem `content script` erfolgt über die Chrome Messaging API (`chrome.runtime.sendMessage` und `chrome.runtime.onMessage`).

### Datenspeicherung

Die Erweiterung verwendet `chrome.storage.sync` zum Speichern von:

*   KI-Provider-Konfiguration (API-Schlüssel, ausgewählte Modelle, benutzerdefinierte URLs).
*   Erweiterungsoptionen (Anzeige, Übersetzung, Bannerfarben usw.).
*   Sprachpräferenzen für die Übersetzung.

Diese Daten werden lokal auf Ihrem Computer im Chrome-Erweiterungsspeicher gespeichert.

### Fehlerbehandlung
Mögliche Fehler (fehlender API-Schlüssel, Transkriptionsfehler usw.) sind in der Datei `constants.js` definiert. Die Funktionen `api-utils.js` und `text-processing.js` behandeln potenzielle API-Aufruffehler mit verbesserten Nachrichten basierend auf dem HTTP-Code. Das `content.js` zeigt dem Benutzer Fehlermeldungen über ein Banner am unteren Rand der Seite an.


## 🛡️ Sicherheit und Datenschutz

- **Datenschutz:**
  - Der API-Schlüssel wird sicher in Chrome gespeichert.
  - Die Erweiterung speichert Ihre Audiodaten nicht; alle Verarbeitungen erfolgen in Echtzeit.
  - Die Kommunikation mit APIs erfolgt über sichere HTTPS-Verbindungen.

Für vollständige Informationen darüber, wie BabelFishAI Ihre Daten verwaltet, lesen Sie bitte unsere [Datenschutzerklärung](PRIVACY.md).

## 🔧 Fehlerbehebung

- **Mikrofonprobleme:**
  - Überprüfen Sie die Mikrofonzugriffsberechtigungen in Chrome.
  - Stellen Sie sicher, dass keine andere Anwendung das Mikrofon gleichzeitig verwendet.

- **Transkriptions-/Übersetzungsfehler:**
  - Überprüfen Sie, ob der API-Schlüssel gültig und aktiv ist.
  - Stellen Sie sicher, dass Sie eine stabile Internetverbindung haben.
  - Konsultieren Sie die Chrome-Konsole für detaillierte Protokolle im Fehlerfall.

## 🤝 Beitrag

Beiträge und Vorschläge sind willkommen. Um beizutragen:
- Melden Sie Fehler über den Abschnitt Issues auf GitHub.
- Schlagen Sie Verbesserungen oder neue Funktionen vor.
- Reichen Sie Ihre Pull Requests ein.

## 📄 Lizenz

Diese Erweiterung wird unter der GNU Affero General Public License v3.0 (AGPL-3.0) vertrieben. Weitere Einzelheiten finden Sie in der Datei LICENSE.

## 💝 Unterstützung

Wenn Sie diese Erweiterung schätzen, können Sie ihre Entwicklung unterstützen, indem Sie über [PayPal](https://paypal.me/jls) spenden.
---
Entwickelt von jls42.org mit Leidenschaft und Innovation, treibt Babel Fish AI Transkription und Übersetzung dank modernster künstlicher Intelligenz zu neuen Horizonten.
