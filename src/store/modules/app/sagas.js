import { put, takeLatest } from 'redux-saga/effects';

import { U_RESET_ALL_STORE } from './actions';

function* resetAllStore() {
  try {
    yield put({ type: 'M_RESET_USER_STORE' });
    yield put({ type: 'M_RESET_DOCUMENT_STORE' });
    yield put({ type: 'M_RESET_APP_STORE' });
  } catch (e) {
    console.log('Error while reseting all store =>', e);
  }
}

export default function* watchApp() {
  yield takeLatest(U_RESET_ALL_STORE, resetAllStore);
}
