import 'react-native';
import React from 'react';
import Dialog from '@shared/Dialog';
import renderer from 'react-test-renderer';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Dialog tests', () => {
  it('Dialog snapshot', () => {
    const tree = renderer.create(<Dialog visible={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

Enzyme.configure({ adapter: new Adapter() });
