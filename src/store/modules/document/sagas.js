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
  M_ADD_DOCUMENT,
  U_RENAME_DOCUMENT,
  M_RENAME_DOCUMENT,
  U_DELETE_DOCUMENT,
  M_DELETE_DOCUMENT,
  U_ADD_PASSWORD_FOLDER,
  M_ADD_PASSWORD_FOLDER,
  U_CHECK_FOLDER_PASSWORD,
  U_REMOVE_PASSWORD_FOLDER,
  M_REMOVE_PASSWORD_FOLDER,
  U_ADD_PASSWORD_FILE,
  M_ADD_PASSWORD_FILE,
  U_CHECK_FILE_PASSWORD,
  U_REMOVE_PASSWORD_FILE,
  M_REMOVE_PASSWORD_FILE,
  U_CHECK_FILE_PASSWORD_BEFORE_DELETE
} from './actions';
import { getUser } from '@store/modules/user/selectors';
import {
  getCurrentPathId,
  getCurrentPathString,
  getNbFiles
} from '@store/modules/document/selectors';
import i18n from '@i18n/i18n';
import moment from 'moment';
import showToast from '@utils/showToast';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import {
  openFile,
  requestAndroidWriteExternalStorage
} from '@utils/fileManager';

/**
 *  A hash map containing commonly used files
 */
const { dirs } = RNFetchBlob.fs;
const dateNow = +moment();

function* createFile({ payload }) {
  try {
    const user = yield select(getUser);
    const currentPathId = yield select(getCurrentPathId);
    const currentPathString = yield select(getCurrentPathString);
    const nbFiles = yield select(getNbFiles);

    payload.owner = user.id;
    payload.parent = currentPathId;
    payload.createdAt = dateNow;
    payload.updatedAt = dateNow;

    // Add file to DynamoDB
    const file = yield call(api.createFileTxt, payload);

    const folderPayload = {
      id: payload.parent,
      nbFiles,
      updatedAt: payload.updatedAt
    };
    yield call(api.updateFolderNbFiles, folderPayload);

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
      userId: user.id
    };
    const result = yield call(api.loadFolders, payload);
    if (result.items) {
      yield put({
        type: M_SET_FOLDERS,
        folders: result.items
      });
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
    const nbFiles = yield select(getNbFiles);

    payload.owner = user.id;
    payload.parent = currentPathId;
    payload.createdAt = dateNow;
    payload.updatedAt = dateNow;

    yield put({ type: M_SET_UPLOADING_FILE, payload });
    yield call(api.addSelectedFileToS3, payload);

    const folderPayload = {
      id: payload.parent,
      nbFiles,
      updatedAt: payload.updatedAt
    };
    yield call(api.updateFolderNbFiles, folderPayload);

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
    const nbFiles = yield select(getNbFiles);

    payload.owner = user.id;
    payload.parent = currentPathId;
    payload.createdAt = dateNow;
    payload.updatedAt = dateNow;

    yield put({ type: M_SET_UPLOADING_FILE, payload });
    yield call(api.addSelectedFileToS3, payload);

    const document = yield call(api.addSelectedFile, payload);
    const folderPayload = {
      id: payload.parent,
      nbFiles,
      updatedAt: payload.updatedAt
    };
    yield call(api.updateFolderNbFiles, folderPayload);

    yield put({ type: M_REMOVE_UPLOADING_FILE });
    yield put({ type: M_ADD_DOCUMENT, document });
    showToast(i18n.t('document.imported', true));
  } catch (e) {
    console.log('Error while adding document =>', e);
  }
}

