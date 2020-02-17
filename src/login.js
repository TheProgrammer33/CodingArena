function start(){
	var app = angular.module('arenaPage', []);
	app.controller('selectCtrl', function($scope) {
    	//$scope.signindiv = "<form name='roleForm'><select name='roleSelector' ng-model='selectedRole' ng-options='x for x in compRole'></select> <br></form><button ng-disabled='roleForm.roleSelector.$pristine' ng-click='changePage()''>Continue</button>";
    	$scope.compRole = ["Admin", "Competitor"];
    });
}
/*
function changePage(){
	adminLogin();
}

function adminLogin(){
	var app = angular.module('arenaPage', ['ngSanitize']);
	app.controller('selectCtrl', function($scope) {
      $scope.signindiv = "<p>AI will destroy everyone</p>";
    });

}
*/

start();