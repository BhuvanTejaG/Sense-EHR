angular.module('sense-ehr').factory('AuthFactory', AuthFactory);

function AuthFactory() {
  return {
    auth: auth
  };

  var auth = {
    isLoggedIn: false,
    isDoctor: false
  };
}