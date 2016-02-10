using System.Collections.Generic;
using Harmonizer.Domain.Entities;
using Harmonizer.Services.Interfaces;
using System.Linq;
using Harmonizer.Api2.Model;

namespace Harmonizer.Api2.Extensions
{
	public static class ReducedSequenceExtensions
	{
		public static SequenceViewModel ToWebSequence(this Sequence sequence, IStaticDataService apiService)
		{
			SequenceViewModel sequenceViewModel = new SequenceViewModel();
			sequenceViewModel.Id = sequence.Id;
			sequenceViewModel.Name = sequence.Name;
			sequenceViewModel.Description = sequence.Description;
			sequenceViewModel.Chords = new List<ChordDescriptorViewModel>();
			if (sequence.Chords != null)
			{
				foreach (var sequenceChord in sequence.Chords.OrderBy(c => c.PositionInSequence))
				{
					Chord chord = FindChord(apiService, sequenceChord.ChordId);
					var chordDescriptor = new ChordDescriptorViewModel
					{
						SequenceChordId = sequenceChord.Id,
						NoteId = chord.RootNoteId,
						DurationId = chord.DurationId,
						ChordTypeId = chord.ChordTypeId
					};
					sequenceViewModel.Chords.Add(chordDescriptor);
				}
			}
			return sequenceViewModel;
		}
		private static Chord FindChord(IStaticDataService staticDataService, int chordId)
		{
			return staticDataService.GetChords().FirstOrDefault(c => c.Id == chordId);
		}
	}
}