//--- Dependencies ---//
//--------------------//
import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class MobileFooter extends React.Component{
	constructor(props){
		super(props);
		this.switchActivator = this.switchActivator.bind(this);
	}

	switchActivator(e){
		let target = e.target,
				next = target.parentNode.parentNode;
		(next.classList.contains('active')) ? next.classList.remove('active') : next.classList.add('active');
	}

	render(){
		return (
			<nav className="footer">
				<div className="activatorWrapper "><div id="activator" onClick={this.switchActivator}></div><i className="fas fa-caret-down"></i></div>
				<IndexLink className="home" activeClassName="active" to="/">Home</IndexLink>
				<Link activeClassName="active" className="finances" to="/finances">Finances</Link>
				<Link to="/" className="logout" onClick={this.props.logOutUser}>Logout</Link>
			</nav>
		)
	}
}

