import { takeLatest, put, call, select } from 'redux-saga/effects';
import api from '@api';
import { Storage } from 'aws-amplify';
import { Actions } from 'react-native-router-flux';
import { U_CREATE_FILE, M_CREATE_FILE } from './actions';
import { getUser } from '@store/modules/user/selectors';

function* createFile({ payload }) {
  try {
    const user = yield select(getUser);
    // eslint-disable-next-line no-param-reassign
    payload.owner = user.id;
    // Add file to DynamoDB
    const file = yield call(api.createFileTxt, payload);

    // Add file to S3
    Storage.put(file.name, file.content, {
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
    yield put({ type: M_CREATE_FILE, file });
  } catch (e) {
    console.log('Error while creating file txt =>', e);
  }
}

export default function* watchDocument() {
  yield takeLatest(U_CREATE_FILE, createFile);
}
