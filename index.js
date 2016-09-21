(function (name, context, definition) {
    if (typeof module !== 'undefined' && module.exports) module.exports = definition();
    else if (typeof define === 'function' && define.amd) define(definition);
    else context[name] = definition();
})('ChordParserRender', this, function () {
    'use strict';

    var extend = function () {
        var args = [].slice.call(arguments);
        var src = args.shift();
        var obj, key;

        /* jshint boss:true */
        while (obj = args.shift()) {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    src[key] = obj[key];
                }
            }
        }

        return src;
    };

    /**
     * @constructor
     * @param {string} input - string that contains chords
     */
    function ChordParser(input) {
        if (typeof input !== 'string') {
            throw new Error('ChordParser must be invoked with a string');
        }
        if (!(this instanceof ChordParser)) {
            return new ChordParser(input);
        }

        this.input = input;
        this.defaults = {ignorecase: false};
    }

    /**
     * Replace each chord in the tab with a string of your own choosing.
     * This is most commonly used to wrap a chord in an anchor tag.
     * @param {function} fn - function that is passed a chord as its only argument, and should return a modified (wrapped) version of the chord.
     * @returns {string} updated string with the tabs transposed.
     */
    ChordParser.prototype.wrap = function (fn) {
        var regex = /\[(\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)]/g;

        return this.input.replace(regex, function (chord) {
            return fn(chord.replace(/\[(.+)]/, "$1"));
        });
    };

    /**
     * Retrieve an array of all chords found in the string, sorted alphabetically
     * @returns {Array} array of chords found in the string
     */
    ChordParser.prototype.all = function () {
        var regex = /\[(\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)]/g;

        var matches = this.input.match(regex);

        if (!matches) {
            return [];
        }

        var matchesNormal = matches.map(function (match) {
            return match.replace(/\[(.+)]/, "$1");
        });

        return matchesNormal.sort(function (a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return a > b ? 1 : a < b ? -1 : 0;
        });
    };

    /**
     * Retrieve an array of unique chords found in the string, sorted alphabetically
     * @returns {Array} array of unique chords found in the string, alpha sorted.
     */
    ChordParser.prototype.unique = function () {
        return this.all().filter(function (chord, index, arr) {
            return arr.indexOf(chord) === index;
        });
    };

    return ChordParser;
});
