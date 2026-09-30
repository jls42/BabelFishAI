**Artikel, der mit gpt-5.6-sol aus dem Französischen ins Deutsche übersetzt wurde.**

# Babel Fish AI – Erweiterung für Sprachtranskription und Übersetzung mit KI

<img src="images/icon128.png" alt="Babel Fish AI Symbol" width="128" height="128">

**Offizielle Website: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**Um die Erweiterung zu verwenden, benötigen Sie einen API-Schlüssel von einem der unterstützten Provider:**

|                              Provider                            | API-Schlüssel erhalten                                                                             |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------- |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)                                               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)                                         |
|   <img src="images/gemini-logo.png" alt="Gemini" height="30">    | **Gemini (Google)**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)                                          |
|                                🚅                                | **Custom/LiteLLM**: Zur Verwendung Ihrer eigenen API-Endpunkte                                    |

Babel Fish AI ist eine innovative Browser-Erweiterung, die eine leistungsstarke Sprachtranskription mit Multi-Provider-Unterstützung bietet. Wandeln Sie Ihre Stimme dank der Transkriptions-APIs von Mistral AI (Voxtral), OpenAI (gpt-transcribe, Whisper) oder Gemini (Gemini 3.5 Transcribe) mit bemerkenswerter Genauigkeit in Text um und nutzen Sie optional eine automatische Echtzeitübersetzung. Sie können Babel Fish AI ausschließlich zur Transkription verwenden oder bei Bedarf die sofortige Übersetzung aktivieren.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funktionen

-   **Fortschrittliche Sprachtranskription**

    -   Hochwertige Audioaufnahme über das Mikrofon Ihres Geräts.
    -   Präzise Transkription über die APIs Voxtral (Mistral AI), gpt-transcribe und Whisper (OpenAI) oder Gemini 3.5 Transcribe (Google).
    -   Multi-Provider-Unterstützung: Wählen Sie frei zwischen Mistral AI, OpenAI, Gemini oder einem benutzerdefinierten Endpunkt.
    -   Mehrsprachige Unterstützung für Spracherkennung und Textanzeige, sodass Spracheingaben in verschiedenen Sprachen transkribiert und die Ergebnisse (Transkription und Übersetzung, sofern aktiviert) in der Sprache Ihrer Wahl angezeigt werden können.
    -   Automatisches Einfügen des Textes in das aktive Feld oder Anzeige in einem eigenen Dialogfeld.

-   **Intelligente Übersetzung und Neuformulierung**

    -   Sofortige Übersetzung der Transkriptionen in verschiedene Sprachen, bei Bedarf aktivierbar.
    -   Neuformulierung des Textes zur Verbesserung von Stil und Klarheit.
    -   Verwendung eines fortschrittlichen KI-Modells, um eine originalgetreue Übersetzung zu gewährleisten.
    -   Freie Wahl zwischen ausschließlicher Transkription und einer Kombination aus Transkription und Übersetzung.

-   **Leistungsstarkes Kontextmenü**

    -   Option „Auswahl neu formulieren“, um ausgewählte Texte sofort zu verbessern.
    -   Option „Auswahl übersetzen“ mit einem Untermenü für alle verfügbaren Sprachen.
    -   Option „Rechtschreibung korrigieren“, um Rechtschreib-, Grammatik- und Zeichensetzungsfehler zu korrigieren.
    -   Direktes Ersetzen des ausgewählten Textes durch seine übersetzte, neu formulierte oder korrigierte Version.
    -   Nahtlose Integration in die native Benutzeroberfläche des Browsers.

