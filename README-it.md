# Babel Fish AI - Estensione di Trascrizione Vocale e Traduzione con IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Sito ufficiale: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

**Per utilizzare l'estensione, avrai bisogno di una chiave API di uno dei provider supportati:**

| Provider | Ottieni una chiave API |
|:--------:|:-----------------------|
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) |
| <img src="images/openai-logo.png" alt="OpenAI" height="30"> | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
| 🚅 | **Custom/LiteLLM**: Per utilizzare i tuoi endpoint API |

Babel Fish AI è un'estensione del browser innovativa progettata per offrire una potente trascrizione vocale con supporto multi-provider. Trasforma la tua voce in testo con una precisione notevole grazie alle API di trascrizione di Mistral AI (Voxtral) o OpenAI (Whisper), e beneficia opzionalmente di una traduzione automatica in tempo reale. Puoi utilizzare Babel Fish AI esclusivamente per la trascrizione o attivare la traduzione al volo secondo le tue esigenze.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funzionalità

- **Trascrizione Vocale Avanzata**
  - Acquisizione audio di alta qualità tramite il microfono del tuo dispositivo.
  - Trascrizione precisa tramite le API Voxtral (Mistral AI) o Whisper (OpenAI).
  - Supporto multi-provider: scegli liberamente tra Mistral AI, OpenAI o un endpoint personalizzato.
  - Supporto multilingue per il riconoscimento vocale e la visualizzazione del testo, permettendo di trascrivere input vocali in diverse lingue e visualizzare i risultati (trascrizione e traduzione, se attivata) nella lingua di tua scelta.
  - Inserimento automatico del testo nel campo attivo o visualizzazione in una finestra di dialogo dedicata.

- **Traduzione e Riformulazione Intelligenti**
  - Traduzione immediata delle trascrizioni in diverse lingue, attivabile se necessario.
  - Riformulazione del testo per migliorarne lo stile e la chiarezza.
  - Utilizzo di un modello di IA avanzato per garantire una traduzione fedele al senso originale.
  - Libera scelta di utilizzare esclusivamente la trascrizione o combinare trascrizione e traduzione.

- **Menu Contestuale Potente**
  - Opzione "Riformula la selezione" per migliorare istantaneamente i tuoi testi selezionati.
  - Opzione "Traduci la selezione" con sottomenu di tutte le lingue disponibili.
  - Opzione "Correggi l'ortografia" per correggere errori di ortografia, grammatica e punteggiatura.
  - Sostituzione diretta del testo selezionato con la sua versione tradotta, riformulata o corretta.
  - Perfetta integrazione nell'interfaccia utente nativa del browser.

- **Interfaccia Utente Intuitiva e Personalizzabile**
  - Modalità di visualizzazione flessibile: area di input attiva o finestra di dialogo fluttuante.
  - Banner di stato configurabile con scelta dei colori, dell'opacità e della durata di visualizzazione.
  - Scorciatoia da tastiera (Ctrl+Shift+1 o ⌘+Shift+1 su Mac) per avviare/interrompere la registrazione.
  - Opzione "Mantieni aperto" per controllare la durata di visualizzazione dei risultati.
  - Icona personalizzata, che integra un microfono e il numero "42", per un riconoscimento immediato.

- **Opzioni Avanzate**
    - Supporto multi-provider: Mistral AI, OpenAI e Custom/LiteLLM per la massima flessibilità.
    - Possibilità di personalizzare i modelli di trascrizione e traduzione per provider.
    - Selezione indipendente del provider per la trascrizione e la traduzione/riformulazione.
    - Compatibilità con LiteLLM Proxy tramite il provider Custom per connettersi a modelli alternativi.
    - Gestione completa dell'internazionalizzazione grazie ai file di lingua (_locales), offrendo un'interfaccia e un supporto vocale in più lingue.

## 🌐 Lingue Supportate

Ecco l'elenco delle lingue supportate da Babel Fish AI, con link a video dimostrativi:

