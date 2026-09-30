**gpt-5.6-sol을 사용하여 프랑스어에서 한국어로 번역된 기사.**

# Babel Fish AI - AI 기반 음성 전사 및 번역 확장 프로그램

<img src="images/icon128.png" alt="Babel Fish AI 아이콘" width="128" height="128">

**공식 사이트: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 아랍어](README-ar.md) | [🇩🇪 독일어](README-de.md) | [🇺🇸 영어](README-en.md) | [🇪🇸 스페인어](README-es.md) | [🇮🇳 힌디어](README-hi.md) | [🇮🇹 이탈리아어](README-it.md) | [🇯🇵 일본어](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 네덜란드어](README-nl.md) | [🇵🇱 폴란드어](README-pl.md) | [🇵🇹 포르투갈어](README-pt.md) | [🇷🇴 루마니아어](README-ro.md) | [🇸🇪 스웨덴어](README-sv.md) | [🇨🇳 중국어](README-zh.md)

**확장 프로그램을 사용하려면 지원되는 provider 중 하나의 API 키가 필요합니다:**

|                             Provider                             | API 키 발급                                                                                       |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)                                              |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)                                         |
|   <img src="images/gemini-logo.png" alt="Gemini" height="30">    | **Gemini (Google)**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)                                          |
|                                🚅                                | **Custom/LiteLLM**: 자체 API endpoint를 사용                                                       |

