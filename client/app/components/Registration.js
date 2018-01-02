//--Dependencies--//
import React from 'react';
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
	    <div className="input-row">
	    	<input {...field.input} type={field.type} placeholder={field.placeholder}/>
			{field.meta.touched && field.meta.error && 
			<span className="error">{field.meta.error}</span>}
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
			<div>
				Registration Page!
				<form onSubmit={this.props.handleSubmit(this.submitInput)}>
					<div>
						<Field	
							name="first_name"
							component={renderField}
							type="text"
							placeholder="Joe..."
							validate={[required(),length({min:2, max: 11})]}
							label="First Name"						
						/>
					</div>
					<div>
						<Field	
							name="last_name"
							component={renderField}
							type="text"
							placeholder="Shmoe..."
							validate={[required(),length({min:2, max: 15})]}
							label="Last Name"						
						/>
					</div>
					<div>
						<Field	
							name="email"
							component={renderField}
							type="email"
							placeholder="test@example.com"
							validate={[required(),email(),]}
							label="Email"						
						/>
					</div>
					<div>
						<Field	
							name="password"
							component={renderField}
							type="password"
							placeholder="Secure Password Please"
							validate={[required(),length({min:7, max: 16}),format({ with: /^\w+$/, message: "No Special Characters" })]}
							label="Password"						
						/>
					</div>
					<div>
						<Field	
							name="password_confirm"
							component={renderField}
							type="password"
							placeholder="Confirm Password"
							validate={[required(),confirmation({field: 'password', fieldLabel: 'Password', caseSensitive: true})]}
							label="Confirm Password"						
						/>
					</div>
					<button type="submit" disabled={errors}> Submit </button>
				</form>
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