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
		public static Sequence ToDomainSequence(this SequenceViewModel sequenceViewModel, IApiService apiService)
		{
			Sequence sequence = new Sequence();
			sequence.Name = sequenceViewModel.Name;
			sequence.Description = sequenceViewModel.Description;
			sequence.Chords = new List<SequenceChord>();
			int positionInSequence = 1;
			foreach (var chordDescriptor in sequenceViewModel.Chords)
			{
				SequenceChord sequenceChord = new SequenceChord();

				Chord chord = apiService.StaticChords.FirstOrDefault(
					c => c.RootNote.UsNotationFlat.ToLower() == chordDescriptor.Note
					&& c.Length == chordDescriptor.Length
					&& c.ChordType.Id == chordDescriptor.Type);
				//sequenceChord.Chord = chord;
				sequenceChord.ChordId = chord.ChordId;
				sequenceChord.PositionInSequence = positionInSequence++;
				sequence.Chords.Add(sequenceChord);
			}

			return sequence;
		}
	}
}