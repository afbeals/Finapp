import * as errorAC from '../client/app/actions/errorActionCreators';
import {errorConstants} from '../client/app/constants/errorConstants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {assert,expect} from 'chai';
import moxios from 'moxios';
import { spy } from 'sinon';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//--- Error Action Creators ---//
//--------------------------------//
describe('Error Action Creators', () =>{
	//--- errorActionCreators Requests ---//
	//--------------------------------------//
	describe('Requests', () => {
		it('should return action REMOVE_ERROR and the index', () => {
		    let index = 1;
		    let expectedAction = {
		    	type: errorConstants.REMOVE_ERROR,
		    	index
		    }
	    	expect(errorAC.removeError(index)).to.deep.equal(expectedAction);
		});
		
		it('should return action CLEAR_ALL_ERRORS', () => {
		    let expectedAction = {
		    	type: errorConstants.CLEAR_ALL_ERRORS,
		    }
	    	expect(errorAC.clearAllErrors()).to.deep.equal(expectedAction);
		});
	});
});