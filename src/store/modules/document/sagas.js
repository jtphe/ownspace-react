/* eslint-disable no-param-reassign */
import { takeLatest, put, call, select } from 'redux-saga/effects';
import api from '@api';
import { Storage } from 'aws-amplify';
import { Actions } from 'react-native-router-flux';
import {
  U_CREATE_FILE,
  M_CREATE_FILE,
  U_LOAD_FOLDERS,
  M_SET_FOLDERS,
  U_LOAD_FILES,
  M_SET_FILES,
  M_SET_PATH,
  M_SET_FOLDERS_STATE_LOADING,
  M_SET_FILES_STATE_LOADING,
  U_CREATE_FOLDER,
  M_CREATE_FOLDER,
  U_DOWNLOAD_FILE,
  U_ADD_FILE_TO_CACHE,
  M_ADD_FILE_TO_CACHE,
  U_ADD_SELECTED_PICTURE,
  M_ADD_SELECTED_PICTURE,
  M_SET_UPLOADING_FILE,
  M_REMOVE_UPLOADING_FILE,
  U_ADD_DOCUMENT,
  M_ADD_DOCUMENT
} from './actions';
import { getUser } from '@store/modules/user/selectors';
import {
  getCurrentPathId,
  getCurrentPathString
} from '@store/modules/document/selectors';
import i18n from '@i18n/i18n';
import moment from 'moment';
import showToast from '@utils/showToast';

function* createFile({ payload }) {
  try {
    const user = yield select(getUser);
    const currentPathId = yield select(getCurrentPathId);
    const currentPathString = yield select(getCurrentPathString);
    const dateNow = +moment();

    payload.owner = user.id;
    payload.parent = currentPathId;
    payload.createdAt = dateNow;
    payload.updatedAt = dateNow;

    // Add file to DynamoDB
    const file = yield call(api.createFileTxt, payload);

    if (currentPathString !== 'Home/') {
      // Add file to S3
      Storage.put(currentPathString + file.name, file.content, {
        level: 'private',
        contentType: 'sprite-brut',
        progressCallback(progress) {
          console.log('progress', progress);
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        }
      })
        .then(result => {
          console.log(result); // {key: "test.txt"}
          Actions.pop();
        })
        .catch(err => console.log(err));
    } else {
      // Add file to S3
      Storage.put(`Home/${file.name}`, file.content, {
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
    }
    yield put({ type: M_CREATE_FILE, file });
  } catch (e) {
    console.log('Error while creating file txt =>', e);
  }
}

function* createFolder({ payload }) {
  try {
    const user = yield select(getUser);
    const currentPathId = yield select(getCurrentPathId);
    const currentPathString = yield select(getCurrentPathString);
    const dateNow = +moment();
    payload.owner = user.id;
    payload.parent = currentPathId;
    payload.createdAt = dateNow;
    payload.updatedAt = dateNow;

    // Add folder to DynamoDB
    const folder = yield call(api.createFolder, payload);

    if (currentPathString !== 'Home/') {
      // Add file to S3
      Storage.put(`${currentPathString + folder.name}/`, '', {
        level: 'private',
        contentType: 'sprite-brut',
        progressCallback(progress) {
          console.log('progress', progress);
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        }
      })
        .then(result => {
          console.log(result); // {key: "test.txt"}
          Actions.pop();
        })
        .catch(err => console.log(err));
    } else {
      // Add file to S3
      Storage.put(`Home/${folder.name}/`, '', {
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
    }
    yield put({ type: M_CREATE_FOLDER, folder });
  } catch (e) {
    console.log('Error while creating a folder => ', e);
  }
}

function* loadFolders({ folder }) {
  try {
    yield put({ type: M_SET_FOLDERS_STATE_LOADING });
    const user = yield select(getUser);
    const path = folder
      ? [{ name: folder.name, id: folder.id }]
      : [{ id: -1, name: i18n.t('document.home') }];
    const payload = {
      pathId: path[0].id,
      owner: user.id
    };
    const result = yield call(api.loadFolders, payload);
    if (result.items) {
      yield put({ type: M_SET_FOLDERS, folders: result.items });
      yield put({ type: M_SET_PATH, path });
    }
  } catch (e) {
    console.log('Error while loading folders =>', e);
  }
}

function* loadFiles({ folder }) {
  try {
    yield put({ type: M_SET_FILES_STATE_LOADING });
    const user = yield select(getUser);
    const path = folder ? [{ name: folder.name, id: folder.id }] : [{ id: -1 }];
    const payload = {
      pathId: path[0].id,
      userId: user.id
    };
    const result = yield call(api.loadFiles, payload);
    if (result.items) {
      yield put({ type: M_SET_FILES, files: result.items });
    }
  } catch (e) {
    console.log('Error while loading files =>', e);
  }
}

function* downloadFile({ payload }) {
  try {
    const data = yield call(api.downloadFile, payload);
    if (data) {
      return payload.resolve(data);
    }
    return payload.reject();
  } catch (e) {
    console.log('Error while opening file =>', e);
  }
}

function* addFileToCache({ path }) {
  try {
    yield put({ type: M_ADD_FILE_TO_CACHE, path });
  } catch (e) {
    console.log('Error while adding file to cache =>', e);
  }
}

function* addSelectedPicture({ payload }) {
  try {
    const user = yield select(getUser);
    const currentPathId = yield select(getCurrentPathId);
    const dateNow = +moment();

    payload.owner = user.id;
    payload.parent = currentPathId;
    payload.createdAt = dateNow;
    payload.updatedAt = dateNow;

    yield put({ type: M_SET_UPLOADING_FILE, payload });
    yield call(api.addSelectedFileToS3, payload);

    const image = yield call(api.addSelectedFile, payload);
    yield put({ type: M_REMOVE_UPLOADING_FILE });
    yield put({ type: M_ADD_SELECTED_PICTURE, image });
    showToast(i18n.t('picture.imported', true));
  } catch (e) {
    console.log('Error while adding selected picture =>', e);
  }
}

function* addDocument({ payload }) {
  try {
    const user = yield select(getUser);
    const currentPathId = yield select(getCurrentPathId);
    const dateNow = +moment();

    payload.owner = user.id;
    payload.parent = currentPathId;
    payload.createdAt = dateNow;
    payload.updatedAt = dateNow;

    yield put({ type: M_SET_UPLOADING_FILE, payload });
    yield call(api.addSelectedFileToS3, payload);

    const document = yield call(api.addSelectedFile, payload);

    yield put({ type: M_REMOVE_UPLOADING_FILE });
    yield put({ type: M_ADD_DOCUMENT, document });
    showToast(i18n.t('document.imported', true));
  } catch (e) {
    console.log('Error while adding document =>', e);
  }
}

export default function* watchDocument() {
  yield takeLatest(U_CREATE_FILE, createFile);
  yield takeLatest(U_LOAD_FOLDERS, loadFolders);
  yield takeLatest(U_LOAD_FILES, loadFiles);
  yield takeLatest(U_CREATE_FOLDER, createFolder);
  yield takeLatest(U_DOWNLOAD_FILE, downloadFile);
  yield takeLatest(U_ADD_FILE_TO_CACHE, addFileToCache);
  yield takeLatest(U_ADD_SELECTED_PICTURE, addSelectedPicture);
  yield takeLatest(U_ADD_DOCUMENT, addDocument);
}
