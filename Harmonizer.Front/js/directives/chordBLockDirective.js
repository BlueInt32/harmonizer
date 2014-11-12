harmonizerApp.directive("chordBlock", ["chordFactory",
	function (chordFactory)
	{
		var linkFn = function (scope, element, attrs)
		{
			scope.decreaseChordLength = chordFactory.decreaseChordLength;
			scope.increaseChordLength = chordFactory.increaseChordLength;
			scope.removeAChord = chordFactory.removeAChord;
		};
		return {
			restrict: 'E',
			replace: true,
			link: linkFn,
			scope: {
				chord: '=',
				index: '@'
			},
			templateUrl: '/partials/chordBlock.html'
		};
	}
]);