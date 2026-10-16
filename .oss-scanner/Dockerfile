# Build used by Anthropic's OSS Scanner (https://github.com/anthropics/oss-scanner): the image is built with network
# access, then the scan runs in it without any. tools/check of that repository builds it the same way.
#
# BabelFishAI is a Manifest V3 browser extension (Chrome and Firefox from one codebase), plain JavaScript with no
# bundler and no npm dependency. Building it means packaging the unpacked extension for each browser. The test suite
# is plain `node --test` (Node 22 or later) and runs offline.
FROM node:22-bookworm
ENV DEBIAN_FRONTEND=noninteractive \
    CI=true

# zip: scripts/build.sh. python3: scripts/mock-openai-server.py, a local stand-in for a provider API.
# chromium and firefox-esr: load the unpacked extension in a headless browser, offline.
# Debian packages are not pinned: the security archive drops superseded versions, so a pinned version would break the
# build after the next security update.
# hadolint ignore=DL3008
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates git python3 zip chromium firefox-esr fonts-dejavu-core \
    && rm -rf /var/lib/apt/lists/*

# puppeteer-core drives the two browsers above; it never downloads a browser of its own.
WORKDIR /opt/browser-tools
RUN npm init -y > /dev/null \
    && npm install --no-audit --no-fund --ignore-scripts puppeteer-core@25.12.0
ENV NODE_PATH=/opt/browser-tools/node_modules \
    CHROME_PATH=/usr/bin/chromium \
    FIREFOX_PATH=/usr/bin/firefox-esr

# scanner contract: the checkout lives inside the image, at /src
COPY . /src
WORKDIR /src

# Unpacked extensions: dist/chrome (manifest.json) and dist/firefox (manifest.firefox.json renamed manifest.json),
# with their zip archives.
RUN ./scripts/build.sh all

# Node test suite: the real files of src/ loaded with import(), browser APIs stubbed in tests/helpers/.
RUN ./scripts/run-tests.sh || echo "WARNING: the test suite reported failures"
