import React from 'react';
import Login from '@components/Login/index';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Login component tests', () => {
  //   let wrapper;

  //   beforeEach(() => {
  //     wrapper = shallow(<Login />);
  //   });

  it('Login snapshot', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

Enzyme.configure({ adapter: new Adapter() });
