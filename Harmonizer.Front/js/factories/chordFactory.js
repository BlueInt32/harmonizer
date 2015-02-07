(function()
{
	'use strict';
	angular.module('app').factory("chordFactory", [
		'durations', '$log', function(durations, $log)
		{
			var factory = {};

			factory.chords =
			[
				{
					note: { id: 'A', name: 'A' },
					chordType: { id: 'maj', name: 'Major Triad', notation: '', sprite_start: 0 },
					duration: { id: 'halfNote', name: 'Half Note (2)', length: 2, sprite_offset: 1800, sprite_excerpt_duration: 2400 },
					playing:false
				},
				{
					note: { id: 'C', name: 'C' },
					chordType: { id: 'maj', name: 'Major Triad', notation: '', sprite_start: 0 },
					duration: { id: 'halfNote', name: 'Half Note (2)', length: 2, sprite_offset: 1800, sprite_excerpt_duration: 2400 },
					playing: false
				},
				{
					note: { id: 'G', name: 'G' },
					chordType: { id: 'maj', name: 'Major Triad', notation: '', sprite_start: 0 },
					duration: { id: 'halfNote', name: 'Half Note (2)', length: 2, sprite_offset: 1800, sprite_excerpt_duration: 2400 },
					playing: false
				}
			];

			factory.setPlaying = function(chordIndex)
			{
				for (var i = 0; i < factory.chords.length; i++)
				{
					factory.chords[i].playing = false;
				}
				if (chordIndex !== -1)
					factory.chords[chordIndex].playing = true;
			};

			factory.addAChord = function(_note, _chordType, _duration){
				$log.debug(_note);
				$log.debug(_chordType);
				$log.debug(_duration);
				var newChord =
				{
					note: _note,
					chordType: _chordType,
					duration: _duration
				};
				factory.chords.push(newChord);
			};

			factory.removeAChord = function(index)
			{
				factory.chords.splice(index, 1);
			};

			factory.increaseChordLength = function(index)
			{
				var currentLength = factory.chords[index].duration.length;
				for (var i = 0; i < durations.length; i++)
				{
					if (currentLength === durations[i].length && i !== durations.length - 1)
					{
						factory.chords[index].duration.length = durations[i + 1].length;
						return;
					}
				}
			};

			factory.decreaseChordLength = function(index)
			{
				var currentLength = factory.chords[index].duration.length;
				for (var i = 1; i < durations.length; i++)
				{
					if (currentLength === durations[i].length)
					{
						factory.chords[index].duration.length = durations[i - 1].length;
						return;
					}
				}
			};

			factory.moveChordLeft = function(index)
			{
				var intIndex = parseInt(index);
				if (intIndex === 0)
					return;
				var temp = factory.chords[intIndex - 1];
				factory.chords[intIndex - 1] = factory.chords[intIndex];
				factory.chords[intIndex] = temp;
			};

			factory.moveChordRight = function(index)
			{
				var intIndex = parseInt(index);
				$log.debug("move right", index);
				if (intIndex === factory.chords.length - 1)
					return;
				var temp = factory.chords[intIndex + 1];
				$log.debug(temp);
				factory.chords[intIndex + 1] = factory.chords[intIndex];
				factory.chords[intIndex] = temp;
			};

			factory.reduceForPost = function(chords)
			{
				var reducedChords = [];
				for (var i = 0; i < chords.length; i++)
				{
					reducedChords.push(
					{
						note:chords[i].note.id,
						type:chords[i].chordType.id,
						length:chords[i].duration.length,
					});
				}
				return reducedChords;
			};
			return factory;
		}
	]);
})();