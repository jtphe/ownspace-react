import 'react-native';
import React from 'react';
import Avatar from '@shared/Avatar';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Avatar tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Avatar />);
  });

  describe('Avatar snapshot', () => {
    const tree = renderer.create(<Avatar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    renderer.create(<Avatar />);
  });
});

Enzyme.configure({ adapter: new Adapter() });
