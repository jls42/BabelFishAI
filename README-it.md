**Articolo tradotto dal francese all'italiano con gpt-5.6-sol.**

# Babel Fish AI - Estensione di trascrizione vocale e traduzione con IA

<img src="images/icon128.png" alt="Icona di Babel Fish AI" width="128" height="128">

**Sito ufficiale: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**Per utilizzare l'estensione, avrai bisogno di una chiave API di uno dei provider supportati:**

|                             Provider                             | Ottenere una chiave API                                                                               |
| :--------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------- |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)                                                  |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)                                             |
|                                🚅                                | **Custom/LiteLLM**: per utilizzare i propri endpoint API                                              |

Babel Fish AI è un'innovativa estensione per browser progettata per offrire una potente trascrizione vocale con supporto multi-provider. Trasforma la tua voce in testo con una precisione notevole grazie alle API di trascrizione di Mistral AI (Voxtral) o OpenAI (Whisper) e, facoltativamente, usufruisci della traduzione automatica in tempo reale. Puoi utilizzare Babel Fish AI esclusivamente per la trascrizione oppure attivare la traduzione istantanea in base alle tue esigenze.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Badge Codacy](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Stato del Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Valutazione della sicurezza](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Valutazione della manutenibilità](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilità](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code smell](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Debito tecnico](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Righe di codice](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funzionalità

-   **Trascrizione vocale avanzata**

    -   Acquisizione audio di alta qualità tramite il microfono del dispositivo.
    -   Trascrizione accurata tramite le API Voxtral (Mistral AI) o Whisper (OpenAI).
    -   Supporto multi-provider: scegli liberamente tra Mistral AI, OpenAI o un endpoint personalizzato.
    -   Supporto multilingue per il riconoscimento vocale e la visualizzazione del testo, che consente di trascrivere input vocali in lingue diverse e di visualizzare i risultati (trascrizione e traduzione, se attivata) nella lingua scelta.
    -   Inserimento automatico del testo nel campo attivo o visualizzazione in una finestra di dialogo dedicata.

-   **Traduzione e riformulazione intelligenti**

    -   Traduzione immediata delle trascrizioni in varie lingue, attivabile quando necessario.
    -   Riformulazione del testo per migliorarne lo stile e la chiarezza.
    -   Utilizzo di un modello di IA avanzato per garantire una traduzione fedele al significato originale.
    -   Possibilità di utilizzare esclusivamente la trascrizione oppure di combinare trascrizione e traduzione.

-   **Potente menu contestuale**

    -   Opzione "Riformula la selezione" per migliorare istantaneamente i testi selezionati.
    -   Opzione "Traduci la selezione" con un sottomenu contenente tutte le lingue disponibili.
    -   Opzione "Correggi l'ortografia" per correggere gli errori di ortografia, grammatica e punteggiatura.
    -   Sostituzione diretta del testo selezionato con la relativa versione tradotta, riformulata o corretta.
    -   Integrazione perfetta nell'interfaccia utente nativa del browser.

-   **Interfaccia utente intuitiva e personalizzabile**

    -   Modalità di visualizzazione flessibile: area di input attiva o finestra di dialogo mobile.
    -   Barra di stato configurabile con scelta dei colori, dell'opacità e della durata di visualizzazione.
    -   Scorciatoia da tastiera (Ctrl+Shift+1 o ⌘+Shift+1 su Mac) per avviare/interrompere la registrazione.
    -   In Firefox, «scorciatoia prioritaria» per i siti il cui editor di pagina intercetta la combinazione (ChatGPT, Notion…): attiva sin dall'installazione e disattivabile dalle opzioni (vedi [PRIVACY.md](PRIVACY.md)).
    -   Opzione "Mantieni aperto" per controllare la durata di visualizzazione dei risultati.
    -   Icona personalizzata, che integra un microfono e il numero "42", per un riconoscimento immediato.

