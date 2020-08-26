angular.module("arenaPage", [])
  	.controller("questionCtrl", function($scope, $compile, $http) {
  		var _this = this;

		_this.competitionName;
		_this.compID;
  		_this.questions = [];
		_this.pageName = "Settings";
		_this.state = "COMPETITION";
		//_this.teams = ["PB and J", "Nerd Alert", "US Navy", "FBI"]
		_this.teams = [];
		//_this.admins = [{name: "Dylan Bryant", email: "dylan.m.bryant@gmail.com", password: "Password123"}, {name: "Catherine Gallaher", email: "morecoffee42@snhu.edu", password: "iRock"}]
		_this.admins = [];
		_this.competitions = [];

		
		_this.selectCompetition = function(name, id) {
			if (_this.competitionName === escape(name)){
				return;
			}
			_this.competitionName = name;
			//console.info(id);
			_this.compID = id;
			//console.info("1: "+ name + " 2: " + _this.competitionName);
			_this.questions = [];
			_this.teams = [];

			var compName = "competition="+escape(name);
			//console.info('/php/getQuestions.php?'+compName)
			$http.post('/php/getQuestions.php?'+compName).then(
			function(response){
				console.info(response.data);
				var questionData = escape(response.data).split("%0A");
				for (var i = 1; i < questionData.length-1; i++) {
					//console.info(adminData[i]);
					var newQuestion = questionData[i].split("%09");
					console.info("1: " + newQuestion[1] + "2: " + unescape(newQuestion[1]));
					_this.questions.push({questionText: unescape(newQuestion[1].replace(/%5Cn/g, "%0A")), outputFile: undefined});
				}
				// Add initial question
				//console.info(_this.questions.length)
  				if (_this.questions.length === 0) {
					_this.addQuestion();
				}
			}, function(){console.log("Failed");
			});
			
			//console.info('/php/getTeam.php?'+compName)
			$http.post('/php/getTeam.php?' + compName).then(
			function(response){
				var teamData = (escape(response.data)).split("%0A");
				for (var i = 1; i < teamData.length-1; i++) {
					var newTeam = teamData[i].split("%09");
					//newTeam = newTeam.split("%2C");
					_this.teams.push(unescape(newTeam[0]));
				}
			}, function(){console.log("Failed");
			});
			
		}
		_this.getCompetitions = function() {
			$http({
				method: 'GET',
				url: '/php/getCompetition.php'
			 }).then(function successCallback(response) {
			 	//console.info("Comps: " + response.data)
			 	var compData = (escape(response.data)).split("%0A");
				for (var i = 1; i < compData.length-1; i++) {
					var newComp = compData[i].split("%09");
					//newTeam = newTeam.split("%2C");i
					/*if (i === 1) {
						_this.selectCompetition(unescape(newComp[0]));
					}*/

					_this.competitions.push({name: unescape(newComp[0]), id: unescape(newComp[3])});
				}
				_this.selectCompetition(_this.competitions[0].name, _this.competitions[0].id);

			}, function errorCallback(response) {
				console.info("There was an issue: " + response)
			});
		}
		
		_this.getInfo = function() {
			var username = getCookie("username");
			if (username === "") {
				window.location.href = "../HTML/index.html";	
				return;
			}
			_this.getCompetitions();					

			//get admins
			 $http({
				 method: 'GET',
			 	url: '/php/getAdmin.php'
				 }).then(function successCallback(response) {
			 		//console.info("Admins: " + response.data)
					var adminData = escape(response.data).split("%0A");
					//_this.admins.push({name:response.data});
					for (var i = 1; i < adminData.length-1; i++) {
						//console.info(adminData[i]);
						var newadmin = adminData[i].split("%09");
						_this.admins.push({name: unescape(newadmin[0]), email: unescape(newadmin[1])});
					}
			 	}, function errorCallback(response) {
			 		//console.info("There was an issue: " + response)
			 });
			 //get teams
			 
		}


		_this.getInfo();

  		_this.addQuestion = function() {
  			//create objects to handle questions and answers
  			_this.questions.push({});
  		};

  	
		

  		_this.saveEverything = function() {
  			readyToSave = true;
			console.info("1: " + _this.questions);
			questionArray = []
			filesArray = []
			for(var i = 0; i < _this.questions.length; i++){
				try {
					qT = _this.questions[i].questionText;
					oF = _this.questions[i].outputFile;
					if (!qT || !oF){
						window.alert("Save Failed. Please make sure every Question and Answer is filled out");
						readyToSave = false;
						break;
					}
					//console.info("1");
					//WriteToFile(oF, i+1);
					//console.info(oF);
					questionArray.push(qT);
					filesArray.push(oF);
				}
				catch(err){
					window.alert("An issue has occured. Please make sure everything is filled out properly")
					readyToSave = false;
					break;
				}
			}
			if (readyToSave) {
				//TO-DO change comp
				//console.info("Comp Name: " + _this.competitionName);
				console.info("2: " + questionArray);
				var req = {
					method: 'POST',
					url: '/php/addQuestions.php',
					headers: {
						'Content-Type': undefined
					},
					data : {
						'questions' : questionArray.join(';'),
						'file' : filesArray.join(';'),
						'competition' : _this.competitionName
					}
				};
	
				$http(req).then(
					function(response){console.info("Success")
						//console.info("Saved: " + response.data);
						// = response.data;
					}, function(){console.log("Failed");
				});

			}

  		}
  		_this.removeQuestion = function(index) {
  			_this.questions.splice(index, 1)
  		}

		_this.openSettings = function() {
			if (_this.state === "COMPETITION"){
				_this.state = "SETTINGS";
				_this.pageName = "Competition"
			}
			else if (_this.state === "SETTINGS"){
				_this.state = "COMPETITION";
				_this.pageName = "Settings"
			}
		}


		_this.addComp = function(option) {
			_this.modal = document.getElementById("addCompModal");
			if (option === "Save") {
				var compName = document.getElementById('competitionName').value;
				var cN = "name="+compName;
				var cS = "start="+new Date(document.getElementById('competitionStartTime').value).toISOString();
				var cE = "end="+ new Date(document.getElementById('competitionEndTime').value).toISOString();		
				var sec = ":00";
				cS.replace('T', " ");
				cE.replace('T', " ");
				cS.replace('Z', "");
				cE.replace('Z', "");
				cS.replace('.', ":");
				cE.replace('.', ":");

				//console.info(cS+"\n"+cE);
				$http.post('/php/addCompetition.php?' + cN+'&'+cS+'&'+cE).then(
				function(response){
					//console.info("Success")
					//console.info(response.data);
					_this.competitions.push({name: compName, id: response.data});
				}, function(){console.log("Failed");});
		        	_this.modal.style.display = "none";
		        }
			else if (option === "Open") {
				_this.modal.style.display = "block";
			}
			else if (option === "Close") {
		       		_this.modal.style.display = "none";
		        }
		};

		


		_this.removeComp = function(pos) {
			var compName = "name="+_this.competitions[pos].name;
			//console.info('/php/removeCompetition.php?'+compName)
			$http.post('/php/removeCompetition.php?'+compName).then(
			function(response){
				//console.info("Success")
				//console.info(response.data);
			}, function(){console.log("Failed");
			});
			_this.competitions.splice(pos, 1);

		}


		_this.addAdmin = function(option) {
			//php/addAdmin.php
			_this.modal = document.getElementById("addAdminModal");
			if(option === "Save"){
				//add the admin
				var aN = "name="+document.getElementById('adminName').value;
				var aE = "email="+document.getElementById('adminEmail').value;
				var aP = "pass="+ sha256(document.getElementById('adminPassword').value);
				console.info(aP);	
				$http.post('/php/addAdmin.php?' + aN+'&'+aE+'&'+aP).then(
					function(response){console.info("Success")
					//console.info(response.data);
				}, function(){console.log("Failed");});
				_this.admins.push({name: document.getElementById('adminName').value, email: document.getElementById('adminEmail').value, password: document.getElementById('adminPassword').value});
				_this.modal.style.display = "none";
			}
			else if (option === "Open") {
				_this.modal.style.display = "block";
			}
			else if (option === "Close") {
				_this.modal.style.display = "none";
			}
		}

		_this.removeAdmin = function(e, pos) {
			var email = "email="+e;
			//console.info('/php/removeAdmin.php?'+email)
			$http.post('/php/removeAdmin.php?' + email).then(
			function(response){
				//console.info("Success")
				//console.info(response.data);
			}, function(){console.log("Failed");
			});
			_this.admins.splice(pos, 1);
		}


		_this.addTeam = function(option){
			_this.modal = document.getElementById("addTeamModal");
			if(option === "Save"){
				//add the Team
				$http.post('/php/addTeam.php?name=' + document.getElementById('teamName').value +'&'+"comp="+_this.competitionName).then(
					function(response){console.info("Success")
					//console.info(response.data);
				}, function(){console.log("Failed");});

				_this.teams.push(document.getElementById('teamName').value);
				_this.modal.style.display = "none";
			}
			else if (option === "Open") {
				_this.modal.style.display = "block";
			}
			else if (option === "Close") {
				_this.modal.style.display = "none";
			}
		}

		_this.removeTeam = function(t, pos) {
			var team = "name="+t;
			//console.info('/php/removeTeam.php?'+team)
			$http.post('/php/removeTeam.php?' + team).then(
			function(response){
				//console.info("Success")
				//console.info(response.data);
			}, function(){console.log("Failed");
			});
			_this.teams.splice(pos, 1);
		}


  })
	.directive("fileread", function () {
	    return {
	        scope: {
	            fileread: "="
	        },
	        link: function (scope, element, attributes) {
	            element.bind("change", function (changeEvent) {
	                var reader = new FileReader();
	                reader.onload = function (loadEvent) {
	                    scope.$apply(function () {
	                        scope.fileread = loadEvent.target.result;
	                    });
	                }
	                reader.readAsDataURL(changeEvent.target.files[0]);
	            });
	        }
	    }
	});


function openNavigation() {
    	document.getElementById("competitionnav").style.display = "block";
}

function closeNavigation() {
	document.getElementById("competitionnav").style.display = "none";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

/*
function WriteToFile(file, num) { 
	console.info("3");
	const fs = require('fs');
	console.info("4");
	var reader = new FileReader();
	console.info("5");
	reader.readAsText(file);
	console.info(reader.result);
	fs.writeFile('Output.txt', reader.result, (err) => {
		// In case of a error throw err. 
		if (err) throw err; 
	})
	s.Close();
}
*/



