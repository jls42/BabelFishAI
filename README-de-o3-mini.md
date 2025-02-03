# Babel Fish AI - Erweiterung für Sprachtranskription und Übersetzung mit KI

Babel Fish AI ist eine innovative Chrome-Erweiterung, die ursprünglich entwickelt wurde, um eine leistungsstarke Sprachtranskription zu bieten. Verwandeln Sie Ihre Stimme in Text mit bemerkenswerter Präzision dank der Whisper-API von OpenAI, und profitieren Sie optional von einer automatischen Echtzeitübersetzung. Sie können Babel Fish AI entweder ausschließlich für die Transkription verwenden oder die Übersetzung on-the-fly je nach Bedarf aktivieren.

## 🌟 Funktionen

- **Fortgeschrittene Sprachtranskription**
  - Aufnahme von hochwertigem Audio über das Mikrofon Ihres Geräts.
  - Präzise Transkription, durchgeführt von der Whisper-API von OpenAI.
  - Mehrsprachige Unterstützung für die Sprachverarbeitung und Textanzeige, die es ermöglicht, gesprochene Eingaben in verschiedenen Sprachen zu transkribieren und die Ergebnisse in der gewünschten Sprache anzuzeigen.
  - Automatisches Einfügen des Textes in das aktive Feld oder Anzeige in einem dedizierten Dialogfenster.

- **Integrierte automatische Übersetzung (Optional)**
  - Sofortige Übersetzung der Transkriptionen in verschiedene Sprachen, bei Bedarf aktivierbar.
  - Verwendung eines fortschrittlichen KI-Modells, um eine getreue Übersetzung des Originalinhalts zu gewährleisten.
  - Freie Wahl, entweder ausschließlich die Transkription zu nutzen oder Transkription und Übersetzung zu kombinieren.

- **Intuitive und anpassbare Benutzeroberfläche**
  - Flexibler Anzeige-Modus: aktives Eingabefeld oder schwebendes Dialogfenster.
  - Konfigurierbare Statusleiste mit Auswahl von Farben, Deckkraft und Anzeigedauer.
  - Tastenkombination (Ctrl+Shift+1 oder ⌘+Shift+1 auf Mac) zum Starten/Stoppen der Aufnahme.
  - Angepasstes Symbol, das ein Mikrofon und die Zahl “42” integriert, für eine sofortige Erkennung.

- **Erweiterte Optionen**
  - Expertenmodus für detaillierte Konfigurationen (API-URLs, domänenspezifische Einstellungen etc.).
  - Möglichkeit zur Anpassung der Transkriptions- und Übersetzungsmodelle.
  - Umfassende Verwaltung der Internationalisierung durch Sprachdateien (_locales), die eine mehrsprachige Benutzeroberfläche und Sprachunterstützung bieten.

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

1. **Herunterladen und Installation:**
   - Klonen Sie dieses Repository von GitHub oder laden Sie den Ordner der Erweiterung manuell herunter.
   - Öffnen Sie Chrome und gehen Sie zu `chrome://extensions/`.
   - Aktivieren Sie den Entwicklermodus oben rechts.
   - Klicken Sie auf „Entpackte Erweiterung laden“ und wählen Sie den Babel Fish AI-Ordner aus.

2. **Überprüfung:**
   - Stellen Sie sicher, dass die Erweiterung in der Chrome-Symbolleiste mit dem angepassten Symbol erscheint.

## ⚙️ Konfiguration

