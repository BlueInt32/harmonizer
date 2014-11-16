(function() {
	'use strict';
	angular.module('app').controller('mainController', ['$scope', '$log' , 'soundFactory', 'chordFactory', 'configFactory',
	function ($scope, $log, soundFactory, chordFactory, configFactory)
		// TODO : modification d'un chord après avoir cliqué dessus
		// TODO : use named functions instead of anonymous functions https://github.com/johnpapa/angularjs-styleguide#named-vs-anonymous-functions
		// TODO : default chord selection should be placed in chordFactory, this will lead to chord selected = modification right away

	{
			$scope.notes = configFactory.notesConfig;
			$scope.chordTypes = configFactory.chordTypesConfig;
			$scope.durations = configFactory.durations;
			$scope.tempi = configFactory.tempi;
			$scope.metronome = soundFactory.metronome;

			$scope.noteChosen = $scope.notes[0];
			$scope.chordTypeChosen = $scope.chordTypes[0];
			$scope.durationChosen = $scope.durations[1];
			$scope.tempoChosen = $scope.tempi[2];

			$scope.$log = $log;
			$scope.chords = chordFactory.chords;

			$scope.insertChord = function()
			{
				chordFactory.addAChord($scope.noteChosen, $scope.chordTypeChosen, $scope.durationChosen);
				$scope.chords = chordFactory.chords;
				soundFactory.playASound($scope.noteChosen.id, $scope.chordTypeChosen.id, $scope.durationChosen.length);
			};

			$scope.play = function()
			{
				soundFactory.playSequence($scope.tempoChosen.value);
			};

			$scope.stop = soundFactory.stop;

			$scope.toggleMetronome = soundFactory.toggleMetronome;
		}
	]);
})();
