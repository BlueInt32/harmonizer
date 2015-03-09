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
			sequence.Id = sequenceViewModel.Id;
			sequence.Name = sequenceViewModel.Name;
			sequence.Description = sequenceViewModel.Description;
			sequence.Chords = new List<SequenceChord>();
			sequence.TempoId = sequenceViewModel.Tempo;
			int positionInSequence = 1;
			foreach (var chordDescriptor in sequenceViewModel.Chords)
			{
				SequenceChord sequenceChord = new SequenceChord();

				Chord chord = FindChord(staticDataService, chordDescriptor);
				sequenceChord.Id = chordDescriptor.SequenceChordId;
				sequenceChord.ChordId = chord.Id;
				sequenceChord.PositionInSequence = positionInSequence++;
				sequenceChord.SequenceId = sequenceViewModel.Id;
				sequence.Chords.Add(sequenceChord);
			}

			return sequence;
		}

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
						NoteId = chord.RootNote.Id,
						DurationId = chord.DurationId,
						ChordTypeId = chord.ChordTypeId,
						ChordNotation = string.Format("{0}{1}", chord.RootNote.Name, chord.ChordType.Notation)
					};
					sequenceViewModel.Chords.Add(chordDescriptor);
				}
			}
			return sequenceViewModel;
		}

		private static Chord FindChord(IStaticDataService staticDataService, ChordDescriptorViewModel chordDescriptor)
		{
			return staticDataService.GetChords().FirstOrDefault(
					c => c.RootNote.Id == chordDescriptor.NoteId
					&& c.DurationId == chordDescriptor.DurationId
					&& c.ChordType.Id == chordDescriptor.ChordTypeId);
		}
		private static Chord FindChord(IStaticDataService staticDataService, int chordId)
		{
			return staticDataService.GetChords().FirstOrDefault(c => c.Id == chordId);
		}
	}
}