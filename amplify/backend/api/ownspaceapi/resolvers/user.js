/* eslint-disable no-param-reassign */
import { API, graphqlOperation, Auth } from 'aws-amplify';
import awsconfig from '../../../../../aws-exports';
import i18n from '@i18n/i18n';
import showToast from '../../../../../src/utils/showToast';

API.configure(awsconfig);

const user = {
  Mutation: {
    createUser: async ({ id, email, password, role }) => {
      const query = `mutation createUser($id: ID! $email: String! $password: String! $role: String!) {
            createUser(input:{
                  id:$id
                  email:$email
                  password:$password
                  role:$role
                }){
                    id,
                    firstname,
                    lastname,
                    email,
                    password,
                    picture,
                    notification,
                    role,
                    rootFolder,
                    group,
                    limitedStorage,
                    storageSpaceUsed,
                    totalStorageSpace
                }
              }`;
      const res = await API.graphql(
        graphqlOperation(query, { id, email, password, role })
      );
      return res.data.createUser;
    },
    updateUserNames: async ({ id, firstname, lastname }) => {
      if (firstname === '') {
        firstname = null;
      }
      if (lastname === '') {
        lastname = null;
      }
      const query = `mutation updateUser($id: ID! $firstname: String $lastname: String) {
        updateUser(input:{
              id:$id
              firstname:$firstname
              lastname:$lastname
            }){
                id,
                firstname,
                lastname
            }
          }`;
      const res = await API.graphql(
        graphqlOperation(query, { id, firstname, lastname })
      );
      return res.data.updateUser;
    },
    updateUserPwdDB: async ({ id, password }) => {
      const query = `mutation updateUser($id: ID! $password: String!) {
        updateUser(input:{
              id:$id
              password:$password
            }){
                id
            }
          }`;
      const res = await API.graphql(graphqlOperation(query, { id, password }));
      return res.data.updateUser;
    }
  },
  Query: {
    getUser: async ({ id }) => {
      const query = `query getUser($id: ID!){
        getUser(id:$id){
          id
          firstname
          lastname
          email
          picture
          notification
          role
          rootFolder
          group
          limitedStorage
          storageSpaceUsed
          totalStorageSpace
        }
      }`;
      const res = await API.graphql(graphqlOperation(query, { id }));
      return res.data.getUser;
    },
    changeUserPassword: async ({ id, oldPassword, newPassword }) => {
      const query = `query getUserPassword($id: ID!){
        getUser(id:$id){
          password
        }
      }`;
      const res = await API.graphql(graphqlOperation(query, { id }));
      if (res.data.getUser.password === oldPassword) {
        Auth.currentAuthenticatedUser()
          .then(usr => {
            return Auth.changePassword(usr, oldPassword, newPassword);
          })
          .then(data => {
            if (data === 'SUCCESS') {
              showToast(i18n.t('userProfile.profileUpdated'), true);
            }
          })
          .catch(err => console.log(err));
      } else {
        showToast(i18n.t('userProfile.wrongOldPassword'), true);
      }

      return res.data.getUser;
    }
  }
};

export default user;
