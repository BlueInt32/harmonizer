﻿(function () {
	'use strict';
	angular.module('app').service('staticDataService',
		['$log', '$http', '$q', '_', 'apiurl',
		function ($log, $http, $q, _, apiurl) {

			var staticData;

			var getStaticData = function () {
				var defer = $q.defer();

				$http({ method: 'GET', url: apiurl + '/api/staticdata/', cache: true })
					.success(function (dataFromServer){
						var formattedData = buildStaticData(dataFromServer);
						defer.resolve(formattedData);
						staticData = formattedData;
					}).error(function (data, status, headers, config) {
						defer.reject("oops ! " + status);
					});
				return defer.promise;
			};

			var createChordNotation = function (noteId, chordTypeId) {
				var foundNote = _.result(_.find(staticData.notes, function (note) {
					return note.id === noteId;
				}), 'name');
				var chordNotation = _.result(_.find(staticData.chordTypes, function (chordType) {
					return chordType.id === chordTypeId;
				}), 'notation');

				$log.debug('found ', foundNote, chordNotation);
				return foundNote + chordNotation;
			};

			var buildStaticData = function (staticDataFromServer) {
				var formattedData = {
					notes: staticDataFromServer.notes,
					chordTypes: staticDataFromServer.chordTypes,
					durations: staticDataFromServer.durations,
					tempi: staticDataFromServer.tempi,
					selected: {
						noteId: staticDataFromServer.defaultNoteId,
						chordTypeId: staticDataFromServer.defaultChordTypeId,
						durationId: staticDataFromServer.defaultDurationId,
						tempoId: staticDataFromServer.defaultTempoId
					}
				};
				return formattedData;
			};

			return {
				getStaticData: getStaticData,
				createChordNotation: createChordNotation,
				buildStaticData: buildStaticData

			};
		}]);
})();