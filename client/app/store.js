//--- Dependencies ---//
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers/combinedReducer';

//--- Create Store w/ default state (should match reducers) ---//
const defaultState = {
  user: {
    users_id:1
  },
  expenses: [],
  incomes: [
  	{
  		"name": "name",
  		"due_day": 1,
  		"amount_paid": 0,
  		"note": "notes"
  	}
  ]


}
// const enhancers = compose(
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// );
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, defaultState, enhancers(applyMiddleware(thunk)));

export const history = syncHistoryWithStore( hashHistory, store);

//--- Enable Hot Reloading for the reducers ---//
if(module.hot) {
  module.hot.accept('./reducers/combinedReducer', () => {
    const nextRootReducer = require('./reducers/combinedReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
