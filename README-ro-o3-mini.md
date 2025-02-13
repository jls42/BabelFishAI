# Babel Fish AI - Extensie de Transcriere Vocală și Traducere cu IA

Babel Fish AI este o extensie Chrome inovatoare concepută inițial pentru a oferi o transcriere vocală puternică. Transformați-vă vocea în text cu o precizie remarcabilă datorită API-ului Whisper de la OpenAI și beneficiați, opțional, de o traducere automată în timp real. Puteți utiliza Babel Fish AI exclusiv pentru transcriere sau activa traducerea din mers, în funcție de nevoile dvs.

## 🌟 Funcționalități

- **Transcriere Vocală Avansată**
  - Captură audio de înaltă calitate prin microfonul dispozitivului dvs.
  - Transcriere precisă realizată de API-ul Whisper de la OpenAI.
  - Suport multilingv pentru procesarea vocii și afișarea textului, permițând transcrierea intrărilor vocale în diferite limbi și afișarea rezultatelor în limba aleasă.
  - Inserare automată a textului în câmpul activ sau afișare într-o casetă de dialog dedicată.

- **Traducere Automată Integrată (Opțională)**
  - Traducere imediată a transcrierilor în diverse limbi, activabilă după nevoie.
  - Utilizarea unui model IA avansat pentru a garanta o traducere fidelă sensului original.
  - Alegere liberă între utilizarea exclusivă a transcrierii sau combinarea transcrierii cu traducerea.

- **Interfață Utilizator Intuitivă și Personalizabilă**
  - Mod de afișare flexibil: zonă de introducere activă sau fereastră de dialog plutitoare.
  - Panglică de stare configurabilă cu alegerea culorilor, opacității și duratei de afișare.
  - Scurtătură de la tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac) pentru a porni/opri înregistrarea.
  - Pictogramă personalizată, integrând un microfon și cifra „42”, pentru o recunoaștere imediată.

- **Opțiuni Avansate**
  - Mod expert pentru configurări detaliate (URL-urile API, configurare pe domenii etc.).
  - Posibilitatea de a personaliza modelele de transcriere și traducere.
  - **Compatibilitate cu LiteLLM Proxy pentru a utiliza modele de limbaj alternative și a dezactiva jurnalizarea cererilor.**
  - Gestionare completă a internaționalizării datorită fișierelor de limbă (_locales), oferind o interfață și suport vocal în mai multe limbi.

## 🌐 Limbi Suportate

- Arabă
- Germană
- Engleză
- Spaniolă
- Franceză
- Hindi
- Italiană
- Japoneză
- Coreeană
- Olandeză
- Poloneză
- Portugheză
- Română
- Suedeză
- Chineză

## 🚀 Instalare

1.  **Descărcare și Instalare:**
    - Clonați acest depozit de pe GitHub sau descărcați manual dosarul extensiei.
    - Deschideți Chrome și accesați `chrome://extensions/`.
    - Activați „Modul dezvoltator” în partea de sus, spre dreapta.
    - Faceți clic pe „Încărcați extensia neîmpachetată” și selectați dosarul Babel Fish AI.

2.  **Verificare:**
    - Asigurați-vă că extensia apare în bara de instrumente a Chrome, cu pictograma personalizată.

## ⚙️ Configurare

