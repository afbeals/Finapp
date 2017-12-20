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
			get_all_expenses_in_range_begDay: null,
			get_all_expenses_in_range_endDay: null,
			add_expenses_in_query_name: '',
			add_expenses_in_query_due_day: '',
			add_expenses_in_query_amount_due: '',
			add_expenses_in_query_amount_paid: '',
			add_expenses_in_query_notes: '',
			add_expenses_in_query_month: 'none',
			expenseUpdateSelect: '',
			expenseUpdateData: {
				month: 'none'
			},
			isEditing: false
		};
		console.log('exp props',props, this.state);
		this.updateInput = this.updateInput.bind(this);

		this.getAllExpenses = this.getAllExpenses.bind(this);
		this.getAllExpensesInMonth = this.getAllExpensesInMonth.bind(this);
		this.getAllExpensesInRange = this.getAllExpensesInRange.bind(this);
		this.addExpensesInQuery = this.addExpensesInQuery.bind(this);
		this.removeExpensesInQuery = this.removeExpensesInQuery.bind(this);
		this.updateExpenseInfo = this.updateExpenseInfo.bind(this);
		this.sendUpdatedExpense = this.sendUpdatedExpense.bind(this);

		this.updateIsEditing = this.updateIsEditing.bind(this);
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

	addExpensesInQuery(){
		this.props.addExpensesInQuery({
			users_id: 		this.props.user.users_id,
			name: 			this.state.add_expenses_in_query_name,
			due_day: 		this.state.add_expenses_in_query_due_day,
			amount_due: 	this.state.add_expenses_in_query_amount_due,
			amount_paid: 	this.state.add_expenses_in_query_amount_paid,
			notes: 			this.state.add_expenses_in_query_notes,
			monthId: 		this.state.add_expenses_in_query_month,
			id: 			this.state.add_expenses_in_query_month
		})
	}

	updateExpenseInfo(e,id){
		let target 	= e.target,
			value 	= (target.localName == "span") ? target.innerText : target.value,
			name 	= (target.localName == "span") ? target.attributes[1].value : target.name;
		if(target.nodeName != "span") {
			this.setState({
				...this.state,
				expenseUpdateSelect	: {
					...this.state.expenseUpdateSelect,
					['select'+id] : value
				},
				expenseUpdateData: {
				...this.state.expenseUpdateData,
					id:id,
					[name]: value
					
					
				}
			})
		}else{
			this.setState({
				...this.state,
				expenseUpdateData: {
					...this.state.expenseUpdateData,
					id:id,
					[name]: value
					
					
				}
			})	
		}
		console.log(this.state.expenseUpdateData);
	};

	sendUpdatedExpense(){
		this.props.updateExpensesInQuery({
			users_id: this.props.user.users_id,
			...this.state.expenseUpdateData
		})
	}

	updateIsEditing(){
		(this.state.isEditing) ? this.setState({...this.state,isEditing: false}) : this.setState({...this.state,isEditing: true});
	}

	removeExpensesInQuery(exp_id,mnt_id,i){
		this.props.removeExpensesInQuery({
			users_id: this.props.user.users_id,
			id: exp_id,
			months_id: mnt_id,
			index_in_array: i
		})
	}

	render(){
		return(
			<div>
				<h1>Expenses!</h1>
				<div> Current List of Expenses (Update / Delete / View)</div>
				<ul>
					{
						this.props.expenses.map((c,i)=>{
							return 	<li key={i} >
										<span contentEditable="true" suppressContentEditableWarning="true" name="name" onInput={(e)=>this.updateExpenseInfo(e,c.expensesId)}>{c.name}</span>
										,{c.expensesId},
										<span contentEditable="true" suppressContentEditableWarning="true" name="amount_due" onInput={(e)=>this.updateExpenseInfo(e,c.expensesId)}>{c.amount_due}</span>,
										<select value={(this.state.expenseUpdateSelect['select'+c.expensesId]||c.monthId)} name="month" onChange={(e)=>this.updateExpenseInfo(e,c.expensesId)}>
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

										<button onClick={()=>this.removeExpensesInQuery(c.expensesId,c.monthId,i)}>Remove Item</button>
										<button onClick={()=>this.sendUpdatedExpense()}>Update Item</button>
									</li>
						})
					}
				</ul>
				<button onClick={this.updateIsEditing}>Go Into Editing</button>
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
				<div> Add Expense In Query</div>
				<input type="text" value={this.state.add_expenses_in_query_name} onChange={this.updateInput} name="add_expenses_in_query_name" id="add_expenses_in_query_name" placeholder="Enter Expense Name" />
				<input type="number" value={this.state.add_expenses_in_query_due_day} onChange={this.updateInput} name="add_expenses_in_query_due_day" id="add_expenses_in_query_due_day" placeholder="Enter Expense Due Day" max="31" min="1" />
				<input type="number" value={this.state.add_expenses_in_query_amount_due} onChange={this.updateInput} name="add_expenses_in_query_amount_due" id="add_expenses_in_query_amount_due" placeholder="Enter Expense Amount Due" min="0.01" step="0.01" />
				<input type="number" value={this.state.add_expenses_in_query_amount_paid} onChange={this.updateInput} name="add_expenses_in_query_amount_paid" id="add_expenses_in_query_amount_paid" placeholder="Enter Expense Amount Paid" min="0.00" step="0.01" />
				<input type="text" value={this.state.add_expenses_in_query_notes} onChange={this.updateInput} name="add_expenses_in_query_notes" id="add_expenses_in_query_notes" placeholder="Enter Expense Notes" />
				<select value={this.state.add_expenses_in_query_month} name="add_expenses_in_query_month" id="add_expenses_in_query_month" onChange={this.updateInput}>
					<option value="none" disabled={true}>Select Expense Month</option>
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
				<button onClick={this.addExpensesInQuery}>Get 'em!</button>
				<hr />
			</div>
		)
	}
}