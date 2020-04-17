export const U_CREATE_USER = 'U_CREATE_USER';
export const M_CREATE_USER = 'M_CREATE_USER';

export const createUser = payload => ({
  type: U_CREATE_USER,
  payload
});
