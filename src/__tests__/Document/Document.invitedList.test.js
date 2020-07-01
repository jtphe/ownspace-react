import React from 'react';
import InvitedList from '@components/Document/InvitedList';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { View } from 'react-native';
import { CLIENT_COLOR_PRIMARY } from '@constants';

describe('InvitedList component tests', () => {
  let wrapper;
  const user = [
    {
      document: '1',
      read: false,
      edit: false,
      user: '3',
      firstname: 'BOT',
      lastname: 'TEST 3',
      email: 'test3@yopmail.com'
    },
    {
      document: '1',
      read: false,
      edit: false,
      user: '2',
      firstname: 'BOT',
      lastname: 'TEST 2',
      email: 'test2@yopmail.com'
    }
  ];

  beforeEach(() => {
    wrapper = shallow(<InvitedList invited={user} />);
  });

  it('InvitedList snapshot', () => {
    const tree = renderer.create(<InvitedList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Icon send', () => {
    const iconSend = wrapper.find(View).get(0).props.children[0].props
      .children[0];
    expect(iconSend.props.name).toEqual('send');
    expect(iconSend.props.size).toEqual(20);
    expect(iconSend.props.color).toEqual(CLIENT_COLOR_PRIMARY);
    expect(iconSend.props.allowFontScaling).toEqual(false);
  });

  it('InvitedList test', () => {
    const invitedList = wrapper.find(View).get(0).props.children[1].props.data;
    expect(invitedList[0].firstname).toEqual('BOT');
    expect(invitedList[0].lastname).toEqual('TEST 3');
    expect(invitedList[0].email).toEqual('test3@yopmail.com');
    expect(invitedList[1].firstname).toEqual('BOT');
    expect(invitedList[1].lastname).toEqual('TEST 2');
    expect(invitedList[1].email).toEqual('test2@yopmail.com');
  });
});

Enzyme.configure({ adapter: new Adapter() });
