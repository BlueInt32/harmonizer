using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Harmonizer.Domain.Entities
{
	public class Sequence
	{
		public int SequenceId { get; set; }

		public List<Chord> Chords { get; set; }

		[StringLength(50)]
		public string Name { get; set; }
		[StringLength(255)]
		public string Description { get; set; }
	}
}