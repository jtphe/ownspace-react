import { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../../../../aws-exports';

API.configure(awsconfig);

const group = {
  Query: {
    getGroupUsers: async ({ id }) => {
      const query = `query getGroupUsers($id: ID!){
                listUsers (filter: {
                  group: {
                    contains:$id
                  }}), {
                    items {
                        id,
                        firstname,
                        lastname,
                        email,
                        pictureName,
                        pictureUrl,
                        notification,
                        role,
                        group
                    }
                  }
                }`;
      const res = await API.graphql(graphqlOperation(query, { id }));
      return res.data.listUsers;
    }
  }
};

export default group;
