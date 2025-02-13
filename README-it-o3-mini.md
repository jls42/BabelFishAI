# Babel Fish AI - Estensione di Trascrizione Vocale e Traduzione con IA

Babel Fish AI è un'estensione Chrome innovativa concepita originariamente per offrire una trascrizione vocale potente. Trasforma la tua voce in testo con una precisione notevole grazie all’API Whisper di OpenAI, e beneficia opzionalmente di una traduzione automatica in tempo reale. Puoi utilizzare Babel Fish AI esclusivamente per la trascrizione o attivare la traduzione al volo a seconda delle tue esigenze.

## 🌟 Funzionalità

- **Trascrizione Vocale Avanzata**
  - Cattura audio di alta qualità tramite il microfono del tuo dispositivo.
  - Trascrizione precisa realizzata dall’API Whisper di OpenAI.
  - Supporto multilingue per il trattamento della voce e la visualizzazione del testo, permettendo di trascrivere input vocali in diverse lingue e di visualizzare i risultati nella lingua di tua scelta.
  - Inserimento automatico del testo nel campo attivo o visualizzazione in una finestra di dialogo dedicata.

- **Traduzione Automatica Integrata (Opzionale)**
  - Traduzione immediata delle trascrizioni in diverse lingue, da attivare se necessario.
  - Utilizzo di un modello di IA avanzato per garantire una traduzione fedele al significato originale.
  - Scelta libera di utilizzare esclusivamente la trascrizione o di combinare trascrizione e traduzione.

- **Interfaccia Utente Intuitiva e Personalizzabile**
  - Modalità di visualizzazione flessibile: area di inserimento attiva o finestra di dialogo flottante.
  - Barra di stato configurabile con scelta dei colori, dell’opacità e della durata di visualizzazione.
  - Scorciatoia da tastiera (Ctrl+Shift+1 o ⌘+Shift+1 su Mac) per avviare/fermare la registrazione.
  - Icona personalizzata, che integra un microfono e il numero “42”, per un riconoscimento immediato.

- **Opzioni Avanzate**
    - Modalità esperto per configurazioni dettagliate (URL delle API, configurazione per dominio, ecc.).
    - Possibilità di personalizzare i modelli di trascrizione e di traduzione.
    - **Compatibilità con LiteLLM Proxy per utilizzare modelli di linguaggio alternativi e disabilitare la registrazione delle richieste.**
    - Gestione completa dell’internazionalizzazione grazie ai file di lingua (_locales), che offrono un’interfaccia e un supporto vocale in diverse lingue.

## 🌐 Lingue Supportate

- Arabo
- Tedesco
- Inglese
- Spagnolo
- Francese
- Hindi
- Italiano
- Giapponese
- Coreano
- Olandese
- Polacco
- Portoghese
- Romeno
- Svedese
- Cinese

## 🚀 Installazione

1.  **Download e Installazione:**
    - Clona questo repository da GitHub oppure scarica manualmente la cartella dell'estensione.
    - Apri Chrome e vai su `chrome://extensions/`.
    - Attiva la “Modalità sviluppatore” in alto a destra.
    - Clicca su “Carica l’estensione non impacchettata” e seleziona la cartella di Babel Fish AI.

2.  **Verifica:**
    - Assicurati che l'estensione appaia nella barra degli strumenti di Chrome con l'icona personalizzata.

## ⚙️ Configurazione

