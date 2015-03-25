(function () {
	'use strict';
	angular.module('app').service("burgerService",
	['$scope', '$log',
		function ($scope, $log){
			var self = this;
			this.isOpen = false;
			this.openBurger = function () {
				$log.debug('open');
				$scope.isOpen = true;
			};
			this.closeBurger = function () {
				$log.debug('close');
				self.isOpen = false;
			};
		}
	]);
})();