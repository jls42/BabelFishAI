// Background sous Chrome (service worker)
import { defineBackgroundSuite } from './helpers/background-suite.mjs';

defineBackgroundSuite({ browser: 'chrome', testFileUrl: import.meta.url });
