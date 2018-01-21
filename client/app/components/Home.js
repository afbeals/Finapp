//--Dependencies--//
//----------------//
import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			totalExpenseRemaining: null,
			totalExpensePaid: null,
			totalIncomeRemaining: null,
			totalIncomePaid: null,
			isMobile: false
		};
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
		this.getMonthlies = this.getMonthlies.bind(this);

		this.getMonthlies();
	}

	getMonthlies(){
		let date = new Date(),
				curMonthId = date.getMonth() + 1,
				curYear = date.getFullYear();
		this.props.getAllExpensesInMonth(Number(this.props.user.user_id),Number(curMonthId),Number(curYear));
		this.props.getAllIncomesInMonth(Number(this.props.user.user_id),Number(curMonthId),Number(curYear));
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
				totalExpenseRemaining = 0,
				totalIncome =  0,
				totalIncomeRemaining = 0;
		if(this.state.isMobile){
			return(
				<div className="home">
					<div className="switch">
						<Link className="leftSwitch" activeClassName="active" to="/">
							<p>Home</p>
						</Link>
						<Link className="rightSwitch" activeClassName="active" to="/Profile">
							<p>Profile</p>
						</Link>
					</div>
					<div className="content">
							<table>
								<tbody>
									<tr><th></th><th>Total</th><th>Remain</th></tr>
									<tr className="expenseTotals">
										<td>Expenses</td>
										<td>
											${
												this.props.expenses && 
													this.props.expenses.map((c,i,a)=>{	
														if(i==a.length-1){return totalExpense+=c.amount_due }else{
															totalExpense+=c.amount_due;
														}
													})
											}
										</td>
										<td>
											${
												this.props.expenses && 
													this.props.expenses.map((c,i,a)=>{	
														if(i==a.length-1 && c.due_day > new Date().getDate()){return totalExpenseRemaining+=c.amount_due }else if(c.due_day > new Date().getDate()){
															totalExpenseRemaining+=c.amount_due;
														}
													})
											}
										</td>
									</tr>
									<tr className="incomeTotals">
										<td>Incomes</td>
										<td>
											${
												this.props.incomes && 
													this.props.incomes.map((c,i,a)=>{	
														if(i==a.length-1){return totalIncome+=c.amount }else{
															totalIncome+=c.amount;
														}
													})
											}
										</td>
										<td>
											${
												this.props.incomes && 
													this.props.incomes.map((c,i,a)=>{	
														if(i==a.length-1 && c.due_day > new Date().getDate()){return totalIncomeRemaining+=c.amount }else if(c.due_day > new Date().getDate()){
															totalIncomeRemaining+=c.amount;
														}
													})
											}
										</td>
									</tr>
									<tr className="net">
										<td>
											<div>Net</div>
										</td>
										<td colSpan="2">
											{
												this.props.incomes && this.props.expenses &&
													<div>{((totalIncome+(totalExpense * -1)) < 0) ? <span className="neg">${totalIncome+(totalExpense * -1)}</span> : <span className="pos">${totalIncome+(totalExpense * -1)}</span>}</div>
											}
										</td>
									</tr>
								</tbody>
							</table>
					</div>
				</div>
			)	
		} else if(!this.state.isMobile) {
			return(
				<div className="home">
					Home Desk!
				</div>
			)
		}
	}
}