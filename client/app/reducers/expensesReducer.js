//--- Import Constants ---//
//------------------------//
import {expensesConstants} from '../constants/expensesConstants';

export default function expensesReducer(state = [], action){
	switch (action.type){
		case expensesConstants.GET_ALL_EXPENSES:
			return action.data;
		case expensesConstants.GET_ALL_EXPENSES_IN_MONTH:
			return action.data;
		case expensesConstants.GET_ALL_EXPENSES_IN_RANGE:
			return action.data;
		case expensesConstants.UPDATE_EXPENSE:
			return [...state.map((item)=>{
				return item.id == action.data.id ? action.data : item;
			})];
		case expensesConstants.REMOVE_EXPENSE:
			return [
				...state.slice(0,action.data.index_in_array),
				...state.slice(action.data.index_in_array + 1)
			];
		case expensesConstants.ADD_EXPENSE:
			return [...state,action.data];
		case expensesConstants.REQUESTING_EXPENSE:
			return state;
		case expensesConstants.REQUESTING_EXPENSE_SUCCESS:
			return state;
		default:
			return state;
	}
}