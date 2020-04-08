import document from '@backend/api/ownspacemobile/resolvers/document';

const api = {
    // DOCUMENT
    /**
     * Create a file in txt format
     * @param {Object} payload - Name and content of the file
     */
    createFileTxt(payload) {
        return Promise.resolve(document.Mutation.createFileTxt({ name: payload.name, content: payload.content }));
    }


    // USER
    // GROUP
    // RIGHTS
}

export default api;