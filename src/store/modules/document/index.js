import update from 'immutability-helper';
import {
  M_CREATE_FILE,
  M_SET_FOLDERS,
  M_SET_PATH,
  M_SET_FOLDERS_STATE_LOADING,
  M_SET_FILES_STATE_LOADING,
  M_SET_FILES,
  M_CREATE_FOLDER,
  M_ADD_FILE_TO_CACHE,
  M_ADD_SELECTED_PICTURE,
  M_SET_UPLOADING_FILE,
  M_REMOVE_UPLOADING_FILE,
  M_ADD_DOCUMENT,
  M_RENAME_DOCUMENT,
  M_DELETE_DOCUMENT,
  M_ADD_PASSWORD_FOLDER,
  M_REMOVE_PASSWORD_FOLDER,
  M_ADD_PASSWORD_FILE,
  M_REMOVE_PASSWORD_FILE
} from './actions';

const initialState = {
  cacheFilesPath: [],
  files: [],
  folders: [],
  path: [],
  uploadingFile: [],
  loadingState: {
    folders: true,
    files: true
  },
  users: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_CREATE_FILE:
      return update(state, {
        files: {
          $push: [action.file]
        }
      });
    case M_CREATE_FOLDER:
      return update(state, {
        folders: {
          $push: [action.folder]
        }
      });
    case 'M_RESET_DOCUMENT_STORE':
      return initialState;
    case M_SET_FOLDERS:
      return update(state, {
        folders: {
          $set: action.folders
        },
        loadingState: {
          folders: {
            $set: false
          }
        }
      });
    case M_SET_FILES:
      return update(state, {
        files: {
          $set: action.files
        },
        loadingState: {
          files: {
            $set: false
          }
        }
      });
    case M_SET_PATH: {
      let found = false;
      let index = null;
      // Check if path already exist
      for (let i = 0; i < state.path.length; i++) {
        if (action.path[0].id === state.path[i].id) {
          found = true;
          index = i;
          break;
        }
      }
      if (!found) {
        return update(state, {
          path: {
            $push: action.path
          }
        });
      } else {
        const array = state.path.slice(0);
        array.length = index + 1;
        return { ...state, path: array };
      }
    }
    case M_SET_FOLDERS_STATE_LOADING:
      return update(state, {
        loadingState: {
          folders: {
            $set: true
          }
        }
      });
    case M_SET_FILES_STATE_LOADING:
      return update(state, {
        loadingState: {
          files: {
            $set: true
          }
        }
      });
    case M_ADD_FILE_TO_CACHE:
      return update(state, {
        cacheFilesPath: {
          $push: [action.path]
        }
      });
    case M_ADD_SELECTED_PICTURE:
      return update(state, {
        files: {
          $push: [action.image]
        }
      });
    case M_SET_UPLOADING_FILE:
      return update(state, {
        uploadingFile: {
          $set: [action.payload]
        }
      });
    case M_REMOVE_UPLOADING_FILE:
      return update(state, {
        uploadingFile: {
          $set: []
        }
      });
    case M_ADD_DOCUMENT:
      return update(state, {
        files: {
          $push: [action.document]
        }
      });
    case M_RENAME_DOCUMENT: {
      let index;
      for (let i = 0; i < state.files.length; i++) {
        const element = state.files[i];
        if (element.id === action.id) {
          index = i;
          break;
        }
      }
      return update(state, {
        files: {
          [index]: {
            name: {
              $set: action.name
            },
            updatedAt: {
              $set: action.updatedAt
            }
          }
        }
      });
    }
    case M_DELETE_DOCUMENT: {
      let index;
      if (action.documentType === 'file') {
        for (let i = 0; i < state.files.length; i++) {
          const element = state.files[i];
          if (element.id === action.id) {
            index = i;
            break;
          }
        }
        return update(state, {
          files: {
            $splice: [[index, 1]]
          }
        });
      } else {
        for (let i = 0; i < state.folders.length; i++) {
          const element = state.folders[i];
          if (element.id === action.id) {
            index = i;
            break;
          }
        }
        return update(state, {
          folders: {
            $splice: [[index, 1]]
          }
        });
      }
    }
    case M_ADD_PASSWORD_FOLDER: {
      let index;
      for (let i = 0; i < state.folders.length; i++) {
        const element = state.folders[i];
        if (element.id === action.id) {
          index = i;
          break;
        }
      }
      return update(state, {
        folders: {
          [index]: {
            isProtected: {
              $set: action.isProtected
            },
            updatedAt: {
              $set: action.updatedAt
            }
          }
        }
      });
    }
    case M_REMOVE_PASSWORD_FOLDER: {
      let index;
      for (let i = 0; i < state.folders.length; i++) {
        const element = state.folders[i];
        if (element.id === action.id) {
          index = i;
          break;
        }
      }
      return update(state, {
        folders: {
          [index]: {
            isProtected: {
              $set: action.isProtected
            },
            updatedAt: {
              $set: action.updatedAt
            }
          }
        }
      });
    }
    case M_ADD_PASSWORD_FILE: {
      let index;
      for (let i = 0; i < state.files.length; i++) {
        const element = state.files[i];
        if (element.id === action.id) {
          index = i;
          break;
        }
      }
      return update(state, {
        files: {
          [index]: {
            isProtected: {
              $set: action.isProtected
            },
            updatedAt: {
              $set: action.updatedAt
            }
          }
        }
      });
    }
    case M_REMOVE_PASSWORD_FILE: {
      let index;
      for (let i = 0; i < state.files.length; i++) {
        const element = state.files[i];
        if (element.id === action.id) {
          index = i;
          break;
        }
      }
      return update(state, {
        files: {
          [index]: {
            isProtected: {
              $set: action.isProtected
            },
            updatedAt: {
              $set: action.updatedAt
            }
          }
        }
      });
    }
    case 'M_SET_GROUP_USERS': {
      return update(state, {
        users: {
          $set: action.users
        }
      });
    }
    default:
      return state;
  }
}
