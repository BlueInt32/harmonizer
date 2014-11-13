app.factory("configFactory", ['notesConfig', 'chordTypesConfig', 'tempi', 'durations',
function(notesConfig, chordTypesConfig, tempi, durations)
{
	var factory = {};
	factory.notesConfig = notesConfig;
	factory.chordTypesConfig = chordTypesConfig;
	factory.tempi = tempi;
	factory.durations = durations;
	return factory;
}]);