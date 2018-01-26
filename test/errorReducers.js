import {default as reducer} from '../client/app/reducers/errorsReducer';
import {errorConstants} from '../client/app/constants/errorConstants';
import {assert,expect} from 'chai';

//--- Reducer Testing ---//
//-----------------------//

const initialState = [];

describe('Error Reducers',()=>{
	it('should return the initial state when there is no match', ()=>{
		expect(reducer(undefined,{})).to.deep.equal([]);
	});

	it('should return new state with the Error when REQUESTING_INCOME_FAILURE',()=>{
	let returnedData = [{msg:"REQUESTING_INCOME_FAILURE",code: 400}];
		expect(reducer(initialState,{type: errorConstants.REQUESTING_INCOME_FAILURE,err: returnedData})).to.deep.equal(returnedData);
	});
	
	it('should return new state with the Error when REQUESTING_EXPENSE_FAILURE',()=>{
	let returnedData = [{msg:"REQUESTING_EXPENSE_FAILURE",code: 400}];
		expect(reducer(initialState,{type: errorConstants.REQUESTING_EXPENSE_FAILURE,err: returnedData})).to.deep.equal(returnedData);
	});
	
	it('should return new state with the Error when AUTHENTICATED_FAILURE',()=>{
	let returnedData = [{msg:"AUTHENTICATED_FAILURE",code: 400}];
		expect(reducer(initialState,{type: errorConstants.AUTHENTICATED_FAILURE,err: returnedData})).to.deep.equal(returnedData);
	});
	
	it('should return new state with the Error when LOGIN_FAILURE',()=>{
	let returnedData = [{msg:"LOGIN_FAILURE",code: 400}];
		expect(reducer(initialState,{type: errorConstants.LOGIN_FAILURE,err: returnedData})).to.deep.equal(returnedData);
	});
	
	it('should return new state with the Error when REGISTER_FAILURE',()=>{
	let returnedData = [{msg:"REGISTER_FAILURE",code: 400}];
		expect(reducer(initialState,{type: errorConstants.REGISTER_FAILURE,err: returnedData})).to.deep.equal(returnedData);
	});
	
	it('should return new state with the Error when UPDATING_USER_FAILURE',()=>{
	let returnedData = [{msg:"UPDATING_USER_FAILURE",code: 400}];
		expect(reducer(initialState,{type: errorConstants.UPDATING_USER_FAILURE,err: returnedData})).to.deep.equal(returnedData);
	});
	
	it('should return new emptry state when CLEAR_ALL_ERRORS',()=>{
		expect(reducer(initialState,{type: errorConstants.CLEAR_ALL_ERRORS})).to.deep.equal([]);
	});
	
	it('should return new state with the Error removed when REMOVE_ERROR',()=>{
	let returnedData = [{msg:"Error 01",code: 400},{msg:"Error 03",code: 400},{msg:"Error 04",code: 400}],
		state = [{msg:"Error 01",code: 400},{msg:"Error 02",code: 400},{msg:"Error 03",code: 400},{msg:"Error 04",code: 400}]
		expect(reducer(state,{type: errorConstants.REMOVE_ERROR,index: 1})).to.deep.equal(returnedData);
	});
	

	
});