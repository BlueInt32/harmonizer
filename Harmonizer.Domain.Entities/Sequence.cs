using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Harmonizer.Domain.Entities
{
	/// <summary>
	/// Essentially series of chords and metadata. This is what can describe harmonically a part of a song : verse, chorus or anything.
	/// </summary>
	public class Sequence
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public List<SequenceChord> Chords { get; set; }
		public virtual Tempo Tempo { get; set; }
	}
}