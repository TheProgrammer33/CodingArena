angular.module("arenaPage", [])
  	.controller("questionCtrl", function($scope, $compile) {
  		var _this = this;

  		_this.questions = [];

  		_this.addQuestion = function() {
  			//create objects to handle questions and answers
  			_this.questions.push({});
  		};

  		// Add initial question
  		_this.addQuestion();

  		_this.saveEverything = function() {
  			console.info(_this.questions);
  		}
  		_this.removeQuestion = function(index) {
  			_this.questions.splice(index, 1)
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