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
import { Storage } from 'aws-amplify';
import { Actions } from 'react-native-router-flux';

import { U_CREATE_FILE, M_CREATE_FILE } from './actions';

function* createFile({ payload }) {
  try {
    const file = yield call(api.createFileTxt, payload);
    if (file) {
      Storage.put(file.name, file.content, {
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        }
      })
        .then(result => {
          console.log(result); // {key: "test.txt"}
          Actions.pop();
        })
        .catch(err => console.log(err));
    }
    yield put({ type: M_CREATE_FILE, file });
  } catch (e) {
    console.log('Error while creating file txt =>', e);
  }
}

export default function* watchDocuments() {
  yield takeLatest(U_CREATE_FILE, createFile);
}
