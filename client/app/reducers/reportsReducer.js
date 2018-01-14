//--- Import Constants ---//
//------------------------//
import {reportsConstants} from '../constants/reportsConstants';

export default function errorsReducer(state = [], action){
	switch (action.type){
		case reportsConstants.GENERATE_REPORT_REQUEST:
			return state;
		case reportsConstants.GENERATE_REPORT_SUCCESS:
			return [...action.data];
		default:
			return state;
	}
}