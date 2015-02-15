(function () {
	'use strict';
	angular.module('app').controller('homeController', 
		['$log', 'soundFactory', 'chordFactory', 'sequenceResource', 'resolvedStaticData', '$routeParams',
	function ($log, soundFactory, chordFactory, sequenceResource, resolvedStaticData, $routeParams, simpleObj){
		// TODO : modification d'un chord après avoir cliqué dessus
		// TODO : use named functions instead of anonymous functions https://github.com/johnpapa/angularjs-styleguide#named-vs-anonymous-functions
		var self = this;
		var seqId = $routeParams.seqId;
		if (typeof seqId !== 'undefined'){
			$log.debug("seqId", seqId);
			sequenceResource.get({id:seqId}, function (data) {
				$log.debug("load", data);
			});
		}
		
		self.notes = resolvedStaticData.data.notes;
		self.chordTypes = resolvedStaticData.data.chordTypes;
		self.durations = resolvedStaticData.data.durations;
		self.tempi = resolvedStaticData.data.tempi;

		self.noteChosen = resolvedStaticData.data.defaultNote;
		self.chordTypeChosen = resolvedStaticData.data.defaultChordType;
		self.durationChosen = resolvedStaticData.data.defaultDuration;
		self.tempoChosen = resolvedStaticData.data.defaultTempo;
		
		this.metronome = soundFactory.metronome;
		
		//this.$log = $log;
		this.chords = chordFactory.chords;

		this.insertChord = function (){
			chordFactory.addAChord(this.noteChosen, this.chordTypeChosen, this.durationChosen);
			this.chords = chordFactory.chords;
			soundFactory.playASound(this.noteChosen.id, this.chordTypeChosen.id, this.durationChosen.id);
		};

		this.play = function () {
			soundFactory.playSequence(self.tempoChosen.id);
		};
		this.save = function (){
			
			var sequence = {
				chords: chordFactory.reduceForPost(this.chords),
				name: "premiere sequence",
				tempo:self.tempoChosen.id,
				description: "premiere description"
			};
			sequenceResource.save(sequence, function (data) {
				$log.debug(data);
			});
		};

		this.stop = soundFactory.stop;

		this.toggleMetronome = soundFactory.toggleMetronome;
		this.load = function(){
			var sequence = sequenceResource.get({id:$routeParams.seqId});
			$log.debug("sequence", sequence);
			//var User = $resource('/user/:userId', { userId: '@id' });
		}
	}
	]);
})();
