# Babel Fish AI - Erweiterung für Sprachtranskription und Übersetzung mit KI

Babel Fish AI ist eine innovative Chrome-Erweiterung, die ursprünglich entwickelt wurde, um eine leistungsstarke Sprachtranskription zu bieten. Verwandeln Sie Ihre Stimme in Text mit bemerkenswerter Präzision dank der OpenAI API Whisper und profitieren Sie optional von einer automatischen Echtzeitübersetzung. Sie können Babel Fish AI ausschließlich für die Transkription verwenden oder die Übersetzung je nach Bedarf in Echtzeit aktivieren.

## 🌟 Funktionen

- **Fortgeschrittene Sprachtranskription**
  - Hochwertige Audioaufnahme über das Mikrofon Ihres Geräts.
  - Präzise Transkription, durchgeführt von der OpenAI API Whisper.
  - Mehrsprachige Unterstützung für die Sprachverarbeitung und Textausgabe, die es ermöglicht, gesprochene Eingaben in verschiedenen Sprachen zu transkribieren und die Ergebnisse in der von Ihnen gewählten Sprache anzuzeigen.
  - Automatisches Einfügen des Textes in das aktive Feld oder Anzeige in einem dedizierten Dialogfeld.

- **Integrierte Automatische Übersetzung (Optional)**
  - Sofortige Übersetzung der Transkriptionen in verschiedene Sprachen, die bei Bedarf aktiviert werden kann.
  - Einsatz eines fortschrittlichen KI-Modells, um eine Übersetzung zu gewährleisten, die dem ursprünglichen Sinn treu bleibt.
  - Freie Wahl, entweder ausschließlich die Transkription zu nutzen oder Transkription und Übersetzung zu kombinieren.

- **Intuitive und anpassbare Benutzeroberfläche**
  - Flexibler Anzeigemodus: aktive Eingabebox oder schwebendes Dialogfenster.
  - Konfigurierbares Statusband mit Auswahl der Farben, Opazität und Anzeigedauer.
  - Tastenkürzel (Strg+Shift+1 bzw. ⌘+Shift+1 auf dem Mac) zum Starten/Stoppen der Aufnahme.
  - Benutzerdefiniertes Symbol, das ein Mikrofon und die Zahl „42“ integriert, für eine sofortige Erkennung.

- **Erweiterte Optionen**
  - Expertenmodus für detaillierte Konfigurationen (URLs der APIs, Konfiguration nach Domäne etc.).
  - Möglichkeit zur Anpassung der Transkriptions- und Übersetzungsmodelle.
  - Vollständige Verwaltung der Internationalisierung dank der Sprachdateien (_locales), die eine mehrsprachige Benutzeroberfläche und Sprachunterstützung bieten.

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

1. **Herunterladen und Installieren:**
   - Klonen Sie dieses Repository von GitHub oder laden Sie den Ordner der Erweiterung manuell herunter.
   - Öffnen Sie Chrome und gehen Sie zu `chrome://extensions/`.
   - Aktivieren Sie den „Entwicklermodus“ oben rechts.
   - Klicken Sie auf „Entpackte Erweiterung laden“ und wählen Sie den Babel Fish AI Ordner aus.

2. **Überprüfung:**
   - Stellen Sie sicher, dass die Erweiterung in der Chrome-Symbolleiste mit dem benutzerdefinierten Symbol angezeigt wird.

## ⚙️ Konfiguration

