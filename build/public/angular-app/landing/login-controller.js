angular.module('sense-ehr').controller('LoginController', LoginController);

function LoginController($http, $location, AuthFactory) {
  var vm = this;

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  vm.login = function() {
    if (vm.username && vm.password) {
      var user = {
        username: vm.username,
        password: vm.password
      };

      $http.post('/api/users/login', user).then(function(response) {
        if (response.data.success) {
          AuthFactory.isLoggedIn = true;
        }
      }).catch(function(error) {
        console.log(error);
      })

    }
  }

  vm.logout = function() {
    AuthFactory.isLoggedIn = false;
    $location.path('/');
  }
}