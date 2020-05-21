export const U_CREATE_USER = 'U_CREATE_USER';
export const M_CREATE_USER = 'M_CREATE_USER';
export const U_LOAD_USER = 'U_LOAD_USER';
export const M_LOAD_USER = 'M_LOAD_USER';
export const U_UPDATE_USER_NAMES = 'U_UPDATE_USER_NAMES';
export const M_UPDATE_USER_NAMES = 'M_UPDATE_USER_NAMES';
export const U_UPDATE_USER_PASSWORD = 'U_UPDATE_USER_PASSWORD';
export const U_SIGN_OUT = 'U_SIGN_OUT';
export const M_SIGN_OUT = 'M_SIGN_OUT';
export const U_UPDATE_USER_PICTURE = 'U_UPDATE_USER_PICTURE';
export const M_UPDATE_USER_PICTURE = 'M_UPDATE_USER_PICTURE';
export const M_PICTURE_IS_UPLOADING = 'M_PICTURE_IS_UPLOADING';

export const createUser = payload => ({
  type: U_CREATE_USER,
  payload
});

export const loadUser = payload => ({
  type: U_LOAD_USER,
  payload
});

export const updateUserNames = payload => ({
  type: U_UPDATE_USER_NAMES,
  payload
});

export const updateUserPassword = payload => ({
  type: U_UPDATE_USER_PASSWORD,
  payload
});

export const signOut = () => ({
  type: U_SIGN_OUT
});

export const updateUserPicture = payload => ({
  type: U_UPDATE_USER_PICTURE,
  payload
});
