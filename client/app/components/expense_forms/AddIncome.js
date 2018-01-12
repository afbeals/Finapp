import React from 'react'
import { Field, reduxForm } from 'redux-form'


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

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
        <Field
                          name="email"
                          component={renderField}
                          type="email"
                          placeholder="Email"
                          //validate={[email()]}
                          label="Email"

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
  form: 'simple' // a unique identifier for this form
})(SimpleForm)