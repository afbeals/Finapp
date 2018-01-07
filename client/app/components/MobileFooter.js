//--- Dependencies ---//
//--------------------//
import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class MobileFooter extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<nav className="footer">
					<button className="home"><IndexLink activeClassName="active" to="/" activeStyle={{color: 'pink'}}>Home</IndexLink></button>
					<button className="finances"><Link activeClassName="active" to="/finances" activeStyle={{color: 'pink'}}>Finances</Link></button>
					<button className="logout"><Link to="/" onClick={this.props.logOutUser}>Logout</Link></button>
			</nav>
		)
	}
}

