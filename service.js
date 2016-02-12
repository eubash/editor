/**
 * Created by eugilamigliore on 03/02/16.
 */

( function() {
    'use strict';

    let qa = new QaEditor({
        wrapper: document.getElementById("qa-button-bar")
    });

    let editor = CodeMirror.fromTextArea(document.getElementById('qa-input'), {
        lineNumbers: false,
        mode: 'markdown',
        listeners: [
            {
                id: 'qa-bold-button',
                hotkey: 'Ctrl-B',
                callback: function (cm) {
                    addButtonEvent(cm, "**", "**", 2, "strong text");
                }
            },
            {
                id: 'qa-italic-button',
                hotkey: 'Ctrl-I',
                callback: function (cm) {
                    addButtonEvent(cm, "*", "*", 1, "italic text");
                }
            },
            {
                id: 'qa-link-button',
                hotkey: 'Ctrl-L',
                callback: function (cm) {
                    let selection = cm.getSelection();
                    let text = '';
                    let link = 'http://yourlink';

                    if (selection.match(/^https?:\/\//)) {
                        link = selection;
                    } else {
                        text = selection;
                    }

                    if(link)
                        text = 'link text';
                        cm.replaceSelection('[' + text + '](' + link + ')');
                        let cursorPos = cm.getCursor();
                        cm.setCursor(cursorPos.line, cursorPos.ch - (3 + link.length));
                }
            },
            {
                id: 'qa-quote-button',
                hotkey: 'Ctrl-Q',
                callback: function (cm) {
                    addButtonEvent(cm, "> ", "\n", 0, "Blockquote");
                }
            },
            {
                id: 'qa-code-button',
                hotkey: 'Ctrl-K',
                callback: function (cm) {
                    addButtonEvent(cm, "`\n", "\n`\n", 0, "enter your code here");
                }
            },
            {
                id: 'qa-image-button',
                hotkey: 'Ctrl-G',
                callback: function (cm) {
                    let selection = cm.getSelection();
                    let text = "alt text";

                    if (!selection)
                        selection = "your image path";
                        cm.replaceSelection('![' + text + '](' + selection + ')');
                        let cursorPos = cm.getCursor();
                        cm.setCursor(cursorPos.line, cursorPos.ch - (1 + selection.length));
                }
            },
            {
                id: 'qa-olist-button',
                hotkey: 'Ctrl-O',
                callback: function (cm) {
                    addButtonEvent(cm, "1. ", "\n", 0, "List item");
                }
            },
            {
                id: 'qa-ulist-button',
                hotkey: 'Ctrl-U',
                callback: function (cm) {
                    addButtonEvent(cm, "- ", "\n", 0, "List item");
                }
            },
            {
                id: 'qa-heading-button',
                hotkey: 'Ctrl-H',
                callback: function (cm) {
                    addButtonEvent(cm, "## ", "\n", 0, "Heading");
                }
            },
            {
                id: 'qa-hr-button',
                hotkey: 'Ctrl-R',
                callback: function (cm) {
                    cm.replaceSelection("\n*****\n" + cm.getSelection());
                }
            },
            {
                id: 'qa-undo-button',
                hotkey: 'Ctrl-Z',
                callback: function (cm) {
                    cm.undo();
                }
            },
            {
                id: 'qa-redo-button',
                hotkey: 'Ctrl-Y',
                callback: function (cm) {
                    cm.redo();
                }
            }
        ]
    });

    editor.on("change", function(cm, change) {
        document.getElementById("qa-preview").innerHTML = cm.getValue();
    });

    let addButtonEvent = function(cm, before, after, num, defaultText) {

        let selection = cm.getSelection();
        if (!selection)
            selection = defaultText;
            cm.replaceSelection(before + selection + after);
            let cursorPos = cm.getCursor();
            cm.setCursor(cursorPos.line, cursorPos.ch - num);

    };

})();
