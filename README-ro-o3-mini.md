# Babel Fish AI - Extensie de Transcriere Vocală și Traducere cu IA

Babel Fish AI este o extensie Chrome inovatoare concepută inițial pentru a oferi o transcriere vocală puternică. Transformați vocea dumneavoastră în text cu o precizie remarcabilă datorită API-ului Whisper de la OpenAI și beneficiați opțional de o traducere automată în timp real. Puteți utiliza Babel Fish AI exclusiv pentru transcriere sau puteți activa traducerea instantanee în funcție de nevoile dumneavoastră.

## 🌟 Funcționalități

- **Transcriere Vocală Avansată**
  - Captură audio de înaltă calitate prin microfonul dispozitivului dumneavoastră.
  - Transcriere precisă realizată de API-ul Whisper de la OpenAI.
  - Suport multilingv pentru procesarea vocii și afișarea textului, permițând transcrierea intrărilor vocale în diferite limbi și afișarea rezultatelor în limba aleasă.
  - Inserare automată a textului în câmpul activ sau afișarea acestuia într-o fereastră de dialog dedicată.

- **Traducere Automată Integrată (Opțională)**
  - Traducere imediată a transcrierilor în diverse limbi, de activat după necesitate.
  - Utilizarea unui model IA avansat pentru a garanta o traducere fidelă sensului original.
  - Libertatea de a utiliza exclusiv transcrierea sau de a combina transcrierea cu traducerea.

- **Interfață Utilizator Intuitivă și Personalizabilă**
  - Mod de afișare flexibil: zonă de input activă sau fereastră de dialog plutitoare.
  - Panglică de stare configurabilă cu opțiuni privind culorile, opacitatea și durata de afișare.
  - Scurtătură de la tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac) pentru a porni/opriri înregistrarea.
  - Pictogramă personalizată, integrând un microfon și cifra „42”, pentru o recunoaștere imediată.

- **Opțiuni Avansate**
  - Mod expert pentru configurații detaliate (URL-urile API, configurare pe domenii etc.).
  - Posibilitatea de a personaliza modelele de transcriere și traducere.
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

1. **Descărcare și Instalare:**
   - Clonați acest depozit de pe GitHub sau descărcați manual dosarul extensiei.
   - Deschideți Chrome și accesați `chrome://extensions/`.
   - Activați „Modul de dezvoltator” în colțul din dreapta sus.
   - Faceți clic pe „Încărcare extensie neîmpachetată” și selectați dosarul Babel Fish AI.

2. **Verificare:**
   - Asigurați-vă că extensia apare în bara de instrumente a Chrome cu pictograma personalizată.

## ⚙️ Configurare

