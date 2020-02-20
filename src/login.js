function start(){
	var app = angular.module('arenaPage', []);
	app.controller('selectCtrl', function($scope) {
    	$scope.changePage =  function() {
	    	app.directive("signin", function() {
	    		return {
					restrict : "A",
					template : '<p>Test</p>'
				};
	    	});
    	}
    	$scope.compRole = ["Admin", "Competitor"];
    });
    app.directive("signin", function() {
    	return {
			restrict : "A",
			template : '<form name="roleForm"><select name="roleSelector" ng-model="selectedRole" ng-options="x for x in compRole"></select> <br></form><button ng-disabled="roleForm.roleSelector.$pristine" ng-click="changePage()">Continue</button>'
		};
    });
}

function adminLogin() {
	var app1 = angular.module('arenaPage', []);
	app1.directive("signin", function() {
		
	});
}

start();


