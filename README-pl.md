**Artykuł przetłumaczony z francuskiego na polski za pomocą gpt-5.6-sol.**

# Babel Fish AI — rozszerzenie do transkrypcji głosu i tłumaczenia z użyciem AI

<img src="images/icon128.png" alt="Ikona Babel Fish AI" width="128" height="128">

**Oficjalna strona: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**Aby korzystać z rozszerzenia, potrzebujesz klucza API jednego z obsługiwanych providerów:**

|                             Provider                             | Uzyskanie klucza API                                                                               |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
|                                🚅                                | **Custom/LiteLLM**: umożliwia korzystanie z własnych endpointów API                                      |

Babel Fish AI to innowacyjne rozszerzenie przeglądarki zapewniające zaawansowaną transkrypcję głosu z obsługą wielu providerów. Przekształcaj mowę w tekst z niezwykłą dokładnością dzięki API transkrypcji Mistral AI (Voxtral) lub OpenAI (Whisper), a opcjonalnie korzystaj również z automatycznego tłumaczenia w czasie rzeczywistym. Możesz używać Babel Fish AI wyłącznie do transkrypcji albo włączyć tłumaczenie na bieżąco, zależnie od potrzeb.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Odznaka Codacy](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Stan bramki jakości](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Ocena bezpieczeństwa](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Ocena łatwości utrzymania](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Luki w zabezpieczeniach](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Problemy z jakością kodu](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Dług techniczny](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Wiersze kodu](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funkcje

-   **Zaawansowana transkrypcja głosu**

    -   Rejestrowanie dźwięku wysokiej jakości za pomocą mikrofonu urządzenia.
    -   Precyzyjna transkrypcja za pośrednictwem API Voxtral (Mistral AI) lub Whisper (OpenAI).
    -   Obsługa wielu providerów: swobodnie wybieraj między Mistral AI, OpenAI a niestandardowym endpointem.
    -   Wielojęzyczna obsługa rozpoznawania mowy i wyświetlania tekstu, umożliwiająca transkrypcję wypowiedzi w różnych językach oraz wyświetlanie wyników (transkrypcji i tłumaczenia, jeśli jest włączone) w wybranym języku.
    -   Automatyczne wstawianie tekstu do aktywnego pola lub wyświetlanie go w osobnym oknie dialogowym.

-   **Inteligentne tłumaczenie i przeformułowywanie**

    -   Natychmiastowe tłumaczenie transkrypcji na różne języki, które można włączyć w razie potrzeby.
    -   Przeformułowywanie tekstu w celu poprawy jego stylu i przejrzystości.
    -   Wykorzystanie zaawansowanego modelu AI w celu zapewnienia tłumaczenia wiernego pierwotnemu znaczeniu.
    -   Swobodny wybór między korzystaniem wyłącznie z transkrypcji a połączeniem transkrypcji i tłumaczenia.

-   **Rozbudowane menu kontekstowe**

    -   Opcja „Przeformułuj zaznaczenie” umożliwiająca natychmiastowe ulepszenie zaznaczonego tekstu.
    -   Opcja „Przetłumacz zaznaczenie” z podmenu zawierającym wszystkie dostępne języki.
    -   Opcja „Popraw pisownię” umożliwiająca poprawianie błędów ortograficznych, gramatycznych i interpunkcyjnych.
    -   Bezpośrednie zastępowanie zaznaczonego tekstu jego przetłumaczoną, przeformułowaną lub poprawioną wersją.
    -   Pełna integracja z natywnym interfejsem użytkownika przeglądarki.

-   **Intuicyjny i konfigurowalny interfejs użytkownika**

    -   Elastyczny tryb wyświetlania: aktywne pole wprowadzania lub pływające okno dialogowe.
    -   Konfigurowalny pasek stanu z możliwością wyboru kolorów, przezroczystości i czasu wyświetlania.
    -   Skrót klawiaturowy (Ctrl+Shift+1 lub ⌘+Shift+1 na Macu) do rozpoczynania i zatrzymywania nagrywania.
    -   W Firefoxie „skrót priorytetowy” dla witryn, których edytor strony przechwytuje tę kombinację (ChatGPT, Notion…): aktywny od momentu instalacji, z możliwością wyłączenia w opcjach (zobacz [PRIVACY.md](PRIVACY.md)).
    -   Opcja „Pozostaw otwarte” umożliwiająca kontrolowanie czasu wyświetlania wyników.
    -   Niestandardowa ikona zawierająca mikrofon i liczbę „42”, zapewniająca natychmiastową rozpoznawalność.

-   **Opcje zaawansowane**
    -   Obsługa wielu providerów: Mistral AI, OpenAI oraz Custom/LiteLLM dla maksymalnej elastyczności.
    -   Możliwość dostosowania modeli transkrypcji i tłumaczenia dla każdego providera.
    -   Dostępne modele OpenAI: GPT-4o mini (domyślnie), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** oraz **GPT-5.6 (luna/terra/sol)**. Transkrypcja: whisper-1 (domyślnie), gpt-4o-mini-transcribe, gpt-4o-transcribe oraz **gpt-transcribe**.
    -   Dostępne modele Mistral: Mistral Small (domyślnie), Mistral Medium, Mistral Large, Codestral oraz **Ministral 3 (3B/8B/14B)**. Transkrypcja: Voxtral Mini. Obsługiwane są odpowiedzi modeli Mistral, które przeprowadzają rozumowanie (bloki rozumowania).
    -   Ustawienia korzystające z gpt-4.1-nano (wyłączenie API OpenAI 23.10.2026) lub gpt-4o zostaną podczas aktualizacji automatycznie przełączone odpowiednio na gpt-5.6-luna i gpt-4.1.
    -   Niezależny wybór providera dla transkrypcji oraz tłumaczenia/przeformułowywania.
    -   Zgodność z LiteLLM Proxy za pośrednictwem providera Custom, umożliwiająca łączenie się z alternatywnymi modelami.
    -   Pełna obsługa internacjonalizacji dzięki plikom językowym (\_locales), zapewniającym interfejs i obsługę głosu w wielu językach.

## 🌐 Obsługiwane języki

Poniżej znajduje się lista języków obsługiwanych przez Babel Fish AI wraz z odnośnikami do filmów demonstracyjnych:

-   [Arabski](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [Niemiecki](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [Angielski](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [Hiszpański](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [Francuski](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [Włoski](https://www.youtube.com/watch?v=QgYZt8myods)
-   [Japoński](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [Koreański](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [Niderlandzki](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [Polski](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [Portugalski](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [Rumuński](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [Szwedzki](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [Chiński](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Instalacja

### Chrome

1.  **Pobieranie i instalacja:**

    -   Sklonuj to repozytorium z GitHub lub ręcznie pobierz folder rozszerzenia.
    -   **Możesz też zainstalować rozszerzenie bezpośrednio z [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   Otwórz Chrome i przejdź do `chrome://extensions/`.
    -   Włącz „Tryb dewelopera” w prawym górnym rogu.
    -   Kliknij „Załaduj rozpakowane” i wybierz folder Babel Fish AI.

2.  **Weryfikacja:**
    -   Upewnij się, że rozszerzenie pojawia się na pasku narzędzi przeglądarki z niestandardową ikoną.

### Firefox

1.  **Pobieranie i instalacja:**

    -   **Zainstaluj rozszerzenie bezpośrednio z [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   W przypadku instalacji ręcznej sklonuj to repozytorium z GitHub, a następnie uruchom `./scripts/build.sh firefox`, co przygotuje `dist/firefox/` z manifestem Firefox o nazwie zmienionej na `manifest.json`.
    -   Otwórz Firefox i przejdź do `about:debugging#/runtime/this-firefox` (nie wybieraj „Zainstaluj dodatek z pliku” w `about:addons`, ponieważ ta opcja jest przeznaczona dla podpisanych rozszerzeń).
    -   Kliknij „Wczytaj tymczasowy dodatek…”.
    -   Wybierz plik `dist/firefox/manifest.json`.

2.  **Weryfikacja:**
    -   Upewnij się, że rozszerzenie pojawia się na pasku narzędzi Firefox z niestandardową ikoną.

## ⚙️ Konfiguracja

1.  **Konfiguracja providera AI:**

    -   Kliknij ikonę rozszerzenia, aby przejść do opcji.
    -   Wybierz providera z menu rozwijanego (Mistral AI, OpenAI lub Custom/LiteLLM).
    -   Wprowadź klucz API:
        -   **Mistral AI**: dostępny na [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: dostępny na [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    -   Aktywuj providera za pomocą przełącznika obok menu rozwijanego.

2.  **Dostosowywanie opcji:**

    -   Wybierz tryb wyświetlania (aktywne pole lub okno dialogowe).
    -   Skonfiguruj kolor, przezroczystość i czas wyświetlania paska stanu.
    -   Wybierz języki transkrypcji (wejście głosowe) i wyświetlania tekstu.
    -   Włącz lub wyłącz funkcję tłumaczenia zależnie od potrzeb.

3.  **(Opcjonalnie) Zaawansowana konfiguracja modeli:**
    -   W opcjach każdego providera kliknij „Konfiguracja modeli”, aby dostosować używane modele.
    -   Możesz dodać niestandardowe modele do transkrypcji oraz tłumaczenia/przeformułowywania.
    -   Jeśli aktywowano kilku providerów, możesz wybrać, którego z nich używać dla każdej usługi (transkrypcji i tłumaczenia).

## 🚀 Korzystanie z LiteLLM Proxy lub niestandardowych endpointów

Babel Fish AI jest zgodny z [LiteLLM Proxy](https://litellm.ai/) oraz innymi proxy API zgodnymi z OpenAI, co umożliwia korzystanie z alternatywnych modeli językowych.

### Konfiguracja

1.  **Zainstaluj i skonfiguruj proxy:** Postępuj zgodnie z instrukcjami używanej usługi (LiteLLM itp.).
2.  **Skonfiguruj rozszerzenie Babel Fish AI:**
    -   W opcjach rozszerzenia wybierz z menu rozwijanego providera **Custom/LiteLLM**.
    -   Wprowadź klucz API (jeśli jest wymagany).
    -   Skonfiguruj adresy URL API:
        -   **URL transkrypcji**: na przykład `http://localhost:4000/v1/audio/transcriptions`
        -   **URL czatu**: na przykład `http://localhost:4000/v1/chat/completions`
    -   Aktywuj providera za pomocą przełącznika.
    -   Zaznacz opcję **„NoLog”**, jeśli chcesz wyłączyć rejestrowanie żądań przez LiteLLM.

**Ważne:** opcja „NoLog” jest dostępna **wyłącznie** w providerze Custom/LiteLLM. Nie jest zgodna z oficjalnymi API OpenAI ani Mistral AI.

## 🛠️ Działanie techniczne

### Architektura rozszerzenia

Rozszerzenie składa się z kilku współpracujących ze sobą plików JavaScript:

#### Główne pliki

-   **`manifest.json`:** Główny plik konfiguracyjny rozszerzenia. Definiuje uprawnienia, skrypty, dostępne zasoby itd. Korzysta z wersji 3 manifestu i deklaruje uprawnienia `activeTab`, `storage`, `commands`, `scripting` oraz `contextMenus`.
-   **`background.js`:** Service worker działający w tle. Obsługuje zdarzenia (kliknięcie ikony, skróty klawiaturowe, menu kontekstowe), w razie potrzeby wstrzykuje `content script` i komunikuje się z `content script`.
-   **`content.js`:** Główny skrypt wstrzykiwany do stron internetowych. Koordynuje poszczególne moduły narzędziowe i zarządza ogólnym przepływem działania rozszerzenia.
-   **`src/constants.js`:** Definiuje stałe konfiguracji, stanów, działań itd.

#### Moduły narzędziowe

Rozszerzenie korzysta z architektury modułowej obejmującej kilka wyspecjalizowanych plików narzędziowych:

##### Zarządzanie providerami i API

-   **`src/utils/providers.js`:** Rejestr providerów AI (Mistral AI, OpenAI, Custom/LiteLLM) wraz z ich konfiguracjami, modelami i domyślnymi adresami URL.
-   **`src/utils/api-utils.js`:** Funkcje do komunikacji z zewnętrznymi API, rozwiązywania konfiguracji wielu providerów oraz transkrypcji dźwięku.
-   **`src/utils/text-processing.js`:** Funkcje przetwarzania tekstu: tłumaczenie, przeformułowywanie i korekta pisowni.

##### Interfejs użytkownika i interakcja

-   **`src/utils/ui.js`:** Ogólne funkcje narzędziowe interfejsu użytkownika.
-   **`src/utils/banner-utils.js`:** Zarządza banerem stanu, jego elementami sterującymi oraz selektorem języka.
-   **`src/utils/focus-utils.js`:** Zarządza zapisywaniem i przywracaniem fokusu oraz zaznaczenia tekstu.
-   **`src/utils/transcription-display.js`:** Zarządza wyświetlaniem wyników transkrypcji.
-   **`src/utils/error-utils.js`:** Zarządza wyświetlaniem i obsługą błędów.
-   **`src/styles/content.css`:** Style CSS interfejsu użytkownika wstrzykiwanego do stron internetowych.

##### Nagrywanie i zdarzenia

-   **`src/utils/recording-utils.js`:** Zarządza nagrywaniem dźwięku za pomocą mikrofonu oraz przetwarzaniem danych audio.
-   **`src/utils/event-handlers.js`:** Zawiera procedury obsługi zdarzeń związanych z interakcjami użytkownika.

##### Internacjonalizacja i języki

-   **`src/utils/languages.js`:** Definiuje języki obsługiwane przez rozszerzenie.
-   **`src/utils/languages-shared.js`:** Definiuje listę języków obsługiwanych w kontekście strony internetowej.
-   **`src/utils/languages-data.js`:** Definiuje listę języków obsługiwanych przez service worker.
-   **`src/utils/i18n.js`:** Zarządza internacjonalizacją interfejsu użytkownika.

##### Strona opcji

-   **`src/pages/options/`:** Zawiera pliki strony opcji rozszerzenia (HTML, CSS, JavaScript).

### Proces transkrypcji i tłumaczenia

#### Główna funkcja transkrypcji głosu

1.  **Rozpoczęcie nagrywania:** Użytkownik rozpoczyna nagrywanie, klikając ikonę rozszerzenia lub używając skrótu klawiaturowego (Ctrl+Shift+1 lub ⌘+Shift+1 na Macu). `background script` wysyła wiadomość do `content script`, aby rozpocząć nagrywanie.
2.  **Rejestrowanie dźwięku:** `content script` korzysta z API `navigator.mediaDevices.getUserMedia`, aby uzyskać dostęp do mikrofonu i nagrać dźwięk za pomocą API MediaRecorder.
3.  **Transkrypcja:** `content script` korzysta z funkcji `transcribeAudio` (`src/utils/api-utils.js`), aby przesłać dźwięk do API transkrypcji skonfigurowanego providera (Voxtral w przypadku Mistral AI, Whisper w przypadku OpenAI). API zwraca transkrybowany tekst.
4.  **Tłumaczenie lub przeformułowywanie (opcjonalne):**

-   Jeśli opcja tłumaczenia jest włączona, `content script` korzysta z funkcji `translateText` (`src/utils/text-processing.js`), aby przesłać transkrybowany tekst do API czatu skonfigurowanego providera.
-   Jeśli opcja przeformułowywania jest włączona, funkcja `rephraseText` służy do ulepszania transkrybowanego tekstu.

5.  **Wyświetlanie:** `content script` wyświetla przetworzony tekst w aktywnym elemencie strony (jeśli jest to pole tekstowe lub element edytowalny) albo w niestandardowym oknie dialogowym.

#### Funkcja menu kontekstowego

1. **Zaznaczenie tekstu:** Użytkownik zaznacza tekst na stronie internetowej.
2. **Menu kontekstowe:** Kliknięcie prawym przyciskiem myszy wyświetla następujące opcje:
    - „Przeformułuj zaznaczenie”, aby poprawić styl i przejrzystość
    - „Przetłumacz zaznaczenie” z podmenu dostępnych języków
    - „Popraw pisownię”, aby poprawić błędy
3. **Przetwarzanie:** Zależnie od wybranej opcji:
    - Tekst jest wysyłany do przeformułowania za pomocą funkcji `rephraseText`
    - Tekst jest wysyłany do tłumaczenia za pomocą funkcji `translateText` z wybranym językiem docelowym
    - Tekst jest wysyłany do korekty za pomocą funkcji `correctText`
4. **Wyświetlanie:** Wynik zastępuje pierwotne zaznaczenie w elemencie zawierającym zaznaczony tekst.

### Komunikacja

Komunikacja między `background script` a `content script` odbywa się za pośrednictwem API komunikacyjnego Chrome (`chrome.runtime.sendMessage` i `chrome.runtime.onMessage`).

### Przechowywanie danych

Rozszerzenie korzysta z `chrome.storage.sync` do przechowywania:

-   Konfiguracji providerów AI (kluczy API, wybranych modeli, niestandardowych adresów URL).
-   Opcji rozszerzenia (sposobu wyświetlania, tłumaczenia, kolorów banera itd.).
-   Preferencji językowych tłumaczenia.

Dane te są przechowywane lokalnie na komputerze, w pamięci rozszerzenia przeglądarki.
### Obsługa błędów

Możliwe błędy (brak klucza API, błąd transkrypcji itp.) są zdefiniowane w pliku `constants.js`. Funkcje `api-utils.js` i `text-processing.js` obsługują potencjalne błędy wywołań API za pomocą ulepszonych komunikatów dostosowanych do kodu HTTP. Element `content.js` wyświetla użytkownikowi komunikaty o błędach za pośrednictwem banera u dołu strony.

## 🛡️ Bezpieczeństwo i prywatność

-   **Ochrona danych:**
    -   Klucz API jest bezpiecznie przechowywany w przeglądarce.
    -   Rozszerzenie nie przechowuje danych audio użytkownika; całe przetwarzanie odbywa się w czasie rzeczywistym.
    -   Komunikacja z API odbywa się za pośrednictwem bezpiecznych połączeń HTTPS.

Pełne informacje o tym, jak BabelFishAI zarządza danymi użytkownika, można znaleźć w naszej [Polityce prywatności](PRIVACY.md).

## 🔧 Rozwiązywanie problemów

-   **Problemy z mikrofonem:**

    -   Sprawdź uprawnienia dostępu do mikrofonu w przeglądarce.
    -   Upewnij się, że żadna inna aplikacja nie korzysta jednocześnie z mikrofonu.

-   **Błędy transkrypcji/tłumaczenia:**
    -   Sprawdź, czy klucz API jest prawidłowy i aktywny.
    -   Upewnij się, że masz stabilne połączenie z internetem.
    -   W razie błędu sprawdź konsolę przeglądarki, aby uzyskać szczegółowe logi.

## 🤝 Współtworzenie

Wkład i sugestie są mile widziane. Aby współtworzyć projekt:

-   Zgłaszaj błędy w sekcji Issues na GitHubie.
-   Proponuj ulepszenia lub nowe funkcje.
-   Przesyłaj pull requesty.

## 📄 Licencja

To rozszerzenie jest rozpowszechniane na warunkach licencji GNU Affero General Public License v3.0 (AGPL-3.0). Więcej szczegółów można znaleźć w pliku LICENSE.

## 💝 Wsparcie

## Jeśli podoba Ci się to rozszerzenie, możesz wesprzeć jego rozwój, przekazując darowiznę za pośrednictwem [PayPal](https://paypal.me/jls).

Stworzone przez jls42.org z pasją i innowacyjnym podejściem, Babel Fish AI wynosi transkrypcję i tłumaczenie na nowe poziomy dzięki najnowocześniejszej sztucznej inteligencji.
