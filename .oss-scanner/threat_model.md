# Threat model

## What this project does and where untrusted input enters

BabelFishAI is a Manifest V3 browser extension, Chrome and Firefox from one codebase, in plain JavaScript with no
bundler and no npm dependency. It records the user's voice, sends it to the speech-to-text service of an AI
provider, and inserts the transcription into the focused field of the current page (or shows it in a dialog, or
copies it). It can also translate, rephrase or correct the transcription or a text selected on the page. The user
brings their own provider key: OpenAI, Mistral, Google Gemini, or an OpenAI-compatible endpoint they configure
("Custom", for example a LiteLLM proxy). There is no server of ours: requests go from the browser to the provider.

What it protects:

-   provider API keys, stored in `chrome.storage.sync` by the options page;
-   the microphone, and the text the user dictates or selects;
-   the extension's settings, which drive every later request;
-   the integrity of the pages where the extension inserts text, and the user's provider quota.

Untrusted input:

-   **Web pages.** The content script (`src/content.js` and the modules it imports from `src/utils/`) is injected
    on demand into the active tab (`activeTab` + `scripting`) when the user clicks the icon, presses the shortcut or
    uses the context menu. Under Firefox, `src/shortcut-guard.js` is also declared on `*://*/*`, in all frames, at
    `document_start`. A page controls its DOM, its events, the focus and the selection, and shares a renderer process
    with the content script. The status banner, the dialog and the language selector the extension adds live in the
    page's DOM.
-   **Text selected on a page**, received by the background through the context menu (`info.selectionText`), from
    any frame.
-   **Provider responses**: transcriptions, chat completions and error bodies, from the official APIs or from the
    user's Custom endpoint.
-   **Messages between extension contexts**: `runtime.onMessage` in `src/background.js` and `src/content.js`. Under
    Firefox, requests go through the background (`proxyFetch`), which must keep the key/origin invariant below even
    if a content script is compromised.
-   **Stored settings**, written by the options page (`src/pages/options/`), possibly synced from another device or
    written by another version of the extension.
-   **`web_accessible_resources`**, exposed to every origin.

Intended invariants:

-   A key is sent only to an exact origin (scheme, host and port) configured for its provider: a registry URL
    (`src/utils/providers.js`), or a URL the user set for Custom. See `assertRequestAllowed` in
    `src/utils/api-utils.js`, `resolveProxyAuth` in `src/background.js` and `src/utils/provider-store.js`.
-   A web page cannot read the stored keys or settings, and cannot start a recording, a provider request, a settings
    change or an insertion without the user's action.
-   Text the extension inserts or displays never executes as script, in a page or in an extension page.
-   The extension never moves text from one origin to another origin that the user did not act on.

## Components that matter most / least

-   Most: `src/background.js` (messages, Firefox proxy, context menus, injection), `src/utils/api-utils.js`,
    `src/utils/provider-store.js`, `src/utils/provider-adapters.js`, `src/utils/providers.js`, the content script and
    its modules (`focus-utils.js` for insertion, `banner-utils.js`, `ui.js`, `transcription-display.js`, `i18n.js`,
    `recording-utils.js`, `event-handlers.js`, `error-utils.js`, `text-processing.js`), `src/shortcut-guard.js`, the
    options page (`src/pages/options/`, which runs in the extension's origin and holds the keys), and both manifests
    (`manifest.json` for Chrome, `manifest.firefox.json` for Firefox).
-   Less: `scripts/` (developer tooling: packaging, README translation, pre-commit helpers),
    `scripts/mock-openai-server.py` (local test server), `tests/`, `docs/`.
-   Out of scope: `src/lib/browser-polyfill.min.js` (vendored webextension-polyfill) unless the extension's own code
    makes a defect in it reachable, and the translated `README-*.md` files.

## How to exercise it

-   `./scripts/run-tests.sh`: the Node test suite (Node 22 or later, offline, about one second). It loads the real
    files of `src/` with `import()`, with the browser APIs stubbed in `tests/helpers/` (`chrome-stub.mjs`,
    `env.mjs`). It covers Chrome and Firefox: under Firefox, the real `background.js` receives the content script's
    `proxyFetch` messages. Snapshots in `tests/snapshots/` record the current behaviour; regenerate them only by
    running the code (`--update`).
-   `python3 scripts/mock-openai-server.py [port]`: an OpenAI-compatible server on `http://localhost:8765` that logs
    what the extension sends. Configure the Custom provider with it. Use dummy keys only, never a real provider key.
-   `dist/chrome/` and `dist/firefox/` hold the unpacked extensions, built in the image by `./scripts/build.sh all`.
    Chromium (`$CHROME_PATH`) and Firefox ESR (`$FIREFOX_PATH`) are installed with `puppeteer-core`
    (`require('puppeteer-core')` from a CommonJS script, found through `NODE_PATH`), so the extension can be loaded in
    a headless browser against test pages served from loopback, with no network:
    -   Chromium: `puppeteer.launch()` with `executablePath: process.env.CHROME_PATH`, `headless: true`,
        `args: ['--no-sandbox']` and `enableExtensions: ['/src/dist/chrome']`, then wait for the `service_worker` target
        whose URL starts with `chrome-extension://`;
    -   Firefox: `puppeteer.launch()` with `browser: 'firefox'`, `executablePath: process.env.FIREFOX_PATH` and
        `headless: true`, then `browser.installExtension('/src/dist/firefox')`, which installs it as a temporary add-on.

## How you rate severity

-   Critical: a stored key reaches a web page, another extension, or an origin not configured for its provider; script
    execution in the extension's own origin (options page, Chrome service worker, Firefox background page).
-   High: script execution in a web page caused by the extension, from content the page did not run as script
    (selected text, a provider response); a web page or another extension that triggers, without the user's action, a
    recording, a provider request with the user's key, or a change to the stored settings; the extension revealing
    dictated, selected or processed text to an origin the user did not act on; the Firefox proxy sending a request
    that breaks the key/origin invariant.
-   Medium: markup injection without script execution (links, images, styles) into a page or the extension's UI;
    issues that need an uncommon but supported configuration; issues reachable only from a compromised content
    script (the Firefox proxy checks are defence in depth).
-   Low: fingerprinting of the extension through `web_accessible_resources`, disclosure of non-secret internals,
    denial of service limited to the extension on the user's device.

## Anything to leave alone

-   Out of scope, as in `SECURITY.md`: TLS or MITM on provider endpoints; compromise of the browser, the operating
    system or the extension's storage; local denial of service; keys the user shares outside the extension; a Custom
    endpoint deliberately pointed at a malicious server; provider-side issues (outages, quota, what a model says). How
    the extension renders or acts on a provider response stays in scope.
-   Documented behaviour, not a vulnerability: under Chrome the provider receives the origin of the page where the
    extension runs; keys follow the browser's sync (both in `PRIVACY.md`).
-   Reports: English or French. Include a minimal reproduction, with the Node harness of `tests/helpers/` or a
    headless browser and the local mock server, and a patch with a regression test under `tests/` that fails before
    it and passes after it. Patches follow `CLAUDE.md` (French comments, `globalThis`, no `innerHTML`). One report per
    root cause; list the affected call sites in that report rather than filing one report each.
