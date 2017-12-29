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
export function registerUser(user){
	return (dispatch) => {
        dispatch(userIsRegistering(true));
        return axios.post("/register_user",user)
            .then((response) => {  
                if (!(response.status >= 200 && response.status <= 299)) {
                	userRegisteringError(true);
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response)=>{
                dispatch(userHasRegistered({users_id:response.data.payload.user_id,first_name: user.regis_firstName}));
                axios.defaults.headers.common['Authorization'] = response.data.token;
                localStorage.setItem('finapp_user',resonse.data.token);
            })
            .catch((err) => dispatch(userRegisteringError(true)));
    };
}

export function userIsRegistering(bool){
	return {
		type: userConstants.REGISTERING_USER,
        authenticated: false,
		isRegistering: bool
	}
}

export function userRegisteringError(bool){
	return {
		type: userConstants.REGISTER_FAILURE,
        isRegistering: false,
        authenticated: false,
		hasErrored: bool,

	}
}

export function userHasRegistered(user){
	return {
		type: userConstants.REGISTER_SUCCESS,
        isRegistering: false,
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