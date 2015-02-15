(function(){
	'use strict';
	angular.module('app').service('staticDataService', ['$log', '$http', function($log, $http){
		
		var notesConfig,
			chordsTypesConfig,
			tempiConfig,
			durationsConfig,
			staticDataPromise = $http({ method: 'GET', url: 'http://localhost:59400/api/staticdata/', cache: true });

		var getStaticData = function(){
				return staticDataPromise.then(function(staticData){	
					notesConfig = staticData.data.notes;
					chordsTypesConfig = staticData.data.chordTypes;
					durationsConfig = staticData.data.durations;
					tempiConfig = staticData.data.tempi;
					return staticData;
				},
				function(){
					$log.error("Erreur !");
				});
			},
			getNotesConfig = function(){
				return notesConfig;
			},
			getChordTypesConfig = function(){
				return chordsTypesConfig;
			},
			getDurationsConfig = function(){
				return durationsConfig;
			},
			getTempiConfig = function(){
				return tempiConfig;
			};


		return { 
			getStaticData: getStaticData,
			getNotesConfig : getNotesConfig,
			getChordTypesConfig : getChordTypesConfig,
			getDurationsConfig : getDurationsConfig, 
			getTempiConfig : getTempiConfig
		};
	}]);
})();