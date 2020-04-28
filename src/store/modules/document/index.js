import update from 'immutability-helper';
import { M_CREATE_FILE } from './actions';

const initialState = {
  files: [],
  folders: [],
  path: [],
  upload: {
    isUploading: false,
    progress: 0
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_CREATE_FILE:
      return update(state, {
        files: {
          $push: [action.file]
        }
      });
    case 'M_RESET_DOCUMENT_STORE':
      return initialState;
    default:
      return state;
  }
}
