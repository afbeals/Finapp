//--- Dependencies ---//
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers/combinedReducer';

//--- Create Store w/ default state ---//
const defaultState = {
  propName: "value"
};

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk), enhancers);

export const history = syncHistoryWithStore( hashHistory, store);

//--- Enable Hot Reloading for the reducers ---//
if(module.hot) {
  module.hot.accept('./reducers/combinedReducer', () => {
    const nextRootReducer = require('./reducers/combinedReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
