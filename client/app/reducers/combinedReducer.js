//--- Dependencies ---//
import { combineReducers } from 'redux';

//--- Combine all reducers into one for redux ---//

//--- Needed for react-router ---//
import { routerReducer } from 'react-router-redux'; 

//--- Import reducers ---//
import userRegisteringReducer from './userRegisteringReducer';
import {default as user} from './userReducer';
import {default as expenses} from './expensesReducer';


const rootReducer = combineReducers({ user, userRegisteringReducer, expenses, routing: routerReducer });

export default rootReducer;