# Babel Fish AI - Estensione di Trascrizione Vocale e Traduzione con IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Per utilizzare l'estensione, avrai bisogno di una chiave API OpenAI (o di un fornitore terzo se utilizzi LiteLLM Proxy). Puoi generare una chiave API OpenAI qui : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI è un'estensione Chrome innovativa concepita originariamente per offrire una potente trascrizione vocale. Trasforma la tua voce in testo con una precisione notevole grazie all'API Whisper di OpenAI, e beneficia opzionalmente di una traduzione automatica in tempo reale. Puoi utilizzare Babel Fish AI esclusivamente per la trascrizione o attivare la traduzione "al volo" a seconda delle tue esigenze.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funzionalità

- **Trascrizione Vocale Avanzata**
  - Cattura audio di alta qualità tramite il microfono del tuo dispositivo.
  - Trascrizione precisa realizzata dall'API Whisper di OpenAI.
  - Supporto multilingue per il riconoscimento vocale e la visualizzazione del testo, che permette di trascrivere input vocali in diverse lingue e di mostrare i risultati (trascrizione e traduzione, se attivata) nella lingua di tua scelta.
  - Inserimento automatico del testo nel campo attivo o visualizzazione in una finestra di dialogo dedicata.

- **Traduzione e Riformulazione Intelligenti**
  - Traduzione immediata delle trascrizioni in diverse lingue, da attivare se necessario.
  - Riformulazione del testo per migliorarne lo stile e la chiarezza.
  - Utilizzo di un modello di IA avanzato per garantire una traduzione fedele al significato originale.
  - Scelta libera di utilizzare esclusivamente la trascrizione o di combinare trascrizione e traduzione.

- **Menu Contestuale Potente**
  - Opzione "Riformula la selezione" per migliorare istantaneamente i tuoi testi selezionati.
  - Opzione "Traduci la selezione" con sottomenu di tutte le lingue disponibili.
  - Sostituzione diretta del testo selezionato con la sua versione tradotta o riformulata.
  - Perfetta integrazione nell'interfaccia utente nativa di Chrome.

- **Interfaccia Utente Intuitiva e Personalizzabile**
  - Modalità di visualizzazione flessibile: area di immissione attiva o finestra di dialogo flottante.
  - Banner di stato configurabile con scelta dei colori, dell'opacità e della durata di visualizzazione.
  - Scorciatoia da tastiera (Ctrl+Shift+1 o ⌘+Shift+1 su Mac) per avviare/fermare la registrazione.
  - Opzione "Mantieni aperto" per controllare la durata di visualizzazione dei risultati.
  - Icona personalizzata, che integra un microfono e il numero "42", per un riconoscimento immediato.

- **Opzioni Avanzate**
    - Modalità esperto per configurazioni dettagliate (URLs delle API, configurazione per dominio, ecc.).
    - Possibilità di personalizzare i modelli di trascrizione e di traduzione.
    - Compatibilità con LiteLLM Proxy per collegarti a modelli di linguaggio alternativi e disattivare la registrazione delle richieste.
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

1.  **Download e Installazione:**
    - Clona questo repository da GitHub o scarica manualmente la cartella dell'estensione.
    - **Oppure installa direttamente l'estensione dal [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Apri Chrome e accedi a `chrome://extensions/`.
    - Attiva la "Modalità sviluppatore" in alto a destra.
    - Clicca su "Carica estensione non impacchettata" e seleziona la cartella di Babel Fish AI.

2.  **Verifica:**
    - Assicurati che l'estensione appaia nella barra degli strumenti di Chrome con l'icona personalizzata.

## ⚙️ Configurazione

