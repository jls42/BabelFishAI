**Article translated from fr to en with gpt-5.6-sol.**

# Babel Fish AI - AI-Powered Voice Transcription and Translation Extension

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Official website: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**To use the extension, you will need an API key from one of the supported providers:**

|                             Provider                             | Get an API key                                                                                     |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------- |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)                                               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)                                          |
|                                🚅                                | **Custom/LiteLLM**: To use your own API endpoints                                                   |

Babel Fish AI is an innovative browser extension designed to provide powerful voice transcription with multi-provider support. Turn your voice into text with remarkable accuracy using the Mistral AI (Voxtral) or OpenAI (Whisper) transcription APIs, with optional real-time automatic translation. You can use Babel Fish AI exclusively for transcription or enable on-the-fly translation as needed.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Features

-   **Advanced Voice Transcription**

    -   High-quality audio capture through your device's microphone.
    -   Accurate transcription through the Voxtral (Mistral AI) or Whisper (OpenAI) APIs.
    -   Multi-provider support: freely choose between Mistral AI, OpenAI, or a custom endpoint.
    -   Multilingual support for speech recognition and text display, allowing voice input to be transcribed in different languages and results (transcription and translation, if enabled) to be displayed in the language of your choice.
    -   Automatic insertion of text into the active field or display in a dedicated dialog box.

-   **Intelligent Translation and Rephrasing**

    -   Immediate translation of transcriptions into various languages, enabled as needed.
    -   Text rephrasing to improve its style and clarity.
    -   Use of an advanced AI model to ensure translation faithful to the original meaning.
    -   Freedom to use transcription exclusively or combine transcription and translation.

-   **Powerful Context Menu**

    -   "Rephrase selection" option to instantly improve your selected text.
    -   "Translate selection" option with a submenu containing all available languages.
    -   "Correct spelling" option to correct spelling, grammar, and punctuation errors.
    -   Direct replacement of the selected text with its translated, rephrased, or corrected version.
    -   Seamless integration with the browser's native user interface.

-   **Intuitive and Customizable User Interface**

    -   Flexible display mode: active input area or floating dialog window.
    -   Configurable status banner with options for color, opacity, and display duration.
    -   Keyboard shortcut (Ctrl+Shift+1 or ⌘+Shift+1 on Mac) to start/stop recording.
    -   In Firefox, a "priority shortcut" for sites whose page editor intercepts the key combination (ChatGPT, Notion, etc.): enabled upon installation and configurable from the options (see [PRIVACY.md](PRIVACY.md)).
    -   "Keep open" option to control how long results remain displayed.
    -   Custom icon combining a microphone and the number "42" for instant recognition.

-   **Advanced Options**
    -   Multi-provider support: Mistral AI, OpenAI, and Custom/LiteLLM for maximum flexibility.
    -   Ability to customize transcription and translation models for each provider.
    -   Available OpenAI models: GPT-4o mini (default), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)**, and **GPT-5.6 (luna/terra/sol)**. Transcription: whisper-1 (default), gpt-4o-mini-transcribe, gpt-4o-transcribe, and **gpt-transcribe**.
    -   Available Mistral models: Mistral Small (default), Mistral Medium, Mistral Large, Codestral, and **Ministral 3 (3B/8B/14B)**. Transcription: Voxtral Mini. Responses from reasoning Mistral models (reasoning blocks) are supported.
    -   Settings that used gpt-4.1-nano (OpenAI API shutdown on 10/23/2026) or gpt-4o are automatically migrated to gpt-5.6-luna and gpt-4.1 during the update.
    -   Independent provider selection for transcription and translation/rephrasing.
    -   Compatibility with LiteLLM Proxy through the Custom provider to connect to alternative models.
    -   Comprehensive internationalization management through language files (\_locales), providing a multilingual interface and voice support.

## 🌐 Supported Languages

Here is the list of languages supported by Babel Fish AI, with links to demonstration videos:

