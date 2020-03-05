function addQuestions() {
	console.log("Top");
	/*var questionTemplate = document.getElementById("questionTemplate");
	var container = document.getElementById("questions");
	container.appendChild(questionTemplate);*/
	angular.module("arenaPage", [])
  	.controller("myCtrl", function($scope, $compile) {
	    $scope.test = function() {
	      var element = angular.element($('questions'));
	      element.html('<p>Replaced Text</p>');
	      $compile(element)($scope);
	    };
  });
	console.log("Bottom");
}

function removeQuestion() {

}


angular.module("arenaPage", [])
  	.controller("selectCtrl", function($scope) {
  		$scope.questionNum = 2;
	    $scope.addQuestion = function() {
			$('#questions').append('<div><h2>Question</h2><textarea placeholder="Enter question here..."></textarea><br><textarea placeholder="Enter expected output here..."></textarea><br></div>');
			$scope.questionNum = $scope.questionNum + 1;
	    };
  });