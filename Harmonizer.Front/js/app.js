angular.module('app', []);

angular.module('app').config(['$logProvider', function ($logProvider)
{
	$logProvider.debugEnabled(true);
}]);