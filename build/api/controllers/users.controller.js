var mysql = require('../data/dbconnection.js');

module.exports.login = function(req,res){

	  console.log('[]: logging in user');
	  
	  var username = req.params.username;
	  var password = req.params.password;
	  
	  console.log('[]: username is:: %s',username);
	  console.log('[]: password is:: %s',password);
	  
	query = "select * from login where email = '"+username+"' and password = '"+password+"'";
	
	mysql.fetchData(function(err,results){
		if(err){
			res
				.status(500)
				.json(err);
		}
		else if(results.length > 0)
		{
			console.log(JSON.stringify(results));
			
			res
				.status(200)
				.json(results);
		} else {
			
			res
				.status(204)
				.json(results);
			
		}  
	},query);
};


module.exports.FetchID = function(req,res){

	  console.log('[]: Fetching ID');
	  
	  var userId = req.params.username;
	  var type = req.params.type;
	  
		if(userId == "patient"){
			 getid = "select * from patient where email = '"+userId+"'";
		} else {
			getid = "select * from doctor where email = '"+userId+"'";
		}
		
		mysql.fetchData(function(err,result){
			if(err){
				res
					.status(500)
					.json(err);
			}
			else {
				
				res
					.status(200)
					.json(result);
				
			} 
		},getid);

};


module.exports.setProfile = function(req,res){

	  console.log('[]: Fetching ID');
	  
	  var userId = req.params.user_id;
	  var type = req.params.type;
	  
		if(userId == "patient"){
			 getProfile = "select * from patient where patient_id = '"+userId+"'";
		} else {
			getProfile = "select * from doctor where doctor_id = '"+userId+"'";
		}
		
		mysql.fetchData(function(err,result){
			if(err){
				res
					.status(500)
					.json(err);
			}
			else {
				
				res
					.status(200)
					.json(result);
				
			} 
		},getProfile);

};




module.exports.insertUser = function(req, res) {
	  console.log('[]: Inserting User');

	  var user = req.body;
	  
	  console.log("[]: user iss:::",JSON.stringify(user));
	  
	  query = "insert into login values (?, ?, ?)";
	  
	  var connection = mysql.getConnection();
	  
	  connection.query(query, [user.email, user.password, user.type],  function(err, result) {

			if (err) {
				
				console.log(err);
				res
					.status(500)
					.json(err);
			
			} else {
				
				console.log("[]: User inserted into login table");
				res
					.status(201)
					.json(result);
			}
		});
		console.log("\nConnection closed..");
		connection.end();

	};
	
	
	
module.exports.insertSignupDetails = function(req, res) {
	  
	console.log('[]: Inserting User Signup Details');
	
	  var user = req.body;
	  
	  console.log("[]: user iss:::",JSON.stringify(user));
	  
		if(user.type == "patient"){
			sqlquery = "insert into patient (first_name, last_name, email) values (?, ?, ?)";
		} else {
			sqlquery = "insert into doctor (first_name, last_name, email) values (?, ?, ?)";
		}
	  
	  var connection = mysql.getConnection();
	  
		connection.query(sqlquery, [user.firstname, user.lastname, user.email],  function(err, result) {
	
			if (err) {
				
				console.log(err);
				res
					.status(500)
					.json(err);
			
			} else {
				
				console.log("[]: Parital SignUp details recorded");
				res
					.status(201)
					.json(result);
			}
		});
		
		
		console.log("\nConnection closed..");
		connection.end();

};

	module.exports.signupDoctor = function(req, res) {
		  console.log('[]: Inserting Doctor SignUp details');

		  var user = req.body;
		  
		  console.log("[]: Doctor Signup iss:::",JSON.stringify(user));

//		  var doctor = {
//				  id: $window.sessionStorage.id,
//				  add1: vm.add1_doc,
//				  add2: vm.add2_doc,
//				  contact: vm.contact_doc,
//				  city: vm.city_doc,
//				  state: vm.state_doc,
//				  zip: vm.zip_doc,
//				  country: "USA",
//				  gender: vm.gender_doc,
//				  spec: vm.spec_doc,
//				  image: vm.image_doc || null
//		  };
		  
		  console.log('Doctor id is:: %s',user.id);
		  
		  var file_type = null;
		  var base64 = null;
		  
		  if(user.image != null){
			  
			  file_type = user.image.filetype;
			  base64 = user.image.base64;
		  }
		  
		  var updateDoctor = "update doctor set phone = ?, specialization = ?, isActive = 'Yes', clinic_address1 = ?, clinic_address2 = ?, city = ?, state = ?, country = ?, zip = ?, base64_image = ?, file_type = ? where doctor_id = ?"; //, doctor_image = ?
		  
		  var connection = mysql.getConnection();
		  
		  connection.query(updateDoctor, [user.contact, user.spec, user.add1, user.add2, user.city, user.state, user.country, user.zip, base64, file_type, user.id],  function(err, result) {

				if (err) {
					
					console.log(err);
					res
						.status(500)
						.json(err);
				
				} else {
					
					console.log("[]: Doctor Signup details inserted into doctor table");
					console.log("[]: Returning status 201 from backend");
					res
						.status(201)
						.json(result);
				}
			});
			console.log("\nConnection closed..");
			connection.end();

		};
		
		
