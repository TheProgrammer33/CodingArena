
function start(){
	var app = angular.module("loginPage", [])
    app.controller('loginCtrl', function($scope, $http) {
      var _this = this;

    	_this.compRole = [{label:"Admin", isAdmin: true}, {label:"Competitor"}];
      	//TODO - Delete test data from teams list
	_this.teams = [];
	_this.validLogin = true;
	_this.validCompId = true;

      _this.selectRole = function(role) {
        if (role && role.isAdmin) {
          _this.state = 'ADMIN_LOGIN';
        } else if (role) {
          _this.state = 'ENTER_CODE';
        }
      };

	_this.adminLogin = function(email, password){
		//var CryptoJS = require("crypto-js");
		// Encrypt
		var cipherText = sha256(password);
		
		//var cipherText = CryptoJS.AES.encrypt(password, 'PK+4XQ06WBVAg4PkJD49e$WBy8om85F&$g#jT&#P@dH#yvyZjbOn$hh#c3urb1&c43GRNFPP*#H*qn3uMc*xpV#ftQssHJhPFO04zu#rXkuathsCU2Z0W8Kp70b&@N6Y&tc&RW0#XqAbjKNh&uPb3k&9+5WbpnACY#eBrE2mYp!FrMc&vTko%G=FFf%xyBuU5Px8yfpy+%u+Bu5HeU%b+n2r@z%QrAWTa9UNs#tmtENWoGZW2Nnkc47n&Bg%y*D52Op3Y=Yf9zbWzpoXvDvK1tnRo+%kj0#KX#ObkbF+F+yxPksz%&gYAf+Z$xTCSNqugRMj7gU*UP2FHgHOv63xF2bY5Mw$Wy2a2*pUqQtdzZ*F8bej@d5aH8X3JzY$!A3DoC96*4qSH5kvy0UVmfJcjqd5ttzB3baXz9pefvHKn0e3oXD9M7XHr6caZ&&5HubKaTX0N=4Hj&XPvYKJkA@jWBsMjfRCxE1+*EP!%yheAMp01bvR%jKW').toString();
		console.info(cipherText);
		var info = "email="+email+"&password="+cipherText;
		//console.info('/php/adminLogin.php?'+info)
		$http.post('/php/adminLogin.php?' + info).then(
		function(response){
			//console.info("Success");
			//console.info(response.data);
			if (response.data === "true"){
				document.cookie = "username=" + email + ";path=/";
				window.location.href = "../HTML/adminPage.html";
			}
			else {
				_this.validLogin = false;
			}
		}, function(){console.log("Failed");
		});
		
	};

	_this.competitorSteps = function(nextStep) {
		if (nextStep === 'code_entered'){
			var info = "id="+ _this.competitorCode;
			//console.info('/php/compLogin.php?'+info)
			$http.post('/php/compLogin.php?' + info).then(
			function(response){
				//console.info(response.data.substring(0, 4));
				//console.info(response.data.split("\n")[1].split("\t")[0])
				if (response.data.substring(0, 4) === "true" && _this.competitorCode != undefined){
					_this.validCompId = true;
					_this.state = 'PICK_TEAM';
					var compName = response.data.split("\n")[1].split("\t")[0];
					document.cookie = "competition=" + compName + "; path=/";
					_this.getTeams(compName);
			     	//TODO - get the teams for this competition from database
				}				
				else {
					_this.validCompId = false;
				}
			}, function(){console.log("Failed");});	
		}
		else if (nextStep === 'enter_comp') {
			document.cookie = "compId=" + _this.competitorCode + "; path=/";
			document.cookie = "teamName=" + _this.selectedTeam + "; path=/";
		 	window.document.location = './../HTML/competitorPage.html';
		}
	}


	_this.getTeams = function(name) {
		$http.post('/php/getTeam.php?competition='+name).then(
		function successCallback(response) {
		//console.info("Teams: " + response.data)
	 		var teamData = (escape(response.data)).split("%0A");
			for (var i = 1; i < teamData.length-1; i++) {
				var newTeam = teamData[i].split("%09");
				//newTeam = newTeam.split("%2C");
				_this.teams.push(unescape(newTeam[0]));
			}
	 	}, function errorCallback(response) {
	 		console.info("There was an issue: " + response)
		 });
	}
	
	
    });
  
}

start();
