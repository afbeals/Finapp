//--- Dependencies ---//
var MySQL = require('./MySQL')

module.exports = function(app){
	app.post('/add_expenses_in_query',function(req,res){
	    MySQL.pool.getConnection(function(err,connection){
	      if (err) {
	      	connection.release();
	        console.log({"code" : 100, "status" : "Error in connection database","err":err});
	        throw Error(err);
	        return;
	      }   
	      console.log('connected as id ' + connection.threadId);   
	      connection.query("INSERT INTO expenses (users_id,name,due_day,amount_due,amount_paid,notes,created_at) VALUES (?,?,?,?,?,?,?);",[req.body.users_id,req.body.name,req.body.due_day,req.body.amount_due,req.body.amount_paid,req.body.notes,new Date(),new Date(),],function(err,rows){
	        connection.release(); 
	        if(!err) {
	           res.status(200).send();
	        }else {
	        	throw Error(err);
	        	res.status(500).send('Something broke!');
	        }
	      });
	      connection.on('error', function(err) {      
	        console.log({"code" : 100, "status" : "Error in connection database", "err":err});
	        throw Error(err);
	        return;     
	      });
	    });
	});

	app.get('/get_all_expenses',function(req,res){
	    MySQL.pool.getConnection(function(err,connection){
	      if (err) {
	      	connection.release();
	        console.log({"code" : 100, "status" : "Error in connection database","err":err});
	        throw Error(err);
	        return;
	      }   
	      console.log('connected as id ' + connection.threadId);   
	      connection.query("SELECT * FROM expenses WHERE users_id = ?",[req.query.users_id],function(err,rows){
	        connection.release(); 
	        if(!err) {
	           res.json(rows);
	        }else {
	        	throw Error(err);
	        	res.status(500).send('Something broke!');
	        }
	      });
	      connection.on('error', function(err) {      
	        console.log({"code" : 100, "status" : "Error in connection database", "err":err});
	        throw Error(err);
	        return;     
	      });
	    });
	});

	app.get('/get_all_expenses_in_month',function(req,res){
	    MySQL.pool.getConnection(function(err,connection){
	      if (err) {
	      	connection.release();
	        console.log({"code" : 100, "status" : "Error in connection database","err":err});
	        throw Error(err);
	        return;
	      }   
	      console.log('connected as id ' + connection.threadId);   
	      connection.query("SELECT * FROM expenses WHERE users_id = ? AND month = ?",[req.query.users_id,req.query.month],function(err,rows){
	        connection.release(); 
	        if(!err) {
	           res.json(rows);
	        }else {
	        	throw Error(err);
	        	res.status(500).send('Something broke!');
	        }
	      });
	      connection.on('error', function(err) {      
	        console.log({"code" : 100, "status" : "Error in connection database", "err":err});
	        throw Error(err);
	        return;     
	      });
	    });
	});

	app.get('/get_all_expenses_in_range',function(req,res){
		let query,params;
      	if(req.query.BegDay && req.query.EndDay){
      		query = "SELECT * FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE users_id = ? AND months.id >= ? AND months.id <= ? AND expenses.due_day >= ? AND expenses.due_day <= ? ";
      		params = [req.query.users_id,req.query.begMnt,req.query.endMnt,req.query.begDay,req.query.endDay];
      	} else {
      		query = "SELECT * FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE users_id = ? AND months.id >= ? AND months.id <= ?";
      		params = [req.query.users_id,req.query.begMnt,req.query.endMnt]
      	}
	    MySQL.pool.getConnection(function(err,connection){
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
				return;
			}   
			console.log('connected as id ' + connection.threadId);  
			connection.query(query,params,function(err,rows){
				connection.release(); 
				if(!err) {
			   		res.json(rows);
				}else {
					throw Error(err);
					res.status(500).send('Something broke!');
				}
			});
			connection.on('error', function(err) {      
				console.log({"code" : 100, "status" : "Error in connection database", "err":err});
				throw Error(err);
				return;
			});
	    });
	});

	app.get('/remove_expenses_in_query',function(req,res){
		var buildQuery = (obj) => {
			let query = "UPDATE expenses SET";
		    for(let keys = Object.keys(obj), i = 0, end = keys.length; i < end; ++i) {
		        let key = keys[i], value = obj[key];
		        if(key != "id" && key != "users_id"){
		            if(i != end-1){
		              query += ", "+key+" = '"+ value+"'";
		            } else {              
		              query += ", "+key +" = '"+ value+"' WHERE users_id = "+obj['users_id']+" AND id = "+obj['id'];
		            }
		        }
		    };
		    return query;
		}

	    MySQL.pool.getConnection(function(err,connection){
	      if (err) {
	      	connection.release();
	        console.log({"code" : 100, "status" : "Error in connection database","err":err});
	        throw Error(err);
	        return;
	      }   
	      console.log('connected as id ' + connection.threadId);   
	      connection.query(buildQuery,function(err,rows){
	        connection.release(); 
	        if(!err) {
	           res.json(rows);
	        }else {
	        	throw Error(err);
	        	res.status(500).send('Something broke!');
	        }
	      });
	      connection.on('error', function(err) {      
	        console.log({"code" : 100, "status" : "Error in connection database", "err":err});
	        throw Error(err);
	        return;     
	      });
	    });
	});
}