import { takeLatest, put, call } from 'redux-saga/effects';
import api from '@api/index';
import { Actions } from 'react-native-router-flux';
import i18n from '@i18n/i18n';
import {
  U_CREATE_USER,
  M_CREATE_USER,
  U_LOAD_USER,
  M_LOAD_USER,
  U_UPDATE_USER_NAMES,
  M_UPDATE_USER_NAMES,
  U_UPDATE_USER_PASSWORD,
  U_SIGN_OUT,
  M_SIGN_OUT
} from './actions';
import showToast from '@utils/showToast';

function* createUser({ payload }) {
  try {
    const user = yield call(api.createUser, payload);
    yield put({ type: M_CREATE_USER, user });
    const isLoggedIn = true;
    Actions.home({ isLoggedIn });
  } catch (e) {
    console.log('Error while creating user =>', e);
  }
}

function* loadUser({ payload }) {
  try {
    const user = yield call(api.loadUser, payload);
    const { token } = payload;
    yield put({ type: M_LOAD_USER, user, token });
  } catch (e) {
    console.log('Error while loading user =>', e);
  }
}

function* updateUserNames({ payload }) {
  try {
    const user = yield call(api.updateUserNames, payload);
    yield put({
      type: M_UPDATE_USER_NAMES,
      firstname: user.firstname,
      lastname: user.lastname
    });
    showToast(i18n.t('userProfile.profileUpdated'), true);
  } catch (e) {
    console.log('Error while updating user firstname and lastname =>', e);
  }
}

function* updateUserPassword({ payload }) {
  try {
    const res = yield call(api.changeUserPassword, payload);
    if (res.password) {
      yield call(api.updateUserPwdDB, payload);
      Actions.pop();
    }
  } catch (e) {
    console.log('Error while updating user password =>', e);
  }
}

function* signOut() {
  try {
    yield call(api.signOutUser);
    yield put({ type: M_SIGN_OUT, token: null });
    Actions.login();
  } catch (e) {
    console.log('Error while signout =>', e);
  }
}

export default function* watchUser() {
  yield takeLatest(U_CREATE_USER, createUser);
  yield takeLatest(U_LOAD_USER, loadUser);
  yield takeLatest(U_UPDATE_USER_NAMES, updateUserNames);
  yield takeLatest(U_UPDATE_USER_PASSWORD, updateUserPassword);
  yield takeLatest(U_SIGN_OUT, signOut);
}
