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
	})


}