(function()
{
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

	angular.module('app').factory("soundFactory",  [
		'fileQualityAndExtension', 'staticDataService', '$log', 'chordFactory', '$interval','$q',
		function (fileQualityAndExtension, staticDataService, $log, chordFactory, $interval, $q)
		{
			// TODO : gerer le chevauchement des accords : quand un accord joue, les autres doivent stopper en fadeout
			var factory = {}, notesConfig, chordTypesConfig, durations;

			//#region Privates
			var howls = [],
				playingTempo;
			var metronomeHowl = new Howl(
			{
				urls: ['/samples/metronome.wav'],
				sprite: { tic: [0, 300], tac: [699, 300] },
				onend: factory.chordPlayEndCB
			});
			factory.timer = null;
			var chordsStartingSteps = [];
			var totalSequenceLength = 0;
			//#endregion

			// #region Publics
			factory.metronome = true;
			// #endregion


			factory.inititalize = function(staticData){
				notesConfig = staticData.notes;
				chordTypesConfig = staticData.chordTypes;
				durations = staticData.durations;
				var defer = $q.defer();
				for (var i = 0; i < notesConfig.length; i++) // Building howls for each note (12 notes)
				{
					$log.debug('building howl for ', notesConfig[i].id);
					var currentSprite = {};
					var currentOffset = 0;
					for (var j = 0; j < chordTypesConfig.length; j++) // For each chord Type (major triad, minor, major seventh, dominant, etc...
					{
						currentOffset = chordTypesConfig[j].spriteOffset;
						$log.debug('type', j, 'offset ', currentOffset);
							var spriteName = chordTypesConfig[j].id,
								spriteStartTiming = currentOffset,
								spriteDuration = 3590; // we substract 10ms to duration because of glitches in sound sprite
							currentSprite[spriteName] = [spriteStartTiming, spriteDuration];
					}

					var noteSoundUrl = '/samples/' + notesConfig[i].id + '_sprite' + fileQualityAndExtension;
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

			factory.playSequence = function(tempo){
				//$log.debug('tempo', tempo);
				playingTempo = tempo;
				var interval = 60000 / playingTempo;
				var step = 1; // step is the tempo count, starts @ 1 because step 0 is made outside of setInterval
				var barStep = 1; // barStep is just the bar index, in order for the metronome to say tic instead of tac. For now this is supposed to always be equal to step/4
				var chordIndex = 1; 
				factory.computeChordMap();

				// start playing first step (setInterval forces us to make first step by hand)
				if (factory.metronome) metronomeHowl.play('tic');
				factory.playOneChordInSequence(0);
				// set timer for next steps
				//$log.debug("step", 0);
				//$log.debug("------------------");
				
				factory.timer = $interval(function ()
				{
					if (factory.metronome) metronomeHowl.play(barStep === 0 ? 'tic' : 'tac');
					//$log.debug(chordsStartingSteps[chordIndex]);
					if (chordsStartingSteps[chordIndex] === step) // is the current step corresponding to the start of a chord in the sequence ?
					{
						factory.playOneChordInSequence(chordIndex);
						chordIndex++;
					}
					
					if (step >= totalSequenceLength) // has sequence ended ?
					{
						factory.stop();
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
			factory.computeChordMap = function ()
			{
				totalSequenceLength = 0;
				chordsStartingSteps = [];
				for (var l = 0; l < chordFactory.chords.length; l++)
				{
					chordsStartingSteps.push(totalSequenceLength);
					totalSequenceLength += chordFactory.chords[l].durationId;
				}
			};

			factory.playOneChordInSequence = function (chordIndex)
			{
				factory.playASound(
					chordFactory.chords[chordIndex].noteId,
					chordFactory.chords[chordIndex].chordTypeId,
					chordFactory.chords[chordIndex].durationId,
					playingTempo
				);

				chordFactory.setPlaying(chordIndex);
			};

			factory.playASound = function (noteId, chordTypeId, durationId, localTempo)
			{
				$log.debug(noteId);
				var duration = durationId * 60000 / localTempo, // chord length in ms
					fadeOutStart = 0.95, // percent of the sound length when the fadeOut starts
					fadeOutLength = 0.14; // duration of the fadeOut in percent of the whole duration

				$log.debug('-> ', duration, 'ms');
				howls[noteId].volume(1);
				howls[noteId].play(chordTypeId);

				// at about fadeOutStart% of the durationLength, we fade out the sound during fadeOutLength% of it
				setTimeout(function(){
					howls[noteId].fadeOut(0, duration * fadeOutLength, function(){
						howls[noteId].stop(); // we need to stop the howl, because fadeOut pauses the sound when ended 
						// (which leads to weird behaviours)
					});
				}, duration * fadeOutStart);
			};
			
			factory.stop = function()
			{
				chordFactory.setPlaying(-1);
				$interval.cancel(factory.timer);
			};

			factory.toggleMetronome = function ()
			{
				factory.metronome = !factory.metronome;
			};

			return factory;
		}
	]);
})();