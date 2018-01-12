import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {required, email,length,numericality} from 'redux-form-validators';

let options = [{value:1,label:"january"},{value:2,label:"february"},{value:3,label:"March"}]

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

const renderSelect = (field) => (
  <label>
  {field.label}
    <div className="input-row">
    <select {...field.input} >
    {field.option && field.option.map((item)=>{return <option value={item.value}>{item.label}</option>})}
    </select>
    {field.meta.touched && field.meta.error && 
    <span className="error">{field.meta.error}</span>}
    </div>
  </label>
)

const GetRange = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
        <Field
          name="begMnt"
          component={renderSelect}
          label="Beginning Month"
          validate={[required(),numericality({'>=':0,'<=':12})]}
          option={options}
        >
        </Field>
        <Field
          name="endMnt"
          component={renderField}
          type="select"
          placeholder="Ending Month"
          validate={[required(),numericality({'>=':0,'<=':12})]}
        />
        <Field
          name="begDay"
          component={renderField}
          type="number"
          placeholder="Beginning Day"
          validate={[numericality({'>=':0,'<=':31})]}
        />
        <Field
          name="endDay"
          component={renderField}
          type="number"
          placeholder="Ending Day"
          validate={[numericality({'>=':0,'<=':31})]}
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
  form: 'getRange' // a unique identifier for this form
})(GetRange)