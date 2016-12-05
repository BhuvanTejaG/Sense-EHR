var app = angular.module('sense-ehr');
app.controller('HistoryController', HistoryController);

//removed onload for ng-init

function HistoryController($http, $filter,$window, $scope, historyDataFactory) {
	var apptId = $window.sessionStorage.appt_id;
	var loggedIn = $window.sessionStorage.userType;

	var vm = this;
	vm.invalid= false;
	vm.success=false;
	vm.isDoc = loggedIn=="doctor";
	var medications;
	vm.displaySuccessMessage=false;
	// To get the check box selected values
	var patient_id,doctor_id;
	
	
	if(loggedIn=="doctor"){
		doctor_id= $window.sessionStorage.id;
		vm.displayDoctor=true;
		
		// For Modal Dialog Check Boxes- 
		vm.totalMembers = ['Patient','Care Taker'];
		  // selected check boxes
		vm.selection = ['Patient', 'Care Taker'];
		
	}
	else{
		patient_id= $window.sessionStorage.id;
		vm.displayDoctor=false;
		
	}

	  
	//start of http requests
	vm.onLoad=function(){
		
		
		
	historyDataFactory.getMedicalRecord(apptId).then(function(response) {
		if(response.status === 200) {
			console.log("response",response);
			$scope.medicalRecord = response.data[0];
			patient_id=response.data[0].patient_id;
			doctor_id=response.data[0].doctor_id;

		}
	  }).catch(function(error) {
	        console.log(error);
      });
	
	historyDataFactory.getReasons().then(function(response) {
		if(response.status === 200) {
			console.log("response",response);
			 vm.reasonList = response.data;
		}
	  }).catch(function(error) {
	        console.log(error);
      });
	
	historyDataFactory.getMedications(apptId).then(function(response) {
		if(response.status === 200) {
			console.log("response",response);
			 vm.medication = response.data;
		}
	  }).catch(function(error) {
	        console.log(error);
      });
	}
	
	//end of http requests
	
	vm.toggleSelection = function(member) {
	    var idx = vm.selection.indexOf(member);
	    console.log(idx);
	    // is currently selected
	    if (idx > -1) {
	     vm.selection.splice(idx, 1);
	    }
	    // is newly selected
	    else {
	     vm.selection.push(member);
	    }
	  };
	  

	vm.sendMessage=function(){
		var textEntered=vm.textMessageEntered;
		var selected= vm.selection ;
		var criticality=vm.criticality;
		var payload={text:textEntered,list:selected,patient_id:patient_id,doctor_id:doctor_id,criticality:criticality};
		console.log(payload);
		if(loggedIn=='patient'){
			payload={text:textEntered,list:{},patient_id:patient_id,doctor_id:doctor_id,criticality:criticality};
			 $http.post('/api/history/sendMessageAsPatient',payload).then(function(results) {
		            console.log(results);
		            if(results.status === 200) {
		            	vm.displaySuccessMessage=true;
		            	vm.successMessage="Message Sent Successfully";
		                console.log("Message Successfully Sent",results.data);
		            }
		            else {
		            	vm.displaySuccessMessage=true;
		            	vm.successMessage="Message Not Sent";
		                console.log("HTTP Error");
		            }
		        }).catch(function(error) {
		        	vm.displaySuccessMessage=true;
	            	vm.successMessage="Message Not Sent";
		            console.log(error);
		        });
			
		}
		else if(loggedIn=='doctor'){
			 $http.post('/api/history/sendMessageAsDoctor',payload).then(function(results) {
		            console.log(results);
		            if(results.status === 200) {
		            	vm.displaySuccessMessage=true;
		            	vm.successMessage="Message Sent Successfully";
		                console.log("Message Successfully Sent",results.data);
		            }
		            else {
		            	vm.displaySuccessMessage=true;
		            	vm.successMessage="Message Not Sent";
		                console.log("HTTP Error");
		            }
		        }).catch(function(error) {
		        	vm.displaySuccessMessage=true;
	            	vm.successMessage="Message Not Sent";
		            console.log(error);
		        });
		}	
	};
	
	vm.submitRecord = function() {
	}
	
	vm.uploadFile = function() {
		var formData = new FormData();
		formData.append('image',vm.image);
		
		$http.post('/history/testResult', formData, {transformRequest: angular.identity, headers: {'Content-Type': undefined}}).success(function(response)
		{
			console.log("success");
		}).error(function(error){
			console.log("error");
		});
	};
	
//	$scope.medication = [
//	                     {id: 1, sno: 1, name: "Prash", start: "01-01-2011", end: "02-02-2000", usage: 5, purpose: "asdf"},
//	                     {id: 2, sno: 2, name: "Prash", start: "01-01-2011", end: "02-02-2000", usage: 5, purpose: "asdf"},
//	                     {id: 3, sno: 3, name: "Prash", start: "01-01-2011", end: "02-02-2000", usage: 5, purpose: "asdf"}
//	                     ];

	$scope.filterMed = function(med) {
		return med.isDeleted !== true;
	};

      $scope.deleteMed = function(sno) {
        var filtered = $filter('filter')(vm.medication, {sno: sno});
        if (filtered.length) {
          filtered[0].isDeleted = true;
        }
      };

      $scope.addMed = function() {
    	  vm.medication.push({
          sno: vm.medication.length+1,
          isNew: true
        });
      };

      $scope.cancel = function() {
        for (var i = vm.medication.length; i--;) {
          var med = vm.medication[i];
          if (med.isDeleted) {
            delete med.isDeleted;
          }
          if (med.isNew) {
        	  vm.medication.splice(i, 1);
          }      
        };
      };

      // save edits
      $scope.saveTable = function() {
        var results = [];
        for (var i = vm.medication.length; i--;) {
          var med = vm.medication[i];
          if (med.isDeleted) {
            vm.medication.splice(i, 1);
          }
          if (med.isNew) {
        	  med.isNew = false;
        	  med.appt_id = apptId;
          }
        }
        results = vm.medication;
        for(var i = 0; i < results.length; i++) {
    	    delete results[i]['sno'];
    	    //delete
    	    if(results[i]['isNew'] == false) {
    	    	delete results[i]['isNew'];
    	    }
    	}
        historyDataFactory.putMedications(results).then(function(response) {
    		if(response.status === 200) {
    			console.log("response",response);
    		}
		  }).catch(function(error) {
		        console.log(error);
	      });
      };
	
};