//---  Import axios for ajax calls ---//
//------------------------------------//
import axios from 'axios';
import { browserHistory } from 'react-router';

//--- Import Constants ---//
//------------------------//
import {userConstants} from '../constants/userConstants';
import {errorConstants} from '../constants/errorConstants';

let nonValidResponse = (response) => {
    let status = null
    if(response.status >= 200 && response.status < 300){
        return status = false;
    }
    return status = true
};

export function registerUser(user){
	return (dispatch) => {
        dispatch(userIsRegistering(true));
        return axios.post("/register_user",user)
            .then((response) => {  
                if (nonValidResponse(response)) {
                	userRegisteringError(true);
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response)=>{
                dispatch(userIsRegistering(false));
                dispatch(userHasRegistered(response.data.payload));
                localStorage.setItem('finapp_user',response.data.token);
                axios.defaults.headers.common['Authorization'] = "Bearer "+response.data.token;
                browserHistory.push('/');
            })
            .catch((err) => {console.log(err);dispatch(userRegisteringError(err.response.data.error))});
    };
}

export function updateUserInfo(user){
    console.log(2);
    return (dispatch) => {
        dispatch(userIsUpdating(true));
        return axios.post('/update_user_info',user)
            .then((response)=>{
                if (nonValidResponse(response)) {
                    userUpdatingError(true);
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response)=>{
                dispatch(userIsUpdating(false));
                dispatch(userUpdated(response.data.payload));
                localStorage.setItem('finapp_user',response.data.token);
                axios.defaults.headers.common['Authorization'] = "Bearer "+response.data.token;
            })
            .catch((err) => {console.log('test');dispatch(userUpdatingError(err.response.data.error))});
    }
}

export function loginUser(user){
    return (dispatch) => {
        dispatch(userIsLoggingIn(true));
        return axios.post('/login_user',user)
            .then((response)=>{
                if (nonValidResponse(response)) {
                    userLogginError(true);
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response)=>{
                dispatch(userIsLoggingIn(false));
                dispatch(userHasLoggedIn(response.data.payload));
                localStorage.setItem('finapp_user',response.data.token);
                axios.defaults.headers.common['Authorization'] = "Bearer "+response.data.token;
                browserHistory.push('/');
            })
            .catch((err) => dispatch(userLogginError(err.response.data.error)));
    }
}

export function logOutUser(user){
    return (dispatch) => {
        try {
            axios.defaults.headers.common['Authorization'] = '';
            localStorage.removeItem('finapp_user','');
            dispatch(userHasLoggedOut());
            browserHistory.push('/');
        }
        catch (err){
            console.log(err);
        }
    }
}



export function userHasLoggedOut(){
    return {
        type: userConstants.LOGOUT,
        authenticated: false,
        isRequesting: false

    }
}

export function userIsLoggingIn(bool){
    return {
        type: userConstants.LOGIN_REQUEST,
        authenticated: false,
        isRequesting: bool
    }
}

export function userHasLoggedIn(user){
    return {
        type: userConstants.LOGIN_SUCCESS,
        authenticated: true,
        isRequesting: false,
        user
    }
}

export function userLogginError(err){
    return {
        type: errorConstants.LOGIN_FAILURE,
        err
    }
}

export function userIsRegistering(bool){
	return {
		type: userConstants.REGISTERING_USER,
        authenticated: false,
		isRequesting: bool
	}
}

export function userRegisteringError(err){
	return {
		type: errorConstants.REGISTER_FAILURE,
        err
	}
}

export function userHasRegistered(user){
	return {
		type: userConstants.REGISTER_SUCCESS,
        isRequesting: false,
        authenticated: true,
		user
	}
}

export function userIsAuthenticated(){
    return {
        type: userConstants.AUTHENTICATED_SUCCESS,
        authenticated: true
    }
}

export function userIsNotAuthenticated(){
    return {
        type: errorConstants.AUTHENTICATED_FAILURE,
        authenticated: false,
        err: {msg: "could not authenticate, please try logging in"}
    }
}

export function userIsUpdating(bool){
    return {
        type: userConstants.UPDATING_USER,
        isRequesting: bool
    }
}

export function userUpdatingError(err){
    return {
        type: errorConstants.UPDATING_USER_FAILURE,
        err
    }
}

export function userUpdated(user){
    return {
        type: userConstants.UPDATING_SUCCESS,
        user
    }
}
