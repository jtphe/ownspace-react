import { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../../../../aws-exports';

API.configure(awsconfig);

const document = {
  Mutation: {
    createFileTxt: async ({ name, content, owner }) => {
      const query = `mutation createFile($name: String! $content: String!, $owner: ID!) {
                createFile(input:{
                  name:$name
                  owner:$owner
                  content:$content
                  mimeType: "sprite-brut"
                  type: "text/plain"
                  isProtected: false
                }){
                  id,
                  createdAt,
                  updatedAt,
                  name,
                  content,
                  owner,
                  sharedList{id},
                  isProtected,
                  password,
                  parent,
                  size,
                  mimeType,
                  type
                }
              }`;
      const res = await API.graphql(
        graphqlOperation(query, { name, content, owner })
      );
      return res.data.createFile;
    }
  }
};

export default document;
