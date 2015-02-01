(function()
{
	'use strict';
	angular.module('app', ['ngResource']);

	angular.module('app').config([
		'$logProvider', function($logProvider)
		{
			$logProvider.debugEnabled(true);
		}
	]);
})();