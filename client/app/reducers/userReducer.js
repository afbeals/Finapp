//---Constants---//
//---------------//
import {userConstants} from '../constants/userConstants';


export default function userReducer(state = {}, action){
	switch (action.type){
		case userConstants.REGISTERING_USER:
			return Object.assign({},state, {isRequesting:action.isRequesting});
		case userConstants.REGISTER_SUCCESS:
			return Object.assign({},state, action.user,{isRequesting:action.isRequesting,authenticated:action.authenticated});
		case userConstants.AUTHENTICATED_SUCCESS:
			return Object.assign({},state, {authenticated:action.authenticated,user_id:action.user.user_id,first_name:action.user.first_name});
		case userConstants.LOGIN_REQUEST:
			return Object.assign({},state, {isRequesting:action.isRequesting});
		case userConstants.LOGIN_SUCCESS:
			return Object.assign({},state, action.user,{isRequesting:action.isRequesting,authenticated:action.authenticated});
		case userConstants.LOGOUT:
			return Object.assign({},state,{user_id: null, first_name: "", authenticated: false, isRequesting:action.isRequesting, hasErrored: false});
		default:
			return state;
	}
}