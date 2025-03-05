# Babel Fish AI - Estensione di Trascrizione Vocale e Traduzione con IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Per utilizzare l'estensione, avrai bisogno di una chiave API OpenAI (o di un fornitore terzo se utilizzi LiteLLM Proxy). Puoi generare una chiave API OpenAI qui: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI è un'estensione Chrome innovativa concepita in origine per offrire una trascrizione vocale potente. Trasforma la tua voce in testo con una precisione straordinaria grazie all’API Whisper di OpenAI, e usufruisci opzionalmente di una traduzione automatica in tempo reale. Puoi utilizzare Babel Fish AI esclusivamente per la trascrizione o attivare la traduzione al volo a seconda delle tue esigenze.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Funzionalità

- **Trascrizione Vocale Avanzata**
  - Cattura audio di alta qualità tramite il microfono del tuo dispositivo.
  - Trascrizione precisa realizzata tramite l’API Whisper di OpenAI.
  - Supporto multilingue per il riconoscimento vocale e la visualizzazione del testo, che permette di trascrivere input vocali in diverse lingue e di mostrare i risultati (trascrizione e traduzione, se attivata) nella lingua di tua scelta.
  - Inserimento automatico del testo nel campo attivo o visualizzazione in una finestra di dialogo dedicata.

- **Traduzione Automatica Integrata (Opzionale)**
  - Traduzione immediata delle trascrizioni in varie lingue, da attivare se necessario.
  - Utilizzo di un modello di IA avanzato per garantire una traduzione fedele al significato originale.
  - Libertà di utilizzare esclusivamente la trascrizione o combinare trascrizione e traduzione.

- **Interfaccia Utente Intuitiva e Personalizzabile**
  - Modalità di visualizzazione flessibile: area di input attiva o finestra di dialogo flottante.
  - Barra di stato configurabile con scelta dei colori, dell’opacità e della durata di visualizzazione.
  - Scorciatoia da tastiera (Ctrl+Shift+1 o ⌘+Shift+1 su Mac) per avviare/fermare la registrazione.
  - Icona personalizzata, che integra un microfono e il numero “42”, per un riconoscimento immediato.

