export default function userReducer(state = {}, action){
	switch (action.type){
		case 'REGISTER_SUCCESS':
			return {
				...state, user:action.user
			}
		default:
			return state;
	}
}