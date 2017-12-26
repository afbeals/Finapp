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
				{console.log('test yes!',this.props)}
				<ul>
					<li><IndexLink activeClassName="active" to="/" activeStyle={{color: 'pink'}}>Home</IndexLink></li>
					<li><Link activeClassName="active" to="/incomes" activeStyle={{color: 'pink'}}>Incomes</Link></li>
					<li><Link activeClassName="active" to="/Expenses" activeStyle={{color: 'pink'}}>Expenses</Link></li>
					<li><Link activeClassName="active" to="/Profile" activeStyle={{color: 'pink'}}>Profile</Link></li>
				</ul>
			</div>
		)
	}
}

