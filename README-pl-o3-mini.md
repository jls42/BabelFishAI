# Babel Fish AI - Rozszerzenie do transkrypcji głosowej i tłumaczenia z AI

Babel Fish AI to innowacyjne rozszerzenie do Chrome stworzone pierwotnie, aby oferować potężną transkrypcję głosową. Przekształć swój głos w tekst z niezwykłą precyzją dzięki API Whisper firmy OpenAI i opcjonalnie skorzystaj z automatycznego tłumaczenia w czasie rzeczywistym. Możesz używać Babel Fish AI wyłącznie do transkrypcji lub włączyć tłumaczenie "w locie" według swoich potrzeb.

## 🌟 Funkcje

- **Zaawansowana Transkrypcja Głosowa**
  - Nagrywanie audio wysokiej jakości za pomocą mikrofonu twojego urządzenia.
  - Dokładna transkrypcja realizowana przez API Whisper firmy OpenAI.
  - Wielojęzyczne wsparcie dla przetwarzania głosu i wyświetlania tekstu, umożliwiające transkrypcję głosowych wejść w różnych językach oraz wyświetlanie wyników w wybranym przez ciebie języku.
  - Automatyczne wstawianie tekstu w aktywne pole lub wyświetlanie w dedykowanym oknie dialogowym.

- **Zintegrowane Automatyczne Tłumaczenie (Opcjonalne)**
  - Natychmiastowe tłumaczenie transkrypcji na różne języki, do aktywacji w razie potrzeby.
  - Wykorzystanie zaawansowanego modelu sztucznej inteligencji w celu zagwarantowania tłumaczenia wiernego oryginalnemu znaczeniu.
  - Swobodny wybór pomiędzy wyłącznie transkrypcją a łączeniem transkrypcji i tłumaczenia.

- **Intuicyjny i Personalizowalny Interfejs Użytkownika**
  - Elastyczny tryb wyświetlania: aktywne pole wprowadzania lub pływające okno dialogowe.
  - Konfigurowalny pasek stanu z wyborem kolorów, przezroczystości i czasu wyświetlania.
  - Skrót klawiaturowy (Ctrl+Shift+1 lub ⌘+Shift+1 na Mac) do rozpoczęcia/zatrzymania nagrywania.
  - Spersonalizowana ikona, zawierająca mikrofon i cyfrę „42”, umożliwiająca natychmiastowe rozpoznanie.

- **Zaawansowane Opcje**
  - Tryb ekspercki pozwalający na szczegółowe konfiguracje (adresy URL API, konfiguracja wg domen, itp.).
  - Możliwość personalizacji modeli transkrypcji i tłumaczenia.
  - Kompletne zarządzanie internacjonalizacją dzięki plikom językowym (_locales), oferujące interfejs oraz wsparcie głosowe w wielu językach.

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

1. **Pobieranie i Instalacja:**
   - Sklonuj to repozytorium z GitHub lub pobierz ręcznie folder rozszerzenia.
   - Otwórz Chrome i przejdź do `chrome://extensions/`.
   - Włącz „Tryb dewelopera” w prawym górnym rogu.
   - Kliknij „Załaduj rozszerzenie bez pakowania” i wybierz folder Babel Fish AI.

2. **Weryfikacja:**
   - Upewnij się, że rozszerzenie pojawia się na pasku narzędzi Chrome z spersonalizowaną ikoną.

## ⚙️ Konfiguracja

1. **Klucz API OpenAI:**
   - Kliknij ikonę rozszerzenia, aby uzyskać dostęp do opcji.
   - Wprowadź swój klucz API OpenAI (dostępny na [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Personalizacja Opcji:**
   - Wybierz tryb wyświetlania (aktywne pole lub okno dialogowe).
   - Skonfiguruj kolor, przezroczystość i czas wyświetlania paska stanu.
   - Wybierz języki dla transkrypcji (wejście głosowe) oraz wyświetlania tekstu.
   - Włącz lub wyłącz funkcję tłumaczenia w zależności od potrzeb.

## 🛠️ Działanie Techniczne

- **Architektura Rozszerzenia:**
  - **Manifest V3 :** Plik `manifest.json` definiuje skrypty treści, service worker (`background.js`) oraz niezbędne uprawnienia.
  - **Skrypty Tła i Treści :** Plik `background.js` zarządza logiką w tle i komunikacją z API, podczas gdy `content.js` odpowiada za interakcję z aktywną stroną internetową.
  - **Narzędzia i Internacjonalizacja :** Folder `src/utils` zawiera moduły do zarządzania API, interfejsem użytkownika, tłumaczeniem oraz internacjonalizacją za pomocą plików językowych w folderze `_locales`.

- **Proces transkrypcji i tłumaczenia:**
  1. **Rozpoczęcie nagrywania :** Rozszerzenie rejestruje twój głos przez mikrofon, gdy klikniesz ikonę lub użyjesz skrótu klawiaturowego.
  2. **Transkrypcja :** Dźwięk jest wysyłany do API Whisper firmy OpenAI, aby został zamieniony na tekst, z obsługą wielu języków wejściowych.
  3. **Tłumaczenie (opcjonalne) :** Jeśli włączone, transkrypcja jest automatycznie tłumaczona na wybrany język docelowy, zachowując przy tym sens i kontekst.
  4. **Wyświetlanie :** Transkrybowany (i ewentualnie przetłumaczony) tekst jest wstawiany do aktywnego pola lub wyświetlany w spersonalizowanym oknie dialogowym.

## 🛡️ Bezpieczeństwo i Prywatność

- **Ochrona Danych:**
  - Klucz API jest bezpiecznie przechowywany w Chrome.
  - Rozszerzenie nie przechowuje twoich danych audio; wszystkie przetwarzania odbywają się w czasie rzeczywistym.
  - Komunikacja z API odbywa się za pomocą bezpiecznych połączeń HTTPS.

## 🔧 Rozwiązywanie problemów

- **Problemy z mikrofonem:**
  - Sprawdź uprawnienia do mikrofonu w Chrome.
  - Upewnij się, że żadna inna aplikacja nie korzysta jednocześnie z mikrofonu.

- **Błędy w transkrypcji/tłumaczeniu:**
  - Sprawdź, czy klucz API jest ważny i aktywny.
  - Upewnij się, że masz stabilne połączenie internetowe.
  - Sprawdź konsolę Chrome, aby uzyskać szczegółowe logi w przypadku błędu.

## 🤝 Wkład

Wkład i sugestie są mile widziane. Aby wnieść swój wkład:
- Zgłaszaj błędy poprzez sekcję Issues na GitHub.
- Zgłaszaj ulepszenia lub nowe funkcjonalności.
- Prześlij swoje pull requesty.

## 📄 Licencja

To rozszerzenie jest dystrybuowane na licencji GNU Affero General Public License v3.0 (AGPL-3.0). Zapoznaj się z plikiem LICENSE, aby poznać szczegóły.

## 💝 Wsparcie

Jeśli cenisz to rozszerzenie, możesz wesprzeć jego rozwój, dokonując wpłaty za pomocą [PayPal](https://paypal.me/jls).

---
Opracowane przez jls42.org z pasją i innowacyjnością, Babel Fish AI wynosi transkrypcję i tłumaczenie na nowe horyzonty dzięki najnowocześniejszej sztucznej inteligencji.

**Ten dokument został przetłumaczony z wersji fr na język pl przy użyciu modelu o3-mini. Aby uzyskać więcej informacji na temat procesu tłumaczenia, odwiedź https://gitlab.com/jls42/ai-powered-markdown-translator**

