using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;

namespace Harmonizer.Infrastructure.DataAccess
{
	public class HarmonizerContext : DbContext
	{
		static HarmonizerContext()
		{
			var ensureDLLIsCopied = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
		}
		public DbSet<Sequence> Sequences { get; set; }
		public DbSet<SequenceChord> SequenceChords { get; set; }
		public DbSet<ChordType> ChordTypes { get; set; }
		public DbSet<Chord> Chords { get; set; }
		public DbSet<Note> Notes { get; set; }
		public DbSet<Duration> Durations { get; set; }
		public DbSet<Tempo> Tempi { get; set; }
	}
}
