//--- Dependencies ---//
//--------------------//
import React from 'react';
import {required, email,length,format,confirmation} from 'redux-form-validators';
import { Field, reduxForm } from 'redux-form';

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

const UpdateUser = (props) => {
  const { handleSubmit, pristine, reset, submitting, initialValues } = props;
  return (
    <form onSubmit={handleSubmit}>
        <Field  
          name="first_name"
          component={renderField}
          type="text"
          placeholder={props.first_name}
                 
        />
        <Field  
          name="last_name"
          component={renderField}
          type="text"
          placeholder={props.last_name}
                 
        />
		    <Field  
          name="email"
          component={renderField}
          type="email"
          placeholder={props.email}
                  
        />
       <Field  
          name="password_previous"
          component={renderField}
          type="password"
          placeholder="Previous Password"
                 
        />         
		    <Field  
          name="password"
          component={renderField}
          type="password"
          placeholder="Secure Password Please"
                 
        />
        <Field  
          name="password_confirm"
          component={renderField}
          type="password"
          placeholder="Confirm New Password"
             
        />
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
    </form>
  )
}

export default reduxForm({
  form: 'updateUser' // a unique identifier for this form
})(UpdateUser)

//amount add min="0.01" & step="0.01"