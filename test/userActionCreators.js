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
		        	response: { user_id : 1}
		      	});
		    });
		    let passedUser = {regis_firstName: "Allan", regis_lastName: "Beals-Gibson", regis_email: "afbeals@hotmail.com", regis_password: "pass", regis_password_confirm: "pass"};
	    	let expectedResponse = {users_id:1,first_name: "Allan",isLoggedIn: true}
	    	const expectedActions = [
		    	{ type: userConstants.REGISTERING_USER,isRegistering: true },
		    	{ type: userConstants.REGISTER_SUCCESS,isRegistering: false,user: expectedResponse }
	    	];
	   		const store = mockStore({ users: {} });
	    	return store.dispatch(userAC.register(passedUser)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	});
	  	});
	});

	//--- userActionCreators Requests ---//
	//--------------------------------------//
	describe('Requests', () => {
	  it('should return action REGISTERING_USER and bool', () => {
		    let isRegistering = true;
		    let expectedAction = {
		    	type: userConstants.REGISTERING_USER,
		    	isRegistering
		    }
	    	expect(userAC.userIsRegistering(isRegistering)).to.deep.equal(expectedAction);
		});
	});

	//--- userActionCreators Failures ---//
	//--------------------------------------//
	describe('Failures', () => {
	  it('should return action REGISTER_FAILURE and bool', () => {
		    let hasErrored = true;
		    let expectedAction = {
		    	type: userConstants.REGISTER_FAILURE,
		    	isRegistering: false,
		    	hasErrored
		    }
	    	expect(userAC.userRegisteringError(hasErrored)).to.deep.equal(expectedAction);
		});
	});

	//--- userActionCreators Success ---//
	//--------------------------------------//
	describe('Successes', () => {
	  	it('should return action REGISTER_SUCCESS and user', () => {
		    let user = {users_id:1,first_name: "Allan",isLoggedIn: true};
		    let expectedAction = {
		    	type: userConstants.REGISTER_SUCCESS,
		    	isRegistering: false,
		    	user
		    }
	    	expect(userAC.userHasRegistered(user)).to.deep.equal(expectedAction);
		});
	});
});