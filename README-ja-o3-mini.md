# Babel Fish AI - 音声文字起こし＆翻訳拡張

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**この拡張機能を使用するには、OpenAI の API キー（または LiteLLM Proxy を使用する場合はサードパーティのプロバイダー）が必要です。OpenAI の API キーはここで生成できます : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI は、元々強力な音声文字起こしを提供するために設計された革新的な Chrome 拡張機能です。OpenAI の Whisper API により、あなたの声を驚くほど正確にテキストへ変換し、さらにオプションでリアルタイムの自動翻訳を利用することができます。Babel Fish AI は、音声文字起こし専用としても、必要に応じて逐次翻訳を有効にして使用することも可能です。

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 機能

- **高度な音声文字起こし**
  - デバイスのマイクを通じて高品質な音声をキャプチャ。
  - OpenAI の Whisper API によって実現される正確な文字起こし。
  - 音声認識とテキスト表示のための多言語対応により、さまざまな言語の音声入力を文字起こしし、結果（文字起こしおよび翻訳が有効な場合）を選択した言語で表示可能。
  - アクティブな入力欄へ自動的にテキストを挿入するか、専用のダイアログボックスに表示。

- **インテリジェントな翻訳と言い換え**
  - 必要に応じて、有効化できるさまざまな言語への即時翻訳。
  - テキストのスタイルと明瞭性を向上させるための言い換え。
  - 元の意味に忠実な翻訳を保証するために、高度な AI モデルを利用。
  - 文字起こしのみの使用か、文字起こしと翻訳の組み合わせの自由な選択が可能。

- **強力なコンテキストメニュー**
  - 選択したテキストを即座に改善する「選択範囲の言い換え」オプション。
  - 利用可能なすべての言語のサブメニューを持つ「選択範囲の翻訳」オプション。
  - 選択したテキストを、翻訳または言い換えたバージョンに直接置換。
  - Chrome のネイティブなユーザーインターフェイスに完璧に統合。

- **直感的かつカスタマイズ可能なユーザーインターフェイス**
  - 柔軟な表示モード：アクティブな入力領域またはフローティングダイアログウィンドウ。
  - 色、透明度、表示時間を選択できるステータスバー。
  - 録音開始/停止用のキーボードショートカット（Ctrl+Shift+1 または Mac では ⌘+Shift+1）。
  - 結果の表示時間を制御する「常に表示」オプション。
  - すぐに認識できるように、マイクと数字の「42」を組み合わせたカスタムアイコン。

- **高度なオプション**
    - 詳細な設定が可能なエキスパートモード（API の URL、ドメインごとの設定など）。
    - 文字起こしや翻訳のモデルをカスタマイズする機能。
    - 代替の言語モデルに接続し、リクエストのログ記録を無効にするための LiteLLM Proxy との互換性。
    - 多言語インターフェイスと音声サポートを提供する _locales ファイルによる国際化の完全な管理。

## 🌐 サポートされている言語

以下は、Babel Fish AI でサポートされている言語とデモンストレーション動画へのリンクです：

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
    - GitHub からこのリポジトリをクローンするか、拡張機能のフォルダを手動でダウンロードしてください。
    - **または、[Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk) から直接拡張機能をインストールしてください**
    - Chrome を開いて、`chrome://extensions/` にアクセスします。
    - 画面右上の「デベロッパーモード」を有効にします。
    - 「パッケージ化されていない拡張機能を読み込む」をクリックし、Babel Fish AI のフォルダを選択します。

2.  **確認：**
    - Chrome のツールバーにカスタムアイコン付きで拡張機能が表示されていることを確認してください。

## ⚙️ 設定

1.  **OpenAI API キー：**
    *   拡張機能のアイコンをクリックしてオプションにアクセスします。
    *   OpenAI の API キーを入力してください（[platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) で入手可能）。

2.  **オプションのカスタマイズ：**
    *   表示モード（アクティブな入力領域またはダイアログボックス）を選択。
    *   ステータスバーの色、透明度、表示時間を設定。
    *   文字起こし（音声入力）とテキスト表示用の言語を選択。
    *   必要に応じて翻訳機能を有効または無効に設定。

