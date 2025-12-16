#!/bin/bash
#
# build.sh - Script de build multi-navigateur pour BabelFishAI
#
# DESCRIPTION
#   Génère les packages d'extension pour Chrome et Firefox depuis le même codebase.
#   Chaque navigateur a son propre manifest mais partage le reste du code source.
#
# USAGE
#   ./scripts/build.sh [chrome|firefox|all]
#
# OPTIONS
#   chrome   Build uniquement pour Chrome (manifest.json → dist/chrome/)
#   firefox  Build uniquement pour Firefox (manifest.firefox.json → dist/firefox/)
#   all      Build pour les deux navigateurs (défaut)
#   -h       Affiche l'aide
#
# SORTIES
#   dist/chrome/                    Dossier de build Chrome
#   dist/firefox/                   Dossier de build Firefox
#   dist/babelfishai-X.X.X-chrome.zip   Archive Chrome pour Chrome Web Store
#   dist/babelfishai-X.X.X-firefox.zip  Archive Firefox pour Firefox Add-ons (AMO)
#
# EXEMPLES
#   ./scripts/build.sh              # Build tout (Chrome + Firefox)
#   ./scripts/build.sh chrome       # Build Chrome uniquement
#   ./scripts/build.sh firefox      # Build Firefox uniquement
#
# DIFFÉRENCES CHROME/FIREFOX
#   - Chrome utilise un Service Worker (manifest.json → background.service_worker)
#   - Firefox utilise des scripts classiques (manifest.firefox.json → background.scripts)
#   - Le polyfill browser-polyfill.min.js est inclus pour Firefox
#
# PRÉREQUIS
#   - zip (pour créer les archives)
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_ROOT/dist"

# Constantes pour les noms de navigateurs (évite la répétition de littéraux)
readonly BROWSER_CHROME="chrome"
readonly BROWSER_FIREFOX="firefox"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Fichiers et dossiers à copier (communs aux deux navigateurs)
FILES_TO_COPY=(
    "src"
    "images"
    "_locales"
)

usage() {
    echo "Usage: $0 [chrome|firefox|all]"
    echo "  chrome  - Build pour Chrome uniquement"
    echo "  firefox - Build pour Firefox uniquement"
    echo "  all     - Build pour les deux navigateurs (défaut)"
    return 0
}

clean_dist() {
    local browser=$1
    echo -e "${YELLOW}Nettoyage de dist/$browser...${NC}"
    rm -rf "${DIST_DIR:?}/$browser"
    mkdir -p "$DIST_DIR/$browser"
    return 0
}

copy_common_files() {
    local browser=$1
    echo -e "${YELLOW}Copie des fichiers communs vers dist/$browser...${NC}"

    for item in "${FILES_TO_COPY[@]}"; do
        if [[ -e "$PROJECT_ROOT/$item" ]]; then
            cp -r "$PROJECT_ROOT/$item" "$DIST_DIR/$browser/"
        fi
    done
    return 0
}

build_chrome() {
    echo -e "${GREEN}=== Build Chrome ===${NC}"
    clean_dist "$BROWSER_CHROME"
    copy_common_files "$BROWSER_CHROME"

    # Copier le manifest Chrome
    cp "$PROJECT_ROOT/manifest.json" "$DIST_DIR/$BROWSER_CHROME/manifest.json"

    echo -e "${GREEN}✓ Build Chrome terminé : dist/$BROWSER_CHROME/${NC}"
    return 0
}

build_firefox() {
    echo -e "${GREEN}=== Build Firefox ===${NC}"
    clean_dist "$BROWSER_FIREFOX"
    copy_common_files "$BROWSER_FIREFOX"

    # Vérifier que le manifest Firefox existe
    if [[ ! -f "$PROJECT_ROOT/manifest.firefox.json" ]]; then
        echo -e "${RED}Erreur: manifest.firefox.json non trouvé${NC}"
        return 1
    fi

    # Copier le manifest Firefox (renommé en manifest.json)
    cp "$PROJECT_ROOT/manifest.firefox.json" "$DIST_DIR/$BROWSER_FIREFOX/manifest.json"

    echo -e "${GREEN}✓ Build Firefox terminé : dist/$BROWSER_FIREFOX/${NC}"
    return 0
}

create_zip() {
    local browser=$1
    local version
    version=$(grep '"version"' "$PROJECT_ROOT/manifest.json" | sed 's/.*: "\(.*\)".*/\1/')
    local zip_name="babelfishai-${version}-${browser}.zip"

    echo -e "${YELLOW}Création de $zip_name...${NC}"

    # Créer l'archive ZIP
    cd "$DIST_DIR/$browser"
    zip -r "../$zip_name" . -x "*.DS_Store" -x "*__MACOSX*" > /dev/null
    cd "$PROJECT_ROOT"

    echo -e "${GREEN}✓ Archive créée : dist/$zip_name${NC}"
    return 0
}

# Point d'entrée principal
main() {
    local target=${1:-all}

    case $target in
        "$BROWSER_CHROME")
            build_chrome
            create_zip "$BROWSER_CHROME"
            ;;
        "$BROWSER_FIREFOX")
            build_firefox
            create_zip "$BROWSER_FIREFOX"
            ;;
        all)
            build_chrome
            build_firefox
            create_zip "$BROWSER_CHROME"
            create_zip "$BROWSER_FIREFOX"
            ;;
        -h|--help)
            usage
            ;;
        *)
            echo -e "${RED}Option inconnue: $target${NC}"
            usage
            return 1
            ;;
    esac

    echo -e "${GREEN}=== Build terminé ===${NC}"
    echo "Archives générées :"
    ls -la "$DIST_DIR"/*.zip 2>/dev/null || echo "(aucune archive)"
    return 0
}

main "$@"
