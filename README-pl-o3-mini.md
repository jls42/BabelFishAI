# Babel Fish AI - Rozszerzenie do Transkrypcji Głosowej i Tłumaczenia z Wykorzystaniem AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Aby korzystać z rozszerzenia, będziesz potrzebować klucza API OpenAI (lub dostawcy zewnętrznego, jeśli używasz LiteLLM Proxy). Możesz wygenerować klucz API OpenAI tutaj: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI to innowacyjne rozszerzenie do Chrome, stworzone pierwotnie w celu zapewnienia potężnej transkrypcji głosowej. Przekształć swój głos na tekst z niezwykłą precyzją dzięki API Whisper firmy OpenAI i opcjonalnie korzystaj z automatycznego tłumaczenia w czasie rzeczywistym. Możesz używać Babel Fish AI wyłącznie do transkrypcji lub włączyć tłumaczenie "w locie" zgodnie z Twoimi potrzebami.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funkcje

- **Zaawansowana Transkrypcja Głosowa**
  - Nagrywanie dźwięku w wysokiej jakości za pomocą mikrofonu Twojego urządzenia.
  - Precyzyjna transkrypcja realizowana przez API Whisper firmy OpenAI.
  - Wielojęzyczne wsparcie dla rozpoznawania mowy i wyświetlania tekstu, umożliwiające transkrypcję wypowiedzi w różnych językach oraz wyświetlanie wyników (transkrypcji i tłumaczenia, jeśli jest włączone) w wybranym przez Ciebie języku.
  - Automatyczne wstawianie tekstu do aktywnego pola lub wyświetlanie w dedykowanym oknie dialogowym.

- **Inteligentne Tłumaczenie i Parafrazowanie**
  - Natychmiastowe tłumaczenie transkrypcji na różne języki, do włączenia w razie potrzeby.
  - Parafrazowanie tekstu w celu poprawy jego stylu i przejrzystości.
  - Wykorzystanie zaawansowanego modelu AI, aby zapewnić tłumaczenie wierne oryginalnemu sensowi.
  - Dowolny wybór: korzystanie wyłącznie z transkrypcji lub łączenie transkrypcji z tłumaczeniem.

- **Mocne Menu Kontekstowe**
  - Opcja „Parafrazuj zaznaczenie” do natychmiastowej poprawy wybranych fragmentów tekstu.
  - Opcja „Przetłumacz zaznaczenie” z podmenu wszystkich dostępnych języków.
  - Bezpośrednia zamiana zaznaczonego tekstu na jego wersję przetłumaczoną lub parafrazowaną.
  - Perfekcyjna integracja z natywnym interfejsem użytkownika Chrome.

- **Intuicyjny i Personalizowalny Interfejs Użytkownika**
  - Elastyczny tryb wyświetlania: aktywne pole tekstowe lub pływające okno dialogowe.
  - Pasek statusu możliwy do skonfigurowania z wyborem kolorów, przezroczystości i czasu wyświetlania.
  - Skrót klawiszowy (Ctrl+Shift+1 lub ⌘+Shift+1 na Mac) do rozpoczęcia/zakończenia nagrywania.
  - Opcja „Pozostań otwarty”, aby kontrolować czas wyświetlania wyników.
  - Spersonalizowana ikona, zawierająca mikrofon i cyfrę „42”, dla natychmiastowego rozpoznania.

- **Zaawansowane Opcje**
    - Tryb ekspercki dla szczegółowych konfiguracji (URL-e API, konfiguracja według domen, itp.).
    - Możliwość personalizacji modeli transkrypcji i tłumaczenia.
    - Kompatybilność z LiteLLM Proxy, umożliwiająca połączenie z alternatywnymi modelami językowymi i wyłączenie logowania zapytań.
    - Pełna obsługa internacjonalizacji dzięki plikom językowym (_locales), oferująca interfejs i wsparcie głosowe w wielu językach.

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

