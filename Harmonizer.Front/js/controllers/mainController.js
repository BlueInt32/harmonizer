harmonizerApp.controller('mainController', ['$scope',
	function($scope)
	{
		$scope.notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
		$scope.chordTypes = ['Major Triad', 'Minor Triad'];

		$scope.insertChord = function()
		{
			alert($scope.noteChosen);
			alert($scope.chordChosen);


		};
	}
]);