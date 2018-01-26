import {default as reducer} from '../client/app/reducers/reportsReducer';
import {reportsConstants} from '../client/app/constants/reportsConstants';
import {assert,expect} from 'chai';

//--- Reducer Testing ---//
//-----------------------//

const initialState = [];

describe('Error Reducers',()=>{
	it('should return the initial state when there is no match', ()=>{
		expect(reducer(undefined,{})).to.deep.equal([]);
	});

	it('should return the initial state when GENERATE_REPORT_REQUEST',()=>{
	let returnedData = [];
		expect(reducer(initialState,{type: reportsConstants.GENERATE_REPORT_REQUEST})).to.deep.equal(returnedData);
	});
	
	it('should return new state with the report when GENERATE_REPORT_SUCCESS',()=>{
	let returnedData = [{name: "item 1",amount:400, due_day: 25, monthId: 1, monthName: "january", year: 2018, type: "inc"},{name: "item 2",amount:1400, due_day: 12, monthId: 1, monthName: "january", year: 2018, type: "exp"}]
		expect(reducer(initialState,{type: reportsConstants.GENERATE_REPORT_SUCCESS,data: returnedData})).to.deep.equal(returnedData);
	});
	
	it('should return new empty state when CLEAR_REPORT',()=>{
	let returnedData = [];
		expect(reducer(initialState,{type: reportsConstants.CLEAR_REPORT})).to.deep.equal(returnedData);
	});
	
});