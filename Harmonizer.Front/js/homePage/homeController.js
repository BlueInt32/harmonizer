(function () {
	'use strict';
	angular.module('app').controller('homeController', 
		['$log', 'soundFactory', 'chordService', 'sequenceResource', 'resolvedStaticData', '$routeParams', '_', '$location', 
	function ($log, soundFactory, chordService, sequenceResource, resolvedStaticData, $routeParams, _, $location){
		// TODO : modification d'un chord après avoir cliqué dessus
		// TODO : use named functions instead of anonymous functions https://github.com/johnpapa/angularjs-styleguide#named-vs-anonymous-functions
		var self = this;

		self.model = resolvedStaticData;
		self.model.chords = [];
		self.model.metronome = false;
		$log.debug('homeController -> self.model', self.model);


		self.setChordSelected = function(index){ chordService.setChordSelected(self.model.chords, index); };
		self.increaseChordLength = function(index){ chordService.increaseChordLength(self.model.chords, self.model.durations, index); };
		self.decreaseChordLength = function(index){ chordService.decreaseChordLength(self.model.chords, self.model.durations, index); };
		self.removeAChord = function(index){ chordService.removeAChord(self.model.chords, index); };
		self.moveChordLeft = function(index){ chordService.moveChordLeft(self.model.chords, index); };
		self.moveChordRight = function(index){ chordService.moveChordRight(self.model.chords, index); };

		self.metronome = soundFactory.metronome;
		self.toggleMetronome = soundFactory.toggleMetronome;

		self.insertChord = function (){
			chordService.addAChord(self.model.chords, self.model.selected.noteId, self.model.selected.chordTypeId, self.model.selected.durationId);
			soundFactory.playASound(self.model.selected.noteId, self.model.selected.chordTypeId, self.model.selected.durationId, self.model.selected.tempoId);
		};

		self.play = function () {
			soundFactory.playSequence(self.model.chords, self.model.selected.tempoId, self.model.metronome);
		};

		self.stop = function(){
			soundFactory.stop(self.model.chords);
		};

		/* Load / Save Sequence */
		
		var seqId = $routeParams.seqId;
		if (typeof seqId !== 'undefined'){
			$log.debug("sequence ID route param : ", seqId);
			sequenceResource.get({id:seqId}, function (sequence) {
				self.model.chords = sequence.chords;
			});
		}

		this.save = function (){
			var sequence = {
				name: "premiere sequence",
				tempo: self.model.selected.tempoId,
				description: "premiere description",
				chords: this.chords
			};
			sequenceResource.save(sequence, function (data) {
				$log.debug(data);
				$location.path('/load/'+ data.id);
			});
		};
	}
	]);
})();
