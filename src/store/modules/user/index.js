import update from 'immutability-helper';
import {
  M_CREATE_USER,
  M_LOAD_USER,
  M_UPDATE_USER_NAMES,
  M_SIGN_OUT
} from './actions';

const initialState = {
  user: null,
  token: null
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
    case 'M_RESET_USER_STORE':
      return initialState;
    default:
      return state;
  }
}
