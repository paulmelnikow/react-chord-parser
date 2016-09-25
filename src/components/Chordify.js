import React from "react";
import Highlight from "./Highlight";
import Parser from "./Parser";

export default class Chordify extends React.Component {

    constructor(props) {
        super(props);
        this.parser = new Parser(props.input, props.color);
    }

    componentDidMount() {
        // for test
    }

    render() {
        return (
            <Highlight text={this.parser.wrap()}/>
        )
    }
}
