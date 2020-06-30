/* eslint-disable global-require */
import { Image } from 'react-native';
import React from 'react';
import Logo from '@shared/Logo';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Logo tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Logo />);
  });

  it('Logo snapshot', () => {
    const tree = renderer.create(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Logo header', () => {
    const logo = wrapper.find(Image).get(0);
    expect(logo.props.source).toEqual(
      require('../../shared/Logo/images/os_logo.png')
    );
    expect(logo.props.style).toEqual({
      alignSelf: 'center',
      marginLeft: -10,
      resizeMode: 'contain',
      width: 100,
      height: 100
    });
  });
});

Enzyme.configure({ adapter: new Adapter() });
