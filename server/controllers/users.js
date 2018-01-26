//--- Dependencies ---//
//--------------------//
var MySQL = require('../config/MySQL');
var jwt = require('jwt-simple');
var cfg = require('../../private');
var {validateAll} = require('indicative');
var validation = require('../config/validateRules');
var bcrypt = require('bcrypt');
var messages = require('../config/validateMessages');

module.exports = {

	decodeUser : (req,res)=>{
		var token = req.body.token;
		var decoded = jwt.decode(token,cfg.jwtSecret);
		res.json(decoded);
	},

	registerUser : (req,res)=>{
		validateAll(req.body, validation.registerUser_rules, messages)
			.then((data) => {
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.error({"code" : 100, "status" : "Error in connection database","err":err});
						res.status(500).send({error:err,status:500});
					}   
					console.log('connected as id ' + connection.threadId);
					var password = data.password,
					  	hashPassword = null;
			  		bcrypt.hash(password, cfg.salt, (err,hash) => {
			  			if(err){
			  				connection.release();
			  				console.error(err);
			  			}
			  			hashPassword = hash;
			  			connection.query("INSERT INTO users (first_name,last_name,email,password,created_at) VALUES (?,?,?,?,?)",[data.first_name,data.last_name,data.email,hashPassword,new Date()],(err,rows)=>{
			  				connection.release();
			  				if(err){
			  					if(err.code == "ER_DUP_ENTRY"){
			  						res.status(400).send({error: {msg:"This email already exists!",status:400}});
			  						return;
			  					}
			  					console.error('error status',err.errno ,err.code, err.sqlMessage);
			  				} else {
								var payload = {
									user_id:rows.insertId,
									first_name: data.first_name
								};
								var token = jwt.encode(payload, cfg.jwtSecret);
								res.json({payload,token});	
			  				}
						});
			  		});
					connection.on('error', (err)=>{      
						console.error({"code" : 100, "status" : "Error in connection database", "err":err});
					});
			    });
			})
			.catch((errors) => {
		  		console.error(errors);
		  		res.status(500).send({errors,status:500});
		 	});
	},


	loginUser : (req,res)=>{
		validateAll(req.body, validation.loginUser_rules, messages)
			.then((data) => {
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.error({"code" : 100, "status" : "Error in connection database","err":err});
						res.status(500).send({error:err,status:500});
					}   
					console.log('connected as id ' + connection.threadId);
					connection.query("SELECT id,first_name,password FROM users WHERE email = ?",[data.email],(err,user)=>{
						connection.release(); 
						if(!err) {
							if(!user.length){
								res.status(400).send({error:{msg:"The email address or password you entered is incorrect",status: 400}});
								return;
							} else {
								bcrypt.compare(data.password,user[0].password,(err,hash)=>{
									if(err){
										res.send(500).send({error: {msg:err}});
										console.error(err);
										return;
									} else {
										if(hash){
											var payload = {
												user_id:user[0].id,
												first_name: user[0].first_name
											};
											var token = jwt.encode(payload, cfg.jwtSecret);
											res.json({payload,token});
										} else {
											res.status(400).send({error: {msg:"incorrect username or password"}});
										}	
									}
								});
							}
						}else {
							res.status(500).send({error: {msg:'Something broke!'}});
							console.error(err);
						}
					});		
					connection.on('error', (err)=>{      
						console.error(({"code" : 100, "status" : "Error in connection database", "err":err}));
					});
			    });
			})
			.catch((errors) => {
		  		console.error(errors);
		  		res.status(500).send({errors,status:500});
		 	});
	},

	getUserInfo : (req,res) => {
		validateAll(req.query, validation.getUserInfo_rules, messages)
			.then((data) => {
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.error({"code" : 100, "status" : "Error in connection database","err":err});
						res.status(500).send({error:err,status:500});
					}   
					console.log('connected as id ' + connection.threadId);
					connection.query("SELECT first_name,last_name,email FROM users WHERE id = ? ",[data.user_id],(err,user)=>{
						connection.release(); 
						if(!err) {
							if(!user.length){
								res.status(400).send({error:{msg:"There was an error retreiving your data, please contact admin",status: 400}});
								return;
							} else {
								res.json({user});
							}
						} else {
							res.status(500).send({error: {msg:'Something broke!'}});
							console.error(err);
						}
					});		
					connection.on('error', (err)=>{      
						console.error(({"code" : 100, "status" : "Error in connection database", "err":err}));
					});
			    });
			})
			.catch((errors) => {
		  		console.error(errors);
		  		res.status(500).send({errors,status:500});
		 	});
	},

	updateUserInfo : (req,res) => {
		validateAll(req.body, validation.updateUserInfo_rules, messages)
			.then((data) => {
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.error({"code" : 100, "status" : "Error in connection database","err":err});
						res.status(500).send({error:err,status:500});
					}   
					console.log('connected as id ' + connection.threadId);
					connection.query("SELECT password FROM users WHERE id = ?",[data.user_id],(err,user)=>{
						if(!err) {
							if(!user.length){
								res.status(400).send({error:{msg:"There was an error retreiving your data, please contact admin",status: 400}});
								return;
							} else {
								bcrypt.compare(data.password_previous,user[0].password,(err,hash)=>{
									if(err){
										res.send(500).send({error: {msg:err}});
										console.error(err);
										return;
									} else {
										if(hash){
											let buildQuery = (obj)=>{
												return new Promise((resolve,reject)=>{
													if(obj.password != "undefined"){
														bcrypt.hash(obj.password, cfg.salt, (err,hash) => {
											  			if(err){
											  				connection.release();
											  				console.error(err);
											  				reject(err);
											  			}
											  			hashPassword = hash;
											  			resolve(hashPassword);
														})	
													} else {
														resolve();
													}
												}).then((hash)=>{
													if(hash != "undefined"){
														let query = "UPDATE users SET updated_at = '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"', password = '"+hash+"', ",
																initial = true;
												    for(let keys = Object.keys(obj), i = 0, end = keys.length; i < end; ++i) {
											        let key = keys[i], value = obj[key];
											        if(key != "id" && key != "user_id" && key != "password_previous" && key != "password_confirm" && key != "password") {
																if(initial){
																	query += key+" = '"+ value+"'";
																	initial = false;
											          } else {
																	query += ", "+key+" = '"+ value+"'";
											          }
									            }
										        }
														query += " WHERE id = "+obj.user_id;
													  return query;
													} else {
														let query = "UPDATE users SET updated_at = '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"', ",
																	initial = true;
												    for(let keys = Object.keys(obj), i = 0, end = keys.length; i < end; ++i) {
											        let key = keys[i], value = obj[key];
											        if(key != "id" && key != "user_id" && key != "password_previous" && key != "password_confirm" && key != "password") {
																if(initial){
																	query += key+" = '"+ value+"'";
																	initial = false;
											          } else {
																	query += ", "+key+" = '"+ value+"'";
											          }
									            }
										        }
														query += " WHERE id = "+obj.user_id;
													  return query;
													}
												}).then((query)=>{
													connection.query(query,(err,user2)=>{
														connection.release();
														if(!err) {
													  	var payload = {
																user_id:data.user_id,
																first_name: data.first_name
															};
															var token = jwt.encode(payload, cfg.jwtSecret);
															res.json({payload,token});
														} else {
															res.status(400).send({error: {msg:"Error while trying to update user",status:400}});
															console.error({"code" : err.code, "status" : "Error in connection database", "err":err});
														}
													})	
												}).catch((err)=>{console.log(err)});
											};
											buildQuery(data);
										}
									}
								});
							}
						} else {
							res.status(500).send({error: {msg:'Something broke!'}});
							console.error(err);
						}
					});		
					connection.on('error', (err)=>{      
						console.error(({"code" : 100, "status" : "Error in connection database", "err":err}));
					});
			    });
			})
			.catch((errors) => {
		  		console.error(errors);
		  		res.status(500).send({errors,status:500});
		 	});
	}
};