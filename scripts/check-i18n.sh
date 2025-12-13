#!/bin/bash
# Script de vérification des traductions i18n pour BabelFishAI
# Usage: ./scripts/check-i18n.sh [-v|--verbose] [--clean]
#   -v, --verbose  Afficher les clés manquantes et mortes en détail
#   --clean        Supprimer les clés mortes de tous les fichiers de traduction

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

# Options
VERBOSE=false
CLEAN=false

for arg in "$@"; do
    case $arg in
        -v|--verbose)
            VERBOSE=true
            ;;
        --clean)
            CLEAN=true
            ;;
    esac
done

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

    # Clés __MSG_xxx__ dans manifest.json
    manifest_keys=$(grep -oP '__MSG_\K[a-zA-Z0-9_]+(?=__)' "$PROJECT_DIR/manifest.json" 2>/dev/null | sort -u || true)

    # Combiner et dédupliquer
    echo -e "$html_keys\n$placeholder_keys\n$js_keys\n$chrome_keys\n$manifest_keys" | grep -v '^$' | sort -u
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
        if [ "$VERBOSE" == "true" ]; then
            echo -e "$missing_keys" | grep -v '^$' | while read -r k; do
                echo -e "    - $k"
            done
        fi
    fi
done

# === Détection des clés mortes (non utilisées dans le code) ===
echo ""
echo -e "${BLUE}=== Détection des clés mortes ===${NC}"
echo ""

# Extraire les clés du fichier français (référence)
fr_keys=$(python3 -c "
import json
with open('$FR_FILE', 'r', encoding='utf-8') as f:
    data = json.load(f)
for key in sorted(data.keys()):
    print(key)
" 2>/dev/null)

fr_key_count=$(echo "$fr_keys" | wc -l)
echo -e "Clés dans fr/messages.json: ${BLUE}$fr_key_count${NC}"

# Trouver les clés mortes
dead_keys=""
dead_count=0

for key in $fr_keys; do
    # Vérifier si la clé est utilisée dans le code
    is_used=false
    for used_key in $all_keys; do
        if [ "$key" == "$used_key" ]; then
            is_used=true
            break
        fi
    done

    if [ "$is_used" == "false" ]; then
        dead_keys="$dead_keys$key\n"
        ((dead_count++)) || true
    fi
done

if [ $dead_count -eq 0 ]; then
    echo -e "${GREEN}✓ Aucune clé morte détectée${NC}"
else
    echo -e "${RED}✗ $dead_count clés mortes détectées (non utilisées dans le code)${NC}"
    if [ "$VERBOSE" == "true" ]; then
        echo -e "$dead_keys" | grep -v '^$' | while read -r k; do
            echo -e "    - $k"
        done
    fi
fi

# === Nettoyage des clés mortes ===
if [ "$CLEAN" == "true" ] && [ $dead_count -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}=== Nettoyage des clés mortes ===${NC}"
    echo ""

    # Créer la liste des clés mortes pour Python
    dead_keys_list=$(echo -e "$dead_keys" | grep -v '^$' | tr '\n' ',' | sed 's/,$//')

    for locale in $locales; do
        messages_file="$LOCALES_DIR/$locale/messages.json"

        if [ ! -f "$messages_file" ]; then
            continue
        fi

        # Utiliser Python pour supprimer les clés mortes
        python3 -c "
import json

dead_keys = set('$dead_keys_list'.split(','))
file_path = '$messages_file'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

original_count = len(data)
data = {k: v for k, v in data.items() if k not in dead_keys}
removed_count = original_count - len(data)

if removed_count > 0:
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f'  {removed_count} clés supprimées')
else:
    print(f'  Aucune clé à supprimer')
" 2>/dev/null && echo -e "${GREEN}✓ $locale nettoyé${NC}" || echo -e "${RED}✗ $locale: erreur${NC}"
    done

    echo ""
    echo -e "${GREEN}✓ Nettoyage terminé!${NC}"
fi

echo ""
echo -e "${BLUE}=== Résumé ===${NC}"
echo -e "Clés utilisées dans le code: $key_count"
echo -e "Clés dans fr/messages.json: $fr_key_count"
echo -e "Locales vérifiées: $locale_count"

exit_code=0

if [ $total_missing -gt 0 ]; then
    echo -e "${RED}✗ $total_missing traductions manquantes au total${NC}"
    echo ""
    echo -e "${YELLOW}Clés manquantes par locale:${NC}"
    for locale in $locales; do
        count=${missing_per_locale[$locale]:-0}
        if [ "$count" -gt 0 ]; then
            echo -e "  $locale: $count manquantes"
        fi
    done
    exit_code=1
else
    echo -e "${GREEN}✓ Toutes les traductions sont complètes!${NC}"
fi

if [ $dead_count -gt 0 ]; then
    echo -e "${RED}✗ $dead_count clés mortes à supprimer${NC}"
    exit_code=1
else
    echo -e "${GREEN}✓ Aucune clé morte${NC}"
fi

echo ""
echo -e "Options disponibles:"
echo -e "  ${YELLOW}-v, --verbose${NC}  Afficher les clés manquantes et mortes en détail"
echo -e "  ${YELLOW}--clean${NC}        Supprimer les clés mortes de tous les fichiers"
exit $exit_code
