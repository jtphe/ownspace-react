/* eslint-disable radix */
import moment from 'moment';

/**
 * Give the time since the document was modified
 * @param {object} document - The document object
 */
const formatDate = document => {
  return moment(parseInt(document.updatedAt)).fromNow();
};

export default formatDate;
