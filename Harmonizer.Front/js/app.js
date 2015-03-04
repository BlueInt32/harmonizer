(function () {
	'use strict';
	angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate']);

	angular.module('app').config([
		'$logProvider', function ($logProvider) {
			$logProvider.debugEnabled(true);
		}
	]);

	angular.module('app').config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider
				.when('/',
				{
					controller: 'homeController',
					controllerAs:'home',
					templateUrl: 'js/homePage/_home.tpl.html',
					resolve: {
						resolvedStaticData: ['staticDataService', 'soundFactory', 
							function (staticDataService, soundFactory){
							return staticDataService.getStaticData().then(function(staticData){
								return soundFactory.inititalize(staticData);
							});
						}]
					}
				})
				.when('/load/:seqId', {
					controller: 'homeController',
					controllerAs:'home',
					templateUrl: 'js/homePage/_home.tpl.html',
					resolve: {
						resolvedStaticData: ['staticDataService', 'soundFactory', 
							function (staticDataService, soundFactory){
							return staticDataService.getStaticData().then(function(staticData){
								return soundFactory.inititalize(staticData);
							});
						}]
					}
				});
		}
	]);
})();