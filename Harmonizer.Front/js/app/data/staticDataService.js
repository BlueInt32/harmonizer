(function () {
	'use strict';
	angular.module('app').service('staticDataService', ['$log', '$http', '$q', '_', 'apiurl', 'rawStaticData',
		function ($log, $http, $q, _, apiurl, rawStaticData) {

			var rawServerStaticData = rawStaticData, 
				clientModel = {
					notes: rawStaticData.notes,
					chordTypes: rawStaticData.chordTypes,
					durations: rawStaticData.durations,
					tempi: rawStaticData.tempi,
					chordEditor: {
						noteId: rawStaticData.defaultNoteId,
						chordTypeId: rawStaticData.defaultChordTypeId,
						durationId: rawStaticData.defaultDurationId,
					},
					configuration: {
						tempoId: rawStaticData.defaultTempoId,
						metronome: false
					}
				};

			function createChordNotation(noteId, chordTypeId) {
				var foundNote = _.result(_.find(clientModel.notes, function (note) {
					return note.id === noteId;
				}), 'name');
				var notation = _.result(_.find(clientModel.chordTypes, function (chordType) {
					return chordType.id === chordTypeId;
				}), 'notation');

				return foundNote + notation;
			};

			return {
				clientModel: clientModel,
				createChordNotation: createChordNotation
			};
		} // service function
	]);
})();