harmonizerApp.directive("insertChordButton", function($compile)
{
	return function(scope, element, attrs)
	{
		element.bind("click", function()
		{
			angular
				.element(document.getElementById('sequencer'))
				.append($compile("<chord-block title='coucou'>salut</chord-block>")(scope));
		});
	};
});