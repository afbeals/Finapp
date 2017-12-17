//--Dependencies--//
import React from 'react';
import {Link} from 'react-router';

export default class Registration extends React.Component {
	constructor(props){
		super(props);
		console.log('registration component',props);
		this.state = {};
		this.updateInput = this.updateInput.bind(this);
		this.submitInput = this.submitInput.bind(this);

		this.testingQuery = this.testingQuery.bind(this);
	}

	updateInput(e){
		const target = e.target;
		const value = e.target.value;
		const name = target.name;

		this.setState({
			...this.state,
			[name]: value
		});
	}

	submitInput(e){
		e.preventDefault();
		console.log('submit',e,this.state);
		//this.props.addExpensesInQuery(this.state);
		this.props.getAllExpenses(1)
	}

	testingQuery(e){
		console.log('starting testing query');
		this.props.testingQuery('passed query');
		e.preventDefault();
	}

	render(){
		return(
			<div>
				Registration Page!
				<ul>
					{
						this.props.expenses.map((c,i)=>{
							return <li key={i}>{c.name},{c.id},{c.amount_due}</li>
						})
					}
				</ul>
				<form onSubmit={this.submitInput}>
					<label htmlFor="regis_firstName">
						First Name
					</label>
					<input type="text" value={this.state.value} onChange={this.updateInput} name="regis_firstName" id="regis_firstName" placeholder="First Name" />
					<label htmlFor="regis_lastName">
						Last Name
					</label>
					<input type="text" value={this.state.value} onChange={this.updateInput} name="regis_lastName" id="regis_lastName" placeholder="Last Name" />
					<label htmlFor="regis_email">
						First Name
					</label>
					<input type="email" value={this.state.value} onChange={this.updateInput} name="regis_email" id="regis_email" placeholder="Email" />
					<label htmlFor="regis_password">
						Password
					</label>
					<input type="password" value={this.state.value} onChange={this.updateInput} name="regis_password" id="regis_password" placeholder="enter password" />


					<input type="submit" value="Submit" />
				</form>

				
			</div>
		)
	}
}