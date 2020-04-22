import { persistCombineReducers } from 'redux-persist';
import app from './app';
import document from './document';
import user from './user';
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['app', 'document', 'user']
};

export default persistCombineReducers(config, {
  app,
  document,
  user
});
