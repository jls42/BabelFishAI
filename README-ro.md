# Babel Fish AI - Extensie de Transcriere Vocală și Traducere cu AI

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Pentru a utiliza extensia, veți avea nevoie de o cheie API de la unul dintre furnizorii acceptați:**
- **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
- **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
- **Custom/LiteLLM**: Pentru a utiliza propriile puncte finale API

Babel Fish AI este o extensie Chrome inovatoare concepută pentru a oferi o transcriere vocală puternică, cu suport multi-furnizor. Transformați-vă vocea în text cu o precizie remarcabilă datorită API-urilor de transcriere Mistral AI (Voxtral) sau OpenAI (Whisper) și beneficiați opțional de traducere automată în timp real. Puteți utiliza Babel Fish AI exclusiv pentru transcriere sau puteți activa traducerea din mers, în funcție de nevoile dumneavoastră.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Caracteristici

- **Transcrierea Vocală Avansată**
  - Captură audio de înaltă calitate prin microfonul dispozitivului dvs.
  - Transcriere precisă prin API-urile Voxtral (Mistral AI) sau Whisper (OpenAI).
  - Suport multi-furnizor: alegeți liber între Mistral AI, OpenAI sau un punct final personalizat.
  - Suport multilingv pentru recunoașterea vocală și afișarea textului, permițându-vă să transcrieți intrări vocale în diferite limbi și să afișați rezultatele (transcriere și traducere, dacă este activată) în limba aleasă.
  - Inserarea automată a textului în câmpul activ sau afișarea într-o casetă de dialog dedicată.

- **Traducere și Reformulare Inteligente**
  - Traducerea imediată a transcrierilor în diverse limbi, activabilă la nevoie.
  - Reformularea textului pentru a îmbunătăți stilul și claritatea.
  - Utilizarea unui model AI avansat pentru a asigura o traducere fidelă sensului original.
  - Alegerea liberă de a utiliza exclusiv transcrierea sau de a combina transcrierea și traducerea.

- **Meniu Contextual Puternic**
  - Opțiunea „Reformulează selecția” pentru a îmbunătăți instantaneu textele selectate.
  - Opțiunea „Traduce selecția” cu submeniu pentru toate limbile disponibile.
  - Opțiunea „Corectează ortografia” pentru a corecta greșelile de ortografie, gramatică și punctuație.
  - Înlocuirea directă a textului selectat cu versiunea sa tradusă, reformulată sau corectată.
  - Integrare perfectă în interfața de utilizator nativă Chrome.

- **Interfață Utilizator Intuitivă și Personalizabilă**
  - Mod de afișare flexibil: zonă de introducere activă sau fereastră de dialog plutitoare.
  - Banner de stare configurabil cu alegerea culorilor, opacității și duratei de afișare.
  - Comandă rapidă de la tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac) pentru a porni/opri înregistrarea.
  - Opțiunea „Menține deschis” pentru a controla durata de afișare a rezultatelor.
  - Pictogramă personalizată, integrând un microfon și numărul „42”, pentru recunoaștere imediată.

- **Opțiuni Avansate**
    - Suport multi-furnizor: Mistral AI, OpenAI și Custom/LiteLLM pentru flexibilitate maximă.
    - Posibilitatea de a personaliza modelele de transcriere și traducere per furnizor.
    - Selecție independentă a furnizorului pentru transcriere și traducere/reformulare.
    - Compatibilitate cu LiteLLM Proxy prin furnizorul Custom pentru conectarea la modele alternative.
    - Gestionare completă a internaționalizării prin fișiere de limbă (_locales), oferind o interfață și suport vocal în mai multe limbi.

## 🌐 Limbi Suportate

Iată lista limbilor acceptate de Babel Fish AI, cu link-uri către videoclipuri demonstrative:

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
    - Activați „Modul dezvoltator” în dreapta sus.
    - Faceți clic pe „Încărcați extensia neîmpachetată” și selectați dosarul Babel Fish AI.

2.  **Verificare:**
    - Asigurați-vă că extensia apare în bara de instrumente Chrome cu pictograma personalizată.

## ⚙️ Configurare

