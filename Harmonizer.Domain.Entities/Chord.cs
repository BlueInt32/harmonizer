using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Harmonizer.Domain.Entities
{
    /// <summary>
    /// A note (12 notes possible), a chordType (minor, major, seventh, sixth, etc) and a length in quarter notes.
    /// Careful : this is not directly used as is in a sequence. Sequence is made of SequenceChords.
    /// </summary>
    public class Chord
	{
		public int Id { get; set; }
		public string RootNoteId { get; set; }
		public string ChordTypeId { get; set; }
		public int DurationId { get; set; }
	}
}