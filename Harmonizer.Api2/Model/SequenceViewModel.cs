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
	}
}