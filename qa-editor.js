/**
 * Created by eugilamigliore on 02/02/16.
 */

;(function( window ) {

    'use strict';

    /**
     * Extend obj function
     *
     * This is an object extender function. It allows us to extend an object
     * by passing in additional letiables and overwriting the defaults.
     */

    function extend( a, b ) {
        for( let key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    /**
     * QaEditor
     *
     * @param {object} options - The options object
     */
    function QaEditor( options ) {
        this.options = extend( {}, this.options );
        extend( this.options, options );
        this._init();
    }

    /**
     * QaEditor options Object
     *
     * @type {HTMLElement} wrapper to append the panel.
     *
     *
     */
    QaEditor.prototype.options = {
        wrapper : document.body
    }

    /**
     * QaEditor _init
     *
     * This is the initializer function. It builds the HTML of the panel with buttons
     *
     * @type {HTMLElement} this.qa - The Q&A Editor panel div
     *
     */
    QaEditor.prototype._init = function() {

        // get element
        this.buttonBar = document.getElementById("qa-button-bar");

        this.nav  = navigator;

        // The link and title for the help button
        this.helpLink = "http://learn.javascript.ru/";
        this.helpHoverTitle = "javascript.ru";
        this.helpTarget = "_blank";

        //create buttons row
        this.buttonRow = document.createElement("ul");
        this.buttonRow.id = "qa-button-row";
        this.buttonRow = this.buttonBar.appendChild(this.buttonRow);

        //create Bold Button
        this.boldButton = document.createElement("li");
        this.boldButton.className = "qa-button";
        this.boldButton.id = "qa-bold-button";
        this.boldButton.title = "Strong <strong> Ctrl+B";
        this.boldButton.XShift = "0px";
        this.buttonRow.appendChild(this.boldButton);

        //create Italic Button
        this.italicButton = document.createElement("li");
        this.italicButton.className = "qa-button";
        this.italicButton.id = "qa-italic-button";
        this.italicButton.title = "Emphasis <em> Ctrl+I";
        this.italicButton.XShift = "-20px";
        this.buttonRow.appendChild(this.italicButton);

        //create First Space
        this.spacer1 = document.createElement("li");
        this.spacer1.className = "qa-spacer";
        this.spacer1.id = "qa-spacer1";
        this.buttonRow.appendChild(this.spacer1);

        //create Link Button
        this.linkButton = document.createElement("li");
        this.linkButton.className = "qa-button";
        this.linkButton.id = "qa-link-button";
        this.linkButton.title = "Hyperlink <a> Ctrl+L";
        this.linkButton.XShift = "-40px";
        this.buttonRow.appendChild(this.linkButton);

        //create Quote Button
        this.quoteButton = document.createElement("li");
        this.quoteButton.className = "qa-button";
        this.quoteButton.id = "qa-quote-button";
        this.quoteButton.title = "Blockquote <blockquote> Ctrl+Q";
        this.quoteButton.XShift = "-60px";
        this.buttonRow.appendChild(this.quoteButton);

        //create Code Button
        this.codeButton = document.createElement("li");
        this.codeButton.className = "qa-button";
        this.codeButton.id = "qa-code-button";
        this.codeButton.title = "Code Sample <pre><code> Ctrl+K";
        this.codeButton.XShift = "-80px";
        this.buttonRow.appendChild(this.codeButton);

        //create Image Button
        this.imageButton = document.createElement("li");
        this.imageButton.className = "qa-button";
        this.imageButton.id = "qa-image-button";
        this.imageButton.title = "Image <img> Ctrl+G";
        this.imageButton.XShift = "-100px";
        this.buttonRow.appendChild(this.imageButton);

        //create Second Space
        this.spacer2 = document.createElement("li");
        this.spacer2.className = "qa-spacer";
        this.spacer2.id = "qa-spacer2";
        this.buttonRow.appendChild(this.spacer2);

        //create Olist Button
        this.olistButton = document.createElement("li");
        this.olistButton.className = "qa-button";
        this.olistButton.id = "qa-olist-button";
        this.olistButton.title = "Numbered List <ol> Ctrl+O";
        this.olistButton.XShift = "-120px";
        this.buttonRow.appendChild(this.olistButton);

        //create Ulist Button
        this.ulistButton = document.createElement("li");
        this.ulistButton.className = "qa-button";
        this.ulistButton.id = "qa-ulist-button";
        this.ulistButton.title = "Bulleted List <ul> Ctrl+U";
        this.ulistButton.XShift = "-140px";
        this.buttonRow.appendChild(this.ulistButton);

        //create Heading Button
        this.headingButton = document.createElement("li");
        this.headingButton.className = "qa-button";
        this.headingButton.id = "qa-heading-button";
        this.headingButton.title = "Heading <h1>/<h2> Ctrl+H";
        this.headingButton.XShift = "-160px";
        this.buttonRow.appendChild(this.headingButton);

        //create Hr Button
        this.hrButton = document.createElement("li");
        this.hrButton.className = "qa-button";
        this.hrButton.id = "qa-hr-button";
        this.hrButton.title = "Horizontal Rule <hr> Ctrl+R";
        this.hrButton.XShift = "-180px";
        this.buttonRow.appendChild(this.hrButton);

        //create Third Space
        this.spacer3 = document.createElement("li");
        this.spacer3.className = "qa-spacer";
        this.spacer3.id = "qa-spacer3";
        this.buttonRow.appendChild(this.spacer3);

        //create Undo Button
        this.undoButton = document.createElement("li");
        this.undoButton.className = "qa-button";
        this.undoButton.id = "qa-undo-button";
        this.undoButton.title = "Undo - Ctrl+Z";
        this.undoButton.XShift = "-200px";
        this.buttonRow.appendChild(this.undoButton);

        //create Redo Button
        this.redoButton = document.createElement("li");
        this.redoButton.className = "qa-button";
        this.redoButton.id = "qa-redo-button";
        this.redoButton.title = "Redo - Ctrl+Y";
        if (/win/.test(this.nav.platform.toLowerCase())) {
            this.redoButton.title = "Redo - Ctrl+Y";
        }
        else {
            // mac and other non-Windows platforms
            this.redoButton.title = "Redo - Ctrl+Shift+Z";
        }
        this.redoButton.XShift = "-220px";
        this.buttonRow.appendChild(this.redoButton);

        //create Help Button
        this.helpButton = document.createElement("li");
        this.helpButton.className = "qa-button";
        this.helpButton.id = "qa-help-button";
        this.helpButton.XShift = "-240px";

        //create Help Link
        this.helpAnchor = document.createElement("a");
        this.helpAnchor.href = this.helpLink;
        this.helpAnchor.target = this.helpTarget;
        this.helpAnchor.title = this.helpHoverTitle;
        this.helpButton.appendChild(this.helpAnchor);
        this.buttonRow.appendChild(this.helpButton);
        this.buttonRow.appendChild(this.helpButton);

        // run the events
        this._events();
    };

    /**
     * QaEditor _events
     *
     * This is our events function, attach event listener to the button
     *
     * @type {HTMLElement}
     */
    QaEditor.prototype._events = function() {

        CodeMirror.defineOption("listeners", [], function (cm, value) {
            for (let i = 0, len = value.length; i < len; i++) {
                addButtonListener(cm, value[i]);
            }
        });

        let addButtonListener = function(cm, config) {
            let buttonNode = document.getElementById(config.id);
            buttonNode.addEventListener('click', function (e) {

                config.callback(cm);
                cm.focus();
            });

            if (config.hotkey) {
                let map = {};
                map[config.hotkey] = config.callback;
                cm.addKeyMap(map);
            }

        };

    };

    window.QaEditor = QaEditor;



})( window );
