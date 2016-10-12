angular.module('sense-ehr').controller('DoctorDashboardController', DoctorDashboardController);

function DoctorDashboardController($http, $window, doctorDataFactory) {
	  var vm = this;
	  
	  //negative chart
	  var count = [0, 0, 0, 0, 0, 0, 0];
	  
	  //BP column chart
	  
	  var names = [];
	  var systole = [];
	  var diastole = [];
	  
	  //chartJS defaults

	  Chart.defaults.global.legend = {
        enabled: false
      };
	  
	  
	  
  var doctor_id = $window.sessionStorage.id;
	 
  doctorDataFactory.getAppointmentCount(doctor_id).then(function(response) {
	  
	  console.log('[]: Got status as %d from doctor getAppointmentCount api',response.status);
	  
	  console.log(response.data);
	  
	  
		if(response.status === 200) {
			
			for (var key in response.data) {
				var obj =  response.data[key];

				if (obj.Day == "Sunday")
					count[0] = obj.Count;
				else if(obj.Day == "Monday")
					count[1] = obj.Count;
				else if(obj.Day == "Tuesday")
					count[2] = obj.Count;
				else if(obj.Day == "Wednesday")
					count[3] = obj.Count;
				else if(obj.Day == "Thursday")
					count[4] = obj.Count;
				else if(obj.Day == "Friday")
					count[5] = obj.Count;
				else if(obj.Day == "Saturday")
					count[6] = obj.Count;
			}

			
		}
		
		else {

		}
		
		 // Bar chart
	      var ctx = document.getElementById("barChart");
	      var mybarChart = new Chart(ctx, {
	        type: 'bar',
	        data: {
	          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	          datasets: [{
	            label: '# of Appointments',
	            backgroundColor: "#26B99A",
	            data: count
	          }]
	        },

	        options: {
	          scales: {
	            yAxes: [{
	              ticks: {
	                beginAtZero: true
	              }
	            }]
	          }
	        }
	      });
	      
	   
	  }).catch(function(error) {
		  console.log('[]: Got into error block of doctor getAppointmentCount api');
	        console.log(error);
	        
	     // Bar chart
		      var ctx = document.getElementById("barChart");
		      var mybarChart = new Chart(ctx, {
		        type: 'bar',
		        data: {
		          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		          datasets: [{
		            label: '# of Appointments',
		            backgroundColor: "#26B99A",
		            data: count
		          }]
		        },

		        options: {
		          scales: {
		            yAxes: [{
		              ticks: {
		                beginAtZero: true
		              }
		            }]
		          }
		        }
		      });
      });
  
  
  // BP Column Chart
  
doctorDataFactory.getBloodPressures(doctor_id).then(function(response) {
	  
	  console.log('[]: Got status as %d from doctor getBloodPressures api',response.status);
	  
	  console.log(response.data);

		if(response.status === 200) {
			
			for (var key in response.data) {
				var obj =  response.data[key];
				
				names.push(obj.first_name);
				systole.push(parseInt(obj.systolic_pressure));
				diastole.push(parseInt(obj.diastolic_pressure));

			}
			
		}
		
		else {
			
			names.push("NA");
			names.push("NA");
			
			systole.push(0);
			systole.push(0);
			
			diastole.push(0);
			diastole.push(0);
			
			 

		}
		
		
		// BP Column Chart
		 var chart3 = new Highcharts.Chart({
				chart: {
					renderTo: 'columnChart',
			     	type: 'column'
			     },
			     exporting: { 
			     	enabled: false 
			     },
			     title: {
			         text: ''
			     },
			     xAxis: {
			            categories: names,
			            crosshair: true
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: 'Blood Pressure'
			            }
			        },
			     credits: {
			         enabled: false
			     },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true
		        },
			     plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0
			            }
			        },
			     series: [{
			            name: 'Systole',
			            data: systole

			        }, {
			            name: 'Diastole',
			            data: diastole

			        }]
			});
	   
	  }).catch(function(error) {
		  console.log('[]: Got into error block of doctor getBloodPressures api');
	        console.log(error);
	        
			names.push("NA");
			names.push("NA");
			
			systole.push(0);
			systole.push(0);
			
			diastole.push(0);
			diastole.push(0);
			
			 // BP Column Chart
			 var chart3 = new Highcharts.Chart({
					chart: {
						renderTo: 'columnChart',
				     	type: 'column'
				     },
				     exporting: { 
				     	enabled: false 
				     },
				     title: {
				         text: ''
				     },
				     xAxis: {
				            categories: names,
				            crosshair: true
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: 'Blood Pressure'
				            }
				        },
				     credits: {
				         enabled: false
				     },
				     plotOptions: {
				            column: {
				                pointPadding: 0.2,
				                borderWidth: 0
				            }
				        },
				     series: [{
				            name: 'Systole',
				            data: systole

				        }, {
				            name: 'Diastole',
				            data: diastole

				        }]
				});
	        
      });


