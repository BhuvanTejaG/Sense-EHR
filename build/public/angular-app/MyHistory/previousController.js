angular.module('sense-ehr').controller('previousController', previousController);

function previousController($http, $window,$location, patientDataFactory, doctorDataFactory) {
      var vm = this;
    
    vm.showPreviousOnLoad = function() {
    	   var patient_id=null;
    	    var doctor_id=null;

    	if($window.sessionStorage.userType == "patient"){
            vm.isPatient=true;
            patient_id = $window.sessionStorage.id;
        }
        else{
            vm.isPatient=false;
            doctor_id = $window.sessionStorage.id;
        }

    	console.log(patient_id +"  "+doctor_id);
        if(vm.isPatient==true) {
            $http.get('/api/patient/getPreviousAppointments/' + patient_id).then(function (results) {
                console.log(results);
                if (results.status === 200) {
                    vm.displayedPrevious = results.data;
                     vm.noData = false;
                    console.log("patient previous data", results.data);
                } else {
                	 vm.noData = true;
                    vm.err = "HTTP Error";
                    console.log("HTTP Error");
                }
            }).catch(function (error) {
                console.log(error);
                vm.errorPanel = true;
                vm.err = error;
            })
        }
        else{
        	 $http.get('/api/doctor/getAllAppointments/' + doctor_id).then(function (result) {
                 console.log(result);
                 if (result.status === 200) {
                     vm.displayedAll = result.data;
                     vm.noData = false;
                     console.log("doctors drop down:", result.data);
                 }
                 else {
                	 vm.noData = true;
                     console.log("HTTP Error");
                 }
             }).catch(function (error) {
                 console.log(error);
             });
        }
    }
    vm.displayMedicalRecord=function(id){
    	sessionStorage.removeItem('appt_id');
    	$window.sessionStorage.appt_id=id;
 		$location.path('/medical-history');
    }

}