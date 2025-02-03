# Babel Fish AI - Estensione di Trascrizione Vocale e Traduzione con IA

Babel Fish AI è un'estensione Chrome innovativa concepita in origine per offrire una potente trascrizione vocale. Trasforma la tua voce in testo con una precisione notevole grazie all’API Whisper di OpenAI, e usufruisci, facoltativamente, di una traduzione automatica in tempo reale. Puoi utilizzare Babel Fish AI esclusivamente per la trascrizione o attivare la traduzione al volo a seconda delle tue esigenze.

## 🌟 Funzionalità

- **Trascrizione Vocale Avanzata**
  - Cattura audio di alta qualità tramite il microfono del tuo dispositivo.
  - Trascrizione precisa realizzata dall’API Whisper di OpenAI.
  - Supporto multilingue per il trattamento della voce e la visualizzazione del testo, che consente di trascrivere input vocali in diverse lingue e di mostrare i risultati nella lingua di tua scelta.
  - Inserimento automatico del testo nel campo attivo o visualizzazione in una finestra di dialogo dedicata.

- **Traduzione Automatica Integrata (Opzionale)**
  - Traduzione immediata delle trascrizioni in varie lingue, da attivare se necessario.
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

1. **Download e Installazione:**
   - Clona questo repository da GitHub o scarica manualmente la cartella dell’estensione.
   - Apri Chrome e vai su `chrome://extensions/`.
   - Attiva la "Modalità sviluppatore" in alto a destra.
   - Clicca su "Carica estensione non pacchettizzata" e seleziona la cartella di Babel Fish AI.

2. **Verifica:**
   - Assicurati che l’estensione appaia nella barra degli strumenti di Chrome con l’icona personalizzata.

## ⚙️ Configurazione

1. **Chiave API OpenAI:**
   - Clicca sull’icona dell’estensione per accedere alle opzioni.
   - Inserisci la tua chiave API OpenAI (disponibile su [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Personalizzazione delle Opzioni:**
   - Scegli la modalità di visualizzazione (area attiva o finestra di dialogo).
   - Configura il colore, l’opacità e la durata di visualizzazione della barra di stato.
   - Seleziona le lingue per la trascrizione (input vocale) e per la visualizzazione del testo.
   - Attiva o disattiva la funzionalità di traduzione in base alle tue esigenze.

## 🛠️ Funzionamento Tecnico

- **Architettura dell’Estensione:**
  - **Manifest V3:** Il file `manifest.json` definisce gli script di contenuto, il service worker (`background.js`) e le autorizzazioni necessarie.
  - **Script di Sfondo e di Contenuto:** Il file `background.js` gestisce la logica in background e la comunicazione con le API, mentre `content.js` si occupa dell'interazione con la pagina web attiva.
  - **Utilità e Internazionalizzazione:** La cartella `src/utils` contiene moduli per gestire l’API, l’interfaccia utente, la traduzione e l’internazionalizzazione tramite file di lingua presenti nella cartella `_locales`.

- **Processo di Trascrizione e Traduzione:**
  1. **Avvio della Registrazione:** L’estensione cattura la tua voce tramite il microfono quando clicchi sull’icona o utilizzi la scorciatoia da tastiera.
  2. **Trascrizione:** L’audio viene inviato all’API Whisper di OpenAI per essere convertito in testo, con supporto per varie lingue di input.
  3. **Traduzione (Opzionale):** Se attivata, la trascrizione viene automaticamente tradotta nella lingua target selezionata, mantenendo il significato e il contesto.
  4. **Visualizzazione:** Il testo trascritto (ed eventualmente tradotto) viene inserito nel campo attivo o visualizzato in una finestra di dialogo personalizzata.

## 🛡️ Sicurezza e Privacy

- **Protezione dei Dati:**
  - La chiave API viene memorizzata in modo sicuro in Chrome.
  - L’estensione non conserva i tuoi dati audio; tutti i processi avvengono in tempo reale.
  - La comunicazione con le API avviene tramite connessioni HTTPS sicure.

## 🔧 Risoluzione dei Problemi

- **Problemi con il Microfono:**
  - Verifica le autorizzazioni di accesso al microfono in Chrome.
  - Assicurati che nessun’altra applicazione stia utilizzando contemporaneamente il microfono.

- **Errori di Trascrizione/Traduzione:**
  - Verifica che la chiave API sia valida e attiva.
  - Assicurati di avere una connessione internet stabile.
  - Consulta la console di Chrome per ottenere log dettagliati in caso di errore.

## 🤝 Contributi

I contributi e i suggerimenti sono benvenuti. Per contribuire:
- Segnala i bug tramite la sezione Issues su GitHub.
- Proponi miglioramenti o nuove funzionalità.
- Invia le tue pull request.

## 📄 Licenza

Questa estensione è distribuita sotto licenza GNU Affero General Public License v3.0 (AGPL-3.0). Consulta il file LICENSE per ulteriori dettagli.

## 💝 Sostegno

Se apprezzi questa estensione, puoi supportarne lo sviluppo facendo una donazione tramite [PayPal](https://paypal.me/jls).

---
Sviluppato con passione e innovazione da jls42.org, Babel Fish AI spinge la trascrizione e la traduzione verso nuovi orizzonti grazie all'intelligenza artificiale all'avanguardia.

**Questo documento è stato tradotto dalla versione fr alla lingua it utilizzando il modello o3-mini. Per ulteriori informazioni sul processo di traduzione, consulta https://gitlab.com/jls42/ai-powered-markdown-translator**

