import {expect} from 'chai';
import ChordParser from "../components/Parser"

describe('The parser: parsing', () => {

    it('should not match a chord followed by the beginning of a bar', () => {
        const result = new ChordParser('A| A- A— A:').all();
        expect(result).to.be.empty;
    });

    // Use case: another enters his/her name in the chords and abbreviates
    // last name, which happens to be a chord. E.g, "Eric A." - last name
    // abbrev should not be matched.
    it('should not match a chord followed by a period', () => {
        const result = new ChordParser('A.').all();
        expect(result).to.be.empty;
    });

    it('should not match a chord if it is an article and escaped', () => {
        const result = new ChordParser('\\A big bottle of wine').all();
        expect(result).to.be.empty;
    });

    it('should not parse chords', () => {
        const result = new ChordParser('C Dsdfsdf Am sdfsdf').all();
        expect(result.join('')).to.equal('AmC');
    });
});

describe('The parser: the unique() method', function () {

    it('should return an array when there are no matches', () => {
        const result = new ChordParser('').unique();
        expect(result).to.be.instanceof(Array);
        expect(result).to.be.empty;
    });

    it('should sort results alphabetically', () => {
        const result = new ChordParser('C B A').unique();
        expect(result.join('')).to.equal('ABC');
    });

    it('should not contain duplicates', () => {
        const result = new ChordParser('A A B C A D E F E').unique();
        expect(result.join('')).to.equal('ABCDEF');
    });

    it('should be case sensitive by default', () => {
        const result = new ChordParser('A a B b C c').unique();
        expect(result.join('')).to.equal('ABC');
    });
});
