import { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../../../../aws-exports';

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
    }
  }
};

export default user;