- **Opzioni Avanzate**
    - Modalità esperto per configurazioni dettagliate (URL delle API, configurazione per dominio, ecc.).
    - Possibilità di personalizzare i modelli di trascrizione e traduzione.
    - Compatibilità con LiteLLM Proxy per connetterti a modelli di linguaggio alternativi e disattivare il logging delle richieste.
    - Gestione completa dell’internazionalizzazione grazie ai file di lingua (_locales), che offrono un’interfaccia e un supporto vocale in diverse lingue.

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
- [Romeno](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Svedese](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Cinese](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Installazione

1.  **Download e Installazione:**
    - Clona questo repository da GitHub o scarica manualmente la cartella dell'estensione.
    - **Oppure installa direttamente l'estensione dal [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Apri Chrome e vai su `chrome://extensions/`.
    - Attiva la “Modalità sviluppatore” in alto a destra.
    - Clicca su “Carica estensione non pacchettizzata” e seleziona la cartella di Babel Fish AI.

2.  **Verifica:**
    - Assicurati che l’estensione appaia nella barra degli strumenti di Chrome con l'icona personalizzata.

## ⚙️ Configurazione

1.  **Chiave API OpenAI:**
    *   Clicca sull'icona dell'estensione per accedere alle opzioni.
    *   Inserisci la tua chiave API OpenAI (disponibile su [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizzazione delle Opzioni:**
    *   Scegli la modalità di visualizzazione (area attiva o finestra di dialogo).
    *   Configura il colore, l’opacità e la durata di visualizzazione della barra di stato.
    *   Seleziona le lingue per la trascrizione (input vocale) e per la visualizzazione del testo.
    *   Attiva o disattiva la funzionalità di traduzione a seconda delle tue esigenze.

3.  **(Opzionale) Utilizzo con LiteLLM Proxy:**
    *   Attiva la "Modalità Esperto" nelle opzioni.
    *   Nella sezione "Configurazione Avanzata", modifica **le due URL** delle API (Whisper e Traduzione) per puntare alla tua istanza di LiteLLM Proxy. **Utilizza la stessa URL di base per entrambe.**
    *   Seleziona l'opzione "NoLog (LiteLLM solo)" se desideri disattivare il logging delle richieste da parte di LiteLLM.

## 🚀 Utilizzo con LiteLLM Proxy

Se desideri utilizzare modelli di linguaggio diversi da OpenAI, puoi utilizzare LiteLLM Proxy. Ecco come configurarlo:

Babel Fish AI è compatibile con [LiteLLM Proxy](https://litellm.ai/), che permette di utilizzare modelli di linguaggio alternativi con un'API compatibile con quella di OpenAI.

### Configurazione

1.  **Installa e configura LiteLLM Proxy:** Segui le istruzioni sul sito di LiteLLM.
2.  **Configura l'estensione Babel Fish AI:**
    *   Nelle opzioni dell'estensione (clic destro sull'icona > Opzioni), attiva la "Modalità Esperto".
    *   Nella sezione "Configurazione Avanzata", modifica **le due URL** delle API (Whisper e Traduzione) per puntare alla tua istanza di LiteLLM Proxy (per esempio, `http://localhost:4000/v1/audio/transcriptions` e `http://localhost:4000/v1/chat/completions`). **Utilizza la stessa URL di base per entrambe.**
    *   Seleziona l'opzione "NoLog (LiteLLM solo)" se desideri disattivare il logging delle richieste da parte di LiteLLM.

**Importante:** L'opzione "NoLog" è concepita **esclusivamente** per essere utilizzata con LiteLLM Proxy. **Non attivarla** se utilizzi l'API ufficiale di OpenAI, in quanto causerà un errore e impedirà il funzionamento della traduzione.

## 🛠️ Funzionamento Tecnico

### Architettura dell'Estensione

L'estensione è composta da diversi file JavaScript che interagiscono tra loro:

*   **`manifest.json`:** Il file di configurazione principale dell'estensione. Define i permessi, gli script, le risorse accessibili, ecc. Utilizza la versione 3 del manifesto e dichiara i permessi `activeTab`, `storage`, `commands` e `scripting`. I `content_scripts` vengono iniettati in tutti gli URL e vengono eseguiti alla fine del caricamento del documento.
*   **`background.js`:** Il service worker che viene eseguito in background. Gestisce gli eventi (clic sull'icona, scorciatoie da tastiera), inietta il `content script` se necessario, e comunica con il `content script`.
*   **`content.js`:** Lo script che viene iniettato nelle pagine web. Interagisce direttamente con il DOM, cattura l'audio dal microfono, chiama le API di trascrizione e traduzione, e mostra i risultati.
*   **`src/utils/api.js`:** Contiene la funzione `transcribeAudio` per chiamare l'API Whisper di OpenAI (trascrizione).
*   **`src/utils/translation.js`:** Contiene la funzione `translateText` per chiamare l'API GPT di OpenAI (traduzione).
*   **`src/utils/ui.js`:** Contiene funzioni di utilità per gestire l'interfaccia utente (banner, finestra di dialogo, pulsante di copia).
*   **`src/constants.js`:** Definisce le costanti per la configurazione, gli stati, le azioni, ecc.
*   **`src/pages/options/`:** Contiene i file per la pagina delle opzioni dell'estensione (HTML, CSS, JavaScript).

### Processo di Trascrizione e Traduzione

1.  **Avvio della Registrazione:** L'utente avvia la registrazione cliccando sull'icona dell'estensione o utilizzando la scorciatoia da tastiera. Lo script in background invia un messaggio allo script di contenuto per avviare la registrazione.
2.  **Cattura Audio:** Lo script di contenuto utilizza l'API `navigator.mediaDevices.getUserMedia` per accedere al microfono e registrare l'audio.
3.  **Trascrizione:** Lo script di contenuto utilizza la funzione `transcribeAudio` (`src/utils/api.js`) per inviare l'audio all'API Whisper di OpenAI. L'API restituisce il testo trascritto.
4.  **Traduzione (Opzionale):** Se l'opzione di traduzione è attivata, lo script di contenuto utilizza la funzione `translateText` (`src/utils/translation.js`) per inviare il testo trascritto all'API GPT di OpenAI. L'API restituisce il testo tradotto.
5.  **Visualizzazione:** Lo script di contenuto visualizza il testo trascritto (ed eventualmente tradotto) sia nell'elemento attivo della pagina (se è un campo di testo o un elemento modificabile), sia in una finestra di dialogo.

### Comunicazione

La comunicazione tra lo script in background e lo script di contenuto avviene tramite l'API di messaggistica di Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Memorizzazione dei Dati

L'estensione utilizza `chrome.storage.sync` per memorizzare:

*   La chiave API OpenAI (`apiKey`).
*   Le opzioni dell'estensione (visualizzazione, traduzione, colori della barra, ecc.).

Questi dati vengono memorizzati localmente sul tuo computer, nello storage dell'estensione Chrome.

### Gestione degli Errori

Gli errori possibili (chiave API mancante, errore di trascrizione, ecc.) sono definiti nel file `constants.js`. Le funzioni in `api.js` e `translation.js` gestiscono gli errori potenziali delle chiamate API. Lo script di contenuto visualizza i messaggi di errore all'utente tramite un banner in alto nella pagina.

## 🛡️ Sicurezza e Privacy

- **Protezione dei Dati:**
  - La chiave API viene memorizzata in modo sicuro in Chrome.
  - L'estensione non conserva i tuoi dati audio; tutti i processi avvengono in tempo reale.
  - La comunicazione con le API avviene tramite connessioni HTTPS sicure.

Per informazioni complete su come BabelFishAI gestisce i tuoi dati, consulta la nostra [Politica sulla Privacy](PRIVACY.md).

## 🔧 Risoluzione dei Problemi

- **Problemi con il Microfono:**
  - Verifica i permessi di accesso al microfono in Chrome.
  - Assicurati che nessun'altra applicazione stia utilizzando contemporaneamente il microfono.

- **Errori di Trascrizione/Traduzione:**
  - Verifica che la chiave API sia valida e attiva.
  - Assicurati di avere una connessione internet stabile.
  - Consulta la console di Chrome per ottenere log dettagliati in caso di errore.

## 🤝 Contributi

I contributi e i suggerimenti sono i benvenuti. Per contribuire:
- Segnala i bug tramite la sezione Issues su GitHub.
- Proponi miglioramenti o nuove funzionalità.
- Invia le tue pull request.

## 📄 Licenza

Questa estensione è distribuita sotto licenza GNU Affero General Public License v3.0 (AGPL-3.0). Consulta il file LICENSE per maggiori dettagli.

## 💝 Sostegno

Se apprezzi questa estensione, puoi supportarne lo sviluppo facendo una donazione tramite [PayPal](https://paypal.me/jls).
---
Sviluppato da jls42.org con passione e innovazione, Babel Fish AI porta la trascrizione e la traduzione verso nuovi orizzonti grazie all'intelligenza artificiale di punta.

**Questo documento è stato tradotto dalla versione fr alla lingua it utilizzando il modello o3-mini. Per ulteriori informazioni sul processo di traduzione, consulta https://gitlab.com/jls42/ai-powered-markdown-translator**

