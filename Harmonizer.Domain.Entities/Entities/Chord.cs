using System.ComponentModel.DataAnnotations.Schema;

namespace Harmonizer.Domain.Entities
{
	/// <summary>
	/// A note (12 notes possible), a chordType (minor, major, seventh, sixth, etc) and a length in quarter notes.
	/// Careful : this is not directly used as is in a sequence. Sequence is made of SequenceChords.
	/// </summary>
	public class Chord
	{
		public int ChordId { get; set; }

		public int RootNoteId { get; set; }
		[ForeignKey("RootNoteId")]
		public Note RootNote { get; set; }

		public string ChordTypeId { get; set; }
		public ChordType ChordType { get; set; }

		public int Length { get; set; }
	}
}