1. **OpenAI API-Schlüssel:**
   - Klicken Sie auf das Symbol der Erweiterung, um auf die Optionen zuzugreifen.
   - Geben Sie Ihren OpenAI API-Schlüssel ein (verfügbar unter [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Anpassung der Optionen:**
   - Wählen Sie den Anzeigemodus (aktives Feld oder Dialogfenster).
   - Konfigurieren Sie die Farbe, Deckkraft und Anzeigedauer der Statusleiste.
   - Wählen Sie die Sprachen für die Transkription (Sprachaufnahme) und für die Textanzeige aus.
   - Aktivieren oder deaktivieren Sie die Übersetzungsfunktion je nach Bedarf.

## 🛠️ Technische Funktionsweise

- **Architektur der Erweiterung:**
  - **Manifest V3:** Die Datei `manifest.json` definiert die Content Scripts, den Service Worker (`background.js`) und die erforderlichen Berechtigungen.
  - **Hintergrund- und Contentskripte:** Die Datei `background.js` verwaltet die Hintergrundlogik und die Kommunikation mit den APIs, während `content.js` sich um die Interaktion mit der aktiven Webseite kümmert.
  - **Dienstprogramme und Internationalisierung:** Der Ordner `src/utils` enthält Module zur Verwaltung der API, der Benutzeroberfläche, der Übersetzung und der Internationalisierung mithilfe von Sprachdateien im Ordner `_locales`.

- **Prozess der Transkription und Übersetzung:**
  1. **Start der Aufnahme:** Die Erweiterung erfasst Ihre Stimme über das Mikrofon, wenn Sie auf das Symbol klicken oder die Tastenkombination verwenden.
  2. **Transkription:** Das Audio wird an die Whisper-API von OpenAI gesendet, um in Text umgewandelt zu werden, wobei mehrere Eingangssprachen unterstützt werden.
  3. **Übersetzung (optional):** Falls aktiviert, wird die Transkription automatisch in die ausgewählte Zielsprache übersetzt, wobei Sinn und Kontext beibehalten werden.
  4. **Anzeige:** Der transkribierte (und gegebenenfalls übersetzte) Text wird in das aktive Feld eingefügt oder in einem angepassten Dialogfenster angezeigt.

## 🛡️ Sicherheit und Datenschutz

- **Datenschutz:**
  - Der API-Schlüssel wird sicher in Chrome gespeichert.
  - Die Erweiterung speichert Ihre Audiodaten nicht; alle Prozesse finden in Echtzeit statt.
  - Die Kommunikation mit den APIs erfolgt über gesicherte HTTPS-Verbindungen.

## 🔧 Fehlerbehebung

- **Mikrofonprobleme:**
  - Überprüfen Sie die Mikrofonzugriffsrechte in Chrome.
  - Stellen Sie sicher, dass keine andere Anwendung das Mikrofon gleichzeitig verwendet.

- **Fehler bei der Transkription/Übersetzung:**
  - Überprüfen Sie, ob der API-Schlüssel gültig und aktiv ist.
  - Stellen Sie sicher, dass Sie über eine stabile Internetverbindung verfügen.
  - Sehen Sie in der Chrome-Konsole nach, um detaillierte Protokolle im Fehlerfall zu erhalten.

## 🤝 Mitwirkung

Beiträge und Vorschläge sind willkommen. Um beizutragen:
- Melden Sie Bugs über den Issues-Bereich auf GitHub.
- Schlagen Sie Verbesserungen oder neue Funktionen vor.
- Senden Sie Ihre Pull Requests ein.

## 📄 Lizenz

Diese Erweiterung wird unter der GNU Affero General Public License v3.0 (AGPL-3.0) vertrieben. Weitere Details finden Sie in der Datei LICENSE.

## 💝 Unterstützung

Wenn Sie diese Erweiterung schätzen, können Sie die Entwicklung durch eine Spende über [PayPal](https://paypal.me/jls) unterstützen.

---
Entwickelt von jls42.org mit Leidenschaft und Innovation, treibt Babel Fish AI die Transkription und Übersetzung dank modernster künstlicher Intelligenz zu neuen Horizonten.

**Dieses Dokument wurde von der Version fr in die Sprache de unter Verwendung des o3-mini Modells übersetzt. Für weitere Informationen zum Übersetzungsprozess besuchen Sie https://gitlab.com/jls42/ai-powered-markdown-translator**

