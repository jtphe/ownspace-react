import { API, graphqlOperation } from 'aws-amplify';

const document = {
  Mutation: {
    createFileTxt: async ({ name, content }) => {
      const query = `mutation createFile($name:String! $content: String!) {
                createFile(input:{
                  name:$name
                  owner: "7f863e6e-c834-4dca-aec4-89c9d71c0976"
                  content:$content
                }){
                  id,
                  createdAt,
                  updatedAt,
                  name,
                  content,
                  owner,
                  password,
                  parent,
                  size,
                  mimeType,
                  uuid,
                  type
                }
              }`;
      const res = await API.graphql(graphqlOperation(query, { name, content }));
      return res.data.createFile;
    }
  }
};

export default document;
