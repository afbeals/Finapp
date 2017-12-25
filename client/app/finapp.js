//--- Dependencies ---//
console.log('running');
import React from 'react';
import { render } from 'react-dom';
import { Provider }	 from 'react-redux';
import {Router, Route, IndexRoute } from 'react-router';

//--- Components for routing ---//
import App from './components/App';
import SubComponent from './components/SubComponent';
import Registration from './components/Registration';
import Expenses from './components/Expenses';
import Incomes from './components/Incomes';
import Nav from './components/Nav';
import Profile from './components/Profile';

import store, {history} from './store';

render(
	<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Registration} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/incomes" component={Incomes} />
        <Route path="/Profile" component={Profile} />
        <Route path="/view/:username" component={SubComponent} />
      </Route>
    </Router>
  </Provider>,
	document.getElementById('app')
);