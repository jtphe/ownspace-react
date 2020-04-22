import { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../../../../aws-exports';

API.configure(awsconfig);

const document = {
  Mutation: {
    createFileTxt: async ({ name, content }) => {
      const query = `mutation createFile($name: String! $content: String!) {
                createFile(input:{
                  name:$name
                  owner: "7f863e6e-c834-4dca-aec4-89c9d71c0976"
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
      const res = await API.graphql(graphqlOperation(query, { name, content }));
      return res.data.createFile;
    }
  }
};

export default document;