module.exports.signupPatient = function(req, res) {
	  console.log('[]: Inserting Patient SignUp details');

	  var user = req.body;
	  
	  console.log("[]: Patient Signup iss:::",JSON.stringify(user));
	  
//	  var patient = {
//			  id: $window.sessionStorage.id,
//			  add1: vm.add1,
//			  add2: vm.add2,
//			  contact: vm.contact,
//			  city: vm.city,
//			  state: vm.state,
//			  zip: vm.zip,
//			  country: "USA",
//			  image: vm.image || null,
//			  gender: vm.gender || "Male",
//			  group: vm.group || "NA",
//			  birthday: vm.birthday || "NA",
//			  race: vm.race || "NA",
//			  insurance: vm.insurance,
//			  insurance_id: vm.insurance_id,
//			  relname: vm.name || "NA",
//			  relemail: vm.email || "NA",
//			  relation: vm.relation || "NA",
//			  relcon: vm.relcon || "NA"	  
//	  };
	  
	  var file_type = null;
	  var base64 = null;
	  
	  if(user.image != null){
		  
		  file_type = user.image.filetype;
		  base64 = user.image.base64;
	  }

	  var updatePatient = "update patient set emergency_contact = ?, emergency_contact_relationship = ?, emergency_contact_name = ?, emergency_contact_email = ?, birthdate = ?, gender = ?, blood_type = ?, address_line1 = ?, address_line2 = ?, contact = ?, city = ?, state = ?, country = ?, zip = ?, insurance_id = ?, insurance_provider = ?, race = ?, created_on = sysdate, base64_image = ?, file_type = ? where patient_id = ?";
	  
	  var connection = mysql.getConnection();
	  
	  connection.query(updatePatient, [user.relcon, user.relation, user.relname, user.relemail, user.birthday, user.gender, user.group, user.add1, user.add2, user.contact, user.city, user.state, user.country, user.zip , user.insurance_id, user.insurance, user.race, base64, file_type, user.id],  function(err, result) {

			if (err) {
				
				console.log(err);
				res
					.status(500)
					.json(err);
			
			} else {
				
				console.log("[]: Patient Signup details inserted into patient table");
				console.log("[]: Returning status 201 from backend");
				
				res
					.status(201)
					.json(result);
			}
		});
		console.log("\nConnection closed..");
		connection.end();

	};



module.exports.signinDoctor = function(req,res){

	var userId=req.params.user_id;

	
	console.log("[]: Email id isss::: %s",userId);
	query = "select * from doctor where email = '"+userId+"' and  clinic_address1 is not null";
	
	mysql.fetchData(function(err,results){
		if(err){
			res
				.status(500)
				.json(err);
		}
		else if(results.length > 0)
		{
			console.log(JSON.stringify(results));
			
			res
				.status(200)
				.json(results);
		} else {
			
			res
				.status(204)
				.json(results);
			
		} 
	},query);
};

module.exports.signinPatient = function(req,res){

	var userId=req.params.user_id;

	
	console.log("[]: Email id isss::: %s",userId);
	query = "select * from patient where email = '"+userId+"' and address_line1 is not null";
	
	mysql.fetchData(function(err,results){
		if(err){
			res
				.status(500)
				.json(err);
		}
		else if(results.length > 0)
		{
			console.log(JSON.stringify(results));
			console.log('[]: Sending status 200 and results from patient Singin api');
			
			res
				.status(200)
				.json(results);
			
		} else {
			
			console.log('[]: Sending status 204 and results from patient Singin api');
			
			res
				.status(204)
				.json(results);
		} 
	},query);
};