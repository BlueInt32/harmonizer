(function()
{
	'use strict';
	angular.module('app').factory("sequenceResource", [
		'$log', '$resource', 'apiurl', 
		function($log, $resource, apiurl)
		{
			return $resource(apiurl + '/api/sequence/:id');
		}
	]);
})();