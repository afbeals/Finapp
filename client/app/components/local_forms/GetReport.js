import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {required,length,numericality} from 'redux-form-validators';

let options = [{value:1,label:"january"},{value:2,label:"february"},{value:3,label:"March"},{value:4,label: "April"},{value:5,label: "May"},{value:6,label: "June"},{value:7,label: "July"},{value:8,label: "August"},{value:9,label: "September"},{value:10,label: "October"},{value:11,label: "November"},{value:12,label: "December"}]

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


const GetReport = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  let updateValues = (e) => {
    console.dir(e.target);
    let target = e.target,
        month = document.querySelector('select[name="month"]').value,
        year = document.querySelector('input[name="year"]').value,
        next = null;
    if(target.nodeName.toLowerCase() == "svg"){
      next = target.parentNode.parentNode.dataset.direction;
      
    } else if( target.nodeName.toLowerCase() == "path"){
      next = target.parentNode.parentNode.parentNode.dataset.direction;
      console.dir(target);
    } else if (target.nodeNade.toLowerCase() == "div"){
      next = target.dataset.direction;
    }

    if(next == "ascend"){
      console.log('aefae')
      console.log(month);
      if(month != 12){
        console.log('aera');
        document.querySelector('select[name="month"]').value = Number(document.querySelector('select[name="month"]').value)+1
      } else {
        document.querySelector('select[name="month"]').value = 1;
        document.querySelector('input[name="year"]').value = Number(document.querySelector('input[name="year"]').value)+1

      }  
    } else if( next == "descend"){
      if(month != 1){
        --month 
      } else {
        month = 12;
        --year
      } 
    }
    

  }
  return (
    <form onSubmit={handleSubmit}>
        <div data-direction="descend" onClick={(e)=>{updateValues(e)}}>
          <span>
            <i className="fas fa-angle-left"></i>
          </span>
        </div>
        <Field
          name="month"
          component={renderSelect}
          option={options}
        />
        <Field
          name="year"
          component={renderField}
          type="number"
          placeholder="Year"
        />
       
        <div data-direction="ascend" onClick={(e)=>{updateValues(e)}}>
          <span>
            <i className="fas fa-angle-right"></i>
          </span>
        </div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
    </form>
  )
}

export default reduxForm({
  form: 'getReport' // a unique identifier for this form
})(GetReport)