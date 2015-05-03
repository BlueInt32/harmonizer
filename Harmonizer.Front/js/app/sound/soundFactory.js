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
		'fileQualityAndExtension', 'staticDataService', '$log', 'chordService', '$interval', '$q',
		function (fileQualityAndExtension, staticDataService, $log, chordService, $interval, $q) {
			// TODO : gerer le chevauchement des accords : quand un accord joue, les autres doivent stopper en fadeout
			var factory = {},
				notesConfig,
				chordTypesConfig,
				durations,
				howls = [],
				playingTempo,
				timer = null,
				chordsStartingSteps = [],
				totalSequenceLength = 0,
				noteIdPlaying = null,
				chordIndex = 1,
				isDoubledSprite = false, // this is used when 2 chords are played from the same howl, beta test
				playingDeferred = null;

			var metronomeHowl = new Howl(
			{
				urls: ['/samples/metronome.mp3'],
				sprite: { tic: [600, 300], tac: [1200, 300] }
				//onend: chordPlayEndCB
			});



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
				//$log.debug("Howls loaded ", howls);
				defer.resolve(staticData);
				return defer.promise;
			};

			var playSequence = function (chords, tempo, metronome){
				playingDeferred = $q.defer();

				if (!chords.length){
					playingDeferred.resolve();
					return playingDeferred.promise;
				}
				playingTempo = tempo;
				var interval = 60000 / playingTempo;
				var step = 1; // step is the tempo count, starts @ 1 because step 0 is made outside of setInterval
				var barStep = 1; // barStep is just the bar index, in order for the metronome to say tic instead of tac. For now this is supposed to always be equal to step/4
				chordIndex = 1;
				computeChordMap(chords);

				// start playing first step (setInterval forces us to make first step by hand)
				if (metronome) metronomeHowl.play('tic');
				playOneChordInSequence(chords, 0);
				// set timer for next steps
				//$log.debug("step", 0);
				//$log.debug("------------------");

				timer = $interval(function () {
					if (metronome) metronomeHowl.play(barStep === 0 ? 'tic' : 'tac');
					//$log.debug(chordsStartingSteps[chordIndex]);
					if (chordsStartingSteps[chordIndex] === step) // is the current step corresponding to the start of a chord in the sequence ?
					{
						playOneChordInSequence(chords, chordIndex);
						chordIndex++;
					}

					if (step >= totalSequenceLength) // has sequence ended ?
					{
						stop(chords);
						$log.debug('call resolve');
						playingDeferred.resolve();
					}
					step++;
					barStep = (barStep + 1) % 4;
					//$log.debug('step', step);
					//$log.debug("------------------");
				}, interval);
				
				return playingDeferred.promise;
			};

			// As chords can be 1, 2 or 4 steps-length, we have to set an array containing each chord starting step
			// for instance for Sequence Cm(length:1), G(length:2), Am(length:4), Cm(length 4)
			// chordsStartingSteps will be [0, 1, 3, 7]
			// like Cm starts @ step 0, G starts @ step 1, Am starts @ step 3 (1 + 2), Cm starts @ 7 (1 + 2 + 4)
			var computeChordMap = function (chords) {
				totalSequenceLength = 0;
				chordsStartingSteps = [];
				for (var l = 0; l < chords.length; l++) {
					chordsStartingSteps.push(totalSequenceLength);
					totalSequenceLength += chords[l].durationId;
				}
			};
			var playOneChordInSequence = function (chords, chordIndex){
				computeIsCurrentChordDoubled(chordIndex);
				playASound(
					chords[chordIndex].noteId,
					chords[chordIndex].chordTypeId,
					chords[chordIndex].durationId,
					playingTempo
				);

				chordService.setPlaying(chords, chordIndex);
			};
			var computeIsCurrentChordDoubled = function(chords, chordIndex){
				var currentChordNote = chords[chordIndex] ? chords[chordIndex].noteId : '';
				var nextChordNote = chords[chordIndex + 1] ? chords[chordIndex + 1].noteId : '';
				isDoubledSprite = currentChordNote === nextChordNote;
			};

			var playASound = function (noteId, chordTypeId, durationId, localTempo) {
				
				//$log.debug(noteId);
				var duration = durationId * 60000 / localTempo, // chord length in ms
					fadeOutStart = 0.95, // percent of the sound length when the fadeOut starts
					fadeOutLength = isDoubledSprite ? 0.04 : 0.14; // duration of the fadeOut in percent of the whole duration

				//$log.debug('-> ', duration, 'ms');
				howls[noteId].volume(1);
				howls[noteId].play(chordTypeId);
				noteIdPlaying = noteId;

				// at about fadeOutStart% of the durationLength, we fade out the sound during fadeOutLength% of it
				//$log.debug('isActiveFadeOut', isActiveFadeOut);
				//if (isDoubledSprite){
				if (!isDoubledSprite){
					
				}
				setTimeout(function(){

						howls[noteId].fadeOut(0, duration * fadeOutLength, function(){
							howls[noteId].stop(); // we need to stop the howl, because fadeOut pauses the sound when ended 
							// (which leads to weird behaviours)
						}, 0);
					}, duration * fadeOutStart);
				//}
			};

			var stop = function (chords){
				playingDeferred.resolve();
				chordService.setPlaying(chords, -1);
				$interval.cancel(timer);
				return playingDeferred.promise;
			};
			
			var getTheRightFileName = function(noteId){
				switch (noteId){


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
						return noteId;
					default:
						return noteId;
				}
			};

			return {
				inititalize: inititalize,
				playSequence: playSequence,
				playOneChordInSequence: playOneChordInSequence,
				playASound: playASound,
				stop: stop,
				getTheRightFileName: getTheRightFileName
			};
		}
	]);
})();