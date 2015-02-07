using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;

namespace Harmonizer.Infrastructure.DataAccess.Repositories
{
	public class StaticDataRepository : IStaticDataRepository
	{
		private readonly HarmonizerContext _db = new HarmonizerContext();

		public List<Chord> GetChords()
		{
			return _db.Chords.Include("RootNote").Include("ChordType").ToList();
		}
		public List<ChordType> GetChordTypes()
		{
			return _db.ChordTypes.ToList();
		}
		public List<Note> GetNotes()
		{
			return _db.Notes.ToList();
		}
		public List<Tempo> GetTempi()
		{
			return _db.Tempi.ToList();
		}

		public List<Duration> GetDurations()
		{
			return _db.Durations.ToList();
		}

		public void Dispose()
		{
			_db.Dispose();
		}
	}
}
