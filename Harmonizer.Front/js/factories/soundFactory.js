harmonizerApp.factory("soundFactory", ['fileQualityAndExtension', 'notesConfig', 'chordTypesConfig', 'durations', '$log', 
	function (fileQualityAndExtension, notesConfig, chordTypesConfig, durations, $log)
	{
		var factory = {};
		var howls = {};
		var metronomeHowl = new Howl(
		{
			urls: ['/samples/metronome.wav'],
			sprite: { tic:[0, 300], tac:[699,300] },
			onend: factory.chordPlayEndCB
		});
		var timer = null;
		var sequencePlayingMode = false;
		var chordsStartIndex = [];
		var totalSequenceLength = 0;
	

		factory.initializeHowls = function()
		{
			for (var i = 0; i < notesConfig.length; i++)
			{
				var currentSprite = {};
				var currentOffset = 0;
				for (var j = 0; j < chordTypesConfig.length; j++)
				{
					currentOffset = chordTypesConfig[j].sprite_start;
					for (var k = 0; k < durations.length; k++)
					{
						// we substract 10ms to duration because of glitches in sound sprite (next chord starts playing and shouldn't)
						currentSprite[chordTypesConfig[j].id + "_" + durations[k].length] = [currentOffset + durations[k].sprite_offset, durations[k].sprite_excerpt_duration - 10];
					}
				}
				howls[notesConfig[i].id] = new Howl(
					{
						urls: [factory.getChordSpriteUrl(notesConfig[i].id)],
						sprite: currentSprite,
						onend: factory.chordPlayEndCB
					});
			}
			$log.info("Howls loaded ", howls);
		};

		factory.playASound = function (noteId, chordTypeId, durationLength)
		{
			$log.info("Play ",noteId,  chordTypeId + "_" + durationLength);
			howls[noteId].play(chordTypeId + "_" + durationLength);
		}

		factory.getChordSpriteUrl = function (note)
		{
			var spriteFile = '/samples/' + note + '_sprite' + fileQualityAndExtension;
			return spriteFile;
		}

		factory.playASequenceWithIntervals = function(chords, tempo, metronome)
		{
			metronome = true;
			$log.info("tempo", tempo);
			var interval = 60000 / tempo;
			var ratio = 1;
			var step = 1; // 0-step is made by hand
			var barStep = 1;
			var chordIndex = 1;
			factory.computeChordMap(chords);
			$log.info("chordsStartIndex", chordsStartIndex);

			// start playing first step (setInterval forces us to make first step by hand)
			metronomeHowl.play('tic');
			factory.playASound(chords[0].note.id, chords[0].chordType.id, chords[0].noteLength);

			// set timer for next steps
			$log.info("------------------");
			timer = window.setInterval(function ()
			{
				$log.info("chordIndex", chordIndex);
				$log.info("step", step);
				metronomeHowl.play(barStep== 0 ? 'tic' : 'tac');
				// check end
				if (step >= totalSequenceLength)
				{
					clearInterval(timer);
					return;
				}
				if (chordsStartIndex[chordIndex] === step)
				{
					factory.playASound(chords[chordIndex].note.id, chords[chordIndex].chordType.id, chords[chordIndex].noteLength);
					chordIndex++;
				}
				step++;
				barStep = (barStep + 1) % 4;
				$log.info("------------------");
			}, interval);
		}

		// as chords can be 1, 2 or 4 in length, we have to compute how many tics they make in total
		factory.computeChordMap = function(chords)
		{
			totalSequenceLength = 0;
			chordsStartIndex = [];
			for (var l = 0; l < chords.length; l++)
			{
				chordsStartIndex.push(totalSequenceLength);
				totalSequenceLength += chords[l].noteLength;
			}
		};

		factory.playASequenceWithNativeHowler = function(chords)
		{
			sequencePlayingMode = true;

		}

		factory.stop = function()
		{
			clearInterval(timer);
		}

		factory.chordPlayEndCB = function()
		{
			//if (!sequencePlayingMode)
			//	return;
		}

		factory.initializeHowls();
		return factory;
	}]);