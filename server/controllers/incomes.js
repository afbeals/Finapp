//--- Dependencies ---//
//--------------------//
var MySQL = require('../config/MySQL');
var {validateAll} = require('indicative');
var validation = require('../config/validateRules');

module.exports = {
	addIncomesInQuery : (req,res)=>{
		validateAll(req.body, validation.addIncomesInQuery_rules)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.log({"code" : 100, "status" : "Error in connection database","err":err});
						throw Error(err);
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("INSERT INTO incomes (users_id,name,due_day,amount,notes,created_at) VALUES (?,?,?,?,?,?)",[data.user_id,data.name,data.due_day,data.amount,data.notes,new Date()],(err,rows)=>{
						if(!err) {
					   		connection.query("INSERT INTO months_has_incomes (months_id,incomes_id,created_at) VALUES (?,?,?)",[data.monthId,rows.insertId,new Date()],(err,rows2)=>{
								connection.release(); 
								if(!err) {
							   		res.json({incomesId:rows.insertId});
								}else {
									res.status(500).send('Something broke!');
									throw Error(err);
								}
							});
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

	getAllIncomes : (req,res) => {
		validateAll(req.body, validation.getAllIncomes_rules)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.log({"code" : 100, "status" : "Error in connection database","err":err});
						throw Error(err);
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("SELECT name, amount, months.id AS monthId, incomes.id AS incomesId, months.id as month FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE incomes.users_id = ?",[data.user_id],(err,rows)=>{
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

	getAllIncomesInMonth : (req,res) => {
		validateAll(req.body, validation.getAllIncomesInMonth_rules)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.log({"code" : 100, "status" : "Error in connection database","err":err});
						throw Error(err);
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("SELECT name, amount, months.id AS monthId, incomes.id AS incomesId FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE incomes.users_id = ? AND months.id = ?",[data.user_id,data.month],(err,rows)=>{
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

	getAllIncomesInRange : (req,res) => {
		validateAll(req.body, validation.addIncomesInQuery_rules)
			.then((data)=>{
				let query,params;
		      	if((typeof data.begDay != "undefined") && (typeof data.endDay != "undefined")){
		      		query = "SELECT name, amount, months.id AS monthId, incomes.id AS incomesId FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE incomes.users_id = ? AND (months.id >= ? AND months.id <= ?) AND (incomes.due_day >= ? AND incomes.due_day <= ?) ";
		      		params = [data.user_id,data.begMnt,data.endMnt,data.begDay,data.endDay];
		      	} else {
		      		query = "SELECT name, amount, months.id AS monthId, incomes.id AS incomesId FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE incomes.users_id = ? AND months.id >= ? AND months.id <= ?";
		      		params = [data.user_id,data.begMnt,data.endMnt]
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

	updateIncomesInQuery : (req,res) => {
		validateAll(req.body, validation.updateIncomesInQuery_rules)
			.then((data)=>{
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
					query += " WHERE users_id = "+obj.user_id+" AND id = "+obj.id;
					if(obj.month){
						query += "; UPDATE months_has_incomes SET months_id = "+obj.month+" WHERE incomes_id = '"+obj.id+"'";
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

	removeIncomesInQuery : (req,res) => {
		validateAll(req.body, validation.removeIncomesInQuery_rules)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.log({"code" : 100, "status" : "Error in connection database","err":err});
						throw Error(err);
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("DELETE FROM months_has_incomes WHERE months_id = ? AND incomes_id = ?; DELETE FROM incomes WHERE users_id = ? AND id = ?",[data.months_id,data.id,data.user_id,data.id],(err,rows)=>{
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
			})
			.catch((errors)=>{
				console.log(errors);
				res.status(400).send({error:errors});
			});	 
	}
};