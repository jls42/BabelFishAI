**gpt-5.6-sol을 사용하여 프랑스어에서 한국어로 번역된 기사.**

# Babel Fish AI - AI 기반 음성 전사 및 번역 확장 프로그램

<img src="images/icon128.png" alt="Babel Fish AI 아이콘" width="128" height="128">

**공식 웹사이트: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**확장 프로그램을 사용하려면 지원되는 provider 중 하나의 API 키가 필요합니다:**

|                             Provider                             | API 키 발급                                                                                       |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)                                              |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)                                         |
|                                🚅                                | **Custom/LiteLLM**: 자체 API endpoint를 사용하는 경우                                             |

Babel Fish AI는 여러 provider를 지원하는 강력한 음성 전사 기능을 제공하도록 설계된 혁신적인 브라우저 확장 프로그램입니다. Mistral AI의 전사 API(Voxtral) 또는 OpenAI의 전사 API(Whisper)를 통해 음성을 매우 정확하게 텍스트로 변환하고, 선택적으로 실시간 자동 번역 기능도 이용할 수 있습니다. Babel Fish AI를 전사 전용으로 사용하거나 필요에 따라 즉시 번역 기능을 활성화할 수 있습니다.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy 배지](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![품질 게이트 상태](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![보안 등급](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![유지보수성 등급](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![취약점](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![코드 스멜](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![기술 부채](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![코드 줄 수](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 기능

-   **고급 음성 전사**

    -   기기의 마이크를 통한 고품질 오디오 캡처.
    -   Voxtral(Mistral AI) 또는 Whisper(OpenAI) API를 통한 정확한 전사.
    -   여러 provider 지원: Mistral AI, OpenAI 또는 사용자 지정 endpoint 중에서 자유롭게 선택할 수 있습니다.
    -   음성 인식 및 텍스트 표시를 위한 다국어 지원으로, 다양한 언어의 음성 입력을 전사하고 결과(활성화된 경우 전사 및 번역)를 원하는 언어로 표시할 수 있습니다.
    -   활성 필드에 텍스트를 자동으로 삽입하거나 전용 대화 상자에 표시합니다.

-   **지능형 번역 및 문장 다듬기**

    -   필요할 때 활성화할 수 있는 다양한 언어로의 즉각적인 전사 번역.
    -   문체와 명확성을 향상하기 위한 텍스트 다듬기.
    -   원문의 의미에 충실한 번역을 보장하기 위한 고급 AI 모델 사용.
    -   전사만 사용하거나 전사와 번역을 결합하여 사용할 수 있습니다.

-   **강력한 컨텍스트 메뉴**

    -   선택한 텍스트를 즉시 개선하는 "선택 영역 다듬기" 옵션.
    -   사용 가능한 모든 언어의 하위 메뉴가 포함된 "선택 영역 번역" 옵션.
    -   맞춤법, 문법 및 문장 부호 오류를 수정하는 "맞춤법 교정" 옵션.
    -   선택한 텍스트를 번역하거나 다듬거나 교정한 버전으로 직접 교체합니다.
    -   브라우저의 기본 사용자 인터페이스와 완벽하게 통합됩니다.

-   **직관적이고 사용자 지정 가능한 사용자 인터페이스**

    -   유연한 표시 모드: 활성 입력 영역 또는 플로팅 대화 상자.
    -   색상, 불투명도 및 표시 시간을 선택할 수 있는 구성 가능한 상태 배너.
    -   녹음을 시작하거나 중지하는 키보드 단축키(Windows에서는 Ctrl+Shift+1, Mac에서는 ⌘+Shift+1).
    -   Firefox에서는 페이지 편집기가 키 조합을 가로채는 사이트(ChatGPT, Notion 등)를 위한 "우선 단축키"를 제공합니다. 설치 즉시 활성화되며 옵션에서 비활성화할 수 있습니다([PRIVACY.md](PRIVACY.md) 참조).
    -   결과 표시 시간을 제어하는 "열린 상태 유지" 옵션.
    -   즉시 알아볼 수 있도록 마이크와 숫자 "42"를 결합한 사용자 지정 아이콘.

-   **고급 옵션**
    -   최대한의 유연성을 제공하는 Mistral AI, OpenAI 및 Custom/LiteLLM 등 여러 provider 지원.
    -   provider별로 전사 및 번역 모델을 사용자 지정할 수 있습니다.
    -   사용 가능한 OpenAI 모델: GPT-4o mini(기본값), GPT-4.1(mini/standard), **GPT-5.4(nano/mini/standard)** 및 **GPT-5.6(luna/terra/sol)**. 전사: whisper-1(기본값), gpt-4o-mini-transcribe, gpt-4o-transcribe 및 **gpt-transcribe**.
    -   사용 가능한 Mistral 모델: Mistral Small(기본값), Mistral Medium, Mistral Large, Codestral 및 **Ministral 3(3B/8B/14B)**. 전사: Voxtral Mini. 추론하는 Mistral 모델의 응답(사고 블록)도 지원됩니다.
    -   gpt-4.1-nano(2026년 10월 23일 OpenAI API 지원 종료) 또는 gpt-4o를 사용하던 설정은 업데이트 시 각각 gpt-5.6-luna 및 gpt-4.1로 자동 전환됩니다.
    -   전사와 번역/문장 다듬기에 사용할 provider를 각각 독립적으로 선택할 수 있습니다.
    -   대체 모델에 연결할 수 있도록 Custom provider를 통한 LiteLLM Proxy 호환성을 제공합니다.
    -   언어 파일(\_locales)을 통한 완전한 국제화 관리로 여러 언어의 인터페이스와 음성 지원을 제공합니다.

## 🌐 지원 언어

Babel Fish AI에서 지원하는 언어와 데모 동영상 링크는 다음과 같습니다:

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

    -   GitHub에서 이 저장소를 복제하거나 확장 프로그램 폴더를 직접 다운로드합니다.
    -   **또는 [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)에서 확장 프로그램을 바로 설치합니다**
    -   Chrome을 열고 `chrome://extensions/`로 이동합니다.
    -   오른쪽 상단에서 "개발자 모드"를 활성화합니다.
    -   "압축해제된 확장 프로그램을 로드합니다"를 클릭하고 Babel Fish AI 폴더를 선택합니다.

2.  **확인:**
    -   사용자 지정 아이콘과 함께 확장 프로그램이 브라우저 도구 모음에 표시되는지 확인합니다.

### Firefox

1.  **다운로드 및 설치:**

    -   **[Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/에서 확장 프로그램을 바로 설치합니다**
    -   또는 수동으로 설치하려면 GitHub에서 이 저장소를 복제한 다음 `./scripts/build.sh firefox`을 실행합니다. 그러면 Firefox manifest의 이름을 `manifest.json`으로 변경하여 `dist/firefox/`가 준비됩니다.
    -   Firefox를 열고 `about:debugging#/runtime/this-firefox`로 이동합니다. 서명된 확장 프로그램 전용인 `about:addons`의 "파일에서 부가 기능 설치"는 사용하지 마세요.
    -   "임시 부가 기능 로드..."를 클릭합니다.
    -   `dist/firefox/manifest.json` 파일을 선택합니다.

2.  **확인:**
    -   사용자 지정 아이콘과 함께 확장 프로그램이 Firefox 도구 모음에 표시되는지 확인합니다.

## ⚙️ 구성

1.  **AI Provider 구성:**

    -   확장 프로그램 아이콘을 클릭하여 옵션에 접근합니다.
    -   드롭다운 메뉴에서 provider(Mistral AI, OpenAI 또는 Custom/LiteLLM)를 선택합니다.
    -   API 키를 입력합니다:
        -   **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)에서 발급
        -   **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)에서 발급
    -   드롭다운 메뉴 옆의 토글로 provider를 활성화합니다.

2.  **옵션 사용자 지정:**

    -   표시 모드(활성 영역 또는 대화 상자)를 선택합니다.
    -   상태 배너의 색상, 불투명도 및 표시 시간을 구성합니다.
    -   전사(음성 입력) 및 텍스트 표시에 사용할 언어를 선택합니다.
    -   필요에 따라 번역 기능을 활성화하거나 비활성화합니다.

3.  **(선택 사항) 고급 모델 구성:**
    -   각 provider의 옵션에서 "모델 구성"을 클릭하여 사용할 모델을 사용자 지정합니다.
    -   전사 및 번역/문장 다듬기를 위한 사용자 지정 모델을 추가할 수 있습니다.
    -   여러 provider가 활성화된 경우 각 서비스(전사 및 번역)에 사용할 provider를 선택할 수 있습니다.

## 🚀 LiteLLM Proxy 또는 사용자 지정 Endpoint와 함께 사용

Babel Fish AI는 [LiteLLM Proxy](https://litellm.ai/) 및 OpenAI 호환 API proxy와 호환되므로 대체 언어 모델을 사용할 수 있습니다.

### 구성

1.  **proxy 설치 및 구성:** 사용하는 서비스(LiteLLM 등)의 지침을 따릅니다.
2.  **Babel Fish AI 확장 프로그램 구성:**
    -   확장 프로그램 옵션의 드롭다운 메뉴에서 **Custom/LiteLLM** provider를 선택합니다.
    -   API 키를 입력합니다(필요한 경우).
    -   API URL을 구성합니다:
        -   **전사 URL**: 예: `http://localhost:4000/v1/audio/transcriptions`
        -   **Chat URL**: 예: `http://localhost:4000/v1/chat/completions`
    -   토글로 provider를 활성화합니다.
    -   LiteLLM의 요청 기록을 비활성화하려면 **"NoLog"** 옵션을 선택합니다.

**중요:** "NoLog" 옵션은 Custom/LiteLLM provider에서만 사용할 수 있습니다. OpenAI 또는 Mistral AI의 공식 API와는 호환되지 않습니다.

## 🛠️ 기술적 작동 방식

### 확장 프로그램 아키텍처

확장 프로그램은 서로 상호 작용하는 여러 JavaScript 파일로 구성됩니다:

#### 주요 파일

-   **`manifest.json`:** 확장 프로그램의 기본 구성 파일입니다. 권한, script, 접근 가능한 리소스 등을 정의합니다. manifest 버전 3을 사용하며 `activeTab`, `storage`, `commands`, `scripting` 및 `contextMenus` 권한을 선언합니다.
-   **`background.js`:** 백그라운드에서 실행되는 service worker입니다. 이벤트(아이콘 클릭, 키보드 단축키, 컨텍스트 메뉴)를 관리하고, 필요한 경우 `content script`을 삽입하며, `content script`과 통신합니다.
-   **`content.js`:** 웹페이지에 삽입되는 기본 script입니다. 여러 유틸리티 모듈을 조정하고 확장 프로그램의 전체 흐름을 관리합니다.
-   **`src/constants.js`:** 구성, 상태, 동작 등에 대한 상수를 정의합니다.

#### 유틸리티 모듈

확장 프로그램은 여러 전문 유틸리티 파일로 구성된 모듈식 아키텍처를 사용합니다:

##### Provider 및 API 관리

-   **`src/utils/providers.js`:** AI provider(Mistral AI, OpenAI, Custom/LiteLLM)의 구성, 모델 및 기본 URL을 포함하는 레지스트리입니다.
-   **`src/utils/api-utils.js`:** 외부 API와의 상호 작용, 여러 provider 구성의 확인 및 오디오 전사를 위한 함수입니다.
-   **`src/utils/text-processing.js`:** 번역, 문장 다듬기 및 맞춤법 교정을 위한 텍스트 처리 함수입니다.

##### 사용자 인터페이스 및 상호 작용

-   **`src/utils/ui.js`:** 사용자 인터페이스를 위한 범용 유틸리티 함수입니다.
-   **`src/utils/banner-utils.js`:** 상태 배너와 해당 제어 기능 및 언어 선택기를 관리합니다.
-   **`src/utils/focus-utils.js`:** 포커스와 텍스트 선택 영역의 저장 및 복원을 관리합니다.
-   **`src/utils/transcription-display.js`:** 전사 결과 표시를 관리합니다.
-   **`src/utils/error-utils.js`:** 오류 표시 및 처리를 관리합니다.
-   **`src/styles/content.css`:** 웹페이지에 삽입되는 사용자 인터페이스용 CSS 스타일입니다.

##### 녹음 및 이벤트

-   **`src/utils/recording-utils.js`:** 마이크를 통한 오디오 녹음 및 오디오 데이터 처리를 관리합니다.
-   **`src/utils/event-handlers.js`:** 사용자 상호 작용을 위한 이벤트 핸들러를 포함합니다.

##### 국제화 및 언어

-   **`src/utils/languages.js`:** 확장 프로그램에서 지원하는 언어를 정의합니다.
-   **`src/utils/languages-shared.js`:** 웹페이지 컨텍스트에서 지원하는 언어 목록을 정의합니다.
-   **`src/utils/languages-data.js`:** service worker에서 지원하는 언어 목록을 정의합니다.
-   **`src/utils/i18n.js`:** 사용자 인터페이스의 국제화를 관리합니다.

##### 옵션 페이지

-   **`src/pages/options/`:** 확장 프로그램의 옵션 페이지용 파일(HTML, CSS, JavaScript)을 포함합니다.

### 전사 및 번역 과정

#### 주요 음성 전사 기능

1.  **녹음 시작:** 사용자가 확장 프로그램 아이콘을 클릭하거나 키보드 단축키(Windows에서는 Ctrl+Shift+1, Mac에서는 ⌘+Shift+1)를 사용하여 녹음을 시작합니다. `background script`이 녹음을 시작하도록 `content script`에 메시지를 보냅니다.
2.  **오디오 캡처:** `content script`이 `navigator.mediaDevices.getUserMedia` API를 사용하여 마이크에 접근하고 MediaRecorder API를 통해 오디오를 녹음합니다.
3.  **전사:** `content script`이 `transcribeAudio` 함수(`src/utils/api-utils.js`)를 사용하여 구성된 provider의 전사 API(Mistral AI의 경우 Voxtral, OpenAI의 경우 Whisper)로 오디오를 전송합니다. API가 전사된 텍스트를 반환합니다.
4.  **번역 또는 문장 다듬기(선택 사항):**

-   번역 옵션이 활성화된 경우 `content script`이 `translateText` 함수(`src/utils/text-processing.js`)를 사용하여 전사된 텍스트를 구성된 provider의 chat API로 전송합니다.
-   문장 다듬기 옵션이 활성화된 경우 `rephraseText` 함수를 사용하여 전사된 텍스트를 개선합니다.

5.  **표시:** `content script`이 처리된 텍스트를 페이지의 활성 요소(텍스트 필드 또는 편집 가능한 요소인 경우)나 사용자 지정 대화 상자에 표시합니다.

#### 컨텍스트 메뉴 기능

1. **텍스트 선택:** 사용자가 웹페이지에서 텍스트를 선택합니다.
2. **컨텍스트 메뉴:** 마우스 오른쪽 버튼을 클릭하면 다음 옵션이 표시됩니다:
    - 문체와 명확성을 개선하는 "선택 영역 다듬기"
    - 사용 가능한 언어의 하위 메뉴가 포함된 "선택 영역 번역"
    - 오류를 수정하는 "맞춤법 교정"
3. **처리:** 선택한 옵션에 따라:
    - `rephraseText` 함수를 통해 텍스트를 문장 다듬기용으로 전송합니다.
    - 선택한 대상 언어와 함께 `translateText` 함수를 통해 텍스트를 번역용으로 전송합니다.
    - `correctText` 함수를 통해 텍스트를 교정용으로 전송합니다.
4. **표시:** 선택한 텍스트가 있는 요소에서 결과가 원래 선택 영역을 대체합니다.

### 통신

`background script`과 `content script` 간의 통신은 Chrome 메시징 API(`chrome.runtime.sendMessage` 및 `chrome.runtime.onMessage`)를 통해 이루어집니다.

### 데이터 저장

확장 프로그램은 다음 항목을 저장하기 위해 `chrome.storage.sync`을 사용합니다:

-   AI provider 구성(API 키, 선택한 모델, 사용자 지정 URL).
-   확장 프로그램 옵션(표시, 번역, 배너 색상 등).
-   번역 언어 환경설정.

이 데이터는 컴퓨터의 브라우저 확장 프로그램 저장소에 로컬로 저장됩니다.
### 오류 관리

발생할 수 있는 오류(API 키 누락, 텍스트 변환 오류 등)는 `constants.js` 파일에 정의되어 있습니다. `api-utils.js` 및 `text-processing.js` 함수는 HTTP 코드에 따라 개선된 메시지를 제공하며 API 호출에서 발생할 수 있는 오류를 처리합니다. `content.js`은 페이지 하단의 배너를 통해 사용자에게 오류 메시지를 표시합니다.

## 🛡️ 보안 및 개인정보 보호

-   **데이터 보호:**
    -   API 키는 브라우저에 안전하게 저장됩니다.
    -   확장 프로그램은 오디오 데이터를 보관하지 않으며, 모든 처리는 실시간으로 이루어집니다.
    -   API와의 통신은 안전한 HTTPS 연결을 통해 이루어집니다.

BabelFishAI가 데이터를 처리하는 방식에 대한 자세한 내용은 [개인정보 처리방침](PRIVACY.md)을 참조하세요.

## 🔧 문제 해결

-   **마이크 문제:**

    -   브라우저에서 마이크 접근 권한을 확인하세요.
    -   다른 애플리케이션이 동시에 마이크를 사용하고 있지 않은지 확인하세요.

-   **텍스트 변환/번역 오류:**
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

열정과 혁신을 담아 jls42.org에서 개발한 Babel Fish AI는 최첨단 인공지능을 통해 텍스트 변환과 번역을 새로운 지평으로 이끕니다.
