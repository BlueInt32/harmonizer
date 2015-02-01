(function()
{
	'use strict';
	angular.module('app').factory("memoryFactory", [
		'durations', '$log', '$resource',
		function(durations, $log, $resource)
		{
			return $resource('http://localhost:59400/api/sequence/:id');
		}
	]);
})();