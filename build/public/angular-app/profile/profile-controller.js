angular.module('sense-ehr').controller('ProfileController', ProfileController);

function ProfileController($http, patientDataFactory) {
	
	var vm = this;
	vm.invalid= false;
	vm.success=false;
	
	 vm.onLoad = function() {
		 
		vm.isPatient=false;
		vm.patientEdit=false;
		vm.doctorEdit=false;
		console.log(vm.patientEdit);
		 
			// For Patient
		 vm.firstName="ABC";
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
		 
		 // For Doctor
		 
		 vm.firstName_doc="ABC";
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
		 vm.zip_doc="95110";
		 
		 console.log("Inside Load Method");
		 
		 /*
			$http({
  			method: 'GET',
  			url: '/profile',	
  			data: {'patient_id':"1" }		         			
  			}).success(function(result){
  				console.log(result);
 	            vm.response = 'Patient Details Updated Successfully..!!';
 	            vm.success= true;
				}).error(function(error){
					vm.response = 'Patient Details Not Updated !!';
			        vm.invalid= true;
		            console.log(error);
				});	
		  */
			
			patientDataFactory.getPatientProfile(1).then(function(response) {
				if(response.status === 200) {
					
					//vm.profile = response.data;
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
			
		 alert("HI"+vm.emergencyEmail);
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
		  $http.post('/api/users/updatePatient', patient).then(function(result) {
		            console.log(result);
		            vm.response = 'Patient Details Updated Successfully..!!';
		            vm.success= true;
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
	
	 
}
