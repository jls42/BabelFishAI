# Babel Fish AI - AI 기반 음성 전사 및 번역 확장 프로그램

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**확장 프로그램을 사용하려면 지원되는 제공업체 중 하나의 API 키가 필요합니다:**
- **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
- **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
- **Custom/LiteLLM**: 자체 API 엔드포인트를 사용하려는 경우

Babel Fish AI는 다중 제공업체 지원을 통해 강력한 음성 전사를 제공하도록 설계된 혁신적인 Chrome 확장 프로그램입니다. Mistral AI (Voxtral) 또는 OpenAI (Whisper) 전사 API를 사용하여 놀라운 정확도로 음성을 텍스트로 변환하고, 선택적으로 실시간 자동 번역의 이점을 누릴 수 있습니다. 필요에 따라 Babel Fish AI를 전사 전용으로 사용하거나 즉시 번역을 활성화할 수 있습니다.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 기능

- **고급 음성 전사**
  - 장치의 마이크를 통한 고품질 오디오 캡처.
  - Voxtral (Mistral AI) 또는 Whisper (OpenAI) API를 통한 정확한 전사.
  - 다중 제공업체 지원: Mistral AI, OpenAI 또는 사용자 지정 엔드포인트 중에서 자유롭게 선택하십시오.
  - 음성 인식 및 텍스트 표시를 위한 다국어 지원으로 다양한 언어의 음성 입력을 전사하고 선택한 언어로 결과(전사 및 번역, 활성화된 경우)를 표시할 수 있습니다.
  - 활성 필드에 텍스트 자동 삽입 또는 전용 대화 상자에 표시.

- **지능형 번역 및 문구 수정**
  - 필요에 따라 활성화할 수 있는 다양한 언어로의 전사 즉시 번역.
  - 스타일과 명확성을 개선하기 위한 텍스트 문구 수정.
  - 원래 의미에 충실한 번역을 보장하기 위해 고급 AI 모델 사용.
  - 전사만 사용하거나 전사와 번역을 결합하여 사용할 수 있는 자유로운 선택.

- **강력한 컨텍스트 메뉴**
  - 선택한 텍스트를 즉시 개선하는 "선택 영역 문구 수정" 옵션.
  - 사용 가능한 모든 언어의 하위 메뉴가 있는 "선택 영역 번역" 옵션.
  - 맞춤법, 문법 및 구두점 오류를 수정하는 "맞춤법 수정" 옵션.
  - 선택한 텍스트를 번역, 문구 수정 또는 수정된 버전으로 직접 대체.
  - 기본 Chrome 사용자 인터페이스에 완벽하게 통합.

- **직관적이고 사용자 정의 가능한 사용자 인터페이스**
  - 유연한 표시 모드: 활성 입력 영역 또는 플로팅 대화 상자 창.
  - 색상, 불투명도 및 표시 기간을 선택할 수 있는 구성 가능한 상태 배너.
  - 녹음을 시작/중지하는 키보드 단축키(Mac의 경우 Ctrl+Shift+1 또는 ⌘+Shift+1).
  - 결과 표시 기간을 제어하는 "열어 두기" 옵션.
  - 즉각적인 인식을 위해 마이크와 숫자 "42"를 통합한 사용자 정의 아이콘.

- **고급 옵션**
    - 다중 제공업체 지원: 최대의 유연성을 위한 Mistral AI, OpenAI 및 Custom/LiteLLM.
    - 제공업체별로 전사 및 번역 모델을 사용자 정의하는 기능.
    - 전사 및 번역/문구 수정을 위한 제공업체의 독립적인 선택.
    - 대체 모델에 연결하기 위해 Custom 제공업체를 통한 LiteLLM Proxy와의 호환성.
    - 언어 파일(_locales)을 통한 완전한 국제화 관리, 여러 언어로 인터페이스 및 음성 지원 제공.

## 🌐 지원되는 언어

다음은 데모 비디오 링크와 함께 Babel Fish AI에서 지원하는 언어 목록입니다:

