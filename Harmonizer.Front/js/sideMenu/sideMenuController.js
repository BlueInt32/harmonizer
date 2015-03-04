(function () {
	'use strict';
	angular.module('app').controller('sideMenuController', ['$log', function ($log){
		var self = this;
		this.isOpen = false;
		this.openMenu = function(){
			self.isOpen = true;
		};
		this.closeMenu = function(){
			self.isOpen = false;
		};
	}]);
})();
