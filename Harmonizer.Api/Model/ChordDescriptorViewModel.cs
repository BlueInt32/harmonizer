namespace Harmonizer.Api.Model
{
	public class ChordDescriptorViewModel
	{
		public string NoteId { get; set; }
		public int DurationId { get; set; }
		public string ChordTypeId { get; set; }
		public bool Playing { get; set; }
		public string ChordNotation { get; set; }
	}
}