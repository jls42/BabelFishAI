/**
 * Définition partagée des langues disponibles pour BabelFishAI (Service Worker)
 * Cette variable est délibérément exposée globalement pour être utilisée par le service worker.
 */

// Définition pour le service worker (sans référence à window).
// L'assignation explicite à globalThis ci-dessous rend la consommation explicite
// (background.js lit `globalThis.AVAILABLE_LANGUAGES`) et évite les warnings
// "unused variable" des analyseurs statiques.
const AVAILABLE_LANGUAGES = [
    { value: 'en', text: 'English (en)' },
    { value: 'fr', text: 'Français (fr)' },
    { value: 'es', text: 'Español (es)' },
    { value: 'pt', text: 'Português (pt)' },
    { value: 'zh', text: '中文 (zh)' },
    { value: 'hi', text: 'हिंदी (hi)' },
    { value: 'ar', text: 'العربية (ar)' },
    { value: 'it', text: 'Italiano (it)' },
    { value: 'de', text: 'Deutsch (de)' },
    { value: 'sv', text: 'Svenska (sv)' },
    { value: 'pl', text: 'Polski (pl)' },
    { value: 'nl', text: 'Nederlands (nl)' },
    { value: 'ro', text: 'Română (ro)' },
    { value: 'ja', text: '日本語 (ja)' },
    { value: 'ko', text: '한국어 (ko)' },
];

// Exposition au scope global du service worker (background.js lit
// globalThis.AVAILABLE_LANGUAGES, cf. src/background.js).
globalThis.AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES;
