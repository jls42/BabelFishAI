# Babel Fish AI - 音声転写およびAI翻訳拡張

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**拡張機能を利用するには、OpenAIのAPIキー（またはLiteLLM Proxyを使用している場合はサードパーティーのプロバイダー）が必要です。OpenAIのAPIキーはここで生成できます : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AIは、当初、強力な音声転写を提供するために設計された革新的なChrome拡張機能です。OpenAIのWhisper APIを利用して、あなたの声を驚くべき精度でテキストに変換し、必要に応じてリアルタイムの自動翻訳も行えます。Babel Fish AIは、転写専用として使用することも、あるいはお好みに合わせて即時翻訳を併用することも可能です。

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 機能

- **高度な音声転写**
  - デバイスのマイクを介して高品質なオーディオをキャプチャ。
  - OpenAIのWhisper APIによる正確な転写。
  - 複数言語対応の音声認識とテキスト表示をサポートし、さまざまな言語の音声入力を転写し、結果（転写および翻訳、翻訳が有効な場合）を任意の言語で表示可能。
  - アクティブな入力フィールドに自動的にテキストを挿入するか、専用のダイアログボックスに表示。

- **組み込み自動翻訳（オプション）**
  - 必要に応じて、複数の言語への即時翻訳を実施。
  - 元の意味を忠実に伝えるために、先進的なAIモデルを使用。
  - 転写のみに限定するか、転写と翻訳を組み合わせるかは自由に選択可能。

- **直感的でカスタマイズ可能なユーザーインターフェース**
  - 柔軟な表示モード：アクティブな入力領域またはフローティングダイアログウィンドウ。
  - 色、透過性、表示時間を選択できるステータスバーの設定。
  - 録音の開始/停止用のショートカットキー（Ctrl+Shift+1 または Macの場合は⌘+Shift+1）。
  - マイクと「42」という数字を組み合わせたカスタムアイコンで、即座に認識可能。

- **高度なオプション**
  - 詳細な設定を行うためのエキスパートモード（APIのURL、ドメインごとの設定など）。
  - 転写および翻訳のモデルをカスタマイズする機能。
  - LiteLLM Proxyとの互換性により、代替の言語モデルに接続し、リクエストのロギングを無効にするオプション。
  - _localesフォルダを通じた国際化の完全管理により、複数言語でのインターフェースと音声サポートを実現。

## 🌐 対応言語

以下は、Babel Fish AIが対応している言語の一覧と、デモ動画へのリンクです：

