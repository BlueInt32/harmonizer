using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Harmonizer.Api.Model
{
	public class SequenceViewModel
	{
		public string Name { get; set; }
		public string Description { get; set; }
		public List<ChordDescriptorViewModel> Chords { get; set; }
	}
}