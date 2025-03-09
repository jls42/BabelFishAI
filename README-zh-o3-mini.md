# Babel Fish AI - 基于 AI 的语音转录与翻译扩展

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**要使用此扩展，您需要一个 OpenAI API 密钥（如果使用 LiteLLM Proxy 则需要第三方提供商的密钥）。您可以在此处生成 OpenAI API 密钥 : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI 是一个创新的 Chrome 扩展，最初旨在提供强大的语音转录功能。通过 OpenAI 的 Whisper API，您可以将语音精准转换为文本，并可选择实时自动翻译。您可以仅将 Babel Fish AI 用于转录，或根据需要启用即时翻译。

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 功能特点

- **高级语音转录**
  - 通过您设备的麦克风捕获高质量音频。
  - 由 OpenAI 的 Whisper API 精确转录。
  - 支持多语言语音识别和文本显示，可以将语音输入转换为不同语言的文本，并以您选择的语言显示结果（转录和翻译，如果启用）。
  - 自动将文本插入到活动输入框，或在专用对话框中显示。

- **智能翻译和改写**
  - 即时翻译转录内容为多种语言，可根据需要启用。
  - 改写文本以提升风格和清晰度。
  - 使用先进的 AI 模型，确保翻译忠实于原意。
  - 可自由选择仅使用转录或结合转录和翻译。

- **强大的上下文菜单**
  - “改写所选内容”选项，用于即时改善您所选的文本。
  - “翻译所选内容”选项，并带有所有可用语言的子菜单。
  - 直接用翻译或改写后的版本替换所选文本。
  - 完美集成到 Chrome 的本地用户界面中。

- **直观且可定制的用户界面**
  - 灵活的显示模式：活动输入区域或浮动对话框。
  - 可配置的状态条，支持选择颜色、透明度及显示时长。
  - 键盘快捷键（Ctrl+Shift+1 或 Mac 上的 ⌘+Shift+1）用于开始/停止录音。
  - “保持开启”选项，用于控制结果显示的时长。
  - 定制图标，内含麦克风和数字“42”，实现即时识别。

- **高级选项**
    - 专家模式，支持详细配置（API 地址、按域名配置等）。
    - 可自定义转录和翻译模型。
    - 兼容 LiteLLM Proxy，可连接至其他语言模型并禁用请求日志记录。
    - 通过本地文件 (_locales) 实现完整的国际化管理，提供多语言界面和语音支持。

## 🌐 支持的语言

以下是 Babel Fish AI 支持的语言列表，并附有演示视频链接：

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

1.  **下载与安装：**
    - 从 GitHub 克隆此仓库或手动下载扩展文件夹。
    - **或直接从 [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk) 安装扩展**
    - 打开 Chrome 并访问 `chrome://extensions/`。
    - 在右上角启用“开发者模式”。
    - 点击“加载已解压的扩展程序”，并选择 Babel Fish AI 文件夹。

2.  **验证：**
    - 确保扩展图标显示在 Chrome 工具栏上。

## ⚙️ 配置

1.  **OpenAI API 密钥：**
    *   点击扩展图标进入选项。
    *   输入您的 OpenAI API 密钥（可在 [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) 获取）。

2.  **选项定制：**
    *   选择显示模式（活动区域或对话框）。
    *   配置状态条的颜色、透明度及显示时长。
    *   选择用于转录（语音输入）及文本显示的语言。
    *   根据需要启用或禁用翻译功能。

3.  **（可选）与 LiteLLM Proxy 结合使用：**
    *   在选项中启用“专家模式”。
    *   在“高级配置”部分，将 **两个 API 的 URL** 修改为指向您的 LiteLLM Proxy 实例。**请对两个 URL 使用相同的基础地址。**
    *   勾选“无日志记录（仅限 LiteLLM）”选项以禁用 LiteLLM 的请求日志记录。

## 🚀 与 LiteLLM Proxy 的使用

如果您希望使用除 OpenAI 外的其他语言模型，可以使用 LiteLLM Proxy。以下是配置方法：

