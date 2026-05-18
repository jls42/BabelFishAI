#!/usr/bin/env bash
# SAST scan via Opengrep (OSS fork of Semgrep CE) with Semgrep fallback.
# Configs: p/javascript, p/security-audit, p/default.
# Gates:
#   - local + tool absent → skip with warning (exit 0)
#   - local + tool present + findings → fail (exit 1)
#   - CI (CI or GITHUB_ACTIONS set) + tool absent → fail (exit 1)
#   - CI + findings → fail (exit 1)
# Severity threshold: ERROR.

set -euo pipefail

# Determine CI mode (any non-empty CI or GITHUB_ACTIONS = CI)
if [[ -n "${CI:-}${GITHUB_ACTIONS:-}" ]]; then
    IS_CI=1
else
    IS_CI=0
fi

# Pick tool (opengrep preferred, semgrep fallback)
if command -v opengrep >/dev/null 2>&1; then
    TOOL=opengrep
elif command -v semgrep >/dev/null 2>&1; then
    TOOL=semgrep
else
    if [[ $IS_CI -eq 1 ]]; then
        echo "[fatal] opengrep/semgrep required in CI but not found" >&2
        exit 1
    fi
    echo "[skip] opengrep/semgrep absent (local mode)" >&2
    exit 0
fi

echo "[info] Running SAST with $TOOL (severity ERROR)" >&2

# Move to repo root (script can be called from anywhere)
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT"

# Common args
COMMON_ARGS=(
    --config=p/javascript
    --config=p/security-audit
    --config=p/default
    --severity=ERROR
    --error
    --exclude='src/lib'
    --exclude='dist'
    --exclude='_locales'
    --exclude='*.min.js'
    --exclude='node_modules'
)

SCAN_RC=0
"$TOOL" scan "${COMMON_ARGS[@]}" . || SCAN_RC=$?

if [[ $SCAN_RC -ne 0 ]]; then
    echo "[fail] SAST findings detected (exit=$SCAN_RC)" >&2
    exit 1
fi

echo "[ok] SAST clean"
exit 0
