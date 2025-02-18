# Babel Fish AI - Rozszerzenie do Transkrypcji Głosowej i Tłumaczenia z AI

**Aby korzystać z rozszerzenia, będziesz potrzebował klucza API OpenAI (lub dostawcy zewnętrznego, jeśli używasz LiteLLM Proxy). Możesz wygenerować klucz API OpenAI tutaj : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI to innowacyjne rozszerzenie Chrome zaprojektowane pierwotnie w celu zapewnienia potężnej transkrypcji głosowej. Przekształć swój głos w tekst z niezwykłą precyzją dzięki API Whisper od OpenAI, a opcjonalnie skorzystaj z automatycznego tłumaczenia w czasie rzeczywistym. Możesz używać Babel Fish AI wyłącznie do transkrypcji lub włączyć tłumaczenie na bieżąco, w zależności od potrzeb.

## 🌟 Funkcje

- **Zaawansowana Transkrypcja Głosowa**
  - Nagrywanie dźwięku wysokiej jakości za pomocą mikrofonu Twojego urządzenia.
  - Dokładna transkrypcja wykonana przez API Whisper od OpenAI.
  - Obsługa wielu języków dla rozpoznawania mowy i wyświetlania tekstu, umożliwiająca transkrypcję wypowiedzi w różnych językach oraz prezentację wyników (transkrypcji i tłumaczenia, jeśli włączone) w języku Twojego wyboru.
  - Automatyczne wstawianie tekstu do aktywnego pola lub wyświetlanie go w dedykowanym oknie dialogowym.

- **Zintegrowane Automatyczne Tłumaczenie (Opcjonalne)**
  - Natychmiastowe tłumaczenie transkrypcji na różne języki, do aktywacji w razie potrzeby.
  - Wykorzystanie zaawansowanego modelu AI, aby zagwarantować wierne tłumaczenie oryginalnego znaczenia.
  - Wolny wybór – korzystaj wyłącznie z transkrypcji lub łącz transkrypcję z tłumaczeniem.

- **Intuicyjny i Personalizowany Interfejs Użytkownika**
  - Elastyczny tryb wyświetlania: aktywne pole tekstowe lub pływające okno dialogowe.
  - Konfigurowalny pasek stanu z możliwością wyboru kolorów, przezroczystości oraz czasu wyświetlania.
  - Skrót klawiaturowy (Ctrl+Shift+1 lub ⌘+Shift+1 na Mac) do rozpoczęcia/zakończenia nagrywania.
  - Spersonalizowana ikona, zawierająca mikrofon i cyfrę „42”, dla natychmiastowego rozpoznania.

- **Zaawansowane Opcje**
    - Tryb ekspercki dla szczegółowej konfiguracji (adresy URL API, konfiguracja według domeny, itp.).
    - Możliwość personalizacji modeli transkrypcji i tłumaczenia.
    - Kompatybilność z LiteLLM Proxy, umożliwiająca łączenie się z alternatywnymi modelami językowymi oraz wyłączanie logowania zapytań.
    - Pełna obsługa internacjonalizacji dzięki plikom językowym (_locales), oferująca interfejs i wsparcie głosowe w wielu językach.

## 🌐 Obsługiwane Języki

- Arabski
- Niemiecki
- Angielski
- Hiszpański
- Francuski
- Hindi
- Włoski
- Japoński
- Koreański
- Niderlandzki
- Polski
- Portugalski
- Rumuński
- Szwedzki
- Chiński

## 🚀 Instalacja

1.  **Pobieranie i Instalacja:**
    - Sklonuj to repozytorium z GitHub lub pobierz ręcznie folder rozszerzenia.
    - Otwórz Chrome i przejdź do `chrome://extensions/`.
    - Włącz „Tryb programisty” w prawym górnym rogu.
    - Kliknij „Wczytaj rozszerzenie bez pakowania” i wybierz folder Babel Fish AI.

2.  **Weryfikacja:**
    - Upewnij się, że rozszerzenie pojawia się na pasku narzędzi Chrome z spersonalizowaną ikoną.

## ⚙️ Konfiguracja

