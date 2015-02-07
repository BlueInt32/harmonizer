(function()
{
	'use strict';
	angular.module('app').value("notesConfig",
	[
		{ id: 'A', name: 'A' },
		{ id: 'B', name: 'B' },
		{ id: 'C', name: 'C' },
		{ id: 'D', name: 'D' },
		{ id: 'E', name: 'E' },
		{ id: 'F', name: 'F' },
		{ id: 'G', name: 'G' }
	]);
	angular.module('app').value("chordTypesConfig",
	[
		{ id: 'maj', name: 'Major Triad', notation: '', sprite_start: 0 },
		{ id: 'min', name: 'Minor Triad', notation: 'm', sprite_start: 7800 }
	]);
	angular.module('app').value("durations",
	[
		{ id: 'quarterNote', name: 'Quarter Note (1)', length: 1, sprite_offset: 0, sprite_excerpt_duration: 1800 },
		{ id: 'halfNote', name: 'Half Note (2)', length: 2, sprite_offset: 1800, sprite_excerpt_duration: 2400 },
		{ id: 'wholeNote', name: 'Whole Note (4)', length: 4, sprite_offset: 4200, sprite_excerpt_duration: 3600 }
	]);
	angular.module('app').value("tempi",
	[
		{ id: "t1", name: "slow (70bpm)", value: 70 },
		{ id: "t2", name: "85 bpm", value: 85 },
		{ id: "t3", name: "100 bpm", value: 100 },
		{ id: "t4", name: "115 bpm", value: 115 },
		{ id: "t5", name: "fast (130bpm)", value: 130 }
	]);


	angular.module('app').value("fileQualityAndExtension", ".wav");
})();