-   [Arabic](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [German](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [English](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [Spanish](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [French](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [Italian](https://www.youtube.com/watch?v=QgYZt8myods)
-   [Japanese](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [Korean](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [Dutch](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [Polish](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [Portuguese](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [Romanian](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [Swedish](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [Chinese](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installation

### Chrome

1.  **Download and Installation:**

    -   Clone this repository from GitHub or manually download the extension folder.
    -   **Or install the extension directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   Open Chrome and go to `chrome://extensions/`.
    -   Enable "Developer mode" in the upper-right corner.
    -   Click "Load unpacked" and select the Babel Fish AI folder.

2.  **Verification:**
    -   Make sure the extension appears in the browser toolbar with its custom icon.

### Firefox

1.  **Download and Installation:**

    -   **Install the extension directly from [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   Or, for manual installation: clone this repository from GitHub, then run `./scripts/build.sh firefox`, which prepares `dist/firefox/` with the Firefox manifest renamed to `manifest.json`.
    -   Open Firefox and go to `about:debugging#/runtime/this-firefox` (not "Install Add-on From File" in `about:addons`, which is reserved for signed extensions).
    -   Click "Load Temporary Add-on...".
    -   Select the `dist/firefox/manifest.json` file.

2.  **Verification:**
    -   Make sure the extension appears in the Firefox toolbar with its custom icon.

## ⚙️ Configuration

1.  **AI Provider Configuration:**

    -   Click the extension icon to access the options.
    -   Select your provider from the dropdown menu (Mistral AI, OpenAI, or Custom/LiteLLM).
    -   Enter your API key:
        -   **Mistral AI**: available at [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: available at [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    -   Enable the provider using the toggle next to the dropdown menu.

2.  **Option Customization:**

    -   Choose the display mode (active area or dialog box).
    -   Configure the status banner's color, opacity, and display duration.
    -   Select the languages for transcription (voice input) and text display.
    -   Enable or disable the translation feature as needed.

3.  **(Optional) Advanced Model Configuration:**
    -   In each provider's options, click "Model Configuration" to customize the models used.
    -   You can add custom models for transcription and translation/rephrasing.
    -   If multiple providers are enabled, you can choose which one to use for each service (transcription and translation).

## 🚀 Using LiteLLM Proxy or Custom Endpoints

Babel Fish AI is compatible with [LiteLLM Proxy](https://litellm.ai/) and other OpenAI-compatible API proxies, allowing you to use alternative language models.

### Configuration

1.  **Install and configure your proxy:** Follow the instructions for the service you are using (LiteLLM, etc.).
2.  **Configure the Babel Fish AI extension:**
    -   In the extension options, select the **Custom/LiteLLM** provider from the dropdown menu.
    -   Enter your API key (if required).
    -   Configure the API URLs:
        -   **Transcription URL**: for example, `http://localhost:4000/v1/audio/transcriptions`
        -   **Chat URL**: for example, `http://localhost:4000/v1/chat/completions`
    -   Enable the provider using the toggle.
    -   Check the **"NoLog"** option if you want to disable request logging by LiteLLM.

**Important:** The "NoLog" option is available **only** with the Custom/LiteLLM provider. It is not compatible with the official OpenAI or Mistral AI APIs.

## 🛠️ Technical Operation

### Extension Architecture

The extension consists of several JavaScript files that interact with one another:

#### Main Files

-   **`manifest.json`:** The extension's main configuration file. It defines permissions, scripts, accessible resources, etc. It uses manifest version 3 and declares the `activeTab`, `storage`, `commands`, `scripting`, and `contextMenus` permissions.
-   **`background.js`:** The service worker that runs in the background. It handles events (icon clicks, keyboard shortcuts, context menu), injects `content script` when necessary, and communicates with `content script`.
-   **`content.js`:** The main script injected into web pages. It coordinates the various utility modules and manages the extension's overall flow.
-   **`src/constants.js`:** Defines constants for configuration, states, actions, etc.

#### Utility Modules

The extension uses a modular architecture with several specialized utility files:

##### Provider and API Management

-   **`src/utils/providers.js`:** Registry of AI providers (Mistral AI, OpenAI, Custom/LiteLLM) with their configurations, models, and default URLs.
-   **`src/utils/api-utils.js`:** Functions for interacting with external APIs, resolving multi-provider configuration, and transcribing audio.
-   **`src/utils/text-processing.js`:** Text-processing functions: translation, rephrasing, and spelling correction.

##### User Interface and Interaction

-   **`src/utils/ui.js`:** General-purpose user interface utility functions.
-   **`src/utils/banner-utils.js`:** Manages the status banner, its controls, and the language selector.
-   **`src/utils/focus-utils.js`:** Manages saving and restoring focus and text selection.
-   **`src/utils/transcription-display.js`:** Manages the display of transcription results.
-   **`src/utils/error-utils.js`:** Manages the display and handling of errors.
-   **`src/styles/content.css`:** CSS styles for the user interface injected into web pages.

##### Recording and Events

-   **`src/utils/recording-utils.js`:** Manages audio recording through the microphone and audio data processing.
-   **`src/utils/event-handlers.js`:** Contains event handlers for user interactions.

##### Internationalization and Languages

-   **`src/utils/languages.js`:** Defines the languages supported by the extension.
-   **`src/utils/languages-shared.js`:** Defines the list of languages supported for the web page context.
-   **`src/utils/languages-data.js`:** Defines the list of languages supported for the service worker.
-   **`src/utils/i18n.js`:** Manages internationalization for the user interface.

##### Options Page

-   **`src/pages/options/`:** Contains the files for the extension's options page (HTML, CSS, JavaScript).

### Transcription and Translation Process

#### Main Voice Transcription Feature

1.  **Starting the Recording:** The user starts recording by clicking the extension icon or using the keyboard shortcut (Ctrl+Shift+1 or ⌘+Shift+1 on Mac). `background script` sends a message to `content script` to start recording.
2.  **Audio Capture:** `content script` uses the `navigator.mediaDevices.getUserMedia` API to access the microphone and record audio through the MediaRecorder API.
3.  **Transcription:** `content script` uses the `transcribeAudio` function (`src/utils/api-utils.js`) to send the audio to the configured provider's transcription API (Voxtral for Mistral AI, Whisper for OpenAI). The API returns the transcribed text.
4.  **Translation or Rephrasing (Optional):**

-   If the translation option is enabled, `content script` uses the `translateText` function (`src/utils/text-processing.js`) to send the transcribed text to the configured provider's chat API.
-   If the rephrasing option is enabled, the `rephraseText` function is used to improve the transcribed text.

5.  **Display:** `content script` displays the processed text either in the active page element (if it is a text field or editable element) or in a custom dialog box.

#### Context Menu Feature

1. **Text Selection:** The user selects text on a web page.
2. **Context Menu:** Right-clicking displays the following options:
    - "Rephrase selection" to improve style and clarity
    - "Translate selection" with a submenu of available languages
    - "Correct spelling" to correct errors
3. **Processing:** Depending on the selected option:
    - The text is sent for rephrasing through the `rephraseText` function
    - The text is sent for translation through the `translateText` function with the selected target language
    - The text is sent for correction through the `correctText` function
4. **Display:** The result replaces the original selection in the element containing the selected text.

### Communication

Communication between `background script` and `content script` takes place through Chrome's messaging API (`chrome.runtime.sendMessage` and `chrome.runtime.onMessage`).

### Data Storage

The extension uses `chrome.storage.sync` to store:

-   AI provider configuration (API keys, selected models, custom URLs).
-   Extension options (display, translation, banner colors, etc.).
-   Language preferences for translation.

This data is stored locally on your computer in the browser extension's storage.
### Error Handling

Possible errors (missing API key, transcription error, etc.) are defined in the `constants.js` file. The `api-utils.js` and `text-processing.js` functions handle potential API call errors with improved messages based on the HTTP status code. The `content.js` displays error messages to the user via a banner at the bottom of the page.

## 🛡️ Security and Privacy

-   **Data Protection:**
    -   The API key is stored securely in the browser.
    -   The extension does not retain your audio data; all processing is performed in real time.
    -   Communication with the APIs takes place over secure HTTPS connections.

For complete information about how BabelFishAI handles your data, please see our [Privacy Policy](PRIVACY.md).

## 🔧 Troubleshooting

-   **Microphone Issues:**

    -   Check the microphone access permissions in your browser.
    -   Make sure no other application is using the microphone at the same time.

-   **Transcription/Translation Errors:**
    -   Verify that the API key is valid and active.
    -   Make sure you have a stable internet connection.
    -   Check the browser console for detailed logs if an error occurs.

## 🤝 Contributing

Contributions and suggestions are welcome. To contribute:

-   Report bugs through the Issues section on GitHub.
-   Suggest improvements or new features.
-   Submit your pull requests.

## 📄 License

This extension is distributed under the GNU Affero General Public License v3.0 (AGPL-3.0). See the LICENSE file for more details.

## 💝 Support

## If you enjoy this extension, you can support its development by donating via [PayPal](https://paypal.me/jls).

Developed by jls42.org with passion and innovation, Babel Fish AI takes transcription and translation to new heights through cutting-edge artificial intelligence.
