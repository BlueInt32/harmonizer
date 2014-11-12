harmonizerApp.directive("chordBlock", [
	function()
	{
		var linkFn = function (scope, element, attrs)
		{
			
		};
		return {
			restrict: 'E',
			replace: true,
			link: linkFn,
			scope: {
				chord: '=',
				increaseLength: '&'
			},
			templateUrl: '/partials/chordBlock.html'
		};
	}
]);