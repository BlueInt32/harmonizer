(function () {
	'use strict';
	angular.module('app').controller('homeController', 
		['$log', 'soundFactory', 'chordService', 'sequenceResource', 'resolvedStaticData', '$routeParams', '_', '$location', 
	function ($log, soundFactory, chordService, sequenceResource, resolvedStaticData, $routeParams, _, $location){
		// TODO : modification d'un chord après avoir cliqué dessus
		// TODO : use named functions instead of anonymous functions https://github.com/johnpapa/angularjs-styleguide#named-vs-anonymous-functions
		var self = this;
		this.chordService = {};

		this.chords = [];
		this.notes = resolvedStaticData.notes;
		this.chordTypes = resolvedStaticData.chordTypes;
		this.durations = resolvedStaticData.durations;

		this.tempi = resolvedStaticData.tempi;

		this.noteSelectedId = resolvedStaticData.defaultNoteId;
		this.chordTypeSelectedId = resolvedStaticData.defaultChordTypeId;
		this.durationSelectedId = resolvedStaticData.defaultDurationId;
		this.tempoSelectedId = resolvedStaticData.defaultTempoId;

		this.setChordSelected = function(index){ chordService.setChordSelected(self.chords, index); };
		this.increaseChordLength = function(index){ chordService.increaseChordLength(self.chords, self.durations, index); };
		this.decreaseChordLength = function(index){ chordService.decreaseChordLength(self.chords, self.durations, index); };
		this.removeAChord = function(index){ chordService.removeAChord(self.chords, index); };
		this.moveChordLeft = function(index){ chordService.moveChordLeft(self.chords, index); };
		this.moveChordRight = function(index){ chordService.moveChordRight(self.chords, index); };



		this.metronome = soundFactory.metronome;
		this.toggleMetronome = soundFactory.toggleMetronome;

		var seqId = $routeParams.seqId;
		if (typeof seqId !== 'undefined'){
			$log.debug("sequence ID route param : ", seqId);
			sequenceResource.get({id:seqId}, function (sequence) {
				self.chords = sequence.chords;
			});
		}
		
		this.insertChord = function (){
			chordService.addAChord(this.chords, this.noteSelectedId, this.chordTypeSelectedId, this.durationSelectedId);
			soundFactory.playASound(this.noteSelectedId, this.chordTypeSelectedId, this.durationSelectedId, this.tempoSelectedId);

		};

		this.play = function () {
			soundFactory.playSequence(this.chords, this.tempoSelectedId, this.metronome);
		};

		this.stop = function(){
			soundFactory.stop(this.chords);
		};


		this.save = function (){
			$log.debug(self.tempoSelectedId);
			var sequence = {
				name: "premiere sequence",
				tempo: self.tempoSelectedId,
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
