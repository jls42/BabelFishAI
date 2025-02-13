# Babel Fish AI - Rozszerzenie do Transkrypcji Głosowej i Tłumaczenia z AI

Babel Fish AI to innowacyjne rozszerzenie do Chrome, pierwotnie zaprojektowane, aby zapewnić potężną transkrypcję głosową. Przekształć swój głos na tekst z niezwykłą precyzją dzięki API Whisper OpenAI i, opcjonalnie, skorzystaj z automatycznego tłumaczenia w czasie rzeczywistym. Możesz używać Babel Fish AI wyłącznie do transkrypcji lub włączać tłumaczenie "w locie" w zależności od potrzeb.

## 🌟 Funkcje

- **Zaawansowana Transkrypcja Głosowa**
  - Nagrywanie dźwięku wysokiej jakości za pośrednictwem mikrofonu twojego urządzenia.
  - Dokładna transkrypcja realizowana przez API Whisper OpenAI.
  - Wielojęzyczne wsparcie dla przetwarzania głosu i wyświetlania tekstu, umożliwiające transkrypcję nagrań głosowych w różnych językach i prezentowanie wyników w wybranym języku.
  - Automatyczne wstawianie tekstu do aktywnego pola lub wyświetlanie w dedykowanym oknie dialogowym.

- **Wbudowane Automatyczne Tłumaczenie (Opcjonalne)**
  - Natychmiastowe tłumaczenie transkrypcji na różne języki, do włączenia w razie potrzeby.
  - Wykorzystanie zaawansowanego modelu AI, aby zagwarantować wierne oddanie oryginalnego sensu.
  - Swobodny wybór – korzystaj wyłącznie z transkrypcji lub łącz transkrypcję z tłumaczeniem.

- **Intuicyjny i Personalizowany Interfejs Użytkownika**
  - Elastyczny tryb wyświetlania: aktywna strefa wprowadzania lub pływające okno dialogowe.
  - Konfigurowalny pasek statusu z możliwością wyboru kolorów, przezroczystości i czasu wyświetlania.
  - Skrót klawiszowy (Ctrl+Shift+1 lub ⌘+Shift+1 na Mac) do rozpoczęcia/zatrzymania nagrywania.
  - Spersonalizowana ikona, zawierająca mikrofon oraz cyfrę „42”, dla natychmiastowego rozpoznania.

- **Zaawansowane Opcje**
    - Tryb ekspercki umożliwiający szczegółową konfigurację (adresy URL API, konfiguracja według domeny itp.).
    - Możliwość personalizacji modeli transkrypcji i tłumaczenia.
    - **Kompatybilność z LiteLLM Proxy, umożliwiająca korzystanie z alternatywnych modeli językowych oraz wyłączenie rejestrowania zapytań.**
    - Kompleksowe zarządzanie internacjonalizacją dzięki plikom językowym (_locales), oferując interfejs i wsparcie głosowe w wielu językach.

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
- Holenderski
- Polski
- Portugalski
- Rumuński
- Szwedzki
- Chiński

## 🚀 Instalacja

1.  **Pobieranie i Instalacja:**
    - Sklonuj to repozytorium z GitHub lub pobierz ręcznie folder rozszerzenia.
    - Otwórz Chrome i przejdź do `chrome://extensions/`.
    - Włącz „Tryb dewelopera” w prawym górnym rogu.
    - Kliknij „Wczytaj rozszerzenie bez pakietu” i wybierz folder Babel Fish AI.

2.  **Weryfikacja:**
    - Upewnij się, że rozszerzenie pojawia się na pasku narzędzi Chrome z spersonalizowaną ikoną.

## ⚙️ Konfiguracja

