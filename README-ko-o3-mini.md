# Babel Fish AI - 음성 전사 및 AI 번역 확장 프로그램

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**확장 프로그램을 사용하려면 OpenAI API 키(또는 LiteLLM Proxy를 사용하는 경우 제3자 공급자의 API 키)가 필요합니다. 여기서 OpenAI API 키를 생성할 수 있습니다 : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI는 강력한 음성 전사를 제공하기 위해 원래 설계된 혁신적인 Chrome 확장 프로그램입니다. OpenAI의 Whisper API를 통해 놀라운 정확도로 음성을 텍스트로 변환하고, 선택적으로 실시간 자동 번역 기능을 제공합니다. Babel Fish AI를 전사 전용으로 사용하거나 필요에 따라 실시간 번역 기능을 활성화할 수 있습니다.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 주요 기능

- **고급 음성 전사**
  - 기기의 마이크를 통해 고품질 오디오 캡처.
  - OpenAI Whisper API를 통해 정밀하게 수행되는 전사.
  - 다양한 언어의 음성 인식과 텍스트 표시를 지원하여 여러 언어의 음성 입력을 전사하고, 결과(전사 및 번역이 활성화된 경우)를 원하는 언어로 표시.
  - 활성 입력 필드에 텍스트를 자동 삽입하거나 전용 대화 상자에 표시.

- **내장 자동 번역 (선택 사항)**
  - 필요 시 활성화 가능한 다양한 언어로의 전사 즉시 번역.
  - 원래 의미에 충실한 번역을 보장하기 위해 고급 AI 모델 사용.
  - 전사만 사용하거나 전사와 번역을 결합하여 자유롭게 선택 가능.

- **직관적이고 사용자 정의 가능한 인터페이스**
  - 유연한 표시 모드: 활성 입력 영역 또는 플로팅 대화 상자.
  - 색상, 불투명도 및 표시 지속 시간을 선택할 수 있는 구성 가능한 상태 배너.
  - 녹음을 시작/중지하기 위한 단축키 (Ctrl+Shift+1 또는 Mac에서는 ⌘+Shift+1).
  - 마이크와 숫자 “42”가 통합된 맞춤형 아이콘으로 즉각적인 인식 제공.

- **고급 옵션**
    - 자세한 구성(예: API URL, 도메인별 구성 등)을 위한 전문가 모드.
    - 전사 및 번역 모델을 사용자 정의할 수 있는 기능.
    - 대체 언어 모델에 연결하고 요청 로깅을 비활성화하기 위해 LiteLLM Proxy와 호환.
    - _locales 파일을 통한 완벽한 국제화 지원으로 여러 언어의 인터페이스 및 음성 지원 제공.

## 🌐 지원 언어

다음은 Babel Fish AI가 지원하는 언어 목록이며, 데모 영상 링크도 포함되어 있습니다:

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

1.  **다운로드 및 설치 :**
    - GitHub에서 이 저장소를 클론하거나 확장 프로그램 폴더를 수동으로 다운로드합니다.
    - **또는 [Chrome 웹 스토어](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)에서 직접 확장 프로그램을 설치합니다.**
    - Chrome을 열고 `chrome://extensions/`에 접속합니다.
    - 오른쪽 상단에서 "개발자 모드"를 활성화합니다.
    - "압축해제된 확장 프로그램 로드" 버튼을 클릭하고 Babel Fish AI 폴더를 선택합니다.

2.  **확인 :**
    - Chrome 도구 모음에 맞춤형 아이콘과 함께 확장 프로그램이 나타나는지 확인합니다.

## ⚙️ 설정

