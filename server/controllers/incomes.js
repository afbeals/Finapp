//--- Dependencies ---//
//--------------------//
var MySQL = require('../config/MySQL');
var {validateAll} = require('indicative');
var validation = require('../config/validateRules');
var messages = require('../config/validateMessages');

module.exports = {
	addIncomesInQuery : (req,res)=>{ 
		validateAll(req.body, validation.addIncomesInQuery_rules, messages)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.error({"code" : err.code, "status" : "Error in connection database","err":err});
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("INSERT INTO incomes (users_id,name,due_day,amount,notes,year, created_at) VALUES (?,?,?,?,?,?,?)",[data.user_id,data.name,data.due_day,data.amount,data.notes,data.year,new Date()],(err,rows)=>{
						if(!err) {
					   		connection.query("INSERT INTO months_has_incomes (months_id,incomes_id,created_at) VALUES (?,?,?)",[data.monthId,rows.insertId,new Date()],(err,rows2)=>{
								connection.release(); 
								if(!err) {
							   		res.json({incomesId:rows.insertId});
								}else {
									res.status(400).send({errors: {msg: "error while trying to add an income",status:400 }});
									console.error({"code" : err.code, "status" : "Error in connection database","err":err});
								}
							});
						}else {
							res.status(500).send({errors: {msg: "error while trying to get all incomes",status:500 }});
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

	getAllIncomes : (req,res) => {
		validateAll(req.query, validation.getAllIncomes_rules, messages)
			.then((data)=>{
				console.log(data);
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.error({"code" : err.code, "status" : "Error in connection database","err":err});
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("SELECT name, amount, notes, due_day, months.id AS monthId, incomes.id AS incomesId, year, incomes.created_at, month as monthName FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE incomes.users_id = ?",[data.user_id],(err,rows)=>{
						connection.release(); 
						if(!err) {
							res.json(rows);
						}else {
							res.status(500).send({errors: {msg: "error while trying to get all incomes",status:500 }});
							console.error({"code" : err.code, "status" : "error while trying to get all incomes","err":err});
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

	getAllIncomesInMonth : (req,res) => {
		validateAll(req.query, validation.getAllIncomesInMonth_rules, messages)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.error({"code" : err.code, "status" : "Error in connection database","err":err});
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("SELECT name, amount, months.id AS monthId, incomes.id AS incomesId, year, due_day, incomes.created_at, month as monthName FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE year = ? AND incomes.users_id = ? AND months.id = ?",[data.year,data.user_id,data.month],(err,rows)=>{
						connection.release(); 
						if(!err) {
					   		res.json(rows);
						}else {
							res.status(500).send({errors: {msg: "error while trying to get all incomes within month ",status:500 }});
							console.error(err);
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

	getAllIncomesInRange : (req,res) => {
		validateAll(req.query, validation.getAllIncomesInRange_rules, messages)
			.then((data)=>{
				let query,params;
		      	if((typeof data.begDay != "undefined") && (typeof data.endDay != "undefined")){
		      		query = "SELECT name, amount, months.id AS monthId, incomes.id AS incomesId, year, due_day, notes, incomes.created_at, month as monthName FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE year = ? AND incomes.users_id = ? AND (months.id >= ? AND months.id <= ?) AND (incomes.due_day >= ? AND incomes.due_day <= ?) ";
		      		params = [data.year,data.user_id,data.begMnt,data.endMnt,data.begDay,data.endDay];
		      	} else {
		      		query = "SELECT name, amount, months.id AS monthId, incomes.id AS incomesId, year, due_day, notes, incomes.created_at, month as monthName FROM incomes LEFT JOIN months_has_incomes ON incomes.id = months_has_incomes.incomes_id LEFT JOIN months ON months_has_incomes.months_id = months.id WHERE year = ? AND incomes.users_id = ? AND months.id >= ? AND months.id <= ?";
		      		params = [data.year,data.user_id,data.begMnt,data.endMnt]
		      	}
			    MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.error({"code" : err.code, "status" : "Error in connection database","err":err});
					}   
					console.log('connected as id ' + connection.threadId);  
					connection.query(query,params,(err,rows)=>{
						connection.release(); 
						if(!err) {
					   		res.json(rows);
						}else {
							res.status(500).send({errors: {msg: "error while trying to get all incomes within range item",status:500 }});
							console.error(err);
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

	updateIncomesInQuery : (req,res) => {
		validateAll(req.body, validation.updateIncomesInQuery_rules, messages)
			.then((data)=>{
				let buildQuery = (obj) => {
					let query = "UPDATE incomes SET updated_at = '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"' ",
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
						console.error({"code" : err.code, "status" : "Error in connection database","err":err});
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query(buildQuery(data),(err,rows)=>{
						connection.release(); 
						if(!err) {
					  		res.status(200).send();
						}else {
							res.status(500).send({errors: {msg: "error while trying to update item",status:500 }});
							console.error(err);
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

	removeIncomesInQuery : (req,res) => {
		validateAll(req.body, validation.removeIncomesInQuery_rules, messages)
			.then((data)=>{
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						res.status(500).send({error: {msg:err,status:500}});
					}   
					console.log('connected as id ' + connection.threadId);   
					connection.query("DELETE FROM months_has_incomes WHERE months_id = ? AND incomes_id = ?; DELETE FROM incomes WHERE users_id = ? AND id = ?",[data.months_id,data.id,data.user_id,data.id],(err,rows)=>{
						connection.release(); 
						if(!err) {
					  		res.status(200).send();
						}else {
							console.error({msg:"error while trying to delete data",err});
							res.status(500).send({errors: {msg: "error while trying to delete item",status:500 }});
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