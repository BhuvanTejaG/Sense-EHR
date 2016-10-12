angular.module('sense-ehr').controller('ProfileController', ProfileController);

function ProfileController($http, patientDataFactory, $window) {
	
	var vm = this;
	vm.invalid= false;
	vm.success=false;
	
	 vm.onLoad = function() {
		 
		vm.isPatient=true;
		vm.patientEdit=false;
		vm.doctorEdit=false;
		console.log(vm.patientEdit);
		 
			// For Patient
		/* vm.firstName="ABC";
		 vm.lastName="DEF";
		 vm.bloodGroup="A +ve";
		 vm.ethnicity="Indian";
		 vm.email="Def@gmail.com"
		 vm.gender="M";
		 vm.birthday="08/22/1991";
		 vm.address1="190 Ryl";
		 vm.address2="3401";
		 vm.contact="4059409343";
		 vm.city="SJC";
		 vm.state="CA";
		 vm.zip="95110";
		 vm.emergencyName="ABCDEFG";
		 vm.emergencyContact="019330123213";
		 vm.emergencyEmail="abc@gmail.com";
		 vm.image="";
		 */
		 // For Doctor
		 
		 /*vm.firstName_doc="ABC";
		 vm.lastName_doc="DEF";
		 vm.specialization="Neurology";
		 vm.email_doc="Def@gmail.com"
		 vm.gender_doc="M";
		 vm.birthday_doc="08/22/1991";
		 vm.clinicName="ABC Clinic";
		 vm.address1_doc="190 Ryl";
		 vm.address2_doc="3401";
		 vm.contact_doc="4059409343";
		 vm.city_doc="SJC";
		 vm.state_doc="CA";
		 vm.zip_doc="95110";*/
		 
		 console.log("Inside Load Method");
		 
		 var id = $window.sessionStorage.id;
		 
		patientDataFactory.getPatientProfile(id).then(function(response) {
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
				
				console.log(vm.firstName);
			}
		   
		  }).catch(function(error) {
		        console.log(error);
	      });
//TODO Add doctor select
	 patientDataFactory.getDoctortProfile(1).then(function(response) {
			if(response.status === 200) {
				
				 vm.firstName_doc=response.data[0].first_name;
				 vm.lastName_doc=response.data[0].last_name;
				 vm.specialization=response.data[0].specialization;
				 vm.email_doc=response.data[0].email;
				 vm.gender_doc=response.data[0].gender;
				 vm.birthday_doc=response.data[0].birthday.split("T")[0];
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
		   
		  }).catch(function(error) {
		        console.log(error);
	      });
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
				  	 patientId:"",
				  	 firstName:vm.firstName,
					 lastName:vm.lastName,
					 email:vm.email,
					 bloodGroup:vm.bloodGroup,
					 ethnicity:vm.ethnicity,
					 gender:vm.gender,
					 birthday:vm.birthday,
					 add1:vm.address1,
					 add2:vm.address2,
					 contact:vm.contact,
					 city:vm.city,
					 state:vm.state,
					 zip:vm.zip,
					 emergencyName:vm.emergencyName,
					 emergencyContact:vm.emergencyContact,
					 emergencyEmail:vm.emergencyEmail,
					 image:vm.image
		  };
		  //TODO Add this API in URL  
		  patientDataFactory.updatePatientProfile(patient).then(function(response) {
				if(response.status === 200) {
					 console.log(result);
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
			
		 alert("HI"+vm.email_doc);
		  var patient = {
				  	 doctorId:"",
				  	 firstName:vm.firstName_doc,
					 lastName:vm.lastName_doc,
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
					 image:vm.image_doc
		  };
	
		  $http.post('/api/users/updateDoctor', patient).then(function(result) {
		            console.log(result);
		            vm.response = 'Doctor Details Updated Successfully..!!';
		            vm.success= true;
		          }).catch(function(error) {
		        	vm.response = 'Doctor Details Not Updated !!';
			        vm.invalid= true;
		            console.log(error);
		          });
	 	};
	};	  