- [アラビア語](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [ドイツ語](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [英語](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [スペイン語](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [フランス語](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [ヒンディー語](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [イタリア語](https://www.youtube.com/watch?v=QgYZt8myods)
- [日本語](https://www.youtube.com/watch?v=noHEJCnocH8)
- [韓国語](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [オランダ語](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [ポーランド語](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [ポルトガル語](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [ルーマニア語](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [スウェーデン語](https://www.youtube.com/watch?v=HMMzGyW8000)
- [中国語](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 インストール

1.  **ダウンロードとインストール：**
    - GitHubからこのリポジトリをクローンするか、拡張機能のフォルダを手動でダウンロードしてください。
    - **もしくは、[Chromeウェブストア](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)から直接拡張機能をインストール。**
    - Chromeを開き、`chrome://extensions/`にアクセス。
    - 画面右上の「デベロッパーモード」を有効にします。
    - 「パッケージ化されていない拡張機能を読み込む」をクリックし、Babel Fish AIのフォルダを選択。

2.  **動作確認：**
    - 拡張機能が、カスタムアイコンとともにChromeのツールバーに表示されることを確認してください。

## ⚙️ 設定

1.  **OpenAI APIキー：**
    *   拡張機能のアイコンをクリックして設定にアクセス。
    *   OpenAIのAPIキーを入力（[platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)で入手可能）。

2.  **オプションのカスタマイズ：**
    *   表示モードを選択（アクティブな入力領域またはダイアログボックス）。
    *   ステータスバーの色、透過性、表示時間を設定。
    *   転写（音声入力）と言語テキスト表示用の言語を選択。
    *   必要に応じて翻訳機能を有効または無効に設定。

3.  **（オプション）LiteLLM Proxyとの併用：**
    *   設定の「エキスパートモード」を有効にする。
    *   「詳細設定」セクションで、LiteLLM Proxyのインスタンスを指すように、API（Whisperおよび翻訳）の**両方のURL**を変更。**両者に同じ基本URLを使用してください。**
    *   LiteLLMによるリクエストのログ記録を無効にする場合は、「NoLog (LiteLLMのみ)」オプションにチェックを入れる。

## 🚀 LiteLLM Proxyとの併用

OpenAI以外の言語モデルを使用したい場合は、LiteLLM Proxyを利用できます。設定方法は以下の通りです：

Babel Fish AIは、OpenAIと互換性のあるAPIを介して代替の言語モデルを使用可能にする[LiteLLM Proxy](https://litellm.ai/)に対応しています。

### 設定

1.  **LiteLLM Proxyをインストールして設定：** LiteLLMのサイトの手順に従ってください。
2.  **Babel Fish AI拡張機能の設定：**
    *   拡張機能のオプション（アイコンを右クリック > オプション）で「エキスパートモード」を有効にしてください。
    *   「詳細設定」のセクションで、LiteLLM Proxyのインスタンスを指すように、API（Whisperおよび翻訳）の**両方のURL**を変更（例：`http://localhost:4000/v1/audio/transcriptions` および `http://localhost:4000/v1/chat/completions`）。**両者に同じ基本URLを使用してください。**
    *   LiteLLMによるリクエストのログ記録を無効にする場合は、「NoLog (LiteLLMのみ)」オプションにチェックを入れる。

**重要：** 「NoLog」オプションは、LiteLLM Proxyと併用する場合に**専用**で使用するよう設計されています。OpenAIの公式APIを使用している場合は**有効にしないでください**。有効にするとエラーが発生し、翻訳が機能しなくなります。

## 🛠️ 技術的な動作

### 拡張機能のアーキテクチャ

この拡張機能は、相互に連携する複数のJavaScriptファイルで構成されています：

*   **`manifest.json`:** 拡張機能の主要な設定ファイルです。権限、スクリプト、アクセス可能なリソースなどを定義します。マニフェストのバージョン3を使用し、`activeTab`、`storage`、`commands`、および`scripting`の権限を宣言しています。`content_scripts`はすべてのURLに注入され、ドキュメントの読み込み完了時に実行されます。
*   **`background.js`:** バックグラウンドで実行されるサービスワーカーです。イベント（アイコンのクリック、ショートカットキーなど）を管理し、必要に応じて`content script`を注入し、`content script`と通信します。
*   **`content.js`:** Webページに注入されるスクリプトです。DOMと直接連携し、マイクからオーディオをキャプチャ、転写および翻訳APIを呼び出し、結果を表示します。
*   **`src/utils/api.js`:** OpenAIのWhisper APIにオーディオを送信し、転写を行うための`transcribeAudio`関数を含みます。
*   **`src/utils/translation.js`:** OpenAIのGPT APIに転写されたテキストを送信し、翻訳を行うための`translateText`関数を含みます。
*   **`src/utils/ui.js`:** ユーザーインターフェース（バナー、ダイアログボックス、コピー用ボタンなど）を管理するためのユーティリティ関数を含みます。
*   **`src/constants.js`:** 設定、状態、アクションなどの定数を定義します。
*   **`src/pages/options/`:** 拡張機能のオプションページ用のファイル（HTML、CSS、JavaScript）が含まれています。

### 転写と翻訳のプロセス

1.  **録音の開始：** ユーザーは拡張機能のアイコンをクリックするかショートカットキーを使用して録音を開始します。`background script`が`content script`に録音開始のメッセージを送信します。
2.  **オーディオのキャプチャ：** `content script`は`navigator.mediaDevices.getUserMedia` APIを使用してマイクにアクセスし、オーディオを録音します。
3.  **転写：** `content script`は`src/utils/api.js`内の`transcribeAudio`関数を使用し、オーディオをOpenAIのWhisper APIに送信します。APIは転写されたテキストを返します。
4.  **翻訳（オプション）：** 翻訳オプションが有効な場合、`content script`は`src/utils/translation.js`内の`translateText`関数を使用して、転写されたテキストをOpenAIのGPT APIに送信します。APIは翻訳されたテキストを返します。
5.  **表示：** `content script`は、転写（および必要に応じて翻訳された）テキストを、ページ上のアクティブな要素（テキストフィールドまたは編集可能な要素）に表示するか、ダイアログボックスに表示します。

### 通信

`background script`と`content script`間の通信は、ChromeのメッセージングAPI（`chrome.runtime.sendMessage`および`chrome.runtime.onMessage`）を介して行われます。

### データの保存

拡張機能は`chrome.storage.sync`を使用して、以下のデータを保存します：

*   OpenAI APIキー（`apiKey`）。
*   拡張機能のオプション（表示、翻訳、ステータスバーのカラー設定など）。

これらのデータは、Chrome拡張機能のストレージ内にローカルで保存されます。

### エラー管理
可能なエラー（APIキーの不備、転写エラーなど）は`constants.js`で定義されています。`api.js`と`translation.js`の各関数は、API呼び出し時の潜在的なエラーを管理します。`content.js`は、ページ上部にバナーを表示してユーザーにエラーメッセージを提示します。

## 🛡️ セキュリティとプライバシー

- **データ保護：**
  - APIキーはChrome内で安全に保存されます。
  - 拡張機能はオーディオデータを保持せず、すべての処理はリアルタイムで行われます。
  - APIとの通信はHTTPSによる安全な接続を介して行われます。

BabelFishAIがあなたのデータをどのように管理しているかの詳細については、弊社の[プライバシーポリシー](PRIVACY.md)をご確認ください。

## 🔧 トラブルシューティング

- **マイクの問題：**
  - Chromeでのマイクアクセス権限を確認してください。
  - 他のアプリケーションが同時にマイクを使用していないことを確認してください。

- **転写/翻訳エラー：**
  - APIキーが有効でアクティブであることを確認してください。
  - 安定したインターネット接続があることを確認してください。
  - エラー発生時はChromeのコンソールで詳細なログを確認してください。

## 🤝 貢献

貢献や提案は大歓迎です。貢献するには：
- GitHubのIssuesセクションでバグを報告してください。
- 改善案や新機能を提案してください。
- プルリクエストを送信してください。

## 📄 ライセンス

この拡張機能はGNU Affero General Public License v3.0 (AGPL-3.0)の下で配布されています。詳細はLICENSEファイルをご確認ください。

## 💝 サポート

この拡張機能を気に入っていただけましたら、[PayPal](https://paypal.me/jls)を通じて開発を支援してください。
---
jls42.orgによって情熱と革新をもって開発されたBabel Fish AIは、最先端の人工知能により、音声転写と翻訳を新たな次元へと押し上げます。

**この文書は、fr 版から ja 言語に o3-mini モデルを使用して翻訳されました。翻訳プロセスの詳細については、https://gitlab.com/jls42/ai-powered-markdown-translator をご覧ください。**

