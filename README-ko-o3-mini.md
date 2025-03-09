# Babel Fish AI - 음성 전사 및 AI 번역 확장 프로그램

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**확장을 사용하려면 OpenAI API 키(또는 LiteLLM Proxy를 사용하는 경우 제3자 공급자)가 필요합니다. OpenAI API 키는 여기에서 생성할 수 있습니다: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI는 원래 강력한 음성 전사를 제공하기 위해 설계된 혁신적인 Chrome 확장 프로그램입니다. OpenAI의 Whisper API를 통해 놀라운 정확도로 음성을 텍스트로 변환하고, 선택적으로 실시간 자동 번역 기능도 누릴 수 있습니다. Babel Fish AI를 전사 전용으로 사용하거나 필요에 따라 즉시 번역 기능을 활성화할 수 있습니다.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 기능

- **고급 음성 전사**
  - 기기의 마이크를 통해 고품질 오디오 캡처.
  - OpenAI의 Whisper API를 사용하여 정확한 전사 수행.
  - 다양한 언어의 음성 인식 및 텍스트 표시를 지원하여, 여러 언어로 음성 입력을 전사하고 (전사 및 번역 기능이 활성화된 경우) 원하는 언어로 결과를 표시.
  - 활성 입력 필드에 텍스트를 자동 삽입하거나 전용 대화 상자에 표시.

- **지능적인 번역 및 재구성**
  - 필요에 따라 활성화할 수 있는 다양한 언어로 전사의 즉각적인 번역.
  - 텍스트의 스타일과 명확성을 향상시키기 위한 재구성.
  - 원래 의미에 충실한 번역을 보장하기 위해 고급 AI 모델 사용.
  - 전사만 단독으로 사용하거나 전사와 번역을 결합하여 자유롭게 선택 가능.

- **강력한 컨텍스트 메뉴**
  - 선택한 텍스트를 즉시 개선하는 "선택 항목 재구성" 옵션.
  - 사용 가능한 모든 언어의 하위 메뉴와 함께 제공되는 "선택 항목 번역" 옵션.
  - 선택된 텍스트를 번역되거나 재구성된 버전으로 직접 교체.
  - Chrome의 기본 사용자 인터페이스에 완벽하게 통합.

- **직관적이고 사용자 정의가 가능한 사용자 인터페이스**
  - 유연한 표시 모드: 활성 입력 영역 또는 플로팅 대화 상자.
  - 색상, 불투명도 및 표시 기간을 선택할 수 있는 상태 배너.
  - 녹음을 시작/중지하기 위한 키보드 단축키 (Ctrl+Shift+1 또는 Mac에서는 ⌘+Shift+1).
  - 결과 표시 기간을 제어할 수 있는 "항상 열어두기" 옵션.
  - 즉각적인 인식을 위한 마이크와 숫자 "42"를 포함한 맞춤 아이콘.

- **고급 옵션**
    - 세부 설정(예: API URL, 도메인별 구성 등)을 위한 전문가 모드.
    - 전사 및 번역 모델을 사용자 정의할 수 있는 선택권.
    - 대체 언어 모델에 연결하고 요청 로깅을 비활성화할 수 있는 LiteLLM Proxy와의 호환성.
    - 다국어 파일(_locales)을 통한 완벽한 국제화 관리로, 다국어 사용자 인터페이스 및 음성 지원 제공.

## 🌐 지원 언어

다음은 Babel Fish AI가 지원하는 언어 목록과 데모 영상 링크입니다:

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
    - GitHub에서 이 저장소를 클론하거나 확장 프로그램 폴더를 수동으로 다운로드합니다.
    - **또는 [Chrome 웹 스토어](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)에서 직접 확장을 설치합니다.**
    - Chrome을 열고 `chrome://extensions/` 주소로 이동합니다.
    - 우측 상단에서 «개발자 모드»를 활성화합니다.
    - «압축 해제된 확장 프로그램 로드»를 클릭하고 Babel Fish AI 폴더를 선택합니다.

2.  **확인:**
    - 확장 프로그램이 Chrome 도구 모음에 맞춤 아이콘과 함께 나타나는지 확인합니다.

## ⚙️ 구성

1.  **OpenAI API 키:**
    *   확장 프로그램 아이콘을 클릭하여 옵션에 접근합니다.
    *   OpenAI API 키를 입력합니다(키는 [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)에서 확인 가능).

2.  **옵션 사용자 정의:**
    *   표시 모드(활성 영역 또는 대화 상자)를 선택합니다.
    *   상태 배너의 색상, 불투명도 및 표시 기간을 구성합니다.
    *   음성 전사용 언어와 텍스트 표시 언어를 선택합니다.
    *   필요에 따라 번역 기능을 활성화하거나 비활성화합니다.

