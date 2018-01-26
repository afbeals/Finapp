import * as reportAC from '../client/app/actions/reportsActionCreators';
import {reportsConstants} from '../client/app/constants/reportsConstants';
import {errorConstants} from '../client/app/constants/errorConstants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {assert,expect} from 'chai';
import moxios from 'moxios';
import { spy } from 'sinon';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//--- Report Action Creators ---//
//--------------------------------//
describe('Report Action Creators', () =>{
	//--- AJAX Requests ---//
	//---------------------//
	describe('async actions', () => {
		beforeEach(() => {
			moxios.install();
		});
		afterEach(() => {
			moxios.uninstall();
		});

		it(`should return GENERATE_REPORT_SUCCESS when retrieving report has been done`, () => {
		    moxios.wait(() => {
		    	const request = moxios.requests.mostRecent();
		    	request.respondWith({
		    		status: 200,
		        	response: [{name: "item 1",amount:400, due_day: 25, monthId: 1, monthName: "january", year: 2018, type: "inc"},{name: "item 2",amount:1400, due_day: 12, monthId: 1, monthName: "january", year: 2018, type: "exp"}]
					
		      	});
		    });
		    let passedQuery = {users_id: 1,month:1,year: 4 };
	    	let data = [{name: "item 1",amount:400, due_day: 25, monthId: 1, monthName: "january", year: 2018, type: "inc"},{name: "item 2",amount:1400, due_day: 12, monthId: 1, monthName: "january", year: 2018, type: "exp"}];
	    	const expectedActions = [
		    	{ type: reportsConstants.GENERATE_REPORT_REQUEST,bool: true },
		    	{ type: reportsConstants.GENERATE_REPORT_REQUEST,bool: false },
		    	{ type: reportsConstants.GENERATE_REPORT_SUCCESS,data }
	    	];
	   		const store = mockStore({ expenses: [] });
	    	return store.dispatch(reportAC.generateReport(passedQuery)).then(() => {
	    		expect(store.getActions()).to.eql(expectedActions);
	    	})
	    });
	});
	
	//--- reportActionCreators Requests ---//
	//--------------------------------------//
	describe('Requests', () => {
		it('should return action GENERATE_REPORT_REQUEST and a bool', () => {
		    let bool = true;
		    let expectedAction = {
		    	type: reportsConstants.GENERATE_REPORT_REQUEST,
		    	bool
		    }
	    	expect(reportAC.generateReportRequest(bool)).to.deep.equal(expectedAction);
		});
		
		it('should return action GENERATE_REPORT_FAILURE and the error', () => {
		    let err = [{msg: "error message",code:404}];
		    let expectedAction = {
		    	type: errorConstants.GENERATE_REPORT_FAILURE,
		    	err
		    }
	    	expect(reportAC.generateReportFailure(err)).to.deep.equal(expectedAction);
		});
		
		it('should return action GENERATE_REPORT_SUCCESS and the data', () => {
		    let data = [{name: "item 1",amount:400, due_day: 25, monthId: 1, monthName: "january", year: 2018, type: "inc"},{name: "item 2",amount:1400, due_day: 12, monthId: 1, monthName: "january", year: 2018, type: "exp"}];
		    let expectedAction = {
		    	type: reportsConstants.GENERATE_REPORT_SUCCESS,
		    	data
		    }
	    	expect(reportAC.generateReportSuccess(data)).to.deep.equal(expectedAction);
		});
		
		it('should return action CLEAR_REPORT', () => {
		    let expectedAction = {
		    	type: reportsConstants.CLEAR_REPORT
		    }
	    	expect(reportAC.clearReport()).to.deep.equal(expectedAction);
		});
	});
});