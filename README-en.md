# Babel Fish AI - Voice Transcription and Translation Extension with AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Official website: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

**To use the extension, you will need an API key from one of the supported providers:**

| Provider | Get an API Key |
|:--------:|:---------------|
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) |
| <img src="images/openai-logo.png" alt="OpenAI" height="30"> | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
| 🚅 | **Custom/LiteLLM**: To use your own API endpoints |

Babel Fish AI is an innovative browser extension designed to offer powerful voice transcription with multi-provider support. Transform your voice into text with remarkable accuracy using Mistral AI (Voxtral) or OpenAI (Whisper) transcription APIs, and optionally benefit from real-time automatic translation. You can use Babel Fish AI exclusively for transcription or enable on-the-fly translation as needed.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Features

- **Advanced Voice Transcription**
  - High-quality audio capture via your device's microphone.
  - Accurate transcription via Voxtral (Mistral AI) or Whisper (OpenAI) APIs.
  - Multi-provider support: choose freely between Mistral AI, OpenAI, or a custom endpoint.
  - Multilingual support for voice recognition and text display, allowing you to transcribe voice inputs in different languages and display results (transcription and translation, if enabled) in your chosen language.
  - Automatic insertion of text into the active field or display in a dedicated dialog box.

- **Intelligent Translation and Rephrasing**
  - Immediate translation of transcriptions into various languages, enabled as needed.
  - Text rephrasing to improve style and clarity.
  - Use of an advanced AI model to ensure translation faithful to the original meaning.
  - Free choice to use transcription exclusively or combine transcription and translation.

- **Powerful Context Menu**
  - "Rephrase selection" option to instantly improve your selected texts.
  - "Translate selection" option with a submenu of all available languages.
  - "Correct spelling" option to correct spelling, grammar, and punctuation errors.
  - Direct replacement of selected text with its translated, rephrased, or corrected version.
  - Seamless integration into the native browser user interface.

- **Intuitive and Customizable User Interface**
  - Flexible display mode: active input area or floating dialog window.
  - Configurable status banner with choice of colors, opacity, and display duration.
  - Keyboard shortcut (Ctrl+Shift+1 or ⌘+Shift+1 on Mac) to start/stop recording.
  - "Keep open" option to control the display duration of results.
  - Custom icon, integrating a microphone and the number "42", for immediate recognition.

- **Advanced Options**
    - Multi-provider support: Mistral AI, OpenAI, and Custom/LiteLLM for maximum flexibility.
    - Ability to customize transcription and translation models per provider.
    - Independent provider selection for transcription and translation/rephrasing.
    - Compatibility with LiteLLM Proxy via the Custom provider to connect to alternative models.
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

### Chrome

1.  **Download and Installation:**
    - Clone this repository from GitHub or manually download the extension folder.
    - **Or install the extension directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode" in the top right.
    - Click "Load unpacked" and select the Babel Fish AI folder.

2.  **Verification:**
    - Ensure the extension appears in the browser toolbar with the custom icon.

### Firefox

