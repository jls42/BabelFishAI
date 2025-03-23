# Babel Fish AI - Voice Transcription and Translation Extension with AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**To use the extension, you will need an OpenAI API key (or a third-party provider if you are using LiteLLM Proxy). You can generate an OpenAI API key here: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI is an innovative Chrome extension originally designed to provide powerful voice transcription. Transform your speech into text with remarkable accuracy thanks to OpenAI's Whisper API, and optionally enjoy real-time automatic translation. You can use Babel Fish AI exclusively for transcription or enable on-the-fly translation according to your needs.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Features

- **Advanced Voice Transcription**
  - Captures high-quality audio via your device's microphone.
  - Accurate transcription performed by OpenAI's Whisper API.
  - Multilingual support for voice recognition and text display, allowing voice inputs in different languages and displaying results (transcription and translation, if enabled) in the language of your choice.
  - Automatic insertion of text into the active field or display in a dedicated dialog box.

- **Intelligent Translation and Rephrasing**
  - Immediate translation of transcriptions into various languages, to be activated if needed.
  - Rephrasing of text to improve its style and clarity.
  - Use of an advanced AI model to ensure a translation faithful to the original meaning.
  - Free choice to use transcription exclusively or combine transcription and translation.

- **Powerful Context Menu**
  - "Rephrase selection" option to instantly enhance your selected texts.
  - "Translate selection" option with a submenu of all available languages.
  - Direct replacement of the selected text with its translated or rephrased version.
  - Seamless integration into Chrome's native user interface.

- **Intuitive and Customizable User Interface**
  - Flexible display mode: active input area or floating dialog window.
  - Configurable status banner with choices for colors, opacity, and display duration.
  - Keyboard shortcut (Ctrl+Shift+1 or ⌘+Shift+1 on Mac) to start/stop recording.
  - "Keep open" option to control how long the results are displayed.
  - Custom icon, featuring a microphone and the number "42", for immediate recognition.

- **Advanced Options**
    - Expert mode for detailed configurations (API URLs, domain configuration, etc.).
    - Possibility to customize transcription and translation models.
    - Compatibility with LiteLLM Proxy to connect to alternative language models and disable request logging.
    - Complete internationalization management thanks to language files (_locales), offering an interface and voice support in multiple languages.

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
    - **Or directly install the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode" in the top right.
    - Click "Load unpacked" and select the Babel Fish AI folder.

2.  **Verification:**
    - Make sure the extension appears in Chrome's toolbar with the custom icon.

## ⚙️ Configuration

