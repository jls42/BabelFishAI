**Articol tradus din fr în ro cu gpt-5.6-sol.**

# Babel Fish AI - Extensie de transcriere vocală și traducere cu IA

<img src="images/icon128.png" alt="Pictograma Babel Fish AI" width="128" height="128">

**Site oficial: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**Pentru a utiliza extensia, veți avea nevoie de o cheie API de la unul dintre providerii acceptați:**

|                             Provider                             | Obținerea unei chei API                                                                          |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)                                             |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)                                        |
|                                🚅                                | **Custom/LiteLLM**: Pentru utilizarea propriilor endpoint-uri API                                 |

Babel Fish AI este o extensie inovatoare pentru browser, concepută să ofere o transcriere vocală performantă, cu suport pentru mai mulți provideri. Transformați-vă vocea în text cu o precizie remarcabilă folosind API-urile de transcriere Mistral AI (Voxtral) sau OpenAI (Whisper) și beneficiați opțional de traducere automată în timp real. Puteți utiliza Babel Fish AI exclusiv pentru transcriere sau puteți activa traducerea din mers, în funcție de necesități.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Insigna Codacy](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Starea pragului de calitate](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Evaluarea securității](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Evaluarea mentenabilității](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilități](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Probleme de calitate a codului](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Datorie tehnică](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Linii de cod](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funcționalități

-   **Transcriere vocală avansată**

    -   Captură audio de înaltă calitate prin microfonul dispozitivului.
    -   Transcriere precisă prin API-urile Voxtral (Mistral AI) sau Whisper (OpenAI).
    -   Suport pentru mai mulți provideri: alegeți liber între Mistral AI, OpenAI sau un endpoint personalizat.
    -   Suport multilingv pentru recunoașterea vocală și afișarea textului, permițând transcrierea intrărilor vocale în diferite limbi și afișarea rezultatelor (transcriere și traducere, dacă este activată) în limba dorită.
    -   Inserarea automată a textului în câmpul activ sau afișarea într-o casetă de dialog dedicată.

-   **Traducere și reformulare inteligente**

    -   Traducerea imediată a transcrierilor în diverse limbi, care poate fi activată la nevoie.
    -   Reformularea textului pentru îmbunătățirea stilului și clarității.
    -   Utilizarea unui model IA avansat pentru a garanta o traducere fidelă sensului original.
    -   Posibilitatea de a utiliza exclusiv transcrierea sau de a combina transcrierea cu traducerea.

-   **Meniu contextual performant**

    -   Opțiunea „Reformulează selecția” pentru îmbunătățirea instantanee a textelor selectate.
    -   Opțiunea „Tradu selecția”, cu un submeniu care conține toate limbile disponibile.
    -   Opțiunea „Corectează ortografia” pentru corectarea greșelilor de ortografie, gramatică și punctuație.
    -   Înlocuirea directă a textului selectat cu versiunea sa tradusă, reformulată sau corectată.
    -   Integrare perfectă în interfața nativă a browserului.

-   **Interfață intuitivă și personalizabilă**

    -   Mod flexibil de afișare: zonă activă de introducere sau fereastră de dialog flotantă.
    -   Banner de stare configurabil, cu posibilitatea alegerii culorilor, opacității și duratei de afișare.
    -   Scurtătură de la tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac) pentru pornirea/oprirea înregistrării.
    -   În Firefox, „scurtătură prioritară” pentru site-urile al căror editor de pagină interceptează combinația (ChatGPT, Notion…): activă imediat după instalare și dezactivabilă din opțiuni (consultați [PRIVACY.md](PRIVACY.md)).
    -   Opțiunea „Păstrează deschis” pentru controlarea duratei de afișare a rezultatelor.
    -   Pictogramă personalizată, care integrează un microfon și numărul „42”, pentru recunoaștere imediată.

