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
        user: payload.userId
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
          contentType: payload.type ? payload.type : 'application/octet-stream',
          progressCallback(progress) {
            if (progress.loaded === progress.total) {
              console.log('response =>', response.status);
              return response.status;
            }
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  },
  /**
   * Delete the file from S3
   * @param {object} payload - The file path
   */
  async deleteFileFromS3(payload) {
    try {
      Storage.remove(payload.path, { level: 'private' })
        .then(result => {
          console.log('File deleted =>', result);
          return result;
        })
        .catch(err => console.log(err));
    } catch (e) {
      console.log('Error while removing previous file S3 api =>', e);
    }
  },
  /**
   * Rename the file in DynamoDB
   * @param {object} payload - The file object
   */
  renameFileDB(payload) {
    return Promise.resolve(
      document.Mutation.renameFile({
        id: payload.id,
        name: payload.name,
        updatedAt: payload.updatedAt
      })
    );
  },
  /**
   * Delete the file from DynamoDB
   * @param {object} payload - The file id
   */
  deleteFileFromDB(payload) {
    return Promise.resolve(
      document.Mutation.deleteFile({
        id: payload.id
      })
    );
  },
  /**
   * Update the number of document in a folder
   * @param {object} payload - The folder object
   */
  updateFolderNbFiles(payload) {
    return Promise.resolve(
      document.Mutation.updateFolderNbFiles({
        id: payload.id,
        nbFiles: payload.nbFiles + 1,
        updatedAt: payload.updatedAt
      })
    );
  },
  /**
   * Add a password to the folder
   * @param {object} payload - The folder object
   */
  addPasswordFolder(payload) {
    return Promise.resolve(
      document.Mutation.updatePasswordFolder({
        id: payload.id,
        password: payload.password,
        updatedAt: payload.updatedAt
      })
    );
  },
  /**
   * Check if the password to open the folder is good
   * @param {object} payload - The folder object
   */
  checkFolderPassword(payload) {
    return Promise.resolve(
      document.Query.checkFolderPassword({
        id: payload.folder.id,
        password: payload.password
      })
    );
  },
  /**
   * Remove the password from the folder
   * @param {object} payload - The folder object
   */
  removeFolderPassword(payload) {
    return Promise.resolve(
      document.Mutation.removePasswordFolder({
        id: payload.id,
        updatedAt: payload.updatedAt
      })
    );
  },
  /**
   * Add a password to the file
   * @param {object} payload - The file object
   */
  addPasswordFile(payload) {
    return Promise.resolve(
      document.Mutation.updatePasswordFile({
        id: payload.id,
        password: payload.password,
        updatedAt: payload.updatedAt
      })
    );
  },
  /**
   * Check if the password to open the file is good
   * @param {object} payload - The file object
   */
  checkFilePassword(payload) {
    return Promise.resolve(
      document.Query.checkFilePassword({
        id: payload.file.id,
        password: payload.password
      })
    );
  },
  /**
   * Remove the password from the file
   * @param {object} payload - The file object
   */
  removePasswordFile(payload) {
    return Promise.resolve(
      document.Mutation.removePasswordFile({
        id: payload.id,
        updatedAt: payload.updatedAt
      })
    );
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
        role: payload.role,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt
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
        password: payload.newPassword,
        updatedAt: payload.updatedAt
      })
    );
  },

  /**
   * Change the user password in Cognito
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
   * Update the user picture
   * @param {object} payload - User picture
   */
  async updateUserPicture(payload) {
    try {
      const response = await fetch(payload.absolutePath);
      const blob = await response.blob();

      return Promise.resolve(
        Storage.put(payload.name, blob, {
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
      console.log('Error while updating user picture api  =>', err);
    }
  },
  /**
   * Get the user picture url
   * @param {object}  payload - Picture name
   */
  async getPictureUrl(payload) {
    try {
      return Promise.resolve(
        Storage.get(payload, {
          expires: 604800,
          level: 'private'
        })
          .then(result => {
            return result;
          })
          .catch(err => console.log(err))
      );
    } catch (err) {
      console.log('Error while getting picture url api =>', err);
    }
  },
  /**
   * Update the user picture in DynamoDB
   * @param {object} payload - User id, picture url and name
   */
  updateUserPictureDB(payload) {
    return Promise.resolve(
      user.Mutation.updateUserPicture({
        id: payload.owner,
        pictureUrl: payload.url,
        pictureName: payload.name
      })
    );
  },
  /**
   * Remove the previous picture before adding a new one
   * @param {object} payload - Picture name
   */
  async removeOldPicture(payload) {
    try {
      return Promise.resolve(
        Storage.remove(payload, {
          level: 'private'
        })
          .then(result => {
            return result;
          })
          .catch(err => console.log(err))
      );
    } catch (err) {
      console.log('Error while removing picture api =>', err);
    }
  },
  /**
   * Get the user object for an email
   * @param {object} payload - The user email
   */
  getUserWithEmail(payload) {
    return Promise.resolve(
      user.Query.getUserWithEmail({
        email: payload.email
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
