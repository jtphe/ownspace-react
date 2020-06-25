const initialState = {
  appName: 'ownspace-mobile',
  connectionState: 'connected'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'M_RESET_APP_STORE':
      return initialState;
    default:
      return state;
  }
}
