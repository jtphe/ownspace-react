import { createSelector } from 'reselect';

export const getCurrentPathId = state =>
  state.document.path[state.document.path.length - 1].id;
export const getNbFiles = state => state.document.files.length;
export const getNbFolders = state => state.document.folders.length;
export const getLoadingState = state => state.document.loadingState;
export const getPath = state => state.document.path;
export const getFolders = state => state.document.folders;
export const getFiles = state => state.document.files;
export const getUploadingFile = state => state.document.uploadingFile;
export const getGroupUsers = state => state.document.users;

export const getCurrentPathString = state => {
  let path = '';
  for (let i = 0; i < state.document.path.length; i++) {
    const element = state.document.path[i].name;
    path = path.concat(`${element}/`);
  }
  return path;
};

export const getDocuments = createSelector(
  [getFolders, getFiles],
  (folders, files) => {
    return folders.concat(files);
  }
);
