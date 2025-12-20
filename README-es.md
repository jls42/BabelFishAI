# Babel Fish AI - Extensión de Transcripción de Voz y Traducción con IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Sitio web oficial: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

**Para utilizar la extensión, necesitará una clave API de uno de los proveedores soportados:**

| Proveedor | Obtener una clave API |
|:---------:|:----------------------|
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) |
| <img src="images/openai-logo.png" alt="OpenAI" height="30"> | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
| 🚅 | **Custom/LiteLLM**: Para usar sus propios endpoints de API |

Babel Fish AI es una extensión de navegador innovadora diseñada para ofrecer una potente transcripción de voz con soporte multiproveedor. Transforme su voz en texto con una precisión notable gracias a las API de transcripción de Mistral AI (Voxtral) u OpenAI (Whisper), y benefíciese opcionalmente de una traducción automática en tiempo real. Puede utilizar Babel Fish AI exclusivamente para la transcripción o activar la traducción sobre la marcha según sus necesidades.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Características

- **Transcripción de Voz Avanzada**
  - Captura de audio de alta calidad a través del micrófono de su dispositivo.
  - Transcripción precisa a través de las API Voxtral (Mistral AI) o Whisper (OpenAI).
  - Soporte multiproveedor: elija libremente entre Mistral AI, OpenAI o un endpoint personalizado.
  - Soporte multilingüe para el reconocimiento de voz y la visualización de texto, permitiéndole transcribir entradas de voz en diferentes idiomas y mostrar los resultados (transcripción y traducción, si está activada) en el idioma de su elección.
  - Inserción automática del texto en el campo activo o visualización en un cuadro de diálogo dedicado.

- **Traducción y Reformulación Inteligentes**
  - Traducción inmediata de las transcripciones a varios idiomas, activable si es necesario.
  - Reformulación de texto para mejorar su estilo y claridad.
  - Uso de un modelo de IA avanzado para garantizar una traducción fiel al sentido original.
  - Libre elección de utilizar exclusivamente la transcripción o combinar transcripción y traducción.

- **Menú Contextual Potente**
  - Opción "Reformular selección" para mejorar instantáneamente sus textos seleccionados.
  - Opción "Traducir selección" con submenú de todos los idiomas disponibles.
  - Opción "Corregir ortografía" para corregir errores de ortografía, gramática y puntuación.
  - Reemplazo directo del texto seleccionado por su versión traducida, reformulada o corregida.
  - Integración perfecta en la interfaz de usuario nativa del navegador.

- **Interfaz de Usuario Intuitiva y Personalizable**
  - Modo de visualización flexible: área de entrada activa o ventana de diálogo flotante.
  - Banner de estado configurable con elección de colores, opacidad y duración de visualización.
  - Atajo de teclado (Ctrl+Shift+1 o ⌘+Shift+1 en Mac) para iniciar/detener la grabación.
  - Opción "Mantener abierto" para controlar la duración de visualización de los resultados.
  - Icono personalizado, integrando un micrófono y el número "42", para un reconocimiento inmediato.

- **Opciones Avanzadas**
    - Soporte multiproveedor: Mistral AI, OpenAI y Custom/LiteLLM para una máxima flexibilidad.
    - Posibilidad de personalizar los modelos de transcripción y traducción por proveedor.
    - Selección independiente del proveedor para la transcripción y la traducción/reformulación.
    - Compatibilidad con LiteLLM Proxy a través del proveedor Custom para conectarse a modelos alternativos.
    - Gestión completa de la internacionalización gracias a los archivos de idioma (_locales), ofreciendo una interfaz y soporte de voz en varios idiomas.

## 🌐 Idiomas Soportados

Aquí está la lista de idiomas soportados por Babel Fish AI, con enlaces a videos de demostración:

