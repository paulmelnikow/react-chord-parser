import React from "react";
import Highlight from "./components/Highlight";
import Chord from "./components/Chord";

export default class Chordify extends React.Component {

    constructor(props) {
        super(props);

        this.regex = /\[(\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)]/g;
        this.input = props.input;
        this.color = props.color || "#2e6da4";
        this.showUniqueChordsOnly = props.showUniqueChordsOnly || false;
    }

    componentDidMount() {

    }

    removeBraces = chord => chord.replace(/\[(.+)]/, "$1");

    wrap = () => {

        var wrapped = this.input.replace(this.regex,
            chord => `<span style=color:${this.color}>${this.removeBraces(chord)}</span>`);

        return <Highlight text={wrapped}/>;
    };

    all = () => {
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

    unique = () => {
        return this.all().filter((chord, index, arr) => arr.indexOf(chord) === index);
    };

    renderUniqueChords(diagramSupplier) {
        var unique = this.unique();

        const nodes = unique.map(chord => {
            return <Chord key={chord} name={chord} diagram={diagramSupplier(chord)} />;
        });

        return (
            <div>{nodes}</div>
        )
    };

    renderInput() {
        return (
            <div>{this.wrap()}</div>
        )
    }

    render() {
        if (this.showUniqueChordsOnly) {
            if (typeof this.props.diagramSupplier == "undefined") {
                throw new Error("Must supply diagramSupplier callback");
            }
            return this.renderUniqueChords(this.props.diagramSupplier);
        } else {
            return this.renderInput();
        }
    }
}
