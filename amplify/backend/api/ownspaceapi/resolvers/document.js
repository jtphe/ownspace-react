import { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../../../../aws-exports';

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
                    picture,
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
            picture,
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
            picture,
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
            picture,
            role,
            group
          },
          isProtected,
          password,
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
            picture,
            role,
            group
          }
         }
        }
      }`;
      const res = await API.graphql(graphqlOperation(query, { parent, user }));
      return res.data.listFiles;
    }
  }
};

export default document;
