import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import AppRouter from './src/router';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

Amplify.configure(awsconfig);

const App = () => {
  return (
      <AppRouter />
  );
};

export default App;
