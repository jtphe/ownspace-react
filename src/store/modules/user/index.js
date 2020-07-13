import update from 'immutability-helper';
import {
  M_CREATE_USER,
  M_LOAD_USER,
  M_UPDATE_USER_NAMES,
  M_SIGN_OUT,
  M_PICTURE_IS_UPLOADING,
  M_UPDATE_USER_PICTURE,
  M_ON_BOARDING_DONE
} from './actions';

const initialState = {
  user: null,
  token: null,
  pictureIsUploading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_CREATE_USER:
      return update(state, {
        user: {
          $set: action.user
        }
      });
    case M_LOAD_USER:
      return update(state, {
        user: {
          $set: action.user
        },
        token: {
          $set: action.token
        }
      });
    case M_UPDATE_USER_NAMES:
      return update(state, {
        user: {
          firstname: {
            $set: action.firstname
          },
          lastname: {
            $set: action.lastname
          }
        }
      });
    case M_SIGN_OUT:
      return update(state, {
        token: {
          $set: action.token
        }
      });
    case M_PICTURE_IS_UPLOADING:
      return update(state, {
        pictureIsUploading: {
          $set: action.isUploading
        }
      });
    case M_UPDATE_USER_PICTURE:
      return update(state, {
        user: {
          pictureName: {
            $set: action.name
          },
          pictureUrl: {
            $set: action.url
          }
        },
        pictureIsUploading: {
          $set: false
        }
      });
    case 'M_UPDATE_STORAGE_SPACE_USED':
      return update(state, {
        user: {
          storageSpaceUsed: {
            $set: action.storage
          }
        }
      });
    case M_ON_BOARDING_DONE: 
      return update(state, {
        user: {
          onBoarding: {
            $set: action.onBoarding
          }
        }
      });
    case 'M_RESET_USER_STORE':
      return initialState;
    default:
      return state;
  }
}
