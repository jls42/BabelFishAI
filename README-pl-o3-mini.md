# Babel Fish AI - Rozszerzenie do Transkrypcji Mowy i Tłumaczenia z SI

Babel Fish AI to innowacyjne rozszerzenie do Chrome, pierwotnie stworzone, aby oferować potężną transkrypcję mowy. Przekształć swój głos w tekst z niezwykłą precyzją dzięki API Whisper od OpenAI i opcjonalnie korzystaj z automatycznego tłumaczenia w czasie rzeczywistym. Możesz używać Babel Fish AI wyłącznie do transkrypcji lub włączyć tłumaczenie "w locie" według swoich potrzeb.

## 🌟 Funkcje

- **Zaawansowana Transkrypcja Mowy**
  - Nagrywanie dźwięku w wysokiej jakości za pomocą mikrofonu twojego urządzenia.
  - Precyzyjna transkrypcja wykonana przez API Whisper od OpenAI.
  - Obsługa wielu języków w przetwarzaniu mowy i wyświetlaniu tekstu, umożliwiając transkrypcję wypowiedzi w różnych językach oraz wyświetlanie wyników w wybranym języku.
  - Automatyczne wstawianie tekstu do aktywnego pola lub wyświetlanie w dedykowanym oknie dialogowym.

- **Wbudowane Automatyczne Tłumaczenie (Opcjonalnie)**
  - Natychmiastowe tłumaczenie transkrypcji na różne języki, które można włączyć w razie potrzeby.
  - Użycie zaawansowanego modelu SI, aby zapewnić tłumaczenie wierne oryginalnemu sensowi.
  - Wolny wybór: korzystanie wyłącznie z transkrypcji lub łączenie transkrypcji z tłumaczeniem.

- **Intuicyjny i Personalizowalny Interfejs Użytkownika**
  - Elastyczny tryb wyświetlania: aktywne pole do wpisywania lub unoszące się okno dialogowe.
  - Konfigurowalny pasek statusu z wyborem kolorów, przezroczystości oraz czasu wyświetlania.
  - Skrót klawiaturowy (Ctrl+Shift+1 lub ⌘+Shift+1 na Mac) do rozpoczęcia/zatrzymania nagrywania.
  - Personalizowana ikona, zawierająca mikrofon i cyfrę „42”, dla natychmiastowego rozpoznania.

- **Opcje Zaawansowane**
  - Tryb ekspercki dla szczegółowej konfiguracji (adresy URL API, konfiguracja według domeny, itp.).
  - Możliwość personalizacji modeli transkrypcji i tłumaczenia.
  - Pełne zarządzanie internacjonalizacją dzięki plikom językowym (_locales), oferując interfejs i obsługę mowy w wielu językach.

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

1. **Pobieranie i Instalacja:**
   - Sklonuj to repozytorium z GitHub lub pobierz ręcznie folder rozszerzenia.
   - Otwórz Chrome i przejdź pod adres `chrome://extensions/`.
   - Włącz „Tryb dewelopera” w prawym górnym rogu.
   - Kliknij „Załaduj rozszerzenie bez pakowania” i wybierz folder Babel Fish AI.

2. **Weryfikacja:**
   - Upewnij się, że rozszerzenie pojawia się na pasku narzędzi Chrome z personalizowaną ikoną.

## ⚙️ Konfiguracja

