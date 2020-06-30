import React from 'react';
import OSText from '@shared/Text';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import { Text } from 'react-native';
import Adapter from 'enzyme-adapter-react-16';

describe('Text tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OSText />);
  });

  it('Text snapshot', async () => {
    let component;

    await renderer.act(async () => {
      component = renderer.create(<OSText />);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Check OwnSpace's font", () => {
    const osText = wrapper.find(Text).get(0);
    expect(osText.props.style[1].fontFamily).toEqual('HelveticaNeue');
  });

  it('Text selectable', () => {
    const osText = wrapper.find(Text).get(0);
    expect(osText.props.selectable).toEqual(true);
  });
});

Enzyme.configure({ adapter: new Adapter() });
