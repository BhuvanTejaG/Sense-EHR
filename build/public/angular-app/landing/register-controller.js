angular.module('sense-ehr').controller('RegisterController', RegisterController);

function RegisterController($http) {
  var vm = this;
  vm.success= false;

  vm.register = function() {
    var user = {
      username: vm.username,
      password: vm.password
    };

    if (!vm.username || !vm.password) {
      vm.error = 'Please add a username and a password.';
    } else {
      if (vm.password !== vm.passwordRepeat) {
        vm.error = 'Please make sure the passwords match.';
      } else {
        $http.post('/api/users/register', user).then(function(result) {
          console.log(result);
          vm.message = 'Successful registration, please login.';
          vm.error = '';
        }).catch(function(error) {
          console.log(error);
        });
      }
    }
  }
  
  
  vm.signup = function(){

	  var patient = {
			  add1: vm.add1,
			  add2: vm.add2,
			  contact: vm.contact,
			  city: vm.city,
			  state: vm.state,
			  zip: vm.zip,
			  country: "USA",
			  gender: vm.gender || "Male",
			  group: vm.group || "NA",
			  birthday: vm.birthday || "NA",
			  race: vm.race || "NA",
			  relname: vm.name || "NA",
			  relemail: vm.email || "NA",
			  relation: vm.relation || "NA",
			  relcon: vm.relcon || "NA"	  
	  };
	  
	  if (!vm.add1 || !vm.add2 || !vm.contact || !vm.city || !vm.state || !vm.zip || !vm.gender || !vm.group || !vm.birthday || !vm.race || !vm.name || !vm.email || !vm.relation || !vm.relcon ) {
	      alert('unsuccessful');
		  vm.invalid = 'Form is Invalid. Please check the form once';
	    } else {
	    	alert('Successful');
	        $http.post('/api/users/register', patient).then(function(result) {
	            console.log(result);
	            vm.response = 'Registration Successful. Please Login';
	            vm.success= true;
	            vm.invalid = '';
	          }).catch(function(error) {
	            console.log(error);
	          });
	        }
  }
  
  
  vm.signupDoctor = function(){

	  var doctor = {
			  add1: vm.add1_doc,
			  add2: vm.add2_doc,
			  contact: vm.contact_doc,
			  city: vm.city_doc,
			  state: vm.state_doc,
			  zip: vm.zip_doc,
			  country: "USA",
			  gender: vm.gender_doc,
			  spec: vm.spec_doc 
	  };


	  if (!vm.add1_doc || !vm.add2_doc || !vm.contact_doc || !vm.city_doc || !vm.state_doc || !vm.zip_doc || !vm.gender_doc || !vm.spec_doc ) {
	      alert('unsuccessful');
	      console.log('successful');
		 
	    } else {
	    	alert('Successful');
	        $http.post('/api/users/register', doctor).then(function(result) {
	            console.log(result);

	          }).catch(function(error) {
	            console.log(error);
	          });
	        }
  }
  
};