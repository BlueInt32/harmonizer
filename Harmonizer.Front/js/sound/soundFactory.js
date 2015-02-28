(function () {
	'use strict';

	// The main howls array has 12 entries (Howl instances), corresponding to the 12 possible notes in the tempered scale (c, c#, d, d#, ..., a#, b)
	// each of these Howls is a soundsprite : a sequence of sounds corresponding to the possibles chords for that note
	// The sounds are in the \Harmonizer.Front\Samples folder.
	// For a given note, say G, you may want Gm 1 step long, Gsus4 2 steps long, G7 1 step long, GM7 4 steps long, G6 2 steps long, etc
	// so for every note (howl), the order is the following : 
	// - Major triad 1 step, Major triad 2 steps, Major triad 4 steps, 
	// - Minor triad 1 step, Minor triad 2 steps, Minor triad 4 steps, 
	// - Major Seventh 1 step, etc...
	// Every howls have these chords in the exact same order and timing, given by the
	// data in config.js : 
	// - chordTypesConfig says where a chord types starts in a spritesheet (in ms), 
	// - durations gives for each duration (given the chordTypesConfig offset) where the durations are situated

	angular.module('app').factory("soundFactory", [
		'fileQualityAndExtension', 'staticDataService', '$log', 'chordFactory', '$interval', '$q',
		function (fileQualityAndExtension, staticDataService, $log, chordFactory, $interval, $q) {
			// TODO : gerer le chevauchement des accords : quand un accord joue, les autres doivent stopper en fadeout
			var factory = {}, 
				notesConfig, 
				chordTypesConfig, 
				durations,
				howls = [],
				playingTempo,
				timer = null,
				chordsStartingSteps = [],
				totalSequenceLength = 0;
			var metronomeHowl = new Howl(
			{
				urls: ['/samples/metronome.mp3'],
				sprite: { tic: [0, 300], tac: [699, 300] }
				//onend: chordPlayEndCB
			});

			// #region Publics
			var metronome = true;
			// #endregion


			var inititalize = function (staticData) {
				notesConfig = staticData.notes;
				chordTypesConfig = staticData.chordTypes;
				durations = staticData.durations;
				var defer = $q.defer();
				for (var i = 0; i < notesConfig.length; i++) // Building howls for each note (12 notes)
				{
					//$log.debug('building howl for ', notesConfig[i].id);
					var currentSprite = {};
					var currentOffset = 0;
					for (var j = 0; j < chordTypesConfig.length; j++) // For each chord Type (major triad, minor, major seventh, dominant, etc...
					{
						currentOffset = chordTypesConfig[j].spriteOffset;
						//$log.debug('type', j, 'offset ', currentOffset);
						var spriteName = chordTypesConfig[j].id,
							spriteStartTiming = currentOffset,
							spriteDuration = 3590; // we substract 10ms to duration because of glitches in sound sprite
						currentSprite[spriteName] = [spriteStartTiming, spriteDuration];
					}

					var noteSoundUrl = '/samples/' + getTheRightFileName(notesConfig[i].id) + '_sprite' + fileQualityAndExtension;
					howls[notesConfig[i].id] = new Howl(
					{
						urls: [noteSoundUrl],
						sprite: currentSprite
					});
				}
				$log.debug("Howls loaded ", howls);
				defer.resolve(staticData);
				return defer.promise;
			};

			var playSequence = function (tempo) {
				//$log.debug('tempo', tempo);
				playingTempo = tempo;
				var interval = 60000 / playingTempo;
				var step = 1; // step is the tempo count, starts @ 1 because step 0 is made outside of setInterval
				var barStep = 1; // barStep is just the bar index, in order for the metronome to say tic instead of tac. For now this is supposed to always be equal to step/4
				var chordIndex = 1;
				computeChordMap();

				// start playing first step (setInterval forces us to make first step by hand)
				if (metronome) metronomeHowl.play('tic');
				playOneChordInSequence(0);
				// set timer for next steps
				//$log.debug("step", 0);
				//$log.debug("------------------");

				timer = $interval(function () {
					if (metronome) metronomeHowl.play(barStep === 0 ? 'tic' : 'tac');
					//$log.debug(chordsStartingSteps[chordIndex]);
					if (chordsStartingSteps[chordIndex] === step) // is the current step corresponding to the start of a chord in the sequence ?
					{
						playOneChordInSequence(chordIndex);
						chordIndex++;
					}

					if (step >= totalSequenceLength) // has sequence ended ?
					{
						stop();
						return;
					}
					step++;
					barStep = (barStep + 1) % 4;
					//$log.debug('step', step);
					//$log.debug("------------------");
				}, interval);
			};

			// As chords can be 1, 2 or 4 steps-length, we have to set an array containing each chord starting step
			// for instance for Sequence Cm(length:1), G(length:2), Am(length:4), Cm(length 4)
			// chordsStartingSteps will be [0, 1, 3, 7]
			// like Cm starts @ step 0, G starts @ step 1, Am starts @ step 3 (1 + 2), Cm starts @ 7 (1 + 2 + 4)
			var computeChordMap = function () {
				totalSequenceLength = 0;
				chordsStartingSteps = [];
				for (var l = 0; l < chordFactory.chords.length; l++) {
					chordsStartingSteps.push(totalSequenceLength);
					totalSequenceLength += chordFactory.chords[l].durationId;
				}
			};

			var playOneChordInSequence = function (chordIndex) {
				playASound(
					chordFactory.chords[chordIndex].noteId,
					chordFactory.chords[chordIndex].chordTypeId,
					chordFactory.chords[chordIndex].durationId,
					playingTempo
				);

				chordFactory.setPlaying(chordIndex);
			};

			var playASound = function (noteId, chordTypeId, durationId, localTempo) {
				$log.debug(noteId);
				var duration = durationId * 60000 / localTempo, // chord length in ms
					fadeOutStart = 0.95, // percent of the sound length when the fadeOut starts
					fadeOutLength = 0.14; // duration of the fadeOut in percent of the whole duration

				$log.debug('-> ', duration, 'ms');
				howls[noteId].volume(1);
				howls[noteId].play(chordTypeId);

				// at about fadeOutStart% of the durationLength, we fade out the sound during fadeOutLength% of it
				setTimeout(function () {
					howls[noteId].fadeOut(0, duration * fadeOutLength, function () {
						howls[noteId].stop(); // we need to stop the howl, because fadeOut pauses the sound when ended 
						// (which leads to weird behaviours)
					});
				}, duration * fadeOutStart);
			};

			var stop = function () {
				chordFactory.setPlaying(-1);
				$interval.cancel(timer);
			};

			var toggleMetronome = function () {
				metronome = !metronome;
			};

			var getTheRightFileName = function (noteId) {
				switch (noteId) {


					case "as":
						return "bb";
					case "cs":
						return "db";
					case "ds":
						return "eb";
					case "fs":
						return "gb";
					case "gs":
						return "ab";

					case "a":
					case "ab":
					case "b":
					case "bb":
					case "c":
					case "e":
					case "eb":
					case "f":
					case "g":
					case "gb":
					default:
						return noteId;
				}
			}

			return {
				inititalize: inititalize,
				playSequence: playSequence,
				//computeChordMap: computeChordMap,
				playOneChordInSequence: playOneChordInSequence,
				playASound : playASound,
				stop: stop,
				toggleMetronome: toggleMetronome,
				getTheRightFileName: getTheRightFileName
			};
		}
	]);
})();