angular.module('sense-ehr', ['ngRoute']).config(config).run(run);

function config($httpProvider, $routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/landing/main.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}
