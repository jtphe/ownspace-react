/* eslint-disable no-param-reassign */
import { takeLatest, put, call, select } from 'redux-saga/effects';
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
  M_SIGN_OUT,
  U_UPDATE_USER_PICTURE,
  M_UPDATE_USER_PICTURE,
  M_PICTURE_IS_UPLOADING,
  U_UPDATE_USER_FORGOTTEN_PASSWORD
} from './actions';
import showToast from '@utils/showToast';
import { Storage } from 'aws-amplify';
import { U_LOAD_FOLDERS, U_LOAD_FILES } from '@store/modules/document/actions';
import { getUser, getPictureName } from '@store/modules/user/selectors';
import moment from 'moment';

const dateNow = +moment();

function* createUser({ payload }) {
  try {
    payload.createdAt = dateNow;
    payload.updatedAt = dateNow;
    const user = yield call(api.createUser, payload);
    // Add file to S3
    Storage.put('Home/', '', {
      level: 'private',
      contentType: 'sprite-brut',
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      }
    })
      .then(result => {
        console.log(result); // {key: "test.txt"}
        Actions.pop();
      })
      .catch(err => console.log(err));
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
    let pictureUrl = null;
    // Check if the user already had a picture, if true load the picture
    if (user.pictureUrl !== null) {
      pictureUrl = yield call(api.getPictureUrl, user.pictureName);
    }
    user.pictureUrl = pictureUrl;
    const { token } = payload;
    yield put({ type: M_LOAD_USER, user, token });
    yield put({ type: U_LOAD_FOLDERS });
    yield put({ type: U_LOAD_FILES });
    yield put({ type: 'M_SET_APP_LOADING', loading: false });
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
      payload.updatedAt = dateNow;
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

function* updateUserPicture({ payload }) {
  try {
    const user = yield select(getUser);
    const pictureName = yield select(getPictureName);
    // Check if the user already had a picture, if true remove the old picture in S3
    if (pictureName !== null) {
      yield call(api.removeOldPicture, pictureName);
    }

    payload.owner = user.id;
    payload.createdAt = dateNow;
    payload.updatedAt = dateNow;

    yield put({ type: M_PICTURE_IS_UPLOADING, isUploading: true });
    const res = yield call(api.updateUserPicture, payload);
    if (res !== null) {
      const url = yield call(api.getPictureUrl, payload.name);
      payload.url = url;
      yield call(api.updateUserPictureDB, payload);
      yield put({ type: M_UPDATE_USER_PICTURE, url, name: payload.name });
    }
  } catch (e) {
    console.log('Error while updating user picture =>', e);
  }
}

function* updateUserForgottenPassword({ payload }) {
  try {
    const res = yield call(api.getUserWithEmail, payload);
    payload.updatedAt = dateNow;
    if (res) {
      payload.id = res.items[0].id;
      yield call(api.updateUserPwdDB, payload);
    }
  } catch (e) {
    console.log('Error while updating user password =>', e);
  }
}

export default function* watchUser() {
  yield takeLatest(U_CREATE_USER, createUser);
  yield takeLatest(U_LOAD_USER, loadUser);
  yield takeLatest(U_UPDATE_USER_NAMES, updateUserNames);
  yield takeLatest(U_UPDATE_USER_PASSWORD, updateUserPassword);
  yield takeLatest(U_SIGN_OUT, signOut);
  yield takeLatest(U_UPDATE_USER_PICTURE, updateUserPicture);
  yield takeLatest(
    U_UPDATE_USER_FORGOTTEN_PASSWORD,
    updateUserForgottenPassword
  );
}