1. **Klucz API OpenAI:**
   - Kliknij ikonę rozszerzenia, aby uzyskać dostęp do opcji.
   - Wprowadź swój klucz API OpenAI (dostępny pod adresem [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Personalizacja Opcji:**
   - Wybierz tryb wyświetlania (aktywne pole lub okno dialogowe).
   - Skonfiguruj kolor, przezroczystość oraz czas wyświetlania paska statusu.
   - Wybierz języki dla transkrypcji (wejście mowy) oraz dla wyświetlania tekstu.
   - Włącz lub wyłącz funkcję tłumaczenia według swoich potrzeb.

## 🛠️ Techniczne Funkcjonowanie

### Architektura Rozszerzenia

Rozszerzenie składa się z kilku plików JavaScript, które współdziałają ze sobą:

*   **`manifest.json`:** Główny plik konfiguracyjny rozszerzenia. Definiuje uprawnienia, skrypty, dostępne zasoby, itp. Używa wersji 3 manifestu i deklaruje uprawnienia `activeTab`, `storage`, `commands` oraz `scripting`. Skrypty `content_scripts` są wstrzykiwane na wszystkie adresy URL i uruchamiane pod koniec ładowania dokumentu.
*   **`background.js`:** Service worker, który działa w tle. Obsługuje zdarzenia (kliknięcie ikony, skróty klawiaturowe), wstrzykuje `content script` w razie potrzeby oraz komunikuje się z `content script`.
*   **`content.js`:** Skrypt, który jest wstrzykiwany do stron internetowych. Bezpośrednio współdziała z DOM, nagrywa dźwięk z mikrofonu, wywołuje API transkrypcji i tłumaczenia oraz wyświetla wyniki.
*   **`src/utils/api.js`:** Zawiera funkcję `transcribeAudio` do wywoływania API Whisper od OpenAI (transkrypcja).
*   **`src/utils/translation.js`:** Zawiera funkcję `translateText` do wywoływania API GPT od OpenAI (tłumaczenie).
*   **`src/utils/ui.js`:** Zawiera funkcje użytkowe do zarządzania interfejsem użytkownika (baner, okno dialogowe, przycisk kopiowania).
*   **`src/constants.js`:** Definiuje stałe dla konfiguracji, stanów, akcji, itp.
*   **`src/pages/options/`:** Zawiera pliki dla strony opcji rozszerzenia (HTML, CSS, JavaScript).

### Proces Transkrypcji i Tłumaczenia

1.  **Rozpoczęcie Nagrywania:** Użytkownik zaczyna nagrywanie poprzez kliknięcie na ikonę rozszerzenia lub używając skrótu klawiaturowego. Skrypt tła wysyła wiadomość do `content script`, aby rozpocząć nagrywanie.
2.  **Nagrywanie Dźwięku:** `Content script` używa API `navigator.mediaDevices.getUserMedia`, aby uzyskać dostęp do mikrofonu i nagrać dźwięk.
3.  **Transkrypcja:** `Content script` używa funkcji `transcribeAudio` (`src/utils/api.js`) do wysłania dźwięku do API Whisper od OpenAI. API zwraca przetranskrybowany tekst.
4.  **Tłumaczenie (Opcjonalnie):** Jeśli opcja tłumaczenia jest włączona, `content script` używa funkcji `translateText` (`src/utils/translation.js`) do wysłania przetranskrybowanego tekstu do API GPT od OpenAI. API zwraca przetłumaczony tekst.
5.  **Wyświetlanie:** `Content script` wyświetla przetranskrybowany (i ewentualnie przetłumaczony) tekst albo w aktywnym elemencie strony (jeśli jest to pole tekstowe lub edytowalny element), albo w oknie dialogowym.

### Komunikacja

Komunikacja między `background script` a `content script` odbywa się za pomocą API komunikatów Chrome (`chrome.runtime.sendMessage` oraz `chrome.runtime.onMessage`).

### Przechowywanie Danych

Rozszerzenie używa `chrome.storage.sync` do przechowywania:

*   Klucza API OpenAI (`apiKey`).
*   Opcji rozszerzenia (wyświetlanie, tłumaczenie, kolory paska, itp.).

### Obsługa Błędów

Możliwe błędy (brak klucza API, błąd transkrypcji, itp.) są definiowane w pliku `constants.js`. Funkcje w `api.js` oraz `translation.js` obsługują potencjalne błędy wywołań API. `Content.js` wyświetla komunikaty o błędach użytkownikowi za pomocą banera u góry strony.

## 🛡️ Bezpieczeństwo i Prywatność

- **Ochrona Danych:**
  - Klucz API jest przechowywany w sposób bezpieczny w Chrome.
  - Rozszerzenie nie przechowuje twoich danych audio; wszystkie przetwarzania odbywają się w czasie rzeczywistym.
  - Komunikacja z API odbywa się przez bezpieczne połączenia HTTPS.

## 🔧 Rozwiązywanie Problemów

- **Problemy z Mikrofonem:**
  - Sprawdź uprawnienia dostępu do mikrofonu w Chrome.
  - Upewnij się, że żadne inne aplikacje nie korzystają jednocześnie z mikrofonu.

- **Błędy Transkrypcji/Tłumaczenia:**
  - Sprawdź, czy klucz API jest prawidłowy i aktywny.
  - Upewnij się, że masz stabilne połączenie internetowe.
  - Sprawdź konsolę Chrome, aby uzyskać szczegółowe logi w przypadku błędu.

## 🤝 Wkład

Wkład i sugestie są mile widziane. Aby przyczynić się do rozwoju:
- Zgłaszaj błędy w sekcji Issues na GitHub.
- Proponuj ulepszenia lub nowe funkcje.
- Składaj swoje pull requesty.

## 📄 Licencja

To rozszerzenie jest dystrybuowane na licencji GNU Affero General Public License v3.0 (AGPL-3.0). Zapoznaj się z plikiem LICENSE, aby uzyskać więcej szczegółów.

## 💝 Wsparcie

Jeśli doceniasz to rozszerzenie, możesz wesprzeć jego rozwój, przekazując darowiznę przez [PayPal](https://paypal.me/jls).

---
Stworzone z pasją i innowacją przez jls42.org, Babel Fish AI wynosi transkrypcję i tłumaczenie na zupełnie nowe wyżyny dzięki najnowocześniejszej sztucznej inteligencji.

**Ten dokument został przetłumaczony z wersji fr na język pl przy użyciu modelu o3-mini. Aby uzyskać więcej informacji o procesie tłumaczenia, odwiedź https://gitlab.com/jls42/ai-powered-markdown-translator**

