# Babel Fish AI - Extensión de Transcripción Vocal y Traducción con IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Para utilizar la extensión, necesitarás una clave API de OpenAI (o de un proveedor tercero si usas LiteLLM Proxy). Puedes generar una clave API de OpenAI aquí: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI es una extensión innovadora para Chrome diseñada originalmente para ofrecer una transcripción vocal poderosa. Transforma tu voz en texto con una precisión notable gracias a la API Whisper de OpenAI, y disfruta opcionalmente de una traducción automática en tiempo real. Puedes utilizar Babel Fish AI exclusivamente para la transcripción o activar la traducción al vuelo según tus necesidades.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Funcionalidades

- **Transcripción Vocal Avanzada**
  - Captura de audio de alta calidad a través del micrófono de tu dispositivo.
  - Transcripción precisa realizada por la API Whisper de OpenAI.
  - Soporte multilingüe para el reconocimiento vocal y la visualización del texto, permitiendo transcribir entradas de voz en diferentes idiomas y mostrar los resultados (transcripción y traducción, si se activa) en el idioma de tu elección.
  - Inserción automática del texto en el campo activo o visualización en un cuadro de diálogo dedicado.

- **Traducción Automática Integrada (Opcional)**
  - Traducción inmediata de las transcripciones a diversos idiomas, para activar si es necesario.
  - Uso de un modelo de IA avanzado para garantizar una traducción fiel al sentido original.
  - Libre elección de usar exclusivamente la transcripción o combinar transcripción y traducción.

- **Interfaz de Usuario Intuitiva y Personalizable**
  - Modo de visualización flexible: área de entrada activa o ventana de diálogo flotante.
  - Barra de estado configurable con elección de colores, opacidad y duración de la visualización.
  - Atajo de teclado (Ctrl+Shift+1 o ⌘+Shift+1 en Mac) para iniciar/detener la grabación.
  - Ícono personalizado, que integra un micrófono y el número “42”, para un reconocimiento inmediato.

