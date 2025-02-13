# Babel Fish AI - Extensión de Transcripción de Voz y Traducción con IA

Babel Fish AI es una extensión de Chrome innovadora diseñada originalmente para ofrecer una transcripción de voz poderosa. Transforma tu voz en texto con una precisión notable gracias a la API Whisper de OpenAI, y disfruta opcionalmente de una traducción automática en tiempo real. Puedes utilizar Babel Fish AI exclusivamente para la transcripción o activar la traducción al instante según tus necesidades.

## 🌟 Funcionalidades

- **Transcripción de Voz Avanzada**
  - Captura de audio de alta calidad a través del micrófono de tu dispositivo.
  - Transcripción precisa realizada por la API Whisper de OpenAI.
  - Soporte multilingüe para el procesamiento de la voz y la visualización del texto, permitiendo transcribir entradas de voz en diferentes idiomas y mostrar los resultados en el idioma de tu elección.
  - Inserción automática del texto en el campo activo o visualización en un cuadro de diálogo dedicado.

- **Traducción Automática Integrada (Opcional)**
  - Traducción inmediata de las transcripciones a diversos idiomas, para activar cuando sea necesario.
  - Uso de un modelo de IA avanzado para garantizar una traducción fiel al significado original.
  - Elección libre de usar exclusivamente la transcripción o combinar transcripción y traducción.

- **Interfaz de Usuario Intuitiva y Personalizable**
  - Modo de visualización flexible: área de entrada activa o ventana de diálogo flotante.
  - Barra de estado configurable con opción de elegir colores, opacidad y duración de la visualización.
  - Atajo de teclado (Ctrl+Shift+1 o ⌘+Shift+1 en Mac) para iniciar/detener la grabación.
  - Ícono personalizado, que integra un micrófono y el número “42”, para un reconocimiento inmediato.

- **Opciones Avanzadas**
    - Modo experto para configuraciones detalladas (URLs de las API, configuración por dominio, etc.).
    - Posibilidad de personalizar los modelos de transcripción y de traducción.
    - **Compatibilidad con LiteLLM Proxy para utilizar modelos de lenguaje alternativos y desactivar el registro de solicitudes.**
    - Gestión completa de la internacionalización gracias a los archivos de idioma (_locales), ofreciendo una interfaz y soporte de voz en varios idiomas.

## 🌐 Idiomas Soportados

- Árabe
- Alemán
- Inglés
- Español
- Francés
- Hindi
- Italiano
- Japonés
- Coreano
- Neerlandés
- Polaco
- Portugués
- Rumano
- Sueco
- Chino

## 🚀 Instalación

1.  **Descarga e Instalación:**
    - Clona este repositorio desde GitHub o descarga manualmente la carpeta de la extensión.
    - Abre Chrome y accede a `chrome://extensions/`.
    - Activa el "Modo desarrollador" en la esquina superior derecha.
    - Haz clic en "Cargar extensión sin empaquetar" y selecciona la carpeta de Babel Fish AI.

2.  **Verificación:**
    - Asegúrate de que la extensión aparezca en la barra de herramientas de Chrome con el ícono personalizado.

## ⚙️ Configuración