1. **Cheie API OpenAI:**
   - Faceți clic pe pictograma extensiei pentru a accesa opțiunile.
   - Introduceți cheia dumneavoastră API OpenAI (disponibilă pe [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Personalizarea Opțiunilor:**
   - Alegeți modul de afișare (zonă activă sau fereastră de dialog).
   - Configurați culoarea, opacitatea și durata de afișare a panglicii de stare.
   - Selectați limbile pentru transcriere (intrare vocală) și pentru afișarea textului.
   - Activați sau dezactivați funcționalitatea de traducere în funcție de nevoile dumneavoastră.

## 🛠️ Funcționare Tehnică

### Arhitectura Extensiei

Extensia este compusă din mai multe fișiere JavaScript care interacționează între ele:

*   **`manifest.json`:** Fișierul principal de configurare al extensiei. Definește permisiunile, scripturile, resursele accesibile etc. Utilizează versiunea 3 a manifestului și declară permisiunile `activeTab`, `storage`, `commands` și `scripting`. `content_scripts` sunt injectate în toate URL-urile și se execută la sfârșitul încărcării documentului.
*   **`background.js`:** Service worker-ul care rulează în fundal. Gestionează evenimentele (clic pe pictogramă, scurtături de la tastatură), injectează `content script` dacă este necesar și comunică cu acesta.
*   **`content.js`:** Scriptul care este injectat în paginile web. Interacționează direct cu DOM-ul, capturează audio-ul de la microfon, apelează API-urile de transcriere și traducere și afișează rezultatele.
*   **`src/utils/api.js`:** Conține funcția `transcribeAudio` pentru a apela API-ul Whisper de la OpenAI (transcriere).
*   **`src/utils/translation.js`:** Conține funcția `translateText` pentru a apela API-ul GPT de la OpenAI (traducere).
*   **`src/utils/ui.js`:** Conține funcții utilitare pentru gestionarea interfeței utilizator (bannere, ferestre de dialog, buton de copiere).
*   **`src/constants.js`:** Definește constante pentru configurare, stări, acțiuni etc.
*   **`src/pages/options/`:** Conține fișierele pentru pagina de opțiuni a extensiei (HTML, CSS, JavaScript).

### Procesul de Transcriere și Traducere

1.  **Pornirea Înregistrării:** Utilizatorul pornește înregistrarea făcând clic pe pictograma extensiei sau folosind scurtătura de la tastatură. Scriptul `background` trimite un mesaj către `content script` pentru a porni înregistrarea.
2.  **Captură Audio:** `Content script` utilizează API-ul `navigator.mediaDevices.getUserMedia` pentru a accesa microfonul și a înregistra audio.
3.  **Transcriere:** `Content script` utilizează funcția `transcribeAudio` (`src/utils/api.js`) pentru a trimite audio-ul la API-ul Whisper de la OpenAI. API-ul returnează textul transcris.
4.  **Traducere (Opțională):** Dacă opțiunea de traducere este activată, `content script` utilizează funcția `translateText` (`src/utils/translation.js`) pentru a trimite textul transcris la API-ul GPT de la OpenAI. API-ul returnează textul tradus.
5.  **Afișare:** `Content script` afișează textul transcris (și posibil tradus) fie în elementul activ al paginii (dacă este un câmp de text sau un element editabil), fie într-o fereastră de dialog.

### Comunicare

Comunicarea între scriptul `background` și `content script` se face prin API-ul de mesagerie Chrome (`chrome.runtime.sendMessage` și `chrome.runtime.onMessage`).

### Stocarea Datelor

Extensia utilizează `chrome.storage.sync` pentru a stoca:

*   Cheia API OpenAI (`apiKey`).
*   Opțiunile extensiei (afișare, traducere, culorile panglicii etc.).

### Gestionarea Erorilor
Erorile posibile (cheie API lipsă, eroare de transcriere etc.) sunt definite în fișierul `constants.js`. Funcțiile din `api.js` și `translation.js` gestionează erorile potențiale ale apelurilor API. `Content.js` afișează mesajele de eroare utilizatorului printr-o bannieră în partea de sus a paginii.

## 🛡️ Securitate și Confidențialitate

- **Protecția Datelor:**
  - Cheia API este stocată în siguranță în Chrome.
  - Extensia nu păstrează datele audio; toate procesările se realizează în timp real.
  - Comunicarea cu API-urile se face prin conexiuni HTTPS securizate.

## 🔧 Depanare

- **Probleme cu Microfonul:**
  - Verificați permisiunile de acces la microfon în Chrome.
  - Asigurați-vă că nicio altă aplicație nu folosește microfonul simultan.

- **Erori de Transcriere/Traducere:**
  - Verificați dacă cheia API este validă și activă.
  - Asigurați-vă că aveți o conexiune la internet stabilă.
  - Consultați consola Chrome pentru a obține loguri detaliate în caz de eroare.

## 🤝 Contribuție

Contribuțiile și sugestiile sunt binevenite. Pentru a contribui:
- Raportați bug-urile prin secțiunea Issues de pe GitHub.
- Propuneți îmbunătățiri sau funcționalități noi.
- Trimiteți pull request-uri.

## 📄 Licență

Această extensie este distribuită sub licența GNU Affero General Public License v3.0 (AGPL-3.0). Consultați fișierul LICENSE pentru mai multe detalii.

## 💝 Susținere

Dacă vă place această extensie, puteți susține dezvoltarea ei făcând o donație prin [PayPal](https://paypal.me/jls).

---
Dezvoltat de jls42.org cu pasiune și inovație, Babel Fish AI propulsează transcrierea și traducerea către noi orizonturi, datorită inteligenței artificiale de ultimă generație.

**Acest document a fost tradus din versiunea fr în limba ro folosind modelul o3-mini. Pentru mai multe informații despre procesul de traducere, consultați https://gitlab.com/jls42/ai-powered-markdown-translator**

