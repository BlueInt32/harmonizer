(function () {
	'use strict';
	angular.module('app').controller('mainController', ['$scope', '$log', 'soundFactory', 'chordFactory', 'configFactory', 'memoryFactory',
	function ($scope, $log, soundFactory, chordFactory, configFactory, memoryFactory){
		// TODO : modification d'un chord après avoir cliqué dessus
		// TODO : use named functions instead of anonymous functions https://github.com/johnpapa/angularjs-styleguide#named-vs-anonymous-functions
		// TODO : default chord selection should be placed in chordFactory, this will lead to chord selected = modification right away

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

		$scope.insertChord = function () {
			chordFactory.addAChord($scope.noteChosen, $scope.chordTypeChosen, $scope.durationChosen);
			$scope.chords = chordFactory.chords;
			soundFactory.playASound($scope.noteChosen.id, $scope.chordTypeChosen.id, $scope.durationChosen.length);
		};

		$scope.play = function () {
			soundFactory.playSequence($scope.tempoChosen.value);
		};
		$scope.save = function () {
			var sequence = {
				chords: chordFactory.reduceForPost($scope.chords),
				name: "premiere sequence",
				description: "premiere description"
			};
			$log.debug("about to send sequence to save", sequence);
			memoryFactory.save(sequence, function () {
				$log.debug("save ok !");
			});
		};

		$scope.stop = soundFactory.stop;

		$scope.toggleMetronome = soundFactory.toggleMetronome;
		$scope.load = function(){
			var sequence = memoryFactory.get({id:1});
			$log.debug("sequence", sequence);
			//var User = $resource('/user/:userId', { userId: '@id' });
		}
	}
	]);
})();
