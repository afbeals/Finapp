import * as expenseAC from '../client/app/actions/expensesActionCreators';
import {expensesConstants} from '../client/app/constants/expensesConstants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {assert,expect} from 'chai';
import moxios from 'moxios';
import { spy } from 'sinon';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//--- Expenses Action Creators ---//
//--------------------------------//
describe('Expenses Action Creators', () =>{
	//--- AJAX Requests ---//
	//---------------------//
	describe('async actions', () => {
		beforeEach(() => {
			moxios.install();
		});
		afterEach(() => {
			moxios.uninstall();
		});

		it(`should return REMOVE_EXPENSE when removing expenses has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: [{ message: 'success', status: '220' }],
		      	});
		    });
		    let passedQuery = {users_id: 1,id:3,query_id: 4};
	    	let expectedResponse = {users_id: 1,id:3,query_id: 4};
	    	const expectedActions = [
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: true },
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: false },
		    	{ type: expensesConstants.REQUESTING_EXPENSE_SUCCESS,isSuccessful: true },
		    	{ type: expensesConstants.REMOVE_EXPENSE,data: expectedResponse }
	    	];
	   		const store = mockStore({ expenses: [] });
	    	return store.dispatch(expenseAC.removeExpensesInQuery(passedQuery)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	})
	    });

		it(`should return UPDATE_EXPENSE when updating expenses  has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: [{ message: 'success', status: '220' }],
		      	});
		    });
		    let passedQuery = {users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "march"};
	    	let expectedResponse = {users_id: 1,name: "test name2",id:3,due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "march"};
	    	const expectedActions = [
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: true },
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: false },
		    	{ type: expensesConstants.REQUESTING_EXPENSE_SUCCESS,isSuccessful: true },
		    	{ type: expensesConstants.UPDATE_EXPENSE,data: expectedResponse }
	    	];
	   		const store = mockStore({ expenses: [] });
	    	return store.dispatch(expenseAC.updateExpensesInQuery(passedQuery)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	})
	    });

		it(`should return GET_ALL_EXPENSES_IN_RANGE when fetching expenses in range has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: [{users_id: 1,name: "test name2",due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "march"},{users_id: 1,name: "test name2",due_day: 15,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "may"}],
		      	});
		    });
		    let passedQuery = {
		    	passedQueryBeginningMonth : 3,
			    passedQueryBeginningDay : 4,
			    passedQueryEndingMonth : 5,
			    passedQueryEndingDay : 3,
			    passedQueryId : 1
		    };
		    
	    	let expectedResponse = [{users_id: 1,name: "test name2",due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "march"},{users_id: 1,name: "test name2",due_day: 15,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "may"}];
	    	const expectedActions = [
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: true },
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: false },
		    	{ type: expensesConstants.REQUESTING_EXPENSE_SUCCESS,isSuccessful: true },
		    	{ type: expensesConstants.GET_ALL_EXPENSES_IN_RANGE,data: expectedResponse }
	    	];
	   		const store = mockStore({ expenses: [] });
	    	return store.dispatch(expenseAC.getAllExpensesInRange(passedQuery)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	});
	  	});

		it(`should return GET_ALL_EXPENSES_IN_MONTH when fetching monthly expenses has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: [{users_id: 1,name: "test name2",due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "january"}],
		      	});
		    });
		    let passedQueryMonth = "january";
		    let passedQueryId = 1;
	    	let expectedResponse = [{users_id: 1,name: "test name2",due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!",month: "january"}];
	    	const expectedActions = [
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: true },
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: false },
		    	{ type: expensesConstants.REQUESTING_EXPENSE_SUCCESS,isSuccessful: true },
		    	{ type: expensesConstants.GET_ALL_EXPENSES_IN_MONTH,data: expectedResponse }
	    	];
	   		const store = mockStore({ expenses: [] });
	    	return store.dispatch(expenseAC.getAllExpensesInMonth(passedQueryId,passedQueryMonth)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	});
	  	});

		it(`should return GET_ALL_EXPENSES when fetching all expenses has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: [{users_id: 1,name: "test name2",due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!"}],
		      	});
		    });
		    let passedQuery = 1;
	    	let expectedResponse = [{users_id: 1,name: "test name2",due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!"}];
	    	const expectedActions = [
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: true },
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: false },
		    	{ type: expensesConstants.REQUESTING_EXPENSE_SUCCESS,isSuccessful: true },
		    	{ type: expensesConstants.GET_ALL_EXPENSES,data: expectedResponse }
	    	];
	   		const store = mockStore({ expenses: [] });
	    	return store.dispatch(expenseAC.getAllExpenses(passedQuery)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	});
	  	});

		it(`should return ADD_EXPENSE when fetching expenses has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: { message: 'success', status: '220' },
		      	});
		    });
	    	let expectedResponse = {users_id: 1,name: "test name2",due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!"}
	    	const expectedActions = [
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: true },
		    	{ type: expensesConstants.REQUESTING_EXPENSE,isRegistering: false },
		    	{ type: expensesConstants.REQUESTING_EXPENSE_SUCCESS,isSuccessful: true },
		    	{ type: expensesConstants.ADD_EXPENSE,data: expectedResponse }
	    	];
	   		const store = mockStore({ expenses: [] });
	    	return store.dispatch(expenseAC.addExpensesInQuery(expectedResponse)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	});
	  	});
	});

	//--- expenseActionCreators Requests ---//
	//--------------------------------------//
	describe('Requests', () => {
	  it('should return action REQUESTING_EXPENSE and bool', () => {
		    let isRegistering = true;
		    let expectedAction = {
		    	type: expensesConstants.REQUESTING_EXPENSE,
		    	isRegistering
		    }
	    	expect(expenseAC.fetchingExpenses(isRegistering)).to.deep.equal(expectedAction);
		});
	});

	//--- expenseActionCreators Failures ---//
	//--------------------------------------//
	describe('Failures', () => {
	  it('should return action REQUESTING_EXPENSE_FAILURE and bool', () => {
		    let hasErrored = false;
		    let expectedAction = {
		    	type: expensesConstants.REQUESTING_EXPENSE_FAILURE,
		    	hasErrored
		    }
	    	expect(expenseAC.fetchingExpensesError(hasErrored)).to.deep.equal(expectedAction);
		});
	});

	//--- expenseActionCreators Success ---//
	//--------------------------------------//
	describe('Successes', () => {
	  	it('should return action REQUESTING_EXPENSE_SUCCESS and bool', () => {
		    let isSuccessful = true;
		    let expectedAction = {
		    	type: expensesConstants.REQUESTING_EXPENSE_SUCCESS,
		    	isSuccessful
		    }
	    	expect(expenseAC.fetchingExpensesSuccess(isSuccessful)).to.deep.equal(expectedAction);
		});

		it('should return action UPDATE_EXPENSE and data', () => {
		    let data = {"some": "data"};
		    let expectedAction = {
		    	type: expensesConstants.UPDATE_EXPENSE,
		    	data
		    }
	    	expect(expenseAC.updateExpensesSuccess(data)).to.deep.equal(expectedAction);
		});

		it('should return action GET_ALL_EXPENSES and bool', () => {
		    let data = {"some": "data"};
		    let expectedAction = {
		    	type: expensesConstants.GET_ALL_EXPENSES,
		    	data
		    }
	    	expect(expenseAC.getAllExpensesSuccess(data)).to.deep.equal(expectedAction);
		});

		it('should return action GET_ALL_EXPENSES_IN_MONTH and bool', () => {
		    let data = {"some": "data"};
		    let expectedAction = {
		    	type: expensesConstants.GET_ALL_EXPENSES_IN_MONTH,
		    	data
		    }
	    	expect(expenseAC.getAllExpensesInMonthSuccess(data)).to.deep.equal(expectedAction);
		});

		it('should return action GET_ALL_EXPENSES_IN_RANGE and bool', () => {
		    let data = {"some": "data"};
		    let expectedAction = {
		    	type: expensesConstants.GET_ALL_EXPENSES_IN_RANGE,
		    	data
		    }
	    	expect(expenseAC.getAllExpensesInRangeSuccess(data)).to.deep.equal(expectedAction);
		});

		it('should return action REMOVE_EXPENSE and bool', () => {
		    let data = 4;
		    let expectedAction = {
		    	type: expensesConstants.REMOVE_EXPENSE,
		    	data
		    }
	    	expect(expenseAC.removeExpensesSuccess(data)).to.deep.equal(expectedAction);
		});

		it('should return action ADD_EXPENSE and data', () => {
		    let data = "query";
		    let expectedAction = {
		    	type: expensesConstants.ADD_EXPENSE,
		    	data
		    }
	    	expect(expenseAC.addExpensesSuccess(data)).to.deep.equal(expectedAction);
		});
	});
});