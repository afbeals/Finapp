//--- Dependencies ---//
//--------------------//
import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class SidePanel extends React.Component{
	constructor(props){
		super(props);
		this.togglePanel = this.togglePanel.bind(this);
	}

	togglePanel(){
		let sidePanel = document.querySelector('.sidePanel');
		(sidePanel.classList.contains('active')) ? sidePanel.classList.remove('active') : sidePanel.classList.add('active')
	}

	render(){
		if(this.props.user.authenticated){
			return (
				<div className="sidePanel">
					<div className="heading">
						<h1>FinApp</h1>
						<div className="close" onClick={this.togglePanel}>
							<i className="fas fa-window-close"></i>
						</div>
					</div>
					<ul>
						<li>
							<IndexLink className="home" activeClassName="active" to="/">
								<i className="fas fa-home"></i>
								<span>Home</span>
							</IndexLink>
						</li>
						<li>
							<Link className="profile" activeClassName="active" to="/profile">
								<i className="fas fa-user"></i>
								<span>Profile</span>
							</Link>
						</li>
						<li>
							<Link className="incomes" activeClassName="active" to="/incomes">
								<i className="far fa-money-bill-alt"></i>
								<span>Income</span>
							</Link>
						</li>
						<li>
							<Link className="expenses" activeClassName="active" to="/expenses">
								<i data-fa-transform="flip-h" className="fas fa-outdent"></i>
								<span>Expense</span>
							</Link>
						</li>
						<li>
							<Link className="report" activeClassName="active" to="/report">
								<i className="fas fa-list-alt"></i>
								<span>Report</span>
							</Link>
						</li>
					</ul>
					<div className="footing">
						<Link to="/" onClick={this.props.logOutUser}>
							<i className="fas fa-sign-out-alt"></i>
							<span>Logout</span>
						</Link>
					</div>
					<div className="open" onClick={this.togglePanel}>
						<i className="fas fa-bars"></i>
					</div>
				</div>
			)	
		} else {
			return (
				null
			)
		}
	}
}

