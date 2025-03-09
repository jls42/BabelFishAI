# Babel Fish AI - Extensión de Transcripción de Voz y Traducción con IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Para utilizar la extensión, necesitarás una clave API de OpenAI (o de un proveedor tercero si utilizas LiteLLM Proxy). Puedes generar una clave API de OpenAI aquí : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI es una extensión de Chrome innovadora diseñada originalmente para ofrecer una transcripción de voz potente. Transforma tu voz en texto con una precisión notable gracias a la API Whisper de OpenAI, y disfruta opcionalmente de una traducción automática en tiempo real. Puedes utilizar Babel Fish AI exclusivamente para la transcripción o activar la traducción sobre la marcha según tus necesidades.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funcionalidades

- **Transcripción de Voz Avanzada**
  - Captura de audio de alta calidad a través del micrófono de tu dispositivo.
  - Transcripción precisa realizada por la API Whisper de OpenAI.
  - Soporte multilingüe para el reconocimiento de voz y la visualización del texto, permitiendo transcribir entradas de voz en diferentes idiomas y mostrar los resultados (transcripción y traducción, si está activada) en el idioma de tu elección.
  - Inserción automática del texto en el campo activo o visualización en un cuadro de diálogo dedicado.

- **Traducción y Reformulación Inteligentes**
  - Traducción inmediata de las transcripciones a diversos idiomas, para activar si es necesario.
  - Reformulación del texto para mejorar su estilo y claridad.
  - Uso de un modelo de IA avanzado para garantizar una traducción fiel al significado original.
  - Opción libre de utilizar exclusivamente la transcripción o de combinar transcripción y traducción.

- **Menú Contextual Potente**
  - Opción "Reformular la selección" para mejorar instantáneamente tus textos seleccionados.
  - Opción "Traducir la selección" con submenú de todos los idiomas disponibles.
  - Reemplazo directo del texto seleccionado por su versión traducida o reformulada.
  - Integración perfecta en la interfaz de usuario nativa de Chrome.

- **Interfaz de Usuario Intuitiva y Personalizable**
  - Modo de visualización flexible: área de entrada activa o ventana de diálogo flotante.
  - Barra de estado configurable con elección de colores, opacidad y duración de visualización.
  - Atajo de teclado (Ctrl+Shift+1 o ⌘+Shift+1 en Mac) para iniciar/detener la grabación.
  - Opción "Mantener abierto" para controlar la duración de visualización de los resultados.
  - Ícono personalizado, que integra un micrófono y el número "42", para un reconocimiento inmediato.

- **Opciones Avanzadas**
    - Modo experto para configuraciones detalladas (URLs de las API, configuración por dominio, etc.).
    - Posibilidad de personalizar los modelos de transcripción y de traducción.
    - Compatibilidad con LiteLLM Proxy para conectarte a modelos de lenguaje alternativos y desactivar el registro de las solicitudes.
    - Gestión completa de la internacionalización gracias a los archivos de idioma (_locales), ofreciendo una interfaz y soporte de voz en varios idiomas.

## 🌐 Idiomas Soportados

Aquí se muestra la lista de idiomas soportados por Babel Fish AI, con enlaces a vídeos demostrativos:

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

