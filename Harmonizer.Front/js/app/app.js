(function () {
	'use strict';
	angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate']);

	angular.module('app').config([
		'$logProvider', function ($logProvider) {
			$logProvider.debugEnabled(true);
		}
	]);
	angular.module('app').run(['$rootScope', function ($rootScope){
		$rootScope.apiError = false;
		$rootScope.$on('$routeChangeStart', function () {
			$rootScope.stateIsLoading = true;
		});


		$rootScope.$on('$routeChangeSuccess', function () {
			$rootScope.stateIsLoading = false;
		});
		$rootScope.$on('$routeChangeError', function (){
			console.log("error in route loading");
			$rootScope.stateIsLoading = true;
			$rootScope.apiError = true;
		});

	}]);

	angular.module('app').config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider
				.when('/',
				{
					controller: 'homeController',
					controllerAs: 'home',
					templateUrl: 'js/app/homePage/_home.tpl.html',
					resolve: {
						resolvedStaticData: ['staticDataService', 'soundFactory',
							function (staticDataService, soundFactory) {
								return staticDataService.getStaticData().then(function (staticData) {
									return soundFactory.inititalize(staticData);
								});
							}]
					}
				})
				.when('/load/:seqId', {
					controller: 'homeController',
					controllerAs: 'home',
					templateUrl: 'js/app/homePage/_home.tpl.html',
					resolve: {
						resolvedStaticData: ['staticDataService', 'soundFactory',
							function (staticDataService, soundFactory) {
								return staticDataService.getStaticData().then(function (staticData) {
									return soundFactory.inititalize(staticData);
								});
							}]
					}
				});
		}
	]);
})();