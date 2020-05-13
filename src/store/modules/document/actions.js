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
