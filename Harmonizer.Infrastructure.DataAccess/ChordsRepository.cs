using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;

namespace Harmonizer.Infrastructure.DataAccess
{
	public class ChordsRepository : IChordsRepository, IDisposable
	{
		private readonly HarmonizerContext _db = new HarmonizerContext();
		public List<Chord> GetChords()
		{
			return _db.Chords.Include("RootNote").Include("ChordType").ToList();
		}
		public void Dispose()
		{
			_db.Dispose();
		}
	}
}
