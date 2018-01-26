import * as incomesAC from '../client/app/actions/incomesACtionCreators';
import {incomesConstants} from '../client/app/constants/incomesConstants';
import {errorConstants} from '../client/app/constants/errorConstants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {assert,expect} from 'chai';
import moxios from 'moxios';
import { spy } from 'sinon';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//--- Incomes Action Creators ---//
//--------------------------------//
describe('Incomes Action Creators', () =>{
	//--- AJAX Requests ---//
	//---------------------//
	describe('async actions', () => {
		beforeEach(() => {
			moxios.install();
		});
		afterEach(() => {
			moxios.uninstall();
		});

		it(`should return REMOVE_INCOMES when removing income has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: [{ message: 'success', status: '220' }],
		      	});
		    });
		    let passedQuery = {users_id: 1,id:3,months_id: 4,index_in_array: 1};
	    	let expectedResponse = {users_id: 1,id:3,months_id: 4,index_in_array: 1};
	    	const expectedActions = [
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: true },
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: false },
		    	{ type: incomesConstants.REQUESTING_INCOME_SUCCESS,isSuccessful: true },
		    	{ type: incomesConstants.REMOVE_INCOME,data: expectedResponse }
	    	];
	   		const store = mockStore({ incomes: [] });
	    	return store.dispatch(incomesAC.removeIncomesInQuery(passedQuery)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	})
	    });

		it(`should return UPDATE_INCOMES when updating income has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: [{ message: 'success', status: '220' }],
		      	});
		    });
		    let passedQuery = {id: 1,users_id: 1,name: "test name2",due_day: 5,notes: "!!!noenasa anot notes eafea!!!",month: 3};
	    	let expectedResponse = {id: 1,users_id: 1,name: "test name2",due_day: 5,notes: "!!!noenasa anot notes eafea!!!",month: 3};
	    	const expectedActions = [
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: true },
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: false },
		    	{ type: incomesConstants.REQUESTING_INCOME_SUCCESS,isSuccessful: true },
		    	{ type: incomesConstants.UPDATE_INCOME,data: expectedResponse }
	    	];
	   		const store = mockStore({ incomes: [] });
	    	return store.dispatch(incomesAC.updateIncomesInQuery(passedQuery)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	})
	    });

		it(`should return GET_ALL_INCOMES_IN_RANGE when fetching incomes in range has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: [
		        		{id: 1,users_id:1,name: "test name2",due_day: 5,notes: "!!!noenasa anot notes eafea!!!",month: 3},{id: 1,users_id:1,name: "test name4",due_day: 11,notes: "eafea!!!",month: 2}
		        	],
		      	});
		    });
		    let passedQuery = {
		    	passedQueryBeginningMonth : 2,
			    passedQueryBeginningDay : 4,
			    passedQueryEndingMonth : 4,
			    passedQueryEndingDay : 15,
			    passedQueryId : 1
		    };
		    
	    	let expectedResponse = [{id: 1,users_id:1,name: "test name2",due_day: 5,notes: "!!!noenasa anot notes eafea!!!",month: 3},{id: 1,users_id:1,name: "test name4",due_day: 11,notes: "eafea!!!",month: 2}];
	    	const expectedActions = [
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: true },
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: false },
		    	{ type: incomesConstants.REQUESTING_INCOME_SUCCESS,isSuccessful: true },
		    	{ type: incomesConstants.GET_ALL_INCOMES_IN_RANGE,data: expectedResponse }
	    	];
	   		const store = mockStore({ incomes: [] });
	    	return store.dispatch(incomesAC.getAllIncomesInRange(passedQuery)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	});
	  	});

		it(`should return GET_ALL_INCOMES_IN_MONTH when fetching monthly incomes has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: [
		        		{id: 1,users_id:1,name: "test name2",due_day: 5,notes: "!!!noenasa anot notes eafea!!!",month: 3}
		        	],
		      	});
		    });
		    let passedQueryMonth = 3;
		    let passedQueryId = 1;
	    	let expectedResponse = [{id: 1,users_id:1,name: "test name2",due_day: 5,notes: "!!!noenasa anot notes eafea!!!",month: 3}];
	    	const expectedActions = [
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: true },
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: false },
		    	{ type: incomesConstants.REQUESTING_INCOME_SUCCESS,isSuccessful: true },
		    	{ type: incomesConstants.GET_ALL_INCOMES_IN_MONTH,data: expectedResponse }
	    	];
	   		const store = mockStore({ incomes: [] });
	    	return store.dispatch(incomesAC.getAllIncomesInMonth(passedQueryId,passedQueryMonth)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	});
	  	});

		it(`should return GET_ALL_INCOMES when fetching all incomes has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: [{id: 1,users_id: 1,name: "test name2",due_day: 5,notes: "!!!noenasa anot notes eafea!!!",month: 3}],
		      	});
		    });
		    let passedQuery = 1;
	    	let expectedResponse = [{id: 1,users_id: 1,name: "test name2",due_day: 5,notes: "!!!noenasa anot notes eafea!!!",month: 3}];
	    	const expectedActions = [
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: true },
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: false },
		    	{ type: incomesConstants.REQUESTING_INCOME_SUCCESS,isSuccessful: true },
		    	{ type: incomesConstants.GET_ALL_INCOMES,data: expectedResponse }
	    	];
	   		const store = mockStore({ incomes: [] });
	    	return store.dispatch(incomesAC.getAllIncomes(passedQuery)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	});
	  	});

		it(`should return ADD_INCOMES when fetching incomes has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: { message: 'success', status: '220' },
		      	});
		    });
	    	let expectedResponse = {id: 1,users_id: 1,name: "test name2",due_day: 5,notes: "!!!noenasa anot notes eafea!!!",month: 3}
	    	const expectedActions = [
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: true },
		    	{ type: incomesConstants.REQUESTING_INCOME,isRegistering: false },
		    	{ type: incomesConstants.REQUESTING_INCOME_SUCCESS,isSuccessful: true },
		    	{ type: incomesConstants.ADD_INCOME,data: expectedResponse }
	    	];
	   		const store = mockStore({ incomes: [] });
	    	return store.dispatch(incomesAC.addIncomesInQuery(expectedResponse)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	});
	  	});
	});

	//--- incomeActionCreators Requests ---//
	//--------------------------------------//
	describe('Requests', () => {
	  it('should return action REQUESTING_INCOMES and bool', () => {
		    let isRegistering = true;
		    let expectedAction = {
		    	type: incomesConstants.REQUESTING_INCOME,
		    	isRegistering
		    }
	    	expect(incomesAC.fetchingIncomes(isRegistering)).to.deep.equal(expectedAction);
		});
	});

	//--- incomeActionCreators Failures ---//
	//--------------------------------------//
	describe('Failures', () => {
	  it('should return action REQUESTING_INCOMES_FAILURE and the err', () => {
		    let err = [{msg: "error message",code:404}];
		    let expectedAction = {
		    	type: errorConstants.REQUESTING_INCOME_FAILURE,
		    	err
		    }
	    	expect(incomesAC.fetchingIncomesError(err)).to.deep.equal(expectedAction);
		});
	});

	//--- incomeActionCreators Success ---//
	//--------------------------------------//
	describe('Successes', () => {
	  	it('should return action REQUESTING_INCOMES_SUCCESS and bool', () => {
		    let isSuccessful = true;
		    let expectedAction = {
		    	type: incomesConstants.REQUESTING_INCOME_SUCCESS,
		    	isSuccessful
		    }
	    	expect(incomesAC.fetchingIncomesSuccess(isSuccessful)).to.deep.equal(expectedAction);
		});

		it('should return action UPDATE_INCOMES and data', () => {
		    let data = {"some": "data"};
		    let expectedAction = {
		    	type: incomesConstants.UPDATE_INCOME,
		    	data
		    }
	    	expect(incomesAC.updateIncomesSuccess(data)).to.deep.equal(expectedAction);
		});

		it('should return action GET_ALL_INCOMESS and bool', () => {
		    let data = {"some": "data"};
		    let expectedAction = {
		    	type: incomesConstants.GET_ALL_INCOMES,
		    	data
		    }
	    	expect(incomesAC.getAllIncomesSuccess(data)).to.deep.equal(expectedAction);
		});

		it('should return action GET_ALL_INCOMES_IN_MONTH and bool', () => {
		    let data = {"some": "data"};
		    let expectedAction = {
		    	type: incomesConstants.GET_ALL_INCOMES_IN_MONTH,
		    	data
		    }
	    	expect(incomesAC.getAllIncomesInMonthSuccess(data)).to.deep.equal(expectedAction);
		});

		it('should return action GET_ALL_INCOMES_IN_RANGE and bool', () => {
		    let data = {"some": "data"};
		    let expectedAction = {
		    	type: incomesConstants.GET_ALL_INCOMES_IN_RANGE,
		    	data
		    }
	    	expect(incomesAC.getAllIncomesInRangeSuccess(data)).to.deep.equal(expectedAction);
		});

		it('should return action REMOVE_INCOME and bool', () => {
		    let data = 4;
		    let expectedAction = {
		    	type: incomesConstants.REMOVE_INCOME,
		    	data
		    }
	    	expect(incomesAC.removeIncomesSuccess(data)).to.deep.equal(expectedAction);
		});

		it('should return action ADD_INCOME and data', () => {
		    let data = "query";
		    let expectedAction = {
		    	type: incomesConstants.ADD_INCOME,
		    	data
		    }
	    	expect(incomesAC.addIncomesSuccess(data)).to.deep.equal(expectedAction);
		});
	});
});