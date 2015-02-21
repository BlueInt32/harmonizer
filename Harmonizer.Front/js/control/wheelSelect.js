(function()
{
	'use strict';
	angular.module('app').directive("wheelselect", ['$log',
		function($log)
		{
			var linkFn = function(scope, element, attrs)
			{
			};
			return {
				restrict: 'E',
				replace: true,
				link: linkFn,
				scope: { elements: '=', selected: '=' },
				templateUrl: 'js/control/wheelSelect.html'
			};
		}
	]);
})();