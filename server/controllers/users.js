//--- Dependencies ---//
//--------------------//
var MySQL = require('../config/MySQL');
var jwt = require('jwt-simple');
var cfg = require('../../private');

module.exports = {
	registerUser : (req,res)=>{
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("INSERT INTO users (first_name,last_name,email,password,created_at) VALUES (?,?,?,?,?)",[req.body.first_name,req.body.last_name,req.body.email,req.body.password,new Date()],(err,rows)=>{
				if(!err) {
					var payload = {
						user_id:rows.insertId,
						first_name: req.body.first_name
					};
					var token = jwt.encode(payload, cfg.jwtSecret);
					res.json({payload,token});	
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


	loginUser : (req,res)=>{
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);
			var password = req.body.password // <- setup bcrypt/hash password
			connection.query("SELECT id,first_name FROM users WHERE email = ? AND password = ?",[req.body.email,password],(err,user)=>{
				if(!err) {
					var payload = {
						user_id:user[0].id,
						first_name: user[0].first_name
					};
					var token = jwt.encode(payload, cfg.jwtSecret);
					console.log({payload,token});
					res.json({payload,token});	
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

//handle if no user found