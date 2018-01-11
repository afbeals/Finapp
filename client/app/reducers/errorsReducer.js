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
		case errorConstants.CLEAR_ERRORS:
			return [];
		default:
			return state;
	}
}