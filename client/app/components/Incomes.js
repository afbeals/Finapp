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
		console.log('exp props',props, this.state);
		this.updateInput = this.updateInput.bind(this);

		this.getAllIncomes = this.getAllIncomes.bind(this);
		this.getAllIncomesInMonth = this.getAllIncomesInMonth.bind(this);
		this.getAllIncomesInRange = this.getAllIncomesInRange.bind(this);
		this.addIncomesInQuery = this.addIncomesInQuery.bind(this);
		this.removeIncomesInQuery = this.removeIncomesInQuery.bind(this);
		this.updateIncomesInfo = this.updateIncomesInfo.bind(this);
		this.sendUpdatedIncomes = this.sendUpdatedIncomes.bind(this);

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
		this.props.getAllIncomes(this.props.user.users_id);
	}

	getAllIncomesInMonth(){
		console.log('exp state', this.state);
		this.props.getAllIncomesInMonth(this.props.user.users_id,this.state.incomes_request_month);
	}

	getAllIncomesInRange(){
		this.props.getAllIncomesInRange({
			users_id: 	this.props.user.users_id,
			begMnt: 	this.state.get_all_incomes_in_range_begMnt,
			endMnt: 	this.state.get_all_incomes_in_range_endMnt,
			begDay: 	this.state.get_all_incomes_in_range_begDay,
			endDay: 	this.state.get_all_incomes_in_range_endDay
		});
	}

	addIncomesInQuery(){
		this.props.addIncomesInQuery({
			users_id: 		this.props.user.users_id,
			name: 			this.state.add_incomes_in_query_name,
			due_day: 		this.state.add_incomes_in_query_due_day,
			amount: 		this.state.add_incomes_in_query_amount,
			notes: 			this.state.add_incomes_in_query_notes,
			monthId: 		this.state.add_incomes_in_query_month,
			id: 			this.state.add_incomes_in_query_month
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
		console.log(this.state.incomesUpdateData);
	};

	sendUpdatedIncomes(){
		this.props.updateIncomesInQuery({
			users_id: this.props.user.users_id,
			...this.state.incomesUpdateData
		})
	}

	updateIsEditing(){
		(this.state.isEditing) ? this.setState({...this.state,isEditing: false}) : this.setState({...this.state,isEditing: true});
	}

	removeIncomesInQuery(inc_id,mnt_id,i){
		this.props.removeIncomesInQuery({
			users_id: this.props.user.users_id,
			id: inc_id,
			months_id: mnt_id,
			index_in_array: i
		})
	}

	render(){
		return(
			<div>
				<h1>Incomes!</h1>
				<div> Current List of Incomes (Update / Delete / View)</div>
				<ul>
					{
						this.props.incomes.map((c,i)=>{
							return 	<li key={i} >
										<span contentEditable="true" suppressContentEditableWarning="true" name="name" onInput={(e)=>this.updateIncomesInfo(e,c.incomesId)}>{c.name}</span>
										,{c.incomesId},
										<span contentEditable="true" suppressContentEditableWarning="true" name="due_day" onInput={(e)=>this.updateIncomesInfo(e,c.incomesId)}>{c.due_day}</span>,
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

										<button onClick={()=>this.removeIncomesInQuery(c.incomesId,c.monthId,i)}>Remove Item</button>
										<button onClick={()=>this.sendUpdatedIncomes()}>Update Item</button>
									</li>
						})
					}
				</ul>
				<button onClick={this.updateIsEditing}>Go Into Editing</button>
				<hr />
				<div>Get All Incomes</div>
				<button onClick={this.getAllIncomes}>Get 'em!</button>
				<hr />
				<div>Get Incomes In Month</div>
				<select value={this.state.incomes_request_month} name="incomes_request_month" id="incomes_request_month" onChange={this.updateInput}>
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
				<button onClick={this.getAllIncomesInMonth}>Get 'em!</button>
				<hr />

				<div>Get Incomes In Range</div>
				<select value={this.state.get_all_incomes_in_range_begMnt} name="get_all_incomes_in_range_begMnt" id="get_all_incomes_in_range_begMnt" onChange={this.updateInput}>
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
				<select value={this.state.get_all_incomes_in_range_endMnt} name="get_all_incomes_in_range_endMnt" id="get_all_incomes_in_range_endMnt" onChange={this.updateInput}>
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
				<label htmlFor="get_all_incomes_in_range_begDay">
					Select Beginning Day
				</label>
				<input type="number" value={this.state.get_all_incomes_in_range_begDay} onChange={this.updateInput} name="get_all_incomes_in_range_begDay" id="get_all_incomes_in_range_begDay" placeholder="enter beginning day" max="31" min="1" />
				<label htmlFor="get_all_incomes_in_range_endDay">
					Select Ending Day
				</label>
				<input type="number" value={this.state.get_all_incomes_in_range_endDay} onChange={this.updateInput} name="get_all_incomes_in_range_endDay" id="get_all_incomes_in_range_endDay" placeholder="enter ending day" max="31" min="1" />
				<button onClick={this.getAllIncomesInRange}>Get 'em!</button>
				<hr />

				<div> Add Income In Query</div>
				<input type="text" value={this.state.add_incomes_in_query_name} onChange={this.updateInput} name="add_incomes_in_query_name" id="add_incomes_in_query_name" placeholder="Enter Income Name" />
				<input type="number" value={this.state.add_incomes_in_query_amount} onChange={this.updateInput} name="add_incomes_in_query_amount" id="add_incomes_in_query_amount" placeholder="Enter Income Amount" min="0.01" step="0.01" />
				<input type="number" value={this.state.add_incomes_in_query_due_day} onChange={this.updateInput} name="add_incomes_in_query_due_day" id="add_incomes_in_query_due_day" placeholder="Enter Income Due Day" max="31" min="1" />
				<input type="text" value={this.state.add_incomes_in_query_notes} onChange={this.updateInput} name="add_incomes_in_query_notes" id="add_incomes_in_query_notes" placeholder="Enter Income Notes" />
				<select value={this.state.add_incomes_in_query_month} name="add_incomes_in_query_month" id="add_incomes_in_query_month" onChange={this.updateInput}>
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
				<button onClick={this.addIncomesInQuery}>Get 'em!</button>
				<hr />
			</div>
		)
	}
}