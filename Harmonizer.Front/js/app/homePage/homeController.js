(function () {
	'use strict';

	var homeController = function homeController($log, soundFactory, chordService, sequenceFactory, staticDataService, $routeParams, $location){

		var self = this;

		self.model = staticDataService.clientModel;
		$log.debug(self.model);
		self.model.chords = [];
		self.model.selectedChordIndex = -1;
		self.model.sequenceId = 0;
		self.model.isPlaying = false;

		self.setChordSelected = function(index){
			self.model.selectedChordIndex = index;
			var previousChordEditorVal = self.model.chordEditor;
			self.model.chordEditor = index > -1 ? self.model.chords[index] : previousChordEditorVal;
		};
		self.updateSelectedChord = function(chordProperty, newValue){
			if (self.model.selectedChordIndex !== -1){
				self.model.chords[self.model.selectedChordIndex][chordProperty] = newValue;
			}
		};

		self.increaseChordLength = function(index){ chordService.increaseChordLength(self.model.chords, self.model.durations, index); };
		self.decreaseChordLength = function(index){ chordService.decreaseChordLength(self.model.chords, self.model.durations, index); };
		self.removeAChord = function(index){ chordService.removeAChord(self.model.chords, index); };
		self.moveChordLeft = function(index){ chordService.moveChordLeft(self.model.chords, index); };
		self.moveChordRight = function(index){ chordService.moveChordRight(self.model.chords, index); };

		self.toggleMetronome = soundFactory.toggleMetronome;

		self.insertChord = function(){
			chordService.addAChord(self.model.chords, self.model.chordEditor.noteId, self.model.chordEditor.chordTypeId, self.model.chordEditor.durationId);
			soundFactory.playASound(self.model.chordEditor.noteId, self.model.chordEditor.chordTypeId, self.model.chordEditor.durationId, self.model.configuration.tempoId);
		};

		self.play = function(){
			self.model.isPlaying = true;
			soundFactory.playSequence(self.model.chords, self.model.configuration.tempoId, self.model.metronome).then(function(){
				self.model.isPlaying = false;
			});
		};

		self.stop = function(){
			soundFactory.stop(self.model.chords).then(function(){
				self.model.isPlaying = false;
			});
		};

		/* Load Sequence */
		sequenceFactory.loadSequenceFromQuery().then(function(data){
			self.model.chords = data.chords;
			self.model.sequenceId = data.sequenceId;
		});

		/* Save Sequence */
		self.save = function(){
			sequenceFactory.saveSequence(self.model).then(function(data){
				$log.debug('data', data);
				$location.path('/load/' + data.id);
			});
		};
	};

	angular.module('app').controller('homeController',
	['$log', 'soundFactory', 'chordService', 'sequenceFactory', 'staticDataService', '$routeParams', '$location', homeController]);
})();

// TODO : modification d'un chord après avoir cliqué dessus
// TODO : use named functions instead of anonymous functions https://github.com/johnpapa/angularjs-styleguide#named-vs-anonymous-functions