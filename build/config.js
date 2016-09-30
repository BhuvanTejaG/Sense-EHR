// Database contact info
exports.db = {
   url: "mongodb://localhost:27017/ehr",
   collections: ['doctors','patients']
}

exports.sqldb = {
	host: "localhost",
	user: "root",
	password: "1234",
	database: "ehr"
}


// Port Info
exports.port = 3000;
exports.base = "http://localhost:" + exports.port;
