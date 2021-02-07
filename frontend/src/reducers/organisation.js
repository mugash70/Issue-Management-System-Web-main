import {
    EMPLOYEES_LOADED, LOAD_FAILED,
    UPDATED, UPDATE_FAILED
} from '../actions/types'
var initialState = {
    users: [],
    user: null
}
export default function Auth(state = initialState, action) {
    switch (action.type) {
        case EMPLOYEES_LOADED:
        case UPDATED:
            return {
                ...state,
                users: action.payload
            }

        case LOAD_FAILED:
        case UPDATE_FAILED:
            return {
                ...state,
                user: null,
                users: []
            }
        default:
            {
                return state
            }


    }
}

