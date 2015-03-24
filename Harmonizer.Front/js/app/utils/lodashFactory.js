(function(){
	'use strict';
	angular.module('app').factory('_', [
		'$window',
		function($window){
			// place lodash include before angular
			return $window._;
		}
	]);

})();