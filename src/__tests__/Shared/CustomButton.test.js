import 'react-native';
import React from 'react';
import CustomButton from '@shared/CustomButton';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'react-native-paper';
import { CLIENT_COLOR_PRIMARY } from '@constants';

describe('CustomButton tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CustomButton />);
  });

  it('CustomButton snapshot', () => {
    const tree = renderer.create(<CustomButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Test buttons style', () => {
    const cancelBtn = wrapper.find(Button).get(0);
    const validateBtn = wrapper.find(Button).get(1);

    expect(cancelBtn.props.labelStyle).toEqual({
      fontFamily: 'DejaVuSans',
      color: CLIENT_COLOR_PRIMARY
    });
    expect(validateBtn.props.labelStyle).toEqual({
      fontFamily: 'DejaVuSans',
      color: '#fff'
    });
  });
});

Enzyme.configure({ adapter: new Adapter() });
