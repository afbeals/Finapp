//--- Dependencies ---//
//--------------------//
import React from 'react';
import {Link} from 'react-router';

//--- Local Forms ---//
//-------------------//
import GetRangeExpense from 	'./local_forms/GetRangeExpense';
import GetMonthExpense from 	'./local_forms/GetMonthExpense';
import AddExpense from 				'./local_forms/AddExpense';
import GenerateReport from 		'./local_forms/GenerateReport';
import UpdateExpenseData from './local_forms/UpdateExpenseData';

export default class Expenses extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			expenseUpdateSelect: '',
			updateExpenseData: {},
			expenseUpdateData: {
				month: 'none'
			},
			isEditing: false,
			isMobile: false
		};
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
		this.generateReport = this.generateReport.bind(this);
		this.passToPanel = this.passToPanel.bind(this);
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);

		this.updateIsEditing = this.updateIsEditing.bind(this);

		this.clearExpenses();
	}

	clearExpenses(){
		this.props.clearExpenses();
	}

	getAllExpenses(){
		this.props.getAllExpenses(Number(this.props.user.user_id));
		this.props.clearReport();
	}
	getAllExpensesInMonth(data){
		this.props.getAllExpensesInMonth(Number(this.props.user.user_id),Number(data.month),Number(data.year));
		this.props.clearReport();
	}
	getAllExpensesInRange(data){
		this.props.getAllExpensesInRange({
			...data,
			user_id: 	Number(this.props.user.user_id)
		});
		this.props.clearReport();
	}
	addExpensesInQuery(data){
		this.props.addExpensesInQuery({
			...data,
			due_day: 			Number(data.due_day),
			amount_due: 	Number(data.amount_due),
			amount_paid: 	Number(data.amount_paid),
			user_id: 			Number(this.props.user.user_id),
			id: 					Number(data.monthId)
		})
	}
	generateReport(data){
		this.props.generateReport({
			...data,
			user_id: Number(this.props.user.user_id)
		})
	}	
	updateExpenseInfo(e,id){
		let target 	= e.target,
			value 	= (target.localName.toLowerCase() == "span") ? target.innerText : target.value,
			name 	= (target.localName.toLowerCase() == "span") ? target.attributes[1].value : target.name;
		if(target.nodeName.toLowerCase() != "span") {
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
	sendUpdatedExpense(data){
		this.props.updateExpensesInQuery({
			user_id: this.props.user.user_id,
			...data
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
	passToPanel(item){
		document.querySelectorAll('.rightMainInfo .innerWrapper .infoSection >div').forEach((c,i,a)=>{
			c.classList.remove('active');
		})
		document.querySelector('.rightMainInfo .innerWrapper .infoSection .notes').classList.add('active');
		this.setState({
			...this.state,
			updateExpenseData: {
				...item
			}
		})
	}
	displayActionPanel(e){
		let target = e.target,
				name = target.dataset.name;
				document.querySelectorAll('.rightMainInfo .innerWrapper .infoSection >div').forEach((c,i,a)=>{
					c.classList.remove('active');
				})
				document.querySelector('.rightMainInfo .innerWrapper .infoSection .'+name).classList.add('active');
	}
	componentWillMount() {
		this.handleWindowSizeChange();
	  window.addEventListener('resize', this.handleWindowSizeChange);
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange = () => {
		(window.innerWidth < 991) ? 
	  this.setState({ ...this.state,isMobile:true }) : this.setState({ ...this.state,isMobile:false });
	};
	getOrdinal(num){
		if(num>3 && num<21) return 'th';
	  switch (num % 10) {
	    case 1:  return "st";
	    case 2:  return "nd";
	    case 3:  return "rd";
	    default: return "th";
	  }
	}
	render(){
		let totalExpense = 0;
		if(this.state.isMobile){
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
											<GetRangeExpense onSubmit={(e)=>{this.getAllExpensesInRange(e)}} />
										</div>
										<div className="getMonth">
											<p>Get All Expenses In Month</p>
											<GetMonthExpense onSubmit={(e)=>{this.getAllExpensesInMonth(e)}} />
										</div>
										<div className="add">
											<p>Add Expense</p>
											<AddExpense onSubmit={(e)=>{this.addExpensesInQuery(e)}} />
										</div>
										<div className="report">
											<p>GenerateReport</p>
											<GenerateReport onSubmit={(e)=>{this.generateReport(e)}} />
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
								{
									(this.props.reports.length < 1) ? (<tr className="titles"><th>Name:</th><th>Due:</th><th>Paid:</th><th>Month:</th><th>Day:</th><th>Notes:</th></tr>):(<tr className="titles"><th>Name:</th><th>Due:</th><th>Paid:</th><th>Month:</th><th>Notes:</th></tr>)
								}			
							{
								(this.props.reports.length < 1) ? (
									[...this.props.expenses].sort((a,b)=>{return new Date(b.year, b.monthId - 1, b.due_day) - new Date(a.year, a.monthId - 1, a.due_day);}).map((c,i)=>{
										return 	<tr key={i}>
													<td className="name">
														<div className="updatesWrapper" onClick={this.displayItemUpdateButtons}>
															<i className="fas fa-pen-square"></i>
															<div className="itemUpdateButtons">
																<button onClick={()=>this.removeExpensesInQuery(c.expensesId,c.monthId,i)}>Remove Item</button>
																<button onClick={()=>this.sendUpdatedExpense(this.state.expenseUpdateData)}>Update Item</button>
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
								):(
									this.props.reports.map((c,i)=>{
										return 	<tr key={i}>
													<td className="name">
														<span>{c.type}: {c.name}</span>
													</td>
													<td> 
														<span>${c.amount}</span>
													</td>
													<td> 
														<span>${c.amount_paid}</span>
													</td>
													<td>
														<span>{c.month}</span>
													</td>
													<td className="notes"><button onClick={this.displayItemNotes}>View</button><span>{c.notes}</span></td>
												</tr>
									})				
								)
							}
							</tbody>
						</table>
					</div>
				</div>
			)	
		} else if(!this.state.isMobile) {
			return(
				<div className="expenses">
					<div className="optionsSwitch">
					</div>
					<div className="quickInfo">
						<div className="leftQuickInfo">
							<div className="innerWrapper">
								<h2>Next Expense Date</h2>
								<div className="nextExpenseData">
										{
											this.props.expenses.sort((a,b)=>{return new Date(b.year, b.monthId - 1, b.due_day) - new Date(a.year, a.monthId - 1, a.due_day);}).filter((item)=>{return item.due_day >= new Date().getDate() && item.monthId >= new Date().getMonth()+1 }).map((c,i,a)=>{if(i==a.length-1){return <div key={i}>{c.monthName} {c.due_day}{this.getOrdinal(c.due_day)}, {c.year}</div>}})
										}
								</div>
							</div>
						</div>
						<div className="midQuickInfo">
							<div className="innerWrapper">
							 	<h1>Expenses</h1>
							</div>
						</div>
						<div className="rightQuickInfo">
							<div className="innerWrapper">
								<h2>Total Expenses</h2>
								<div className="totalExpenseData">
										${
											this.props.expenses.map((c,i,a)=>{	
												if(i==a.length-1){return totalExpense+=c.amount_due }else{
													totalExpense+=c.amount_due;
												}
											})
										}

								</div>
							</div>
						</div>
					</div>
					<div className="interact">
						<div className="leftInteract">
							<div className="innerWrapper">
								<div>
									Generate
								</div>
								<button className="leftInteractAll" onClick={this.getAllExpenses}>Get All</button>
								<button className="leftInteractRange" data-name="getRange" onClick={this.displayActionPanel}>Range</button>
								<button className="leftInteractMonth" data-name="getMonth" onClick={this.displayActionPanel}>Month</button>
								<button className="leftInteractAdd" data-name="add" onClick={this.displayActionPanel}>Add</button>
							</div>
						</div>
						<div className="rightInteract">
							<div className="innerWrapper">
								Graph (coming soon)
							</div>
						</div>
					</div>
					<div className="mainInfo">
						<div className="leftMainInfo">
							<div className="innerWrapper">
							<h2>Expense List</h2>
							<table>
								<tbody>
								<tr className="titles"><th>Name</th><th>Due</th><th>Paid</th><th>Month</th><th>Day</th><th>Details</th></tr>
									{
										[...this.props.expenses].sort((a,b)=>{return new Date(b.year, b.monthId - 1, b.due_day) - new Date(a.year, a.monthId - 1, a.due_day);}).map((c,i)=>{
													return 	<tr key={i}>
																<td className="name">
																	<span>{c.name}</span>
																</td>
																<td> 
																	<span>${c.amount_due}</span>
																</td>
																<td> 
																	<span>${c.amount_paid}</span>
																</td>
																<td>
																	<span>{c.monthName}</span>
																</td>
																<td><span>{c.due_day}{this.getOrdinal(c.due_day)}</span></td>
																<td className="notes"><button onClick={()=>{this.passToPanel(c)}}>View</button></td>
															</tr>
												})
									}
								</tbody>
							</table>
							</div>
						</div> 
						<div className="rightMainInfo">
							<div className="innerWrapper">
								<h2>Action Panel</h2>
								<div className="infoSection">
									<div className="notes">
										<h3>Update Expense</h3>
										{this.state.updateExpenseData && <UpdateExpenseData  onSubmit={(e)=>{this.sendUpdatedExpense(e)}} {...this.state.updateExpenseData} />}
									</div>
									<div className="getRange">
										<h3>Get All Expenses In Range</h3>
										<GetRangeExpense onSubmit={(e)=>{this.getAllExpensesInRange(e)}} />
									</div>
									<div className="getMonth">
										<h3>Get All Expenses In Month</h3>
										<GetMonthExpense onSubmit={(e)=>{this.getAllExpensesInMonth(e)}} />
									</div>
									<div className="add">
										<h3>Add Expense</h3>
										<AddExpense onSubmit={(e)=>{this.addExpensesInQuery(e)}} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
}