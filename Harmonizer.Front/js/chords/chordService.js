(function () {
	'use strict';
	angular.module('app').service("chordService", [
		'$log', '$q', 'staticDataService', function ($log, $q, staticDataService) {
			//var chords = [
			//	//{ noteId: 'a', chordTypeId: 'min', durationId: 2, playing: false, chordNotation:'Am' },
			//	//{ noteId: 'a', chordTypeId: 'maj', durationId: 2, playing: false, chordNotation:'A' },
			//	//{ noteId: 'c', chordTypeId: 'maj', durationId: 2, playing: false, chordNotation:'C' },
			//	//{ noteId: 'g', chordTypeId: 'maj', durationId: 2, playing: false, chordNotation:'G' }
			//];


			this.setPlaying = function (chords, chordIndex) {
				for (var i = 0; i < chords.length; i++) {
					chords[i].playing = false;
				}
				if (chords.length && chordIndex !== -1)
					chords[chordIndex].playing = true;
			};

			this.addAChord = function (chords, noteId, chordTypeId, durationId){
				var chordNotation = staticDataService.createChordNotation(noteId, chordTypeId);
				var newChord = {
					noteId: noteId,
					chordTypeId: chordTypeId,
					durationId: durationId,
					chordNotation: chordNotation,
					playing: false
				};
				chords.push(newChord);
			};

			this.removeAChord = function (chords, index) {
				chords.splice(index, 1);
			};

			this.increaseChordLength = function (chords, durations, index) {
				var clickedChordLength = chords[index].durationId;
				for (var i = 0; i < durations.length; i++) {
					if (clickedChordLength === durations[i].id && i !== durations.id - 1) {
						chords[index].durationId = durations[i + 1].id;
						return;
					}
				}
			};

			this.decreaseChordLength = function (chords, durations, index) {
				var clickedChordLength = chords[index].durationId;
				for (var i = 0; i < durations.length; i++) {
					if (clickedChordLength === durations[i].id){
						chords[index].durationId = durations[i - 1].id;
						return;
					}
				}
			};

			this.moveChordLeft = function (chords, index) {
				var intIndex = parseInt(index);
				if (intIndex === 0)
					return;
				var temp = chords[intIndex - 1];
				chords[intIndex - 1] = chords[intIndex];
				chords[intIndex] = temp;
			};

			this.moveChordRight = function (chords, index) {
				var intIndex = parseInt(index);
				if (intIndex === chords.length - 1)
					return;
				var temp = chords[intIndex + 1];
				chords[intIndex + 1] = chords[intIndex];
				chords[intIndex] = temp;
			};

			this.reduceForPost = function (chords) {
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
		}
	]);
})();