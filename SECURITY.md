# Security Policy

## Supported Versions

Only the latest version published on the official stores is supported:

-   **Chrome Web Store** — latest released build
-   **Firefox Add-ons (AMO)** — latest released build

Older versions (including unreleased branches in this repo) do not receive
security fixes.

## Reporting a Vulnerability

Please report security issues privately by email to
[le.saux.julien@gmail.com](mailto:le.saux.julien@gmail.com).

When possible, include:

-   A clear description of the issue and its potential impact
-   Steps to reproduce (URL of the affected page, exact extension config, browser
    version)
-   Proof of concept if applicable (screenshot, video, minimal script)
-   Whether you would like to be credited in the fix changelog

Please **do not open a public GitHub issue** for security findings before a
fix is shipped.

## Response Objectives

These are best-effort targets, not contractual SLAs (the project is maintained
by a single individual):

-   Initial triage acknowledgement: within 72 hours
-   Critical fix targeted: within 7 days where feasible
-   Less severe issues: addressed in the next regular release

## In Scope

Vulnerabilities that the project can realistically prevent or mitigate:

-   **XSS via DOM injection** in third-party pages where the extension injects
    content scripts (status banner, dialog box, language selector).
-   **Leak or exposure of API keys** stored in `chrome.storage.sync`
    (OpenAI / Mistral / LiteLLM credentials configured by the user).
-   **Mis-routing, downgrade or unintended exposure** of API calls to the
    official providers (OpenAI, Mistral, LiteLLM proxy).
-   **CSP bypass** in the Firefox `proxyFetch` background script.
-   **Cross-extension or cross-origin data exfiltration** triggered by the
    extension itself.
-   **Manifest V3 permission abuse** (over-broad host access, unintended
    privilege escalation).

## Out of Scope

The following are not vulnerabilities of this extension:

-   **TLS / MITM** of API endpoints — handled by the browser's TLS stack.
-   **Compromise of the user's browser, OS, or extension storage** prior to use.
-   **DoS local to the user's device** (the extension does not run remote code).
-   **API key sharing or accidental disclosure by the user** outside the
    extension's UI.
-   **Findings limited to non-standard user configuration** (e.g. arbitrary
    custom LiteLLM endpoints pointing at malicious servers).
-   **Third-party provider issues** (OpenAI / Mistral side outages, API quota
    abuse, model output content).

## Coordinated Disclosure

If you report a confirmed issue, we will work with you on a disclosure
timeline. Default target: public disclosure once a fix is released to both
Chrome Web Store and Firefox AMO, or within 90 days of the initial report,
whichever comes first.