1.  **OpenAI API 키 :**
    *   확장 프로그램 아이콘을 클릭하여 옵션에 접속합니다.
    *   OpenAI API 키를 입력합니다 (사용 가능: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **옵션 사용자 정의 :**
    *   표시 모드(활성 영역 또는 대화 상자)를 선택합니다.
    *   상태 배너의 색상, 불투명도 및 표시 시간을 설정합니다.
    *   전사(음성 입력) 및 텍스트 표시 언어를 선택합니다.
    *   필요에 따라 번역 기능을 활성화하거나 비활성화합니다.

3.  **(선택 사항) LiteLLM Proxy 사용 :**
    *   옵션에서 "전문가 모드"를 활성화합니다.
    *   "고급 구성" 섹션에서 API(Whisper와 번역) 두 개의 URL을 귀하의 LiteLLM Proxy 인스턴스를 가리키도록 수정합니다. **두 URL 모두 동일한 기본 URL을 사용하십시오.**
    *   LiteLLM의 요청 로깅을 비활성화하려면 "NoLog (LiteLLM 전용)" 옵션을 선택합니다.

## 🚀 LiteLLM Proxy 사용

OpenAI 이외의 언어 모델을 사용하고자 하는 경우, LiteLLM Proxy를 사용할 수 있습니다. 다음은 설정 방법입니다:

Babel Fish AI는 [LiteLLM Proxy](https://litellm.ai/)와 호환되며, 이를 통해 OpenAI API와 호환되는 대체 언어 모델을 사용할 수 있습니다.

### 설정

1.  **LiteLLM Proxy 설치 및 구성 :** LiteLLM 웹사이트의 지침을 따르십시오.
2.  **Babel Fish AI 확장 프로그램 구성 :**
    *   확장 프로그램 옵션(아이콘을 우클릭하여 > 옵션)에서 "전문가 모드"를 활성화합니다.
    *   "고급 구성" 섹션에서 API(Whisper와 번역) 두 개의 URL을 귀하의 LiteLLM Proxy 인스턴스를 가리키도록 수정합니다 (예: `http://localhost:4000/v1/audio/transcriptions` 및 `http://localhost:4000/v1/chat/completions`). **두 URL 모두 동일한 기본 URL을 사용하십시오.**
    *   LiteLLM의 요청 로깅을 비활성화하려면 "NoLog (LiteLLM 전용)" 옵션을 선택합니다.

**중요 :** "NoLog" 옵션은 오직 LiteLLM Proxy와 함께 사용하기 위해 설계되었습니다. OpenAI 공식 API를 사용하는 경우 **활성화하지 마십시오**, 이는 오류를 발생시키며 번역 기능을 방해할 수 있습니다.

## 🛠️ 기술 작동 방식

### 확장 프로그램 아키텍처

이 확장 프로그램은 여러 JavaScript 파일로 구성되어 있으며, 이들은 서로 상호작용합니다:

*   **`manifest.json`:** 확장 프로그램의 주요 구성 파일로, 권한, 스크립트, 접근 가능한 리소스 등을 정의합니다. 매니페스트 버전 3을 사용하며 `activeTab`, `storage`, `commands`, `scripting` 권한을 선언합니다. `content_scripts`는 모든 URL에 주입되며 문서 로드가 끝날 때 실행됩니다.
*   **`background.js`:** 백그라운드에서 실행되는 서비스 워커로, 아이콘 클릭, 단축키 등의 이벤트를 관리하며 필요 시 `content script`를 주입하고 이와 통신합니다.
*   **`content.js`:** 웹페이지에 주입되는 스크립트로, DOM과 직접 상호작용하며, 마이크에서 오디오를 캡처하고, 전사 및 번역 API를 호출하여 결과를 표시합니다.
*   **`src/utils/api.js`:** OpenAI Whisper API(전사)를 호출하기 위한 `transcribeAudio` 함수를 포함합니다.
*   **`src/utils/translation.js`:** OpenAI GPT API(번역)를 호출하기 위한 `translateText` 함수를 포함합니다.
*   **`src/utils/ui.js`:** 배너, 대화 상자, 복사 버튼과 같은 사용자 인터페이스를 관리하기 위한 유틸리티 함수를 포함합니다.
*   **`src/constants.js`:** 구성, 상태, 작업 등을 위한 상수를 정의합니다.
*   **`src/pages/options/`:** 확장 프로그램 옵션 페이지를 위한 파일들(HTML, CSS, JavaScript)을 포함합니다.

### 전사 및 번역 프로세스

1.  **녹음 시작 :** 사용자가 확장 프로그램 아이콘을 클릭하거나 단축키를 사용하여 녹음을 시작합니다. `background script`는 녹음을 시작하기 위해 `content script`에 메시지를 보냅니다.
2.  **오디오 캡처 :** `content script`는 `navigator.mediaDevices.getUserMedia` API를 사용하여 마이크에 접근하고 오디오를 녹음합니다.
3.  **전사 :** `content script`는 `transcribeAudio` 함수(`src/utils/api.js`)를 사용하여 오디오를 OpenAI Whisper API에 전송합니다. API는 전사된 텍스트를 반환합니다.
4.  **번역 (선택 사항) :** 번역 옵션이 활성화된 경우, `content script`는 `translateText` 함수(`src/utils/translation.js`)를 사용하여 전사된 텍스트를 OpenAI GPT API에 전송합니다. API는 번역된 텍스트를 반환합니다.
5.  **표시 :** `content script`는 전사된 텍스트(및 경우에 따라 번역된 텍스트)를 페이지의 활성 요소(텍스트 필드나 편집 가능한 요소인 경우) 또는 대화 상자에 표시합니다.

### 통신

`background script`와 `content script` 간의 통신은 Chrome의 메시징 API(`chrome.runtime.sendMessage` 및 `chrome.runtime.onMessage`)를 통해 이루어집니다.

### 데이터 저장

확장 프로그램은 `chrome.storage.sync`를 사용하여 다음을 저장합니다:

*   OpenAI API 키 (`apiKey`).
*   확장 프로그램 옵션(표시, 번역, 배너 색상 등).

이 데이터는 Chrome 확장 프로그램의 스토리지에 로컬로 저장됩니다.

### 오류 관리
누락된 API 키, 전사 오류 등 가능한 오류들은 `constants.js` 파일에 정의되어 있습니다. `api.js`와 `translation.js` 함수는 API 호출 시 발생 가능한 오류를 처리합니다. `content.js`는 페이지 상단의 배너를 통해 사용자에게 오류 메시지를 표시합니다.

## 🛡️ 보안 및 개인정보 보호

- **데이터 보호 :**
  - API 키는 Chrome 내에 안전하게 저장됩니다.
  - 확장 프로그램은 오디오 데이터를 저장하지 않으며, 모든 처리는 실시간으로 이루어집니다.
  - API와의 통신은 보안 HTTPS 연결을 통해 이루어집니다.

BabelFishAI가 귀하의 데이터를 어떻게 처리하는지에 대한 자세한 정보는 당사의 [개인정보 보호정책](PRIVACY.md)을 참조하십시오.

## 🔧 문제 해결

- **마이크 문제 :**
  - Chrome에서 마이크 접근 권한을 확인하십시오.
  - 다른 애플리케이션이 동시에 마이크를 사용하고 있지 않은지 확인하십시오.

- **전사/번역 오류 :**
  - API 키가 유효하고 활성화되어 있는지 확인하십시오.
  - 안정적인 인터넷 연결 상태인지 확인하십시오.
  - 오류 발생 시 Chrome 콘솔에서 자세한 로그를 확인하십시오.

## 🤝 기여

기여와 제안은 언제나 환영합니다. 기여하시려면:
- GitHub의 Issues 섹션을 통해 버그를 보고하십시오.
- 개선 사항이나 새로운 기능을 제안하십시오.
- pull request를 제출하십시오.

## 📄 라이선스

이 확장 프로그램은 GNU Affero General Public License v3.0 (AGPL-3.0) 라이선스 하에 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하십시오.

## 💝 후원

이 확장 프로그램을 마음에 들어 하신다면, [PayPal](https://paypal.me/jls)을 통해 개발을 후원하실 수 있습니다.
---
jls42.org가 열정과 혁신으로 개발한 Babel Fish AI는 최첨단 인공지능을 통해 전사 및 번역 기술을 새로운 지평으로 이끌어갑니다.

**이 문서는 o3-mini 모델을 사용하여 프랑스어 버전에서 한국어로 번역되었습니다. 번역 과정에 대한 자세한 정보를 확인하려면 https://gitlab.com/jls42/ai-powered-markdown-translator 를 참조하십시오.**

