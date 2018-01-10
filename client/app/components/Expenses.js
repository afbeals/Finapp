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
		this.updateInput = this.updateInput.bind(this);

		this.getAllExpenses = this.getAllExpenses.bind(this);
		this.getAllExpensesInMonth = this.getAllExpensesInMonth.bind(this);
		this.getAllExpensesInRange = this.getAllExpensesInRange.bind(this);
		this.addExpensesInQuery = this.addExpensesInQuery.bind(this);
		this.removeExpensesInQuery = this.removeExpensesInQuery.bind(this);
		this.updateExpenseInfo = this.updateExpenseInfo.bind(this);
		this.sendUpdatedExpense = this.sendUpdatedExpense.bind(this);
		this.displayItemUpdateButtons = this.displayItemUpdateButtons.bind(this);
		this.displayItemNotes = this.displayItemNotes.bind(this);
		this.displayOptions = this.displayOptions.bind(this);
		this.displayForm = this.displayForm.bind(this);

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
		this.props.getAllExpenses(Number(this.props.user.user_id));
	}

	getAllExpensesInMonth(){
		this.props.getAllExpensesInMonth(Number(this.props.user.user_id),Number(this.state.expense_request_monthId));
	}

	getAllExpensesInRange(){
		this.props.getAllExpensesInRange({
			user_id: 	Number(this.props.user.user_id),
			begMnt: 	Number(this.state.get_all_expenses_in_range_begMnt),
			endMnt: 	Number(this.state.get_all_expenses_in_range_endMnt),
			begDay: 	Number(this.state.get_all_expenses_in_range_begDay),
			endDay: 	Number(this.state.get_all_expenses_in_range_endDay)
		});
	}

	addExpensesInQuery(){
		this.props.addExpensesInQuery({
			user_id: 			Number(this.props.user.user_id),
			name: 				this.state.add_expenses_in_query_name,
			due_day: 			Number(this.state.add_expenses_in_query_due_day),
			amount_due: 	Number(this.state.add_expenses_in_query_amount_due),
			amount_paid: 	Number(this.state.add_expenses_in_query_amount_paid),
			notes: 				this.state.add_expenses_in_query_notes,
			monthId: 			Number(this.state.add_expenses_in_query_month),
			id: 					Number(this.state.add_expenses_in_query_month)
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
	};

	sendUpdatedExpense(){
		this.props.updateExpensesInQuery({
			user_id: this.props.user.user_id,
			...this.state.expenseUpdateData
		})
	}

	updateIsEditing(){
		(this.state.isEditing) ? this.setState({...this.state,isEditing: false}) : this.setState({...this.state,isEditing: true});
	}

	removeExpensesInQuery(exp_id,mnt_id,i){
		this.props.removeExpensesInQuery({
			user_id: this.props.user.user_id,
			id: exp_id,
			months_id: mnt_id,
			index_in_array: i
		})
	}

	displayItemUpdateButtons(e){
		let target = e.target,
				next = (target.nodeName == "path") ?  target.parentNode.parentNode.childNodes[2] : target.parentNode.childNodes[2];	
		(next.classList.contains("active")) ? next.classList.remove("active") : next.classList.add("active");
	}

	displayItemNotes(e){
		let target = e.target,
				next = target.nextSibling;
		(next.classList.contains("active")) ? next.classList.remove("active") : next.classList.add("active")
	}

	displayOptions(e){
		let target= e.target,
				parent = null,
				next = null;
				(target.nodeName == "path") ?  (parent = target.parentNode.parentNode.parentNode,next = parent.childNodes[1]) : (parent = target.parentNode.parentNode, next = parent.childNodes[1]);	
				(next.classList.contains("active")) ? (parent.childNodes[0].classList.remove("active"),next.classList.remove("active")) : (parent.childNodes[0].classList.add("active"),next.classList.add("active"));
	}

	displayForm(e){
		let target = e.target,
				next = target.dataset.formName,
				form = document.querySelector('div.'+next);
				document.querySelectorAll('.switch .optionsSwitch .options .actionButtons button').forEach((c,i,a)=>{
					c.classList.remove('active');
				})
				document.querySelectorAll('.switch .optionsSwitch .options .actionInfo > div').forEach((c,i,a)=>{
					c.classList.remove('active');
				})
				target.classList.add("active");
				form.classList.add("active");
	}

	render(){
		return(
			<div className="expenses">
				<div className="switch">
  				<Link className="leftSwitch" activeClassName="active" to="/incomes">
  					<p>incomes</p>
  				</Link>
  				<div className="optionsSwitch">
  					<div onClick={this.displayOptions} className="optionsActivator"><i className="fas fa-cog"></i></div>
  					<div className="options">

  							<div className="actionButtons">
  								<button onClick={this.getAllExpenses}>Get All</button>
  								<button onClick={this.displayForm} data-form-name="getRange">Range</button>
  								<button onClick={this.displayForm} data-form-name="getMonth">Month</button>
  								<button onClick={this.displayForm} data-form-name="add">Add</button>
  								<button onClick={this.displayForm} data-form-name="report" className="createReport">Create Report</button>
  							</div>
  							<div className="actionInfo">
  								<div className="getRange">
  									<p>Get All Expenses In Range</p>
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
										<input type="number" value={this.state.get_all_expenses_in_range_begDay} onChange={this.updateInput} name="get_all_expenses_in_range_begDay" id="get_all_expenses_in_range_begDay" placeholder="enter beginning day" max="31" min="1" />
										<input type="number" value={this.state.get_all_expenses_in_range_endDay} onChange={this.updateInput} name="get_all_expenses_in_range_endDay" id="get_all_expenses_in_range_endDay" placeholder="enter ending day" max="31" min="1" />
										<button onClick={this.getAllExpensesInRange}>Submit</button>
  								</div>
  								<div className="getMonth">
  									<p>Get All Expenses In Month</p>
  									<select value={this.state.expense_request_monthId} name="expense_request_monthId" id="expense_request_monthId" onChange={this.updateInput}>
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
										<button onClick={this.getAllExpensesInMonth}>Submit</button>
  								</div>
  								<div className="add">
  									<p>Add Expense</p>
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
  								</div>
  								<div className="report">

  								</div>
  							</div>
  						</div>

  				</div>
  				<Link className="rightSwitch" activeClassName="active" to="/expenses">
  					<p>expenses</p>
  				</Link>
  			</div>
  			<div className="content">
					<table>
						<tbody>
						<tr className="titles">
							<th>Name:</th>
							<th>Amount Due:</th>
							<th>Amount Paid:</th>
							<th>Month:</th>
							<th>Due:</th>
							<th>Notes:</th>
						</tr>
						{
							this.props.expenses.map((c,i)=>{
								return 	<tr key={i}>
													<td className="name">
														<div className="updatesWrapper" onClick={this.displayItemUpdateButtons}>
															<i className="fas fa-pen-square"></i>
															<div className="itemUpdateButtons">
																<button onClick={()=>this.removeExpensesInQuery(c.expensesId,c.monthId,i)}>Remove Item</button>
																<button onClick={()=>this.sendUpdatedExpense()}>Update Item</button>
															</div>
														</div>
														<span contentEditable="true" suppressContentEditableWarning="true" name="name" onInput={(e)=>this.updateExpenseInfo(e,c.expensesId)}>{c.name}</span>
													</td>
													<td> 
														<span contentEditable="true" suppressContentEditableWarning="true" name="amount_due" onInput={(e)=>this.updateExpenseInfo(e,c.expensesId)}>${c.amount_due}</span>
													</td>
													<td> 
														<span contentEditable="true" suppressContentEditableWarning="true" name="amount_paid" onInput={(e)=>this.updateExpenseInfo(e,c.expensesId)}>${c.amount_paid}</span>
													</td>
													<td>
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
													</td>
													<td><span contentEditable="true" suppressContentEditableWarning="true" name="due_day" onInput={(e)=>this.updateExpenseInfo(e,c.expensesId)}>{c.due_day}</span></td>
													<td className="notes"><button onClick={this.displayItemNotes}>View</button><span contentEditable="true" suppressContentEditableWarning="true" name="notes" onInput={(e)=>this.updateExpenseInfo(e,c.expensesId)}>{c.notes}</span></td>
												</tr>
							})
						}
						</tbody>
					</table>
  			</div>
			</div>
		)
	}
}