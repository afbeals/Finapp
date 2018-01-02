//--- Dependencies ---//
//--------------------//
import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class Nav extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<h1>Navigation</h1>
				<ul>
					<li><IndexLink activeClassName="active" to="/" activeStyle={{color: 'pink'}}>Home</IndexLink></li>
					<li><Link activeClassName="active" to="/incomes" activeStyle={{color: 'pink'}}>Incomes</Link></li>
					<li><Link activeClassName="active" to="/expenses" activeStyle={{color: 'pink'}}>Expenses</Link></li>
					<li><Link activeClassName="active" to="/profile" activeStyle={{color: 'pink'}}>Profile</Link></li>
					<li><Link activeClassName="active" to="/login" activeStyle={{color: 'pink'}}>Login</Link></li>
					<li><Link activeClassName="active" to="/register" activeStyle={{color: 'pink'}}>Register</Link></li>
					<li><Link to="/" onClick={this.props.logOutUser}>Logout</Link></li>
				</ul>
			</div>
		)
	}
}

