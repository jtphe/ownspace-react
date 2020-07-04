import React from 'react';
import Autocomplete from '@shared/Autocomplete/index.android';
import renderer from 'react-test-renderer';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Autocomplete android tests', () => {
  it('Autocomplete snapshot', () => {
    const tree = renderer.create(<Autocomplete />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

Enzyme.configure({ adapter: new Adapter() });
