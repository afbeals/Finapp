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
import {reducer as formReducer} from 'redux-form';
import {default as errors} from './errorsReducer';


const rootReducer = combineReducers({ user, expenses, incomes,form: formReducer, routing: routerReducer, errors });

export default rootReducer;