1.  **Chiave API OpenAI:**
    *   Clicca sull'icona dell'estensione per accedere alle opzioni.
    *   Inserisci la tua chiave API OpenAI (disponibile su [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizzazione delle Opzioni:**
    *   Scegli la modalità di visualizzazione (area attiva o finestra di dialogo).
    *   Configura il colore, l'opacità e la durata di visualizzazione del banner di stato.
    *   Seleziona le lingue per la trascrizione (input vocale) e per la visualizzazione del testo.
    *   Attiva o disattiva la funzionalità di traduzione a seconda delle tue esigenze.

3.  **(Opzionale) Utilizzo con LiteLLM Proxy:**
    *   Attiva la "Modalità Esperto" nelle opzioni.
    *   Nella sezione "Configurazione Avanzata", modifica **le due URL** delle API (Whisper e Traduzione) per puntare alla tua istanza LiteLLM Proxy. **Utilizza la stessa URL di base per entrambe.**
    *   Seleziona l'opzione "NoLog (LiteLLM solo)" se desideri disattivare la registrazione delle richieste da parte di LiteLLM.

## 🚀 Utilizzo con LiteLLM Proxy

Se desideri utilizzare modelli di linguaggio diversi da OpenAI, puoi usare LiteLLM Proxy. Ecco come configurarlo:

Babel Fish AI è compatibile con [LiteLLM Proxy](https://litellm.ai/), che permette di utilizzare modelli di linguaggio alternativi con un'API compatibile con quella di OpenAI.

### Configurazione

1.  **Installa e configura LiteLLM Proxy:** Segui le istruzioni sul sito di LiteLLM.
2.  **Configura l'estensione Babel Fish AI:**
    *   Nelle opzioni dell'estensione (clic destro sull'icona > Opzioni), attiva la "Modalità Esperto".
    *   Nella sezione "Configurazione Avanzata", modifica **le due URL** delle API (Whisper e Traduzione) per puntare alla tua istanza LiteLLM Proxy (per esempio, `http://localhost:4000/v1/audio/transcriptions` e `http://localhost:4000/v1/chat/completions`). **Utilizza la stessa URL di base per entrambe.**
    *   Seleziona l'opzione "NoLog (LiteLLM solo)" se desideri disattivare la registrazione delle richieste da parte di LiteLLM.

**Importante :** L'opzione "NoLog" è concepita **esclusivamente** per essere utilizzata con LiteLLM Proxy. **Non attivarla** se utilizzi l'API ufficiale di OpenAI, poiché questo causerà un errore e impedirà il corretto funzionamento della traduzione.

## 🛠️ Funzionamento Tecnico

### Architettura dell'Estensione

L'estensione è composta da diversi file JavaScript che interagiscono tra loro:

*   **`manifest.json`:** Il file di configurazione principale dell'estensione. Definisce le autorizzazioni, gli script, le risorse accessibili, ecc. Utilizza la versione 3 del manifest e dichiara le autorizzazioni `activeTab`, `storage`, `commands`, `scripting` e `contextMenus`. Le `web_accessible_resources` permettono l'accesso alle risorse dell'estensione nei diversi contesti di esecuzione.
*   **`background.js`:** Il service worker che viene eseguito in background. Gestisce gli eventi (click sull'icona, scorciatoie da tastiera, menu contestuale), inietta lo `script content` se necessario e comunica con lo `script content`.
*   **`content.js`:** Lo script che viene iniettato nelle pagine web. Interagisce direttamente con il DOM, cattura l'audio dal microfono, richiama le API di trascrizione e traduzione, e visualizza i risultati.
*   **`src/utils/api.js`:** Contiene le funzioni per interagire con le API, in particolare `transcribeAudio` per richiamare l'API Whisper di OpenAI (trascrizione) e funzioni utilitarie per gestire l'archiviazione.
*   **`src/utils/translation.js`:** Contiene le funzioni `translateText` e `rephraseText` per richiamare l'API GPT di OpenAI (traduzione e riformulazione).
*   **`src/utils/ui.js`:** Contiene funzioni utilitarie per gestire l'interfaccia utente (banner, finestra di dialogo, pulsante di copia).
*   **`src/utils/languages-shared.js` e `src/utils/languages-data.js`:** Definiscono l'elenco centralizzato delle lingue supportate, rispettivamente per il contesto della pagina web e per il service worker.
*   **`src/utils/i18n.js`:** Gestisce l'internazionalizzazione per l'interfaccia utente.
*   **`src/constants.js`:** Definisce costanti per la configurazione, gli stati, le azioni, ecc.
*   **`src/pages/options/`:** Contiene i file per la pagina delle opzioni dell'estensione (HTML, CSS, JavaScript).

### Processo di Trascrizione e Traduzione

#### Funzionalità principale della trascrizione vocale

1.  **Avvio della Registrazione:** L'utente avvia la registrazione cliccando sull'icona dell'estensione o utilizzando la scorciatoia da tastiera (Ctrl+Shift+1 o ⌘+Shift+1 su Mac). Lo `script background` invia un messaggio allo `script content` per avviare la registrazione.
2.  **Cattura Audio:** Lo `script content` utilizza l'API `navigator.mediaDevices.getUserMedia` per accedere al microfono e registrare l'audio tramite l'API MediaRecorder.
3.  **Trascrizione:** Lo `script content` utilizza la funzione `transcribeAudio` (`src/utils/api.js`) per inviare l'audio all'API Whisper di OpenAI. L'API restituisce il testo trascritto.
4.  **Traduzione o Riformulazione (Opzionale):** 
   - Se l'opzione di traduzione è attivata, lo `script content` utilizza la funzione `translateText` (`src/utils/translation.js`) per inviare il testo trascritto all'API GPT di OpenAI.
   - Se l'opzione di riformulazione è attivata, viene utilizzata la funzione `rephraseText` per migliorare il testo trascritto.
5.  **Visualizzazione:** Lo `script content` visualizza il testo elaborato sia nell'elemento attivo della pagina (se si tratta di un campo di testo o di un elemento editabile), sia in una finestra di dialogo personalizzata.

#### Funzionalità del menu contestuale

1. **Selezione del Testo:** L'utente seleziona del testo in una pagina web.
2. **Menu Contestuale:** Un clic destro mostra le opzioni "Riformula la selezione" o "Traduci la selezione" con un sottomenu di tutte le lingue disponibili.
3. **Elaborazione:** A seconda dell'opzione scelta:
   - Il testo viene inviato per la riformulazione tramite la funzione `rephraseText`
   - Il testo viene inviato per la traduzione tramite la funzione `translateText` con la lingua di destinazione selezionata
4. **Visualizzazione:** Il risultato sostituisce la selezione originale nell'elemento in cui si trova il testo selezionato.

### Comunicazione

La comunicazione tra lo `script background` e lo `script content` avviene tramite l'API di messaggistica di Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Archiviazione dei Dati

L'estensione utilizza `chrome.storage.sync` per memorizzare:

*   La chiave API OpenAI (`apiKey`).
*   Le opzioni dell'estensione (visualizzazione, traduzione, colori del banner, ecc.).
*   Le preferenze di lingua per la traduzione.

Questi dati sono memorizzati localmente sul tuo computer, nello storage dell'estensione Chrome.

### Gestione degli Errori
Gli errori possibili (mancata chiave API, errore di trascrizione, ecc.) sono definiti nel file `constants.js`. Le funzioni in `api.js` e `translation.js` gestiscono gli errori potenziali delle chiamate API. Lo `script content` visualizza i messaggi di errore all'utente tramite un banner in cima alla pagina.

## 🛡️ Sicurezza e Privacy

- **Protezione dei Dati:**
  - La chiave API viene memorizzata in modo sicuro in Chrome.
  - L'estensione non conserva i tuoi dati audio; tutte le elaborazioni avvengono in tempo reale.
  - La comunicazione con le API avviene tramite connessioni HTTPS sicure.

Per informazioni complete su come BabelFishAI gestisce i tuoi dati, consulta la nostra [Politica sulla Privacy](PRIVACY.md).

## 🔧 Risoluzione dei Problemi

- **Problemi con il Microfono:**
  - Verifica le autorizzazioni di accesso al microfono in Chrome.
  - Assicurati che nessun'altra applicazione stia utilizzando il microfono contemporaneamente.

- **Errori di Trascrizione/Traduzione:**
  - Verifica che la chiave API sia valida e attiva.
  - Assicurati di avere una connessione internet stabile.
  - Consulta la console di Chrome per ottenere log dettagliati in caso di errore.

## 🤝 Contributi

I contributi e i suggerimenti sono ben accetti. Per contribuire:
- Segnala i bug tramite la sezione Issues su GitHub.
- Proponi miglioramenti o nuove funzionalità.
- Invia le tue pull request.

## 📄 Licenza

Questa estensione è distribuita sotto licenza GNU Affero General Public License v3.0 (AGPL-3.0). Consulta il file LICENSE per maggiori dettagli.

## 💝 Supporto

Se apprezzi questa estensione, puoi sostenere il suo sviluppo effettuando una donazione tramite [PayPal](https://paypal.me/jls).
---
Sviluppato da jls42.org con passione e innovazione, Babel Fish AI spinge la trascrizione e la traduzione verso nuovi orizzonti grazie all'intelligenza artificiale d'avanguardia.

**Questo documento è stato tradotto dalla versione fr alla lingua it utilizzando il modello o3-mini. Per ulteriori informazioni sul processo di traduzione, consulta https://gitlab.com/jls42/ai-powered-markdown-translator**

