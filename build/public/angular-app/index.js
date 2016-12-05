angular.module('sense-ehr', ['ngRoute','jcs-autoValidate','naif.base64','angularjs-datetime-picker','xeditable']).config(config);

/*angular
.module('sense-ehr')
.directive("fileread", [function () {
    return {
        scope: {
            fileread: "=",
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
              scope.fileread = changeEvent.target.files[0];
            });
        }
    }
}]);*/
angular.module('sense-ehr').run(function(editableOptions) {
	  editableOptions.theme = 'bs3';
});



function config($httpProvider, $routeProvider) {

	
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/landing/first_page.html'
    })
//    .when('/register', {
//      templateUrl: 'angular-app/register/register.html'
//    })
//    .when('/register-doctor', {
//      templateUrl: 'angular-app/register/register-doctor.html'
//    })
    .when('/profile', {
      templateUrl: 'angular-app/profile/profile.html'
    })
    .when('/showPatients', {
      templateUrl: 'angular-app/patients/patients.html'
    })
    .when('/showDoctorDashboard', {
      templateUrl: 'angular-app/doctor-dashboard/doctor-dashboard.html'
    })
    .when('/showPatientDashboard', {
      templateUrl: 'angular-app/patient-dashboard/patient-dashboard.html'
    })
    .when('/messages', {
      templateUrl: 'angular-app/messages/messages.html'
    })
    .when('/bookAppointment', {
      templateUrl: 'angular-app/appointments/bookAppointment.html'
    })
    .when('/showAppointment', {
      templateUrl: 'angular-app/appointments/showAppointment.html'
    })
    .when('/doctorAppointments',{
      templateUrl: 'angular-app/appointments/doctorAppointments.html'
    })
    .when('/medical-history', {
      templateUrl: 'angular-app/medical-history/history.html'
    })
    .when('/previousAppointments', {
      templateUrl: 'angular-app/MyHistory/previousAppointments.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}
