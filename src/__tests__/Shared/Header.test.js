/* eslint-disable global-require */
import { Image, View } from 'react-native';
import React from 'react';
import Header from '@shared/Header/index';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { CLIENT_COLOR_PRIMARY } from '@constants';

describe('Header tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('Header snapshot', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Logo header', () => {
    const logo = wrapper.find(Image).get(0);
    expect(logo.props.source).toEqual(
      require('../../shared/Header/cci_logo.png')
    );
    expect(logo.props.style).toEqual({
      alignSelf: 'center',
      marginLeft: -10,
      resizeMode: 'contain',
      width: 50,
      height: 50
    });
    expect(logo.props.resizeMode).toEqual('contain');
  });

  it('Header style', () => {
    const header = wrapper.find(View).get(0);
    expect(header.props.style).toEqual({
      backgroundColor: CLIENT_COLOR_PRIMARY,
      paddingBottom: 30,
      ...ifIphoneX(
        {
          paddingTop: 60
        },
        {
          paddingTop: 40
        }
      )
    });
  });
});

Enzyme.configure({ adapter: new Adapter() });
