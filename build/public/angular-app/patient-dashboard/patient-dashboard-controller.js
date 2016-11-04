angular.module('sense-ehr').controller('PatientDashboardController', PatientDashboardController);

function PatientDashboardController($http, $window, patientDataFactory, doctorDataFactory) {
	
	var vm = this;
	var patient_id= $window.sessionStorage.id;
	var pieData='';
	var BPOptions = {
		    chart: { renderTo: 'container' },
		    title: {
	            text: 'Systolic and Diastolic Pressures',type: 'spline'
	        },
		    xAxis: { type: 'datetime' ,  dateTimeLabelFormats: {hour: '%l %p'}},
		    yAxis: {title: { text: 'Blood Pressure (mm/Hg)' },
			            plotLines: [{
			                width: 1,
			                color: '#808080'
			            }]
			        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        tooltip: {
	            dateTimeLabelFormats: {
	                hour: '%A, %b %e, %l %p'
	            },
	            valueSuffix: 'mm/Hg'
	        },
	        credits: { enabled: false},
            exporting: { enabled: false },
		    series: []
		};

		var StepsOptions = {
			    chart: { renderTo: 'steps', zoomType: 'xy' },
			    title: {text: 'Steps and Calories'},
			    xAxis: { type: 'datetime' ,  dateTimeLabelFormats: {hour: '%l %p'},  crosshair: true},
			    yAxis: [{ // Primary yAxis
			            labels: {
			                format: '{value} steps',
			                style: {
			                    color: Highcharts.getOptions().colors[1]
			                }
			            },
			            title: {
			                text: 'Steps',
			                style: {
			                    color: Highcharts.getOptions().colors[1]
			                }
			            }
			        }, { // Secondary yAxis
			            title: {
			                text: 'Calories',
			                style: {
			                    color: Highcharts.getOptions().colors[0]
			                }
			            },
			            labels: {
			                format: '{value} cal',
			                style: {
			                    color: Highcharts.getOptions().colors[0]
			                }
			            },
			            opposite: true
		        }],
		        legend: {
		        	 	layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'middle',
			            borderWidth: 0,
			            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		        },
		        tooltip: {
		            shared: true
		        },
		        credits: { enabled: false},
	              exporting: { enabled: false },
			    series: []
			};

		
		
		var weightOptions ={	
						chart: {renderTo: 'weight',type: 'spline'},
				        title: {text: 'Weight'},
					    xAxis: { type: 'datetime' ,labels: {overflow: 'justify'}},
				        yAxis: {
				            title: {
				                text: 'Weight (lbs)'
				            },
				            minorGridLineWidth: 0,
				            gridLineWidth: 0,
				            alternateGridColor: null,
				            
				            plotBands: [
				                { 
				                from: 271,
				                to: 500,
				                color: 'rgba(68, 170, 213, 0.1)',
				                label: {
				                    text: 'Class 3 Obese',
				                    style: {color: '#606060'}
				                }
				            }, { 
				                from: 203,
				                to: 271,
				                color: 'rgba(0, 0, 0, 0)',
				                label: {
				                    text: 'Obese',
				                    style: {color: '#606060'}
				                }
				            }, { 
				                from: 169,
				                to: 202,
				                color: 'rgba(68, 170, 213, 0.1)',
				                label: {
				                    text: 'Overweight',
				                    style: {color: '#606060'}
				                }
				            }, { 
				                from: 125,
				                to: 168,
				                color: 'rgba(0, 0, 0, 0)',
				                label: {
				                    text: 'Healthy weight',
				                    style: {color: '#606060' }
				                }
				            }, {
				                from: 0,
				                to: 124,
				                color: 'rgba(68, 170, 213, 0.1)',
				                label: {
				                    text: 'Underweight',
				                    style: {color: '#606060'}
				                }
				            }
				            ]
				        },
				        tooltip: { valueSuffix: 'lbs'},
				        plotOptions: {
				            spline: {
				                lineWidth: 4,
				                states: {
				                    hover: {
				                        lineWidth: 5
				                    }
				                },
				                marker: {
				                    enabled: false
				                },
				            }
				        },
				        credits: { enabled: false},
			              exporting: { enabled: false }
				        ,series: [],
				        navigation: { menuItemStyle: {fontSize: '10px' }}
				       
		};
		
		var healthOptions = {
			    chart: { renderTo: 'health', type: 'column' },
			    title: {text: 'Health Status'},
			    xAxis: { type: 'datetime' ,  dateTimeLabelFormats: {hour: '%l %p'}},
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        tooltip: {
		            dateTimeLabelFormats: {
		                hour: '%A, %b %e, %l %p'
		            }
		        },
		        credits: { enabled: false},
	              exporting: { enabled: false },
			    series: []
			};
	
		var pieChartOptions = {
			    chart: { renderTo: 'pieChart',plotBackgroundColor: null,plotBorderWidth: null,plotShadow: false,type: 'pie'},
			    title: {text: 'Health Status Percentage'},
			    tooltip: {
	                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: false
	                    },
	                    showInLegend: true
	                }
	            },
	            credits: { enabled: false},
	              exporting: { enabled: false },
			    series:[
			    	{'name':'Health Status', 'colorByPoint': true,
			    	data: []
			   }]
			};
		

		
		var multipleAxesChart={
			    chart: {zoomType: 'xy',renderTo: 'multipleAxisChart'},
		        title: {text: 'Calories Burnt vs Blood Pressure Variation'},
		       	xAxis: { type: 'datetime' ,  dateTimeLabelFormats: {hour: '%l %p'}},
		        yAxis: [{ // Primary yAxis
		            labels: {
		                format: '{value} cal',
		                style: {
		                    color: Highcharts.getOptions().colors[2]
		                }
		            },
		            title: {
		                text: 'Calories Burnt',
		                style: {
		                    color: Highcharts.getOptions().colors[2]
		                }
		            },
		            opposite: true

		        }, { // Secondary yAxis
		            gridLineWidth: 0,
		            title: {
		                text: 'Systolic Pressure',
		                style: {
		                    color: Highcharts.getOptions().colors[0]
		                }
		            },
		            labels: {
		                format: '{value} mm/Hg',
		                style: {
		                    color: Highcharts.getOptions().colors[0]
		                }
		            }

		        }, { // Tertiary yAxis
		            gridLineWidth: 0,
		            title: {
		                text: 'Diastolic Pressure',
		                style: {
		                    color: Highcharts.getOptions().colors[1]
		                }
		            },
		            labels: {
		                format: '{value} mm/Hg',
		                style: {
		                    color: Highcharts.getOptions().colors[1]
		                }
		            },
		            opposite: true
		        }],
		        tooltip: {
		            shared: false
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'left',
		            x: 80,
		            verticalAlign: 'top',
		            y: 55,
		            floating: true,
		            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		        },
		        series: [{
		            name: 'Calories Burnt',
		            type: 'column',
		            yAxis: 1,
		            data: [],
		            tooltip: {
		                valueSuffix: 'cal'
		            }

		        }, {
		            name: 'Systolic Pressure',
		            type: 'spline',
		            yAxis: 2,
		            data: [],
		            tooltip: {
		                valueSuffix: 'mm/Hg'
		            }
		        }, {
		            name: 'Diastolic Pressure',
		            type: 'spline',
		            data: [],
		            tooltip: {
		                valueSuffix: ' mm/Hg'
		            }
		        }]
		        
		};
		
		
		
		
		var healthStatus = {
			    name: 'Health Status <br> 1 - Positive<br> 0 - Negative',
			    data: []
			};
		var sys = {
		    name: 'Systolic Pressure',
		    data: []
		};
		var dia = {
		    name: 'Diastolic Pressure',
		    data: []
		};

		var steps = {
			    name: 'Step Count',
			    type: 'column',
			    yAxis: 1,
			    data: []
			};
		var weight = {
			    name: 'Weight',
			    data: []
			};
		var cal = {
			    name: 'Calories Burnt',
			    type: 'line',
			    yAxis: 1,
			    tooltip: {
	                valueSuffix: 'cal'
	            },
			    data: []
			};
	
		
	vm.onLoad=function(){

		vm.steps=345;
		vm.cal=400;
		
		 $http.get('/api/patient/getBloodPressure/'+patient_id).then(function(result) {
				if(result.status === 200) {  
					var cnt=0;
			        for( i=0;i<result.data.length;i++){
		            	var date=result.data[i].captured_time.split("T")[0];
		            	var year=date.substring(0, 4);
		            	var month=date.substring(5, 7);
		            	var dt=date.substring(8, 10);
		            	var sp=0;
		            	var dp=0;
		            	var ar1=[];	var ar2=[];
			          	ar1.push(Date.UTC(year,month-1,dt));
			          	ar1.push(parseInt(result.data[i].systolic_pressure));
			          	ar2.push(Date.UTC(year,month-1,dt));
			          	ar2.push(parseInt(result.data[i].diastolic_pressure));
		          		sys.data.push(ar1);
					    dia.data.push(ar2);
		          	}
			        vm.sp=result.data[i-1].systolic_pressure;
		            vm.dp=result.data[i-1].diastolic_pressure;
		            
		            BPOptions.series.push(sys, dia);

		    		var chart = new Highcharts.Chart(BPOptions);
		    		
		    		var chart1 = new Highcharts.Chart(StepsOptions);
		            
				}
				else{
					console.log("Error");
				}
		 }).catch(function(error) {
	            console.log(error);
	          });
		
		 
		 
		 $http.get('/api/patient/getPatientMedication/'+patient_id).then(function(result) {
				if(result.status === 200) {   
					if(result.data.length>0){
						vm.medicationData=true;
						vm.medication=result.data;
					}
					else{
						vm.medicationData=false;
					}
				}
				else{
					console.log("Error");
				}
		 }).catch(function(error) {
	            console.log(error);
	          });
		 
		 
		 $http.get('/api/patient/getHealthStatus/'+patient_id).then(function(result) {
					if(result.status === 200) {   
						var i=0;var prevDate='';
						var posStat=0,negStat=0;
						   for( i=0;i<result.data.length;i++){
					        	var date=result.data[i].captured_time.split("T")[0];
				            	var year=date.substring(0, 4);
				            	var month=date.substring(5, 7);
				            	var dt=date.substring(8, 10);
				            	var ar1=[];
				            	var date1=Date.UTC(year,month-1,dt);
					          	if(prevDate!=date1){
					          		ar1.push(date1);
						          	if(result.data[i].state=="Good"){
						          		ar1.push(1);
						          		posStat++;
						          	}
						          	else{
						          		ar1.push(-1);
						          		negStat++;
						          	}
						          	healthStatus.data.push(ar1);
						          	prevDate=date1;
					          	}
					        }
						   healthOptions.series.push(healthStatus);
						    var chart3 = new Highcharts.Chart(healthOptions);
						    var chart4=new Highcharts.Chart(pieChartOptions);
						    chart4.series[0].setData([['Positive Health Status',posStat],['Negative Health Status',negStat]],true);

					}
					else{
						console.log("Error");
					}
		 		}).catch(function(error) {
	            console.log(error);
	          });
		
		 $http.get('/api/patient/getPatientStepsAndWeight/'+patient_id).then(function(result) {
				if(result.status === 200) {   
					var i=0,j=0;
					var len=result.data.weight.length;
			        var currweight=parseInt(result.data.weight[len-1].weight);
			        for( i=0;i<result.data.steps.length;i++){
			        	var date=result.data.steps[i].time_captured.split("T")[0];
		            	var year=date.substring(0, 4);
		            	var month=date.substring(5, 7);
		            	var dt=date.substring(8, 10);
		            	var ar1=[];var ar2=[];
			          	ar1.push(Date.UTC(year,month-1,dt));
			          	ar1.push(parseInt(result.data.steps[i].step_count));
			          	
			        	ar2.push(Date.UTC(year,month-1,dt));
			          	ar2.push(parseInt((currweight/3500)*parseInt(result.data.steps[i].step_count)));
			          	steps.data.push(ar1);
			          	cal.data.push(ar2)
			        }
			        
					for( j=0;j<result.data.weight.length;j++){
			        	var date=result.data.weight[j].date.split("T")[0];
		            	var year=date.substring(0, 4);
		            	var month=date.substring(5, 7);
		            	var dt=date.substring(8, 10);
		            	var ar1=[];
			          	ar1.push(Date.UTC(year,month-1,dt));
			          	ar1.push(parseInt(result.data.weight[j].weight));			          
			          	weight.data.push(ar1);
			        }
				    vm.steps=result.data.steps[i-1].step_count;
				    vm.cal=parseInt((currweight/3500)*parseInt(result.data.steps[i-1].step_count));
				    
				    // Display Weight and Steps cal charts
				    StepsOptions.series.push(steps, cal);
				    weightOptions.series.push(weight);
				    var chart2 = new Highcharts.Chart(weightOptions);
		    		var chart1 = new Highcharts.Chart(StepsOptions);
				}
				else{
					console.log("Error");
				}
		 }).catch(function(error) {
	            console.log(error);
	          });
		
		};

		$(document).ready(function() {
		    $('#datatable').dataTable();
		    $('input[name="daterange"]').daterangepicker();
		  });
				
};





