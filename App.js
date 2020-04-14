import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import AppRouter from './src/router';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import configureStore from './src/store/configureStore';

YellowBox.ignoreWarnings(['Remote debugger']);
Amplify.configure(awsconfig);

export const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
