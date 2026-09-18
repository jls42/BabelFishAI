**使用 gpt-5.6-sol 将文章从法语翻译成中文。**

# Babel Fish AI - AI 语音转写与翻译扩展

<img src="images/icon128.png" alt="Babel Fish AI 图标" width="128" height="128">

**官方网站：[babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 阿拉伯语](README-ar.md) | [🇩🇪 德语](README-de.md) | [🇺🇸 英语](README-en.md) | [🇪🇸 西班牙语](README-es.md) | [🇮🇳 印地语](README-hi.md) | [🇮🇹 意大利语](README-it.md) | [🇯🇵 日语](README-ja.md) | [🇰🇷 韩语](README-ko.md) | [🇳🇱 荷兰语](README-nl.md) | [🇵🇱 波兰语](README-pl.md) | [🇵🇹 葡萄牙语](README-pt.md) | [🇷🇴 罗马尼亚语](README-ro.md) | [🇸🇪 瑞典语](README-sv.md) | [🇨🇳 中文](README-zh.md)

**要使用此扩展，您需要以下受支持 provider 之一的 API 密钥：**

|                             Provider                             | 获取 API 密钥                                                                               |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**：[console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**：[platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
|                                🚅                                | **Custom/LiteLLM**：用于使用您自己的 API endpoint                                      |

Babel Fish AI 是一款创新的浏览器扩展，旨在提供支持多个 provider 的强大语音转写功能。借助 Mistral AI（Voxtral）或 OpenAI（Whisper）的转写 API，以卓越的准确度将您的语音转换为文本，并可选择使用实时自动翻译功能。您既可以仅使用 Babel Fish AI 进行转写，也可以根据需要启用即时翻译。

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy 徽章](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![质量门禁状态](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![安全评级](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![可维护性评级](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![漏洞](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![代码异味](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![技术债务](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![代码行数](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 功能

-   **高级语音转写**

    -   通过设备麦克风采集高质量音频。
    -   通过 Voxtral（Mistral AI）或 Whisper（OpenAI）API 进行精准转写。
    -   支持多个 provider：可自由选择 Mistral AI、OpenAI 或自定义 endpoint。
    -   支持多语言语音识别和文本显示，可转写不同语言的语音输入，并以您选择的语言显示结果（转写以及启用后的翻译）。
    -   自动将文本插入当前活动字段，或显示在专用对话框中。

-   **智能翻译与改写**

    -   可按需启用，将转写内容即时翻译成多种语言。
    -   改写文本以改善其风格和清晰度。
    -   使用先进的 AI 模型，确保翻译忠实于原意。
    -   可自由选择仅使用转写，或将转写与翻译结合使用。

-   **强大的上下文菜单**

    -   “改写所选内容”选项可即时优化选中的文本。
    -   “翻译所选内容”选项包含所有可用语言的子菜单。
    -   “纠正拼写”选项可纠正拼写、语法和标点错误。
    -   直接用翻译、改写或纠正后的版本替换所选文本。
    -   与浏览器原生用户界面完美集成。

-   **直观且可自定义的用户界面**

    -   灵活的显示模式：活动输入区域或浮动对话框。
    -   可配置状态横幅的颜色、不透明度和显示时长。
    -   使用键盘快捷键（Ctrl+Shift+1，Mac 上为 ⌘+Shift+1）开始或停止录音。
    -   在 Firefox 中，针对页面编辑器会拦截该组合键的网站（ChatGPT、Notion 等）提供“优先快捷键”：安装后即启用，可在选项中禁用（参见 [PRIVACY.md](PRIVACY.md)）。
    -   “保持打开”选项可控制结果的显示时长。
    -   自定义图标结合了麦克风和数字“42”，便于快速识别。

-   **高级选项**
    -   支持多个 provider：Mistral AI、OpenAI 和 Custom/LiteLLM，提供最大的灵活性。
    -   可按 provider 自定义转写和翻译模型。
    -   可用的 OpenAI 模型：GPT-4o mini（默认）、GPT-4.1（mini/standard）、**GPT-5.4（nano/mini/standard）**和 **GPT-5.6（luna/terra/sol）**。转写模型：whisper-1（默认）、gpt-4o-mini-transcribe、gpt-4o-transcribe 和 **gpt-transcribe**。
    -   可用的 Mistral 模型：Mistral Small（默认）、Mistral Medium、Mistral Large、Codestral 和 **Ministral 3（3B/8B/14B）**。转写模型：Voxtral Mini。支持 Mistral 推理模型的响应（思考块）。
    -   更新时，使用 gpt-4.1-nano（OpenAI API 将于 2026 年 10 月 23 日停止提供）或 gpt-4o 的设置将自动切换到 gpt-5.6-luna 和 gpt-4.1。
    -   可分别为转写与翻译/改写选择不同的 provider。
    -   可通过 Custom provider 兼容 LiteLLM Proxy，从而连接其他模型。
    -   通过语言文件（\_locales）实现完整的国际化管理，提供多语言界面和语音支持。

## 🌐 支持的语言

以下是 Babel Fish AI 支持的语言列表，并附有演示视频链接：

-   [阿拉伯语](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [德语](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [英语](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [西班牙语](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [法语](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [印地语](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [意大利语](https://www.youtube.com/watch?v=QgYZt8myods)
-   [日语](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [韩语](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [荷兰语](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [波兰语](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [葡萄牙语](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [罗马尼亚语](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [瑞典语](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [中文](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 安装

### Chrome

1.  **下载与安装：**

    -   从 GitHub 克隆此仓库，或手动下载扩展文件夹。
    -   **也可以直接从 [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk) 安装扩展**
    -   打开 Chrome 并访问 `chrome://extensions/`。
    -   启用右上角的“开发者模式”。
    -   点击“加载已解压的扩展程序”，然后选择 Babel Fish AI 文件夹。

2.  **验证：**
    -   确保扩展及其自定义图标显示在浏览器工具栏中。

### Firefox

1.  **下载与安装：**

    -   **直接从 [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/) 安装扩展**
    -   或进行手动安装：从 GitHub 克隆此仓库，然后运行 `./scripts/build.sh firefox`，该命令会准备 `dist/firefox/`，并将 Firefox manifest 重命名为 `manifest.json`。
    -   打开 Firefox 并访问 `about:debugging#/runtime/this-firefox`（请勿使用 `about:addons` 中的“从文件安装附加组件”，该功能仅适用于已签名的扩展）。
    -   点击“临时载入附加组件……”。
    -   选择文件 `dist/firefox/manifest.json`。

2.  **验证：**
    -   确保扩展及其自定义图标显示在 Firefox 工具栏中。

## ⚙️ 配置

1.  **配置 AI Provider：**

    -   点击扩展图标以访问选项。
    -   从下拉菜单中选择您的 provider（Mistral AI、OpenAI 或 Custom/LiteLLM）。
    -   输入您的 API 密钥：
        -   **Mistral AI**：可在 [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) 获取
        -   **OpenAI**：可在 [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) 获取
    -   使用下拉菜单旁的开关启用该 provider。

2.  **自定义选项：**

    -   选择显示模式（活动区域或对话框）。
    -   配置状态横幅的颜色、不透明度和显示时长。
    -   选择转写（语音输入）和文本显示所使用的语言。
    -   根据需要启用或禁用翻译功能。

3.  **（可选）高级模型配置：**
    -   在每个 provider 的选项中，点击“模型配置”以自定义所使用的模型。
    -   您可以添加用于转写和翻译/改写的自定义模型。
    -   如果启用了多个 provider，您可以为每项服务（转写和翻译）选择要使用的 provider。

## 🚀 配合 LiteLLM Proxy 或自定义 Endpoint 使用

Babel Fish AI 兼容 [LiteLLM Proxy](https://litellm.ai/) 及其他兼容 OpenAI 的 API proxy，可用于使用其他语言模型。

### 配置

1.  **安装并配置您的 proxy：** 按照您所使用服务（LiteLLM 等）的说明进行操作。
2.  **配置 Babel Fish AI 扩展：**
    -   在扩展选项中，从下拉菜单选择 **Custom/LiteLLM** provider。
    -   输入您的 API 密钥（如有必要）。
    -   配置 API URL：
        -   **转写 URL**：例如 `http://localhost:4000/v1/audio/transcriptions`
        -   **聊天 URL**：例如 `http://localhost:4000/v1/chat/completions`
    -   使用开关启用该 provider。
    -   如果您希望禁用 LiteLLM 的请求日志记录，请勾选 **“NoLog”** 选项。

**重要提示：**“NoLog”选项**仅**适用于 Custom/LiteLLM provider。它不兼容 OpenAI 或 Mistral AI 的官方 API。

## 🛠️ 技术原理

### 扩展架构

该扩展由多个相互交互的 JavaScript 文件组成：

#### 主要文件

-   **`manifest.json`：**扩展的主要配置文件。它定义权限、脚本、可访问资源等。它使用 manifest v3，并声明 `activeTab`、`storage`、`commands`、`scripting` 和 `contextMenus` 权限。
-   **`background.js`：**在后台运行的 service worker。它负责处理事件（点击图标、键盘快捷键、上下文菜单），在必要时注入 `content script`，并与 `content script` 通信。
-   **`content.js`：**注入网页的主脚本。它协调各个实用模块并管理扩展的整体流程。
-   **`src/constants.js`：**定义配置、状态、操作等所需的常量。

#### 实用模块

该扩展采用模块化架构，包含多个专用实用文件：

##### Provider 与 API 管理

-   **`src/utils/providers.js`：**AI provider（Mistral AI、OpenAI、Custom/LiteLLM）的注册表，包含其配置、模型和默认 URL。
-   **`src/utils/api-utils.js`：**用于与外部 API 交互、解析多 provider 配置和转写音频的函数。
-   **`src/utils/text-processing.js`：**文本处理函数：翻译、改写和拼写纠正。

##### 用户界面与交互

-   **`src/utils/ui.js`：**用户界面的通用实用函数。
-   **`src/utils/banner-utils.js`：**管理状态横幅、其控件和语言选择器。
-   **`src/utils/focus-utils.js`：**管理焦点和文本选择的保存与恢复。
-   **`src/utils/transcription-display.js`：**管理转写结果的显示。
-   **`src/utils/error-utils.js`：**管理错误的显示和处理。
-   **`src/styles/content.css`：**用于注入网页的用户界面 CSS 样式。

##### 录音与事件

-   **`src/utils/recording-utils.js`：**管理通过麦克风录音及音频数据处理。
-   **`src/utils/event-handlers.js`：**包含用于用户交互的事件处理程序。

##### 国际化与语言

-   **`src/utils/languages.js`：**定义扩展支持的语言。
-   **`src/utils/languages-shared.js`：**定义网页上下文支持的语言列表。
-   **`src/utils/languages-data.js`：**定义 service worker 支持的语言列表。
-   **`src/utils/i18n.js`：**管理用户界面的国际化。

##### 选项页面

-   **`src/pages/options/`：**包含扩展选项页面所需的文件（HTML、CSS、JavaScript）。

### 转写与翻译流程

#### 主要语音转写功能

1.  **开始录音：**用户通过点击扩展图标或使用键盘快捷键（Ctrl+Shift+1，Mac 上为 ⌘+Shift+1）开始录音。`background script` 向 `content script` 发送消息以开始录音。
2.  **音频采集：**`content script` 使用 `navigator.mediaDevices.getUserMedia` API 访问麦克风，并通过 MediaRecorder API 录制音频。
3.  **转写：**`content script` 使用 `transcribeAudio` 函数（`src/utils/api-utils.js`）将音频发送到已配置 provider 的转写 API（Mistral AI 使用 Voxtral，OpenAI 使用 Whisper）。API 返回转写后的文本。
4.  **翻译或改写（可选）：**

-   如果启用了翻译选项，`content script` 将使用 `translateText` 函数（`src/utils/text-processing.js`）把转写文本发送到已配置 provider 的聊天 API。
-   如果启用了改写选项，则使用 `rephraseText` 函数优化转写文本。

5.  **显示：**`content script` 将处理后的文本显示在页面的活动元素中（如果该元素是文本字段或可编辑元素），或者显示在自定义对话框中。

#### 上下文菜单功能

1. **选择文本：**用户在网页上选择文本。
2. **上下文菜单：**点击右键会显示以下选项：
    - “改写所选内容”，用于改善风格和清晰度
    - “翻译所选内容”，包含可用语言的子菜单
    - “纠正拼写”，用于纠正错误
3. **处理：**根据所选选项：
    - 通过 `rephraseText` 函数发送文本进行改写
    - 通过 `translateText` 函数发送文本，并翻译为所选目标语言
    - 通过 `correctText` 函数发送文本进行纠正
4. **显示：**结果将替换所选文本所在元素中的原始选区。

### 通信

`background script` 与 `content script` 之间通过 Chrome 消息传递 API（`chrome.runtime.sendMessage` 和 `chrome.runtime.onMessage`）进行通信。

### 数据存储

该扩展使用 `chrome.storage.sync` 存储：

-   AI provider 的配置（API 密钥、所选模型、自定义 URL）。
-   扩展选项（显示、翻译、横幅颜色等）。
-   翻译语言偏好设置。

这些数据存储在您计算机本地的浏览器扩展存储空间中。
### 错误处理

可能出现的错误（API 密钥缺失、转录错误等）定义在文件 `constants.js` 中。函数 `api-utils.js` 和 `text-processing.js` 负责处理 API 调用可能发生的错误，并根据 HTTP 状态码提供更清晰的消息。`content.js` 通过页面底部的横幅向用户显示错误消息。

## 🛡️ 安全与隐私

-   **数据保护：**
    -   API 密钥安全地存储在浏览器中。
    -   此扩展不会保留您的音频数据；所有处理均实时进行。
    -   与 API 的通信通过安全的 HTTPS 连接进行。

有关 BabelFishAI 如何处理您的数据的完整信息，请参阅我们的[隐私政策](PRIVACY.md)。

## 🔧 故障排除

-   **麦克风问题：**

    -   请检查浏览器中的麦克风访问权限。
    -   请确保没有其他应用程序同时使用麦克风。

-   **转录/翻译错误：**
    -   请检查 API 密钥是否有效且处于启用状态。
    -   请确保互联网连接稳定。
    -   如果发生错误，请查看浏览器控制台以获取详细日志。

## 🤝 贡献

欢迎贡献和建议。如需参与贡献：

-   通过 GitHub 的 Issues 区报告错误。
-   提出改进建议或新功能。
-   提交您的 pull request。

## 📄 许可证

此扩展依据 GNU Affero General Public License v3.0（AGPL-3.0）分发。更多详情请参阅 LICENSE 文件。

## 💝 支持

## 如果您喜欢此扩展，可以通过 [PayPal](https://paypal.me/jls) 捐款支持其开发。

由 jls42.org 倾注热情与创新开发，Babel Fish AI 借助前沿人工智能，将转录与翻译推向新的高度。
