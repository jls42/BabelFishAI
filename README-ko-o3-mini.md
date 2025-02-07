# Babel Fish AI - AI를 활용한 음성 전사 및 번역 확장 프로그램

Babel Fish AI는 원래 강력한 음성 전사를 제공하기 위해 설계된 혁신적인 Chrome 확장 프로그램입니다. OpenAI의 Whisper API를 사용하여 뛰어난 정확성으로 음성을 텍스트로 변환하고, 선택적으로 실시간 자동 번역 기능을 제공합니다. 사용자는 전사만을 위해 Babel Fish AI를 사용하거나 필요에 따라 즉시 번역 기능을 활성화할 수 있습니다.

## 🌟 기능

- **고급 음성 전사**
  - 기기의 마이크를 통해 고품질 오디오 캡처.
  - OpenAI의 Whisper API로 수행되는 정확한 전사.
  - 다양한 언어 지원을 통한 음성 처리 및 텍스트 표시, 여러 언어의 음성 입력을 전사하고 원하는 언어로 결과를 표시할 수 있음.
  - 활성 입력 필드에 텍스트를 자동 삽입하거나 전용 대화 상자에 표시.

- **통합 자동 번역 (선택 사항)**
  - 필요에 따라 활성화할 수 있는 다양한 언어로의 전사 즉시 번역.
  - 원문의 의미에 충실한 번역을 보장하기 위해 고급 AI 모델 사용.
  - 전사만 사용하거나 전사와 번역을 결합하는 방식을 자유롭게 선택 가능.

- **직관적이고 사용자 맞춤형 인터페이스**
  - 유연한 표시 모드: 활성 입력 영역 또는 플로팅 대화 상자.
  - 색상, 불투명도, 표시 지속 시간을 선택할 수 있는 상태 배너.
  - 녹음 시작/정지를 위한 키보드 단축키 (Ctrl+Shift+1 또는 Mac에서는 ⌘+Shift+1).
  - 즉각적인 인식을 위한 마이크와 숫자 “42”가 포함된 맞춤형 아이콘.

- **고급 옵션**
  - 자세한 구성을 위한 전문가 모드 (API URL, 도메인별 구성 등).
  - 전사 및 번역 모델을 사용자 정의할 수 있는 기능.
  - 언어 파일(_locales)을 통한 완벽한 국제화 관리, 다국어 인터페이스 및 음성 지원 제공.

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

1. **Téléchargement et Installation :**
   - GitHub에서 이 저장소를 복제하거나 확장 프로그램 폴더를 수동으로 다운로드합니다.
   - Chrome을 열고 `chrome://extensions/`에 접속합니다.
   - 오른쪽 상단의 “개발자 모드”를 활성화합니다.
   - “압축해제된 확장 프로그램 로드”를 클릭하고 Babel Fish AI 폴더를 선택합니다.

2. **Vérification :**
   - 확장 프로그램이 사용자 지정 아이콘과 함께 Chrome 도구 모음에 나타나는지 확인합니다.

## ⚙️ 구성

1. **OpenAI API 키 :**
   - 확장 프로그램 아이콘을 클릭하여 옵션에 접근합니다.
   - OpenAI API 키를 입력합니다 (키는 [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)에서 확인 가능).

2. **옵션 사용자 정의 :**
   - 표시 모드 (활성 영역 또는 대화 상자)를 선택합니다.
   - 상태 배너의 색상, 불투명도 및 표시 지속 시간을 설정합니다.
   - 전사(음성 입력) 및 텍스트 표시를 위한 언어를 선택합니다.
   - 필요에 따라 번역 기능을 활성화하거나 비활성화합니다.

## 🛠️ 기술 작동 방식

### 확장 프로그램의 아키텍처

이 확장 프로그램은 서로 상호작용하는 여러 JavaScript 파일로 구성됩니다:

*   **`manifest.json`:** 확장 프로그램의 주요 설정 파일입니다. 권한, 스크립트, 접근 가능한 리소스 등을 정의합니다. 매니페스트 버전 3을 사용하며, `activeTab`, `storage`, `commands` 및 `scripting` 권한을 선언합니다. `content_scripts`는 모든 URL에 주입되며 문서 로딩이 끝날 때 실행됩니다.
*   **`background.js`:** 백그라운드에서 실행되는 서비스 워커입니다. 이벤트(아이콘 클릭, 키보드 단축키)를 처리하며, 필요시 `content script`를 주입하고 `content script`와 통신합니다.
*   **`content.js`:** 웹 페이지에 주입되는 스크립트입니다. DOM과 직접 상호작용하며, 마이크 오디오를 캡처하고 전사 및 번역 API를 호출하며 결과를 표시합니다.
*   **`src/utils/api.js`:** OpenAI의 Whisper API를 호출하는 `transcribeAudio` 함수를 포함하여 전사를 수행합니다.
*   **`src/utils/translation.js`:** OpenAI의 GPT API를 호출하는 `translateText` 함수를 포함하여 번역을 수행합니다.
*   **`src/utils/ui.js`:** 사용자 인터페이스(배너, 대화 상자, 복사 버튼) 관리를 위한 유틸리티 함수를 포함합니다.
*   **`src/constants.js`:** 설정, 상태, 동작 등을 위한 상수를 정의합니다.
*   **`src/pages/options/`:** 확장 프로그램 옵션 페이지에 사용되는 파일들 (HTML, CSS, JavaScript)을 포함합니다.

