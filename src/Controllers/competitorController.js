angular.module("competitorPage", [])
  	.controller("competitorCtrl", function($scope, $compile) {
  		var _this = this;

  		//_this.questions = ["Print Hello World", "Train Problem", "English", "History", "Prime Numbers", "Testing"];
  		_this.questions = []
  		_this.modal = document.getElementById("scoreModal");
  		//_this.teams = ["PB and J", "Nerd Alert", "FBI", "US Navy"]
  		_this.teams = []

  		_this.loadQuestions = function() {
  			//get objects for each question
  			_this.questions.push({});
  		};

  		// Add initial question
  		//_this.loadQuestions();

  		_this.showScoreboard = function() {
			_this.modal.style.display = "block";
  		}
  		_this.hideScoreboard = function() {
  			_this.modal.style.display = "none";
  		}
  });