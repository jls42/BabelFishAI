#!/usr/bin/env bash
# Régénère les 14 README traduits à partir de README.md (français, référence).
#
# Outil : aipmt (ai-powered-markdown-translator), par le CLI Codex : quota de
# l'abonnement ChatGPT, aucune clé d'API, aucune facturation à l'usage. `codex
# login` doit avoir été fait. Modèle gpt-6.1-sol en effort xhigh (choix du propriétaire le
# 30/09/2026) ; les README de la 1.1.20 et de la 1.2.0 ont été traduits par gpt-5.6-sol en
# effort low. La note en tête de chaque README cite le modèle qui l'a traduit.
#
#   ./scripts/translate-readmes.sh               # les 14 langues
#   ./scripts/translate-readmes.sh en de         # seulement celles-ci
#   ./scripts/translate-readmes.sh --verifier    # contrôle les README existants, sans traduire
#   AIPMT_MODEL=… AIPMT_EFFORT=… AIPMT_JOBS=… AIPMT_ESSAIS=… AIPMT_TIMEOUT=… ./scripts/…
#
# Démarche reprise de leapmultix (scripts/regen-readme-translations.sh) :
#   - une langue « canari » d'abord, seule : si la source a un défaut, il se voit
#     sur la première, sans dépenser le quota sur les autres ;
#   - chaque traduction est écrite dans un dossier temporaire, puis comparée à la
#     source (titres, liens, images, lignes de tableau, blocs de code, note de
#     traduction en tête) avant de remplacer le README existant. Un écart laisse
#     l'ancien fichier en place et relance la langue ;
#   - les autres langues partent ensuite en parallèle, 5 à la fois par défaut. Durée d'une
#     langue mesurée le 30/09/2026 : 1,5 à 2 min avec gpt-5.6-sol en effort low, 5 min avec
#     gpt-6.1-sol en effort low, davantage en xhigh (délai par appel : AIPMT_TIMEOUT, 30 min).
#
# Les README-*.md ne passent pas par prettier (exclus dans .pre-commit-config.yaml).
# Ne jamais modifier ce script pendant qu'il tourne : bash le lit au fil de
# l'exécution.
set -euo pipefail

cd "$(dirname "$0")/.."

SOURCE=README.md
LANGUE_SOURCE=fr
LANGUES_PAR_DEFAUT=(en ar de es hi it ja ko nl pl pt ro sv zh)
MODELE="${AIPMT_MODEL:-gpt-6.1-sol}"
EFFORT="${AIPMT_EFFORT:-xhigh}"
TACHES="${AIPMT_JOBS:-5}"
ESSAIS="${AIPMT_ESSAIS:-3}"
DELAI="${AIPMT_TIMEOUT:-1800}"

# Images du README : chacune doit se retrouver telle quelle dans chaque traduction
IMAGES=$(grep -oE 'images/[A-Za-z0-9._-]+' "$SOURCE" | sort -u || true)

# Empreinte de structure d'un README : ce qu'une traduction doit garder à l'identique
empreinte() {
    local fichier=$1
    printf 'titres=%s liens=%s images=%s tableau=%s blocs=%s' \
        "$(grep -c '^#' "$fichier" || true)" \
        "$(grep -o '](http[^)]*)' "$fichier" | wc -l || true)" \
        "$(grep -o '<img ' "$fichier" | wc -l || true)" \
        "$(grep -c '^|' "$fichier" || true)" \
        "$(grep -c '^[[:space:]]*```' "$fichier" || true)"
    return 0
}

# Compare une traduction à la source ; nomme l'écart et renvoie 1 s'il y en a un. Avec un
# modèle en troisième argument, la note de traduction doit le citer (traduction du jour)
verifier() {
    local langue=$1
    local fichier=$2
    local modele=${3:-}
    local attendu obtenu image
    attendu=$(empreinte "$SOURCE")
    obtenu=$(empreinte "$fichier")
    if [[ "$obtenu" != "$attendu" ]]; then
        echo "   $langue : structure $obtenu, attendu $attendu"
        return 1
    fi
    while IFS= read -r image; do
        [[ -z "$image" ]] && continue
        if ! grep -qF "$image" "$fichier"; then
            echo "   $langue : image perdue ($image)"
            return 1
        fi
    done <<< "$IMAGES"
    if ! head -1 "$fichier" | grep -qE '^\*\*.+\*\*$'; then
        echo "   $langue : pas de note de traduction en première ligne"
        return 1
    fi
    if [[ -n "$modele" ]] && ! head -1 "$fichier" | grep -qF "$modele"; then
        echo "   $langue : la note de traduction ne cite pas $modele"
        return 1
    fi
    return 0
}

