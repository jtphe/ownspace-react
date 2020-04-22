export const U_CREATE_FILE = 'U_CREATE_FILE';
export const M_CREATE_FILE = 'M_CREATE_FILE';
// export const M_SET_UPLOAD_PROGRESS = 'M_SET_UPLOAD_PROGRESS';

export const createFile = payload => ({
  type: U_CREATE_FILE,
  payload
});
