//--Dependencies--//
//----------------//
import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {required, email,length} from 'redux-form-validators';
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

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
		this.submitInput = this.submitInput.bind(this);
	}

	submitInput(values){
		this.props.loginUser(values);
	}

	render(){
		let {pristine, valid,dirty,invalid} = {...this.props};
		let errors = Object.keys(this.props.formErrors).length;
		return(
			<div>
				Login Page!
				<Link to="/register" >Register!</Link>
				<form onSubmit={this.props.handleSubmit(this.submitInput)}>
					<div>
						<Field
							name="email"
							component={renderField}
							type="email"
							placeholder="Email"
							validate={[email()]}
							label="Email"
						/>
					</div>
			    	<div>
						<Field
							name="password"
							component={renderField}
							type="password"
							placeholder="enter password"
							validate={[required(),length({min:1})]}
							label="Password"
						/>
					</div>
					<div>
						<button type="submit" disabled={errors}> Submit </button>
					</div>
			    </form>
		    </div>
		)
	}
}

Login = reduxForm({
	form: 'login'
})(Login);

Login = connect(
  state => ({
    formValues: getFormValues('login')(state),
    dirty: isDirty('login')(state),
    pristine: isPristine('login')(state),
    valid: isValid('login')(state),
    invalid: isInvalid('login')(state),
    formErrors: getFormSyncErrors('login')(state)
  })
)(Login);

export default Login