1.  **Pobranie i Instalacja:**
    - Sklonuj to repozytorium z GitHub lub pobierz ręcznie folder rozszerzenia.
    - **Lub zainstaluj rozszerzenie bezpośrednio ze [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Otwórz Chrome i przejdź do `chrome://extensions/`.
    - Włącz „Tryb dewelopera” w prawym górnym rogu.
    - Kliknij „Wczytaj rozszerzenie bez pakowania” i wybierz folder Babel Fish AI.

2.  **Weryfikacja:**
    - Upewnij się, że rozszerzenie pojawia się na pasku narzędzi Chrome z spersonalizowaną ikoną.

## ⚙️ Konfiguracja

1.  **Klucz API OpenAI:**
    *   Kliknij ikonę rozszerzenia, aby przejść do opcji.
    *   Wprowadź swój klucz API OpenAI (dostępny na [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizacja Opcji:**
    *   Wybierz tryb wyświetlania (aktywne pole lub okno dialogowe).
    *   Skonfiguruj kolor, przezroczystość i czas wyświetlania paska statusu.
    *   Wybierz języki do transkrypcji (wejście głosowe) oraz do wyświetlania tekstu.
    *   Włącz lub wyłącz funkcję tłumaczenia zgodnie z Twoimi potrzebami.

3.  **(Opcjonalnie) Używanie z LiteLLM Proxy:**
    *   Włącz „Tryb Ekspercki” w opcjach.
    *   W sekcji „Zaawansowana Konfiguracja” zmień **oba URL-e** API (Whisper i Tłumaczenie), aby wskazywały na Twoją instancję LiteLLM Proxy. **Użyj tej samej podstawowej URL dla obu.**
    *   Zaznacz opcję „NoLog (tylko LiteLLM)”, jeśli chcesz wyłączyć logowanie zapytań przez LiteLLM.

## 🚀 Używanie z LiteLLM Proxy

Jeśli chcesz korzystać z modeli językowych innych niż te od OpenAI, możesz użyć LiteLLM Proxy. Oto jak go skonfigurować:

Babel Fish AI jest kompatybilne z [LiteLLM Proxy](https://litellm.ai/), które umożliwia korzystanie z alternatywnych modeli językowych za pomocą API zgodnego z API OpenAI.

### Konfiguracja

1.  **Zainstaluj i skonfiguruj LiteLLM Proxy:** Postępuj zgodnie z instrukcjami na stronie LiteLLM.
2.  **Skonfiguruj rozszerzenie Babel Fish AI:**
    *   W opcjach rozszerzenia (prawy przycisk myszy na ikonie > Opcje) włącz „Tryb Ekspercki”.
    *   W sekcji „Zaawansowana Konfiguracja” zmień **oba URL-e** API (Whisper i Tłumaczenie), aby wskazywały na Twoją instancję LiteLLM Proxy (na przykład, `http://localhost:4000/v1/audio/transcriptions` oraz `http://localhost:4000/v1/chat/completions`). **Użyj tej samej podstawowej URL dla obu.**
    *   Zaznacz opcję „NoLog (tylko LiteLLM)”, jeśli chcesz wyłączyć logowanie zapytań przez LiteLLM.

**Ważne:** Opcja „NoLog” została zaprojektowana **wyłącznie** do użycia z LiteLLM Proxy. **Nie włączaj jej**, jeśli używasz oficjalnego API OpenAI, ponieważ spowoduje to błąd i uniemożliwi działanie tłumaczenia.

## 🛠️ Działanie Techniczne

### Architektura Rozszerzenia

Rozszerzenie składa się z kilku plików JavaScript, które współdziałają ze sobą:

*   **`manifest.json`:** Główny plik konfiguracyjny rozszerzenia. Definiuje uprawnienia, skrypty, dostępne zasoby itp. Używa wersji 3 manifestu i deklaruje uprawnienia `activeTab`, `storage`, `commands`, `scripting` oraz `contextMenus`. `web_accessible_resources` umożliwiają dostęp do zasobów rozszerzenia w różnych kontekstach wykonywania.
*   **`background.js`:** Service worker działający w tle. Obsługuje zdarzenia (kliknięcie ikony, skróty klawiszowe, menu kontekstowe), wstrzykuje `content script` w razie potrzeby oraz komunikuje się z `content script`.
*   **`content.js`:** Skrypt wstrzykiwany do stron internetowych. Bezpośrednio oddziałuje na DOM, rejestruje dźwięk z mikrofonu, wywołuje API do transkrypcji i tłumaczenia oraz wyświetla wyniki.
*   **`src/utils/api.js`:** Zawiera funkcje umożliwiające interakcję z API, w tym `transcribeAudio` do wywoływania API Whisper firmy OpenAI (transkrypcji) oraz funkcje pomocnicze do zarządzania magazynem.
*   **`src/utils/translation.js`:** Zawiera funkcje `translateText` i `rephraseText` do wywoływania API GPT firmy OpenAI (tłumaczenia i parafrazowania).
*   **`src/utils/ui.js`:** Zawiera funkcje pomocnicze do zarządzania interfejsem użytkownika (baner, okno dialogowe, przycisk kopiowania).
*   **`src/utils/languages-shared.js` oraz `src/utils/languages-data.js`:** Definiują scentralizowaną listę obsługiwanych języków, odpowiednio dla kontekstu strony internetowej oraz dla service workera.
*   **`src/utils/i18n.js`:** Zarządza internacjonalizacją interfejsu użytkownika.
*   **`src/constants.js`:** Definiuje stałe dla konfiguracji, stanów, akcji itp.
*   **`src/pages/options/`:** Zawiera pliki dla strony opcji rozszerzenia (HTML, CSS, JavaScript).

### Proces Transkrypcji i Tłumaczenia

#### Główna Funkcja Transkrypcji Głosowej

1.  **Uruchomienie Nagrywania:** Użytkownik rozpoczyna nagrywanie, klikając ikonę rozszerzenia lub używając skrótu klawiszowego (Ctrl+Shift+1 lub ⌘+Shift+1 na Mac). Skrypt w tle (`background script`) wysyła wiadomość do `content script`, aby rozpocząć nagrywanie.
2.  **Rejestracja Dźwięku:** Skrypt `content script` używa API `navigator.mediaDevices.getUserMedia`, aby uzyskać dostęp do mikrofonu i nagrywać dźwięk za pomocą API MediaRecorder.
3.  **Transkrypcja:** Skrypt `content script` wykorzystuje funkcję `transcribeAudio` (`src/utils/api.js`), aby wysłać dźwięk do API Whisper firmy OpenAI. API zwraca przetranskrybowany tekst.
4.  **Tłumaczenie lub Parafrazowanie (Opcjonalnie):**
   - Jeśli opcja tłumaczenia jest włączona, `content script` używa funkcji `translateText` (`src/utils/translation.js`), aby wysłać przetranskrybowany tekst do API GPT firmy OpenAI.
   - Jeśli opcja parafrazowania jest włączona, wykorzystywana jest funkcja `rephraseText` w celu poprawy przetranskrybowanego tekstu.
5.  **Wyświetlanie:** Skrypt `content script` wyświetla przetworzony tekst albo w aktywnym elemencie strony (jeśli jest to pole tekstowe lub element edytowalny), albo w spersonalizowanym oknie dialogowym.

#### Funkcja Menu Kontekstowego

1. **Zaznaczanie Tekstu:** Użytkownik zaznacza tekst na stronie internetowej.
2. **Menu Kontekstowe:** Kliknięcie prawym przyciskiem myszy wyświetla opcje „Parafrazuj zaznaczenie” lub „Przetłumacz zaznaczenie” z podmenu dostępnych języków.
3. **Przetwarzanie:** W zależności od wybranej opcji:
   - Tekst jest wysyłany do parafrazowania przez funkcję `rephraseText`
   - Tekst jest wysyłany do tłumaczenia przez funkcję `translateText` z wybranym językiem docelowym
4. **Wyświetlanie:** Wynik zastępuje oryginalne zaznaczenie w elemencie, w którym znajdował się zaznaczony tekst.

### Komunikacja

Komunikacja między `background script` a `content script` odbywa się przy użyciu API komunikacji Chrome (`chrome.runtime.sendMessage` oraz `chrome.runtime.onMessage`).

### Przechowywanie Danych

Rozszerzenie wykorzystuje `chrome.storage.sync` do przechowywania:

*   Klucza API OpenAI (`apiKey`).
*   Opcji rozszerzenia (wyświetlanie, tłumaczenie, kolory paska, itp.).
*   Preferencji językowych dla tłumaczenia.

Dane te są przechowywane lokalnie na Twoim komputerze, w magazynie rozszerzenia Chrome.

### Obsługa Błędów

Możliwe błędy (brak klucza API, błąd transkrypcji, itp.) są zdefiniowane w pliku `constants.js`. Funkcje w `api.js` i `translation.js` obsługują potencjalne błędy wywołań API. Skrypt `content.js` wyświetla komunikaty o błędach użytkownikowi za pomocą baneru na górze strony.

## 🛡️ Bezpieczeństwo i Prywatność

- **Ochrona Danych:**
  - Klucz API jest przechowywany w bezpieczny sposób w Chrome.
  - Rozszerzenie nie przechowuje Twoich danych audio; wszystkie przetwarzania odbywają się w czasie rzeczywistym.
  - Komunikacja z API odbywa się za pośrednictwem bezpiecznych połączeń HTTPS.

Aby uzyskać pełne informacje na temat sposobu, w jaki BabelFishAI zarządza Twoimi danymi, zapoznaj się z naszą [Polityką Prywatności](PRIVACY.md).

## 🔧 Rozwiązywanie Problemów

- **Problemy z Mikrofonem:**
  - Sprawdź uprawnienia dostępu do mikrofonu w Chrome.
  - Upewnij się, że żadne inne aplikacje nie korzystają jednocześnie z mikrofonu.

- **Błędy Transkrypcji/Tłumaczenia:**
  - Sprawdź, czy klucz API jest ważny i aktywny.
  - Upewnij się, że masz stabilne połączenie z internetem.
  - Skonsultuj konsolę Chrome, aby uzyskać szczegółowe logi w razie błędu.

## 🤝 Wkład

Wkład oraz sugestie są mile widziane. Aby przyczynić się do projektu:
- Zgłaszaj błędy za pośrednictwem sekcji Issues na GitHub.
- Proponuj ulepszenia lub nowe funkcje.
- Przesyłaj swoje pull requesty.

## 📄 Licencja

To rozszerzenie jest dystrybuowane na licencji GNU Affero General Public License v3.0 (AGPL-3.0). Zapoznaj się z plikiem LICENSE, aby uzyskać więcej szczegółów.

## 💝 Wsparcie

Jeśli cenisz to rozszerzenie, możesz wesprzeć jego rozwój, dokonując darowizny przez [PayPal](https://paypal.me/jls).

---
Opracowane przez jls42.org z pasją i innowacją, Babel Fish AI wynosi transkrypcję i tłumaczenie na nowe horyzonty dzięki zaawansowanej sztucznej inteligencji.

**Dokument ten został przetłumaczony z wersji fr na język pl przy użyciu modelu o3-mini. Aby uzyskać więcej informacji na temat procesu tłumaczenia, sprawdź https://gitlab.com/jls42/ai-powered-markdown-translator**

