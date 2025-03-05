# Babel Fish AI - Rozszerzenie do Transkrypcji Głosowej i Tłumaczenia z AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Aby korzystać z rozszerzenia, będziesz potrzebował klucza API OpenAI (lub usługodawcy trzeciego, jeśli używasz LiteLLM Proxy). Możesz wygenerować klucz API OpenAI tutaj: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI to innowacyjne rozszerzenie do przeglądarki Chrome stworzone pierwotnie z myślą o oferowaniu potężnej transkrypcji głosowej. Przekształć swój głos w tekst z niezwykłą precyzją dzięki API Whisper od OpenAI i opcjonalnie skorzystaj z automatycznego tłumaczenia w czasie rzeczywistym. Możesz używać Babel Fish AI wyłącznie do transkrypcji lub aktywować tłumaczenie na bieżąco w zależności od Twoich potrzeb.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Funkcje

- **Zaawansowana Transkrypcja Głosowa**
  - Nagrywanie dźwięku wysokiej jakości za pomocą mikrofonu Twojego urządzenia.
  - Precyzyjna transkrypcja realizowana przez API Whisper od OpenAI.
  - Wielojęzyczne wsparcie dla rozpoznawania mowy i wyświetlania tekstu, umożliwiające transkrypcję nagrań głosowych w różnych językach oraz prezentację wyników (transkrypcji i tłumaczenia, jeśli aktywowane) w wybranym przez Ciebie języku.
  - Automatyczne wstawianie tekstu do aktywnego pola lub wyświetlanie w dedykowanym oknie dialogowym.

- **Zintegrowane Automatyczne Tłumaczenie (Opcjonalne)**
  - Natychmiastowe tłumaczenie transkrypcji na różne języki, do aktywacji w razie potrzeby.
  - Wykorzystanie zaawansowanego modelu AI, aby zapewnić tłumaczenie wierne oryginalnemu sensowi.
  - Wolny wybór – używanie wyłącznie transkrypcji lub łączenie transkrypcji z tłumaczeniem.

- **Intuicyjny i Personalizowalny Interfejs Użytkownika**
  - Elastyczny tryb wyświetlania: aktywne pole tekstowe lub unoszące się okno dialogowe.
  - Konfigurowalny pasek statusu z wyborem kolorów, przezroczystości oraz czasu wyświetlania.
  - Skrót klawiaturowy (Ctrl+Shift+1 lub ⌘+Shift+1 na Mac) do rozpoczęcia/zakończenia nagrywania.
  - Spersonalizowana ikona, zawierająca mikrofon oraz cyfrę "42", dla natychmiastowego rozpoznania.

- **Zaawansowane Opcje**
    - Tryb ekspercki dla szczegółowych konfiguracji (adresy URL API, konfiguracja per domena, itp.).
    - Możliwość personalizacji modeli transkrypcji i tłumaczenia.
    - Kompatybilność z LiteLLM Proxy pozwalająca na łączenie się z alternatywnymi modelami językowymi oraz wyłączenie rejestrowania żądań.
    - Pełne zarządzanie internacjonalizacją dzięki plikom językowym (_locales), oferując interfejs i wsparcie głosowe w wielu językach.

## 🌐 Obsługiwane Języki

