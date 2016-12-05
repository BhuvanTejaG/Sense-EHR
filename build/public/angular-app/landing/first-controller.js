angular.module('sense-ehr').controller('FirstController', FirstController);

function FirstController($http, $window, patientDataFactory, doctorDataFactory) {
	
	var vm = this;
	
	var userType = $window.sessionStorage.userType;
	
	
	vm.invalid= false;
	vm.success=false;
	
	vm.onLoad = function() {
		// To Toggle between patient and doctor 
		
	if($window.sessionStorage.userType == "patient"){
		vm.isPatient=true;
	}
	else{
		
		vm.isPatient=false;
		
	}
	};	  
	
	//Generate Word cloud after scraping
	vm.getWordCloud=function(){
	    document.getElementById("demo").innerHTML="";    
		var textToSearch=vm.text;
		
		 $http.get('/api//additional/scrap/'+textToSearch).then(function(result) {
				if(result.status === 200) {   
				
					
					var word=[];var count=[];
			        for (var i =0; i < result.data.length; i++) {
			            console.log(result.data[i].word);
			            word.push(result.data[i].word);
			            count.push(result.data[i].count);

			        }
			   
			        var fill = d3.scale.category20();
			        num=0;
				  d3.layout.cloud().size([600, 600]).words(d3.zip(word, count).map(function(d) {
					  	num=d[1]+num;
					  	console.log(num);
				        return {text: d[0], size: parseInt(d[1])};
				      }))
				      .padding(2)
				      .rotate(function() { return ~~(Math.random() * 2) * 45; })
				      .font("Impact")
				      .fontSize(function(d) { return d.size/3; })
				      .on("end", draw)
				      .start();

					  function draw(words) {
					    d3.select("#demo").append("svg")
					        .attr("width", 700)
					        .attr("height", 400)
					      .append("g")
					     .attr("transform", "translate(200,200)")
					      .selectAll("text")
					        .data(words)
					      .enter().append("text")
					       .transition()
					        .duration(800)
					        .style("font-size", function(d) { return d.size + "px"; })
					        .style("font-family", "Impact")
					        .style("fill", function(d, i) { return fill(i); })
					        .attr("text-anchor", "middle")
					        .attr("transform", function(d) {
					          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
					        })
					        .text(function(d) { return d.text; });
					  }
					
					
				}
				else{
					console.log("Error");
				}
	 		}).catch(function(error) {
         console.log(error);
       });
	}
};

