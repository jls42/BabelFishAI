# Babel Fish AI - 基于 AI 的语音转录与翻译扩展

Babel Fish AI 是一款创新的 Chrome 扩展程序，最早设计用于提供强大的语音转录功能。借助 OpenAI 的 Whisper API，将您的语音以惊人的准确性转换成文本，并可选择实时自动翻译。您可以仅使用 Babel Fish AI 进行转录，或根据需要启用即时翻译。

## 🌟 功能

- **高级语音转录**
  - 通过设备麦克风捕获高质量音频。
  - 由 OpenAI 的 Whisper API 实现精确转录。
  - 多语言支持，用于语音处理和文本显示，能够转录不同语言的语音输入，并以您选择的语言显示结果。
  - 自动将文本插入到活动输入框中或在专用对话框中显示。

- **内置自动翻译（可选）**
  - 可按需启用，将转录的文本立即翻译成多种语言。
  - 使用先进的 AI 模型确保翻译忠实于原意。
  - 可自由选择仅使用转录功能或同时结合转录与翻译。

- **直观且可定制的用户界面**
  - 灵活的显示模式：活动输入区或浮动对话框。
  - 可配置状态条，可选择颜色、透明度及显示时长。
  - 快捷键（Ctrl+Shift+1 或 Mac 上的 ⌘+Shift+1）用于启动/停止录音。
  - 自定义图标，集成麦克风与数字“42”，便于即时识别。

- **高级选项**
    - 专家模式，可进行详细配置（API URLs、按域名配置等）。
    - 可自定义转录和翻译模型。
    - **与 LiteLLM Proxy 兼容，可使用替代语言模型并禁用请求日志记录。**
    - 通过语言文件（_locales）实现全面国际化管理，提供多语言界面及语音支持。

## 🌐 支持语言

- 阿拉伯语
- 德语
- 英语
- 西班牙语
- 法语
- 印地语
- 意大利语
- 日语
- 韩语
- 荷兰语
- 波兰语
- 葡萄牙语
- 罗马尼亚语
- 瑞典语
- 中文

## 🚀 安装

1.  **下载与安装：**
    - 从 GitHub 克隆此仓库或手动下载扩展程序文件夹。
    - 打开 Chrome 并访问 `chrome://extensions/`。
    - 在右上角启用 “开发者模式”。
    - 点击 “加载已解压的扩展程序”，选择 Babel Fish AI 文件夹。

2.  **验证：**
    - 确保扩展程序以自定义图标显示在 Chrome 工具栏中。

## ⚙️ 配置

1.  **OpenAI API 密钥：**
    *   点击扩展程序图标进入选项页面。
    *   输入您的 OpenAI API 密钥（可在 [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) 获取）。

2.  **选项个性化：**
    *   选择显示模式（活动区或对话框）。
    *   配置状态条的颜色、透明度和显示时长。
    *   选择语音转录（语音输入）和文本显示的语言。
    *   根据需要启用或禁用翻译功能。

3.  **（可选）使用 LiteLLM Proxy：**
    *   在选项中启用 “专家模式”。
    *   在 “高级配置” 部分，修改 **两个 API URL** （Whisper 与翻译），使其指向您的 LiteLLM Proxy 实例。**两个 API 共用相同的基础 URL。**
    *   如果希望禁用 LiteLLM 的请求日志，请勾选 “NoLog (仅 LiteLLM)” 选项。

## 🚀 与 LiteLLM Proxy 一起使用

