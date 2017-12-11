//---  Import axios for ajax calls ---/
import axios from 'axios';

//--- Import Constants ---//
import userConstants from '../constants/userConstants';

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

export function register(user){
	return (dispatch) => {
        dispatch(userIsRegistering(true));
        axios.post("/register_user",{user})
            .then((response) => {  
                if (!response.ok) {
                	userRegisteringError(true)
                    throw Error(response.statusText);
                }
                dispatch(userIsRegistering(false));
                return response;
            })
            .then((response)=>dispatch(userHasRegistered(response)))
            .catch((err) => dispatch(userRegisteringError(true)));
    };
}

export function userIsRegistering(bool){
	return {
		type: REGISTERING_USER,
		isRegistering: bool
	}
}

export function userRegisteringError(bool){
	return {
		type: REGISTER_FAILURE,
		hasErrored: bool,

	}
}

export function userHasRegistered(user){
	return {
		type: REGISTER_SUCCESS,
		user: user
	}
}

