import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Chordify from '../index';

// Demo tests

// Shallow Rendering
// https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
// describe('Shallow Rendering', () => {
//
//     it('to have three `.icon-test`s', () => {
//         const wrapper = shallow(<Chordify />);
//         expect(wrapper.find('.icon-test')).to.have.length(3);
//     });
//
//     it('simulates click events', () => {
//         const buttonClick = sinon.spy();
//         const wrapper = shallow(
//           <Chordify handleClick={buttonClick} />
//         );
//         wrapper.find('button').simulate('click');
//         expect(buttonClick.calledOnce).to.equal(true);
//     });
//
// });

// Full DOM Rendering
// https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md
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

// Static Rendered Markup
// https://github.com/airbnb/enzyme/blob/master/docs/api/render.md
// describe('Static Rendered Markup', () => {
//
//     it('renders three `.icon-test`s', () => {
//         const wrapper = render(<MyComponent />);
//         expect(wrapper.find('.icon-test').length).to.equal(3);
//     });
//
// });
