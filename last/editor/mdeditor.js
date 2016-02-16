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
