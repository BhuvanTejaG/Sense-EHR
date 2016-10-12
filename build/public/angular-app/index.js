angular.module('sense-ehr', ['ngRoute','jcs-autoValidate','naif.base64']).config(config);

function config($httpProvider, $routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/landing/main.html'
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
    .otherwise({
      redirectTo: '/'
    });
}
