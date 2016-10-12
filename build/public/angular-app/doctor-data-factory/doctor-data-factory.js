angular.module('sense-ehr').factory('doctorDataFactory', doctorDataFactory);

function doctorDataFactory($http) {
  return {
    getPatients: getPatients,
    getSpecificPatients: getSpecificPatients,
    getAppointmentCount: getAppointmentCount,
    getBloodPressures:getBloodPressures,
    getLimitedBP:getLimitedBP
  };


  function getPatients(doctor_id) {
    return $http.get('/api/doctor/patients/' + doctor_id).then(complete).catch(failed);
  }
  
  function getSpecificPatients(letter, doctor_id) {
    return $http.get('/api/doctor/specificPatients/' + doctor_id +'/'+letter).then(complete).catch(failed);
  }
  
  function getAppointmentCount(doctor_id) {
    return $http.get('/api/doctor/appointmentCount/' + doctor_id).then(complete).catch(failed);
  }
  
  function getBloodPressures(doctor_id) {
    return $http.get('/api/doctor/bloodPressures/' + doctor_id).then(complete).catch(failed);
  }
  
  function getLimitedBP(doctor_id) {
    return $http.get('/api/doctor/limitedBP/' + doctor_id).then(complete).catch(failed);
  }
  
  
  function complete(response) {
	    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }



}