- [아랍어](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [독일어](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [영어](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [스페인어](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [프랑스어](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [힌디어](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [이탈리아어](https://www.youtube.com/watch?v=QgYZt8myods)
- [일본어](https://www.youtube.com/watch?v=noHEJCnocH8)
- [한국어](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [네덜란드어](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [폴란드어](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [포르투갈어](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [루마니아어](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [스웨덴어](https://www.youtube.com/watch?v=HMMzGyW8000)
- [중국어](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 설치

1.  **다운로드 및 설치:**
    - GitHub에서 이 리포지토리를 복제하거나 확장 프로그램 폴더를 수동으로 다운로드합니다.
    - **또는 [Chrome 웹 스토어](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)에서 확장 프로그램을 직접 설치합니다**
    - Chrome을 열고 `chrome://extensions/`로 이동합니다.
    - 오른쪽 상단의 "개발자 모드"를 활성화합니다.
    - "압축 해제된 확장 프로그램을 로드합니다"를 클릭하고 Babel Fish AI 폴더를 선택합니다.

2.  **확인:**
    - 확장 프로그램이 사용자 정의 아이콘과 함께 Chrome 도구 모음에 나타나는지 확인합니다.

## ⚙️ 구성

1.  **AI 제공업체 구성:**
    *   확장 프로그램 아이콘을 클릭하여 옵션에 액세스합니다.
    *   드롭다운 메뉴에서 제공업체를 선택합니다(Mistral AI, OpenAI 또는 Custom/LiteLLM).
    *   API 키를 입력합니다:
        - **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)에서 사용 가능
        - **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)에서 사용 가능
    *   드롭다운 메뉴 옆의 토글로 제공업체를 활성화합니다.

2.  **옵션 사용자 정의:**
    *   표시 모드(활성 영역 또는 대화 상자)를 선택합니다.
    *   상태 배너의 색상, 불투명도 및 표시 기간을 구성합니다.
    *   전사(음성 입력) 및 텍스트 표시 언어를 선택합니다.
    *   필요에 따라 번역 기능을 활성화하거나 비활성화합니다.

3.  **(선택 사항) 고급 모델 구성:**
    *   각 제공업체의 옵션에서 "모델 구성"을 클릭하여 사용되는 모델을 사용자 정의합니다.
    *   전사 및 번역/문구 수정을 위한 사용자 정의 모델을 추가할 수 있습니다.
    *   여러 제공업체가 활성화된 경우 각 서비스(전사 및 번역)에 사용할 제공업체를 선택할 수 있습니다.

## 🚀 LiteLLM Proxy 또는 사용자 정의 엔드포인트와 함께 사용

Babel Fish AI는 [LiteLLM Proxy](https://litellm.ai/) 및 기타 OpenAI 호환 API 프록시와 호환되어 대체 언어 모델을 사용할 수 있습니다.

### 구성

1.  **프록시 설치 및 구성:** 사용 중인 서비스(LiteLLM 등)의 지침을 따르십시오.
2.  **Babel Fish AI 확장 프로그램 구성:**
    *   확장 프로그램 옵션의 드롭다운 메뉴에서 **Custom/LiteLLM** 제공업체를 선택합니다.
    *   API 키를 입력합니다(필요한 경우).
    *   API URL을 구성합니다:
        - **전사 URL**: 예: `http://localhost:4000/v1/audio/transcriptions`
        - **채팅 URL**: 예: `http://localhost:4000/v1/chat/completions`
    *   토글로 제공업체를 활성화합니다.
    *   LiteLLM에 의한 요청 로깅을 비활성화하려면 **"NoLog"** 옵션을 선택하십시오.

**중요:** "NoLog" 옵션은 Custom/LiteLLM 제공업체에서만 **사용 가능**합니다. 공식 OpenAI 또는 Mistral AI API와 호환되지 않습니다.

## 🛠️ 기술적 작동

### 확장 프로그램 아키텍처

확장 프로그램은 서로 상호 작용하는 여러 JavaScript 파일로 구성됩니다:

#### 주요 파일

*   **`manifest.json`:** 확장 프로그램의 주요 구성 파일입니다. 권한, 스크립트, 액세스 가능한 리소스 등을 정의합니다. Manifest V3를 사용하며 `activeTab`, `storage`, `commands`, `scripting` 및 `contextMenus` 권한을 선언합니다.
*   **`background.js`:** 백그라운드에서 실행되는 서비스 워커입니다. 이벤트(아이콘 클릭, 키보드 단축키, 컨텍스트 메뉴)를 처리하고, 필요한 경우 `content script`를 주입하고, `content script`와 통신합니다.
*   **`content.js`:** 웹 페이지에 주입되는 주요 스크립트입니다. 다양한 유틸리티 모듈을 조정하고 확장 프로그램의 전체 흐름을 관리합니다.
*   **`src/constants.js`:** 구성, 상태, 작업 등에 대한 상수를 정의합니다.

#### 유틸리티 모듈

확장 프로그램은 여러 전문 유틸리티 파일이 있는 모듈식 아키텍처를 사용합니다:

##### 제공업체 및 API 관리

*   **`src/utils/providers.js`:** 구성, 모델 및 기본 URL이 포함된 AI 제공업체(Mistral AI, OpenAI, Custom/LiteLLM) 레지스트리.
*   **`src/utils/api-utils.js`:** 외부 API와의 상호 작용, 다중 제공업체 구성 해결 및 음성 전사를 위한 기능.
*   **`src/utils/text-processing.js`:** 텍스트 처리 기능: 번역, 문구 수정, 맞춤법 수정.

##### 사용자 인터페이스 및 상호 작용

*   **`src/utils/ui.js`:** 사용자 인터페이스를 위한 일반적인 유틸리티 기능.
*   **`src/utils/banner-utils.js`:** 상태 배너, 컨트롤 및 언어 선택기를 관리합니다.
*   **`src/utils/focus-utils.js`:** 포커스 및 텍스트 선택 저장 및 복원을 관리합니다.
*   **`src/utils/transcription-display.js`:** 전사 결과 표시를 관리합니다.
*   **`src/utils/error-utils.js`:** 오류 표시 및 처리를 관리합니다.
*   **`src/styles/content.css`:** 웹 페이지에 주입된 사용자 인터페이스를 위한 CSS 스타일.

##### 녹음 및 이벤트

*   **`src/utils/recording-utils.js`:** 마이크를 통한 오디오 녹음 및 오디오 데이터 처리를 관리합니다.
*   **`src/utils/event-handlers.js`:** 사용자 상호 작용을 위한 이벤트 핸들러가 포함되어 있습니다.

##### 국제화 및 언어

*   **`src/utils/languages.js`:** 확장 프로그램에서 지원하는 언어를 정의합니다.
*   **`src/utils/languages-shared.js`:** 웹 페이지 컨텍스트에 대해 지원되는 언어 목록을 정의합니다.
*   **`src/utils/languages-data.js`:** 서비스 워커에 대해 지원되는 언어 목록을 정의합니다.
*   **`src/utils/i18n.js`:** 사용자 인터페이스를 위한 국제화를 관리합니다.

##### 옵션 페이지

*   **`src/pages/options/`:** 확장 프로그램의 옵션 페이지(HTML, CSS, JavaScript)에 대한 파일이 포함되어 있습니다.

### 전사 및 번역 프로세스

#### 주요 음성 전사 기능

1.  **녹음 시작:** 사용자는 확장 프로그램 아이콘을 클릭하거나 키보드 단축키(Mac의 경우 Ctrl+Shift+1 또는 ⌘+Shift+1)를 사용하여 녹음을 시작합니다. `background script`는 녹음을 시작하기 위해 `content script`에 메시지를 보냅니다.
2.  **오디오 캡처:** `content script`는 `navigator.mediaDevices.getUserMedia` API를 사용하여 마이크에 액세스하고 MediaRecorder API를 통해 오디오를 녹음합니다.
3.  **전사:** `content script`는 `transcribeAudio` 함수(`src/utils/api-utils.js`)를 사용하여 오디오를 구성된 제공업체의 전사 API(Mistral AI의 경우 Voxtral, OpenAI의 경우 Whisper)로 보냅니다. API는 전사된 텍스트를 반환합니다.
4.  **번역 또는 문구 수정(선택 사항):**
   - 번역 옵션이 활성화된 경우 `content script`는 `translateText` 함수(`src/utils/text-processing.js`)를 사용하여 전사된 텍스트를 구성된 제공업체의 채팅 API로 보냅니다.
   - 문구 수정 옵션이 활성화된 경우 `rephraseText` 함수를 사용하여 전사된 텍스트를 개선합니다.
5.  **표시:** `content script`는 처리된 텍스트를 페이지의 활성 요소(텍스트 필드 또는 편집 가능한 요소인 경우) 또는 사용자 지정 대화 상자에 표시합니다.

#### 컨텍스트 메뉴 기능

1. **텍스트 선택:** 사용자가 웹 페이지에서 텍스트를 선택합니다.
2. **컨텍스트 메뉴:** 오른쪽 클릭 시 옵션이 표시됩니다:
   - 스타일과 명확성을 개선하기 위한 "선택 영역 문구 수정"
   - 사용 가능한 언어의 하위 메뉴가 있는 "선택 영역 번역"
   - 실수를 수정하기 위한 "맞춤법 수정"
3. **처리:** 선택한 옵션에 따라:
   - 텍스트는 `rephraseText` 함수를 통해 문구 수정을 위해 전송됩니다.
   - 텍스트는 선택한 대상 언어와 함께 `translateText` 함수를 통해 번역을 위해 전송됩니다.
   - 텍스트는 `correctText` 함수를 통해 수정을 위해 전송됩니다.
4. **표시:** 결과는 선택한 텍스트가 있는 요소의 원래 선택을 대체합니다.

### 통신

`background script`와 `content script` 간의 통신은 Chrome 메시징 API(`chrome.runtime.sendMessage` 및 `chrome.runtime.onMessage`)를 통해 이루어집니다.

### 데이터 저장

확장 프로그램은 `chrome.storage.sync`를 사용하여 다음을 저장합니다:

*   AI 제공업체 구성(API 키, 선택한 모델, 사용자 지정 URL).
*   확장 프로그램 옵션(표시, 번역, 배너 색상 등).
*   번역을 위한 언어 기본 설정.

이 데이터는 컴퓨터의 Chrome 확장 프로그램 저장소에 로컬로 저장됩니다.

### 오류 처리
가능한 오류(API 키 누락, 전사 오류 등)는 `constants.js` 파일에 정의되어 있습니다. `api-utils.js` 및 `text-processing.js` 함수는 HTTP 코드에 따라 개선된 메시지로 잠재적인 API 호출 오류를 처리합니다. `content.js`는 페이지 하단의 배너를 통해 사용자에게 오류 메시지를 표시합니다.


## 🛡️ 보안 및 개인 정보 보호

- **데이터 보호:**
  - API 키는 Chrome에 안전하게 저장됩니다.
  - 확장 프로그램은 오디오 데이터를 보관하지 않으며 모든 처리는 실시간으로 수행됩니다.
  - API와의 통신은 안전한 HTTPS 연결을 통해 이루어집니다.

BabelFishAI가 데이터를 관리하는 방법에 대한 전체 정보는 [개인 정보 보호 정책](PRIVACY.md)을 참조하십시오.

## 🔧 문제 해결

- **마이크 문제:**
  - Chrome에서 마이크 액세스 권한을 확인하십시오.
  - 다른 애플리케이션이 동시에 마이크를 사용하고 있지 않은지 확인하십시오.

- **전사/번역 오류:**
  - API 키가 유효하고 활성 상태인지 확인하십시오.
  - 인터넷 연결이 안정적인지 확인하십시오.
  - 오류 발생 시 자세한 로그는 Chrome 콘솔을 참조하십시오.

## 🤝 기여

기여와 제안을 환영합니다. 기여하려면:
- GitHub의 Issues 섹션을 통해 버그를 보고하십시오.
- 개선 사항이나 새로운 기능을 제안하십시오.
- 풀 리퀘스트(pull request)를 제출하십시오.

## 📄 라이선스

이 확장 프로그램은 GNU Affero General Public License v3.0(AGPL-3.0)에 따라 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하십시오.

## 💝 후원

이 확장 프로그램이 마음에 드시면 [PayPal](https://paypal.me/jls)을 통해 기부하여 개발을 후원할 수 있습니다.
---
jls42.org에서 열정과 혁신으로 개발한 Babel Fish AI는 최첨단 인공 지능 덕분에 전사와 번역을 새로운 지평으로 이끕니다.
