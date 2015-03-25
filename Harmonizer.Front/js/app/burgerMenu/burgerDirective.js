(function () {
	'use strict';
	angular.module('app')
		.directive("burgerMenu", [function () {
			return {
				scope: false,
				controller: function () {
					var self = this;
					this.openBurger = function () {
						self.isOpen = true;
					};
					this.closeBurger = function () {
						self.isOpen = false;
					};
					this.isOpen = false;
				},
				controllerAs: 'burgerCtrl',
				restrict: 'E',
				replace: true,
				transclude: true,
				templateUrl: 'js/app/burgerMenu/_burger.tpl.html'
			}
		}
		]);
})();