**Artículo traducido del fr al es con gpt-5.6-sol.**

# Babel Fish AI - Extensión de transcripción de voz y traducción con IA

<img src="images/icon128.png" alt="Icono de Babel Fish AI" width="128" height="128">

**Sitio oficial: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**Para utilizar la extensión, necesitará una clave API de uno de los providers compatibles:**

|                             Provider                             | Obtener una clave API                                                                               |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
|                                🚅                                | **Custom/LiteLLM**: Para utilizar sus propios endpoints API                                      |

Babel Fish AI es una innovadora extensión de navegador diseñada para ofrecer una potente transcripción de voz compatible con múltiples providers. Transforme su voz en texto con una precisión extraordinaria gracias a las API de transcripción de Mistral AI (Voxtral) u OpenAI (Whisper) y, opcionalmente, disfrute de traducción automática en tiempo real. Puede utilizar Babel Fish AI exclusivamente para la transcripción o activar la traducción sobre la marcha según sus necesidades.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Insignia de Codacy](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Estado de la puerta de calidad](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Clasificación de seguridad](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Clasificación de mantenibilidad](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilidades](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Deuda técnica](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Líneas de código](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funcionalidades

-   **Transcripción de voz avanzada**

    -   Captura de audio de alta calidad mediante el micrófono de su dispositivo.
    -   Transcripción precisa mediante las API Voxtral (Mistral AI) o Whisper (OpenAI).
    -   Compatibilidad con múltiples providers: elija libremente entre Mistral AI, OpenAI o un endpoint personalizado.
    -   Compatibilidad multilingüe para el reconocimiento de voz y la visualización del texto, lo que permite transcribir entradas de voz en diferentes idiomas y mostrar los resultados (transcripción y traducción, si está activada) en el idioma que prefiera.
    -   Inserción automática del texto en el campo activo o visualización en un cuadro de diálogo específico.

-   **Traducción y reformulación inteligentes**

    -   Traducción inmediata de las transcripciones a diversos idiomas, que puede activarse cuando sea necesario.
    -   Reformulación del texto para mejorar su estilo y claridad.
    -   Uso de un modelo de IA avanzado para garantizar una traducción fiel al sentido original.
    -   Libertad para utilizar exclusivamente la transcripción o combinar la transcripción y la traducción.

-   **Potente menú contextual**

    -   Opción "Reformular la selección" para mejorar al instante los textos seleccionados.
    -   Opción "Traducir la selección" con un submenú de todos los idiomas disponibles.
    -   Opción "Corregir la ortografía" para corregir errores ortográficos, gramaticales y de puntuación.
    -   Sustitución directa del texto seleccionado por su versión traducida, reformulada o corregida.
    -   Integración perfecta en la interfaz de usuario nativa del navegador.

-   **Interfaz de usuario intuitiva y personalizable**

    -   Modo de visualización flexible: área de entrada activa o ventana de diálogo flotante.
    -   Barra de estado configurable con selección de colores, opacidad y duración de visualización.
    -   Atajo de teclado (Ctrl+Shift+1 o ⌘+Shift+1 en Mac) para iniciar/detener la grabación.
    -   En Firefox, «atajo prioritario» para los sitios cuyo editor de páginas intercepta la combinación (ChatGPT, Notion…): activo desde la instalación y desactivable desde las opciones (consulte [PRIVACY.md](PRIVACY.md)).
    -   Opción "Mantener abierto" para controlar la duración de visualización de los resultados.
    -   Icono personalizado que integra un micrófono y el número "42" para reconocerlo de inmediato.

-   **Opciones avanzadas**
    -   Compatibilidad con múltiples providers: Mistral AI, OpenAI y Custom/LiteLLM para lograr la máxima flexibilidad.
    -   Posibilidad de personalizar los modelos de transcripción y traducción por provider.
    -   Modelos OpenAI disponibles: GPT-4o mini (predeterminado), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** y **GPT-5.6 (luna/terra/sol)**. Transcripción: whisper-1 (predeterminado), gpt-4o-mini-transcribe, gpt-4o-transcribe y **gpt-transcribe**.
    -   Modelos Mistral disponibles: Mistral Small (predeterminado), Mistral Medium, Mistral Large, Codestral y **Ministral 3 (3B/8B/14B)**. Transcripción: Voxtral Mini. Se admiten las respuestas de los modelos Mistral que razonan (bloques de reflexión).
    -   Los ajustes que utilizaban gpt-4.1-nano (retirada de la API de OpenAI el 23/10/2026) o gpt-4o cambian automáticamente a gpt-5.6-luna y gpt-4.1 durante la actualización.
    -   Selección independiente del provider para la transcripción y la traducción/reformulación.
    -   Compatibilidad con LiteLLM Proxy mediante el provider Custom para conectarse a modelos alternativos.
    -   Gestión completa de la internacionalización gracias a los archivos de idioma (\_locales), que ofrecen una interfaz y compatibilidad de voz en varios idiomas.

## 🌐 Idiomas compatibles

Esta es la lista de idiomas compatibles con Babel Fish AI, con enlaces a vídeos de demostración:

-   [Árabe](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [Alemán](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [Inglés](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [Español](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [Francés](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [Italiano](https://www.youtube.com/watch?v=QgYZt8myods)
-   [Japonés](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [Coreano](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [Neerlandés](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [Polaco](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [Portugués](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [Rumano](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [Sueco](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [Chino](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Instalación

### Chrome

1.  **Descarga e instalación:**

    -   Clone este repositorio desde GitHub o descargue manualmente la carpeta de la extensión.
    -   **O instale directamente la extensión desde [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   Abra Chrome y acceda a `chrome://extensions/`.
    -   Active el «Modo de desarrollador» en la esquina superior derecha.
    -   Haga clic en «Cargar extensión sin empaquetar» y seleccione la carpeta de Babel Fish AI.

2.  **Verificación:**
    -   Asegúrese de que la extensión aparezca en la barra de herramientas del navegador con el icono personalizado.

### Firefox

1.  **Descarga e instalación:**

    -   **Instale directamente la extensión desde [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   O, para realizar la instalación manual: clone este repositorio desde GitHub y, a continuación, ejecute `./scripts/build.sh firefox`, que prepara `dist/firefox/` con el manifest de Firefox renombrado como `manifest.json`.
    -   Abra Firefox y acceda a `about:debugging#/runtime/this-firefox` (y no a «Instalar complemento desde un archivo» en `about:addons`, reservado para las extensiones firmadas).
    -   Haga clic en «Cargar complemento temporal...».
    -   Seleccione el archivo `dist/firefox/manifest.json`.

2.  **Verificación:**
    -   Asegúrese de que la extensión aparezca en la barra de herramientas de Firefox con el icono personalizado.

## ⚙️ Configuración

1.  **Configuración del provider de IA:**

    -   Haga clic en el icono de la extensión para acceder a las opciones.
    -   Seleccione su provider en el menú desplegable (Mistral AI, OpenAI o Custom/LiteLLM).
    -   Introduzca su clave API:
        -   **Mistral AI**: disponible en [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: disponible en [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    -   Active el provider mediante el interruptor situado junto al menú desplegable.

2.  **Personalización de las opciones:**

    -   Elija el modo de visualización (área activa o cuadro de diálogo).
    -   Configure el color, la opacidad y la duración de visualización de la barra de estado.
    -   Seleccione los idiomas para la transcripción (entrada de voz) y para la visualización del texto.
    -   Active o desactive la función de traducción según sus necesidades.

3.  **(Opcional) Configuración avanzada de los modelos:**
    -   En las opciones de cada provider, haga clic en "Configuración de los modelos" para personalizar los modelos utilizados.
    -   Puede añadir modelos personalizados para la transcripción y la traducción/reformulación.
    -   Si hay varios providers activados, puede elegir cuál utilizar para cada servicio (transcripción y traducción).

## 🚀 Uso con LiteLLM Proxy o endpoints personalizados

Babel Fish AI es compatible con [LiteLLM Proxy](https://litellm.ai/) y otros proxies API compatibles con OpenAI, lo que permite utilizar modelos de lenguaje alternativos.

### Configuración

1.  **Instale y configure su proxy:** Siga las instrucciones del servicio que utilice (LiteLLM, etc.).
2.  **Configure la extensión Babel Fish AI:**
    -   En las opciones de la extensión, seleccione el provider **Custom/LiteLLM** en el menú desplegable.
    -   Introduzca su clave API (si es necesario).
    -   Configure las URL de las API:
        -   **URL de transcripción**: por ejemplo, `http://localhost:4000/v1/audio/transcriptions`
        -   **URL de chat**: por ejemplo, `http://localhost:4000/v1/chat/completions`
    -   Active el provider mediante el interruptor.
    -   Marque la opción **"NoLog"** si desea desactivar el registro de solicitudes por parte de LiteLLM.

**Importante:** La opción "NoLog" está disponible **únicamente** en el provider Custom/LiteLLM. No es compatible con las API oficiales de OpenAI o Mistral AI.

## 🛠️ Funcionamiento técnico

### Arquitectura de la extensión

La extensión se compone de varios archivos JavaScript que interactúan entre sí:

#### Archivos principales

-   **`manifest.json`:** El archivo de configuración principal de la extensión. Define los permisos, los scripts, los recursos accesibles, etc. Utiliza la versión 3 del manifest y declara los permisos `activeTab`, `storage`, `commands`, `scripting` y `contextMenus`.
-   **`background.js`:** El service worker que se ejecuta en segundo plano. Gestiona los eventos (clic en el icono, atajos de teclado, menú contextual), inyecta el `content script` si es necesario y se comunica con el `content script`.
-   **`content.js`:** El script principal que se inyecta en las páginas web. Coordina los distintos módulos de utilidades y gestiona el flujo global de la extensión.
-   **`src/constants.js`:** Define constantes para la configuración, los estados, las acciones, etc.

#### Módulos de utilidades

La extensión utiliza una arquitectura modular con varios archivos de utilidades especializados:

##### Gestión de providers y API

-   **`src/utils/providers.js`:** Registro de los providers de IA (Mistral AI, OpenAI, Custom/LiteLLM) con sus configuraciones, modelos y URL predeterminadas.
-   **`src/utils/api-utils.js`:** Funciones para interactuar con las API externas, resolver la configuración de múltiples providers y transcribir audio.
-   **`src/utils/text-processing.js`:** Funciones de procesamiento de texto: traducción, reformulación y corrección ortográfica.

##### Interfaz de usuario e interacción

-   **`src/utils/ui.js`:** Funciones de utilidades generales para la interfaz de usuario.
-   **`src/utils/banner-utils.js`:** Gestiona la barra de estado, sus controles y el selector de idioma.
-   **`src/utils/focus-utils.js`:** Gestiona el guardado y la restauración del foco y de la selección de texto.
-   **`src/utils/transcription-display.js`:** Gestiona la visualización de los resultados de la transcripción.
-   **`src/utils/error-utils.js`:** Gestiona la visualización y el procesamiento de errores.
-   **`src/styles/content.css`:** Estilos CSS para la interfaz de usuario inyectada en las páginas web.

##### Grabación y eventos

-   **`src/utils/recording-utils.js`:** Gestiona la grabación de audio mediante el micrófono y el procesamiento de los datos de audio.
-   **`src/utils/event-handlers.js`:** Contiene los controladores de eventos para las interacciones del usuario.

##### Internacionalización e idiomas

-   **`src/utils/languages.js`:** Define los idiomas compatibles con la extensión.
-   **`src/utils/languages-shared.js`:** Define la lista de idiomas compatibles para el contexto de la página web.
-   **`src/utils/languages-data.js`:** Define la lista de idiomas compatibles para el service worker.
-   **`src/utils/i18n.js`:** Gestiona la internacionalización de la interfaz de usuario.

##### Página de opciones

-   **`src/pages/options/`:** Contiene los archivos de la página de opciones de la extensión (HTML, CSS, JavaScript).

### Proceso de transcripción y traducción

#### Función principal de transcripción de voz

1.  **Inicio de la grabación:** El usuario inicia la grabación haciendo clic en el icono de la extensión o utilizando el atajo de teclado (Ctrl+Shift+1 o ⌘+Shift+1 en Mac). El `background script` envía un mensaje al `content script` para iniciar la grabación.
2.  **Captura de audio:** El `content script` utiliza la API `navigator.mediaDevices.getUserMedia` para acceder al micrófono y grabar el audio mediante la API MediaRecorder.
3.  **Transcripción:** El `content script` utiliza la función `transcribeAudio` (`src/utils/api-utils.js`) para enviar el audio a la API de transcripción del provider configurado (Voxtral para Mistral AI, Whisper para OpenAI). La API devuelve el texto transcrito.
4.  **Traducción o reformulación (opcional):**

-   Si la opción de traducción está activada, el `content script` utiliza la función `translateText` (`src/utils/text-processing.js`) para enviar el texto transcrito a la API de chat del provider configurado.
-   Si la opción de reformulación está activada, se utiliza la función `rephraseText` para mejorar el texto transcrito.

5.  **Visualización:** El `content script` muestra el texto procesado en el elemento activo de la página (si es un campo de texto o un elemento editable) o en un cuadro de diálogo personalizado.

#### Función de menú contextual

1. **Selección de texto:** El usuario selecciona texto en una página web.
2. **Menú contextual:** Al hacer clic con el botón derecho, se muestran las opciones:
    - "Reformular la selección" para mejorar el estilo y la claridad
    - "Traducir la selección" con un submenú de los idiomas disponibles
    - "Corregir la ortografía" para corregir los errores
3. **Procesamiento:** Según la opción elegida:
    - El texto se envía para su reformulación mediante la función `rephraseText`
    - El texto se envía para su traducción mediante la función `translateText` con el idioma de destino seleccionado
    - El texto se envía para su corrección mediante la función `correctText`
4. **Visualización:** El resultado sustituye a la selección original en el elemento donde se encuentra el texto seleccionado.

### Comunicación

La comunicación entre el `background script` y el `content script` se realiza mediante la API de mensajería de Chrome (`chrome.runtime.sendMessage` y `chrome.runtime.onMessage`).

### Almacenamiento de datos

La extensión utiliza `chrome.storage.sync` para almacenar:

-   La configuración de los providers de IA (claves API, modelos seleccionados, URL personalizadas).
-   Las opciones de la extensión (visualización, traducción, colores de la barra, etc.).
-   Las preferencias de idioma para la traducción.

Estos datos se almacenan localmente en su ordenador, en el almacenamiento de la extensión del navegador.
### Gestión de errores

Los posibles errores (clave API ausente, error de transcripción, etc.) se definen en el archivo `constants.js`. Las funciones `api-utils.js` y `text-processing.js` gestionan los posibles errores de las llamadas a la API con mensajes mejorados según el código HTTP. El `content.js` muestra los mensajes de error al usuario mediante un banner en la parte inferior de la página.

## 🛡️ Seguridad y privacidad

-   **Protección de datos:**
    -   La clave API se almacena de forma segura en el navegador.
    -   La extensión no conserva sus datos de audio; todo el procesamiento se realiza en tiempo real.
    -   La comunicación con las API se realiza mediante conexiones HTTPS seguras.

Para obtener información completa sobre cómo BabelFishAI gestiona sus datos, consulte nuestra [Política de privacidad](PRIVACY.md).

## 🔧 Solución de problemas

-   **Problemas con el micrófono:**

    -   Compruebe los permisos de acceso al micrófono en su navegador.
    -   Asegúrese de que ninguna otra aplicación esté utilizando el micrófono simultáneamente.

-   **Errores de transcripción/traducción:**
    -   Compruebe que la clave API sea válida y esté activa.
    -   Asegúrese de tener una conexión a Internet estable.
    -   Consulte la consola del navegador para obtener logs detallados en caso de error.

## 🤝 Contribución

Las contribuciones y sugerencias son bienvenidas. Para contribuir:

-   Informe de los bugs mediante la sección Issues de GitHub.
-   Proponga mejoras o nuevas funcionalidades.
-   Envíe sus pull requests.

## 📄 Licencia

Esta extensión se distribuye bajo la licencia GNU Affero General Public License v3.0 (AGPL-3.0). Consulte el archivo LICENSE para obtener más detalles.

## 💝 Apoyo

## Si le gusta esta extensión, puede apoyar su desarrollo haciendo una donación a través de [PayPal](https://paypal.me/jls).

Desarrollado por jls42.org con pasión e innovación, Babel Fish AI impulsa la transcripción y la traducción hacia nuevos horizontes gracias a la inteligencia artificial de vanguardia.
