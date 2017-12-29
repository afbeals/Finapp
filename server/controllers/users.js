//--- Dependencies ---//
//--------------------//
var MySQL = require('../config/MySQL');
var jwt = require('jwt-simple');
var cfg = require('../../private');

module.exports = {
	// registerUser : (req,res,done)=>{
	// 	MySQL.pool.getConnection((err,connection)=>{
	// 		if (err) {
	// 			connection.release();
	// 			console.log({"code" : 100, "status" : "Error in connection database","err":err});
	// 			throw Error(err);
	// 		}   
	// 		console.log('connected as id ' + connection.threadId);   
	// 		connection.query("INSERT INTO users (first_name,last_name,email,password,created_at) VALUES (?,?,?,?,?)",[req.body.first_name,req.body.last_name,req.body.email,req.body.password,new Date()],(err,rows)=>{
	// 			if(!err) {
	// 				var payload = {
	// 					userId:rows.insertId
	// 				};
	// 				var token = jwt.encode(payload, cfg.jwtSecret);
	// 				res.json({user_id:rows.insertId,token:token});	
	// 			}else {
	// 				throw Error(err);
	// 				res.status(500).send('Something broke!');
	// 			}
	// 		});

	// 		connection.on('error', (err)=>{      
	// 			console.log({"code" : 100, "status" : "Error in connection database", "err":err});
	// 			throw Error(err);
	// 		});
	//     });
	// }

	registerUser : (req,res) =>{
		var payload = {
			user_Id:1
		};
		var token = jwt.encode(payload, cfg.jwtSecret);
		res.json({payload,token: 'Bearer '+token});	
	},

	loginUser : (req,res,done) =>{
		//run db query when successful:
		var data = {
			//return data
		};
		done(null, data);
	}
}