(function () {
	'use strict';
	angular.module('app', ['ngResource', 'ngRoute']);

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
						resolvedStaticData: function (staticDataService, soundFactory, chordFactory){
							return staticDataService.getStaticData().then(function(staticData){
								return soundFactory.inititalize(staticData).then(function(){
									//console.log(chordFactory);
									return chordFactory.initialize(staticData);
								});
							});
						}
					}
				})
				.when('/load/:seqId', {
					controller: 'homeController',
					controllerAs:'home',
					templateUrl: 'js/homePage/_home.tpl.html',
				});
		}
	]);
})();