//--- Import Dependencies for binding actions ---//
//-----------------------------------------------//
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActionCreators from '../actions/userActionCreators';
import * as expensesActionCreators from '../actions/expensesActionCreators';
import * as incomesActionCreators from '../actions/incomesActionCreators';
import * as errorActionCreators from '../actions/errorActionCreators';
import * as reportsActionCreators from '../actions/reportsActionCreators';

//--- Components: Everything is in Main - so we import that one ---//
//-----------------------------------------------------------------//

import Main from './Main';
 
//--- Mapping: make state and 'dispatch' functions available to the <Main /> component in props ---//
//--- Specify which state properties needs to be made available to the components props ---//
//-----------------------------------------------------------------------------------------//

function mapStateToProps(state) {
	//console.log('App.js -> mapstatetoprops -> ',state);
	return {
		user: state.user,
		expenses: state.expenses,
		incomes: state.incomes,
		reports: state.reports,
		errors: state.errors
	};
}

//--- Bind actions to dispatch, and make actions available to props ---//
//---------------------------------------------------------------------//
export function mapDispatchToProps(dispatch) {
  return bindActionCreators({...userActionCreators,...expensesActionCreators,...incomesActionCreators, ...errorActionCreators,...reportsActionCreators}, dispatch);
}

//--- Create <App/> to display <Main/> with populated props. connect() it all together ---//
//----------------------------------------------------------------------------------------//
 
var App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
