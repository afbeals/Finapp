//--- Dependencies ---//
var MySQL = require('../config/MySQL');

module.exports = {
	addExpensesInQuery : (req,res)=>{
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("INSERT INTO expenses (users_id,name,due_day,amount_due,amount_paid,notes,created_at) VALUES (?,?,?,?,?,?,NOW()) SET @expense_id = LAST_INSERT_ID(); INSERT INTO months_has_expenses (months_id,expenses_id,created_at) VALUES (?,@expense_id,NOW());",[req.body.users_id,req.body.name,req.body.due_day,req.body.amount_due,req.body.amount_paid,req.body.notes,req.body.month],(err,rows)=>{
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

	getAllExpenses : (req,res) => {
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("SELECT * FROM expenses WHERE users_id = ?",[req.query.users_id],(err,rows)=>{
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

	getAllExpensesInMonth : (req,res) => {
		MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("SELECT name, amount_due, month, expenses.id AS id FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ? AND months.id = ?",[req.query.users_id,req.query.month],(err,rows)=>{
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

	getAllExpensesInRange : (req,res) => {
		let query,params;
      	if(req.query.BegDay && req.query.EndDay){
      		query = "SELECT name, amount_due, month, expenses.id AS id FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ? AND (months.id >= ? AND months.id <= ?) AND (expenses.due_day >= ? AND expenses.due_day <= ?) ";
      		params = [req.query.users_id,req.query.begMnt,req.query.endMnt,req.query.begDay,req.query.endDay];
      	} else {
      		query = "SELECT name, amount_due, month, expenses.id AS id FROM expenses LEFT JOIN months_has_expenses ON expenses.id = months_has_expenses.expenses_id LEFT JOIN months ON months_has_expenses.months_id = months.id WHERE expenses.users_id = ? AND months.id >= ? AND months.id <= ?";
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

	updateExpensesInQuery : (req,res) => {
		let buildQuery = (obj) => {
			let query = "UPDATE expenses SET ";
		    for(let keys = Object.keys(obj), i = 0, end = keys.length; i < end; ++i) {
		        let key = keys[i], value = obj[key];
		        if(key != "id" && key != "users_id" && key != "month"){
		            if(i == 0){
		            	query += key+" = '"+ value+"'";
		            }else if(i != end-1){
		              query += ", "+key+" = '"+ value+"'";
		        	} else {              
		              query += ", "+key +" = '"+ value+"' WHERE users_id = "+obj['users_id']+" AND id = "+obj['id'];
		            }
		        }
		    }
			if(obj['month']){
				query += "; UPDATE months_has_expenses SET, months_id = '2' WHERE expenses_id = '4'";
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
			connection.query(buildQuery(req.query),(err,rows)=>{
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

	removeExpensesInQuery : (req,res) => {
	    MySQL.pool.getConnection((err,connection)=>{
			if (err) {
				connection.release();
				console.log({"code" : 100, "status" : "Error in connection database","err":err});
				throw Error(err);
			}   
			console.log('connected as id ' + connection.threadId);   
			connection.query("DETELE FROM expenses WHERE users_id = ? AND id = ?",[req.query.users_id,req.query.id],(err,rows)=>{
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