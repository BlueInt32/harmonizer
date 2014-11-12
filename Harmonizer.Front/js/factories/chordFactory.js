harmonizerApp.factory("chordFactory", ['durations', function(durations)
{
	var factory = {};

	factory.chords = [];

	factory.addAChord = function (note, chordType, duration)
	{
		var newChord =
		{
			note: note,
			chordType: chordType,
			noteLength: duration
		};
		factory.chords.push(newChord);
	}

	factory.removeAChord = function(index)
	{
		factory.chords.splice(index, 1);
	}

	factory.increaseChordLength = function(index)
	{
		var currentLength = factory.chords[index].noteLength;
		for (var i = 0; i < durations.length; i++)
		{
			if (currentLength === durations[i].length && i !== durations.length - 1)
			{
				factory.chords[index].noteLength = durations[i + 1].length;
				return;
			}
		}
	}

	factory.decreaseChordLength = function (index)
	{
		var currentLength = factory.chords[index].noteLength;
		for (var i = 1; i < durations.length; i++)
		{
			if (currentLength === durations[i].length)
			{
				factory.chords[index].noteLength = durations[i - 1].length;
				return;
			}
		}
	}
	return factory;
}]);