1.  **Klucz API OpenAI:**
    *   Kliknij ikonę rozszerzenia, aby uzyskać dostęp do opcji.
    *   Wprowadź swój klucz API OpenAI (dostępny na [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizacja Opcji:**
    *   Wybierz tryb wyświetlania (aktywne pole lub okno dialogowe).
    *   Skonfiguruj kolor, przezroczystość i czas wyświetlania paska stanu.
    *   Wybierz języki dla transkrypcji (wprowadzanie głosowe) oraz dla wyświetlania tekstu.
    *   Włącz lub wyłącz funkcję tłumaczenia według własnych potrzeb.

3.  **(Opcjonalnie) Korzystanie z LiteLLM Proxy:**
    *   Włącz tryb „Ekspert” w opcjach.
    *   W sekcji „Zaawansowana Konfiguracja” zmodyfikuj **oba adresy URL** API (Whisper i Tłumaczenie), aby wskazywały na Twoją instancję LiteLLM Proxy. **Użyj tej samej podstawowej URL dla obu.**
    *   Zaznacz opcję „NoLog (tylko LiteLLM)”, jeśli chcesz wyłączyć logowanie zapytań przez LiteLLM.

## 🚀 Korzystanie z LiteLLM Proxy

Jeśli chcesz korzystać z modeli językowych innych niż OpenAI, możesz użyć LiteLLM Proxy. Oto jak go skonfigurować:

Babel Fish AI jest kompatybilny z [LiteLLM Proxy](https://litellm.ai/), który umożliwia korzystanie z alternatywnych modeli językowych poprzez API kompatybilne z OpenAI.

### Konfiguracja

1.  **Zainstaluj i skonfiguruj LiteLLM Proxy:** Postępuj zgodnie z instrukcjami na stronie LiteLLM.
2.  **Skonfiguruj rozszerzenie Babel Fish AI:**
    *   W opcjach rozszerzenia (kliknij prawym przyciskiem myszy na ikonę > Opcje), włącz tryb „Ekspert”.
    *   W sekcji „Zaawansowana Konfiguracja” zmodyfikuj **oba adresy URL** API (Whisper i Tłumaczenie), aby wskazywały na Twoją instancję LiteLLM Proxy (na przykład, `http://localhost:4000/v1/audio/transcriptions` oraz `http://localhost:4000/v1/chat/completions`). **Użyj tej samej podstawowej URL dla obu.**
    *   Zaznacz opcję „NoLog (tylko LiteLLM)”, jeśli chcesz wyłączyć logowanie zapytań przez LiteLLM.

**Ważne:** Opcja „NoLog” została zaprojektowana **wyłącznie** do użytku z LiteLLM Proxy. **Nie włączaj jej**, jeśli korzystasz z oficjalnego API OpenAI, ponieważ spowoduje to błąd i uniemożliwi działanie tłumaczenia.

## 🛠️ Działanie Techniczne

### Architektura Rozszerzenia

Rozszerzenie składa się z kilku plików JavaScript, które współdziałają ze sobą:

*   **`manifest.json`:** Główny plik konfiguracyjny rozszerzenia. Definiuje uprawnienia, skrypty, dostępne zasoby itp. Używa wersji 3 manifestu i deklaruje uprawnienia `activeTab`, `storage`, `commands` oraz `scripting`. Skrypty zawartości są wstrzykiwane we wszystkie adresy URL i wykonywane na końcu ładowania dokumentu.
*   **`background.js`:** Service worker działający w tle. Zarządza zdarzeniami (kliknięcie na ikonę, skróty klawiaturowe), wstrzykuje skrypt zawartości w razie potrzeby oraz komunikuje się ze skryptem zawartości.
*   **`content.js`:** Skrypt, który jest wstrzykiwany do stron internetowych. Bezpośrednio współdziała z DOM, przechwytuje dźwięk z mikrofonu, wywołuje API do transkrypcji i tłumaczenia oraz wyświetla wyniki.
*   **`src/utils/api.js`:** Zawiera funkcję `transcribeAudio` służącą do wywoływania API Whisper od OpenAI (transkrypcja).
*   **`src/utils/translation.js`:** Zawiera funkcję `translateText` służącą do wywoływania API GPT od OpenAI (tłumaczenie).
*   **`src/utils/ui.js`:** Zawiera funkcje pomocnicze do zarządzania interfejsem użytkownika (baner, okno dialogowe, przycisk kopiowania).
*   **`src/constants.js`:** Definiuje stałe dla konfiguracji, stanów, akcji itp.
*   **`src/pages/options/`:** Zawiera pliki dla strony opcji rozszerzenia (HTML, CSS, JavaScript).

### Proces Transkrypcji i Tłumaczenia

1.  **Rozpoczęcie Nagrywania:** Użytkownik rozpoczyna nagrywanie, klikając na ikonę rozszerzenia lub korzystając ze skrótu klawiaturowego. Skrypt background wysyła wiadomość do skryptu zawartości, aby rozpocząć nagrywanie.
2.  **Przechwytywanie Dźwięku:** Skrypt zawartości używa API `navigator.mediaDevices.getUserMedia`, aby uzyskać dostęp do mikrofonu i nagrywać dźwięk.
3.  **Transkrypcja:** Skrypt zawartości korzysta z funkcji `transcribeAudio` (z pliku `src/utils/api.js`), aby wysłać dźwięk do API Whisper od OpenAI. API zwraca transkrybowany tekst.
4.  **Tłumaczenie (Opcjonalne):** Jeśli opcja tłumaczenia jest włączona, skrypt zawartości korzysta z funkcji `translateText` (z pliku `src/utils/translation.js`), aby wysłać transkrybowany tekst do API GPT od OpenAI. API zwraca przetłumaczony tekst.
5.  **Wyświetlanie:** Skrypt zawartości prezentuje transkrybowany (i ewentualnie przetłumaczony) tekst albo w aktywnym elemencie strony (jeśli jest to pole tekstowe lub element edytowalny), albo w oknie dialogowym.

### Komunikacja

Komunikacja między skryptami background i zawartości odbywa się za pomocą API komunikacyjnego Chrome (`chrome.runtime.sendMessage` oraz `chrome.runtime.onMessage`).

### Przechowywanie Danych

Rozszerzenie używa `chrome.storage.sync` do przechowywania:

*   Klucza API OpenAI (`apiKey`).
*   Opcji rozszerzenia (wyświetlanie, tłumaczenie, kolory paska stanu itp.).

Te dane są przechowywane lokalnie na Twoim komputerze, w magazynie rozszerzenia Chrome.

### Obsługa Błędów

Możliwe błędy (np. brak klucza API, błąd transkrypcji itp.) są określone w pliku `constants.js`. Funkcje w plikach `api.js` i `translation.js` obsługują potencjalne błędy wywołań API. Skrypt `content.js` wyświetla komunikaty o błędach użytkownikowi za pomocą baneru umieszczonego na górze strony.

## 🛡️ Bezpieczeństwo i Prywatność

- **Ochrona Danych:**
  - Klucz API jest przechowywany w sposób bezpieczny w Chrome.
  - Rozszerzenie nie przechowuje Twoich danych audio; wszystkie przetwarzania odbywają się w czasie rzeczywistym.
  - Komunikacja z API odbywa się poprzez bezpieczne połączenia HTTPS.

Aby uzyskać pełne informacje na temat sposobu, w jaki BabelFishAI zarządza Twoimi danymi, zapoznaj się z naszą [Polityką Prywatności](PRIVACY.md).

## 🔧 Rozwiązywanie Problemów

- **Problemy z Mikrofonem:**
  - Sprawdź uprawnienia dostępu do mikrofonu w Chrome.
  - Upewnij się, że żadna inna aplikacja nie korzysta równocześnie z mikrofonu.

- **Błędy Transkrypcji/Tłumaczenia:**
  - Sprawdź, czy klucz API jest ważny i aktywny.
  - Upewnij się, że masz stabilne połączenie z internetem.
  - Przejrzyj konsolę Chrome, aby uzyskać szczegółowe logi w przypadku błędu.

## 🤝 Wkład

Wkład i sugestie są mile widziane. Aby przyczynić się:
- Zgłaszaj błędy poprzez sekcję Issues na GitHub.
- Proponuj usprawnienia lub nowe funkcje.
- Prześlij swoje pull requesty.

## 📄 Licencja

To rozszerzenie jest rozpowszechniane na licencji GNU Affero General Public License v3.0 (AGPL-3.0). Zapoznaj się z plikiem LICENSE, aby uzyskać więcej szczegółów.

## 💝 Wsparcie

Jeśli doceniasz to rozszerzenie, możesz wesprzeć jego rozwój, dokonując darowizny przez [PayPal](https://paypal.me/jls).

---
Opracowane przez jls42.org z pasją i innowacją, Babel Fish AI wynosi transkrypcję i tłumaczenie na nowe horyzonty dzięki najnowocześniejszej sztucznej inteligencji.

**Ten dokument został przetłumaczony z wersji fr na język pl przy użyciu modelu o3-mini. Aby uzyskać więcej informacji dotyczących procesu tłumaczenia, odwiedź https://gitlab.com/jls42/ai-powered-markdown-translator**

