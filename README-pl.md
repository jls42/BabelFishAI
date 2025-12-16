# Babel Fish AI - Rozszerzenie do transkrypcji głosu i tłumaczenia z AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Oficjalna strona: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

**Aby korzystać z rozszerzenia, będziesz potrzebować klucza API od jednego z obsługiwanych dostawców:**

| Dostawca | Uzyskaj klucz API |
|:--------:|:------------------|
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) |
| <img src="images/openai-logo.png" alt="OpenAI" height="30"> | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
| 🚅 | **Custom/LiteLLM**: Aby używać własnych punktów końcowych API |

Babel Fish AI to innowacyjne rozszerzenie Chrome zaprojektowane, aby oferować potężną transkrypcję głosu z obsługą wielu dostawców. Przekształć swój głos w tekst z niezwykłą dokładnością dzięki interfejsom API transkrypcji Mistral AI (Voxtral) lub OpenAI (Whisper) i opcjonalnie korzystaj z automatycznego tłumaczenia w czasie rzeczywistym. Możesz używać Babel Fish AI wyłącznie do transkrypcji lub aktywować tłumaczenie w locie w zależności od potrzeb.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funkcje

- **Zaawansowana transkrypcja głosu**
  - Wysokiej jakości przechwytywanie dźwięku za pomocą mikrofonu urządzenia.
  - Dokładna transkrypcja za pośrednictwem interfejsów API Voxtral (Mistral AI) lub Whisper (OpenAI).
  - Obsługa wielu dostawców: wybierz swobodnie między Mistral AI, OpenAI lub niestandardowym punktem końcowym.
  - Wielojęzyczna obsługa rozpoznawania głosu i wyświetlania tekstu, umożliwiająca transkrypcję danych głosowych w różnych językach i wyświetlanie wyników (transkrypcja i tłumaczenie, jeśli są włączone) w wybranym języku.
  - Automatyczne wstawianie tekstu do aktywnego pola lub wyświetlanie w dedykowanym oknie dialogowym.

- **Inteligentne tłumaczenie i parafrazowanie**
  - Natychmiastowe tłumaczenie transkrypcji na różne języki, włączane w razie potrzeby.
  - Parafrazowanie tekstu w celu poprawy jego stylu i jasności.
  - Wykorzystanie zaawansowanego modelu AI w celu zapewnienia tłumaczenia wiernego pierwotnemu znaczeniu.
  - Wolny wybór korzystania wyłącznie z transkrypcji lub łączenia transkrypcji i tłumaczenia.

- **Potężne menu kontekstowe**
  - Opcja „Parafrazuj zaznaczenie”, aby natychmiast ulepszyć zaznaczone teksty.
  - Opcja „Tłumacz zaznaczenie” z podmenu wszystkich dostępnych języków.
  - Opcja „Popraw pisownię”, aby poprawić błędy ortograficzne, gramatyczne i interpunkcyjne.
  - Bezpośrednia zamiana zaznaczonego tekstu na jego przetłumaczoną, sparafrazowaną lub poprawioną wersję.
  - Bezproblemowa integracja z natywnym interfejsem użytkownika Chrome.

- **Intuicyjny i konfigurowalny interfejs użytkownika**
  - Elastyczny tryb wyświetlania: aktywny obszar wprowadzania lub pływające okno dialogowe.
  - Konfigurowalny baner stanu z wyborem kolorów, przezroczystości i czasu wyświetlania.
  - Skrót klawiaturowy (Ctrl+Shift+1 lub ⌘+Shift+1 na Macu), aby rozpocząć/zatrzymać nagrywanie.
  - Opcja „Pozostaw otwarte”, aby kontrolować czas wyświetlania wyników.
  - Niestandardowa ikona, integrująca mikrofon i cyfrę „42”, dla natychmiastowego rozpoznania.

- **Opcje zaawansowane**
    - Obsługa wielu dostawców: Mistral AI, OpenAI i Custom/LiteLLM dla maksymalnej elastyczności.
    - Możliwość dostosowania modeli transkrypcji i tłumaczenia dla każdego dostawcy.
    - Niezależny wybór dostawcy do transkrypcji i tłumaczenia/parafrazowania.
    - Zgodność z LiteLLM Proxy za pośrednictwem dostawcy Custom w celu połączenia z alternatywnymi modelami.
    - Pełne zarządzanie internacjonalizacją dzięki plikom językowym (_locales), oferujące interfejs i obsługę głosową w wielu językach.

## 🌐 Obsługiwane języki

Oto lista języków obsługiwanych przez Babel Fish AI wraz z linkami do filmów demonstracyjnych:

