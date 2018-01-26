import {default as reducer} from '../client/app/reducers/userReducer';
import {default as errorReducer} from '../client/app/reducers/errorsReducer';
import {userConstants} from '../client/app/constants/userConstants';
import {errorConstants} from '../client/app/constants/errorConstants';
import {assert,expect} from 'chai';

//--- Reducer Testing ---//
//-----------------------//

const initialState = {};

describe('User Reducers',()=>{
	it('should return the initial state when there is no match', ()=>{
		expect(reducer(undefined,{})).to.deep.equal({});
	});

	it('should return new state with user when REGISTERING_USER',()=>{
		let returnedData = {isRequesting:true};
		expect(reducer(initialState,{type: "REGISTERING_USER",isRequesting:true})).to.deep.equal(returnedData);
	});

	it('should return new state with user when REGISTER_SUCCESS',()=>{
		let returnedData = {isRequesting: false,authenticated: true};
		expect(reducer(initialState,{type: "REGISTER_SUCCESS",isRequesting: false,authenticated: true})).to.deep.equal(returnedData);
	});

	it('should return new state with user when REGISTER_FAILURE',()=>{
		let returnedData = [{msg: 'msg',error: 'error'}];
		expect(errorReducer([],{type: errorConstants.REGISTER_FAILURE,err:returnedData})).to.deep.equal(returnedData);
	});

	it('should return new state with user when AUTHENTICATED_SUCCESS',()=>{
		let returnedData = {authenticated: true};
		expect(reducer(initialState,{type: "AUTHENTICATED_SUCCESS",authenticated: true})).to.deep.equal(returnedData);
	});

	it('should return new state with user when AUTHENTICATED_FAILURE',()=>{
		let returnedData = [{msg: 'msg',code: 400}];
		expect(errorReducer(initialState,{type: errorConstants.AUTHENTICATED_FAILURE,err: returnedData})).to.deep.equal(returnedData);
	});

	it('should return new state with user when LOGIN_REQUEST',()=>{
		let returnedData = {isRequesting: false};
		expect(reducer([],{type: "LOGIN_REQUEST",isRequesting: false})).to.deep.equal(returnedData);
	});

	it('should return new state with user when LOGIN_SUCCESS',()=>{
		let returnedData = {isRequesting: false,authenticated: true};
		expect(reducer(initialState,{type: "LOGIN_SUCCESS",isRequesting: false,authenticated: true})).to.deep.equal(returnedData);
	});

	it('should return new state with user when LOGIN_FAILURE',()=>{
		let returnedData = [{msg: 'msg',code: 400}];
		expect(errorReducer([],{type: errorConstants.LOGIN_FAILURE,err: returnedData})).to.deep.equal(returnedData);
	});

	it('should return new state with user when LOGOUT',()=>{
		let returnedData = {user_id: null, first_name: "", authenticated: false, isRequesting:false, hasErrored: false};
		expect(reducer(initialState,{type: "LOGOUT",user_id: null, first_name: "", authenticated: false, isRequesting:false, hasErrored: false})).to.deep.equal(returnedData);
	});


});