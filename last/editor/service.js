/**
 * Created by eugilamigliore on 03/02/16.
 */

( function() {
    'use strict';

    let qa = new QaEditor({
        wrapper: document.getElementById("mdeditor-button-bar")
    });

    let editor = CodeMirror.fromTextArea(document.getElementById('mdeditor-input'), {
        lineNumbers: false,
        mode: 'markdown',
        listeners: [
            {
                id: 'mdeditor-bold-button',
                hotkey: 'Ctrl-B',
                callback: function (cm) {
                    addButtonEvent(cm, "**", "**", 2, "strong text");
                }
            },
            {
                id: 'mdeditor-italic-button',
                hotkey: 'Ctrl-I',
                callback: function (cm) {
                    addButtonEvent(cm, "*", "*", 1, "italic text");
                }
            },
            {
                id: 'mdeditor-link-button',
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
                id: 'mdeditor-quote-button',
                hotkey: 'Ctrl-Q',
                callback: function (cm) {
                    addButtonEvent(cm, "> ", "\n", 0, "Blockquote");
                }
            },
            {
                id: 'mdeditor-code-button',
                hotkey: 'Ctrl-K',
                callback: function (cm) {
                    addButtonEvent(cm, "`\n", "\n`\n", 0, "enter your code here");
                }
            },
            {
                id: 'mdeditor-image-button',
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
                id: 'mdeditor-olist-button',
                hotkey: 'Ctrl-O',
                callback: function (cm) {
                    addButtonEvent(cm, "1. ", "\n", 0, "List item");
                }
            },
            {
                id: 'mdeditor-ulist-button',
                hotkey: 'Ctrl-U',
                callback: function (cm) {
                    addButtonEvent(cm, "- ", "\n", 0, "List item");
                }
            },
            {
                id: 'mdeditor-heading-button',
                hotkey: 'Ctrl-H',
                callback: function (cm) {
                    addButtonEvent(cm, "## ", "\n", 0, "Heading");
                }
            },
            {
                id: 'mdeditor-hr-button',
                hotkey: 'Ctrl-R',
                callback: function (cm) {
                    cm.replaceSelection("\n*****\n" + cm.getSelection());
                }
            },
            {
                id: 'mdeditor-undo-button',
                hotkey: 'Ctrl-Z',
                callback: function (cm) {
                    cm.undo();
                }
            },
            {
                id: 'mdeditor-redo-button',
                hotkey: 'Ctrl-Y',
                callback: function (cm) {
                    cm.redo();
                }
            }
        ]
    });

    editor.on("change", function(cm, change) {
        document.getElementById("mdeditor-preview").innerHTML = cm.getValue();
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