1.  **OpenAI API Key:**
    *   Click the extension icon to access the options.
    *   Enter your OpenAI API key (available at [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Customize Options:**
    *   Choose the display mode (active area or dialog box).
    *   Configure the color, opacity, and display duration of the status banner.
    *   Select the languages for transcription (voice input) and for the text display.
    *   Enable or disable the translation functionality according to your needs.

3.  **(Optional) Use with LiteLLM Proxy:**
    *   Enable "Expert Mode" in the options.
    *   In the "Advanced Configuration" section, modify **both API URLs** (Whisper and Translation) to point to your LiteLLM Proxy instance. **Use the same base URL for both.**
    *   Check the "NoLog (LiteLLM only)" option if you wish to disable request logging by LiteLLM.

## 🚀 Use with LiteLLM Proxy

If you wish to use language models other than OpenAI, you can use LiteLLM Proxy. Here is how to configure it:

Babel Fish AI is compatible with [LiteLLM Proxy](https://litellm.ai/), which allows the use of alternative language models with an API compatible with that of OpenAI.

### Configuration

1.  **Install and set up LiteLLM Proxy:** Follow the instructions on the LiteLLM website.
2.  **Configure the Babel Fish AI extension:**
    *   In the extension options (right-click the icon > Options), enable "Expert Mode".
    *   In the "Advanced Configuration" section, modify **both API URLs** (Whisper and Translation) to point to your LiteLLM Proxy instance (for example, `http://localhost:4000/v1/audio/transcriptions` and `http://localhost:4000/v1/chat/completions`). **Use the same base URL for both.**
    *   Check the "NoLog (LiteLLM only)" option if you wish to disable request logging by LiteLLM.

**Important:** The "NoLog" option is designed **exclusively** for use with LiteLLM Proxy. **Do not activate it** if you are using the official OpenAI API, as this will cause an error and prevent translation from working.

## 🛠️ Technical Functionality

### Extension Architecture

The extension is composed of several JavaScript files that interact with each other:

#### Main Files

*   **`manifest.json`:** The main configuration file of the extension. It defines permissions, scripts, accessible resources, etc. It uses Manifest Version 3 and declares permissions `activeTab`, `storage`, `commands`, `scripting`, and `contextMenus`.
*   **`background.js`:** The service worker that runs in the background. It handles events (clicking the icon, keyboard shortcuts, context menu), injects the `content script` if needed, and communicates with the `content script`.
*   **`content.js`:** The main script that is injected into web pages. It coordinates various utility modules and manages the overall flow of the extension.
*   **`src/constants.js`:** Defines constants for configuration, states, actions, etc.

#### Utility Modules

The extension uses a modular architecture with several specialized utility files:

##### API Management and Data Processing

*   **`src/utils/api.js`:** Contains functions to interact with the APIs, notably `transcribeAudio` to call OpenAI's Whisper API.
*   **`src/utils/api-utils.js`:** Advanced functions for interacting with external APIs.
*   **`src/utils/translation.js`:** Contains the functions `translateText` and `rephraseText` to call OpenAI's GPT API.
*   **`src/utils/text-translation.js`:** Specialized functions for text translation and rephrasing.
*   **`src/utils/text-processing.js`:** General text processing functions.

##### User Interface and Interaction

*   **`src/utils/ui.js`:** General utility functions for the user interface.
*   **`src/utils/banner-utils.js`:** Manages the status banner, its controls, and the language selector.
*   **`src/utils/focus-utils.js`:** Manages saving and restoring focus and text selection.
*   **`src/utils/transcription-display.js`:** Manages the display of transcription results.
*   **`src/utils/error-utils.js`:** Handles the display and processing of errors.
*   **`src/styles/content.css`:** CSS styles for the user interface injected into web pages.

##### Recording and Events

*   **`src/utils/recording-utils.js`:** Manages audio recording via the microphone and the processing of audio data.
*   **`src/utils/event-handlers.js`:** Contains event handlers for user interactions.

##### Internationalization and Languages

*   **`src/utils/languages.js`:** Defines the languages supported by the extension.
*   **`src/utils/languages-shared.js`:** Defines the list of supported languages for the web page context.
*   **`src/utils/languages-data.js`:** Defines the list of supported languages for the service worker.
*   **`src/utils/i18n.js`:** Manages internationalization for the user interface.

##### Options Page

*   **`src/pages/options/`:** Contains the files for the extension's options page (HTML, CSS, JavaScript).

### Transcription and Translation Process

#### Main Voice Transcription Feature

1.  **Start Recording:** The user starts recording by clicking the extension icon or using the keyboard shortcut (Ctrl+Shift+1 or ⌘+Shift+1 on Mac). The `background script` sends a message to the `content script` to start recording.
2.  **Audio Capture:** The `content script` uses the `navigator.mediaDevices.getUserMedia` API to access the microphone and record audio via the MediaRecorder API.
3.  **Transcription:** The `content script` uses the `transcribeAudio` function (`src/utils/api.js`) to send the audio to OpenAI's Whisper API. The API returns the transcribed text.
4.  **Translation or Rephrasing (Optional):**
   - If the translation option is enabled, the `content script` uses the `translateText` function (`src/utils/translation.js`) to send the transcribed text to OpenAI's GPT API.
   - If the rephrasing option is enabled, the `rephraseText` function is used to improve the transcribed text.
5.  **Display:** The `content script` displays the processed text either in the active element of the page (if it is a text field or editable element) or in a custom dialog box.

#### Context Menu Feature

1. **Text Selection:** The user selects text on a web page.
2. **Context Menu:** A right-click displays the options "Rephrase selection" or "Translate selection" with a submenu of available languages.
3. **Processing:** Depending on the chosen option:
   - The text is sent for rephrasing via the `rephraseText` function.
   - The text is sent for translation via the `translateText` function with the selected target language.
4. **Display:** The result replaces the original selection in the element where the selected text is located.

### Communication

Communication between the `background script` and the `content script` is done via Chrome's messaging API (`chrome.runtime.sendMessage` and `chrome.runtime.onMessage`).

### Data Storage

The extension uses `chrome.storage.sync` to store:

*   The OpenAI API key (`apiKey`).
*   The extension options (display, translation, banner colors, etc.).
*   The language preferences for translation.

This data is stored locally on your computer, in the Chrome extension storage.

### Error Handling
Possible errors (missing API key, transcription error, etc.) are defined in the `constants.js` file. The `api.js` and `translation.js` functions handle potential errors from the API calls. The `content.js` displays error messages to the user via a banner at the top of the page.

## 🛡️ Security and Privacy

- **Data Protection:**
  - The API key is securely stored in Chrome.
  - The extension does not store your audio data; all processing is done in real time.
  - Communication with the APIs is done via secure HTTPS connections.

For complete information on how BabelFishAI handles your data, please refer to our [Privacy Policy](PRIVACY.md).

## 🔧 Troubleshooting

- **Microphone Issues:**
  - Check microphone access permissions in Chrome.
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

If you appreciate this extension, you can support its development by making a donation via [PayPal](https://paypal.me/jls).
---
Developed by jls42.org with passion and innovation, Babel Fish AI propels transcription and translation to new horizons thanks to state-of-the-art artificial intelligence.

**This document was translated from the fr version to the en language using the o3-mini model. For more information on the translation process, please see https://gitlab.com/jls42/ai-powered-markdown-translator**

