import React from "react";
import Highlight from "./Highlight";

export default class Chordify extends React.Component {

    constructor(props) {
        super(props);

        this.regex = /\[(\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)]/g;
        this.input = props.input;
        this.color = props.color || "#2e6da4";
        this.showUniqueChordsOnly = props.showUniqueChordsOnly || false;
    }

    componentDidMount() {
        // for test
    }

    removeBraces = chord => chord.replace(/\[(.+)]/, "$1");

    wrap = () => {

        var wrapped = this.input.replace(this.regex,
            chord => `<span style=color:${this.color}>${this.removeBraces(chord)}</span>`);

        return <Highlight text={wrapped}/>;
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
