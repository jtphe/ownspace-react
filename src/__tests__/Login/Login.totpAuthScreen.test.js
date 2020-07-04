import React from 'react';
import TotpAuthScreen from '@components/Login/totpAuthScreen';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TextInput } from 'react-native';
import { OWNSPACE_BLUE, OWNSPACE_PINK_INPUT, OWNSPACE_GRAY } from '@constants';
import i18n from '@i18n/i18n';
import { Button } from 'react-native-paper';

describe('TotpAuthScreen component tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TotpAuthScreen />);
  });
  it('TotpAuthScreen snapshot', async () => {
    let component;
    await renderer.act(async () => {
      component = renderer.create(<TotpAuthScreen />);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Text input test', () => {
    const textInput = wrapper.find(TextInput).get(0).props;

    expect(textInput.style).toEqual({
      height: 50,
      paddingLeft: 15,
      borderColor: 'transparent',
      backgroundColor: OWNSPACE_PINK_INPUT,
      color: OWNSPACE_GRAY,
      opacity: 0.7,
      borderWidth: 1,
      borderRadius: 6,
      marginBottom: 25
    });
    expect(textInput.placeholder).toEqual(i18n.t('totp.placeholder'));
    expect(textInput.keyboardType).toEqual('number-pad');
    expect(textInput.autoCapitalize).toEqual('none');
  });

  it('Button test', () => {
    const button = wrapper.find(Button).get(0).props;
    expect(button.uppercase).toEqual(false);
    expect(button.style).toEqual({
      backgroundColor: OWNSPACE_BLUE,
      padding: 6,
      fontSize: 17,
      fontWeight: 'bold'
    });
    expect(button.labelStyle).toEqual({ color: '#fff' });
  });
});

Enzyme.configure({ adapter: new Adapter() });
