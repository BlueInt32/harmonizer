namespace Harmonizer.Domain.Entities
{
	public class Chord
	{
		public int ChordId { get; set; }

		public Note RootNote { get; set; }
		public ChordType ChordType { get; set; }
		public int Length { get; set; }

		public string ShortName { get; set; }
	}
}