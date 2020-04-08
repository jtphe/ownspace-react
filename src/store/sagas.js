import { fork, all } from 'redux-saga/effects';
import watchDocuments from './modules/documents/sagas';

export default function* rootSaga() {
    yield all([
        fork(watchDocuments)

    ]);
}