//--Dependencies--//
//----------------//
import React from 'react';

export default class Login extends React.Component {
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
		this.props.loginUser({
			email: this.state.login_email,
			password:  this.state.login_password
		});

	}

	render(){
		return(
			<div>
				Login Page!
				{this.props.user.first_name}
				<form onSubmit={this.submitInput}>
					<label htmlFor="login_email">
						Email
					</label>
					<input type="email" value={this.state.value} onChange={this.updateInput} name="login_email" id="login_email" placeholder="Email" />
					<label htmlFor="login_password">
						Password
					</label>
					<input type="password" value={this.state.value} onChange={this.updateInput} name="login_password" id="login_password" placeholder="enter password" />
					<input type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}