import { fork, all } from 'redux-saga/effects';
import watchDocuments from './modules/documents/sagas';
import watchUser from './modules/user/sagas';
import watchApp from './modules/app/sagas';

export default function* rootSaga() {
  yield all([fork(watchDocuments), fork(watchUser), fork(watchApp)]);
}
