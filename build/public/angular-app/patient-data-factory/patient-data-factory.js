angular.module('sense-ehr').factory('patientDataFactory', patientDataFactory);

function patientDataFactory($http) {
  return {
    getPatientProfile: getPatientProfile,
    updatePatientProfile: updatePatientProfile
  };


  function getPatientProfile(patient_id) {
    return $http.get('/api/patient/profile/' + patient_id).then(complete).catch(failed);
  }
  
  function updatePatientProfile(patient) {
    return $http.post('/api/patient/profile/',patient).then(complete).catch(failed);
  }
  
  function complete(response) {
	    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }



}