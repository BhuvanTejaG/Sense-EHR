angular.module('sense-ehr').factory('AuthFactory', AuthFactory);

function AuthFactory() {
  return {
    auth: auth
  };

  var auth = {
    isLoggedIn: true,
    isSignedUp: true,
    isDoctor: false
  };
}