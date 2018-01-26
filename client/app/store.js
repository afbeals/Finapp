//--- Dependencies ---//
//--------------------//
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers/combinedReducer';

//--- Create Store w/ default state (should match reducers) ---//
//-------------------------------------------------------------//
const defaultState = {
  user: {
    user_id:null,
    first_name:null,
    authenticated: false,
    isRequesting: false
  },
  expenses: [],
  incomes: [],
  errors: []
}
//// const enhancers = compose(
////   window.devToolsExtension ? window.devToolsExtension() : f => f
//// );
//const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store = createStore(rootReducer, defaultState, enhancers(applyMiddleware(thunk)));
const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));
export const history = syncHistoryWithStore( browserHistory, store);

//--- Enable Hot Reloading for the reducers ---//
//---------------------------------------------//
if(module.hot) {
  module.hot.accept('./reducers/combinedReducer', () => {
    const nextRootReducer = require('./reducers/combinedReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;