import React from 'react';
import BackFolder from '@components/Document/BackFolder';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { View } from 'react-native';
import { CLIENT_COLOR_PRIMARY } from '@constants';

describe('BackFolder component tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BackFolder visible={true} />);
  });
  it('BackFolder snapshot', async () => {
    let component;
    await renderer.act(async () => {
      component = renderer.create(<BackFolder visible={true} />);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Icon back', () => {
    const iconBack = wrapper.find(View).get(0).props.children;
    expect(iconBack[0].props.name).toEqual('arrow-left');
    expect(iconBack[0].props.size).toEqual(18);
    expect(iconBack[0].props.color).toEqual(CLIENT_COLOR_PRIMARY);
    expect(iconBack[0].props.allowFontScaling).toEqual(false);
  });
});

Enzyme.configure({ adapter: new Adapter() });
