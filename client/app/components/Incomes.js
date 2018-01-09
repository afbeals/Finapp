//--- Dependencies ---//
//--------------------//
import React from 'react';
import {Link} from 'react-router';

export default class Incomes extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			incomes_request_month: 'none',
			get_all_incomes_in_range_begMnt: 'none',
			get_all_incomes_in_range_endMnt: 'none',
			get_all_incomes_in_range_begDay: null,
			get_all_incomes_in_range_endDay: null,
			add_incomes_in_query_name: '',
			add_incomes_in_query_due_day: '',
			add_incomes_in_query_amount: '',
			add_incomes_in_query_notes: '',
			add_incomes_in_query_month: 'none',
			incomesUpdateSelect: '',
			incomeseUpdateData: {
				month: 'none'
			},
			isEditing: false
		};
		this.updateInput = this.updateInput.bind(this);

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

	getAllIncomes(){
		this.props.getAllIncomes(Number(this.props.user.user_id));
	}

	getAllIncomesInMonth(){
		this.props.getAllIncomesInMonth(this.props.user.user_id,this.state.incomes_request_month);
	}

	getAllIncomesInRange(){
		this.props.getAllIncomesInRange({
			user_id: 	this.props.user.user_id,
			begMnt: 	this.state.get_all_incomes_in_range_begMnt,
			endMnt: 	this.state.get_all_incomes_in_range_endMnt,
			begDay: 	this.state.get_all_incomes_in_range_begDay,
			endDay: 	this.state.get_all_incomes_in_range_endDay
		});
	}

	addIncomesInQuery(){
		this.props.addIncomesInQuery({
			user_id: 		Number(this.props.user.user_id),
			name: 			this.state.add_incomes_in_query_name,
			due_day: 		Number(this.state.add_incomes_in_query_due_day),
			amount: 		Number(this.state.add_incomes_in_query_amount),
			notes: 			this.state.add_incomes_in_query_notes,
			monthId: 		Number(this.state.add_incomes_in_query_month),
			id: 				Number(this.state.add_incomes_in_query_month)
		});
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

	sendUpdatedIncomes(){
		this.props.updateIncomesInQuery({
			user_id: this.props.user.user_id,
			...this.state.incomesUpdateData
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

	render(){
		return(
			<div className="incomes">
				<div className="switch">
  				<Link className="leftSwitch active" activeClassName="active" to="/incomes">
  					<p>incomes</p>
  				</Link>
  				<div className="optionsSwitch">
  					<div onClick={this.displayOptions} className="optionsActivator"><i className="fas fa-cog"></i></div>
  					<div className="options">
  						<div>
  							content
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
							<th>Amount:</th>
							<th>Month:</th>
							<th>Due:</th>
							<th>Notes:</th>
						</tr>
						{
							this.props.incomes.map((c,i)=>{
								return 	<tr key={i}>
													<td className="name">
														<div className="updatesWrapper" onClick={this.displayItemUpdateButtons}>
															<i className="fas fa-pen-square"></i>
															<div className="itemUpdateButtons">
																<button onClick={()=>this.removeIncomesInQuery(c.incomesId,c.monthId,i)}>Remove Item</button>
																<button onClick={()=>this.sendUpdatedIncomes()}>Update Item</button>
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
						}
						</tbody>
					</table>
					<button onClick={this.updateIsEditing}>Go Into Editing</button>
					<hr />
					<div>Get All Incomes</div>
					<button onClick={this.getAllIncomes}>Get 'em!</button>
					<hr />
					<div> Add Income In Query</div>
					<input type="text" value={this.state.add_incomes_in_query_name} onChange={this.updateInput} name="add_incomes_in_query_name" id="add_incomes_in_query_name" placeholder="Enter Income Name" />
					<input type="number" value={this.state.add_incomes_in_query_amount} onChange={this.updateInput} name="add_incomes_in_query_amount" id="add_incomes_in_query_amount" placeholder="Enter Income Amount" min="0.01" step="0.01" />
					<input type="number" value={this.state.add_incomes_in_query_due_day} onChange={this.updateInput} name="add_incomes_in_query_due_day" id="add_incomes_in_query_due_day" placeholder="Enter Income Due Day" max="31" min="1" />
					<input type="text" value={this.state.add_incomes_in_query_notes} onChange={this.updateInput} name="add_incomes_in_query_notes" id="add_incomes_in_query_notes" placeholder="Enter Income Notes" />
					<select value={this.state.add_incomes_in_query_month} name="add_incomes_in_query_month" id="add_incomes_in_query_month" onChange={this.updateInput}>
						<option value="none" disabled={true}>Select Month</option>
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
					<button onClick={this.addIncomesInQuery}>Get 'em!</button>
					<hr />
  			</div>
			</div>
		)
	}
}


//write report function
//sort by newest
//