using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Domain.Entities
{
    /// <summary>
    /// Chord put in a sequence context. A sequence is made of sequencechords ordered by their positions.
    /// </summary>
    public class SequenceChord
	{
		public int Id { get; set; }
		public int PositionInSequence { get; set; }

		public int ChordId { get; set; }
		public Chord Chord { get; set; }

		//public int SequenceId { get; set; }
		//public Sequence Sequence { get; set; }
	}
}
