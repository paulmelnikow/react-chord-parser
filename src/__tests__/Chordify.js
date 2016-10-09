import React from 'react';

import {mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Chordify from '../components/Chordify';

describe('Chordify: Full DOM Rendering', () => {

    it('allows us to set props', () => {
        const wrapper = mount(<Chordify input='Am' />);
        expect(wrapper.props().input).to.equal('Am');
    });

    it('calls componentDidMount', () => {
        sinon.spy(Chordify.prototype, 'componentDidMount');
        mount(<Chordify input='Am'/>);
        expect(Chordify.prototype.componentDidMount.calledOnce).to.be.true;
        Chordify.prototype.componentDidMount.restore();
    });
});

describe('Chordify: Static Rendered Markup', () => {

    it('should renders the input as it is', () => {
        const wrapper = render(<Chordify input='Hello Am'/>);
        expect(wrapper.text()).to.equals('Hello Am');
    });

    it('should delete escape symbol', () => {
        const wrapper = render(<Chordify input='\A big bottle of wine'/>);
        expect(wrapper.text()).to.equals('A big bottle of wine');
    });

    it('should not delete escape symbol on a lower case letter', () => {
        const wrapper = render(<Chordify input='\A big \a bottle of wine'/>);
        expect(wrapper.text()).to.equals('A big \\a bottle of wine');
    });
});
