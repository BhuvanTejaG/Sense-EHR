angular.module('sense-ehr', ['ngRoute','jcs-autoValidate']).config(config);

function config($httpProvider, $routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/landing/main.html'
    })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html'
    })
    .when('/register-doctor', {
      templateUrl: 'angular-app/register/register-doctor.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}
