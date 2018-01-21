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
    <select {...field.input} value={selectedMonth} >
    {field.option && field.option.map((item,index)=>{return <option key={index} value={item.value}>{item.label}</option>})}
    </select>
    </div>
  </label>
)
let selectedMonth = null
const UpdateIncome = props => {
  const { handleSubmit, pristine, reset, submitting, initialValues } = props
  selectedMonth = props.monthId;
  return (
    <form onSubmit={handleSubmit}>
        <Field
          name="name"
          component={renderField}
          placeholder={props.name}
		      type="text"
          validate={[required(),length({ min: 3, max: 45 })]}
        />
        <Field
          name="due_day"
          component={renderField}
          type="number"
          placeholder={props.due_day}
          validate={[required(),numericality({'>=':1,'<=':31})]}
        />
		<Field
          name="amount_due"
          component={renderField}
          type="number"
          placeholder={props.amount_due}
          validate={[required()]}
        />
		  <Field
          name="amount_paid"
          component={renderField}
          type="number"
          placeholder={props.amount_paid}
          validate={[required()]}
        />
        <Field
          name="notes"
          component={renderField}
          type="text"
          placeholder={props.notes}
          validate={[length({ max: 300 })]}
        />
        <Field
          name="monthId"
          component={renderSelect}
          value={props.monthId}
          validate={[required(),numericality({'>=':1,'<=':12})]}
          option={options}
        >
        </Field>
        <Field
          name="year"
          component={renderField}
          type="number"
          placeholder={props.year}
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
  form: 'updateIncome' // a unique identifier for this form
})(UpdateIncome)

//amount add min="0.01" & step="0.01"