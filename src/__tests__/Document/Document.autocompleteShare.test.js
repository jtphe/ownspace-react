import React from 'react';
import AutocompleteShare from '@components/Document/autocompleteShare';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('AutocompleteShare component tests', () => {
  //   let wrapper;

  //   beforeEach(() => {
  //     wrapper = shallow(<AutocompleteShare />);
  //   });

  it('AutocompleteShare snapshot', () => {
    const tree = renderer.create(<AutocompleteShare />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

Enzyme.configure({ adapter: new Adapter() });