-   **Opzioni avanzate**
    -   Supporto multi-provider: Mistral AI, OpenAI e Custom/LiteLLM per la massima flessibilità.
    -   Possibilità di personalizzare i modelli di trascrizione e traduzione per ciascun provider.
    -   Modelli OpenAI disponibili: GPT-4o mini (predefinito), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** e **GPT-5.6 (luna/terra/sol)**. Trascrizione: whisper-1 (predefinito), gpt-4o-mini-transcribe, gpt-4o-transcribe e **gpt-transcribe**.
    -   Modelli Mistral disponibili: Mistral Small (predefinito), Mistral Medium, Mistral Large, Codestral e **Ministral 3 (3B/8B/14B)**. Trascrizione: Voxtral Mini. Sono supportate le risposte dei modelli Mistral che ragionano (blocchi di riflessione).
    -   Le impostazioni che utilizzavano gpt-4.1-nano (disattivazione dell'API OpenAI il 23/10/2026) o gpt-4o passano automaticamente a gpt-5.6-luna e gpt-4.1 durante l'aggiornamento.
    -   Selezione indipendente del provider per la trascrizione e la traduzione/riformulazione.
    -   Compatibilità con LiteLLM Proxy tramite il provider Custom per connettersi a modelli alternativi.
    -   Gestione completa dell'internazionalizzazione grazie ai file di lingua (\_locales), che offrono un'interfaccia e un supporto vocale in più lingue.

## 🌐 Lingue supportate

Di seguito è riportato l'elenco delle lingue supportate da Babel Fish AI, con collegamenti ai video dimostrativi:

-   [Arabo](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [Tedesco](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [Inglese](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [Spagnolo](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [Francese](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [Italiano](https://www.youtube.com/watch?v=QgYZt8myods)
-   [Giapponese](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [Coreano](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [Olandese](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [Polacco](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [Portoghese](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [Rumeno](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [Svedese](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [Cinese](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installazione

### Chrome

1.  **Download e installazione:**

    -   Clona questo repository da GitHub oppure scarica manualmente la cartella dell'estensione.
    -   **Oppure installa direttamente l'estensione dal [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   Apri Chrome e vai a `chrome://extensions/`.
    -   Attiva la «Modalità sviluppatore» in alto a destra.
    -   Fai clic su «Carica estensione non pacchettizzata» e seleziona la cartella di Babel Fish AI.

2.  **Verifica:**
    -   Assicurati che l'estensione compaia nella barra degli strumenti del browser con l'icona personalizzata.

### Firefox

1.  **Download e installazione:**

    -   **Installa direttamente l'estensione da [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   Oppure, per l'installazione manuale: clona questo repository da GitHub, quindi esegui `./scripts/build.sh firefox`, che prepara `dist/firefox/` con il manifest Firefox rinominato in `manifest.json`.
    -   Apri Firefox e vai a `about:debugging#/runtime/this-firefox` (e non a «Installa componente aggiuntivo da file» in `about:addons`, riservato alle estensioni firmate).
    -   Fai clic su «Carica componente aggiuntivo temporaneo...».
    -   Seleziona il file `dist/firefox/manifest.json`.

2.  **Verifica:**
    -   Assicurati che l'estensione compaia nella barra degli strumenti di Firefox con l'icona personalizzata.

## ⚙️ Configurazione

1.  **Configurazione del provider IA:**

    -   Fai clic sull'icona dell'estensione per accedere alle opzioni.
    -   Seleziona il provider dal menu a discesa (Mistral AI, OpenAI o Custom/LiteLLM).
    -   Inserisci la tua chiave API:
        -   **Mistral AI**: disponibile su [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: disponibile su [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    -   Attiva il provider tramite l'interruttore accanto al menu a discesa.

2.  **Personalizzazione delle opzioni:**

    -   Scegli la modalità di visualizzazione (area attiva o finestra di dialogo).
    -   Configura il colore, l'opacità e la durata di visualizzazione della barra di stato.
    -   Seleziona le lingue per la trascrizione (input vocale) e per la visualizzazione del testo.
    -   Attiva o disattiva la funzionalità di traduzione in base alle tue esigenze.

3.  **(Facoltativo) Configurazione avanzata dei modelli:**
    -   Nelle opzioni di ciascun provider, fai clic su "Configurazione dei modelli" per personalizzare i modelli utilizzati.
    -   Puoi aggiungere modelli personalizzati per la trascrizione e la traduzione/riformulazione.
    -   Se sono attivi più provider, puoi scegliere quale utilizzare per ciascun servizio (trascrizione e traduzione).

## 🚀 Utilizzo con LiteLLM Proxy o endpoint personalizzati

Babel Fish AI è compatibile con [LiteLLM Proxy](https://litellm.ai/) e con altri proxy API compatibili con OpenAI, consentendo l'utilizzo di modelli linguistici alternativi.

### Configurazione

1.  **Installa e configura il tuo proxy:** segui le istruzioni del servizio utilizzato (LiteLLM, ecc.).
2.  **Configura l'estensione Babel Fish AI:**
    -   Nelle opzioni dell'estensione, seleziona il provider **Custom/LiteLLM** dal menu a discesa.
    -   Inserisci la tua chiave API (se necessaria).
    -   Configura gli URL delle API:
        -   **URL di trascrizione**: ad esempio `http://localhost:4000/v1/audio/transcriptions`
        -   **URL della chat**: ad esempio `http://localhost:4000/v1/chat/completions`
    -   Attiva il provider tramite l'interruttore.
    -   Seleziona l'opzione **"NoLog"** se desideri disattivare la registrazione delle richieste da parte di LiteLLM.

**Importante:** l'opzione "NoLog" è disponibile **esclusivamente** nel provider Custom/LiteLLM. Non è compatibile con le API ufficiali di OpenAI o Mistral AI.

## 🛠️ Funzionamento tecnico

### Architettura dell'estensione

L'estensione è composta da diversi file JavaScript che interagiscono tra loro:

#### File principali

-   **`manifest.json`:** il file di configurazione principale dell'estensione. Definisce le autorizzazioni, gli script, le risorse accessibili, ecc. Utilizza la versione 3 del manifest e dichiara le autorizzazioni `activeTab`, `storage`, `commands`, `scripting` e `contextMenus`.
-   **`background.js`:** il service worker eseguito in background. Gestisce gli eventi (clic sull'icona, scorciatoie da tastiera, menu contestuale), inserisce `content script` se necessario e comunica con `content script`.
-   **`content.js`:** lo script principale inserito nelle pagine web. Coordina i diversi moduli di utilità e gestisce il flusso globale dell'estensione.
-   **`src/constants.js`:** definisce le costanti per la configurazione, gli stati, le azioni, ecc.

#### Moduli di utilità

L'estensione utilizza un'architettura modulare con diversi file di utilità specializzati:

##### Gestione dei provider e delle API

-   **`src/utils/providers.js`:** registro dei provider IA (Mistral AI, OpenAI, Custom/LiteLLM) con le relative configurazioni, i modelli e gli URL predefiniti.
-   **`src/utils/api-utils.js`:** funzioni per l'interazione con le API esterne, la risoluzione della configurazione multi-provider e la trascrizione audio.
-   **`src/utils/text-processing.js`:** funzioni di elaborazione del testo: traduzione, riformulazione, correzione ortografica.

##### Interfaccia utente e interazione

-   **`src/utils/ui.js`:** funzioni di utilità generali per l'interfaccia utente.
-   **`src/utils/banner-utils.js`:** gestisce la barra di stato, i relativi controlli e il selettore della lingua.
-   **`src/utils/focus-utils.js`:** gestisce il salvataggio e il ripristino del focus e della selezione del testo.
-   **`src/utils/transcription-display.js`:** gestisce la visualizzazione dei risultati della trascrizione.
-   **`src/utils/error-utils.js`:** gestisce la visualizzazione e l'elaborazione degli errori.
-   **`src/styles/content.css`:** stili CSS per l'interfaccia utente inserita nelle pagine web.

##### Registrazione ed eventi

-   **`src/utils/recording-utils.js`:** gestisce la registrazione audio tramite il microfono e l'elaborazione dei dati audio.
-   **`src/utils/event-handlers.js`:** contiene i gestori degli eventi per le interazioni dell'utente.

##### Internazionalizzazione e lingue

-   **`src/utils/languages.js`:** definisce le lingue supportate dall'estensione.
-   **`src/utils/languages-shared.js`:** definisce l'elenco delle lingue supportate per il contesto della pagina web.
-   **`src/utils/languages-data.js`:** definisce l'elenco delle lingue supportate per il service worker.
-   **`src/utils/i18n.js`:** gestisce l'internazionalizzazione dell'interfaccia utente.

##### Pagina delle opzioni

-   **`src/pages/options/`:** contiene i file per la pagina delle opzioni dell'estensione (HTML, CSS, JavaScript).

### Processo di trascrizione e traduzione

#### Funzionalità principale di trascrizione vocale

1.  **Avvio della registrazione:** l'utente avvia la registrazione facendo clic sull'icona dell'estensione o utilizzando la scorciatoia da tastiera (Ctrl+Shift+1 o ⌘+Shift+1 su Mac). `background script` invia un messaggio a `content script` per avviare la registrazione.
2.  **Acquisizione audio:** `content script` utilizza l'API `navigator.mediaDevices.getUserMedia` per accedere al microfono e registrare l'audio tramite l'API MediaRecorder.
3.  **Trascrizione:** `content script` utilizza la funzione `transcribeAudio` (`src/utils/api-utils.js`) per inviare l'audio all'API di trascrizione del provider configurato (Voxtral per Mistral AI, Whisper per OpenAI). L'API restituisce il testo trascritto.
4.  **Traduzione o riformulazione (facoltativa):**

-   Se l'opzione di traduzione è attiva, `content script` utilizza la funzione `translateText` (`src/utils/text-processing.js`) per inviare il testo trascritto all'API di chat del provider configurato.
-   Se l'opzione di riformulazione è attiva, viene utilizzata la funzione `rephraseText` per migliorare il testo trascritto.

5.  **Visualizzazione:** `content script` visualizza il testo elaborato nell'elemento attivo della pagina (se si tratta di un campo di testo o di un elemento modificabile) oppure in una finestra di dialogo personalizzata.

#### Funzionalità del menu contestuale

1. **Selezione del testo:** l'utente seleziona del testo in una pagina web.
2. **Menu contestuale:** un clic con il pulsante destro mostra le opzioni:
    - "Riformula la selezione" per migliorare lo stile e la chiarezza
    - "Traduci la selezione" con un sottomenu delle lingue disponibili
    - "Correggi l'ortografia" per correggere gli errori
3. **Elaborazione:** in base all'opzione scelta:
    - Il testo viene inviato per la riformulazione tramite la funzione `rephraseText`
    - Il testo viene inviato per la traduzione tramite la funzione `translateText` con la lingua di destinazione selezionata
    - Il testo viene inviato per la correzione tramite la funzione `correctText`
4. **Visualizzazione:** il risultato sostituisce la selezione originale nell'elemento in cui si trova il testo selezionato.

### Comunicazione

La comunicazione tra `background script` e `content script` avviene tramite l'API di messaggistica di Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Archiviazione dei dati

L'estensione utilizza `chrome.storage.sync` per archiviare:

-   La configurazione dei provider IA (chiavi API, modelli selezionati, URL personalizzati).
-   Le opzioni dell'estensione (visualizzazione, traduzione, colori della barra, ecc.).
-   Le preferenze linguistiche per la traduzione.

Questi dati vengono archiviati localmente sul tuo computer, nello spazio di archiviazione dell'estensione del browser.
### Gestione degli errori

I possibili errori (chiave API mancante, errore di trascrizione, ecc.) sono definiti nel file `constants.js`. Le funzioni `api-utils.js` e `text-processing.js` gestiscono i potenziali errori delle chiamate API con messaggi migliorati in base al codice HTTP. Il `content.js` mostra i messaggi di errore all'utente tramite un banner nella parte inferiore della pagina.

## 🛡️ Sicurezza e privacy

-   **Protezione dei dati:**
    -   La chiave API viene archiviata in modo sicuro nel browser.
    -   L'estensione non conserva i dati audio; tutte le elaborazioni vengono eseguite in tempo reale.
    -   La comunicazione con le API avviene tramite connessioni HTTPS sicure.

Per informazioni complete su come BabelFishAI gestisce i tuoi dati, consulta la nostra [Informativa sulla privacy](PRIVACY.md).

## 🔧 Risoluzione dei problemi

-   **Problemi con il microfono:**

    -   Verifica le autorizzazioni di accesso al microfono nel browser.
    -   Assicurati che nessun'altra applicazione utilizzi contemporaneamente il microfono.

-   **Errori di trascrizione/traduzione:**
    -   Verifica che la chiave API sia valida e attiva.
    -   Assicurati di disporre di una connessione Internet stabile.
    -   Consulta la console del browser per ottenere log dettagliati in caso di errore.

## 🤝 Contributi

Contributi e suggerimenti sono benvenuti. Per contribuire:

-   Segnala i bug tramite la sezione Issues su GitHub.
-   Proponi miglioramenti o nuove funzionalità.
-   Invia le tue pull request.

## 📄 Licenza

Questa estensione è distribuita con licenza GNU Affero General Public License v3.0 (AGPL-3.0). Consulta il file LICENSE per maggiori dettagli.

## 💝 Sostegno

## Se apprezzi questa estensione, puoi sostenerne lo sviluppo effettuando una donazione tramite [PayPal](https://paypal.me/jls).

Sviluppato da jls42.org con passione e innovazione, Babel Fish AI porta la trascrizione e la traduzione verso nuovi orizzonti grazie all'intelligenza artificiale all'avanguardia.
