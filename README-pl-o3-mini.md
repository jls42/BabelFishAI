# Babel Fish AI - Rozszerzenie do Transkrypcji Głosowej i Tłumaczenia z AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Aby użyć rozszerzenia, będziesz potrzebował klucza API OpenAI (lub dostawcy zewnętrznego, jeśli korzystasz z LiteLLM Proxy). Możesz wygenerować klucz API OpenAI tutaj : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI to innowacyjne rozszerzenie Chrome stworzone pierwotnie, aby oferować zaawansowaną transkrypcję głosową. Przekształć swój głos w tekst z niezwykłą precyzją dzięki API Whisper od OpenAI oraz opcjonalnie skorzystaj z automatycznego tłumaczenia w czasie rzeczywistym. Możesz używać Babel Fish AI wyłącznie do transkrypcji lub włączyć tłumaczenie "na bieżąco" zgodnie z Twoimi potrzebami.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funkcje

- **Zaawansowana Transkrypcja Głosowa**
  - Nagrywanie dźwięku w wysokiej jakości za pomocą mikrofonu Twojego urządzenia.
  - Precyzyjna transkrypcja wykonana przez API Whisper od OpenAI.
  - Wielojęzyczne wsparcie dla rozpoznawania mowy i wyświetlania tekstu, umożliwiające transkrypcję wypowiedzi w różnych językach i prezentowanie wyników (transkrypcji i tłumaczenia, jeśli jest włączone) w wybranym przez Ciebie języku.
  - Automatyczne wstawianie tekstu do aktywnego pola lub wyświetlanie go w dedykowanym oknie dialogowym.

- **Inteligentne Tłumaczenie i Parafraza**
  - Natychmiastowe tłumaczenie transkrypcji na różne języki, aktywowane w razie potrzeby.
  - Parafraza tekstu w celu poprawy stylu i przejrzystości.
  - Wykorzystanie zaawansowanego modelu AI, aby zagwarantować tłumaczenie wierne oryginalnemu sensowi.
  - Swobodny wybór korzystania wyłącznie z transkrypcji lub łączenia transkrypcji z tłumaczeniem.

- **Potężne Menu Kontekstowe**
  - Opcja "Parafrazuj zaznaczenie" do natychmiastowej poprawy zaznaczonych tekstów.
  - Opcja "Przetłumacz zaznaczenie" z podmenu zawierającym wszystkie dostępne języki.
  - Bezpośrednia zamiana zaznaczonego tekstu na jego wersję przetłumaczoną lub sparafrazowaną.
  - Doskonała integracja z natywnym interfejsem użytkownika Chrome.

- **Intuicyjny i Personalizowalny Interfejs Użytkownika**
  - Elastyczny tryb wyświetlania: aktywna strefa wprowadzania lub pływające okno dialogowe.
  - Konfigurowalny pasek stanu z możliwością wyboru kolorów, przezroczystości oraz czasu wyświetlania.
  - Skrót klawiaturowy (Ctrl+Shift+1 lub ⌘+Shift+1 na Macu) do rozpoczęcia/zatrzymania nagrywania.
  - Opcja "Pozostań otwarty", aby kontrolować czas wyświetlania wyników.
  - Spersonalizowana ikona, zawierająca mikrofon i cyfrę "42", dla natychmiastowego rozpoznania.

- **Opcje Zaawansowane**
    - Tryb ekspercki dla szczegółowych konfiguracji (adresy URL API, konfiguracja według domeny itp.).
    - Możliwość personalizacji modeli transkrypcji i tłumaczenia.
    - Kompatybilność z LiteLLM Proxy, aby połączyć się z alternatywnymi modelami językowymi i wyłączyć rejestrowanie zapytań.
    - Pełne wsparcie dla internacjonalizacji dzięki plikom językowym (_locales), oferując interfejs oraz wsparcie głosowe w wielu językach.

## 🌐 Obsługiwane Języki

Oto lista języków obsługiwanych przez Babel Fish AI, z linkami do filmów demonstracyjnych:

- [Arabski](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [Niemiecki](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [Angielski](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [Hiszpański](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [Francuski](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [Hinduski](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [Włoski](https://www.youtube.com/watch?v=QgYZt8myods)
- [Japoński](https://www.youtube.com/watch?v=noHEJCnocH8)
- [Koreański](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [Niderlandzki](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Polski](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Portugalski](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Rumuński](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Szwedzki](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Chiński](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Instalacja

1.  **Pobieranie i Instalacja:**
    - Sklonuj to repozytorium z GitHub lub pobierz ręcznie folder rozszerzenia.
    - **Lub zainstaluj rozszerzenie bezpośrednio z [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Otwórz Chrome i wejdź na stronę `chrome://extensions/`.
    - Włącz „Tryb dewelopera” w prawym górnym rogu.
    - Kliknij „Wczytaj rozszerzenie bez pakietu” i wybierz folder Babel Fish AI.

2.  **Weryfikacja:**
    - Upewnij się, że rozszerzenie pojawia się na pasku narzędzi Chrome z spersonalizowaną ikoną.

## ⚙️ Konfiguracja

1.  **Klucz API OpenAI :**
    *   Kliknij ikonę rozszerzenia, aby przejść do opcji.
    *   Wprowadź swój klucz API OpenAI (dostępny na [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizacja Opcji:**
    *   Wybierz tryb wyświetlania (aktywna strefa tekstu lub okno dialogowe).
    *   Skonfiguruj kolor, przezroczystość i czas wyświetlania paska stanu.
    *   Wybierz języki dla transkrypcji (wejście głosowe) oraz dla wyświetlania tekstu.
    *   Włącz lub wyłącz funkcję tłumaczenia zgodnie z potrzebami.

3.  **(Opcjonalnie) Używanie z LiteLLM Proxy:**
    *   Włącz "Tryb Ekspercki" w opcjach.
    *   W sekcji "Konfiguracja Zaawansowana" zmień **oba adresy URL** API (Whisper i Tłumaczenie), aby wskazywały na Twoją instancję LiteLLM Proxy. **Użyj tej samej bazowej adresu URL dla obu.**
    *   Zaznacz opcję "NoLog (LiteLLM tylko)" jeśli chcesz wyłączyć rejestrowanie zapytań przez LiteLLM.

## 🚀 Używanie z LiteLLM Proxy

Jeśli chcesz korzystać z modeli językowych innych niż OpenAI, możesz użyć LiteLLM Proxy. Oto jak go skonfigurować:

Babel Fish AI jest kompatybilny z [LiteLLM Proxy](https://litellm.ai/), który pozwala na używanie alternatywnych modeli językowych z API kompatybilnym z API OpenAI.

### Konfiguracja

1.  **Zainstaluj i skonfiguruj LiteLLM Proxy :** Postępuj zgodnie z instrukcjami na stronie LiteLLM.
2.  **Skonfiguruj rozszerzenie Babel Fish AI :**
    *   W opcjach rozszerzenia (kliknij prawym przyciskiem myszy na ikonę > Opcje), włącz "Tryb Ekspercki".
    *   W sekcji "Konfiguracja Zaawansowana" zmień **oba adresy URL** API (Whisper i Tłumaczenie), aby wskazywały na Twoją instancję LiteLLM Proxy (na przykład, `http://localhost:4000/v1/audio/transcriptions` oraz `http://localhost:4000/v1/chat/completions`). **Użyj tej samej bazowej adresu URL dla obu.**
    *   Zaznacz opcję "NoLog (LiteLLM tylko)" jeśli chcesz wyłączyć rejestrowanie zapytań przez LiteLLM.

**Ważne :** Opcja "NoLog" jest przeznaczona **wyłącznie** do użycia z LiteLLM Proxy. **Nie włączaj jej** jeśli korzystasz z oficjalnego API OpenAI, ponieważ spowoduje to błąd i uniemożliwi działanie tłumaczenia.

## 🛠️ Działanie Techniczne

### Architektura Rozszerzenia

Rozszerzenie składa się z kilku plików JavaScript, które współdziałają ze sobą:

#### Główne Pliki

*   **`manifest.json`:** Główny plik konfiguracyjny rozszerzenia. Definiuje on uprawnienia, skrypty, dostępne zasoby itp. Używa wersji 3 manifestu i deklaruje uprawnienia `activeTab`, `storage`, `commands`, `scripting` oraz `contextMenus`.
*   **`background.js`:** Service worker działający w tle. Obsługuje zdarzenia (kliknięcie na ikonę, skróty klawiaturowe, menu kontekstowe), wstrzykuje `content script` w razie potrzeby i komunikuje się z `content script`.
*   **`content.js`:** Główny skrypt, który jest wstrzykiwany na strony internetowe. Koordynuje on różne moduły narzędziowe i zarządza głównym przepływem rozszerzenia.
*   **`src/constants.js`:** Definiuje stałe do konfiguracji, stany, akcje itp.

#### Moduły Narzędziowe

Rozszerzenie korzysta z modułowej architektury z wieloma wyspecjalizowanymi plikami narzędziowymi:

##### Zarządzanie API i Przetwarzanie Danych

*   **`src/utils/api.js`:** Zawiera funkcje umożliwiające interakcję z API, w szczególności `transcribeAudio` do wywoływania API Whisper od OpenAI.
*.  **`src/utils/api-utils.js`:** Zaawansowane funkcje do interakcji z zewnętrznymi API.
*   **`src/utils/translation.js`:** Zawiera funkcje `translateText` oraz `rephraseText` do wywoływania API GPT od OpenAI.
*   **`src/utils/text-translation.js`:** Specjalistyczne funkcje do tłumaczenia i parafrazy tekstu.
*   **`src/utils/text-processing.js`:** Ogólne funkcje do przetwarzania tekstu.

##### Interfejs Użytkownika i Interakcja

*   **`src/utils/ui.js`:** Ogólne funkcje narzędziowe dla interfejsu użytkownika.
*   **`src/utils/banner-utils.js`:** Zarządza banerem stanu, jego kontrolami oraz wyborem języka.
*   **`src/utils/focus-utils.js`:** Zarządza zapisywaniem i przywracaniem fokusu oraz zaznaczenia tekstu.
*   **`src/utils/transcription-display.js`:** Zarządza wyświetlaniem wyników transkrypcji.
*   **`src/utils/error-utils.js`:** Zarządza wyświetlaniem i przetwarzaniem błędów.
*   **`src/styles/content.css`:** Style CSS dla interfejsu użytkownika wstrzykiwanego na strony internetowe.

##### Nagrywanie i Zdarzenia

*   **`src/utils/recording-utils.js`:** Zarządza nagrywaniem dźwięku przez mikrofon i przetwarzaniem danych audio.
*   **`src/utils/event-handlers.js`:** Zawiera obsługę zdarzeń dla interakcji użytkownika.

##### Internacjonalizacja i Języki

*   **`src/utils/languages.js`:** Definiuje języki obsługiwane przez rozszerzenie.
*   **`src/utils/languages-shared.js`:** Definiuje listę języków obsługiwanych w kontekście strony internetowej.
*   **`src/utils/languages-data.js`:** Definiuje listę języków obsługiwanych w service worker.
*   **`src/utils/i18n.js`:** Zarządza internacjonalizacją interfejsu użytkownika.

##### Strona Opcji

*   **`src/pages/options/`:** Zawiera pliki dla strony opcji rozszerzenia (HTML, CSS, JavaScript).

### Proces Transkrypcji i Tłumaczenia

#### Główna funkcja transkrypcji głosowej

1.  **Rozpoczęcie Nagrywania:** Użytkownik rozpoczyna nagrywanie, klikając na ikonę rozszerzenia lub używając skrótu klawiaturowego (Ctrl+Shift+1 lub ⌘+Shift+1 na Macu). Skrypt w tle (`background script`) wysyła wiadomość do `content script`, aby rozpocząć nagrywanie.
2.  **Przechwytywanie Dźwięku:** `Content script` używa API `navigator.mediaDevices.getUserMedia` aby uzyskać dostęp do mikrofonu i nagrywać dźwięk za pomocą API MediaRecorder.
3.  **Transkrypcja:** `Content script` używa funkcji `transcribeAudio` (z pliku `src/utils/api.js`), aby wysłać dźwięk do API Whisper od OpenAI. API zwraca przetranskrybowany tekst.
4.  **Tłumaczenie lub Parafraza (Opcjonalnie):** 
   - Jeśli opcja tłumaczenia jest włączona, `content script` używa funkcji `translateText` (z pliku `src/utils/translation.js`), aby wysłać przetranskrybowany tekst do API GPT od OpenAI.
   - Jeśli opcja parafrazy jest włączona, funkcja `rephraseText` jest używana do ulepszenia przetranskrybowanego tekstu.
5.  **Wyświetlanie:** `Content script` wyświetla przetworzony tekst albo w aktywnym elemencie strony (jeśli jest to pole tekstowe lub edytowalny element), albo w spersonalizowanym oknie dialogowym.

#### Funkcja menu kontekstowego

1. **Zaznaczanie Tekstu:** Użytkownik zaznacza tekst na stronie internetowej.
2. **Menu Kontekstowe:** Kliknięcie prawym przyciskiem myszy wyświetla opcje "Parafrazuj zaznaczenie" lub "Przetłumacz zaznaczenie" z podmenu zawierającym dostępne języki.
3. **Przetwarzanie:** W zależności od wybranej opcji:
   - Tekst jest wysyłany do parafrazy za pomocą funkcji `rephraseText`
   - Tekst jest wysyłany do tłumaczenia za pomocą funkcji `translateText` z wybranym językiem docelowym
4. **Wyświetlanie:** Wynik zastępuje oryginalnie zaznaczony tekst w elemencie, w którym znajdował się zaznaczony tekst.

### Komunikacja

Komunikacja między `background script` a `content script` odbywa się za pomocą API komunikacji Chrome (`chrome.runtime.sendMessage` oraz `chrome.runtime.onMessage`).

### Przechowywanie Danych

Rozszerzenie używa `chrome.storage.sync` do przechowywania:

*   Klucza API OpenAI (`apiKey`).
*.  Opcji rozszerzenia (wyświetlanie, tłumaczenie, kolory paska, itp.).
*   Preferencji językowych dla tłumaczenia.

Dane te są przechowywane lokalnie na Twoim komputerze, w przestrzeni rozszerzenia Chrome.

### Obsługa Błędów

Błędy możliwe (brak klucza API, błąd transkrypcji, itp.) są zdefiniowane w pliku `constants.js`. Funkcje w plikach `api.js` i `translation.js` obsługują potencjalne błędy wywołań API. `Content.js` wyświetla komunikaty o błędach użytkownikowi za pomocą baneru umieszczonego na górze strony.

## 🛡️ Bezpieczeństwo i Prywatność

- **Ochrona Danych:**
  - Klucz API jest przechowywany w sposób bezpieczny w Chrome.
  - Rozszerzenie nie zachowuje Twoich nagrań audio; wszystkie przetwarzania odbywają się w czasie rzeczywistym.
  - Komunikacja z API odbywa się za pomocą bezpiecznych połączeń HTTPS.

Aby uzyskać pełne informacje na temat sposobu, w jaki BabelFishAI zarządza Twoimi danymi, zapoznaj się z naszą [Polityką Prywatności](PRIVACY.md).

## 🔧 Rozwiązywanie Problemów

- **Problemy z Mikrofonem:**
  - Sprawdź uprawnienia dostępu do mikrofonu w Chrome.
  - Upewnij się, że żadne inne aplikacje nie korzystają jednocześnie z mikrofonu.

- **Błędy Transkrypcji/Tłumaczenia:**
  - Sprawdź, czy klucz API jest ważny i aktywny.
  - Upewnij się, że masz stabilne połączenie z internetem.
  - Sprawdź konsolę Chrome, aby uzyskać szczegółowe logi w przypadku błędu.

## 🤝 Wkład i Współpraca

Wkład i sugestie są mile widziane. Aby wnieść swój wkład:
- Zgłaszaj błędy poprzez sekcję Issues na GitHub.
- Proponuj ulepszenia lub nowe funkcje.
- Składaj swoje pull requesty.

## 📄 Licencja

To rozszerzenie jest dystrybuowane na licencji GNU Affero General Public License v3.0 (AGPL-3.0). Zapoznaj się z plikiem LICENSE, aby uzyskać więcej szczegółów.

## 💝 Wsparcie

Jeśli doceniasz to rozszerzenie, możesz wesprzeć jego rozwój poprzez darowiznę za pomocą [PayPal](https://paypal.me/jls).
---
Stworzone przez jls42.org z pasją i innowacją, Babel Fish AI wynosi transkrypcję i tłumaczenie na nowe horyzonty dzięki najnowocześniejszej sztucznej inteligencji.

**Ten dokument został przetłumaczony z wersji fr na język pl przy użyciu modelu o3-mini. Aby uzyskać więcej informacji na temat procesu tłumaczenia, odwiedź https://gitlab.com/jls42/ai-powered-markdown-translator**

