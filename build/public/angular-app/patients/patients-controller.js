angular.module('sense-ehr').controller('PatientsController', PatientsController);

function PatientsController($http, $window, doctorDataFactory) {
	  var vm = this;
	  vm.noRecords = false;
	  vm.errorOccured = false;
	  
	  vm.invalid = " Something Went Wrong. Please come again later! ";
	  vm.response = "No patient records found!";
	  
	  var doctor_id = $window.sessionStorage.id;
		 
	  doctorDataFactory.getPatients(doctor_id).then(function(response) {
		  
		  console.log('[]: Got status as %d from doctor getPatients api',response.status);
		  
		  console.log(response.data);
		  
		  
			if(response.status === 200) {
				
				vm.patients = response.data;
				
				vm.noRecords = false;
				vm.errorOccured = false;
				
			}
			
			else {
				
				vm.noRecords = true;
				vm.errorOccured = false;
				
			}
		   
		  }).catch(function(error) {
			  
			  console.log('[]: Got into error block of patient fetching api');
			  
			  vm.errorOccured = true;
		        console.log(error);
	      });
	  

	  
vm.getSpecificPatients = function(letter){
	
doctorDataFactory.getSpecificPatients(letter, doctor_id).then(function(response) {
		  
		  console.log('[]: Got status as %d from doctor getSpecificPatients api',response.status);
		  
		  console.log(response.data);
		  
		  
			if(response.status === 200) {
				
				vm.patients = response.data;
				
				vm.noRecords = false;
				vm.errorOccured = false;
				
			}
			
			else {
				
				vm.noRecords = true;
				vm.errorOccured = false;
				
			}
		   
		  }).catch(function(error) {
			  
			  console.log('[]: Got into error block of patient fetching api');
			  
			  vm.errorOccured = true;
		        console.log(error);
	      });
	};
	
}