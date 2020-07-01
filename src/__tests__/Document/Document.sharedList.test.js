import React from 'react';
import SharedList from '@components/Document/SharedList';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { View } from 'react-native';
import { CLIENT_COLOR_PRIMARY } from '@constants';

describe('SharedList component tests', () => {
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
    wrapper = shallow(<SharedList guests={user} />);
  });

  it('SharedList snapshot', () => {
    const tree = renderer.create(<SharedList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Icon users', () => {
    const iconUsers = wrapper.find(View).get(0).props.children[0].props
      .children[0];

    expect(iconUsers.props.name).toEqual('users');
    expect(iconUsers.props.size).toEqual(20);
    expect(iconUsers.props.color).toEqual(CLIENT_COLOR_PRIMARY);
    expect(iconUsers.props.allowFontScaling).toEqual(false);
  });

  it('sharedList test', () => {
    const sharedList = wrapper.find(View).get(0).props.children[1].props.data;
    expect(sharedList[0].firstname).toEqual('BOT');
    expect(sharedList[0].lastname).toEqual('TEST 3');
    expect(sharedList[0].email).toEqual('test3@yopmail.com');
    expect(sharedList[1].firstname).toEqual('BOT');
    expect(sharedList[1].lastname).toEqual('TEST 2');
    expect(sharedList[1].email).toEqual('test2@yopmail.com');
  });
});

Enzyme.configure({ adapter: new Adapter() });
