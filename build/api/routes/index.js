var express = require('express');
var router = express.Router();

var ctrlPatients = require('../controllers/patients.controller.js');

// Patient routes
router
  .route('/patient/profile/:patient_id')
  .get(ctrlPatients.getProfile);


// Doctor routes


// Authentication


module.exports = router;