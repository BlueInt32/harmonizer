(function()
{
	'use strict';
	angular.module('app').directive("chordBlock", [
		"chordService",'$log',
		function(chordService, $log)
		{
			var linkFn = function(scope, element, attrs)
			{
			};
			return {
				restrict: 'E',
				replace: true,
				link: linkFn,
				scope: {
					chord: '=',
					durations: '=',
					moveLeft:'&',
					moveRight:'&',
					setSelected:'&',
					decreaseLength:'&',
					increaseLength:'&',
					remove:'&'
				},
				templateUrl: 'js/chords/chordBlock.html',
				controller: ['$scope', '$log', function($scope, $log){
					$scope.flip = function(){
						$scope.flipped = !$scope.flipped;
					};
				}]
			};
		}
	]);
})();