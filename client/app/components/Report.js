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
			isMobile: false
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
		if(this.state.isMobile){
			return(
				null
			)	
		} else if(!this.state.isMobile) {
			return(
				<div className="report">
					<div className="content">
						<div className="title">
							Reports
						</div>
						<div className="formInteract">
							<GetReport onSubmit={(e)=>{this.generateReport(e)}}/>
						</div>
						<div className="totalExpense">
							<h2>Expense</h2>
							$-100
						</div>
						<div className="totalIncome">
							<h2>Income</h2>
							$200
						</div>
						<div className="net">
							<h2>Net</h2>
							$100
						</div>
						<div className="reportDisplay">
							<table>
								<tbody>
								<tr className="titles"><th>Name:</th><th>Due:</th><th>Paid:</th><th>Month:</th><th>Day:</th><th>Details:</th></tr>
										{
											[...this.props.reports].sort((a,b)=>{return new Date(b.year, b.monthId - 1, b.due_day) - new Date(a.year, a.monthId - 1, a.due_day);}).map((c,i)=>{
														return 	<tr key={i}>
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
							Details/Notes
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