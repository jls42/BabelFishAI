// Requêtes envoyées sous Chrome : le content script appelle fetch directement.
import { defineRequestSuite } from './helpers/requests-suite.mjs';

await defineRequestSuite({ browser: 'chrome', testFileUrl: import.meta.url });
