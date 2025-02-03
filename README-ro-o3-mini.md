# Babel Fish AI - Extensie de Transcriere Vocală și Traducere cu IA

Babel Fish AI este o extensie Chrome inovatoare concepută inițial pentru a oferi o transcriere vocală puternică. Transformați vocea în text cu o precizie remarcabilă datorită API-ului Whisper de la OpenAI și beneficiați, opțional, de o traducere automată în timp real. Puteți utiliza Babel Fish AI exclusiv pentru transcriere sau puteți activa traducerea din mers în funcție de necesitățile dumneavoastră.

## 🌟 Funcționalități

- **Transcriere Vocală Avansată**
  - Captare audio de înaltă calitate prin microfonul dispozitivului dumneavoastră.
  - Transcriere precisă realizată de API-ul Whisper de la OpenAI.
  - Suport multilingv pentru procesarea vocii și afișarea textului, permițând transcrierea intrărilor vocale în diferite limbi și afișarea rezultatelor în limba dorită.
  - Inserare automată a textului în câmpul activ sau afișare într-o fereastră de dialog dedicată.

- **Traducere Automată Integrată (Opțională)**
  - Traducere imediată a transcrierilor în diverse limbi, activabilă la nevoie.
  - Utilizarea unui model IA avansat pentru a asigura o traducere fidelă sensului original.
  - Libertatea de a utiliza exclusiv transcrierea sau de a combina transcrierea cu traducerea.

- **Interfață Utilizator Intuitivă și Personalizabilă**
  - Mod de afișare flexibil: zonă de introducere activă sau fereastră de dialog plutitoare.
  - Bara de stare configurabilă cu opțiunea de alegere a culorilor, a opacității și a duratei de afișare.
  - Scurtătură de tastatură (Ctrl+Shift+1 sau ⌘+Shift+1 pe Mac) pentru a porni/opri înregistrarea.
  - Pictogramă personalizată, integrând un microfon și cifra „42”, pentru o recunoaștere imediată.

- **Opțiuni Avansate**
  - Modul expert pentru configurații detaliate (URL-urile API, configurare pe domenii, etc.).
  - Posibilitatea de a personaliza modelele de transcriere și de traducere.
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
   - Faceți clic pe „Încărcați extensia neîmpachetată” și selectați dosarul Babel Fish AI.

2. **Verificare:**
   - Asigurați-vă că extensia apare în bara de instrumente a Chrome cu pictograma personalizată.

## ⚙️ Configurare

1. **Cheia API OpenAI:**
   - Faceți clic pe pictograma extensiei pentru a accesa opțiunile.
   - Introduceți cheia dumneavoastră API OpenAI (disponibilă pe [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Personalizarea Opțiunilor:**
   - Alegeți modul de afișare (zonă activă sau fereastră de dialog).
   - Configurați culoarea, opacitatea și durata de afișare a barei de stare.
   - Selectați limbile pentru transcriere (intrare vocală) și pentru afișarea textului.
   - Activați sau dezactivați funcționalitatea de traducere în funcție de necesități.

## 🛠️ Funcționare Tehnică

- **Arhitectura Extensiei:**
  - **Manifest V3:** Fișierul `manifest.json` definește scripturile de conținut, service worker-ul (`background.js`) și permisiunile necesare.
  - **Scripturi de Fundal și de Conținut:** Fișierul `background.js` gestionează logica de fundal și comunicarea cu API-urile, în timp ce `content.js` se ocupă de interacțiunea cu pagina web activă.
  - **Utilitare și Internaționalizare:** Dosarul `src/utils` conține module pentru gestionarea API-ului, a interfeței utilizator, a traducerii și a internaționalizării prin intermediul fișierelor de limbă din dosarul `_locales`.

- **Procesul de Transcriere și Traducere:**
  1. **Pornirea Înregistrării:** Extensia captează vocea dumneavoastră prin microfon atunci când faceți clic pe pictogramă sau utilizați scurtătura de tastatură.
  2. **Transcriere:** Audio-ul este trimis către API-ul Whisper de la OpenAI pentru a fi convertit în text, cu suport pentru mai multe limbi de intrare.
  3. **Traducere (Opțională):** Dacă este activată, transcrierea este tradusă automat în limba țintă selectată, păstrând sensul și contextul.
  4. **Afișare:** Textul transcris (și, eventual, tradus) este inserat în câmpul activ sau afișat într-o fereastră de dialog personalizată.

## 🛡️ Securitate și Confidențialitate

- **Protecția Datelor:**
  - Cheia API este stocată în mod securizat în Chrome.
  - Extensia nu păstrează datele audio; toate prelucrările se efectuează în timp real.
  - Comunicarea cu API-urile se face prin conexiuni HTTPS securizate.

## 🔧 Depanare

- **Probleme cu Microfonul:**
  - Verificați permisiunile pentru accesul la microfon în Chrome.
  - Asigurați-vă că nicio altă aplicație nu utilizează microfonul în același timp.

- **Erori de Transcriere/Traducere:**
  - Verificați dacă cheia API este validă și activă.
  - Asigurați-vă că aveți o conexiune la internet stabilă.
  - Consultați consola Chrome pentru a obține jurnale detaliate în caz de eroare.

## 🤝 Contribuții

Contribuțiile și sugestiile sunt binevenite. Pentru a contribui:
- Raportați bug-urile prin secțiunea Issues de pe GitHub.
- Propuneți îmbunătățiri sau noi funcționalități.
- Trimiteți pull requests.

## 📄 Licență

Această extensie este distribuită sub licența GNU Affero General Public License v3.0 (AGPL-3.0). Consultați fișierul LICENSE pentru mai multe detalii.

## 💝 Suport

Dacă apreciați această extensie, puteți susține dezvoltarea ei făcând o donație prin [PayPal](https://paypal.me/jls).

---
Dezvoltat de jls42.org cu pasiune și inovație, Babel Fish AI propulsează transcrierea și traducerea către noi orizonturi datorită inteligenței artificiale de ultimă oră.

**Acest document a fost tradus din versiunea fr în limba ro folosind modelul o3-mini. Pentru mai multe informații despre procesul de traducere, consultați https://gitlab.com/jls42/ai-powered-markdown-translator**

