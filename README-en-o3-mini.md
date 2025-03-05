# Babel Fish AI - Voice Transcription and Translation Extension with AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**To use the extension, you will need an OpenAI API key (or a third-party provider if you are using LiteLLM Proxy). You can generate an OpenAI API key here: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI is an innovative Chrome extension originally designed to offer powerful voice transcription. Transform your voice into text with remarkable accuracy thanks to OpenAI's Whisper API, and optionally benefit from real-time automatic translation. You can use Babel Fish AI exclusively for transcription or enable on-the-fly translation according to your needs.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Features

- **Advanced Voice Transcription**
  - High-quality audio capture via your device’s microphone.
  - Accurate transcription performed by OpenAI’s Whisper API.
  - Multilingual support for voice recognition and text display, allowing you to transcribe voice inputs in different languages and display the results (transcription and translation, if enabled) in the language of your choice.
  - Automatic insertion of text into the active field or display in a dedicated dialog box.

- **Integrated Automatic Translation (Optional)**
  - Immediate translation of transcriptions into various languages, to be enabled if needed.
  - Use of an advanced AI model to ensure a translation faithful to the original meaning.
  - Freedom to choose between using transcription exclusively or combining transcription with translation.

- **Intuitive and Customizable User Interface**
  - Flexible display mode: active input field or floating dialog window.
  - Configurable status banner with options for colors, opacity, and display duration.
  - Keyboard shortcut (Ctrl+Shift+1 or ⌘+Shift+1 on Mac) to start/stop recording.
  - Custom icon featuring a microphone and the number “42” for immediate recognition.

- **Advanced Options**
    - Expert mode for detailed configurations (API URLs, domain-specific configuration, etc.).
    - Ability to customize transcription and translation models.
    - Compatibility with LiteLLM Proxy to connect to alternative language models and disable request logging.
    - Complete internationalization management through language files (_locales), offering an interface and voice support in multiple languages.

## 🌐 Supported Languages

Here is the list of languages supported by Babel Fish AI, with links to demonstration videos:

