//--- Import Constants ---//
//------------------------//
import {errorConstants} from '../constants/errorConstants';

export default function errorsReducer(state = [], action){
	switch (action.type){
		case errorConstants.REQUESTING_INCOME_FAILURE:
			return [...action.err];
		case errorConstants.REQUESTING_EXPENSE_FAILURE:
			return [...action.err];
		case errorConstants.AUTHENTICATED_FAILURE:
			return [...action.err];
		case errorConstants.LOGIN_FAILURE:
			return [...action.err];
		case errorConstants.REGISTER_FAILURE:
			return [...action.err];
		case errorConstants.UPDATING_USER_FAILURE:
			return [...action.err];
		case errorConstants.CLEAR_ALL_ERRORS:
			return [];
		case errorConstants.REMOVE_ERROR:
			return [
				...state.slice(0,action.index),
				...state.slice(action.index + 1)
			];;
		default:
			return state;
	}
}