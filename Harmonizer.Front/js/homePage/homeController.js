(function () {
	'use strict';
	angular.module('app').controller('homeController', 
		['$log', 'soundFactory', 'chordService', 'sequenceResource', 'resolvedStaticData', '$routeParams', '_',
	function ($log, soundFactory, chordService, sequenceResource, resolvedStaticData, $routeParams, _){
		// TODO : modification d'un chord après avoir cliqué dessus
		// TODO : use named functions instead of anonymous functions https://github.com/johnpapa/angularjs-styleguide#named-vs-anonymous-functions
		var self = this;
		this.chordService = {};

		var seqId = $routeParams.seqId;
		if (typeof seqId !== 'undefined'){
			$log.debug("sequence ID route param : ", seqId);
			sequenceResource.get({id:seqId}, function (sequence) {
				self.chords = sequence.chords;
				$log.debug('chords get', chords);
			});
		}

		this.chords = [];
		this.notes = resolvedStaticData.notes;
		this.chordTypes = resolvedStaticData.chordTypes;
		this.durations = resolvedStaticData.durations;
		$log.debug('home controller stop this.durations', this.durations);

		this.tempi = resolvedStaticData.tempi;

		this.noteSelectedId = resolvedStaticData.defaultNoteId;
		this.chordTypeSelectedId = resolvedStaticData.defaultChordTypeId;
		this.durationSelectedId = resolvedStaticData.defaultDurationId;
		this.tempoSelectedId = resolvedStaticData.defaultTempoId;
		
		this.metronome = soundFactory.metronome;
		
		//this.$log = $log;
		//this.chords = chords;
		this.insertChord = function (){
			chordService.addAChord(this.chords, this.noteSelectedId, this.chordTypeSelectedId, this.durationSelectedId);
			soundFactory.playASound(this.noteSelectedId, this.chordTypeSelectedId, this.durationSelectedId, this.tempoSelectedId);

		};

		this.play = function () {
			soundFactory.playSequence(this.chords, this.tempoSelectedId);
		};

		this.stop = function(){
			soundFactory.stop(this.chords);
		};

		this.toggleMetronome = soundFactory.toggleMetronome;

		this.save = function (){
			$log.debug(self.tempoSelectedId);
			var sequence = {
				name: "premiere sequence",
				tempo:self.tempoSelectedId,
				description: "premiere description"
			};
			sequenceResource.save(sequence, function (data) {
				//$log.debug(data);
			});
		};
	}
	]);
})();