- **Opciones Avanzadas**
    - Modo experto para configuraciones detalladas (URLs de las API, configuración por dominio, etc.).
    - Posibilidad de personalizar los modelos de transcripción y de traducción.
    - Compatibilidad con LiteLLM Proxy para conectarte a modelos de lenguaje alternativos y desactivar el registro de las solicitudes.
    - Gestión completa de la internacionalización gracias a los archivos de idioma (_locales), ofreciendo una interfaz y soporte vocal en varios idiomas.

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
- [Holandés](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
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
    - Activa el «Modo desarrollador» en la esquina superior derecha.
    - Haz clic en «Cargar extensión sin empaquetar» y selecciona la carpeta de Babel Fish AI.

2.  **Verificación:**
    - Asegúrate de que la extensión aparezca en la barra de herramientas de Chrome con el ícono personalizado.

## ⚙️ Configuración

1.  **Clave API de OpenAI:**
    *   Haz clic en el ícono de la extensión para acceder a las opciones.
    *   Introduce tu clave API de OpenAI (disponible en [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalización de Opciones:**
    *   Elige el modo de visualización (área activa o cuadro de diálogo).
    *   Configura el color, la opacidad y la duración de visualización de la barra de estado.
    *   Selecciona los idiomas para la transcripción (entrada vocal) y para la visualización del texto.
    *   Activa o desactiva la funcionalidad de traducción según tus necesidades.

3.  **(Opcional) Uso con LiteLLM Proxy:**
    *   Activa el "Modo Experto" en las opciones.
    *   En la sección "Configuración Avanzada", modifica **las dos URLs** de las API (Whisper y Traducción) para apuntar a tu instancia de LiteLLM Proxy. **Utiliza la misma URL base para ambas.**
    *   Marca la opción "NoLog (LiteLLM únicamente)" si deseas desactivar el registro de las solicitudes por LiteLLM.

## 🚀 Uso con LiteLLM Proxy

Si deseas usar modelos de lenguaje distintos a OpenAI, puedes utilizar LiteLLM Proxy. Aquí te explicamos cómo configurarlo:

Babel Fish AI es compatible con [LiteLLM Proxy](https://litellm.ai/), que permite usar modelos de lenguaje alternativos con una API compatible con la de OpenAI.

### Configuración

1.  **Instala y configura LiteLLM Proxy:** Sigue las instrucciones en el sitio de LiteLLM.
2.  **Configura la extensión Babel Fish AI:**
    *   En las opciones de la extensión (clic derecho en el ícono > Opciones), activa el "Modo Experto".
    *   En la sección "Configuración Avanzada", modifica **las dos URLs** de las API (Whisper y Traducción) para apuntar a tu instancia de LiteLLM Proxy (por ejemplo, `http://localhost:4000/v1/audio/transcriptions` y `http://localhost:4000/v1/chat/completions`). **Utiliza la misma URL base para ambas.**
    *   Marca la opción "NoLog (LiteLLM únicamente)" si deseas desactivar el registro de las solicitudes por LiteLLM.

**Importante:** La opción "NoLog" está diseñada **exclusivamente** para ser utilizada con LiteLLM Proxy. **No la actives** si usas la API oficial de OpenAI, ya que eso provocará un error e impedirá que la traducción funcione.

## 🛠️ Funcionamiento Técnico

### Arquitectura de la Extensión

La extensión está compuesta por varios archivos JavaScript que interactúan entre sí:

*   **`manifest.json`:** El archivo de configuración principal de la extensión. Define los permisos, los scripts, los recursos accesibles, etc. Utiliza la versión 3 del manifiesto y declara los permisos `activeTab`, `storage`, `commands` y `scripting`. Los `content_scripts` se inyectan en todas las URLs y se ejecutan al final de la carga del documento.
*   **`background.js`:** El service worker que se ejecuta en segundo plano. Maneja los eventos (clic en el ícono, atajos de teclado), inyecta el `content script` si es necesario, y se comunica con el `content script`.
*   **`content.js`:** El script que se inyecta en las páginas web. Interactúa directamente con el DOM, captura el audio del micrófono, llama a las APIs de transcripción y traducción, y muestra los resultados.
*   **`src/utils/api.js`:** Contiene la función `transcribeAudio` para llamar a la API Whisper de OpenAI (transcripción).
*   **`src/utils/translation.js`:** Contiene la función `translateText` para llamar a la API GPT de OpenAI (traducción).
*   **`src/utils/ui.js`:** Contiene funciones utilitarias para manejar la interfaz de usuario (banner, cuadro de diálogo, botón de copia).
*   **`src/constants.js`:** Define constantes para la configuración, los estados, las acciones, etc.
*   **`src/pages/options/`:** Contiene los archivos para la página de opciones de la extensión (HTML, CSS, JavaScript).

### Proceso de Transcripción y Traducción

1.  **Inicio de la Grabación:** El usuario inicia la grabación haciendo clic en el ícono de la extensión o usando el atajo de teclado. El `background script` envía un mensaje al `content script` para iniciar la grabación.
2.  **Captura de Audio:** El `content script` utiliza la API `navigator.mediaDevices.getUserMedia` para acceder al micrófono y grabar el audio.
3.  **Transcripción:** El `content script` utiliza la función `transcribeAudio` (`src/utils/api.js`) para enviar el audio a la API Whisper de OpenAI. La API devuelve el texto transcrito.
4.  **Traducción (Opcional):** Si se activa la opción de traducción, el `content script` utiliza la función `translateText` (`src/utils/translation.js`) para enviar el texto transcrito a la API GPT de OpenAI. La API devuelve el texto traducido.
5.  **Visualización:** El `content script` muestra el texto transcrito (y eventualmente traducido) ya sea en el elemento activo de la página (si es un campo de texto o un elemento editable), o en un cuadro de diálogo.

### Comunicación

La comunicación entre el `background script` y el `content script` se realiza a través de la API de mensajería de Chrome (`chrome.runtime.sendMessage` y `chrome.runtime.onMessage`).

### Almacenamiento de Datos

La extensión utiliza `chrome.storage.sync` para almacenar:

*   La clave API de OpenAI (`apiKey`).
*   Las opciones de la extensión (visualización, traducción, colores del banner, etc.).

Estos datos se almacenan localmente en tu equipo, en el almacenamiento de la extensión de Chrome.

### Gestión de Errores
Los errores posibles (clave API ausente, error en la transcripción, etc.) se definen en el archivo `constants.js`. Las funciones de `api.js` y `translation.js` gestionan los posibles errores de las solicitudes a las APIs. El `content.js` muestra los mensajes de error al usuario a través de un banner en la parte superior de la página.

## 🛡️ Seguridad y Privacidad

- **Protección de Datos:**
  - La clave API se almacena de forma segura en Chrome.
  - La extensión no conserva tus datos de audio; todos los procesos se llevan a cabo en tiempo real.
  - La comunicación con las APIs se realiza a través de conexiones HTTPS seguras.

Para obtener información completa sobre cómo BabelFishAI gestiona tus datos, consulta nuestra [Política de Privacidad](PRIVACY.md).

## 🔧 Solución de Problemas

- **Problemas con el Micrófono:**
  - Verifica los permisos de acceso al micrófono en Chrome.
  - Asegúrate de que ninguna otra aplicación esté utilizando el micrófono simultáneamente.

- **Errores de Transcripción/Traducción:**
  - Verifica que la clave API sea válida y esté activa.
  - Asegúrate de contar con una conexión a Internet estable.
  - Consulta la consola de Chrome para obtener registros detallados en caso de error.

## 🤝 Contribución

Se reciben con agrado las contribuciones y sugerencias. Para contribuir:
- Reporta errores a través de la sección Issues en GitHub.
- Propón mejoras o nuevas funcionalidades.
- Envía tus pull requests.

## 📄 Licencia

Esta extensión se distribuye bajo la licencia GNU Affero General Public License v3.0 (AGPL-3.0). Consulta el archivo LICENSE para más detalles.

## 💝 Apoyo

Si aprecias esta extensión, puedes apoyar su desarrollo haciendo una donación a través de [PayPal](https://paypal.me/jls).
---
Desarrollado por jls42.org con pasión e innovación, Babel Fish AI impulsa la transcripción y la traducción hacia nuevos horizontes gracias a la inteligencia artificial de vanguardia.

**Este documento ha sido traducido de la versión fr a la lengua es utilizando el modelo o3-mini. Para más información sobre el proceso de traducción, consulta https://gitlab.com/jls42/ai-powered-markdown-translator**

