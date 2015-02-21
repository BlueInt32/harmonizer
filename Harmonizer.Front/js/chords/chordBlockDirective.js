(function()
{
	'use strict';
	angular.module('app').directive("chordBlock", [
		"chordFactory",'$log',
		function(chordFactory, $log)
		{
			var linkFn = function(scope, element, attrs)
			{

				scope.decreaseChordLength = chordFactory.decreaseChordLength;
				scope.increaseChordLength = chordFactory.increaseChordLength;
				scope.removeAChord = chordFactory.removeAChord;
				scope.moveChordLeft = chordFactory.moveChordLeft;
				scope.moveChordRight = chordFactory.moveChordRight;
				//scope.chordDetail = chord
			};
			return {
				restrict: 'E',
				replace: true,
				link: linkFn,
				scope: {
					chord: '=',
					index: '@'
				},
				templateUrl: 'js/chords/chordBlock.html'
			};
		}
	]);
})();