- [Arabo](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [Tedesco](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [Inglese](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [Spagnolo](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [Francese](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [Italiano](https://www.youtube.com/watch?v=QgYZt8myods)
- [Giapponese](https://www.youtube.com/watch?v=noHEJCnocH8)
- [Coreano](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [Olandese](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Polacco](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Portoghese](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Rumeno](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Svedese](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Cinese](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installazione

### Chrome

1.  **Download e Installazione:**
    - Clona questo repository da GitHub o scarica manualmente la cartella dell'estensione.
    - **Oppure installa direttamente l'estensione dal [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Apri Chrome e vai a `chrome://extensions/`.
    - Attiva la "Modalità sviluppatore" in alto a destra.
    - Clicca su "Carica estensione non pacchettizzata" e seleziona la cartella di Babel Fish AI.

2.  **Verifica:**
    - Assicurati che l'estensione appaia nella barra degli strumenti del browser con l'icona personalizzata.

### Firefox

1.  **Download e Installazione:**
    - **Installa direttamente l'estensione da [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    - Oppure per l'installazione manuale: clona questo repository da GitHub.
    - Apri Firefox e vai a `about:debugging#/runtime/this-firefox`.
    - Clicca su "Carica componente aggiuntivo temporaneo...".
    - Seleziona il file `manifest.firefox.json` nella radice del progetto.

2.  **Verifica:**
    - Assicurati che l'estensione appaia nella barra degli strumenti di Firefox con l'icona personalizzata.

## ⚙️ Configurazione

1.  **Configurazione del Provider IA:**
    *   Clicca sull'icona dell'estensione per accedere alle opzioni.
    *   Seleziona il tuo provider dal menu a discesa (Mistral AI, OpenAI o Custom/LiteLLM).
    *   Inserisci la tua chiave API:
        - **Mistral AI**: disponibile su [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        - **OpenAI**: disponibile su [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    *   Attiva il provider con l'interruttore accanto al menu a discesa.

2.  **Personalizzazione delle Opzioni:**
    *   Scegli la modalità di visualizzazione (area attiva o finestra di dialogo).
    *   Configura il colore, l'opacità e la durata di visualizzazione del banner di stato.
    *   Seleziona le lingue per la trascrizione (input vocale) e per la visualizzazione del testo.
    *   Attiva o disattiva la funzionalità di traduzione secondo le tue esigenze.

3.  **(Opzionale) Configurazione avanzata dei modelli:**
    *   Nelle opzioni di ogni provider, clicca su "Configurazione dei modelli" per personalizzare i modelli utilizzati.
    *   Puoi aggiungere modelli personalizzati per la trascrizione e la traduzione/riformulazione.
    *   Se sono attivati più provider, puoi scegliere quale utilizzare per ogni servizio (trascrizione e traduzione).

## 🚀 Utilizzo con LiteLLM Proxy o Endpoint Personalizzati

Babel Fish AI è compatibile con [LiteLLM Proxy](https://litellm.ai/) e altri proxy API compatibili con OpenAI, permettendo di utilizzare modelli di linguaggio alternativi.

### Configurazione

1.  **Installa e configura il tuo proxy:** Segui le istruzioni del servizio che utilizzi (LiteLLM, ecc.).
2.  **Configura l'estensione Babel Fish AI:**
    *   Nelle opzioni dell'estensione, seleziona il provider **Custom/LiteLLM** nel menu a discesa.
    *   Inserisci la tua chiave API (se necessario).
    *   Configura gli URL delle API:
        - **URL Trascrizione**: ad esempio `http://localhost:4000/v1/audio/transcriptions`
        - **URL Chat**: ad esempio `http://localhost:4000/v1/chat/completions`
    *   Attiva il provider con l'interruttore.
    *   Spunta l'opzione **"NoLog"** se desideri disattivare la registrazione delle richieste da parte di LiteLLM.

**Importante:** L'opzione "NoLog" è disponibile **solo** nel provider Custom/LiteLLM. Non è compatibile con le API ufficiali di OpenAI o Mistral AI.

## 🛠️ Funzionamento Tecnico

### Architettura dell'Estensione

L'estensione è composta da diversi file JavaScript che interagiscono tra loro:

#### File Principali

*   **`manifest.json`:** Il file di configurazione principale dell'estensione. Definisce i permessi, gli script, le risorse accessibili, ecc. Utilizza la versione 3 del manifesto e dichiara i permessi `activeTab`, `storage`, `commands`, `scripting` e `contextMenus`.
*   **`background.js`:** Il service worker che viene eseguito in background. Gestisce gli eventi (clic sull'icona, scorciatoie da tastiera, menu contestuale), inietta il `content script` se necessario e comunica con il `content script`.
*   **`content.js`:** Lo script principale che viene iniettato nelle pagine web. Coordina i diversi moduli di utilità e gestisce il flusso globale dell'estensione.
*   **`src/constants.js`:** Definisce costanti per la configurazione, gli stati, le azioni, ecc.

#### Moduli di Utilità

L'estensione utilizza un'architettura modulare con diversi file di utilità specializzati:

##### Gestione dei Provider e API

*   **`src/utils/providers.js`:** Registro dei provider IA (Mistral AI, OpenAI, Custom/LiteLLM) con le loro configurazioni, modelli e URL predefiniti.
*   **`src/utils/api-utils.js`:** Funzioni per l'interazione con le API esterne, risoluzione della configurazione multi-provider e trascrizione audio.
*   **`src/utils/text-processing.js`:** Funzioni di elaborazione del testo: traduzione, riformulazione, correzione ortografica.

##### Interfaccia Utente e Interazione

*   **`src/utils/ui.js`:** Funzioni di utilità generali per l'interfaccia utente.
*   **`src/utils/banner-utils.js`:** Gestisce il banner di stato, i suoi controlli e il selettore di lingua.
*   **`src/utils/focus-utils.js`:** Gestisce il salvataggio e il ripristino del focus e della selezione del testo.
*   **`src/utils/transcription-display.js`:** Gestisce la visualizzazione dei risultati di trascrizione.
*   **`src/utils/error-utils.js`:** Gestisce la visualizzazione e il trattamento degli errori.
*   **`src/styles/content.css`:** Stili CSS per l'interfaccia utente iniettata nelle pagine web.

##### Registrazione ed Eventi

*   **`src/utils/recording-utils.js`:** Gestisce la registrazione audio tramite microfono e l'elaborazione dei dati audio.
*   **`src/utils/event-handlers.js`:** Contiene i gestori di eventi per le interazioni utente.

##### Internazionalizzazione e Lingue

*   **`src/utils/languages.js`:** Definisce le lingue supportate dall'estensione.
*   **`src/utils/languages-shared.js`:** Definisce l'elenco delle lingue supportate per il contesto della pagina web.
*   **`src/utils/languages-data.js`:** Definisce l'elenco delle lingue supportate per il service worker.
*   **`src/utils/i18n.js`:** Gestisce l'internazionalizzazione per l'interfaccia utente.

##### Pagina delle Opzioni

*   **`src/pages/options/`:** Contiene i file per la pagina delle opzioni dell'estensione (HTML, CSS, JavaScript).

### Processo di Trascrizione e Traduzione

#### Funzionalità principale di trascrizione vocale

1.  **Avvio della Registrazione:** L'utente avvia la registrazione cliccando sull'icona dell'estensione o utilizzando la scorciatoia da tastiera (Ctrl+Shift+1 o ⌘+Shift+1 su Mac). Il `background script` invia un messaggio al `content script` per avviare la registrazione.
2.  **Acquisizione Audio:** Il `content script` utilizza l'API `navigator.mediaDevices.getUserMedia` per accedere al microfono e registrare l'audio tramite l'API MediaRecorder.
3.  **Trascrizione:** Il `content script` utilizza la funzione `transcribeAudio` (`src/utils/api-utils.js`) per inviare l'audio all'API di trascrizione del provider configurato (Voxtral per Mistral AI, Whisper per OpenAI). L'API restituisce il testo trascritto.
4.  **Traduzione o Riformulazione (Opzionale):**
   - Se l'opzione di traduzione è attivata, il `content script` utilizza la funzione `translateText` (`src/utils/text-processing.js`) per inviare il testo trascritto all'API di chat del provider configurato.
   - Se l'opzione di riformulazione è attivata, viene utilizzata la funzione `rephraseText` per migliorare il testo trascritto.
5.  **Visualizzazione:** Il `content script` visualizza il testo elaborato o nell'elemento attivo della pagina (se è un campo di testo o un elemento modificabile) o in una finestra di dialogo personalizzata.

#### Funzionalità del menu contestuale

1. **Selezione del Testo:** L'utente seleziona del testo su una pagina web.
2. **Menu Contestuale:** Un clic destro mostra le opzioni:
   - "Riformula la selezione" per migliorare lo stile e la chiarezza
   - "Traduci la selezione" con un sottomenu delle lingue disponibili
   - "Correggi l'ortografia" per correggere errori
3. **Elaborazione:** A seconda dell'opzione scelta:
   - Il testo viene inviato per la riformulazione tramite la funzione `rephraseText`
   - Il testo viene inviato per la traduzione tramite la funzione `translateText` con la lingua di destinazione selezionata
   - Il testo viene inviato per la correzione tramite la funzione `correctText`
4. **Visualizzazione:** Il risultato sostituisce la selezione originale nell'elemento in cui si trova il testo selezionato.

### Comunicazione

La comunicazione tra il `background script` e il `content script` avviene tramite l'API di messaggistica di Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Archiviazione dei Dati

L'estensione utilizza `chrome.storage.sync` per archiviare:

*   La configurazione dei provider IA (chiavi API, modelli selezionati, URL personalizzati).
*   Le opzioni dell'estensione (visualizzazione, traduzione, colori del banner, ecc.).
*   Le preferenze di lingua per la traduzione.

Questi dati sono archiviati localmente sul tuo computer, nell'archivio dell'estensione del browser.

### Gestione degli Errori
I possibili errori (chiave API mancante, errore di trascrizione, ecc.) sono definiti nel file `constants.js`. Le funzioni `api-utils.js` e `text-processing.js` gestiscono i potenziali errori di chiamata API con messaggi migliorati in base al codice HTTP. Il `content.js` visualizza i messaggi di errore all'utente tramite un banner in fondo alla pagina.


## 🛡️ Sicurezza e Privacy

- **Protezione dei Dati:**
  - La chiave API è archiviata in modo sicuro nel browser.
  - L'estensione non conserva i tuoi dati audio; tutte le elaborazioni vengono effettuate in tempo reale.
  - La comunicazione con le API avviene tramite connessioni HTTPS sicure.

Per informazioni complete su come BabelFishAI gestisce i tuoi dati, consulta la nostra [Politica sulla Privacy](PRIVACY.md).

## 🔧 Risoluzione dei Problemi

- **Problemi del Microfono:**
  - Verifica i permessi di accesso al microfono nel tuo browser.
  - Assicurati che nessun'altra applicazione stia utilizzando il microfono contemporaneamente.

- **Errori di Trascrizione/Traduzione:**
  - Verifica che la chiave API sia valida e attiva.
  - Assicurati di avere una connessione internet stabile.
  - Consulta la console del browser per ottenere log dettagliati in caso di errore.

## 🤝 Contributo

I contributi e i suggerimenti sono i benvenuti. Per contribuire:
- Segnala i bug tramite la sezione Issues su GitHub.
- Proponi miglioramenti o nuove funzionalità.
- Invia le tue pull request.

## 📄 Licenza

Questa estensione è distribuita sotto licenza GNU Affero General Public License v3.0 (AGPL-3.0). Consulta il file LICENSE per maggiori dettagli.

## 💝 Supporto

Se apprezzi questa estensione, puoi sostenere il suo sviluppo facendo una donazione tramite [PayPal](https://paypal.me/jls).
---
Sviluppato da jls42.org con passione e innovazione, Babel Fish AI spinge la trascrizione e la traduzione verso nuovi orizzonti grazie all'intelligenza artificiale all'avanguardia.
