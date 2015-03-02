(function()
{
	'use strict';
	angular.module('app').directive("chordBlock", [
		"chordService",'$log',
		function(chordService, $log)
		{
			var linkFn = function(scope, element, attrs)
			{
				$log.debug('chordDirective durations', scope.durations);
				scope.decreaseChordLength = chordService.decreaseChordLength;
				scope.increaseChordLength = chordService.increaseChordLength;
				scope.removeAChord = chordService.removeAChord;
				scope.moveChordLeft = chordService.moveChordLeft;
				scope.moveChordRight = chordService.moveChordRight;
				//scope.chordDetail = chord
			};
			return {
				restrict: 'E',
				replace: true,
				link: linkFn,
				scope: {
					chord: '=',
					index: '@',
					durations: '=',
					chords: '='
					//flipped: false
				},
				templateUrl: 'js/chords/chordBlock.html',
				controller: function($scope, $log){
					$scope.flip = function(){
						$scope.flipped = !$scope.flipped;
					}
				}
			};
		}
	]);
})();