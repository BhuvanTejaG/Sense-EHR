var mysql = require('mysql');
var config = require('../../config.js');

function getConnection(){	
	var connection=mysql.createConnection({
		host     : config.sqldb.host,
		user     : config.sqldb.user,
		password : config.sqldb.password,
		database : config.sqldb.database
	});
	//sqlCaching();
	return connection;
};	

exports.fetchData = function(callback, sqlQuery) {

	console.log("\nSQL Query::" + sqlQuery);

	var connection = getConnection();

	connection.query(sqlQuery, function(err, rows, fields) {

		if (err) {
			callback(err);
		} else { // return err or result
			console.log(rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}


exports.getConnection=getConnection;
