# Babel Fish AI - Voice Transcription and Translation Extension with AI

Babel Fish AI is an innovative Chrome extension originally designed to provide powerful voice transcription. Transform your voice into text with remarkable accuracy thanks to OpenAI’s Whisper API, and optionally benefit from real-time automatic translation. You can use Babel Fish AI exclusively for transcription or enable on-the-fly translation according to your needs.

## 🌟 Features

- **Advanced Voice Transcription**
  - High-quality audio capture via your device’s microphone.
  - Accurate transcription performed by OpenAI’s Whisper API.
  - Multi-language support for voice processing and text display, allowing you to transcribe voice inputs in different languages and display the results in the language of your choice.
  - Automatic insertion of the text in the active field or display in a dedicated dialog box.

- **Built-in Automatic Translation (Optional)**
  - Immediate translation of transcriptions into various languages, to be activated if needed.
  - Use of an advanced AI model to ensure a translation faithful to the original meaning.
  - Free choice to use transcription exclusively or to combine transcription and translation.

- **Intuitive and Customizable User Interface**
  - Flexible display mode: active input area or floating dialog window.
  - Configurable status banner with choices of colors, opacity, and display duration.
  - Keyboard shortcut (Ctrl+Shift+1 or ⌘+Shift+1 on Mac) to start/stop recording.
  - Custom icon, featuring a microphone and the number “42”, for immediate recognition.

- **Advanced Options**
  - Expert mode for detailed configurations (API URLs, domain configuration, etc.).
  - Ability to customize transcription and translation models.
  - Full management of internationalization thanks to language files (_locales), offering an interface and voice support in multiple languages.

## 🌐 Supported Languages

- Arabic
- German
- English
- Spanish
- French
- Hindi
- Italian
- Japanese
- Korean
- Dutch
- Polish
- Portuguese
- Romanian
- Swedish
- Chinese

## 🚀 Installation

1. **Download and Installation:**
   - Clone this repository from GitHub or manually download the extension folder.
   - Open Chrome and go to `chrome://extensions/`.
   - Enable "Developer Mode" at the top right.
   - Click on "Load unpacked" and select the Babel Fish AI folder.

2. **Verification:**
   - Make sure that the extension appears in the Chrome toolbar with the custom icon.

## ⚙️ Configuration

1. **OpenAI API Key:**
   - Click on the extension icon to access the options.
   - Enter your OpenAI API key (available at [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Customizing Options:**
   - Choose the display mode (active area or dialog box).
   - Configure the color, opacity, and display duration of the status banner.
   - Select the languages for transcription (voice input) and for text display.
   - Activate or deactivate the translation feature as needed.

## 🛠️ Technical Operation

- **Extension Architecture:**
  - **Manifest V3:** The `manifest.json` file defines the content scripts, the service worker (`background.js`), and the necessary permissions.
  - **Background and Content Scripts:** The `background.js` file handles background logic and communication with the APIs, while `content.js` deals with interaction with the active web page.
  - **Utilities and Internationalization:** The `src/utils` folder contains modules to manage the API, the user interface, the translation, and internationalization via language files in the `_locales` folder.

- **Transcription and Translation Process:**
  1. **Starting the Recording:** The extension captures your voice via the microphone when you click the icon or use the keyboard shortcut.
  2. **Transcription:** The audio is sent to OpenAI’s Whisper API to be converted into text, with support for multiple input languages.
  3. **Translation (Optional):** If activated, the transcription is automatically translated into the selected target language, while preserving meaning and context.
  4. **Display:** The transcribed (and optionally translated) text is inserted into the active field or displayed in a customized dialog window.

## 🛡️ Security and Privacy

- **Data Protection:**
  - The API key is securely stored in Chrome.
  - The extension does not retain your audio data; all processes are carried out in real time.
  - Communication with the APIs is done via secure HTTPS connections.

## 🔧 Troubleshooting

- **Microphone Issues:**
  - Check the microphone access permissions in Chrome.
  - Ensure that no other application is using the microphone simultaneously.

- **Transcription/Translation Errors:**
  - Verify that the API key is valid and active.
  - Ensure you have a stable internet connection.
  - Check the Chrome console for detailed logs in case of an error.

## 🤝 Contribution

Contributions and suggestions are welcome. To contribute:
- Report bugs via the Issues section on GitHub.
- Suggest improvements or new features.
- Submit your pull requests.

## 📄 License

This extension is distributed under the GNU Affero General Public License v3.0 (AGPL-3.0). See the LICENSE file for more details.

## 💝 Support

If you appreciate this extension, you can support its development by making a donation via [PayPal](https://paypal.me/jls).

---
Developed by jls42.org with passion and innovation, Babel Fish AI propels transcription and translation to new horizons thanks to cutting-edge artificial intelligence.

**This document was translated from the fr version to the en language using the o3-mini model. For more information on the translation process, see https://gitlab.com/jls42/ai-powered-markdown-translator**

