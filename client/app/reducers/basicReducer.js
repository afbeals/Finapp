function basicReducer(state = [], action){
	switch (action.type){
		case 'ADD_ITEM':
			return [...state,{item: action.item,id: action.id}];
		case 'REMOVE_ITEM':
			return [
				    ...state.slice(0, action.id),
				    ...state.slice(action.id + 1)
		    ];
		case 'INCREASE_ITEM':
			return [++state]
		default:
			return state;
	}
}

export default basicReducer;