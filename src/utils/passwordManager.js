import { Base64 } from 'js-base64';

/**
 * Hash the password in Base64
 * @param {string} plaintext - The plaintext password
 */
export const hashPassword = async plaintext => {
  const res = await Base64.encode(plaintext);
  return res;
};

/**
 * Decrypt the password in Base64
 * @param {string} plaintext - The plaintext password
 */
export const decryptPassword = async plaintext => {
  const res = await Base64.decode(plaintext);
  return res;
};
