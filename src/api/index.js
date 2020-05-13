import document from '@backend/api/ownspaceapi/resolvers/document';
import user from '@backend/api/ownspaceapi/resolvers/user';
import { Auth, Storage } from 'aws-amplify';

/**
 * Api object that return all the promises
 */
const api = {
  // DOCUMENT
  /**
   * Create a file in txt format
   * @param {object} payload - File payload
   */
  createFileTxt(payload) {
    return Promise.resolve(
      document.Mutation.createFileTxt({
        name: payload.name,
        content: payload.content,
        owner: payload.owner,
        parent: payload.parent,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt
      })
    );
  },
  /**
   * Create a folder
   * @param {object} payload - Folder payload
   */
  createFolder(payload) {
    return Promise.resolve(
      document.Mutation.createFolder({
        name: payload.name,
        owner: payload.owner,
        parent: payload.parent,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt
      })
    );
  },
  /**
   * Load the folders
   * @param {object} payload - Folder parent of folders to load and the current user
   */
  loadFolders(payload) {
    return Promise.resolve(
      document.Query.getAllFolders({
        parent: payload.pathId,
        user: payload.owner
      })
    );
  },
  /**
   * Load the files
   * @param {object} payload - Folder parent of files to load and the current user
   */
  loadFiles(payload) {
    return Promise.resolve(
      document.Query.getAllFiles({
        parent: payload.pathId,
        user: payload.userId
      })
    );
  },
  /**
   * Download the file selected
   * @param {object} payload - Path of the file to download
   */
  async downloadFile(payload) {
    const res = await Storage.get(payload.path, { level: 'private' })
      .then(result => {
        return result;
      })
      .catch(err => console.log(err));
    return res;
  },
  /**
   * Add selected file to DB
   * @param {object} payload - File payload
   */
  addSelectedFile(payload) {
    return Promise.resolve(
      document.Mutation.createFile({
        name: payload.name,
        owner: payload.owner,
        parent: payload.parent,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
        size: payload.size,
        type: payload.type
      })
    );
  },
  /**
   * Add selected file to S3
   * @param {object} payload - File payload
   */
  async addSelectedFileToS3(payload) {
    try {
      const response = await fetch(payload.absolutePath);
      const blob = await response.blob();

      return Promise.resolve(
        Storage.put(payload.path, blob, {
          level: 'private',
          contentType: payload.type,
          progressCallback(progress) {
            if (progress.loaded === progress.total) {
              return 200;
            }
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  },
  // USER
  /**
   * Create the user object when the user log for the first time
   * @param {object} payload - Id, email, password and role of the user
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
   * @param {object} payload - Id of the user
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
   * @param {object} payload - Id, firstname and lastname of the user
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
   * @param {object} payload - Id and password of the user
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
   * Change the user password in cognito
   * @param {object} payload - Id, old password and new password of the user
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
  /**
   * Sign out the user from the application
   */
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
