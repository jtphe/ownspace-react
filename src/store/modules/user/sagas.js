import {
  takeEvery,
  takeLatest,
  takeLeading,
  select,
  put,
  call,
  take,
  fork,
  cancel
} from 'redux-saga/effects';
import api from '@api/index';
import { Actions } from 'react-native-router-flux';

import { U_CREATE_USER, M_CREATE_USER } from './actions';

function* createUser({ payload }) {
  try {
    const user = yield call(api.createUser, payload);
    yield put({ type: M_CREATE_USER, user });
    Actions.home();
  } catch (e) {
    console.log('Error while creating user =>', e);
  }
}

export default function* watchUser() {
  yield takeLatest(U_CREATE_USER, createUser);
}
