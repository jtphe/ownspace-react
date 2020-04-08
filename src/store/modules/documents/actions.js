export const U_CREATE_FILE = 'U_CREATE_FILE';
export const M_CREATE_FILE = 'M_CREATE_FILE';

export const createFile = payload => ({
    type: U_CREATE_FILE,
    payload
});