function* renameDocument({ payload }) {
  try {
    const currentPathString = yield select(getCurrentPathString);
    const oldPath = currentPathString + payload.oldName;
    const newPath = currentPathString + payload.name;
    payload.path = oldPath;

    // Download the previous file
    const absolutePath = yield call(api.downloadFile, payload);
    payload.path = newPath;
    payload.absolutePath = absolutePath;

    // Upload the file downloaded with the new name to S3
    const res = yield call(api.addSelectedFileToS3, payload);
    // If the file with the new name is uploaded on S3
    if (res) {
      // Set the path to the the old path
      payload.path = oldPath;
      // Remove the old file on S3
      yield call(api.deleteFileFromS3, payload);
      // Rename the file in DynamoDB
      payload.updatedAt = dateNow;
      const file = yield call(api.renameFileDB, payload);
      // If the file has been renamed on DynamoDB
      if (file) {
        yield put({
          type: M_RENAME_DOCUMENT,
          id: file.id,
          name: file.name,
          updatedAt: file.updatedAt
        });
      }
    }
  } catch (e) {
    console.log('Error while renaming document =>', e);
  }
}

function* deleteDocument({ payload }) {
  try {
    const currentPathString = yield select(getCurrentPathString);
    // const user = yield select(getUser);
    let documentPath = '';
    if (payload.documentPath === undefined) {
      documentPath = currentPathString + payload.name;
    }
    // if (payload.nbFiles !== undefined) {
    //   if (payload.nbFiles === 0) {
    //     payload.path = `${documentPath}/`;
    //     // yield call(api.deleteFileFromS3, payload);
    //   } else {
    //     console.log('BCP DE FICHIER');
    //     payload.userId = user.id;
    //     console.log('payload', payload);

    //     const filesList = yield call(api.loadFiles, payload);
    //     const foldersList = yield call(api.loadFolders, payload);

    //     console.log('filesList', filesList);
    //     console.log('foldersList', foldersList);

    //     if (filesList.items.length > 0) {
    //       for (let i = 0; i < filesList.items.length; i++) {
    //         const element = filesList[i];
    //         console.log('element file', element);
    //         const filePayload = {
    //           id: element.id,
    //           path: `${documentPath}/${element.name}`
    //         };
    //         console.log('filePayload', filePayload);
    //         // yield call(api.deleteFileFromS3, filePayload);
    //         // yield call(api.deleteFileFromDB, filePayload);
    //         // yield put({
    //         //   type: M_DELETE_DOCUMENT,
    //         //   id: payload.id,
    //         //   documentType: 'file'
    //         // });
    //       }
    //     }

    //     if (foldersList.items.length > 0) {
    //       for (let i = 0; i < foldersList.items.length; i++) {
    //         const element = foldersList[i];
    //         console.log('element folder', element);
    //         const folderPayload = {
    //           pathId: element.id,
    //           nbFiles: element.nbFiles,
    //           documentPath: `${documentPath}/${element.name}`
    //         };
    //         console.log('folderPayload', folderPayload);
    //         // yield call({
    //         //   type: U_DELETE_DOCUMENT,
    //         //   folderPayload
    //         // });
    //       }
    //     }
    //   }
    // } else {
    payload.path = documentPath;
    yield call(api.deleteFileFromS3, payload);
    yield call(api.deleteFileFromDB, payload);
    yield put({
      type: M_DELETE_DOCUMENT,
      id: payload.id,
      documentType: 'file'
    });
    showToast(showToast(i18n.t('file.deleted')));
    // }
  } catch (e) {
    console.log('Error while deleting document =>', e);
  }
}

function* addPasswordFolder({ payload }) {
  try {
    payload.updatedAt = dateNow;
    const res = yield call(api.addPasswordFolder, payload);
    if (res) {
      yield put({
        type: M_ADD_PASSWORD_FOLDER,
        id: payload.id,
        isProtected: res.isProtected,
        updatedAt: res.updatedAt
      });
      showToast(i18n.t('folder.passwordAdded'), true);
    }
  } catch (e) {
    console.log('Error while adding password to folder =>', e);
  }
}

