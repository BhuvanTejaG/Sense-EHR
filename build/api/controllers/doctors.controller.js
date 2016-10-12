var mysql = require('../data/dbconnection.js');

module.exports.getPatients = function(req,res){

	var docId=req.params.doctor_id;
	
	console.log("[]: Doctor id isss::: %s",docId);
	query = "select * from patient where patient_id in (select distinct patient_id from appointment where doctor_id = '"+docId+"') limit 9 ";
	
	mysql.fetchData(function(err,results){
		if(err){
			
			console.log('[]: Got Error in fetching patient records.');
			
			console.log(err);
			
			res
				.status(500)
				.json(err);
		}
		else if(results.length > 0)
		{
			
			console.log('[]: Got Success in fetching patients records.');
			
			console.log(JSON.stringify(results));
			
			res
				.status(200)
				.json(results);
			
		} else {
			
			console.log('[]: No Records Found.');
			
			
			res
				.status(204)
				.json(results);
			
		}
		 
	},query);
};


module.exports.getSpecificPatients = function(req,res){

	var docId=req.params.doctor_id;
	var letter = req.params.letter;
	
	console.log("[]: Doctor id isss::: %s",docId);
	query = "select * from patient where patient_id in (select distinct patient_id from appointment where doctor_id = '"+docId+"') and first_name COLLATE UTF8_GENERAL_CI like '"+letter+"%' limit 9 ";
	
	mysql.fetchData(function(err,results){
		if(err){
			
			console.log('[]: Got Error in fetching patient records.');
			
			console.log(err);
			
			res
				.status(500)
				.json(err);
		}
		else if(results.length > 0)
		{
			
			console.log('[]: Got Success in fetching patients records.');
			
			console.log(JSON.stringify(results));
			
			res
				.status(200)
				.json(results);
			
		} else {
			
			console.log('[]: No Records Found.');
			
			
			res
				.status(204)
				.json(results);
			
		}
		 
	},query);
};



module.exports.getAppointmentCount = function(req,res){

	var docId=req.params.doctor_id;
	
	console.log("[]: Doctor id isss::: %s",docId);
	
	query = "SELECT count(appointment_id) as Count , DAYNAME(date) as Day from appointment where date BETWEEN NOW() - INTERVAL 30 DAY AND NOW() and doctor_id = '"+docId+"' GROUP BY DAYNAME(date)";

	
	mysql.fetchData(function(err,results){
		if(err){
			
			console.log('[]: Got Error in fetching appointment count.');
			
			console.log(err);
			
			res
				.status(500)
				.json(err);
		}
		else if(results.length > 0)
		{
			
			console.log('[]: Got Success in fetching appointment count.');
			
			console.log(JSON.stringify(results));
			
			res
				.status(200)
				.json(results);
			
		} else {
			
			console.log('[]: No Records Found.');
			
			
			res
				.status(204)
				.json(results);
			
		}
		 
	},query);
};



module.exports.getBloodPressures = function(req,res){

	var docId=req.params.doctor_id;
	
	console.log("[]: Doctor id isss::: %s",docId);

	query = "SELECT t3.first_name,t1.systolic_pressure, t1.diastolic_pressure "+
			"FROM blood_pressure t1, patient t3 "+
			"WHERE t1.sampleId = (SELECT t2.sampleId "+
			                 	 "FROM blood_pressure t2 "+
			                     "WHERE t2.patient_id = t1.patient_id "+            
			                     "ORDER BY t2.sampleId DESC "+
			                     "LIMIT 1) "+ 
			"and t1.patient_id in (select distinct patient_id "+ 
			                     "from appointment "+ 
			                     "where doctor_id = '"+docId+"' "+ 
			                     "order by date desc) "+ 
			"and t1.patient_id = t3.patient_id "+ 
			"order by t1.captured_time desc limit 40";

	
	mysql.fetchData(function(err,results){
		if(err){
			
			console.log('[]: Got Error in fetching Blood Pressures.');
			
			console.log(err);
			
			res
				.status(500)
				.json(err);
		}
		else if(results.length > 0)
		{
			
			console.log('[]: Got Success in fetching Blood Pressures.');
			
			console.log(JSON.stringify(results));
			
			res
				.status(200)
				.json(results);
			
		} else {
			
			console.log('[]: No Records Found.');
			
			
			res
				.status(204)
				.json(results);
			
		}
		 
	},query);
};



module.exports.getLimitedBP = function(req,res){

	var docId=req.params.doctor_id;
	
	console.log("[]: Doctor id isss::: %s",docId);
	
	query = "select t2.first_name, t1.patient_id, t1. systolic_pressure, t1.diastolic_pressure "+
			"from (SELECT * FROM   blood_pressure a WHERE "+
			"( SELECT COUNT(*) FROM   blood_pressure b "+
			"where  b.patient_id = a.patient_id and b.sampleId >= a.sampleId ) <= 7 "+
			"and patient_id in (select patient_id from "+
			"(select distinct patient_id from appointment where doctor_id = '"+docId+"' "+
			"order by date desc limit 7 ) as T)order by patient_id, captured_time desc ) "+
			"as t1, patient t2 where t1.patient_id = t2.patient_id";


	
	mysql.fetchData(function(err,results){
		if(err){
			
			console.log('[]: Got Error in fetching Limited Blood Pressures.');
			
			console.log(err);
			
			res
				.status(500)
				.json(err);
		}
		else if(results.length > 0)
		{
			
			console.log('[]: Got Success in fetching Limited Blood Pressures.');
			
			console.log(JSON.stringify(results));
			
			res
				.status(200)
				.json(results);
			
		} else {
			
			console.log('[]: No Records Found.');
			
			
			res
				.status(204)
				.json(results);
			
		}
		 
	},query);
};