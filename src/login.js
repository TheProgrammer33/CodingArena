
function start(){
	var app = angular.module("loginPage", [])
    app.controller('loginCtrl', function($scope) {
      var _this = this;

    	_this.compRole = [{label:"Admin", isAdmin: true}, {label:"Competitor"}];
      //TODO - Delete test data from teams list
      _this.teams = [{teamName: 'PB and J'}, {teamName: 'NerdAlert'}, {teamName: 'US Navy'}];

      _this.selectRole = function(role) {
        if (role && role.isAdmin) {
          _this.state = 'ADMIN_LOGIN';
        } else if (role) {
          _this.state = 'ENTER_CODE';
        }
      };

      _this.competitorSteps = function(nextStep) {
        if (nextStep === 'code_entered'){
          //TODO - check api for valid code, if valid, do following
          _this.state = 'PICK_TEAM';
          //TODO - get the teams for this competition from database
          
        }
      }

    });
  
}

start();