Babel Fish AI 与 [LiteLLM Proxy](https://litellm.ai/) 兼容，该代理允许使用替代语言模型，并提供与 OpenAI API 兼容的接口。

### 配置

1.  **安装并配置 LiteLLM Proxy：** 请按照 LiteLLM 网站上的说明操作。
2.  **配置 Babel Fish AI 扩展：**
    *   在扩展选项中（右键点击图标 > 选项），启用 “专家模式”。
    *   在 “高级配置” 部分，修改 **两个 API URL** （Whisper 与翻译），使其指向您的 LiteLLM Proxy 实例（例如，`http://localhost:4000/v1/audio/transcriptions` 与 `http://localhost:4000/v1/chat/completions`）。**两个 API 共用相同的基础 URL。**
    *   如果希望禁用 LiteLLM 的请求日志，请勾选 “NoLog (仅 LiteLLM)” 选项。

**重要：** “NoLog” 选项 **仅** 用于 LiteLLM Proxy。**如果使用官方 OpenAI API，请勿启用此选项，否则可能会导致错误并阻止翻译功能正常工作。**

## 🛠️ 技术原理

### 扩展架构

该扩展程序由多个相互作用的 JavaScript 文件组成：

*   **`manifest.json`:** 扩展程序的主要配置文件。它定义了权限、脚本、可访问资源等。采用 Manifest 版本 3，并声明了 `activeTab`、`storage`、`commands` 与 `scripting` 权限。`content_scripts` 会注入到所有 URL 中，并在文档加载完成后执行。
*   **`background.js`:** 后台服务工作者，负责处理事件（点击图标、快捷键操作）、在必要时注入 `content script`，并与 `content script` 通信。
*   **`content.js`:** 注入到网页中的脚本，直接与 DOM 交互，捕获设备麦克风的音频，调用转录和翻译 API，并显示结果。
*   **`src/utils/api.js`:** 包含函数 `transcribeAudio`，用于调用 OpenAI Whisper API（转录）。
*   **`src/utils/translation.js`:** 包含函数 `translateText`，用于调用 OpenAI GPT API（翻译）。
*   **`src/utils/ui.js`:** 包含管理用户界面（状态条、对话框、复制按钮）的工具函数。
*   **`src/constants.js`:** 定义配置、状态、动作等常量。
*   **`src/pages/options/`:** 包含扩展选项页面的文件（HTML、CSS、JavaScript）。

### 转录与翻译流程

1.  **开始录音：** 用户通过点击扩展图标或使用快捷键启动录音。`background script` 会向 `content script` 发送消息以开始录音。
2.  **音频捕获：** `content script` 使用 `navigator.mediaDevices.getUserMedia` API 访问麦克风并录制音频。
3.  **转录：** `content script` 使用 `transcribeAudio` 函数（`src/utils/api.js`）将音频发送至 OpenAI 的 Whisper API，API 返回转录的文本。
4.  **翻译（可选）：** 如果启用了翻译选项，`content script` 将调用 `translateText` 函数（`src/utils/translation.js`），将转录的文本发送至 OpenAI GPT API，API 返回翻译后的文本。
5.  **显示：** `content script` 将转录（及翻译）的文本显示在页面中的活动元素（如文本框或可编辑元素）中，或显示在对话框中。

### 通信

`background script` 与 `content script` 之间通过 Chrome 的消息 API（`chrome.runtime.sendMessage` 与 `chrome.runtime.onMessage`）进行通信。

### 数据存储

该扩展程序使用 `chrome.storage.sync` 存储：

*   OpenAI API 密钥（`apiKey`）。
*   扩展程序选项（显示、翻译、状态条颜色等）。

### 错误管理
可能出现的错误（例如 API 密钥缺失、转录错误等）在 `constants.js` 文件中定义。`api.js` 与 `translation.js` 函数会处理 API 调用的可能错误。`content.js` 通过页面顶部的状态条向用户显示错误信息。

## 🛡️ 安全与隐私

- **数据保护：**
  - API 密钥安全地存储在 Chrome 中。
  - 扩展程序不会保存您的音频数据；所有处理均实时进行。
  - 与 API 的通信通过安全的 HTTPS 连接进行。

## 🔧 故障排除

- **麦克风问题：**
  - 检查 Chrome 中的麦克风访问权限。
  - 确保没有其他应用程序同时使用麦克风。

- **转录/翻译错误：**
  - 检查 API 密钥是否有效并处于激活状态。
  - 确保网络连接稳定。
  - 如果出现错误，请查看 Chrome 控制台中的详细日志。

## 🤝 贡献

欢迎大家的贡献与建议。贡献方式：
- 通过 GitHub Issues 部分报告 Bug。
- 提出改进建议或新的功能需求。
- 提交您的 Pull Request。

## 📄 许可证

该扩展程序遵循 GNU Affero 通用公共许可证 v3.0 (AGPL-3.0) 分发。详情请参阅 LICENSE 文件。

## 💝 支持

如果您喜欢此扩展程序，可以通过 [PayPal](https://paypal.me/jls) 捐赠，以支持其开发。

---
由 jls42.org 以热情与创新开发，Babel Fish AI 正在借助尖端人工智能推动语音转录与翻译迈向新高度。

**该文档已从法语版本翻译为中文，使用了o3-mini模型。有关翻译过程的更多信息，请参阅 https://gitlab.com/jls42/ai-powered-markdown-translator**

