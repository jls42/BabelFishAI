# Babel Fish AI - Extensie de Transcriere Vocală și Traducere cu IA

**Pentru a utiliza extensia, aveți nevoie de o cheie API OpenAI (sau de un furnizor terț dacă folosiți LiteLLM Proxy). Puteți genera o cheie API OpenAI aici : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI este o extensie Chrome inovatoare, concepută inițial pentru a oferi o transcriere vocală puternică. Transformă-ți vocea în text cu o precizie remarcabilă datorită API-ului Whisper de la OpenAI și beneficiază, opțional, de o traducere automată în timp real. Puteți utiliza Babel Fish AI exclusiv pentru transcriere sau puteți activa traducerea din mers, în funcție de nevoile dvs.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Funcționalități

- **Transcriere Vocală Avansată**
  - Captare audio de înaltă calitate prin microfonul dispozitivului dvs.
  - Transcriere precisă realizată de API-ul Whisper de la OpenAI.
  - Suport multilingv pentru recunoașterea vocală și afișarea textului, permițând transcrierea intrărilor vocale în diferite limbi și afișarea rezultatelor (transcriere și traducere, dacă este activată) în limba aleasă.
  - Inserare automată a textului în câmpul activ sau afișare într-o fereastră de dialog dedicată.

- **Traducere Automată Integrată (Opțională)**
  - Traducere imediată a transcrierilor în diverse limbi, de activat dacă este nevoie.
  - Utilizarea unui model AI avansat pentru a garanta o traducere fidelă sensului original.
  - Alegere liberă de a utiliza exclusiv transcrierea sau de a combina transcrierea și traducerea.

- **Interfață Utilizator Intuitivă și Personalizabilă**
  - Mod de afișare flexibil: zonă de introducere activă sau fereastră de dialog plutitoare.
  - Bara de stare configurabilă cu opțiuni de culori, opacitate și durata de afișare.
  - Scurtătură de tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac) pentru a porni/oprire înregistrarea.
  - Pictogramă personalizată, integrând un microfon și cifra “42”, pentru o recunoaștere imediată.

- **Opțiuni Avansate**
  - Mod expert pentru configurări detaliate (URL-urile API, configurare pe domenii, etc.).
  - Posibilitatea de a personaliza modelele de transcriere și traducere.
  - Compatibilitate cu LiteLLM Proxy pentru a vă conecta la modele de limbaj alternative și a dezactiva jurnalizarea solicitărilor.
  - Gestionare completă a internaționalizării datorită fișierelor de limbă (_locales), oferind o interfață și suport vocal în mai multe limbi.

## 🌐 Limbi Susținute

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

1.  **Descărcare și Instalare :**
    - Clonați acest depozit de pe GitHub sau descărcați manual dosarul extensiei.
    - Deschideți Chrome și accesați `chrome://extensions/`.
    - Activați „Modul dezvoltator” în partea de sus dreapta.
    - Faceți clic pe „Încărcați extensia neambalată” și selectați dosarul Babel Fish AI.

2.  **Verificare :**
    - Asigurați-vă că extensia apare în bara de instrumente Chrome cu pictograma personalizată.

## ⚙️ Configurare