1. **OpenAI API-Schlüssel:**
   - Klicken Sie auf das Symbol der Erweiterung, um auf die Optionen zuzugreifen.
   - Geben Sie Ihren OpenAI API-Schlüssel ein (verfügbar unter [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Anpassung der Optionen:**
   - Wählen Sie den Anzeigemodus (aktives Feld oder Dialogfenster).
   - Konfigurieren Sie die Farbe, die Opazität und die Anzeigedauer des Statusbands.
   - Wählen Sie die Sprachen für die Transkription (Spracheingabe) und für die Textausgabe.
   - Aktivieren oder deaktivieren Sie die Übersetzungsfunktion je nach Bedarf.

## 🛠️ Technischer Betrieb

### Architektur der Erweiterung

Die Erweiterung besteht aus mehreren JavaScript-Dateien, die miteinander interagieren:

*   **`manifest.json`:** Die Hauptkonfigurationsdatei der Erweiterung. Sie definiert die Berechtigungen, Skripte, zugänglichen Ressourcen usw. Sie verwendet Version 3 des Manifests und deklariert die Berechtigungen `activeTab`, `storage`, `commands` und `scripting`. Die `content_scripts` werden in alle URLs injiziert und am Ende des Dokumentenladens ausgeführt.
*   **`background.js`:** Der Service Worker, der im Hintergrund ausgeführt wird. Er verwaltet Ereignisse (Klick auf das Symbol, Tastenkürzel), injiziert bei Bedarf das `content script` und kommuniziert mit diesem.
*   **`content.js`:** Das Skript, das in Webseiten injiziert wird. Es interagiert direkt mit dem DOM, erfasst das Audio des Mikrofons, ruft die Transkriptions- und Übersetzungs-APIs auf und zeigt die Ergebnisse an.
*   **`src/utils/api.js`:** Enthält die Funktion `transcribeAudio`, um die OpenAI API Whisper (Transkription) aufzurufen.
*   **`src/utils/translation.js`:** Enthält die Funktion `translateText`, um die OpenAI API GPT (Übersetzung) aufzurufen.
*   **`src/utils/ui.js`:** Enthält Hilfsfunktionen zur Verwaltung der Benutzeroberfläche (Banner, Dialogfeld, Kopierschaltfläche).
*   **`src/constants.js`:** Definiert Konstanten für die Konfiguration, Zustände, Aktionen usw.
*   **`src/pages/options/`:** Beinhaltet die Dateien für die Optionsseite der Erweiterung (HTML, CSS, JavaScript).

### Prozess der Transkription und Übersetzung

1.  **Start der Aufnahme:** Der Benutzer startet die Aufnahme, indem er auf das Erweiterungssymbol klickt oder das Tastenkürzel verwendet. Das `background script` sendet eine Nachricht an das `content script`, um die Aufnahme zu starten.
2.  **Audioaufnahme:** Das `content script` verwendet die API `navigator.mediaDevices.getUserMedia`, um auf das Mikrofon zuzugreifen und Audio aufzuzeichnen.
3.  **Transkription:** Das `content script` verwendet die Funktion `transcribeAudio` (`src/utils/api.js`), um das Audio an die OpenAI API Whisper zu senden. Die API liefert den transkribierten Text zurück.
4.  **Übersetzung (Optional):** Wenn die Übersetzungsoption aktiviert ist, verwendet das `content script` die Funktion `translateText` (`src/utils/translation.js`), um den transkribierten Text an die OpenAI API GPT zu senden. Die API liefert den übersetzten Text zurück.
5.  **Anzeige:** Das `content script` zeigt den transkribierten (und gegebenenfalls übersetzten) Text entweder im aktiven Element der Seite (wenn es sich um ein Textfeld oder ein editierbares Element handelt) oder in einem Dialogfeld an.

### Kommunikation

Die Kommunikation zwischen dem `background script` und dem `content script` erfolgt über die Chrome Messaging API (`chrome.runtime.sendMessage` und `chrome.runtime.onMessage`).

### Datenspeicherung

Die Erweiterung verwendet `chrome.storage.sync`, um zu speichern:

*   Den OpenAI API-Schlüssel (`apiKey`).
*   Die Optionen der Erweiterung (Anzeige, Übersetzung, Farben des Statusbands usw.).

### Fehlerverwaltung
Mögliche Fehler (fehlender API-Schlüssel, Transkriptionsfehler usw.) werden in der Datei `constants.js` definiert. Die Funktionen in `api.js` und `translation.js` verwalten potenzielle Fehler bei den API-Aufrufen. Das `content.js` zeigt dem Benutzer Fehlermeldungen über ein Banner am oberen Seitenrand an.

## 🛡️ Sicherheit und Datenschutz

- **Datenschutz:**
  - Der API-Schlüssel wird sicher in Chrome gespeichert.
  - Die Erweiterung speichert Ihre Audiodaten nicht; alle Verarbeitungen erfolgen in Echtzeit.
  - Die Kommunikation mit den APIs erfolgt über gesicherte HTTPS-Verbindungen.

## 🔧 Fehlerbehebung

- **Mikrofonprobleme:**
  - Überprüfen Sie die Berechtigungen für den Mikrofonzugriff in Chrome.
  - Stellen Sie sicher, dass keine andere Anwendung gleichzeitig das Mikrofon verwendet.

- **Transkriptions-/Übersetzungsfehler:**
  - Überprüfen Sie, ob der API-Schlüssel gültig und aktiv ist.
  - Stellen Sie sicher, dass eine stabile Internetverbindung besteht.
  - Konsultieren Sie die Chrome-Konsole, um detaillierte Logs im Fehlerfall zu erhalten.

## 🤝 Beitrag

Beiträge und Vorschläge sind willkommen. Um beizutragen:
- Melden Sie Bugs über den Issues-Bereich auf GitHub.
- Schlagen Sie Verbesserungen oder neue Funktionen vor.
- Reichen Sie Ihre Pull Requests ein.

## 📄 Lizenz

Diese Erweiterung wird unter der GNU Affero General Public License v3.0 (AGPL-3.0) vertrieben. Weitere Details finden Sie in der Datei LICENSE.

## 💝 Unterstützung

Wenn Sie diese Erweiterung zu schätzen wissen, können Sie ihre Weiterentwicklung über eine Spende via [PayPal](https://paypal.me/jls) unterstützen.

---
Entwickelt von jls42.org mit Leidenschaft und Innovation, bringt Babel Fish AI Transkription und Übersetzung dank moderner künstlicher Intelligenz in neue Dimensionen.

**Dieses Dokument wurde von der Version fr in die Sprache en unter Verwendung des Modells o3-mini übersetzt. Für weitere Informationen zum Übersetzungsprozess, konsultieren Sie https://gitlab.com/jls42/ai-powered-markdown-translator**

