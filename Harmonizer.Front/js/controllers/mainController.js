harmonizerApp.controller('mainController', ['$scope', '$log', 'notesConfig', 'chordTypesConfig', 'soundFactory', 'tempi', 'durations', 
function ($scope, $log, notesConfig, chordTypesConfig, soundFactory, tempi, durations)
// TODO : sortir les values de config dans une facto
	{
		$scope.notes = notesConfig;
		$scope.chordTypes = chordTypesConfig;
		$scope.durations = durations;
		$scope.tempi = tempi;

		$scope.noteChosen = notesConfig[0];
		$scope.chordTypeChosen = chordTypesConfig[0];
		$scope.tempoChosen = tempi[2];
		$scope.durationChosen = durations[1];

		$scope.$log = $log;
		$scope.chords = [];

		$scope.insertChord = function()
		{

			var newChord = { note: $scope.noteChosen, chordType: $scope.chordTypeChosen, noteLength: $scope.durationChosen.length };
			$scope.chords.push(newChord);

			soundFactory.playASound($scope.noteChosen.id, $scope.chordTypeChosen.id, $scope.durationChosen.length);
		};

		$scope.play = function()
		{
			soundFactory.playASequenceWithIntervals($scope.chords, $scope.tempoChosen.value);
		};
	}
]);