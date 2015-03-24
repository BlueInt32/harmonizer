(function () {
	'use strict';
	angular.module('app')
		.directive("burgerMenu", [
			'$log',
			function ($log) {
				return {
					restrict: 'A',
					replace: true,
					transclude: true,
					scope: {},
					templateUrl: 'js/app/burgerMenu/_burger.tpl.html',
					controller: [
						'$scope', '$log', '$rootScope', function ($scope, $log, $rootScope) {

							$rootScope.$on('myCustomEvent', function (event, data){
								$scope.openBurger();
							});
							$scope.isOpen = false;
							$scope.openBurger = function () {
								$scope.isOpen = true;
							};
							$scope.closeBurger = function () {
								$scope.isOpen = false;
							};
						}
					]
				};
			}
		])
	.directive("burgerMenuOpener", ['$rootScope', '$log', function ($rootScope, $log) {
		return {
			controller: ['$scope', 
				function($scope){
					$scope.broadcastOpenBurger = function(){
						$rootScope.$broadcast('myCustomEvent', {});
					};
				}
			]
	};
	}]);
})();