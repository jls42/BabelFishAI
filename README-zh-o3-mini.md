# Babel Fish AI - 基于 AI 的语音转写与翻译扩展

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**使用该扩展需要一个 OpenAI API 密钥（如果你使用 LiteLLM Proxy，则需要第三方供应商）。你可以在此生成 OpenAI API 密钥： [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI 是一款创新的 Chrome 扩展，最初设计用于提供强大的语音转写功能。通过 OpenAI 的 Whisper API，将你的语音转为文本，精准度非凡，并可选择实时自动翻译。你可以仅使用 Babel Fish AI 进行转写，也可以根据需要启用即时翻译功能。

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 功能特性

- **先进的语音转写**
  - 通过设备麦克风捕获高品质音频。
  - 由 OpenAI 的 Whisper API 提供精确转写。
  - 支持多语言语音识别及文本显示，可将不同语言的语音输入转写成文本，并以你选择的语言显示结果（转写和翻译，若启用）。
  - 自动将文本插入到当前活动的输入框，或显示在专用对话框中。

- **内置自动翻译（可选）**
  - 可按需启用，将转写文本即时翻译为多种语言。
  - 使用先进的 AI 模型，确保翻译忠实于原意。
  - 可自由选择仅使用转写功能或同时结合转写与翻译。

- **直观且可定制的用户界面**
  - 灵活的显示模式：活动输入区或浮动对话窗口。
  - 可配置的状态条，可设置颜色、透明度及显示时长。
  - 快捷键（Ctrl+Shift+1 或 Mac 上的 ⌘+Shift+1）用于开始/停止录音。
  - 自定义图标，集成麦克风及数字“42”，便于快速识别。

- **高级选项**
    - 专家模式，支持详细设置（API URL、按域配置等）。
    - 可自定义转写和翻译模型。
    - 与 LiteLLM Proxy 兼容，方便连接其他语言模型，同时可禁用请求日志记录功能。
    - 通过 _locales 语言文件实现全面国际化，提供多语言界面和语音支持。

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
    - 从 GitHub 克隆该仓库或手动下载扩展文件夹。
    - **或者直接从 [Chrome 网上应用店](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk) 安装扩展。**
    - 打开 Chrome 并访问 `chrome://extensions/`。
    - 在右上角启用“开发者模式”。
    - 点击“加载已解压的扩展程序”，选择 Babel Fish AI 文件夹。

2.  **验证：**
    - 确保扩展出现在 Chrome 工具栏中，并显示自定义图标。

## ⚙️ 配置

1.  **OpenAI API 密钥：**
    *   点击扩展图标进入选项页面。
    *   输入你的 OpenAI API 密钥（可在 [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) 获取）。

2.  **选项个性化设置：**
    *   选择显示模式（活动区域或对话框）。
    *   配置状态条的颜色、透明度及显示时长。
    *   选择用于转写（语音输入）及文本显示的语言。
    *   根据需要启用或禁用翻译功能。

3.  **（可选）与 LiteLLM Proxy 结合使用：**
    *   在选项中启用“专家模式”。
    *   在“高级配置”部分，修改 **两个 API 的 URL**（Whisper 和翻译）以指向你的 LiteLLM Proxy 实例。**两个 API 必须使用相同的基础 URL。**
    *   勾选 “NoLog (仅限 LiteLLM)” 选项以禁用 LiteLLM 的请求日志记录。

## 🚀 与 LiteLLM Proxy 一起使用

如果你希望使用除 OpenAI 之外的其他语言模型，可以使用 LiteLLM Proxy。以下是配置方法：

Babel Fish AI 与 [LiteLLM Proxy](https://litellm.ai/) 兼容，该代理允许使用兼容 OpenAI API 的其他语言模型。

### 配置

1.  **安装并配置 LiteLLM Proxy：** 按照 LiteLLM 官网的说明进行操作。
2.  **配置 Babel Fish AI 扩展：**
    *   在扩展选项中（右键点击图标 > 选项），启用“专家模式”。
    *   在“高级配置”部分，修改 **两个 API 的 URL**（Whisper 和翻译），使其指向你的 LiteLLM Proxy 实例（例如，`http://localhost:4000/v1/audio/transcriptions` 和 `http://localhost:4000/v1/chat/completions`）。**两个 API 必须使用相同的基础 URL。**
    *   勾选 “NoLog (仅限 LiteLLM)” 选项以禁用 LiteLLM 的请求日志记录。

**重要提示：** “NoLog” 选项 **仅限** 与 LiteLLM Proxy 配合使用。**如果使用 OpenAI 官方 API，请不要启用该选项，否则会导致错误并阻止翻译功能运行。**

## 🛠️ 技术原理

### 扩展架构

该扩展由多个相互协作的 JavaScript 文件组成：

*   **`manifest.json`:** 扩展的主配置文件。定义了权限、脚本、可访问资源等。采用清单版本 3，并声明了 `activeTab`、`storage`、`commands` 和 `scripting` 权限。`content_scripts` 会注入到所有 URL，并在文档加载结束时执行。
*   **`background.js`:** 在后台运行的服务工作线程。处理事件（点击图标、快捷键）、必要时注入 `content script`，并与 `content script` 进行通信。
*   **`content.js`:** 注入到网页中的脚本。直接操作 DOM，捕获麦克风音频，调用转写与翻译 API，并显示结果。
*   **`src/utils/api.js`:** 包含 `transcribeAudio` 函数，用于调用 OpenAI 的 Whisper API（转写）。
*   **`src/utils/translation.js`:** 包含 `translateText` 函数，用于调用 OpenAI 的 GPT API（翻译）。
*   **`src/utils/ui.js`:** 包含用于管理用户界面（横幅、对话框、复制按钮）的实用函数。
*   **`src/constants.js`:** 定义了配置、状态、动作等常量。
*   **`src/pages/options/`:** 包含扩展选项页面的文件（HTML、CSS、JavaScript）。

### 转写与翻译流程

1.  **开始录音：** 用户通过点击扩展图标或使用快捷键开始录音。`background script` 向 `content script` 发送消息以启动录音。
2.  **捕获音频：** `content script` 使用 `navigator.mediaDevices.getUserMedia` API 访问麦克风并录制音频。
3.  **转写：** `content script` 使用 `transcribeAudio` 函数（位于 `src/utils/api.js`）将音频发送至 OpenAI 的 Whisper API，API 返回转写文本。
4.  **翻译（可选）：** 若启用翻译选项，`content script` 使用 `translateText` 函数（位于 `src/utils/translation.js`）将转写文本发送至 OpenAI 的 GPT API，API 返回翻译文本。
5.  **显示：** `content script` 将转写文本（若有，还包括翻译文本）显示在网页的当前活动元素（例如文本输入框或可编辑元素）中，或显示在对话框中。

### 通讯机制

`background script` 与 `content script` 之间通过 Chrome 消息 API（`chrome.runtime.sendMessage` 和 `chrome.runtime.onMessage`）进行通信。

### 数据存储

该扩展使用 `chrome.storage.sync` 存储：

*   OpenAI API 密钥（`apiKey`）。
*   扩展选项（显示设置、翻译、状态条颜色等）。

这些数据会存储在你本地电脑的 Chrome 扩展存储中。

### 错误处理
可能出现的错误（例如 API 密钥缺失、转写出错等）均在 `constants.js` 中定义。`api.js` 与 `translation.js` 函数会处理 API 调用的潜在错误，`content.js` 则通过页面顶部的横幅向用户显示错误信息。

## 🛡️ 安全与隐私

- **数据保护：**
  - API 密钥安全存储在 Chrome 中。
  - 扩展不会保存你的音频数据；所有处理均为实时进行。
  - 与 API 的通信通过安全的 HTTPS 连接。

欲了解 BabelFishAI 如何处理你的数据的详细信息，请查阅我们的 [隐私政策](PRIVACY.md)。

## 🔧 故障排查

- **麦克风问题：**
  - 检查 Chrome 中的麦克风访问权限。
  - 确保没有其他应用同时使用麦克风。

- **转写/翻译错误：**
  - 检查 API 密钥是否有效且处于激活状态。
  - 确保你的网络连接稳定。
  - 如遇错误，请查看 Chrome 控制台获取详细日志。

## 🤝 贡献

欢迎大家的贡献和建议。若要贡献：
- 通过 GitHub 的 Issues 部分报告错误。
- 提出改进建议或新功能。
- 提交 Pull Request。

## 📄 许可协议

该扩展遵循 GNU Affero 通用公共许可证 v3.0 (AGPL-3.0) 分发。详情请参阅 LICENSE 文件。

## 💝 支持

如果你喜欢这个扩展，可以通过 [PayPal](https://paypal.me/jls) 捐助支持其开发。
---
由 jls42.org 以满腔热情和创新精神开发，Babel Fish AI 通过尖端的人工智能技术将语音转写与翻译推向全新高度。

**该文档已使用模型 o3-mini 从 fr 版本翻译为 zh 语言。有关翻译过程的更多信息，请参阅 https://gitlab.com/jls42/ai-powered-markdown-translator**

