var mysql = require('../data/dbconnection.js');
var twilio = require('../controllers/twilio.js');

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

module.exports.getPatientInboxMessages = function(req,res){

	var patId=req.params.patient_id;
	
	console.log("[]: Patient id isss::: %s",patId);
	query = "select concat(d.first_name,' ',d.last_name) as name,m.created_date,m.text,m.criticality " +
			"from message m left outer join doctor d on d.doctor_id=m.doctor_id where m.patient_id='"+patId+"' and " +
			"m.to_patient='true' or m.to_caretaker ='true' order by m.created_date desc ";

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

module.exports.getPatientSentMessages = function(req,res){

	var patId=req.params.patient_id;
	
	console.log("[]: Patient id isss::: %s",patId);
	query = "select concat(d.first_name,' ',d.last_name) as name,m.created_date,m.text,m.criticality" +
			" from message m left outer join doctor d on d.doctor_id=m.doctor_id where m.patient_id='"+patId+"' " +
					"and m.to_patient='false' and m.to_caretaker='false' order by m.created_date desc ";
	
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
			"from blood_pressure WHERE patient_id='"+patId+"' and DATE_SUB(CURDATE(),INTERVAL 120 DAY) <= captured_time order by captured_time desc";
	
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
	var query = "select * from medication m , appointment a where a.appointment_id=m.appt_id and m.end_date >= CURDATE() and a.patient_id='"+patId+"'";
	
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
// Sravani Files 

module.exports.submitAppointment = function(req, res) {
	   var patient_id = req.body.patient_id;
	   var city = req.body.city;
	   var specialization = req.body.specialization;
	   var doctor_id = req.body.doctor_id;
	   var height = req.body.height;
	   var weight = req.body.weight;
	   var reason = req.body.reason;
	   var description = req.body.description;
	   var disease = req.body.disease;
	   var date = req.body.date;
	   var isPregnant = req.body.isPregnant;
	   var isRenal = req.body.isRenal;
	   var isChronic = req.body.isChronic;
	   var isDialysis = req.body.isDialysis;
	   var isTransplant = req.body.isKidney;
	   var doctName = req.body.first_name +" "+req.body.last_name;
	   var docAddr = req.body.doctorAddr;
	   
	   console.log("Date in insert"+date);
	   console.log(patient_id+"::::"+city+"::::"+specialization+"::::"+doctor_id+"::::"+height+"::::"+weight+"::::"+reason+"::::"+description);
	   query = "insert into appointment (patient_id, doctor_id, height, weight, reason, date, description,isPregnant,isRenal,isChronic,isDialysis,isTransplant" +
	      ") values ("+patient_id+","+doctor_id+","+height+","+ weight+",'"+ reason+"','"+ date+"','"+ description+"',"+isPregnant+","+isRenal+","+isChronic+","+isDialysis+","+isTransplant+");";
	   console.log("Query in submitting"+query);
	   mysql.fetchData(function(err, results){
	      if(err) {
	         console.log('error inserting data');
	         res.status(500)
	            .json(err);
	      } else {
	         console.log('api results===',results.insertId);

	         console.log("**************** twilio started ***************");
	         
	         var query1="select contact from patient where patient_id='"+patient_id+"'";
	         mysql.fetchData(function(err, results){
	   	      if(err) {
	   	         console.log('error inserting data');
	   	         res.status(500)
	   	            .json(err);
	   	      } else {
	 	         
	   	    	  var message = "Booked the appointment succefully";
	 	         twilio.sendMessage(message,results[0].contact);
		         console.log("**************** twilio ended ***************");
		         
		         res
		            .status(201)
		            .json(results);

	   	      }
	         },query1);
	         
	      }
	   },query);
	};

	module.exports.getUpcomingAppointments = function(req, res) {
	   var patientId = req.params.patient_id;
	   console.log('enter getUpcomingAppointments**********************');
	   query = "select d.first_name,d.last_name,a.date,d.clinic_address1, d.clinic_address2, d.city, d.state, d.country,d.zip,a.reason from appointment a, doctor d where a.date > current_date() and a.patient_id ='"+ patientId +"'and d.doctor_id = a.doctor_id";
	   mysql.fetchData(function (err, results) {
	      if (err) {
	         console.log('Error fetching data');
	         res.status(500)
	            .json(err);
	      } else if (results.length > 0) {
	         console.log('success fetching data');
	         console.log(JSON.stringify(results));
	         res
	            .status(200)
	            .json(results);
	      } else {
	         console.log('No records found');
	         res.status(204)
	            .json(results);
	      }
	   }, query);
	};

	module.exports.getPreviousAppointments = function(req, res) {
	   var patientId = req.params.patient_id;
	   console.log('*****************enter getPreviousAppointments*************');
	   query = "select a.appointment_id,d.first_name,d.last_name,a.date,d.clinic_address1, d.clinic_address2, d.city, d.state, d.country,d.zip,a.reason from appointment a, doctor d where a.date < current_date() and a.patient_id ='"+ patientId +"'and d.doctor_id = a.doctor_id";
	   mysql.fetchData(function(err, results) {
	      if(err) {
	         console.log('Error fetching data');
	         res.status(500)
	            .json(err);
	      } else if(results.length > 0) {
	         console.log('success fetching  previous appointment');
	         console.log(JSON.stringify(results));
	         res
	            .status(200)
	            .json(results);
	      } else {
	         console.log('No records found');
	         res.status(204)
	            .json(results);
	      }
	   }, query);
	};

// Sravani API's ENd
module.exports.getMedicationTips = function(req,res){
	var patId=req.params.patient_id;
	console.log("[]: Patient id isss::: %s",patId);
	var query = "select r.type,r.foods from recommendations r where (((select b.systolic_pressure from blood_pressure b where b.patient_id=" +patId +" order by b.captured_time desc limit 1) between r.sys_pressure_min  and r.sys_pressure_max ) or ((select b.diastolic_pressure from blood_pressure b where b.patient_id=" +patId +" order by b.captured_time desc limit 1) between r.dia_pressure_min and r.dia_pressure_max ))";
	
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
	