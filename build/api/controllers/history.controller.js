var mysql = require('../data/dbconnection.js');
var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');
var connection = mysql.getConnection();
var twilio = require('../controllers/twilio.js');


module.exports.sendMessageAsDoctor = function(req,res){
	
	var text = req.body;
	console.log(JSON.stringify(text));
	var message=text.text;
	var members=text.list;
	var criticality=text.criticality;
	var doctor_id=text.doctor_id;
	var patient_id=text.patient_id;

	var to_patient,to_caretaker=true;
	if(members.length==2||members.length==0){
		to_patient='true';
		to_caretaker='true';
	}
	else if(members[0]=="Patient"){
		to_patient='true';
		to_caretaker='false';
	}
	else if(members[0]=="Care Taker"){
		to_patient='false';
		to_caretaker='true';
	}
	console.log(message+"   "+members);
	

	sqlquery = "insert into message (patient_id, doctor_id, text, criticality, to_patient, to_caretaker) values (?, ?, ?, ?, ?, ?)";
	
	 
	connection.query(sqlquery, [patient_id, doctor_id, message, criticality, to_patient, to_caretaker],  function(err, result) {
		if (err) {
			console.log(err);
			res
				.status(500)
				.json(err);
		
		} else {
			console.log("[]: Message Insserted");
			  
			var query1="select contact,emergency_contact from patient where patient_id='"+patient_id+"'";
		         mysql.fetchData(function(err, results){
		   	      if(err) {
		   	         console.log('error inserting data');
		   	         res.status(500)
		   	            .json(err);
		   	      } else {
		   	    	 console.log("**************** twilio started ***************");
		 	         twilio.sendMessage(message,results[0].contact);
		 	         twilio.sendMessage(message,results[0].emergency_contact);
			         console.log("**************** twilio ended ***************");
			         
			         res
						.status(200)
						.json(result);
		   	      }
		         },query1);
		}
	});
};



module.exports.sendMessageAsPatient = function(req,res){
	
	var text = req.body;
	console.log(JSON.stringify(text));
	var message=text.text;
	var members=text.list;
	var criticality=text.criticality;
	var doctor_id=text.doctor_id;
	var patient_id=text.patient_id;
	var to_patient='false';
	var to_caretaker='false';
	
	var to_patient,to_caretaker=false;
	console.log(message+"   "+members);
	

	sqlquery = "insert into message (patient_id, doctor_id, text, criticality, to_patient, to_caretaker) values (?, ?, ?, ?, ?, ?)";
	
	 
	connection.query(sqlquery, [patient_id, doctor_id, message, criticality, to_patient, to_caretaker],  function(err, result) {
		if (err) {
			console.log(err);
			res
				.status(500)
				.json(err);
		
		} else {
			console.log("[]: Message Inserted");
			  
			var query1="select phone from doctor where doctor_id='"+doctor_id+"'";
		         mysql.fetchData(function(err, results){
		   	      if(err) {
		   	         console.log('error inserting data');
		   	         res.status(500)
		   	            .json(err);
		   	      } else {
		   	    	 console.log("**************** twilio started ***************");
		 	         twilio.sendMessage(message,results[0].phone);
			         console.log("**************** twilio ended ***************");
			         
			         res
						.status(200)
						.json(result);
		   	      }
		         },query1);
		}
	});
};




module.exports.getReasons = function(req,res){

	query = "select * from reasons LIMIT 100";
	
	mysql.fetchData(function(err,results){
		if(err){
			console.log(err);
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

module.exports.getMedicalRecord = function(req,res){

	var apptId = req.params.appt_id;
	
	console.log("[]: Appointment id is: %s", apptId);
	query = "SELECT p.patient_id,d.doctor_id, concat(p.first_name,' ',p.last_name) as patientName, TIMESTAMPDIFF(YEAR, p.birthdate, CURDATE())+1 AS age, a.height, a.weight, concat(d.first_name,' ',d.last_name) as doctorName, d.specialization, DATE_FORMAT(a.date,'%Y-%m-%d') as apptDate, DATE_FORMAT(a.date, '%h:%i %p') as apptTime, a.reason as apptReason, a.isChronic, a.isTransplant, a.isRenal, a.isPregnant, a.isDialysis, m.systolic_pressure, m.diastolic_pressure, m.temperature, r.reason, m.comments FROM appointment a Inner JOIN patient p on a.patient_id = p.patient_id Inner JOIN doctor d on d.doctor_id = a.doctor_id Left join medical_history_record m on a.appointment_id = m.appt_id left join reasons r on r.reason_id = m.reason_id where a.appointment_id='"+apptId+"'";
	
	mysql.fetchData(function(err,results){
		if(err){
			console.log(err);
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

module.exports.getMedications = function(req,res){

	var apptId = req.params.apptId;
	
	console.log("[]: Patient id is: %s", apptId);
	query = "SELECT @row:=@row+1 sno, drug_name, medication.usage, purpose, DATE_FORMAT(start_date,'%Y-%m-%d') as start_date, DATE_FORMAT(end_date,'%Y-%m-%d') as end_date, appt_id FROM medication, (SELECT @row:= 0) AS row where appt_id = '" +apptId +"'";
	
	mysql.fetchData(function(err,results){
		if(err){
			console.log(err);
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

module.exports.putMedications = function(req,res){
	var medications = req.body;
	console.log(JSON.stringify(medications));
	var appt_id = medications[0]['appt_id'];
	
	var cols = [];
	for(col in medications[0]){
		if(col == 'usage')
			col = 'medication.usage';
		cols.push(col);
	}
	
	var meds = [];
	for(var i = 0; i < medications.length; i++){
		var array = Object.keys(medications[i]).map(function(k) {
	        return "'" +medications[i][k] +"'";
	    });
		meds.push('(' +array +')');
	}

	console.log(meds);
	
	query = "delete from medication where appt_id = '" +appt_id +"'";
	
	mysql.fetchData(function(err,results){
		if(err){
			console.log(err);
			res
				.status(500)
				.json(err);
		}
		else 
		{
			console.log(JSON.stringify(results));
			var query2 = 'INSERT INTO medication (' + cols + ') VALUES ' + meds;
			console.log(query2);
			connection.query(query2, function(err, result) {
				console.log(JSON.stringify(result));
		        //connection.end();
		        res
				.status(200)
				.json(results);
		    });
			
		}  
	},query);
};

module.exports.putFile = function(req, res, next) {
	console.log("HI");
	console.log(req);
	if(req.file.fieldname == 'image') {
		// Create a new unique name for the image
		var filename =  uuid.v1() + path.extname(req.file.originalname);
		// Update the path of the image
		var newPath = path.resolve(__dirname, '../public/') + '/' +filename;
		var base64Data = req.file.buffer;
	    fs.writeFile(newPath, base64Data, "base64", function (err) {
	      if(err) {
	        res.status(500);
				res.send(err);
	      }
	      else {
				// INSERT THE FILE NAME OF IMAGE INTO MYSQL
				//connection.connect();
				console.log(newPath);
				connection.query('INSERT INTO test_results set ?', 
				{'image': newPath }, function(err) {
				if (err) {
					res.status(500);
					res.send(err);
				}
				else {
					//connection.end();
					res.status(200);
					res.send({ status: "Success" });
				 }
				});
	      }
	    });
   }
};