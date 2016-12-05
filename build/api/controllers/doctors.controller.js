var mysql = require('../data/dbconnection.js');
var twilio = require('../controllers/twilio.js');

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

// Murthy API's

module.exports.getDoctorInboxMessages = function(req,res){

	var docId=req.params.doctor_id;
	console.log("[]: Doctor id isss::: %s",docId);
	query = "select concat(p.first_name,' ',p.last_name) as name,m.created_date,m.text,m.criticality from " +
			"message m left outer join patient p on p.patient_id=m.patient_id where m.doctor_id='"+docId+"' and " +
					"m.to_patient ='false' and m.to_caretaker='false' order by m.created_date desc";

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

module.exports.getDoctorSentMessages = function(req,res){

	var docId=req.params.doctor_id;
	console.log("[]: Doctor id isss::: %s",docId);
	query = "select concat(p.first_name,' ',p.last_name) as name,m.created_date,m.text,m.criticality from " +
			"message m left outer join patient p on p.patient_id=m.patient_id where m.doctor_id='"+docId+"' and " +
					"m.to_patient='true'  or m.to_caretaker='true' order by m.created_date desc";
	
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

module.exports.getDoctorProfile = function(req,res){

	var docId=req.params.doctor_id;
	
	console.log("[]: Doctor id isss::: %s",docId);
	query = "select * from doctor where doctor_id = '"+docId+"'";
	
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

module.exports.updateDoctorProfile = function(req,res){

	var doctor_id=req.body.doctor_id;
	console.log(doctor_id);
	
  	var first_name=req.body.first_name;
  	var last_name=req.body.last_name;
  	var email=req.body.email;
  	var specialization=req.body.specialization;
  	var gender=req.body.gender;
  	//var birthday=req.body.birthday;
  	var address_line1=req.body.add1;
  	var address_line2=req.body.add2;
  	var contact=req.body.contact;
  	var city=req.body.city;
  	var state=req.body.state;
  	var zip=req.body.zip;
  	var image=req.body.image;
  	var clinicName=req.body.clinicName;
	
	console.log("[]: Doctor id isss::: %s",doctor_id);

	var queryDoctor="select email from doctor where doctor_id='"+doctor_id+"'";
	
	
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
				console.log("Doctor Email is Same in Login table");
				
				var query = "update doctor set first_name='"+first_name+"',last_name='"+last_name+"',email='"+email+"',specialization='"+specialization+"'," +
							"gender='"+gender+"',clinic_address1='"+address_line1+"',clinic_address2='"+address_line2+"',phone='"+contact+"'," +
							"city='"+city+"',state='"+state+"',zip='"+zip+"',image='"+image+"',clinic_name='"+clinicName+"'  " +
							"where doctor_id = '"+doctor_id+"'";
				
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
				
				var updateEmailDoctor="update doctor set email='"+email+"' where email='"+results[0].email+"'";
	
				mysql.fetchData(function(err,results){
					if(err){
						res
							.status(500)
							.json(err);
					}
					else 
					{
						console.log(JSON.stringify(results));
						console.log("Doctor Email Updated in Login table");
						
						var query = "update doctor set first_name='"+first_name+"',last_name='"+last_name+"',email='"+email+"',specialization='"+specialization+"'," +
						"gender='"+gender+"',clinic_address1='"+address_line1+"',clinic_address2='"+address_line2+"',phone='"+contact+"'," +
						"city='"+city+"',state='"+state+"',zip='"+zip+"',image='"+image+"',clinic_name='"+clinicName+"'  " +
						"where doctor_id = '"+doctor_id+"'";
		
						
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
					},updateEmailDoctor);
					}
			}
	 },queryDoctor);
};
//Murthy API's'

// Sravani Files