### 전사 및 번역 프로세스

1.  **녹음 시작:** 사용자가 확장 프로그램 아이콘을 클릭하거나 키보드 단축키를 사용하여 녹음을 시작합니다. `background script`는 녹음을 시작하기 위해 `content script`에 메시지를 보냅니다.
2.  **오디오 캡처:** `content script`는 `navigator.mediaDevices.getUserMedia` API를 사용하여 마이크에 접근하고 오디오를 녹음합니다.
3.  **전사:** `content script`는 `src/utils/api.js`의 `transcribeAudio` 함수를 사용하여 오디오를 OpenAI의 Whisper API로 전송합니다. API는 전사된 텍스트를 반환합니다.
4.  **번역 (선택 사항):** 번역 옵션이 활성화된 경우, `content script`는 `src/utils/translation.js`의 `translateText` 함수를 사용하여 전사된 텍스트를 OpenAI의 GPT API로 전송합니다. API는 번역된 텍스트를 반환합니다.
5.  **표시:** `content script`는 전사된 (및 번역된 경우 번역된) 텍스트를 페이지의 활성 요소(텍스트 필드나 편집 가능한 요소일 경우) 또는 대화 상자에 표시합니다.

### 통신

`background script`와 `content script` 간의 통신은 Chrome의 메시징 API (`chrome.runtime.sendMessage` 및 `chrome.runtime.onMessage`)를 통해 이루어집니다.

### 데이터 저장

이 확장 프로그램은 다음을 저장하기 위해 `chrome.storage.sync`를 사용합니다:

*   OpenAI API 키 (`apiKey`).
*   확장 프로그램 옵션 (표시, 번역, 상태 배너 색상 등).

### 오류 관리

누락된 API 키, 전사 오류 등 가능한 오류들은 `constants.js` 파일에 정의되어 있습니다. `api.js` 및 `translation.js` 함수는 API 호출 시 발생 가능한 오류를 처리합니다. `content.js`는 페이지 상단의 배너를 통해 사용자에게 오류 메시지를 표시합니다.

## 🛡️ 보안 및 개인정보 보호

- **데이터 보호:**
  - API 키는 Chrome에 안전하게 저장됩니다.
  - 확장 프로그램은 오디오 데이터를 저장하지 않으며, 모든 처리는 실시간으로 이루어집니다.
  - API와의 통신은 보안 HTTPS 연결을 통해 이루어집니다.

## 🔧 문제 해결

- **마이크 문제:**
  - Chrome의 마이크 접근 권한을 확인하세요.
  - 다른 애플리케이션이 동시에 마이크를 사용하고 있지 않은지 확인하세요.

- **전사/번역 오류:**
  - API 키가 유효하고 활성화되어 있는지 확인하세요.
  - 안정적인 인터넷 연결을 확인하세요.
  - 오류 발생 시 자세한 로그를 위해 Chrome 콘솔을 확인하세요.

## 🤝 기여

기여 및 제안은 언제든지 환영합니다. 기여 방법:
- GitHub의 Issues 섹션을 통해 버그를 신고하세요.
- 개선 사항이나 새로운 기능을 제안하세요.
- Pull request를 제출하세요.

## 📄 라이선스

이 확장 프로그램은 GNU Affero General Public License v3.0 (AGPL-3.0) 라이선스로 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

## 💝 후원

이 확장 프로그램이 마음에 드신다면, [PayPal](https://paypal.me/jls)을 통해 개발을 후원하실 수 있습니다.

---
jls42.org에서 열정과 혁신으로 개발한 Babel Fish AI는 최첨단 인공지능을 통해 전사와 번역을 새로운 지평으로 이끌어갑니다.

**이 문서는 o3-mini 모델을 사용하여 프랑스어 버전에서 한국어로 번역되었습니다. 번역 과정에 대한 자세한 정보는 https://gitlab.com/jls42/ai-powered-markdown-translator 을 참조하십시오.**

