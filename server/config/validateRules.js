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
	getUserInfo_rules : {
		user_id: 'required|above:0'
	},
	updateUserInfo_rules : {
		user_id : 'required|above:0',
		first_name: 'min:1|max:11',
		last_name: 'min:1|max:15',
		email: 'email',
		password_previous: 'min:7|max:16|alpha_numeric',
		password: 'min:7|max:16|alpha_numeric',
		password_confirm: 'same:password'
	},
	//--- expenses validation ---//
	//---------------------------//
	addExpensesInQuery_rules : {
		user_id : 'required|above:0',
		name: 'required|min:3|max:45',
		due_day: 'required|range:0,32',
		amount_due: 'required|number',
		amount_paid: 'number',
		notes: 'string|max:300',
		monthId: 'required|range:0,13',
		year: 'required|min:4|max:4|range:2014,3016'
	},
	getAllExpenses_rules : {
		user_id : 'required'
	},
	getAllExpensesInMonth_rules: {
		user_id : 'required|above:0',
		month: 'required|range:0,13',
		year: 'required|min:4|max:4|range:2014,3016'
	},
	getAllExpensesInRange_rules : {
		user_id : 'required|above:0',
		begDay: 'range:0,32',
		endDay: 'range:0,32',
		begMnt: 'required|range:0,13',
		endMnt: 'required|range:0,13',
		year: 'required|min:4|max:4|range:2014,3016'
	},
	updateExpensesInQuery_rules : {
		user_id: 'required|above:0',
		name: 'min:3|max:45',
		due_day: 'range:0,32',
		amount_due: 'number',
		amount_paid: 'number',
		notes: 'string|max:300',
		month: 'range:1,12'
	},
	removeExpensesInQuery_rules : {
		months_id: 'required|range:0,13',
		id: 'required',
		user_id: 'required|above:0'
	},
	//--- incomes validation ---//
	//---------------------------//
	addIncomesInQuery_rules : {
		user_id : 'required|above:0',
		name: 'required|min:3|max:45',
		due_day: 'required|range:0,32',
		amount: 'required|number',
		notes: 'string|max:300',
		monthId: 'required|range:0,13',
		year: 'required|min:4|max:4|range:2014,3016'
	},
	getAllIncomes_rules : {
		user_id : 'required|above:0'
	},
	getAllIncomesInMonth_rules: {
		user_id : 'required|above:0',
		month: 'required|range:0,13',
		year: 'required|min:4|max:4|range:2014,3016'
	},
	getAllIncomesInRange_rules : {
		user_id : 'required|above:0',
		begDay: 'range:0,32',
		endDay: 'range:0,32',
		begMnt: 'required|range:0,13',
		endMnt: 'required|range:0,13',
		year: 'required|min:4|max:4|range:2014,3016'
	},
	updateIncomesInQuery_rules : {
		user_id: 'required|above:0',
		name: 'min:3|max:45',
		due_day: 'range:0,32',
		amount: 'number',
		notes: 'string|max:300',
		month: 'range:0,13'
	},
	removeIncomesInQuery_rules : {
		months_id: 'required|range:0,13',
		id: 'required',
		user_id: 'required'
	},
	generateReport_rules : {
		year: 'required|min:4|max:4|range:2014,3016',
		user_id: 'required',
		month: 'required|range:0,13'
	}
};

//add year to queries