-   **Intuitive und anpassbare Benutzeroberfläche**

    -   Flexibler Anzeigemodus: aktives Eingabefeld oder schwebendes Dialogfenster.
    -   Konfigurierbares Statusbanner mit Auswahl von Farbe, Deckkraft und Anzeigedauer.
    -   Tastenkürzel (Ctrl+Shift+1 oder ⌘+Shift+1 auf dem Mac) zum Starten/Stoppen der Aufnahme.
    -   Unter Firefox ein „bevorzugtes Tastenkürzel“ für Websites, deren Seiteneditor die Tastenkombination abfängt (ChatGPT, Notion …): ab der Installation aktiv und in den Optionen deaktivierbar (siehe [PRIVACY.md](PRIVACY.md)).
    -   Option „Geöffnet halten“ zur Steuerung der Anzeigedauer der Ergebnisse.
    -   Benutzerdefiniertes Symbol mit einem Mikrofon und der Zahl „42“ für sofortige Wiedererkennung.

-   **Erweiterte Optionen**
    -   Multi-Provider-Unterstützung: Mistral AI, OpenAI, Gemini und Custom/LiteLLM für maximale Flexibilität.
    -   Möglichkeit, die Transkriptions- und Übersetzungsmodelle für jeden Provider anzupassen.
    -   Verfügbare OpenAI-Modelle: GPT-4o mini (Standard), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** und **GPT-5.6 (luna/terra/sol)**. Transkription: **gpt-transcribe** (Standard), whisper-1, gpt-4o-mini-transcribe und gpt-4o-transcribe. OpenAI entfernt die letzten drei am 26.02.2027 aus seiner API; ein bereits in den Optionen ausgewähltes Modell wird bis dahin weiterhin verwendet.
    -   Verfügbare Mistral-Modelle: Mistral Small (Standard), Mistral Medium, Mistral Large, Codestral und **Ministral 3 (3B/8B/14B)**. Transkription: Voxtral Mini. Antworten von schlussfolgernden Mistral-Modellen (Denkblöcke) werden unterstützt.
    -   Verfügbare Gemini-Modelle: **Gemini 3.8 Flash** (Standard, mit reduziertem Denkaufwand für Antworten innerhalb von ein bis zwei Sekunden) und **Gemini 3.5 Flash-Lite** (das schnellste). Transkription: **Gemini 3.5 Transcribe** über Googles Interactions API, ohne die Diktate im Verlauf dieser API zu speichern (`store: false`, siehe [docs/providers/gemini.md](docs/providers/gemini.md)).
    -   Einstellungen, die gpt-4.1-nano (Einstellung der OpenAI-API am 23.10.2026) oder gpt-4o verwendeten, werden bei der Aktualisierung automatisch auf gpt-5.6-luna beziehungsweise gpt-4.1 umgestellt.
    -   Unabhängige Auswahl des Providers für Transkription und Übersetzung/Neuformulierung.
    -   Kompatibilität mit LiteLLM Proxy über den Provider Custom, um eine Verbindung mit alternativen Modellen herzustellen.
    -   Vollständige Internationalisierung mithilfe von Sprachdateien (\_locales), die eine mehrsprachige Benutzeroberfläche und Sprachunterstützung bieten.

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
    -   Stellen Sie sicher, dass die Erweiterung mit dem benutzerdefinierten Symbol in der Symbolleiste des Browsers angezeigt wird.

### Firefox

