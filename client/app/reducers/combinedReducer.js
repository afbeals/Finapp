//--- Dependencies ---//
//--------------------//
import { combineReducers } from 'redux';

//--- Combine all reducers into one for redux ---//
//-----------------------------------------------//

//--- Needed for react-router ---//
//-------------------------------//
import { routerReducer } from 'react-router-redux'; 

//--- Import reducers ---//
//-----------------------//
import {default as user} from './userReducer';
import {default as expenses} from './expensesReducer';
import {default as incomes} from './incomesReducer';


const rootReducer = combineReducers({ user, expenses, incomes, routing: routerReducer });

export default rootReducer;