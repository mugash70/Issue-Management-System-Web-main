import {
    AUTH_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADING,
    USER_LOADED,
    AUTH_LOADING,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    FORGOT_SUC,
    FORGOT_FAIL
} from '../actions/types'
var initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null
}
export default function Auth(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
        case AUTH_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case FORGOT_SUC:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true

            }


        /// return tod defaultstate clear every thing
        case AUTH_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
        case FORGOT_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                isLoading: false,
                user: null


            }
        default:
            {
                return state
            }


    }
}

