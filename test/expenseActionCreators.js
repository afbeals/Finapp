import * as expenseAC from '../client/app/actions/expensesActionCreators';
import {expensesConstants} from '../client/app/constants/expensesConstants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import fetchMock from 'fetch-mock';
import {assert,expect} from 'chai';
import jest from 'jest';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


//--- AJAX Requests ---//

describe('async actions', () => {
  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {

  	let expectedQuery = {users_id: 1,name: "test name2",due_day: 5,amount_due: 4200.33,amount_paid: 250,notes: "!!!noenasa anot notes eafea!!!"};
	const expectedActions = [
      { type: expensesConstants.REQUESTING_EXPENSE,isRegistering: true },
      { type: expensesConstants.REQUESTING_EXPENSE,isRegistering: false },
      { type: expensesConstants.REQUESTING_EXPENSE_SUCCESS,isSuccessful: true },
      { type: expensesConstants.ADD_EXPENSE,data: expectedQuery }
    ]

    // mock the axios.post method, so it will just resolve the Promise.
    axios.post = jest.fn((url) => {
        return Promise.resolve();
    });
    // mock the dispatch and getState functions from Redux thunk.
    const dispatch = jest.fn(),
        getState = jest.fn(() => {url: '/add_expenses_in_query'});

    // execute
    expenseAC.addExpensesInQuery(expectedQuery)(dispatch, getState);

    // verify
    expect(dispatch.mock.calls[0][0]).to.deep.equal(expectedActions[0])
  })
})

//--- expenseActionCreators Requests ---//
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
	    let id = 4;
	    let expectedAction = {
	    	type: expensesConstants.REMOVE_EXPENSE,
	    	id
	    }

    	expect(expenseAC.removeExpensesSuccess(id)).to.deep.equal(expectedAction);
	});

	it('should return action ADD_EXPENSE and bool', () => {
	    let data = "query";
	    let expectedAction = {
	    	type: expensesConstants.ADD_EXPENSE,
	    	data
	    }

    	expect(expenseAC.addExpensesSuccess(data)).to.deep.equal(expectedAction);
	});
	
});








//--- test ---//
let reverse = (s) => {
    return s.split("").reverse().join("");
}
describe('random', () => {
  it('should return a reverse string', () => {
  		let passedString = '0123';
	    let expectedString = '3210';
	    

    	expect(reverse(passedString)).to.equal(expectedString);
	});
});