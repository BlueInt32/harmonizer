(function()
{
	'use strict';
	angular.module('app').factory("sequenceFactory", ['$log', '$resource', 'apiurl', '$routeParams', '$q', sequenceFactory]);

	function sequenceFactory($log, $resource, apiurl, $routeParams, $q){

		var sequenceResource = $resource(apiurl + '/api/sequence/:id');

		var loadSequenceFromQuery = function(){
			var deferred = $q.defer();
			var seqId = $routeParams.seqId;
			if (typeof seqId !== 'undefined'){
				$log.debug("sequence ID route param : ", seqId);
				sequenceResource.get({ id: seqId }, function(sequence){
					$log.debug('sequence.chords', sequence.chords);
					deferred.resolve({ sequenceId: seqId, chords:sequence.chords, name:sequence.name, description:sequence.description });
				});
			} else{
				deferred.reject("ho nooes");
			}
			return deferred.promise;
		};

		var saveSequence = function(model){
			var deferred = $q.defer();
			var sequence = {
				id: model.sequenceId,
				name: model.name,
				tempo: model.configuration.tempoId,
				description: model.description,
				chords: model.chords
			};
			sequenceResource.save(sequence, function (data){
				deferred.resolve(data);
			});
			return deferred.promise;
		};

		return {
			loadSequenceFromQuery: loadSequenceFromQuery,
			saveSequence: saveSequence
		};
	}
})();