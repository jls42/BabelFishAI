# Babel Fish AI - 基于 AI 的语音转录和翻译扩展

Babel Fish AI 是一款创新的 Chrome 扩展，最初旨在提供强大的语音转录功能。借助 OpenAI 的 Whisper API，将您的语音转换为文本，实现惊人的精准度，并可选择实时自动翻译。您可以仅使用 Babel Fish AI 进行转录，也可以根据需要启用即时翻译。

## 🌟 功能

- **先进的语音转录**
  - 通过设备的麦克风捕获高质量音频。
  - 由 OpenAI 的 Whisper API 实现精准转录。
  - 多语言支持，处理语音和显示文本，能够将不同语言的语音输入转录并以您选择的语言显示结果。
  - 自动将文本插入到当前焦点字段或显示在专用对话框中。

- **内置自动翻译（可选）**
  - 根据需要激活，立即将转录内容翻译成多种语言。
  - 使用先进的 AI 模型，以确保译文忠实于原意。
  - 可自由选择仅使用转录功能或同时结合转录与翻译。

- **直观且可自定义的用户界面**
  - 灵活的显示模式：活动输入区或浮动对话窗口。
  - 可配置的状态横幅，可自选颜色、不透明度及显示时长。
  - 使用快捷键 (Ctrl+Shift+1 或 Mac 上的 ⌘+Shift+1) 启动/停止录音。
  - 自定义图标，结合麦克风与数字“42”，实现即时识别。

- **高级选项**
  - 专家模式，支持详细配置（API URL、按域配置等）。
  - 可自定义转录和翻译模型。
  - 通过 _locales 文件进行全面的国际化管理，提供多语言界面和语音支持。

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

1. **下载与安装：**
   - 从 GitHub 克隆该仓库或手动下载扩展文件夹。
   - 打开 Chrome 并访问 `chrome://extensions/`。
   - 在右上角启用“开发者模式”。
   - 点击“加载已解压的扩展程序”，并选择 Babel Fish AI 文件夹。

2. **验证：**
   - 确认扩展显示在 Chrome 工具栏中，并带有自定义图标。

## ⚙️ 配置

1. **OpenAI API 密钥：**
   - 点击扩展图标进入选项设置。
   - 输入您的 OpenAI API 密钥（可在 [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) 获取）。

2. **自定义选项：**
   - 选择显示模式（活动区域或对话框）。
   - 配置状态横幅的颜色、不透明度及显示时长。
   - 为转录（语音输入）和文本显示选择语言。
   - 根据需求启用或禁用翻译功能。

## 🛠️ 技术原理

### 扩展架构

该扩展由多个相互交互的 JavaScript 文件组成：

*   **`manifest.json`:** 扩展的主要配置文件。它定义了权限、脚本、可访问资源等。该文件使用清单版本 3，并声明了 `activeTab`、`storage`、`commands` 和 `scripting` 权限。`content_scripts` 会被注入到所有 URL 中，并在文档加载完毕后执行。
*   **`background.js`:** 在后台运行的服务工作者。它处理事件（点击图标、快捷键），在需要时注入 `content script`，并与 `content script` 通信。
*   **`content.js`:** 注入网页中的脚本。它直接与 DOM 交互，捕获麦克风音频，调用转录和翻译 API，并显示结果。
*   **`src/utils/api.js`:** 包含 `transcribeAudio` 函数，用于调用 OpenAI 的 Whisper API（转录）。
*   **`src/utils/translation.js`:** 包含 `translateText` 函数，用于调用 OpenAI 的 GPT API（翻译）。
*   **`src/utils/ui.js`:** 包含用于管理用户界面（横幅、对话框、复制按钮）的实用函数。
*   **`src/constants.js`:** 定义了配置、状态、动作等常量。
*   **`src/pages/options/`:** 包含扩展选项页面的文件（HTML、CSS、JavaScript）。

### 转录与翻译过程

1.  **开始录音：** 用户点击扩展图标或使用快捷键启动录音。`background script` 发送消息给 `content script` 来开始录音。
2.  **音频捕获：** `content script` 使用 API `navigator.mediaDevices.getUserMedia` 访问麦克风并录制音频。
3.  **转录：** `content script` 调用 `transcribeAudio` 函数（见 `src/utils/api.js`），将音频发送至 OpenAI 的 Whisper API。该 API 返回转录文本。
4.  **翻译（可选）：** 如果启用了翻译选项，`content script` 调用 `translateText` 函数（见 `src/utils/translation.js`）将转录文本发送至 OpenAI 的 GPT API。该 API 返回翻译后的文本。
5.  **显示：** `content script` 将转录的文本（以及可能的翻译文本）显示在页面的活动元素中（如果是文本字段或可编辑元素），或显示在对话框中。

### 通信

`background script` 与 `content script` 之间通过 Chrome 的消息 API（`chrome.runtime.sendMessage` 与 `chrome.runtime.onMessage`）进行通信。

### 数据存储

该扩展使用 `chrome.storage.sync` 存储：

*   OpenAI API 密钥 (`apiKey`)。
*   扩展选项（显示、翻译、横幅颜色等）。

### 错误处理
可能出现的错误（API 密钥缺失、转录错误等）在 `constants.js` 中定义。`api.js` 和 `translation.js` 会处理 API 调用中可能出现的错误。`content.js` 通过页面顶部的横幅向用户显示错误消息。

## 🛡️ 安全与隐私

- **数据保护：**
  - API 密钥以安全方式存储在 Chrome 中。
  - 扩展不会保存您的音频数据；所有处理均在实时进行。
  - 与 API 的通信均通过安全的 HTTPS 连接进行。

## 🔧 故障排除

- **麦克风问题：**
  - 检查 Chrome 中的麦克风访问权限。
  - 确保没有其他应用程序同时使用麦克风。

- **转录/翻译错误：**
  - 检查 API 密钥是否有效并处于激活状态。
  - 确保您的网络连接稳定。
  - 如遇错误，请查看 Chrome 控制台以获取详细日志。

## 🤝 贡献

欢迎提供贡献和建议。若要贡献：
- 通过 GitHub 的 Issues 部分报告错误。
- 提出改进或新功能建议。
- 提交您的 pull requests。

## 📄 许可

该扩展遵循 GNU Affero 通用公共许可证 v3.0 (AGPL-3.0) 发布。详情请参阅 LICENSE 文件。

## 💝 支持

如果您喜欢该扩展，可以通过 [PayPal](https://paypal.me/jls) 捐款支持其开发。

---
由 jls42.org 以热情与创新开发，Babel Fish AI 凭借尖端人工智能推动转录和翻译迈向新高度。

**本文件已从法语版本翻译为中文，使用的是 o3-mini 模型。有关翻译过程的更多信息，请参见 https://gitlab.com/jls42/ai-powered-markdown-translator**

