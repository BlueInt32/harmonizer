app.controller('mainController', ['$scope', '$log', 'notesConfig', 'chordTypesConfig', 'soundFactory', 'tempi', 'durations', 'chordFactory',
function ($scope, $log, notesConfig, chordTypesConfig, soundFactory, tempi, durations, chordFactory)
// TODO : sortir les values de config dans une facto
	{
		$scope.notes = notesConfig;
		$scope.chordTypes = chordTypesConfig;
		$scope.durations = durations;
		$scope.tempi = tempi;
		$scope.metronome = soundFactory.metronome;

		$scope.noteChosen = notesConfig[0];
		$scope.chordTypeChosen = chordTypesConfig[0];
		$scope.tempoChosen = tempi[2];
		$scope.durationChosen = durations[1];

		$scope.$log = $log;
		$scope.chords = [];

		$scope.insertChord = function()
		{
			chordFactory.addAChord($scope.noteChosen, $scope.chordTypeChosen, $scope.durationChosen.length);
			$scope.chords = chordFactory.chords;
			soundFactory.playASound($scope.noteChosen.id, $scope.chordTypeChosen.id, $scope.durationChosen.length);
		};

		$scope.play = function()
		{
			soundFactory.playASequenceWithIntervals($scope.chords, $scope.tempoChosen.value, $scope.metronome);
		};

		$scope.stop = soundFactory.stop;

		$scope.toggleMetronome = soundFactory.toggleMetronome;
	}
]);