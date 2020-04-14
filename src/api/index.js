import document from '@backend/api/ownspaceapi/resolvers/document';

const api = {
  // DOCUMENT
  /**
   * Create a file in txt format
   * @param {Object} payload - Name and content of the file
   */
  createFileTxt(payload) {
    console.log('payload api index', payload);
    return Promise.resolve(
      document.Mutation.createFileTxt({
        name: payload.name,
        content: payload.content
      })
    );
  }

  // USER
  // GROUP
  // RIGHTS
};

export default api;
