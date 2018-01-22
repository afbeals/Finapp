//--- Dependencies ---//
//--------------------//
import React from 'react';
import {Link} from 'react-router';

//--- Local Forms ---//
//-------------------//
import GetRangeIncome from 	'./local_forms/GetRangeIncome';
import GetMonthIncome from 	'./local_forms/GetMonthIncome';
import AddIncome from 	'./local_forms/AddIncome';
import GenerateReport from 		'./local_forms/GenerateReport';
import UpdateIncomeData from './local_forms/UpdateIncomeData';

export default class Incomes extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			incomesUpdateSelect: '',
			updateIncomeData: {},
			incomeseUpdateData: {
				month: 'none'
			},
			isEditing: false
		};
		this.getAllIncomes = this.getAllIncomes.bind(this);
		this.getAllIncomesInMonth = this.getAllIncomesInMonth.bind(this);
		this.getAllIncomesInRange = this.getAllIncomesInRange.bind(this);
		this.addIncomesInQuery = this.addIncomesInQuery.bind(this);
		this.removeIncomesInQuery = this.removeIncomesInQuery.bind(this);
		this.updateIncomesInfo = this.updateIncomesInfo.bind(this);
		this.sendUpdatedIncomes = this.sendUpdatedIncomes.bind(this);
		this.displayItemUpdateButtons = this.displayItemUpdateButtons.bind(this);
		this.displayItemNotes = this.displayItemNotes.bind(this);
		this.displayOptions = this.displayOptions.bind(this);
		this.displayForm = this.displayForm.bind(this);
		this.generateReport = this.generateReport.bind(this);
		this.passToPanel = this.passToPanel.bind(this);
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);

		this.updateIsEditing = this.updateIsEditing.bind(this);

		this.clearIncomes();
	}
	clearIncomes(){
		this.props.clearIncomes();
	}
	getAllIncomes(){
		this.props.getAllIncomes(Number(this.props.user.user_id));
		this.props.clearReport();
	}
	getAllIncomesInMonth(data){
		this.props.getAllIncomesInMonth(Number(this.props.user.user_id),Number(data.month),Number(data.year));
		this.props.clearReport();
	}
	getAllIncomesInRange(data){
		this.props.getAllIncomesInRange({
			...data,
			user_id: 	Number(this.props.user.user_id)
		});
		this.props.clearReport();
	}
	addIncomesInQuery(data){
		this.props.addIncomesInQuery({
			...data,
			due_day:			Number(data.due_day),
			amount:				Number(data.amount),
			user_id: 			Number(this.props.user.user_id),
			id: 				Number(data.month)
		});
	}
	generateReport(data){
		this.props.generateReport({
			...data,
			user_id: Number(this.props.user.user_id)
		})
	}
	updateIncomesInfo(e,id){
		let target 	= e.target,
			value 	= (target.localName == "span") ? target.innerText : target.value,
			name 	= (target.localName == "span") ? target.attributes[1].value : target.name;
		if(target.nodeName != "span") {
			this.setState({
				...this.state,
				incomesUpdateSelect	: {
					...this.state.incomesUpdateSelect,
					['select'+id] : value
				},
				incomesUpdateData: {
				...this.state.incomesUpdateData,
					id:id,
					[name]: value
					
					
				}
			})
		}else{
			this.setState({
				...this.state,
				incomesUpdateData: {
					...this.state.incomesUpdateData,
					id:id,
					[name]: value
					
					
				}
			})	
		}
	};
	sendUpdatedIncomes(data){
		this.props.updateIncomesInQuery({
			user_id: Number(this.props.user.user_id),
			...data
		})
	}
	updateIsEditing(){
		(this.state.isEditing) ? this.setState({...this.state,isEditing: false}) : this.setState({...this.state,isEditing: true});
	}
	removeIncomesInQuery(inc_id,mnt_id,i){
		this.props.removeIncomesInQuery({
			user_id: this.props.user.user_id,
			id: inc_id,
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
			updateIncomeData: {
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
		(window.innerWidth < 768) ? 
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
		let totalIncomes = 0;
		if(this.state.isMobile){
			return(
				<div className="incomes">
					<div className="switch">
						<Link className="leftSwitch active" activeClassName="active" to="/incomes">
							<p>incomes</p>
						</Link>
						<div className="optionsSwitch">
							<div onClick={this.displayOptions} className="optionsActivator"><i className="fas fa-cog"></i></div>
							<div className="options">
								<div className="actionButtons">
									<button onClick={this.getAllIncomes}>Get All</button>
									<button onClick={this.displayForm} data-form-name="getRange">Range</button>
									<button onClick={this.displayForm} data-form-name="getMonth">Month</button>
									<button onClick={this.displayForm} data-form-name="add">Add</button>
									<button onClick={this.displayForm} data-form-name="report" className="createReport">Create Report</button>
								</div>
								<div className="actionInfo">
									<div className="getRange">
										<p>Get All Incomes In Range</p>
										<GetRangeIncome onSubmit={(e)=>{this.getAllIncomesInRange(e)}} />
									</div>
									<div className="getMonth">
										<p>Get All Incomes In Month</p>
										<GetMonthIncome onSubmit={(e)=>{this.getAllIncomesInMonth(e)}} />
									</div>
									<div className="add">
										<p>Add Income</p>
										<AddIncome onSubmit={(e)=>{this.addIncomesInQuery(e)}} />
									</div>
									<div className="report">
										<p> GenerateReport</p>
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
									(this.props.reports.length < 1) ? (<tr className="titles"><th>Name:</th><th>Amount:</th><th>Month:</th><th>Day:</th><th>Notes:</th></tr>) : (<tr className="titles"><th>Name:</th><th>Due:</th><th>Paid:</th><th>Month:</th><th>Notes:</th></tr>)
								}	
								{
									(this.props.reports.length < 1) ? (
										[...this.props.incomes].sort((a,b)=>{return new Date(b.year, b.monthId - 1, b.due_day) - new Date(a.year, a.monthId - 1, a.due_day);}).map((c,i)=>{
											return 	<tr key={i}>
														<td className="name">
															<div className="updatesWrapper" onClick={this.displayItemUpdateButtons}>
																<i className="fas fa-pen-square"></i>
																<div className="itemUpdateButtons">
																	<button onClick={()=>this.removeIncomesInQuery(c.incomesId,c.monthId,i)}>Remove Item</button>
																	<button onClick={()=>this.sendUpdatedIncomes(this.state.incomesUpdateData)}>Update Item</button>
																</div>
															</div>
															<span contentEditable="true" suppressContentEditableWarning="true" name="name" onInput={(e)=>this.updateIncomesInfo(e,c.incomesId)}>{c.name}</span>
														</td>
														<td> 
															<span contentEditable="true" suppressContentEditableWarning="true" name="amount" onInput={(e)=>this.updateIncomesInfo(e,c.incomesId)}>${c.amount}</span>
														</td>
														<td>
															<select value={(this.state.incomesUpdateSelect['select'+c.incomesId]||c.monthId)} name="month" onChange={(e)=>this.updateIncomesInfo(e,c.incomesId)}>
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
														<td><span contentEditable="true" suppressContentEditableWarning="true" name="due_day" onInput={(e)=>this.updateIncomesInfo(e,c.incomesId)}>{c.due_day}</span></td>
														<td className="notes"><button onClick={this.displayItemNotes}>View</button><span contentEditable="true" suppressContentEditableWarning="true" name="notes" onInput={(e)=>this.updateIncomesInfo(e,c.incomesId)}>{c.notes}</span></td>
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
															<span>{c.monthId}</span>
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
				<div className="incomes">
					<div className="optionsSwitch">
					</div>
					<div className="quickInfo">
						<div className="leftQuickInfo">
							<div className="innerWrapper">
								<h2>Next Income Date</h2>
								<div className="nextIncomeData">
										{
											this.props.incomes.sort((a,b)=>{return new Date(b.year, b.monthId - 1, b.due_day) - new Date(a.year, a.monthId - 1, a.due_day);}).filter((item)=>{return item.due_day >= new Date().getDate() && item.monthId >= new Date().getMonth()+1 }).map((c,i,a)=>{if(i==a.length-1){return <div key={i}>{c.monthName} {c.due_day}{this.getOrdinal(c.due_day)}, {c.year}</div>}})
										}
								</div>
							</div>
						</div>
						<div className="midQuickInfo">
							<div className="innerWrapper">
							 	<h1>Incomes</h1>
							</div>
						</div>
						<div className="rightQuickInfo">
							<div className="innerWrapper">
								<h2>Total Incomes</h2>
								<div className="totalIncomesData">
										${
											this.props.incomes.map((c,i,a)=>{	
												if(i==a.length-1){return totalIncomes+=c.amount }else{
													totalIncomes+=c.amount;
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
								<button className="leftInteractAll" onClick={this.getAllIncomes}>Get All</button>
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
							<h2>Income List</h2>
							<table>
								<tbody>
								<tr className="titles"><th>Name:</th><th>Amount:</th><th>Month:</th><th>Day:</th><th>Details:</th></tr>
									{
										[...this.props.incomes].sort((a,b)=>{return new Date(b.year, b.monthId - 1, b.due_day) - new Date(a.year, a.monthId - 1, a.due_day);}).map((c,i)=>{
													return 	<tr key={i}>
																<td className="name">
																	<span>{c.name}</span>
																</td>
																<td> 
																	<span>${c.amount}</span>
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
										<h3>Update Incomes</h3>
										{this.state.updateIncomeData && <UpdateIncomeData  onSubmit={(e)=>{this.sendUpdatedIncomes(e)}} {...this.state.updateIncomeData} />}
									</div>
									<div className="getRange">
										<h3>Get All Incomes In Range</h3>
										<GetRangeIncome onSubmit={(e)=>{this.getAllIncomesInRange(e)}} />
									</div>
									<div className="getMonth">
										<h3>Get All Incomes In Month</h3>
										<GetMonthIncome onSubmit={(e)=>{this.getAllIncomesInMonth(e)}} />
									</div>
									<div className="add">
										<h3>Add Income</h3>
										<AddIncome onSubmit={(e)=>{this.addIncomesInQuery(e)}} />
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
