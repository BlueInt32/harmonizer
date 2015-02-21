(function(){
	'use strict';
	angular.module('app').service('staticDataService', ['$log', '$http','$q', '_', function($log, $http, $q, _){

		var staticData;

		var getStaticData = function(){
			var defer = $q.defer();

			$http({ method: 'GET', url: 'http://localhost:59400/api/staticdata/', cache: true })
			.success(function(data){
				defer.resolve(data);
				staticData = data;
				$log.debug("staticDataService received data !", data);
			}).error(function(data, status, headers, config){
				defer.reject("oops ! " + status);
			});
			return defer.promise;
		}

		var getNote = function(noteId){
			var found = _.find(staticData.notes, function(note){
				return note.id === noteId;
			});
			$log.debug('found', found);
		}

		return { 
			getStaticData: getStaticData,
			getNote: getNote

		};
	}]);
})();