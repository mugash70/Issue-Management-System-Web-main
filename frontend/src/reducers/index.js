import { combineReducers } from 'redux';
import AuthReducer from './Auth';
import errorReducer from './Error';
import orgReducer from './organisation'

export default combineReducers({
    error: errorReducer,
    auth: AuthReducer,
    org: orgReducer
})