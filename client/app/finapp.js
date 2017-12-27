//--- Dependencies ---//
//--------------------//
import React from 'react';
import { render } from 'react-dom';
import { Provider }	 from 'react-redux';
import {Router, Route, IndexRoute } from 'react-router';

//--- Components for routing ---//
import App from './components/App';
import Registration from './components/Registration';
import Expenses from './components/Expenses';
import Incomes from './components/Incomes';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Home from './components/Home';
import Login from './components/Login';

import store, {history} from './store';

let rootElement = document.getElementById('app');

render(
	<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/incomes" component={Incomes} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="register" component={Registration} />
      </Route>
    </Router>
  </Provider>,
	rootElement
);