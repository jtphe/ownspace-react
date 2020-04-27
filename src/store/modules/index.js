import { persistCombineReducers } from 'redux-persist';
import app from './app';
import documents from './documents';
import user from './user';
// import AsyncStorage from '@react-native-community/async-storage';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';

const config = {
  key: 'root',
  storage: ExpoFileSystemStorage,
  blacklist: ['app', 'documents']
};

export default persistCombineReducers(config, {
  app,
  documents,
  user
});