3.  **(선택 사항) LiteLLM Proxy와 함께 사용:**
    *   옵션에서 «전문가 모드»를 활성화합니다.
    *   «고급 구성» 섹션에서 LiteLLM Proxy 인스턴스를 가리키도록 API(Whisper 및 번역)의 **두 URL 모두를** 수정합니다. **두 URL 모두 동일한 기본 URL을 사용하십시오.**
    *   LiteLLM의 요청 로깅을 비활성화하려면 "NoLog (LiteLLM 전용)" 옵션을 체크합니다.

## 🚀 LiteLLM Proxy와 함께 사용

OpenAI 이외의 언어 모델을 사용하려는 경우, LiteLLM Proxy를 사용할 수 있습니다. 구성 방법은 다음과 같습니다:

Babel Fish AI는 OpenAI와 호환되는 API를 사용하는 대체 언어 모델을 사용할 수 있게 해주는 [LiteLLM Proxy](https://litellm.ai/)와 호환됩니다.

### 구성

1.  **LiteLLM Proxy 설치 및 구성:** LiteLLM 웹사이트의 지침을 따르십시오.
2.  **Babel Fish AI 확장 프로그램 구성:**
    *   확장 프로그램 옵션(아이콘에서 우클릭 > 옵션)에서 «전문가 모드»를 활성화합니다.
    *   «고급 구성» 섹션에서 LiteLLM Proxy 인스턴스를 가리키도록 API(Whisper 및 번역)의 **두 URL 모두를** 수정합니다(예: `http://localhost:4000/v1/audio/transcriptions` 및 `http://localhost:4000/v1/chat/completions`). **두 URL 모두 동일한 기본 URL을 사용하십시오.**
    *   LiteLLM의 요청 로깅을 비활성화하려면 "NoLog (LiteLLM 전용)" 옵션을 체크합니다.

**중요:** "NoLog" 옵션은 **오직** LiteLLM Proxy와 함께 사용하기 위해 설계되었습니다. OpenAI 공식 API를 사용하는 경우 **활성화하지 마십시오**, 그렇지 않으면 오류가 발생하여 번역이 작동하지 않습니다.

## 🛠️ 기술 작동 방식

### 확장 프로그램의 아키텍처

확장 프로그램은 서로 상호작용하는 여러 JavaScript 파일로 구성됩니다:

*   **`manifest.json`:** 확장 프로그램의 주요 구성 파일입니다. 권한, 스크립트, 접근 가능한 리소스 등을 정의합니다. 매니페스트 버전 3을 사용하며, `activeTab`, `storage`, `commands`, `scripting` 및 `contextMenus` 권한을 선언합니다. `web_accessible_resources`는 다양한 실행 컨텍스트에서 확장 프로그램 리소스에 접근하도록 허용합니다.
*   **`background.js`:** 백그라운드에서 실행되는 서비스 워커입니다. (아이콘 클릭, 키보드 단축키, 컨텍스트 메뉴) 이벤트를 관리하며, 필요 시 `content script`를 주입하고, `content script`와 통신합니다.
*   **`content.js`:** 웹 페이지에 주입되는 스크립트입니다. DOM과 직접 상호작용하며, 마이크 오디오를 캡처하고, 전사 및 번역 API를 호출하며, 결과를 표시합니다.
*   **`src/utils/api.js`:** API와 상호작용하는 함수를 포함하며, 특히 OpenAI의 Whisper API(전사)를 호출하기 위한 `transcribeAudio`와 저장소 관리를 위한 유틸리티 함수들을 포함합니다.
*   **`src/utils/translation.js`:** OpenAI의 GPT API(번역 및 재구성)를 호출하기 위한 `translateText`와 `rephraseText` 함수를 포함합니다.
*   **`src/utils/ui.js`:** 배너, 대화 상자, 복사 버튼 등 사용자 인터페이스를 관리하는 유틸리티 함수를 포함합니다.
*   **`src/utils/languages-shared.js` 및 `src/utils/languages-data.js`:** 각각 웹 페이지 컨텍스트와 서비스 워커를 위한 지원 언어의 중앙 목록을 정의합니다.
*   **`src/utils/i18n.js`:** 사용자 인터페이스의 국제화를 관리합니다.
*   **`src/constants.js`:** 구성, 상태, 액션 등에 대한 상수를 정의합니다.
*   **`src/pages/options/`:** 확장 프로그램의 옵션 페이지(HTML, CSS, JavaScript)를 위한 파일들을 포함합니다.

### 음성 전사 및 번역 프로세스

#### 주요 음성 전사 기능

1.  **녹음 시작:** 사용자가 확장 프로그램 아이콘을 클릭하거나 키보드 단축키(Ctrl+Shift+1 또는 Mac에서는 ⌘+Shift+1)를 사용하여 녹음을 시작합니다. `background script`는 녹음을 시작하도록 `content script`에 메시지를 전송합니다.
2.  **오디오 캡처:** `content script`는 `navigator.mediaDevices.getUserMedia` API를 사용하여 마이크에 접근하고, MediaRecorder API로 오디오를 녹음합니다.
3.  **전사:** `content script`는 `src/utils/api.js`의 `transcribeAudio` 함수를 사용하여 오디오를 OpenAI의 Whisper API로 전송합니다. API는 전사된 텍스트를 반환합니다.
4.  **번역 또는 재구성 (선택 사항):**
   - 번역 옵션이 활성화된 경우, `content script`는 OpenAI의 GPT API로 전사된 텍스트를 전송하기 위해 `translateText` 함수를 사용합니다.
   - 재구성 옵션이 활성화된 경우, 전사된 텍스트를 개선하기 위해 `rephraseText` 함수가 사용됩니다.
5.  **표시:** `content script`는 처리된 텍스트를 페이지의 활성 요소(텍스트 입력 필드 또는 편집 가능한 요소)에 표시하거나, 맞춤 대화 상자에 표시합니다.

#### 컨텍스트 메뉴 기능

1. **텍스트 선택:** 사용자가 웹 페이지에서 텍스트를 선택합니다.
2. **컨텍스트 메뉴:** 오른쪽 클릭 시 "선택 항목 재구성" 또는 "선택 항목 번역" 옵션과 함께 사용 가능한 언어의 하위 메뉴가 표시됩니다.
3. **처리:** 선택한 옵션에 따라:
   - 텍스트는 `rephraseText` 함수를 통해 재구성됩니다.
   - 텍스트는 선택한 대상 언어로 `translateText` 함수를 통해 번역됩니다.
4.  **표시:** 결과가 원래 텍스트 선택 영역을 대체하여 표시됩니다.

### 통신

`background script`와 `content script` 간의 통신은 Chrome의 메시징 API(`chrome.runtime.sendMessage` 및 `chrome.runtime.onMessage`)를 통해 이루어집니다.

### 데이터 저장

확장 프로그램은 다음을 저장하기 위해 `chrome.storage.sync`를 사용합니다:

*   OpenAI API 키 (`apiKey`).
*   확장 프로그램 옵션(표시, 번역, 배너 색상 등).
*   번역을 위한 언어 설정.

이 데이터는 Chrome 확장 프로그램의 저장소에 로컬로 저장됩니다.

### 오류 관리
API 호출 시 발생할 수 있는 오류(예: 누락된 API 키, 전사 오류 등)는 `constants.js` 파일에서 정의됩니다. `api.js`와 `translation.js` 함수들은 API 호출 시 잠재적 오류를 관리하며, `content.js`는 페이지 상단에 배너를 통해 사용자에게 오류 메시지를 표시합니다.

## 🛡️ 보안 및 개인정보 보호

- **데이터 보호:**
  - API 키는 Chrome에 안전하게 저장됩니다.
  - 확장 프로그램은 음성 데이터를 저장하지 않으며, 모든 처리는 실시간으로 이루어집니다.
  - API와의 통신은 안전한 HTTPS 연결을 통해 이루어집니다.

BabelFishAI가 사용자 데이터를 어떻게 관리하는지에 대한 자세한 내용은 [개인정보 보호정책](PRIVACY.md)을 참조하십시오.

## 🔧 문제 해결

- **마이크 문제:**
  - Chrome에서 마이크 접근 권한을 확인하십시오.
  - 다른 응용 프로그램이 동시에 마이크를 사용하고 있지 않은지 확인하십시오.

- **전사/번역 오류:**
  - API 키가 유효하며 활성 상태인지 확인하십시오.
  - 안정적인 인터넷 연결 상태인지 확인하십시오.
  - 오류 발생 시 자세한 로그는 Chrome 콘솔을 확인하십시오.

## 🤝 기여

기여 및 제안은 언제나 환영합니다. 기여하려면:
- GitHub의 Issues 섹션을 통해 버그를 신고하십시오.
- 개선 사항이나 새로운 기능을 제안하십시오.
- Pull Request를 제출하십시오.

## 📄 라이선스

이 확장 프로그램은 GNU Affero General Public License v3.0 (AGPL-3.0) 하에 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하십시오.

## 💝 후원

이 확장 프로그램이 마음에 드신다면, [PayPal](https://paypal.me/jls)을 통해 개발 지원 후원을 할 수 있습니다.
---
jls42.org가 열정과 혁신으로 개발한 Babel Fish AI는 최첨단 인공지능을 통해 전사와 번역을 새로운 지평으로 이끕니다.

**이 문서는 o3-mini 모델을 사용하여 프랑스어 버전에서 한국어로 번역되었습니다. 번역 과정에 대한 자세한 정보는 https://gitlab.com/jls42/ai-powered-markdown-translator 를 참조하십시오.**

