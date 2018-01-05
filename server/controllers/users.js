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
		validateAll(req.body, validation.registerUser_rules)
			.then((data) => {
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.error({"code" : 100, "status" : "Error in connection database","err":err});
						res.status(500).send({error: {msg:err,status:500}});
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
			  					console.error('!!!!!! error status',err.errno ,err.code, err.sqlMessage);
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
						res.status(500).send({error: {msg:err,status:500}});
					});
			    });
			})
			.catch((errors) => {
		  		console.error(errors);
		  		res.status(400).send({error: errors});
		 	});
	},


	loginUser : (req,res)=>{
		validateAll(req.body, validation.loginUser_rules)
			.then((data) => {
				MySQL.pool.getConnection((err,connection)=>{
					if (err) {
						connection.release();
						console.error({"code" : 100, "status" : "Error in connection database","err":err});
						res.status(500).send({error: {msg:err,status:500}});
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
						res.status(500).send({error: {msg:err,status:500}});
					});
			    });
			})
			.catch((errors) => {
		  		console.error(errors);
		  		res.status(400).send({error: errors});
		 	});
	}
};
