(function () {
	'use strict';
	angular.module('app').controller('homeController', 
		['$log', 'soundFactory', 'chordFactory', 'sequenceResource', 'resolvedStaticData', '$routeParams',
	function ($log, soundFactory, chordFactory, sequenceResource, resolvedStaticData, $routeParams){
		// TODO : modification d'un chord après avoir cliqué dessus
		// TODO : use named functions instead of anonymous functions https://github.com/johnpapa/angularjs-styleguide#named-vs-anonymous-functions
		var self = this;
		this.chordFactory = {};

		var seqId = $routeParams.seqId;
		if (typeof seqId !== 'undefined'){
			$log.debug("sequence ID route param : ", seqId);
			sequenceResource.get({id:seqId}, function (data) {
				$log.debug("xhr sequence loaded : ", data);
			});
		}
		
		this.notes = resolvedStaticData.notes;
		this.chordTypes = resolvedStaticData.chordTypes;
		this.durations = resolvedStaticData.durations;
		this.tempi = resolvedStaticData.tempi;

		this.noteSelectedId = resolvedStaticData.defaultNoteId;
		this.chordTypeSelectedId = resolvedStaticData.defaultChordTypeId;
		this.durationSelectedId = resolvedStaticData.defaultDurationId;
		this.tempoSelectedId = resolvedStaticData.defaultTempoId;
		
		this.metronome = soundFactory.metronome;
		
		//this.$log = $log;
		this.chordFactory.chords = chordFactory.chords;
		$log.debug('chordFactory.chords', chordFactory.chords);
		this.insertChord = function (){
			chordFactory.addAChord(this.noteSelectedId, this.chordTypeSelectedId, this.durationSelectedId);
			
			self.chordFactory.chords = chordFactory.chords;
			soundFactory.playASound(this.noteSelectedId, this.chordTypeSelectedId, this.durationSelectedId, this.tempoSelectedId);
		};

		this.play = function () {
			soundFactory.playSequence(self.tempoSelectedId);
		};
		this.save = function (){
			
			var sequence = {
				chords: chordFactory.chords,
				name: "premiere sequence",
				tempo:self.tempoSelected.id,
				description: "premiere description"
			};
			sequenceResource.save(sequence, function (data) {
				//$log.debug(data);
			});
		};

		this.stop = soundFactory.stop;

		this.toggleMetronome = soundFactory.toggleMetronome;
		this.load = function(){
			var sequence = sequenceResource.get({id:$routeParams.seqId});
			//$log.debug("sequence", sequence);
			//var User = $resource('/user/:userId', { userId: '@id' });
		}
	}
	]);
})();
