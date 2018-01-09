//--- Dependencies ---//
//--------------------//
var expenses = require ('../controllers/expenses');
var incomes = require('../controllers/incomes');
var users = require('../controllers/users');
var auth = require("../config/auth")();
var MySQL = require('./MySQL');


module.exports = function(app){
	//--- Expense Routes ---//
	//----------------------//
	app.post('/add_expenses_in_query',auth.authenticateHeader(),function(req,res){
	    expenses.addExpensesInQuery(req,res);
	});

	app.post('/update_expenses_in_query',auth.authenticateHeader(),function(req,res){
		expenses.updateExpensesInQuery(req,res);
	});

	app.post('/remove_expenses_in_query',auth.authenticateHeader(),function(req,res){
		expenses.removeExpensesInQuery(req,res);
	});	

	app.get('/get_all_expenses',auth.authenticateHeader(),function(req,res){
	    expenses.getAllExpenses(req,res);
	});

	app.get('/get_all_expenses_in_month',auth.authenticateHeader(),function(req,res){
	    expenses.getAllExpensesInMonth(req,res);
	});

	app.get('/get_all_expenses_in_range',auth.authenticateHeader(),function(req,res){
		expenses.getAllExpensesInRange(req,res);
	});

	//--- Income Routes ---//
	//---------------------//
	app.post('/add_incomes_in_query',auth.authenticateHeader(),function(req,res){
	    incomes.addIncomesInQuery(req,res);
	});

	app.post('/update_incomes_in_query',auth.authenticateHeader(),function(req,res){
		incomes.updateIncomesInQuery(req,res);
	});

	app.post('/remove_incomes_in_query',auth.authenticateHeader(),function(req,res){
		incomes.removeIncomesInQuery(req,res);
	});	

	app.get('/get_all_incomes',function(req,res){
	    incomes.getAllIncomes(req,res);
	});

	app.get('/get_all_incomes_in_month',auth.authenticateHeader(),function(req,res){
	    incomes.getAllIncomesInMonth(req,res);
	});

	app.get('/get_all_incomes_in_range',auth.authenticateHeader(),function(req,res){
		incomes.getAllIncomesInRange(req,res);
	});

	//--- User Routes ---//
	//-------------------//
	app.post('/register_user',function(req,res){
	    users.registerUser(req,res);
	});

	app.post('/login_user',function(req,res){
	    users.loginUser(req,res);
	});

	app.get('/test_header', auth.authenticateLocal(), function(req,res){
		console.log(req.headers);
		res.sendStatus(200);
	});
};