import { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../../../../aws-exports';

API.configure(awsconfig);

const right = {
  Mutation: {
    addUserToFile: async ({
      // eslint-disable-next-line no-shadow
      document,
      read,
      edit,
      user,
      firstname,
      lastname,
      email,
      type,
      createdAt,
      updatedAt
    }) => {
      const query = `mutation addUserToFile($document: ID! $read: Boolean! $edit: Boolean! $user: ID! $firstname: String $lastname: String $email: String $type: String! $createdAt: String $updatedAt: String) {
          createRight(input:{
                document:$document
                read:$read
                edit:$edit
                user:$user
                firstname:$firstname
                lastname:$lastname
                email:$email
                type:$type
                createdAt:$createdAt
                updatedAt:$updatedAt
              }){
                document,
                user
              }
            }`;
      const res = await API.graphql(
        graphqlOperation(query, {
          document,
          read,
          edit,
          user,
          firstname,
          lastname,
          email,
          type,
          createdAt,
          updatedAt
        })
      );
      return res.data.createRight;
    },
    addUsersToFolder: async ({
      // eslint-disable-next-line no-shadow
      document,
      read,
      edit,
      user,
      firstname,
      lastname,
      email,
      type,
      createdAt,
      updatedAt
    }) => {
      const query = `mutation addUsersToFolder($document: ID! $read: Boolean! $edit: Boolean! $user: ID! $firstname: String $lastname: String $email: String $type: String! $createdAt: String $updatedAt: String) {
          createRight(input:{
                document:$document
                read:$read
                edit:$edit
                user:$user
                firstname:$firstname
                lastname:$lastname
                email:$email
                type:$type
                createdAt:$createdAt
                updatedAt:$updatedAt
              }){
                document,
                user
              }
            }`;
      const res = await API.graphql(
        graphqlOperation(query, {
          document,
          read,
          edit,
          user,
          firstname,
          lastname,
          email,
          type,
          createdAt,
          updatedAt
        })
      );
      return res.data.createRight;
    },
    deleteRight: async ({ id }) => {
      const query = `mutation removeUserFromDocument($id: ID!){
        deleteRight(input:{
          id:$id  
        }){
          id
        }
      }`;
      const res = await API.graphql(graphqlOperation(query, { id }));
      return res.data.deleteRight;
    }
  },
  Query: {
    getSharedFolders: async ({ user }) => {
      const query = `query getSharedFolders($user: ID!){
          listRights(filter: {
            user: {
              contains:$user,
            },
            type: {
              contains: "folder"
            }
          }, limit: 100){
            items{
                createdAt,
                updatedAt,
                document,
                type,
                read,
                edit,
                user,
                firstname,
                lastname,
                email
            }
          }
        }`;
      const res = await API.graphql(graphqlOperation(query, { user }));
      return res.data.listRights;
    },
    getSharedFiles: async ({ user }) => {
      const query = `query getSharedFiles($user: ID!){
        listRights(filter: {
          user: {
            contains:$user
          },
          type: {
            contains: "file"
          }
        }, limit: 100){
          items{
            createdAt,
            updatedAt,
            document,
            type,
            read,
            edit,
            user,
            firstname,
            lastname,
            email
          }
        }
      }`;
      const res = await API.graphql(graphqlOperation(query, { user }));
      return res.data.listRights;
    },
    loadSharedUser: async ({ id }) => {
      const query = `query loadSharedUser($id: ID!){
        listRights(filter: {
          document: {
            contains:$id
          }
        }, limit: 100){
          items{
            document,
            read,
            edit,
            user,
            firstname,
            lastname,
            email
          }
        }
      }`;
      const res = await API.graphql(graphqlOperation(query, { id }));
      return res.data.listRights;
    },
    getUserRightsOnDocument: async ({ user, document }) => {
      const query = `query getUserRightsOnDocument($user: ID! $document: ID!){
            listRights(filter: {
              document: {
                contains:$document
              },
              user: {
                contains:$user
              }
            }){
              items{
                read,
                edit
              }
            }
          }`;
      const res = await API.graphql(
        graphqlOperation(query, { user, document })
      );
      return res.data.listRights;
    },
    getRight: async ({ document, user }) => {
      const query = `query getRight($document: ID! $user: ID!){
        listRights(filter: {
          document: {
            contains:$document
          },
          user: {
            contains:$user
          }
        }){
          items{
            id
          }
        }
      }`;
      const res = await API.graphql(
        graphqlOperation(query, { document, user })
      );
      return res.data.listRights;
    }
  }
};

export default right;
