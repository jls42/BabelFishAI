# Babel Fish AI - Extensie de Transcriere Vocală și Traducere cu IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Pentru a utiliza extensia, ai nevoie de o cheie API OpenAI (sau de un furnizor terț dacă folosești LiteLLM Proxy). Poți genera o cheie API OpenAI aici : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI este o extensie Chrome inovatoare, concepută inițial pentru a oferi o transcriere vocală puternică. Transformă-ți vocea în text cu o precizie remarcabilă datorită API-ului Whisper de la OpenAI și beneficiază, opțional, de o traducere automată în timp real. Poți utiliza Babel Fish AI exclusiv pentru transcriere sau poți activa traducerea în timp real, în funcție de nevoile tale.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funcționalități

- **Transcriere Vocală Avansată**
  - Captură audio de înaltă calitate prin microfonul dispozitivului tău.
  - Transcriere precisă realizată de API-ul Whisper de la OpenAI.
  - Suport multilingv pentru recunoașterea vocală și afișarea textului, permițând transcrierea unor intrări vocale în diverse limbi și afișarea rezultatelor (transcriere și traducere, dacă este activată) în limba aleasă de tine.
  - Inserare automată a textului în câmpul activ sau afișare într-o fereastră de dialog dedicată.

- **Traducere și Reformulare Inteligente**
  - Traducere imediată a transcrierilor în diverse limbi, care se poate activa la nevoie.
  - Reformulare a textului pentru a-i îmbunătăți stilul și claritatea.
  - Utilizarea unui model avansat de IA pentru a asigura o traducere fidelă sensului original.
  - Libertatea de a utiliza exclusiv transcrierea sau de a combina transcrierea cu traducerea.

- **Meniu Contextual Puternic**
  - Opțiunea "Reformulează selecția" pentru a îmbunătăți instantaneu textele selectate.
  - Opțiunea "Traduce selecția" cu submeniu ce include toate limbile disponibile.
  - Înlocuirea directă a textului selectat cu versiunea sa tradusă sau reformulată.
  - Integrare perfectă în interfața nativă a utilizatorului din Chrome.

- **Interfață de Utilizator Intuitivă și Personalizabilă**
  - Mod de afișare flexibil: zonă de introducere activă sau fereastră de dialog plutitoare.
  - Banner de stare configurabil, cu alegerea culorilor, opacității și durata de afișare.
  - Comandă rapidă de la tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac) pentru a porni/oprirea înregistrării.
  - Opțiunea "Păstrează deschis" pentru a controla durata de afișare a rezultatelor.
  - Iconiță personalizată, integrând un microfon și cifra "42", pentru o recunoaștere imediată.

- **Opțiuni Avansate**
    - Mod expert pentru configurații detaliate (URL-urile API, configurare pe domeniu, etc.).
    - Posibilitatea de a personaliza modelele de transcriere și traducere.
    - Compatibilitate cu LiteLLM Proxy pentru a te conecta la modele de limbaj alternative și pentru a dezactiva jurnalizarea cererilor.
    - Gestionare completă a internaționalizării datorită fișierelor de limbă (_locales), oferind o interfață și suport vocal în mai multe limbi.

## 🌐 Limbi Suportate

