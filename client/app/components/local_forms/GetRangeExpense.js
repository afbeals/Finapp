import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {required, email,length,numericality} from 'redux-form-validators';

let options = [{value:"",label:"Select A Month"},{value:1,label:"january"},{value:2,label:"february"},{value:3,label:"March"},{value:4,label: "April"},{value:5,label: "May"},{value:6,label: "June"},{value:7,label: "July"},{value:8,label: "August"},{value:9,label: "September"},{value:10,label: "October"},{value:11,label: "November"},{value:12,label: "December"}]

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

const renderSelect = (field) => (
  <label>
  {field.label}
  {field.meta.touched && field.meta.error && 
    <span className="error">{field.meta.active && field.meta.error}</span>}
    <div className="input-row">
    <select {...field.input} >
    {field.option && field.option.map((item,index)=>{return <option key={index} value={item.value}>{item.label}</option>})}
    </select>
    </div>
  </label>
)

const GetRangeExpense = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
        <Field
          name="begMnt"
          component={renderSelect}
          validate={[required(),numericality({'>=':1,'<=':12})]}
          option={options}
        />
        <Field
          name="endMnt"
          component={renderSelect}
          validate={[required(),numericality({'>=':1,'<=':12})]}
          option={options}
        />
        <Field
          name="begDay"
          component={renderField}
          type="number"
          placeholder="Beginning Day"
          
        />
        <Field
          name="endDay"
          component={renderField}
          type="number"
          placeholder="Ending Day"
          
        />
        <Field
          name="year"
          component={renderField}
          type="number"
          placeholder="Year"
          validate={[required(),numericality({'>=':2015}),length({min:4,max:4})]}
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
  form: 'getRangeExpense' // a unique identifier for this form
})(GetRangeExpense)