# chord-parser-render

Utility for parsing and rendering guitar chords contained within an any string. Note, that chord must be in
square brackets and starts with capital letter, e.g. `[Am7]`.
Brackets will be removed after processing a chord.
The most common use case is to wrap all chords found within a song in an anchor tag
so that their finger chart can be presented in a tooltip.

### Rendering

In progress.

---

### Install

```bash
npm install chord-parser-render
```

or if using on the web, clone repo, run `grunt copy` and grab the `dist/chord-parser-render.min.js` file.

### Usage

```js
var input = '\
[Em]                 [D]    [Dsus4] [Cadd9] \
So close no matter how far.                 \
[Em]                    [D]          [Cadd9]\
Couldn’t be much more from the heart.       \
[Em]               [D]       [Dsus4] [Cadd9]\
Forever trusting who we are                 \
[G]   [B7]           [Em]                   \
And nothing else matters.';

// Import
var ChordParser = require('chord-parser-render');

// Create a new ChordParser object with the input string
var tabs = new ChordParser(input);

// Wrap chords found in the string (Em, D, etc.) with an anchor tag
var wrappedTab = tabs.wrap(function(chord) {
  return '<a href="">' + chord + '</a>';
});

// Return an array of unique chords found in the string
var uniques = tabs.unique(); // => ["B7", "Cadd9", "D", "Dsus4", "Em", "G"];
```

## API

### constructor

Create a new chord parsing object passing in a string of guitar tabs/chords to parse:

```js
var parser = new ChordParser(inputString);
```

### `wrap(replacerFn);`

This method calls the function `replacerFn` for each chord it finds in the
input string, passing in the chord in as its only argument. Your wrapper function should
return a string to replace the chord with. A modified version of the input
string with the transposed replacements is returned.

```js
new ChordParser('[Ab] [C#]').wrap(function(chord) {
  return '<a>' + chord + '</a>';
});

// Return value: '<a>Ab</a> <a>C#</a>'
```

### `all()`

Return a sorted array of all chords found in the input string.

```js
new ChordParser('[Ab] [C#] [B] [C#]').all();

// Return value: ['Ab', 'B', 'C#', 'C#']
```


### `unique()`

Return a sorted array of unique chords found in the input string.

```js
new ChordParser('[Ab] [C#] [B] [C#]').unique();

// Return value: ['Ab', 'B', 'C#']
```

## Tests

Run `npm test`.

## License
[MIT](http://opensource.org/licenses/MIT).
