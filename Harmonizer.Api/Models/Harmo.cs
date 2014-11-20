using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Harmonizer.Models
{
	public class Harmo
	{
		public int HarmoId { get; set; }

		public List<Chord> Chords { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }
	}
}