(function()
{
	'use strict';
	angular.module('app').directive("chordBlock", [
		"chordService",'$log', 'staticDataService',
		function(chordService, $log, staticDataService){
			
			var linkFn = function(scope, element, attrs){

				var watchChangeNoteCallback = function(newNote){
					$log.debug('newNote catched', newNote);
					if (!scope.flipped)
						return;
					scope.chord.notation = staticDataService.createChordNotation(newNote, scope.chord.chordTypeId);
				};
				var watchChangeChordTypeCallback = function(newChordType){
					$log.debug('newChordType catched', newChordType);
					if (!scope.flipped)
						return;
					scope.chord.notation = staticDataService.createChordNotation(scope.chord.noteId, newChordType);
				};

				scope.$watch(function(){ return scope.chord.noteId; }, watchChangeNoteCallback);
				scope.$watch(function(){ return scope.chord.chordTypeId; }, watchChangeChordTypeCallback);
			};
			return {
				restrict: 'E',
				replace: true,
				link: linkFn,
				transclude:true,
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