harmonizerApp.directive("wheelselect", [
	function ()
	{
		var linkFn = function (scope, element, attrs)
		{
		};
		return {
			restrict: 'E',
			replace: true,
			link: linkFn,
			scope: { elements: '=', selected: '=' },
			templateUrl: '/partials/wheelSelect.html'
		};
	}
]);