//---Dependencies---//
//------------------//
import * as userAC from '../client/app/actions/userActionCreators';
import {userConstants} from '../client/app/constants/userConstants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {assert,expect} from 'chai';
import moxios from 'moxios';
import { spy } from 'sinon';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//--- Users Action Creators ---//
//--------------------------------//
describe('User Action Creators', () =>{
	//--- AJAX Requests ---//
	//---------------------//
	describe('async actions', () => {
		beforeEach(() => {
			moxios.install();
		});
		afterEach(() => {
			moxios.uninstall();
		});

		it(`should return REGISTER_SUCCESS when registering user has been completed`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: {payload:{user_id:1,first_name:"Allan"},token:"aefafaasefadfa423f3q3rq3a"}
		      	});
		    });
		    let passedUser = {first_name: "Allan",last_name: "test",email:"aefa@aefa.com",password:"testtest1",password_confirm:"testtest1"};
	    	let expectedResponse = {user_id:1,first_name:"Allan"};
	    	const expectedActions = [
		    	{ type: userConstants.REGISTERING_USER,isRequesting: true,authenticated: false },
		    	{ type: userConstants.REGISTERING_USER,isRequesting: false,authenticated: false },
		    	{ type: userConstants.REGISTER_SUCCESS,isRequesting: false,authenticated: true,user: expectedResponse }
	    	];
	   		const store = mockStore({ users: {} });
	    	return store.dispatch(userAC.registerUser(passedUser)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	});
	  	});

	  	it(`should return LOGIN_SUCCESS when logining in user has been completed`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: {payload:{user_id:1,first_name:"Allan"},token:"aefafaasefadfa423f3q3rq3a"}
		      	});
		    });
		    let passedUser = {first_name: "Allan",password:"testtest1"};
	    	let expectedResponse = {user_id:1,first_name:"Allan"};
	    	const expectedActions = [
		    	{ type: userConstants.LOGIN_REQUEST,isRequesting: true,authenticated: false },
		    	{ type: userConstants.LOGIN_REQUEST,isRequesting: false,authenticated: false },
		    	{ type: userConstants.LOGIN_SUCCESS,isRequesting: false,authenticated: true,user: expectedResponse }
	    	];
	   		const store = mockStore({ users: {} });
	    	return store.dispatch(userAC.loginUser(passedUser)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	});
	  	});
	});

	//--- userActionCreators Requests ---//
	//--------------------------------------//
	describe('Requests', () => {
	  it('should return action REGISTERING_USER and bool', () => {
		    let isRequesting = true;
		    let expectedAction = {
		    	type: userConstants.REGISTERING_USER,
		    	isRequesting,
		    	authenticated: false
		    }
	    	expect(userAC.userIsRegistering(isRequesting)).to.deep.equal(expectedAction);
		});

	  it('should return action LOGIN_REQUEST and bool', () => {
		    let isRequesting = true;
		    let expectedAction = {
		    	type: userConstants.LOGIN_REQUEST,
		    	isRequesting,
		    	authenticated: false
		    }
	    	expect(userAC.userIsLoggingIn(isRequesting)).to.deep.equal(expectedAction);
		});

	  it('should return action LOGOUT and bool\'s', () => {
		    let expectedAction = {
		    	type: userConstants.LOGOUT,
		    	isRequesting: false,
		    	authenticated: false
		    }
	    	expect(userAC.userHasLoggedOut()).to.deep.equal(expectedAction);
		});
	});

	//--- userActionCreators Failures ---//
	//--------------------------------------//
	describe('Failures', () => {
	  it('should return action REGISTER_FAILURE and bool', () => {
		    let hasErrored = true;
		    let expectedAction = {
		    	type: userConstants.REGISTER_FAILURE,
		    	isRequesting: false,
		    	authenticated: false,
		    	hasErrored
		    }
	    	expect(userAC.userRegisteringError(hasErrored)).to.deep.equal(expectedAction);
		});

	  it('should return action LOGIN_FAILURE and error', () => {
		    let hasErrored = [{error: "error", msg: "the message"}];
		    let expectedAction = {
		    	type: userConstants.LOGIN_FAILURE,
		    	isRequesting: false,
		    	authenticated: false,
		    	hasErrored
		    }
	    	expect(userAC.userLogginError(hasErrored)).to.deep.equal(expectedAction);
		});

	  it('should return action AUTHENTICATED_FAILURE and authentication', () => {
		    let expectedAction = {
		    	type: userConstants.AUTHENTICATED_FAILURE,
		    	authenticated: false
		    }
	    	expect(userAC.userIsNotAuthenticated()).to.deep.equal(expectedAction);
		});
	});

	//--- userActionCreators Success ---//
	//--------------------------------------//
	describe('Successes', () => {
	  	it('should return action REGISTER_SUCCESS and user', () => {
		    let user = {users_id:1,first_name: "Allan"};
		    let expectedAction = {
		    	type: userConstants.REGISTER_SUCCESS,
		    	isRequesting: false,
		    	authenticated: true,
		    	user
		    }
	    	expect(userAC.userHasRegistered(user)).to.deep.equal(expectedAction);
		});

		it('should return action AUTHENTICATED_SUCCESS and bool', () => {
		    let expectedAction = {
		    	type: userConstants.AUTHENTICATED_SUCCESS,
		    	authenticated: true
		    }
	    	expect(userAC.userIsAuthenticated()).to.deep.equal(expectedAction);
		});

		it('should return action AUTHENTICATED_SUCCESS and user', () => {
		    let user = {user_id:1,first_name:"Allan"};
		    let expectedAction = {
		    	type: userConstants.LOGIN_SUCCESS,
		    	authenticated: true,
		    	isRequesting: false,
		    	user
		    }
	    	expect(userAC.userHasLoggedIn(user)).to.deep.equal(expectedAction);
		});
	});

});