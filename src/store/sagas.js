import { fork, all } from 'redux-saga/effects';
import watchDocument from './modules/document/sagas';
import watchUser from './modules/user/sagas';

export default function* rootSaga() {
  yield all([fork(watchDocument), fork(watchUser)]);
}