Babel Fish AI 与 [LiteLLM Proxy](https://litellm.ai/) 兼容，可使用与 OpenAI API 接口兼容的方式调用其他语言模型。

### 配置

1.  **安装并配置 LiteLLM Proxy：** 请按照 LiteLLM 官网的说明操作。
2.  **配置 Babel Fish AI 扩展：**
    *   在扩展选项中（右键点击图标 > 选项）启用“专家模式”。
    *   在“高级配置”部分，将 **两个 API 的 URL** 修改为指向您的 LiteLLM Proxy 实例（例如，`http://localhost:4000/v1/audio/transcriptions` 和 `http://localhost:4000/v1/chat/completions`）。**请使用相同的基础 URL。**
    *   勾选“无日志记录（仅限 LiteLLM）”选项以禁用 LiteLLM 的请求日志记录。

**重要：** “无日志记录”选项仅供与 LiteLLM Proxy 一起使用。**如果您使用官方 OpenAI API，请勿启用此选项，否则会导致错误并阻止翻译功能的运行。**

## 🛠️ 技术原理

### 扩展架构

该扩展由多个 JavaScript 文件组成，这些文件之间相互协作：

*   **`manifest.json`:** 扩展的主要配置文件。它定义了权限、脚本、可访问资源等。该文件使用 Manifest 版本 3，并声明了权限 `activeTab`、`storage`、`commands`、`scripting` 和 `contextMenus`。`web_accessible_resources` 允许在不同运行环境中访问扩展资源。
*   **`background.js`:** 在后台运行的服务工作线程。它处理事件（点击图标、键盘快捷键、上下文菜单），在需要时注入 `content script`，并与 `content script` 通讯。
*   **`content.js`:** 被注入到网页中的脚本。它直接与 DOM 交互，捕获麦克风音频，调用转录和翻译 API，并显示结果。
*   **`src/utils/api.js`:** 包含与 API 交互的函数，特别是 `transcribeAudio` 函数，用于调用 OpenAI 的 Whisper API（转录），以及用于管理存储的实用函数。
*   **`src/utils/translation.js`:** 包含 `translateText` 和 `rephraseText` 函数，用于调用 OpenAI 的 GPT API（翻译和改写）。
*   **`src/utils/ui.js`:** 包含用于管理用户界面的实用函数（横幅、对话框、复制按钮）。
*   **`src/utils/languages-shared.js` 和 `src/utils/languages-data.js`:** 分别为网页内容和服务工作线程定义了支持语言的集中列表。
*   **`src/utils/i18n.js`:** 管理界面国际化。
*   **`src/constants.js`:** 定义用于配置、状态、动作等的常量。
*   **`src/pages/options/`:** 包含扩展选项页面（HTML、CSS、JavaScript）的文件。

### 转录和翻译过程

#### 主要语音转录功能

1.  **开始录音：** 用户点击扩展图标或使用键盘快捷键（Ctrl+Shift+1 或 Mac 上的 ⌘+Shift+1）开始录音。`background script` 会向 `content script` 发送开始录音的消息。
2.  **音频捕获：** `content script` 使用 `navigator.mediaDevices.getUserMedia` API 来访问麦克风，并通过 MediaRecorder API 录制音频。
3.  **转录：** `content script` 使用 `transcribeAudio` 函数（位于 `src/utils/api.js`）将音频发送至 OpenAI 的 Whisper API。API 返回转录文本。
4.  **翻译或改写（可选）：** 
   - 如果启用翻译选项，`content script` 将使用 `translateText` 函数（位于 `src/utils/translation.js`）将转录文本发送至 OpenAI 的 GPT API。
   - 如果启用改写选项，则使用 `rephraseText` 函数来优化转录文本。
5.  **显示：** `content script` 将处理后的文本显示在页面的活动元素中（例如文本框或可编辑区域），或在自定义对话框中显示。

#### 上下文菜单功能

1. **文本选择：** 用户在网页上选择文本。
2. **上下文菜单：** 右键点击显示“改写所选内容”或“翻译所选内容”选项，并带有所有可用语言的子菜单。
3. **处理：** 根据选择的选项：
   - 文本通过 `rephraseText` 函数发送进行改写；
   - 文本通过 `translateText` 函数发送进行翻译，并选择目标语言。
4. **显示：** 结果替换文本选择所在元素中的原始文本。

### 通讯

`background script` 与 `content script` 之间的通讯通过 Chrome 的消息 API（`chrome.runtime.sendMessage` 和 `chrome.runtime.onMessage`）进行。

### 数据存储

扩展使用 `chrome.storage.sync` 存储：

*   OpenAI API 密钥（`apiKey`）。
*   扩展选项（界面、翻译、状态条颜色等）。
*   翻译语言偏好。

这些数据将存储在您的电脑上，即 Chrome 扩展的存储中。

### 错误处理

可能出现的错误（缺少 API 密钥、转录错误等）在 `constants.js` 文件中定义。`api.js` 和 `translation.js` 中的函数处理可能的 API 调用错误。`content.js` 会通过页面顶部的横幅向用户显示错误信息。

## 🛡️ 安全与隐私

- **数据保护：**
  - API 密钥以安全方式存储在 Chrome 中。
  - 扩展不会保存您的音频数据；所有处理都实时进行。
  - 与 API 的通讯通过安全的 HTTPS 连接进行。

有关 BabelFishAI 如何管理您的数据的完整信息，请参阅我们的 [隐私政策](PRIVACY.md)。

## 🔧 故障排除

- **麦克风问题：**
  - 检查 Chrome 中的麦克风访问权限。
  - 确保没有其他应用程序同时使用麦克风。

- **转录/翻译错误：**
  - 检查 API 密钥是否有效并处于激活状态。
  - 确保您的网络连接稳定。
  - 如遇错误，请查看 Chrome 控制台以获取详细日志。

## 🤝 贡献

欢迎任何贡献与建议。贡献方式：
- 通过 GitHub 的 Issues 部分报告错误。
- 提出改进或新功能的建议。
- 提交您的 pull requests。

## 📄 许可证

此扩展基于 GNU Affero 通用公共许可证 v3.0（AGPL-3.0）发布。详情请参阅 LICENSE 文件。

## 💝 支持

如果您喜欢此扩展，可以通过 [PayPal](https://paypal.me/jls) 进行捐赠以支持其开发。
---
由 jls42.org 带着热情与创新开发，Babel Fish AI 利用尖端人工智能技术推进转录与翻译至全新高度。

**此文档是从法语版本翻译为中文的，使用了 o3-mini 模型。有关翻译过程的更多信息，请参阅 https://gitlab.com/jls42/ai-powered-markdown-translator**

