import React from "react";
import DOMPurify from "dompurify";

export default class Highlight extends React.Component {

    highlightText(text) {
        if (text) {
            text = DOMPurify.sanitize(text);
            return <div dangerouslySetInnerHTML={{__html: text}}/>
        } else {
            return <div></div>;
        }
    }

    render() {
        return this.highlightText(this.props.text);
    }
}
