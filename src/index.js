import React from 'react';

class Chord extends React.Component {

    constructor(props) {
        super(props);

        this.regex = /\[(\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)]/;
        this.input = props.input;
    }

    /**
     * Replace each chord in the tab with a string of your own choosing.
     * This is most commonly used to wrap a chord in an anchor tag.
     * @returns {string} updated string with the tabs transposed.
     */
    wrap() {
        return this.input.replace(this.regex, function (chord) {
            return <a>{this.removeBraces(chord)}</a>;
        });
    }

    /**
     * Retrieve an array of all chords found in the string, sorted alphabetically
     * @returns {Array} array of chords found in the string
     */
    all() {
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
    unique() {
        return this.all().filter(function (chord, index, arr) {
            return arr.indexOf(chord) === index;
        });
    };

    renderUnique(parent, supplier) {
        var unique = this.unique();

        unique.forEach(function (chord) {
            var element = document.createElement("div");
            element.id = "id" + chord;
            parent.appendChild(element);
            Raphael.chord(element.id, supplier(chord));
        });
    };

    removeBraces(chord) {
        return chord.replace(/\[(.+)]/, "$1");
    };

    render() {
        return (
            <div>{this.wrap()}</div>
        )
    }
}

export default MyComponent;
