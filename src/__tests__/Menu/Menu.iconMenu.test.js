import React from 'react';
import IconMenu from '@components/Menu/index';
import renderer from 'react-test-renderer';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('IconMenu tests', () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();

  it('IconMenu snapshot', () => {
    const store = mockStore(initialState);
    const tree = renderer
      .create(
        <Provider store={store}>
          <IconMenu />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

Enzyme.configure({ adapter: new Adapter() });
