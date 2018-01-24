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
import Profile from './components/Profile';
import Home from './components/Home';
import Login from './components/Login';
import Finances from './components/Finances';
import Report from './components/Report';
import HOC_Auth from './components/HOC_Auth';

//import TestIncomes from './components/testIncomes';

import store, {history} from './store';

//--- Include Styles ---//
const css = require('./styles/basic.scss');

let rootElement = document.getElementById('app');

render(
	<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HOC_Auth(Report)} />
        <Route path="/expenses" component={HOC_Auth(Expenses)} />
        <Route path="/incomes" component={HOC_Auth(Incomes)} />
        <Route path="/profile" component={HOC_Auth(Profile)} />
        <Route path="/finances" component={HOC_Auth(Finances)} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/report" component={Report} />
      </Route>
    </Router>
  </Provider>,
	rootElement
);