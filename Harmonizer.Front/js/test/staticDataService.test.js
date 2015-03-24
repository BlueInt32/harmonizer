'use strict';

describe('Static data service', function () {
	var staticDataService, httpBackend, apiUrl = "http://localhost:59400", rootScope;

	beforeEach(module("app"));
	beforeEach(module(function ($provide) {
		$provide.value("apiurl", apiUrl);
		$provide.service("_", function () {
			this.result = jasmine.createSpy('result').and.callFake(function (set, field) {
				window._.result(set, field);
			});
			this.find = jasmine.createSpy('find').and.callFake(function (array, callback) {
				window._.find(array, callback);
				//a fake implementation
			});
		});
	}));

	beforeEach(inject(function (_staticDataService_, $httpBackend, $rootScope) {
		staticDataService = _staticDataService_;
		httpBackend = $httpBackend;
		rootScope = $rootScope;
		httpBackend.when('GET', apiUrl + '/api/staticdata/').respond(staticDataMock);
	}));

	it('should try to retrieve staticdata', function () {
		httpBackend.expectGET(apiUrl + '/api/staticdata/');
		var p = staticDataService.getStaticData();
		httpBackend.flush();
	});

	it('should try to retrieve staticdata', function () {
		var p = staticDataService.getStaticData();
		httpBackend.flush();
		var staticData;
		staticDataService.getStaticData().then(function (data){
			staticData = data;
		});

		rootScope.$digest();

		expect(staticDataService.getStaticData).toHaveBeenCalled();
		//expect(staticData).toEqual([]);

	});

	afterEach(function () {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});
});


var staticDataMock = {
	"tempi": [
		{
			"id": 70,
			"name": "slow (70bpm)",
			"isDefault": false
		},
		{
			"id": 85,
			"name": "85 bpm",
			"isDefault": false
		},
		{
			"id": 100,
			"name": "100 bpm",
			"isDefault": true
		},
		{
			"id": 115,
			"name": "115 bpm",
			"isDefault": false
		},
		{
			"id": 130,
			"name": "fast (130bpm)",
			"isDefault": false
		}
	],
	"defaultTempoId": 100,
	"notes": [
		{
			"id": "a",
			"name": "A",
			"isDefault": false
		},
		{
			"id": "ab",
			"name": "Ab",
			"isDefault": false
		},
		{
			"id": "as",
			"name": "A#",
			"isDefault": false
		},
		{
			"id": "b",
			"name": "B",
			"isDefault": false
		},
		{
			"id": "bb",
			"name": "Bb",
			"isDefault": false
		},
		{
			"id": "c",
			"name": "C",
			"isDefault": true
		},
		{
			"id": "cs",
			"name": "C#",
			"isDefault": false
		},
		{
			"id": "d",
			"name": "D",
			"isDefault": false
		},
		{
			"id": "db",
			"name": "Db",
			"isDefault": false
		},
		{
			"id": "ds",
			"name": "D#",
			"isDefault": false
		},
		{
			"id": "e",
			"name": "E",
			"isDefault": false
		},
		{
			"id": "eb",
			"name": "Eb",
			"isDefault": false
		},
		{
			"id": "f",
			"name": "F",
			"isDefault": false
		},
		{
			"id": "fs",
			"name": "F#",
			"isDefault": false
		},
		{
			"id": "g",
			"name": "G",
			"isDefault": false
		},
		{
			"id": "gb",
			"name": "Gb",
			"isDefault": false
		},
		{
			"id": "gs",
			"name": "G#",
			"isDefault": false
		}
	],
	"defaultNoteId": "c",
	"chordTypes": [
		{
			"id": "dom7",
			"name": "Dominant Seventh",
			"notation": "7",
			"description": "",
			"isDefault": false,
			"spriteOffset": 7200
		},
		{
			"id": "maj",
			"name": "Major Triad",
			"notation": "",
			"description": "",
			"isDefault": true,
			"spriteOffset": 0
		},
		{
			"id": "maj7",
			"name": "Major Seventh",
			"notation": "M7",
			"description": "",
			"isDefault": false,
			"spriteOffset": 10800
		},
		{
			"id": "min",
			"name": "Minor Triad",
			"notation": "m",
			"description": "",
			"isDefault": false,
			"spriteOffset": 3600
		}
	],
	"defaultChordTypeId": "maj",
	"durations": [
		{
			"id": 1,
			"name": "Quarter Note (1)",
			"isDefault": false
		},
		{
			"id": 2,
			"name": "Half Note (2)",
			"isDefault": true
		},
		{
			"id": 4,
			"name": "Whole Note (4)",
			"isDefault": false
		}
	],
	"defaultDurationId": 2
};