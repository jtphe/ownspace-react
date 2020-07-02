import update from 'immutability-helper';

const initialState = {
  appName: 'ownspace-mobile',
  connectionState: 'connected',
  isInternetReachable: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'M_RESET_APP_STORE':
      return initialState;
    case 'M_UPDATE_INTERNET_STATE':
      return update(state, {
        isInternetReachable: {
          $set: action.value
        }
      });
    default:
      return state;
  }
}
