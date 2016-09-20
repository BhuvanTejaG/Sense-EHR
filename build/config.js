// Database contact info
exports.db = {
   url: "mongodb://localhost:27017/ehr",
   collections: ['doctors','patients']
}


// Port Info
exports.port = 3000;
exports.base = "http://localhost:" + exports.port;