# Traduit une langue, en plusieurs tentatives ; ne remplace le README qu'après contrôle
traduire() {
    local langue=$1
    local essai temp produit journal
    temp=$(mktemp -d)
    for essai in $(seq 1 "$ESSAIS"); do
        journal="$JOURNAUX/$langue-$essai.log"
        rm -rf "${temp:?}"/*
        if timeout "$DELAI" aipmt --file "$SOURCE" --target_dir "$temp" \
            --source_lang "$LANGUE_SOURCE" --target_lang "$langue" \
            --use_codex --model "$MODELE" --reasoning_effort "$EFFORT" \
            --force --add_translation_note --note_position top > "$journal" 2>&1; then
            produit=$(find "$temp" -type f -name "README-$langue.md" -print -quit)
            if [[ -n "$produit" ]] && verifier "$langue" "$produit" "$MODELE"; then
                mv -f "$produit" "README-$langue.md"
                rm -rf "$temp"
                echo "OK     $langue (tentative $essai)"
                return 0
            fi
        fi
        echo "échec  $langue (tentative $essai/$ESSAIS, journal : $journal)"
    done
    rm -rf "$temp"
    return 1
}

# Mode --verifier : contrôle les README existants, sans rien traduire
if [[ "${1:-}" == "--verifier" ]]; then
    shift
    langues=("$@")
    [[ ${#langues[@]} -eq 0 ]] && langues=("${LANGUES_PAR_DEFAUT[@]}")
    ecarts=0
    for langue in "${langues[@]}"; do
        if verifier "$langue" "README-$langue.md"; then
            echo "OK     $langue"
        else
            ecarts=$((ecarts + 1))
        fi
    done
    echo "Source : $(empreinte "$SOURCE")"
    [[ $ecarts -eq 0 ]] || exit 1
    exit 0
fi

for option in "$@"; do
    case "$option" in
        -*)
            echo "ERREUR : option inconnue « $option » (seule --verifier existe)." >&2
            exit 1
            ;;
        *) ;;
    esac
done

if ! command -v aipmt > /dev/null; then
    echo "ERREUR : aipmt introuvable. Installer avec « pipx install ai-powered-markdown-translator »." >&2
    exit 1
fi
if ! timeout 30 codex login status 2>&1 | grep -q "Logged in"; then
    echo "ERREUR : Codex n'est pas connecté. Lancer « codex login » (abonnement ChatGPT)." >&2
    exit 1
fi

# aipmt ne met à l'abri que les blocs de code dont la clôture est en colonne 0 : une clôture
# indentée (dans une liste) part au modèle comme de la prose, et sa garde refuse alors le
# fichier dans toutes les langues sans en nommer la cause (constaté sur leapmultix)
indentees=$(grep -cE '^[[:space:]]+```' "$SOURCE" || true)
if [[ "$indentees" -gt 0 ]]; then
    echo "ERREUR : $SOURCE contient $indentees clôture(s) de bloc de code indentée(s) :" >&2
    grep -nE '^[[:space:]]+```' "$SOURCE" | head -5 >&2
    echo "aipmt ne protège que les blocs dont les \`\`\` commencent en colonne 0." >&2
    exit 1
fi

langues=("$@")
[[ ${#langues[@]} -eq 0 ]] && langues=("${LANGUES_PAR_DEFAUT[@]}")
JOURNAUX=$(mktemp -d -t readmes-XXXXXX)

echo "Source      : $SOURCE ($LANGUE_SOURCE), $(empreinte "$SOURCE")"
echo "Outil       : aipmt --use_codex --model $MODELE --reasoning_effort $EFFORT"
echo "Langues     : ${langues[*]} ($TACHES à la fois après le canari)"
echo "Journaux    : $JOURNAUX"
echo

canari=${langues[0]}
echo "Canari : $canari (la suite ne part que s'il passe)"
if ! traduire "$canari"; then
    echo "ERREUR : le canari « $canari » a échoué après $ESSAIS tentatives ; la source est sans doute en cause." >&2
    echo "Voir les journaux dans $JOURNAUX." >&2
    exit 1
fi

for langue in "${langues[@]:1}"; do
    while [[ $(jobs -rp | wc -l) -ge $TACHES ]]; do
        wait -n || true
    done
    { traduire "$langue" || echo "$langue" >> "$JOURNAUX/echecs"; } &
done
wait

echo
if [[ -s "$JOURNAUX/echecs" ]]; then
    echo "ERREUR : langues non traduites après $ESSAIS tentatives : $(tr '\n' ' ' < "$JOURNAUX/echecs")" >&2
    echo "Leurs README existants n'ont pas été modifiés." >&2
    exit 1
fi
echo "Terminé. Relire le diff, puis : pre-commit run --files README-*.md"
