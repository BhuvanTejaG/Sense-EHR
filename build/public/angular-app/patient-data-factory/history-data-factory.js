angular.module('sense-ehr').factory('historyDataFactory', historyDataFactory);

function historyDataFactory($http) {
  return {
	  getReasons: getReasons,
	  getMedicalRecord: getMedicalRecord,
	  getMedications: getMedications,
	  putMedications: putMedications
  };
  
  function getMedicalRecord(appt_id) {
	  return $http.get('/api/history/medicalRecord/' + appt_id).then(complete).catch(failed);
  }
  
  function getReasons() {
	  return $http.get('/api/history/reasons').then(complete).catch(failed);
  }
  
  function getMedications(apptId) {
	  return $http.get('/api/history/medications/' + apptId).then(complete).catch(failed);
  }
  
  function putMedications(results) {
	  return $http.post('/api/history/putMedications', results).then(complete).catch(failed);
  }
  
  function complete(response) {
	    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}