angular.module("competitorPage", [])
  	.controller("competitorCtrl", function($scope, $compile, $http, $interval) {
  		var _this = this;

  		//_this.questions = [{question:"Print Hello World"}, {question:"Train Problem"}, {question:"English"}, {question:"History"}, {question:"Prime Numbers"}, {question:"Testing"}];	
  		_this.questions = []
  		_this.modal = document.getElementById("scoreModal");
  		//_this.teams = ["PB and J", "Nerd Alert", "FBI", "US Navy"]
  		_this.teams = []
		_this.languages = ["C++", "C", "C#", "Java", "Python 2.7", "Python 3.7"];
		_this.endDate;
		_this.startDate;
		_this.timeLeft;
		_this.points = [];
		_this.competitionName;
		
  		 _this.waitForComp = function() {
			var start;
			var date;
			$http.post('/php/getTime.php?name='+getCookie("competition")).then(
			function successCallback(response) {
			 	//console.info("Questions: " + response.data)
			 	//console.info(response.data);
				var datesArray = response.data.split('\n')[1];
				_this.startDate = new Date(datesArray.split("\t")[0]);
				_this.endDate = new Date(datesArray.split("\t")[1]);
				start = $interval(function() {
					date = new Date();
					//console.info(date);
					//console.info(_this.startDate);
					if (date > _this.endDate) {
						//console.info("Competition Over")
						if (angular.isDefined(start)) {
							$interval.cancel(start);
							start = undefined;
						}
				        _this.state = 'OVER';
					}
					else if (date >= _this.startDate) {
						if (angular.isDefined(start)) {
							$interval.cancel(start);
							start = undefined;
						}
						_this.state = 'PROGRESS';
        	    				_this.loadQuestions();
						_this.endComp()
					}
				}, 1000)
			}, function errorCallback(response) {
				console.info("There was an issue: " + response)
			});
		 }

		

		_this.endComp = function() {
			var end;
			end = $interval(function() {
				date = new Date();
				_this.timeLeft = msToTime(_this.endDate.getTime()-date.getTime());
				if (date > _this.endDate) {
					console.info("Competition Over")
					if (angular.isDefined(end)) {
						$interval.cancel(end);
						end = undefined;
					}
					_this.state = 'OVER';
				}
			}, 1000)
		}


		
		_this.compileCode = function(qNum){
			/*var queryInfo = document.location.search.replace(/^.*?\?/, '');
		      	var info = queryInfo.split(';')
		        var compId = info[0].replace(/^.*?\=/, '');
		      	var teamName = info[1].replace(/^.*?\=/, '');*/
			//var compId = getCookie("compId");
			var teamName = getCookie("teamName");
		        var language = _this.selectedLanguage;
			var code = _this.questions[qNum].codeToCompile;
	       		if (language === undefined) {
				window.alert("Please Select a Language")
			        return;
		        }
			/*var compileInfo = "?info=" + code + "&team=" + teamName + "&language=" + language + "&question=" + qNum + "&competition=" + compId;
			console.info('/php/compile.php' + compileInfo);
		        $http.post('/php/compile.php' + compileInfo).then(
				function(response){console.info("Success")
					console.info("Compile: " + response.data);
				}, function(){console.log("Failed");
			});*/
			var req = {
				method: 'POST',
				url: '/php/compile.php',
				headers: {
					'Content-Type': undefined
				},
				data : {
					'code' : code,
					'team' : teamName,
					'language' : language,
					'question' : qNum,
					'competition' : _this.competitionName
				}
			};

			$http(req).then(
				function(response){
					//console.info("Success?")
					//console.info("Compile: " + unescape(escape(response.data).split("%0A")));
					_this.questions[qNum].compiled = unescape(escape(response.data).replace("%0A", ""));
					//_this.questions[qNum].compiled = response.data;
				}, function(){console.log("Failed");
			});

		}

		_this.loadQuestions = function() {
  			//get objects for each question
			_this.competitionName = getCookie("competition")
			$http.post('/php/getQuestions.php?competition='+_this.competitionName).then(
			function successCallback(response) {
			 	//console.info("Questions: " + response.data)
			 	var questionData = escape(response.data).split("%0A");
				for (var i = 1; i < questionData.length-1; i++) {
					//console.info(adminData[i]);
					var newQuestion = questionData[i].split("%09");
					//console.info(newQuestion[1]);
					//console.info(unescape(newQuestion[1].replace(/%5Cn/g, "%0A")));
					_this.questions.push({question: unescape(newQuestion[1].replace(/%5Cn/g, "%0A"))});
				}
							
			}, function errorCallback(response) {
				console.info("There was an issue: " + response)
			});
			//get teams
			$http.post('/php/getTeam.php?competition='+_this.competitionName).then(
			function successCallback(response) {
			 	//console.info("Teams: " + escape(response.data));
			 	var teamData = (escape(response.data)).split("%0A");
				for (var i = 1; i < teamData.length-1; i++) {
					var newTeam = teamData[i].split("%09");
					_this.teams.push(unescape(newTeam[0]));
					_this.points.push(unescape(newTeam[1]));
					//console.info(escape(newTeam));
				}
				}, function errorCallback(response) {
					console.info("There was an issue: " + response)
			});
		}
  			

  		_this.showScoreboard = function() {
			$http.post('/php/getTeam.php?competition='+_this.competitionName).then(
				function successCallback(response) {
				 	//console.info("Teams: " + escape(response.data));
				 	var pointData = (escape(response.data)).split("%0A");
					for (var i = 1; i < pointData.length-1; i++) {
						var points = pointData[i].split("%09");
						_this.points[i-1] = (unescape(points[1]));
						//console.info(escape(newTeam));
					}
					_this.modal = document.getElementById("scoreModal");
					_this.modal.style.display = "block";
				}, function errorCallback(response) {
						console.info("There was an issue: " + response)
			});	        
  		}
  		_this.hideScoreboard = function() {
  			_this.modal.style.display = "none";
  		}

		_this.waitForComp();
  });


function insertTab(o, e)
{   
	var kC = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;
	if (kC == 9 && !e.shiftKey && !e.ctrlKey && !e.altKey)
	{
		var oS = o.scrollTop;
		if (o.setSelectionRange)
		{
			var sS = o.selectionStart;  
			var sE = o.selectionEnd;
			o.value = o.value.substring(0, sS) + "\t" + o.value.substr(sE);
			o.setSelectionRange(sS + 1, sS + 1);
			o.focus();
		}
		else if (o.createTextRange)
		{
			document.selection.createRange().text = "\t";
			e.returnValue = false;
		}
		o.scrollTop = oS;
		if (e.preventDefault)
		{
			e.preventDefault();
		}
		return false;
	}
	return true;
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

function msToTime(s) {
	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;

	return hrs + ':' + mins + ':' + secs;
}



