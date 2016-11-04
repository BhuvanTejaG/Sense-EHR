var express = require('express');
var router = express.Router();

var ctrlPatients = require('../controllers/patients.controller.js');
var ctrlUsers = require('../controllers/users.controller.js');
var ctrlDoctors = require('../controllers/doctors.controller.js');

// Patient routes
router
  .route('/patient/profile/:patient_id')
  .get(ctrlPatients.getProfile);

router
	.route('/patient/profile/')
	.post(ctrlPatients.updatePatientProfile);

router
	.route('/patient/getBloodPressure/:patient_id')
	.get(ctrlPatients.getBloodPressure);

router
	.route('/patient/getPatientMedication/:patient_id')
	.get(ctrlPatients.getPatientMedication);

router
	.route('/patient/getPatientStepsAndWeight/:patient_id')
	.get(ctrlPatients.getPatientStepsAndWeight);

router
	.route('/patient/getHealthStatus/:patient_id')
	.get(ctrlPatients.getHealthStatus);


// Doctor routes
router
	.route('/doctor/patients/:doctor_id')
	.get(ctrlDoctors.getPatients);

router
	.route('/doctor/appointmentCount/:doctor_id')
	.get(ctrlDoctors.getAppointmentCount);

router
	.route('/doctor/bloodPressures/:doctor_id')
	.get(ctrlDoctors.getBloodPressures);

router
	.route('/doctor/limitedBP/:doctor_id')
	.get(ctrlDoctors.getLimitedBP);

router
	.route('/doctor/specificPatients/:doctor_id/:letter')
	.get(ctrlDoctors.getSpecificPatients);

router
	.route('/doctor/profile/:doctor_id')
	.get(ctrlDoctors.getDoctorProfile);

router
	.route('/doctor/profile/')
	.post(ctrlDoctors.updateDoctorProfile);


// Authentication
router
	.route('/users/login/:username/:password')
	.get(ctrlUsers.login);

router
	.route('/users/FetchID/:username/:type')
	.get(ctrlUsers.FetchID);

router
	.route('/users/insertUser')
	.post(ctrlUsers.insertUser);

router
	.route('/users/insertSignupDetails')
	.post(ctrlUsers.insertSignupDetails);

router
	.route('/users/signupDoctor')
	.post(ctrlUsers.signupDoctor);

router
	.route('/users/signupPatient')
	.post(ctrlUsers.signupPatient);

router
	.route('/users/signinDoctor/:user_id')
	.get(ctrlUsers.signinDoctor);

router
	.route('/users/signinPatient/:user_id')
	.get(ctrlUsers.signinPatient);

router
	.route('/users/setProfile/:type/:user_id')
	.get(ctrlUsers.setProfile);


module.exports = router;