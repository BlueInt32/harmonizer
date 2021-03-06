﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Harmonizer.Domain.Entities
{
	/// <summary>
	/// Essentially series of chords and metadata. This is what can describe harmonically a part of a song : verse, chorus or anything.
	/// </summary>
	public class Sequence
	{
		public int Id { get; set; }

		public List<SequenceChord> Chords { get; set; }

		[StringLength(50)]
		public string Name { get; set; }
		[StringLength(255)]
		public string Description { get; set; }

		public int TempoId { get; set; }
		public virtual Tempo Tempo { get; set; }
	}
}