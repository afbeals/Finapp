export default function expensesReducer(state = [], action){
	switch (action.type){
		case 'GET_ALL_EXPENSES':
			return action.data;
		case 'GET_ALL_EXPENSES_IN_MONTH':
			return action.data;
		case 'GET_ALL_EXPENSES_IN_RANGE':
			return action.data;
		case 'UPDATE_EXPENSE':
			return [...state.map((item)=>{
				return item.id == action.data.id ? action.data : item;
			})];
		case 'REMOVE_EXPENSE':
			return [
				...state.slice(0,action.index_in_array),
				...state.slice(action.index_in_array + 1)
			];
		case 'ADD_EXPENSE':
			return [...state,action.data];
		case 'REQUESTING_EXPENSE':
			return state;
		case 'REQUESTING_EXPENSE_SUCCESS':
			return state;
		case 'REQUESTING_EXPENSE_FAILURE':
			return state;
		default:
			return state;
	}
}