-   **Opțiuni avansate**
    -   Suport pentru mai mulți provideri: Mistral AI, OpenAI și Custom/LiteLLM, pentru flexibilitate maximă.
    -   Posibilitatea de a personaliza modelele de transcriere și traducere pentru fiecare provider.
    -   Modele OpenAI disponibile: GPT-4o mini (implicit), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** și **GPT-5.6 (luna/terra/sol)**. Transcriere: whisper-1 (implicit), gpt-4o-mini-transcribe, gpt-4o-transcribe și **gpt-transcribe**.
    -   Modele Mistral disponibile: Mistral Small (implicit), Mistral Medium, Mistral Large, Codestral și **Ministral 3 (3B/8B/14B)**. Transcriere: Voxtral Mini. Sunt acceptate răspunsurile modelelor Mistral care raționează (blocuri de reflecție).
    -   Configurările care utilizau gpt-4.1-nano (API-ul OpenAI va fi retras la 23/10/2026) sau gpt-4o trec automat la gpt-5.6-luna și gpt-4.1 în timpul actualizării.
    -   Selectarea independentă a providerului pentru transcriere și traducere/reformulare.
    -   Compatibilitate cu LiteLLM Proxy prin providerul Custom, pentru conectarea la modele alternative.
    -   Gestionarea completă a internaționalizării prin fișierele de limbă (\_locales), oferind o interfață și suport vocal în mai multe limbi.

## 🌐 Limbi acceptate

Iată lista limbilor acceptate de Babel Fish AI, cu linkuri către videoclipuri demonstrative:

