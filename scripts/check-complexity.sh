#!/usr/bin/env bash
# Cyclomatic complexity + function length gate via Lizard.
#
# Baseline thresholds (hardenable later via dedicated PR):
#   - CCN ≤ 20
#   - Function length ≤ 1500 lines
#
# Rationale length=1500 : current max in src/ is ~1076 (options.js IIFE).
# Le seuil 1500 (= +40% headroom) sert d'alarme régression future, pas de gate
# strict. Pour durcir : refacto options.js IIFE en sous-modules, puis descendre
# le seuil à 1200, 1000, etc. dans une PR dédiée (mesurer max avant chaque
# baisse via : lizard -l javascript src --sort length | head).
# Gates:
#   - local + tool absent → skip with warning (exit 0)
#   - local + tool present + findings → fail (exit 1)
#   - CI (CI or GITHUB_ACTIONS set) + tool absent → fail (exit 1)
#   - CI + findings → fail (exit 1)

set -euo pipefail

CCN_THRESHOLD=20
LENGTH_THRESHOLD=1500

# Determine CI mode
if [[ -n "${CI:-}${GITHUB_ACTIONS:-}" ]]; then
    IS_CI=1
else
    IS_CI=0
fi

# Pick runner: native lizard preferred, pipx fallback
if command -v lizard >/dev/null 2>&1; then
    RUNNER=(lizard)
elif command -v pipx >/dev/null 2>&1; then
    RUNNER=(pipx run lizard)
else
    if [[ $IS_CI -eq 1 ]]; then
        echo "[fatal] lizard/pipx required in CI but not found" >&2
        exit 1
    fi
    echo "[skip] lizard/pipx absent (local mode)" >&2
    exit 0
fi

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT"

echo "[info] Running Lizard (CCN ≤ $CCN_THRESHOLD, length ≤ $LENGTH_THRESHOLD, language=javascript)"

SCAN_RC=0
"${RUNNER[@]}" \
    -l javascript \
    -C "$CCN_THRESHOLD" \
    -L "$LENGTH_THRESHOLD" \
    --exclude 'src/lib/*' \
    --exclude 'dist/*' \
    --exclude 'node_modules/*' \
    --exclude '*.min.js' \
    --exclude '_locales/*' \
    src || SCAN_RC=$?

if [[ $SCAN_RC -ne 0 ]]; then
    echo "[fail] Complexity/length findings detected (CCN > $CCN_THRESHOLD or length > $LENGTH_THRESHOLD, exit=$SCAN_RC)" >&2
    exit 1
fi

echo "[ok] Complexity and length within budget"
exit 0
