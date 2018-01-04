module.exports = {
	//--- user validation ---//
	//-----------------------//
	registerUser_rules : {
		first_name: 'required|min:1|max:11',
		last_name: 'required|min:1|max:15',
		email: 'required|email',
		password: 'required|min:7|max:16|alpha_numeric',
		password_confirm: 'required|same:password'
	},
	loginUser_rules : {
		email: 'required|email',
		password: 'required'
	},
	//--- expenses validation ---//
	//---------------------------//
	addExpensesInQuery_rules : {
		user_id : 'required|above:0|integer',
		name: 'required|min:3|max:45',
		due_day: 'required|range:1,31|integer',
		amount_due: 'required|number',
		amount_paid: 'number',
		notes: 'string|max:300',
		monthId: 'required|range:1,12|integer'
	},
	getAllExpenses : {
		user_id : 'required|above:0|integer'
	},
	getAllExpensesInMonth_rules: {
		user_id : 'required|above:0|integer',
		monthId: 'required|range:1,12|integer'
	},
	getAllExpensesInRange_rules : {
		user_id : 'required|above:0|integer',
		begDay: 'range:1,31|integer',
		endDay: 'range:1,31|integer',
		begMnt: 'required|range:1,12|integer',
		endMnt: 'required|range:1,12|integer'
	},
	updateExpensesInQuery_rules : {
		name: 'min:3|max:45',
		due_day: 'range:1,31|integer',
		amount_due: 'number',
		amount_paid: 'number',
		notes: 'string|max:300',
		month: 'range:1,12|integer'
	},
	removeExpensesInQuery_rules : {
		months_id: 'required|range:1,12|integer',
		id: 'required|integer',
		user_id: 'required|integer'
	},
	//--- incomes validation ---//
	//---------------------------//
	addIncomesInQuery_rules : {
		user_id : 'required|above:0|integer',
		name: 'required|min:3|max:45',
		due_day: 'required|range:1,31|integer',
		amount_due: 'required|number',
		notes: 'string|max:300',
		monthId: 'required|range:1,12|integer'
	},
	getAllIncomes : {
		user_id : 'required|above:0|integer'
	},
	getAllIncomesInMonth_rules: {
		user_id : 'required|above:0|integer',
		month: 'required|range:1,12|integer'
	},
	getAllIncomesInRange_rules : {
		user_id : 'required|above:0|integer',
		begDay: 'range:1,31|integer',
		endDay: 'range:1,31|integer',
		begMnt: 'required|range:1,12|integer',
		endMnt: 'required|range:1,12|integer'
	},
	updateIncomesInQuery_rules : {
		name: 'min:3|max:45',
		due_day: 'range:1,31|integer',
		amount: 'number',
		notes: 'string|max:300',
		month: 'range:1,12|integer'
	},
	removeIncomesInQuery_rules : {
		months_id: 'required|range:1,12|integer',
		id: 'required|integer',
		user_id: 'required|integer'
	}
};