1.  **Cheie API OpenAI:**
    *   Faceți clic pe pictograma extensiei pentru a accesa opțiunile.
    *   Introduceți cheia API OpenAI (disponibilă pe [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizarea Opțiunilor:**
    *   Alegeți modul de afișare (zonă activă sau casetă de dialog).
    *   Configurați culoarea, opacitatea și durata de afișare a panglicii de stare.
    *   Selectați limbile pentru transcriere (intrare vocală) și pentru afișarea textului.
    *   Activați sau dezactivați funcționalitatea de traducere în funcție de nevoile dvs.

3.  **(Opțional) Utilizare cu LiteLLM Proxy:**
    *   Activați „Modul Expert” în opțiuni.
    *   În secțiunea „Configurare Avansată”, modificați **cele două URL-uri** ale API-urilor (Whisper și Traducere) pentru a indica instanța dvs. LiteLLM Proxy. **Utilizați același URL de bază pentru ambele.**
    *   Bifați opțiunea „NoLog (doar LiteLLM)” dacă doriți să dezactivați jurnalizarea cererilor de către LiteLLM.

## 🚀 Utilizare cu LiteLLM Proxy

Babel Fish AI este compatibil cu [LiteLLM Proxy](https://litellm.ai/), care permite utilizarea modelelor de limbaj alternative cu un API compatibil cu cel al OpenAI.

### Configurare

1.  **Instalați și configurați LiteLLM Proxy:** Urmați instrucțiunile de pe site-ul LiteLLM.
2.  **Configurați extensia Babel Fish AI:**
    *   În opțiunile extensiei (clic dreapta pe pictogramă > Opțiuni), activați „Modul Expert”.
    *   În secțiunea „Configurare Avansată”, modificați **cele două URL-uri** ale API-urilor (Whisper și Traducere) pentru a indica instanța dvs. LiteLLM Proxy (de exemplu, `http://localhost:4000/v1/audio/transcriptions` și `http://localhost:4000/v1/chat/completions`). **Utilizați același URL de bază pentru ambele.**
    *   Bifați opțiunea „NoLog (doar LiteLLM)” dacă doriți să dezactivați jurnalizarea cererilor de către LiteLLM.

**Important:** Opțiunea „NoLog” este concepută **exclusiv** pentru a fi utilizată cu LiteLLM Proxy. **Nu o activați** dacă utilizați API-ul oficial OpenAI, deoarece acest lucru va genera o eroare și va împiedica funcționarea traducerii.

## 🛠️ Funcționare Tehnică

### Arhitectura Extensiei

Extensia este compusă din mai multe fișiere JavaScript care interacționează între ele:

*   **`manifest.json`:** Fișierul principal de configurare al extensiei. Definește permisiunile, scripturile, resursele accesibile etc. Folosește versiunea 3 a manifestului și declară permisiunile `activeTab`, `storage`, `commands` și `scripting`. `content_scripts` sunt injectate în toate URL-urile și se execută la sfârșitul încărcării documentului.
*   **`background.js`:** Service worker-ul care rulează în fundal. Gestionează evenimentele (clic pe pictogramă, scurtături de la tastatură), injectează `content script` dacă este necesar și comunică cu `content script`.
*   **`content.js`:** Scriptul care este injectat în paginile web. Interacționează direct cu DOM-ul, capturează audio de la microfon, apelează API-urile de transcriere și traducere și afișează rezultatele.
*   **`src/utils/api.js`:** Conține funcția `transcribeAudio` pentru a apela API-ul Whisper de la OpenAI (transcriere).
*   **`src/utils/translation.js`:** Conține funcția `translateText` pentru a apela API-ul GPT de la OpenAI (traducere).
*   **`src/utils/ui.js`:** Conține funcții utilitare pentru gestionarea interfeței utilizator (banner, casetă de dialog, buton de copiere).
*   **`src/constants.js`:** Definește constante pentru configurare, stări, acțiuni etc.
*   **`src/pages/options/`:** Conține fișierele pentru pagina de opțiuni a extensiei (HTML, CSS, JavaScript).

### Procesul de Transcriere și Traducere

1.  **Pornirea Înregistrării:** Utilizatorul pornește înregistrarea făcând clic pe pictograma extensiei sau folosind scurtătura de la tastatură. Scriptul de fundal trimite un mesaj către scriptul de conținut pentru a porni înregistrarea.
2.  **Capturarea Audio:** Scriptul de conținut utilizează API-ul `navigator.mediaDevices.getUserMedia` pentru a accesa microfonul și a înregistra audio.
3.  **Transcriere:** Scriptul de conținut folosește funcția `transcribeAudio` (`src/utils/api.js`) pentru a trimite audio către API-ul Whisper de la OpenAI. API-ul returnează textul transcris.
4.  **Traducere (Opțională):** Dacă opțiunea de traducere este activată, scriptul de conținut folosește funcția `translateText` (`src/utils/translation.js`) pentru a trimite textul transcris către API-ul GPT de la OpenAI. API-ul returnează textul tradus.
5.  **Afișare:** Scriptul de conținut afișează textul transcris (și, eventual, tradus) fie în elementul activ al paginii (dacă este un câmp de text sau un element editabil), fie într-o casetă de dialog.

### Comunicare

Comunicarea între scriptul de fundal și scriptul de conținut se realizează prin API-ul de mesagerie de la Chrome (`chrome.runtime.sendMessage` și `chrome.runtime.onMessage`).

### Stocarea Datelor

Extensia utilizează `chrome.storage.sync` pentru a stoca:

*   Cheia API OpenAI (`apiKey`).
*   Opțiunile extensiei (afișare, traducere, culorile panglicii etc.).

### Gestionarea Erorilor

Erorile posibile (cheie API lipsă, eroare de transcriere etc.) sunt definite în fișierul `constants.js`. Funcțiile din `api.js` și `translation.js` gestionează erorile potențiale ale apelurilor API. Scriptul `content.js` afișează mesajele de eroare utilizatorului printr-un banner în partea de sus a paginii.

## 🛡️ Securitate și Confidențialitate

- **Protecția Datelor:**
  - Cheia API este stocată în siguranță în Chrome.
  - Extensia nu păstrează datele audio; toate procesările se efectuează în timp real.
  - Comunicarea cu API-urile se face prin conexiuni HTTPS securizate.

## 🔧 Depanare

- **Probleme cu Microfonul:**
  - Verificați permisiunile de acces la microfon în Chrome.
  - Asigurați-vă că nicio altă aplicație nu utilizează microfonul simultan.

- **Erori la Transcriere/Traducere:**
  - Verificați dacă cheia API este validă și activă.
  - Asigurați-vă că aveți o conexiune stabilă la internet.
  - Consultați consola Chrome pentru a obține log-uri detaliate în caz de eroare.

## 🤝 Contribuții

Contribuțiile și sugestiile sunt binevenite. Pentru a contribui:
- Raportați erorile prin secțiunea Issues de pe GitHub.
- Propuneți îmbunătățiri sau funcționalități noi.
- Trimiteți pull request-uri.

## 📄 Licență

Această extensie este distribuită sub licența GNU Affero General Public License v3.0 (AGPL-3.0). Consultați fișierul LICENSE pentru mai multe detalii.

## 💝 Susținere

Dacă apreciați această extensie, puteți susține dezvoltarea sa printr-o donație via [PayPal](https://paypal.me/jls).

---
Dezvoltat de jls42.org cu pasiune și inovație, Babel Fish AI propulsează transcrierea și traducerea spre noi orizonturi datorită inteligenței artificiale de ultimă generație.

**Acest document a fost tradus din versiunea fr în limba ro folosind modelul o3-mini. Pentru mai multe informații despre procesul de traducere, consultați https://gitlab.com/jls42/ai-powered-markdown-translator**

