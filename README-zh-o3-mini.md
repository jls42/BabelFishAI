# Babel Fish AI - 基于 AI 的语音转录与翻译扩展

**要使用此扩展，您需要一个 OpenAI API 密钥（或者如果您使用 LiteLLM Proxy，则需要第三方供应商）。您可以在此生成 OpenAI API 密钥：[https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI 是一个创新的 Chrome 扩展，最初设计用于提供强大的语音转录功能。借助 OpenAI 的 Whisper API，您可以将语音精确转换为文本，并可选择获得实时自动翻译。您可以仅使用 Babel Fish AI 进行转录，或根据需要启用即时翻译功能。

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 功能

- **高级语音转录**
  - 通过设备麦克风捕获高质量音频。
  - 使用 OpenAI 的 Whisper API 进行精确转录。
  - 多语言支持：支持语音识别和文本显示，可将不同语言的语音输入转录为文本，并以您选择的语言显示（转录和翻译，若启用）。
  - 自动将文本插入到活动输入框中或显示在专用对话框中。

- **内置自动翻译（可选）**
  - 可按需立即将转录结果翻译成多种语言。
  - 使用先进的 AI 模型确保翻译忠实反映原意。
  - 可自由选择仅使用转录功能或同时进行转录与翻译。

- **直观且可定制的用户界面**
  - 灵活的显示模式：活动输入区域或浮动对话窗口。
  - 可配置的状态栏：可选择颜色、透明度和显示时长。
  - 快捷键（Ctrl+Shift+1 或 Mac 上 ⌘+Shift+1）用于启动/停止录音。
  - 自定义图标，内含麦克风及“42”数字，方便即时识别。

- **高级选项**
    - 专家模式，支持详细配置（API URL、按域配置等）。
    - 可自定义转录和翻译模型。
    - 与 LiteLLM Proxy 兼容，可连接替代语言模型并禁用请求日志记录。
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

1.  **下载和安装：**
    - 从 GitHub 克隆此仓库或手动下载扩展文件夹。
    - 打开 Chrome 并访问 `chrome://extensions/`。
    - 在右上角启用“开发者模式”。
    - 点击“加载未打包的扩展程序”，然后选择 Babel Fish AI 文件夹。

2.  **验证：**
    - 确保扩展出现在 Chrome 工具栏中，并显示自定义图标。

## ⚙️ 配置

1.  **OpenAI API 密钥：**
    *   点击扩展图标进入选项页面。
    *   输入您的 OpenAI API 密钥（可在 [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) 获取）。

2.  **选项个性化设置：**
    *   选择显示模式（活动区域或对话框）。
    *   配置状态栏的颜色、透明度和显示时长。
    *   选择语音转录（语音输入）和文本显示的语言。
    *   根据需要启用或禁用翻译功能。

3.  **（可选）与 LiteLLM Proxy 配合使用：**
    *   在选项中启用“专家模式”。
    *   在“高级配置”部分，修改 **两个 API 的 URL**（Whisper 和翻译）以指向您的 LiteLLM Proxy 实例。**请为两者使用相同的基础 URL。**
    *   如果希望禁用 LiteLLM 的请求日志记录，请勾选“NoLog (LiteLLM uniquement)”选项。

## 🚀 与 LiteLLM Proxy 配合使用

如果您希望使用除 OpenAI 之外的其他语言模型，可以使用 LiteLLM Proxy。以下是配置方法：

Babel Fish AI 与 [LiteLLM Proxy](https://litellm.ai/) 兼容，允许使用兼容 OpenAI API 的其他语言模型。

### 配置

1.  **安装并配置 LiteLLM Proxy：** 请按照 LiteLLM 网站上的说明进行操作。
2.  **配置 Babel Fish AI 扩展：**
    *   在扩展选项中（右键点击图标 > 选项），启用“专家模式”。
    *   在“高级配置”部分，修改 **两个 API 的 URL**（Whisper 和翻译），使其指向您的 LiteLLM Proxy 实例（例如 `http://localhost:4000/v1/audio/transcriptions` 和 `http://localhost:4000/v1/chat/completions`）。**请为两者使用相同的基础 URL。**
    *   如果希望禁用 LiteLLM 的请求日志记录，请勾选“NoLog (LiteLLM uniquement)”选项。

**重要提示：** “NoLog”选项专为与 LiteLLM Proxy 配合使用而设计。**如果您使用官方 OpenAI API，请勿启用此选项，否则可能会导致错误并阻止翻译功能运行。**

## 🛠️ 技术原理

### 扩展架构

该扩展由多个 JavaScript 文件组成，相互协同工作：

*   **`manifest.json`:** 扩展的主要配置文件。定义权限、脚本、可访问资源等。使用 Manifest V3，并声明了 `activeTab`、`storage`、`commands` 和 `scripting` 权限。`content_scripts` 会注入到所有 URL 中，并在文档加载完毕后执行。
*   **`background.js`:** 后台服务工作者，在后台运行。管理点击图标、快捷键事件，必要时注入 `content script` 并与其通信。
*   **`content.js`:** 注入网页中的脚本。直接操作 DOM，捕获麦克风音频，调用转录和翻译 API，并显示结果。
*   **`src/utils/api.js`:** 包含调用 OpenAI Whisper API（转录）的 `transcribeAudio` 函数。
*   **`src/utils/translation.js`:** 包含调用 OpenAI GPT API（翻译）的 `translateText` 函数。
*   **`src/utils/ui.js`:** 包含用于管理用户界面的工具函数（横幅、对话框、复制按钮）。
*   **`src/constants.js`:** 定义配置、状态、操作等常量。
*   **`src/pages/options/`:** 包含扩展选项页面的文件（HTML、CSS、JavaScript）。

### 转录与翻译流程

1.  **开始录音：** 用户点击扩展图标或使用快捷键开始录音。`background script` 向 `content script` 发送消息以开始录音。
2.  **音频捕获：** `content script` 使用 `navigator.mediaDevices.getUserMedia` API 访问麦克风并录制音频。
3.  **转录：** `content script` 使用 `transcribeAudio` 函数（位于 `src/utils/api.js`）将音频发送至 OpenAI 的 Whisper API，API 返回转录文本。
4.  **翻译（可选）：** 如果启用了翻译功能，`content script` 使用 `translateText` 函数（位于 `src/utils/translation.js`）将转录文本发送至 OpenAI 的 GPT API，API 返回翻译后的文本。
5.  **显示：** `content script` 将转录（以及可能翻译）后的文本显示在页面中的活动元素（例如文本框或可编辑元素），或显示在对话框中。

### 通信

`background script` 与 `content script` 之间通过 Chrome 的消息 API（`chrome.runtime.sendMessage` 和 `chrome.runtime.onMessage`）进行通信。

### 数据存储

扩展使用 `chrome.storage.sync` 存储：

*   OpenAI API 密钥（`apiKey`）。
*   扩展选项（显示、翻译、状态栏颜色等）。

这些数据被存储在您的计算机中，属于 Chrome 扩展的本地存储数据。

### 错误处理
可能出现的错误（例如 API 密钥缺失、转录错误等）在 `constants.js` 文件中定义。`api.js` 与 `translation.js` 中的函数会处理 API 调用过程中可能出现的错误。`content.js` 会通过页面顶部的横幅向用户显示错误消息。

## 🛡️ 安全与隐私

- **数据保护：**
  - API 密钥在 Chrome 中以安全方式存储。
  - 扩展不会保留您的音频数据；所有处理均在实时完成。
  - 与 API 的通信通过安全的 HTTPS 连接进行。

有关 BabelFishAI 如何处理您数据的完整信息，请参阅我们的 [隐私政策](PRIVACY.md)。

## 🔧 故障排除

- **麦克风问题：**
  - 检查 Chrome 中的麦克风访问权限。
  - 确保没有其他应用程序同时使用麦克风。

- **转录/翻译错误：**
  - 检查 API 密钥是否有效且已激活。
  - 确保您的互联网连接稳定。
  - 如遇错误，请查看 Chrome 控制台以获取详细日志。

## 🤝 贡献

欢迎各位提供贡献和建议。要参与贡献，请：
- 通过 GitHub 的 Issues 部分报告问题。
- 提出改进意见或新功能建议。
- 提交您的 pull requests。

## 📄 许可证

该扩展遵循 GNU Affero 通用公共许可证 v3.0 (AGPL-3.0) 发布。详情请参阅 LICENSE 文件。

## 💝 支持

如果您喜欢此扩展，欢迎通过 [PayPal](https://paypal.me/jls) 捐赠支持其开发。
---
由 jls42.org 以激情与创新开发，Babel Fish AI 通过尖端人工智能将转录与翻译推向全新高度。

**本文件从法文版翻译成中文，使用了o3-mini模型。欲了解更多关于翻译过程的信息，请访问 https://gitlab.com/jls42/ai-powered-markdown-translator**

