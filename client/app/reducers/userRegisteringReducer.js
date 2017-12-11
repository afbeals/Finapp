export default function userRegisteringReducer(state = false, action){
	switch (action.type){
		case 'REGISTERING_USER':
			return action.isRegistering;
		case 'REGISTER_FAILURE':
			return action.hasErrored;
		default:
			return state;
	}
}