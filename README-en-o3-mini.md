# Babel Fish AI - Voice Transcription and Translation Extension with AI

Babel Fish AI is an innovative Chrome extension originally designed to provide powerful voice transcription. Transform your voice into text with remarkable accuracy using OpenAI's Whisper API, and optionally benefit from real-time automatic translation. You can use Babel Fish AI exclusively for transcription or enable on-the-fly translation according to your needs.

## 🌟 Features

- **Advanced Voice Transcription**
  - High-quality audio capture via your device's microphone.
  - Precise transcription performed by OpenAI's Whisper API.
  - Multi-language support for voice processing and text display, allowing you to transcribe voice inputs in different languages and display the results in the language of your choice.
  - Automatic insertion of the text into the active field or display in a dedicated dialog box.

- **Integrated Automatic Translation (Optional)**
  - Immediate translation of transcriptions into various languages, to be activated if needed.
  - Use of an advanced AI model to ensure a translation faithful to the original meaning.
  - Free choice to use exclusively the transcription or to combine transcription and translation.

- **Intuitive and Customizable User Interface**
  - Flexible display mode: active input area or floating dialog window.
  - Configurable status banner with options for colors, opacity, and display duration.
  - Keyboard shortcut (Ctrl+Shift+1 or ⌘+Shift+1 on Mac) to start/stop recording.
  - Custom icon, featuring a microphone and the number “42”, for immediate recognition.

- **Advanced Options**
  - Expert mode for detailed configurations (API URLs, domain configuration, etc.).
  - Possibility to customize the transcription and translation models.
  - Complete management of internationalization thanks to the language files (_locales), offering an interface and voice support in several languages.

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
   - Click on "Load unpacked extension" and select the Babel Fish AI folder.

2. **Verification:**
   - Make sure the extension appears in the Chrome toolbar with the custom icon.

## ⚙️ Configuration

1. **OpenAI API Key:**
   - Click on the extension icon to access the options.
   - Enter your OpenAI API key (available at [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Customization of Options:**
   - Choose the display mode (active area or dialog box).
   - Configure the color, opacity, and display duration of the status banner.
   - Select the languages for transcription (voice input) and for text display.
   - Enable or disable the translation feature according to your needs.

## 🛠️ Technical Operation

### Extension Architecture

The extension is composed of several JavaScript files that interact with each other:

*   **`manifest.json`:** The main configuration file of the extension. It defines the permissions, scripts, accessible resources, etc. It uses Manifest version 3 and declares the `activeTab`, `storage`, `commands`, and `scripting` permissions. The `content_scripts` are injected into all URLs and execute at the end of the document loading.
*   **`background.js`:** The service worker that runs in the background. It handles events (click on the icon, keyboard shortcuts), injects the `content script` if necessary, and communicates with the `content script`.
*   **`content.js`:** The script that is injected into web pages. It interacts directly with the DOM, captures audio from the microphone, calls the transcription and translation APIs, and displays the results.
*   **`src/utils/api.js`:** Contains the `transcribeAudio` function to call OpenAI's Whisper API (transcription).
*   **`src/utils/translation.js`:** Contains the `translateText` function to call OpenAI's GPT API (translation).
*   **`src/utils/ui.js`:** Contains utility functions to manage the user interface (banner, dialog box, copy button).
*   **`src/constants.js`:** Defines constants for configuration, states, actions, etc.
*   **`src/pages/options/`:** Contains the files for the extension's options page (HTML, CSS, JavaScript).

### Transcription and Translation Process

1.  **Start Recording:** The user starts recording by clicking the extension icon or using the keyboard shortcut. The `background script` sends a message to the `content script` to start recording.
2.  **Audio Capture:** The `content script` uses the `navigator.mediaDevices.getUserMedia` API to access the microphone and record audio.
3.  **Transcription:** The `content script` uses the `transcribeAudio` function (`src/utils/api.js`) to send the audio to OpenAI's Whisper API. The API returns the transcribed text.
4.  **Translation (Optional):** If the translation option is enabled, the `content script` uses the `translateText` function (`src/utils/translation.js`) to send the transcribed text to OpenAI's GPT API. The API returns the translated text.
5.  **Display:** The `content script` displays the transcribed (and optionally translated) text either in the active element of the page (if it is a text field or an editable element) or in a dialog box.

### Communication

Communication between the `background script` and the `content script` is done via Chrome's messaging API (`chrome.runtime.sendMessage` and `chrome.runtime.onMessage`).

### Data Storage

The extension uses `chrome.storage.sync` to store:

*   The OpenAI API key (`apiKey`).
*   The extension options (display, translation, banner colors, etc.).

### Error Handling
Possible errors (missing API key, transcription error, etc.) are defined in the `constants.js` file. The functions in `api.js` and `translation.js` handle potential API call errors. The `content.js` displays error messages to the user via a banner at the top of the page.

## 🛡️ Security and Privacy

- **Data Protection:**
  - The API key is securely stored in Chrome.
  - The extension does not retain your audio data; all processing is done in real time.
  - Communication with the APIs is done through secure HTTPS connections.

## 🔧 Troubleshooting

- **Microphone Issues:**
  - Check the microphone access permissions in Chrome.
  - Ensure that no other application is using the microphone simultaneously.

- **Transcription/Translation Errors:**
  - Check that the API key is valid and active.
  - Ensure you have a stable internet connection.
  - Consult the Chrome console for detailed logs in case of an error.

## 🤝 Contribution

Contributions and suggestions are welcome. To contribute:
- Report bugs via the Issues section on GitHub.
- Propose improvements or new features.
- Submit your pull requests.

## 📄 License

This extension is distributed under the GNU Affero General Public License v3.0 (AGPL-3.0). See the LICENSE file for more details.

## 💝 Support

If you appreciate this extension, you can support its development by making a donation via [PayPal](https://paypal.me/jls).

---
Developed by jls42.org with passion and innovation, Babel Fish AI propels transcription and translation to new horizons thanks to state-of-the-art artificial intelligence.

**This document was translated from the fr version into the en language using the o3-mini model. For more information on the translation process, see https://gitlab.com/jls42/ai-powered-markdown-translator**

