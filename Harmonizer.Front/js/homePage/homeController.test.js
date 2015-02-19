
describe('homeController', function () {
	beforeEach(module('app'));

	var $controller;

	beforeEach(inject(function (_$controller_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('$scope.grade', function () {
		it('show', function (){
			var resolvedStaticData = getStaticDataForTests();
			var controller = $controller('homeController', { resolvedStaticData: resolvedStaticData  });
			console.log("youpi");
			expect(controller.chords.length).toEqual(3);

		});
	});
});


var getStaticDataForTests =
function(){
	return {
				data: {
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
						}
					],
					"defaultTempo": {
						"id": 100,
						"name": "100 bpm",
						"isDefault": true
					},
					"notes": [
						{
							"id": "a",
							"name": "A",
							"isDefault": false
						},
						{
							"id": "b",
							"name": "B",
							"isDefault": false
						},
						{
							"id": "c",
							"name": "C",
							"isDefault": true
						}
					],
					"defaultNote": {
						"id": "c",
						"name": "C",
						"isDefault": true
					},
					"chordTypes": [
						{
							"id": "maj",
							"name": "Major Triad",
							"notation": "",
							"description": "",
							"isDefault": true,
							"spriteOffset": 0
						},
						{
							"id": "min",
							"name": "Minor Triad",
							"notation": "m",
							"description": "",
							"isDefault": false,
							"spriteOffset": 7800
						}
					],
					"defaultChordType": {
						"id": "maj",
						"name": "Major Triad",
						"notation": "",
						"description": "",
						"isDefault": true,
						"spriteOffset": 0
					},
					"durations": [
						{
							"id": 1,
							"name": "Quarter Note (1)",
							"spriteOffset": 0,
							"spriteDuration": 1800,
							"isDefault": false
						},
						{
							"id": 2,
							"name": "Half Note (2)",
							"spriteOffset": 1800,
							"spriteDuration": 2400,
							"isDefault": true
						},
						{
							"id": 3,
							"name": "Whole Note (4)",
							"spriteOffset": 4200,
							"spriteDuration": 3600,
							"isDefault": false
						}
					],
					"defaultDuration": {
						"id": 2,
						"name": "Half Note (2)",
						"spriteOffset": 1800,
						"spriteDuration": 2400,
						"isDefault": true
					}
				}
			}; 
}