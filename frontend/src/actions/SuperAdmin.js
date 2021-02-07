import { findErrors } from './errorAction'
import axios from 'axios';

import {
    AUTH_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    BASE_API_URL,
    EMPLOYEES_LOADED,
    LOAD_FAILED,
    UPDATED,
    UPDATE_FAILED
} from './types'

//super Admin login
export var Slogin = ({ email, password }) => {
    return async (dispatch) => {
        try {
            var config = { headers: { "Content-type": "application/json" } }
            await axios.post(`${BASE_API_URL}/sadmin_login`, { email, password }, config)
                .then(res => { dispatch({ type: LOGIN_SUCCESS, payload: res.data }) })
                .catch(err => { dispatch(findErrors(err.response.data, err.response.status, 'LOGIN_FAIL')); dispatch({ type: LOGIN_FAIL }) })
        } catch (error) { throw (error) }
    }
}

// create Org 
export var registerOrg = ({ org_name, admin_name, email, admin_password, admin_phone_no, role }) => dispatch => {
    var config = { headers: { "Content-type": "application/json" } }
    var body = JSON.stringify({ org_name, admin_name, email, admin_password, admin_phone_no, role })
    axios.post(`${BASE_API_URL}/createuser`, body, config)
        .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
        .catch(err => { dispatch(findErrors(err.response.data, err.response.status, 'REGISTER_FAIL')); dispatch({ type: REGISTER_FAIL }) })
}
// update Admin details
export var updateOrg = ({ profile_photo, email, home, tel, info }) => dispatch => {
    var config = { headers: { "Content-type": "application/json" } }
    var body = JSON.stringify({ profile_photo, email, home, tel, info })
    axios.post(`${BASE_API_URL}/createuser`, body, config)
        .then(res => dispatch({ type: UPDATED, payload: res.data }))
        .catch(err => { dispatch(findErrors(err.response.data, err.response.status, 'UPDATE_FAILED')); dispatch({ type: UPDATE_FAILED }) })
}
///update password
export var updatePassword = ({ password, updated_pw, updated_pw_con }) => dispatch => {
    var config = { headers: { "Content-type": "application/json" } }
    var temporary_pw = password
    var body = JSON.stringify({ temporary_pw, updated_pw, updated_pw_con })
    axios.post(`${BASE_API_URL}/createuser`, body, config)
        .then(res => dispatch({ type: UPDATED, payload: res.data }))
        .catch(err => { dispatch(findErrors(err.response.data, err.response.status, 'UPDATE_FAILED')); dispatch({ type: UPDATE_FAILED }) })
}
//fecth org details
export var OrgTable = () => {
    return async (dispatch) => {
        try {
            var config = { headers: { "Content-type": "application/json" } }
            await axios.get(`${BASE_API_URL}/superadmins`, config)
                .then(res => { dispatch({ type: EMPLOYEES_LOADED, payload: res.data }) })
                .catch(err => { dispatch(findErrors(err.response.data, err.response.status, 'LOAD_FAILED')); dispatch({ type: LOAD_FAILED }) })
        } catch (error) { throw (error) }
    }
}
//used in all requests (tokens)
export var tokenconfig = getState => {
    var token = getState().auth.token;
    var config = { headers: { "Content-type": "application/json" } }
    if (token) { config.headers['x-auth-token'] = token; }
    return config;
}