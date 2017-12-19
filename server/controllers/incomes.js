//--- Dependencies ---//
//--------------------//
var MySQL = require('../config/MySQL');

module.exports = {
	addIncomesInQuery : (req,res)=>{
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("INSERT INTO incomes (users_id,name,due_day,amount,notes,created_at) VALUES (?,?,?,?,?,?)",[req.body.users_id,req.body.name,req.body.due_day,req.body.amount,req.body.notes,new Date()],(err,rows)=>{
				if(!err) {
			   		connection.query("INSERT INTO months_has_incomes (months_id,incomes_id,created_at) VALUES (?,?,?)",[req.body.month,rows.insertId,new Date()],(err,rows)=>{
						connection.release(); 
						if(!err) {
					   		res.status(200).send();
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

	getAllIncomes : (req,res) => {
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("SELECT name, amount, month, incomes.id AS id, months.id as month FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE incomes.users_id = ?",[req.query.users_id],(err,rows)=>{
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

	getAllIncomesInMonth : (req,res) => {
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("SELECT name, amount, month, incomes.id AS id FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE incomes.users_id = ? AND months.id = ?",[req.query.users_id,req.query.month],(err,rows)=>{
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

	getAllIncomesInRange : (req,res) => {
		let query,params;
      	if(req.query.BegDay && req.query.EndDay){
      		query = "SELECT name, amount, month, incomes.id AS id FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE incomes.users_id = ? AND (months.id >= ? AND months.id <= ?) AND (incomes.due_day >= ? AND incomes.due_day <= ?) ";
      		params = [req.query.users_id,req.query.begMnt,req.query.endMnt,req.query.begDay,req.query.endDay];
      	} else {
      		query = "SELECT name, amount, month, incomes.id AS id FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE incomes.users_id = ? AND months.id >= ? AND months.id <= ?";
      		params = [req.query.users_id,req.query.begMnt,req.query.endMnt]
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

	updateIncomesInQuery : (req,res) => {
		let buildQuery = (obj) => {
			let query = "UPDATE incomes SET ",
				initial = true;
		    for(let keys = Object.keys(obj), i = 0, end = keys.length; i < end; ++i) {
		        let key = keys[i], value = obj[key];
		        if(key != "id" && key != "users_id" && key != "month"){
					if(initial){
						query += key+" = '"+ value+"'";
						initial = false;
                    } else {
						query += ", "+key+" = '"+ value+"'";
                    }
                }
            }
			query += " WHERE users_id = "+obj['users_id']+" AND id = "+obj['id'];
			if(obj['month']){
				query += "; UPDATE months_has_incomes SET months_id = "+obj['month']+" WHERE incomes_id = '"+obj['id']+"'";
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

	removeIncomesInQuery : (req,res) => {
	    MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("DELETE FROM months_has_incomes WHERE months_id = ? AND incomes_id = ?; DELETE FROM incomes WHERE users_id = ? AND id = ?",[req.body.months_id,req.body.id,req.body.users_id,req.body.id],(err,rows)=>{
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