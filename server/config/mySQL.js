//--- Dependencies ---//
var mysql = require('mysql');
var Prvt = require('../../private.js');

//--- Update database for application ---//
module.exports = {
	pool : mysql.createPool({
		//connectionLimit : 100,
		host 			: 'localhost',
		user 			: 'root',
		password 		: Prvt.pass,
		database 		: 'finapp',
		debug 			: false
	})
}