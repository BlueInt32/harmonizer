(function(){
	'use strict';
	angular.module('app').service('staticDataService', ['$log', '$http','$q', function($log, $http, $q){
		
		var getStaticData = function(){
			var defer = $q.defer();

			$http({ method: 'GET', url: 'http://localhost:59400/api/staticdata/', cache: true })
			.success(function(staticData){
				defer.resolve(staticData);
				$log.debug("staticDataService received data !", staticData);
			}).error(function(data, status, headers, config){
				defer.reject("oops ! " + status);
			});
			return defer.promise;
		}

		return { 
			getStaticData: getStaticData
		};
	}]);
})();