3.  **（オプション） LiteLLM Proxy の利用：**
    *   オプションで「エキスパートモード」を有効にします。
    *   「高度な設定」セクションで、LiteLLM Proxy インスタンスを指すように **両方の API（Whisper と翻訳）の URL** を変更します。**両方に同じベース URL を使用してください。**
    *   LiteLLM によるリクエストのログ記録を無効にする場合は、"NoLog (LiteLLM のみ)" オプションにチェックを入れます。

## 🚀 LiteLLM Proxy を使った利用

OpenAI 以外の言語モデルを使用したい場合は、LiteLLM Proxy を利用できます。設定方法は以下の通りです：

Babel Fish AI は、OpenAI と互換性のある API を使用する代替の言語モデルに接続できる [LiteLLM Proxy](https://litellm.ai/) と互換性があります。

### 設定

1.  **LiteLLM Proxy をインストールして設定：** LiteLLM のサイトの指示に従ってください。
2.  **Babel Fish AI 拡張機能の設定：**
    *   拡張機能のオプション（アイコンを右クリック > オプション）で「エキスパートモード」を有効にします。
    *   「高度な設定」セクションで、LiteLLM Proxy インスタンスを指すように **両方の API（Whisper と翻訳）の URL** を変更します（例: `http://localhost:4000/v1/audio/transcriptions` および `http://localhost:4000/v1/chat/completions`）。**両方に同じベース URL を使用してください。**
    *   LiteLLM によるリクエストのログ記録を無効にする場合は、"NoLog (LiteLLM のみ)" オプションにチェックを入れます。

**重要：** "NoLog" オプションは LiteLLM Proxy のみで使用するために設計されています。OpenAI の公式 API を使用している場合は**有効にしないでください**。有効にするとエラーが発生し、翻訳が機能しなくなります。

## 🛠️ 技術的な動作

### 拡張機能のアーキテクチャ

この拡張機能は、相互に連携する複数の JavaScript ファイルで構成されています：

*   **`manifest.json`:** 拡張機能の主な設定ファイルです。ここでは、パーミッション、スクリプト、アクセス可能なリソースなどが定義されています。マニフェストのバージョン 3 を使用し、`activeTab`、`storage`、`commands`、`scripting`、`contextMenus` のパーミッションを宣言しています。`web_accessible_resources` により、各実行コンテキストで拡張機能のリソースへのアクセスが可能になります。
*   **`background.js`:** バックグラウンドで実行されるサービスワーカーです。拡張機能のアイコンのクリック、キーボードショートカット、コンテキストメニューなどのイベントを管理し、必要に応じて `content script` をインジェクトし、`content script` と通信します。
*   **`content.js`:** ウェブページにインジェクトされるスクリプトです。DOM と直接連携し、マイクから音声をキャプチャ、文字起こしおよび翻訳用の API を呼び出し、結果を表示します。
*   **`src/utils/api.js`:** API と連携するための関数を含み、特に OpenAI の Whisper API（文字起こし）を呼び出すための `transcribeAudio` や、ストレージ管理用のユーティリティ関数を含みます。
*   **`src/utils/translation.js`:** OpenAI の GPT API（翻訳と言い換え）を呼び出すための `translateText` および `rephraseText` 関数を含みます。
*   **`src/utils/ui.js`:** バナー、ダイアログボックス、コピー用ボタンなど、ユーザーインターフェイスを管理するユーティリティ関数を含みます。
*   **`src/utils/languages-shared.js` および `src/utils/languages-data.js`:** ウェブページのコンテキストとサービスワーカーのために、それぞれサポートされている言語の集中管理リストを定義します。
*   **`src/utils/i18n.js`:** ユーザーインターフェイスの国際化を管理します。
*   **`src/constants.js`:** 設定、状態、アクションなどの定数を定義します。
*   **`src/pages/options/`:** 拡張機能のオプションページ用の HTML、CSS、JavaScript ファイルが含まれています。

### 文字起こしと翻訳のプロセス

#### 音声文字起こしの主要機能

1.  **録音の開始：** ユーザーは、拡張機能のアイコンをクリックするか、キーボードショートカット（Ctrl+Shift+1 または Mac では ⌘+Shift+1）を使用して録音を開始します。`background script` は `content script` にメッセージを送信し、録音を開始させます。
2.  **音声のキャプチャ：** `content script` は、`navigator.mediaDevices.getUserMedia` API を使用してマイクにアクセスし、MediaRecorder API を通じて音声を録音します。
3.  **文字起こし：** `content script` は、`src/utils/api.js` の `transcribeAudio` 関数を使用して、音声を OpenAI の Whisper API に送信し、API から返された文字起こしテキストを受け取ります。
4.  **翻訳または言い換え（オプション）：** 
   - 翻訳オプションが有効な場合、`content script` は `src/utils/translation.js` の `translateText` 関数を使用して、文字起こしテキストを OpenAI の GPT API に送信します。
   - 言い換えオプションが有効な場合、`rephraseText` 関数を用いて、文字起こしテキストの改善を行います。
5.  **表示：** `content script` は、処理されたテキストを、テキスト入力フィールドや編集可能な要素の場合はその要素に、またはカスタムダイアログボックスに表示します。

#### コンテキストメニュー機能

1. **テキストの選択：** ユーザーがウェブページ上でテキストを選択します。
2. **コンテキストメニュー：** 右クリックすると、「選択範囲の言い換え」または「選択範囲の翻訳」オプションが、利用可能な言語のサブメニュー付きで表示されます。
3. **処理：** 選択されたオプションに応じて、
   - `rephraseText` 関数を使ってテキストが言い換え処理され、
   - または、選択された対象言語を指定して `translateText` 関数で翻訳されます。
4. **表示：** 結果は、選択されていた元のテキスト要素に置換されます。

### コミュニケーション

`background script` と `content script` 間の通信は、Chrome のメッセージング API（`chrome.runtime.sendMessage` および `chrome.runtime.onMessage`）を介して行われます。

### データの保存

拡張機能は、`chrome.storage.sync` を利用して以下のデータを保存します：

*   OpenAI の API キー（`apiKey`）。
*   拡張機能のオプション（表示、翻訳、ステータスバーの色など）。
*   翻訳用の言語設定。

これらのデータは、Chrome の拡張機能ストレージ内にローカルで保存されます。

### エラーの管理

API キーの欠如、文字起こしのエラーなどの可能なエラーは、`constants.js` で定義されています。`api.js` と `translation.js` の関数は、API 呼び出し時の潜在的なエラーを管理します。`content.js` は、エラーメッセージをページ上部のバナーを通してユーザーに表示します。

## 🛡️ セキュリティとプライバシー

- **データ保護：**
  - API キーは Chrome 内で安全に保存されます。
  - 拡張機能は音声データを保持せず、すべての処理はリアルタイムで行われます。
  - API との通信は安全な HTTPS 接続を通じて行われます。

BabelFishAI がどのようにあなたのデータを取り扱うかの詳細については、当社の [プライバシーポリシー](PRIVACY.md) をご参照ください。

## 🔧 トラブルシューティング

- **マイクの問題：**
  - Chrome のマイクアクセス許可を確認してください。
  - 他のアプリケーションが同時にマイクを使用していないか確認してください。

- **文字起こし/翻訳エラー：**
  - API キーが有効でアクティブであることを確認してください。
  - 安定したインターネット接続があるか確認してください。
  - エラー発生時は、詳細なログを取得するために Chrome のコンソールを確認してください。

## 🤝 コントリビューション

貢献や提案は大歓迎です。貢献するには：
- GitHub の Issues セクションでバグを報告。
- 改善点や新機能の提案。
- プルリクエストの送信。

## 📄 ライセンス

この拡張機能は GNU Affero General Public License v3.0 (AGPL-3.0) の下で配布されています。詳細は LICENSE ファイルを参照してください。

## 💝 支援

この拡張機能を気に入っていただけた場合は、[PayPal](https://paypal.me/jls) を通じて開発を支援してください。
---
情熱と革新を持って jls42.org によって開発された Babel Fish AI は、最先端の人工知能によって音声文字起こしと翻訳を新たな高みへと推進します。

**この文書は、frバージョンからja言語にo3-miniモデルを使用して翻訳されました。翻訳プロセスの詳細については、https://gitlab.com/jls42/ai-powered-markdown-translator をご覧ください。**

