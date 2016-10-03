# react-chord-parser

React component and utility for parsing and rendering guitar/ukulele chords.
</br>
Version <0.2.0 is deprecated.

---

### Install

```bash
npm install react-chord-parser --save
```

### Usage

Note, that chords in input string must be in
square brackets and starts with capital letter, e.g. `[Am7]`.

```js
import {Parser, Chord, Chordify} from "react-chord-parser";

const input = '[G]                [D]               \
             When I find myself in times of trouble,\
               [Em]       [C]                       \
             Mother Mary comes to me,               \
               [G]              [D]       [C]    [G]\
             Speaking words of wisdom, let it be.';

const parser = new Parser(input);

// Return an array of unique chords found in the string
const uniques = parser.unique(); // => ["C", "D", "Em", "G"];

class MyComponent extends React.Component {

    diagramSupplier = (chord) => {
        switch (chord) {
            case "C":
                return "x32010";
            case "D":
                return "xx0232";
            case "Em":
                return "022000";
            case "G":
                return "320033";
            default:
                return "xxxxxx";
        }
    };
    
    // this will render all unique chords from the input as vector image
    renderUniqueChords() {
        return uniques.map(chord => <Chord 
                                        key={chord} 
                                        name={chord} 
                                        diagram={this.diagramSupplier(chord)}/>);
    }
    
    render() {
        return (
            // Just emphasize chords found in the input with some color.
            // You can be sure that input text properly sanitized,
            // actually no html tags are allowed, if any – they will be deleted.
            // You can get more control using parser.wrap(callback) method
            <Chordify color="#aa4444" input={input}/>
        )
    }
}

```

## Tests

Run `npm test`.

## License
[MIT](http://opensource.org/licenses/MIT).
