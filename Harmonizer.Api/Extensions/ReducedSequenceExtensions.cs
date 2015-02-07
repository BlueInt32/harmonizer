﻿using System.Collections.Generic;
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

				Chord chord = staticDataService.GetStaticData().Chords.FirstOrDefault(
					c => c.RootNote.Id == chordDescriptor.Note
					&& c.DurationId == chordDescriptor.Length
					&& c.ChordType.ChordTypeId == chordDescriptor.Type);
				//sequenceChord.Chord = chord;
				sequenceChord.ChordId = chord.ChordId;
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
						Note = sequenceChord.Chord.RootNote.Id,
						Length = sequenceChord.Chord.DurationId,
						Type = sequenceChord.Chord.ChordTypeId
					};
					sequenceViewModel.Chords.Add(chordDescriptor);
				}
			}
			return sequenceViewModel;
		}
	}
}