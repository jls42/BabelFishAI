// Utilitaires de gestion du focus et de la sélection pour l'extension BabelFishAI
window.BabelFishAIUtils = window.BabelFishAIUtils || {};

(function (exports) {
    'use strict';

    // Variables pour stocker l'élément actif et sa sélection
    let storedActiveElement = null;
    let storedSelectionStart = null;
    let storedSelectionEnd = null;
    let storedSelectionText = null;
    let storedNodeRange = null;

    /**
     * Stocke l'élément actif et sa sélection avant l'interaction avec les boutons
     */
    function storeFocusAndSelection() {
        try {
            storedActiveElement = document.activeElement;
            
            // Pour les éléments input et textarea
            if (storedActiveElement && (storedActiveElement.tagName === 'INPUT' || storedActiveElement.tagName === 'TEXTAREA')) {
                storedSelectionStart = storedActiveElement.selectionStart;
                storedSelectionEnd = storedActiveElement.selectionEnd;
                storedSelectionText = storedActiveElement.value.substring(storedSelectionStart, storedSelectionEnd);
            } 
            // Pour les éléments contentEditable
            else if (storedActiveElement && storedActiveElement.isContentEditable) {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    storedNodeRange = selection.getRangeAt(0).cloneRange();
                    storedSelectionText = selection.toString();
                }
            }
        } catch (error) {
            console.error('Error storing focus and selection:', error);
        }
    }

    /**
     * Vérifie la validité de l'élément stocké pour le focus
     * @returns {boolean} - True si l'élément est valide, False sinon
     */
    function isStoredElementValid() {
        if (!storedActiveElement) return false;
        
        // Vérifier si l'élément est toujours dans le DOM
        return document.body.contains(storedActiveElement);
    }

    /**
     * Restaure le focus sur l'élément stocké
     * @returns {boolean} - True si le focus a été restauré avec succès
     */
    function restoreFocus() {
        if (!isStoredElementValid()) return false;
        
        try {
            storedActiveElement.focus();
            return document.activeElement === storedActiveElement;
        } catch (error) {
            console.error('Error restoring focus:', error);
            return false;
        }
    }

    /**
     * Gère la position du curseur pour les éléments input/textarea
     * @param {boolean} preventSelection - Si true, place le curseur à la fin sans sélectionner
     */
    function handleInputCursorPosition(preventSelection) {
        if (!storedActiveElement) return;
        
        try {
            if (preventSelection || storedSelectionStart === storedSelectionEnd) {
                // Placer le curseur à la fin du contenu
                const length = storedActiveElement.value.length;
                storedActiveElement.setSelectionRange(length, length);
            } else {
                // Restaurer la sélection précédente
                storedActiveElement.setSelectionRange(storedSelectionStart, storedSelectionEnd);
            }
        } catch (error) {
            console.error('Error handling input cursor position:', error);
        }
    }

    /**
     * Trouve le dernier nœud de texte dans un élément
     * @param {Node} node - Le nœud à parcourir
     * @returns {Node|null} - Le dernier nœud de texte ou null
     */
    function findLastTextNode(node) {
        if (!node) return null;
        
        if (node.nodeType === Node.TEXT_NODE) {
            return node;
        }
        
        // Parcourir les enfants en ordre inverse pour trouver le dernier nœud de texte
        if (node.childNodes && node.childNodes.length > 0) {
            for (let i = node.childNodes.length - 1; i >= 0; i--) {
                const textNode = findLastTextNode(node.childNodes[i]);
                if (textNode) {
                    return textNode;
                }
            }
        }
        
        return null;
    }

    /**
     * Gère la position du curseur pour les éléments contentEditable
     * @param {boolean} preventSelection - Si true, place le curseur à la fin sans sélectionner
     */
    function handleContentEditableCursor(preventSelection) {
        if (!storedActiveElement || !storedActiveElement.isContentEditable) return;
        
        try {
            const selection = window.getSelection();
            
            if (preventSelection || !storedNodeRange || storedSelectionText === '') {
                // Placer le curseur à la fin du contenu
                selection.removeAllRanges();
                
                const range = document.createRange();
                const lastTextNode = findLastTextNode(storedActiveElement);
                
                if (lastTextNode) {
                    range.setStart(lastTextNode, lastTextNode.length);
                    range.setEnd(lastTextNode, lastTextNode.length);
                } else {
                    // Fallback si aucun nœud de texte n'est trouvé
                    range.selectNodeContents(storedActiveElement);
                    range.collapse(false); // Collapse à la fin
                }
                
                selection.addRange(range);
            } else {
                // Restaurer la sélection précédente
                selection.removeAllRanges();
                selection.addRange(storedNodeRange);
            }
        } catch (error) {
            console.error('Error handling contentEditable cursor position:', error);
        }
    }

    /**
     * Restaure le focus et la sélection après l'interaction avec les boutons
     * @param {boolean} [force=false] - Forcer la restauration même si l'élément actif semble correct
     * @param {boolean} [preventSelection=true] - Empêcher la sélection, mettre le curseur à la fin du contenu
     */
    function restoreFocusAndSelection(force = false, preventSelection = true) {
        // Si l'élément actif est déjà correct et qu'on ne force pas, ne rien faire
        if (!force && document.activeElement === storedActiveElement) return;
        
        // Vérifier si l'élément stocké est valide
        if (!isStoredElementValid()) return;
        
        // Restaurer le focus
        const focusRestored = restoreFocus();
        if (!focusRestored) return;
        
        // Gérer la position du curseur selon le type d'élément
        if (storedActiveElement.tagName === 'INPUT' || storedActiveElement.tagName === 'TEXTAREA') {
            handleInputCursorPosition(preventSelection);
        } else if (storedActiveElement.isContentEditable) {
            handleContentEditableCursor(preventSelection);
        }
    }

    /**
     * Vérifie si l'élément actif est valide pour l'insertion de texte
     * @param {HTMLElement} activeElement - L'élément actif
     * @returns {boolean} - True si l'élément est valide pour l'insertion de texte
     */
    function isValidElementForInsertion(activeElement) {
        if (!activeElement) return false;
        
        // Vérifier si c'est un élément input ou textarea
        const isInputOrTextarea = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
        
        // Vérifier si c'est un élément input qui accepte du texte
        const isValidInputType = activeElement.tagName !== 'INPUT' || 
            (activeElement.type !== 'button' && 
             activeElement.type !== 'checkbox' && 
             activeElement.type !== 'radio' && 
             activeElement.type !== 'file' && 
             activeElement.type !== 'image' && 
             activeElement.type !== 'reset' && 
             activeElement.type !== 'submit');
        
        // Vérifier si c'est un élément contentEditable
        const isContentEditable = activeElement.isContentEditable;
        
        // Vérifier si l'élément n'est pas en lecture seule
        const isNotReadOnly = !activeElement.readOnly;
        
        return (isInputOrTextarea && isValidInputType && isNotReadOnly) || isContentEditable;
    }

    /**
     * Insère du texte dans un élément contentEditable avec robustesse
     * @param {HTMLElement} element - L'élément contentEditable
     * @param {string} text - Le texte à insérer
     * @param {Object} options - Options supplémentaires
     * @param {boolean} [options.ensureFocus=true] - Assurer que l'élément a le focus
     * @param {boolean} [options.normalizeText=true] - Normaliser le texte (remplacer les sauts de ligne)
     * @returns {boolean} - True si l'insertion a réussi
     */
    function insertInContentEditable(element, text, options = {}) {
        const { ensureFocus = true, normalizeText = true } = options;
        
        if (!element || !element.isContentEditable) return false;
        
        try {
            // S'assurer que l'élément a le focus
            if (ensureFocus && document.activeElement !== element) {
                element.focus();
            }
            
            // Normaliser le texte si nécessaire
            let processedText = text;
            if (normalizeText) {
                // Remplacer les sauts de ligne par <br> pour les éléments contentEditable
                processedText = text.replace(/\n/g, '<br>');
            }
            
            // Insérer le texte à la position du curseur
            const selection = window.getSelection();
            
            if (selection.rangeCount > 0) {
                // Supprimer le contenu sélectionné
                const range = selection.getRangeAt(0);
                range.deleteContents();
                
                // Insérer le nouveau texte
                if (normalizeText) {
                    // Utiliser insertHTML pour le texte avec des balises HTML
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = processedText;
                    
                    // Insérer chaque nœud du div temporaire
                    const fragment = document.createDocumentFragment();
                    while (tempDiv.firstChild) {
                        fragment.appendChild(tempDiv.firstChild);
                    }
                    
                    range.insertNode(fragment);
                    
                    // Placer le curseur à la fin du texte inséré
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else {
                    // Insérer le texte brut
                    const textNode = document.createTextNode(processedText);
                    range.insertNode(textNode);
                    
                    // Placer le curseur à la fin du texte inséré
                    range.setStartAfter(textNode);
                    range.setEndAfter(textNode);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            } else {
                // Fallback si aucune sélection n'est active
                if (normalizeText) {
                    element.innerHTML += processedText;
                } else {
                    element.textContent += processedText;
                }
            }
            
            // Déclencher un événement input pour notifier les frameworks JS
            const inputEvent = new Event('input', { bubbles: true, cancelable: true });
            element.dispatchEvent(inputEvent);
            
            return true;
        } catch (error) {
            console.error('Error inserting text into contentEditable:', error);
            return false;
        }
    }

    /**
     * Gère l'insertion du texte dans l'élément actif
     * @param {string} text - Le texte à insérer
     * @returns {boolean} Indique si l'insertion a réussi
     */
    function handleActiveElementInsertion(text) {
        const activeElement = document.activeElement;
        
        if (!isValidElementForInsertion(activeElement)) {
            console.warn('No valid active element for text insertion');
            return false;
        }
        
        try {
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                return insertTextIntoInput(activeElement, text);
            } else if (activeElement.isContentEditable) {
                return insertInContentEditable(activeElement, text);
            }
            
            return false;
        } catch (error) {
            console.error('Error handling active element insertion:', error);
            return false;
        }
    }

    /**
     * Insère du texte dans un élément input ou textarea avec optimisation pour grands volumes
     * @param {HTMLInputElement|HTMLTextAreaElement} element - L'élément de saisie
     * @param {string} text - Le texte à insérer
     * @returns {boolean} - Indique si l'insertion a réussi
     */
    function insertTextIntoInput(element, text) {
        if (!element || (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA')) {
            return false;
        }
        
        try {
            const originalValue = element.value;
            const selStart = element.selectionStart || 0;
            const selEnd = element.selectionEnd || 0;
            
            // Optimisation pour les grands volumes de texte
            const newValue = originalValue.substring(0, selStart) + text + originalValue.substring(selEnd);
            
            // Mettre à jour la valeur
            element.value = newValue;
            
            // Placer le curseur après le texte inséré
            const newCursorPos = selStart + text.length;
            element.setSelectionRange(newCursorPos, newCursorPos);
            
            // Déclencher des événements pour notifier les frameworks JS
            const inputEvent = new Event('input', { bubbles: true, cancelable: true });
            element.dispatchEvent(inputEvent);
            
            const changeEvent = new Event('change', { bubbles: true, cancelable: true });
            element.dispatchEvent(changeEvent);
            
            return true;
        } catch (error) {
            console.error('Error inserting text into input:', error);
            
            // Fallback pour les navigateurs plus anciens
            try {
                document.execCommand('insertText', false, text);
                return true;
            } catch (fallbackError) {
                console.error('Fallback insertion failed:', fallbackError);
                return false;
            }
        }
    }

    /**
     * Insère le texte dans un élément éditable
     * @param {Element} activeElement - Élément cible pour l'insertion
     * @param {string} newText - Texte à insérer
     * @returns {boolean} - True si l'insertion a réussi
     */
    function insertTextInEditableElement(activeElement, newText) {
        try {
            // Restaurer le focus
            restoreFocus();

            if ((activeElement.tagName === 'TEXTAREA') ||
                (activeElement.tagName === 'INPUT' && activeElement.type === 'text')) {
                return insertTextIntoInput(activeElement, newText);
            } else if (activeElement.isContentEditable) {
                return insertInContentEditable(activeElement, newText, { ensureFocus: false, normalizeText: false });
            }
            return false;
        } catch (e) {
            console.warn("Erreur lors du remplacement du texte:", e);
            return false;
        }
    }

    // Exporter les fonctions dans l'espace BabelFishAIUtils
    exports.focus = {
        storeFocusAndSelection,
        isStoredElementValid,
        restoreFocus,
        handleInputCursorPosition,
        findLastTextNode,
        handleContentEditableCursor,
        restoreFocusAndSelection,
        isValidElementForInsertion,
        insertInContentEditable,
        handleActiveElementInsertion,
        insertTextIntoInput,
        insertTextInEditableElement
    };

})(window.BabelFishAIUtils);
