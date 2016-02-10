using Harmonizer.Domain.Entities;
using Harmonizer.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Harmonizer.Api2.Model
{
	public class SequenceViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }

		public int Tempo { get; set; }
		public List<ChordDescriptorViewModel> Chords { get; set; }

        public SequenceToSaveArgs ToServiceArgs(IStaticDataService staticDataService)
        {
            SequenceToSaveArgs sequence = new SequenceToSaveArgs();
            sequence.Id = Id;
            sequence.Name = Name;
            sequence.Description = Description;
            sequence.TempoId = Tempo;
            int positionInSequence = 1;
            sequence.ChordsIds = new List<int>();
            foreach (var chordDescriptor in Chords)
            {
                SequenceChord sequenceChord = new SequenceChord();

                Chord chord = staticDataService.FindChord(staticDataService, chordDescriptor);
                sequenceChord.Id = chordDescriptor.SequenceChordId;
                sequenceChord.ChordId = chord.Id;
                sequenceChord.PositionInSequence = positionInSequence++;
                sequenceChord.SequenceId = sequenceViewModel.Id;
                sequence.Chords.Add(sequenceChord);
            }

            return sequence;
        }
    }
}