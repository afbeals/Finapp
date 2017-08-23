//--- Import Dependencies for binding actions ---//
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

//--- Components: Everything is in Main - so we import that one ---//

import Main from './Main';
 
//--- Mapping: make state and 'dispatch' functions available to the <Main /> component in props ---//
//--- Specify which state needs to be made available to the components ---//

function mapStateToProps(state) {
  return {
    propName: state.propKey
  };
}

//--- Bind actions to dispatch, and make actions availbe to props ---//
export function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

//--- Create <App/> to display <Main/> with populated props. connect() it all together ---//
 
var App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
