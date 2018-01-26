import {default as reducer} from '../client/app/reducers/incomesReducer';
import {incomesConstants} from '../client/app/constants/incomesConstants';
import {assert,expect} from 'chai';

//--- Reducer Testing ---//
//-----------------------//

const initialState = [];

describe('Income Reducers',()=>{
	it('should return the initial state when there is no match', ()=>{
		expect(reducer(undefined,{})).to.deep.equal([]);
	});

	it('should return new state with all expense when GET_ALL_INCOMES',()=>{
		let returnedData = [{users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "march"}];
		expect(reducer(initialState,{type: "GET_ALL_INCOMES",data: returnedData})).to.deep.equal(returnedData);
	});

	it('should return new state with all expense in month when GET_ALL_INCOMES_IN_MONTH',()=>{
		let returnedData = [
			{users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "march"},
			{users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "march"}
		];
		expect(reducer(initialState,{type: "GET_ALL_INCOMES_IN_MONTH",data: returnedData})).to.deep.equal(returnedData);
	});

	it('should return new state with all expense in range when GET_ALL_INCOMES_IN_RANGE',()=>{
		let returnedData = [
			{users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "march"},
			{users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "march"}
		];
		expect(reducer(initialState,{type: "GET_ALL_INCOMES_IN_RANGE",data: returnedData})).to.deep.equal(returnedData);
	});

	it('should return new state with updated expense when UPDATE_INCOME',()=>{
		let preloadedState = [
			{users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 2050,notes: "!!!noenasa notes eafea!!!",month: "sept"},
			{users_id: 1,name: "test name2",id:4,due_day: 4,amount_due: 4600.33,amount_paid: 2510,notes: " anot notes eafea!!!",month: "march"},
			{users_id: 1,name: "test name2",id:5,due_day: 2,amount_due: 4234.33,amount_paid: 2550,notes: "notes eafea!!!",month: "feb"},
			{users_id: 1,name: "test name2",id:6,due_day: 8,amount_due: 8730.33,amount_paid: 2150,notes: "!eafea!!!",month: "jan"}
		]

		let updatedData = {users_id: 1,name: "test name2",id:4,due_day: 11,amount_due: 100.33,amount_paid: 0,notes: "!!!",month: "may"};

		let returnData = [
			{users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 2050,notes: "!!!noenasa notes eafea!!!",month: "sept"},
			{users_id: 1,name: "test name2",id:4,due_day: 11,amount_due: 100.33,amount_paid: 0,notes: "!!!",month: "may"},
			{users_id: 1,name: "test name2",id:5,due_day: 2,amount_due: 4234.33,amount_paid: 2550,notes: "notes eafea!!!",month: "feb"},
			{users_id: 1,name: "test name2",id:6,due_day: 8,amount_due: 8730.33,amount_paid: 2150,notes: "!eafea!!!",month: "jan"}
		]
		expect(reducer(preloadedState,{type: "UPDATE_INCOME",data: updatedData})).to.deep.equal(returnData);
	});

	it('should return new state with removed expense when REMOVE_INCOME',()=>{
		let preloadedState = [
			{users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 2050,notes: "!!!noenasa notes eafea!!!",month: "sept"},
			{users_id: 1,name: "test name2",id:4,due_day: 4,amount_due: 4600.33,amount_paid: 2510,notes: " anot notes eafea!!!",month: "march"},
			{users_id: 1,name: "test name2",id:5,due_day: 2,amount_due: 4234.33,amount_paid: 2550,notes: "notes eafea!!!",month: "feb"},
			{users_id: 1,name: "test name2",id:6,due_day: 8,amount_due: 8730.33,amount_paid: 2150,notes: "!eafea!!!",month: "jan"}
		]

		let removedData = {index_in_array: 1};

		let returnData = [
			{users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 2050,notes: "!!!noenasa notes eafea!!!",month: "sept"},
			{users_id: 1,name: "test name2",id:5,due_day: 2,amount_due: 4234.33,amount_paid: 2550,notes: "notes eafea!!!",month: "feb"},
			{users_id: 1,name: "test name2",id:6,due_day: 8,amount_due: 8730.33,amount_paid: 2150,notes: "!eafea!!!",month: "jan"}
		]
		expect(reducer(preloadedState,{type: "REMOVE_INCOME",data: removedData})).to.deep.equal(returnData);
	});

	it('should return new state with added expense when ADD_INCOME',()=>{
		let preloadedState = [
			{users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 2050,notes: "!!!noenasa notes eafea!!!",month: "sept"},
			{users_id: 1,name: "test name2",id:4,due_day: 4,amount_due: 4600.33,amount_paid: 2510,notes: " anot notes eafea!!!",month: "march"},
			{users_id: 1,name: "test name2",id:5,due_day: 2,amount_due: 4234.33,amount_paid: 2550,notes: "notes eafea!!!",month: "feb"},
			{users_id: 1,name: "test name2",id:6,due_day: 8,amount_due: 8730.33,amount_paid: 2150,notes: "!eafea!!!",month: "jan"}
		]

		let addedData = {users_id: 1,name: "test name5323",id:7,due_day: 9,amount_due: 100.31,amount_paid: 50,notes: "!eafea!!!",month: "jan"};

		let returnData = [addedData,...preloadedState];
		expect(reducer(preloadedState,{type: "ADD_INCOME",data: addedData})).to.deep.equal(returnData);
	});

	it('should return state with all expense when REQUESTING_INCOME',()=>{
		let returnedData = [];
		expect(reducer(initialState,{type: "REQUESTING_INCOME",data: returnedData})).to.deep.equal(returnedData);
	});

	it('should return new state with all expense when REQUESTING_INCOME_SUCCESS',()=>{
		let returnedData = [];
		expect(reducer(initialState,{type: "REQUESTING_INCOME_SUCCESS",data: returnedData})).to.deep.equal(returnedData);
	});

	it('should return new state with all expense when REQUESTING_INCOME_FAILURE',()=>{
		let returnedData = [];
		expect(reducer(initialState,{type: "REQUESTING_INCOME_FAILURE",data: returnedData})).to.deep.equal(returnedData);
	});
});