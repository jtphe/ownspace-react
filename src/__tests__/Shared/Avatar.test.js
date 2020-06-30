import { Image } from 'react-native';
import React from 'react';
import Avatar from '@shared/Avatar';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Avatar component tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Avatar />);
  });

  it('Avatar snapshot', () => {
    const tree = renderer.create(<Avatar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Image props', () => {
    const avatarImage = wrapper.find(Image).get(0);
    expect(avatarImage.props.source.uri).toEqual(
      'http://eliseretouches.com/media/avatar.png'
    );
    expect(avatarImage.props.style).toEqual({
      width: 100,
      height: 100,
      borderRadius: 50,
      borderColor: '#003466',
      borderWidth: 1
    });
  });
});

Enzyme.configure({ adapter: new Adapter() });