doctorDataFactory.getLimitedBP(doctor_id).then(function(response) {
	  
	  console.log('[]: Got status as %d from doctor getLimitedBP api',response.status);
	  
	  console.log(response.data);
			var resarray = [];

		if(response.status === 200) {
			
			if(response.data[0].patient_id){
				var id = response.data[0].patient_id;
			}
			
			
			var name = null;
			
			var sysarray = [];
			var diarray = [];
			var changed = false;
				
			for (var key in response.data) {
				var obj =  response.data[key];
				
				
				if(id != obj.patient_id )
				{
					id = obj.patient_id;
					changed = true;
				
				}
				
				if(changed == true){
													
							var obj1 = {
						        	pointStart: Date.now() - 7 * 24 * 60 * 60 * 1000,
						            pointInterval: 24 * 60 * 60 * 1000, 
						            name: name,
						            data: sysarray
						        };
							
							var obj2 = {
						        	pointStart: Date.now() - 7 * 24 * 60 * 60 * 1000,
						            pointInterval: 24 * 60 * 60 * 1000, 
						            name: name,
						            data: diarray
						        };
							
							resarray.push(obj1);
							resarray.push(obj2);
							
							name = null;
							sysarray = [];
							diarray = [];
							changed = false;
							
							name = obj.first_name;
							sysarray.push(parseInt(obj.systolic_pressure));
							diarray.push(parseInt(obj.diastolic_pressure));
						

				}
				else{
					name = obj.first_name;
					sysarray.push(parseInt(obj.systolic_pressure));
					diarray.push(parseInt(obj.diastolic_pressure));
					
					
					if(key == response.data.length-1){
						
						
						var obj1 = {
					        	pointStart: Date.now() - 7 * 24 * 60 * 60 * 1000,
					            pointInterval: 24 * 60 * 60 * 1000, 
					            name: name,
					            data: sysarray
					        };
						
						var obj2 = {
					        	pointStart: Date.now() - 7 * 24 * 60 * 60 * 1000,
					            pointInterval: 24 * 60 * 60 * 1000, 
					            name: name,
					            data: diarray
					        };
						
						resarray.push(obj1);
						resarray.push(obj2);
						
					}
					
				}


			}
			
			console.log(resarray);
			
			
		}
		
		else {	 

		}
		
		 var chart1 = new Highcharts.Chart({
		 		chart: {
		 			renderTo: 'mylineChart',
		        	type: 'line'
		        },
		        exporting: { 
		        	enabled: false 
		        },
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            type: 'datetime'
		        },
		        yAxis: {
		            title: {
		                text: ''
		            },
		        },
		        legend: {
		            enabled: false
		        },
		        credits: {
		        	 enabled: false
		        },
		        plotOptions: {
		            line: {
		                dataLabels: {
		                    enabled: false
		                },
		                enableMouseTracking: true
		            }
		        },
		        series: resarray
	    });
	
	   
	  }).catch(function(error) {
		  console.log('[]: Got into error block of doctor getLimitedBP api');
	        console.log(error);
	        
	        
			 var chart1 = new Highcharts.Chart({
			 		chart: {
			 			renderTo: 'mylineChart',
			        	type: 'line'
			        },
			        exporting: { 
			        	enabled: false 
			        },
			        title: {
			            text: ''
			        },
			        subtitle: {
			            text: ''
			        },
			        xAxis: {
			            type: 'datetime'
			        },
			        yAxis: {
			            title: {
			                text: ''
			            },
			        },
			        legend: {
			            enabled: false
			        },
			        credits: {
			        	 enabled: false
			        },
			        plotOptions: {
			            line: {
			                dataLabels: {
			                    enabled: false
			                },
			                enableMouseTracking: true
			            }
			        },
			        series: resarray
		    });
	        
		
	        
    });
  

 
 
 
 
 /*
    [{
	        	pointStart: Date.now() - 7 * 24 * 60 * 60 * 1000,
	            pointInterval: 24 * 60 * 60 * 1000, 
	            name: 'Tokyo',
	            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2]
	        },
	        {
	        	pointStart: Date.now() - 7 * 24 * 60 * 60 * 1000,
	            pointInterval: 24 * 60 * 60 * 1000, 
	            name: 'fasdf',
	            data: [5.0, 7.9, 6.5, 9.5, 8.2, 10.5, 15.2]
	        }
	        ]
  */

 var chart2 = new Highcharts.Chart({
	chart: {
		renderTo: 'negativeChart',
     	type: 'column'
     },
     exporting: { 
     	enabled: false 
     },
     title: {
         text: ''
     },
     xAxis: {
         categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
     },
     credits: {
         enabled: false
     },
     series: [{
         name: 'John',
         data: [5, 3, 4, 7, 2]
     }, {
         name: 'Jane',
         data: [2, -2, -3, 2, 1]
     }]
});
 
 
 	
}