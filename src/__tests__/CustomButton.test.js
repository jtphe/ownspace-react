import 'react-native';
import React from 'react';
import CustomButton from '@shared/CustomButton';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('CustomButton tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CustomButton />);
  });

  describe('Autocomplete snapshot', () => {
    const tree = renderer.create(<CustomButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    renderer.create(<CustomButton />);
  });
});

Enzyme.configure({ adapter: new Adapter() });
