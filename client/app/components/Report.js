//--- Dependencies ---//
//--------------------//
import React from 'react';

//--- Local Forms ---//
//-------------------//
import GetReport from 	'./local_forms/GetReport';

export default class Report extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isMobile: false,
			itemData: {
				
			}
		};
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
		this.generateReport = this.generateReport.bind(this);
		this.passToPanel = this.passToPanel.bind(this);
	}
	generateReport(data){
		this.props.generateReport({
			...data,
			user_id: Number(this.props.user.user_id)
		})
	}
	passToPanel(item){
		this.setState({
			...this.state,
			itemData: {
				...item
			}
		})
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
		let totalExpense = 0,
				totalIncome = 0;
				console.log(this.updateValues);
		if(this.state.isMobile){
			return(
				null
			)	
		} else if(!this.state.isMobile) {
			return(
				<div className="report">
					<div className="content">
						<div className="title">
							<h1>Reports</h1>
						</div>
						<div className="formInteract">
							<GetReport onSubmit={(e)=>{this.generateReport(e)}}/>
						</div>
						<div className="totalExpense">
							<h2>Expense</h2>
							<span>
								${
									this.props.reports && 
										this.props.reports.map((c,i,a)=>{	
											if(i==a.length-1){if(c.type == "exp"){return totalExpense+=c.amount}else{return totalExpense} }else{
												if(c.type == "exp"){totalExpense+=c.amount}
											}
										})
								}
							</span>
						</div>
						<div className="totalIncome">
							<h2>Income</h2>
							<span>
								${
									this.props.reports && 
										this.props.reports.map((c,i,a)=>{	
											if(i==a.length-1){if(c.type == "inc"){return totalIncome+=c.amount}else{return totalIncome} }else{
												if(c.type == "inc"){totalIncome+=c.amount}
											}
										})
								}
							</span>
						</div>
						<div className="net">
							<h2>Net</h2>
							<span>
								{
									this.props.reports &&
										<div>{((totalIncome+(totalExpense * -1)) < 0) ? <span className="neg">${totalIncome+(totalExpense * -1)}</span> : <span className="pos">${totalIncome+(totalExpense * -1)}</span>}</div>
								}
							</span>
						</div>
						<div className="reportDisplay">
							<table>
								<tbody>
								<tr className="titles"><th>Name:</th><th>Due:</th><th>Paid:</th><th>Month:</th><th>Day:</th><th>Details:</th></tr>
										{
											[...this.props.reports].sort((a,b)=>{return new Date(b.year, b.monthId - 1, b.due_day) - new Date(a.year, a.monthId - 1, a.due_day);}).map((c,i)=>{
														return 	<tr key={i} className={c.type}>
																	<td className="name">
																		<span>{c.name}</span>
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
																	<td><span>{c.due_day}{this.getOrdinal(c.due_day)}</span></td>
																	<td className="notes"><button onClick={()=>{this.passToPanel(c)}}>View</button></td>
																</tr>
													})
										}
								</tbody>
							</table>
						</div>
						<div className="details">
							<h3>Details/Notes</h3>
								{	
									(this.state.itemData.type == "exp") &&
										<div> 
											<div className="leftHand">
												<div className="name">
													Name:
													<span>{this.state.itemData.name}</span>
												</div>
												<div className="date">
													Date
													<span>{this.state.itemData.month} {this.state.itemData.due_day}, {this.state.itemData.year}</span>
												</div>
											</div>
											<div className="rightHand">
												<div className="amountDue">
													Amount Due
													<span>{'$'+this.state.itemData.amount}</span>
												</div>
												<div className="amountPaid">
													Amount Paid
													<span>{'$'+this.state.itemData.amount_paid}</span>
												</div>
											</div>
											<div className="notes">
												{this.state.itemData.notes}
											</div>
										</div>
								}
								{
									(this.state.itemData.type == "inc") &&
										<div>
											<div className="leftHand">
												<div className="name">
													Name:
													<span>{this.state.itemData.name}</span>
												</div>
												<div className="date">
													Date
													<span>{this.state.itemData.month} {this.state.itemData.due_day}, {this.state.itemData.year}</span>
												</div>
											</div>
											<div className="rightHand">
												<div className="amount">
													Amount
													<span>{'$'+this.state.itemData.amount}</span>
												</div>	
											</div>
											<div className="notes">
												{this.state.itemData.notes}
											</div>
										</div>
										
							}
						</div>
						<div className="graph">
							Graph
						</div>
					</div>
				</div>
			)
		}
	}
}