Babel Fish AI는 여러 provider를 지원하는 강력한 음성 전사 기능을 제공하도록 설계된 혁신적인 브라우저 확장 프로그램입니다. Mistral AI(Voxtral), OpenAI(gpt-transcribe, Whisper) 또는 Gemini(Gemini 3.5 Transcribe)의 전사 API를 통해 음성을 매우 정확하게 텍스트로 변환하고, 선택적으로 실시간 자동 번역 기능도 이용할 수 있습니다. Babel Fish AI를 전사 전용으로 사용하거나 필요에 따라 즉석 번역을 활성화할 수 있습니다.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy 배지](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![품질 게이트 상태](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![보안 등급](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![유지보수성 등급](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![취약점](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![코드 스멜](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![기술 부채](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![코드 줄 수](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 기능

-   **고급 음성 전사**

    -   기기의 마이크를 통한 고품질 오디오 캡처.
    -   Voxtral(Mistral AI), gpt-transcribe 및 Whisper(OpenAI) 또는 Gemini 3.5 Transcribe(Google) API를 통한 정확한 전사.
    -   다중 provider 지원: Mistral AI, OpenAI, Gemini 또는 사용자 지정 endpoint 중에서 자유롭게 선택할 수 있습니다.
    -   음성 인식과 텍스트 표시를 다국어로 지원하여 여러 언어의 음성 입력을 전사하고, 결과(활성화된 경우 전사 및 번역)를 원하는 언어로 표시할 수 있습니다.
    -   활성 필드에 텍스트를 자동으로 삽입하거나 전용 대화 상자에 표시합니다.

-   **지능형 번역 및 문장 다듬기**

    -   필요에 따라 활성화할 수 있는 다양한 언어로의 즉시 전사 번역.
    -   문체와 명확성을 개선하기 위한 텍스트 다듬기.
    -   원문의 의미에 충실한 번역을 보장하기 위해 고급 AI 모델을 사용합니다.
    -   전사만 사용하거나 전사와 번역을 결합하여 사용할 수 있습니다.

-   **강력한 컨텍스트 메뉴**

    -   선택한 텍스트를 즉시 개선하는 "선택 영역 다듬기" 옵션.
    -   사용 가능한 모든 언어의 하위 메뉴를 제공하는 "선택 영역 번역" 옵션.
    -   철자, 문법 및 문장 부호 오류를 수정하는 "맞춤법 교정" 옵션.
    -   선택한 텍스트를 번역, 다듬기 또는 교정된 버전으로 바로 교체합니다.
    -   브라우저의 기본 사용자 인터페이스와 완벽하게 통합됩니다.

-   **직관적이고 사용자 지정 가능한 사용자 인터페이스**

    -   유연한 표시 모드: 활성 입력 영역 또는 플로팅 대화 상자.
    -   색상, 불투명도 및 표시 시간을 선택할 수 있는 상태 배너.
    -   녹화를 시작하거나 중지하는 키보드 단축키(Ctrl+Shift+1, Mac에서는 ⌘+Shift+1).
    -   Firefox에서는 페이지 편집기가 해당 키 조합을 가로채는 사이트(ChatGPT, Notion 등)를 위한 «우선 단축키»를 제공합니다. 설치 시 활성화되며 옵션에서 비활성화할 수 있습니다([PRIVACY.md](PRIVACY.md) 참조).
    -   결과 표시 시간을 제어하는 "열어 두기" 옵션.
    -   즉시 알아볼 수 있도록 마이크와 숫자 "42"가 포함된 사용자 지정 아이콘.

-   **고급 옵션**
    -   최고의 유연성을 위한 Mistral AI, OpenAI, Gemini 및 Custom/LiteLLM 다중 provider 지원.
    -   provider별로 전사 및 번역 모델을 사용자 지정할 수 있습니다.
    -   사용 가능한 OpenAI 모델: GPT-4o mini(기본값), GPT-4.1(mini/standard), **GPT-5.4(nano/mini/standard)** 및 **GPT-5.6(luna/terra/sol)**. 전사: **gpt-transcribe**(기본값), whisper-1, gpt-4o-mini-transcribe 및 gpt-4o-transcribe. OpenAI는 2027년 2월 26일에 API에서 마지막 세 모델을 제거하며, 그때까지 옵션에서 이미 선택한 모델은 계속 사용됩니다.
    -   사용 가능한 Mistral 모델: Mistral Small(기본값), Mistral Medium, Mistral Large, Codestral 및 **Ministral 3(3B/8B/14B)**. 전사: Voxtral Mini. 추론하는 Mistral 모델의 응답(사고 블록)이 지원됩니다.
    -   사용 가능한 Gemini 모델: **Gemini 3.8 Flash**(기본값, 1~2초 내에 응답하도록 추론 수준을 낮춤) 및 **Gemini 3.5 Flash-Lite**(가장 빠름). 전사: Google의 Interactions API를 사용하는 **Gemini 3.5 Transcribe**이며, 받아쓰기 내용을 해당 API 기록에 저장하지 않습니다(`store: false`, [docs/providers/gemini.md](docs/providers/gemini.md) 참조).
    -   gpt-4.1-nano(OpenAI API가 2026년 10월 23일에 중단됨) 또는 gpt-4o를 사용하던 설정은 업데이트 시 자동으로 gpt-5.6-luna 및 gpt-4.1로 전환됩니다.
    -   전사와 번역/문장 다듬기에 사용할 provider를 각각 독립적으로 선택할 수 있습니다.
    -   Custom provider를 통해 LiteLLM Proxy와 호환되므로 대체 모델에 연결할 수 있습니다.
    -   언어 파일(\_locales)을 통한 완전한 국제화 관리로 여러 언어의 인터페이스와 음성 지원을 제공합니다.

## 🌐 지원 언어

다음은 Babel Fish AI가 지원하는 언어와 데모 동영상 링크입니다:

-   [아랍어](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [독일어](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [영어](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [스페인어](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [프랑스어](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [힌디어](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [이탈리아어](https://www.youtube.com/watch?v=QgYZt8myods)
-   [일본어](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [한국어](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [네덜란드어](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [폴란드어](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [포르투갈어](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [루마니아어](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [스웨덴어](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [중국어](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 설치

### Chrome

1.  **다운로드 및 설치:**

    -   GitHub에서 이 저장소를 clone하거나 확장 프로그램 폴더를 직접 다운로드합니다.
    -   **또는 [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)에서 확장 프로그램을 바로 설치합니다**
    -   Chrome을 열고 `chrome://extensions/`로 이동합니다.
    -   오른쪽 상단의 «개발자 모드»를 활성화합니다.
    -   «압축 해제된 확장 프로그램을 로드합니다»를 클릭하고 Babel Fish AI 폴더를 선택합니다.

2.  **확인:**
    -   확장 프로그램이 사용자 지정 아이콘과 함께 브라우저 도구 모음에 표시되는지 확인합니다.

### Firefox

1.  **다운로드 및 설치:**

    -   버전 1.2.0부터 **Firefox 140 이상**(데스크톱)이 필요합니다. 설치할 때와 1.2.0으로 업데이트할 때 Firefox는 확장 프로그램이 사용자가 설정한 provider로 전송하는 데이터인 음성, 선택하거나 받아쓴 텍스트 및 API 키를 표시합니다([PRIVACY.md](PRIVACY.md) 참조).
    -   **[Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)에서 확장 프로그램을 바로 설치합니다**
    -   또는 수동 설치의 경우 GitHub에서 이 저장소를 clone한 다음 `./scripts/build.sh firefox`을 실행합니다. 그러면 Firefox manifest의 이름을 `manifest.json`로 변경한 `dist/firefox/`이 준비됩니다.
    -   Firefox를 열고 `about:debugging#/runtime/this-firefox`로 이동합니다(`about:addons`의 «파일에서 부가 기능 설치»가 아니며, 해당 기능은 서명된 확장 프로그램 전용입니다).
    -   «임시 부가 기능 로드...»를 클릭합니다.
    -   `dist/firefox/manifest.json` 파일을 선택합니다.

2.  **확인:**
    -   확장 프로그램이 사용자 지정 아이콘과 함께 Firefox 도구 모음에 표시되는지 확인합니다.

## ⚙️ 설정

1.  **AI Provider 설정:**

    -   옵션에 접근하려면 확장 프로그램 아이콘을 클릭합니다.
    -   드롭다운 메뉴에서 provider(Mistral AI, OpenAI, Gemini 또는 Custom/LiteLLM)를 선택합니다.
    -   API 키를 입력합니다:
        -   **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)에서 발급 가능
        -   **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)에서 발급 가능
        -   **Gemini**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)에서 발급 가능합니다. 결제가 설정된 프로젝트의 키를 권장합니다. 무료 키를 사용하고 유럽 경제 지역, 스위스 및 영국 외부에 있는 경우 Google은 사람이 검토할 가능성을 포함해 제품 개선을 위해 받아쓰기 내용과 전송된 텍스트를 사용할 수 있습니다. 개인 정보, 민감한 정보 또는 기밀 정보를 전송하지 마세요. 키는 Gemini API로 제한하고(새 키의 기본 설정), 웹사이트로는 절대 제한하지 마세요. Chrome에서는 받아쓰기를 수행하는 페이지에서 요청이 전송됩니다.
    -   드롭다운 메뉴 옆의 toggle로 provider를 활성화합니다.

2.  **옵션 사용자 지정:**

    -   표시 모드(활성 영역 또는 대화 상자)를 선택합니다.
    -   상태 배너의 색상, 불투명도 및 표시 시간을 설정합니다.
    -   전사(음성 입력)와 텍스트 표시에 사용할 언어를 선택합니다.
    -   필요에 따라 번역 기능을 활성화하거나 비활성화합니다.

3.  **(선택 사항) 고급 모델 설정:**

    -   각 provider의 옵션에서 "모델 설정"을 클릭하여 사용할 모델을 사용자 지정합니다.
    -   전사와 번역/문장 다듬기를 위한 사용자 지정 모델을 추가할 수 있습니다.
    -   여러 provider가 활성화되어 있으면 각 서비스(전사 및 번역)에 사용할 provider를 선택할 수 있습니다.

4.  **동기화된 여러 기기:**
    -   모든 기기에서 확장 프로그램을 업데이트하세요. 1.2.0 이전 버전은 Gemini를 인식하지 못하므로 Gemini가 선택된 경우 이전에 활성화한 provider를 사용하거나 아무것도 전송하지 않습니다.
    -   최신 버전의 확장 프로그램에서 현재 버전이 아직 인식하지 못하는 provider를 저장한 경우, 옵션 페이지의 «최신 버전의 Provider» 섹션에 이를 표시하며 모든 기기에서 해당 설정을 삭제하는 버튼을 제공합니다.
    -   브라우저가 옵션 저장을 거부하면(예: 값이 너무 긴 경우) 페이지에 «옵션이 저장되었습니다!» 대신 오류가 표시되며 아무것도 저장되지 않습니다.

## 🚀 LiteLLM Proxy 또는 사용자 지정 Endpoint와 함께 사용

Babel Fish AI는 [LiteLLM Proxy](https://litellm.ai/) 및 기타 OpenAI 호환 API proxy와 호환되므로 대체 언어 모델을 사용할 수 있습니다.

### 설정

1.  **proxy 설치 및 설정:** 사용 중인 서비스(LiteLLM 등)의 지침을 따릅니다.
2.  **Babel Fish AI 확장 프로그램 설정:**
    -   확장 프로그램 옵션의 드롭다운 메뉴에서 **Custom/LiteLLM** provider를 선택합니다.
    -   API 키를 입력합니다(필요한 경우).
    -   API URL을 설정합니다:
        -   **전사 URL**: 예: `http://localhost:4000/v1/audio/transcriptions`
        -   **Chat URL**: 예: `http://localhost:4000/v1/chat/completions`
    -   toggle로 provider를 활성화합니다.
    -   LiteLLM의 요청 로깅을 비활성화하려면 **"NoLog"** 옵션을 선택합니다.

**중요:** "NoLog" 옵션은 Custom/LiteLLM provider에서만 사용할 수 있습니다. OpenAI, Mistral AI 또는 Gemini의 공식 API와는 호환되지 않습니다.

## 🛠️ 기술적 작동 방식

### 확장 프로그램 아키텍처

확장 프로그램은 서로 상호작용하는 여러 JavaScript 파일로 구성됩니다:

#### 주요 파일

-   **`manifest.json`:** 확장 프로그램의 기본 설정 파일입니다. 권한, script, 접근 가능한 resource 등을 정의합니다. manifest 버전 3을 사용하며 `activeTab`, `storage`, `commands`, `scripting` 및 `contextMenus` 권한을 선언합니다.
-   **`background.js`:** 백그라운드에서 실행되는 service worker입니다. 이벤트(아이콘 클릭, 키보드 단축키, 컨텍스트 메뉴)를 관리하고 필요할 때 `content script`을 삽입하며 `content script`과 통신합니다.
-   **`content.js`:** 웹페이지에 삽입되는 기본 script입니다. 여러 utility module을 조정하고 확장 프로그램의 전체 흐름을 관리합니다.
-   **`src/constants.js`:** 설정, 상태, 작업 등에 사용되는 상수를 정의합니다.

#### Utility Module

확장 프로그램은 여러 전문 utility 파일로 구성된 모듈식 아키텍처를 사용합니다:

##### Provider 및 API 관리

-   **`src/utils/providers.js`:** AI provider(Mistral AI, OpenAI, Gemini, Custom/LiteLLM)의 설정, 모델 및 기본 URL을 포함하는 registry입니다.
-   **`src/utils/provider-store.js`:** 저장소에서 provider 설정을 읽고 API 키가 해당 provider의 주소로만 전송되는지 확인합니다.
-   **`src/utils/provider-adapters.js`:** provider API 형식으로 인증, 요청 본문, 응답 및 오류 읽기를 처리합니다.
-   **`src/utils/api-utils.js`:** 외부 API와 상호작용하고 다중 provider 설정을 해석하며 오디오를 전사하는 함수입니다.
-   **`src/utils/text-processing.js`:** 번역, 문장 다듬기 및 맞춤법 교정을 위한 텍스트 처리 함수입니다.

##### 사용자 인터페이스 및 상호작용

-   **`src/utils/ui.js`:** 사용자 인터페이스용 범용 utility 함수입니다.
-   **`src/utils/banner-utils.js`:** 상태 배너, 해당 control 및 언어 selector를 관리합니다.
-   **`src/utils/focus-utils.js`:** focus와 텍스트 선택 영역의 저장 및 복원을 관리합니다.
-   **`src/utils/transcription-display.js`:** 전사 결과 표시를 관리합니다.
-   **`src/utils/error-utils.js`:** 오류 표시 및 처리를 관리합니다.
-   **`src/styles/content.css`:** 웹페이지에 삽입되는 사용자 인터페이스용 CSS style입니다.

##### 녹음 및 이벤트

-   **`src/utils/recording-utils.js`:** 마이크를 통한 오디오 녹음과 오디오 데이터 처리를 관리합니다.
-   **`src/utils/event-handlers.js`:** 사용자 상호작용을 위한 event handler를 포함합니다.

##### 국제화 및 언어

-   **`src/utils/languages.js`:** 확장 프로그램이 지원하는 언어를 정의합니다.
-   **`src/utils/languages-shared.js`:** 웹페이지 context에서 지원하는 언어 목록을 정의합니다.
-   **`src/utils/languages-data.js`:** service worker에서 지원하는 언어 목록을 정의합니다.
-   **`src/utils/i18n.js`:** 사용자 인터페이스의 국제화를 관리합니다.

##### 옵션 페이지

-   **`src/pages/options/`:** 확장 프로그램의 옵션 페이지용 파일(HTML, CSS, JavaScript)을 포함합니다.
### 전사 및 번역 과정

#### 주요 음성 전사 기능

1.  **녹음 시작:** 사용자가 확장 프로그램 아이콘을 클릭하거나 키보드 단축키(Ctrl+Shift+1 또는 Mac에서는 ⌘+Shift+1)를 사용하여 녹음을 시작합니다. `background script`이 녹음을 시작하도록 `content script`에 메시지를 보냅니다.
2.  **오디오 캡처:** `content script`은 `navigator.mediaDevices.getUserMedia` API를 사용하여 마이크에 접근하고 MediaRecorder API를 통해 오디오를 녹음합니다.
3.  **전사:** `content script`은 `transcribeAudio` 함수(`src/utils/api-utils.js`)를 사용하여 구성된 provider의 전사 API(Mistral AI의 경우 Voxtral, OpenAI의 경우 gpt-transcribe 또는 Whisper, Gemini의 경우 Gemini 3.5 Transcribe)에 오디오를 전송합니다. API는 전사된 텍스트를 반환합니다.
4.  **번역 또는 재작성(선택 사항):**

-   번역 옵션이 활성화된 경우, `content script`은 `translateText` 함수(`src/utils/text-processing.js`)를 사용하여 구성된 provider의 채팅 API에 전사된 텍스트를 전송합니다.
-   재작성 옵션이 활성화된 경우, `rephraseText` 함수를 사용하여 전사된 텍스트를 개선합니다.

5.  **표시:** `content script`은 처리된 텍스트를 페이지의 활성 요소(텍스트 필드 또는 편집 가능한 요소인 경우)에 표시하거나 사용자 지정 대화 상자에 표시합니다.

#### 컨텍스트 메뉴 기능

1. **텍스트 선택:** 사용자가 웹페이지에서 텍스트를 선택합니다.
2. **컨텍스트 메뉴:** 마우스 오른쪽 버튼을 클릭하면 다음 옵션이 표시됩니다.
    - 스타일과 명확성을 개선하는 "선택 영역 재작성"
    - 사용 가능한 언어의 하위 메뉴가 포함된 "선택 영역 번역"
    - 오류를 수정하는 "맞춤법 교정"
3. **처리:** 선택한 옵션에 따라 다음과 같이 처리됩니다.
    - `rephraseText` 함수를 통해 텍스트를 재작성하도록 전송합니다.
    - 선택한 대상 언어와 함께 `translateText` 함수를 통해 텍스트를 번역하도록 전송합니다.
    - `correctText` 함수를 통해 텍스트를 교정하도록 전송합니다.
4. **표시:** 선택된 텍스트가 있는 요소에서 원래 선택 영역을 결과로 대체합니다.

### 통신

`background script`과 `content script` 간의 통신은 Chrome 메시징 API(`chrome.runtime.sendMessage` 및 `chrome.runtime.onMessage`)를 통해 이루어집니다.

### 데이터 저장

확장 프로그램은 `chrome.storage.sync`을 사용하여 다음 항목을 저장합니다.

-   AI provider 구성(API 키, 선택한 모델, 사용자 지정 URL). 1.2.0에서 추가된 Gemini에는 자체 저장 키(`extraProvider.gemini`)가 있으며, 이전 버전에서는 이 키를 무시합니다.
-   확장 프로그램 옵션(표시, 번역, 배너 색상 등).
-   번역 언어 기본 설정.

이 데이터는 컴퓨터의 브라우저 확장 프로그램 저장소에 로컬로 저장됩니다.

### 오류 처리

발생 가능한 오류(API 키 누락, 전사 오류 등)는 `constants.js` 파일에 정의되어 있습니다. `api-utils.js` 및 `text-processing.js` 함수는 HTTP 코드에 따라 개선된 메시지를 제공하며 API 호출에서 발생할 수 있는 오류를 처리합니다. `content.js`은 페이지 하단의 배너를 통해 사용자에게 오류 메시지를 표시합니다.

## 🛡️ 보안 및 개인정보 보호

-   **데이터 보호:**
    -   API 키는 브라우저에 안전하게 저장됩니다.
    -   확장 프로그램은 오디오 데이터를 보관하지 않으며, 모든 처리는 실시간으로 이루어집니다.
    -   API와의 통신은 안전한 HTTPS 연결을 통해 이루어집니다.

BabelFishAI가 데이터를 처리하는 방식에 관한 자세한 내용은 [개인정보 처리방침](PRIVACY.md)을 참조하세요.

## 🔧 문제 해결

-   **마이크 문제:**

    -   브라우저에서 마이크 접근 권한을 확인하세요.
    -   다른 애플리케이션이 동시에 마이크를 사용하고 있지 않은지 확인하세요.

-   **전사/번역 오류:**
    -   API 키가 유효하고 활성화되어 있는지 확인하세요.
    -   인터넷 연결이 안정적인지 확인하세요.
    -   오류 발생 시 자세한 로그를 확인하려면 브라우저 콘솔을 살펴보세요.

## 🤝 기여

기여와 제안을 환영합니다. 기여하려면 다음을 수행하세요.

-   GitHub의 Issues 섹션을 통해 버그를 신고하세요.
-   개선 사항이나 새로운 기능을 제안하세요.
-   pull request를 제출하세요.

## 📄 라이선스

이 확장 프로그램은 GNU Affero General Public License v3.0(AGPL-3.0)에 따라 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

## 💝 후원

## 이 확장 프로그램이 마음에 드신다면 [PayPal](https://paypal.me/jls)을 통해 기부하여 개발을 후원하실 수 있습니다.

열정과 혁신을 바탕으로 jls42.org에서 개발한 Babel Fish AI는 최첨단 인공지능을 통해 전사와 번역의 새로운 지평을 열어 갑니다.
