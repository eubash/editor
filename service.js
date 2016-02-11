/**
 * Created by eugilamigliore on 03/02/16.
 */

( function() {

    var qa = new QaEditor({
        wrapper: document.getElementById("qa-button-bar")
    });

    var editor = CodeMirror.fromTextArea(document.getElementById('qa-input'), {
        lineNumbers: false,
        mode: 'markdown',
        listeners: [
            {
                id: 'qa-bold-button',
                hotkey: 'Ctrl-B',
                callback: function (cm) {
                    var selection = cm.getSelection();
                    cm.replaceSelection('**' + selection + '**');
                    if (!selection) {
                        var cursorPos = cm.getCursor();
                        cm.setCursor(cursorPos.line, cursorPos.ch - 2);
                    }
                }
            },
            {
                id: 'qa-italic-button',
                hotkey: 'Ctrl-I',
                callback: function (cm) {
                    var selection = cm.getSelection();
                    cm.replaceSelection('*' + selection + '*');
                    if (!selection) {
                        var cursorPos = cm.getCursor();
                        cm.setCursor(cursorPos.line, cursorPos.ch - 1);
                    }
                }
            },
            {
                id: 'qa-link-button',
                hotkey: 'Ctrl-L',
                callback: function (cm) {
                    var selection = cm.getSelection();
                    var text = '';
                    var link = '';

                    if (selection.match(/^https?:\/\//)) {
                        link = selection;
                    } else {
                        text = selection;
                    }
                    cm.replaceSelection('[' + text + '](' + link + ')');

                    var cursorPos = cm.getCursor();
                    if (!selection) {
                        cm.setCursor(cursorPos.line, cursorPos.ch - 3);
                    } else if (link) {
                        cm.setCursor(cursorPos.line, cursorPos.ch - (3 + link.length));
                    } else {
                        cm.setCursor(cursorPos.line, cursorPos.ch - 1);
                    }
                }
            },
            {
                id: 'qa-quote-button',
                hotkey: 'Ctrl-Q',
                callback: function (cm) {
                    cm.replaceSelection("> " + cm.getSelection());
                }
            },
            {
                id: 'qa-code-button',
                hotkey: 'Ctrl-K',
                callback: function (cm) {
                    var selection = cm.getSelection();
                    cm.replaceSelection("`\n" + selection + "\n`\n");
                    if (!selection) {
                        var cursorPos = cm.getCursor();
                        cm.setCursor(cursorPos.line - 2, 0);
                    }
                }
            },
            {
                id: 'qa-image-button',
                hotkey: 'Ctrl-G',
                callback: function (cm) {
                    var selection = cm.getSelection();
                    var text = '';
                    var link = '';

                    cm.replaceSelection('![' + text + '](' + link + ')');

                    var cursorPos = cm.getCursor();
                    if (!selection) {
                        cm.setCursor(cursorPos.line, cursorPos.ch - 3);
                    } else if (link) {
                        cm.setCursor(cursorPos.line, cursorPos.ch - (3 + link.length));
                    } else {
                        cm.setCursor(cursorPos.line, cursorPos.ch - 1);
                    }
                }
            },
            {
                id: 'qa-olist-button',
                hotkey: 'Ctrl-O',
                callback: function (cm) {
                    cm.replaceSelection("\n1. " + cm.getSelection());
                }
            },
            {
                id: 'qa-ulist-button',
                hotkey: 'Ctrl-U',
                callback: function (cm) {
                    cm.replaceSelection("\n- " + cm.getSelection());
                }
            },
            {
                id: 'qa-heading-button',
                hotkey: 'Ctrl-H',
                callback: function (cm) {
                    cm.replaceSelection("## " + cm.getSelection());
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

})();
