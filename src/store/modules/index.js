import { persistCombineReducers } from 'redux-persist';
import app from './app';
import documents from './documents';
import user from './user';
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['app', 'documents', 'user']
};

export default persistCombineReducers(config, {
  app,
  documents,
  user
});
