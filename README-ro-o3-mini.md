# Babel Fish AI - Extensie de Transcriere Vocală și Traducere cu IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Pentru a utiliza extensia, veți avea nevoie de o cheie API OpenAI (sau de un furnizor terț dacă utilizați LiteLLM Proxy). Puteți genera o cheie API OpenAI aici: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI este o extensie Chrome inovatoare proiectată inițial pentru a oferi o transcriere vocală puternică. Transformați-vă vocea în text cu o precizie remarcabilă datorită API-ului Whisper de la OpenAI și beneficiați opțional de o traducere automată în timp real. Puteți utiliza Babel Fish AI exclusiv pentru transcriere sau puteți activa traducerea la volan, în funcție de nevoile dvs.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funcționalități

- **Transcriere Vocală Avansată**
  - Captură audio de înaltă calitate prin microfonul dispozitivului dvs.
  - Transcriere precisă realizată de API-ul Whisper de la OpenAI.
  - Suport multilingv pentru recunoașterea vocală și afișarea textului, permițând transcrierea intrărilor vocale în diferite limbi și afișarea rezultatelor (transcriere și traducere, dacă sunt activate) în limba aleasă.
  - Inserare automată a textului în câmpul activ sau afișare într-o fereastră de dialog dedicată.

- **Traducere și Reformulare Inteligente**
  - Traducere imediată a transcrierilor în diverse limbi, de activat după necesitate.
  - Reformulare a textului pentru a-i îmbunătăți stilul și claritatea.
  - Utilizarea unui model IA avansat pentru a garanta o traducere fidelă sensului original.
  - Alegere liberă de a utiliza exclusiv transcrierea sau de a combina transcrierea cu traducerea.

- **Meniu Contextual Puternic**
  - Opțiunea "Reformulează selecția" pentru a îmbunătăți instantaneu textele selectate.
  - Opțiunea "Traduce selecția" cu submeniu pentru toate limbile disponibile.
  - Înlocuire directă a textului selectat cu versiunea sa tradusă sau reformulată.
  - Integrare perfectă în interfața nativă a Chrome.

- **Interfață Utilizator Intuitivă și Personalizabilă**
  - Mod de afișare flexibil: zonă de intrare activă sau fereastră de dialog plutitoare.
  - Banner de stare configurabil cu alegere de culori, opacitate și durata de afișare.
  - Scurtătură de tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac) pentru a porni/opri înregistrarea.
  - Opțiunea "Păstrează deschis" pentru a controla durata de afișare a rezultatelor.
  - Iconiță personalizată, integrând un microfon și cifra "42", pentru o recunoaștere imediată.

- **Opțiuni Avansate**
    - Mod expert pentru configurații detaliate (URL-urile API, configurare pe domeniu etc.).
    - Posibilitatea de a personaliza modelele de transcriere și traducere.
    - Compatibilitate cu LiteLLM Proxy pentru a vă conecta la modele de limbaj alternative și a dezactiva jurnalizarea solicitărilor.
    - Gestionare completă a internaționalizării datorită fișierelor de limbă (_locales), oferind o interfață și suport vocal în mai multe limbi.

## 🌐 Limbi Suportate

Iată lista limbilor suportate de Babel Fish AI, cu linkuri către videoclipuri demonstrative:

- [Arabă](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [Germană](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [Engleză](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [Spaniolă](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [Franceză](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [Italiană](https://www.youtube.com/watch?v=QgYZt8myods)
- [Japoneză](https://www.youtube.com/watch?v=noHEJCnocH8)
- [Coreeană](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [Olandeză](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Poloneză](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Portugheză](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Română](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Suedeză](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Chineză](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Instalare

1.  **Descărcare și Instalare:**
    - Clonați acest depozit de pe GitHub sau descărcați manual dosarul extensiei.
    - **Sau instalați direct extensia din [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Deschideți Chrome și accesați `chrome://extensions/`.
    - Activați „Modul dezvoltator” în colțul din dreapta sus.
    - Faceți clic pe „Încărcați extensia neambalată” și selectați dosarul Babel Fish AI.

2.  **Verificare:**
    - Asigurați-vă că extensia apare în bara de instrumente a Chrome cu iconița personalizată.

## ⚙️ Configurare

1.  **Cheia API OpenAI:**
    *   Faceți clic pe iconița extensiei pentru a accesa opțiunile.
    *   Introduceți cheia API OpenAI (disponibilă pe [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizarea Opțiunilor:**
    *   Alegeți modul de afișare (zonă activă sau fereastră de dialog).
    *   Configurați culoarea, opacitatea și durata de afișare a bannerului de stare.
    *   Selectați limbile pentru transcriere (intrare vocală) și pentru afișarea textului.
    *   Activați sau dezactivați funcționalitatea de traducere în funcție de necesități.

3.  **(Opțional) Utilizarea cu LiteLLM Proxy:**
    *   Activați „Modul Expert” din opțiuni.
    *   În secțiunea „Configurare Avansată”, modificați **cele două URL-uri** ale API (Whisper și Traducere) pentru a indica instanța dvs. LiteLLM Proxy. **Utilizați același URL de bază pentru ambele.**
    *   Bifați opțiunea „NoLog (doar LiteLLM)” dacă doriți să dezactivați jurnalizarea solicitărilor de către LiteLLM.

## 🚀 Utilizare cu LiteLLM Proxy

Dacă doriți să utilizați modele de limbaj diferite de OpenAI, puteți utiliza LiteLLM Proxy. Iată cum se configurează:

Babel Fish AI este compatibil cu [LiteLLM Proxy](https://litellm.ai/), care permite utilizarea modelelor de limbaj alternative cu un API compatibil cu cel al OpenAI.

### Configurare

1.  **Instalați și configurați LiteLLM Proxy:** Urmați instrucțiunile de pe site-ul LiteLLM.
2.  **Configurați extensia Babel Fish AI:**
    *   În opțiunile extensiei (clic dreapta pe iconiță > Opțiuni), activați „Modul Expert”.
    *   În secțiunea „Configurare Avansată”, modificați **cele două URL-uri** ale API (Whisper și Traducere) pentru a indica instanța dvs. LiteLLM Proxy (de exemplu, `http://localhost:4000/v1/audio/transcriptions` și `http://localhost:4000/v1/chat/completions`). **Utilizați același URL de bază pentru ambele.**
    *   Bifați opțiunea „NoLog (doar LiteLLM)” dacă doriți să dezactivați jurnalizarea solicitărilor de către LiteLLM.

**Important:** Opțiunea „NoLog” este concepută **exclusiv** pentru a fi utilizată cu LiteLLM Proxy. **Nu o activați** dacă utilizați API-ul oficial OpenAI, deoarece acest lucru va genera o eroare și va împiedica funcționarea traducerii.

## 🛠️ Funcționare Tehnică

### Arhitectura Extensiei

Extensia este compusă din mai multe fișiere JavaScript care interacționează între ele:

#### Fișiere Principale

*   **`manifest.json`:** Fișierul principal de configurare al extensiei. Definește permisiunile, scripturile, resursele accesibile etc. Utilizează versiunea 3 a manifestului și declară permisiunile `activeTab`, `storage`, `commands`, `scripting` și `contextMenus`.
*   **`background.js`:** Service worker-ul care rulează în fundal. Gestionează evenimentele (clic pe iconiță, scurtături de tastatură, meniu contextual), injectează `content script` dacă este necesar și comunică cu `content script`.
*   **`content.js`:** Scriptul principal care este injectat în paginile web. Coordonează diferitele module utilitare și gestionează fluxul general al extensiei.
*   **`src/constants.js`:** Definește constantele pentru configurare, stări, acțiuni etc.

#### Module Utilitare

Extensia utilizează o arhitectură modulară cu mai multe fișiere utilitare specializate:

##### Gestionarea API-urilor și Procesarea Datelor

*   **`src/utils/api.js`:** Conține funcțiile care permit interacțiunea cu API-urile, în special `transcribeAudio` pentru a apela API-ul Whisper de la OpenAI.
*   **`src/utils/api-utils.js`:** Funcții avansate pentru interacțiunea cu API-urile externe.
*   **`src/utils/translation.js`:** Conține funcțiile `translateText` și `rephraseText` pentru a apela API-ul GPT de la OpenAI.
*   **`src/utils/text-translation.js`:** Funcții specializate pentru traducerea și reformularea textului.
*   **`src/utils/text-processing.js`:** Funcții de procesare generală a textului.

##### Interfață Utilizator și Interacțiune

*   **`src/utils/ui.js`:** Funcții utilitare generale pentru interfața de utilizator.
*   **`src/utils/banner-utils.js`:** Gestionează bannerul de stare, controalele acestuia și selectorul de limbă.
*   **`src/utils/focus-utils.js`:** Gestionează salvarea și restaurarea focusului și a selecției de text.
*   **`src/utils/transcription-display.js`:** Gestionează afișarea rezultatelor transcrierii.
*   **`src/utils/error-utils.js`:** Gestionează afișarea și procesarea erorilor.
*   **`src/styles/content.css`:** Stiluri CSS pentru interfața de utilizator injectată în paginile web.

##### Înregistrare și Evenimente

*   **`src/utils/recording-utils.js`:** Gestionează înregistrarea audio prin microfon și procesarea datelor audio.
*   **`src/utils/event-handlers.js`:** Conține gestionarii de evenimente pentru interacțiunea cu utilizatorul.

##### Internaționalizare și Limbi

*   **`src/utils/languages.js`:** Definește limbile suportate de extensie.
*   **`src/utils/languages-shared.js`:** Definește lista limbilor suportate pentru contextul paginii web.
*   **`src/utils/languages-data.js`:** Definește lista limbilor suportate pentru service worker.
*   **`src/utils/i18n.js`:** Gestionează internaționalizarea pentru interfața de utilizator.

##### Pagina de Opțiuni

*   **`src/pages/options/`:** Conține fișierele pentru pagina de opțiuni a extensiei (HTML, CSS, JavaScript).

### Procesul de Transcriere și Traducere

#### Funcționalitatea principală de transcriere vocală

1.  **Pornirea Înregistrării:** Utilizatorul pornește înregistrarea făcând clic pe iconița extensiei sau utilizând scurtătura de tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac). Scriptul din fundal trimite un mesaj către scriptul de conținut pentru a porni înregistrarea.
2.  **Captură Audio:** Scriptul de conținut utilizează API-ul `navigator.mediaDevices.getUserMedia` pentru a accesa microfonul și a înregistra audio prin intermediul API-ului MediaRecorder.
3.  **Transcriere:** Scriptul de conținut utilizează funcția `transcribeAudio` (`src/utils/api.js`) pentru a trimite audio-ul către API-ul Whisper de la OpenAI. API-ul returnează textul transcris.
4.  **Traducere sau Reformulare (Opțională):**
   - Dacă opțiunea de traducere este activată, scriptul de conținut utilizează funcția `translateText` (`src/utils/translation.js`) pentru a trimite textul transcris către API-ul GPT de la OpenAI.
   - Dacă opțiunea de reformulare este activată, se utilizează funcția `rephraseText` pentru a îmbunătăți textul transcris.
5.  **Afișare:** Scriptul de conținut afișează textul procesat fie în elementul activ al paginii (dacă este un câmp de text sau un element editabil), fie într-o fereastră de dialog personalizată.

#### Funcționalitatea meniului contextual

1. **Selecția Textului:** Utilizatorul selectează text pe o pagină web.
2. **Meniu Contextual:** Un clic dreapta afișează opțiunile „Reformulează selecția” sau „Traduce selecția” cu un submeniu al limbilor disponibile.
3. **Procesare:** În funcție de opțiunea aleasă:
   - Textul este trimis pentru reformulare prin funcția `rephraseText`
   - Textul este trimis pentru traducere prin funcția `translateText` cu limba țintă selectată
4. **Afișare:** Rezultatul înlocuiește selecția inițială în elementul în care se află textul selectat.

### Comunicare

Comunicarea dintre scriptul de fundal și scriptul de conținut se realizează prin API-ul de mesagerie Chrome (`chrome.runtime.sendMessage` și `chrome.runtime.onMessage`).

### Stocarea Datelor

Extensia utilizează `chrome.storage.sync` pentru a stoca:

*   Cheia API OpenAI (`apiKey`).
*   Opțiunile extensiei (afișare, traducere, culorile bannerului etc.).
*   Preferințele de limbă pentru traducere.

Aceste date sunt stocate local pe computerul dvs., în stocarea extensiei Chrome.

### Gestionarea Erorilor
Erorile posibile (cheie API lipsă, eroare de transcriere etc.) sunt definite în fișierul `constants.js`. Funcțiile din `api.js` și `translation.js` gestionează erorile potențiale ale apelurilor către API. Scriptul de conținut afișează mesajele de eroare utilizatorului printr-un banner în partea de sus a paginii.

## 🛡️ Securitate și Confidențialitate

- **Protecția Datelor:**
  - Cheia API este stocată în siguranță în Chrome.
  - Extensia nu stochează datele audio; toate prelucrările se efectuează în timp real.
  - Comunicarea cu API-urile se face prin conexiuni HTTPS securizate.

Pentru informații complete despre modul în care BabelFishAI gestionează datele dvs., vă rugăm să consultați [Politica de Confidențialitate](PRIVACY.md).

## 🔧 Depanare

- **Probleme cu Microfonul:**
  - Verificați permisiunile de acces la microfon în Chrome.
  - Asigurați-vă că nicio altă aplicație nu utilizează microfonul simultan.

- **Erori de Transcriere/Traducere:**
  - Verificați dacă cheia API este validă și activă.
  - Asigurați-vă că aveți o conexiune la internet stabilă.
  - Consultați consola Chrome pentru a obține loguri detaliate în caz de eroare.

## 🤝 Contribuții

Contribuțiile și sugestiile sunt binevenite. Pentru a contribui:
- Raportați erorile prin secțiunea Issues de pe GitHub.
- Propuneți îmbunătățiri sau funcționalități noi.
- Trimiteți pull request-uri.

## 📄 Licență

Această extensie este distribuită sub licența GNU Affero General Public License v3.0 (AGPL-3.0). Consultați fișierul LICENSE pentru mai multe detalii.

## 💝 Susținere

Dacă vă place această extensie, puteți susține dezvoltarea sa printr-o donație via [PayPal](https://paypal.me/jls).
---
Dezvoltat de jls42.org cu pasiune și inovație, Babel Fish AI propulsează transcrierea și traducerea spre noi orizonturi, datorită inteligenței artificiale de ultimă oră.

**Acest document a fost tradus din versiunea fr în limba ro folosind modelul o3-mini. Pentru mai multe informații despre procesul de traducere, consultați https://gitlab.com/jls42/ai-powered-markdown-translator**

