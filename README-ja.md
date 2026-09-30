**gpt-5.6-solを使用してフランス語から日本語に翻訳された記事。**

# Babel Fish AI - AIによる音声文字起こし・翻訳拡張機能

<img src="images/icon128.png" alt="Babel Fish AI アイコン" width="128" height="128">

**公式サイト：[babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 アラビア語](README-ar.md) | [🇩🇪 ドイツ語](README-de.md) | [🇺🇸 英語](README-en.md) | [🇪🇸 スペイン語](README-es.md) | [🇮🇳 ヒンディー語](README-hi.md) | [🇮🇹 イタリア語](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 韓国語](README-ko.md) | [🇳🇱 オランダ語](README-nl.md) | [🇵🇱 ポーランド語](README-pl.md) | [🇵🇹 ポルトガル語](README-pt.md) | [🇷🇴 ルーマニア語](README-ro.md) | [🇸🇪 スウェーデン語](README-sv.md) | [🇨🇳 中国語](README-zh.md)

**この拡張機能を使用するには、対応するプロバイダーのいずれかのAPIキーが必要です：**

|                            プロバイダー                            | APIキーの取得方法                                                                                |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**：[console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**：[platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
|   <img src="images/gemini-logo.png" alt="Gemini" height="30">    | **Gemini (Google)**：[aistudio.google.com/apikey](https://aistudio.google.com/apikey)            |
|                                🚅                                | **Custom/LiteLLM**：独自のAPIエンドポイントを使用する場合                                      |

Babel Fish AIは、複数プロバイダーに対応した強力な音声文字起こし機能を提供する、革新的なブラウザー拡張機能です。Mistral AI（Voxtral）、OpenAI（gpt-transcribe、Whisper）、またはGemini（Gemini 3.5 Transcribe）の文字起こしAPIにより、音声を非常に高い精度でテキストに変換し、必要に応じてリアルタイムの自動翻訳も利用できます。Babel Fish AIを文字起こし専用として使用することも、必要に応じて即時翻訳を有効にすることもできます。

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy バッジ](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![品質ゲートの状態](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![セキュリティ評価](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![保守性評価](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![脆弱性](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![コードの問題](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![技術的負債](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![コード行数](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 機能

-   **高度な音声文字起こし**

    -   デバイスのマイクを介した高品質な音声キャプチャ。
    -   Voxtral（Mistral AI）、gpt-transcribeおよびWhisper（OpenAI）、またはGemini 3.5 Transcribe（Google）のAPIによる高精度な文字起こし。
    -   複数プロバイダーに対応：Mistral AI、OpenAI、Gemini、またはカスタムエンドポイントから自由に選択できます。
    -   音声認識とテキスト表示の多言語対応により、さまざまな言語の音声入力を文字起こしし、結果（文字起こし、および有効な場合は翻訳）を選択した言語で表示できます。
    -   アクティブな入力欄へのテキストの自動挿入、または専用ダイアログへの表示。

-   **インテリジェントな翻訳と文章改善**

    -   必要に応じて有効にできる、文字起こし結果のさまざまな言語への即時翻訳。
    -   文体と明瞭さを向上させるための文章改善。
    -   原文の意味に忠実な翻訳を実現する高度なAIモデルの使用。
    -   文字起こしのみを使用するか、文字起こしと翻訳を組み合わせるかを自由に選択できます。

-   **強力なコンテキストメニュー**

    -   選択したテキストを即座に改善する「選択範囲を改善」オプション。
    -   利用可能なすべての言語を含むサブメニュー付きの「選択範囲を翻訳」オプション。
    -   スペル、文法、句読点の誤りを修正する「スペルを修正」オプション。
    -   選択したテキストを、翻訳、改善、または修正された版に直接置換。
    -   ブラウザー標準のユーザーインターフェースに完全に統合。

-   **直感的でカスタマイズ可能なユーザーインターフェース**

    -   柔軟な表示モード：アクティブな入力欄またはフローティングダイアログ。
    -   色、不透明度、表示時間を選択できる設定可能なステータスバナー。
    -   録音を開始・停止するキーボードショートカット（Ctrl+Shift+1、Macでは⌘+Shift+1）。
    -   Firefoxでは、ページエディターがキーの組み合わせを奪うサイト（ChatGPT、Notionなど）向けの「優先ショートカット」を提供：インストール時から有効で、オプションから無効にできます（[PRIVACY.md](PRIVACY.md)を参照）。
    -   結果の表示時間を制御する「開いたままにする」オプション。
    -   マイクと数字の「42」を組み込んだ、すぐに識別できるカスタムアイコン。

-   **高度なオプション**
    -   最大限の柔軟性を実現する、Mistral AI、OpenAI、Gemini、Custom/LiteLLMへの複数プロバイダー対応。
    -   プロバイダーごとに文字起こしモデルと翻訳モデルをカスタマイズ可能。
    -   利用可能なOpenAIモデル：GPT-4o mini（デフォルト）、GPT-4.1（mini/standard）、**GPT-5.4（nano/mini/standard）**、および**GPT-5.6（luna/terra/sol）**。文字起こし：**gpt-transcribe**（デフォルト）、whisper-1、gpt-4o-mini-transcribe、gpt-4o-transcribe。OpenAIは後者3つを2027年2月26日にAPIから廃止しますが、それまでの間、オプションですでに選択されているモデルは引き続き使用されます。
    -   利用可能なMistralモデル：Mistral Small（デフォルト）、Mistral Medium、Mistral Large、Codestral、および**Ministral 3（3B/8B/14B）**。文字起こし：Voxtral Mini。推論を行うMistralモデルの応答（思考ブロック）にも対応しています。
    -   利用可能なGeminiモデル：**Gemini 3.8 Flash**（デフォルト。1～2秒で応答するよう推論を抑制）および**Gemini 3.5 Flash-Lite**（最速）。文字起こし：GoogleのInteractions APIを介した**Gemini 3.5 Transcribe**。このAPIの履歴に音声入力を保存しません（`store: false`、[docs/providers/gemini.md](docs/providers/gemini.md)を参照）。
    -   gpt-4.1-nano（OpenAI APIは2026年10月23日に終了）またはgpt-4oを使用していた設定は、更新時にそれぞれgpt-5.6-lunaとgpt-4.1へ自動的に移行します。
    -   文字起こしと翻訳・文章改善に使用するプロバイダーを個別に選択可能。
    -   Customプロバイダー経由でLiteLLM Proxyと互換性があり、代替モデルに接続できます。
    -   言語ファイル（\_locales）による完全な国際化対応で、多言語のインターフェースと音声サポートを提供。

## 🌐 対応言語

Babel Fish AIが対応している言語と、デモ動画へのリンクは以下のとおりです：

-   [アラビア語](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [ドイツ語](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [英語](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [スペイン語](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [フランス語](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [ヒンディー語](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [イタリア語](https://www.youtube.com/watch?v=QgYZt8myods)
-   [日本語](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [韓国語](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [オランダ語](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [ポーランド語](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [ポルトガル語](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [ルーマニア語](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [スウェーデン語](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [中国語](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 インストール

### Chrome

1.  **ダウンロードとインストール：**

    -   GitHubからこのリポジトリをクローンするか、拡張機能のフォルダーを手動でダウンロードします。
    -   **または、[Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)から拡張機能を直接インストールします**
    -   Chromeを開き、`chrome://extensions/`にアクセスします。
    -   右上の「デベロッパーモード」を有効にします。
    -   「パッケージ化されていない拡張機能を読み込む」をクリックし、Babel Fish AIのフォルダーを選択します。

2.  **確認：**
    -   カスタムアイコンとともに、拡張機能がブラウザーのツールバーに表示されていることを確認します。

### Firefox

1.  **ダウンロードとインストール：**

    -   バージョン1.2.0以降では、デスクトップ版の**Firefox 140以降**が必要です。インストール時、および1.2.0への更新時に、設定したプロバイダーへ拡張機能が送信するデータ（音声、選択または音声入力したテキスト、APIキー）がFirefoxに表示されます（[PRIVACY.md](PRIVACY.md)を参照）。
    -   **[Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)から拡張機能を直接インストールします**
    -   または手動でインストールする場合：GitHubからこのリポジトリをクローンし、`./scripts/build.sh firefox`を実行します。これにより、Firefox用manifestの名前を`manifest.json`に変更した`dist/firefox/`が準備されます。
    -   Firefoxを開き、`about:debugging#/runtime/this-firefox`にアクセスします（署名済み拡張機能専用の`about:addons`にある「ファイルからアドオンをインストール」ではありません）。
    -   「一時的なアドオンを読み込む...」をクリックします。
    -   `dist/firefox/manifest.json`ファイルを選択します。

2.  **確認：**
    -   カスタムアイコンとともに、拡張機能がFirefoxのツールバーに表示されていることを確認します。

## ⚙️ 設定

1.  **AIプロバイダーの設定：**

    -   拡張機能のアイコンをクリックしてオプションにアクセスします。
    -   ドロップダウンメニューからプロバイダー（Mistral AI、OpenAI、Gemini、またはCustom/LiteLLM）を選択します。
    -   APIキーを入力します：
        -   **Mistral AI**：[console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)で取得できます
        -   **OpenAI**：[platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)で取得できます
        -   **Gemini**：[aistudio.google.com/apikey](https://aistudio.google.com/apikey)で取得できます。課金が有効なプロジェクトのキーを推奨します。無料キーを使用していて、欧州経済領域、スイス、英国以外にいる場合、Googleは製品の改善のために音声入力や送信されたテキストを利用することがあり、人間による確認が行われる可能性もあります。個人情報、機密情報、または取り扱いに注意が必要な情報は送信しないでください。キーの制限先はGemini API（新しいキーのデフォルト設定）にし、ウェブサイトには決して制限しないでください。Chromeでは、音声入力を行っているページからリクエストが送信されます。
    -   ドロップダウンメニューの横にあるトグルでプロバイダーを有効にします。

2.  **オプションのカスタマイズ：**

    -   表示モード（アクティブな入力欄またはダイアログ）を選択します。
    -   ステータスバナーの色、不透明度、表示時間を設定します。
    -   文字起こし（音声入力）とテキスト表示に使用する言語を選択します。
    -   必要に応じて翻訳機能を有効または無効にします。

3.  **（任意）モデルの詳細設定：**

    -   各プロバイダーのオプションで「モデル設定」をクリックし、使用するモデルをカスタマイズします。
    -   文字起こしと翻訳・文章改善用のカスタムモデルを追加できます。
    -   複数のプロバイダーが有効な場合、サービス（文字起こしと翻訳）ごとに使用するプロバイダーを選択できます。

4.  **複数の同期済みデバイス：**
    -   すべてのデバイスで拡張機能を更新してください。1.2.0より前のバージョンはGeminiを認識しないため、Geminiが選択されている場合は、有効になっている以前のプロバイダーを使用するか、何も送信しません。
    -   新しいバージョンの拡張機能が、現在のバージョンではまだ認識できないプロバイダーを保存している場合、オプションページの「新しいバージョンのプロバイダー」セクションにその旨が表示され、すべてのデバイスからその設定を削除するためのボタンが表示されます。
    -   ブラウザーがオプションの保存を拒否した場合（値が長すぎる場合など）、ページには「オプションを保存しました！」ではなくエラーが表示され、何も保存されません。

## 🚀 LiteLLM Proxyまたはカスタムエンドポイントでの使用

Babel Fish AIは、[LiteLLM Proxy](https://litellm.ai/)およびその他のOpenAI互換APIプロキシに対応しており、代替の言語モデルを使用できます。

### 設定

1.  **プロキシをインストールして設定します：** 使用するサービス（LiteLLMなど）の手順に従ってください。
2.  **Babel Fish AI拡張機能を設定します：**
    -   拡張機能のオプションで、ドロップダウンメニューから**Custom/LiteLLM**プロバイダーを選択します。
    -   APIキーを入力します（必要な場合）。
    -   APIのURLを設定します：
        -   **文字起こしURL**：例 `http://localhost:4000/v1/audio/transcriptions`
        -   **チャットURL**：例 `http://localhost:4000/v1/chat/completions`
    -   トグルでプロバイダーを有効にします。
    -   LiteLLMによるリクエストのログ記録を無効にする場合は、**「NoLog」**オプションをオンにします。

**重要：**「NoLog」オプションは、Custom/LiteLLMプロバイダーで**のみ**利用できます。OpenAI、Mistral AI、Geminiの公式APIとは互換性がありません。

## 🛠️ 技術的な仕組み

### 拡張機能のアーキテクチャ

この拡張機能は、相互に連携する複数のJavaScriptファイルで構成されています：

#### 主要ファイル

-   **`manifest.json`：** 拡張機能の主要な設定ファイルです。権限、スクリプト、アクセス可能なリソースなどを定義します。manifestバージョン3を使用し、`activeTab`、`storage`、`commands`、`scripting`、`contextMenus`の権限を宣言します。
-   **`background.js`：** バックグラウンドで実行されるservice workerです。イベント（アイコンのクリック、キーボードショートカット、コンテキストメニュー）を処理し、必要に応じて`content script`を挿入し、`content script`と通信します。
-   **`content.js`：** ウェブページに挿入されるメインスクリプトです。各ユーティリティーモジュールを調整し、拡張機能全体の処理フローを管理します。
-   **`src/constants.js`：** 設定、状態、アクションなどの定数を定義します。

#### ユーティリティーモジュール

この拡張機能は、複数の専用ユーティリティーファイルによるモジュール式アーキテクチャを使用しています：

##### プロバイダーとAPIの管理

-   **`src/utils/providers.js`：** AIプロバイダー（Mistral AI、OpenAI、Gemini、Custom/LiteLLM）と、その設定、モデル、デフォルトURLのレジストリーです。
-   **`src/utils/provider-store.js`：** ストレージからプロバイダー設定を読み取り、APIキーがそのプロバイダーのアドレスにのみ送信されることを確認します。
-   **`src/utils/provider-adapters.js`：** プロバイダーのAPI形式：認証、リクエスト本文、応答とエラーの読み取り。
-   **`src/utils/api-utils.js`：** 外部APIとの通信、複数プロバイダー設定の解決、音声文字起こしを行う関数です。
-   **`src/utils/text-processing.js`：** 翻訳、文章改善、スペル修正など、テキスト処理を行う関数です。

##### ユーザーインターフェースと操作

-   **`src/utils/ui.js`：** ユーザーインターフェース用の汎用ユーティリティー関数です。
-   **`src/utils/banner-utils.js`：** ステータスバナー、そのコントロール、言語セレクターを管理します。
-   **`src/utils/focus-utils.js`：** フォーカスとテキスト選択範囲の保存および復元を管理します。
-   **`src/utils/transcription-display.js`：** 文字起こし結果の表示を管理します。
-   **`src/utils/error-utils.js`：** エラーの表示と処理を管理します。
-   **`src/styles/content.css`：** ウェブページに挿入されるユーザーインターフェース用のCSSスタイルです。

##### 録音とイベント

-   **`src/utils/recording-utils.js`：** マイクによる音声録音と音声データの処理を管理します。
-   **`src/utils/event-handlers.js`：** ユーザー操作用のイベントハンドラーを含みます。

##### 国際化と言語

-   **`src/utils/languages.js`：** 拡張機能が対応する言語を定義します。
-   **`src/utils/languages-shared.js`：** ウェブページのコンテキストで対応する言語の一覧を定義します。
-   **`src/utils/languages-data.js`：** service workerで対応する言語の一覧を定義します。
-   **`src/utils/i18n.js`：** ユーザーインターフェースの国際化を管理します。

##### オプションページ

-   **`src/pages/options/`：** 拡張機能のオプションページ用ファイル（HTML、CSS、JavaScript）を含みます。
### 文字起こしと翻訳のプロセス

#### 音声文字起こしの主要機能

1.  **録音の開始：** ユーザーは、拡張機能のアイコンをクリックするか、キーボードショートカット（Ctrl+Shift+1、Macでは⌘+Shift+1）を使用して録音を開始します。`background script` は録音を開始するために `content script` へメッセージを送信します。
2.  **音声の取得：** `content script` は `navigator.mediaDevices.getUserMedia` APIを使用してマイクにアクセスし、MediaRecorder APIを介して音声を録音します。
3.  **文字起こし：** `content script` は関数 `transcribeAudio`（`src/utils/api-utils.js`）を使用して、設定されたproviderの文字起こしAPI（Mistral AIではVoxtral、OpenAIではgpt-transcribeまたはWhisper、GeminiではGemini 3.5 Transcribe）へ音声を送信します。APIは文字起こしされたテキストを返します。
4.  **翻訳または文章の改善（任意）：**

-   翻訳オプションが有効な場合、`content script` は関数 `translateText`（`src/utils/text-processing.js`）を使用して、文字起こしされたテキストを設定済みproviderのチャットAPIへ送信します。
-   文章の改善オプションが有効な場合、文字起こしされたテキストを改善するために関数 `rephraseText` が使用されます。

5.  **表示：** `content script` は、処理済みのテキストをページ上のアクティブな要素（テキストフィールドまたは編集可能な要素の場合）か、カスタムダイアログボックスに表示します。

#### コンテキストメニュー機能

1. **テキストの選択：** ユーザーがウェブページ上のテキストを選択します。
2. **コンテキストメニュー：** 右クリックすると次のオプションが表示されます：
    - スタイルと明瞭さを改善する「選択範囲の文章を改善」
    - 利用可能な言語のサブメニューを備えた「選択範囲を翻訳」
    - 誤字を修正する「スペルを修正」
3. **処理：** 選択したオプションに応じて：
    - 関数 `rephraseText` を介して、文章の改善のためにテキストが送信されます
    - 選択された対象言語とともに、関数 `translateText` を介して翻訳のためにテキストが送信されます
    - 関数 `correctText` を介して、修正のためにテキストが送信されます
4. **表示：** 結果が、選択されたテキストのある要素内の元の選択範囲を置き換えます。

### 通信

`background script` と `content script` の間の通信は、ChromeのメッセージングAPI（`chrome.runtime.sendMessage` および `chrome.runtime.onMessage`）を介して行われます。

### データの保存

拡張機能は、次の情報を保存するために `chrome.storage.sync` を使用します：

-   AI providerの設定（APIキー、選択したモデル、カスタムURL）。1.2.0で追加されたGeminiには専用のストレージキー（`extraProvider.gemini`）があり、以前のバージョンでは無視されます。
-   拡張機能のオプション（表示、翻訳、バナーの色など）。
-   翻訳に使用する言語設定。

これらのデータは、お使いのコンピューター上にあるブラウザー拡張機能のストレージへローカルに保存されます。

### エラー処理

発生する可能性のあるエラー（APIキーの欠落、文字起こしエラーなど）は、ファイル `constants.js` で定義されています。関数 `api-utils.js` と `text-processing.js` は、API呼び出しで発生する可能性のあるエラーを、HTTPコードに応じた改善済みのメッセージとともに処理します。`content.js` は、ページ下部のバナーを介してユーザーにエラーメッセージを表示します。

## 🛡️ セキュリティとプライバシー

-   **データ保護：**
    -   APIキーはブラウザー内に安全に保存されます。
    -   拡張機能は音声データを保持せず、すべての処理はリアルタイムで行われます。
    -   APIとの通信には、安全なHTTPS接続が使用されます。

BabelFishAIによるデータの取り扱い方法について詳しくは、[プライバシーポリシー](PRIVACY.md)をご覧ください。

## 🔧 トラブルシューティング

-   **マイクの問題：**

    -   ブラウザーのマイクへのアクセス権限を確認してください。
    -   他のアプリケーションが同時にマイクを使用していないことを確認してください。

-   **文字起こし・翻訳エラー：**
    -   APIキーが有効で、使用可能な状態であることを確認してください。
    -   安定したインターネット接続があることを確認してください。
    -   エラー発生時に詳細なログを確認するには、ブラウザーのコンソールを参照してください。

## 🤝 コントリビューション

コントリビューションやご提案を歓迎します。貢献するには：

-   GitHubのIssuesセクションからバグを報告してください。
-   改善案や新機能をご提案ください。
-   pull requestを送信してください。

## 📄 ライセンス

この拡張機能は、GNU Affero General Public License v3.0（AGPL-3.0）のもとで配布されています。詳しくはLICENSEファイルをご覧ください。

## 💝 支援

## この拡張機能を気に入っていただけた場合は、[PayPal](https://paypal.me/jls)から寄付して開発を支援できます。

情熱と革新をもってjls42.orgによって開発されたBabel Fish AIは、最先端の人工知能によって文字起こしと翻訳を新たな地平へと導きます。