- [Arabski](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [Niemiecki](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [Angielski](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [Hiszpański](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [Francuski](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [Włoski](https://www.youtube.com/watch?v=QgYZt8myods)
- [Japoński](https://www.youtube.com/watch?v=noHEJCnocH8)
- [Koreański](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [Holenderski](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Polski](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Portugalski](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Rumuński](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Szwedzki](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Chiński](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Instalacja

### Chrome

1.  **Pobieranie i instalacja:**
    - Sklonuj to repozytorium z GitHub lub pobierz folder rozszerzenia ręcznie.
    - **Lub zainstaluj rozszerzenie bezpośrednio z [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Otwórz Chrome i przejdź do `chrome://extensions/`.
    - Włącz „Tryb dewelopera" w prawym górnym rogu.
    - Kliknij „Załaduj rozpakowane" i wybierz folder Babel Fish AI.

2.  **Weryfikacja:**
    - Upewnij się, że rozszerzenie pojawia się na pasku narzędzi Chrome z niestandardową ikoną.

### Firefox

1.  **Instalacja ze sklepu:**
    - Rozszerzenie będzie wkrótce dostępne w [Firefox Add-ons](https://addons.mozilla.org/).

2.  **Tymczasowa instalacja (rozwój):**
    - Otwórz Firefox i przejdź do `about:debugging#/runtime/this-firefox`.
    - Kliknij „Załaduj tymczasowy dodatek...".
    - Wybierz plik `manifest.firefox.json` w katalogu głównym projektu.

## ⚙️ Konfiguracja

1.  **Konfiguracja dostawcy AI:**
    *   Kliknij ikonę rozszerzenia, aby uzyskać dostęp do opcji.
    *   Wybierz swojego dostawcę z menu rozwijanego (Mistral AI, OpenAI lub Custom/LiteLLM).
    *   Wprowadź swój klucz API:
        - **Mistral AI**: dostępny na [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        - **OpenAI**: dostępny na [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    *   Aktywuj dostawcę za pomocą przełącznika obok menu rozwijanego.

2.  **Dostosowywanie opcji:**
    *   Wybierz tryb wyświetlania (aktywny obszar lub okno dialogowe).
    *   Skonfiguruj kolor, przezroczystość i czas wyświetlania banera stanu.
    *   Wybierz języki do transkrypcji (wprowadzanie głosowe) i wyświetlania tekstu.
    *   Włącz lub wyłącz funkcję tłumaczenia w zależności od potrzeb.

3.  **(Opcjonalnie) Zaawansowana konfiguracja modelu:**
    *   W opcjach każdego dostawcy kliknij „Konfiguracja modelu”, aby dostosować używane modele.
    *   Możesz dodać niestandardowe modele do transkrypcji i tłumaczenia/parafrazowania.
    *   Jeśli włączonych jest wielu dostawców, możesz wybrać, którego użyć dla każdej usługi (transkrypcja i tłumaczenie).

## 🚀 Użycie z LiteLLM Proxy lub niestandardowymi punktami końcowymi

Babel Fish AI jest kompatybilny z [LiteLLM Proxy](https://litellm.ai/) i innymi serwerami proxy API kompatybilnymi z OpenAI, co pozwala na korzystanie z alternatywnych modeli językowych.

### Konfiguracja

1.  **Zainstaluj i skonfiguruj swój serwer proxy:** Postępuj zgodnie z instrukcjami dla używanej usługi (LiteLLM itp.).
2.  **Skonfiguruj rozszerzenie Babel Fish AI:**
    *   W opcjach rozszerzenia wybierz dostawcę **Custom/LiteLLM** z menu rozwijanego.
    *   Wprowadź swój klucz API (jeśli jest wymagany).
    *   Skonfiguruj adresy URL API:
        - **URL Transkrypcji**: np. `http://localhost:4000/v1/audio/transcriptions`
        - **URL Czatu**: np. `http://localhost:4000/v1/chat/completions`
    *   Aktywuj dostawcę za pomocą przełącznika.
    *   Zaznacz opcję **„NoLog”**, jeśli chcesz wyłączyć rejestrowanie żądań przez LiteLLM.

**Ważne:** Opcja „NoLog” jest dostępna **tylko** w dostawcy Custom/LiteLLM. Nie jest kompatybilna z oficjalnymi interfejsami API OpenAI lub Mistral AI.

## 🛠️ Działanie techniczne

### Architektura rozszerzenia

Rozszerzenie składa się z kilku plików JavaScript, które wchodzą ze sobą w interakcje:

#### Pliki główne

*   **`manifest.json`:** Główny plik konfiguracyjny rozszerzenia. Definiuje uprawnienia, skrypty, dostępne zasoby itp. Używa Manifest V3 i deklaruje uprawnienia `activeTab`, `storage`, `commands`, `scripting` i `contextMenus`.
*   **`background.js`:** Service worker działający w tle. Obsługuje zdarzenia (kliknięcie ikony, skróty klawiaturowe, menu kontekstowe), wstrzykuje `content script` w razie potrzeby i komunikuje się z `content script`.
*   **`content.js`:** Główny skrypt wstrzykiwany do stron internetowych. Koordynuje różne moduły narzędziowe i zarządza globalnym przepływem rozszerzenia.
*   **`src/constants.js`:** Definiuje stałe dla konfiguracji, stanów, akcji itp.

#### Moduły narzędziowe

Rozszerzenie wykorzystuje architekturę modułową z kilkoma wyspecjalizowanymi plikami narzędziowymi:

##### Zarządzanie dostawcami i API

*   **`src/utils/providers.js`:** Rejestr dostawców AI (Mistral AI, OpenAI, Custom/LiteLLM) wraz z ich konfiguracjami, modelami i domyślnymi adresami URL.
*   **`src/utils/api-utils.js`:** Funkcje do interakcji z zewnętrznymi interfejsami API, rozwiązywania konfiguracji wielu dostawców i transkrypcji audio.
*   **`src/utils/text-processing.js`:** Funkcje przetwarzania tekstu: tłumaczenie, parafrazowanie, korekta pisowni.

##### Interfejs użytkownika i interakcja

*   **`src/utils/ui.js`:** Ogólne funkcje narzędziowe dla interfejsu użytkownika.
*   **`src/utils/banner-utils.js`:** Zarządza banerem stanu, jego kontrolkami i wyborem języka.
*   **`src/utils/focus-utils.js`:** Zarządza zapisywaniem i przywracaniem fokusu i zaznaczania tekstu.
*   **`src/utils/transcription-display.js`:** Zarządza wyświetlaniem wyników transkrypcji.
*   **`src/utils/error-utils.js`:** Zarządza wyświetlaniem i obsługą błędów.
*   **`src/styles/content.css`:** Style CSS dla interfejsu użytkownika wstrzykiwanego do stron internetowych.

##### Nagrywanie i zdarzenia

*   **`src/utils/recording-utils.js`:** Zarządza nagrywaniem dźwięku za pomocą mikrofonu i przetwarzaniem danych audio.
*   **`src/utils/event-handlers.js`:** Zawiera procedury obsługi zdarzeń dla interakcji użytkownika.

##### Internacjonalizacja i języki

*   **`src/utils/languages.js`:** Definiuje języki obsługiwane przez rozszerzenie.
*   **`src/utils/languages-shared.js`:** Definiuje listę obsługiwanych języków dla kontekstu strony internetowej.
*   **`src/utils/languages-data.js`:** Definiuje listę obsługiwanych języków dla service workera.
*   **`src/utils/i18n.js`:** Zarządza internacjonalizacją interfejsu użytkownika.

##### Strona opcji

*   **`src/pages/options/`:** Zawiera pliki dla strony opcji rozszerzenia (HTML, CSS, JavaScript).

### Proces transkrypcji i tłumaczenia

#### Główna funkcja transkrypcji głosu

1.  **Rozpoczęcie nagrywania:** Użytkownik rozpoczyna nagrywanie, klikając ikonę rozszerzenia lub używając skrótu klawiaturowego (Ctrl+Shift+1 lub ⌘+Shift+1 na Macu). `background script` wysyła wiadomość do `content script`, aby rozpocząć nagrywanie.
2.  **Przechwytywanie dźwięku:** `content script` używa interfejsu API `navigator.mediaDevices.getUserMedia`, aby uzyskać dostęp do mikrofonu i nagrywać dźwięk za pośrednictwem interfejsu API MediaRecorder.
3.  **Transkrypcja:** `content script` używa funkcji `transcribeAudio` (`src/utils/api-utils.js`), aby wysłać dźwięk do interfejsu API transkrypcji skonfigurowanego dostawcy (Voxtral dla Mistral AI, Whisper dla OpenAI). API zwraca transkrybowany tekst.
4.  **Tłumaczenie lub parafrazowanie (opcjonalne):**
   - Jeśli opcja tłumaczenia jest włączona, `content script` używa funkcji `translateText` (`src/utils/text-processing.js`), aby wysłać transkrybowany tekst do interfejsu API czatu skonfigurowanego dostawcy.
   - Jeśli opcja parafrazowania jest włączona, używana jest funkcja `rephraseText` w celu ulepszenia transkrybowanego tekstu.
5.  **Wyświetlanie:** `content script` wyświetla przetworzony tekst w aktywnym elemencie strony (jeśli jest to pole tekstowe lub element edytowalny) lub w niestandardowym oknie dialogowym.

#### Funkcja menu kontekstowego

1. **Zaznaczanie tekstu:** Użytkownik zaznacza tekst na stronie internetowej.
2. **Menu kontekstowe:** Kliknięcie prawym przyciskiem myszy wyświetla opcje:
   - „Parafrazuj zaznaczenie”, aby poprawić styl i jasność
   - „Tłumacz zaznaczenie” z podmenu dostępnych języków
   - „Popraw pisownię”, aby poprawić błędy
3. **Przetwarzanie:** W zależności od wybranej opcji:
   - Tekst jest wysyłany do parafrazowania za pośrednictwem funkcji `rephraseText`
   - Tekst jest wysyłany do tłumaczenia za pośrednictwem funkcji `translateText` z wybranym językiem docelowym
   - Tekst jest wysyłany do korekty za pośrednictwem funkcji `correctText`
4. **Wyświetlanie:** Wynik zastępuje pierwotne zaznaczenie w elemencie, w którym znajduje się zaznaczony tekst.

### Komunikacja

Komunikacja między `background script` a `content script` odbywa się za pośrednictwem interfejsu API wiadomości Chrome (`chrome.runtime.sendMessage` i `chrome.runtime.onMessage`).

### Przechowywanie danych

Rozszerzenie używa `chrome.storage.sync` do przechowywania:

*   Konfiguracji dostawcy AI (klucze API, wybrane modele, niestandardowe adresy URL).
*   Opcji rozszerzenia (wyświetlanie, tłumaczenie, kolory banerów itp.).
*   Preferencji językowych dla tłumaczenia.

Dane te są przechowywane lokalnie na komputerze w pamięci rozszerzenia Chrome.

### Obsługa błędów
Możliwe błędy (brak klucza API, błąd transkrypcji itp.) są zdefiniowane w pliku `constants.js`. Funkcje `api-utils.js` i `text-processing.js` obsługują potencjalne błędy wywołań API za pomocą ulepszonych komunikatów opartych na kodzie HTTP. `content.js` wyświetla komunikaty o błędach użytkownikowi za pośrednictwem banera na dole strony.


## 🛡️ Bezpieczeństwo i prywatność

- **Ochrona danych:**
  - Klucz API jest bezpiecznie przechowywany w Chrome.
  - Rozszerzenie nie przechowuje danych audio; wszystkie przetwarzanie odbywa się w czasie rzeczywistym.
  - Komunikacja z interfejsami API odbywa się za pośrednictwem bezpiecznych połączeń HTTPS.

Aby uzyskać pełne informacje na temat sposobu zarządzania danymi przez BabelFishAI, zapoznaj się z naszą [Polityką prywatności](PRIVACY.md).

## 🔧 Rozwiązywanie problemów

- **Problemy z mikrofonem:**
  - Sprawdź uprawnienia dostępu do mikrofonu w Chrome.
  - Upewnij się, że żadna inna aplikacja nie używa jednocześnie mikrofonu.

- **Błędy transkrypcji/tłumaczenia:**
  - Sprawdź, czy klucz API jest ważny i aktywny.
  - Upewnij się, że masz stabilne połączenie internetowe.
  - Sprawdź konsolę Chrome, aby uzyskać szczegółowe dzienniki w przypadku błędów.

## 🤝 Wkład

Wkład i sugestie są mile widziane. Aby wnieść wkład:
- Zgłoś błędy za pośrednictwem sekcji Issues na GitHub.
- Zaproponuj ulepszenia lub nowe funkcje.
- Prześlij swoje pull requests.

## 📄 Licencja

To rozszerzenie jest dystrybuowane na licencji GNU Affero General Public License v3.0 (AGPL-3.0). Zobacz plik LICENSE, aby uzyskać więcej informacji.

## 💝 Wsparcie

Jeśli doceniasz to rozszerzenie, możesz wesprzeć jego rozwój, przekazując darowiznę za pośrednictwem [PayPal](https://paypal.me/jls).
---
Opracowane przez jls42.org z pasją i innowacją, Babel Fish AI napędza transkrypcję i tłumaczenie ku nowym horyzontom dzięki najnowocześniejszej sztucznej inteligencji.