Oto lista języków obsługiwanych przez Babel Fish AI, wraz z linkami do filmów demonstracyjnych:

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
    - **Lub zainstaluj rozszerzenie bezpośrednio ze [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Otwórz Chrome i przejdź do `chrome://extensions/`.
    - Włącz „Tryb dewelopera” w prawym górnym rogu.
    - Kliknij „Wczytaj rozszerzenie bez pakowania” i wybierz folder Babel Fish AI.

2.  **Weryfikacja:**
    - Upewnij się, że rozszerzenie pojawia się na pasku narzędzi Chrome z personalizowaną ikoną.

## ⚙️ Konfiguracja

1.  **Klucz API OpenAI:**
    *   Kliknij ikonę rozszerzenia, aby przejść do opcji.
    *   Wprowadź swój klucz API OpenAI (dostępny na [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizacja Opcji:**
    *   Wybierz tryb wyświetlania (aktywne pole tekstowe lub okno dialogowe).
    *   Skonfiguruj kolor, przezroczystość oraz czas wyświetlania paska statusu.
    *   Wybierz języki dla transkrypcji (wejście głosowe) oraz dla wyświetlania tekstu.
    *   Włącz lub wyłącz funkcjonalność tłumaczenia w zależności od potrzeb.

3.  **(Opcjonalnie) Używanie z LiteLLM Proxy:**
    *   Włącz „Tryb Ekspercki” w opcjach.
    *   W sekcji „Zaawansowana Konfiguracja” zmodyfikuj **oba adresy URL** API (Whisper i Tłumaczenia), aby wskazywały na Twoją instancję LiteLLM Proxy. **Użyj tej samej bazowej URL dla obu.**
    *   Zaznacz opcję „NoLog (tylko LiteLLM)”, jeśli chcesz wyłączyć rejestrowanie żądań przez LiteLLM.

## 🚀 Używanie z LiteLLM Proxy

Jeśli chcesz używać modeli językowych innych niż OpenAI, możesz wykorzystać LiteLLM Proxy. Oto jak go skonfigurować:

Babel Fish AI jest kompatybilny z [LiteLLM Proxy](https://litellm.ai/), który umożliwia korzystanie z alternatywnych modeli językowych za pomocą API kompatybilnego z API OpenAI.

### Konfiguracja

1.  **Zainstaluj i skonfiguruj LiteLLM Proxy:** Postępuj zgodnie z instrukcjami na stronie LiteLLM.
2.  **Skonfiguruj rozszerzenie Babel Fish AI:**
    *   W opcjach rozszerzenia (kliknij prawym przyciskiem myszy na ikonę > Opcje) włącz „Tryb Ekspercki”.
    *   W sekcji „Zaawansowana Konfiguracja” zmodyfikuj **oba adresy URL** API (Whisper i Tłumaczenia), aby wskazywały na Twoją instancję LiteLLM Proxy (na przykład, `http://localhost:4000/v1/audio/transcriptions` oraz `http://localhost:4000/v1/chat/completions`). **Użyj tej samej bazowej URL dla obu.**
    *   Zaznacz opcję „NoLog (tylko LiteLLM)”, jeśli chcesz wyłączyć rejestrowanie żądań przez LiteLLM.

**Ważne:** Opcja „NoLog” została zaprojektowana **wyłącznie** do używania z LiteLLM Proxy. **Nie włączaj jej**, jeśli korzystasz z oficjalnego API OpenAI, ponieważ spowoduje to błąd i uniemożliwi działanie tłumaczenia.

## 🛠️ Działanie Techniczne

### Architektura Rozszerzenia

Rozszerzenie składa się z kilku plików JavaScript, które współdziałają ze sobą:

*   **`manifest.json`:** Główny plik konfiguracyjny rozszerzenia. Definiuje uprawnienia, skrypty, dostępne zasoby itp. Używa wersji 3 manifestu i deklaruje uprawnienia `activeTab`, `storage`, `commands` oraz `scripting`. `content_scripts` są wstrzykiwane na wszystkich stronach i uruchamiane na końcu ładowania dokumentu.
*   **`background.js`:** Service worker działający w tle. Obsługuje zdarzenia (kliknięcia na ikonę, skróty klawiaturowe), wstrzykuje `content script` gdy jest to potrzebne i komunikuje się z `content script`.
*   **`content.js`:** Skrypt wstrzykiwany na stronach internetowych. Bezpośrednio współdziała z DOM, przechwytuje dźwięk z mikrofonu, wywołuje API transkrypcji i tłumaczenia oraz wyświetla wyniki.
*   **`src/utils/api.js`:** Zawiera funkcję `transcribeAudio` do wywoływania API Whisper od OpenAI (transkrypcji).
*   **`src/utils/translation.js`:** Zawiera funkcję `translateText` do wywoływania API GPT od OpenAI (tłumaczenia).
*   **`src/utils/ui.js`:** Zawiera funkcje pomocnicze do zarządzania interfejsem użytkownika (baner, okno dialogowe, przycisk kopiowania).
*   **`src/constants.js`:** Definiuje stałe dla konfiguracji, stanów, akcji itp.
*   **`src/pages/options/`:** Zawiera pliki dla strony opcji rozszerzenia (HTML, CSS, JavaScript).

### Proces Transkrypcji i Tłumaczenia

1.  **Rozpoczęcie Nagrywania:** Użytkownik rozpoczyna nagrywanie klikając na ikonę rozszerzenia lub używając skrótu klawiaturowego. Skrypt w tle (`background script`) wysyła wiadomość do skryptu treści (`content script`), aby rozpocząć nagrywanie.
2.  **Przechwytywanie Dźwięku:** Skrypt treści (`content script`) korzysta z API `navigator.mediaDevices.getUserMedia`, aby uzyskać dostęp do mikrofonu i nagrać dźwięk.
3.  **Transkrypcja:** Skrypt treści używa funkcji `transcribeAudio` (`src/utils/api.js`) do wysłania dźwięku do API Whisper od OpenAI. API zwraca przetranskrybowany tekst.
4.  **Tłumaczenie (Opcjonalne):** Jeśli opcja tłumaczenia jest aktywowana, skrypt treści używa funkcji `translateText` (`src/utils/translation.js`) do wysłania przetranskrybowanego tekstu do API GPT od OpenAI. API zwraca przetłumaczony tekst.
5.  **Wyświetlanie:** Skrypt treści wyświetla przetranskrybowany (oraz ewentualnie przetłumaczony) tekst albo w aktywnym elemencie strony (jeśli jest to pole tekstowe lub element z możliwością edycji), albo w oknie dialogowym.

### Komunikacja

Komunikacja między skryptem w tle (`background script`) a skryptem treści (`content script`) odbywa się za pomocą API do komunikatów Chrome (`chrome.runtime.sendMessage` oraz `chrome.runtime.onMessage`).

### Przechowywanie Danych

Rozszerzenie wykorzystuje `chrome.storage.sync` do przechowywania:

*   Klucza API OpenAI (`apiKey`).
*   Opcji rozszerzenia (wyświetlanie, tłumaczenie, kolory paska, itp.).

Dane te są przechowywane lokalnie na Twoim komputerze, w magazynie rozszerzenia Chrome.

### Obsługa Błędów

Możliwe błędy (brak klucza API, błąd transkrypcji itp.) są zdefiniowane w pliku `constants.js`. Funkcje `api.js` oraz `translation.js` obsługują potencjalne błędy podczas wywołań API. Skrypt treści (`content.js`) wyświetla komunikaty błędów użytkownikowi poprzez baner u góry strony.

## 🛡️ Bezpieczeństwo i Prywatność

- **Ochrona Danych:**
  - Klucz API jest przechowywany w sposób bezpieczny w Chrome.
  - Rozszerzenie nie zapisuje Twoich danych audio; wszystkie operacje odbywają się w czasie rzeczywistym.
  - Komunikacja z API odbywa się za pomocą bezpiecznych połączeń HTTPS.

Aby uzyskać pełne informacje o tym, jak BabelFishAI zarządza Twoimi danymi, zapoznaj się z naszą [Polityką Prywatności](PRIVACY.md).

## 🔧 Rozwiązywanie Problemów

- **Problemy z Mikrofonem:**
  - Sprawdź uprawnienia dostępu do mikrofonu w Chrome.
  - Upewnij się, że żadne inne aplikacje nie korzystają jednocześnie z mikrofonu.

- **Błędy Transkrypcji/Tłumaczenia:**
  - Upewnij się, że klucz API jest ważny i aktywny.
  - Sprawdź, czy masz stabilne połączenie internetowe.
  - Sprawdź konsolę Chrome, aby uzyskać szczegółowe logi w przypadku błędu.

## 🤝 Wkład

Wkład i sugestie są mile widziane. Aby przyczynić się do projektu:
- Zgłaszaj błędy przez sekcję Issues na GitHub.
- Proponuj ulepszenia lub nowe funkcje.
- Przesyłaj swoje pull requesty.

## 📄 Licencja

To rozszerzenie jest dystrybuowane na licencji GNU Affero General Public License v3.0 (AGPL-3.0). Zajrzyj do pliku LICENSE, aby uzyskać więcej szczegółów.

## 💝 Wsparcie

Jeśli podoba Ci się to rozszerzenie, możesz wesprzeć jego rozwój, wysyłając darowiznę przez [PayPal](https://paypal.me/jls).
---
Stworzone przez jls42.org z pasją i innowacją, Babel Fish AI wynosi transkrypcję i tłumaczenie na nowe horyzonty dzięki najnowocześniejszej sztucznej inteligencji.

**Dokument ten został przetłumaczony z wersji fr na język pl przy użyciu modelu o3-mini. Aby uzyskać więcej informacji na temat procesu tłumaczenia, odwiedź https://gitlab.com/jls42/ai-powered-markdown-translator**

