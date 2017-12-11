//--- Dependencies ---//
import React from 'react';
import { render } from 'react-dom';
import { Provider }	 from 'react-redux';
import {Router, Route, IndexRoute } from 'react-router';

//--- Components for routing ---//
import App from './components/App';
import SubComponent from './components/SubComponent';
import Registration from './components/Registration';

import store, {history} from './store';

render(
	<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Registration} />
        <Route path="/view/:username" component={SubComponent} />
      </Route>
    </Router>
  </Provider>,
	document.getElementById('app')
);