-   [Arabă](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [Germană](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [Engleză](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [Spaniolă](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [Franceză](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [Italiană](https://www.youtube.com/watch?v=QgYZt8myods)
-   [Japoneză](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [Coreeană](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [Neerlandeză](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [Poloneză](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [Portugheză](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [Română](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [Suedeză](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [Chineză](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Instalare

### Chrome

1.  **Descărcare și instalare:**

    -   Clonați acest depozit de pe GitHub sau descărcați manual dosarul extensiei.
    -   **Sau instalați extensia direct din [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   Deschideți Chrome și accesați `chrome://extensions/`.
    -   Activați „Modul pentru dezvoltatori” în colțul din dreapta sus.
    -   Faceți clic pe „Încarcă extensia neîmpachetată” și selectați dosarul Babel Fish AI.

2.  **Verificare:**
    -   Asigurați-vă că extensia apare în bara de instrumente a browserului cu pictograma personalizată.

### Firefox

1.  **Descărcare și instalare:**

    -   **Instalați extensia direct din [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   Sau, pentru instalarea manuală: clonați acest depozit de pe GitHub, apoi executați `./scripts/build.sh firefox`, care pregătește `dist/firefox/` cu manifestul Firefox redenumit în `manifest.json`.
    -   Deschideți Firefox și accesați `about:debugging#/runtime/this-firefox` (nu „Instalează un supliment dintr-un fișier” din `about:addons`, opțiune rezervată extensiilor semnate).
    -   Faceți clic pe „Încarcă un supliment temporar...”.
    -   Selectați fișierul `dist/firefox/manifest.json`.

2.  **Verificare:**
    -   Asigurați-vă că extensia apare în bara de instrumente Firefox cu pictograma personalizată.

## ⚙️ Configurare

1.  **Configurarea providerului IA:**

    -   Faceți clic pe pictograma extensiei pentru a accesa opțiunile.
    -   Selectați providerul din meniul derulant (Mistral AI, OpenAI sau Custom/LiteLLM).
    -   Introduceți cheia API:
        -   **Mistral AI**: disponibilă pe [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: disponibilă pe [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    -   Activați providerul cu ajutorul comutatorului de lângă meniul derulant.

2.  **Personalizarea opțiunilor:**

    -   Alegeți modul de afișare (zonă activă sau casetă de dialog).
    -   Configurați culoarea, opacitatea și durata de afișare a bannerului de stare.
    -   Selectați limbile pentru transcriere (intrare vocală) și pentru afișarea textului.
    -   Activați sau dezactivați funcționalitatea de traducere în funcție de necesități.

3.  **(Opțional) Configurarea avansată a modelelor:**
    -   În opțiunile fiecărui provider, faceți clic pe „Configurarea modelelor” pentru a personaliza modelele utilizate.
    -   Puteți adăuga modele personalizate pentru transcriere și traducere/reformulare.
    -   Dacă sunt activați mai mulți provideri, puteți alege providerul utilizat pentru fiecare serviciu (transcriere și traducere).

## 🚀 Utilizarea cu LiteLLM Proxy sau endpoint-uri personalizate

Babel Fish AI este compatibil cu [LiteLLM Proxy](https://litellm.ai/) și cu alte proxy-uri API compatibile cu OpenAI, permițând utilizarea unor modele lingvistice alternative.

### Configurare

1.  **Instalați și configurați proxy-ul:** Urmați instrucțiunile serviciului utilizat (LiteLLM etc.).
2.  **Configurați extensia Babel Fish AI:**
    -   În opțiunile extensiei, selectați providerul **Custom/LiteLLM** din meniul derulant.
    -   Introduceți cheia API (dacă este necesar).
    -   Configurați URL-urile API:
        -   **URL de transcriere**: de exemplu, `http://localhost:4000/v1/audio/transcriptions`
        -   **URL de chat**: de exemplu, `http://localhost:4000/v1/chat/completions`
    -   Activați providerul cu ajutorul comutatorului.
    -   Bifați opțiunea **„NoLog”** dacă doriți să dezactivați jurnalizarea solicitărilor de către LiteLLM.

**Important:** Opțiunea „NoLog” este disponibilă **numai** pentru providerul Custom/LiteLLM. Aceasta nu este compatibilă cu API-urile oficiale OpenAI sau Mistral AI.

## 🛠️ Funcționare tehnică

### Arhitectura extensiei

Extensia este alcătuită din mai multe fișiere JavaScript care interacționează între ele:

#### Fișiere principale

-   **`manifest.json`:** Fișierul principal de configurare al extensiei. Acesta definește permisiunile, scripturile, resursele accesibile etc. Utilizează versiunea 3 a manifestului și declară permisiunile `activeTab`, `storage`, `commands`, `scripting` și `contextMenus`.
-   **`background.js`:** Service worker-ul care rulează în fundal. Acesta gestionează evenimentele (clic pe pictogramă, scurtături de la tastatură, meniu contextual), injectează `content script` dacă este necesar și comunică cu `content script`.
-   **`content.js`:** Scriptul principal care este injectat în paginile web. Acesta coordonează diferitele module utilitare și gestionează fluxul general al extensiei.
-   **`src/constants.js`:** Definește constante pentru configurare, stări, acțiuni etc.

#### Module utilitare

Extensia utilizează o arhitectură modulară cu mai multe fișiere utilitare specializate:

##### Gestionarea providerilor și a API-urilor

-   **`src/utils/providers.js`:** Registrul providerilor IA (Mistral AI, OpenAI, Custom/LiteLLM), cu configurările, modelele și URL-urile lor implicite.
-   **`src/utils/api-utils.js`:** Funcții pentru interacțiunea cu API-urile externe, rezolvarea configurării cu mai mulți provideri și transcrierea audio.
-   **`src/utils/text-processing.js`:** Funcții de procesare a textului: traducere, reformulare, corectare ortografică.

##### Interfață și interacțiune cu utilizatorul

-   **`src/utils/ui.js`:** Funcții utilitare generale pentru interfața cu utilizatorul.
-   **`src/utils/banner-utils.js`:** Gestionează bannerul de stare, comenzile acestuia și selectorul de limbă.
-   **`src/utils/focus-utils.js`:** Gestionează salvarea și restaurarea focalizării și a selecției textului.
-   **`src/utils/transcription-display.js`:** Gestionează afișarea rezultatelor transcrierii.
-   **`src/utils/error-utils.js`:** Gestionează afișarea și procesarea erorilor.
-   **`src/styles/content.css`:** Stiluri CSS pentru interfața cu utilizatorul injectată în paginile web.

##### Înregistrare și evenimente

-   **`src/utils/recording-utils.js`:** Gestionează înregistrarea audio prin microfon și procesarea datelor audio.
-   **`src/utils/event-handlers.js`:** Conține gestionarii de evenimente pentru interacțiunile cu utilizatorul.

##### Internaționalizare și limbi

-   **`src/utils/languages.js`:** Definește limbile acceptate de extensie.
-   **`src/utils/languages-shared.js`:** Definește lista limbilor acceptate pentru contextul paginii web.
-   **`src/utils/languages-data.js`:** Definește lista limbilor acceptate pentru service worker.
-   **`src/utils/i18n.js`:** Gestionează internaționalizarea interfeței cu utilizatorul.

##### Pagina de opțiuni

-   **`src/pages/options/`:** Conține fișierele pentru pagina de opțiuni a extensiei (HTML, CSS, JavaScript).

### Procesul de transcriere și traducere

#### Funcționalitatea principală de transcriere vocală

1.  **Pornirea înregistrării:** Utilizatorul pornește înregistrarea făcând clic pe pictograma extensiei sau folosind scurtătura de la tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac). `background script` trimite un mesaj către `content script` pentru a porni înregistrarea.
2.  **Captură audio:** `content script` utilizează API-ul `navigator.mediaDevices.getUserMedia` pentru a accesa microfonul și a înregistra sunetul prin API-ul MediaRecorder.
3.  **Transcriere:** `content script` utilizează funcția `transcribeAudio` (`src/utils/api-utils.js`) pentru a trimite înregistrarea audio către API-ul de transcriere al providerului configurat (Voxtral pentru Mistral AI, Whisper pentru OpenAI). API-ul returnează textul transcris.
4.  **Traducere sau reformulare (opțională):**

-   Dacă opțiunea de traducere este activată, `content script` utilizează funcția `translateText` (`src/utils/text-processing.js`) pentru a trimite textul transcris către API-ul de chat al providerului configurat.
-   Dacă opțiunea de reformulare este activată, funcția `rephraseText` este utilizată pentru îmbunătățirea textului transcris.

5.  **Afișare:** `content script` afișează textul procesat fie în elementul activ al paginii (dacă acesta este un câmp de text sau un element editabil), fie într-o casetă de dialog personalizată.

#### Funcționalitatea meniului contextual

1. **Selectarea textului:** Utilizatorul selectează text pe o pagină web.
2. **Meniu contextual:** Un clic dreapta afișează opțiunile:
    - „Reformulează selecția” pentru îmbunătățirea stilului și clarității
    - „Tradu selecția”, cu un submeniu al limbilor disponibile
    - „Corectează ortografia” pentru corectarea greșelilor
3. **Procesare:** În funcție de opțiunea aleasă:
    - Textul este trimis pentru reformulare prin funcția `rephraseText`
    - Textul este trimis pentru traducere prin funcția `translateText`, cu limba țintă selectată
    - Textul este trimis pentru corectare prin funcția `correctText`
4. **Afișare:** Rezultatul înlocuiește selecția originală în elementul în care se află textul selectat.

### Comunicare

Comunicarea dintre `background script` și `content script` se realizează prin API-ul de mesagerie Chrome (`chrome.runtime.sendMessage` și `chrome.runtime.onMessage`).

### Stocarea datelor

Extensia utilizează `chrome.storage.sync` pentru a stoca:

-   Configurarea providerilor IA (chei API, modele selectate, URL-uri personalizate).
-   Opțiunile extensiei (afișare, traducere, culorile bannerului etc.).
-   Preferințele lingvistice pentru traducere.

Aceste date sunt stocate local pe computerul dumneavoastră, în spațiul de stocare al extensiei browserului.
### Gestionarea erorilor

Erorile posibile (cheie API lipsă, eroare de transcriere etc.) sunt definite în fișierul `constants.js`. Funcțiile `api-utils.js` și `text-processing.js` gestionează erorile potențiale ale apelurilor API prin mesaje îmbunătățite în funcție de codul HTTP. `content.js` afișează utilizatorului mesajele de eroare printr-un banner în partea de jos a paginii.

## 🛡️ Securitate și confidențialitate

-   **Protecția datelor:**
    -   Cheia API este stocată în siguranță în browser.
    -   Extensia nu păstrează datele dumneavoastră audio; toate procesările se efectuează în timp real.
    -   Comunicarea cu API-urile se realizează prin conexiuni HTTPS securizate.

Pentru informații complete despre modul în care BabelFishAI vă gestionează datele, consultați [Politica noastră de confidențialitate](PRIVACY.md).

## 🔧 Depanare

-   **Probleme cu microfonul:**

    -   Verificați permisiunile de acces la microfon în browser.
    -   Asigurați-vă că nicio altă aplicație nu utilizează simultan microfonul.

-   **Erori de transcriere/traducere:**
    -   Verificați dacă cheia API este validă și activă.
    -   Asigurați-vă că aveți o conexiune stabilă la internet.
    -   Consultați consola browserului pentru a obține loguri detaliate în cazul unei erori.

## 🤝 Contribuții

Contribuțiile și sugestiile sunt binevenite. Pentru a contribui:

-   Raportați bugurile prin secțiunea Issues de pe GitHub.
-   Propuneți îmbunătățiri sau funcționalități noi.
-   Trimiteți pull request-urile dumneavoastră.

## 📄 Licență

Această extensie este distribuită sub licența GNU Affero General Public License v3.0 (AGPL-3.0). Consultați fișierul LICENSE pentru mai multe detalii.

## 💝 Susținere

## Dacă apreciați această extensie, îi puteți susține dezvoltarea făcând o donație prin [PayPal](https://paypal.me/jls).

Dezvoltat de jls42.org cu pasiune și spirit inovator, Babel Fish AI duce transcrierea și traducerea spre noi orizonturi cu ajutorul inteligenței artificiale de ultimă generație.
