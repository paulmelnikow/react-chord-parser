import React from "react";
import Highlight from "./Highlight";
import Parser from "./Parser";
import DOMPurify from "dompurify";

export default class Chordify extends React.Component {

    constructor(props) {
        super(props);
        this.color = props.color || "#2e6da4";
        this.parser = new Parser(DOMPurify.sanitize(props.input, { ALLOWED_TAGS: [], KEEP_CONTENT: true }));
    }

    componentDidMount() {
        // for test
    }

    wrapChords = () => {
        return this.parser.wrap(chord => `<span style=color:${this.color}>${chord}</span>`);
    };

    render() {
        return (
            <Highlight text={this.wrapChords()}/>
        )
    }
}