1.  **Descarga e Instalación:**
    - Clona este repositorio desde GitHub o descarga manualmente la carpeta de la extensión.
    - **O instala directamente la extensión desde el [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Abre Chrome y accede a `chrome://extensions/`.
    - Activa el «Modo desarrollador» en la parte superior derecha.
    - Haz clic en «Cargar extensión sin empaquetar» y selecciona la carpeta de Babel Fish AI.

2.  **Verificación:**
    - Asegúrate de que la extensión aparezca en la barra de herramientas de Chrome con el ícono personalizado.

## ⚙️ Configuración

1.  **Clave API de OpenAI:**
    *   Haz clic en el ícono de la extensión para acceder a las opciones.
    *   Ingresa tu clave API de OpenAI (disponible en [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalización de las Opciones:**
    *   Elige el modo de visualización (área activa o cuadro de diálogo).
    *   Configura el color, la opacidad y la duración de visualización de la barra de estado.
    *   Selecciona los idiomas para la transcripción (entrada de voz) y para la visualización del texto.
    *   Activa o desactiva la funcionalidad de traducción según tus necesidades.

3.  **(Opcional) Uso con LiteLLM Proxy:**
    *   Activa el "Modo Experto" en las opciones.
    *   En la sección "Configuración Avanzada", modifica **las dos URLs** de las API (Whisper y Traducción) para apuntar a tu instancia de LiteLLM Proxy. **Usa la misma URL base para ambas.**
    *   Marca la opción "NoLog (Solo LiteLLM)" si deseas desactivar el registro de solicitudes por parte de LiteLLM.

## 🚀 Uso con LiteLLM Proxy

Si deseas utilizar modelos de lenguaje distintos a OpenAI, puedes usar LiteLLM Proxy. Así es como se configura:

Babel Fish AI es compatible con [LiteLLM Proxy](https://litellm.ai/), que permite usar modelos de lenguaje alternativos con una API compatible con la de OpenAI.

### Configuración

1.  **Instala y configura LiteLLM Proxy:** Sigue las instrucciones en el sitio de LiteLLM.
2.  **Configura la extensión Babel Fish AI:**
    *   En las opciones de la extensión (clic derecho en el ícono > Opciones), activa el "Modo Experto".
    *   En la sección "Configuración Avanzada", modifica **las dos URLs** de las API (Whisper y Traducción) para apuntar a tu instancia de LiteLLM Proxy (por ejemplo, `http://localhost:4000/v1/audio/transcriptions` y `http://localhost:4000/v1/chat/completions`). **Usa la misma URL base para ambas.**
    *   Marca la opción "NoLog (Solo LiteLLM)" si deseas desactivar el registro de solicitudes por parte de LiteLLM.

**Importante:** La opción "NoLog" está diseñada **exclusivamente** para ser utilizada con LiteLLM Proxy. **No la actives** si utilizas la API oficial de OpenAI, ya que esto provocará un error e impedirá que la traducción funcione.

## 🛠️ Funcionamiento Técnico

### Arquitectura de la Extensión

La extensión se compone de varios archivos JavaScript que interactúan entre sí:

*   **`manifest.json`:** El archivo de configuración principal de la extensión. Define los permisos, los scripts, los recursos accesibles, etc. Utiliza la versión 3 del manifiesto y declara los permisos `activeTab`, `storage`, `commands`, `scripting` y `contextMenus`. Los `web_accessible_resources` permiten el acceso a los recursos de la extensión en los diferentes contextos de ejecución.
*   **`background.js`:** El service worker que se ejecuta en segundo plano. Gestiona los eventos (clic en el ícono, atajos de teclado, menú contextual), inyecta el `content script` si es necesario y se comunica con el `content script`.
*   **`content.js`:** El script que se inyecta en las páginas web. Interactúa directamente con el DOM, captura el audio del micrófono, llama a las API de transcripción y traducción, y muestra los resultados.
*   **`src/utils/api.js`:** Contiene las funciones para interactuar con las API, en particular `transcribeAudio` para llamar a la API Whisper de OpenAI (transcripción) y funciones utilitarias para gestionar el almacenamiento.
*   **`src/utils/translation.js`:** Contiene las funciones `translateText` y `rephraseText` para llamar a la API GPT de OpenAI (traducción y reformulación).
*   **`src/utils/ui.js`:** Contiene funciones utilitarias para gestionar la interfaz de usuario (barra, cuadro de diálogo, botón de copia).
*   **`src/utils/languages-shared.js` y `src/utils/languages-data.js`:** Definen la lista centralizada de idiomas soportados, respectivamente para el contexto de la página web y para el service worker.
*   **`src/utils/i18n.js`:** Gestiona la internacionalización de la interfaz de usuario.
*   **`src/constants.js`:** Define constantes para la configuración, los estados, las acciones, etc.
*   **`src/pages/options/`:** Contiene los archivos para la página de opciones de la extensión (HTML, CSS, JavaScript).

### Proceso de Transcripción y Traducción

#### Funcionalidad principal de transcripción de voz

1.  **Inicio de la Grabación:** El usuario inicia la grabación haciendo clic en el ícono de la extensión o utilizando el atajo de teclado (Ctrl+Shift+1 o ⌘+Shift+1 en Mac). El `background script` envía un mensaje al `content script` para iniciar la grabación.
2.  **Captura de Audio:** El `content script` utiliza la API `navigator.mediaDevices.getUserMedia` para acceder al micrófono y grabar el audio mediante la API MediaRecorder.
3.  **Transcripción:** El `content script` utiliza la función `transcribeAudio` (`src/utils/api.js`) para enviar el audio a la API Whisper de OpenAI. La API devuelve el texto transcrito.
4.  **Traducción o Reformulación (Opcional):** 
   - Si la opción de traducción está activada, el `content script` utiliza la función `translateText` (`src/utils/translation.js`) para enviar el texto transcrito a la API GPT de OpenAI.
   - Si la opción de reformulación está activada, se utiliza la función `rephraseText` para mejorar el texto transcrito.
5.  **Visualización:** El `content script` muestra el texto procesado ya sea en el elemento activo de la página (si es un campo de texto o un elemento editable), o en un cuadro de diálogo personalizado.

#### Funcionalidad del menú contextual

1. **Selección de Texto:** El usuario selecciona texto en una página web.
2. **Menú Contextual:** Un clic derecho muestra las opciones "Reformular la selección" o "Traducir la selección" con un submenú de los idiomas disponibles.
3. **Procesamiento:** Según la opción elegida:
   - El texto se envía para reformulación mediante la función `rephraseText`
   - El texto se envía para traducción mediante la función `translateText` con el idioma de destino seleccionado.
4. **Visualización:** El resultado reemplaza la selección original en el elemento donde se encontraba el texto seleccionado.

### Comunicación

La comunicación entre el `background script` y el `content script` se realiza mediante la API de mensajería de Chrome (`chrome.runtime.sendMessage` y `chrome.runtime.onMessage`).

### Almacenamiento de Datos

La extensión utiliza `chrome.storage.sync` para almacenar:

*   La clave API de OpenAI (`apiKey`).
*   Las opciones de la extensión (visualización, traducción, colores de la barra, etc.).
*   Las preferencias de idioma para la traducción.

Estos datos se almacenan localmente en tu ordenador, en el almacenamiento de la extensión de Chrome.

### Gestión de Errores
Los errores posibles (clave API faltante, error de transcripción, etc.) están definidos en el archivo `constants.js`. Las funciones de `api.js` y `translation.js` gestionan los errores potenciales de las llamadas a las API. El `content.js` muestra los mensajes de error al usuario mediante una barra en la parte superior de la página.

## 🛡️ Seguridad y Privacidad

- **Protección de Datos:**
  - La clave API se almacena de forma segura en Chrome.
  - La extensión no conserva tus datos de audio; todos los procesos se realizan en tiempo real.
  - La comunicación con las API se efectúa mediante conexiones HTTPS seguras.

Para obtener información completa sobre cómo BabelFishAI gestiona tus datos, consulta nuestra [Política de Privacidad](PRIVACY.md).

## 🔧 Solución de Problemas

- **Problemas con el Micrófono:**
  - Verifica los permisos de acceso al micrófono en Chrome.
  - Asegúrate de que ninguna otra aplicación esté utilizando el micrófono simultáneamente.

- **Errores de Transcripción/Traducción:**
  - Verifica que la clave API sea válida y esté activa.
  - Asegúrate de disponer de una conexión a internet estable.
  - Consulta la consola de Chrome para obtener registros detallados en caso de error.

## 🤝 Contribución

Las contribuciones y sugerencias son bienvenidas. Para contribuir:
- Reporta los errores mediante la sección de Issues en GitHub.
- Propón mejoras o nuevas funcionalidades.
- Envía tus pull requests.

## 📄 Licencia

Esta extensión se distribuye bajo la licencia GNU Affero General Public License v3.0 (AGPL-3.0). Consulta el archivo LICENSE para más detalles.

## 💝 Apoyo

Si aprecias esta extensión, puedes apoyar su desarrollo haciendo una donación a través de [PayPal](https://paypal.me/jls).
---
Desarrollado por jls42.org con pasión e innovación, Babel Fish AI impulsa la transcripción y la traducción hacia nuevos horizontes gracias a la inteligencia artificial de punta.

**Este documento ha sido traducido de la versión fr a la lengua es utilizando el modelo o3-mini. Para más información sobre el proceso de traducción, consulta https://gitlab.com/jls42/ai-powered-markdown-translator**

