//--- Dependencies ---//
import { combineReducers } from 'redux';

//--- Combine all reducers into one for redux ---//

//--- Needed for react-router ---//
import { routerReducer } from 'react-router-redux'; 

//--- Import reducer ---//
import basicReducer from './basicReducer';
const rootReducer = combineReducers({ basicReducer, routing: routerReducer });

export default rootReducer;