angular.module('sense-ehr').factory('patientDataFactory', patientDataFactory);

function patientDataFactory($http) {
  return {
    getPatientProfile: getPatientProfile
  };


  function getPatientProfile(patient_id) {
    return $http.get('/api/patient/profile/' + patient_id).then(complete).catch(failed);
  }
  
  function complete(response) {
	    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }



}