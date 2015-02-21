(function () {
	'use strict';
	angular.module('app').factory("chordFactory", [
		'durations', '$log', '$q', function (durations, $log, $q) {
			var chords = [
				{ noteId: 'a', chordTypeId: 'maj', durationId: 2, playing: false },
				{ noteId: 'c', chordTypeId: 'maj', durationId: 2, playing: false },
				{ noteId: 'g', chordTypeId: 'maj', durationId: 2, playing: false }
			];

			var durations;

			var initialize = function(staticData){
				
				var defer = $q.defer();

				durations = staticData.durations;
				$log.debug('durations', durations);
				defer.resolve(staticData);
				return defer.promise;
			};

			var setPlaying = function (chordIndex) {
				for (var i = 0; i < chords.length; i++) {
					chords[i].playing = false;
				}
				if (chordIndex !== -1)
					chords[chordIndex].playing = true;
			};

			var addAChord = function (noteId, chordTypeId, durationId) {
				var newChord = {
					noteId: noteId,
					chordTypeId: chordTypeId,
					durationId: durationId,
					playing: false
				};
				$log.debug("just added ", newChord);
				chords.push(newChord);
			};

			var removeAChord = function (index) {
				chords.splice(index, 1);
			};

			var increaseChordLength = function (index) {
				var clickedChordLength = chords[index].durationId;
				for (var i = 0; i < durations.length; i++) {
					if (clickedChordLength === durations[i].id && i !== durations.id - 1) {
						chords[index].durationId = durations[i + 1].id;
						return;
					}
				}
			};

			var decreaseChordLength = function (index) {
				var clickedChordLength = chords[index].durationId;
				for (var i = 0; i < durations.length; i++) {
					if (clickedChordLength === durations[i].id){
						chords[index].durationId = durations[i - 1].id;
						return;
					}
				}
			};

			var moveChordLeft = function (index) {
				var intIndex = parseInt(index);
				if (intIndex === 0)
					return;
				var temp = chords[intIndex - 1];
				chords[intIndex - 1] = chords[intIndex];
				chords[intIndex] = temp;
			};

			var moveChordRight = function (index) {
				var intIndex = parseInt(index);
				if (intIndex === chords.length - 1)
					return;
				var temp = chords[intIndex + 1];
				chords[intIndex + 1] = chords[intIndex];
				chords[intIndex] = temp;
			};

			var reduceForPost = function (chords) {
				var reducedChords = [];
				for (var i = 0; i < chords.length; i++) {
					reducedChords.push(
					{
						note: chords[i].note,
						type: chords[i].chordType.id,
						length: chords[i].duration.id,
					});
				}
				return reducedChords;
			};

			return {
				initialize : initialize,
				chords: chords,
				setPlaying: setPlaying,
				addAChord: addAChord,
				removeAChord: removeAChord,
				increaseChordLength: increaseChordLength,
				decreaseChordLength: decreaseChordLength,
				moveChordLeft: moveChordLeft,
				moveChordRight: moveChordRight,
				reduceForPost: reduceForPost
			};
		}
	]);
})();