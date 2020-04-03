import update from 'immutability-helper';
import {
    M_SET_DOCUMENTS
} from './actions';

const initialState = {
    documentList: []
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case M_SET_DOCUMENTS:
            return update(state, {
                documentList: {
                    $push: [action.test]
                }
            })
        default:
            return state
    }
}