Iată lista limbilor suportate de Babel Fish AI, cu linkuri către videoclipuri de demonstrație:

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
    - Clonează acest depozit de pe GitHub sau descarcă manual dosarul extensiei.
    - **Sau instalează direct extensia de pe [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Deschide Chrome și accesează `chrome://extensions/`.
    - Activează „Modul dezvoltator” în colțul din dreapta sus.
    - Click pe „Încărcați extensia neîmpachetată” și selectează dosarul Babel Fish AI.

2.  **Verificare:**
    - Asigură-te că extensia apare în bara de instrumente a Chrome cu iconița personalizată.

## ⚙️ Configurare

1.  **Cheia API OpenAI:**
    *   Click pe iconița extensiei pentru a accesa opțiunile.
    *   Introdu cheia ta API OpenAI (disponibilă pe [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalizarea Opțiunilor:**
    *   Alege modul de afișare (zonă activă sau fereastră de dialog).
    *   Configurează culoarea, opacitatea și durata de afișare a bannerului de stare.
    *   Selectează limbile pentru transcriere (intrare vocală) și pentru afișarea textului.
    *   Activează sau dezactivează funcționalitatea de traducere, în funcție de nevoile tale.

3.  **(Opțional) Utilizare cu LiteLLM Proxy:**
    *   Activează „Modul Expert” în opțiuni.
    *   În secțiunea „Configurare Avansată”, modifică **ambele URL-uri** ale API-urilor (Whisper și Traducere) pentru a indica instanța ta LiteLLM Proxy. **Folosește același URL de bază pentru ambele.**
    *   Bifează opțiunea „NoLog (doar LiteLLM)” dacă dorești să dezactivezi jurnalizarea cererilor de către LiteLLM.

## 🚀 Utilizare cu LiteLLM Proxy

Dacă dorești să utilizezi modele de limbaj altfel decât cele de la OpenAI, poți folosi LiteLLM Proxy. Iată cum se configurează:

Babel Fish AI este compatibil cu [LiteLLM Proxy](https://litellm.ai/), care permite utilizarea modelelor de limbaj alternative cu o API compatibilă cu cea a OpenAI.

### Configurare

1.  **Instalează și configurează LiteLLM Proxy:** Urmează instrucțiunile de pe site-ul LiteLLM.
2.  **Configurează extensia Babel Fish AI:**
    *   În opțiunile extensiei (click dreapta pe iconiță > Opțiuni), activează „Modul Expert”.
    *   În secțiunea „Configurare Avansată”, modifică **ambele URL-uri** ale API-urilor (Whisper și Traducere) pentru a indica instanța ta LiteLLM Proxy (de exemplu, `http://localhost:4000/v1/audio/transcriptions` și `http://localhost:4000/v1/chat/completions`). **Folosește același URL de bază pentru ambele.**
    *   Bifează opțiunea „NoLog (doar LiteLLM)” dacă dorești să dezactivezi jurnalizarea cererilor de către LiteLLM.

**Important:** Opțiunea „NoLog” este concepută **exclusiv** pentru a fi utilizată cu LiteLLM Proxy. **Nu o activa** dacă folosești API-ul oficial OpenAI, deoarece aceasta va genera o eroare și va împiedica funcționarea traducerii.

## 🛠️ Funcționare Tehnică

### Arhitectura Extensiei

Extensia este compusă din mai multe fișiere JavaScript care interacționează între ele:

*   **`manifest.json`:** Fișierul de configurare principal al extensiei. Definește permisiunile, scripturile, resursele accesibile etc. Utilizează versiunea 3 a manifestului și declară permisiunile `activeTab`, `storage`, `commands`, `scripting` și `contextMenus`. `web_accessible_resources` permit accesul la resursele extensiei în diferite contexte de execuție.
*   **`background.js`:** Service worker-ul care rulează în fundal. Gestionează evenimentele (click pe iconiță, comenzi rapide de la tastatură, meniu contextual), injectează scriptul de conținut (`content script`) dacă este necesar și comunică cu scriptul de conținut.
*   **`content.js`:** Scriptul injectat în paginile web. Interacționează direct cu DOM-ul, capturează audio-ul de la microfon, apelează API-urile de transcriere și traducere și afișează rezultatele.
*   **`src/utils/api.js`:** Conține funcțiile care permit interacțiunea cu API-urile, în special `transcribeAudio` pentru a apela API-ul Whisper de la OpenAI (transcriere) și funcțiile utilitare pentru gestionarea stocării.
*   **`src/utils/translation.js`:** Conține funcțiile `translateText` și `rephraseText` pentru a apela API-ul GPT de la OpenAI (traducere și reformulare).
*   **`src/utils/ui.js`:** Conține funcții utilitare pentru gestionarea interfeței utilizator (banner, fereastră de dialog, buton de copiere).
*   **`src/utils/languages-shared.js` și `src/utils/languages-data.js`:** Definirea listei centralizate a limbilor suportate, respectiv pentru contextul paginii web și pentru service worker.
*   **`src/utils/i18n.js`:** Gestionează internaționalizarea interfeței utilizator.
*   **`src/constants.js`:** Definește constante pentru configurare, stări, acțiuni etc.
*   **`src/pages/options/`:** Conține fișierele pentru pagina de opțiuni a extensiei (HTML, CSS, JavaScript).

### Procesul de Transcriere și Traducere

#### Funcționalitatea Principală de Transcriere Vocală

1.  **Pornirea Înregistrării:** Utilizatorul pornește înregistrarea făcând click pe iconița extensiei sau folosind comanda rapidă (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac). Scriptul de fundal (`background script`) trimite un mesaj către scriptul de conținut (`content script`) pentru a porni înregistrarea.
2.  **Captură Audio:** Scriptul de conținut folosește API-ul `navigator.mediaDevices.getUserMedia` pentru a accesa microfonul și a înregistra audio prin API-ul MediaRecorder.
3.  **Transcriere:** Scriptul de conținut folosește funcția `transcribeAudio` (`src/utils/api.js`) pentru a trimite audio-ul către API-ul Whisper de la OpenAI. API-ul returnează textul transcris.
4.  **Traducere sau Reformulare (Opțională):** 
   - Dacă opțiunea de traducere este activată, scriptul de conținut folosește funcția `translateText` (`src/utils/translation.js`) pentru a trimite textul transcris către API-ul GPT de la OpenAI.
   - Dacă opțiunea de reformulare este activată, funcția `rephraseText` este utilizată pentru a îmbunătăți textul transcris.
5.  **Afișare:** Scriptul de conținut afișează textul procesat fie în elementul activ al paginii (dacă este un câmp de text sau un element editabil), fie într-o fereastră de dialog personalizată.

#### Funcționalitatea Meniului Contextual

1. **Selecția Textului:** Utilizatorul selectează text pe o pagină web.
2. **Meniu Contextual:** Un clic dreapta afișează opțiunile "Reformulează selecția" sau "Traduce selecția" cu un submeniu al limbilor disponibile.
3. **Prelucrare:** În funcție de opțiunea aleasă:
   - Textul este trimis pentru reformulare prin funcția `rephraseText`
   - Textul este trimis pentru traducere prin funcția `translateText` cu limba țintă selectată
4. **Afișare:** Rezultatul înlocuiește selecția originală în elementul în care se găsește textul selectat.

### Comunicare

Comunicarea între scriptul de fundal (`background script`) și scriptul de conținut (`content script`) se realizează prin API-ul de mesagerie Chrome (`chrome.runtime.sendMessage` și `chrome.runtime.onMessage`).

### Stocarea Datelor

Extensia folosește `chrome.storage.sync` pentru a stoca:

*   Cheia API OpenAI (`apiKey`).
*   Opțiunile extensiei (afișare, traducere, culori ale bannerului, etc.).
*   Preferințele lingvistice pentru traducere.

Aceste date sunt stocate local pe calculatorul tău, în stocarea extensiei Chrome.

### Gestionarea Erorilor
Erorile posibile (cheie API lipsă, eroare de transcriere, etc.) sunt definite în fișierul `constants.js`. Funcțiile din `api.js` și `translation.js` gestionează erorile potențiale ale apelurilor API. Scriptul de conținut afișează mesajele de eroare către utilizator printr-un banner plasat în partea de sus a paginii.

## 🛡️ Securitate și Confidențialitate

- **Protecția Datelor:**
  - Cheia API este stocată în siguranță în Chrome.
  - Extensia nu reține datele tale audio; toate procesele se efectuează în timp real.
  - Comunicarea cu API-urile se face prin conexiuni HTTPS securizate.

Pentru informații complete despre modul în care BabelFishAI gestionează datele tale, te rugăm să consulți [Politica de Confidențialitate](PRIVACY.md).

## 🔧 Depanare

- **Probleme cu Microfonul:**
  - Verifică permisiunile de acces la microfon în Chrome.
  - Asigură-te că nicio altă aplicație nu utilizează microfonul simultan.

- **Erori de Transcriere/Traducere:**
  - Verifică dacă cheia API este validă și activă.
  - Asigură-te că ai o conexiune la internet stabilă.
  - Consultă consola Chrome pentru a obține loguri detaliate în caz de eroare.

## 🤝 Contribuție

Contribuțiile și sugestiile sunt binevenite. Pentru a contribui:
- Raportează bug-uri prin secțiunea Issues de pe GitHub.
- Propune îmbunătățiri sau noi funcționalități.
- Trimite pull requests.

## 📄 Licență

Această extensie este distribuită sub licența GNU Affero General Public License v3.0 (AGPL-3.0). Consultă fișierul LICENSE pentru mai multe detalii.

## 💝 Suport

Dacă apreciezi această extensie, poți susține dezvoltarea ei printr-o donație pe [PayPal](https://paypal.me/jls).

---
Dezvoltat de jls42.org cu pasiune și inovație, Babel Fish AI propulsează transcrierea și traducerea către noi orizonturi datorită inteligenței artificiale de ultimă generație.

**Acest document a fost tradus din versiunea fr în limba ro folosind modelul o3-mini. Pentru mai multe informații despre procesul de traducere, consultați https://gitlab.com/jls42/ai-powered-markdown-translator**

