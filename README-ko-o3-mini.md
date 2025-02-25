# Babel Fish AI - AI를 활용한 음성 전사 및 번역 확장 프로그램

**이 확장 프로그램을 사용하려면 OpenAI API 키가 필요합니다 (또는 LiteLLM Proxy를 사용하는 경우 타사 제공자 키가 필요합니다). OpenAI API 키는 여기에서 생성할 수 있습니다: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI는 원래 강력한 음성 전사를 제공하기 위해 설계된 혁신적인 Chrome 확장 프로그램입니다. OpenAI의 Whisper API를 통해 놀라운 정밀도로 음성을 텍스트로 변환하고, 선택적으로 실시간 자동 번역 기능을 제공합니다. 필요에 따라 Babel Fish AI를 오직 전사에만 사용하거나, 실시간 번역 기능을 활성화할 수 있습니다.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 주요 기능

- **고급 음성 전사**
  - 기기의 마이크를 통해 고품질 오디오 캡처.
  - OpenAI의 Whisper API를 통한 정밀 전사.
  - 다양한 언어 지원을 통해 음성 인식 및 텍스트 표시를 수행하여, 여러 언어로 음성 입력을 전사하고 (전사와 번역(활성화된 경우)) 원하는 언어로 결과를 표시.
  - 활성 입력 필드에 텍스트를 자동으로 삽입하거나 별도의 대화 상자에 표시.

- **내장 자동 번역 (선택 사항)**
  - 필요에 따라 활성화할 수 있는 다양한 언어로 전사된 텍스트의 즉각적인 번역.
  - 원본 의미에 충실한 번역을 보장하기 위해 고급 AI 모델 사용.
  - 오직 전사만 사용하거나 전사와 번역을 결합하여 자유롭게 선택 가능.

- **직관적이고 맞춤 가능한 사용자 인터페이스**
  - 유연한 표시 모드: 활성 입력 영역 또는 플로팅 대화 상자.
  - 색상, 불투명도 및 표시 시간을 선택할 수 있는 상태 표시줄.
  - 녹음 시작/정지를 위한 단축키 (Ctrl+Shift+1 또는 Mac에서는 ⌘+Shift+1).
  - 마이크와 숫자 “42”가 포함된 맞춤 아이콘을 통한 즉각적인 인식.

- **고급 옵션**
    - 전문가 모드를 통한 상세 설정 (API URL, 도메인별 설정 등).
    - 전사 및 번역 모델을 맞춤 설정할 수 있는 기능.
    - 대체 언어 모델에 연결하고 요청 로깅을 비활성화할 수 있는 LiteLLM Proxy와의 호환성.
    - 다국어 지원 파일(_locales)을 통한 인터페이스 및 음성 지원으로 완벽한 국제화 관리.

## 🌐 지원 언어

- 아랍어
- 독일어
- 영어
- 스페인어
- 프랑스어
- 힌디어
- 이탈리아어
- 일본어
- 한국어
- 네덜란드어
- 폴란드어
- 포르투갈어
- 루마니아어
- 스웨덴어
- 중국어

## 🚀 설치

1.  **다운로드 및 설치:**
    - GitHub에서 이 저장소를 복제하거나 확장 프로그램 폴더를 수동으로 다운로드하세요.
    - Chrome을 열고 `chrome://extensions/`에 접속하세요.
    - 오른쪽 상단에서 “개발자 모드”를 활성화하세요.
    - “압축되지 않은 확장 프로그램 로드”를 클릭하고 Babel Fish AI 폴더를 선택하세요.

2.  **확인:**
    - 확장 프로그램이 Chrome 도구 모음에 맞춤 아이콘과 함께 표시되는지 확인하세요.

## ⚙️ 구성

1.  **OpenAI API 키:**
    *   확장 아이콘을 클릭하여 옵션에 접근하세요.
    *   [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)에서 확인 가능한 OpenAI API 키를 입력하세요.

2.  **옵션 맞춤 설정:**
    *   표시 모드 선택 (활성 영역 또는 대화 상자).
    *   상태 표시줄의 색상, 불투명도 및 표시 시간 설정.
    *   전사(음성 입력) 및 텍스트 표시 언어 선택.
    *   필요에 따라 번역 기능 활성화 또는 비활성화.

