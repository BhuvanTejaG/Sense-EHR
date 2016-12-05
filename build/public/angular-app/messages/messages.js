angular.module('sense-ehr').controller('MessageController', MessageController);

function MessageController($http, $window, patientDataFactory, doctorDataFactory) {
	
	var vm = this;
	var userType = $window.sessionStorage.userType;
	var patient_id=0;var doctor_id=0;
	vm.onLoad = function() {
		// To toggle between Inbox and Sent messages folder
		vm.inbox=true;
		if($window.sessionStorage.userType == "patient"){
			vm.isPatient=true;
			patient_id=$window.sessionStorage.id;
			
			 $http.get('/api/patient/getPatientInboxMessages/'+patient_id).then(function(result) {
					if(result.status === 200) {
						vm.messages=result.data;
						console.log(vm.messages);
					}
					else{
						console.log("HTTP Error");
					}
				 }).catch(function(error) {
				        console.log(error);
			      });		
		}
		else{
			vm.isPatient=false;
			doctor_id=$window.sessionStorage.id;
			 $http.get('/api/doctor/getDoctorInboxMessages/'+doctor_id).then(function(result) {
					if(result.status === 200) {
						vm.messages=result.data;
						console.log(vm.messages);
					}
					else{
						console.log("HTTP Error");
					}
				 }).catch(function(error) {
				        console.log(error);
			      });	
		}
	};
	
	vm.sent = function() {
		// To toggle between Inbox and Sent messages folder
		vm.inbox=false;
		if($window.sessionStorage.userType == "patient"){
			vm.isPatient=true;
			patient_id=$window.sessionStorage.id;
			
			 $http.get('/api/patient/getPatientSentMessages/'+patient_id).then(function(result) {
					if(result.status === 200) {
						vm.messages=result.data;
						console.log(vm.messages);
					}
					else{
						console.log("HTTP Error");
					}
				 }).catch(function(error) {
				        console.log(error);
			      });		
		}
		else{
			vm.isPatient=false;
			doctor_id=$window.sessionStorage.id;
			 $http.get('/api/doctor/getDoctorSentMessages/'+doctor_id).then(function(result) {
					if(result.status === 200) {
						vm.messages=result.data;
						console.log(vm.messages);
					}
					else{
						console.log("HTTP Error");
					}
				 }).catch(function(error) {
				        console.log(error);
			      });	
		}
		
		
	};
	
	$(document).ready(function() {
		$('#datatable').dataTable();
	});
		
};

