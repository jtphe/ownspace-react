import { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../../../../aws-exports';
import * as PasswordManager from '../../../../../src/utils/passwordManager';
import i18n from '@i18n/i18n';
import showToast from '../../../../../src/utils/showToast';

API.configure(awsconfig);

const document = {
  Mutation: {
    createFileTxt: async ({
      name,
      content,
      owner,
      parent,
      createdAt,
      updatedAt
    }) => {
      const query = `mutation createFile($name: String! $content: String!, $owner: ID!, $parent: ID!, $createdAt: String!, $updatedAt: String!) {
                createFile(input:{
                  name:$name
                  owner:$owner
                  content:$content
                  parent:$parent
                  mimeType: "sprite-brut"
                  type: "text/plain"
                  isProtected: false,
                  createdAt:$createdAt
                  updatedAt:$updatedAt
                }){
                  id,
                  createdAt,
                  updatedAt,
                  name,
                  content,
                  owner,
                  sharedList {
                    id,
                    firstname,
                    lastname,
                    email,
                    pictureName,
                    pictureUrl,
                    role,
                    group
                  },
                  isProtected,
                  password,
                  parent,
                  size,
                  mimeType,
                  type
                }
              }`;
      const res = await API.graphql(
        graphqlOperation(query, {
          name,
          content,
          owner,
          parent,
          createdAt,
          updatedAt
        })
      );
      return res.data.createFile;
    },
    createFolder: async ({ name, owner, parent, createdAt, updatedAt }) => {
      const query = `mutation createFolder($name: String! $owner: ID!, $parent: ID!, $createdAt: String!, $updatedAt: String!) {
        createFolder(input:{
          name:$name
          owner:$owner
          parent:$parent
          isProtected: false
          nbFiles: 0,
          createdAt:$createdAt
          updatedAt:$updatedAt
        }){
          id,
          createdAt,
          updatedAt,
          name,
          owner,
          sharedList {
            id,
            firstname,
            lastname,
            email,
            pictureName,
            pictureUrl,
            role,
            group
          },
          isProtected,
          password,
          parent,
          nbFiles
        }
      }`;
      const res = await API.graphql(
        graphqlOperation(query, { name, owner, parent, createdAt, updatedAt })
      );
      return res.data.createFolder;
    },
    createFile: async ({
      name,
      owner,
      parent,
      createdAt,
      updatedAt,
      size,
      type
    }) => {
      const query = `mutation createFile($name: String!, $owner: ID!, $parent: ID!, $createdAt: String!, $updatedAt: String!, $size: Float!, $type: String!) {
        createFile(input:{
          name:$name
          owner:$owner
          parent:$parent
          mimeType: "sprite-brut"
          type: $type
          isProtected: false,
          createdAt:$createdAt
          updatedAt:$updatedAt,
          size:$size,
        }){
          id,
          createdAt,
          updatedAt,
          name,
          owner,
          sharedList {
            id,
            firstname,
            lastname,
            email,
            pictureName,
            pictureUrl,
            role,
            group
          },
          isProtected,
          password,
          parent,
          size,
          mimeType,
          type
        }
      }`;
      const res = await API.graphql(
        graphqlOperation(query, {
          name,
          owner,
          parent,
          createdAt,
          updatedAt,
          size,
          type
        })
      );
      return res.data.createFile;
    },
    renameFile: async ({ id, name, updatedAt }) => {
      const query = `mutation updateFile($id: ID! $name: String! $updatedAt: String!) {
        updateFile(input:{
        id:$id,
        name:$name,
        updatedAt:$updatedAt
      }){
        id,
        name,
        updatedAt
      }}`;
      const res = await API.graphql(
        graphqlOperation(query, { id, name, updatedAt })
      );
      return res.data.updateFile;
    },
    deleteFile: async ({ id }) => {
      const query = `mutation deleteFile($id: ID!){
        deleteFile(input:{
          id:$id
        }){
          id
        }
      }`;
      const res = await API.graphql(graphqlOperation(query, { id }));
      return res.data.deleteFile;
    },
    updateFolderNbFiles: async ({ id, nbFiles, updatedAt }) => {
      const query = `mutation updateFolder($id: ID!, $nbFiles: Int! $updatedAt: String!){
        updateFolder(input:{
          id:$id,
          nbFiles:$nbFiles
          updatedAt:$updatedAt
        }){
          id,
          nbFiles,
          updatedAt
        }
      }`;
      const res = await API.graphql(
        graphqlOperation(query, { id, nbFiles, updatedAt })
      );
      return res.data.updateFolder;
    },
    updatePasswordFolder: async ({ id, password, updatedAt }) => {
      const cryptedPassword = await PasswordManager.hashPassword(password);
      const query = `mutation updateFolder($id: ID! $password: String! $updatedAt: String!) {
        updateFolder(input:{
              id:$id
              password:$password
              updatedAt:$updatedAt
              isProtected: true
            }){
                id,
                isProtected,
                updatedAt
            }
          }`;
      const res = await API.graphql(
        graphqlOperation(query, { id, password: cryptedPassword, updatedAt })
      );
      return res.data.updateFolder;
    },
    removePasswordFolder: async ({ id, updatedAt }) => {
      const query = `mutation updateFolder($id: ID! $updatedAt: String!) {
        updateFolder(input:{
              id:$id
              password: null
              updatedAt:$updatedAt
              isProtected: false
            }){
                id,
                isProtected,
                updatedAt
            }
          }`;
      const res = await API.graphql(graphqlOperation(query, { id, updatedAt }));
      return res.data.updateFolder;
    },
    updatePasswordFile: async ({ id, password, updatedAt }) => {
      const cryptedPassword = await PasswordManager.hashPassword(password);
      const query = `mutation updateFile($id: ID! $password: String! $updatedAt: String!) {
        updateFile(input:{
              id:$id
              password:$password
              updatedAt:$updatedAt
              isProtected: true
            }){
                id,
                isProtected,
                updatedAt
            }
          }`;
      const res = await API.graphql(
        graphqlOperation(query, { id, password: cryptedPassword, updatedAt })
      );
      return res.data.updateFile;
    },
    removePasswordFile: async ({ id, updatedAt }) => {
      const query = `mutation updateFile($id: ID! $updatedAt: String!) {
        updateFile(input:{
              id:$id
              password: null
              updatedAt:$updatedAt
              isProtected: false
            }){
                id,
                isProtected,
                updatedAt
            }
          }`;
      const res = await API.graphql(graphqlOperation(query, { id, updatedAt }));
      return res.data.updateFile;
    }
  },
  Query: {
    getAllFolders: async ({ parent, user }) => {
      const query = `query getAllFolders($parent: ID!, $user: ID!){
        listFolders(filter: {
          owner: {
            contains:$user
          },
          parent:{
            contains:$parent
          }
        }, limit: 100){
         items {
          id,
          createdAt,
          updatedAt,
          name,
          owner,
          sharedList {
            id,
            firstname,
            lastname,
            email,
            pictureName,
            pictureUrl,
            role,
            group
          },
          isProtected,
          parent,
          nbFiles
         }
        }
      }`;
      const res = await API.graphql(graphqlOperation(query, { user, parent }));
      return res.data.listFolders;
    },
    getAllFiles: async ({ parent, user }) => {
      const query = `query getAllFiles($parent: ID!, $user: ID!){
        listFiles(filter: {
          owner: {
            contains:$user
          },
          parent:{
            contains:$parent
          }
        }, limit: 100){
         items {
          id,
          createdAt,
          updatedAt,
          type,
          mimeType,
          name,
          owner,
          parent,
          isProtected,
          size,
          sharedList {
            id,
            firstname,
            lastname,
            email,
            pictureName,
            pictureUrl,
            role,
            group
          }
         }
        }
      }`;
      const res = await API.graphql(graphqlOperation(query, { parent, user }));
      return res.data.listFiles;
    },
    checkFolderPassword: async ({ id, password }) => {
      const query = `query getFolderPassword($id: ID!){
        getFolder(id:$id){
          password
        }
      }`;
      const res = await API.graphql(graphqlOperation(query, { id }));
      const decryptedPassword = await PasswordManager.decryptPassword(
        res.data.getFolder.password
      );

      if (decryptedPassword === password) {
        return 200;
      } else {
        showToast(i18n.t('folder.error1'), true);
      }
    },
    checkFilePassword: async ({ id, password }) => {
      const query = `query getFilePassword($id: ID!){
        getFile(id:$id){
          password
        }
      }`;
      const res = await API.graphql(graphqlOperation(query, { id }));
      const decryptedPassword = await PasswordManager.decryptPassword(
        res.data.getFile.password
      );

      if (decryptedPassword === password) {
        return 200;
      } else {
        showToast(i18n.t('folder.error1'), true);
      }
    }
  }
};

export default document;