function* checkFolderPassword({ payload }) {
  try {
    const res = yield call(api.checkFolderPassword, payload);
    if (res === 200) {
      yield put({ type: U_LOAD_FOLDERS, folder: payload.folder });
      yield put({ type: U_LOAD_FILES, folder: payload.folder });
    }
  } catch (e) {
    console.log('Error while checking folder password =>', e);
  }
}

function* removePasswordFolder({ payload }) {
  try {
    payload.updatedAt = dateNow;
    const res = yield call(api.removeFolderPassword, payload);
    if (res) {
      yield put({
        type: M_REMOVE_PASSWORD_FOLDER,
        id: payload.id,
        isProtected: res.isProtected,
        updatedAt: res.updatedAt
      });
      showToast(i18n.t('folder.passwordRemoved'), true);
    }
  } catch (e) {
    console.log('Error while removing the folder password =>', e);
  }
}

function* addPasswordFile({ payload }) {
  try {
    payload.updatedAt = dateNow;
    const res = yield call(api.addPasswordFile, payload);
    if (res) {
      yield put({
        type: M_ADD_PASSWORD_FILE,
        id: payload.id,
        isProtected: res.isProtected,
        updatedAt: res.updatedAt
      });
      showToast(i18n.t('folder.passwordAdded'), true);
    }
  } catch (e) {
    console.log('Error while adding password to file =>', e);
  }
}

function* checkFilePassword({ payload }) {
  try {
    const res = yield call(api.checkFilePassword, payload);
    if (res === 200) {
      const currentPathString = yield select(getCurrentPathString);
      const path = currentPathString + payload.file.name;
      payload.path = path;
      const data = yield call(api.downloadFile, payload);
      const SavePath = Platform.OS === 'ios' ? dirs.CacheDir : dirs.DownloadDir;

      if (Platform.OS === 'android') {
        if (!requestAndroidWriteExternalStorage()) {
          return;
        }
      }

      RNFetchBlob.config({
        path: `${SavePath}/${payload.file.name}`
      })
        .fetch('GET', data, {})
        .progress({}, (received, total) => {
          console.log('((received / total) * 100)', (received / total) * 100);
        })
        .then(file => {
          openFile(file.path());
        });
    }
  } catch (e) {
    console.log('Error while checking file password =>', e);
  }
}

function* removePasswordFile({ payload }) {
  try {
    payload.updatedAt = dateNow;
    const res = yield call(api.removePasswordFile, payload);
    if (res) {
      yield put({
        type: M_REMOVE_PASSWORD_FILE,
        id: payload.id,
        isProtected: res.isProtected,
        updatedAt: res.updatedAt
      });
      showToast(i18n.t('folder.passwordRemoved'), true);
    }
  } catch (e) {
    console.log('Error while removing the file password =>', e);
  }
}

function* checkFilePasswordBeforeDelete({ payload }) {
  try {
    const res = yield call(api.checkFilePassword, payload);
    if (res === 200) {
      const filePayload = {
        name: payload.file.name,
        id: payload.file.id
      };
      yield put({ type: U_DELETE_DOCUMENT, payload: filePayload });
    }
  } catch (e) {
    console.log('Error while checking file password before delete =>', e);
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
  yield takeLatest(U_RENAME_DOCUMENT, renameDocument);
  yield takeLatest(U_DELETE_DOCUMENT, deleteDocument);
  yield takeLatest(U_ADD_PASSWORD_FOLDER, addPasswordFolder);
  yield takeLatest(U_CHECK_FOLDER_PASSWORD, checkFolderPassword);
  yield takeLatest(U_REMOVE_PASSWORD_FOLDER, removePasswordFolder);
  yield takeLatest(U_ADD_PASSWORD_FILE, addPasswordFile);
  yield takeLatest(U_CHECK_FILE_PASSWORD, checkFilePassword);
  yield takeLatest(U_REMOVE_PASSWORD_FILE, removePasswordFile);
  yield takeLatest(
    U_CHECK_FILE_PASSWORD_BEFORE_DELETE,
    checkFilePasswordBeforeDelete
  );
}
