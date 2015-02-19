(function () {
	'use strict';
	angular.module('app').factory("chordFactory", [
		'durations', '$log', function (durations, $log) {
			var chords = [
				{ note: 'a', chordType: 'maj', duration: 2, playing: false },
				{ note: 'c', chordType: 'maj', duration: 2, playing: false },
				{ note: 'g', chordType: 'maj', duration: 2, playing: false }
			];

			var setPlaying = function (chordIndex) {
				for (var i = 0; i < chords.length; i++) {
					chords[i].playing = false;
				}
				if (chordIndex !== -1)
					chords[chordIndex].playing = true;
			};

			var addAChord = function (note, chordType, duration) {
				var newChord = {
					note: note.id,
					chordType: chordType.id,
					duration: duration.id,
					playing: false
				};
				$log.debug("just added ", newChord);
				chords.push(newChord);
			};

			var removeAChord = function (index) {
				chords.splice(index, 1);
			};

			var increaseChordLength = function (index) {
				var currentLength = chords[index].duration.length;
				for (var i = 0; i < durations.length; i++) {
					if (currentLength === durations[i].length && i !== durations.length - 1) {
						chords[index].duration.length = durations[i + 1].length;
						return;
					}
				}
			};

			var decreaseChordLength = function (index) {
				var currentLength = chords[index].duration.length;
				for (var i = 1; i < durations.length; i++) {
					if (currentLength === durations[i].length) {
						chords[index].duration.length = durations[i - 1].length;
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
						length: chords[i].duration.length,
					});
				}
				return reducedChords;
			};

			return {
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