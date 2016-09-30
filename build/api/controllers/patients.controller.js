var mysql = require('../data/dbconnection.js');

module.exports.getProfile = function(req,res){

	var patId=req.params.patient_id;
	
	console.log("[]: Patient id isss::: %s",patId);
	query = "select * from patient where patient_id = '"+patId+"'";
	
	mysql.fetchData(function(err,results){
		if(err){
			res
				.status(500)
				.json(err);
		}
		else 
		{
			console.log(JSON.stringify(results));
			
			res
				.status(200)
				.json(results);
		}  
	},query);
};