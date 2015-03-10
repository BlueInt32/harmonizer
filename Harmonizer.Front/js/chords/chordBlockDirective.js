(function()
{
	'use strict';
	angular.module('app').directive("chordBlock", [
		"chordService",'$log', 'staticDataService',
		function(chordService, $log, staticDataService)
		{
			var linkFn = function(scope, element, attrs){
				scope.$watch(function(){ return scope.chord.noteId; }, function(value){
					$log.debug("in directive, chord note changed to", value);
					scope.chord.notation = staticDataService.createChordNotation(value, scope.chord.chordTypeId);
					$log.debug('scope.chord.notation', scope.chord.notation);
				});
			};
			return {
				restrict: 'E',
				replace: true,
				link: linkFn,
				scope: {
					index:'@',
					chord: '=',
					durations: '=',
					isSelected:'=',
					moveLeft:'&',
					moveRight:'&',
					setSelected:'&',
					decreaseLength:'&',
					increaseLength:'&',
					remove:'&'
				},
				templateUrl: 'js/chords/chordBlock.html',
				controller: ['$scope', '$log', 'staticDataService', function($scope, $log, staticDataService){
					this.flip = function(state){
						$scope.flipped = !$scope.flipped;
						if(state === 'closing')
							$scope.setSelected({ newIndex: -1 });
					};
				}],
				controllerAs:'chordBlockController'
			};
		}
	]);
})();