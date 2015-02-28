(function()
{
	'use strict';
	angular.module('app').factory("sequenceResource", [
		'$log', '$resource',
		function($log, $resource)
		{
			return $resource('http://localhost:59400/api/sequence/:id');
		}
	]);
})();