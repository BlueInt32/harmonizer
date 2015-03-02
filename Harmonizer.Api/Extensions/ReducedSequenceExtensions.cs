using System.Collections.Generic;
using Harmonizer.Api.Model;
using Harmonizer.Domain.Entities;
using Harmonizer.Services.Interfaces;
using System.Web.Mvc;
using System.Linq;

namespace Harmonizer.Api.Extensions
{
	public static class ReducedSequenceExtensions
	{
		public static Sequence ToDomainSequence(this SequenceViewModel sequenceViewModel, IStaticDataService staticDataService)
		{
			Sequence sequence = new Sequence();
			sequence.Name = sequenceViewModel.Name;
			sequence.Description = sequenceViewModel.Description;
			sequence.Chords = new List<SequenceChord>();
			sequence.TempoId = sequenceViewModel.Tempo;
			int positionInSequence = 1;
			foreach (var chordDescriptor in sequenceViewModel.Chords)
			{
				SequenceChord sequenceChord = new SequenceChord();

				Chord chord = staticDataService.GetChords().FirstOrDefault(
					c => c.RootNote.Id == chordDescriptor.NoteId
					&& c.DurationId == chordDescriptor.DurationId
					&& c.ChordType.Id == chordDescriptor.ChordTypeId);
				//sequenceChord.Chord = chord;
				sequenceChord.ChordId = chord.Id;
				sequenceChord.PositionInSequence = positionInSequence++;
				sequence.Chords.Add(sequenceChord);
			}

			return sequence;
		}

		public static SequenceViewModel ToWebSequence(this Sequence sequence, IStaticDataService apiService)
		{
			SequenceViewModel sequenceViewModel = new SequenceViewModel();
			sequenceViewModel.Name = sequence.Name;
			sequenceViewModel.Description = sequence.Description;
			sequenceViewModel.Chords = new List<ChordDescriptorViewModel>();
			if (sequence.Chords != null)
			{
				foreach (var sequenceChord in sequence.Chords.OrderBy(c => c.PositionInSequence))
				{
					var chordDescriptor = new ChordDescriptorViewModel
					{
						NoteId = sequenceChord.Chord.RootNote.Id,
						DurationId = sequenceChord.Chord.DurationId,
						ChordTypeId = sequenceChord.Chord.ChordTypeId,
						Playing = false,
						ChordNotation = string.Format("{0}{1}", sequenceChord.Chord.RootNote.Name, sequenceChord.Chord.ChordType.Notation)
					};
					sequenceViewModel.Chords.Add(chordDescriptor);
				}
			}
			return sequenceViewModel;
		}
	}
}