using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Harmonizer.Models
{
	public class Chord
	{
		public Note RootNote { get; set; }
		public ChordType ChordType { get; set; }
		public int Length { get; set; }

		public string ShortName { get; set; }
	}
}