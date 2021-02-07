import { findErrors } from './errorAction'
import axios from 'axios';

import {
    AUTH_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADING,
    LOGOUT_SUCCESS,
    USER_LOADED,
    BASE_API_URL,
    FORGOT_SUC,
    FORGOT_FAIL
} from './types'



export var loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })
    axios.get(`http://localhost:7000/employees`, tokenconfig(getState))
        .then(res => {
            dispatch({ type: USER_LOADED, payload: res.data, })
        })
        .catch(err => {
            dispatch(findErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_FAIL
            })

        })
}



//forgot password
export var reset = ({ email }) => dispatch => {
    console.log(email)
    var config = { headers: { "Content-type": "application/json" } }
    axios.put(`${BASE_API_URL}/reset`, { email }, config)
        .then(res => {
            dispatch({ type: FORGOT_SUC, payload: res.data })
        })
        .catch(err => {
            console.log(err)
            dispatch(findErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({ type: FORGOT_FAIL })
        })
}
/// employeee login
export const Userlogin = userData => async (dispatch) => {
            const config = { headers: { "Content-type": "application/json" } }
            await axios.post(`${BASE_API_URL}/login`, userData, config)
                .then(res => {
                    dispatch({ type: LOGIN_SUCCESS, payload: res.data })
                })
                .catch(err => {
                    console.log(err)
                    dispatch(findErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
                    dispatch({ type: LOGIN_FAIL })
                })
    }

export var logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }

}


//used in all requests (tokens)
export var tokenconfig = getState => {
    var token = getState().auth.token;

    var config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}