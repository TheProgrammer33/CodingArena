function start(){
	var app = angular.module("arenaPage", [])
    app.controller('selectCtrl', function($scope) {
    	$scope.compRole = ["Admin", "Competitor"];
    });
}
/*
function adminLogin() {
	var app1 = angular.module('arenaPage', []);
	app1.directive("signin", function() {
		
	});
}*/

start();


/*

function start(){
    console.log("Start");
	var app = angular.module("arenaPage", [])
	app.directive("signin", function() {
		return {
			restrict : "A",
            template : '<form name="roleForm"><select name="roleSelector" ng-model="selectedRole" ng-options="x for x in compRole"></select> <br></form><button ng-disabled="roleForm.roleSelector.$pristine" ng-click="changePage()">Continue</button>'	
		};
	});
    app.controller('selectCtrl', function($scope) {
    	$scope.compRole = ["Admin", "Competitor"];
    });
    console.log("Start over");
}
function changePage(){
	console.log("Here");
}




angular.module('docsIsoFnBindExample', [])
.controller('Controller', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.name = 'Tobias';
  $scope.message = '';
  $scope.hideDialog = function(message) {
    $scope.message = message;
    $scope.dialogIsHidden = true;
    $timeout(function() {
      $scope.message = '';
      $scope.dialogIsHidden = false;
    }, 2000);
  };
}])
.directive('myDialog', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'close': '&onClose'
    },
    templateUrl: 'my-dialog-close.html'
  };
});


<div class="alert">
  <a href class="close" ng-click="close({message: 'closing for now'})">&times;</a>
  <div ng-transclude></div>
</div>


<div ng-controller="Controller">
  {{message}}
  <my-dialog ng-hide="dialogIsHidden" on-close="hideDialog(message)">
    Check out the contents, {{name}}!
  </my-dialog>
</div>

*/

