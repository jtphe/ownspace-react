import document from '@backend/api/ownspaceapi/resolvers/document';
import user from '@backend/api/ownspaceapi/resolvers/user';
import group from '@backend/api/ownspaceapi/resolvers/group';
import right from '@backend/api/ownspaceapi/resolvers/right';
import { Auth, Storage } from 'aws-amplify';

/**
 * Api object that return all the promises
 */
const api = {
  // DOCUMENT API
  /**
   * Create a file in txt format
   * @param {Object} payload - File payload
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
   * @param {Object} payload - Folder payload
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
   * @param {Object} payload - Folder parent of folders to load and the current user
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
   * Get the folder object
   * @param {Object} id - The id
   */
  getFolder(id) {
    return Promise.resolve(
      document.Query.getFolder({
        id
      })
    );
  },
  /**
   * Load the files
   * @param {Object} payload - Folder parent of files to load and the current user
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
   * Get the file object
   * @param {Object} payload - Id of the file
   */
  getFile(payload) {
    return Promise.resolve(
      document.Query.getFile({
        id: payload.id
      })
    );
  },
  /**
   * Get the files's id
   * @param {Object} payload - The path parent of the files and the userq
   */
  getFilesId(payload) {
    return Promise.resolve(
      document.Query.getFilesId({
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
    if (payload.shared) {
      const res = await Storage.get(payload.path, {
        level: 'protected',
        identityId: payload.identityId
      })
        .then(result => {
          return result;
        })
        .catch(err => console.log(err));
      return res;
    } else {
      const res = await Storage.get(payload.path, { level: 'protected' })
        .then(result => {
          return result;
        })
        .catch(err => console.log(err));
      return res;
    }
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
          level: 'protected',
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
      Storage.remove(payload.path, { level: 'protected' })
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
    console.log('payload', payload);
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

  // USER API
  /**
   * Create the user object when the user log for the first time
   * @param {object} payload - Id, email, password and role of the user
   */
  createUser(payload) {
    return Promise.resolve(
      user.Mutation.createUser({
        id: payload.id,
        identityId: payload.identityId,
        email: payload.email,
        password: payload.password,
        role: payload.role,
        group: payload.group,
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
          level: 'protected',
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
      if (payload.shared) {
        // Get the group's users picture
        return Promise.resolve(
          Storage.get(payload.pictureName, {
            expires: 604800,
            identityId: payload.identityId,
            level: 'protected'
          })
            .then(result => {
              return result;
            })
            .catch(err => console.log(err))
        );
      } else {
        // Get the user picture
        return Promise.resolve(
          Storage.get(payload, {
            expires: 604800,
            level: 'protected'
          })
            .then(result => {
              return result;
            })
            .catch(err => console.log(err))
        );
      }
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
          level: 'protected'
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
  },
  /**
   * Get the identity id of the user
   * @param {object} payload - The id of the document's owner
   */
  getIdentityId(payload) {
    return Promise.resolve(
      user.Query.getIdentityId({
        id: payload.owner
      })
    );
  },
  updateStorageSpaceUsed(payload) {
    return Promise.resolve(
      user.Mutation.updateStorageSpaceUsed({
        size: payload.storage,
        id: payload.owner
      })
    );
  },

  // GROUP API
  /**
   * Get the user
   * @param {object} payload - Id of the user
   */
  loadGroupUsers(payload) {
    return Promise.resolve(
      group.Query.getGroupUsers({
        id: payload.group
      })
    );
  },

  // RIGHTS API
  /**
   * Get the user's rights on a document
   * @param {object} payload - The user and document ID
   */
  getUserRightsOnDocument(payload) {
    return Promise.resolve(
      right.Query.getUserRightsOnDocument({
        user: payload.user,
        document: payload.document
      })
    );
  },
  /**
   * Load the shared folders
   * @param {object} payload - The user id
   */
  loadSharedFolders(payload) {
    return Promise.resolve(
      right.Query.getSharedFolders({
        user: payload.userId
      })
    );
  },
  /**
   * Load the shared files
   * @param {object} payload - The user id
   */
  loadSharedFiles(payload) {
    return Promise.resolve(
      right.Query.getSharedFiles({
        user: payload.userId
      })
    );
  },
  /**
   * Share document to users
   * @param {object} payload - All data on user, document and rights
   */
  addUsersToDocument(payload) {
    if (payload.type === 'file') {
      return Promise.resolve(
        right.Mutation.addUserToFile({
          document: payload.document,
          read: payload.read,
          edit: payload.edit,
          user: payload.user,
          firstname: payload.firstname,
          lastname: payload.lastname,
          email: payload.email,
          type: payload.type,
          createdAt: payload.createdAt,
          updatedAt: payload.updatedAt,
          path: payload.path,
          pictureName: payload.pictureName
        })
      );
    }
    // else {
    //   return Promise.resolve(
    //     right.Mutation.addUsersToFolder({
    //       document: payload.document,
    //       read: payload.read,
    //       edit: payload.edit,
    //       user: payload.user,
    //       firstname: payload.firstname,
    //       lastname: payload.lastname,
    //       email: payload.email,
    //       type: payload.type,
    //       createdAt: payload.createdAt,
    //       updatedAt: payload.updatedAt
    //     })
    //   );
    // }
  },
  /**
   * Loads the users with whom the document is shared
   * @param {object} payload - The user id
   */
  loadSharedUser(payload) {
    return Promise.resolve(
      right.Query.loadSharedUser({
        id: payload.id
      })
    );
  },
  /**
   * Get the user's rights on a document
   * @param {object} payload - The document and user ID
   */
  getRight(payload) {
    return Promise.resolve(
      right.Query.getRight({
        document: payload.document,
        user: payload.user
      })
    );
  },
  /**
   * Remove a user from the document
   * @param {Object} payload - The id of the Right associated to the user to remove from the document
   */
  removeUserFromDocument(payload) {
    return Promise.resolve(
      right.Mutation.deleteRight({
        id: payload.rightId
      })
    );
  }
};

export default api;