- [Árabe](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [Alemán](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [Inglés](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [Español](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [Francés](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [Italiano](https://www.youtube.com/watch?v=QgYZt8myods)
- [Japonés](https://www.youtube.com/watch?v=noHEJCnocH8)
- [Coreano](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [Neerlandés](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Polaco](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Portugués](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Rumano](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Sueco](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Chino](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Instalación

### Chrome

1.  **Descarga e Instalación:**
    - Clone este repositorio desde GitHub o descargue manualmente la carpeta de la extensión.
    - **O instale directamente la extensión desde la [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Abra Chrome y vaya a `chrome://extensions/`.
    - Active el "Modo desarrollador" en la parte superior derecha.
    - Haga clic en "Cargar extensión sin empaquetar" y seleccione la carpeta de Babel Fish AI.

2.  **Verificación:**
    - Asegúrese de que la extensión aparece en la barra de herramientas del navegador con el icono personalizado.

### Firefox

1.  **Descarga e Instalación:**
    - **Instale directamente la extensión desde [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    - O para instalación manual: clone este repositorio desde GitHub.
    - Abra Firefox y vaya a `about:debugging#/runtime/this-firefox`.
    - Haga clic en "Cargar complemento temporal...".
    - Seleccione el archivo `manifest.firefox.json` en la raíz del proyecto.

2.  **Verificación:**
    - Asegúrese de que la extensión aparece en la barra de herramientas de Firefox con el icono personalizado.

## ⚙️ Configuración

1.  **Configuración del Proveedor de IA:**
    *   Haga clic en el icono de la extensión para acceder a las opciones.
    *   Seleccione su proveedor en el menú desplegable (Mistral AI, OpenAI o Custom/LiteLLM).
    *   Ingrese su clave API:
        - **Mistral AI**: disponible en [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        - **OpenAI**: disponible en [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    *   Active el proveedor con el interruptor junto al menú desplegable.

2.  **Personalización de Opciones:**
    *   Elija el modo de visualización (área activa o cuadro de diálogo).
    *   Configure el color, la opacidad y la duración de visualización del banner de estado.
    *   Seleccione los idiomas para la transcripción (entrada de voz) y para la visualización de texto.
    *   Active o desactive la función de traducción según sus necesidades.

3.  **(Opcional) Configuración avanzada de modelos:**
    *   En las opciones de cada proveedor, haga clic en "Configuración de modelos" para personalizar los modelos utilizados.
    *   Puede añadir modelos personalizados para la transcripción y la traducción/reformulación.
    *   Si hay varios proveedores activados, puede elegir cuál utilizar para cada servicio (transcripción y traducción).

## 🚀 Uso con LiteLLM Proxy o Endpoints Personalizados

Babel Fish AI es compatible con [LiteLLM Proxy](https://litellm.ai/) y otros proxies de API compatibles con OpenAI, permitiendo utilizar modelos de lenguaje alternativos.

### Configuración

1.  **Instale y configure su proxy:** Siga las instrucciones del servicio que utilice (LiteLLM, etc.).
2.  **Configure la extensión Babel Fish AI:**
    *   En las opciones de la extensión, seleccione el proveedor **Custom/LiteLLM** en el menú desplegable.
    *   Ingrese su clave API (si es necesario).
    *   Configure las URL de la API:
        - **URL Transcripción**: por ejemplo `http://localhost:4000/v1/audio/transcriptions`
        - **URL Chat**: por ejemplo `http://localhost:4000/v1/chat/completions`
    *   Active el proveedor con el interruptor.
    *   Marque la opción **"NoLog"** si desea desactivar el registro de solicitudes por LiteLLM.

**Importante:** La opción "NoLog" está disponible **únicamente** en el proveedor Custom/LiteLLM. No es compatible con las API oficiales de OpenAI o Mistral AI.

## 🛠️ Funcionamiento Técnico

### Arquitectura de la Extensión

La extensión está compuesta por varios archivos JavaScript que interactúan entre sí:

#### Archivos Principales

*   **`manifest.json`:** El archivo de configuración principal de la extensión. Define los permisos, scripts, recursos accesibles, etc. Utiliza la versión 3 del manifiesto y declara los permisos `activeTab`, `storage`, `commands`, `scripting` y `contextMenus`.
*   **`background.js`:** El service worker que se ejecuta en segundo plano. Gestiona eventos (clic en el icono, atajos de teclado, menú contextual), inyecta el `content script` si es necesario y se comunica con el `content script`.
*   **`content.js`:** El script principal que se inyecta en las páginas web. Coordina los diferentes módulos de utilidad y gestiona el flujo global de la extensión.
*   **`src/constants.js`:** Define constantes para la configuración, estados, acciones, etc.

#### Módulos de Utilidad

La extensión utiliza una arquitectura modular con varios archivos de utilidad especializados:

##### Gestión de Proveedores y API

*   **`src/utils/providers.js`:** Registro de proveedores de IA (Mistral AI, OpenAI, Custom/LiteLLM) con sus configuraciones, modelos y URL predeterminadas.
*   **`src/utils/api-utils.js`:** Funciones para la interacción con las API externas, resolución de la configuración multiproveedor y transcripción de audio.
*   **`src/utils/text-processing.js`:** Funciones de procesamiento de texto: traducción, reformulación, corrección ortográfica.

##### Interfaz de Usuario e Interacción

*   **`src/utils/ui.js`:** Funciones de utilidad generales para la interfaz de usuario.
*   **`src/utils/banner-utils.js`:** Gestiona el banner de estado, sus controles y el selector de idioma.
*   **`src/utils/focus-utils.js`:** Gestiona el guardado y la restauración del foco y la selección de texto.
*   **`src/utils/transcription-display.js`:** Gestiona la visualización de los resultados de transcripción.
*   **`src/utils/error-utils.js`:** Gestiona la visualización y el tratamiento de errores.
*   **`src/styles/content.css`:** Estilos CSS para la interfaz de usuario inyectada en las páginas web.

##### Grabación y Eventos

*   **`src/utils/recording-utils.js`:** Gestiona la grabación de audio a través del micrófono y el procesamiento de datos de audio.
*   **`src/utils/event-handlers.js`:** Contiene los manejadores de eventos para las interacciones del usuario.

##### Internacionalización e Idiomas

*   **`src/utils/languages.js`:** Define los idiomas soportados por la extensión.
*   **`src/utils/languages-shared.js`:** Define la lista de idiomas soportados para el contexto de la página web.
*   **`src/utils/languages-data.js`:** Define la lista de idiomas soportados para el service worker.
*   **`src/utils/i18n.js`:** Gestiona la internacionalización para la interfaz de usuario.

##### Página de Opciones

*   **`src/pages/options/`:** Contiene los archivos para la página de opciones de la extensión (HTML, CSS, JavaScript).

### Proceso de Transcripción y Traducción

#### Funcionalidad principal de transcripción de voz

1.  **Inicio de la Grabación:** El usuario inicia la grabación haciendo clic en el icono de la extensión o utilizando el atajo de teclado (Ctrl+Shift+1 o ⌘+Shift+1 en Mac). El `background script` envía un mensaje al `content script` para iniciar la grabación.
2.  **Captura de Audio:** El `content script` utiliza la API `navigator.mediaDevices.getUserMedia` para acceder al micrófono y grabar el audio a través de la API MediaRecorder.
3.  **Transcripción:** El `content script` utiliza la función `transcribeAudio` (`src/utils/api-utils.js`) para enviar el audio a la API de transcripción del proveedor configurado (Voxtral para Mistral AI, Whisper para OpenAI). La API devuelve el texto transcrito.
4.  **Traducción o Reformulación (Opcional):**
   - Si la opción de traducción está activada, el `content script` utiliza la función `translateText` (`src/utils/text-processing.js`) para enviar el texto transcrito a la API de chat del proveedor configurado.
   - Si la opción de reformulación está activada, se utiliza la función `rephraseText` para mejorar el texto transcrito.
5.  **Visualización:** El `content script` muestra el texto procesado ya sea en el elemento activo de la página (si es un campo de texto o un elemento editable) o en un cuadro de diálogo personalizado.

#### Funcionalidad de menú contextual

1. **Selección de Texto:** El usuario selecciona texto en una página web.
2. **Menú Contextual:** Un clic derecho muestra las opciones:
   - "Reformular selección" para mejorar el estilo y la claridad
   - "Traducir selección" con un submenú de idiomas disponibles
   - "Corregir ortografía" para corregir errores
3. **Procesamiento:** Según la opción elegida:
   - El texto se envía para reformulación a través de la función `rephraseText`
   - El texto se envía para traducción a través de la función `translateText` con el idioma de destino seleccionado
   - El texto se envía para corrección a través de la función `correctText`
4. **Visualización:** El resultado reemplaza la selección original en el elemento donde se encuentra el texto seleccionado.

### Comunicación

La comunicación entre el `background script` y el `content script` se realiza a través de la API de mensajería de Chrome (`chrome.runtime.sendMessage` y `chrome.runtime.onMessage`).

### Almacenamiento de Datos

La extensión utiliza `chrome.storage.sync` para almacenar:

*   La configuración de los proveedores de IA (claves API, modelos seleccionados, URL personalizadas).
*   Las opciones de la extensión (visualización, traducción, colores del banner, etc.).
*   Las preferencias de idioma para la traducción.

Estos datos se almacenan localmente en su ordenador, en el almacenamiento de la extensión del navegador.

### Gestión de Errores
Los posibles errores (clave API faltante, error de transcripción, etc.) se definen en el archivo `constants.js`. Las funciones `api-utils.js` y `text-processing.js` gestionan los posibles errores de llamadas a la API con mensajes mejorados según el código HTTP. El `content.js` muestra los mensajes de error al usuario a través de un banner en la parte inferior de la página.


## 🛡️ Seguridad y Privacidad

- **Protección de Datos:**
  - La clave API se almacena de forma segura en el navegador.
  - La extensión no conserva sus datos de audio; todos los tratamientos se realizan en tiempo real.
  - La comunicación con las API se realiza a través de conexiones HTTPS seguras.

Para obtener información completa sobre cómo BabelFishAI gestiona sus datos, consulte nuestra [Política de Privacidad](PRIVACY.md).

## 🔧 Solución de Problemas

- **Problemas de Micrófono:**
  - Verifique los permisos de acceso al micrófono en su navegador.
  - Asegúrese de que ninguna otra aplicación esté utilizando el micrófono simultáneamente.

- **Errores de Transcripción/Traducción:**
  - Verifique que la clave API sea válida y activa.
  - Asegúrese de tener una conexión a Internet estable.
  - Consulte la consola del navegador para obtener registros detallados en caso de error.

## 🤝 Contribución

Las contribuciones y sugerencias son bienvenidas. Para contribuir:
- Informe de errores a través de la sección Issues en GitHub.
- Proponga mejoras o nuevas funcionalidades.
- Envíe sus pull requests.

## 📄 Licencia

Esta extensión se distribuye bajo la licencia GNU Affero General Public License v3.0 (AGPL-3.0). Consulte el archivo LICENSE para más detalles.

## 💝 Apoyo

Si aprecia esta extensión, puede apoyar su desarrollo haciendo una donación a través de [PayPal](https://paypal.me/jls).
---
Desarrollado por jls42.org con pasión e innovación, Babel Fish AI impulsa la transcripción y la traducción hacia nuevos horizontes gracias a la inteligencia artificial de vanguardia.