1.  **Clave API OpenAI:**
    *   Haz clic en el ícono de la extensión para acceder a las opciones.
    *   Introduce tu clave API OpenAI (disponible en [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalización de las Opciones:**
    *   Elige el modo de visualización (área activa o cuadro de diálogo).
    *   Configura el color, la opacidad y la duración de visualización de la barra de estado.
    *   Selecciona los idiomas para la transcripción (entrada de voz) y para la visualización del texto.
    *   Activa o desactiva la funcionalidad de traducción según tus necesidades.

3.  **(Opcional) Uso con LiteLLM Proxy:**
    *   Activa el "Modo Experto" en las opciones.
    *   En la sección "Configuración Avanzada", modifica **las dos URLs** de las API (Whisper y Traducción) para que apunten a tu instancia de LiteLLM Proxy. **Utiliza la misma URL base para ambas.**
    *   Marca la opción "NoLog (Solo LiteLLM)" si deseas desactivar el registro de solicitudes por LiteLLM.

## 🚀 Uso con LiteLLM Proxy

Babel Fish AI es compatible con [LiteLLM Proxy](https://litellm.ai/), que permite utilizar modelos de lenguaje alternativos con una API compatible con la de OpenAI.

### Configuración

1.  **Instala y configura LiteLLM Proxy:** Sigue las instrucciones en el sitio de LiteLLM.
2.  **Configura la extensión Babel Fish AI:**
    *   En las opciones de la extensión (clic derecho sobre el ícono > Opciones), activa el "Modo Experto".
    *   En la sección "Configuración Avanzada", modifica **las dos URLs** de las API (Whisper y Traducción) para que apunten a tu instancia de LiteLLM Proxy (por ejemplo, `http://localhost:4000/v1/audio/transcriptions` y `http://localhost:4000/v1/chat/completions`). **Utiliza la misma URL base para ambas.**
    *   Marca la opción "NoLog (Solo LiteLLM)" si deseas desactivar el registro de solicitudes por LiteLLM.

**Importante:** La opción "NoLog" está diseñada **exclusivamente** para ser utilizada con LiteLLM Proxy. **No la actives** si utilizas la API oficial de OpenAI, ya que esto provocará un error e impedirá el funcionamiento de la traducción.

## 🛠️ Funcionamiento Técnico

### Arquitectura de la Extensión

La extensión está compuesta por varios archivos de JavaScript que interactúan entre sí:

*   **`manifest.json`:** El archivo de configuración principal de la extensión. Define los permisos, los scripts, los recursos accesibles, etc. Utiliza la versión 3 del manifiesto y declara los permisos `activeTab`, `storage`, `commands` y `scripting`. Los `content_scripts` se inyectan en todas las URLs y se ejecutan al final de la carga del documento.
*   **`background.js`:** El service worker que se ejecuta en segundo plano. Gestiona los eventos (clic en el ícono, atajos de teclado), inyecta el `content script` si es necesario, y se comunica con el `content script`.
*   **`content.js`:** El script que se inyecta en las páginas web. Interactúa directamente con el DOM, captura el audio del micrófono, llama a las API de transcripción y traducción, y muestra los resultados.
*   **`src/utils/api.js`:** Contiene la función `transcribeAudio` para llamar a la API Whisper de OpenAI (transcripción).
*   **`src/utils/translation.js`:** Contiene la función `translateText` para llamar a la API GPT de OpenAI (traducción).
*   **`src/utils/ui.js`:** Contiene funciones utilitarias para gestionar la interfaz de usuario (banner, cuadro de diálogo, botón de copiar).
*   **`src/constants.js`:** Define constantes para la configuración, los estados, las acciones, etc.
*   **`src/pages/options/`:** Contiene los archivos para la página de opciones de la extensión (HTML, CSS, JavaScript).

### Proceso de Transcripción y Traducción

1.  **Inicio de la Grabación:** El usuario inicia la grabación haciendo clic en el ícono de la extensión o utilizando el atajo de teclado. El `background script` envía un mensaje al `content script` para iniciar la grabación.
2.  **Captura de Audio:** El `content script` utiliza la API `navigator.mediaDevices.getUserMedia` para acceder al micrófono y grabar el audio.
3.  **Transcripción:** El `content script` utiliza la función `transcribeAudio` (`src/utils/api.js`) para enviar el audio a la API Whisper de OpenAI. La API devuelve el texto transcrito.
4.  **Traducción (Opcional):** Si la opción de traducción está activada, el `content script` utiliza la función `translateText` (`src/utils/translation.js`) para enviar el texto transcrito a la API GPT de OpenAI. La API devuelve el texto traducido.
5.  **Visualización:** El `content script` muestra el texto transcrito (y eventualmente traducido) ya sea en el elemento activo de la página (si se trata de un campo de texto o un elemento editable), o en un cuadro de diálogo.

### Comunicación

La comunicación entre el `background script` y el `content script` se realiza a través de la API de mensajería de Chrome (`chrome.runtime.sendMessage` y `chrome.runtime.onMessage`).

### Almacenamiento de Datos

La extensión utiliza `chrome.storage.sync` para almacenar:

*   La clave API de OpenAI (`apiKey`).
*   Las opciones de la extensión (visualización, traducción, colores de la barra, etc.).

### Gestión de Errores
Los errores posibles (clave API faltante, error de transcripción, etc.) se definen en el archivo `constants.js`. Las funciones `api.js` y `translation.js` gestionan los errores potenciales de las llamadas a la API. El `content.js` muestra los mensajes de error al usuario a través de un banner en la parte superior de la página.

## 🛡️ Seguridad y Privacidad

- **Protección de los Datos:**
  - La clave API se almacena de manera segura en Chrome.
  - La extensión no conserva tus datos de audio; todos los procesos se realizan en tiempo real.
  - La comunicación con las API se realiza a través de conexiones HTTPS seguras.

## 🔧 Solución de Problemas

- **Problemas con el Micrófono:**
  - Verifica los permisos de acceso al micrófono en Chrome.
  - Asegúrate de que ninguna otra aplicación esté utilizando el micrófono simultáneamente.

- **Errores de Transcripción/Traducción:**
  - Comprueba que la clave API sea válida y esté activa.
  - Asegúrate de tener una conexión a internet estable.
  - Consulta la consola de Chrome para obtener logs detallados en caso de error.

## 🤝 Contribución

Las contribuciones y sugerencias son bienvenidas. Para contribuir:
- Reporta los errores a través de la sección Issues en GitHub.
- Propón mejoras o nuevas funcionalidades.
- Envía tus pull requests.

## 📄 Licencia

Esta extensión se distribuye bajo la Licencia Pública General Affero GNU versión 3.0 (AGPL-3.0). Consulta el archivo LICENSE para más detalles.

## 💝 Apoyo

Si aprecias esta extensión, puedes apoyar su desarrollo realizando una donación a través de [PayPal](https://paypal.me/jls).

---
Desarrollado por jls42.org con pasión e innovación, Babel Fish AI impulsa la transcripción y la traducción hacia nuevos horizontes gracias a la inteligencia artificial de vanguardia.

**Este documento ha sido traducido de la versión fr a la lengua es utilizando el modelo o3-mini. Para más información sobre el proceso de traducción, consulte https://gitlab.com/jls42/ai-powered-markdown-translator**

