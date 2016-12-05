angular.module('sense-ehr').controller('appointmentController', appointmentController);

function appointmentController($http, $window, patientDataFactory, doctorDataFactory) {
    var vm = this;

    var patient_id = $window.sessionStorage.id;
    vm.doctorShow = false;
    vm.addressShow = false;
    vm.detailShow = false;
    vm.questionaire = false;
    vm.submitAppointment = false;
    vm.selectShow = true;
    var appointmentData = {};

    appointmentData.patient_id = patient_id;
    vm.docSpecialization = function() {
        $http.post('/api/doctor/docSpec').then(function(response) {
            if(response.status === 200) {
                vm.specs = response.data;
                vm.specShow = true;
            } else if(response.status=== 204){
                vm.specShow = true;
                vm.err = "specs not found";
                console.log("specs not found");
            }
        }).catch(function (error) {
            vm.errorPanel = true;
            vm.err = error;
            console.log(error);
        })
    }

   vm.doctorCity = function() {

        var  docState = {
            state: vm.state_doc
        }

       $http.post('/api/doctor/doctorCity',docState).then(function(response) {
            if(response.status === 200) {
                vm.cities = response.data;
                vm.resultsExist = true;
                vm.resultsNotExist = false;
                vm.cityShow = true;
            } else if(response.status=== 204){
                vm.resultsNotExist = true;
                vm.resultsExist = false;
                vm.cityShow = true;
                vm.err = "City not found";
                console.log("City not found");
            }
       }).catch(function (error) {
           console.log('Error fetching cities from backend');
           vm.errorPanel = true;
           vm.err = error;
           console.log(error);
       });
   };

    vm.previous = function() {
        vm.selectShow = true;
        vm.detailShow = false;
        vm.cityShow = true;
        vm.specShow = true;
        vm.doctorShow = false;
        vm.addressShow = false;
        vm.questionaireShow = false;
        vm.resultsExist = true;
        vm.resultsNotExist = false;
        appointmentData.height = null;
        appointmentData.weight = null;
        appointmentData.reason = null;
        appointmentData.description = null;
    }

    vm.cancel = function() {

        vm.selectShow = false;
        vm.questionaireShow = false;
        vm.cityShow = false;
        vm.resultsExist = false;
        vm.resultsNotExist = false;
        vm.specShow = false;
        vm.doctorShow = false;
        vm.addressShow = false;
        vm.detailShow = true;
        appointmentData.isPregnant = null;
        appointmentData.isRenal = null;
        appointmentData.isChronic = null;
        appointmentData.isDialysis = null;
        appointmentData.isKidney = null;
    }
    
    vm.doctorFunc=function() {
        var docselect = {
            date:vm.date,
            city:vm.city,
            specialization: vm.specialization
        };

        $http.post('/api/doctor/doctorCriteria',docselect).then(function(response) {
            console.log(JSON.stringify(response));
            if(response.status === 200) {
                    vm.doctors = response.data;
                    vm.doctorShow = true;
                    vm.errorPanel = false;
                    console.log("doctors drop down:",response.data[0]);
                    }
                    else if(response.status === 204) {
                    vm.errorPanel = true;
                    vm.err = "No Doctors found";
                    console.log("No records found");
                    }
                }).catch(function(error) {
                    console.log('[]: Got into error block of upcoming appointment fetching api');
                    vm.errorPanel = true;
                    vm.err = "No Doctors found";
                    console.log(error);
                });

    };

    vm.doctorAddress = function() {
        vm.addressShow = true;
        var docId = vm.doctorSelect;
        $http.get('/api/doctor/doctorAddress/'+docId).then(function(response) {
            console.log(JSON.stringify(response));
            if(response.status === 200) {
                var localdata = response.data[0];
                vm.doctorAddr = localdata.clinic_address1+","+localdata.clinic_address2+","+localdata.city+","+localdata.state;
                appointmentData.doctorAddr = localdata.doctorAddr;
                appointmentData.first_name = localdata.first_name;
                appointmentData.last_name = localdata.last_name;
                vm.addressShow = true;
                vm.errorPanel = false;
                console.log("doctors drop down:",response.data);
            }
            else if(response.status === 204){
                vm.errorPanel = true;
                vm.err = "No Doctor Address found";
                console.log("No Address found");
            }
        }).catch(function(error) {
            console.log('[]: Got into error block of upcoming appointment fetching api');
            console.log(error);
            vm.errorPanel = true;
            vm.err ="No Doctor Address found";
        });
    };

    vm.next = function() {
        vm.addressShow = false;
        vm.doctorShow = false;
        vm.selectShow = false;
        vm.detailShow = true;
        vm.errorPanel = false;
        appointmentData.date = vm.date;
       // appointmentData.time = vm.time;
        appointmentData.city = vm.city;
        appointmentData.specialization = vm.specialization;
        appointmentData.doctor_id = vm.doctorSelect;
        console.log(JSON.stringify(appointmentData));

    };
    vm.nextQuestionaire = function () {
        appointmentData.height = vm.height;
        appointmentData.weight = vm.weight;
        appointmentData.reason = vm.reason;
        appointmentData.description = vm.description;
        vm.addressShow = false;
        vm.doctorShow = false;
        vm.selectShow = false;
        vm.detailShow = false;
        vm.questionaireShow = true;
    }

    vm.submitProfile = function() {
        vm.addressShow = false;
        vm.doctorShow = false;
        vm.selectShow = false;
        vm.detailShow = false;
        vm.questionaireShow= false;

        appointmentData.isPregnant = vm.isPregnant;
        appointmentData.isRenal = vm.isRenal;
        appointmentData.isChronic = vm.isChronic;
        appointmentData.isDialysis = vm.isDialysis;
        appointmentData.isKidney = vm.isKidney;


        console.log(JSON.stringify(appointmentData));
        $http.post('/api/patient/submitAppointment',appointmentData).then(function(response) {
            console.log("in next questionaire"+JSON.stringify(response));
            if(response.status === 201) {
                vm.successMsg= true;
                vm.errorPanel = false;
                console.log("*********inserted data***********");
            }
            else  {
                vm.errorPanel = true;
                vm.err = "Appointment is not booked";
                console.log("Appoint is not booked");
            }
        }).catch(function(error) {
            console.log('[]: Got into error block of inserting form');
            console.log(error);
            vm.errorPanel = true;
            vm.err = "Appointment is not booked";
        });
    };

   
}

