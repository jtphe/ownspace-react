export const U_CREATE_FILE = 'U_CREATE_FILE';
export const M_CREATE_FILE = 'M_CREATE_FILE';
export const U_LOAD_FOLDERS = 'U_LOAD_FOLDERS';
export const M_SET_FOLDERS = 'M_SET_FOLDERS';
export const U_LOAD_FILES = 'U_LOAD_FILES';
export const M_SET_FILES = 'M_SET_FILES';
export const M_SET_PATH = 'M_SET_PATH';
export const M_SET_FOLDERS_STATE_LOADING = 'M_SET_FOLDERS_STATE_LOADING';
export const M_SET_FILES_STATE_LOADING = 'M_SET_FILES_STATE_LOADING';
export const U_CREATE_FOLDER = 'U_CREATE_FOLDER';
export const M_CREATE_FOLDER = 'M_CREATE_FOLDER';
export const U_DOWNLOAD_FILE = 'U_DOWNLOAD_FILE';
export const M_DOWNLOAD_FILE = 'M_DOWNLOAD_FILE';
export const U_ADD_FILE_TO_CACHE = 'U_ADD_FILE_TO_CACHE';
export const M_ADD_FILE_TO_CACHE = 'M_ADD_FILE_TO_CACHE';
export const U_ADD_SELECTED_PICTURE = 'U_ADD_SELECTED_PICTURE';
export const M_ADD_SELECTED_PICTURE = 'M_ADD_SELECTED_PICTURE';
export const M_SET_UPLOADING_FILE = 'M_SET_UPLOADING_FILE';
export const M_REMOVE_UPLOADING_FILE = 'M_REMOVE_UPLOADING_FILE';
export const U_ADD_DOCUMENT = 'U_ADD_DOCUMENT';
export const M_ADD_DOCUMENT = 'M_ADD_DOCUMENT';
export const U_RENAME_DOCUMENT = 'U_RENAME_DOCUMENT';
export const M_RENAME_DOCUMENT = 'M_RENAME_DOCUMENT';
export const U_DELETE_DOCUMENT = 'U_DELETE_DOCUMENT';
export const M_DELETE_DOCUMENT = 'M_DELETE_DOCUMENT';
export const U_ADD_PASSWORD_FOLDER = 'U_ADD_PASSWORD_FOLDER';
export const M_ADD_PASSWORD_FOLDER = 'M_ADD_PASSWORD_FOLDER';
export const U_CHECK_FOLDER_PASSWORD = 'U_CHECK_FOLDER_PASSWORD';
export const U_REMOVE_PASSWORD_FOLDER = 'U_REMOVE_PASSWORD_FOLDER';
export const M_REMOVE_PASSWORD_FOLDER = 'M_REMOVE_PASSWORD_FOLDER';
export const U_ADD_PASSWORD_FILE = 'U_ADD_PASSWORD_FILE';
export const M_ADD_PASSWORD_FILE = 'M_ADD_PASSWORD_FILE';
export const U_CHECK_FILE_PASSWORD = 'U_CHECK_FILE_PASSWORD';
export const U_REMOVE_PASSWORD_FILE = 'U_REMOVE_PASSWORD_FILE';
export const M_REMOVE_PASSWORD_FILE = 'M_REMOVE_PASSWORD_FILE';
export const U_CHECK_FILE_PASSWORD_BEFORE_DELETE =
  'U_CHECK_FILE_PASSWORD_BEFORE_DELETE';
export const U_ADD_USERS_TO_DOCUMENT = 'U_ADD_USERS_TO_DOCUMENT';
export const M_ADD_USERS_TO_DOCUMENT = 'M_ADD_USERS_TO_DOCUMENT';
export const U_REMOVE_USERS_FROM_DOCUMENT = 'U_REMOVE_USERS_FROM_DOCUMENT';
export const M_REMOVE_USERS_FROM_DOCUMENT = 'M_REMOVE_USERS_FROM_DOCUMENT';
export const M_REMOVE_FILE = 'M_REMOVE_FILE';

export const createFile = payload => ({
  type: U_CREATE_FILE,
  payload
});

export const loadFolders = folder => ({
  type: U_LOAD_FOLDERS,
  folder
});

export const loadFiles = folder => ({
  type: U_LOAD_FILES,
  folder
});

export const createFolder = payload => ({
  type: U_CREATE_FOLDER,
  payload
});

export const downloadFile = payload => ({
  type: U_DOWNLOAD_FILE,
  payload
});

export const addFileToCache = path => ({
  type: U_ADD_FILE_TO_CACHE,
  path
});

export const addSelectedPicture = payload => ({
  type: U_ADD_SELECTED_PICTURE,
  payload
});

export const addDocument = payload => ({
  type: U_ADD_DOCUMENT,
  payload
});

export const renameDocument = payload => ({
  type: U_RENAME_DOCUMENT,
  payload
});

export const deleteDocument = payload => ({
  type: U_DELETE_DOCUMENT,
  payload
});

export const addPasswordFolder = payload => ({
  type: U_ADD_PASSWORD_FOLDER,
  payload
});

export const checkFolderPassword = payload => ({
  type: U_CHECK_FOLDER_PASSWORD,
  payload
});

export const removePasswordFolder = payload => ({
  type: U_REMOVE_PASSWORD_FOLDER,
  payload
});

export const addPasswordFile = payload => ({
  type: U_ADD_PASSWORD_FILE,
  payload
});

export const checkFilePassword = payload => ({
  type: U_CHECK_FILE_PASSWORD,
  payload
});

export const removePasswordFile = payload => ({
  type: U_REMOVE_PASSWORD_FILE,
  payload
});

export const checkFilePasswordBeforeDelete = payload => ({
  type: U_CHECK_FILE_PASSWORD_BEFORE_DELETE,
  payload
});

export const addUsersToDocument = payload => ({
  type: U_ADD_USERS_TO_DOCUMENT,
  payload
});

export const removeUserFromDocument = payload => ({
  type: U_REMOVE_USERS_FROM_DOCUMENT,
  payload
});
