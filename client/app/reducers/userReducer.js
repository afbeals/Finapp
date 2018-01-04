//---Constants---//
//---------------//
import {userConstants} from '../constants/userConstants';


export default function userReducer(state = {}, action){
	switch (action.type){
		case userConstants.REGISTERING_USER:
			return Object.assign({},state, {isRequesting:action.isRequesting});
		case userConstants.REGISTER_SUCCESS:
			return Object.assign({},state, action.user,{isRequesting:action.isRequesting,authenticated:action.authenticated});
		case userConstants.REGISTER_FAILURE:
			return Object.assign({},state, {isRequesting:action.isRequesting,hasErrored:action.hasErrored});
		case userConstants.AUTHENTICATED_SUCCESS:
			return Object.assign({},state, {authenticated:action.authenticated});
		case userConstants.AUTHENTICATED_FAILURE:
			return Object.assign({},state, {authenticated:action.authenticated,hasErrored:action.hasErrored});
		case userConstants.LOGIN_REQUEST:
			return Object.assign({},state, {isRequesting:action.isRequesting});
		case userConstants.LOGIN_SUCCESS:
			return Object.assign({},state, action.user,{isRequesting:action.isRequesting,authenticated:action.authenticated});
		case userConstants.LOGIN_FAILURE:
			return Object.assign({},state, {isRequesting:action.isRequesting,hasErrored:action.hasErrored});
		case userConstants.LOGOUT:
			return Object.assign({},state,{user_id: null, first_name: "", authenticated: false, isRequesting:action.isRequesting, hasErrored: false});
		default:
			return state;
	}
}