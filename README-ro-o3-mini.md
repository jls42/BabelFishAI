# Babel Fish AI - Extensie de Transcriere Vocală și Traducere cu IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Pentru a utiliza extensia, veți avea nevoie de o cheie API OpenAI (sau de un furnizor terț dacă utilizați LiteLLM Proxy). Puteți genera o cheie API OpenAI aici: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI este o extensie Chrome inovatoare concepută inițial pentru a oferi o transcriere vocală puternică. Transformați vocea în text cu o precizie remarcabilă datorită API-ului Whisper de la OpenAI și beneficiați opțional de o traducere automată în timp real. Puteți utiliza Babel Fish AI exclusiv pentru transcriere sau activa traducerea la cerere, în funcție de nevoile dvs.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Funcționalități

- **Transcriere Vocală Avansată**
  - Captură audio de înaltă calitate prin microfonul dispozitivului dvs.
  - Transcriere precisă realizată de API-ul Whisper de la OpenAI.
  - Suport multilingv pentru recunoașterea vocală și afișarea textului, permițând transcrierea intrărilor vocale în diferite limbi și afișarea rezultatelor (transcriere și traducere, dacă este activată) în limba dorită.
  - Inserarea automată a textului în câmpul activ sau afișarea într-o casetă de dialog dedicată.

- **Traducere Automată Integrată (Opțională)**
  - Traducere imediată a transcrierilor în diverse limbi, de activat după necesități.
  - Utilizarea unui model de IA avansat pentru a garanta o traducere fidelă sensului original.
  - Libertatea de a utiliza exclusiv transcrierea sau de a combina transcrierea cu traducerea.

- **Interfață Utilizator Intuitivă și Personalizabilă**
  - Modul de afișare flexibil: zonă de introducere activă sau fereastră de dialog plutitoare.
  - Panglică de stare configurabilă cu alegerea culorilor, a opacității și a duratei de afișare.
  - Scurtătură de tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac) pentru a porni/oprire înregistrarea.
  - Icoană personalizată, integrând un microfon și cifra „42”, pentru o recunoaștere imediată.

- **Opțiuni Avansate**
    - Modul expert pentru configurații detaliate (URL-urile API, configurarea pe domenii etc.).
    - Posibilitatea de a personaliza modelele de transcriere și traducere.
    - Compatibilitate cu LiteLLM Proxy pentru a vă conecta la modele alternative de limbaj și pentru a dezactiva jurnalizarea cererilor.
    - Gestionarea completă a internaționalizării datorită fișierelor de limbă (_locales), oferind o interfață și suport vocal în mai multe limbi.

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
    - Faceți clic pe „Încărcare extensie neambalată” și selectați dosarul Babel Fish AI.

2.  **Verificare:**
    - Asigurați-vă că extensia apare în bara de instrumente a Chrome cu icoana personalizată.

## ⚙️ Configurare