1.  **Download und Installation:**

    -   Seit Version 1.2.0 ist **Firefox 140 oder neuer** (Desktop) erforderlich. Bei der Installation und beim Update auf Version 1.2.0 zeigt Firefox die Daten an, welche die Erweiterung an den von Ihnen konfigurierten Provider übermittelt: Ihre Stimme, den ausgewählten oder diktierten Text und Ihren API-Schlüssel (siehe [PRIVACY.md](PRIVACY.md)).
    -   **Installieren Sie die Erweiterung direkt über [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   Oder für die manuelle Installation: Klonen Sie dieses Repository von GitHub und führen Sie anschließend `./scripts/build.sh firefox` aus. Dadurch wird `dist/firefox/` vorbereitet, wobei das Firefox-Manifest in `manifest.json` umbenannt wird.
    -   Öffnen Sie Firefox und rufen Sie `about:debugging#/runtime/this-firefox` auf (nicht „Add-on aus Datei installieren“ in `about:addons`, das signierten Erweiterungen vorbehalten ist).
    -   Klicken Sie auf „Temporäres Add-on laden …“.
    -   Wählen Sie die Datei `dist/firefox/manifest.json` aus.

2.  **Überprüfung:**
    -   Stellen Sie sicher, dass die Erweiterung mit dem benutzerdefinierten Symbol in der Firefox-Symbolleiste angezeigt wird.

## ⚙️ Konfiguration

1.  **Konfiguration des KI-Providers:**

    -   Klicken Sie auf das Symbol der Erweiterung, um die Optionen aufzurufen.
    -   Wählen Sie Ihren Provider im Dropdown-Menü aus (Mistral AI, OpenAI, Gemini oder Custom/LiteLLM).
    -   Geben Sie Ihren API-Schlüssel ein:
        -   **Mistral AI**: verfügbar unter [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: verfügbar unter [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
        -   **Gemini**: verfügbar unter [aistudio.google.com/apikey](https://aistudio.google.com/apikey). Verwenden Sie vorzugsweise einen Schlüssel aus einem Projekt mit aktivierter Abrechnung: Wenn Sie sich außerhalb des Europäischen Wirtschaftsraums, der Schweiz und des Vereinigten Königreichs befinden und einen kostenlosen Schlüssel verwenden, kann Google Ihre Diktate und die gesendeten Texte zur Verbesserung seiner Produkte nutzen, wobei eine menschliche Überprüfung möglich ist. Senden Sie daher keine persönlichen, sensiblen oder vertraulichen Informationen. Beschränken Sie den Schlüssel auf die Gemini API (Standardeinstellung für neue Schlüssel), niemals auf Websites: Unter Chrome werden die Anfragen von der Seite gesendet, auf der Sie diktieren.
    -   Aktivieren Sie den Provider mit dem Schalter neben dem Dropdown-Menü.

2.  **Anpassung der Optionen:**

    -   Wählen Sie den Anzeigemodus (aktives Feld oder Dialogfeld).
    -   Konfigurieren Sie Farbe, Deckkraft und Anzeigedauer des Statusbanners.
    -   Wählen Sie die Sprachen für die Transkription (Spracheingabe) und die Textanzeige.
    -   Aktivieren oder deaktivieren Sie die Übersetzungsfunktion nach Bedarf.

3.  **(Optional) Erweiterte Modellkonfiguration:**

    -   Klicken Sie in den Optionen jedes Providers auf „Modellkonfiguration“, um die verwendeten Modelle anzupassen.
    -   Sie können benutzerdefinierte Modelle für Transkription und Übersetzung/Neuformulierung hinzufügen.
    -   Wenn mehrere Provider aktiviert sind, können Sie auswählen, welcher für den jeweiligen Dienst (Transkription und Übersetzung) verwendet werden soll.

4.  **Mehrere synchronisierte Geräte:**
    -   Aktualisieren Sie die Erweiterung auf allen Ihren Geräten. Eine Version vor 1.2.0 kennt Gemini nicht: Wenn Gemini ausgewählt ist, verwendet sie einen älteren, von Ihnen aktivierten Provider oder sendet nichts.
    -   Wenn eine neuere Version der Erweiterung einen Provider gespeichert hat, den Ihre Version noch nicht kennt, weist die Optionsseite im Abschnitt „Provider einer neueren Version“ darauf hin und bietet eine Schaltfläche zum Löschen seiner Einstellungen auf allen Ihren Geräten.
    -   Wenn der Browser Ihre Optionen nicht speichern kann (beispielsweise wegen eines zu langen Werts), zeigt die Seite den Fehler anstelle von „Optionen gespeichert!“ an und speichert nichts.

## 🚀 Verwendung mit LiteLLM Proxy oder benutzerdefinierten Endpunkten

Babel Fish AI ist mit [LiteLLM Proxy](https://litellm.ai/) und anderen OpenAI-kompatiblen API-Proxys kompatibel und ermöglicht so die Verwendung alternativer Sprachmodelle.

### Konfiguration

1.  **Installieren und konfigurieren Sie Ihren Proxy:** Folgen Sie den Anweisungen des von Ihnen verwendeten Dienstes (LiteLLM usw.).
2.  **Konfigurieren Sie die Babel-Fish-AI-Erweiterung:**
    -   Wählen Sie in den Optionen der Erweiterung den Provider **Custom/LiteLLM** im Dropdown-Menü aus.
    -   Geben Sie Ihren API-Schlüssel ein (falls erforderlich).
    -   Konfigurieren Sie die API-URLs:
        -   **Transkriptions-URL**: zum Beispiel `http://localhost:4000/v1/audio/transcriptions`
        -   **Chat-URL**: zum Beispiel `http://localhost:4000/v1/chat/completions`
    -   Aktivieren Sie den Provider mit dem Schalter.
    -   Aktivieren Sie die Option **„NoLog“**, wenn Sie die Protokollierung von Anfragen durch LiteLLM deaktivieren möchten.

**Wichtig:** Die Option „NoLog“ ist **ausschließlich** beim Provider Custom/LiteLLM verfügbar. Sie ist nicht mit den offiziellen APIs von OpenAI, Mistral AI oder Gemini kompatibel.

## 🛠️ Technische Funktionsweise

### Architektur der Erweiterung

Die Erweiterung besteht aus mehreren JavaScript-Dateien, die miteinander interagieren:

#### Hauptdateien

-   **`manifest.json`:** Die Hauptkonfigurationsdatei der Erweiterung. Sie definiert Berechtigungen, Skripte, zugängliche Ressourcen usw. Sie verwendet Version 3 des Manifests und deklariert die Berechtigungen `activeTab`, `storage`, `commands`, `scripting` und `contextMenus`.
-   **`background.js`:** Der im Hintergrund ausgeführte Service Worker. Er verwaltet Ereignisse (Klick auf das Symbol, Tastenkürzel, Kontextmenü), injiziert bei Bedarf `content script` und kommuniziert mit `content script`.
-   **`content.js`:** Das Hauptskript, das in Webseiten injiziert wird. Es koordiniert die verschiedenen Hilfsmodule und steuert den gesamten Ablauf der Erweiterung.
-   **`src/constants.js`:** Definiert Konstanten für Konfiguration, Zustände, Aktionen usw.

#### Hilfsmodule

Die Erweiterung verwendet eine modulare Architektur mit mehreren spezialisierten Hilfsdateien:

##### Verwaltung von Providern und APIs

-   **`src/utils/providers.js`:** Verzeichnis der KI-Provider (Mistral AI, OpenAI, Gemini, Custom/LiteLLM) mit ihren Konfigurationen, Modellen und Standard-URLs.
-   **`src/utils/provider-store.js`:** Liest die Einstellungen der Provider aus dem Speicher und stellt sicher, dass ein API-Schlüssel nur an die Adressen seines Providers gesendet wird.
-   **`src/utils/provider-adapters.js`:** API-Formate der Provider: Authentifizierung, Anfrageinhalte sowie Verarbeitung von Antworten und Fehlern.
-   **`src/utils/api-utils.js`:** Funktionen für die Interaktion mit externen APIs, die Auflösung der Multi-Provider-Konfiguration und die Audiotranskription.
-   **`src/utils/text-processing.js`:** Funktionen zur Textverarbeitung: Übersetzung, Neuformulierung, Rechtschreibkorrektur.

##### Benutzeroberfläche und Interaktion

-   **`src/utils/ui.js`:** Allgemeine Hilfsfunktionen für die Benutzeroberfläche.
-   **`src/utils/banner-utils.js`:** Verwaltet das Statusbanner, seine Steuerelemente und die Sprachauswahl.
-   **`src/utils/focus-utils.js`:** Verwaltet das Speichern und Wiederherstellen des Fokus und der Textauswahl.
-   **`src/utils/transcription-display.js`:** Verwaltet die Anzeige der Transkriptionsergebnisse.
-   **`src/utils/error-utils.js`:** Verwaltet die Anzeige und Verarbeitung von Fehlern.
-   **`src/styles/content.css`:** CSS-Stile für die in Webseiten injizierte Benutzeroberfläche.

##### Aufnahme und Ereignisse

-   **`src/utils/recording-utils.js`:** Verwaltet die Audioaufnahme über das Mikrofon und die Verarbeitung der Audiodaten.
-   **`src/utils/event-handlers.js`:** Enthält die Ereignisbehandlungsroutinen für Benutzerinteraktionen.

##### Internationalisierung und Sprachen

-   **`src/utils/languages.js`:** Definiert die von der Erweiterung unterstützten Sprachen.
-   **`src/utils/languages-shared.js`:** Definiert die Liste der für den Kontext der Webseite unterstützten Sprachen.
-   **`src/utils/languages-data.js`:** Definiert die Liste der für den Service Worker unterstützten Sprachen.
-   **`src/utils/i18n.js`:** Verwaltet die Internationalisierung der Benutzeroberfläche.

##### Optionsseite

-   **`src/pages/options/`:** Enthält die Dateien für die Optionsseite der Erweiterung (HTML, CSS, JavaScript).
### Transkriptions- und Übersetzungsprozess

#### Hauptfunktion der Sprachtranskription

1.  **Aufzeichnung starten:** Der Benutzer startet die Aufzeichnung, indem er auf das Erweiterungssymbol klickt oder das Tastenkürzel verwendet (Strg+Umschalt+1 oder ⌘+Umschalt+1 auf dem Mac). Der `background script` sendet eine Nachricht an den `content script`, um die Aufzeichnung zu starten.
2.  **Audioaufnahme:** Der `content script` verwendet die API `navigator.mediaDevices.getUserMedia`, um auf das Mikrofon zuzugreifen und den Ton über die MediaRecorder-API aufzuzeichnen.
3.  **Transkription:** Der `content script` verwendet die Funktion `transcribeAudio` (`src/utils/api-utils.js`), um die Audiodaten an die Transkriptions-API des konfigurierten Providers zu senden (Voxtral für Mistral AI, gpt-transcribe oder Whisper für OpenAI, Gemini 3.5 Transcribe für Gemini). Die API gibt den transkribierten Text zurück.
4.  **Übersetzung oder Umformulierung (optional):**

-   Wenn die Übersetzungsoption aktiviert ist, verwendet der `content script` die Funktion `translateText` (`src/utils/text-processing.js`), um den transkribierten Text an die Chat-API des konfigurierten Providers zu senden.
-   Wenn die Umformulierungsoption aktiviert ist, wird die Funktion `rephraseText` verwendet, um den transkribierten Text zu verbessern.

5.  **Anzeige:** Der `content script` zeigt den verarbeiteten Text entweder im aktiven Element der Seite (wenn es sich um ein Textfeld oder ein bearbeitbares Element handelt) oder in einem benutzerdefinierten Dialogfeld an.

#### Kontextmenü-Funktion

1. **Textauswahl:** Der Benutzer wählt Text auf einer Webseite aus.
2. **Kontextmenü:** Ein Rechtsklick zeigt folgende Optionen an:
    - „Auswahl umformulieren“, um Stil und Klarheit zu verbessern
    - „Auswahl übersetzen“ mit einem Untermenü der verfügbaren Sprachen
    - „Rechtschreibung korrigieren“, um Fehler zu beheben
3. **Verarbeitung:** Abhängig von der gewählten Option:
    - Der Text wird über die Funktion `rephraseText` zur Umformulierung gesendet
    - Der Text wird über die Funktion `translateText` mit der ausgewählten Zielsprache zur Übersetzung gesendet
    - Der Text wird über die Funktion `correctText` zur Korrektur gesendet
4. **Anzeige:** Das Ergebnis ersetzt die ursprüngliche Auswahl in dem Element, in dem sich der ausgewählte Text befindet.

### Kommunikation

Die Kommunikation zwischen dem `background script` und dem `content script` erfolgt über die Messaging-API von Chrome (`chrome.runtime.sendMessage` und `chrome.runtime.onMessage`).

### Datenspeicherung

Die Erweiterung verwendet `chrome.storage.sync` zum Speichern von:

-   Der Konfiguration der KI-Provider (API-Schlüssel, ausgewählte Modelle, benutzerdefinierte URLs). Gemini, das in Version 1.2.0 hinzugefügt wurde, verfügt über einen eigenen Speicherschlüssel (`extraProvider.gemini`), den frühere Versionen ignorieren.
-   Den Optionen der Erweiterung (Anzeige, Übersetzung, Farben des Banners usw.).
-   Den Spracheinstellungen für die Übersetzung.

Diese Daten werden lokal auf Ihrem Computer im Speicher der Browsererweiterung gespeichert.

### Fehlerbehandlung

Mögliche Fehler (fehlender API-Schlüssel, Transkriptionsfehler usw.) sind in der Datei `constants.js` definiert. Die Funktionen `api-utils.js` und `text-processing.js` behandeln potenzielle Fehler bei API-Aufrufen mit verbesserten Meldungen je nach HTTP-Code. Der `content.js` zeigt dem Benutzer Fehlermeldungen über ein Banner am unteren Rand der Seite an.

## 🛡️ Sicherheit und Datenschutz

-   **Datenschutz:**
    -   Der API-Schlüssel wird sicher im Browser gespeichert.
    -   Die Erweiterung speichert Ihre Audiodaten nicht; die gesamte Verarbeitung erfolgt in Echtzeit.
    -   Die Kommunikation mit den APIs erfolgt über sichere HTTPS-Verbindungen.

Ausführliche Informationen darüber, wie BabelFishAI mit Ihren Daten umgeht, finden Sie in unserer [Datenschutzrichtlinie](PRIVACY.md).

## 🔧 Fehlerbehebung

-   **Mikrofonprobleme:**

    -   Überprüfen Sie in Ihrem Browser die Berechtigungen für den Mikrofonzugriff.
    -   Stellen Sie sicher, dass keine andere Anwendung gleichzeitig das Mikrofon verwendet.

-   **Transkriptions-/Übersetzungsfehler:**
    -   Überprüfen Sie, ob der API-Schlüssel gültig und aktiv ist.
    -   Stellen Sie sicher, dass Sie über eine stabile Internetverbindung verfügen.
    -   Prüfen Sie bei einem Fehler die Browserkonsole, um detaillierte Logs zu erhalten.

## 🤝 Mitwirken

Beiträge und Vorschläge sind willkommen. So können Sie mitwirken:

-   Melden Sie Bugs über den Bereich „Issues“ auf GitHub.
-   Schlagen Sie Verbesserungen oder neue Funktionen vor.
-   Reichen Sie Ihre Pull Requests ein.

## 📄 Lizenz

Diese Erweiterung wird unter der GNU Affero General Public License v3.0 (AGPL-3.0) vertrieben. Weitere Einzelheiten finden Sie in der Datei LICENSE.

## 💝 Unterstützung

## Wenn Ihnen diese Erweiterung gefällt, können Sie ihre Entwicklung mit einer Spende über [PayPal](https://paypal.me/jls) unterstützen.

Mit Leidenschaft und Innovationsgeist von jls42.org entwickelt, eröffnet Babel Fish AI der Transkription und Übersetzung dank modernster künstlicher Intelligenz neue Horizonte.
