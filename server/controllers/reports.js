//--- Dependencies ---//
//--------------------//
var MySQL = require('../config/MySQL');
var {validateAll} = require('indicative');
var validation = require('../config/validateRules');
var messages = require('../config/validateMessages');

module.exports = {
	generateReport : (req,res)=>{
		validateAll(req.query, validation.generateReport_rules, messages)
			.then((data) =>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						res.status(500).send({error: {msg:"Whoops, looks like something went wrong!",status:500}});
					}   
					console.log('connected as id ' + connection.threadId);
					connection.query("SELECT name,'inc' as type, amount, '0' as amount_paid, month, notes, year, months_id as monthId, due_day FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE users_id = ? AND months.id = ? AND incomes.year = ? Union SELECT name,'exp' as type, amount_due as amount, amount_paid, month, notes, year, months_id as monthId, due_day FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE users_id = ? AND months.id = ? AND expenses.year = ?",[data.user_id,data.month,data.year,data.user_id,data.month,data.year],(err,rows)=>{
							connection.release();
							if(!err) {
						  	res.json(rows);
							}else {
								res.status(400).send({error: {msg:"Error while trying to update relation table expenses",status:400}});
								console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
								};
			    	});
				    connection.on('error', (err)=>{
						console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
					});
				});
			})
			.catch((errors) => {
				console.error(errors);
				res.status(500).send({errors,status:500});
			});
	}
};