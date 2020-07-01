import React from 'react';
import SplashScreen from '@components/Menu/index';
import renderer from 'react-test-renderer';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('SplashScreen tests', () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();

  it('SplashScreen snapshot', () => {
    const store = mockStore(initialState);
    const tree = renderer
      .create(
        <Provider store={store}>
          <SplashScreen />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

Enzyme.configure({ adapter: new Adapter() });
