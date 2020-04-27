import document from '@backend/api/ownspaceapi/resolvers/document';
import user from '@backend/api/ownspaceapi/resolvers/user';
import { Auth } from 'aws-amplify';

const api = {
  // DOCUMENT
  /**
   * Create a file in txt format
   * @param {Object} payload - Name and content of the file
   */
  createFileTxt(payload) {
    return Promise.resolve(
      document.Mutation.createFileTxt({
        name: payload.name,
        content: payload.content
      })
    );
  },

  // USER
  /**
   * Create the user object when the user log for the first time
   * @param {Object} payload - User informations
   */
  createUser(payload) {
    return Promise.resolve(
      user.Mutation.createUser({
        id: payload.id,
        email: payload.email,
        password: payload.password,
        role: payload.role
      })
    );
  },
  /**
   * Get the user
   * @param {*} payload - User
   */
  loadUser(payload) {
    return Promise.resolve(
      user.Query.getUser({
        id: payload.userId
      })
    );
  },
  /**
   * Update the user firstname and lastname
   * @param {Object} payload - Id, firstname and lastname of the user
   */
  updateUserNames(payload) {
    return Promise.resolve(
      user.Mutation.updateUserNames({
        id: payload.id,
        firstname: payload.firstname,
        lastname: payload.lastname
      })
    );
  },
  /**
   * Update the user password
   * @param {Object} payload - Id and password of the user
   */
  updateUserPwdDB(payload) {
    return Promise.resolve(
      user.Mutation.updateUserPwdDB({
        id: payload.id,
        password: payload.newPassword
      })
    );
  },
  /**
   * C
   * @param {Object} payload
   */
  changeUserPassword(payload) {
    return Promise.resolve(
      user.Query.changeUserPassword({
        id: payload.id,
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword
      })
    );
  },
  async signOutUser() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  // GROUP
  // RIGHTS
};

export default api;
