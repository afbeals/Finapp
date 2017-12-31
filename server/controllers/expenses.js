//--- Dependencies ---//
//--------------------//
var MySQL = require('../config/MySQL');

module.exports = {
	addExpensesInQuery : (req,res)=>{
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("INSERT INTO expenses (users_id,name,due_day,amount_due,amount_paid,notes,created_at) VALUES (?,?,?,?,?,?,?)",[req.body.user_id,req.body.name,req.body.due_day,req.body.amount_due,req.body.amount_paid,req.body.notes,new Date()],(err,rows)=>{
				if(!err) {
			   		connection.query("INSERT INTO months_has_expenses (months_id,expenses_id,created_at) VALUES (?,?,?)",[req.body.monthId,rows.insertId,new Date()],(err,rows2)=>{
						connection.release(); 
						if(!err) {
					   		res.json({expensesId:rows.insertId});
						}else {
							throw Error(err);
							res.status(500).send('Something broke!');
						}
					});
				}else {
					throw Error(err);
					res.status(500).send('Something broke!');
				}
			});

			connection.on('error', (err)=>{      
				console.log({"code" : 100, "status" : "Error in connection database", "err":err});
				throw Error(err);
			});
	    });
	},

	// addExpensesInQuery : (req,res) =>{
	// 	MySQL.pool.getConnection().then(function(connection) {
	// 		console.log('connect',connection,'connected as id ' + connection.threadId); 
	// 	    connection.query("INSERT INTO expenses (users_id,name,due_day,amount_due,amount_paid,notes,created_at) VALUES (?,?,?,?,?,?,?)",[req.body.users_id,req.body.name,req.body.due_day,req.body.amount_due,req.body.amount_paid,req.body.notes,new Date()]).then((rows)=>{
	// 	    	console.log(rows);
	// 	    	connection.query("INSERT INTO expenses (users_id,name,due_day,amount_due,amount_paid,notes,created_at) VALUES (?,?,?,?,?,?,?)",[req.body.users_id,req.body.name,req.body.due_day,req.body.amount_due,req.body.amount_paid,req.body.notes,new Date()]).then(()=>{
	// 	    		connection.release();
	// 	    		res.status(200).send();
	// 	    	})
	// 	    })
	// 	}).catch(function(err) {
	// 		connection.release();
	// 		console.log({"code" : 100, "status" : "Error in connection database","err":err});
	// 		throw Error(err);
	// 	    done(err);
	// 	});
	// },

	getAllExpenses : (req,res) => {
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("SELECT name, amount_due, months.id AS monthId, expenses.id AS expensesId, months.id as month FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ?",[req.query.user_id],(err,rows)=>{
				connection.release(); 
				if(!err) {
					res.json(rows);
				}else {
					throw Error(err);
					res.status(500).send('Something broke!');
				}
			});
			connection.on('error', (err)=>{      
				console.log({"code" : 100, "status" : "Error in connection database", "err":err});
				throw Error(err); 
			});
	    });
	},

	getAllExpensesInMonth : (req,res) => {
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("SELECT name, amount_due, months.id AS monthId, expenses.id AS expensesId FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ? AND months.id = ?",[req.query.user_id,req.query.month],(err,rows)=>{
				connection.release(); 
				if(!err) {
			   		res.json(rows);
				}else {
					throw Error(err);
					res.status(500).send('Something broke!');
				}
			});
			connection.on('error', (err)=>{      
				console.log({"code" : 100, "status" : "Error in connection database", "err":err});
				throw Error(err);   
			});
	    });
	},

	getAllExpensesInRange : (req,res) => {
		let query,params;
      	if((typeof req.query.begDay != "undefined") && (typeof req.query.endDay != "undefined")){
      		query = "SELECT name, amount_due, months.id AS monthId, expenses.id AS expensesId FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ? AND (months.id >= ? AND months.id <= ?) AND (expenses.due_day >= ? AND expenses.due_day <= ?) ";
      		params = [req.query.user_id,req.query.begMnt,req.query.endMnt,req.query.begDay,req.query.endDay];
      	} else {
      		query = "SELECT name, amount_due, months.id AS monthId, expenses.id AS expensesId FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ? AND months.id >= ? AND months.id <= ?";
      		params = [req.query.user_id,req.query.begMnt,req.query.endMnt]
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
					throw Error(err);
					res.status(500).send('Something broke!');
				}
			});
			connection.on('error', (err)=>{      
				console.log({"code" : 100, "status" : "Error in connection database", "err":err});
				throw Error(err);
			});
	    });
	},

	updateExpensesInQuery : (req,res) => {
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
			query += " WHERE users_id = "+obj['user_id']+" AND id = "+obj['id'];
			if(obj['month']){
				query += "; UPDATE months_has_expenses SET months_id = "+obj['month']+" WHERE expenses_id = '"+obj['id']+"'";
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
			connection.query(buildQuery(req.body),(err,rows)=>{
				connection.release(); 
				if(!err) {
			  		res.status(200).send();
				}else {
					throw Error(err);
					res.status(500).send('Something broke!');
				}
			});
			connection.on('error', (err)=>{      
				console.log({"code" : 100, "status" : "Error in connection database", "err":err});
				throw Error(err);   
			});
	    });
	},

	removeExpensesInQuery : (req,res) => {
	    MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("DELETE FROM months_has_expenses WHERE months_id = ? AND expenses_id = ?; DELETE FROM expenses WHERE users_id = ? AND id = ?",[req.body.months_id,req.body.id,req.body.user_id,req.body.id],(err,rows)=>{
				connection.release(); 
				if(!err) {
			  		res.status(200).send();
				}else {
					throw Error(err);
					res.status(500).send('Something broke!');
				}
			});
			connection.on('error', (err)=>{      
				console.log({"code" : 100, "status" : "Error in connection database", "err":err});
				throw Error(err);   
			});
	    });
	}
}