module.exports.docSpecialization = function(req, res) {
	   query = "select distinct(specialization) from doctor;";
	   mysql.fetchData(function(err, results) {
	      if(err) {
	         console.log('error in fetching specs');
	         console.log(err);
	         res.status(500).json(err);
	      } else if(results.length > 0) {
	         console.log('success fetching specs'+JSON.stringify(results));
	         res.status(200).json(results);
	      } else {
	         console.log('no records found');
	         res.status(204).json(results);
	      }
	   }, query);
	};

	module.exports.doctorCriteria = function(req, res) {
	   console.log("entered doctor criteria in server*********************");
	   var date = req.body.date;
	   var spec = req.body.specialization;
	   var city = req.body.city;
	   query="SELECT * FROM doctor d where UPPER(d.specialization) like UPPER('%"+spec+"%') and UPPER(d.city) like UPPER('%"+city+"%')" +
	      "and d.doctor_id not in(select a.doctor_id from appointment a where date BETWEEN '"+date+"' and '"+date+"' - INTERVAL 1 HOUR)" +
	      "and d.doctor_id not in(select a.doctor_id from appointment a where date BETWEEN '"+date+"' and '"+date+"' + interval 1 hour);";
	   mysql.fetchData(function(err,results) {
	      console.log("entered doctor criteria in server*********************");
	      if(err) {
	         console.log('Error in fetching doctors');
	         console.log(err);
	         res.status(500).json(err);
	      } else if(results.length > 0) {
	         console.log('Success in fetching doctors');
	         console.log(JSON.stringify(results));
	         res.status(200).json(results);
	      }  else {
	         console.log('no records found');
	         res.status(204).json(results);
	      }
	   },query);
	};

	module.exports.doctorCities = function(req, res) {
	   console.log("state in server"+req.body.state);
	   var state = req.body.state;
	   console.log("entered server Doctor cities");
	   query = "select distinct(city) from doctor where UPPER(state) like Upper('%"+state+"%');";
	   mysql.fetchData(function(err,results) {
	      console.log("**** entered doc city in server****");
	      if(err) {
	         console.log('error in fetching city'+err);
	         res.status(500).json(err);
	      } else if(results.length > 0) {
	         console.log('success in fetching results'+ JSON.stringify(results));
	         res.status(200).json(results);
	      } else {
	         console.log('city not found in server');
	         res.status(204).json(results);
	      }
	   },query);
	};

	module.exports.doctorAddress = function(req, res) {
	   console.log("********entered into doctor Address *************");
	   var docId = req.params.doctor_id;
	   query = "select clinic_address1,first_name,last_name, clinic_address2,city, state,country, zip from doctor where doctor_id ='"+docId+"'";
	   mysql.fetchData(function(err, results) {
	      console.log("******entered doc address in server******");
	      if(err) {
	         console.log('error in fetching doc address');
	         console.log(err);
	         res.status(500).json(err);
	      } else if (results.length > 0) {
	         console.log('Success in fetching doctors');
	         console.log(JSON.stringify(results));
	         res.status(200).json(results);
	      } else {
	         console.log('no address found');
	         res.status(204).json(results);
	      }
	   }, query);
	};

	module.exports.getCurrentAppointments = function(req, res) {
	   var docId = req.params.doctor_id;
	   console.log('enter getCurrent doctor Appointments**********************');
	   query = "SELECT a.appointment_id,p.first_name, p.last_name, a.date, a.reason FROM appointment a, patient p " +
	      "WHERE a.date BETWEEN NOW() AND NOW() + INTERVAL 24 HOUR and a.patient_id = p.patient_id and doctor_id = '"+ docId +"'";
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

	module.exports.getAllAppointments = function(req, res) {
	   var docId = req.params.doctor_id;
	   console.log('enter get all doctor Appointments**********************');
	   query = "select a.appointment_id,p.first_name, p.last_name, a.date, a.reason from appointment a, patient p " +
	      "where p.patient_id = a.patient_id and a.doctor_id ='"+docId+"'";
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
// Sravani Files End
	
	