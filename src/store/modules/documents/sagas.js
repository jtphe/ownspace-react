import {
    takeEvery,
    takeLatest,
    takeLeading,
    select,
    put,
    call,
    take,
    fork,
    cancel
} from 'redux-saga/effects';

import {
    U_SET_DOCUMENTS,
    M_SET_DOCUMENTS
} from './actions';

function* test({ test }) {
    yield put({ type: M_SET_DOCUMENTS, test })
}

export default function* watchDocuments() {
    yield takeLatest(U_SET_DOCUMENTS, test);
}