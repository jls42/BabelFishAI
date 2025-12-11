# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BabelFishAI is a Chrome extension (Manifest V3) for AI-powered voice transcription and translation. It uses OpenAI's Whisper API for transcription and GPT models for translation/rephrasing. Supports 15 languages and LiteLLM Proxy for alternative AI providers.

**Primary Language:** French (for comments, documentation, and user-facing messages)

## Development Workflow

**No build system** - Pure JavaScript with ES6 modules. Development is straightforward:
1. Edit source files directly
2. Go to `chrome://extensions/` → Enable Developer mode
3. Click "Load unpacked" and select this folder (or click reload if already loaded)
4. Test changes in browser

## Architecture

### Global Namespaces
- `window.BabelFishAIConstants` - Configuration constants
- `window.BabelFishAIUtils` - Utility functions (recording, text, UI, etc.)
- `window.BabelFishAI` - Main application state

### Key Files
- `manifest.json` - Extension configuration (Manifest V3)
- `src/background.js` - Service worker handling events, icon clicks, keyboard shortcuts, context menu
- `src/content.js` - Main script injected into pages, coordinates all modules
- `src/constants.js` - Global constants (errors, states, actions)

### Utility Modules (`src/utils/`)
| Module | Purpose |
|--------|---------|
| `api.js`, `api-utils.js` | API interactions (Whisper, GPT) |
| `translation.js`, `text-translation.js` | Translation and rephrasing |
| `recording-utils.js` | Audio recording via MediaRecorder |
| `banner-utils.js` | Status banner UI and language selector |
| `focus-utils.js` | Focus/selection save and restore |
| `ui.js` | General UI utilities |
| `event-handlers.js` | User interaction handlers |
| `error-utils.js` | Error handling and display |
| `text-processing.js` | Text manipulation |
| `transcription-display.js` | Result display logic |
| `languages*.js` | Language definitions (3 files for different contexts) |
| `i18n.js` | Internationalization |

### Communication Flow
1. User clicks icon or uses `Ctrl+Shift+1` / `⌘+Shift+1`
2. `background.js` receives event, injects content script if needed
3. `content.js` records audio, calls APIs, displays results
4. Context menu actions handled similarly for text selection

### Data Storage
Uses `chrome.storage.sync` for: API key, display preferences, language settings, UI customization.

## Critical Development Rules

### Refactoring Guidelines
The project is undergoing modular refactoring from a monolithic `content.js`. When migrating code:

1. **NEVER modify business logic** during migration
2. **Preserve exact API prompts and parameters** - do not change OpenAI prompts
3. **Maintain function signatures** - same parameters, same order
4. **Keep all comments** from original code
5. **Test after each migration** before proceeding

### CSS Class Names (must be exact)
- `whisper-toggle-button` (not `whisper-control-button`)
- `whisper-button-icon`
- `whisper-button-text`
- `whisper-language-container`
- Use `data-active="true"/"false"` for button states

### Translation Files
- Update French (`_locales/fr/messages.json`) first for new features
- Other languages only when explicitly requested
- 15 supported locales: ar, de, en, es, fr, hi, it, ja, ko, nl, pl, pt, ro, sv, zh

### Module Exposure Pattern
```javascript
window.BabelFishAIUtils = window.BabelFishAIUtils || {};
window.BabelFishAIUtils.moduleName = {
    functionName: functionName,
    // ...
};
```

## APIs Used

- **Whisper API**: `https://api.openai.com/v1/audio/transcriptions` (transcription)
- **GPT API**: `https://api.openai.com/v1/chat/completions` (translation/rephrasing, model: gpt-4o-mini)
- Both configurable via Expert mode for LiteLLM Proxy compatibility

## Known Issues & Solutions

- **Banner not disappearing on cancel**: Use `hideBanner` directly with reduced delay
- **Code duplication**: Centralize function exposure in single block per module
- **NoLog option**: Only for LiteLLM Proxy, causes errors with official OpenAI API