1.  **Klucz API OpenAI:**
    *   Kliknij na ikonę rozszerzenia, aby uzyskać dostęp do opcji.
    *   Wprowadź swój klucz API OpenAI (dostępny na [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizacja Opcji:**
    *   Wybierz tryb wyświetlania (aktywna strefa lub okno dialogowe).
    *   Skonfiguruj kolor, przezroczystość oraz czas wyświetlania paska statusu.
    *   Wybierz języki dla transkrypcji (wejście głosowe) oraz dla wyświetlania tekstu.
    *   Włącz lub wyłącz funkcję tłumaczenia według potrzeb.

3.  **(Opcjonalnie) Użycie z LiteLLM Proxy:**
    *   Włącz „Tryb Ekspercki” w opcjach.
    *   W sekcji „Zaawansowana Konfiguracja” zmień **oba adresy URL** API (Whisper i Tłumaczenie), aby wskazywały na Twoją instancję LiteLLM Proxy. **Użyj tego samego adresu URL bazowego dla obu.**
    *   Zaznacz opcję „NoLog (tylko LiteLLM)”, jeśli chcesz wyłączyć rejestrowanie zapytań przez LiteLLM.

## 🚀 Użycie z LiteLLM Proxy

Babel Fish AI jest kompatybilny z [LiteLLM Proxy](https://litellm.ai/), który umożliwia korzystanie z alternatywnych modeli językowych z API kompatybilnym z OpenAI.

### Konfiguracja

1.  **Zainstaluj i skonfiguruj LiteLLM Proxy:** Postępuj zgodnie z instrukcjami podanymi na stronie LiteLLM.
2.  **Skonfiguruj rozszerzenie Babel Fish AI:**
    *   W opcjach rozszerzenia (prawy przycisk myszy na ikonie > Opcje) włącz „Tryb Ekspercki”.
    *   W sekcji „Zaawansowana Konfiguracja” zmień **oba adresy URL** API (Whisper i Tłumaczenie), aby wskazywały na Twoją instancję LiteLLM Proxy (na przykład, `http://localhost:4000/v1/audio/transcriptions` oraz `http://localhost:4000/v1/chat/completions`). **Użyj tego samego adresu URL bazowego dla obu.**
    *   Zaznacz opcję „NoLog (tylko LiteLLM)”, jeśli chcesz wyłączyć rejestrowanie zapytań przez LiteLLM.

**Ważne:** Opcja „NoLog” jest przeznaczona **wyłącznie** do użycia z LiteLLM Proxy. **Nie włączaj jej**, jeśli korzystasz z oficjalnego API OpenAI, ponieważ spowoduje to błąd i uniemożliwi działanie tłumaczenia.

## 🛠️ Techniczne Działanie

### Architektura Rozszerzenia

Rozszerzenie składa się z kilku plików JavaScript, które współdziałają ze sobą:

*   **`manifest.json`:** Główny plik konfiguracyjny rozszerzenia. Definiuje uprawnienia, skrypty, dostępne zasoby itp. Używa wersji 3 manifestu i deklaruje uprawnienia `activeTab`, `storage`, `commands` oraz `scripting`. Skrypty `content_scripts` są wstrzykiwane do wszystkich stron i wykonują się na końcu ładowania dokumentu.
*   **`background.js`:** Service worker działający w tle. Obsługuje zdarzenia (kliknięcie na ikonę, skróty klawiszowe), wstrzykuje `content script` w razie potrzeby oraz komunikuje się z `content script`.
*   **`content.js`:** Skrypt wstrzykiwany do stron internetowych. Bezpośrednio współdziała z DOM, rejestruje dźwięk z mikrofonu, wywołuje API transkrypcji i tłumaczenia oraz wyświetla wyniki.
*   **`src/utils/api.js`:** Zawiera funkcję `transcribeAudio`, która wywołuje API Whisper OpenAI (transkrypcja).
*   **`src/utils/translation.js`:** Zawiera funkcję `translateText`, która wywołuje API GPT OpenAI (tłumaczenie).
*   **`src/utils/ui.js`:** Zawiera funkcje pomocnicze do zarządzania interfejsem użytkownika (baner, okno dialogowe, przycisk kopiowania).
*   **`src/constants.js`:** Definiuje stałe dla konfiguracji, stanów, akcji itp.
*   **`src/pages/options/`:** Zawiera pliki do strony opcji rozszerzenia (HTML, CSS, JavaScript).

### Proces Transkrypcji i Tłumaczenia

1.  **Rozpoczęcie Nagrywania:** Użytkownik rozpoczyna nagrywanie, klikając ikonę rozszerzenia lub używając skrótu klawiszowego. Skrypt tła wysyła wiadomość do skryptu zawartości, aby rozpocząć nagrywanie.
2.  **Nagrywanie Dźwięku:** Skrypt zawartości wykorzystuje API `navigator.mediaDevices.getUserMedia`, aby uzyskać dostęp do mikrofonu i nagrać dźwięk.
3.  **Transkrypcja:** Skrypt zawartości wykorzystuje funkcję `transcribeAudio` (`src/utils/api.js`), aby wysłać dźwięk do API Whisper OpenAI. API zwraca przetranskrybowany tekst.
4.  **Tłumaczenie (Opcjonalne):** Jeśli opcja tłumaczenia jest włączona, skrypt zawartości używa funkcji `translateText` (`src/utils/translation.js`), aby wysłać przetranskrybowany tekst do API GPT OpenAI. API zwraca przetłumaczony tekst.
5.  **Wyświetlanie:** Skrypt zawartości wyświetla przetranskrybowany (oraz ewentualnie przetłumaczony) tekst w aktywnym elemencie strony (jeśli jest to pole tekstowe lub element możliwy do edycji) lub w oknie dialogowym.

### Komunikacja

Komunikacja między skryptem tła a skryptem zawartości odbywa się za pomocą API komunikacji Chrome (`chrome.runtime.sendMessage` oraz `chrome.runtime.onMessage`).

### Przechowywanie Danych

Rozszerzenie korzysta z `chrome.storage.sync` do przechowywania:

*   Klucza API OpenAI (`apiKey`).
*   Opcji rozszerzenia (wyświetlanie, tłumaczenie, kolory paska itp.).

### Obsługa Błędów

Możliwe błędy (np. brak klucza API, błąd transkrypcji) są zdefiniowane w pliku `constants.js`. Funkcje `api.js` oraz `translation.js` obsługują potencjalne błędy wywołań API. Skrypt zawartości wyświetla komunikaty o błędach użytkownikowi za pomocą banera na górze strony.

## 🛡️ Bezpieczeństwo i Prywatność

- **Ochrona Danych:**
  - Klucz API jest przechowywany w sposób bezpieczny w Chrome.
  - Rozszerzenie nie przechowuje danych audio; wszystkie przetwarzania odbywają się w czasie rzeczywistym.
  - Komunikacja z API odbywa się za pośrednictwem bezpiecznych połączeń HTTPS.

## 🔧 Rozwiązywanie Problemów

- **Problemy z Mikrofonem:**
  - Sprawdź uprawnienia dostępu do mikrofonu w Chrome.
  - Upewnij się, że żadne inne aplikacje nie korzystają jednocześnie z mikrofonu.

- **Błędy Transkrypcji/Tłumaczenia:**
  - Sprawdź, czy klucz API jest ważny i aktywny.
  - Upewnij się, że masz stabilne połączenie z internetem.
  - Sprawdź konsolę Chrome, aby uzyskać szczegółowe logi w przypadku błędów.

## 🤝 Wkład

Wkład i sugestie są mile widziane. Aby przyczynić się:
- Zgłaszaj błędy poprzez sekcję Issues na GitHub.
- Proponuj ulepszenia lub nowe funkcje.
- Przesyłaj swoje pull requesty.

## 📄 Licencja

Rozszerzenie jest rozpowszechniane na licencji GNU Affero General Public License v3.0 (AGPL-3.0). Zapoznaj się z plikiem LICENSE, aby uzyskać więcej szczegółów.

## 💝 Wsparcie

Jeśli podoba Ci się to rozszerzenie, możesz wesprzeć jego rozwój, dokonując darowizny za pośrednictwem [PayPal](https://paypal.me/jls).

---
Stworzone przez jls42.org z pasją i innowacją, Babel Fish AI wynosi transkrypcję i tłumaczenie na nowe horyzonty dzięki zaawansowanej sztucznej inteligencji.

**Ten dokument został przetłumaczony z wersji fr do języka pl przy użyciu modelu o3-mini. Aby uzyskać więcej informacji o procesie tłumaczenia, zobacz https://gitlab.com/jls42/ai-powered-markdown-translator**

