import update from 'immutability-helper';

const initialState = {
  appName: 'ownspace-mobile',
  connectionState: 'connected',
  isLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'M_SET_APP_LOADING':
      return update(state, {
        isLoading: {
          $set: action.loading
        }
      });
    default:
      return state;
  }
}
