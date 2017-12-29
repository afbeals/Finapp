//---Constants---//
//---------------//
import {userConstants} from '../constants/userConstants';


export default function userReducer(state = {}, action){
	switch (action.type){
		case userConstants.REGISTER_SUCCESS:
			return Object.assign({},state, action.user,action.isRegistering);
		case userConstants.REGISTER_FAILURE:
			return Object.assign({},state, action.isRegistering);
		case userConstants.REGISTER_FAILURE:
			return Object.assign({},state, action.isRegistering);
		case userConstants.AUTHENTICATED_SUCCESS:
			return Object.assign({},state, action.authenticated);
		case userConstants.AUTHENTICATED_FAILURE:
			return Object.assign({},state, action.authenticated);
		default:
			return state;
	}
}