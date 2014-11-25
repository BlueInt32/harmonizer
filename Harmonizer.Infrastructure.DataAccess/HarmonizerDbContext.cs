using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;

namespace Harmonizer.Infrastructure.DataAccess
{
	public class HarmonizerDbContext : DbContext
	{
		public DbSet<Sequence> Sequences { get; set; }
		public DbSet<ChordType> ChordTypes { get; set; }
		public DbSet<Chord> Chords { get; set; }

	}
}
