//--Dependencies--//
import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {required, email,length,format,confirmation} from 'redux-form-validators';
import {
		Field, 
		reduxForm,
		getFormValues,
		isDirty,
  	isPristine,
		isValid,
		isInvalid,
		getFormSyncErrors
	} from 'redux-form';

const renderField = (field) => (
  <label>
  {field.label}
  {field.meta.touched && field.meta.error && 
    <span className="error">{field.meta.active && field.meta.error}</span>}
    <div className="input-row">
      <input {...field.input} type={field.type} placeholder={field.placeholder}/>
    </div>
  </label>
)

class Registration extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
		this.submitInput = this.submitInput.bind(this);
	}


	submitInput(values){
		this.props.registerUser(values)
	}

	render(){
		let {pristine,valid,dirty,invalid} = {...this.props};
		let errors = Object.keys(this.props.formErrors).length;
		return(
			<div className="main">
				<div className="register">
					<div className="switch">
						<Link className="leftSwitch" activeClassName="active" to="/login">
							<p>Login</p>
						</Link>
						<Link className="rightSwitch" activeClassName="active" to="/register">
							<p>Register</p>
						</Link>
					</div>
					<div className="content">
						<form onSubmit={this.props.handleSubmit(this.submitInput)}>
							<div>
								<Field	
									name="first_name"
									component={renderField}
									type="text"
									placeholder="Joe..."
									validate={[required(),length({min:2, max: 11})]}				
								/>
							</div>
							<div>
								<Field	
									name="last_name"
									component={renderField}
									type="text"
									placeholder="Shmoe..."
									validate={[required(),length({min:2, max: 15})]}				
								/>
							</div>
							<div>
								<Field	
									name="email"
									component={renderField}
									type="email"
									placeholder="test@example.com"
									validate={[required(),email(),]}					
								/>
							</div>
							<div>
								<Field	
									name="password"
									component={renderField}
									type="password"
									placeholder="Secure Password Please"
									validate={[required(),length({min:7, max: 16}),format({ with: /^\w+$/, message: "No Special Characters" })]}				
								/>
							</div>
							<div>
								<Field	
									name="password_confirm"
									component={renderField}
									type="password"
									placeholder="Confirm Password"
									validate={[required(),confirmation({field: 'password', fieldLabel: 'Password', caseSensitive: true})]}			
								/>
							</div>
							<button type="submit" disabled={errors}> Submit </button>
							<Link to="/login">Login</Link>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

Registration = reduxForm({
	form: 'registration'
})(Registration);

Registration = connect(
  state => ({
    formValues: getFormValues('registration')(state),
    dirty: isDirty('registration')(state),
    pristine: isPristine('registration')(state),
    valid: isValid('registration')(state),
    invalid: isInvalid('registration')(state),
    formErrors: getFormSyncErrors('registration')(state)
  })
)(Registration);

export default Registration