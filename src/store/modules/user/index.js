import update from 'immutability-helper';
import { M_CREATE_USER } from './actions';

const initialState = {
  user: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case M_CREATE_USER:
      return update(state, {
        user: {
          $set: action.user
        }
      });
    default:
      return state;
  }
}
