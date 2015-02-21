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
		public int DefaultTempoId { get; set; }
		public List<Note> Notes { get; set; }
		public string DefaultNoteId { get; set; }
		public List<ChordType> ChordTypes { get; set; }
		public string DefaultChordTypeId { get; set; }
		public List<Duration> Durations { get; set; }
		public int DefaultDurationId { get; set; }
	}
}
