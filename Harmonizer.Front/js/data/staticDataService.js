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
				//$log.debug("staticDataService received data !", data);
			}).error(function(data, status, headers, config){
				defer.reject("oops ! " + status);
			});
			return defer.promise;
		}

		var createChordNotation = function(noteId, chordTypeId){
			var foundNote = _.result(_.find(staticData.notes, function(note){
				return note.id === noteId;
			}), 'name');
			var chordNotation = _.result(_.find(staticData.chordTypes, function(chordType){
				return chordType.id === chordTypeId;
			}), 'notation');

			$log.debug('found ', foundNote, chordNotation);
			return foundNote + chordNotation;
		}

		return { 
			getStaticData: getStaticData,
			createChordNotation: createChordNotation

		};
	}]);
})();