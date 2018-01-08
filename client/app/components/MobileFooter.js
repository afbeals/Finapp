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
				<div><i className="fas fa-caret-down"></i></div>
				<IndexLink className="home" activeClassName="active" to="/">Home</IndexLink>
				<Link activeClassName="active" className="finances" to="/finances">Finances</Link>
				<Link to="/" className="logout" onClick={this.props.logOutUser}>Logout</Link>
			</nav>
		)
	}
}

