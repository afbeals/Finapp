//--- Dependencies ---//
//--------------------//
var MySQL = require('../config/MySQL');
var {validateAll} = require('indicative');
var validation = require('../config/validateRules');

module.exports = {
	addExpensesInQuery : (req,res)=>{
		validateAll(req.body, validation.addExpensesInQuery_rules)
			.then((data) =>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.log({"code" : 100, "status" : "Error in connection database","err":err});
						throw Error(err);
					}   
					console.log('connected as id ' + connection.threadId);
					connection.query("INSERT INTO expenses (users_id,name,due_day,amount_due,amount_paid,notes,created_at) VALUES (?,?,?,?,?,?,?)",[data.user_id,data.name,data.due_day,data.amount_due,data.amount_paid,data.notes,new Date()],(err,rows)=>{
						if(!err) {
					   		connection.query("INSERT INTO months_has_expenses (months_id,expenses_id,created_at) VALUES (?,?,?)",[data.monthId,rows.insertId,new Date()],(err,rows2)=>{
								connection.release(); 
								if(!err) {
							   		res.json({expensesId:rows.insertId});
								}else {
									res.status(500).send('Something broke!');
									throw Error(err);
								}
							});
						}else {
							connection.release();
							res.status(500).send('Something broke!');
							throw Error(err);
						}	
			    	});
				    connection.on('error', (err)=>{
						console.log({"code" : 100, "status" : "Error in connection database", "err":err});
						throw Error(err);
					});
				});
			})
			.catch((errors) => {
				console.log(errors);
				res.status(400).send({error:errors});
			});
	},

	getAllExpenses : (req,res) => {
		validateAll(req.body, validation.getAllExpenses_rules)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.log({"code" : 100, "status" : "Error in connection database","err":err});
						throw Error(err);
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("SELECT name, amount_due, months.id AS monthId, expenses.id AS expensesId, months.id as month FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ?",[data.user_id],(err,rows)=>{
						connection.release(); 
						if(!err) {
							res.json(rows);
						}else {
							res.status(500).send('Something broke!');
							throw Error(err);
						}
					});
					connection.on('error', (err)=>{      
						console.log({"code" : 100, "status" : "Error in connection database", "err":err});
						throw Error(err); 
					});
			    });
			})
			.catch((errors) =>{
				console.log(errors);
				res.status(400).send({error:errors});
			});
	},

	getAllExpensesInMonth : (req,res) => {
		validateAll(req.body, validation.getAllExpensesInMonth_rules)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.log({"code" : 100, "status" : "Error in connection database","err":err});
						throw Error(err);
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("SELECT name, amount_due, months.id AS monthId, expenses.id AS expensesId FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ? AND months.id = ?",[data.user_id,data.monthId],(err,rows)=>{
						connection.release(); 
						if(!err) {
					   		res.json(rows);
						}else {
							res.status(500).send('Something broke!');
							throw Error(err);
						}
					});
					connection.on('error', (err)=>{
						console.log({"code" : 100, "status" : "Error in connection database", "err":err});
						throw Error(err);   
					});
			    });
			})
			.catch((errors)=>{
				console.log(errors);
				res.status(400).send({error:errors});
			});
	},

	getAllExpensesInRange : (req,res) => {
		validateAll(req.body, validation.getAllExpensesInRange_rules)
			.then((data)=>{
				let query,params;
		      	if((typeof data.begDay != "undefined") && (typeof data.endDay != "undefined")){
		      		query = "SELECT name, amount_due, months.id AS monthId, expenses.id AS expensesId FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ? AND (months.id >= ? AND months.id <= ?) AND (expenses.due_day >= ? AND expenses.due_day <= ?) ";
		      		params = [data.user_id,data.begMnt,data.endMnt,data.begDay,data.endDay];
		      	} else {
		      		query = "SELECT name, amount_due, months.id AS monthId, expenses.id AS expensesId FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ? AND months.id >= ? AND months.id <= ?";
		      		params = [data.user_id,data.begMnt,data.endMnt];
		      	}
			    MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.log({"code" : 100, "status" : "Error in connection database","err":err});
						throw Error(err);
					}   
					console.log('connected as id ' + connection.threadId);
					connection.query(query,params,(err,rows)=>{
						connection.release(); 
						if(!err) {
							console.log(rows);
					   		res.json(rows);
						}else {
							res.status(500).send('Something broke!');
							throw Error(err);
						}
					});
					connection.on('error', (err)=>{
						console.log({"code" : 100, "status" : "Error in connection database", "err":err});
						throw Error(err);
					});
			    });	
			})
			.catch((errors)=>{
				console.log(errors);
				res.status(400).send({error:errors});
			});
	},

	updateExpensesInQuery : (req,res) => {
		validateAll(req.body, validation.updateExpensesInQuery_rules)
			.then((data)=>{
				let buildQuery = (obj) => {
					let query = "UPDATE expenses SET ",
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
					if(obj.month){
						query += "; UPDATE months_has_expenses SET months_id = "+obj.month+" WHERE expenses_id = '"+obj.id+"'";
		            }
				    return query;
				};
			    MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.log({"code" : 100, "status" : "Error in connection database","err":err});
						throw Error(err);
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query(buildQuery(data),(err,rows)=>{
						connection.release(); 
						if(!err) {
					  		res.status(200).send();
						}else {
							res.status(500).send('Something broke!');
							throw Error(err);
						}
					});
					connection.on('error', (err)=>{      
						console.log({"code" : 100, "status" : "Error in connection database", "err":err});
						throw Error(err);   
					});
			    });
			})
			.catch((errors)=>{
				console.log(errors);
				res.status(400).send({error:errors});
			});
	},

	removeExpensesInQuery : (req,res) => {
		validateAll(req.body, validation.removeExpensesInQuery_rules)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.log({"code" : 100, "status" : "Error in connection database","err":err});
						throw Error(err);
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("DELETE FROM months_has_expenses WHERE months_id = ? AND expenses_id = ?; DELETE FROM expenses WHERE users_id = ? AND id = ?",[data.months_id,data.id,data.user_id,data.id],(err,rows)=>{
						connection.release(); 
						if(!err) {
					  		res.status(200).send();
						}else {
							res.status(500).send('Something broke!');
							throw Error(err);
						}
					});
					connection.on('error', (err)=>{      
						console.log({"code" : 100, "status" : "Error in connection database", "err":err});
						throw Error(err);   
					});
			    });
			})
			.catch((errors)=>{
				console.log(errors);
				res.status(400).send({error:errors});
			});
	}
};