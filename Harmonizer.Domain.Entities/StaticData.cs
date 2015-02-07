using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Domain.Entities
{
	public class StaticData
	{
		public List<Tempo> Tempi { get; set; }
		public List<Note> Notes { get; set; }
		public List<ChordType> ChordTypes { get; set; }
		public List<Duration> Durations { get; set; }
		public List<Chord> Chords { get; set; }

	}
}
