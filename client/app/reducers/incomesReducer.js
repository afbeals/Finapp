//--- Import Constants ---//
//------------------------//
import {incomesConstants} from '../constants/incomesConstants';

export default function incomesReducer(state = [], action){
	switch (action.type){
		case incomesConstants.GET_ALL_INCOMES:
			return action.data;
		case incomesConstants.GET_ALL_INCOMES_IN_MONTH:
			return action.data;
		case incomesConstants.GET_ALL_INCOMES_IN_RANGE:
			return action.data;
		case incomesConstants.UPDATE_INCOME:
			return [...state.map((item)=>{
				return item.id == action.data.id ? action.data : item;
			})];
		case incomesConstants.REMOVE_INCOME:
			return [
				...state.slice(0,action.data.index_in_array),
				...state.slice(action.data.index_in_array + 1)
			];
		case incomesConstants.ADD_INCOME:
			return [action.data,...state];
		case incomesConstants.REQUESTING_INCOME:
			return state;
		case incomesConstants.REQUESTING_INCOME_SUCCESS:
			return state;
		case incomesConstants.REQUESTING_INCOME_FAILURE:
			return state;
		default:
			return state;
	}
}