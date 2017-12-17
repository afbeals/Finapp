//--- Dependencies ---//
//--------------------//
import React from 'react';
import {Link} from 'react-router';

export default class Expenses extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			expense_request_month: 'none',
			get_all_expenses_in_range_begMnt: 'none',
			get_all_expenses_in_range_endMnt: 'none',
			get_all_expenses_in_range_begDay: '',
			get_all_expenses_in_range_endDay: ''
		};
		console.log('exp props',props, this.state);
		this.updateInput = this.updateInput.bind(this);

		this.getAllExpenses = this.getAllExpenses.bind(this);
		this.getAllExpensesInMonth = this.getAllExpensesInMonth.bind(this);
		this.getAllExpensesInRange = this.getAllExpensesInRange.bind(this);
	}

	updateInput(e){
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			...this.state,
			[name]: value
		});
	}

	getAllExpenses(){
		this.props.getAllExpenses(this.props.user.users_id);
	}

	getAllExpensesInMonth(){
		console.log('exp state', this.state);
		this.props.getAllExpensesInMonth(this.props.user.users_id,this.state.expense_request_month);
	}

	getAllExpensesInRange(){
		this.props.getAllExpensesInRange({
			users_id: 	this.props.user.users_id,
			begMnt: 	this.state.get_all_expenses_in_range_begMnt,
			endMnt: 	this.state.get_all_expenses_in_range_endMnt,
			begDay: 	this.state.get_all_expenses_in_range_begDay,
			endDay: 	this.state.get_all_expenses_in_range_endDay
		});
	}

	render(){
		return(
			<div>
				<h1>Expenses!</h1>
				<div> Current List of Expenses</div>
				<ul>
					{
						this.props.expenses.map((c,i)=>{
							return <li key={i}>{c.name},{c.id},{c.amount_due}</li>
						})
					}
				</ul>
				<hr />
				<div>Get All Expenses</div>
				<button onClick={this.getAllExpenses}>Get 'em!</button>
				<hr />
				<div>Get Expenses In Month</div>
				<select value={this.state.expense_request_month} name="expense_request_month" id="expense_request_month" onChange={this.updateInput}>
					<option value="none" disabled={true}>Select A Month</option>
					<option value="1">January</option>
					<option value="2">February</option>
					<option value="3">March</option>
					<option value="4">April</option>
					<option value="5">May</option>
					<option value="6">June</option>
					<option value="7">July</option>
					<option value="8">August</option>
					<option value="9">September</option>
					<option value="10">October</option>
					<option value="11">November</option>
					<option value="12">December</option>
				</select>
				<button onClick={this.getAllExpensesInMonth}>Get 'em!</button>
				<hr />
				<div>Get Expenses In Range</div>
				<select value={this.state.get_all_expenses_in_range_begMnt} name="get_all_expenses_in_range_begMnt" id="get_all_expenses_in_range_begMnt" onChange={this.updateInput}>
					<option value="none" disabled={true}>Select Beg Month</option>
					<option value="1">January</option>
					<option value="2">February</option>
					<option value="3">March</option>
					<option value="4">April</option>
					<option value="5">May</option>
					<option value="6">June</option>
					<option value="7">July</option>
					<option value="8">August</option>
					<option value="9">September</option>
					<option value="10">October</option>
					<option value="11">November</option>
					<option value="12">December</option>
				</select>
				<select value={this.state.get_all_expenses_in_range_endMnt} name="get_all_expenses_in_range_endMnt" id="get_all_expenses_in_range_endMnt" onChange={this.updateInput}>
					<option value="none" disabled={true}>Select End Month</option>
					<option value="1">January</option>
					<option value="2">February</option>
					<option value="3">March</option>
					<option value="4">April</option>
					<option value="5">May</option>
					<option value="6">June</option>
					<option value="7">July</option>
					<option value="8">August</option>
					<option value="9">September</option>
					<option value="10">October</option>
					<option value="11">November</option>
					<option value="12">December</option>
				</select>
				<label htmlFor="get_all_expenses_in_range_begDay">
					Select Beginning Day
				</label>
				<input type="number" value={this.state.get_all_expenses_in_range_begDay} onChange={this.updateInput} name="get_all_expenses_in_range_begDay" id="get_all_expenses_in_range_begDay" placeholder="enter beginning day" max="31" min="1" />
				<label htmlFor="get_all_expenses_in_range_endDay">
					Select Ending Day
				</label>
				<input type="number" value={this.state.get_all_expenses_in_range_endDay} onChange={this.updateInput} name="get_all_expenses_in_range_endDay" id="get_all_expenses_in_range_endDay" placeholder="enter ending day" max="31" min="1" />
				<button onClick={this.getAllExpensesInRange}>Get 'em!</button>
				<hr />
				<div>Update Expenses In Query</div>
				<button onClick={this.updateExpensesInQuery}>Get 'em!</button>
				<hr/>
				<div> Remove Expense In Query</div>
				<button onClick={this.removeExpensesInQuery}>Get 'em!</button>
				<hr />
			</div>
		)
	}
}