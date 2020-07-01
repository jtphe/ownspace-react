import React from 'react';
import UploadDocument from '@components/Document/UploadDocument';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { View } from 'react-native';
import { CLIENT_COLOR_PRIMARY } from '@constants';

describe('UploadDocument component tests', () => {
  let wrapper;
  const text = 'Loading to test';

  beforeEach(() => {
    wrapper = shallow(<UploadDocument content={text} />);
  });

  it('UploadDocument snapshot', async () => {
    let component;
    await renderer.act(async () => {
      component = renderer.create(<UploadDocument />);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Icon loading', () => {
    const iconLoading = wrapper.find(View).get(0).props.children[0].props
      .children[0];

    expect(iconLoading.props.loading).toEqual(true);
    expect(iconLoading.props.style).toEqual({ marginRight: -20 });
    expect(iconLoading.props.color).toEqual(CLIENT_COLOR_PRIMARY);
    expect(iconLoading.props.uppercase).toEqual(false);
  });

  it('Text loading test', () => {
    const textLoading = wrapper.find(View).get(0).props.children[0].props
      .children[1].props.children;
    expect(textLoading[0].props.children).toEqual(text);
  });
});

Enzyme.configure({ adapter: new Adapter() });
