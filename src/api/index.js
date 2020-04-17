import document from '@backend/api/ownspaceapi/resolvers/document';
import user from '@backend/api/ownspaceapi/resolvers/user';

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
  createUser(payload) {
    return Promise.resolve(
      user.Mutation.createUser({
        id: payload.id,
        email: payload.email,
        password: payload.password,
        role: payload.role
      })
    );
  }
  // GROUP
  // RIGHTS
};

export default api;
