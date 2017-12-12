export default function expensesReducer(state = [], action){
	switch (action.type){
		case 'GET_ALL_EXPENSES':
			return {...state,expenses:action.data};
		case 'GET_ALL_EXPENSES_IN_MONTH':
			return {...state,expenses:action.data};
		case 'GET_ALL_EXPENSES_IN_RANGE':
			return {...state,expenses:action.data};
		case 'UPDATE_EXPENSE':
			return {...state,expenses:state.expenses.map((item)=>{
				return item.id == action.data.id ? action.data : item;
			})};
		case 'REMOVE_EXPENSE':
			return {...state,expenses:[
						...state.expenses.slice(0,action.id),
						...state.expenses.slice(action.id + 1)
						]
					};
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