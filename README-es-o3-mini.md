# Babel Fish AI - Extensión de Transcripción de Voz y Traducción con IA

Babel Fish AI es una extensión de Chrome innovadora diseñada originalmente para ofrecer una transcripción de voz potente. Transforma tu voz en texto con una precisión notable gracias a la API Whisper de OpenAI, y obtén opcionalmente una traducción automática en tiempo real. Puedes usar Babel Fish AI exclusivamente para la transcripción o activar la traducción al vuelo según tus necesidades.

## 🌟 Funcionalidades

- **Transcripción de Voz Avanzada**
  - Captura de audio de alta calidad a través del micrófono de tu dispositivo.
  - Transcripción precisa realizada por la API Whisper de OpenAI.
  - Soporte multilingüe para el procesamiento de la voz y la visualización del texto, permitiendo transcribir entradas de voz en diferentes idiomas y mostrar los resultados en el idioma de tu elección.
  - Inserción automática del texto en el campo activo o visualización en un cuadro de diálogo dedicado.

- **Traducción Automática Integrada (Opcional)**
  - Traducción inmediata de las transcripciones a diversos idiomas, para activar si es necesario.
  - Uso de un modelo de IA avanzado para garantizar una traducción fiel al sentido original.
  - Elección libre de usar exclusivamente la transcripción o combinar transcripción y traducción.

- **Interfaz de Usuario Intuitiva y Personalizable**
  - Modo de visualización flexible: área de entrada activa o ventana de diálogo flotante.
  - Banner de estado configurable con elección de colores, opacidad y duración de visualización.
  - Atajo de teclado (Ctrl+Shift+1 o ⌘+Shift+1 en Mac) para iniciar/detener la grabación.
  - Ícono personalizado, que integra un micrófono y el número “42”, para un reconocimiento inmediato.

- **Opciones Avanzadas**
  - Modo experto para configuraciones detalladas (URLs de las API, configuración por dominio, etc.).
  - Posibilidad de personalizar los modelos de transcripción y de traducción.
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
- Holandés
- Polaco
- Portugués
- Rumano
- Sueco
- Chino

## 🚀 Instalación

1. **Descarga e Instalación:**
   - Clona este repositorio desde GitHub o descarga manualmente la carpeta de la extensión.
   - Abre Chrome y accede a `chrome://extensions/`.
   - Activa el «Modo desarrollador» en la parte superior derecha.
   - Haz clic en «Cargar extensión sin empaquetar» y selecciona la carpeta de Babel Fish AI.

2. **Verificación:**
   - Asegúrate de que la extensión aparece en la barra de herramientas de Chrome con el ícono personalizado.

## ⚙️ Configuración

1. **Clave API OpenAI:**
   - Haz clic en el ícono de la extensión para acceder a las opciones.
   - Ingresa tu clave API de OpenAI (disponible en [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Personalización de Opciones:**
   - Elige el modo de visualización (área activa o cuadro de diálogo).
   - Configura el color, la opacidad y la duración de visualización del banner de estado.
   - Selecciona los idiomas para la transcripción (entrada de voz) y para la visualización del texto.
   - Activa o desactiva la funcionalidad de traducción según tus necesidades.

## 🛠️ Funcionamiento Técnico

- **Arquitectura de la Extensión:**
  - **Manifest V3:** El archivo `manifest.json` define los scripts de contenido, el service worker (`background.js`) y los permisos necesarios.
  - **Scripts de Fondo y de Contenido:** El archivo `background.js` gestiona la lógica en segundo plano y la comunicación con las API, mientras que `content.js` se encarga de la interacción con la página web activa.
  - **Utilidades e Internacionalización:** La carpeta `src/utils` contiene módulos para gestionar la API, la interfaz de usuario, la traducción y la internacionalización a través de archivos de idioma en la carpeta `_locales`.

- **Proceso de Transcripción y Traducción:**
  1. **Inicio de la Grabación:** La extensión capta tu voz a través del micrófono cuando haces clic en el ícono o utilizas el atajo de teclado.
  2. **Transcripción:** El audio se envía a la API Whisper de OpenAI para ser convertido en texto, con soporte para múltiples idiomas de entrada.
  3. **Traducción (Opcional):** Si está activada, la transcripción se traduce automáticamente al idioma de destino seleccionado, manteniendo el significado y el contexto.
  4. **Visualización:** El texto transcrito (y eventualmente traducido) se inserta en el campo activo o se muestra en una ventana de diálogo personalizada.

## 🛡️ Seguridad y Privacidad

- **Protección de Datos:**
  - La clave API se almacena de forma segura en Chrome.
  - La extensión no conserva tus datos de audio; todos los procesos se realizan en tiempo real.
  - La comunicación con las API se realiza a través de conexiones HTTPS seguras.

## 🔧 Solución de Problemas

- **Problemas con el Micrófono:**
  - Verifica los permisos de acceso al micrófono en Chrome.
  - Asegúrate de que ninguna otra aplicación esté usando el micrófono simultáneamente.

- **Errores de Transcripción/Traducción:**
  - Verifica que la clave API sea válida y esté activa.
  - Asegúrate de tener una conexión a internet estable.
  - Revisa la consola de Chrome para obtener registros detallados en caso de error.

## 🤝 Contribución

Las contribuciones y sugerencias son bienvenidas. Para contribuir:
- Reporta errores a través de la sección Issues en GitHub.
- Propón mejoras o nuevas funcionalidades.
- Envía tus pull requests.

## 📄 Licencia

Esta extensión se distribuye bajo la licencia GNU Affero General Public License v3.0 (AGPL-3.0). Consulta el archivo LICENSE para más detalles.

## 💝 Apoyo

Si aprecias esta extensión, puedes apoyar su desarrollo haciendo una donación a través de [PayPal](https://paypal.me/jls).

---
Desarrollado por jls42.org con pasión e innovación, Babel Fish AI impulsa la transcripción y la traducción hacia nuevos horizontes gracias a la inteligencia artificial de punta.

**Este documento ha sido traducido de la versión fr a la lengua es utilizando el modelo o3-mini. Para más información sobre el proceso de traducción, consulta https://gitlab.com/jls42/ai-powered-markdown-translator**

