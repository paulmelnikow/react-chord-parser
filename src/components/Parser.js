export default class Parser {

    constructor(input) {
        this.input = input;
        this.regex = /\[(\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)]/g;
    }

    removeBraces = chord => chord.replace(/\[(.+)]/, "$1");

    all() {
        const matches = this.input.match(this.regex);

        if (!matches) {
            return [];
        }

        const matchesNormal = matches.map(match => this.removeBraces(match));

        return matchesNormal.sort((a, b) => {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return a > b ? 1 : a < b ? -1 : 0;
        });
    };

    unique() {
        return this.all().filter((chord, index, arr) => arr.indexOf(chord) === index);
    }
}
