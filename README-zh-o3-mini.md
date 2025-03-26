# Babel Fish AI - 使用 AI 的语音转录与翻译扩展

<img src="images/icon128.png" alt="Babel Fish AI 图标" width="128" height="128">

**要使用此扩展，您需要一个 OpenAI API 密钥（或如果您使用 LiteLLM Proxy，则需使用第三方提供商）。您可以在这里生成 OpenAI API 密钥：[https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI 是一款创新的 Chrome 扩展，最初旨在提供强大的语音转录功能。借助 OpenAI 的 Whisper API，将您的语音转换为文本，且转换精准非凡，同时可选择启用实时自动翻译。您可以仅使用 Babel Fish AI 进行转录，或者根据需要启用即时翻译。

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 功能

- **高级语音转录**
  - 通过您设备的麦克风捕获高质量音频。
  - 由 OpenAI 的 Whisper API 实现精准转录。
  - 支持多语言语音识别与文本显示，允许在不同语言间转录语音输入，并以您选择的语言显示结果（转录和翻译，如果启用）。
  - 自动将文本插入活动字段或显示在专用对话框中。

- **智能翻译与改写**
  - 可立即将转录内容翻译成多种语言，根据需要启用。
  - 对文本进行改写以提升风格及清晰度。
  - 使用先进 AI 模型确保翻译忠实于原意。
  - 可自由选择仅使用转录功能或结合转录与翻译。

- **强大的上下文菜单**
  - “改写所选内容”选项，可即时改进您所选文本。
  - “翻译所选内容”选项，附带所有可用语言的子菜单。
  - 直接用翻译或改写后的版本替换所选文本。
  - 与 Chrome 原生用户界面完美整合。

- **直观且可定制的用户界面**
  - 灵活的显示模式：活动输入区域或浮动对话窗口。
  - 可配置状态栏，支持颜色、透明度及显示时长的选择。
  - 快捷键（Ctrl+Shift+1 或 Mac 上的 ⌘+Shift+1）用于开始/停止录音。
  - “保持开启”选项用于控制结果显示时长。
  - 自定义图标，内含麦克风和数字“42”，便于即时识别。

- **高级选项**
    - 专家模式，提供详细配置（API URL、按域配置等）。
    - 可自定义转录和翻译模型。
    - 兼容 LiteLLM Proxy，可连接到其他语言模型并禁用请求日志记录。
    - 通过语言文件（_locales）实现全面的国际化管理，提供多语言界面和语音支持。

## 🌐 支持语言

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
    - **或直接从 [Chrome 网上应用店](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk) 安装扩展**
    - 打开 Chrome 并访问 `chrome://extensions/`。
    - 打开右上角的“开发者模式”。
    - 点击“加载已解压的扩展”，选择 Babel Fish AI 文件夹。

2.  **验证：**
    - 确保扩展以自定义图标显示在 Chrome 工具栏中。

## ⚙️ 配置

1.  **OpenAI API 密钥：**
    *   点击扩展图标进入选项。
    *   输入您的 OpenAI API 密钥（可在 [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) 获取）。

2.  **选项定制：**
    *   选择显示模式（活动区域或对话框）。
    *   配置状态栏的颜色、透明度和显示时长。
    *   选择转录（语音输入）和文本显示的语言。
    *   根据您的需要启用或禁用翻译功能。

3.  **（可选）使用 LiteLLM Proxy：**
    *   在选项中启用“专家模式”。
    *   在“高级配置”部分，修改 **两个 API 的 URL**（Whisper 和翻译）以指向您的 LiteLLM Proxy 实例。**两个使用相同的基础 URL。**
    *   如果您想禁用 LiteLLM 的请求日志记录，请勾选“禁用日志（仅限 LiteLLM）”选项。

## 🚀 与 LiteLLM Proxy 配合使用

如果您想使用除 OpenAI 之外的其他语言模型，您可以使用 LiteLLM Proxy。配置方法如下：

Babel Fish AI 兼容 [LiteLLM Proxy](https://litellm.ai/)，可使用兼容 OpenAI API 的其他语言模型。

### 配置

1.  **安装并配置 LiteLLM Proxy：** 请按照 LiteLLM 网站上的说明进行操作。
2.  **配置 Babel Fish AI 扩展：**
    *   在扩展选项中（右键点击图标 > 选项），启用“专家模式”。
    *   在“高级配置”部分，修改 **两个 API 的 URL**（Whisper 和翻译）以指向您的 LiteLLM Proxy 实例（例如，`http://localhost:4000/v1/audio/transcriptions` 和 `http://localhost:4000/v1/chat/completions`）。**两个使用相同的基础 URL。**
    *   如果您希望禁用 LiteLLM 的请求日志记录，请勾选“禁用日志（仅限 LiteLLM）”选项。

**重要：** “禁用日志”选项**仅专用于 LiteLLM Proxy**。如果您使用官方 OpenAI API，请**不要启用**该选项，否则会导致错误并阻止翻译功能运行。

## 🛠️ 技术实现

### 扩展架构

该扩展由多个 JavaScript 文件组成，相互协作：

#### 主要文件

*   **`manifest.json`:** 扩展的主要配置文件。定义了权限、脚本、可访问资源等。它使用清单版本 3，并声明了 `activeTab`、`storage`、`commands`、`scripting` 和 `contextMenus` 权限。
*   **`background.js`:** 在后台运行的服务工作者。管理事件（点击图标、快捷键、上下文菜单），在必要时注入 `content script`，并与 `content script` 通信。
*   **`content.js`:** 注入网页的主要脚本。协调各个工具模块并管理扩展的整体流程。
*   **`src/constants.js`:** 定义配置、状态、操作等常量。

#### 工具模块

扩展采用模块化架构，包含多个专用工具文件：

##### API 管理与数据处理

*   **`src/utils/api.js`:** 包含与 API 交互的函数，尤其是通过 `transcribeAudio` 调用 OpenAI 的 Whisper API。
*   **`src/utils/api-utils.js`:** 用于与外部 API 高级交互的函数。
*   **`src/utils/translation.js`:** 包含 `translateText` 和 `rephraseText` 函数，用于调用 OpenAI 的 GPT API。
*   **`src/utils/text-translation.js`:** 用于文本翻译和改写的专用函数。
*   **`src/utils/text-processing.js`:** 通用文本处理函数。

##### 用户界面与交互

*   **`src/utils/ui.js`:** 通用用户界面工具函数。
*   **`src/utils/banner-utils.js`:** 管理状态横幅，控制和语言选择器。
*   **`src/utils/focus-utils.js`:** 管理焦点保存和文本选择恢复。
*   **`src/utils/transcription-display.js`:** 管理转录结果显示。
*   **`src/utils/error-utils.js`:** 管理错误显示和处理。
*   **`src/styles/content.css`:** 注入网页的用户界面 CSS 样式。

##### 录音与事件

*   **`src/utils/recording-utils.js`:** 通过麦克风管理音频录制及数据处理。
*   **`src/utils/event-handlers.js`:** 包含用户交互事件处理器。

##### 国际化与语言

*   **`src/utils/languages.js`:** 定义扩展支持的语言。
*   **`src/utils/languages-shared.js`:** 定义网页上下文所支持的语言列表。
*   **`src/utils/languages-data.js`:** 定义服务工作者支持的语言列表。
*   **`src/utils/i18n.js`:** 管理用户界面的国际化。

##### 选项页面

*   **`src/pages/options/`:** 包含扩展选项页面的文件（HTML、CSS、JavaScript）。

### 语音转录与翻译流程

#### 主要语音转录功能

1.  **开始录制：** 用户点击扩展图标或使用快捷键（Ctrl+Shift+1 或 Mac 上的 ⌘+Shift+1）开始录音。`background script` 向 `content script` 发送消息以启动录制。
2.  **音频捕获：** `content script` 通过调用 `navigator.mediaDevices.getUserMedia` 获取麦克风权限，并通过 MediaRecorder API 录制音频。
3.  **转录：** `content script` 使用 `transcribeAudio` 函数（位于 `src/utils/api.js`）将音频发送至 OpenAI 的 Whisper API，API 返回转录文本。
4.  **翻译或改写（可选）：** 
   - 如果启用了翻译选项，`content script` 将使用 `translateText` 函数（位于 `src/utils/translation.js`）将转录文本发送至 OpenAI 的 GPT API进行翻译。
   - 如果启用了改写选项，则调用 `rephraseText` 函数以改进转录文本。
5.  **显示：** `content script` 将处理后的文本显示在页面的活动元素中（若为文本框或可编辑元素），或显示在自定义对话框中。

#### 上下文菜单功能

1. **文本选择：** 用户在网页上选择文本。
2. **上下文菜单：** 右键点击显示“改写所选内容”或“翻译所选内容”选项，并带有所有可用语言的子菜单。
3. **处理：** 根据所选选项：
   - 文本通过 `rephraseText` 函数进行改写；
   - 文本通过 `translateText` 函数进行翻译，并使用所选目标语言。
4. **显示：** 结果替换原有选中文本所在的元素中的文本。

### 通信

`background script` 与 `content script` 之间通过 Chrome 的消息 API（`chrome.runtime.sendMessage` 和 `chrome.runtime.onMessage`）进行通信。

### 数据存储

扩展使用 `chrome.storage.sync` 存储：

*   OpenAI API 密钥（`apiKey`）。
*   扩展选项（显示、翻译、状态栏颜色等）。
*   翻译的语言偏好设置。

这些数据会在您计算机上本地存储于 Chrome 扩展存储中。

### 错误处理
可能出现的错误（如缺失 API 密钥、转录错误等）在 `constants.js` 中定义。`api.js` 和 `translation.js` 函数负责处理 API 调用可能出现的错误。`content.js` 通过页面顶部横幅向用户显示错误信息。

## 🛡️ 安全与隐私

- **数据保护：**
  - API 密钥以安全方式存储在 Chrome 中。
  - 扩展不存储您的音频数据；所有处理均在实时进行。
  - 与 API 之间的通信通过 HTTPS 安全连接进行。

有关 BabelFishAI 如何处理您数据的完整信息，请参阅我们的 [隐私政策](PRIVACY.md)。

## 🔧 故障排除

- **麦克风问题：**
  - 检查 Chrome 中的麦克风访问权限。
  - 确保没有其他应用程序同时使用麦克风。

- **转录/翻译错误：**
  - 检查 API 密钥是否有效且已激活。
  - 确保网络连接稳定。
  - 如出现错误，请查看 Chrome 控制台以获取详细日志。

## 🤝 贡献

欢迎提出贡献及建议。要贡献：
- 通过 GitHub 的 Issues 部分报告错误。
- 提出改进或新增功能建议。
- 提交您的 pull request。

## 📄 许可证

此扩展遵循 GNU Affero 通用公共许可证 v3.0（AGPL-3.0）分发。详情请参阅 LICENSE 文件。

## 💝 支持

如果您喜欢此扩展，您可以通过 [PayPal](https://paypal.me/jls) 捐助支持其开发。
---
由 jls42.org 以热情与创新开发，Babel Fish AI 利用尖端人工智能将转录与翻译推向全新高度。

**该文档已从法语版本翻译成中文，并使用了 o3-mini 模型。欲了解更多有关翻译过程的信息，请参阅 https://gitlab.com/jls42/ai-powered-markdown-translator**