1.  **Download and Installation:**
    - **Install the extension directly from [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    - Or for manual installation: clone this repository from GitHub.
    - Open Firefox and go to `about:debugging#/runtime/this-firefox`.
    - Click "Load Temporary Add-on...".
    - Select the `manifest.firefox.json` file at the project root.

2.  **Verification:**
    - Ensure the extension appears in the Firefox toolbar with the custom icon.

## ⚙️ Configuration

1.  **AI Provider Configuration:**
    *   Click the extension icon to access options.
    *   Select your provider from the dropdown menu (Mistral AI, OpenAI, or Custom/LiteLLM).
    *   Enter your API key:
        - **Mistral AI**: available at [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        - **OpenAI**: available at [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    *   Activate the provider with the toggle next to the dropdown menu.

2.  **Options Customization:**
    *   Choose the display mode (active area or dialog box).
    *   Configure the color, opacity, and display duration of the status banner.
    *   Select languages for transcription (voice input) and text display.
    *   Enable or disable the translation feature as needed.

3.  **(Optional) Advanced Model Configuration:**
    *   In the options of each provider, click "Model Configuration" to customize the models used.
    *   You can add custom models for transcription and translation/rephrasing.
    *   If multiple providers are enabled, you can choose which one to use for each service (transcription and translation).

## 🚀 Usage with LiteLLM Proxy or Custom Endpoints

Babel Fish AI is compatible with [LiteLLM Proxy](https://litellm.ai/) and other OpenAI-compatible API proxies, allowing the use of alternative language models.

### Configuration

1.  **Install and configure your proxy:** Follow the instructions for the service you are using (LiteLLM, etc.).
2.  **Configure the Babel Fish AI extension:**
    *   In the extension options, select the **Custom/LiteLLM** provider from the dropdown menu.
    *   Enter your API key (if necessary).
    *   Configure the API URLs:
        - **Transcription URL**: e.g., `http://localhost:4000/v1/audio/transcriptions`
        - **Chat URL**: e.g., `http://localhost:4000/v1/chat/completions`
    *   Activate the provider with the toggle.
    *   Check the **"NoLog"** option if you wish to disable request logging by LiteLLM.

**Important:** The "NoLog" option is available **only** in the Custom/LiteLLM provider. It is not compatible with official OpenAI or Mistral AI APIs.

## 🛠️ Technical Operation

### Extension Architecture

The extension is composed of several JavaScript files that interact with each other:

#### Main Files

*   **`manifest.json`:** The main configuration file of the extension. It defines permissions, scripts, accessible resources, etc. It uses Manifest V3 and declares permissions `activeTab`, `storage`, `commands`, `scripting`, and `contextMenus`.
*   **`background.js`:** The service worker that runs in the background. It handles events (icon clicks, keyboard shortcuts, context menu), injects the `content script` if necessary, and communicates with the `content script`.
*   **`content.js`:** The main script injected into web pages. It coordinates the various utility modules and manages the global flow of the extension.
*   **`src/constants.js`:** Defines constants for configuration, states, actions, etc.

#### Utility Modules

The extension uses a modular architecture with several specialized utility files:

##### Provider and API Management

*   **`src/utils/providers.js`:** Registry of AI providers (Mistral AI, OpenAI, Custom/LiteLLM) with their configurations, models, and default URLs.
*   **`src/utils/api-utils.js`:** Functions for interaction with external APIs, resolution of multi-provider configuration, and audio transcription.
*   **`src/utils/text-processing.js`:** Text processing functions: translation, rephrasing, spelling correction.

##### User Interface and Interaction

*   **`src/utils/ui.js`:** General utility functions for the user interface.
*   **`src/utils/banner-utils.js`:** Manages the status banner, its controls, and the language selector.
*   **`src/utils/focus-utils.js`:** Manages saving and restoring focus and text selection.
*   **`src/utils/transcription-display.js`:** Manages the display of transcription results.
*   **`src/utils/error-utils.js`:** Manages error display and handling.
*   **`src/styles/content.css`:** CSS styles for the user interface injected into web pages.

##### Recording and Events

*   **`src/utils/recording-utils.js`:** Manages audio recording via microphone and audio data processing.
*   **`src/utils/event-handlers.js`:** Contains event handlers for user interactions.

##### Internationalization and Languages

*   **`src/utils/languages.js`:** Defines languages supported by the extension.
*   **`src/utils/languages-shared.js`:** Defines the list of supported languages for the web page context.
*   **`src/utils/languages-data.js`:** Defines the list of supported languages for the service worker.
*   **`src/utils/i18n.js`:** Manages internationalization for the user interface.

##### Options Page

*   **`src/pages/options/`:** Contains files for the extension's options page (HTML, CSS, JavaScript).

### Transcription and Translation Process

#### Main Voice Transcription Feature

1.  **Starting Recording:** The user starts recording by clicking the extension icon or using the keyboard shortcut (Ctrl+Shift+1 or ⌘+Shift+1 on Mac). The `background script` sends a message to the `content script` to start recording.
2.  **Audio Capture:** The `content script` uses the `navigator.mediaDevices.getUserMedia` API to access the microphone and record audio via the MediaRecorder API.
3.  **Transcription:** The `content script` uses the `transcribeAudio` function (`src/utils/api-utils.js`) to send audio to the configured provider's transcription API (Voxtral for Mistral AI, Whisper for OpenAI). The API returns the transcribed text.
4.  **Translation or Rephrasing (Optional):**
   - If the translation option is enabled, the `content script` uses the `translateText` function (`src/utils/text-processing.js`) to send the transcribed text to the configured provider's chat API.
   - If the rephrasing option is enabled, the `rephraseText` function is used to improve the transcribed text.
5.  **Display:** The `content script` displays the processed text either in the active element of the page (if it is a text field or editable element) or in a custom dialog box.

#### Context Menu Feature

1. **Text Selection:** The user selects text on a web page.
2. **Context Menu:** A right-click displays options:
   - "Rephrase selection" to improve style and clarity
   - "Translate selection" with a submenu of available languages
   - "Correct spelling" to correct mistakes
3. **Processing:** Depending on the chosen option:
   - Text is sent for rephrasing via the `rephraseText` function
   - Text is sent for translation via the `translateText` function with the selected target language
   - Text is sent for correction via the `correctText` function
4. **Display:** The result replaces the original selection in the element where the selected text is located.

### Communication

Communication between the `background script` and the `content script` is done via the Chrome Messaging API (`chrome.runtime.sendMessage` and `chrome.runtime.onMessage`).

### Data Storage

The extension uses `chrome.storage.sync` to store:

*   AI provider configuration (API keys, selected models, custom URLs).
*   Extension options (display, translation, banner colors, etc.).
*   Language preferences for translation.

These data are stored locally on your computer, in the browser extension storage.

### Error Handling
Possible errors (missing API key, transcription error, etc.) are defined in the `constants.js` file. The `api-utils.js` and `text-processing.js` functions handle potential API call errors with improved messages based on the HTTP code. The `content.js` displays error messages to the user via a banner at the bottom of the page.


## 🛡️ Security and Privacy

- **Data Protection:**
  - The API key is securely stored in the browser.
  - The extension does not keep your audio data; all processing is done in real-time.
  - Communication with APIs is done via secure HTTPS connections.

For complete information on how BabelFishAI handles your data, please consult our [Privacy Policy](PRIVACY.md).

## 🔧 Troubleshooting

- **Microphone Issues:**
  - Check microphone access permissions in your browser.
  - Ensure no other application is using the microphone simultaneously.

- **Transcription/Translation Errors:**
  - Check that the API key is valid and active.
  - Ensure you have a stable internet connection.
  - Consult the browser console for detailed logs in case of errors.

## 🤝 Contribution

Contributions and suggestions are welcome. To contribute:
- Report bugs via the Issues section on GitHub.
- Propose improvements or new features.
- Submit your pull requests.

## 📄 License

This extension is distributed under the GNU Affero General Public License v3.0 (AGPL-3.0). Consult the LICENSE file for more details.

## 💝 Support

If you appreciate this extension, you can support its development by making a donation via [PayPal](https://paypal.me/jls).
---
Developed by jls42.org with passion and innovation, Babel Fish AI propels transcription and translation to new horizons thanks to cutting-edge artificial intelligence.
