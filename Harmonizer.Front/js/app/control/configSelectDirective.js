(function()
{
	'use strict';
	angular.module('app').directive("configSelect", ['$log',
		function($log)
		{
			var linkFn = function(scope, element, attrs)
			{
			};
			return {
				restrict: 'E',
				replace: true,
				controllerAs:'wheelController',
				link: linkFn,
				scope: { 
					elements: '=', 
					selected: '=',
					change: '&'
				},
				templateUrl: 'js/app/control/configSelect.html'
			};
		}
	]);
})();