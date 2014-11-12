app.directive("chordBlock", ["chordFactory",
	function (chordFactory)
	{
		var linkFn = function (scope, element, attrs)
		{
			scope.decreaseChordLength = chordFactory.decreaseChordLength;
			scope.increaseChordLength = chordFactory.increaseChordLength;
			scope.removeAChord = chordFactory.removeAChord;
			scope.moveChordLeft = chordFactory.moveChordLeft;
			scope.moveChordRight = chordFactory.moveChordRight;
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