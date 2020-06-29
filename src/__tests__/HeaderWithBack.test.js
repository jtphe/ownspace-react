import 'react-native';
import React from 'react';
import Header from '@shared/Header/withBack';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Header tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  describe('Autocomplete snapshot', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    renderer.create(<Header />);
  });
});

Enzyme.configure({ adapter: new Adapter() });
