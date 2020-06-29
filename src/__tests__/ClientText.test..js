import 'react-native';
import React from 'react';
import ClientText from '@shared/ClientText';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('ClientText tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ClientText />);
  });

  describe('Autocomplete snapshot', () => {
    const tree = renderer.create(<ClientText />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    renderer.create(<ClientText />);
  });
});

Enzyme.configure({ adapter: new Adapter() });