- [Arabic](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [German](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [English](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [Spanish](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [French](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [Italian](https://www.youtube.com/watch?v=QgYZt8myods)
- [Japanese](https://www.youtube.com/watch?v=noHEJCnocH8)
- [Korean](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [Dutch](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Polish](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Portuguese](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Romanian](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Swedish](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Chinese](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installation

1.  **Download and Installation:**
    - Clone this repository from GitHub or manually download the extension folder.
    - **Or install the extension directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Open Chrome and go to `chrome://extensions/`.
    - Enable “Developer Mode” at the top right.
    - Click on “Load unpacked” and select the Babel Fish AI folder.

2.  **Verification:**
    - Ensure that the extension appears in the Chrome toolbar with the custom icon.

## ⚙️ Configuration

1.  **OpenAI API Key:**
    *   Click on the extension icon to access the options.
    *   Enter your OpenAI API key (available at [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Options Customization:**
    *   Choose the display mode (active field or dialog box).
    *   Configure the color, opacity, and display duration of the status banner.
    *   Select the languages for transcription (voice input) and text display.
    *   Enable or disable the translation feature as needed.

3.  **(Optional) Use with LiteLLM Proxy:**
    *   Activate "Expert Mode" in the options.
    *   In the “Advanced Configuration” section, modify **both URLs** of the APIs (Whisper and Translation) to point to your LiteLLM Proxy instance. **Use the same base URL for both.**
    *   Check the "NoLog (LiteLLM only)" option if you wish to disable request logging by LiteLLM.

## 🚀 Use with LiteLLM Proxy

If you wish to use language models other than OpenAI, you can use LiteLLM Proxy. Here’s how to configure it:

Babel Fish AI is compatible with [LiteLLM Proxy](https://litellm.ai/), which allows you to use alternative language models with an API compatible with OpenAI's.

### Configuration

1.  **Install and configure LiteLLM Proxy:** Follow the instructions on the LiteLLM website.
2.  **Configure the Babel Fish AI extension:**
    *   In the extension options (right-click on the icon > Options), activate "Expert Mode".
    *   In the “Advanced Configuration” section, modify **both URLs** of the APIs (Whisper and Translation) to point to your LiteLLM Proxy instance (for example, `http://localhost:4000/v1/audio/transcriptions` and `http://localhost:4000/v1/chat/completions`). **Use the same base URL for both.**
    *   Check the "NoLog (LiteLLM only)" option if you wish to disable request logging by LiteLLM.

**Important:** The "NoLog" option is designed **exclusively** for use with LiteLLM Proxy. **Do not enable it** if you are using the official OpenAI API, as this will result in an error and prevent translation from working.

## 🛠️ Technical Functionality

### Extension Architecture

The extension is composed of several JavaScript files that interact with each other:

*   **`manifest.json`:** The main configuration file for the extension. It defines permissions, scripts, accessible resources, etc. It uses Manifest version 3 and declares the permissions `activeTab`, `storage`, `commands`, and `scripting`. The `content_scripts` are injected into all URLs and run at the end of the document loading.
*   **`background.js`:** The service worker that runs in the background. It handles events (click on the icon, keyboard shortcuts), injects the `content script` if needed, and communicates with the `content script`.
*   **`content.js`:** The script that is injected into web pages. It directly interacts with the DOM, captures microphone audio, calls the transcription and translation APIs, and displays the results.
*   **`src/utils/api.js`:** Contains the function `transcribeAudio` to call OpenAI’s Whisper API (transcription).
*   **`src/utils/translation.js`:** Contains the function `translateText` to call OpenAI’s GPT API (translation).
*   **`src/utils/ui.js`:** Contains utility functions to manage the user interface (banner, dialog box, copy button).
*   **`src/constants.js`:** Defines constants for configuration, statuses, actions, etc.
*   **`src/pages/options/`:** Contains the files for the extension’s options page (HTML, CSS, JavaScript).

### Transcription and Translation Process

1.  **Starting the Recording:** The user starts the recording by clicking on the extension icon or using the keyboard shortcut. The `background script` sends a message to the `content script` to start recording.
2.  **Audio Capture:** The `content script` uses the `navigator.mediaDevices.getUserMedia` API to access the microphone and record audio.
3.  **Transcription:** The `content script` uses the `transcribeAudio` function (`src/utils/api.js`) to send the audio to OpenAI’s Whisper API. The API returns the transcribed text.
4.  **Translation (Optional):** If the translation option is enabled, the `content script` uses the `translateText` function (`src/utils/translation.js`) to send the transcribed text to OpenAI’s GPT API. The API returns the translated text.
5.  **Display:** The `content script` displays the transcribed text (and optionally translated) either in the active element on the page (if it is a text field or an editable element) or in a dialog box.

### Communication

Communication between the `background script` and the `content script` is done via Chrome's messaging API (`chrome.runtime.sendMessage` and `chrome.runtime.onMessage`).

### Data Storage

The extension uses `chrome.storage.sync` to store:

*   The OpenAI API key (`apiKey`).
*   The extension options (display, translation, status banner colors, etc.).

This data is stored locally on your computer, in the Chrome extension storage.

### Error Handling
Possible errors (missing API key, transcription error, etc.) are defined in the `constants.js` file. The functions in `api.js` and `translation.js` handle potential API call errors. The `content.js` displays error messages to the user via a banner at the top of the page.

## 🛡️ Security and Privacy

- **Data Protection:**
  - The API key is securely stored within Chrome.
  - The extension does not retain your audio data; all processing is done in real time.
  - Communication with the APIs is carried out via secure HTTPS connections.

For complete information on how BabelFishAI handles your data, please consult our [Privacy Policy](PRIVACY.md).

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
- Propose improvements or new features.
- Submit your pull requests.

## 📄 License

This extension is distributed under the GNU Affero General Public License v3.0 (AGPL-3.0). See the LICENSE file for more details.

## 💝 Support

If you enjoy this extension, you can support its development by making a donation via [PayPal](https://paypal.me/jls).
---
Developed by jls42.org with passion and innovation, Babel Fish AI propels transcription and translation to new horizons with cutting-edge artificial intelligence.

**This document was translated from the fr version to the en language using the o3-mini model. For more information on the translation process, see https://gitlab.com/jls42/ai-powered-markdown-translator**

