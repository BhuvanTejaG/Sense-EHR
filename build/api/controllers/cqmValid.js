var mysql = require('../data/dbconnection.js');
var twilio = require('../controllers/twilio.js');

module.exports.isCQMCompliant=function(patientId,systollic_pressure,diastolic_pressure,res){
	 var patId=patientId; 
	 console.log("CQM Validation");
	   query = "select a.isPregnant,a.isRenal,a.isChronic,a.isDialysis,a.isTransplant,p.created_on " +
	   		", (YEAR(CURDATE())-YEAR(p.birthdate))- (RIGHT(CURDATE(),5)<RIGHT(p.birthdate,5)) AS age " +
	   		"from appointment a,patient p where p.patient_id=a.patient_id and p.patient_id='"+patId+"' and p.created_on " +
	   		"BETWEEN (CURRENT_DATE() - INTERVAL 6 MONTH) AND CURRENT_DATE() and a.date<=current_date() " +
	   		"order by a.date desc limit 1;";
	  
	   mysql.fetchData(function(err,results) {
	      if(err) {
	         console.log('Appointments not found'+err);
	         res.status(500).json(err);
	      } else if(results.length > 0) {
	    	 if(results.data[0].age>18 || results.data[0].age<75){
	    		 if(results.data[0].isPregnant=='1'||results.data[0].isRenal=='1'||results.data[0].isChronic=='1'||
		    			 results.data[0].isDialysis=='1'|| results.data[0].isTransplant=='1'){
		    		 if(systollic_pressure>90 &&diastolic_pressure>140){
		    			 results={"success":true};
		    		 }
		    		 else{
		   	    	  	results={"success":false};
		    		 }
		    	 }
	    	 }
	    	 else{
		          results={"success":false};
	    	 }	    	  
	    	 console.log('Success in fetching results'+ JSON.stringify(results));
	    	  res.status(200).json(results);
	      } else {
	    	  console.log("Don't send Message - Data is valid");
	    	  results={"success":false};
	          res.status(204).json(results);
	      }
	   },query);
}