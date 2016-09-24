// 'use strict';
//
// var fs = require('fs');
// var expect = require('chai').expect;
// var ChordParser = require('../index');
//
// describe('The parser', function () {
//
//     it('should not match a chord followed by the beginning of a bar', function () {
//         var result = new ChordParser('A| A- A— A:').all();
//         expect(result).to.empty();
//     });
//
//     // Use case: another enters his/her name in the chords and abbreviates
//     // last name, which happens to be a chord. E.g, "Eric A." - last name
//     // abbrev should not be matched.
//     it('should not match a chord followed by a period', function () {
//         var result = new ChordParser('A.').all();
//         expect(result).to.empty();
//     });
//
//     it('should not match a chord if it is an article', function() {
//         var result = new ChordParser('A big bottle of wine').all();
//         expect(result).to.empty();
//     });
//
//     it('should not match a chord if it is not wrapped into []', function() {
//         var result = new ChordParser('C [D] Am [Cm]').all();
//         expect(result.join('')).to.equal('CmD');
//     });
// });
//
// describe('The unique() method', function () {
//
//     it('should return an array when there are no matches', function () {
//         var result = new ChordParser('').unique();
//         expect(result).to.be.instanceof(Array);
//         expect(result).to.be.empty();
//     });
//
//     it('should sort results alphabetically', function () {
//         var result = new ChordParser('[C] [B] [A]').unique();
//         expect(result.join('')).to.equal('ABC');
//     });
//
//     it('should not contain duplicates', function () {
//         var result = new ChordParser('[A] [A] [B] [C] [A] [D] [E] [F] [E]').unique();
//         expect(result.join('')).to.equal('ABCDEF');
//     });
//
//     it('should be case sensitive by default', function () {
//         var result = new ChordParser('[A] [a] [B] [b] [C] [c]').unique();
//         expect(result.join('')).to.equal('ABC');
//     });
// });
//
// describe('The wrap() method', function () {
//     var wrapper = function (chord) {
//         return '<span>' + chord + '</span>';
//     };
//
//     it('should replace chords with the result of my callback', function () {
//         var result = new ChordParser('[A] [B] [C]').wrap(wrapper);
//         expect(result).to.equal('<span>A</span> <span>B</span> <span>C</span>');
//     });
//
//     it('should be case sensitive by default', function () {
//         var result = new ChordParser('[A] [b] [C]').wrap(wrapper);
//         expect(result).to.equal('<span>A</span> [b] <span>C</span>');
//     });
// });
