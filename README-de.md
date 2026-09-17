**Artikel, übersetzt aus dem Französischen ins Deutsche mit gpt-5.6-sol.**

# Babel Fish AI – Erweiterung für Sprachtranskription und Übersetzung mit KI

<img src="images/icon128.png" alt="Babel Fish AI-Symbol" width="128" height="128">

**Offizielle Website: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**Um die Erweiterung zu verwenden, benötigen Sie einen API-Schlüssel von einem der unterstützten Provider:**

|                              Provider                              | API-Schlüssel erhalten                                                                              |
| :----------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------- |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30">   | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)                                               |
|    <img src="images/openai-logo.png" alt="OpenAI" height="30">     | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)                                          |
|                                 🚅                                 | **Custom/LiteLLM**: Zur Verwendung eigener API-Endpunkte                                            |

Babel Fish AI ist eine innovative Browser-Erweiterung, die eine leistungsstarke Sprachtranskription mit Unterstützung mehrerer Provider bietet. Wandeln Sie Ihre Sprache mithilfe der Transkriptions-APIs von Mistral AI (Voxtral) oder OpenAI (Whisper) mit bemerkenswerter Genauigkeit in Text um und nutzen Sie optional eine automatische Echtzeitübersetzung. Sie können Babel Fish AI ausschließlich zur Transkription verwenden oder bei Bedarf die sofortige Übersetzung aktivieren.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy-Abzeichen](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality-Gate-Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Sicherheitsbewertung](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Wartbarkeitsbewertung](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Schwachstellen](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technische Schulden](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Codezeilen](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funktionen

-   **Fortschrittliche Sprachtranskription**

    -   Hochwertige Audioaufnahme über das Mikrofon Ihres Geräts.
    -   Präzise Transkription über die APIs Voxtral (Mistral AI) oder Whisper (OpenAI).
    -   Unterstützung mehrerer Provider: Wählen Sie frei zwischen Mistral AI, OpenAI oder einem benutzerdefinierten Endpunkt.
    -   Mehrsprachige Unterstützung für Spracherkennung und Textanzeige, sodass Spracheingaben in verschiedenen Sprachen transkribiert und die Ergebnisse (Transkription und Übersetzung, sofern aktiviert) in der Sprache Ihrer Wahl angezeigt werden können.
    -   Automatisches Einfügen des Textes in das aktive Feld oder Anzeige in einem eigenen Dialogfeld.

-   **Intelligente Übersetzung und Umformulierung**

    -   Sofortige Übersetzung der Transkriptionen in verschiedene Sprachen, die bei Bedarf aktiviert werden kann.
    -   Umformulierung des Textes zur Verbesserung von Stil und Klarheit.
    -   Verwendung eines fortschrittlichen KI-Modells, um eine sinngenaue Übersetzung zu gewährleisten.
    -   Freie Wahl zwischen ausschließlicher Transkription oder einer Kombination aus Transkription und Übersetzung.

-   **Leistungsstarkes Kontextmenü**

    -   Option „Auswahl umformulieren“, um ausgewählte Texte sofort zu verbessern.
    -   Option „Auswahl übersetzen“ mit einem Untermenü aller verfügbaren Sprachen.
    -   Option „Rechtschreibung korrigieren“, um Rechtschreib-, Grammatik- und Zeichensetzungsfehler zu korrigieren.
    -   Direktes Ersetzen des ausgewählten Textes durch seine übersetzte, umformulierte oder korrigierte Version.
    -   Nahtlose Integration in die native Benutzeroberfläche des Browsers.

-   **Intuitive und anpassbare Benutzeroberfläche**

    -   Flexibler Anzeigemodus: aktives Eingabefeld oder schwebendes Dialogfenster.
    -   Konfigurierbare Statusleiste mit Auswahl von Farbe, Deckkraft und Anzeigedauer.
    -   Tastenkürzel (Ctrl+Shift+1 oder ⌘+Shift+1 auf dem Mac) zum Starten/Stoppen der Aufnahme.
    -   Unter Firefox ein „bevorzugtes Tastenkürzel“ für Websites, deren Seiteneditor die Tastenkombination abfängt (ChatGPT, Notion …): ab der Installation aktiv und in den Optionen deaktivierbar (siehe [PRIVACY.md](PRIVACY.md)).
    -   Option „Geöffnet lassen“ zur Steuerung der Anzeigedauer der Ergebnisse.
    -   Benutzerdefiniertes Symbol mit einem Mikrofon und der Zahl „42“ für eine sofortige Wiedererkennung.

-   **Erweiterte Optionen**
    -   Unterstützung mehrerer Provider: Mistral AI, OpenAI und Custom/LiteLLM für maximale Flexibilität.
    -   Möglichkeit, die Transkriptions- und Übersetzungsmodelle je Provider anzupassen.
    -   Verfügbare OpenAI-Modelle: GPT-4o mini (Standard), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** und **GPT-5.6 (luna/terra/sol)**. Transkription: whisper-1 (Standard), gpt-4o-mini-transcribe, gpt-4o-transcribe und **gpt-transcribe**.
    -   Verfügbare Mistral-Modelle: Mistral Small (Standard), Mistral Medium, Mistral Large, Codestral und **Ministral 3 (3B/8B/14B)**. Transkription: Voxtral Mini. Antworten von schlussfolgernden Mistral-Modellen (Reflexionsblöcke) werden unterstützt.
    -   Einstellungen, die gpt-4.1-nano (Einstellung der OpenAI-API am 23.10.2026) oder gpt-4o verwendeten, werden bei der Aktualisierung automatisch auf gpt-5.6-luna beziehungsweise gpt-4.1 umgestellt.
    -   Unabhängige Auswahl des Providers für Transkription und Übersetzung/Umformulierung.
    -   Kompatibilität mit LiteLLM Proxy über den Provider Custom, um eine Verbindung zu alternativen Modellen herzustellen.
    -   Vollständige Verwaltung der Internationalisierung mithilfe der Sprachdateien (\_locales), die eine mehrsprachige Benutzeroberfläche und Sprachunterstützung bieten.

## 🌐 Unterstützte Sprachen

Hier ist die Liste der von Babel Fish AI unterstützten Sprachen mit Links zu Demonstrationsvideos:

-   [Arabisch](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [Deutsch](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [Englisch](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [Spanisch](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [Französisch](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [Italienisch](https://www.youtube.com/watch?v=QgYZt8myods)
-   [Japanisch](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [Koreanisch](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [Niederländisch](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [Polnisch](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [Portugiesisch](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [Rumänisch](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [Schwedisch](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [Chinesisch](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installation

### Chrome

1.  **Download und Installation:**

    -   Klonen Sie dieses Repository von GitHub oder laden Sie den Ordner der Erweiterung manuell herunter.
    -   **Oder installieren Sie die Erweiterung direkt aus dem [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   Öffnen Sie Chrome und rufen Sie `chrome://extensions/` auf.
    -   Aktivieren Sie oben rechts den „Entwicklermodus“.
    -   Klicken Sie auf „Entpackte Erweiterung laden“ und wählen Sie den Ordner von Babel Fish AI aus.

2.  **Überprüfung:**
    -   Vergewissern Sie sich, dass die Erweiterung mit dem benutzerdefinierten Symbol in der Symbolleiste des Browsers angezeigt wird.

### Firefox

1.  **Download und Installation:**

    -   **Installieren Sie die Erweiterung direkt über [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   Oder für die manuelle Installation: Klonen Sie dieses Repository von GitHub und führen Sie anschließend `./scripts/build.sh firefox` aus. Dadurch wird `dist/firefox/` vorbereitet und das Firefox-Manifest in `manifest.json` umbenannt.
    -   Öffnen Sie Firefox und rufen Sie `about:debugging#/runtime/this-firefox` auf (nicht „Add-on aus Datei installieren“ unter `about:addons`, da dies signierten Erweiterungen vorbehalten ist).
    -   Klicken Sie auf „Temporäres Add-on laden …“.
    -   Wählen Sie die Datei `dist/firefox/manifest.json` aus.

2.  **Überprüfung:**
    -   Vergewissern Sie sich, dass die Erweiterung mit dem benutzerdefinierten Symbol in der Symbolleiste von Firefox angezeigt wird.

## ⚙️ Konfiguration

1.  **Konfiguration des KI-Providers:**

    -   Klicken Sie auf das Symbol der Erweiterung, um die Optionen aufzurufen.
    -   Wählen Sie Ihren Provider aus dem Dropdown-Menü aus (Mistral AI, OpenAI oder Custom/LiteLLM).
    -   Geben Sie Ihren API-Schlüssel ein:
        -   **Mistral AI**: verfügbar unter [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: verfügbar unter [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    -   Aktivieren Sie den Provider mit dem Umschalter neben dem Dropdown-Menü.

2.  **Anpassung der Optionen:**

    -   Wählen Sie den Anzeigemodus (aktives Feld oder Dialogfeld).
    -   Konfigurieren Sie Farbe, Deckkraft und Anzeigedauer der Statusleiste.
    -   Wählen Sie die Sprachen für die Transkription (Spracheingabe) und die Textanzeige aus.
    -   Aktivieren oder deaktivieren Sie die Übersetzungsfunktion nach Bedarf.

3.  **(Optional) Erweiterte Modellkonfiguration:**
    -   Klicken Sie in den Optionen jedes Providers auf „Modellkonfiguration“, um die verwendeten Modelle anzupassen.
    -   Sie können benutzerdefinierte Modelle für die Transkription und Übersetzung/Umformulierung hinzufügen.
    -   Wenn mehrere Provider aktiviert sind, können Sie auswählen, welcher für den jeweiligen Dienst (Transkription und Übersetzung) verwendet werden soll.

## 🚀 Verwendung mit LiteLLM Proxy oder benutzerdefinierten Endpunkten

Babel Fish AI ist mit [LiteLLM Proxy](https://litellm.ai/) und anderen OpenAI-kompatiblen API-Proxys kompatibel und ermöglicht so die Verwendung alternativer Sprachmodelle.

### Konfiguration

1.  **Installieren und konfigurieren Sie Ihren Proxy:** Befolgen Sie die Anweisungen des von Ihnen verwendeten Dienstes (LiteLLM usw.).
2.  **Konfigurieren Sie die Babel-Fish-AI-Erweiterung:**
    -   Wählen Sie in den Optionen der Erweiterung den Provider **Custom/LiteLLM** aus dem Dropdown-Menü aus.
    -   Geben Sie Ihren API-Schlüssel ein (falls erforderlich).
    -   Konfigurieren Sie die API-URLs:
        -   **Transkriptions-URL**: zum Beispiel `http://localhost:4000/v1/audio/transcriptions`
        -   **Chat-URL**: zum Beispiel `http://localhost:4000/v1/chat/completions`
    -   Aktivieren Sie den Provider mit dem Umschalter.
    -   Aktivieren Sie die Option **„NoLog“**, wenn Sie die Protokollierung von Anfragen durch LiteLLM deaktivieren möchten.

**Wichtig:** Die Option „NoLog“ ist **nur** beim Provider Custom/LiteLLM verfügbar. Sie ist nicht mit den offiziellen APIs von OpenAI oder Mistral AI kompatibel.

## 🛠️ Technische Funktionsweise

### Architektur der Erweiterung

Die Erweiterung besteht aus mehreren JavaScript-Dateien, die miteinander interagieren:

#### Hauptdateien

-   **`manifest.json`:** Die Hauptkonfigurationsdatei der Erweiterung. Sie definiert Berechtigungen, Skripte, zugängliche Ressourcen usw. Sie verwendet Version 3 des Manifests und deklariert die Berechtigungen `activeTab`, `storage`, `commands`, `scripting` und `contextMenus`.
-   **`background.js`:** Der Service Worker, der im Hintergrund ausgeführt wird. Er verwaltet Ereignisse (Klick auf das Symbol, Tastenkürzel, Kontextmenü), injiziert bei Bedarf `content script` und kommuniziert mit `content script`.
-   **`content.js`:** Das Hauptskript, das in Webseiten injiziert wird. Es koordiniert die verschiedenen Hilfsmodule und verwaltet den gesamten Ablauf der Erweiterung.
-   **`src/constants.js`:** Definiert Konstanten für Konfiguration, Zustände, Aktionen usw.

#### Hilfsmodule

Die Erweiterung verwendet eine modulare Architektur mit mehreren spezialisierten Hilfsdateien:

##### Verwaltung von Providern und APIs

-   **`src/utils/providers.js`:** Verzeichnis der KI-Provider (Mistral AI, OpenAI, Custom/LiteLLM) mit ihren Konfigurationen, Modellen und Standard-URLs.
-   **`src/utils/api-utils.js`:** Funktionen für die Interaktion mit externen APIs, die Auflösung der Multi-Provider-Konfiguration und die Audiotranskription.
-   **`src/utils/text-processing.js`:** Funktionen zur Textverarbeitung: Übersetzung, Umformulierung und Rechtschreibkorrektur.

##### Benutzeroberfläche und Interaktion

-   **`src/utils/ui.js`:** Allgemeine Hilfsfunktionen für die Benutzeroberfläche.
-   **`src/utils/banner-utils.js`:** Verwaltet die Statusleiste, ihre Steuerelemente und die Sprachauswahl.
-   **`src/utils/focus-utils.js`:** Verwaltet das Speichern und Wiederherstellen des Fokus und der Textauswahl.
-   **`src/utils/transcription-display.js`:** Verwaltet die Anzeige der Transkriptionsergebnisse.
-   **`src/utils/error-utils.js`:** Verwaltet die Anzeige und Verarbeitung von Fehlern.
-   **`src/styles/content.css`:** CSS-Stile für die in Webseiten injizierte Benutzeroberfläche.

##### Aufnahme und Ereignisse

-   **`src/utils/recording-utils.js`:** Verwaltet die Audioaufnahme über das Mikrofon und die Verarbeitung der Audiodaten.
-   **`src/utils/event-handlers.js`:** Enthält die Ereignishandler für Benutzerinteraktionen.

##### Internationalisierung und Sprachen

-   **`src/utils/languages.js`:** Definiert die von der Erweiterung unterstützten Sprachen.
-   **`src/utils/languages-shared.js`:** Definiert die Liste der für den Kontext der Webseite unterstützten Sprachen.
-   **`src/utils/languages-data.js`:** Definiert die Liste der für den Service Worker unterstützten Sprachen.
-   **`src/utils/i18n.js`:** Verwaltet die Internationalisierung der Benutzeroberfläche.

##### Optionsseite

-   **`src/pages/options/`:** Enthält die Dateien für die Optionsseite der Erweiterung (HTML, CSS, JavaScript).

### Transkriptions- und Übersetzungsprozess

#### Hauptfunktion der Sprachtranskription

1.  **Starten der Aufnahme:** Der Benutzer startet die Aufnahme durch Klicken auf das Symbol der Erweiterung oder mithilfe des Tastenkürzels (Ctrl+Shift+1 oder ⌘+Shift+1 auf dem Mac). `background script` sendet eine Nachricht an `content script`, um die Aufnahme zu starten.
2.  **Audioaufnahme:** `content script` verwendet die API `navigator.mediaDevices.getUserMedia`, um auf das Mikrofon zuzugreifen und das Audio über die MediaRecorder-API aufzunehmen.
3.  **Transkription:** `content script` verwendet die Funktion `transcribeAudio` (`src/utils/api-utils.js`), um das Audio an die Transkriptions-API des konfigurierten Providers zu senden (Voxtral für Mistral AI, Whisper für OpenAI). Die API gibt den transkribierten Text zurück.
4.  **Übersetzung oder Umformulierung (optional):**

-   Wenn die Übersetzungsoption aktiviert ist, verwendet `content script` die Funktion `translateText` (`src/utils/text-processing.js`), um den transkribierten Text an die Chat-API des konfigurierten Providers zu senden.
-   Wenn die Umformulierungsoption aktiviert ist, wird die Funktion `rephraseText` verwendet, um den transkribierten Text zu verbessern.

5.  **Anzeige:** `content script` zeigt den verarbeiteten Text entweder im aktiven Element der Seite (wenn es sich um ein Textfeld oder ein bearbeitbares Element handelt) oder in einem benutzerdefinierten Dialogfeld an.

#### Kontextmenüfunktion

1. **Textauswahl:** Der Benutzer wählt Text auf einer Webseite aus.
2. **Kontextmenü:** Ein Rechtsklick zeigt folgende Optionen an:
    - „Auswahl umformulieren“, um Stil und Klarheit zu verbessern
    - „Auswahl übersetzen“ mit einem Untermenü der verfügbaren Sprachen
    - „Rechtschreibung korrigieren“, um Fehler zu korrigieren
3. **Verarbeitung:** Abhängig von der gewählten Option:
    - Der Text wird über die Funktion `rephraseText` zur Umformulierung gesendet
    - Der Text wird über die Funktion `translateText` mit der ausgewählten Zielsprache zur Übersetzung gesendet
    - Der Text wird über die Funktion `correctText` zur Korrektur gesendet
4. **Anzeige:** Das Ergebnis ersetzt die ursprüngliche Auswahl in dem Element, in dem sich der ausgewählte Text befindet.

### Kommunikation

Die Kommunikation zwischen `background script` und `content script` erfolgt über die Messaging-API von Chrome (`chrome.runtime.sendMessage` und `chrome.runtime.onMessage`).

### Datenspeicherung

Die Erweiterung verwendet `chrome.storage.sync` zum Speichern folgender Daten:

-   Die Konfiguration der KI-Provider (API-Schlüssel, ausgewählte Modelle, benutzerdefinierte URLs).
-   Die Optionen der Erweiterung (Anzeige, Übersetzung, Farben der Statusleiste usw.).
-   Die Spracheinstellungen für die Übersetzung.

Diese Daten werden lokal auf Ihrem Computer im Speicher der Browser-Erweiterung gespeichert.
### Fehlerbehandlung

Mögliche Fehler (fehlender API-Schlüssel, Transkriptionsfehler usw.) sind in der Datei `constants.js` definiert. Die Funktionen `api-utils.js` und `text-processing.js` behandeln mögliche Fehler bei API-Aufrufen mit verbesserten Meldungen je nach HTTP-Code. `content.js` zeigt dem Benutzer Fehlermeldungen über ein Banner am unteren Seitenrand an.

## 🛡️ Sicherheit und Datenschutz

-   **Datenschutz:**
    -   Der API-Schlüssel wird sicher im Browser gespeichert.
    -   Die Erweiterung speichert Ihre Audiodaten nicht; die gesamte Verarbeitung erfolgt in Echtzeit.
    -   Die Kommunikation mit den APIs erfolgt über sichere HTTPS-Verbindungen.

Vollständige Informationen darüber, wie BabelFishAI mit Ihren Daten umgeht, finden Sie in unserer [Datenschutzrichtlinie](PRIVACY.md).

## 🔧 Fehlerbehebung

-   **Mikrofonprobleme:**

    -   Überprüfen Sie in Ihrem Browser die Berechtigungen für den Mikrofonzugriff.
    -   Stellen Sie sicher, dass keine andere Anwendung gleichzeitig das Mikrofon verwendet.

-   **Transkriptions-/Übersetzungsfehler:**
    -   Überprüfen Sie, ob der API-Schlüssel gültig und aktiv ist.
    -   Stellen Sie sicher, dass Sie über eine stabile Internetverbindung verfügen.
    -   Sehen Sie bei einem Fehler in der Browserkonsole nach, um detaillierte Logs zu erhalten.

## 🤝 Mitwirkung

Beiträge und Vorschläge sind willkommen. So können Sie mitwirken:

-   Melden Sie Bugs über den Bereich Issues auf GitHub.
-   Schlagen Sie Verbesserungen oder neue Funktionen vor.
-   Reichen Sie Ihre Pull Requests ein.

## 📄 Lizenz

Diese Erweiterung wird unter der GNU Affero General Public License v3.0 (AGPL-3.0) vertrieben. Weitere Einzelheiten finden Sie in der Datei LICENSE.

## 💝 Unterstützung

## Wenn Ihnen diese Erweiterung gefällt, können Sie ihre Entwicklung mit einer Spende über [PayPal](https://paypal.me/jls) unterstützen.

Von jls42.org mit Leidenschaft und Innovationsgeist entwickelt, eröffnet Babel Fish AI der Transkription und Übersetzung mithilfe modernster künstlicher Intelligenz neue Horizonte.
