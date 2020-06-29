import 'react-native';
import React from 'react';
import Dialog from '@shared/Dialog';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Dialog tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Dialog visible={true} />);
  });

  describe('Autocomplete snapshot', () => {
    const tree = renderer.create(<Dialog visible={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    renderer.create(<Dialog visible={true} />);
  });
});

Enzyme.configure({ adapter: new Adapter() });
