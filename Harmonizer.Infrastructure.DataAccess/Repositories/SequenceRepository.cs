using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Harmonizer.Domain.Entities;
using Harmonizer.Domain.Interfaces;

namespace Harmonizer.Infrastructure.DataAccess
{
	public class SequenceRepository : ISequenceRepository, IDisposable
	{
		private readonly HarmonizerContext _db = new HarmonizerContext();
		public void CreateSequence(Sequence sequence)
		{
			_db.Sequences.Add(sequence);
			_db.SaveChanges();
		}

		public void UpdateSequence(Sequence sequence)
		{
			_db.Entry(sequence).State = System.Data.Entity.EntityState.Modified;
			_db.SaveChanges();
		}

		public void DeleteSequence(int sequenceId)
		{
			Sequence sequence = _db.Sequences.Single(s => s.SequenceId == sequenceId);
			_db.Sequences.Remove(sequence);
			_db.SaveChanges();
		}

		public List<Sequence> Search(string token)
		{
			List<Sequence> results = _db.Sequences.Where(s => s.Name.Contains(token) || s.Description.Contains(token)).ToList();
			return results;
		}

		public Sequence ReadSequence(int sequenceId)
		{
			Sequence sequence = _db.Sequences.Include("Chords.Chord.ChordType").Include("Chords.Chord.RootNote").SingleOrDefault(s => s.SequenceId == sequenceId);
			return sequence;
		}

		public void Dispose()
		{
			_db.Dispose();
		}
	}
}
