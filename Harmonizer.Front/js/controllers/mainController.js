harmonizerApp.controller('mainController', ['$scope', '$log', 'notesConfig', 'chordTypesConfig',
function ($scope, $log, notesConfig, chordTypesConfig)
	{
		$scope.notes = notesConfig;
		$scope.chordTypes = chordTypesConfig;

		$scope.noteChosen = notesConfig[0];
		$scope.chordTypeChosen = chordTypesConfig[0];
		$scope.$log = $log;
		$scope.chords = [];

		$scope.insertChord = function()
		{

			var newChord = { note: $scope.noteChosen, chordType: $scope.chordTypeChosen, noteLength:1 };
			$scope.chords.push(newChord);
			$log.info($scope.chords);
		};
	}
]);