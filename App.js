import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import AppRouter from './src/router';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import configureStore from './src/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';

YellowBox.ignoreWarnings(['Remote debugger']);
Amplify.configure(awsconfig);

export const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <MenuProvider
            customStyles={{
              backdrop: {
                backgroundColor: 'black',
                opacity: 0.5
              }
            }}
          >
            <AppRouter />
          </MenuProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
