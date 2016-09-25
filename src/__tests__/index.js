import React from 'react';

import {mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Chordify from '../index';

describe('Full DOM Rendering', () => {

    it('allows us to set props', () => {
        const wrapper = mount(<Chordify input='[Am]' />);
        expect(wrapper.props().input).to.equal('[Am]');
    });

    it('calls componentDidMount', () => {
        sinon.spy(Chordify.prototype, 'componentDidMount');
        mount(<Chordify input='[Am]'/>);
        expect(Chordify.prototype.componentDidMount.calledOnce).to.be.true;
        Chordify.prototype.componentDidMount.restore();
    });

});

describe('Static Rendered Markup', () => {

    it('should renders the input with chord w/o brackets', () => {
        const wrapper = render(<Chordify input='Hello [Am]'/>);
        expect(wrapper.text()).to.equals('Hello Am');
    });

    it('should renders the input as is if chord in brackets is invalid', () => {
        const wrapper = render(<Chordify input='Hello [H7]'/>);
        expect(wrapper.text()).to.equals('Hello [H7]');
    });

});

describe('Parsing and render unique chords', () => {

    it('should render only unique chords', () => {
        const wrapper = render(<Chordify showUniqueChordsOnly={true} input='Hello [Am] [C] [Am]'/>);
        expect(wrapper.find(".id-Am").text()).to.equals('Am');
        expect(wrapper.find(".id-C").text()).to.equals('C');
    });

});