1.  **Chiave API OpenAI:**
    *   Clicca sull'icona dell'estensione per accedere alle opzioni.
    *   Inserisci la tua chiave API OpenAI (disponibile su [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizzazione delle Opzioni:**
    *   Scegli la modalità di visualizzazione (area attiva o finestra di dialogo).
    *   Configura il colore, l’opacità e la durata di visualizzazione della barra di stato.
    *   Seleziona le lingue per la trascrizione (input vocale) e per la visualizzazione del testo.
    *   Attiva o disattiva la funzionalità di traduzione a seconda delle tue necessità.

3.  **(Opzionale) Utilizzo con LiteLLM Proxy:**
    *   Attiva la "Modalità Esperto" nelle opzioni.
    *   Nella sezione "Configurazione Avanzata", modifica **le due URL** delle API (Whisper e Traduzione) per puntare verso la tua istanza LiteLLM Proxy. **Utilizza lo stesso URL di base per entrambe.**
    *   Seleziona l'opzione "NoLog (solo LiteLLM)" se desideri disabilitare la registrazione delle richieste da parte di LiteLLM.

## 🚀 Utilizzo con LiteLLM Proxy

Babel Fish AI è compatibile con [LiteLLM Proxy](https://litellm.ai/), che permette di utilizzare modelli di linguaggio alternativi con un'API compatibile con quella di OpenAI.

### Configurazione

1.  **Installa e configura LiteLLM Proxy:** Segui le istruzioni sul sito di LiteLLM.
2.  **Configura l'estensione Babel Fish AI:**
    *   Nelle opzioni dell'estensione (clic destro sull'icona > Opzioni), attiva la "Modalità Esperto".
    *   Nella sezione "Configurazione Avanzata", modifica **le due URL** delle API (Whisper e Traduzione) per puntare verso la tua istanza LiteLLM Proxy (per esempio, `http://localhost:4000/v1/audio/transcriptions` e `http://localhost:4000/v1/chat/completions`). **Utilizza lo stesso URL di base per entrambe.**
    *   Seleziona l'opzione "NoLog (solo LiteLLM)" se desideri disabilitare la registrazione delle richieste da parte di LiteLLM.

**Importante :** L'opzione "NoLog" è concepita **esclusivamente** per essere utilizzata con LiteLLM Proxy. **Non attivarla** se utilizzi l'API ufficiale di OpenAI, perché questo causerà un errore e impedirà il funzionamento della traduzione.

## 🛠️ Funzionamento Tecnico

### Architettura dell'Estensione

L'estensione è composta da diversi file JavaScript che interagiscono tra loro:

*   **`manifest.json`:** Il file di configurazione principale dell'estensione. Definisce le autorizzazioni, gli script, le risorse accessibili, ecc. Utilizza la versione 3 del manifesto e dichiara le autorizzazioni `activeTab`, `storage`, `commands` e `scripting`. I `content_scripts` vengono iniettati in tutti gli URL e si eseguono al termine del caricamento del documento.
*   **`background.js`:** Il service worker che gira in background. Gestisce gli eventi (clic sull'icona, scorciatoie da tastiera), inietta il `content script` se necessario, e comunica con il `content script`.
*   **`content.js`:** Lo script che viene iniettato nelle pagine web. Interagisce direttamente con il DOM, cattura l'audio del microfono, chiama le API di trascrizione e traduzione, e visualizza i risultati.
*   **`src/utils/api.js`:** Contiene la funzione `transcribeAudio` per chiamare l'API Whisper di OpenAI (trascrizione).
*   **`src/utils/translation.js`:** Contiene la funzione `translateText` per chiamare l'API GPT di OpenAI (traduzione).
*   **`src/utils/ui.js`:** Contiene funzioni utili per gestire l'interfaccia utente (banner, finestra di dialogo, pulsante per copiare).
*   **`src/constants.js`:** Definisce costanti per la configurazione, gli stati, le azioni, ecc.
*   **`src/pages/options/`:** Contiene i file per la pagina delle opzioni dell'estensione (HTML, CSS, JavaScript).

### Processo di Trascrizione e Traduzione

1.  **Avvio della Registrazione:** L'utente avvia la registrazione cliccando sull'icona dell'estensione o utilizzando la scorciatoia da tastiera. Lo script di background invia un messaggio allo script contenuto per avviare la registrazione.
2.  **Cattura Audio:** Lo script contenuto utilizza l'API `navigator.mediaDevices.getUserMedia` per accedere al microfono e registrare l'audio.
3.  **Trascrizione:** Lo script contenuto utilizza la funzione `transcribeAudio` (`src/utils/api.js`) per inviare l'audio all'API Whisper di OpenAI. L'API restituisce il testo trascritto.
4.  **Traduzione (Opzionale):** Se l'opzione di traduzione è attivata, lo script contenuto utilizza la funzione `translateText` (`src/utils/translation.js`) per inviare il testo trascritto all'API GPT di OpenAI. L'API restituisce il testo tradotto.
5.  **Visualizzazione:** Lo script contenuto visualizza il testo trascritto (ed eventualmente tradotto) oppure nell'elemento attivo della pagina (se si tratta di un campo di testo o di un elemento editabile), oppure in una finestra di dialogo.

### Comunicazione

La comunicazione tra lo script di background e lo script contenuto avviene tramite l'API di messaggistica di Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Archiviazione dei Dati

L'estensione utilizza `chrome.storage.sync` per archiviare:

*   La chiave API OpenAI (`apiKey`).
*   Le opzioni dell'estensione (visualizzazione, traduzione, colori della barra, ecc.).

### Gestione degli Errori
Gli errori possibili (chiave API mancante, errore di trascrizione, ecc.) sono definiti nel file `constants.js`. Le funzioni in `api.js` e `translation.js` gestiscono gli errori potenziali delle chiamate API. Lo script `content.js` visualizza i messaggi di errore all'utente tramite un banner in cima alla pagina.

## 🛡️ Sicurezza e Privacy

- **Protezione dei Dati:**
  - La chiave API è archiviata in modo sicuro in Chrome.
  - L’estensione non conserva i tuoi dati audio; tutti i processi avvengono in tempo reale.
  - La comunicazione con le API avviene tramite connessioni HTTPS sicure.

## 🔧 Risoluzione dei Problemi

- **Problemi con il Microfono:**
  - Verifica le autorizzazioni di accesso al microfono in Chrome.
  - Assicurati che nessun'altra applicazione stia utilizzando il microfono contemporaneamente.

- **Errori di Trascrizione/Traduzione:**
  - Verifica che la chiave API sia valida e attiva.
  - Assicurati di avere una connessione internet stabile.
  - Consulta la console di Chrome per ottenere log dettagliati in caso di errore.

## 🤝 Contributi

I contributi e i suggerimenti sono benvenuti. Per contribuire:
- Segnala i bug tramite la sezione Issues su GitHub.
- Proponi miglioramenti o nuove funzionalità.
- Invia le tue pull requests.

## 📄 Licenza

Questa estensione è distribuita con licenza GNU Affero General Public License v3.0 (AGPL-3.0). Consulta il file LICENSE per maggiori dettagli.

## 💝 Sostegno

Se apprezzi questa estensione, puoi supportarne lo sviluppo effettuando una donazione tramite [PayPal](https://paypal.me/jls).

---
Sviluppato con passione e innovazione da jls42.org, Babel Fish AI spinge la trascrizione e la traduzione verso nuovi orizzonti grazie all'intelligenza artificiale di punta.

**Questo documento è stato tradotto dalla versione fr alla lingua it utilizzando il modello o3-mini. Per maggiori informazioni sul processo di traduzione, consultare https://gitlab.com/jls42/ai-powered-markdown-translator**

