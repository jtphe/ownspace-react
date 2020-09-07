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
  U_CHECK_FILE_PASSWORD_BEFORE_DELETE,
  U_ADD_USERS_TO_DOCUMENT,
  M_ADD_USERS_TO_DOCUMENT,
  U_REMOVE_USERS_FROM_DOCUMENT,
  M_REMOVE_USERS_FROM_DOCUMENT,
  M_REMOVE_FILE
} from './actions';
import {
  getUser,
  getUserStorageSpaceUsed,
  getUserTotalStorageSpace
} from '@store/modules/user/selectors';
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

    // Update the number of files in the folder
    if (currentPathId !== -1) {
      const folderPayload = {
        id: payload.parent,
        nbFiles,
        updatedAt: dateNow
      };
      yield call(api.updateFolderNbFiles, folderPayload);
    }

    if (currentPathString !== 'Home/') {
      // Add file to S3
      Storage.put(currentPathString + file.name, file.content, {
        level: 'protected',
        contentType: 'sprite-brut',
        progressCallback(progress) {
          console.log('progress', progress);
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        }
      })
        .then(result => {
          console.log(result);
          Actions.pop();
        })
        .catch(err => console.log(err));
    } else {
      // Add file to S3
      Storage.put(`Home/${file.name}`, file.content, {
        level: 'protected',
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
    file.sharedUsers = [];
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
        level: 'protected',
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
        level: 'protected',
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
    folder.sharedUsers = [];
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

    // TODO: Load the user shared folders
    // const sharedFolders = yield call(api.loadSharedFolders, payload);

    // if (sharedFolders.items.length > 0) {
    //   for (let i = 0; i < sharedFolders.items.length; i++) {
    //     const element = sharedFolders.items[i];
    //     const folderGet = yield call(api.getFolder, { id: element.id });
    //     const rightPayload = {
    //       user: user.id,
    //       document: folderGet.id
    //     };
    //     const rights = yield call(api.getUserRightsOnDocument, rightPayload);
    //     folder.read = rights.items[0].read;
    //     folder.edit = rights.items[0].edit;
    //     folder.shared = true;
    //     result.items.push(folder);
    //   }
    // }

    if (result.items) {
      const finalFoldersList = [];
      for (let i = 0; i < result.items.length; i++) {
        const element = result.items[i];
        const payloadFolder = {
          id: element.id
        };
        // Get the shared users of the file
        const sharedUsers = yield call(api.loadSharedUser, payloadFolder);
        element.sharedUsers = sharedUsers.items;
        finalFoldersList.push(element);
      }
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
    const sharedFiles = yield call(api.loadSharedFiles, payload);
    // If the user have shared files, get the user's rights on them
    if (sharedFiles.items.length > 0) {
      for (let i = 0; i < sharedFiles.items.length; i++) {
        const element = sharedFiles.items[i];
        const file = yield call(api.getFile, { id: element.document });
        const rightPayload = {
          user: user.id,
          document: file.id
        };
        const rights = yield call(api.getUserRightsOnDocument, rightPayload);
        file.read = rights.items[0].read;
        file.edit = rights.items[0].edit;
        file.shared = true;
        file.path = rights.items[0].path;

        if (path[0].id === -1) {
          result.items.push(file);
        }
      }
    }

    if (result.items) {
      const finalFilesList = [];
      for (let i = 0; i < result.items.length; i++) {
        const element = result.items[i];
        const payloadFile = {
          id: element.id
        };
        // Get the shared users of the file
        const sharedUsers = yield call(api.loadSharedUser, payloadFile);
        if (sharedUsers.items.length > 0) {
          for (let j = 0; j < sharedUsers.items.length; j++) {
            const sharedUser = sharedUsers.items[j];
            if (sharedUser.pictureName) {
              payload.owner = sharedUser.user;
              const res = yield call(api.getIdentityId, payload);
              if (res) {
                const payloadPicture = {
                  pictureName: sharedUser.pictureName,
                  shared: true,
                  identityId: res.identityId
                };
                sharedUser.pictureUrl = yield call(
                  api.getPictureUrl,
                  payloadPicture
                );
              }
            }
          }
        }
        element.sharedUsers = sharedUsers.items;
        finalFilesList.push(element);
      }
      yield put({ type: M_SET_FILES, files: finalFilesList });
    }
  } catch (e) {
    console.log('Error while loading files =>', e);
  }
}

function* downloadFile({ payload }) {
  try {
    let data;
    if (payload.shared) {
      const res = yield call(api.getIdentityId, payload);
      if (res) {
        payload.identityId = res.identityId;
        data = yield call(api.downloadFile, payload);
      }
    } else {
      data = yield call(api.downloadFile, payload);
    }
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
    const storageSpaceUsed = yield select(getUserStorageSpaceUsed);
    const totalStorageSpace = yield select(getUserTotalStorageSpace);
    const currentPathId = yield select(getCurrentPathId);
    const nbFiles = yield select(getNbFiles);

    if (storageSpaceUsed + payload.size < totalStorageSpace) {
      payload.owner = user.id;
      payload.parent = currentPathId;
      payload.createdAt = dateNow;
      payload.updatedAt = dateNow;
      payload.storage = storageSpaceUsed + payload.size;

      yield put({ type: M_SET_UPLOADING_FILE, payload });
      yield call(api.addSelectedFileToS3, payload);
      // Update the storageSpaceUsed
      yield call(api.updateStorageSpaceUsed, payload);
      // Update the number of files in the folder
      if (currentPathId !== -1) {
        const folderPayload = {
          id: payload.parent,
          nbFiles,
          updatedAt: dateNow
        };
        yield call(api.updateFolderNbFiles, folderPayload);
      }

      const image = yield call(api.addSelectedFile, payload);
      image.sharedUsers = [];
      yield put({ type: M_REMOVE_UPLOADING_FILE });
      yield put({ type: M_ADD_SELECTED_PICTURE, image });
      yield put({
        type: 'M_UPDATE_STORAGE_SPACE_USED',
        storage: payload.storage
      });
      showToast(i18n.t('picture.imported', true));
    } else {
      showToast(i18n.t('document.noStorage', true));
    }
  } catch (e) {
    console.log('Error while adding selected picture =>', e);
  }
}

function* addDocument({ payload }) {
  try {
    const user = yield select(getUser);
    const storageSpaceUsed = yield select(getUserStorageSpaceUsed);
    const totalStorageSpace = yield select(getUserTotalStorageSpace);
    const currentPathId = yield select(getCurrentPathId);
    const nbFiles = yield select(getNbFiles);

    if (storageSpaceUsed + payload.size < totalStorageSpace) {
      payload.owner = user.id;
      payload.parent = currentPathId;
      payload.createdAt = dateNow;
      payload.updatedAt = dateNow;
      payload.storage = storageSpaceUsed + payload.size;

      yield put({ type: M_SET_UPLOADING_FILE, payload });
      yield call(api.addSelectedFileToS3, payload);

      // Add the document to DynamoDB
      const document = yield call(api.addSelectedFile, payload);
      // Update the storageSpaceUsed
      yield call(api.updateStorageSpaceUsed, payload);
      // Update the number of files in the folder
      if (currentPathId !== -1) {
        const folderPayload = {
          id: payload.parent,
          nbFiles,
          updatedAt: dateNow
        };
        yield call(api.updateFolderNbFiles, folderPayload);
      }
      document.sharedUsers = [];
      yield put({ type: M_REMOVE_UPLOADING_FILE });
      yield put({ type: M_ADD_DOCUMENT, document });
      yield put({
        type: 'M_UPDATE_STORAGE_SPACE_USED',
        storage: payload.storage
      });
      showToast(i18n.t('document.imported', true));
    } else {
      showToast(i18n.t('document.noStorage', true));
    }
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
          updatedAt: dateNow
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
    const storageSpaceUsed = yield select(getUserStorageSpaceUsed);
    let documentPath = '';
    if (payload.documentPath === undefined) {
      documentPath = currentPathString + payload.name;
    }
    payload.path = documentPath;
    payload.storage = storageSpaceUsed - payload.size;
    yield call(api.deleteFileFromS3, payload);
    yield call(api.deleteFileFromDB, payload);
    // Update the storageSpaceUsed
    yield call(api.updateStorageSpaceUsed, payload);
    yield put({
      type: M_DELETE_DOCUMENT,
      id: payload.id,
      documentType: 'file'
    });
    yield put({
      type: 'M_UPDATE_STORAGE_SPACE_USED',
      storage: payload.storage
    });
    showToast(showToast(i18n.t('file.deleted')));
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
        updatedAt: dateNow
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
      let data;
      const currentPathString = yield select(getCurrentPathString);
      const path = currentPathString + payload.file.name;
      payload.path = path;
      if (payload.shared) {
        const resId = yield call(api.getIdentityId, payload);
        if (resId) {
          payload.identityId = resId.identityId;
          data = yield call(api.downloadFile, payload);
        }
      } else {
        data = yield call(api.downloadFile, payload);
      }
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

function* checkFilePasswordBeforeRemove({ payload }) {
  try {
    payload.updatedAt = dateNow;
    const res = yield call(api.checkFilePassword, payload);
    if (res === 200) {
      const bar = yield call(api.removePasswordFile, payload);
      if (bar) {
        yield put({
          type: M_REMOVE_PASSWORD_FILE,
          id: bar.id,
          isProtected: bar.isProtected,
          updatedAt: dateNow
        });
        showToast(i18n.t('folder.passwordRemoved'), true);
      }
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
        id: payload.file.id,
        owner: payload.file.owner,
        size: payload.file.size !== null ? payload.file.size : 0
      };

      yield put({ type: U_DELETE_DOCUMENT, payload: filePayload });
    }
  } catch (e) {
    console.log('Error while checking file password before delete =>', e);
  }
}

function* addUsersToDocument({ payload }) {
  try {
    const user = yield select(getUser);
    const usersAdded = [];

    for (let i = 0; i < payload.list.length; i++) {
      const element = payload.list[i];
      if (element.id === payload.document.owner) {
        showToast(i18n.t('shareModal.cantAddOwner'), false);
      } else if (element.id !== user.id) {
        if (element.pictureName) {
          payload.owner = element.id;
          const res = yield call(api.getIdentityId, payload);
          if (res) {
            const payloadPicture = {
              pictureName: element.pictureName,
              shared: true,
              identityId: res.identityId
            };
            element.pictureUrl = yield call(api.getPictureUrl, payloadPicture);
          }
        }
        const finalPayload = {
          type: payload.type,
          document: payload.document.id,
          read: element.right === 'Read' || element.right === 'Lecture',
          edit: element.right === 'Edit' || element.right === 'Édition',
          user: element.id,
          firstname: element.firstname === null ? '' : element.firstname,
          lastname: element.lastname === null ? '' : element.lastname,
          email: element.email,
          createdAt: dateNow,
          updatedAt: dateNow,
          path: payload.path,
          pictureName: element.pictureName,
          pictureUrl: element.pictureUrl
        };

        yield call(api.addUsersToDocument, finalPayload);
        // if (payload.type === 'folder') {
        //   const path = payload.document
        //     ? [{ name: payload.document.name, id: payload.document.id }]
        //     : [{ id: -1 }];
        //   const { owner } = payload.document;
        //   payload.pathId = path;
        //   payload.userId = owner;
        //   const folderFiles = yield call(api.getFilesId, payload);
        //   console.log('folderFiles', folderFiles);
        // }
        usersAdded.push(finalPayload);

        yield put({
          type: M_ADD_USERS_TO_DOCUMENT,
          document: payload.document.id,
          user: finalPayload
        });
      } else {
        showToast(i18n.t('shareModal.cantAddOneSelf'), false);
      }
    }

    if (usersAdded.length > 0) {
      Actions.refresh({ usersAdded });
    }
  } catch (e) {
    console.log('Error while adding users to document =>', e);
  }
}

function* removeUserFromDocument({ payload }) {
  try {
    const user = yield select(getUser)

    let indexToRemove;
    const res = yield call(api.getRight, payload);
    if (res.items) {
      payload.rightId = res.items[0].id;
      const deleted = yield call(api.removeUserFromDocument, payload);
      if (deleted.id) {
        yield put({
          type: M_REMOVE_USERS_FROM_DOCUMENT,
          user: payload.user,
          id: payload.document
        });
        if (payload.user === user.id) {
          yield put({
            type: M_REMOVE_FILE,
            file: payload.document
          });
          Actions.pop();
        }
        for (let i = 0; i < payload.guests.length; i++) {
          const element = payload.guests[i];
          if (element.user === payload.user) {
            indexToRemove = i;
            break;
          }
        }
        const guestsTmp = [...payload.guests];
        guestsTmp.splice(indexToRemove, 1);
        Actions.refresh({ userRemove: guestsTmp });
      }
    }
  } catch (e) {
    console.log('Error while removing user from document =>', e);
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
  yield takeLatest(U_REMOVE_PASSWORD_FILE, checkFilePasswordBeforeRemove);
  yield takeLatest(
    U_CHECK_FILE_PASSWORD_BEFORE_DELETE,
    checkFilePasswordBeforeDelete
  );
  yield takeLatest(U_ADD_USERS_TO_DOCUMENT, addUsersToDocument);
  yield takeLatest(U_REMOVE_USERS_FROM_DOCUMENT, removeUserFromDocument);
}
