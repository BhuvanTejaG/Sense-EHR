angular.module('sense-ehr').controller('LoginController', LoginController);

function LoginController($http, $location, $window) {
  var vm = this;
  
  vm.isLoggedIn = false;
  vm.isSignedUp = false;
  vm.isDoctor = false;


//  vm.isLoggedIn = function() {
//   
//	   if(AuthFactory.isLoggedIn){
//		   return true;
//	   } else {
//		   return false;
//	   }
//
//  };
//  
//  vm.isSignedUp = function() {
//	    if (AuthFactory.isSignedUp) {
//	      return true;
//	    } else {
//	      return false;
//	    }
//	  };
//  
//  vm.isDoctor = function() {
//	    if (AuthFactory.isDoctor) {
//	      return true;
//	    } else {
//	      return false;
//	    }
//	  };
  
 
	  
  // Login Request from Landing Page
  vm.login = function() {
	  
	  // Test
	  vm.username = "doctor@gmail.com";
	  vm.password = "12345";
	  
    if (vm.username && vm.password) {
//      var user = {
//        username: vm.username,
//        password: vm.password
//      };

      $http.get('/api/users/login/'+vm.username+'/'+vm.password).then(function(response) {
    	  
    	console.log('[]: Got status as %d from login api',response.status);
    	
        if (response.status === 200) {
        	
        	if(response.data[0].type == "patient") {
        		
        		$http.get('/api/users/signinPatient/' + vm.username).then(function(response) {
        			
        			console.log('[]: Got status as %d from patient signup api',response.status);
        	        if (response.status === 200) {
        	        	
        	        	$window.sessionStorage.id = response.data[0].patient_id;
        	        	
        	        	vm.profile = response.data[0];
        	        	
        	        	console.log('[]: userid isss::: %s', $window.sessionStorage.id);
        	        	vm.isSignedUp = true;
        	        }
        	        else {
        	        	
        	        	
        	        		$http.get('/api/users/FetchID/'+vm.username+'/'+'patient').then(function(response) {
        	        		
        	        		
        	        		if (response.status === 200) {
        	        		
        	        		
        	        		$window.sessionStorage.id = response.data[0].doctor_id;
            	        	
            	        	console.log('[]: userid isss::: %s', $window.sessionStorage.id);
            	        	
        	        		}
        	        		
        	        		else {
        	        			console.log('Unable to set id in session storage while login');
        	        		}
        	        		
        	        		
        	        		
        	        	}).catch(function(error) {
                	    	console.log('[]: Got into error block of FetchID api');
                	        console.log(error);
                	      })
        	        		
        	        	//not signed in --- Redirect to Patient SignUp Page
        	        	
        	        	//$location.path('angular-app/register/register.html');
        	        }
        	      }).catch(function(error) {
        	    	console.log('[]: Got into error block of patient signup api');
        	        console.log(error);
        	      })
        		
        	} else if(response.data[0].type == "doctor"){
        		
        		$http.get('/api/users/signinDoctor/' + vm.username).then(function(response) {
        			
        			console.log('[]: Got status as %d from doctor signinDoctor api',response.status);
        			
        	        if (response.status === 200) {
        	        	
        	        	$window.sessionStorage.id = response.data[0].doctor_id;
        	        	
        	        	vm.profile = response.data[0];
        	        	
        	        	console.log('[]: userid isss::: %s', $window.sessionStorage.id);
        	        	
        	        	vm.isSignedUp = true;
        	        } else {
        	        	
        	        	$http.get('/api/users/FetchID/'+vm.username+'/'+'doctor').then(function(response) {
        	        		
        	        		
        	        		if (response.status === 200) {
        	        		
        	        		
        	        		$window.sessionStorage.id = response.data[0].doctor_id;
            	        	
            	        	console.log('[]: userid isss::: %s', $window.sessionStorage.id);
            	        	
        	        		}
        	        		
        	        		else {
        	        			console.log('Unable to set id in session storage while login');
        	        		}
        	        		
        	        		
        	        		
        	        	}).catch(function(error) {
                	    	console.log('[]: Got into error block of FetchID api');
                	        console.log(error);
                	      })
        	        	// not signed in --- Redirect to Doctor SignUp Page
        	        	
        	        	//$location.path('angular-app/register/register-doctor.html');
        	        }
        	        
    	        	vm.isDoctor = true;
    	        	
        	      }).catch(function(error) {
        	    	console.log('[]: Got into error block of doctor signup api');
        	        console.log(error);
        	      })
        		
        	}
        	
        	vm.isLoggedIn = true;
        }
        else {
        	// user doesn't exist
        }
      }).catch(function(error) {
        console.log(error);
      })

    }
  }

  vm.logout = function() {
    vm.isLoggedIn = false;
    vm.isSignedUp = false;
    vm.isDoctor = false;
    delete $window.sessionStorage.id;
    $location.path('/');
  }
 
  // SignUP Request from Landing Page
  
 vm.signUp = function() {
	  
	  // Test
	  vm.username_signup = "doctor@gmail.com";
	  vm.password_signup = "12345";
	  vm.firstname_signup = "testfirst";
	  vm.lastname_signup = "testlast";
	  vm.type_signup = "doctor";
	  
    if (vm.username_signup && vm.password_signup && vm.type_signup && vm.firstname_signup && vm.lastname_signup) {
    	
      var user_signup = {
        email: vm.username_signup,
        password: vm.password_signup,
        firstname: vm.firstname_signup,
        lastname: vm.lastname_signup,
        type: vm.type_signup 
      };

      $http.post('/api/users/insertUser', user_signup).then(function(response) {
    	  
    	console.log('[]: Got status as %d from login api',response.status);
    	
        if (response.status === 201) {
        	
            $http.post('/api/users/insertSignupDetails', user_signup).then(function(response) {
          	  
            	console.log('[]: Got status as %d from login api',response.status);
            	
                if (response.status === 201) {
                	
                	console.log(" Partial SignUp details successfully inserted");
                	
                	// Redirecting to SignUp Page
                	vm.isLoggedIn = true;
                	
                	if(vm.type_signup == "doctor") {
                		
                		$http.get('/api/users/FetchID/'+vm.username_signup+'/'+'doctor').then(function(response) {
        	        		
        	        		
        	        		if (response.status === 200) {
        	        		
        	        		
        	        		$window.sessionStorage.id = response.data[0].doctor_id;
            	        	
            	        	console.log('[]: userid isss::: %s', $window.sessionStorage.id);
            	        	
        	        		}
        	        		
        	        		else {
        	        			console.log('Unable to set id in session storage while login');
        	        		}
        	        		
        	        		
        	        		
        	        	}).catch(function(error) {
                	    	console.log('[]: Got into error block of FetchID api');
                	        console.log(error);
                	      })

                		
                		vm.isDoctor = true;
                	}
                	
                	else {
                		
                		$http.get('/api/users/FetchID/'+vvm.username_signup+'/'+'patient').then(function(response) {
        	        		
        	        		
        	        		if (response.status === 200) {
        	        		
        	        		
        	        		$window.sessionStorage.id = response.data[0].doctor_id;
            	        	
            	        	console.log('[]: userid isss::: %s', $window.sessionStorage.id);
            	        	
        	        		}
        	        		
        	        		else {
        	        			console.log('Unable to set id in session storage while login');
        	        		}
        	        		
        	        		
        	        		
        	        	}).catch(function(error) {
                	    	console.log('[]: Got into error block of FetchID api');
                	        console.log(error);
                	      })
                		
                		
                	}

                }
                else {
                	console.log(" Failed to insert Signup Details");
                }
              }).catch(function(error) {
                console.log(error);
              })

        }
        else {
        	console.log(" Failed to SignUp user");
        }
      }).catch(function(error) {
        console.log(error);
      })

    }
  }
   
  // Register methods
  
  
  vm.success= false;

//  vm.register = function() {
//    var user = {
//      username: vm.username,
//      password: vm.password
//    };
//
//    if (!vm.username || !vm.password) {
//      vm.error = 'Please add a username and a password.';
//    } else {
//      if (vm.password !== vm.passwordRepeat) {
//        vm.error = 'Please make sure the passwords match.';
//      } else {
//        $http.post('/api/users/register', user).then(function(result) {
//          console.log(result);
//          vm.message = 'Successful registration, please login.';
//          vm.error = '';
//        }).catch(function(error) {
//          console.log(error);
//        });
//      }
//    }
//  }
  
  
  vm.signupPatient = function(){

	  var patient = {
			  id: $window.sessionStorage.id,
			  add1: vm.add1,
			  add2: vm.add2,
			  contact: vm.contact,
			  city: vm.city,
			  state: vm.state,
			  zip: vm.zip,
			  country: "USA",
			  image: vm.image || null,
			  gender: vm.gender || "Male",
			  group: vm.group || "NA",
			  birthday: vm.birthday || "NA",
			  race: vm.race || "NA",
			  insurance: vm.insurance,
			  insurance_id: vm.insurance_id,
			  relname: vm.name || "NA",
			  relemail: vm.email || "NA",
			  relation: vm.relation || "NA",
			  relcon: vm.relcon || "NA"	  
	  };
	  
	  if (!vm.add1 || !vm.add2 || !vm.contact || !vm.city || !vm.state || !vm.zip || !vm.gender || !vm.group || !vm.birthday || !vm.race || !vm.name || !vm.email || !vm.relation || !vm.relcon || !vm.insurance || !vm.insurance_id) {
	      //alert('unsuccessful');
		  vm.invalid = 'Form is Invalid. Please check the form once';
	    } else {

	        $http.post('/api/users/signupPatient', patient).then(function(response) {
	            
            	console.log('[]: Got status as %d from signupPatient api',response.status);
            	
                if (response.status === 201) {
                	
                	console.log(" Patient SignUp details successfully updated");
                	
                	
                	// Setting Profile
                    $http.get('/api/users/setProfile/patient/'+$window.sessionStorage.id).then(function(response) {
                    	
                    	
                    	console.log('[]: Got status as %d from setProfile api',response.status);
                    	
                        if (response.status === 200) {
                        	
                        	
                        	vm.profile = response.data[0];
                        	
                        

                        }
                        else {
                        	
                        	console.log(" Failed to setProfile");
                        	

                            }

            	          }).catch(function(error) {
            	            console.log(error);
            	          });
              	
              	// Setting Profile
                	
                	vm.isSignedUp = true;
                	
    	        	
    	           // vm.response = 'Registration Successful. Please Login';
    	           // vm.success= true;
    	            vm.invalid = '';
                	

                }
                else {
                	
                	console.log(" Failed to update Patient Signup Details");
                	
                	vm.invalid = 'Form is Invalid. Please check the form once';
                }

	          }).catch(function(error) {
	            console.log(error);
	          });
	        }
  }
  
  
  vm.signupDoctor = function(){

	  var doctor = {
			  id: $window.sessionStorage.id,
			  add1: vm.add1_doc,
			  add2: vm.add2_doc,
			  contact: vm.contact_doc,
			  city: vm.city_doc,
			  state: vm.state_doc,
			  zip: vm.zip_doc,
			  country: "USA",
			  gender: vm.gender_doc,
			  spec: vm.spec_doc,
			  image: vm.image_doc || null
	  };
	  
	  
//	  alert(vm.image_doc);
  


  if (!vm.add1_doc || !vm.add2_doc || !vm.contact_doc || !vm.city_doc || !vm.state_doc || !vm.zip_doc || !vm.gender_doc || !vm.spec_doc ) {

	  console.log('unsuccessful');
	 
    } else {

        $http.post('/api/users/signupDoctor', doctor).then(function(response) {
        	
        	
        	console.log('[]: Got status as %d from signupDoctor api',response.status);
        	
            if (response.status === 201) {
            	
            	console.log(" Doctor SignUp details successfully updated");
            	
            	// Setting Profile
                  $http.get('/api/users/setProfile/doctor/'+$window.sessionStorage.id).then(function(response) {
                  	
                  	
                  	console.log('[]: Got status as %d from setProfile api',response.status);
                  	
                      if (response.status === 200) {
                      	
                      	vm.profile = response.data[0];
                      	
                      }
                      else {
                      	
                      	console.log(" Failed to setProfile");
                      	

                          }

          	          }).catch(function(error) {
          	            console.log(error);
          	          });
            	
            	// Setting Profile
            	
            	vm.isSignedUp = true;


            }
            else {
            	
            	console.log(" Failed to update Doctor Signup Details");
            	
            	vm.invalid = 'Form is Invalid. Please check the form once';
                }

	          }).catch(function(error) {
	            console.log(error);
	          });
	        }
  }
  
  
  vm.setProfile = function(){
  
	  if(vm.isDoctor){
		  var apitype = "doctor";
	  }
	  else {
		  var apitype = "patient" 
	  }

        $http.get('/api/users/setProfile/'  + apitype +'/'+$window.sessionStorage.id).then(function(response) {
        	
        	
        	console.log('[]: Got status as %d from setProfile api',response.status);
        	
            if (response.status === 200) {
           	
            	vm.profile = response.data[0];

            }
            else {
            	
            	console.log(" Failed to setProfile");
            	

                }

	          }).catch(function(error) {
	            console.log(error);
	          });

  }
  
  
  
  
  vm.showPatients = function() { 
	  
	  $location.path('/showPatients');
  }
  
 vm.showDoctorDashboard = function() { 
	  
	  $location.path('/showDoctorDashboard');
  }
  
}