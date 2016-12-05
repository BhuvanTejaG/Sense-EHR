angular.module('sense-ehr').controller('ProfileController', ProfileController);

function ProfileController($http, $window, patientDataFactory, doctorDataFactory) {
	
	var vm = this;
	
	var userType = $window.sessionStorage.userType;
	
	
	vm.invalid= false;
	vm.success=false;
	
	vm.onLoad = function() {
		// To Toggle between patient and doctor 
		
	if($window.sessionStorage.userType == "patient"){
		vm.isPatient=true;
	}
	else{
		
		vm.isPatient=false;
		
	}
	
	vm.patientEdit=false;
	vm.doctorEdit=false;
	console.log(vm.patientEdit);
	
	console.log("Inside Load Method");
	
	if(vm.isPatient){
		patientDataFactory.getPatientProfile(1).then(function(response) {
			if(response.status === 200) {
				 vm.firstName=response.data[0].first_name;
				 vm.lastName=response.data[0].last_name;
				 vm.bloodGroup=response.data[0].blood_type;
				 vm.ethnicity=response.data[0].race;
				 vm.email=response.data[0].email;
				 vm.gender=response.data[0].gender;
				 vm.birthday=response.data[0].birthdate.split("T")[0];
				 vm.address1=response.data[0].address_line1;
				 vm.address2=response.data[0].address_line2;
				 vm.contact=response.data[0].contact;
				 vm.city=response.data[0].city;
				 vm.state=response.data[0].state;
				 vm.zip=response.data[0].zip;
				 vm.country=response.data[0].country;
				 vm.emergencyName=response.data[0].emergency_contact_name;
				 vm.emergencyContact=response.data[0].emergency_contact;
				 vm.emergencyEmail=response.data[0].emergency_contact_email;
				 vm.image=response.data[0].image;
				 vm.insurance_provider=response.data[0].insurance_provider;
				 vm.insurance_id=response.data[0].insurance_id;
				 
				console.log(vm.firstName);
			}
		   
		  }).catch(function(error) {
		        console.log(error);
	      });

		}
		else{
		//TODO Add doctor select
		
		doctorDataFactory.getDoctorProfile(1).then(function(response) {
			if(response.status === 200) {
				
				 vm.firstName_doc=response.data[0].first_name;
				 vm.lastName_doc=response.data[0].last_name;
				 vm.specialization=response.data[0].specialization;
				 vm.email_doc=response.data[0].email;
				 vm.gender_doc=response.data[0].gender;
				// vm.birthday_doc=response.data[0].birthday.split("T")[0];
				 vm.clinicName=response.data[0].clinic_name;
				 vm.address1_doc=response.data[0].clinic_address1;
				 vm.address2_doc=response.data[0].clinic_address2;
				 vm.contact_doc=response.data[0].phone;
				 vm.city_doc=response.data[0].city;
				 vm.state_doc=response.data[0].state;
				 vm.zip_doc=response.data[0].zip;
				 vm.country_doc=response.data[0].country;

				 
				 vm.image=response.data[0].image;
				
				console.log(response.data);
			}
			else{
				console.log(error);
			}
		   
		  }).catch(function(error) {
		        console.log(error);
	      });
		}
	};
	 
	 	 
	 
	 vm.editPatientDetails=function(){
			vm.patientEdit=true;
			vm.isPatient=true;
			vm.doctorEdit=false;
	 }
	 vm.editDoctorDetails=function(){
		 	vm.isPatient=false;
		 	vm.doctorEdit=true;
		 	vm.patientEdit=false;
	 }
	 
	 vm.updatePatientDetails = function() {
		 	vm.patientEdit=false;
			vm.isPatient=true;
			vm.doctorEdit=false;
		  
			var patient = {
				  	 patient_id:$window.sessionStorage.id,
				  	 first_name:vm.firstName,
					 last_name:vm.lastName,
					 email:vm.email,
					 blood_type:vm.bloodGroup,
					 race:vm.ethnicity,
					 gender:vm.gender,
					 birthdate:vm.birthday,
					 address_line1:vm.address1,
					 address_line2:vm.address2,
					 contact:vm.contact,
					 city:vm.city,
					 state:vm.state,
					 zip:vm.zip,
					 emergency_contact_name:vm.emergencyName,
					 emergency_contact:vm.emergencyContact,
					 emergency_contact_email:vm.emergencyEmail,
					 image:vm.image,
					 insurance_provider:vm.insurance_provider,
					 insurance_id:vm.insurance_id,
					 image: vm.image_pat || null
		  };
		  //TODO Add this API in URL  
		  patientDataFactory.updatePatientProfile(patient).then(function(response) {
				
			  if(response.status === 200) {
					 console.log(response.data);
		            vm.response = 'Patient Details Updated Successfully..!!';
		            vm.success= true;
				}
			  }).catch(function(error) {
				    vm.response = 'Patient Details Not Updated !!';
			        vm.invalid= true;
			        console.log(error);
	      });
		  
	};	  
	  
	 vm.updateDoctorDetails = function() {
		 	vm.patientEdit=false;
			vm.isPatient=false;
			vm.doctorEdit=false;
			
		  var doctor = {
				  	 doctor_id:$window.sessionStorage.id,
				  	 first_name:vm.firstName_doc,
					 last_name:vm.lastName_doc,
					 email:vm.email_doc,
					 specialization:vm.specialization,
					 gender:vm.gender_doc,
					 birthday:vm.birthday_doc,
					 add1:vm.address1_doc,
					 add2:vm.address2_doc,
					 contact:vm.contact_doc,
					 city:vm.city_doc,
					 state:vm.state_doc,
					 zip:vm.zip_doc,
					 image:vm.image_doc,
					 clinicName:vm.clinicName,
					 image: vm.image_doc || null
		  };
	
		  doctorDataFactory.updateDoctorProfile(doctor).then(function(response) {
				
			  if(response.status === 200) {
					 console.log(response.data);
				      vm.response = 'Doctor Details Updated Successfully..!!';
			          vm.success= true;
				}
			  }).catch(function(error) {
				  	vm.response = 'Doctor Details Not Updated !!';
			        vm.invalid= true;
		            console.log(error);
		   });

	 	};
	};	  

