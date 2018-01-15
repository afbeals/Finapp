//--- Dependencies ---//
//--------------------//
var MySQL = require('../config/MySQL');
var {validateAll} = require('indicative');
var validation = require('../config/validateRules');
var messages = require('../config/validateMessages');

module.exports = {
	addExpensesInQuery : (req,res)=>{
		console.log(req.body);
		validateAll(req.body, validation.addExpensesInQuery_rules, messages)
			.then((data) =>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						res.status(500).send({error: {msg:"Whoops, looks like something went wrong!",status:500}});
					}   
					console.log('connected as id ' + connection.threadId);
					connection.query("INSERT INTO expenses (users_id,name,due_day,amount_due,amount_paid,notes,year,created_at) VALUES (?,?,?,?,?,?,?,?)",[data.user_id,data.name,data.due_day,data.amount_due,data.amount_paid,data.notes,data.year,new Date()],(err,rows)=>{
						if(!err) {
					   		connection.query("INSERT INTO months_has_expenses (months_id,expenses_id,created_at) VALUES (?,?,?)",[data.monthId,rows.insertId,new Date()],(err,rows2)=>{
								connection.release(); 
								if(!err) {
							   		res.json({expensesId:rows.insertId});
								}else {
									res.status(400).send({error: {msg:"Error while trying to update relation table expenses",status:400}});
							console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
								}
							});
						}else {
							connection.release();
							res.status(400).send({error: {msg:"Error while trying to add expense",status:400}});
							console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
						}	
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
	},

	getAllExpenses : (req,res) => {
		validateAll(req.query, validation.getAllExpenses_rules, messages)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						res.status(500).send({error: {msg:"Whoops, looks like something went wrong!",status:500}});
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("SELECT name, amount_due, amount_paid, months.id AS monthId, due_day, expenses.id AS expensesId, months.id as month, notes,year FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ?",[data.user_id],(err,rows)=>{
						connection.release(); 
						if(!err) {
							res.json(rows);
						}else {
							res.status(400).send({error: {msg:"Error while trying to get all expenses",status:400}});
							console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
						}
					});
					connection.on('error', (err)=>{      
						console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
					});
			    });
			})
			.catch((errors) =>{
				console.error(errors);
				res.status(500).send({errors,status:500});
			});
	},

	getAllExpensesInMonth : (req,res) => {
		validateAll(req.query, validation.getAllExpensesInMonth_rules, messages)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						res.status(500).send({error: {msg:"Whoops, looks like something went wrong!",status:500}});
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("SELECT name, amount_due, months.id AS monthId, expenses.id AS expensesId, year, due_day, notes FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE year = ? AND expenses.users_id = ? AND months.id = ?",[data.year, data.user_id,data.month],(err,rows)=>{
						connection.release(); 
						if(!err) {
					   		res.json(rows);
						}else {
							res.status(400).send({error: {msg:"Error while trying to get all expenses",status:400}});
							console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
						}
					});
					connection.on('error', (err)=>{
						console.error({"code" : err.code, "status" : "Error in connection database", "err":err});  
					});
			    });
			})
			.catch((errors)=>{
				console.error(errors);
				res.status(500).send({errors,status:500});
			});
	},

	getAllExpensesInRange : (req,res) => {
		validateAll(req.query, validation.getAllExpensesInRange_rules, messages)
			.then((data)=>{
				let query,params;
		      	if((typeof data.begDay != "undefined") && (typeof data.endDay != "undefined")){
		      		query = "SELECT name, amount_due, months.id AS monthId, expenses.id AS expensesId,year, notes, due_day FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE year = ? AND expenses.users_id = ? AND (months.id >= ? AND months.id <= ?) AND (expenses.due_day >= ? AND expenses.due_day <= ?) ";
		      		params = [data.year,data.user_id,data.begMnt,data.endMnt,data.begDay,data.endDay];
		      	} else {
		      		query = "SELECT name, amount_due, months.id AS monthId, expenses.id AS expensesId FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE year = ? AND expenses.users_id = ? AND months.id >= ? AND months.id <= ?";
		      		params = [data.year, data.user_id,data.begMnt,data.endMnt];
		      	}
			    MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						res.status(500).send({error: {msg:"Whoops, looks like something went wrong!",status:500}});
					}   
					console.log('connected as id ' + connection.threadId);
					connection.query(query,params,(err,rows)=>{
						connection.release(); 
						if(!err) {
							console.log(rows);
					   		res.json(rows);
						}else {
							res.status(400).send({error: {msg:"Error while trying to remove expense",status:400}});
							console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
						}
					});
					connection.on('error', (err)=>{
						console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
					});
			    });	
			})
			.catch((errors)=>{
				console.error(errors);
				res.status(500).send({errors,status:500});
			});
	},

	updateExpensesInQuery : (req,res) => {
		validateAll(req.body, validation.updateExpensesInQuery_rules, messages)
			.then((data)=>{
				console.log(data);
				let buildQuery = (obj) => {
					let query = "UPDATE expenses SET updated_at = '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"' ",
						initial = true;
				    for(let keys = Object.keys(obj), i = 0, end = keys.length; i < end; ++i) {
			        let key = keys[i], value = obj[key];
			        if(key != "id" && key != "user_id" && key != "month"){
								if(initial){
									query += key+" = '"+ value+"'";
									initial = false;
			                    } else {
									query += ", "+key+" = '"+ value+"'";
			                    }
	            }
		        }
					query += " WHERE users_id = "+obj.user_id+" AND id = "+obj.id;
					console.log(query);
					if(obj.month){
						query += "; UPDATE months_has_expenses SET months_id = "+obj.month+" WHERE expenses_id = '"+obj.id+"'";
		            }
		            console.log(query);
				    return query;
				};
			    MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						res.status(500).send({error: {msg:"Whoops, looks like something went wrong!",status:500}});
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query(buildQuery(data),(err,rows)=>{
						connection.release(); 
						if(!err) {
					  		res.status(200).send();
						}else {
							res.status(400).send({error: {msg:"Error while trying to update expense",status:400}});
							console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
						}
					});
					connection.on('error', (err)=>{      
						console.error({"code" : 100, "status" : "Error in connection database", "err":err});   
					});
			    });
			})
			.catch((errors)=>{
				console.error(errors);
				res.status(500).send({errors,status:500});
			});
	},

	removeExpensesInQuery : (req,res) => {
		validateAll(req.body, validation.removeExpensesInQuery_rules, messages)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						res.status(500).send({error: {msg:"Whoops, looks like something went wrong!",status:500}});
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("DELETE FROM months_has_expenses WHERE months_id = ? AND expenses_id = ?; DELETE FROM expenses WHERE users_id = ? AND id = ?",[data.months_id,data.id,data.user_id,data.id],(err,rows)=>{
						connection.release(); 
						if(!err) {
					  		res.status(200).send();
						}else {
							res.status(400).send({error: {msg:"Error while trying to remove expense",status:400}});
							console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
						}
					});
					connection.on('error', (err)=>{      
						console.error({"code" : err.code, "status" : "Error in connection database", "err":err});  
					});
			    });
			})
			.catch((errors)=>{
				console.error(errors);
				res.status(500).send({errors,status:500});
			});
	}
};