#!/bin/bash
#
# run-tests.sh - Lance les tests Node de BabelFishAI (node --test)
#
# USAGE
#   ./scripts/run-tests.sh                 # suite complète sur l'arbre de travail
#   ./scripts/run-tests.sh --ref <réf>     # même suite sur le code d'une autre version
#   ./scripts/run-tests.sh --update        # relève les instantanés (tests/snapshots/)
#   ./scripts/run-tests.sh fichier.test.mjs ...   # seulement ces fichiers
#
# DESCRIPTION
#   Passe à `node --test` la liste explicite des fichiers tests/**/*.test.mjs et sort en
#   erreur si cette liste est vide : `node --test 'motif'` sans aucun fichier sortirait en 0.
#   Avec --ref, le code de l'extension (src, _locales, manifests) est extrait de la
#   référence git par `git archive` dans un dossier temporaire, et les tests de l'arbre de
#   travail s'exécutent dessus (variable BABELFISH_ROOT) : c'est la preuve d'équivalence
#   d'une refonte avec l'arbre de base.
#   Sans Node 22 ou plus, le script saute les tests avec un avertissement.
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
readonly MIN_NODE_MAJOR=22

REF=""
UPDATE=0
FILES=()
TMP_ROOT=""

usage() {
    sed -n '3,20p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
    return 0
}

cleanup() {
    if [[ -n "$TMP_ROOT" && -d "$TMP_ROOT" ]]; then
        rm -rf "$TMP_ROOT"
    fi
    return 0
}
trap cleanup EXIT

parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --ref)
                if [[ $# -lt 2 ]]; then
                    echo "Erreur : --ref attend une référence git" >&2
                    exit 2
                fi
                REF="$2"
                shift 2
                ;;
            --update)
                UPDATE=1
                shift
                ;;
            -h | --help)
                usage
                exit 0
                ;;
            *)
                FILES+=("$1")
                shift
                ;;
        esac
    done
    return 0
}

check_node() {
    if ! command -v node > /dev/null 2>&1; then
        echo "Avertissement : node introuvable, tests sautés (Node ${MIN_NODE_MAJOR} ou plus requis)." >&2
        exit 0
    fi
    local major
    major="$(node -p 'process.versions.node.split(".")[0]')"
    if [[ "$major" -lt "$MIN_NODE_MAJOR" ]]; then
        echo "Avertissement : Node $major détecté, tests sautés (Node ${MIN_NODE_MAJOR} ou plus requis)." >&2
        exit 0
    fi
    return 0
}

collect_files() {
    if [[ ${#FILES[@]} -gt 0 ]]; then
        return 0
    fi
    local file
    while IFS= read -r -d '' file; do
        FILES+=("$file")
    done < <(find "$PROJECT_ROOT/tests" -type f -name '*.test.mjs' -print0 | sort -z)
    if [[ ${#FILES[@]} -eq 0 ]]; then
        echo "Erreur : aucun fichier de test trouvé (tests/**/*.test.mjs)." >&2
        exit 1
    fi
    return 0
}

extract_ref() {
    TMP_ROOT="$(mktemp -d)"
    git -C "$PROJECT_ROOT" archive "$REF" src _locales manifest.json manifest.firefox.json |
        tar -x -C "$TMP_ROOT"
    export BABELFISH_ROOT="$TMP_ROOT"
    echo "Code testé : $REF ($(git -C "$PROJECT_ROOT" rev-parse --short "$REF"))"
    return 0
}

main() {
    parse_args "$@"
    check_node
    collect_files
    if [[ -n "$REF" ]]; then
        extract_ref
    fi
    if [[ "$UPDATE" -eq 1 ]]; then
        export UPDATE_SNAPSHOTS=1
    fi
    node --test "${FILES[@]}"
    return 0
}

main "$@"
