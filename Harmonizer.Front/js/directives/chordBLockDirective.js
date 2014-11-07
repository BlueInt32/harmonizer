harmonizerApp.directive("chordBlock", [
	function()
	{
		var linkFn = function (scope, element, attrs)
		{
			
		};
		return {
			restrict: 'E',
			link: linkFn,
			scope: { title: '@' },
			templateUrl: '/partials/chordBlock.html'
		};
	}
]);