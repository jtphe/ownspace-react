import 'react-native';
import React from 'react';
import Text from '@shared/Text';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Text tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Text />);
  });

  describe('Autocomplete snapshot', () => {
    const tree = renderer.create(<Text />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    renderer.create(<Text />);
  });
});

Enzyme.configure({ adapter: new Adapter() });
