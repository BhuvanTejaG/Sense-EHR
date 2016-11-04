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

//Murthy API's
module.exports.getBloodPressure = function(req,res){
	var patId=req.params.patient_id;
	console.log("[]: Patient id isss::: %s",patId);
	query = "select systolic_pressure,diastolic_pressure,captured_time from " +
			"blood_pressure where patient_id='"+patId+"' order by captured_time asc limit 50";
	
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

module.exports.getHealthStatus = function(req,res){
	var patId=req.params.patient_id;
	console.log("[]: Patient id isss::: %s",patId);
	query = "SELECT captured_time ,(CASE when (systolic_pressure < 115 || systolic_pressure >125) " +
			"&& (diastolic_pressure < 75 || diastolic_pressure >85) THEN 'Good' " +
			"else 'Bad' end) as state " +
			"from blood_pressure WHERE patient_id='"+patId+"' and DATE_SUB(CURDATE(),INTERVAL 30 DAY) <= captured_time order by captured_time desc";
	
	mysql.fetchData(function(err,results){
		if(err){
			res
				.status(500)
				.json(err);
		}
		else 
		{
			res
				.status(200)
				.json(results);
		}  
	},query);
};


module.exports.getPatientMedication = function(req,res){
	var patId=req.params.patient_id;
	console.log("[]: Patient id isss::: %s",patId);
	var query = "select * from medication where end_date >= CURDATE() and patient_id='"+patId+"'";
	
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

module.exports.getPatientStepsAndWeight = function(req,res){
	var patId=req.params.patient_id;
	console.log("[]: Patient id isss::: %s",patId);
	var query1 = "select step_count,time_captured from steps where patient_id='"+patId+"' order by time_captured asc limit 50";
	

	mysql.fetchData(function(err,results){
		if(err){
			res
				.status(500)
				.json(err);
		}
		else 
		{
			var query="select weight,date from appointment where patient_id='"+patId+"' order by date asc limit 50";
			
			console.log(query);	
			var connection = mysql.getConnection();
				connection.query(query, function(err, rows, fields) {
					if(err){
						res
						.status(500)
						.json(err);
					}
					else{
						console.log(JSON.stringify(rows));
						console.log(JSON.stringify(results));
						var response={
							"steps":results,
							"weight":rows
						};
						console.log(response);
						res
						.status(200)
						.json(response);
					}
					connection.end();
				});			
			
		}  
	},query1);
};


module.exports.updatePatientProfile = function(req,res){

	var patient_id=req.body.patient_id;
	console.log(patient_id);
  	var first_name=req.body.first_name;
  	var last_name=req.body.last_name;
  	var email=req.body.email;
  	var blood_type=req.body.blood_type;
  	var race=req.body.race;
  	var gender=req.body.gender;
  	var birthdate=req.body.birthdate;
  	var address_line1=req.body.address_line1;
  	var address_line2=req.body.address_line2;
  	var contact=req.body.contact;
  	var city=req.body.city;
  	var state=req.body.state;
  	var zip=req.body.zip;
  	var emergency_contact_name=req.body.emergency_contact_name;
  	var emergency_contact=req.body.emergency_contact;
  	var emergency_contact_email=req.body.emergency_contact_email;
  	var image=req.body.image;
  	var insurance_provider=req.body.insurance_provider;
  	var insurance_id=req.body.insurance_id;
	
  	var params=[first_name,last_name,email,blood_type,race,gender,birthdate,address_line1,address_line2,contact,city
	            ,state,zip,emergency_contact_name,emergency_contact,emergency_contact_email,image,insurance_provider,
	            insurance_id];
	
	console.log("[]: Patient id isss::: %s",patient_id);

	var queryPatient="select email from patient where patient_id='"+patient_id+"'";
	
	
	// To get the email ID from login table if - different update that
	mysql.fetchData(function(err,results){
		if(err){
			res
				.status(500)
				.json(err);
		}
		else 
		{
			console.log(JSON.stringify(results));
			
			if(results[0].email===email){
				console.log("Patient Email is Same in Login table");
				
				var query = "update patient set first_name='"+first_name+"',last_name='"+last_name+"',email='"+email+"',blood_type='"+blood_type+"',race='"+race+"'," +
							"gender='"+gender+"',birthdate='"+birthdate+"',address_line1='"+address_line1+"',address_line2='"+address_line2+"',contact='"+contact+"'," +
							"city='"+city+"',state='"+state+"',zip='"+zip+"',emergency_contact_name='"+emergency_contact_name+"',emergency_contact='"+emergency_contact+"'" +
							" ,emergency_contact_email='"+emergency_contact_email+"',image='"+image+"',insurance_provider='"+insurance_provider+"',insurance_id='"+insurance_id+"'  " +
							"where patient_id = '"+patient_id+"'";
				
				console.log(query);	
				var connection = mysql.getConnection();
					connection.query(query, function(err, rows, fields) {
						if(err){
							res
							.status(500)
							.json(err);
						}
						else{
							console.log("Updated Successfully");
							res
							.status(200)
							.json(rows);
						}
						connection.end();
					});					
		}
			else{
				
				var updateEmailPatient="update patient set email='"+email+"' where email='"+results[0].email+"'";
	
				mysql.fetchData(function(err,results){
					if(err){
						res
							.status(500)
							.json(err);
					}
					else 
					{
						console.log(JSON.stringify(results));
						console.log("Patient Email Updated in Login table");
						
						var query = "update patient set first_name='"+first_name+"',last_name='"+last_name+"',email='"+email+"',blood_type='"+blood_type+"',race='"+race+"'," +
						"gender='"+gender+"',birthdate='"+birthdate+"',address_line1='"+address_line1+"',address_line2='"+address_line2+"',contact='"+contact+"'," +
						"city='"+city+"',state='"+state+"',zip='"+zip+"',emergency_contact_name='"+emergency_contact_name+"',emergency_contact='"+emergency_contact+"'" +
						" ,emergency_contact_email='"+emergency_contact_email+"',image='"+image+"',insurance_provider='"+insurance_provider+"',insurance_id='"+insurance_id+"'  " +
						"where patient_id = '"+patient_id+"'";	
						console.log(query);	
						
						var connection = mysql.getConnection();
							connection.query(query, function(err, rows, fields) {
								if(err){
									res
									.status(500)
									.json(err);
								}
								else{
									res
									.status(200)
									.json(rows);
								}
								connection.end();
							});	
					}
					},updateEmailPatient);
					}
			}
	 },queryPatient);

	
};
//Murthy API's