1.  **Cheie API OpenAI :**
    *   Faceți clic pe pictograma extensiei pentru a accesa opțiunile.
    *   Introduceți cheia dvs. API OpenAI (disponibilă pe [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizarea opțiunilor :**
    *   Alegeți modul de afișare (zonă activă sau fereastră de dialog).
    *   Configurați culoarea, opacitatea și durata de afișare a barei de stare.
    *   Selectați limbile pentru transcriere (intrare vocală) și pentru afișarea textului.
    *   Activați sau dezactivați funcționalitatea de traducere în funcție de nevoile dvs.

3.  **(Opțional) Utilizare cu LiteLLM Proxy :**
    *   Activați „Modul Expert” în opțiuni.
    *   În secțiunea „Configurare Avansată”, modificați **cele două URL-uri** ale API-urilor (Whisper și Traducere) pentru a indica instanța dvs. LiteLLM Proxy. **Utilizați aceeași bază URL pentru ambele.**
    *   Bifați opțiunea „NoLog (doar LiteLLM)” dacă doriți să dezactivați jurnalizarea solicitărilor de către LiteLLM.

## 🚀 Utilizare cu LiteLLM Proxy

Dacă doriți să utilizați modele de limbaj diferite de cele de la OpenAI, puteți folosi LiteLLM Proxy. Iată cum să îl configurați:

Babel Fish AI este compatibil cu [LiteLLM Proxy](https://litellm.ai/), care permite utilizarea modelelor de limbaj alternative cu o API compatibilă cu cea a OpenAI.

### Configurare

1.  **Instalați și configurați LiteLLM Proxy :** Urmați instrucțiunile de pe site-ul LiteLLM.
2.  **Configurați extensia Babel Fish AI :**
    *   În opțiunile extensiei (clic dreapta pe pictogramă > Opțiuni), activați „Modul Expert”.
    *   În secțiunea „Configurare Avansată”, modificați **cele două URL-uri** ale API-urilor (Whisper și Traducere) pentru a indica instanța dvs. LiteLLM Proxy (de exemplu, `http://localhost:4000/v1/audio/transcriptions` și `http://localhost:4000/v1/chat/completions`). **Utilizați aceeași bază URL pentru ambele.**
    *   Bifați opțiunea „NoLog (doar LiteLLM)” dacă doriți să dezactivați jurnalizarea solicitărilor de către LiteLLM.

**Important :** Opțiunea „NoLog” este concepută **exclusiv** pentru a fi utilizată cu LiteLLM Proxy. **Nu o activați** dacă utilizați API-ul oficial OpenAI, deoarece acest lucru va cauza o eroare și va împiedica funcționarea traducerii.

## 🛠️ Funcționare Tehnică

### Arhitectura Extensiei

Extensia este compusă din mai multe fișiere JavaScript care interacționează între ele:

*   **`manifest.json`:** Fișierul principal de configurare al extensiei. Definește permisiunile, scripturile, resursele accesibile etc. Utilizează versiunea 3 a manifestului și declară permisiunile `activeTab`, `storage`, `commands` și `scripting`. `content_scripts` sunt injectate în toate URL-urile și rulează la finalul încărcării documentului.
*   **`background.js`:** Service worker-ul care rulează în fundal. Gestionează evenimentele (clic pe pictogramă, scurtături de tastatură), injectează scriptul de conținut, dacă este necesar, și comunică cu scriptul de conținut.
*   **`content.js`:** Scriptul care este injectat în paginile web. Interacționează direct cu DOM-ul, capturează audio de la microfon, apelează API-urile de transcriere și traducere și afișează rezultatele.
*   **`src/utils/api.js`:** Conține funcția `transcribeAudio` pentru a apela API-ul Whisper de la OpenAI (transcriere).
*   **`src/utils/translation.js`:** Conține funcția `translateText` pentru a apela API-ul GPT de la OpenAI (traducere).
*   **`src/utils/ui.js`:** Conține funcții utilitare pentru a gestiona interfața utilizator (banner, fereastră de dialog, buton de copiere).
*   **`src/constants.js`:** Definește constante pentru configurări, stări, acțiuni, etc.
*   **`src/pages/options/`:** Conține fișierele pentru pagina de opțiuni a extensiei (HTML, CSS, JavaScript).

### Procesul de Transcriere și Traducere

1.  **Pornirea Înregistrării :** Utilizatorul pornește înregistrarea făcând clic pe pictograma extensiei sau folosind scurtătura de tastatură. Scriptul de fundal trimite un mesaj către scriptul de conținut pentru a porni înregistrarea.
2.  **Captare Audio :** Scriptul de conținut utilizează API-ul `navigator.mediaDevices.getUserMedia` pentru a accesa microfonul și a înregistra audio.
3.  **Transcriere :** Scriptul de conținut folosește funcția `transcribeAudio` (`src/utils/api.js`) pentru a trimite audio către API-ul Whisper de la OpenAI. API-ul returnează textul transcris.
4.  **Traducere (Opțională) :** Dacă opțiunea de traducere este activată, scriptul de conținut folosește funcția `translateText` (`src/utils/translation.js`) pentru a trimite textul transcris către API-ul GPT de la OpenAI. API-ul returnează textul tradus.
5.  **Afișare :** Scriptul de conținut afișează textul transcris (și eventual tradus) fie în elementul activ al paginii (dacă este un câmp de text sau un element editabil), fie într-o fereastră de dialog.

### Comunicare

Comunicarea dintre scriptul de fundal și scriptul de conținut se face prin API-ul de mesagerie Chrome (`chrome.runtime.sendMessage` și `chrome.runtime.onMessage`).

### Stocarea Datelor

Extensia folosește `chrome.storage.sync` pentru a stoca:

*   Cheia API OpenAI (`apiKey`).
*   Opțiunile extensiei (afișare, traducere, culorile barei, etc.).

Aceste date sunt stocate local pe computerul dvs., în stocarea extensiei Chrome.

### Gestionarea Erorilor

Erorile posibile (cheie API lipsă, eroare de transcriere, etc.) sunt definite în fișierul `constants.js`. Funcțiile din `api.js` și `translation.js` gestionează erorile potențiale ale apelurilor API. Scriptul `content.js` afișează mesajele de eroare utilizatorului printr-un banner în partea de sus a paginii.

## 🛡️ Securitate și Confidențialitate

- **Protecția Datelor :**
  - Cheia API este stocată în siguranță în Chrome.
  - Extensia nu păstrează datele audio; toate procesările se fac în timp real.
  - Comunicarea cu API-urile se realizează prin conexiuni HTTPS securizate.

Pentru informații complete despre modul în care BabelFishAI gestionează datele dvs., vă rugăm să consultați [Politica de Confidențialitate](PRIVACY.md).

## 🔧 Depanare

- **Probleme cu Microfonul :**
  - Verificați permisiunile de acces la microfon în Chrome.
  - Asigurați-vă că nicio altă aplicație nu folosește microfonul simultan.

- **Erori de Transcriere/Traducere :**
  - Verificați că cheia API este validă și activă.
  - Asigurați-vă că aveți o conexiune la internet stabilă.
  - Consultați consola Chrome pentru a obține log-uri detaliate în caz de eroare.

## 🤝 Contribuție

Contribuțiile și sugestiile sunt binevenite. Pentru a contribui:
- Raportați erorile prin secțiunea Issues pe GitHub.
- Propuneți îmbunătățiri sau noi funcționalități.
- Trimiteți pull request-urile.

## 📄 Licență

Această extensie este distribuită sub licența GNU Affero General Public License v3.0 (AGPL-3.0). Consultați fișierul LICENSE pentru mai multe detalii.

## 💝 Suport

Dacă apreciați această extensie, puteți susține dezvoltarea acesteia făcând o donație prin [PayPal](https://paypal.me/jls).

---
Dezvoltat de jls42.org cu pasiune și inovație, Babel Fish AI propulsează transcrierea și traducerea către noi orizonturi datorită inteligenței artificiale de ultimă generație.

**Acest document a fost tradus din versiunea fr în limba ro folosind modelul o3-mini. Pentru mai multe informații despre procesul de traducere, consultați https://gitlab.com/jls42/ai-powered-markdown-translator**

