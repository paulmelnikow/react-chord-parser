(function (name, context, definition) {
    if (typeof module !== 'undefined' && module.exports) module.exports = definition();
    else if (typeof define === 'function' && define.amd) define(definition);
    else context[name] = definition();
})('ChordParserRender', this, function () {
    'use strict';

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
        this.regex = /\[(\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)]/g;
    }

    /**
     * Replace each chord in the tab with a string of your own choosing.
     * This is most commonly used to wrap a chord in an anchor tag.
     * @param {function} fn - function that is passed a chord as its only argument, and should return a modified (wrapped) version of the chord.
     * @returns {string} updated string with the tabs transposed.
     */
    ChordParser.prototype.wrap = function (fn) {
        return this.input.replace(this.regex, function (chord) {
            return fn(removeBraces(chord));
        });
    };

    /**
     * Retrieve an array of all chords found in the string, sorted alphabetically
     * @returns {Array} array of chords found in the string
     */
    ChordParser.prototype.all = function () {
        var matches = this.input.match(this.regex);

        if (!matches) {
            return [];
        }

        var matchesNormal = matches.map(function (match) {
            return removeBraces(match);
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

    var removeBraces = function (chord) {
        return chord.replace(/\[(.+)]/, "$1");
    };

    return ChordParser;
});