1.  **Cheia API OpenAI:**
    *   Faceți clic pe icoana extensiei pentru a accesa opțiunile.
    *   Introduceți cheia API OpenAI (disponibilă pe [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizarea Opțiunilor:**
    *   Alegeți modul de afișare (zonă activă sau casetă de dialog).
    *   Configurați culoarea, opacitatea și durata de afișare a panglicii de stare.
    *   Selectați limbile pentru transcriere (intrare vocală) și pentru afișarea textului.
    *   Activați sau dezactivați funcționalitatea de traducere conform nevoilor dvs.

3.  **(Opțional) Utilizare cu LiteLLM Proxy:**
    *   Activați „Modul Expert” în opțiuni.
    *   În secțiunea „Configurare Avansată”, modificați **cele două URL-uri** ale API-urilor (Whisper și Traducere) pentru a indica instanța dvs. LiteLLM Proxy. **Utilizați același URL de bază pentru ambele.**
    *   Bifați opțiunea „NoLog (doar LiteLLM)” dacă doriți să dezactivați jurnalizarea cererilor de către LiteLLM.

## 🚀 Utilizare cu LiteLLM Proxy

Dacă doriți să utilizați modele de limbaj diferite de cele ale OpenAI, puteți utiliza LiteLLM Proxy. Iată cum se configurează:

Babel Fish AI este compatibil cu [LiteLLM Proxy](https://litellm.ai/), care permite utilizarea modelelor alternative de limbaj cu un API compatibil cu cel al OpenAI.

### Configurare

1.  **Instalați și configurați LiteLLM Proxy:** Urmați instrucțiunile de pe site-ul LiteLLM.
2.  **Configurați extensia Babel Fish AI:**
    *   În opțiunile extensiei (clic dreapta pe icoană > Opțiuni), activați „Modul Expert”.
    *   În secțiunea „Configurare Avansată”, modificați **cele două URL-uri** ale API-urilor (Whisper și Traducere) pentru a indica instanța dvs. LiteLLM Proxy (de exemplu, `http://localhost:4000/v1/audio/transcriptions` și `http://localhost:4000/v1/chat/completions`). **Utilizați același URL de bază pentru ambele.**
    *   Bifați opțiunea „NoLog (doar LiteLLM)” dacă doriți să dezactivați jurnalizarea cererilor de către LiteLLM.

**Important:** Opțiunea „NoLog” este concepută **exclusiv** pentru a fi utilizată cu LiteLLM Proxy. **Nu o activați** dacă utilizați API-ul oficial OpenAI, deoarece va genera o eroare și va împiedica funcționarea traducerii.

## 🛠️ Funcționare Tehnică

### Arhitectura Extensiei

Extensia este compusă din mai multe fișiere JavaScript care interacționează între ele:

*   **`manifest.json`:** Fișierul de configurare principal al extensiei. Definește permisiunile, scripturile, resursele accesibile etc. Folosește versiunea 3 a manifestului și declară permisiunile `activeTab`, `storage`, `commands` și `scripting`. Scripturile de conținut (`content_scripts`) sunt injectate în toate URL-urile și se execută la sfârșitul încărcării documentului.
*   **`background.js`:** Service worker-ul care rulează în fundal. Gestionează evenimentele (clic pe icoană, scurtături de tastatură), injectează scriptul de conținut dacă este necesar și comunică cu acesta.
*   **`content.js`:** Scriptul care este injectat în paginile web. Interacționează direct cu DOM-ul, capturează audio de la microfon, apelează API-urile de transcriere și traducere și afișează rezultatele.
*   **`src/utils/api.js`:** Conține funcția `transcribeAudio` pentru a apela API-ul Whisper de la OpenAI (transcriere).
*   **`src/utils/translation.js`:** Conține funcția `translateText` pentru a apela API-ul GPT de la OpenAI (traducere).
*   **`src/utils/ui.js`:** Conține funcții utilitare pentru gestionarea interfeței utilizator (panglică, casetă de dialog, buton de copiere).
*   **`src/constants.js`:** Definește constante pentru configurare, stări, acțiuni etc.
*   **`src/pages/options/`:** Conține fișierele pentru pagina de opțiuni a extensiei (HTML, CSS, JavaScript).

### Procesul de Transcriere și Traducere

1.  **Pornirea Înregistrării:** Utilizatorul pornește înregistrarea făcând clic pe icoana extensiei sau utilizând scurtătura de tastatură. Scriptul de fundal (`background script`) trimite un mesaj scriptului de conținut pentru a porni înregistrarea.
2.  **Captură Audio:** Scriptul de conținut utilizează API-ul `navigator.mediaDevices.getUserMedia` pentru a accesa microfonul și a înregistra audio.
3.  **Transcriere:** Scriptul de conținut utilizează funcția `transcribeAudio` (`src/utils/api.js`) pentru a trimite audio către API-ul Whisper de la OpenAI. API-ul returnează textul transcris.
4.  **Traducere (Opțională):** Dacă opțiunea de traducere este activată, scriptul de conținut utilizează funcția `translateText` (`src/utils/translation.js`) pentru a trimite textul transcris către API-ul GPT de la OpenAI. API-ul returnează textul tradus.
5.  **Afișare:** Scriptul de conținut afișează textul transcris (și, eventual, tradus) fie în elementul activ al paginii (dacă este un câmp de text sau un element editabil), fie într-o casetă de dialog.

### Comunicare

Comunicarea dintre scriptul de fundal și scriptul de conținut se face prin API-ul de mesagerie Chrome (`chrome.runtime.sendMessage` și `chrome.runtime.onMessage`).

### Stocarea Datelor

Extensia utilizează `chrome.storage.sync` pentru a stoca:

*   Cheia API OpenAI (`apiKey`).
*   Opțiunile extensiei (afișare, traducere, culorile panglicii etc.).

Aceste date sunt stocate local pe computerul dvs., în stocarea extensiei Chrome.

### Gestionarea Erorilor

Erorile posibile (cheie API lipsă, eroare de transcriere etc.) sunt definite în fișierul `constants.js`. Funcțiile din `api.js` și `translation.js` gestionează erorile potențiale ale apelurilor API. Scriptul `content.js` afișează mesajele de eroare utilizatorului printr-o panglică în partea de sus a paginii.

## 🛡️ Securitate și Confidențialitate

- **Protecția Datelor:**
  - Cheia API este stocată în mod sigur în Chrome.
  - Extensia nu păstrează datele audio; toate prelucrările se efectuează în timp real.
  - Comunicarea cu API-urile se face prin conexiuni HTTPS securizate.

Pentru informații complete despre modul în care BabelFishAI gestionează datele dvs., vă rugăm să consultați [Politica de Confidențialitate](PRIVACY.md).

## 🔧 Remediere

- **Probleme cu Microfonul:**
  - Verificați permisiunile de acces la microfon în Chrome.
  - Asigurați-vă că nicio altă aplicație nu utilizează microfonul simultan.

- **Erori de Transcriere/Traducere:**
  - Verificați că cheia API este validă și activă.
  - Asigurați-vă că aveți o conexiune la internet stabilă.
  - Consultați consola Chrome pentru a obține jurnale detaliate în caz de eroare.

## 🤝 Contribuții

Contribuțiile și sugestiile sunt binevenite. Pentru a contribui:
- Raportați bug-urile prin secțiunea Issues de pe GitHub.
- Propuneți îmbunătățiri sau funcționalități noi.
- Trimiteți pull requests.

## 📄 Licență

Această extensie este distribuită sub licența GNU Affero General Public License v3.0 (AGPL-3.0). Consultați fișierul LICENSE pentru mai multe detalii.

## 💝 Suport

Dacă apreciați această extensie, puteți susține dezvoltarea sa printr-o donație pe [PayPal](https://paypal.me/jls).
---
Dezvoltat de jls42.org cu pasiune și inovație, Babel Fish AI propulsează transcrierea și traducerea către noi orizonturi datorită inteligenței artificiale de ultimă oră.

**Acest document a fost tradus din versiunea fr în limba ro folosind modelul o3-mini. Pentru mai multe informații despre procesul de traducere, consultați https://gitlab.com/jls42/ai-powered-markdown-translator**