3.  **(선택 사항) LiteLLM Proxy 사용:**
    *   옵션에서 “전문가 모드”를 활성화하세요.
    *   “고급 구성” 섹션에서 두 개의 API URL (Whisper 및 번역)을 귀하의 LiteLLM Proxy 인스턴스로 변경하세요. **두 API 모두 동일한 기본 URL을 사용하세요.**
    *   LiteLLM의 요청 로깅을 비활성화하려면 “NoLog (LiteLLM 전용)” 옵션을 선택하세요.

## 🚀 LiteLLM Proxy 사용

OpenAI 이외의 언어 모델을 사용하고자 하는 경우, LiteLLM Proxy를 사용할 수 있습니다. 구성 방법은 다음과 같습니다:

Babel Fish AI는 OpenAI와 호환되는 API를 가진 대체 언어 모델을 사용할 수 있도록 하는 [LiteLLM Proxy](https://litellm.ai/)와 호환됩니다.

### 구성

1.  **LiteLLM Proxy 설치 및 구성:** LiteLLM 웹사이트의 지침을 따르세요.
2.  **Babel Fish AI 확장 프로그램 구성:**
    *   확장 프로그램 옵션 (아이콘을 우클릭 > 옵션)에서 “전문가 모드”를 활성화하세요.
    *   “고급 구성” 섹션에서 두 개의 API URL (Whisper 및 번역)을 귀하의 LiteLLM Proxy 인스턴스로 변경하세요 (예: `http://localhost:4000/v1/audio/transcriptions` 및 `http://localhost:4000/v1/chat/completions`). **두 API 모두 동일한 기본 URL을 사용하세요.**
    *   LiteLLM의 요청 로깅을 비활성화하려면 “NoLog (LiteLLM 전용)” 옵션을 선택하세요.

**중요:** “NoLog” 옵션은 오직 LiteLLM Proxy와 함께 사용하도록 설계되었습니다. OpenAI 공식 API를 사용 중인 경우 **활성화하지 마세요**, 오류가 발생하여 번역 기능이 작동하지 않을 수 있습니다.

## 🛠️ 기술적 작동 원리

### 확장 프로그램 아키텍처

확장 프로그램은 서로 상호작용하는 여러 JavaScript 파일로 구성됩니다:

*   **`manifest.json`:** 확장 프로그램의 주요 구성 파일로, 권한, 스크립트, 접근 가능한 리소스 등을 정의합니다. 매니페스트 버전 3을 사용하며 `activeTab`, `storage`, `commands` 및 `scripting` 권한을 선언합니다. `content_scripts`는 모든 URL에 주입되며 문서 로드가 끝난 후 실행됩니다.
*   **`background.js`:** 백그라운드에서 실행되는 서비스 워커로, 아이콘 클릭, 단축키 등의 이벤트를 관리하고, 필요 시 `content script`를 주입하며 `content script`와 통신합니다.
*   **`content.js`:** 웹 페이지에 주입되는 스크립트로, DOM과 직접 상호작용하며, 마이크 오디오를 캡처하고, 전사 및 번역 API를 호출하여 결과를 표시합니다.
*   **`src/utils/api.js`:** OpenAI의 Whisper API를 호출하기 위한 `transcribeAudio` 함수를 포함합니다 (전사).
*   **`src/utils/translation.js`:** OpenAI의 GPT API를 호출하기 위한 `translateText` 함수를 포함합니다 (번역).
*   **`src/utils/ui.js`:** 배너, 대화 상자, 복사 버튼 등 사용자 인터페이스 관리를 위한 유틸리티 함수들을 포함합니다.
*   **`src/constants.js`:** 구성, 상태, 동작 등을 정의하는 상수를 포함합니다.
*   **`src/pages/options/`:** 확장 프로그램 옵션 페이지를 위한 파일들 (HTML, CSS, JavaScript)을 포함합니다.

### 전사 및 번역 프로세스

1.  **녹음 시작:** 사용자가 확장 아이콘을 클릭하거나 단축키를 사용해 녹음을 시작합니다. `background script`는 `content script`에 녹음 시작 메시지를 전송합니다.
2.  **오디오 캡처:** `content script`는 `navigator.mediaDevices.getUserMedia` API를 사용하여 마이크에 접근하고 오디오를 녹음합니다.
3.  **전사:** `content script`는 `src/utils/api.js`의 `transcribeAudio` 함수를 사용해 오디오를 OpenAI의 Whisper API에 전송하며, API는 전사된 텍스트를 반환합니다.
4.  **번역 (선택 사항):** 번역 옵션이 활성화된 경우, `content script`는 `src/utils/translation.js`의 `translateText` 함수를 사용해 전사된 텍스트를 OpenAI의 GPT API에 전송하며, API는 번역된 텍스트를 반환합니다.
5.  **표시:** `content script`는 전사된 텍스트(및 선택적으로 번역된 텍스트)를 텍스트 입력 필드(또는 편집 가능한 요소)에 삽입하거나 별도의 대화 상자에 표시합니다.

### 통신

`background script`와 `content script` 간의 통신은 Chrome의 메시지 API(`chrome.runtime.sendMessage`와 `chrome.runtime.onMessage`)를 통해 이루어집니다.

### 데이터 저장

확장 프로그램은 `chrome.storage.sync`를 사용하여 다음 데이터를 저장합니다:

*   OpenAI API 키(`apiKey`).
*   확장 옵션 (표시, 번역, 상태 표시줄 색상 등).

이 데이터는 사용자의 컴퓨터에 있는 Chrome 확장 프로그램 저장소에 로컬로 저장됩니다.

### 오류 관리

누락된 API 키, 전사 오류 등 가능한 오류는 `constants.js` 파일에 정의되어 있습니다. `api.js`와 `translation.js` 함수는 API 호출 중 발생할 수 있는 오류를 처리하며, `content.js`는 페이지 상단의 배너를 통해 사용자에게 오류 메시지를 표시합니다.

## 🛡️ 보안 및 개인정보 보호

- **데이터 보호:**
  - API 키는 Chrome에 안전하게 저장됩니다.
  - 확장 프로그램은 오디오 데이터를 저장하지 않으며, 모든 처리는 실시간으로 이루어집니다.
  - API와의 통신은 보안 HTTPS 연결을 통해 이루어집니다.

BabelFishAI가 귀하의 데이터를 관리하는 방식에 대한 자세한 내용은 당사의 [개인정보 보호정책](PRIVACY.md)을 참조하세요.

## 🔧 문제 해결

- **마이크 문제:**
  - Chrome에서 마이크 접근 권한을 확인하세요.
  - 다른 애플리케이션이 동시에 마이크를 사용하고 있지 않은지 확인하세요.

- **전사/번역 오류:**
  - API 키가 유효하고 활성화되어 있는지 확인하세요.
  - 안정적인 인터넷 연결이 있는지 확인하세요.
  - 오류 발생 시 자세한 로그를 확인하기 위해 Chrome 콘솔을 참고하세요.

## 🤝 기여

기여 및 제안은 언제나 환영합니다. 기여 방법:
- GitHub의 Issues 섹션을 통해 버그를 신고하세요.
- 개선 사항이나 새로운 기능을 제안하세요.
- Pull Request를 제출하세요.

## 📄 라이선스

이 확장 프로그램은 GNU Affero General Public License v3.0 (AGPL-3.0) 하에 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

## 💝 후원

이 확장 프로그램이 마음에 드신다면 [PayPal](https://paypal.me/jls)을 통해 개발을 후원하실 수 있습니다.
---
jls42.org에서 정열과 혁신으로 개발된 Babel Fish AI는 최첨단 인공지능을 통해 음성 전사와 번역을 새로운 지평으로 확장합니다.

**이 문서는 o3-mini 모델을 사용하여 프랑스어 버전에서 한국어로 번역되었습니다. 번역 프로세스에 대한 자세한 내용은 https://gitlab.com/jls42/ai-powered-markdown-translator 를 참조하십시오.**

