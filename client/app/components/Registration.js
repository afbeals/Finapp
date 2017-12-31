//--Dependencies--//
import React from 'react';

export default class Registration extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
		this.updateInput = this.updateInput.bind(this);
		this.submitInput = this.submitInput.bind(this);
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
		this.props.registerUser({
			first_name: this.state.regis_firstName,
			last_name: this.state.regis_lastName,
			email: this.state.regis_email,
			password:  this.state.regis_password
		});

	}

	render(){
		return(
			<div>
				Registration Page!
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
						Email
					</label>
					<input type="email" value={this.state.value} onChange={this.updateInput} name="regis_email" id="regis_email" placeholder="Email" />
					<label htmlFor="regis_password">
						Password
					</label>
					<input type="password" value={this.state.value} onChange={this.updateInput} name="regis_password" id="regis_password" placeholder="enter password" />
					<label htmlFor="regis_password">
						Password Confirmation
					</label>
					<input type="password" value={this.state.value} onChange={this.updateInput} name="regis_password_confirm" id="regis_password_confirm" placeholder="confirm password" />
					<input type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}