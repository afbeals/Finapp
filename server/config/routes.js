//--- Dependencies ---//
var expenses = require ('../controllers/expenses');
var MySQL = require('./MySQL');


module.exports = function(app){
	//--- Expense Routes ---//
	app.post('/add_expenses_in_query',function(req,res){
	    expenses.addExpensesInQuery(req,res);
	});

	app.get('/get_all_expenses',function(req,res){
	    expenses.getAllExpenses(req,res);
	});

	app.get('/get_all_expenses_in_month',function(req,res){
	    expenses.getAllExpensesInMonth(req,res);
	});

	app.get('/get_all_expenses_in_range',function(req,res){
		expenses.getAllExpensesInRange(req,res);
	});

	app.get('/update_expenses_in_query',function(req,res){
		expenses.updateExpensesInQuery(req,res);
	});

	app.get('/remove_expenses_in_query',function(req,res){
		expenses.removeExpensesInQuery(req,res);
	});
}