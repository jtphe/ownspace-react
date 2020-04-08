import update from 'immutability-helper';
import {
    M_CREATE_FILE
} from './actions';

const initialState = {
    documentList: []
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case M_CREATE_FILE:
            console.log('action.file', action.file)
            return update(state, {
                documentList: {
                    $push: [action.file]
                }
            })
        default:
            return state
    }
}