1.  **Configurarea Furnizorului AI:**
    *   Faceți clic pe pictograma extensiei pentru a accesa opțiunile.
    *   Selectați furnizorul din meniul derulant (Mistral AI, OpenAI sau Custom/LiteLLM).
    *   Introduceți cheia API:
        - **Mistral AI**: disponibilă la [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        - **OpenAI**: disponibilă la [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    *   Activați furnizorul cu comutatorul de lângă meniul derulant.

2.  **Personalizarea Opțiunilor:**
    *   Alegeți modul de afișare (zonă activă sau casetă de dialog).
    *   Configurați culoarea, opacitatea și durata de afișare a bannerului de stare.
    *   Selectați limbile pentru transcriere (intrare vocală) și afișarea textului.
    *   Activați sau dezactivați funcția de traducere după cum este necesar.

3.  **(Opțional) Configurare avansată a modelului:**
    *   În opțiunile fiecărui furnizor, faceți clic pe „Configurare model” pentru a personaliza modelele utilizate.
    *   Puteți adăuga modele personalizate pentru transcriere și traducere/reformulare.
    *   Dacă sunt activați mai mulți furnizori, puteți alege pe care să îl utilizați pentru fiecare serviciu (transcriere și traducere).

## 🚀 Utilizare cu LiteLLM Proxy sau Puncte Finale Personalizate

Babel Fish AI este compatibil cu [LiteLLM Proxy](https://litellm.ai/) și alte proxy-uri API compatibile cu OpenAI, permițând utilizarea modelelor lingvistice alternative.

### Configurare

1.  **Instalați și configurați proxy-ul:** Urmați instrucțiunile serviciului pe care îl utilizați (LiteLLM etc.).
2.  **Configurați extensia Babel Fish AI:**
    *   În opțiunile extensiei, selectați furnizorul **Custom/LiteLLM** din meniul derulant.
    *   Introduceți cheia API (dacă este necesar).
    *   Configurați URL-urile API:
        - **URL Transcriere**: de exemplu `http://localhost:4000/v1/audio/transcriptions`
        - **URL Chat**: de exemplu `http://localhost:4000/v1/chat/completions`
    *   Activați furnizorul cu comutatorul.
    *   Bifați opțiunea **„NoLog”** dacă doriți să dezactivați înregistrarea cererilor de către LiteLLM.

**Important:** Opțiunea „NoLog” este disponibilă **numai** în furnizorul Custom/LiteLLM. Nu este compatibilă cu API-urile oficiale OpenAI sau Mistral AI.

## 🛠️ Funcționare Tehnică

### Arhitectura Extensiei

Extensia este compusă din mai multe fișiere JavaScript care interacționează între ele:

#### Fișiere Principale

*   **`manifest.json`:** Fișierul principal de configurare a extensiei. Definește permisiunile, scripturile, resursele accesibile etc. Utilizează Manifest V3 și declară permisiunile `activeTab`, `storage`, `commands`, `scripting` și `contextMenus`.
*   **`background.js`:** Service worker-ul care rulează în fundal. Gestionează evenimentele (clic pe pictogramă, comenzi rapide de la tastatură, meniu contextual), injectează `content script` dacă este necesar și comunică cu `content script`.
*   **`content.js`:** Scriptul principal care este injectat în paginile web. Coordonează diferitele module utilitare și gestionează fluxul global al extensiei.
*   **`src/constants.js`:** Definește constante pentru configurare, stări, acțiuni etc.

#### Module Utilitare

Extensia utilizează o arhitectură modulară cu mai multe fișiere utilitare specializate:

##### Gestionarea Furnizorilor și API

*   **`src/utils/providers.js`:** Registrul furnizorilor AI (Mistral AI, OpenAI, Custom/LiteLLM) cu configurațiile, modelele și URL-urile implicite.
*   **`src/utils/api-utils.js`:** Funcții pentru interacțiunea cu API-urile externe, rezolvarea configurației multi-furnizor și transcrierea audio.
*   **`src/utils/text-processing.js`:** Funcții de procesare a textului: traducere, reformulare, corectare ortografică.

##### Interfață Utilizator și Interacțiune

*   **`src/utils/ui.js`:** Funcții utilitare generale pentru interfața utilizator.
*   **`src/utils/banner-utils.js`:** Gestionează bannerul de stare, controalele sale și selectorul de limbă.
*   **`src/utils/focus-utils.js`:** Gestionează salvarea și restaurarea focalizării și selecției textului.
*   **`src/utils/transcription-display.js`:** Gestionează afișarea rezultatelor transcrierii.
*   **`src/utils/error-utils.js`:** Gestionează afișarea și tratarea erorilor.
*   **`src/styles/content.css`:** Stiluri CSS pentru interfața utilizator injectată în paginile web.

##### Înregistrare și Evenimente

*   **`src/utils/recording-utils.js`:** Gestionează înregistrarea audio prin microfon și procesarea datelor audio.
*   **`src/utils/event-handlers.js`:** Conține manipulatori de evenimente pentru interacțiunile utilizatorului.

##### Internaționalizare și Limbi

*   **`src/utils/languages.js`:** Definește limbile acceptate de extensie.
*   **`src/utils/languages-shared.js`:** Definește lista limbilor acceptate pentru contextul paginii web.
*   **`src/utils/languages-data.js`:** Definește lista limbilor acceptate pentru service worker.
*   **`src/utils/i18n.js`:** Gestionează internaționalizarea pentru interfața utilizator.

##### Pagina de Opțiuni

*   **`src/pages/options/`:** Conține fișiere pentru pagina de opțiuni a extensiei (HTML, CSS, JavaScript).

### Procesul de Transcriere și Traducere

#### Funcționalitatea principală de transcriere vocală

1.  **Pornirea Înregistrării:** Utilizatorul pornește înregistrarea făcând clic pe pictograma extensiei sau folosind comanda rapidă de la tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac). `background script` trimite un mesaj către `content script` pentru a începe înregistrarea.
2.  **Captură Audio:** `content script` utilizează API-ul `navigator.mediaDevices.getUserMedia` pentru a accesa microfonul și a înregistra audio prin API-ul MediaRecorder.
3.  **Transcriere:** `content script` utilizează funcția `transcribeAudio` (`src/utils/api-utils.js`) pentru a trimite audio către API-ul de transcriere al furnizorului configurat (Voxtral pentru Mistral AI, Whisper pentru OpenAI). API-ul returnează textul transcris.
4.  **Traducere sau Reformulare (Opțional):**
   - Dacă opțiunea de traducere este activată, `content script` utilizează funcția `translateText` (`src/utils/text-processing.js`) pentru a trimite textul transcris către API-ul de chat al furnizorului configurat.
   - Dacă opțiunea de reformulare este activată, funcția `rephraseText` este utilizată pentru a îmbunătăți textul transcris.
5.  **Afișare:** `content script` afișează textul procesat fie în elementul activ al paginii (dacă este un câmp de text sau un element editabil), fie într-o casetă de dialog personalizată.

#### Funcționalitatea meniului contextual

1. **Selecție Text:** Utilizatorul selectează text pe o pagină web.
2. **Meniu Contextual:** Un clic dreapta afișează opțiunile:
   - „Reformulează selecția” pentru a îmbunătăți stilul și claritatea
   - „Traduce selecția” cu un submeniu al limbilor disponibile
   - „Corectează ortografia” pentru a corecta greșelile
3. **Procesare:** În funcție de opțiunea aleasă:
   - Textul este trimis pentru reformulare prin funcția `rephraseText`
   - Textul este trimis pentru traducere prin funcția `translateText` cu limba țintă selectată
   - Textul este trimis pentru corectare prin funcția `correctText`
4. **Afișare:** Rezultatul înlocuiește selecția originală în elementul unde se află textul selectat.

### Comunicare

Comunicarea dintre `background script` și `content script` se face prin API-ul de mesagerie Chrome (`chrome.runtime.sendMessage` și `chrome.runtime.onMessage`).

### Stocarea Datelor

Extensia utilizează `chrome.storage.sync` pentru a stoca:

*   Configurația furnizorului AI (chei API, modele selectate, URL-uri personalizate).
*   Opțiunile extensiei (afișare, traducere, culori banner etc.).
*   Preferințele de limbă pentru traducere.

Aceste date sunt stocate local pe computerul dumneavoastră, în stocarea extensiei Chrome.

### Gestionarea Erorilor
Erorile posibile (cheie API lipsă, eroare de transcriere etc.) sunt definite în fișierul `constants.js`. Funcțiile `api-utils.js` și `text-processing.js` gestionează erorile potențiale de apel API cu mesaje îmbunătățite pe baza codului HTTP. `content.js` afișează mesajele de eroare utilizatorului printr-un banner în partea de jos a paginii.


## 🛡️ Securitate și Confidențialitate

- **Protecția Datelor:**
  - Cheia API este stocată în siguranță în Chrome.
  - Extensia nu păstrează datele dumneavoastră audio; toate procesările se efectuează în timp real.
  - Comunicarea cu API-urile se face prin conexiuni HTTPS securizate.

Pentru informații complete despre modul în care BabelFishAI vă gestionează datele, vă rugăm să consultați [Politica noastră de Confidențialitate](PRIVACY.md).

## 🔧 Depanare

- **Probleme cu Microfonul:**
  - Verificați permisiunile de acces la microfon în Chrome.
  - Asigurați-vă că nicio altă aplicație nu utilizează microfonul simultan.

- **Erori de Transcriere/Traducere:**
  - Verificați dacă cheia API este validă și activă.
  - Asigurați-vă că aveți o conexiune la internet stabilă.
  - Consultați consola Chrome pentru jurnale detaliate în caz de eroare.

## 🤝 Contribuție

Contribuțiile și sugestiile sunt binevenite. Pentru a contribui:
- Raportați bug-urile prin secțiunea Issues pe GitHub.
- Propuneți îmbunătățiri sau funcții noi.
- Trimiteți pull requests.

## 📄 Licență

Această extensie este distribuită sub licența GNU Affero General Public License v3.0 (AGPL-3.0). Consultați fișierul LICENSE pentru mai multe detalii.

## 💝 Sprijin

Dacă apreciați această extensie, puteți sprijini dezvoltarea sa făcând o donație prin [PayPal](https://paypal.me/jls).
---
Dezvoltat de jls42.org cu pasiune și inovație, Babel Fish AI propulsează transcrierea și traducerea spre noi orizonturi datorită inteligenței artificiale de ultimă generație.
