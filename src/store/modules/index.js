import { persistCombineReducers, persistReducer } from 'redux-persist';
import app from './app';
import documents from './documents';
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

const config = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['app', 'documents']
};

export default persistCombineReducers(config, {
    app,
    documents
});