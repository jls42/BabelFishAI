# Babel Fish AI - 带有 AI 的语音转录和翻译扩展

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**官方网站：[babelfishai.jls42.org](https://babelfishai.jls42.org/)**

**要使用该扩展程序，您需要一个受支持提供商的 API 密钥：**

| 提供商 | 获取 API 密钥 |
|:------:|:--------------|
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**：[console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) |
| <img src="images/openai-logo.png" alt="OpenAI" height="30"> | **OpenAI**：[platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
| 🚅 | **Custom/LiteLLM**：使用您自己的 API 端点 |

Babel Fish AI 是一款创新的 Chrome 扩展程序，旨在提供具有多提供商支持的强大语音转录功能。借助 Mistral AI (Voxtral) 或 OpenAI (Whisper) 的转录 API，以惊人的准确性将您的语音转换为文本，并可选择利用实时自动翻译。您可以根据需要专门将 Babel Fish AI 用于转录或即时激活翻译。

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 功能

- **高级语音转录**
  - 通过您设备的麦克风进行高质量音频捕获。
  - 通过 Voxtral (Mistral AI) 或 Whisper (OpenAI) API 进行准确转录。
  - 多提供商支持：在 Mistral AI、OpenAI 或自定义端点之间自由选择。
  - 语音识别和文本显示的多语言支持，允许您转录不同语言的语音输入，并以您选择的语言显示结果（转录和翻译，如果已启用）。
  - 自动将文本插入活动字段或显示在专用对话框中。

- **智能翻译和改写**
  - 将转录内容即时翻译成各种语言，根据需要激活。
  - 改写文本以改善其风格和清晰度。
  - 使用高级 AI 模型来确保忠实于原始含义的翻译。
  - 自由选择仅使用转录或结合转录和翻译。

- **强大的上下文菜单**
  - “改写所选内容”选项可立即改进您选择的文本。
  - “翻译所选内容”选项，带有所有可用语言的子菜单。
  - “拼写更正”选项可更正拼写、语法和标点符号错误。
  - 用翻译、改写或更正的版本直接替换所选文本。
  - 无缝集成到 Chrome 的原生用户界面中。

- **直观且可自定义的用户界面**
  - 灵活的显示模式：活动输入区域或浮动对话框窗口。
  - 可配置的状态横幅，可选择颜色、不透明度和显示持续时间。
  - 键盘快捷键（Ctrl+Shift+1 或 Mac 上的 ⌘+Shift+1）用于开始/停止录制。
  - “保持打开”选项用于控制结果的显示持续时间。
  - 自定义图标，集成了麦克风和数字“42”，便于立即识别。

- **高级选项**
    - 多提供商支持：Mistral AI、OpenAI 和 Custom/LiteLLM，以此获得最大的灵活性。
    - 能够为每个提供商自定义转录和翻译模型。
    - 独立选择用于转录和翻译/改写的提供商。
    - 通过 Custom 提供商与 LiteLLM Proxy 兼容，以连接到替代模型。
    - 通过语言文件 (_locales) 进行完整的国际化管理，提供多种语言的界面和语音支持。

## 🌐 支持的语言

以下是 Babel Fish AI 支持的语言列表，以及演示视频的链接：

- [阿拉伯语](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [德语](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [英语](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [西班牙语](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [法语](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [印地语](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [意大利语](https://www.youtube.com/watch?v=QgYZt8myods)
- [日语](https://www.youtube.com/watch?v=noHEJCnocH8)
- [韩语](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [荷兰语](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [波兰语](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [葡萄牙语](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [罗马尼亚语](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [瑞典语](https://www.youtube.com/watch?v=HMMzGyW8000)
- [中文](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 安装

### Chrome

1.  **下载和安装：**
    - 从 GitHub 克隆此存储库或手动下载扩展程序文件夹。
    - **或者直接从 [Chrome 网上应用店](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk) 安装扩展程序**
    - 打开 Chrome 并转到 `chrome://extensions/`。
    - 在右上角启用"开发者模式"。
    - 单击"加载已解压的扩展程序"并选择 Babel Fish AI 文件夹。

2.  **验证：**
    - 确保扩展程序以自定义图标出现在 Chrome 工具栏中。

### Firefox

1.  **从商店安装：**
    - 该扩展程序即将在 [Firefox Add-ons](https://addons.mozilla.org/) 上提供。

2.  **临时安装（开发）：**
    - 打开 Firefox 并转到 `about:debugging#/runtime/this-firefox`。
    - 单击"加载临时附加组件..."。
    - 选择项目根目录中的 `manifest.firefox.json` 文件。

## ⚙️ 配置

1.  **AI 提供商配置：**
    *   单击扩展程序图标以访问选项。
    *   从下拉菜单中选择您的提供商（Mistral AI、OpenAI 或 Custom/LiteLLM）。
    *   输入您的 API 密钥：
        - **Mistral AI**：可在 [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) 获取
        - **OpenAI**：可在 [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) 获取
    *   使用下拉菜单旁边的切换开关激活提供商。

2.  **选项自定义：**
    *   选择显示模式（活动区域或对话框）。
    *   配置状态横幅的颜色、不透明度和显示持续时间。
    *   选择用于转录（语音输入）和文本显示的语言。
    *   根据需要启用或禁用翻译功能。

3.  **（可选）高级模型配置：**
    *   在每个提供商的选项中，单击“模型配置”以自定义使用的模型。
    *   您可以添加用于转录和翻译/改写的自定义模型。
    *   如果启用了多个提供商，您可以选择每个服务（转录和翻译）使用哪一个。

## 🚀 与 LiteLLM Proxy 或自定义端点一起使用

Babel Fish AI 与 [LiteLLM Proxy](https://litellm.ai/) 和其他 OpenAI 兼容的 API 代理兼容，允许使用替代语言模型。

### 配置

1.  **安装并配置您的代理：** 按照您正在使用的服务（LiteLLM 等）的说明进行操作。
2.  **配置 Babel Fish AI 扩展程序：**
    *   在扩展程序选项中，从下拉菜单中选择 **Custom/LiteLLM** 提供商。
    *   输入您的 API 密钥（如果需要）。
    *   配置 API URL：
        - **转录 URL**：例如 `http://localhost:4000/v1/audio/transcriptions`
        - **聊天 URL**：例如 `http://localhost:4000/v1/chat/completions`
    *   使用切换开关激活提供商。
    *   如果您希望禁用 LiteLLM 的请求日志记录，请选中 **"NoLog"** 选项。

**重要提示：** “NoLog”选项**仅**在 Custom/LiteLLM 提供商中可用。它与官方 OpenAI 或 Mistral AI API 不兼容。

## 🛠️ 技术操作

### 扩展程序架构

该扩展程序由几个相互交互的 JavaScript 文件组成：

#### 主要文件

*   **`manifest.json`：** 扩展程序的主要配置文件。它定义了权限、脚本、可访问资源等。它使用 Manifest V3 并声明权限 `activeTab`、`storage`、`commands`、`scripting` 和 `contextMenus`。
*   **`background.js`：** 在后台运行的 Service Worker。它处理事件（图标单击、键盘快捷键、上下文菜单），在必要时注入 `content script`，并与 `content script` 通信。
*   **`content.js`：** 注入网页的主脚本。它协调各种实用程序模块并管理扩展程序的全局流程。
*   **`src/constants.js`：** 定义配置、状态、操作等的常量。

#### 实用程序模块

该扩展程序使用具有几个专用实用程序文件的模块化架构：

##### 提供商和 API 管理

*   **`src/utils/providers.js`：** AI 提供商（Mistral AI、OpenAI、Custom/LiteLLM）的注册表及其配置、模型和默认 URL。
*   **`src/utils/api-utils.js`：** 用于与外部 API 交互、多提供商配置解析和语音转录的函数。
*   **`src/utils/text-processing.js`：** 文本处理函数：翻译、改写、拼写更正。

##### 用户界面和交互

*   **`src/utils/ui.js`：** 用户界面的一般实用程序函数。
*   **`src/utils/banner-utils.js`：** 管理状态横幅、其控件和语言选择器。
*   **`src/utils/focus-utils.js`：** 管理焦点和文本选择的保存和恢复。
*   **`src/utils/transcription-display.js`：** 管理转录结果的显示。
*   **`src/utils/error-utils.js`：** 管理错误显示和处理。
*   **`src/styles/content.css`：** 注入网页的用户界面的 CSS 样式。

##### 录制和事件

*   **`src/utils/recording-utils.js`：** 管理通过麦克风进行的音频录制和音频数据处理。
*   **`src/utils/event-handlers.js`：** 包含用户交互的事件处理程序。

##### 国际化和语言

*   **`src/utils/languages.js`：** 定义扩展程序支持的语言。
*   **`src/utils/languages-shared.js`：** 定义网页上下文支持的语言列表。
*   **`src/utils/languages-data.js`：** 定义 Service Worker 支持的语言列表。
*   **`src/utils/i18n.js`：** 管理用户界面的国际化。

##### 选项页面

*   **`src/pages/options/`：** 包含扩展程序选项页面的文件（HTML、CSS、JavaScript）。

### 转录和翻译流程

#### 主要语音转录功能

1.  **开始录制：** 用户通过单击扩展程序图标或使用键盘快捷键（Ctrl+Shift+1 或 Mac 上的 ⌘+Shift+1）开始录制。`background script` 向 `content script` 发送消息以开始录制。
2.  **音频捕获：** `content script` 使用 `navigator.mediaDevices.getUserMedia` API 访问麦克风并通过 MediaRecorder API 录制音频。
3.  **转录：** `content script` 使用 `transcribeAudio` 函数 (`src/utils/api-utils.js`) 将音频发送到配置的提供商的转录 API（Mistral AI 为 Voxtral，OpenAI 为 Whisper）。API 返回转录的文本。
4.  **翻译或改写（可选）：**
   - 如果启用了翻译选项，`content script` 使用 `translateText` 函数 (`src/utils/text-processing.js`) 将转录的文本发送到配置的提供商的聊天 API。
   - 如果启用了改写选项，则使用 `rephraseText` 函数来改进转录的文本。
5.  **显示：** `content script` 在页面的活动元素（如果是文本字段或可编辑元素）或自定义对话框中显示处理后的文本。

#### 上下文菜单功能

1. **文本选择：** 用户在网页上选择文本。
2. **上下文菜单：** 右键单击显示选项：
   - “改写所选内容”以改善风格和清晰度
   - “翻译所选内容”带有可用语言的子菜单
   - “拼写更正”以更正错误
3. **处理：** 根据选择的选项：
   - 文本通过 `rephraseText` 函数发送以进行改写
   - 文本通过 `translateText` 函数与选定的目标语言一起发送以进行翻译
   - 文本通过 `correctText` 函数发送以进行更正
4. **显示：** 结果替换所选文本所在元素中的原始选择。

### 通信

`background script` 和 `content script` 之间的通信是通过 Chrome Messaging API (`chrome.runtime.sendMessage` 和 `chrome.runtime.onMessage`) 完成的。

### 数据存储

该扩展程序使用 `chrome.storage.sync` 来存储：

*   AI 提供商配置（API 密钥、选定模型、自定义 URL）。
*   扩展程序选项（显示、翻译、横幅颜色等）。
*   翻译的语言首选项。

这些数据本地存储在您的计算机上的 Chrome 扩展程序存储中。

### 错误处理
可能的错误（缺少 API 密钥、转录错误等）在 `constants.js` 文件中定义。`api-utils.js` 和 `text-processing.js` 函数根据 HTTP 代码使用改进的消息处理潜在的 API 调用错误。`content.js` 通过页面底部的横幅向用户显示错误消息。


## 🛡️ 安全和隐私

- **数据保护：**
  - API 密钥安全地存储在 Chrome 中。
  - 该扩展程序不保留您的音频数据；所有处理都是实时完成的。
  - 与 API 的通信是通过安全的 HTTPS 连接完成的。

有关 BabelFishAI 如何管理您的数据的完整信息，请参阅我们的 [隐私政策](PRIVACY.md)。

## 🔧 故障排除

- **麦克风问题：**
  - 检查 Chrome 中的麦克风访问权限。
  - 确保没有其他应用程序同时使用麦克风。

- **转录/翻译错误：**
  - 检查 API 密钥是否有效且处于活动状态。
  - 确保您有稳定的互联网连接。
  - 如有错误，请查阅 Chrome 控制台以获取详细日志。

## 🤝 贡献

欢迎贡献和建议。要做出贡献：
- 通过 GitHub 上的 Issues 部分报告错误。
- 提出改进或新功能建议。
- 提交您的 Pull Requests。

## 📄 许可证

此扩展程序根据 GNU Affero General Public License v3.0 (AGPL-3.0) 分发。有关更多详细信息，请参阅 LICENSE 文件。

## 💝 支持

如果您喜欢这个扩展程序，可以通过 [PayPal](https://paypal.me/jls) 捐赠来支持其开发。
---
由 jls42.org 充满激情和创新地开发，Babel Fish AI 凭借尖端的人工智能将转录和翻译推向新的视野。
