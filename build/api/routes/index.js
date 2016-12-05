var express = require('express');
var router = express.Router();

var ctrlPatients = require('../controllers/patients.controller.js');
var ctrlUsers = require('../controllers/users.controller.js');
var ctrlDoctors = require('../controllers/doctors.controller.js');
var ctrlHistory = require('../controllers/history.controller.js');
var scrap = require('../controllers/scraping.js');

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

router
	.route('/patient/getPatientInboxMessages/:patient_id')
	.get(ctrlPatients.getPatientInboxMessages);

router
	.route('/patient/getPatientSentMessages/:patient_id')
	.get(ctrlPatients.getPatientSentMessages);

router
	.route('/patient/getUpcomingAppointments/:patient_id')
	.get(ctrlPatients.getUpcomingAppointments);

router
	.route('/patient/getPreviousAppointments/:patient_id')
	.get(ctrlPatients.getPreviousAppointments);

router
	.route('/patient/submitAppointment')
	.post(ctrlPatients.submitAppointment);

router
	.route('/patient/getMedicationTips/:patient_id')
	.get(ctrlPatients.getMedicationTips);

// Doctor routes
router
	.route('/doctor/getDoctorInboxMessages/:doctor_id')
	.get(ctrlDoctors.getDoctorInboxMessages);

router
	.route('/doctor/getDoctorSentMessages/:doctor_id')
	.get(ctrlDoctors.getDoctorSentMessages);

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
router
	.route('/doctor/doctorCriteria')
	.post(ctrlDoctors.doctorCriteria);

router
	.route('/doctor/getCurrentAppointments/:doctor_id')
	.get(ctrlDoctors.getCurrentAppointments);

router
	.route('/doctor/getAllAppointments/:doctor_id')
	.get(ctrlDoctors.getAllAppointments);

router
	.route('/doctor/doctorAddress/:doctor_id')
	.get(ctrlDoctors.doctorAddress);


// Authentication
router
	.route('/users/login/:username/:password')
	.get(ctrlUsers.login);

router
	.route('/users/loginForMobile/:email/:password/:type')
	.get(ctrlUsers.loginForMobile);

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
//Medical History Record
router
	.route('/history/reasons')
	.get(ctrlHistory.getReasons);

router
	.route('/history/medicalRecord/:appt_id')
	.get(ctrlHistory.getMedicalRecord);

router
	.route('/history/medications/:apptId')
	.get(ctrlHistory.getMedications);

router
	.route('/history/putMedications')
	.post(ctrlHistory.putMedications);
router
	.route('/history/sendMessageAsDoctor')
	.post(ctrlHistory.sendMessageAsDoctor);
router
	.route('/history/sendMessageAsPatient')
	.post(ctrlHistory.sendMessageAsPatient);
router
	.route('/doctor/doctorCity')
	.post(ctrlDoctors.doctorCities);

router
	.route('/doctor/docSpec')
	.post(ctrlDoctors.docSpecialization);

//Get the Extra features Using New APIs
router
	.route('/additional/scrap/:text')
	.get(scrap.getScrapingData);

module.exports = router;