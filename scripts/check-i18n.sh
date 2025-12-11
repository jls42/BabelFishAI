#!/bin/bash
# Script de vérification des traductions i18n pour BabelFishAI
# Usage: ./scripts/check-i18n.sh [--fix]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOCALES_DIR="$PROJECT_DIR/_locales"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Compteurs
total_missing=0
declare -A missing_per_locale

echo -e "${BLUE}=== Vérification des traductions i18n ===${NC}"
echo ""

# Collecter toutes les clés utilisées dans le code
collect_keys() {
    local keys=""

    # Clés data-i18n dans les fichiers HTML
    html_keys=$(grep -rhoP 'data-i18n="[^"]*"' "$PROJECT_DIR/src" 2>/dev/null | sed 's/data-i18n="//;s/"//' | sort -u || true)

    # Clés data-i18n-placeholder dans les fichiers HTML
    placeholder_keys=$(grep -rhoP 'data-i18n-placeholder="[^"]*"' "$PROJECT_DIR/src" 2>/dev/null | sed 's/data-i18n-placeholder="//;s/"//' | sort -u || true)

    # Clés getMessage('...') dans les fichiers JS
    js_keys=$(grep -rhoP "getMessage\(['\"][^'\"]+['\"]" "$PROJECT_DIR/src" 2>/dev/null | sed "s/getMessage(['\"]//;s/['\"]$//" | sort -u || true)

    # Clés chrome.i18n.getMessage('...')
    chrome_keys=$(grep -rhoP "chrome\.i18n\.getMessage\(['\"][^'\"]+['\"]" "$PROJECT_DIR/src" 2>/dev/null | sed "s/chrome\.i18n\.getMessage(['\"]//;s/['\"]$//" | sort -u || true)

    # Combiner et dédupliquer
    echo -e "$html_keys\n$placeholder_keys\n$js_keys\n$chrome_keys" | grep -v '^$' | sort -u
}

# Vérifier si une clé existe dans un fichier de messages
key_exists() {
    local key="$1"
    local file="$2"
    grep -q "\"$key\":" "$file" 2>/dev/null
}

# Obtenir la valeur d'une clé depuis un fichier JSON
get_message() {
    local key="$1"
    local file="$2"
    python3 -c "
import json
import sys
try:
    with open('$file', 'r', encoding='utf-8') as f:
        data = json.load(f)
    if '$key' in data and 'message' in data['$key']:
        print(data['$key']['message'])
except:
    pass
" 2>/dev/null
}

echo -e "${YELLOW}Collecte des clés utilisées dans le code...${NC}"
all_keys=$(collect_keys)
key_count=$(echo "$all_keys" | wc -l)
echo -e "Trouvé ${GREEN}$key_count${NC} clés uniques"
echo ""

# Lister toutes les locales
locales=$(ls -1 "$LOCALES_DIR" | sort)
locale_count=$(echo "$locales" | wc -l)
echo -e "${YELLOW}Vérification de $locale_count locales...${NC}"
echo ""

# Référence: fichier français (source principale)
FR_FILE="$LOCALES_DIR/fr/messages.json"

# Vérifier chaque locale
for locale in $locales; do
    messages_file="$LOCALES_DIR/$locale/messages.json"

    if [ ! -f "$messages_file" ]; then
        echo -e "${RED}✗ $locale: messages.json non trouvé${NC}"
        continue
    fi

    missing_keys=""
    missing_count=0

    for key in $all_keys; do
        if ! key_exists "$key" "$messages_file"; then
            missing_keys="$missing_keys$key\n"
            ((missing_count++)) || true
        fi
    done

    missing_per_locale[$locale]=$missing_count
    total_missing=$((total_missing + missing_count))

    if [ $missing_count -eq 0 ]; then
        echo -e "${GREEN}✓ $locale: Complet${NC}"
    else
        echo -e "${RED}✗ $locale: $missing_count clés manquantes${NC}"
        if [ "$1" == "-v" ] || [ "$1" == "--verbose" ]; then
            echo -e "$missing_keys" | grep -v '^$' | while read -r k; do
                echo -e "    - $k"
            done
        fi
    fi
done

echo ""
echo -e "${BLUE}=== Résumé ===${NC}"
echo -e "Total clés: $key_count"
echo -e "Locales vérifiées: $locale_count"

if [ $total_missing -eq 0 ]; then
    echo -e "${GREEN}✓ Toutes les traductions sont complètes!${NC}"
    exit 0
else
    echo -e "${RED}✗ $total_missing traductions manquantes au total${NC}"
    echo ""
    echo -e "${YELLOW}Clés manquantes par locale:${NC}"
    for locale in $locales; do
        count=${missing_per_locale[$locale]:-0}
        if [ "$count" -gt 0 ]; then
            echo -e "  $locale: $count manquantes"
        fi
    done
    echo ""
    echo -e "Utilisez ${YELLOW}./scripts/check-i18n.sh -v${NC} pour voir les clés manquantes"
    exit 1
fi
