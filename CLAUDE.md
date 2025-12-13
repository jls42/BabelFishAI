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

**Active modules (to use):**
| Module | Purpose |
|--------|---------|
| `api-utils.js` | API interactions - multi-provider (Whisper, GPT) |
| `text-processing.js` | Translation, rephrasing, text manipulation |
| `recording-utils.js` | Audio recording via MediaRecorder |
| `banner-utils.js` | Status banner UI and language selector |
| `focus-utils.js` | Focus/selection save and restore |
| `ui.js` | General UI utilities (dialogs, buttons, timer) |
| `event-handlers.js` | User interaction handlers |
| `error-utils.js` | Error handling and display |
| `transcription-display.js` | Result display logic |
| `providers.js` | AI provider registry (OpenAI, Mistral) |
| `languages-shared.js` | Language definitions (single source of truth) |
| `languages-data.js` | Language data for Service Worker context |
| `i18n.js` | Internationalization |

**DEPRECATED modules (do NOT use, to be removed):**
| Module | Replacement |
|--------|-------------|
| `api.js` | Use `api-utils.js` instead |
| `translation.js` | Use `text-processing.js` instead |
| `text-translation.js` | Use `text-processing.js` instead |
| `languages.js` | Use `languages-shared.js` instead |

### Communication Flow
1. User clicks icon or uses `Ctrl+Shift+1` / `⌘+Shift+1`
2. `background.js` receives event, injects content script if needed
3. `content.js` records audio, calls APIs, displays results
4. Context menu actions handled similarly for text selection

### Data Storage
Uses `chrome.storage.sync` for: API key, display preferences, language settings, UI customization.

## Critical Development Rules

### General Rules
1. **Primary language**: French for comments and user-facing messages
2. **Security**: NEVER expose API keys or sensitive URLs directly
3. **Documentation**: Document all feature changes in `README.md`
4. **Expert mode**: Respect expert mode and advanced options as described in user documentation
5. **Testing**: Always test after each function migration
6. **i18n integrity**: Ensure integrity of internationalization files (`_locales/`)
7. **i18n validation**: Run `./scripts/check-i18n.sh` after modifying translations or adding new i18n keys to detect missing translations and dead keys

### Refactoring Guidelines
The project is undergoing modular refactoring from a monolithic `content.js`. When migrating code:

1. **NEVER modify business logic** during migration
2. **Preserve exact API prompts and parameters** - do not change OpenAI prompts
3. **Maintain function signatures** - same parameters, same order
4. **Keep all comments** from original code (including JSDoc)
5. **Test after each migration** before proceeding
6. **Progressive approach** - migrate one function at a time, not everything at once
7. **Preserve API structure** - keep optional parameters, timeouts, and retry mechanisms
8. **Do NOT simplify or "improve"** existing code without explicit request
9. **Maintain backward compatibility** with existing code during transition
10. **Avoid duplications** - no duplicate code or unused variables
11. **Verify original code** before migrating to preserve all edge cases and conditions

### Migration Procedure
1. **Preliminary analysis**: Examine function dependencies, global variables, usage context
2. **Identify dependencies**: List all variables, constants, and helper functions used
3. **Progressive extraction**: Migrate one function, verify references in content.js are updated
4. **Verify calls**: Ensure same parameters in same order as original code
5. **Namespace management**: Use `window.BabelFishAIUtils` structure consistently
6. **Preserve comments**: Keep all explanatory comments including JSDoc
7. **Verify constants**: Ensure all constants are available in new context
8. **Integration test**: Verify integration with rest of code works correctly

### Errors to Avoid
- Do NOT modify API prompts (OpenAI, Whisper, etc.)
- Do NOT change configuration object structure or parameters
- Do NOT alter error handling or error messages
- Do NOT remove or modify explanatory comments
- Do NOT add unrequested features or optimizations
- Do NOT rename functions or variables to "improve" them
- Do NOT reorder function parameters
- Do NOT modify UI animation/transition behavior (especially language selector)
- Do NOT alter show/hide logic for UI elements like language container
- Do NOT invent new parameters or options that didn't exist in original code

### CSS Class Names (must be exact)
- `whisper-toggle-button` (not `whisper-control-button`)
- `whisper-button-icon`
- `whisper-button-text`
- `whisper-language-container`
- Use `data-active="true"/"false"` for button states
- Prefer external CSS (in `content.css`) over inline styles in JavaScript

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

### Inter-module Communication
Modules communicate via global namespaces (`window.BabelFishAI` and `window.BabelFishAIUtils`).
Example: `window.BabelFishAIUtils.recording.startRecording()` to call a recording module function.

## APIs Used

- **Whisper API**: `https://api.openai.com/v1/audio/transcriptions` (transcription)
- **GPT API**: `https://api.openai.com/v1/chat/completions` (translation/rephrasing, model: gpt-4o-mini)
- **Mistral API**: `https://api.mistral.ai/v1/chat/completions` (alternative provider)
- All configurable via Expert mode for LiteLLM Proxy compatibility

## Known Issues & Solutions

- **Banner not disappearing on cancel**: Use `hideBanner` directly with reduced delay
- **Code duplication**: Centralize function exposure in single block per module
- **NoLog option**: Only for LiteLLM Proxy, causes errors with official OpenAI API

## Technical Debt (Audit Dec 2025)

### Files to Remove (~600 lines of dead code)
1. `src/utils/api.js` - Completely deprecated, delegates to api-utils.js
2. `src/utils/translation.js` - Duplicates text-processing.js
3. `src/utils/text-translation.js` - Duplicates text-processing.js

### Duplications to Consolidate
- Banner functions duplicated between `ui.js` and `banner-utils.js`
- Language definitions exist in 4 places (consolidate to `languages-shared.js`)
- ERRORS constants copied locally in some modules (should use `constants.js`)

### Over-exposed Internal Functions
- `focus-utils.js` exports 17 functions (reduce to ~7 public ones)
- `ui.js` exports helpers that should be private

## Developer Notes

- Check `manifest.json` to understand extension structure
- Use Chrome debugging tools to test changes
- Check console logs to identify potential issues
- Refactoring aims to improve maintainability without changing extension behavior

## Git Workflow

**OBLIGATOIRE** : Pour créer un commit, utiliser `Skill` avec le skill de commit. Ne JAMAIS faire de commit manuellement.
