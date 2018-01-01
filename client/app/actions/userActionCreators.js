//---  Import axios for ajax calls ---/
import axios from 'axios';

//--- Import Constants ---//
import {userConstants} from '../constants/userConstants';

//--- Action Creators ---//
/*--- Example:
Basic:
export function increaseNum(i) {
  return {
    type: 'INCREASE_NUM'
  };
}

Ajax:
export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch();
        axios.get(url)
            .then((response) => {  
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch();
                return response;
            })
            .then((data) => dispatch())
            .catch(() => dispatch());
    };
}



--- */

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
            })
            .catch((err) => dispatch(userRegisteringError(err.response.data.error)));
    };
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
            })
            .catch((err) => {console.log(err);dispatch(userRegisteringError(err.response.data.error))});
    }
}

export function logOutUser(user){
    console.log('in here');
    return (dispatch) => {
        try {
            axios.defaults.headers.common['Authorization'] = '';
            localStorage.removeItem('finapp_user','');
            dispatch(userHasLoggedOut());
            console.log('tried it all');
        }
        catch (err){
            console.log(err);
        }
    }
}

export function testHeaders(token){
    return(dispatch) => {
        return axios.get('/test_header',{params: {token}})
            .then((response)=>{
                if (!(response.status >= 200 && response.status <= 299)) {
                    throw Error(response.statusText);
                }
            })
            .catch((err) => {
                userRegisteringError(true);
            });
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

export function userLogginError(errors){
    return {
        type: userConstants.LOGIN_FAILURE,
        authenticated: false,
        isRequesting: false,
        hasErrored: errors
    }
}

export function userIsRegistering(bool){
	return {
		type: userConstants.REGISTERING_USER,
        authenticated: false,
		isRequesting: bool
	}
}

export function userRegisteringError(errors){
	return {
		type: userConstants.REGISTER_FAILURE,
        isRequesting: false,
        authenticated: false,
		hasErrored: errors,
	}
}

export function userHasRegistered(user){
    console.log('UHS',user);
	return {
		type: userConstants.REGISTER_SUCCESS,
        isRequesting: false,
        authenticated: true,
		user
	}
}

export function userIsAuthenticated(bool){
    return {
        type: userConstants.AUTHENTICATED_SUCCESS,
        authenticated: true
    }
}

export function userIsNotAuthenticated(bool){
    return {
        type: userConstants.AUTHENTICATED_FAILURE,
        authenticated: false
    }
}

//Need error handling that displays error message