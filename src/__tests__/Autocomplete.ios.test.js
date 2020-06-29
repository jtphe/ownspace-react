import 'react-native';
import React from 'react';
import Autocomplete from '@shared/Autocomplete/index.ios';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Autocomplete tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Autocomplete />);
  });

  describe('Autocomplete snapshot', () => {
    const tree = renderer.create(<Autocomplete />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    renderer.create(<Autocomplete />);
  });
});

Enzyme.configure({ adapter: new Adapter() });
