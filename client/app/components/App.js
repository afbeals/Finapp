//--- Import Dependencies for binding actions ---//
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActionCreators from '../actions/userActionCreators';
import * as expensesActionCreators from '../actions/expensesActionCreators';

//--- Components: Everything is in Main - so we import that one ---//

import Main from './Main';
 
//--- Mapping: make state and 'dispatch' functions available to the <Main /> component in props ---//
//--- Specify which state properties needs to be made available to the components props ---//

function mapStateToProps(state) {
	console.log('mapstatetoprops',state);
	return {
		user: state.user,
		expenses: state.expenses
	};
}

//--- Bind actions to dispatch, and make actions available to props ---//
export function mapDispatchToProps(dispatch) {
  return bindActionCreators({...userActionCreators,...expensesActionCreators}, dispatch);
}

//--- Create <App/> to display <Main/> with populated props. connect() it all together ---//
 
var App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
