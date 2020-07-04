import { Text } from 'react-native';
import React from 'react';
import ClientText from '@shared/ClientText';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('ClientText component tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ClientText />);
  });

  it('ClientText snapshot', async () => {
    let component;
    await renderer.act(async () => {
      component = renderer.create(<ClientText />);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Check client's font", () => {
    const clientText = wrapper.find(Text).get(0);
    expect(clientText.props.style[1].fontFamily).toEqual('DejaVuSans');
  });

  it('Text selectable', () => {
    const clientText = wrapper.find(Text).get(0);
    expect(clientText.props.selectable).toEqual(true);
  });
});

Enzyme.configure({ adapter: new Adapter() });
