**Artykuł przetłumaczony z francuskiego na polski za pomocą gpt-5.6-sol.**

# Babel Fish AI — rozszerzenie do transkrypcji głosowej i tłumaczenia z wykorzystaniem AI

<img src="images/icon128.png" alt="Ikona Babel Fish AI" width="128" height="128">

**Oficjalna strona: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**Aby korzystać z rozszerzenia, potrzebujesz klucza API jednego z obsługiwanych providerów:**

|                             Provider                             | Uzyskanie klucza API                                                                               |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
|   <img src="images/gemini-logo.png" alt="Gemini" height="30">    | **Gemini (Google)**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)            |
|                                🚅                                | **Custom/LiteLLM**: do korzystania z własnych endpointów API                                      |

Babel Fish AI to innowacyjne rozszerzenie przeglądarki zapewniające zaawansowaną transkrypcję głosową z obsługą wielu providerów. Przekształcaj mowę w tekst z wyjątkową dokładnością dzięki API transkrypcji Mistral AI (Voxtral), OpenAI (gpt-transcribe, Whisper) lub Gemini (Gemini 3.5 Transcribe), a opcjonalnie korzystaj także z automatycznego tłumaczenia w czasie rzeczywistym. Możesz używać Babel Fish AI wyłącznie do transkrypcji lub włączyć tłumaczenie w locie, zależnie od potrzeb.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Odznaka Codacy](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Stan bramki jakości](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Ocena bezpieczeństwa](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Ocena łatwości utrzymania](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Podatności](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Problemy w kodzie](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Dług techniczny](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Wiersze kodu](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funkcje

-   **Zaawansowana transkrypcja głosowa**

    -   Rejestrowanie dźwięku wysokiej jakości za pomocą mikrofonu urządzenia.
    -   Dokładna transkrypcja za pośrednictwem API Voxtral (Mistral AI), gpt-transcribe i Whisper (OpenAI) lub Gemini 3.5 Transcribe (Google).
    -   Obsługa wielu providerów: swobodnie wybieraj między Mistral AI, OpenAI, Gemini a niestandardowym endpointem.
    -   Wielojęzyczna obsługa rozpoznawania mowy i wyświetlania tekstu, umożliwiająca transkrypcję wypowiedzi w różnych językach oraz wyświetlanie wyników (transkrypcji i tłumaczenia, jeśli jest włączone) w wybranym języku.
    -   Automatyczne wstawianie tekstu do aktywnego pola lub wyświetlanie go w osobnym oknie dialogowym.

-   **Inteligentne tłumaczenie i przeformułowywanie**

    -   Natychmiastowe tłumaczenie transkrypcji na różne języki, włączane w razie potrzeby.
    -   Przeformułowywanie tekstu w celu poprawy jego stylu i przejrzystości.
    -   Wykorzystanie zaawansowanego modelu AI w celu zapewnienia tłumaczenia wiernego pierwotnemu znaczeniu.
    -   Swobodny wybór między samą transkrypcją a połączeniem transkrypcji z tłumaczeniem.

-   **Zaawansowane menu kontekstowe**

    -   Opcja „Przeformułuj zaznaczenie” umożliwiająca natychmiastowe ulepszenie zaznaczonego tekstu.
    -   Opcja „Przetłumacz zaznaczenie” z podmenu zawierającym wszystkie dostępne języki.
    -   Opcja „Popraw pisownię” służąca do poprawiania błędów ortograficznych, gramatycznych i interpunkcyjnych.
    -   Bezpośrednie zastępowanie zaznaczonego tekstu jego przetłumaczoną, przeformułowaną lub poprawioną wersją.
    -   Pełna integracja z natywnym interfejsem użytkownika przeglądarki.

-   **Intuicyjny i konfigurowalny interfejs użytkownika**

    -   Elastyczny tryb wyświetlania: aktywne pole wprowadzania lub pływające okno dialogowe.
    -   Konfigurowalny pasek stanu z możliwością wyboru kolorów, przezroczystości i czasu wyświetlania.
    -   Skrót klawiaturowy (Ctrl+Shift+1 lub ⌘+Shift+1 na Macu) do uruchamiania i zatrzymywania nagrywania.
    -   W Firefoksie „skrót priorytetowy” dla witryn, których edytor przechwytuje tę kombinację (ChatGPT, Notion…): aktywny od chwili instalacji, z możliwością wyłączenia w opcjach (zobacz [PRIVACY.md](PRIVACY.md)).
    -   Opcja „Pozostaw otwarte” do kontrolowania czasu wyświetlania wyników.
    -   Niestandardowa ikona zawierająca mikrofon i liczbę „42”, umożliwiająca natychmiastowe rozpoznanie rozszerzenia.

-   **Opcje zaawansowane**
    -   Obsługa wielu providerów: Mistral AI, OpenAI, Gemini i Custom/LiteLLM dla maksymalnej elastyczności.
    -   Możliwość dostosowania modeli transkrypcji i tłumaczenia dla każdego providera.
    -   Dostępne modele OpenAI: GPT-4o mini (domyślnie), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** oraz **GPT-5.6 (luna/terra/sol)**. Transkrypcja: **gpt-transcribe** (domyślnie), whisper-1, gpt-4o-mini-transcribe oraz gpt-4o-transcribe. OpenAI wycofa trzy ostatnie modele ze swojego API 26.02.2027; model wybrany wcześniej w opcjach będzie używany do tego czasu.
    -   Dostępne modele Mistral: Mistral Small (domyślnie), Mistral Medium, Mistral Large, Codestral oraz **Ministral 3 (3B/8B/14B)**. Transkrypcja: Voxtral Mini. Obsługiwane są odpowiedzi modeli Mistral korzystających z rozumowania (bloki rozumowania).
    -   Dostępne modele Gemini: **Gemini 3.8 Flash** (domyślnie, z ograniczonym rozumowaniem, aby udzielać odpowiedzi w ciągu jednej–dwóch sekund) oraz **Gemini 3.5 Flash-Lite** (najszybszy). Transkrypcja: **Gemini 3.5 Transcribe**, za pośrednictwem Google Interactions API, bez zapisywania dyktowanych treści w historii tego API (`store: false`, zobacz [docs/providers/gemini.md](docs/providers/gemini.md)).
    -   Ustawienia korzystające z gpt-4.1-nano (wycofanie z API OpenAI 23.10.2026) lub gpt-4o zostaną podczas aktualizacji automatycznie przełączone odpowiednio na gpt-5.6-luna i gpt-4.1.
    -   Niezależny wybór providera dla transkrypcji oraz tłumaczenia/przeformułowywania.
    -   Zgodność z LiteLLM Proxy za pośrednictwem providera Custom, umożliwiająca łączenie się z alternatywnymi modelami.
    -   Pełna obsługa internacjonalizacji dzięki plikom językowym (\_locales), zapewniająca wielojęzyczny interfejs i obsługę głosową.

## 🌐 Obsługiwane języki

Poniżej znajduje się lista języków obsługiwanych przez Babel Fish AI wraz z linkami do filmów demonstracyjnych:

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
    -   Upewnij się, że rozszerzenie jest widoczne na pasku narzędzi przeglądarki z niestandardową ikoną.

### Firefox

1.  **Pobieranie i instalacja:**

    -   Od wersji 1.2.0 wymagany jest **Firefox 140 lub nowszy** (na komputerze). Podczas instalacji oraz aktualizacji do wersji 1.2.0 Firefox wyświetla dane przesyłane przez rozszerzenie do skonfigurowanego providera: Twój głos, zaznaczony lub podyktowany tekst oraz klucz API (zobacz [PRIVACY.md](PRIVACY.md)).
    -   **Zainstaluj rozszerzenie bezpośrednio z [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   W przypadku instalacji ręcznej sklonuj to repozytorium z GitHub, a następnie uruchom `./scripts/build.sh firefox`, co przygotuje `dist/firefox/` z manifestem Firefoksa przemianowanym na `manifest.json`.
    -   Otwórz Firefox i przejdź do `about:debugging#/runtime/this-firefox` (nie używaj opcji „Zainstaluj dodatek z pliku” w `about:addons`, która jest przeznaczona dla podpisanych rozszerzeń).
    -   Kliknij „Wczytaj tymczasowy dodatek...”.
    -   Wybierz plik `dist/firefox/manifest.json`.

2.  **Weryfikacja:**
    -   Upewnij się, że rozszerzenie jest widoczne na pasku narzędzi Firefoksa z niestandardową ikoną.

## ⚙️ Konfiguracja

1.  **Konfiguracja providera AI:**

    -   Kliknij ikonę rozszerzenia, aby przejść do opcji.
    -   Wybierz providera z listy rozwijanej (Mistral AI, OpenAI, Gemini lub Custom/LiteLLM).
    -   Wprowadź klucz API:
        -   **Mistral AI**: dostępny na [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: dostępny na [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
        -   **Gemini**: dostępny na [aistudio.google.com/apikey](https://aistudio.google.com/apikey). Najlepiej użyć klucza z projektu z włączonym rozliczaniem: jeśli korzystasz z bezpłatnego klucza i znajdujesz się poza Europejskim Obszarem Gospodarczym, Szwajcarią i Wielką Brytanią, Google może wykorzystywać Twoje dyktowane treści oraz przesłane teksty do ulepszania swoich produktów, w tym poddawać je weryfikacji przez człowieka; nie wysyłaj żadnych danych osobowych, wrażliwych ani poufnych. Ogranicz klucz do Gemini API (domyślne ustawienie nowych kluczy), nigdy do witryn internetowych: w Chrome żądania są wysyłane ze strony, na której dyktujesz.
    -   Włącz providera za pomocą przełącznika obok listy rozwijanej.

2.  **Dostosowywanie opcji:**

    -   Wybierz tryb wyświetlania (aktywne pole lub okno dialogowe).
    -   Skonfiguruj kolor, przezroczystość i czas wyświetlania paska stanu.
    -   Wybierz języki transkrypcji (wprowadzania głosowego) i wyświetlania tekstu.
    -   Włącz lub wyłącz funkcję tłumaczenia zależnie od potrzeb.

3.  **(Opcjonalnie) Zaawansowana konfiguracja modeli:**

    -   W opcjach każdego providera kliknij „Konfiguracja modeli”, aby dostosować używane modele.
    -   Możesz dodać niestandardowe modele transkrypcji oraz tłumaczenia/przeformułowywania.
    -   Jeśli włączono wielu providerów, możesz wybrać, który z nich ma być używany dla każdej usługi (transkrypcji i tłumaczenia).

4.  **Wiele zsynchronizowanych urządzeń:**
    -   Zaktualizuj rozszerzenie na wszystkich urządzeniach. Wersje starsze niż 1.2.0 nie obsługują Gemini: jeśli wybrano Gemini, użyją wcześniej włączonego providera albo nie wyślą żadnych danych.
    -   Jeśli nowsza wersja rozszerzenia zapisała providera, którego bieżąca wersja jeszcze nie obsługuje, strona opcji poinformuje o tym w sekcji „Providerzy z nowszej wersji” i udostępni przycisk umożliwiający usunięcie jego ustawień ze wszystkich urządzeń.
    -   Jeśli przeglądarka odmówi zapisania opcji (na przykład z powodu zbyt długiej wartości), strona wyświetli błąd zamiast komunikatu „Opcje zapisane!” i nie zapisze żadnych zmian.

## 🚀 Korzystanie z LiteLLM Proxy lub niestandardowych endpointów

Babel Fish AI jest zgodny z [LiteLLM Proxy](https://litellm.ai/) oraz innymi proxy API zgodnymi z OpenAI, co umożliwia korzystanie z alternatywnych modeli językowych.

### Konfiguracja

1.  **Zainstaluj i skonfiguruj proxy:** postępuj zgodnie z instrukcjami używanej usługi (LiteLLM itd.).
2.  **Skonfiguruj rozszerzenie Babel Fish AI:**
    -   W opcjach rozszerzenia wybierz providera **Custom/LiteLLM** z listy rozwijanej.
    -   Wprowadź klucz API (jeśli jest wymagany).
    -   Skonfiguruj adresy URL API:
        -   **URL transkrypcji**: na przykład `http://localhost:4000/v1/audio/transcriptions`
        -   **URL czatu**: na przykład `http://localhost:4000/v1/chat/completions`
    -   Włącz providera za pomocą przełącznika.
    -   Zaznacz opcję **„NoLog”**, jeśli chcesz wyłączyć rejestrowanie żądań przez LiteLLM.

**Ważne:** opcja „NoLog” jest dostępna **wyłącznie** dla providera Custom/LiteLLM. Nie jest zgodna z oficjalnymi API OpenAI, Mistral AI ani Gemini.

## 🛠️ Działanie techniczne

### Architektura rozszerzenia

Rozszerzenie składa się z kilku współdziałających ze sobą plików JavaScript:

#### Główne pliki

-   **`manifest.json`:** główny plik konfiguracyjny rozszerzenia. Określa uprawnienia, skrypty, dostępne zasoby itd. Korzysta z wersji 3 manifestu i deklaruje uprawnienia `activeTab`, `storage`, `commands`, `scripting` oraz `contextMenus`.
-   **`background.js`:** service worker działający w tle. Obsługuje zdarzenia (kliknięcie ikony, skróty klawiaturowe, menu kontekstowe), w razie potrzeby wstrzykuje `content script` i komunikuje się z `content script`.
-   **`content.js`:** główny skrypt wstrzykiwany do stron internetowych. Koordynuje poszczególne moduły narzędziowe i zarządza ogólnym przepływem działania rozszerzenia.
-   **`src/constants.js`:** definiuje stałe konfiguracji, stanów, działań itd.

#### Moduły narzędziowe

Rozszerzenie korzysta z architektury modułowej obejmującej kilka wyspecjalizowanych plików narzędziowych:

##### Zarządzanie providerami i API

-   **`src/utils/providers.js`:** rejestr providerów AI (Mistral AI, OpenAI, Gemini, Custom/LiteLLM) wraz z ich konfiguracjami, modelami i domyślnymi adresami URL.
-   **`src/utils/provider-store.js`:** odczytuje ustawienia providerów z pamięci i pilnuje, aby klucz API był wysyłany wyłącznie na adresy jego providera.
-   **`src/utils/provider-adapters.js`:** formaty API providerów: uwierzytelnianie, treść żądań oraz odczytywanie odpowiedzi i błędów.
-   **`src/utils/api-utils.js`:** funkcje do komunikacji z zewnętrznymi API, rozwiązywania konfiguracji wielu providerów oraz transkrypcji dźwięku.
-   **`src/utils/text-processing.js`:** funkcje przetwarzania tekstu: tłumaczenie, przeformułowywanie i poprawianie pisowni.

##### Interfejs użytkownika i interakcja

-   **`src/utils/ui.js`:** ogólne funkcje narzędziowe interfejsu użytkownika.
-   **`src/utils/banner-utils.js`:** zarządza paskiem stanu, jego elementami sterującymi i selektorem języka.
-   **`src/utils/focus-utils.js`:** zarządza zapisywaniem i przywracaniem fokusu oraz zaznaczenia tekstu.
-   **`src/utils/transcription-display.js`:** zarządza wyświetlaniem wyników transkrypcji.
-   **`src/utils/error-utils.js`:** zarządza wyświetlaniem i obsługą błędów.
-   **`src/styles/content.css`:** style CSS interfejsu użytkownika wstrzykiwanego do stron internetowych.

##### Nagrywanie i zdarzenia

-   **`src/utils/recording-utils.js`:** zarządza nagrywaniem dźwięku za pomocą mikrofonu i przetwarzaniem danych audio.
-   **`src/utils/event-handlers.js`:** zawiera procedury obsługi zdarzeń związanych z interakcjami użytkownika.

##### Internacjonalizacja i języki

-   **`src/utils/languages.js`:** definiuje języki obsługiwane przez rozszerzenie.
-   **`src/utils/languages-shared.js`:** definiuje listę języków obsługiwanych w kontekście strony internetowej.
-   **`src/utils/languages-data.js`:** definiuje listę języków obsługiwanych przez service worker.
-   **`src/utils/i18n.js`:** zarządza internacjonalizacją interfejsu użytkownika.

##### Strona opcji

-   **`src/pages/options/`:** zawiera pliki strony opcji rozszerzenia (HTML, CSS, JavaScript).
### Proces transkrypcji i tłumaczenia

#### Główna funkcja transkrypcji głosowej

1.  **Rozpoczęcie nagrywania:** Użytkownik rozpoczyna nagrywanie, klikając ikonę rozszerzenia lub używając skrótu klawiaturowego (Ctrl+Shift+1 albo ⌘+Shift+1 na Macu). `background script` wysyła wiadomość do `content script`, aby rozpocząć nagrywanie.
2.  **Przechwytywanie dźwięku:** `content script` używa API `navigator.mediaDevices.getUserMedia`, aby uzyskać dostęp do mikrofonu i nagrywać dźwięk za pośrednictwem API MediaRecorder.
3.  **Transkrypcja:** `content script` używa funkcji `transcribeAudio` (`src/utils/api-utils.js`), aby wysłać dźwięk do API transkrypcji skonfigurowanego providera (Voxtral dla Mistral AI, gpt-transcribe lub Whisper dla OpenAI, Gemini 3.5 Transcribe dla Gemini). API zwraca tekst transkrypcji.
4.  **Tłumaczenie lub przeformułowanie (opcjonalne):**

-   Jeśli opcja tłumaczenia jest włączona, `content script` używa funkcji `translateText` (`src/utils/text-processing.js`), aby wysłać tekst transkrypcji do API czatu skonfigurowanego providera.
-   Jeśli opcja przeformułowania jest włączona, funkcja `rephraseText` służy do ulepszenia tekstu transkrypcji.

5.  **Wyświetlanie:** `content script` wyświetla przetworzony tekst w aktywnym elemencie strony (jeśli jest to pole tekstowe lub element edytowalny) albo w niestandardowym oknie dialogowym.

#### Funkcja menu kontekstowego

1. **Zaznaczanie tekstu:** Użytkownik zaznacza tekst na stronie internetowej.
2. **Menu kontekstowe:** Kliknięcie prawym przyciskiem myszy wyświetla następujące opcje:
    - „Przeformułuj zaznaczenie”, aby poprawić styl i przejrzystość
    - „Przetłumacz zaznaczenie” z podmenu dostępnych języków
    - „Popraw pisownię”, aby poprawić błędy
3. **Przetwarzanie:** W zależności od wybranej opcji:
    - Tekst jest wysyłany do przeformułowania za pośrednictwem funkcji `rephraseText`
    - Tekst jest wysyłany do tłumaczenia za pośrednictwem funkcji `translateText` wraz z wybranym językiem docelowym
    - Tekst jest wysyłany do korekty za pośrednictwem funkcji `correctText`
4. **Wyświetlanie:** Wynik zastępuje pierwotne zaznaczenie w elemencie zawierającym zaznaczony tekst.

### Komunikacja

Komunikacja między `background script` a `content script` odbywa się za pośrednictwem API komunikacyjnego Chrome (`chrome.runtime.sendMessage` i `chrome.runtime.onMessage`).

### Przechowywanie danych

Rozszerzenie używa `chrome.storage.sync` do przechowywania:

-   Konfiguracji providerów AI (kluczy API, wybranych modeli, niestandardowych adresów URL). Gemini, dodany w wersji 1.2.0, ma własny klucz przechowywania (`extraProvider.gemini`), który jest ignorowany przez wcześniejsze wersje.
-   Opcji rozszerzenia (wyświetlania, tłumaczenia, kolorów banera itp.).
-   Preferencji językowych dotyczących tłumaczenia.

Dane te są przechowywane lokalnie na komputerze, w pamięci rozszerzenia przeglądarki.

### Obsługa błędów

Możliwe błędy (brak klucza API, błąd transkrypcji itp.) są zdefiniowane w pliku `constants.js`. Funkcje `api-utils.js` i `text-processing.js` obsługują potencjalne błędy wywołań API, wyświetlając ulepszone komunikaty zależne od kodu HTTP. `content.js` wyświetla użytkownikowi komunikaty o błędach za pomocą banera u dołu strony.

## 🛡️ Bezpieczeństwo i prywatność

-   **Ochrona danych:**
    -   Klucz API jest bezpiecznie przechowywany w przeglądarce.
    -   Rozszerzenie nie przechowuje danych audio; całe przetwarzanie odbywa się w czasie rzeczywistym.
    -   Komunikacja z API odbywa się za pośrednictwem bezpiecznych połączeń HTTPS.

Pełne informacje o tym, jak BabelFishAI przetwarza Twoje dane, znajdziesz w naszej [Polityce prywatności](PRIVACY.md).

## 🔧 Rozwiązywanie problemów

-   **Problemy z mikrofonem:**

    -   Sprawdź uprawnienia dostępu do mikrofonu w przeglądarce.
    -   Upewnij się, że żadna inna aplikacja nie używa jednocześnie mikrofonu.

-   **Błędy transkrypcji/tłumaczenia:**
    -   Sprawdź, czy klucz API jest prawidłowy i aktywny.
    -   Upewnij się, że masz stabilne połączenie z internetem.
    -   W przypadku błędu sprawdź konsolę przeglądarki, aby uzyskać szczegółowe logi.

## 🤝 Współtworzenie

Wkład i sugestie są mile widziane. Aby współtworzyć projekt:

-   Zgłaszaj błędy w sekcji Issues na GitHubie.
-   Proponuj ulepszenia lub nowe funkcje.
-   Przesyłaj swoje pull requesty.

## 📄 Licencja

To rozszerzenie jest rozpowszechniane na licencji GNU Affero General Public License v3.0 (AGPL-3.0). Więcej szczegółów znajdziesz w pliku LICENSE.

## 💝 Wsparcie

## Jeśli podoba Ci się to rozszerzenie, możesz wesprzeć jego rozwój, przekazując darowiznę za pośrednictwem [PayPal](https://paypal.me/jls).

Opracowany przez jls42.org z pasją i innowacyjnym podejściem Babel Fish AI wynosi transkrypcję i tłumaczenie na nowe poziomy dzięki najnowocześniejszej sztucznej inteligencji.
