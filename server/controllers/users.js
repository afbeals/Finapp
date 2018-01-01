//--- Dependencies ---//
//--------------------//
var MySQL = require('../config/MySQL');
var jwt = require('jwt-simple');
var cfg = require('../../private');
var {validateAll} = require('indicative');
var validation = require('../config/validateRules');
var bcrypt = require('bcrypt');

module.exports = {
	registerUser : (req,res)=>{
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);
			validateAll(req.body, validation.user_register_rules)
				.then((data) => {
			  		console.log(data);
			  		var password = data.password,
			  			hashPassword = null;
			  		bcrypt.hash(password, cfg.salt, (err,hash) => {
			  			if(err){
			  				connection.release();
			  				throw Error(err);
			  			}
			  			hashPassword = hash;
			  			connection.query("INSERT INTO users (first_name,last_name,email,password,created_at) VALUES (?,?,?,?,?)",[data.first_name,data.last_name,data.email,hashPassword,new Date()],(err,rows)=>{
							connection.release();
							if(!err) {
								var payload = {
									user_id:rows.insertId,
									first_name: data.first_name
								};
								var token = jwt.encode(payload, cfg.jwtSecret);
								res.json({payload,token});	
							}else {
								throw Error(err);
								res.status(500).send('Something broke!');
							}
						});
			  		});
				})
				.catch((errors) => {
			  		console.log(errors);
			  		res.status(400).send({error: errors});
			 	})
			connection.on('error', (err)=>{      
				console.log({"code" : 100, "status" : "Error in connection database", "err":err});
				throw Error(err);
			});
	    });
	},


	loginUser : (req,res)=>{
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);
			validateAll(req.body, validation.user_login_rules)
				.then((data) => {
			  		console.log(data);
			  		connection.query("SELECT id,first_name,password FROM users WHERE email = ?",[data.email],(err,user)=>{
						connection.release(); 
						if(!err) {
							bcrypt.compare(data.password,user[0].password,(err,res)=>{
								if(err){
									throw Error(err);
									res.send(500).send({error: errors})
								} else {
									if(res){
										var payload = {
											user_id:user[0].id,
											first_name: user[0].first_name
										};
										var token = jwt.encode(payload, cfg.jwtSecret);
										res.json({payload,token});	
									} else {
										res.sendStatus(400).send({error: "incorrect username or password"});
									}	
								}
							})
						}else {
							throw Error(err);
							res.status(500).send('Something broke!');
						}
					});
				})
				.catch((errors) => {
			  		console.log(errors);
			  		res.status(400).send({error: errors});
			 	})
			connection.on('error', (err)=>{      
				console.log({"code" : 100, "status" : "Error in connection database", "err":err});
				throw Error(err);
			});
	    });
	}
}

//handle if no user found